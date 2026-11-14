// Personal: Bewerber, Anwerben, Entlassen, Löhne.
import { STAFF } from '../data/balance';
import { FIRST_NAMES, LAST_NAMES } from '../data/names';
import { pickWeighted, rand } from './rng';
import type { Applicant, GameState, Person } from './types';
import type { World } from './world';
import { loadingPoint } from './warehouseLayout';

export function wageFor(talent: number, vigilance: number): number {
  return STAFF.wageBase + STAFF.wagePerPoint * (talent + vigilance - STAFF.wageOffset);
}

function randomStat(s: GameState): number {
  return pickWeighted(s, STAFF.statWeights) + 1;
}

function randomName(s: GameState): string {
  const used = new Set(s.staff.map((p) => p.name));
  for (let i = 0; i < 20; i++) {
    const n = `${FIRST_NAMES[Math.floor(rand(s) * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(rand(s) * LAST_NAMES.length)]}`;
    if (!used.has(n)) return n;
  }
  return `${FIRST_NAMES[0]} ${LAST_NAMES[0]}`;
}

export function generateApplicants(s: GameState): void {
  s.applicants = [];
  for (let i = 0; i < STAFF.applicantsPerDay; i++) {
    const talent = randomStat(s);
    const vigilance = randomStat(s);
    s.applicants.push({ id: s.nextId++, name: randomName(s), talent, vigilance, wage: wageFor(talent, vigilance) });
  }
}

/** Position eines Verkäufers, der im Lager wartet */
export function idlePosition(world: World, s: GameState, p: Person): { x: number; y: number } {
  const lp = loadingPoint(world);
  const i = Math.max(0, s.staff.indexOf(p));
  return { x: lp.x - 1.2 + (i % 5) * 0.45, y: lp.y + 0.55 + Math.floor(i / 5) * 0.45 };
}

export function createVendor(s: GameState, world: World, a: Omit<Applicant, 'id'>): Person {
  const p: Person = {
    id: s.nextId++,
    name: a.name,
    role: 'vendor',
    talent: a.talent,
    vigilance: a.vigilance,
    wage: a.wage,
    hiredDay: s.day,
    equipment: 'tray',
    spot: null,
    activeSpot: null,
    slot: 0,
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
    cargo: [],
    assortment: 'auto',
    revenueToday: 0,
    unitsToday: 0,
    revenueTotal: 0,
  };
  s.staff.push(p);
  const pos = idlePosition(world, s, p);
  p.x = p.px = pos.x;
  p.y = p.py = pos.y;
  return p;
}

export function starterVendor(s: GameState, world: World): Person {
  const t = STAFF.starterTalent;
  const v = STAFF.starterVigilance;
  return createVendor(s, world, { name: randomName(s), talent: t, vigilance: v, wage: wageFor(t, v) });
}

export function talentFactor(p: Person): number {
  return STAFF.talentFactor[p.talent - 1];
}
