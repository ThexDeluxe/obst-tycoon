// Verkäufer arbeiten selbstständig: Kisten im Lager holen, den besten freien Platz in den
// eigenen Vierteln suchen, aufbauen, verkaufen und zum Nachschub zurückkehren.
import { CRATE_UNITS, DEALERS, DISTRICTS, FRUITS, TIME, secondsToTicks } from '../data/balance';
import { FIRST_NAMES, LAST_NAMES } from '../data/names';
import { findPath, pathLength } from './pathfinding';
import { rand } from './rng';
import { carryCrates, dealerSpeed, isOwned } from './selectors';
import { customersPerHour, hourOf } from './time';
import type { Dealer, GameState } from './types';
import { idleSpot, loadingPoint } from './warehouseLayout';
import type { World } from './world';

/** Wegpunkt-Kennungen neben Feldindizes */
const NODE_LOADING = -1;
const NODE_END = -2;

const pos = { x: 0, y: 0 };

const distCache = new WeakMap<World, number[]>();

/** Weglänge vom Lagertor zu jedem Verkaufsplatz */
export function spotDistances(world: World): number[] {
  let d = distCache.get(world);
  if (!d) {
    d = world.spots.map((sp) => {
      const p = findPath(world, world.warehouse.door, sp.tile, 'foot');
      return p ? pathLength(world, p) : 9999;
    });
    distCache.set(world, d);
  }
  return d;
}

export function spotOccupancy(s: GameState, spot: number, except?: Dealer): number {
  let n = 0;
  for (const d of s.dealers) if (d !== except && d.spot === spot) n++;
  return n;
}

/** Bewertung eines Platzes: Kundschaft mal Preisniveau, geteilt durch Belegung und Weglänge */
export function spotScore(s: GameState, world: World, spot: number, occupants: number): number {
  const sp = world.spots[spot];
  const def = DISTRICTS[sp.district];
  const dist = spotDistances(world)[spot];
  return (customersPerHour(sp.district, hourOf(s)) * def.priceLevel) / (occupants + 1) / (1 + dist / DEALERS.distanceHalf);
}

/** Sucht den besten freien Platz in den eigenen Vierteln */
export function chooseSpot(s: GameState, world: World, dealer: Dealer): number | null {
  let best: number | null = null;
  let bestScore = -1;
  for (const sp of world.spots) {
    if (!isOwned(s, sp.districtIndex)) continue;
    const occ = spotOccupancy(s, sp.index, dealer);
    if (occ >= DEALERS.maxPerSpot) continue;
    const score = spotScore(s, world, sp.index, occ);
    if (score > bestScore) {
      bestScore = score;
      best = sp.index;
    }
  }
  return best;
}

export function randomDealerName(s: GameState): string {
  const used = new Set(s.dealers.map((d) => d.name));
  for (let i = 0; i < 30; i++) {
    const n = `${FIRST_NAMES[Math.floor(rand(s) * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(rand(s) * LAST_NAMES.length)]}`;
    if (!used.has(n)) return n;
  }
  return `${FIRST_NAMES[0]} ${LAST_NAMES[s.dealers.length % LAST_NAMES.length]}`;
}

export function createDealer(s: GameState, world: World): Dealer {
  const d: Dealer = {
    id: s.nextId++,
    name: randomDealerName(s),
    look: rand(s),
    mode: 'idle',
    timer: 0,
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    ang: -Math.PI / 2,
    path: null,
    pathIdx: 0,
    endX: 0,
    endY: 0,
    spot: null,
    slot: 0,
    load: [],
    soldToday: 0,
    earnedToday: 0,
    earnedTotal: 0,
  };
  s.dealers.push(d);
  const p = idleSpot(world, s.dealers.length - 1);
  d.x = d.px = p.x;
  d.y = d.py = p.y;
  return d;
}

function nodePos(world: World, d: Dealer, node: number, out: { x: number; y: number }): void {
  if (node >= 0) {
    out.x = (node % world.w) + 0.5;
    out.y = ((node / world.w) | 0) + 0.5;
  } else if (node === NODE_LOADING) {
    const lp = loadingPoint(world);
    out.x = lp.x;
    out.y = lp.y;
  } else {
    out.x = d.endX;
    out.y = d.endY;
  }
}

function currentTile(world: World, d: Dealer): number {
  if (d.path && d.pathIdx > 0) {
    for (let i = Math.min(d.pathIdx - 1, d.path.length - 1); i >= 0; i--) if (d.path[i] >= 0) return d.path[i];
  }
  if (d.spot !== null && (d.mode === 'setup' || d.mode === 'selling' || d.mode === 'packing')) return world.spots[d.spot].tile;
  const t = Math.floor(d.y) * world.w + Math.floor(d.x);
  return world.costs.foot[t] ? t : world.warehouse.door;
}

/** Nimmt Kisten aus dem Lager, die wertvollste Sorte zuerst */
export function takeCrates(s: GameState, d: Dealer): number {
  const want = carryCrates(s) - d.load.length;
  let taken = 0;
  for (let k = 0; k < want; k++) {
    let best = -1;
    for (let i = 0; i < s.crates.length; i++) {
      if (best < 0 || FRUITS[s.crates[i].fruit].unitPrice > FRUITS[s.crates[best].fruit].unitPrice) best = i;
    }
    if (best < 0) break;
    const [c] = s.crates.splice(best, 1);
    d.load.push({ fruit: c.fruit, units: CRATE_UNITS });
    taken++;
  }
  return taken;
}

function goToSpot(s: GameState, world: World, d: Dealer, spot: number): boolean {
  const sp = world.spots[spot];
  const from = d.mode === 'idle' || d.mode === 'loading' ? world.warehouse.door : currentTile(world, d);
  const tiles = findPath(world, from, sp.tile, 'foot');
  if (!tiles) return false;
  d.slot = s.dealers.some((o) => o !== d && o.spot === spot && o.slot === 0) ? 1 : 0;
  d.spot = spot;
  d.endX = sp.x + 0.5 + (d.slot === 0 ? -0.25 : 0.25);
  d.endY = sp.y + 0.5;
  const path: number[] = [];
  if (d.mode === 'idle' || d.mode === 'loading') path.push(NODE_LOADING);
  for (const t of tiles) path.push(t);
  path.push(NODE_END);
  d.path = path;
  d.pathIdx = 0;
  d.mode = 'toSpot';
  return true;
}

function returnHome(s: GameState, world: World, d: Dealer): void {
  const from = currentTile(world, d);
  const tiles = findPath(world, from, world.warehouse.door, 'foot');
  d.spot = null;
  const idle = idleSpot(world, s.dealers.indexOf(d));
  d.endX = idle.x;
  d.endY = idle.y;
  if (!tiles) {
    arriveHome(s, world, d);
    return;
  }
  d.path = [...tiles, NODE_LOADING, NODE_END];
  d.pathIdx = 0;
  d.mode = 'toWarehouse';
}

export function arriveHome(s: GameState, world: World, d: Dealer): void {
  const idle = idleSpot(world, s.dealers.indexOf(d));
  d.x = d.px = idle.x;
  d.y = d.py = idle.y;
  d.path = null;
  d.spot = null;
  d.mode = 'idle';
  d.timer = 0;
  d.ang = -Math.PI / 2;
}

/** Bewegt entlang des Weges. Liefert true, wenn das Ziel erreicht ist. */
function move(s: GameState, world: World, d: Dealer): boolean {
  if (!d.path) return true;
  let step = dealerSpeed(s) / TIME.ticksPerSecond;
  while (step > 1e-6 && d.pathIdx < d.path.length) {
    nodePos(world, d, d.path[d.pathIdx], pos);
    const dx = pos.x - d.x;
    const dy = pos.y - d.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1e-4) d.ang = Math.atan2(dy, dx);
    if (dist <= step) {
      d.x = pos.x;
      d.y = pos.y;
      step -= dist;
      d.pathIdx++;
    } else {
      d.x += (dx / dist) * step;
      d.y += (dy / dist) * step;
      step = 0;
    }
  }
  if (d.pathIdx >= d.path.length) {
    d.path = null;
    return true;
  }
  return false;
}

export function stepDealers(s: GameState, world: World): void {
  const setup = secondsToTicks(DEALERS.setupSeconds);
  for (const d of s.dealers) {
    d.px = d.x;
    d.py = d.y;
    switch (d.mode) {
      case 'idle': {
        if (--d.timer > 0) break;
        d.timer = secondsToTicks(DEALERS.waitSeconds);
        if (d.load.length === 0 && s.crates.length === 0) break;
        const spot = chooseSpot(s, world, d);
        if (spot === null) break;
        if (d.load.length < carryCrates(s)) takeCrates(s, d);
        if (d.load.length === 0) break;
        // Kurz am Regal: Kiste aufnehmen
        d.spot = spot;
        d.mode = 'loading';
        d.timer = setup;
        break;
      }
      case 'loading':
        if (--d.timer > 0) break;
        if (d.spot === null || !isOwned(s, world.spots[d.spot].districtIndex)) {
          d.mode = 'idle';
          d.spot = null;
          break;
        }
        if (!goToSpot(s, world, d, d.spot)) {
          d.mode = 'idle';
          d.spot = null;
        }
        break;
      case 'toSpot':
        if (d.spot === null || !isOwned(s, world.spots[d.spot].districtIndex)) {
          returnHome(s, world, d);
          break;
        }
        if (move(s, world, d)) {
          d.mode = 'setup';
          d.timer = setup;
          d.ang = Math.PI / 2;
        }
        break;
      case 'setup':
        if (--d.timer <= 0) d.mode = 'selling';
        break;
      case 'selling':
        if (d.load.length === 0 || d.spot === null || !isOwned(s, world.spots[d.spot].districtIndex)) {
          d.mode = 'packing';
          d.timer = setup;
        }
        break;
      case 'packing':
        if (--d.timer > 0) break;
        returnHome(s, world, d);
        break;
      case 'toWarehouse':
        if (move(s, world, d)) arriveHome(s, world, d);
        break;
    }
  }
}

/** Wie weit der Auf- oder Abbau ist (0..1) */
export function setupProgress(d: Dealer): number {
  const total = secondsToTicks(DEALERS.setupSeconds);
  if (d.mode === 'setup') return 1 - d.timer / total;
  if (d.mode === 'packing') return d.timer / total;
  return 0;
}

export function dealerUnits(d: Dealer): number {
  let n = 0;
  for (const l of d.load) n += l.units;
  return n;
}
