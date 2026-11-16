// Abgeleitete Werte aus dem Spielstand: Preise, Kapazitäten, Freischaltungen.
import {
  DEALERS,
  DISTRICT_IDS,
  FARMS,
  FIGHTERS,
  FRUIT_IDS,
  SHELVES,
  START,
  UPGRADES,
  type DistrictId,
  type FruitId,
} from '../data/balance';
import type { GameState } from './types';
import type { World } from './world';

/** Rundet einen Preis auf volle 5 € */
export function roundPrice(v: number): number {
  return Math.round(v / 5) * 5;
}

export function dealerCost(s: GameState): number {
  const n = Math.max(1, s.dealers.length);
  return roundPrice(DEALERS.baseCost * Math.pow(DEALERS.costGrowth, n - 1));
}

export function shelfCost(s: GameState): number {
  return roundPrice(SHELVES.baseCost * Math.pow(SHELVES.costGrowth, Math.max(0, s.shelves - START.shelves)));
}

export function fighterCost(s: GameState): number {
  return FIGHTERS.baseCost + FIGHTERS.costPerOwned * s.fighters;
}

export function capacity(s: GameState): number {
  return s.shelves * SHELVES.cratesPerShelf;
}

export function maxShelves(world: World): number {
  return world.warehouse.shelfSlots.length;
}

export function isOwned(s: GameState, district: number): boolean {
  return s.districts[district]?.owner === 'player';
}

export function districtIndex(id: DistrictId): number {
  return DISTRICT_IDS.indexOf(id);
}

/** Viertel, das man angreifen kann: in Gang-Hand und Nachbar eines eigenen Viertels */
export function isAttackable(s: GameState, world: World, district: number): boolean {
  if (isOwned(s, district)) return false;
  for (let i = 0; i < s.districts.length; i++) if (isOwned(s, i) && world.links[i][district]) return true;
  return false;
}

export function ownedCount(s: GameState): number {
  return s.districts.filter((d) => d.owner === 'player').length;
}

/** Sorten, die ein freier oder eigener Hof anbaut (Kiosk und Verträge) */
export function isFruitAvailable(s: GameState, f: FruitId): boolean {
  return FARMS.some((def, i) => def.fruits.includes(f) && s.farms[i]?.owner !== 'gang');
}

export function availableFruits(s: GameState): FruitId[] {
  return FRUIT_IDS.filter((f) => isFruitAvailable(s, f));
}

/** So viele Verkäufer finden in den eigenen Vierteln einen Platz */
export function spotCapacity(s: GameState, world: World): number {
  let n = 0;
  for (const spot of world.spots) if (isOwned(s, spot.districtIndex)) n += DEALERS.maxPerSpot;
  return n;
}

/** Kisten, die ein Verkäufer auf einmal trägt */
export function carryCrates(s: GameState): number {
  return s.upgrade > 0 ? UPGRADES[s.upgrade - 1].crates : DEALERS.crates;
}

export function dealerSpeed(s: GameState): number {
  return s.upgrade > 0 ? UPGRADES[s.upgrade - 1].speed : DEALERS.speed;
}

/** Nächste kaufbare Ausrüstung oder null */
export function nextUpgrade(s: GameState) {
  return UPGRADES[s.upgrade] ?? null;
}

export function countCrates(s: GameState, f?: FruitId): number {
  if (!f) return s.crates.length;
  let n = 0;
  for (const c of s.crates) if (c.fruit === f) n++;
  return n;
}
