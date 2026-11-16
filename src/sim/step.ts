// Ein Simulationsschritt (Tick). Systeme sind Funktionen, die den Zustand fortschreiben.
import { DISTRICT_IDS, DISTRICTS, STOCK, TICKS_PER_DAY, TICKS_PER_HOUR } from '../data/balance';
import { attractCustomer, stepAmbient } from './ambient';
import { applyCommand, pushMessage, type Command } from './commands';
import { stepDealers } from './dealers';
import { plannedDeliveries, startDelivery, stepDelivery, type DeliveryEvents } from './delivery';
import { assignCooling, dayEstimate, disposeSpoiled, emptyCounts, stepFreshness, trackAvailability } from './stock';
import { stepSales, type SaleEvent } from './sales';
import { checkStory } from './story';
import type { Cue, GameState } from './types';
import type { World } from './world';

export { pushMessage };

/** Ausgaben eines Ticks für die Darstellung (nicht Teil des Spielstands) */
export interface StepOutput {
  dayEnded: boolean;
  sales: SaleEvent[];
  delivery: DeliveryEvents;
  cues: Cue[];
}

export function createStepOutput(): StepOutput {
  return { dayEnded: false, sales: [], delivery: { arrived: false, unloaded: 0 }, cues: [] };
}

/** Morgens um 06:00: Lieferwagen mit Rückstand und Daueraufträgen */
export function startMorning(s: GameState): void {
  startDelivery(s, plannedDeliveries(s));
}

/** Tagesabschluss um 22:00 und Beginn des nächsten Tages: Verderb, Bilanz, die Gang erholt sich */
function newDay(s: GameState, out: StepOutput): void {
  // Eine Lieferung, die noch läuft, wird fertig abgeladen
  while (s.delivery) stepDelivery(s, out.delivery, pushMessage);
  const spoiled = disposeSpoiled(s);
  s.spoiledToday += spoiled;
  s.history.push(Math.round(s.earnedToday));
  if (s.history.length > 14) s.history.splice(0, s.history.length - 14);
  s.salesDays.push(dayEstimate(s));
  if (s.salesDays.length > STOCK.rangeDays) s.salesDays.splice(0, s.salesDays.length - STOCK.rangeDays);
  const spoiledText = s.spoiledToday > 0 ? `, ${s.spoiledToday} ${s.spoiledToday === 1 ? 'Kiste' : 'Kisten'} verdorben` : '';
  pushMessage(
    s,
    'money',
    `Tag ${s.day + 1}: Einnahmen ${Math.round(s.earnedToday)} €, Ausgaben ${Math.round(s.spentToday)} €, Saldo ${Math.round(s.earnedToday - s.spentToday)} €${spoiledText}.`,
  );
  s.earnedToday = 0;
  s.spentToday = 0;
  s.spoiledToday = 0;
  s.kioskToday = 0;
  s.soldToday = emptyCounts();
  s.availToday = emptyCounts();
  s.districtSold = DISTRICT_IDS.map(() => emptyCounts());
  for (const d of s.dealers) {
    d.soldToday = 0;
    d.earnedToday = 0;
  }
  DISTRICT_IDS.forEach((id, i) => {
    const st = s.districts[i];
    if (st.owner === 'gang') st.gang = Math.min(DISTRICTS[id].garrison, st.gang + DISTRICTS[id].regenPerDay);
  });
  s.day++;
  s.dayTick = 0;
  out.dayEnded = true;
  startMorning(s);
}

function advance(s: GameState, world: World, out: StepOutput): void {
  s.dayTick++;
  s.totalTicks++;
  stepFreshness(s);
  stepDelivery(s, out.delivery, pushMessage);
  if (s.totalTicks % 50 === 0) assignCooling(s);
  if (s.totalTicks % 30 === 0) trackAvailability(s, 30);
  stepDealers(s, world);
  const before = out.sales.length;
  stepSales(s, world, out.sales);
  if (s.ambient) for (let i = before; i < out.sales.length; i++) attractCustomer(s, world, out.sales[i].spotTile);
  if (out.sales.length > 200) out.sales.splice(0, out.sales.length - 200);
  if (s.totalTicks % 5 === 0) checkStory(s, pushMessage);
  stepAmbient(s, world);
  if (s.dayTick >= TICKS_PER_DAY) newDay(s, out);
}

function runCommand(s: GameState, world: World, cmd: Command, out: StepOutput): void {
  if (cmd.type === 'debugSkipHours') {
    const ticks = Math.round(cmd.hours * TICKS_PER_HOUR);
    for (let i = 0; i < ticks && !isPaused(s); i++) advance(s, world, out);
    return;
  }
  applyCommand(s, world, cmd, (c) => out.cues.push(c));
  checkStory(s, pushMessage);
}

/** Während eines Würfelduells steht die Zeit still */
export function isPaused(s: GameState): boolean {
  return s.battle !== null;
}

/** Arbeitet die Befehle der Warteschlange ab, ohne die Zeit fortzuschreiben */
export function flushCommands(s: GameState, world: World, out: StepOutput): void {
  if (!s.queue.length) return;
  const cmds = s.queue.splice(0, s.queue.length);
  for (const c of cmds) runCommand(s, world, c, out);
}

/** Führt einen Tick aus. Befehle aus der Warteschlange werden zuerst abgearbeitet. */
export function step(s: GameState, world: World, out: StepOutput): void {
  flushCommands(s, world, out);
  if (isPaused(s)) return;
  advance(s, world, out);
}
