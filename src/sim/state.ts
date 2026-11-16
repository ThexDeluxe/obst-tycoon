// Anlegen eines neuen Spielstands.
import { DISTRICT_IDS, DISTRICTS, SALES_QUALITY, START, STOCK, WHOLESALER } from '../data/balance';
import { initAmbient } from './ambient';
import { createDealer } from './dealers';
import { seedState } from './rng';
import { emptyCounts } from './stock';
import type { GameState } from './types';
import type { World } from './world';

export const STATE_VERSION = 4;

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
    nextId: 1,
    ambient: opts.ambient ?? true,
    peds: [],
    vehicles: [],
    ambientTimer: 0,
    queue: [],
    messages: [],
    money: START.money,
    earnedTotal: 0,
    earnedToday: 0,
    history: [],
    crates: [],
    shelves: START.shelves,
    coldRoom: false,
    delivery: null,
    backlog: [],
    orders: emptyCounts(),
    kioskToday: 0,
    soldToday: emptyCounts(),
    salesDays: [],
    availToday: emptyCounts(),
    districtSold: DISTRICT_IDS.map(() => emptyCounts()),
    salesQuality: SALES_QUALITY.base,
    spentToday: 0,
    spoiledToday: 0,
    dealers: [],
    fighters: START.fighters,
    upgrade: 0,
    districts: DISTRICT_IDS.map((d) =>
      d === START.district ? { owner: 'player', gang: 0 } : { owner: 'gang', gang: DISTRICTS[d].garrison },
    ),
    battle: null,
    story: 0,
    won: false,
    stats: { cratesBought: 0, sold: 0, battlesWon: 0, battlesLost: 0, fightersLost: 0, gangDefeated: 0 },
  };
  for (let i = 0; i < START.dealers; i++) createDealer(state, world);
  for (const sc of STOCK.startCrates) {
    for (let i = 0; i < sc.crates; i++) state.crates.push({ id: state.nextId++, fruit: sc.fruit, fresh: 1, quality: WHOLESALER.quality, cooled: false });
  }
  initAmbient(state, world);
  return state;
}
