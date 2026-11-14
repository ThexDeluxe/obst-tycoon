// Tagesbeginn und Tagesabschluss mit Bericht.
import {
  ACCOUNT,
  COMPETITOR_WEEKLY_GROWTH,
  DISTRICT_IDS,
  DISTRICTS,
  EQUIPMENT,
  EQUIPMENT_IDS,
  ROOMS,
  WAREHOUSE,
} from '../data/balance';
import { driftMarket, deliverOrders, removeSpoiled } from './economy';
import { emptyLedger, profitToday } from './selectors';
import { generateApplicants } from './staff';
import { weekdayFactor } from './time';
import type { DayReport, GameState } from './types';
import { sendEveryoneHome } from './vendors';
import type { World } from './world';

export const REPORT_HISTORY = 30;

/** Umsatz der festen Konkurrenz in einem Viertel an einem Tag */
export function competitorRevenue(day: number, districtIndex: number): number {
  const d = DISTRICT_IDS[districtIndex];
  const weeks = Math.floor(day / 7);
  return DISTRICTS[d].competitorRevenue * Math.pow(1 + COMPETITOR_WEEKLY_GROWTH, weeks) * weekdayFactor(d, day);
}

export function runningCosts(s: GameState): number {
  let c = WAREHOUSE.baseUpkeep + WAREHOUSE.sectionUpkeep * (s.warehouse.sections - 1);
  for (const r of s.warehouse.rooms) if (r.buildTicks === 0) c += ROOMS[r.type].upkeep;
  for (const id of EQUIPMENT_IDS) {
    const owned = (s.inventory[id] ?? 0) + s.staff.filter((p) => p.equipment === id).length;
    c += owned * EQUIPMENT[id].upkeep;
  }
  return c;
}

export function wagesDue(s: GameState): number {
  let w = s.pendingWages;
  for (const p of s.staff) w += p.wage;
  return w;
}

/** Bauten, die noch laufen, werden über Nacht fertig. */
export function finishConstructionOvernight(s: GameState): void {
  for (const r of s.warehouse.rooms) {
    if (r.buildTicks <= 0) continue;
    r.buildTicks = 0;
    if (r.type === 'office') r.level++;
  }
}

/** Tagesabschluss um 22:00 */
export function closeDay(s: GameState, world: World): DayReport {
  sendEveryoneHome(s, world);
  finishConstructionOvernight(s);
  const spoiled = removeSpoiled(s);
  s.stats.spoiledValue += spoiled.value;

  const wages = wagesDue(s);
  s.money -= wages;
  s.ledger.wages += wages;
  s.pendingWages = 0;

  let running = runningCosts(s);
  if (s.money < 0) {
    // Dispozinsen zählen zu den laufenden Kosten
    const interest = -s.money * ACCOUNT.overdraftInterest;
    running += interest;
    s.dayEvents.push(`Dispozinsen: ${interest.toFixed(2).replace('.', ',')} €.`);
  }
  s.money -= running;
  s.ledger.running += running;

  const districts = DISTRICT_IDS.map((_, i) => {
    const own = s.districtDay[i].revenue;
    const competitor = competitorRevenue(s.day, i);
    const share = own + competitor > 0 ? own / (own + competitor) : 0;
    return { revenue: own, competitor, share, attention: 0 };
  });
  s.shares = districts.map((d) => d.share);

  if (spoiled.units > 0) s.dayEvents.push(`${spoiled.units} Einheiten verdorbene Ware entsorgt.`);
  if (s.money < ACCOUNT.overdraftLimit) {
    s.insolvencyStreak++;
    s.dayEvents.push(`Kontostand unter dem Dispositionsrahmen (${s.insolvencyStreak}. Tag in Folge).`);
  } else s.insolvencyStreak = 0;

  const report: DayReport = {
    day: s.day,
    ledger: { ...s.ledger },
    net: profitToday(s.ledger),
    moneyEnd: s.money,
    spoiledValue: spoiled.value,
    spoiledUnits: spoiled.units,
    districts,
    vendors: s.staff.map((p) => ({ id: p.id, name: p.name, revenue: p.revenueToday, units: p.unitsToday })),
    events: [...s.dayEvents],
  };
  s.reports.push(report);
  if (s.reports.length > REPORT_HISTORY) s.reports.splice(0, s.reports.length - REPORT_HISTORY);
  s.stats.daysPlayed++;
  driftMarket(s);
  return report;
}

/** Beginn eines neuen Tages um 06:00: Lieferung, Bewerber, Zähler zurücksetzen */
export function openDay(s: GameState): void {
  s.ledger = emptyLedger();
  s.dayEvents = [];
  s.districtDay = DISTRICT_IDS.map(() => ({ revenue: 0, units: 0 }));
  for (const p of s.staff) {
    p.revenueToday = 0;
    p.unitsToday = 0;
  }
  generateApplicants(s);
}

export function deliverDue(s: GameState): number {
  const notes: string[] = [];
  const r = deliverOrders(s, notes);
  for (const n of notes) s.dayEvents.push(n);
  return r.crates;
}
