// Reichweite und Lagerampel: wie lange Bestand und feste Lieferungen beim jetzigen Verkauf reichen.
// Die Lieferungen der nächsten Tage zählen mit, sonst stünde die Ampel jeden Abend vor der
// Morgenlieferung auf Gelb oder Rot, obwohl die Verträge passen.
import { CRATE_UNITS, DAY_HOURS, FRUIT_IDS, STOCK, TIME, type FruitId } from '../data/balance';
import { incomingCrates } from './delivery';
import { dailySales, stockUnits } from './stock';
import { hourOf } from './time';
import type { GameState } from './types';

export type Ampel = 'green' | 'yellow' | 'red' | 'none';

export interface FruitRange {
  fruit: FruitId;
  /** Bestand in Stück (Lager, Verkäufer und Kisten, die gerade abgeladen werden) */
  units: number;
  /** verkaufte Stück pro Tag */
  perDay: number;
  /** Reichweite in Spieltagen ab jetzt (Infinity, wenn nichts verkauft wird) */
  days: number;
  /** Lieferungen in den nächsten Tagen (Kisten) */
  incoming: number;
}

/** So viele Tage schaut die Reichweite voraus */
const HORIZON_DAYS = 3;

/** Anteil des laufenden Verkaufstags, der schon vorbei ist */
function dayFraction(s: GameState): number {
  return Math.max(0, Math.min(1, (hourOf(s) - TIME.dayStartHour) / DAY_HOURS));
}

export function fruitRange(s: GameState, fruit: FruitId): FruitRange {
  let units = stockUnits(s, fruit);
  if (s.delivery) for (const c of s.delivery.queue) if (c.fruit === fruit) units += CRATE_UNITS;
  const perDay = dailySales(s, fruit);
  let incoming = 0;
  for (let k = 1; k <= HORIZON_DAYS; k++) incoming += incomingCrates(s, fruit, k);
  // Noch kein Verkauf gemessen: kein Engpass erkennbar
  if (perDay <= 0) return { fruit, units, perDay, days: units > 0 || incoming > 0 ? Infinity : 0, incoming };
  // Rest des laufenden Tages, danach jeden Morgen die Lieferung
  let stock = units;
  const rest = (1 - dayFraction(s)) * perDay;
  if (stock < rest) return { fruit, units, perDay, days: stock / perDay, incoming };
  stock -= rest;
  let t = rest / perDay;
  for (let k = 1; k <= HORIZON_DAYS; k++) {
    stock += incomingCrates(s, fruit, k) * CRATE_UNITS;
    if (stock < perDay) return { fruit, units, perDay, days: t + stock / perDay, incoming };
    stock -= perDay;
    t += 1;
  }
  return { fruit, units, perDay, days: t + stock / perDay, incoming };
}

export function ampelFor(days: number): Ampel {
  if (days >= STOCK.ampelGreen) return 'green';
  if (days >= STOCK.ampelYellow) return 'yellow';
  return 'red';
}

/** Lagerampel: kürzeste Reichweite aller Sorten, die vorrätig sind oder geliefert werden */
export function stockAmpel(s: GameState): { ampel: Ampel; range: FruitRange | null } {
  let worst: FruitRange | null = null;
  for (const f of FRUIT_IDS) {
    const r = fruitRange(s, f);
    if (r.units <= 0 && r.incoming <= 0) continue;
    if (!worst || r.days < worst.days) worst = r;
  }
  if (!worst) return { ampel: 'red', range: null };
  return { ampel: ampelFor(worst.days), range: worst };
}

/** Uhrzeit, bis zu der eine Sorte heute noch reicht, oder null, wenn sie den Tag übersteht */
export function runsOutAt(s: GameState, r: FruitRange): number | null {
  if (!Number.isFinite(r.days) || r.perDay <= 0) return null;
  const at = hourOf(s) + r.days * DAY_HOURS;
  return at < TIME.dayEndHour ? at : null;
}
