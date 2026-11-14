import { describe, expect, it } from 'vitest';
import { CRATE_UNITS, MARKET, PRODUCTS, ROOMS, STAFF, TICKS_PER_DAY } from '../src/data/balance';
import { assignCooling, decayPerTick, deliverOrders, driftMarket, orderCost, stepFreshness } from '../src/sim/economy';
import { enqueue } from '../src/sim/commands';
import { closeDay } from '../src/sim/day';
import { freeSpace, staffLimit, totalCapacity } from '../src/sim/selectors';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import { wageFor } from '../src/sim/staff';
import type { GameState } from '../src/sim/types';
import { createWorld } from '../src/sim/world';

const world = createWorld();
const out = createStepOutput();
const fresh = (seed = 1) => createInitialState(world, { seed, ambient: false });
const run = (s: GameState, c: Parameters<typeof enqueue>[1]) => {
  enqueue(s, c);
  flushCommands(s, world, out);
};

describe('Startbedingungen', () => {
  it('1.500 €, 4 Kisten Äpfel, 3 Kisten Bananen, ein Verkäufer mit Talent 2 und Wachsamkeit 2', () => {
    const s = fresh();
    expect(s.money).toBe(1500);
    expect(s.crates.filter((c) => c.product === 'apple')).toHaveLength(4);
    expect(s.crates.filter((c) => c.product === 'banana')).toHaveLength(3);
    expect(s.staff).toHaveLength(1);
    expect(s.staff[0].talent).toBe(2);
    expect(s.staff[0].vigilance).toBe(2);
    expect(totalCapacity(s)).toBe(10);
    expect(staffLimit(s)).toBe(3);
    expect(s.applicants).toHaveLength(STAFF.applicantsPerDay);
  });
});

describe('Verderb und Kühlung', () => {
  it('Frische sinkt gleichmäßig über die Haltbarkeit, gekühlt über die gekühlte Haltbarkeit', () => {
    const s = fresh();
    s.crates = [
      { id: 1, product: 'apple', units: 20, fresh: 1, cooled: false },
      { id: 2, product: 'apple', units: 20, fresh: 1, cooled: true },
    ];
    stepFreshness(s, TICKS_PER_DAY);
    expect(s.crates[0].fresh).toBeCloseTo(1 - 1 / PRODUCTS.apple.shelfDays, 6);
    expect(s.crates[1].fresh).toBeCloseTo(1 - 1 / PRODUCTS.apple.cooledDays!, 6);
  });

  it('Bananen sind nicht kühlbar', () => {
    expect(decayPerTick('banana', true)).toBe(decayPerTick('banana', false));
  });

  it('Kühlplätze gehen an die kühlbaren Produkte, die am schnellsten verderben', () => {
    const s = fresh();
    s.level = 2;
    s.warehouse.rooms.push({ slot: 2, type: 'coldroom', level: 1, buildTicks: 0 });
    s.crates = [];
    let id = 1;
    for (let i = 0; i < 4; i++) s.crates.push({ id: id++, product: 'apple', units: 20, fresh: 1, cooled: false });
    for (let i = 0; i < 6; i++) s.crates.push({ id: id++, product: 'strawberry', units: 20, fresh: 1, cooled: false });
    for (let i = 0; i < 3; i++) s.crates.push({ id: id++, product: 'banana', units: 20, fresh: 1, cooled: false });
    assignCooling(s);
    const cooled = s.crates.filter((c) => c.cooled);
    expect(cooled).toHaveLength(ROOMS.coldroom.crates);
    expect(cooled.filter((c) => c.product === 'strawberry')).toHaveLength(6);
    expect(cooled.filter((c) => c.product === 'banana')).toHaveLength(0);
  });

  it('verdorbene Ware wird beim Tagesabschluss als Verlust entsorgt', () => {
    const s = fresh();
    s.crates[0].fresh = 0;
    const r = closeDay(s, world);
    expect(r.spoiledUnits).toBe(20);
    expect(r.spoiledValue).toBeCloseTo(20 * PRODUCTS.apple.buy);
    expect(s.crates).toHaveLength(6);
  });
});

describe('Großmarkt', () => {
  it('ab 10 Kisten gibt es 5 % Rabatt', () => {
    const s = fresh();
    const nine = orderCost(s, [{ product: 'apple', crates: 9 }]);
    const ten = orderCost(s, [{ product: 'apple', crates: 10 }]);
    expect(nine).toBeCloseTo(9 * CRATE_UNITS * PRODUCTS.apple.buy);
    expect(ten).toBeCloseTo(10 * CRATE_UNITS * PRODUCTS.apple.buy * (1 - MARKET.bulkDiscount));
  });

  it('Einkäufe werden sofort gebucht, die Lieferung kommt am nächsten Tag um 06:00', () => {
    const s = fresh();
    run(s, { type: 'order', lines: [{ product: 'banana', crates: 3 }] });
    expect(s.money).toBeCloseTo(1500 - 3 * 20 * 0.5);
    expect(s.orders).toHaveLength(1);
    expect(s.orders[0].deliverDay).toBe(1);
    while (s.phase === 'day') step(s, world, out);
    run(s, { type: 'nextDay' });
    expect(s.orders).toHaveLength(0);
    expect(s.crates.filter((c) => c.product === 'banana').length).toBeGreaterThanOrEqual(3);
  });

  it('was nicht ins Lager passt, wird voll erstattet und vermerkt', () => {
    const s = fresh();
    const before = s.money;
    run(s, { type: 'order', lines: [{ product: 'apple', crates: 6 }] });
    const paid = before - s.money;
    expect(freeSpace(s)).toBe(0);
    s.orders[0].deliverDay = 0;
    const notes: string[] = [];
    const r = deliverOrders(s, notes);
    expect(r.crates).toBe(3);
    expect(r.refund).toBeCloseTo((paid / 6) * 3);
    expect(notes.length).toBe(1);
    expect(s.crates).toHaveLength(10);
  });

  it('der Tagespreis bleibt zwischen 0,85 und 1,15 und ändert sich um höchstens 5 %', () => {
    const s = fresh();
    for (let i = 0; i < 400; i++) {
      const prev = s.marketFactors.apple;
      driftMarket(s);
      const f = s.marketFactors.apple;
      expect(f).toBeGreaterThanOrEqual(MARKET.priceFactorMin);
      expect(f).toBeLessThanOrEqual(MARKET.priceFactorMax);
      expect(Math.abs(f / prev - 1)).toBeLessThanOrEqual(MARKET.priceDrift + 1e-9);
    }
  });

  it('unter −1.000 € sind keine Einkäufe möglich', () => {
    const s = fresh();
    s.money = -990;
    run(s, { type: 'order', lines: [{ product: 'apple', crates: 1 }] });
    expect(s.orders).toHaveLength(0);
    expect(s.messages[s.messages.length - 1].kind).toBe('warning');
  });
});

describe('Personal', () => {
  it('Lohn = 40 € + 9 € × (Talent + Wachsamkeit − 2)', () => {
    expect(wageFor(2, 2)).toBe(58);
    expect(wageFor(5, 5)).toBe(112);
    expect(wageFor(1, 1)).toBe(40);
  });

  it('Anwerbung kostet 150 € und die Personalgrenze gilt', () => {
    const s = fresh();
    run(s, { type: 'hire', applicantId: s.applicants[0].id });
    expect(s.money).toBe(1350);
    run(s, { type: 'hire', applicantId: s.applicants[0].id });
    expect(s.staff).toHaveLength(3);
    s.applicants.push({ id: 999, name: 'Test Person', talent: 3, vigilance: 3, wage: 76 });
    run(s, { type: 'hire', applicantId: 999 });
    expect(s.staff).toHaveLength(3);
  });

  it('nach dem Entlassen wird der Tageslohn trotzdem fällig', () => {
    const s = fresh();
    const p = s.staff[0];
    run(s, { type: 'fire', personId: p.id });
    expect(s.staff).toHaveLength(0);
    const r = closeDay(s, world);
    expect(r.ledger.wages).toBe(p.wage);
  });

  it('Löhne und laufende Kosten werden beim Tagesabschluss gebucht, Dispozinsen bei negativem Konto', () => {
    const s = fresh();
    s.money = -500;
    const r = closeDay(s, world);
    expect(r.ledger.wages).toBe(58);
    expect(r.ledger.running).toBeCloseTo(20 + 5.58, 2);
  });
});

describe('Bau', () => {
  it('eine Regalreihe kostet 400 € und ist nach einer Spielstunde fertig', () => {
    const s = fresh();
    run(s, { type: 'build', slot: 2, room: 'shelf' });
    expect(s.money).toBe(1100);
    expect(totalCapacity(s)).toBe(10);
    for (let i = 0; i < 151; i++) step(s, world, out);
    expect(totalCapacity(s)).toBe(20);
  });

  it('Kühlzelle erst ab Stufe 2, Abriss erstattet 50 %', () => {
    const s = fresh();
    run(s, { type: 'build', slot: 2, room: 'coldroom' });
    expect(s.warehouse.rooms).toHaveLength(2);
    run(s, { type: 'build', slot: 3, room: 'shelf' });
    run(s, { type: 'demolish', slot: 3 });
    expect(s.money).toBe(1500 - 400 + 200);
  });
});
