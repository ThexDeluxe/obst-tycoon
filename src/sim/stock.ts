// Lagerbestand: Frische und Verderb, Kühlung, Tagesbedarf mit Sättigung und Aufpreis, Reichweite und Lagerampel.
import {
  CRATE_UNITS,
  DISTRICT_IDS,
  DISTRICT_PREFS,
  FRUIT_IDS,
  FRUITS,
  SATURATION,
  STOCK,
  TICKS_PER_DAY,
  TICKS_PER_HOUR,
  TIME,
  type DistrictId,
  type FruitId,
} from '../data/balance';
import { capacity } from './selectors';
import type { FruitCounts, GameState } from './types';
import type { World } from './world';

export function emptyCounts(): FruitCounts {
  const c = {} as FruitCounts;
  for (const f of FRUIT_IDS) c[f] = 0;
  return c;
}

/** Faktor der Qualität (Sterne) auf Haltbarkeit und Preis */
export function qualityFactor(quality: number): number {
  return 1 + STOCK.qualityStep * (quality - 2);
}

/** Frischeverlust pro Tick */
export function decayPerTick(fruit: FruitId, cooled: boolean, quality: number): number {
  const def = FRUITS[fruit];
  const days = (cooled && def.cooledDays !== null ? def.cooledDays : def.shelfDays) * qualityFactor(quality);
  return 1 / (days * TICKS_PER_DAY);
}

export function stepFreshness(s: GameState, ticks = 1): void {
  for (const c of s.crates) if (c.fresh > 0) c.fresh = Math.max(0, c.fresh - decayPerTick(c.fruit, c.cooled, c.quality) * ticks);
  for (const d of s.dealers) for (const l of d.load) if (l.fresh > 0) l.fresh = Math.max(0, l.fresh - decayPerTick(l.fruit, false, l.quality) * ticks);
}

export function freshnessPriceFactor(fresh: number): number {
  return fresh < STOCK.lowFreshness ? STOCK.lowFreshnessPrice : 1;
}

/** Kühlplätze automatisch mit den verderblichsten kühlbaren Sorten belegen (innerhalb einer Sorte die ältesten) */
export function assignCooling(s: GameState): void {
  const cap = s.coldRoom ? STOCK.coldRoomCrates : 0;
  const coolable = s.crates.filter((c) => FRUITS[c.fruit].cooledDays !== null && c.fresh > 0);
  coolable.sort((a, b) => FRUITS[a.fruit].shelfDays - FRUITS[b.fruit].shelfDays || a.fresh - b.fresh || a.id - b.id);
  const chosen = new Set<number>();
  for (let i = 0; i < coolable.length && chosen.size < cap; i++) chosen.add(coolable[i].id);
  for (const c of s.crates) c.cooled = chosen.has(c.id);
}

export function hasSpace(s: GameState): boolean {
  return s.crates.length < capacity(s);
}

/** Legt eine Kiste ins Lager. Liefert false, wenn kein Platz ist. */
export function storeCrate(s: GameState, fruit: FruitId, quality: number, fresh = 1): boolean {
  if (!hasSpace(s)) return false;
  s.crates.push({ id: s.nextId++, fruit, fresh, quality, cooled: false });
  return true;
}

/** Nimmt die älteste Kiste einer Sorte aus dem Lager */
export function takeOldest(s: GameState, fruit: FruitId): { fresh: number; quality: number } | null {
  let best = -1;
  for (let i = 0; i < s.crates.length; i++) {
    const c = s.crates[i];
    if (c.fruit !== fruit || c.fresh <= 0) continue;
    if (best < 0 || c.fresh < s.crates[best].fresh) best = i;
  }
  if (best < 0) return null;
  const [c] = s.crates.splice(best, 1);
  return { fresh: c.fresh, quality: c.quality };
}

/** Entfernt verdorbene Ware (Lager und Verkäufer) und liefert die Zahl der Kisten */
export function disposeSpoiled(s: GameState): number {
  const before = s.crates.length;
  s.crates = s.crates.filter((c) => c.fresh > 0);
  let units = 0;
  for (const d of s.dealers) {
    for (const l of d.load) if (l.fresh <= 0) units += l.units;
    d.load = d.load.filter((l) => l.fresh > 0);
  }
  return before - s.crates.length + Math.round(units / CRATE_UNITS);
}

// ---------------------------------------------------------------------------
// Tagesbedarf, Sättigung und Aufpreis
// ---------------------------------------------------------------------------

const demandCache = new WeakMap<World, number[][]>();

/** Tagesbedarf eines Viertels je Sorte in Stück */
export function dailyDemand(world: World, district: number, fruit: FruitId): number {
  let table = demandCache.get(world);
  if (!table) {
    table = DISTRICT_IDS.map((d, i) => {
      const spots = world.spots.filter((sp) => sp.districtIndex === i).length;
      const prefs = DISTRICT_PREFS[d];
      let sum = 0;
      for (const f of FRUIT_IDS) sum += prefs[f];
      return FRUIT_IDS.map((f) => (SATURATION.demandPerSpot * spots * prefs[f]) / sum);
    });
    demandCache.set(world, table);
  }
  return table[district][FRUIT_IDS.indexOf(fruit)];
}

/** Verkaufte Menge im Verhältnis zum Tagesbedarf (0 = nichts verkauft, 1 = Bedarf gedeckt) */
export function demandRatio(s: GameState, world: World, district: number, fruit: FruitId, extra = 0): number {
  const dem = dailyDemand(world, district, fruit);
  if (dem <= 0) return Infinity;
  return (s.districtSold[district][fruit] + extra) / dem;
}

/** Anteil des Tagesbedarfs, der heute noch offen ist (0..1) */
export function openDemand(s: GameState, world: World, district: number, fruit: FruitId, extra = 0): number {
  return Math.max(0, Math.min(1, 1 - demandRatio(s, world, district, fruit, extra)));
}

/** Aufpreis, solange ein Viertel heute noch wenig von einer Sorte bekommen hat */
export function premiumFactor(open: number): number {
  return 1 + (SATURATION.premiumMax - 1) * open;
}

/**
 * Kaufbereitschaft nach Sättigung: bis zum Tagesbedarf voll, danach nur noch ein Viertel,
 * das bis zur Obergrenze (Bedarf plus Überhang) auf null sinkt.
 */
export function saturationFactor(ratio: number): number {
  if (ratio < 1) return 1;
  return Math.max(0, SATURATION.saturatedFactor * (1 - (ratio - 1) / SATURATION.overflow));
}

export function districtPrefs(id: DistrictId): Record<FruitId, number> {
  return DISTRICT_PREFS[id];
}

// ---------------------------------------------------------------------------
// Bestand und Verkauf je Sorte (Grundlage für Reichweite und Lagerampel in supply.ts)
// ---------------------------------------------------------------------------

/** Bestand einer Sorte in Stück (Lager und bei den Verkäufern) */
export function stockUnits(s: GameState, fruit: FruitId): number {
  let n = 0;
  for (const c of s.crates) if (c.fruit === fruit && c.fresh > 0) n += CRATE_UNITS;
  for (const d of s.dealers) for (const l of d.load) if (l.fruit === fruit) n += l.units;
  return n;
}

/** Zählt, wie lange heute Ware jeder Sorte vorrätig war (für die Hochrechnung des Verkaufs) */
export function trackAvailability(s: GameState, ticks: number): void {
  for (const f of FRUIT_IDS) if (stockUnits(s, f) > 0) s.availToday[f] += ticks;
}

/** Tagesverkauf hochgerechnet auf einen ganzen Tag mit Ware (Ausverkauf am Mittag zählt nicht als geringe Nachfrage) */
export function dayEstimate(s: GameState): FruitCounts {
  const est = emptyCounts();
  for (const f of FRUIT_IDS) {
    const frac = Math.max(STOCK.minAvailShare, Math.min(1, s.availToday[f] / TICKS_PER_DAY));
    est[f] = Math.round(s.soldToday[f] / frac);
  }
  return est;
}

/** Verkaufte Stück pro Tag: Mittel der letzten Tage, bei schnellerem Verkauf die Hochrechnung von heute */
export function dailySales(s: GameState, fruit: FruitId): number {
  const days = s.salesDays.slice(-STOCK.rangeDays);
  const hours = s.availToday[fruit] / TICKS_PER_HOUR;
  // Hochrechnung erst nach einigen Stunden mit Ware, sonst schlagen Stoßzeiten zu stark durch
  const today = hours >= STOCK.extrapolateAfterHours ? (s.soldToday[fruit] / hours) * (TIME.dayEndHour - TIME.dayStartHour) : 0;
  if (!days.length) return today;
  let sum = 0;
  for (const d of days) sum += d[fruit];
  return Math.max(sum / days.length, today);
}
