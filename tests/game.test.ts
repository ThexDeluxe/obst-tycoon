import { describe, expect, it } from 'vitest';
import { CRATE_UNITS, DEALERS, DISTRICTS, FIGHTERS, FRUITS, SHELVES, START, STOCK, STORY_REWARDS } from '../src/data/balance';
import { compareDice } from '../src/sim/battle';
import { enqueue, type Command } from '../src/sim/commands';
import { chooseSpot } from '../src/sim/dealers';
import { winChance } from '../src/sim/odds';
import { unitRevenue } from '../src/sim/sales';
import { capacity, dealerCost, fighterCost, isAttackable, shelfCost, spotCapacity } from '../src/sim/selectors';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import { storeCrate } from '../src/sim/stock';
import { STORY } from '../src/sim/story';
import type { GameState } from '../src/sim/types';
import { createWorld } from '../src/sim/world';

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

describe('Start', () => {
  it('ein Verkäufer, ein paar Kisten Äpfel in zwei Regalen, nur der Untergrund gehört dir', () => {
    const s = fresh();
    expect(s.money).toBe(START.money);
    expect(s.dealers).toHaveLength(1);
    expect(s.crates).toHaveLength(STOCK.startCrates[0].crates);
    expect(capacity(s)).toBe(START.shelves * SHELVES.cratesPerShelf);
    expect(s.districts.filter((d) => d.owner === 'player')).toHaveLength(1);
    expect(s.districts[1].gang).toBe(DISTRICTS.station.garrison);
  });
});

describe('Kiosk und Regale', () => {
  it('der Kiosk gibt höchstens drei Kisten am Tag zum doppelten Preis', () => {
    const s = fresh();
    s.money = 1000;
    const before = s.crates.length;
    for (let i = 0; i < 5; i++) run(s, { type: 'kioskBuy', fruit: 'apple' });
    expect(s.crates.length).toBe(before + STOCK.kioskPerDay);
    expect(s.money).toBe(1000 - STOCK.kioskPerDay * FRUITS.apple.crateCost * STOCK.kioskFactor);
  });

  it('gesperrte Sorten gibt es erst nach der Eroberung', () => {
    const s = fresh();
    const before = s.crates.length;
    run(s, { type: 'kioskBuy', fruit: 'banana' });
    expect(s.crates).toHaveLength(before);
    run(s, { type: 'debugConquer', district: 1 });
    run(s, { type: 'kioskBuy', fruit: 'banana' });
    expect(s.crates).toHaveLength(before + 1);
  });

  it('ein Regal per Plus schafft Platz und wird teurer', () => {
    const s = fresh();
    s.money = 10000;
    const c1 = shelfCost(s);
    run(s, { type: 'buyShelf' });
    expect(capacity(s)).toBe((START.shelves + 1) * SHELVES.cratesPerShelf);
    expect(shelfCost(s)).toBeGreaterThan(c1);
  });

  it('ohne Geld kein Kauf', () => {
    const s = fresh();
    s.money = 5;
    const before = s.crates.length;
    run(s, { type: 'kioskBuy', fruit: 'apple' });
    expect(s.crates).toHaveLength(before);
    expect(s.messages[s.messages.length - 1].kind).toBe('warning');
  });
});

describe('Verkäufer', () => {
  it('holen Kisten selbst, suchen sich einen Platz, verkaufen und kommen zurück', () => {
    const s = fresh(2);
    const d = s.dealers[0];
    const modes = new Set<string>();
    for (let i = 0; i < 2400 && s.earnedTotal < 40; i++) {
      step(s, world, out);
      modes.add(d.mode);
    }
    expect([...modes]).toEqual(expect.arrayContaining(['loading', 'toSpot', 'setup', 'selling']));
    expect(s.earnedTotal).toBeGreaterThan(30);
    expect(d.spot === null || world.spots[d.spot].district === 'underground').toBe(true);
  });

  it('wählen nur Plätze in eigenen Vierteln, höchstens zwei pro Platz', () => {
    const s = fresh(3);
    s.money = 100000;
    for (let i = 0; i < 8; i++) storeCrate(s, 'apple', 2);
    while (s.dealers.length < spotCapacity(s, world)) run(s, { type: 'hireDealer' });
    run(s, { type: 'hireDealer' });
    expect(s.dealers.length).toBe(spotCapacity(s, world));
    ticks(s, 600);
    const count = new Map<number, number>();
    for (const d of s.dealers) {
      if (d.spot === null) continue;
      expect(world.spots[d.spot].district).toBe('underground');
      count.set(d.spot, (count.get(d.spot) ?? 0) + 1);
    }
    for (const n of count.values()) expect(n).toBeLessThanOrEqual(DEALERS.maxPerSpot);
  });

  it('ziehen in ein erobertes Viertel mit mehr Kundschaft um', () => {
    const s = fresh(4);
    run(s, { type: 'debugConquer', district: 1 });
    const spot = chooseSpot(s, world, s.dealers[0]);
    expect(spot).not.toBeNull();
    expect(world.spots[spot!].district).toBe('station');
  });

  it('jeder weitere Verkäufer kostet mehr', () => {
    const s = fresh();
    const c1 = dealerCost(s);
    s.money = 10000;
    run(s, { type: 'hireDealer' });
    expect(dealerCost(s)).toBeGreaterThan(c1);
  });

  it('der Erlös hängt vom Preisniveau des Viertels ab', () => {
    expect(unitRevenue('apple', 'underground')).toBe(FRUITS.apple.unitPrice);
    expect(unitRevenue('apple', 'banking')).toBeCloseTo(FRUITS.apple.unitPrice * DISTRICTS.banking.priceLevel);
    expect(CRATE_UNITS).toBe(20);
  });
});

describe('Würfelduell', () => {
  it('der höhere Würfel gewinnt, bei Gleichstand die Gang', () => {
    expect(compareDice([6, 5, 1], [5, 5])).toEqual({ attackerLoss: 1, defenderLoss: 1 });
    expect(compareDice([6, 6, 6], [1, 1])).toEqual({ attackerLoss: 0, defenderLoss: 2 });
    expect(compareDice([2], [2, 1])).toEqual({ attackerLoss: 1, defenderLoss: 0 });
    expect(compareDice([4, 3], [3])).toEqual({ attackerLoss: 0, defenderLoss: 1 });
  });

  it('angreifen geht nur auf Nachbarviertel und nur mit Kämpfern', () => {
    const s = fresh();
    expect(isAttackable(s, world, 1)).toBe(true);
    expect(isAttackable(s, world, 5)).toBe(false);
    run(s, { type: 'attack', district: 1 });
    expect(s.battle).toBeNull();
    s.fighters = 10;
    run(s, { type: 'attack', district: 5 });
    expect(s.battle).toBeNull();
  });

  it('ein gewonnener Kampf erobert das Viertel, Überlebende kehren zurück', () => {
    const s = fresh(5);
    s.fighters = 30;
    run(s, { type: 'attack', district: 1 });
    expect(s.battle?.result).toBe('running');
    expect(s.fighters).toBe(0);
    run(s, { type: 'battleAuto' });
    expect(s.battle?.result).toBe('won');
    expect(s.districts[1].owner).toBe('player');
    expect(s.fighters).toBe(s.battle!.attackers);
    run(s, { type: 'battleClose' });
    expect(s.battle).toBeNull();
  });

  it('nach einer Niederlage behält die Gang ihre Verluste, beim Rückzug kehren die Kämpfer zurück', () => {
    const s = fresh(6);
    s.fighters = 1;
    run(s, { type: 'attack', district: 5 - 4 });
    run(s, { type: 'battleAuto' });
    if (s.battle!.result === 'lost') {
      expect(s.districts[1].gang).toBe(s.battle!.defenders);
      expect(s.fighters).toBe(0);
    }
    run(s, { type: 'battleClose' });
    s.fighters = 5;
    run(s, { type: 'attack', district: 1 });
    run(s, { type: 'battleRetreat' });
    expect(s.battle!.result).toBe('retreated');
    expect(s.fighters).toBe(5);
  });

  it('während eines Kampfes steht die Zeit still', () => {
    const s = fresh(7);
    s.fighters = 5;
    run(s, { type: 'attack', district: 1 });
    const t = s.totalTicks;
    ticks(s, 50);
    expect(s.totalTicks).toBe(t);
  });

  it('die Siegchance ist plausibel', () => {
    expect(winChance(0, 3)).toBe(0);
    expect(winChance(5, 0)).toBe(1);
    expect(winChance(1, 1)).toBeCloseTo(15 / 36, 6);
    expect(winChance(20, 4)).toBeGreaterThan(0.99);
    expect(winChance(10, 10)).toBeGreaterThan(winChance(9, 10));
  });

  it('Kämpfer werden mit jedem weiteren teurer, der Hof ist begrenzt', () => {
    const s = fresh();
    s.money = 100000;
    const c0 = fighterCost(s);
    run(s, { type: 'hireFighter', count: 3 });
    expect(s.fighters).toBe(3);
    expect(fighterCost(s)).toBe(c0 + 3 * FIGHTERS.costPerOwned);
    run(s, { type: 'hireFighter', count: 200 });
    expect(s.fighters).toBe(FIGHTERS.max);
  });
});

describe('Aufträge', () => {
  it('führen Schritt für Schritt durchs Spiel und zahlen Belohnungen', () => {
    const s = fresh(8);
    expect(s.story).toBe(0);
    run(s, { type: 'setOrder', fruit: 'apple', crates: 4 });
    expect(s.story).toBe(1);
    expect(s.money).toBe(START.money + STORY_REWARDS[0]);
    expect(STORY.length).toBe(STORY_REWARDS.length);
  });

  it('erledigte spätere Aufträge werden nachgeholt', () => {
    const s = fresh(9);
    s.money = 100000;
    run(s, { type: 'setOrder', fruit: 'apple', crates: 6 });
    s.earnedTotal = 100;
    // Lagerampel: genug Äpfel für mehr als anderthalb Tage
    s.day = 1;
    s.salesDays = [{ ...s.soldToday, apple: 60 }];
    run(s, { type: 'hireDealer' });
    run(s, { type: 'buyShelf' });
    run(s, { type: 'hireFighter', count: 5 });
    run(s, { type: 'debugConquer', district: 1 });
    expect(s.story).toBeGreaterThanOrEqual(7);
  });
});
