// Ein Simulationsschritt (Tick). Systeme sind Funktionen, die den Zustand fortschreiben.
import { TICKS_PER_DAY, TICKS_PER_HOUR } from '../data/balance';
import { initAmbient, stepAmbient } from './ambient';
import type { Command } from './commands';
import type { GameState, MessageKind } from './types';
import type { World } from './world';

/** Ausgaben eines Ticks für die Darstellung (nicht Teil des Spielstands) */
export interface StepOutput {
  dayEnded: boolean;
}

export function createStepOutput(): StepOutput {
  return { dayEnded: false };
}

export function pushMessage(state: GameState, kind: MessageKind, text: string, x?: number, y?: number): void {
  state.messages.push({ id: state.nextId++, day: state.day, dayTick: state.dayTick, kind, text, x, y });
  if (state.messages.length > 60) state.messages.splice(0, state.messages.length - 60);
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
  }
}

function startDay(state: GameState, world: World): void {
  state.day++;
  state.dayTick = 0;
  state.phase = 'day';
  initAmbient(state, world);
}

function endDay(state: GameState, _world: World, out: StepOutput): void {
  state.phase = 'dayEnd';
  out.dayEnded = true;
  pushMessage(state, 'report', `Tagesabschluss für Tag ${state.day + 1}.`);
}

function advance(state: GameState, world: World, out: StepOutput): void {
  state.dayTick++;
  state.totalTicks++;
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
