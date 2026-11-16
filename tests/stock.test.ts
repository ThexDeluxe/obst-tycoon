import { describe, expect, it } from 'vitest';
import { CRATE_UNITS, DISTRICT_IDS, FRUIT_IDS, FRUITS, SATURATION, STOCK, TICKS_PER_DAY, TICKS_PER_HOUR, type FruitId } from '../src/data/balance';
import { enqueue, type Command } from '../src/sim/commands';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import {
  assignCooling,
  dailyDemand,
  freshnessPriceFactor,
  openDemand,
  premiumFactor,
  saturationFactor,
  stepFreshness,
  storeCrate,
} from '../src/sim/stock';
import { STORY } from '../src/sim/story';
import { ampelFor, fruitRange, stockAmpel } from '../src/sim/supply';
import type { GameState } from '../src/sim/types';
import { createWorld } from '../src/sim/world';
import { giveContract } from './helpers';
import { cratePrice } from '../src/sim/farms';

const world = createWorld();
const out = createStepOutput();
const fresh = (seed = 1) => createInitialState(world, { seed, ambient: false });
const run = (s: GameState, c: Command) => {
  enqueue(s, c);
  flushCommands(s, world, out);
};
const ticks = (s: GameState, n: number) => {
  for (let i = 0; i < n; i++) step(s, world, out);
};
/** Bis zum Beginn des nächsten Tages und bis die Morgenlieferung abgeladen ist */
const nextMorning = (s: GameState) => {
  const day = s.day;
  while (s.day === day) step(s, world, out);
  while (s.delivery) step(s, world, out);
};
const count = (s: GameState, f: FruitId) => s.crates.filter((c) => c.fruit === f).length;

describe('Verderb und Kühlung', () => {
  it('Erdbeeren verlieren ungekühlt die Hälfte der Frische pro Tag, gekühlt ein Viertel', () => {
    const s = fresh();
    s.crates = [];
    s.coldRoom = true;
    storeCrate(s, 'strawberry', 2);
    storeCrate(s, 'strawberry', 2);
    s.crates[1].cooled = true;
    stepFreshness(s, TICKS_PER_DAY);
    expect(s.crates[0].fresh).toBeCloseTo(1 - 1 / FRUITS.strawberry.shelfDays, 5);
    expect(s.crates[1].fresh).toBeCloseTo(1 - 1 / FRUITS.strawberry.cooledDays!, 5);
  });

  it('bessere Qualität hält länger, unter 40 % Frische gibt es nur noch 60 % des Preises', () => {
    const s = fresh();
    s.crates = [];
    storeCrate(s, 'grape', 1);
    storeCrate(s, 'grape', 3);
    stepFreshness(s, TICKS_PER_DAY);
    expect(s.crates[1].fresh).toBeGreaterThan(s.crates[0].fresh);
    expect(freshnessPriceFactor(0.39)).toBe(STOCK.lowFreshnessPrice);
    expect(freshnessPriceFactor(0.41)).toBe(1);
  });

  it('verdorbene Ware wird beim Tagesabschluss entsorgt und gemeldet', () => {
    const s = fresh();
    s.crates = [];
    storeCrate(s, 'strawberry', 2, 0.001);
    storeCrate(s, 'apple', 2);
    s.dealers = [];
    nextMorning(s);
    expect(s.crates.map((c) => c.fruit)).toEqual(['apple']);
    expect(s.messages.some((m) => m.kind === 'money' && m.text.includes('1 Kiste verdorben'))).toBe(true);
  });

  it('der Kühlraum wird automatisch mit den verderblichsten Sorten belegt, Bananen nie', () => {
    const s = fresh();
    s.crates = [];
    s.shelves = 6;
    s.coldRoom = true;
    for (let i = 0; i < 10; i++) storeCrate(s, 'apple', 2);
    for (let i = 0; i < 4; i++) storeCrate(s, 'banana', 2);
    for (let i = 0; i < 6; i++) storeCrate(s, 'strawberry', 2);
    assignCooling(s);
    const cooled = s.crates.filter((c) => c.cooled);
    expect(cooled).toHaveLength(STOCK.coldRoomCrates);
    expect(cooled.filter((c) => c.fruit === 'strawberry')).toHaveLength(6);
    expect(cooled.some((c) => c.fruit === 'banana')).toBe(false);
  });

  it('der Kühlraum kostet einmal und lässt sich nur einmal bauen', () => {
    const s = fresh();
    s.money = 5000;
    run(s, { type: 'buyColdRoom' });
    run(s, { type: 'buyColdRoom' });
    expect(s.coldRoom).toBe(true);
    expect(s.money).toBe(5000 - STOCK.coldRoomCost);
  });
});

describe('Lieferungen', () => {
  it('Verträge liefern jeden Morgen, bezahlt wird beim Abladen', () => {
    const s = fresh(2);
    s.dealers = [];
    s.money = 1000;
    s.story = STORY.length;
    const farm = giveContract(s, 'apple', 5);
    const money = s.money;
    const before = count(s, 'apple');
    nextMorning(s);
    expect(count(s, 'apple')).toBe(before + 5);
    expect(s.money).toBeCloseTo(money - 5 * cratePrice(s, farm, 'apple'), 6);
  });

  it('was nicht ins Lager passt, kommt mit der nächsten Lieferung', () => {
    const s = fresh(3);
    s.dealers = [];
    s.money = 5000;
    const farm = giveContract(s, 'apple', 12);
    nextMorning(s);
    expect(s.crates.length).toBe(12);
    const left = 12 - (12 - STOCK.startCrates[0].crates);
    expect(s.backlog).toHaveLength(left);
    expect(s.messages.some((m) => m.text.startsWith('Lager voll'))).toBe(true);
    // Rückstand höchstens eine Tageslieferung, Platz schaffen und am nächsten Morgen kommt er zuerst
    s.crates.splice(0, 12);
    s.farms[farm].contract = null;
    nextMorning(s);
    expect(s.crates.length).toBe(left);
    expect(s.backlog).toHaveLength(0);
  });

  it('ohne Geld nimmt der Fahrer die Ware wieder mit', () => {
    const s = fresh(4);
    s.dealers = [];
    giveContract(s, 'apple', 3);
    s.money = 0;
    nextMorning(s);
    expect(s.money).toBeGreaterThanOrEqual(0);
    expect(s.messages.some((m) => m.text.startsWith('Kein Geld für die Lieferung'))).toBe(true);
  });

  it('der Kiosk ist eine Notlösung: das Tageslimit gilt bis zum nächsten Morgen', () => {
    const s = fresh(5);
    s.money = 1000;
    for (let i = 0; i < 4; i++) run(s, { type: 'kioskBuy', fruit: 'apple' });
    expect(s.kioskToday).toBe(STOCK.kioskPerDay);
    nextMorning(s);
    expect(s.kioskToday).toBe(0);
  });
});

describe('Sättigung und Aufpreis', () => {
  it('Viertel haben eigene Vorlieben', () => {
    const station = DISTRICT_IDS.indexOf('station');
    const banking = DISTRICT_IDS.indexOf('banking');
    const scene = DISTRICT_IDS.indexOf('scene');
    expect(dailyDemand(world, station, 'banana')).toBeGreaterThan(dailyDemand(world, station, 'mango'));
    expect(dailyDemand(world, banking, 'dragonfruit')).toBeGreaterThan(dailyDemand(world, banking, 'apple'));
    expect(dailyDemand(world, scene, 'grape')).toBeGreaterThan(dailyDemand(world, scene, 'apple'));
  });

  it('volle Nachfrage bringt bis zu 1,6-fachen Preis, satt verkauft sich nur noch ein Viertel und dann nichts mehr', () => {
    const s = fresh();
    expect(openDemand(s, world, 0, 'apple')).toBe(1);
    expect(premiumFactor(1)).toBeCloseTo(SATURATION.premiumMax);
    expect(premiumFactor(0)).toBe(1);
    expect(saturationFactor(0.5)).toBe(1);
    expect(saturationFactor(1)).toBe(SATURATION.saturatedFactor);
    expect(saturationFactor(1 + SATURATION.overflow)).toBe(0);
    s.districtSold[0].apple = dailyDemand(world, 0, 'apple');
    expect(openDemand(s, world, 0, 'apple')).toBe(0);
  });

  it('ein Lager nur mit der teuersten Sorte bringt mindestens 30 % weniger Gewinn als ein gemischtes', () => {
    // Spätes Spiel im ersten Akt: alle Viertel, volles Lager, 60 Kisten pro Tag
    const crates = 60;
    const play = (orders: Partial<Record<FruitId, number>>) => {
      const s = fresh(3);
      s.story = STORY.length;
      s.crates = [];
      for (let i = 1; i < DISTRICT_IDS.length; i++) s.districts[i] = { owner: 'player', gang: 0 };
      s.shelves = 12;
      s.upgrade = 1;
      s.money = 1e9;
      while (s.dealers.length < 12) run(s, { type: 'hireDealer' });
      const start = s.money;
      // Nachschub jeden Morgen zum Grundpreis, unabhängig von der Kapazität der Höfe
      const refill = () => {
        for (const f of FRUIT_IDS) {
          for (let k = 0; k < (orders[f] ?? 0); k++) {
            if (!storeCrate(s, f, 2)) break;
            s.money -= FRUITS[f].crateCost;
          }
        }
      };
      refill();
      for (let d = 0; d < 4; d++) {
        nextMorning(s);
        refill();
      }
      ticks(s, TICKS_PER_DAY - TICKS_PER_HOUR);
      return s.money - start;
    };
    const most = [...FRUIT_IDS].sort((a, b) => FRUITS[b].unitPrice - FRUITS[a].unitPrice)[0];
    const only = play({ [most]: crates });
    // Gemischt: die wertvollsten Sorten zuerst, jede nur bis zum Tagesbedarf der Stadt
    const demand = (f: FruitId) => DISTRICT_IDS.reduce((a, _, i) => a + dailyDemand(world, i, f), 0);
    const mixed: Partial<Record<FruitId, number>> = {};
    let left = crates;
    for (const f of [...FRUIT_IDS].sort((a, b) => FRUITS[b].unitPrice - FRUITS[a].unitPrice)) {
      mixed[f] = Math.min(left, Math.round(demand(f) / CRATE_UNITS));
      left -= mixed[f]!;
    }
    const both = play(mixed);
    expect(only).toBeLessThanOrEqual(both * 0.7);
  });
});

describe('Reichweite und Lagerampel', () => {
  it('Schwellen: grün ab anderthalb Tagen, gelb ab einem halben, darunter rot', () => {
    expect(ampelFor(1.5)).toBe('green');
    expect(ampelFor(1.49)).toBe('yellow');
    expect(ampelFor(0.5)).toBe('yellow');
    expect(ampelFor(0.49)).toBe('red');
  });

  it('die Reichweite rechnet mit dem Verkauf der letzten Tage und den bestellten Lieferungen', () => {
    const s = fresh();
    s.crates = [];
    s.dealers = [];
    storeCrate(s, 'apple', 2);
    // Kurz vor Ladenschluss: heute wird nur noch wenig verkauft
    s.dayTick = TICKS_PER_HOUR * 15;
    s.salesDays = [{ apple: 80, banana: 0, strawberry: 0, grape: 0, mango: 0, dragonfruit: 0 }];
    const r = fruitRange(s, 'apple');
    expect(r.perDay).toBe(80);
    expect(r.days).toBeCloseTo(CRATE_UNITS / 80, 5);
    expect(stockAmpel(s).ampel).toBe('red');
    // Jeden Morgen 4 Kisten (80 Stück): Der Bestand hält über die Vorausschau hinaus
    giveContract(s, 'apple', 4);
    expect(fruitRange(s, 'apple').days).toBeGreaterThan(STOCK.ampelGreen);
    expect(stockAmpel(s).ampel).toBe('green');
  });

  it('Leerlauf: ohne Lieferung ist das Lager nach spätestens zwei Tagen leer, mit Lieferung nicht', () => {
    const idle = fresh(6);
    nextMorning(idle);
    nextMorning(idle);
    expect(idle.crates).toHaveLength(0);
    const supplied = fresh(6);
    giveContract(supplied, 'apple', 6);
    for (let d = 0; d < 4; d++) {
      nextMorning(supplied);
      expect(supplied.crates.length).toBeGreaterThan(0);
    }
  });
});

describe('Vertriebsqualität', () => {
  it('bessere Verteilung bringt bei gleicher Ware mehr Umsatz', () => {
    const play = (quality: number) => {
      const s = fresh(7);
      s.story = STORY.length;
      s.crates = [];
      for (let i = 1; i < 4; i++) s.districts[i] = { owner: 'player', gang: 0 };
      s.shelves = 12;
      s.money = 1e9;
      s.salesQuality = quality;
      while (s.dealers.length < 6) run(s, { type: 'hireDealer' });
      const refill = () => {
        for (const f of ['apple', 'banana', 'strawberry', 'grape'] as FruitId[]) for (let k = 0; k < 9; k++) storeCrate(s, f, 2);
      };
      refill();
      for (let d = 0; d < 3; d++) {
        nextMorning(s);
        refill();
      }
      return s.earnedTotal;
    };
    expect(play(0.95)).toBeGreaterThan(play(0.3));
  });
});
