import { describe, expect, it } from 'vitest';
import { PRICING, PRODUCTS, SALES, STAFF, TICKS_PER_HOUR } from '../src/data/balance';
import { enqueue } from '../src/sim/commands';
import { interestedPerHour, priceEffect, serveCustomer, stepSales, unitPrice } from '../src/sim/sales';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import { tickAtHour } from '../src/sim/time';
import type { GameState } from '../src/sim/types';
import { createWorld } from '../src/sim/world';

const world = createWorld();
const out = createStepOutput();

function sellingAt(spotIndex: number, seed = 1): GameState {
  const s = createInitialState(world, { seed, ambient: false });
  const v = s.staff[0];
  v.mode = 'selling';
  v.spot = spotIndex;
  v.activeSpot = spotIndex;
  v.cargo = [
    { product: 'apple', units: 100000, fresh: 1 },
    { product: 'banana', units: 100000, fresh: 1 },
  ];
  return s;
}

describe('Verkaufsmodell', () => {
  it('verkauft im Mittel Interessenten × 0,85 × Talentfaktor', () => {
    const spot = world.spots.find((sp) => sp.district === 'station')!;
    const s = sellingAt(spot.index);
    s.dayTick = tickAtHour(12); // Normalzeit am Bahnhof
    const hours = 40;
    let units = 0;
    for (let i = 0; i < hours * TICKS_PER_HOUR; i++) {
      const before = s.staff[0].unitsToday;
      stepSales(s, world, null);
      units += s.staff[0].unitsToday - before;
    }
    const expected = interestedPerHour(s, 'station', spot.factor, 12) * SALES.baseBuyChance * STAFF.talentFactor[1] * hours;
    expect(units / expected).toBeGreaterThan(0.92);
    expect(units / expected).toBeLessThan(1.08);
  });

  it('mehrere Verkäufer an einem Platz teilen sich die Kundschaft', () => {
    const spot = world.spots.find((sp) => sp.district === 'oldtown')!;
    const s = sellingAt(spot.index, 2);
    const a = s.staff[0];
    enqueue(s, { type: 'hire', applicantId: s.applicants[0].id });
    flushCommands(s, world, out);
    const b = s.staff[1];
    b.talent = a.talent;
    Object.assign(b, { mode: 'selling', spot: spot.index, activeSpot: spot.index, cargo: a.cargo.map((c) => ({ ...c })) });
    s.dayTick = tickAtHour(14);
    for (let i = 0; i < 20 * TICKS_PER_HOUR; i++) stepSales(s, world, null);
    const ratio = a.unitsToday / b.unitsToday;
    expect(ratio).toBeGreaterThan(0.85);
    expect(ratio).toBeLessThan(1.15);
  });

  it('Preiseffekt (1 / Preisfaktor)^1,5 und Altstadt-Aufschlag ohne Nachfrageverlust', () => {
    expect(priceEffect(1)).toBe(1);
    expect(priceEffect(1.3)).toBeCloseTo(Math.pow(1 / 1.3, 1.5));
    const s = createInitialState(world, { seed: 1, ambient: false });
    expect(unitPrice(s, 'apple', 'oldtown', 1)).toBeCloseTo(PRODUCTS.apple.sell * PRICING.oldtownPremium);
    expect(unitPrice(s, 'apple', 'station', 1)).toBeCloseTo(PRODUCTS.apple.sell);
  });

  it('unter 40 % Frische gibt es nur 60 % des Preises', () => {
    const s = createInitialState(world, { seed: 1, ambient: false });
    expect(unitPrice(s, 'banana', 'station', 0.39)).toBeCloseTo(PRODUCTS.banana.sell * 0.6);
    expect(unitPrice(s, 'banana', 'station', 0.41)).toBeCloseTo(PRODUCTS.banana.sell);
  });

  it('fehlt das gewünschte Produkt, wählt der Kunde einmal ein anderes', () => {
    const s = createInitialState(world, { seed: 3, ambient: false });
    const v = s.staff[0];
    v.cargo = [{ product: 'apple', units: 100000, fresh: 1 }];
    let sold = 0;
    const n = 20000;
    for (let i = 0; i < n; i++) if (serveCustomer(s, v, 'station', ['apple', 'banana']) > 0) sold++;
    // Wahrscheinlichkeit, dass Äpfel gewählt werden: p + (1 - p) * p bei p = 1,1 / 2,5
    const p = 1.1 / 2.5;
    const expected = (p + (1 - p) * p) * SALES.baseBuyChance * STAFF.talentFactor[1];
    expect(sold / n).toBeCloseTo(expected, 1);
  });
});

describe('Verkäufer im Tagesablauf', () => {
  it('geht zum Platz, verkauft, lädt im Lager nach und kehrt um 21:30 zurück', () => {
    const s = createInitialState(world, { seed: 5, ambient: false });
    const v = s.staff[0];
    const spot = world.spots.find((sp) => sp.id === 'res-1')!;
    enqueue(s, { type: 'assign', personId: v.id, spot: spot.index });
    const seen = new Set<string>();
    while (s.dayTick < tickAtHour(21.4)) {
      step(s, world, out);
      seen.add(v.mode);
    }
    expect([...seen]).toEqual(expect.arrayContaining(['loading', 'toSpot', 'setup', 'selling', 'packing', 'toWarehouse']));
    expect(v.revenueToday).toBeGreaterThan(50);
    let returning = false;
    while (s.phase === 'day') {
      step(s, world, out);
      if (v.mode === 'packing' || v.mode === 'toWarehouse' || v.mode === 'idle') returning = true;
    }
    expect(returning).toBe(true);
    expect(v.mode).toBe('idle');
    expect(v.cargo).toHaveLength(0);
  });

  it('Verkäufer laden die ältesten Kisten zuerst', () => {
    const s = createInitialState(world, { seed: 6, ambient: false });
    s.crates = [
      { id: 1, product: 'apple', units: 20, fresh: 0.9, cooled: false },
      { id: 2, product: 'apple', units: 20, fresh: 0.5, cooled: false },
    ];
    const v = s.staff[0];
    v.assortment = { apple: 100 };
    enqueue(s, { type: 'assign', personId: v.id, spot: 0 });
    for (let i = 0; i < 40; i++) step(s, world, out);
    expect(v.cargo[0].fresh).toBeLessThan(0.51);
    expect(s.crates.find((c) => c.id === 2)?.units ?? 0).toBe(0);
  });
});
