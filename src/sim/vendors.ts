// Verhalten und Laufwege der Verkäufer: Laden im Lager, Weg zum Platz, Aufbau, Verkauf,
// Abbau, Rückweg zum Nachladen und Feierabend um 21:30.
import { EQUIPMENT, SALES, TIME, secondsToTicks, type PathMode } from '../data/balance';
import { loadCargo, needsRestock, storeCargo } from './economy';
import { findPath } from './pathfinding';
import { idlePosition } from './staff';
import { hourOf } from './time';
import type { GameState, Person } from './types';
import { loadingPoint } from './warehouseLayout';
import type { World } from './world';

/** Wegpunkt-Kennungen neben Feldindizes */
const NODE_LOADING = -1;
const NODE_END = -2;

const pos = { x: 0, y: 0 };

function nodePos(world: World, p: Person, node: number, out: { x: number; y: number }): void {
  if (node >= 0) {
    out.x = (node % world.w) + 0.5;
    out.y = ((node / world.w) | 0) + 0.5;
  } else if (node === NODE_LOADING) {
    const lp = loadingPoint(world);
    out.x = lp.x;
    out.y = lp.y;
  } else {
    out.x = p.endX;
    out.y = p.endY;
  }
}

export function pathModeOf(p: Person): PathMode {
  return EQUIPMENT[p.equipment].pathMode;
}

function setupTicks(p: Person): number {
  return secondsToTicks(EQUIPMENT[p.equipment].setupSeconds);
}

/** Nächstes für die Wegart passierbare Feld */
function accessTile(world: World, tile: number, mode: PathMode): number {
  const cost = world.costs[mode];
  if (cost[tile]) return tile;
  const w = world.w;
  const tx = tile % w;
  const ty = (tile / w) | 0;
  for (let r = 1; r <= 3; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const nx = tx + dx, ny = ty + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= world.h) continue;
        const ni = ny * w + nx;
        if (cost[ni]) return ni;
      }
    }
  }
  return tile;
}

export function isInWarehouse(p: Person): boolean {
  return p.mode === 'idle' || p.mode === 'loading' || p.mode === 'waitStock';
}

function currentTile(world: World, p: Person): number {
  if (isInWarehouse(p)) return world.warehouse.door;
  if (p.path && p.pathIdx > 0) {
    for (let i = Math.min(p.pathIdx - 1, p.path.length - 1); i >= 0; i--) if (p.path[i] >= 0) return p.path[i];
  }
  const x = Math.floor(p.x);
  const y = Math.floor(p.y);
  return accessTile(world, y * world.w + x, pathModeOf(p));
}

function spotOffset(slot: number): number {
  return slot === 0 ? -0.24 : 0.24;
}

function chooseSlot(s: GameState, p: Person, spot: number): number {
  const taken = s.staff.some((o) => o !== p && o.activeSpot === spot && o.slot === 0);
  return taken ? 1 : 0;
}

function startPath(p: Person, tiles: number[] | null, fromWarehouse: boolean, toWarehouse: boolean): boolean {
  if (!tiles) return false;
  const path: number[] = [];
  if (fromWarehouse) path.push(NODE_LOADING);
  for (const t of tiles) path.push(t);
  if (toWarehouse) path.push(NODE_LOADING);
  path.push(NODE_END);
  p.path = path;
  p.pathIdx = 0;
  return true;
}

function goToSpot(s: GameState, world: World, p: Person): void {
  if (p.spot === null) return;
  const spot = world.spots[p.spot];
  const mode = pathModeOf(p);
  const inside = isInWarehouse(p);
  const from = accessTile(world, currentTile(world, p), mode);
  const goal = accessTile(world, spot.tile, mode);
  p.activeSpot = p.spot;
  p.slot = chooseSlot(s, p, p.spot);
  const gx = (goal % world.w) + 0.5;
  const gy = ((goal / world.w) | 0) + 0.5;
  p.endX = gx + spotOffset(p.slot);
  p.endY = gy;
  if (startPath(p, findPath(world, from, goal, mode), inside, false)) p.mode = 'toSpot';
  else {
    // Kein Weg gefunden: im Lager bleiben
    p.activeSpot = null;
    p.mode = 'idle';
  }
}

function returnToWarehouse(s: GameState, world: World, p: Person): void {
  const mode = pathModeOf(p);
  const from = accessTile(world, currentTile(world, p), mode);
  const door = accessTile(world, world.warehouse.door, mode);
  p.activeSpot = null;
  const idle = idlePosition(world, s, p);
  p.endX = idle.x;
  p.endY = idle.y;
  if (startPath(p, findPath(world, from, door, mode), false, true)) p.mode = 'toWarehouse';
  else arriveHome(s, world, p);
}

/** Setzt einen Verkäufer sofort ins Lager und lagert seine Ware ein. */
export function arriveHome(s: GameState, world: World, p: Person): void {
  storeCargo(s, p.cargo);
  const idle = idlePosition(world, s, p);
  p.x = p.px = idle.x;
  p.y = p.py = idle.y;
  p.path = null;
  p.activeSpot = null;
  p.mode = 'idle';
  p.ang = -Math.PI / 2;
}

/** Bewegt entlang des Weges. Liefert true, wenn das Ziel erreicht ist. */
function move(world: World, p: Person): boolean {
  if (!p.path) return true;
  let d = EQUIPMENT[p.equipment].speed / TIME.ticksPerSecond;
  while (d > 1e-6 && p.pathIdx < p.path.length) {
    nodePos(world, p, p.path[p.pathIdx], pos);
    const dx = pos.x - p.x;
    const dy = pos.y - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1e-4) p.ang = Math.atan2(dy, dx);
    if (dist <= d) {
      p.x = pos.x;
      p.y = pos.y;
      d -= dist;
      p.pathIdx++;
    } else {
      p.x += (dx / dist) * d;
      p.y += (dy / dist) * d;
      d = 0;
    }
  }
  if (p.pathIdx >= p.path.length) {
    p.path = null;
    return true;
  }
  return false;
}

export function stepVendors(s: GameState, world: World): void {
  const late = hourOf(s) >= TIME.returnHour;
  const reload = secondsToTicks(SALES.reloadSeconds);
  for (const p of s.staff) {
    p.px = p.x;
    p.py = p.y;
    switch (p.mode) {
      case 'idle':
        if (!late && p.spot !== null) {
          p.mode = 'loading';
          p.timer = reload;
        } else if (p.cargo.length) storeCargo(s, p.cargo);
        break;
      case 'loading':
      case 'waitStock':
        if (late || p.spot === null) {
          arriveHome(s, world, p);
          break;
        }
        if (--p.timer > 0) break;
        loadCargo(s, world, p);
        if (needsRestock(p)) {
          p.mode = 'waitStock';
          p.timer = TIME.ticksPerSecond;
        } else goToSpot(s, world, p);
        break;
      case 'toSpot':
        if (late || p.spot === null) {
          returnToWarehouse(s, world, p);
          break;
        }
        if (p.spot !== p.activeSpot) {
          goToSpot(s, world, p);
          break;
        }
        if (move(world, p)) {
          p.mode = 'setup';
          p.timer = setupTicks(p);
        }
        break;
      case 'setup':
        if (late || p.spot !== p.activeSpot) {
          p.mode = 'packing';
          p.timer = Math.max(1, setupTicks(p) - p.timer);
          break;
        }
        if (--p.timer <= 0) p.mode = 'selling';
        break;
      case 'selling':
        if (late || p.spot !== p.activeSpot || needsRestock(p)) {
          p.mode = 'packing';
          p.timer = setupTicks(p);
        }
        break;
      case 'packing':
        if (--p.timer > 0) break;
        if (!late && p.spot !== null && p.spot !== p.activeSpot && !needsRestock(p)) goToSpot(s, world, p);
        else returnToWarehouse(s, world, p);
        break;
      case 'toWarehouse':
        if (move(world, p)) {
          if (late || p.spot === null) arriveHome(s, world, p);
          else {
            p.mode = 'loading';
            p.timer = reload;
          }
        }
        break;
    }
  }
}

/** Zum Tagesende: alle Verkäufer zurück ins Lager */
export function sendEveryoneHome(s: GameState, world: World): void {
  for (const p of s.staff) if (p.mode !== 'idle' || p.cargo.length) arriveHome(s, world, p);
}

/** Wie weit der Auf- oder Abbau ist (0..1), für den Fortschrittsring */
export function setupProgress(p: Person): number {
  const total = setupTicks(p);
  if (p.mode === 'setup') return 1 - p.timer / total;
  if (p.mode === 'packing') return p.timer / total;
  return 0;
}
