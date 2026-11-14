// Hilfsfunktionen rund um die Spielzeit.
import { DISTRICTS, SALES, TICKS_PER_HOUR, TIME, type DistrictId } from '../data/balance';

export const WEEKDAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
export const WEEKDAYS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export interface TimeHolder {
  day: number;
  dayTick: number;
}

/** Uhrzeit als Kommazahl in Stunden (6,0 bis 22,0) */
export function hourOf(s: TimeHolder): number {
  return TIME.dayStartHour + s.dayTick / TICKS_PER_HOUR;
}

export function weekdayOf(day: number): number {
  return day % 7;
}

export function isWeekend(day: number): boolean {
  return weekdayOf(day) >= 5;
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
  for (const [a, b] of def.peakHours) if (hour >= a && hour < b) return def.peak;
  return def.normal;
}

function smooth(k: number): number {
  return k * k * (3 - 2 * k);
}

/**
 * Kaufinteressenten pro Stunde und Platz (vor Platz- und Wochentagsfaktor).
 * An den Stundengrenzen gehen die Werte weich ineinander über.
 */
export function demandCurve(d: DistrictId, hour: number): number {
  const i = Math.floor(hour);
  const f = hour - i;
  const blend = SALES.hourBlend;
  const half = blend / 2;
  if (f < half) {
    const k = 0.5 + f / blend;
    const a = hourValue(d, i - 1);
    const b = hourValue(d, i);
    return a + (b - a) * smooth(k);
  }
  if (f > 1 - half) {
    const k = (f - (1 - half)) / blend;
    const a = hourValue(d, i);
    const b = hourValue(d, i + 1);
    return a + (b - a) * smooth(k);
  }
  return hourValue(d, i);
}

export function weekdayFactor(d: DistrictId, day: number): number {
  return isWeekend(day) ? TIME.weekendFactor[d] : 1;
}

export function dateText(day: number): string {
  return `${WEEKDAYS[weekdayOf(day)]}, Tag ${day + 1}`;
}
