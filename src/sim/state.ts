// Anlegen eines neuen Spielstands.
import { initAmbient } from './ambient';
import { seedState } from './rng';
import type { GameState } from './types';
import type { World } from './world';

export const STATE_VERSION = 1;

export interface NewGameOptions {
  seed?: number;
  ambient?: boolean;
}

export function createInitialState(world: World, opts: NewGameOptions = {}): GameState {
  const seed = opts.seed ?? 20261114;
  const state: GameState = {
    version: STATE_VERSION,
    seed,
    rng: seedState(seed),
    ambientRng: seedState(seed * 31 + 7),
    day: 0,
    dayTick: 0,
    totalTicks: 0,
    phase: 'day',
    nextId: 1,
    ambient: opts.ambient ?? true,
    peds: [],
    vehicles: [],
    ambientTimer: 0,
    warehouse: {
      sections: 1,
      rooms: [
        { slot: 0, type: 'office', level: 1, buildTicks: 0 },
        { slot: 1, type: 'shelf', level: 1, buildTicks: 0 },
      ],
    },
    queue: [],
    messages: [],
  };
  initAmbient(state, world);
  return state;
}
