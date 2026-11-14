// Abgeleitete Werte aus dem Spielstand (Kapazitäten, Freischaltungen, Ruf-Stufe).
import {
  ACCOUNT,
  CRATE_UNITS,
  EQUIPMENT,
  OFFICE_LEVELS,
  PRODUCT_IDS,
  PRODUCTS,
  REPUTATION_THRESHOLDS,
  ROOMS,
  WAREHOUSE,
  type EquipmentId,
  type ProductId,
} from '../data/balance';
import type { GameState, Ledger, Person } from './types';

export function levelForRevenue(total: number): number {
  let lvl = 1;
  for (let i = 1; i < REPUTATION_THRESHOLDS.length; i++) if (total >= REPUTATION_THRESHOLDS[i]) lvl = i + 1;
  return lvl;
}

/** Fortschritt zur nächsten Ruf-Stufe (0..1), 1 auf der höchsten Stufe */
export function levelProgress(s: GameState): number {
  const lvl = s.level;
  if (lvl >= REPUTATION_THRESHOLDS.length) return 1;
  const a = REPUTATION_THRESHOLDS[lvl - 1];
  const b = REPUTATION_THRESHOLDS[lvl];
  return Math.max(0, Math.min(1, (s.totalRevenue - a) / (b - a)));
}

export function isProductUnlocked(s: GameState, p: ProductId): boolean {
  const def = PRODUCTS[p];
  if (s.level < def.level) return false;
  if (def.licenseCost > 0 && !s.inventory[`license:${p}`]) return false;
  return true;
}

export function unlockedProducts(s: GameState): ProductId[] {
  return PRODUCT_IDS.filter((p) => isProductUnlocked(s, p));
}

function finishedRooms(s: GameState) {
  return s.warehouse.rooms.filter((r) => r.buildTicks === 0);
}

export function shelfCapacity(s: GameState): number {
  let n = 0;
  for (const r of finishedRooms(s)) if (r.type === 'shelf') n += ROOMS.shelf.crates;
  return n;
}

export function coldCapacity(s: GameState): number {
  let n = 0;
  for (const r of finishedRooms(s)) if (r.type === 'coldroom') n += ROOMS.coldroom.crates;
  return n;
}

export function totalCapacity(s: GameState): number {
  return shelfCapacity(s) + coldCapacity(s);
}

export function hasRoom(s: GameState, type: 'ramp' | 'radio'): boolean {
  return finishedRooms(s).some((r) => r.type === type);
}

export function officeLevel(s: GameState): number {
  const o = s.warehouse.rooms.find((r) => r.type === 'office');
  return o ? o.level : 1;
}

export function staffLimit(s: GameState): number {
  return OFFICE_LEVELS[officeLevel(s) - 1].staff;
}

export function pendingCrates(s: GameState): number {
  let n = 0;
  for (const o of s.orders) for (const l of o.lines) n += l.crates;
  return n;
}

/** Freier Lagerplatz in Kisten, abzüglich bereits bestellter Ware */
export function freeSpace(s: GameState): number {
  return Math.max(0, totalCapacity(s) - s.crates.length - pendingCrates(s));
}

export function stockUnits(s: GameState, p?: ProductId): number {
  let n = 0;
  for (const c of s.crates) if (!p || c.product === p) n += c.units;
  return n;
}

export function cargoUnits(p: Person): number {
  let n = 0;
  for (const c of p.cargo) n += c.units;
  return n;
}

export function capacityOf(p: Person): number {
  return EQUIPMENT[p.equipment].capacity;
}

export function canSpend(s: GameState, amount: number): boolean {
  return s.money - amount >= ACCOUNT.overdraftLimit;
}

export function profitToday(l: Ledger): number {
  return l.sales + l.refunds - l.purchases - l.wages - l.running - l.fines - l.investments;
}

export function emptyLedger(): Ledger {
  return { sales: 0, refunds: 0, purchases: 0, wages: 0, running: 0, fines: 0, investments: 0 };
}

export function equipmentOwned(s: GameState, id: EquipmentId): number {
  let n = s.inventory[id] ?? 0;
  for (const p of s.staff) if (p.equipment === id) n++;
  return n;
}

export function freeSlots(s: GameState): number[] {
  const used = new Set(s.warehouse.rooms.map((r) => r.slot));
  const res: number[] = [];
  for (let i = 0; i < s.warehouse.sections * WAREHOUSE.slotsPerSection; i++) if (!used.has(i)) res.push(i);
  return res;
}

export function crateValue(units: number, p: ProductId): number {
  return units * PRODUCTS[p].buy;
}

export const UNITS_PER_CRATE = CRATE_UNITS;
