// Passanten und Verkehr. Beides dient nur der Optik und nutzt einen eigenen Zufallsstrom,
// damit die Wirtschaft unabhängig davon bleibt, ob die Optik berechnet wird.
import { AMBIENT, DISTRICT_IDS, DISTRICTS, SALES, TIME, secondsToTicks } from '../data/balance';
import { findPath } from './pathfinding';
import { rand, randRange } from './rng';
import { demandCurve, hourOf, weekdayFactor } from './time';
import type { GameState, Pedestrian } from './types';
import { TILE, type World } from './world';

const A = 'ambientRng' as const;
const DIRS = [1, 0, 0, 1, -1, 0, 0, -1];

function walkable(world: World, i: number, allowGreen: boolean): boolean {
  const t = world.tiles[i];
  return t === TILE.SIDEWALK || t === TILE.CROSSWALK || t === TILE.PLAZA || (allowGreen && t === TILE.GREEN);
}

/** Anteil der sichtbaren Passanten eines Viertels zur aktuellen Uhrzeit */
export function pedestrianTarget(state: GameState, districtIndex: number): number {
  const d = DISTRICT_IDS[districtIndex];
  const def = DISTRICTS[d];
  const hour = Math.min(hourOf(state), TIME.dayEndHour - 0.01);
  const frac = Math.max(AMBIENT.minPedestrianFraction, (demandCurve(d, hour) * weekdayFactor(d, state.day)) / def.peak);
  return Math.round(AMBIENT.maxPedestrians * def.pedestrianShare * Math.min(1, frac));
}

function spawnPed(state: GameState, world: World, tile: number, fadeIn: boolean): Pedestrian {
  const w = world.w;
  const x = (tile % w) + 0.5;
  const y = ((tile / w) | 0) + 0.5;
  const p: Pedestrian = {
    id: state.nextId++,
    x,
    y,
    px: x,
    py: y,
    from: tile,
    to: tile,
    t: 1,
    speed: randRange(state, AMBIENT.pedSpeedMin, AMBIENT.pedSpeedMax, A),
    ang: rand(state, A) * Math.PI * 2,
    look: rand(state, A),
    mode: 0,
    timer: 0,
    fade: fadeIn ? 0 : 1,
    leaving: false,
    path: null,
    pathIdx: 0,
  };
  state.peds.push(p);
  return p;
}

function chooseNext(state: GameState, world: World, p: Pedestrian): number {
  const w = world.w;
  const cur = p.to;
  const cx = cur % w;
  const cy = (cur / w) | 0;
  const onGreen = world.tiles[cur] === TILE.GREEN;
  const onCross = world.tiles[cur] === TILE.CROSSWALK;
  // Bisherige Richtung
  const prev = p.from;
  const pdx = cx - (prev % w);
  const pdy = cy - ((prev / w) | 0);
  const allowGreen = onGreen || rand(state, A) < AMBIENT.pedGreenChance;
  let straight = -1;
  let back = -1;
  let options = 0;
  const cand = scratch;
  for (let k = 0; k < 4; k++) {
    const dx = DIRS[k * 2];
    const dy = DIRS[k * 2 + 1];
    const nx = cx + dx;
    const ny = cy + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= world.h) continue;
    const ni = ny * w + nx;
    if (!walkable(world, ni, allowGreen)) continue;
    if (dx === -pdx && dy === -pdy && (pdx !== 0 || pdy !== 0)) {
      back = ni;
      continue;
    }
    if (dx === pdx && dy === pdy) straight = ni;
    cand[options++] = ni;
  }
  // Auf dem Überweg geht es geradeaus weiter
  if (onCross && straight >= 0) return straight;
  if (straight >= 0 && rand(state, A) > AMBIENT.pedTurnChance) return straight;
  if (options > 0) return cand[Math.floor(rand(state, A) * options)];
  return back >= 0 ? back : cur;
}
const scratch = new Int32Array(4);

function advancePed(state: GameState, world: World, p: Pedestrian): void {
  const w = world.w;
  p.px = p.x;
  p.py = p.y;
  const fadeStep = 1 / secondsToTicks(AMBIENT.pedFadeSeconds);
  if (p.leaving) p.fade = Math.max(0, p.fade - fadeStep);
  else if (p.fade < 1) p.fade = Math.min(1, p.fade + fadeStep);

  if (p.mode === 1) {
    if (--p.timer <= 0) p.mode = 0;
    return;
  }
  const step = p.speed / TIME.ticksPerSecond;
  const fx = (p.from % w) + 0.5;
  const fy = ((p.from / w) | 0) + 0.5;
  const tx = (p.to % w) + 0.5;
  const ty = ((p.to / w) | 0) + 0.5;
  const segLen = Math.hypot(tx - fx, ty - fy) || 1;
  p.t += step / segLen;
  if (p.t >= 1) {
    p.t -= 1;
    p.from = p.to;
    if (p.mode === 2 && p.path) {
      p.pathIdx++;
      if (p.pathIdx >= p.path.length) {
        // Am Stand angekommen: kurz stehen bleiben
        p.mode = 1;
        p.timer = secondsToTicks(SALES.customerStandSeconds);
        p.path = null;
        p.t = 1;
        p.x = (p.from % w) + 0.5;
        p.y = ((p.from / w) | 0) + 0.5;
        return;
      }
      p.to = p.path[p.pathIdx];
    } else {
      p.to = chooseNext(state, world, p);
    }
    if (p.to === p.from) p.t = 1;
  }
  const ax = (p.from % w) + 0.5;
  const ay = ((p.from / w) | 0) + 0.5;
  const bx = (p.to % w) + 0.5;
  const by = ((p.to / w) | 0) + 0.5;
  const t = Math.min(1, p.t);
  p.x = ax + (bx - ax) * t;
  p.y = ay + (by - ay) * t;
  if (bx !== ax || by !== ay) p.ang = Math.atan2(by - ay, bx - ax);
}

function districtOfPed(world: World, p: Pedestrian): number {
  return world.district[p.to];
}

const counts = new Int32Array(DISTRICT_IDS.length);

function balancePopulation(state: GameState, world: World, instant: boolean): void {
  counts.fill(0);
  for (const p of state.peds) if (!p.leaving) counts[districtOfPed(world, p)]++;
  for (let d = 0; d < DISTRICT_IDS.length; d++) {
    const target = pedestrianTarget(state, d);
    const tiles = world.footTilesByDistrict[d];
    let diff = target - counts[d];
    const maxChanges = instant ? 1000 : 2;
    let changes = 0;
    while (diff > 0 && changes < maxChanges && tiles.length) {
      const tile = tiles[Math.floor(rand(state, A) * tiles.length)];
      spawnPed(state, world, tile, !instant);
      diff--;
      changes++;
    }
    if (diff < 0) {
      for (const p of state.peds) {
        if (changes >= maxChanges || diff >= 0) break;
        if (p.leaving || p.mode !== 0 || districtOfPed(world, p) !== d) continue;
        p.leaving = true;
        diff++;
        changes++;
      }
    }
  }
}

export function initAmbient(state: GameState, world: World): void {
  state.peds.length = 0;
  state.vehicles.length = 0;
  if (!state.ambient) return;
  balancePopulation(state, world, true);
  for (let i = 0; i < AMBIENT.cars; i++) {
    const route = i % world.carRoutes.length;
    state.vehicles.push({
      id: state.nextId++,
      kind: 'car',
      route,
      s: rand(state, A) * world.carRoutes[route].length,
      ps: 0,
      speed: AMBIENT.carSpeed * randRange(state, 0.85, 1.15, A),
      color: Math.floor(rand(state, A) * 8),
      wait: 0,
      nextStop: 0,
    });
  }
  for (let i = 0; i < AMBIENT.buses && world.busRoutes.length; i++) {
    const r = world.busRoutes[0];
    state.vehicles.push({
      id: state.nextId++,
      kind: 'bus',
      route: 0,
      s: (r.length / AMBIENT.buses) * i,
      ps: 0,
      speed: AMBIENT.busSpeed,
      color: 0,
      wait: 0,
      nextStop: 0,
    });
  }
  for (const v of state.vehicles) {
    v.ps = v.s;
    if (v.kind === 'bus') v.nextStop = nextBusStop(world, v.route, v.s);
  }
}

export function stepAmbient(state: GameState, world: World): void {
  if (!state.ambient) return;
  if (--state.ambientTimer <= 0) {
    state.ambientTimer = secondsToTicks(AMBIENT.populationCheckSeconds);
    balancePopulation(state, world, false);
  }
  const peds = state.peds;
  for (let i = 0; i < peds.length; i++) advancePed(state, world, peds[i]);
  // Ausgeblendete Passanten entfernen (ohne Reihenfolge zu erhalten)
  for (let i = peds.length - 1; i >= 0; i--) {
    if (peds[i].leaving && peds[i].fade <= 0) {
      peds[i] = peds[peds.length - 1];
      peds.pop();
    }
  }
  for (const v of state.vehicles) {
    v.ps = v.s;
    if (v.wait > 0) {
      v.wait--;
      continue;
    }
    v.s += v.speed / TIME.ticksPerSecond;
    if (v.kind === 'bus' && v.s >= v.nextStop) {
      v.s = v.nextStop;
      v.wait = secondsToTicks(3);
      v.nextStop = nextBusStop(world, v.route, v.s + 0.01);
    }
  }
}

/** Absolute Strecke bis zur nächsten Haltestelle ab Position s */
function nextBusStop(world: World, route: number, s: number): number {
  const r = world.busRoutes[route];
  if (!r.stops.length) return Infinity;
  const lap = Math.floor(s / r.length) * r.length;
  const pos = s - lap;
  let best = Infinity;
  for (const st of r.stops) {
    const abs = st >= pos ? lap + st : lap + r.length + st;
    if (abs < best) best = abs;
  }
  return best;
}

/**
 * Lässt einen Passanten in der Nähe zum Stand gehen und dort kurz stehen bleiben.
 * Findet sich niemand, erscheint ein Kunde direkt neben dem Stand.
 */
export function attractCustomer(state: GameState, world: World, standTile: number): void {
  if (!state.ambient) return;
  const w = world.w;
  const sx = (standTile % w) + 0.5;
  const sy = ((standTile / w) | 0) + 0.5;
  // Zielfeld neben dem Stand
  let target = -1;
  const off = Math.floor(rand(state, A) * 8);
  for (let k = 0; k < 8 && target < 0; k++) {
    const dir = (off + k) % 8;
    const dx = [1, 1, 0, -1, -1, -1, 0, 1][dir];
    const dy = [0, 1, 1, 1, 0, -1, -1, -1][dir];
    const nx = (standTile % w) + dx;
    const ny = ((standTile / w) | 0) + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= world.h) continue;
    const ni = ny * w + nx;
    if (walkable(world, ni, false)) target = ni;
  }
  if (target < 0) return;
  let best: Pedestrian | null = null;
  let bestD = AMBIENT.customerSearchRadius * AMBIENT.customerSearchRadius;
  for (const p of state.peds) {
    if (p.mode !== 0 || p.leaving || p.fade < 1) continue;
    const d = (p.x - sx) ** 2 + (p.y - sy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  if (best) {
    const path = findPath(world, best.to, target, 'foot');
    if (path && path.length > 1) {
      best.mode = 2;
      best.path = path;
      best.pathIdx = 1;
      best.from = path[0];
      best.to = path[1];
      best.t = 0;
      return;
    }
  }
  const p = spawnPed(state, world, target, true);
  p.mode = 1;
  p.timer = secondsToTicks(SALES.customerStandSeconds);
  p.ang = Math.atan2(sy - p.y, sx - p.x);
}
