import { describe, expect, it } from 'vitest';
import { CONTRACTS, FARM_ACTIONS, FARM_EVENTS, FARM_RULES, FARMS, FRUITS, HEAT, type FarmActionId } from '../src/data/balance';
import { deserialize, serialize } from '../src/save/format';
import { enqueue, type Command } from '../src/sim/commands';
import { actionChance, contractChance, cratePrice, farmCapacity, suggestOffer, visibleActions, type Offer } from '../src/sim/farms';
import { rand } from '../src/sim/rng';
import { availableFruits } from '../src/sim/selectors';
import { STORY } from '../src/sim/story';
import { createInitialState, STATE_VERSION } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import type { GameState } from '../src/sim/types';
import { createWorld } from '../src/sim/world';

const world = createWorld();
const out = createStepOutput();
const fresh = (seed = 1) => createInitialState(world, { seed, ambient: false });
const run = (s: GameState, c: Command) => {
  enqueue(s, c);
  flushCommands(s, world, out);
};
/** Bis zum nächsten Morgen, bis die Lieferung abgeladen ist */
const nextMorning = (s: GameState) => {
  const day = s.day;
  while (s.day === day) step(s, world, out);
  while (s.delivery) step(s, world, out);
};
/** Stellt den Zufall so ein, dass der nächste Wurf unter (oder über) der Schwelle liegt */
const forceRoll = (s: GameState, below: number, success: boolean) => {
  for (let k = 0; k < 10000; k++) {
    const probe = { rng: s.rng };
    const r = rand(probe);
    if (success ? r < below : r >= below) return;
    s.rng = (s.rng + 7919) | 0;
  }
};
const offer = (crates: Offer['crates'], pricePct = 100, days = 7, exclusive = false): Offer => ({ crates, pricePct, days, exclusive });
const BRINKMANN = 0;
const LINDENAU = 1;
const KESSLER = 2;
const PETERSEN = 4;
const EXOTICA = 5;

describe('Höfe im Umland', () => {
  it('sechs Höfe, vier frei und zwei bei der Gang; Drachenfrüchte hat nur die Gang', () => {
    const s = fresh();
    expect(s.farms).toHaveLength(6);
    expect(s.farms.filter((f) => f.owner === 'free')).toHaveLength(4);
    expect(s.farms.filter((f) => f.owner === 'gang')).toHaveLength(2);
    expect(availableFruits(s)).not.toContain('dragonfruit');
    run(s, { type: 'kioskBuy', fruit: 'dragonfruit' });
    expect(s.crates.some((c) => c.fruit === 'dragonfruit')).toBe(false);
  });

  it('jeder Hof liefert eine oder zwei Sorten mit Kapazität, Preis und Qualität', () => {
    for (const f of FARMS) {
      expect(f.fruits.length).toBeGreaterThanOrEqual(1);
      expect(f.fruits.length).toBeLessThanOrEqual(2);
      expect(f.capacity).toBeGreaterThan(0);
      expect(f.quality).toBeGreaterThanOrEqual(1);
      expect(f.quality).toBeLessThanOrEqual(3);
    }
  });
});

describe('Verträge', () => {
  it('die Annahmechance steigt mit Preis, Loyalität und Angst und sinkt mit Exklusivität', () => {
    const s = fresh();
    const o = offer({ apple: 5 });
    const base = contractChance(s, BRINKMANN, o);
    expect(contractChance(s, BRINKMANN, { ...o, pricePct: 120 })).toBeGreaterThan(base);
    expect(contractChance(s, BRINKMANN, { ...o, exclusive: true })).toBeLessThan(base);
    s.farms[BRINKMANN].loyalty += 20;
    const loyal = contractChance(s, BRINKMANN, o);
    expect(loyal).toBeGreaterThan(base);
    s.farms[BRINKMANN].fear = 40;
    expect(contractChance(s, BRINKMANN, o)).toBeGreaterThan(loyal);
    expect(contractChance(s, PETERSEN, offer({ banana: 2 }))).toBe(0);
  });

  it('ein sturer Bauer verlangt mehr als ein ehrlicher', () => {
    const s = fresh();
    s.farms[LINDENAU].loyalty = s.farms[BRINKMANN].loyalty;
    expect(contractChance(s, LINDENAU, offer({ apple: 3 }))).toBeLessThan(contractChance(s, BRINKMANN, offer({ apple: 3 })));
  });

  it('der Vorschlag hat eine gute Chance und bleibt in der Kapazität', () => {
    const s = fresh();
    for (let i = 0; i < 4; i++) {
      const o = suggestOffer(s, world, i);
      const n = Object.values(o.crates).reduce((a, b) => a + (b ?? 0), 0);
      expect(n).toBeGreaterThan(0);
      expect(n).toBeLessThanOrEqual(FARMS[i].capacity);
      expect(contractChance(s, i, o)).toBeGreaterThanOrEqual(CONTRACTS.suggestChance - 0.001);
    }
  });

  it('angenommen: Lieferung ab dem nächsten Morgen, bezahlt beim Abladen, nach der Laufzeit ist Schluss', () => {
    const s = fresh(2);
    s.dealers = [];
    s.crates = [];
    s.money = 5000;
    forceRoll(s, contractChance(s, BRINKMANN, offer({ apple: 4 }, 100, 3)), true);
    run(s, { type: 'offerContract', farm: BRINKMANN, offer: offer({ apple: 4 }, 100, 3) });
    const c = s.farms[BRINKMANN].contract!;
    expect(c).not.toBeNull();
    expect(c.startDay).toBe(1);
    expect(c.endDay).toBe(3);
    const price = cratePrice(s, BRINKMANN, 'apple');
    const money = s.money;
    nextMorning(s);
    expect(s.crates).toHaveLength(4);
    expect(s.crates.every((x) => x.quality === FARMS[BRINKMANN].quality)).toBe(true);
    expect(s.money).toBeCloseTo(money - 4 * price, 6);
    s.crates = [];
    nextMorning(s);
    s.crates = [];
    nextMorning(s);
    // Letzter Liefertag: Meldung zum Verlängern
    expect(s.pending.some((p) => p.kind === 'contractEnd' && p.farm === BRINKMANN)).toBe(true);
    s.crates = [];
    nextMorning(s);
    expect(s.crates).toHaveLength(0);
    expect(s.farms[BRINKMANN].contract).toBeNull();
    expect(s.messages.some((m) => m.text.includes('ausgelaufen'))).toBe(true);
  });

  it('verlängern ist ein Tipp zu den letzten Bedingungen', () => {
    const s = fresh(3);
    s.dealers = [];
    s.money = 5000;
    s.farms[BRINKMANN].loyalty = 90;
    forceRoll(s, 0.9, true);
    run(s, { type: 'offerContract', farm: BRINKMANN, offer: offer({ apple: 2 }, 110, 3) });
    for (let d = 0; d < 3; d++) {
      s.crates = [];
      nextMorning(s);
    }
    const ev = s.pending.find((p) => p.kind === 'contractEnd')!;
    expect(ev).toBeDefined();
    run(s, { type: 'answerEvent', id: ev.id, choice: 0 });
    expect(s.farms[BRINKMANN].contract!.endDay).toBe(6);
    expect(s.pending.some((p) => p.id === ev.id)).toBe(false);
  });

  it('abgelehnt: Der Bauer verhandelt erst am nächsten Tag wieder', () => {
    const s = fresh(4);
    s.farms[LINDENAU].loyalty = 0;
    const o = offer({ apple: 3 }, CONTRACTS.pricePctMin);
    forceRoll(s, contractChance(s, LINDENAU, o), false);
    run(s, { type: 'offerContract', farm: LINDENAU, offer: o });
    expect(s.farms[LINDENAU].contract).toBeNull();
    expect(s.farms[LINDENAU].talkDay).toBe(s.day + 1);
    run(s, { type: 'offerContract', farm: LINDENAU, offer: offer({ apple: 3 }, 150) });
    expect(s.farms[LINDENAU].contract).toBeNull();
  });

  it('mit der Gang gibt es keinen Vertrag, mehr als die Kapazität auch nicht', () => {
    const s = fresh();
    run(s, { type: 'offerContract', farm: EXOTICA, offer: offer({ dragonfruit: 2 }, 150) });
    expect(s.farms[EXOTICA].contract).toBeNull();
    run(s, { type: 'offerContract', farm: BRINKMANN, offer: offer({ apple: FARMS[BRINKMANN].capacity + 1 }, 150) });
    expect(s.farms[BRINKMANN].contract).toBeNull();
  });

  it('volles Lager: der Rest bleibt auf dem Hof und der Bauer wird unzufrieden', () => {
    const s = fresh(5);
    s.dealers = [];
    s.money = 5000;
    s.farms[KESSLER].loyalty = 90;
    forceRoll(s, 0.9, true);
    run(s, { type: 'offerContract', farm: KESSLER, offer: offer({ banana: 10 }, 120) });
    const loyalty = s.farms[KESSLER].loyalty;
    // Lager fast voll: auch bei Hagel (halbe Lieferung) bleibt etwas übrig
    while (s.crates.length < 10) s.crates.push({ id: s.nextId++, fruit: 'apple', fresh: 1, quality: 2, cooled: false });
    nextMorning(s);
    expect(s.backlog.length).toBeGreaterThan(0);
    expect(s.farms[KESSLER].loyalty).toBeLessThan(loyalty + CONTRACTS.loyaltyPerDay);
  });
});

describe('Aktionen', () => {
  const act = (s: GameState, farm: number, action: FarmActionId, success = true) => {
    forceRoll(s, actionChance(s, farm, action), success);
    run(s, { type: 'farmAction', farm, action });
  };
  const withContract = (seed: number, farm = BRINKMANN) => {
    const s = fresh(seed);
    s.money = 10000;
    s.fighters = 10;
    s.farms[farm].loyalty = 90;
    forceRoll(s, 0.9, true);
    run(s, { type: 'offerContract', farm, offer: offer({ [FARMS[farm].fruits[0]]: 4 }, 120) });
    return s;
  };

  it('jede Hof-Karte zeigt drei bis fünf Aktionen', () => {
    const s = withContract(6);
    for (let i = 0; i < s.farms.length; i++) {
      const n = visibleActions(s, i).length;
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(5);
    }
  });

  it('Vorschuss: Loyalität +20, wird mit den nächsten Lieferungen verrechnet', () => {
    const s = withContract(7);
    s.farms[BRINKMANN].loyalty = 50;
    const money = s.money;
    act(s, BRINKMANN, 'advance');
    expect(s.farms[BRINKMANN].loyalty).toBe(50 + FARM_ACTIONS.advance.loyalty!);
    const credit = s.farms[BRINKMANN].credit;
    expect(credit).toBeGreaterThan(0);
    expect(s.money).toBeCloseTo(money - credit, 6);
    s.dealers = [];
    const before = s.money;
    nextMorning(s);
    expect(s.money).toBeCloseTo(before, 6);
    expect(s.farms[BRINKMANN].credit).toBeLessThan(credit);
  });

  it('Abklingzeit von zwei Tagen je Aktion und Hof', () => {
    const s = withContract(8);
    act(s, BRINKMANN, 'advance');
    const loyalty = s.farms[BRINKMANN].loyalty;
    act(s, BRINKMANN, 'advance');
    expect(s.farms[BRINKMANN].loyalty).toBe(loyalty);
    expect(s.farms[BRINKMANN].cooldowns.advance).toBe(s.day + FARM_RULES.cooldownDays);
  });

  it('Schutz: zwei Kämpfer bleiben dort, Angst steigt, Preis sinkt, Ermittlungsdruck +3', () => {
    const s = withContract(9);
    const price = cratePrice(s, BRINKMANN, 'apple');
    act(s, BRINKMANN, 'protect');
    expect(s.fighters).toBe(8);
    expect(s.farms[BRINKMANN].guards).toBe(2);
    expect(s.farms[BRINKMANN].fear).toBeGreaterThanOrEqual(FARM_ACTIONS.protect.fear!);
    expect(cratePrice(s, BRINKMANN, 'apple')).toBeLessThan(price * 0.86);
    expect(s.heat).toBe(FARM_ACTIONS.protect.heat);
    run(s, { type: 'withdrawGuards', farm: BRINKMANN });
    expect(s.fighters).toBe(10);
  });

  it('misslungene schmutzige Aktion: Kosten trotzdem, doppelter Druck, Loyalität −20', () => {
    const s = withContract(10);
    const money = s.money;
    const loyalty = s.farms[BRINKMANN].loyalty;
    s.farms[BRINKMANN].contract = null;
    act(s, BRINKMANN, 'soil', false);
    expect(s.money).toBe(money - FARM_ACTIONS.soil.cost);
    expect(s.heat).toBe(FARM_ACTIONS.soil.heat * FARM_RULES.failHeatFactor);
    expect(s.farms[BRINKMANN].loyalty).toBe(loyalty + FARM_RULES.failLoyalty);
    expect(s.farms[BRINKMANN].licenseLost).toBe(false);
  });

  it('Bodenproben beim Gang-Hof: Er verkauft nur noch an dich, zum Preis −30 %', () => {
    const s = fresh(11);
    s.money = 5000;
    act(s, EXOTICA, 'soil');
    expect(s.farms[EXOTICA].owner).toBe('free');
    expect(s.farms[EXOTICA].licenseLost).toBe(true);
    expect(availableFruits(s)).toContain('dragonfruit');
    expect(contractChance(s, EXOTICA, offer({ dragonfruit: 2 }, 70))).toBe(CONTRACTS.maxChance);
    expect(cratePrice(s, EXOTICA, 'dragonfruit', 100)).toBeLessThan(FRUITS.dragonfruit.crateCost * FARMS[EXOTICA].priceFactor * 0.75);
  });

  it('Hof übernehmen geht erst ab Angst über 70 und liefert dann zu Erzeugerkosten', () => {
    const s = fresh(12);
    s.money = 10000;
    act(s, PETERSEN, 'takeover');
    expect(s.farms[PETERSEN].owner).toBe('gang');
    s.farms[PETERSEN].fear = 75;
    act(s, PETERSEN, 'takeover');
    expect(s.farms[PETERSEN].owner).toBe('player');
    expect(s.farms[PETERSEN].contract).not.toBeNull();
    expect(cratePrice(s, PETERSEN, 'banana')).toBeCloseTo(FRUITS.banana.crateCost * FARMS[PETERSEN].priceFactor * CONTRACTS.producerPrice, 2);
    expect(s.heat).toBe(FARM_ACTIONS.takeover.heat);
  });

  it('Erntehelfer: zwei Kämpfer für drei Tage, mehr Kisten, danach zurück', () => {
    const s = withContract(13);
    const cap = farmCapacity(s, BRINKMANN);
    act(s, BRINKMANN, 'helpers');
    expect(s.fighters).toBe(8);
    expect(farmCapacity(s, BRINKMANN, s.day + 1)).toBeGreaterThan(cap);
    for (let d = 0; d < 4; d++) {
      s.crates = [];
      nextMorning(s);
    }
    expect(s.fighters).toBe(10);
  });
});

describe('Angst, Loyalität und Verrat', () => {
  it('Angst sinkt ohne neuen Druck um 5 pro Tag, Kämpfer am Tor halten sie oben', () => {
    const s = fresh(14);
    s.dealers = [];
    s.farms[KESSLER].fear = 50;
    s.farms[BRINKMANN].fear = 50;
    s.farms[BRINKMANN].guards = 2;
    nextMorning(s);
    nextMorning(s);
    expect(s.farms[KESSLER].fear).toBeLessThanOrEqual(50 - FARM_RULES.fearDecay);
    expect(s.farms[BRINKMANN].fear).toBe(50);
  });

  it('viel Angst und wenig Loyalität: Der Bauer läuft über oder sagt aus', () => {
    const s = fresh(15);
    s.dealers = [];
    const f = s.farms[KESSLER];
    let happened = false;
    for (let d = 0; d < 80 && !happened; d++) {
      f.fear = 80;
      f.loyalty = 5;
      f.lastPressure = s.day;
      const heat = s.heat;
      nextMorning(s);
      happened = f.owner === 'gang' || s.heat >= heat + FARM_RULES.testifyHeat - HEAT.decayPerDay;
    }
    expect(happened).toBe(true);
  });

  it('der Ermittlungsdruck sinkt ohne neuen Druck um 3 pro Tag', () => {
    const s = fresh(16);
    s.dealers = [];
    s.heat = 20;
    s.heatDay = -10;
    nextMorning(s);
    expect(s.heat).toBe(20 - HEAT.decayPerDay);
  });
});

describe('Ereignisse', () => {
  it('Hagel halbiert die Kapazität, Aushelfen kostet Geld und bringt Loyalität', () => {
    const s = fresh(17);
    s.story = STORY.length;
    s.money = 1000;
    const f = s.farms[BRINKMANN];
    f.contract = { crates: { apple: 4 }, pricePct: 100, days: 7, startDay: 0, endDay: 6, exclusive: false, priceLock: false, lockedPrices: null };
    f.hailUntil = s.day + 2;
    expect(farmCapacity(s, BRINKMANN)).toBe(Math.floor(FARMS[BRINKMANN].capacity * FARM_EVENTS.hail.capacity));
    s.pending.push({ id: 999, kind: 'hail', farm: BRINKMANN, day: s.day });
    const loyalty = f.loyalty;
    run(s, { type: 'answerEvent', id: 999, choice: 0 });
    expect(f.loyalty).toBe(loyalty + FARM_EVENTS.hail.helpLoyalty);
    expect(s.money).toBe(1000 - FARM_EVENTS.hail.helpCost);
    expect(f.memory).toContain('hailHelp');
  });

  it('unbeantwortete Meldungen verfallen am nächsten Morgen', () => {
    const s = fresh(18);
    s.dealers = [];
    s.pending.push({ id: 998, kind: 'bio', farm: BRINKMANN, day: s.day });
    nextMorning(s);
    expect(s.pending.some((p) => p.id === 998)).toBe(false);
    expect(s.farms[BRINKMANN].quality).toBe(FARMS[BRINKMANN].quality);
  });

  it('etwa alle zwei Tage passiert an einem Hof mit Vertrag etwas', () => {
    const s = fresh(19);
    s.dealers = [];
    s.money = 1e6;
    for (let i = 0; i < 4; i++) {
      s.farms[i].contract = { crates: { [FARMS[i].fruits[0]]: 1 }, pricePct: 100, days: 14, startDay: 0, endDay: 99, exclusive: false, priceLock: false, lockedPrices: null };
    }
    let events = 0;
    for (let d = 0; d < 30; d++) {
      nextMorning(s);
      events += s.pending.filter((p) => p.kind !== 'contractEnd' && p.day === s.day).length;
      s.crates = [];
    }
    expect(events).toBeGreaterThanOrEqual(8);
    expect(events).toBeLessThanOrEqual(24);
  });
});

describe('Spielstand mit Höfen', () => {
  it('Höfe, Verträge und Meldungen überstehen Speichern und Laden', () => {
    const s = fresh(20);
    s.money = 5000;
    s.farms[BRINKMANN].loyalty = 90;
    forceRoll(s, 0.9, true);
    run(s, { type: 'offerContract', farm: BRINKMANN, offer: offer({ apple: 3 }, 110) });
    for (let i = 0; i < 3000; i++) step(s, world, out);
    const copy = deserialize(serialize(s, 'Test')).state;
    expect(copy).toEqual(s);
    for (let i = 0; i < 3000; i++) {
      step(s, world, out);
      step(copy, world, out);
    }
    expect(JSON.stringify(copy)).toBe(JSON.stringify(s));
  });

  it('Stände aus M7 (Version 4) bekommen Höfe, die Daueraufträge entfallen', () => {
    const s = fresh(21) as unknown as Record<string, unknown>;
    delete s.farms;
    delete s.pending;
    delete s.heat;
    delete s.heatDay;
    s.orders = { apple: 4, banana: 0, strawberry: 0, grape: 0, mango: 0, dragonfruit: 0 };
    s.version = 4;
    const raw = JSON.stringify({ format: 'obst-tycoon-save', version: 4, savedAt: '', label: 'M7', state: s });
    const f = deserialize(raw);
    expect(f.version).toBe(STATE_VERSION);
    expect(f.state.farms).toHaveLength(6);
    expect((f.state as unknown as Record<string, unknown>).orders).toBeUndefined();
    for (let i = 0; i < 500; i++) step(f.state, world, out);
  });
});
