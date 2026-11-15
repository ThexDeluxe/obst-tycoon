// Hilfsfunktionen rund um die Spielzeit.
import { DISTRICTS, HOUR_BLEND, RUSH_FACTOR, TICKS_PER_HOUR, TIME, type DistrictId } from '../data/balance';

export interface TimeHolder {
  day: number;
  dayTick: number;
}

/** Uhrzeit als Kommazahl in Stunden (6,0 bis 22,0) */
export function hourOf(s: TimeHolder): number {
  return TIME.dayStartHour + s.dayTick / TICKS_PER_HOUR;
}

export function clockText(s: TimeHolder): string {
  const h = hourOf(s);
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

/** Ticks seit 06:00 für eine Uhrzeit in Stunden */
export function tickAtHour(hour: number): number {
  return Math.round((hour - TIME.dayStartHour) * TICKS_PER_HOUR);
}

function hourValue(d: DistrictId, hour: number): number {
  const def = DISTRICTS[d];
  for (const [a, b] of def.rush) if (hour >= a && hour < b) return def.customers * RUSH_FACTOR;
  return def.customers;
}

function smooth(k: number): number {
  return k * k * (3 - 2 * k);
}

/**
 * Kaufinteressenten pro Spielstunde und Verkaufsplatz.
 * An den Stundengrenzen gehen die Werte weich ineinander über.
 */
export function customersPerHour(d: DistrictId, hour: number): number {
  const i = Math.floor(hour);
  const f = hour - i;
  const half = HOUR_BLEND / 2;
  if (f < half) {
    const k = 0.5 + f / HOUR_BLEND;
    const a = hourValue(d, i - 1);
    const b = hourValue(d, i);
    return a + (b - a) * smooth(k);
  }
  if (f > 1 - half) {
    const k = (f - (1 - half)) / HOUR_BLEND;
    const a = hourValue(d, i);
    const b = hourValue(d, i + 1);
    return a + (b - a) * smooth(k);
  }
  return hourValue(d, i);
}

/** Höchste Kundschaft eines Viertels (in der Stoßzeit) */
export function peakCustomers(d: DistrictId): number {
  return DISTRICTS[d].customers * RUSH_FACTOR;
}
