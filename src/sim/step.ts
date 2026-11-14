// Ein Simulationsschritt (Tick). Systeme sind Funktionen, die den Zustand fortschreiben.
import { TICKS_PER_DAY, TICKS_PER_HOUR } from '../data/balance';
import { ROMAN, ROOM_NAMES } from '../data/names';
import { attractCustomer, initAmbient, stepAmbient } from './ambient';
import { applyEconomyCommand, checkLevel, pushMessage, type Command } from './commands';
import { closeDay, deliverDue, openDay } from './day';
import { assignCooling, stepFreshness } from './economy';
import { stepSales, type SaleEvent } from './sales';
import type { GameState } from './types';
import { stepVendors } from './vendors';
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

function applyCommand(state: GameState, world: World, cmd: Command, out: StepOutput): void {
  switch (cmd.type) {
    case 'nextDay':
      if (state.phase === 'dayEnd') startDay(state, world);
      break;
    case 'debugSkipHours': {
      const target = Math.min(TICKS_PER_DAY, state.dayTick + Math.round(cmd.hours * TICKS_PER_HOUR));
      while (state.phase === 'day' && state.dayTick < target) advance(state, world, out);
      break;
    }
    default:
      applyEconomyCommand(state, world, cmd);
  }
}

function startDay(state: GameState, world: World): void {
  state.day++;
  state.dayTick = 0;
  state.phase = 'day';
  openDay(state);
  const n = deliverDue(state);
  if (n > 0) {
    pushMessage(state, 'delivery', `Lieferung vom Großmarkt: ${n} Kisten eingelagert.`, world.warehouse.doorX, world.warehouse.doorY);
  }
  initAmbient(state, world);
}

function endDay(state: GameState, world: World, out: StepOutput): void {
  closeDay(state, world);
  state.phase = 'dayEnd';
  out.dayEnded = true;
  pushMessage(state, 'report', `Tagesabschluss für Tag ${state.day + 1}.`);
}

function stepConstruction(state: GameState, world: World): void {
  for (const r of state.warehouse.rooms) {
    if (r.buildTicks <= 0) continue;
    if (--r.buildTicks > 0) continue;
    if (r.type === 'office') {
      r.level++;
      pushMessage(state, 'info', `Büro ${ROMAN[r.level - 1]} fertiggestellt.`, world.warehouse.doorX, world.warehouse.doorY);
    } else {
      pushMessage(state, 'info', `${ROOM_NAMES[r.type]} fertiggestellt.`, world.warehouse.doorX, world.warehouse.doorY);
    }
    assignCooling(state);
  }
}

function advance(state: GameState, world: World, out: StepOutput): void {
  state.dayTick++;
  state.totalTicks++;
  if (state.orders.length) {
    const n = deliverDue(state);
    if (n > 0) pushMessage(state, 'delivery', `Lieferung vom Großmarkt: ${n} Kisten eingelagert.`, world.warehouse.doorX, world.warehouse.doorY);
  }
  stepConstruction(state, world);
  stepFreshness(state);
  stepVendors(state, world);
  const before = out.sales.length;
  stepSales(state, world, out.sales);
  if (state.ambient) for (let i = before; i < out.sales.length; i++) attractCustomer(state, world, out.sales[i].spotTile);
  if (out.sales.length > 200) out.sales.splice(0, out.sales.length - 200);
  checkLevel(state);
  stepAmbient(state, world);
  if (state.dayTick >= TICKS_PER_DAY) endDay(state, world, out);
}

/** Arbeitet die Befehle der Warteschlange ab, ohne die Zeit fortzuschreiben (Pause, Tagesabschluss). */
export function flushCommands(state: GameState, world: World, out: StepOutput): void {
  if (!state.queue.length) return;
  const cmds = state.queue.splice(0, state.queue.length);
  for (const c of cmds) applyCommand(state, world, c, out);
}

/** Führt einen Tick aus. Befehle aus der Warteschlange werden zuerst abgearbeitet. */
export function step(state: GameState, world: World, out: StepOutput): void {
  flushCommands(state, world, out);
  if (state.phase !== 'day') return;
  advance(state, world, out);
}
