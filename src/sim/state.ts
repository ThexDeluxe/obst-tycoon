// Anlegen eines neuen Spielstands.
import { ACCOUNT, CRATE_UNITS, DISTRICT_IDS, PRICING, PRODUCT_IDS, type ProductId } from '../data/balance';
import { initAmbient } from './ambient';
import { assignCooling } from './economy';
import { seedState } from './rng';
import { emptyLedger } from './selectors';
import { generateApplicants, starterVendor } from './staff';
import type { GameState } from './types';
import type { World } from './world';

export const STATE_VERSION = 2;

export interface NewGameOptions {
  seed?: number;
  ambient?: boolean;
}

function perProduct(v: number): Record<ProductId, number> {
  const r = {} as Record<ProductId, number>;
  for (const p of PRODUCT_IDS) r[p] = v;
  return r;
}

/** Setzt die Wirtschaftsdaten eines neuen Spiels (auch für die Migration von Version 1). */
export function initEconomy(state: GameState, world: World): void {
  state.money = ACCOUNT.startMoney;
  state.totalRevenue = 0;
  state.level = 1;
  state.ledger = emptyLedger();
  state.crates = [];
  for (const s of ACCOUNT.startStock) {
    for (let i = 0; i < s.crates; i++) state.crates.push({ id: state.nextId++, product: s.product, units: CRATE_UNITS, fresh: 1, cooled: false });
  }
  state.marketFactors = perProduct(1);
  state.priceFactors = perProduct(PRICING.factorDefault);
  state.orders = [];
  state.staff = [];
  state.applicants = [];
  state.inventory = {};
  state.pendingWages = 0;
  state.districtDay = DISTRICT_IDS.map(() => ({ revenue: 0, units: 0 }));
  state.shares = DISTRICT_IDS.map(() => 0);
  state.reports = [];
  state.dayEvents = [];
  state.insolvencyStreak = 0;
  state.stats = { spoiledValue: 0, daysPlayed: 0 };
  starterVendor(state, world);
  generateApplicants(state);
  assignCooling(state);
}

export function createInitialState(world: World, opts: NewGameOptions = {}): GameState {
  const seed = opts.seed ?? 20261114;
  const state = {
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
  } as unknown as GameState;
  initEconomy(state, world);
  initAmbient(state, world);
  return state;
}
