// Ein Simulationsschritt (Tick). Systeme sind Funktionen, die den Zustand fortschreiben.
import { DISTRICT_IDS, DISTRICTS, TICKS_PER_DAY, TICKS_PER_HOUR } from '../data/balance';
import { attractCustomer, stepAmbient } from './ambient';
import { applyCommand, pushMessage, type Command } from './commands';
import { stepDealers } from './dealers';
import { stepSales, type SaleEvent } from './sales';
import { checkStory } from './story';
import type { GameState } from './types';
import type { World } from './world';

export { pushMessage };

/** Ausgaben eines Ticks für die Darstellung (nicht Teil des Spielstands) */
export interface StepOutput {
  dayEnded: boolean;
  sales: SaleEvent[];
}

export function createStepOutput(): StepOutput {
  return { dayEnded: false, sales: [] };
}

/** Tageswechsel: Bilanz, die Gang erholt sich */
function newDay(s: GameState, out: StepOutput): void {
  s.history.push(Math.round(s.earnedToday));
  if (s.history.length > 14) s.history.splice(0, s.history.length - 14);
  pushMessage(s, 'money', `Tag ${s.day + 1} beendet: ${Math.round(s.earnedToday)} € eingenommen.`);
  s.earnedToday = 0;
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
}

function advance(s: GameState, world: World, out: StepOutput): void {
  s.dayTick++;
  s.totalTicks++;
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
  applyCommand(s, world, cmd);
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
