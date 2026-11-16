// Balancing-Bot: spielt das Spiel ohne Darstellung und nutzt dieselben Befehle wie die Oberfläche.
// Drei Strategien: sauber (nur saubere Aktionen), gemischt, brutal (Druck und schmutzige Aktionen, wo möglich).
// Aufruf: npm run balance [-- --days 120 --seed 1 --strategy gemischt --quiet]
import { CONTRACTS, CRATE_UNITS, DISTRICT_IDS, FARMS, FIGHTERS, FRUIT_IDS, FRUITS, STOCK, TICKS_PER_HOUR, type FarmActionId, type FruitId } from '../src/data/balance';
import { DISTRICT_NAMES } from '../src/data/names';
import { enqueue, type Command } from '../src/sim/commands';
import { actionProblem, contractChance, demandCrates, eventView, hasContract, suggestOffer, visibleActions, type Offer } from '../src/sim/farms';
import {
  availableFruits,
  capacity,
  dealerCost,
  fighterCost,
  isAttackable,
  isOwned,
  maxShelves,
  nextUpgrade,
  shelfCost,
  spotCapacity,
} from '../src/sim/selectors';
import { createInitialState } from '../src/sim/state';
import { dailySales } from '../src/sim/stock';
import { STORY } from '../src/sim/story';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import { stockAmpel } from '../src/sim/supply';
import type { GameState } from '../src/sim/types';
import { getWorld } from '../src/sim/world';

type Strategy = 'sauber' | 'gemischt' | 'brutal';

const args = process.argv.slice(2);
const arg = (name: string, def: number) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : def;
};
const argStr = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
};
const DAYS = arg('days', 120);
const SEED = arg('seed', 1);
const QUIET = args.includes('--quiet');
const ONLY = argStr('strategy') as Strategy | null;

const world = getWorld();

interface Result {
  strategy: Strategy;
  conquered: Record<string, number>;
  moneyAt: Record<number, number>;
  maxHeat: number;
  heatDays30: number;
  actions: Record<string, number>;
  contracts: number;
  ownFarms: number;
  emptyHours: number;
  sold: number;
  seconds: number;
}

function play(strategy: Strategy): Result {
  const out = createStepOutput();
  const s: GameState = createInitialState(world, { seed: SEED, ambient: false });
  const cmd = (c: Command) => {
    enqueue(s, c);
    flushCommands(s, world, out);
  };
  const actions: Record<string, number> = {};
  const act = (farm: number, action: FarmActionId) => {
    if (!visibleActions(s, farm).includes(action) || actionProblem(s, farm, action)) return false;
    const before = s.stats.actions;
    cmd({ type: 'farmAction', farm, action });
    if (s.stats.actions > before) actions[action] = (actions[action] ?? 0) + 1;
    return true;
  };

  /** Kisten pro Tag, die je Sorte gebraucht werden: Bedarf der eigenen Viertel, höchstens was Verkäufer und Lager schaffen */
  function wanted(): Map<FruitId, number> {
    const fruits = availableFruits(s);
    const perDealer = 7;
    const total = fruits.reduce((a, f) => a + demandCrates(s, world, f), 0);
    const room = Math.max(4, capacity(s) - 2);
    const throughput = Math.min(room, s.dealers.length * perDealer);
    const res = new Map<FruitId, number>();
    for (const f of FRUIT_IDS) {
      if (!fruits.includes(f)) continue;
      const share = (throughput * demandCrates(s, world, f)) / Math.max(1, total);
      res.set(f, Math.max(Math.ceil(dailySales(s, f) / CRATE_UNITS), Math.round(Math.min(demandCrates(s, world, f) * 1.1, share))));
    }
    return res;
  }

  function contracted(f: FruitId): number {
    let n = 0;
    for (const farm of s.farms) if (hasContract(farm, s.day + 1)) n += farm.contract!.crates[f] ?? 0;
    return n;
  }

  /** Verträge: fehlende Mengen bei Höfen bestellen, die die Sorte anbauen */
  function planContracts(): void {
    const need = wanted();
    for (let i = 0; i < FARMS.length; i++) {
      const farm = s.farms[i];
      if (farm.owner === 'gang' || farm.talkDay > s.day) continue;
      const def = FARMS[i];
      const current = hasContract(farm, s.day + 1) ? farm.contract! : null;
      const crates: Partial<Record<FruitId, number>> = {};
      let total = 0;
      for (const f of def.fruits) {
        const have = current?.crates[f] ?? 0;
        const gap = (need.get(f) ?? 0) - (contracted(f) - have);
        crates[f] = Math.max(0, Math.min(def.capacity - total, gap));
        total += crates[f]!;
      }
      if (total <= 0) continue;
      const currentTotal = current ? Object.values(current.crates).reduce((a, b) => a + (b ?? 0), 0) : 0;
      if (farm.owner === 'player') {
        if (!current || Math.abs(total - currentTotal) > 1) cmd({ type: 'offerContract', farm: i, offer: { crates, pricePct: 100, days: 14, exclusive: true } });
        continue;
      }
      // Laufender Vertrag: nur bei deutlich mehr Bedarf neu verhandeln (Verlängern übernehmen die Meldungen)
      if (current && total <= currentTotal + 1) continue;
      const base = suggestOffer(s, world, i);
      const offer: Offer = { ...base, crates, days: strategy === 'sauber' ? 14 : 7, exclusive: false };
      for (let p = CONTRACTS.pricePctMin; p <= CONTRACTS.pricePctMax; p += CONTRACTS.pricePctStep) {
        offer.pricePct = p;
        if (contractChance(s, i, offer) >= 0.8) break;
      }
      if (contractChance(s, i, offer) < 0.5) continue;
      cmd({ type: 'offerContract', farm: i, offer });
    }
  }

  /** Meldungen beantworten */
  function answerEvents(): void {
    for (const p of [...s.pending]) {
      const v = eventView(s, p);
      let choice: 0 | 1 = 0;
      if (p.kind === 'contractEnd') choice = v.options[0] === 'Verlängern' ? 0 : 1;
      if (p.kind === 'hail') choice = strategy === 'brutal' ? 1 : 0;
      if (p.kind === 'renegotiate') choice = strategy === 'brutal' ? 1 : 0;
      if (p.kind === 'harvest') choice = capacity(s) - s.crates.length > 6 ? 0 : 1;
      cmd({ type: 'answerEvent', id: p.id, choice });
    }
  }

  /** Kämpfer, die für den nächsten Angriff gebraucht werden */
  function attackNeed(): number {
    let need = 0;
    for (let i = 0; i < DISTRICT_IDS.length; i++) {
      if (!isAttackable(s, world, i)) continue;
      const n = Math.min(FIGHTERS.max, Math.ceil(s.districts[i].gang * 1.6) + 2);
      if (!need || n < need) need = n;
    }
    return need;
  }

  /** Aktionen bei den Bauern je nach Strategie */
  function farmActions(reserve: number): void {
    const spareFighters = s.fighters - attackNeed();
    s.farms.forEach((farm, i) => {
      if (s.money < reserve) return;
      const crates = farm.contract ? Object.values(farm.contract.crates).reduce((a, b) => a + (b ?? 0), 0) : 0;
      if (farm.owner === 'free' && hasContract(farm, s.day)) {
        if (farm.loyalty < 70 && s.money > reserve * 4) act(i, 'advance');
        if (strategy === 'sauber' && !farm.contract!.priceLock && farm.contract!.endDay - s.day < 10) act(i, 'bind');
        if (strategy !== 'sauber' && crates >= 5 && farm.guards === 0 && (spareFighters >= 2 || attackNeed() === 0)) act(i, 'protect');
        if (strategy === 'brutal' && crates >= 5 && s.money > 400 + reserve) act(i, 'soil');
        if (strategy !== 'sauber' && farm.fear > 70 && s.money > 4000 + reserve * 2) act(i, 'takeover');
      }
      if (farm.owner === 'gang' && strategy !== 'sauber') {
        // Der Gang-Hof mit Drachenfrüchten ist das Ziel: Bodenproben (brutal) oder Angst und Übernahme (gemischt)
        const exotic = FARMS[i].fruits.includes('dragonfruit');
        if (strategy === 'brutal' && s.money > 400 + reserve) act(i, 'soil');
        if (exotic && strategy === 'gemischt' && (spareFighters >= 2 || attackNeed() === 0)) act(i, 'protect');
        if (exotic && strategy === 'gemischt' && s.money > 150 + reserve * 2) act(i, 'poach');
        if (farm.fear > 70 && s.money > 4000 + reserve * 2) act(i, 'takeover');
      }
    });
  }

  function decide(): void {
    answerEvents();
    planContracts();
    // Rücklage: eine Tageslieferung aller Verträge
    let dailyCost = 0;
    s.farms.forEach((f, i) => {
      if (!hasContract(f, s.day)) return;
      for (const fr of FARMS[i].fruits) dailyCost += (f.contract!.crates[fr] ?? 0) * FRUITS[fr].crateCost;
    });
    const reserve = 30 + dailyCost;
    // Notlösung Kiosk: Lager leer am Vormittag
    if (s.crates.length === 0 && s.dayTick < TICKS_PER_HOUR * 6) {
      const f = availableFruits(s).sort((a, b) => demandCrates(s, world, b) - demandCrates(s, world, a))[0];
      for (let k = 0; k < STOCK.kioskPerDay && f; k++) cmd({ type: 'kioskBuy', fruit: f });
    }
    const daily = FRUIT_IDS.reduce((a, f) => a + contracted(f), 0);
    if (capacity(s) < daily * 1.5 + 2 && s.shelves < maxShelves(world) && s.money > shelfCost(s) + reserve) cmd({ type: 'buyShelf' });
    if (!s.coldRoom && contracted('strawberry') + contracted('grape') > 3 && s.money > STOCK.coldRoomCost + reserve) cmd({ type: 'buyColdRoom' });
    const up = nextUpgrade(s);
    if (up && isOwned(s, DISTRICT_IDS.indexOf(up.unlock)) && s.money > up.cost + reserve) cmd({ type: 'buyUpgrade' });
    const totalDemand = availableFruits(s).reduce((a, f) => a + demandCrates(s, world, f), 0);
    // Mehr Verkäufer, als Höfe und Lager versorgen können, stehen nur herum (etwa 5 Kisten je Verkäufer und Tag)
    const supplyLimited = (s.dealers.length + 1) * 5 > Math.min(capacity(s) + (s.shelves < maxShelves(world) ? 12 : 0), Math.max(daily, 6) + 4);
    const wantDealer = s.dealers.length < spotCapacity(s, world) && !supplyLimited && s.dealers.length * 6 < totalDemand;
    if (wantDealer && s.money > dealerCost(s) + reserve) cmd({ type: 'hireDealer' });
    // Erst Verkäufer, dann Kämpfer: Geld für den nächsten Verkäufer bleibt liegen
    const keep = reserve + (wantDealer ? dealerCost(s) : 0);
    farmActions(keep);
    // Nächstes Ziel erobern
    let target = -1;
    for (let i = 0; i < DISTRICT_IDS.length; i++) {
      if (!isAttackable(s, world, i)) continue;
      if (target < 0 || s.districts[i].gang < s.districts[target].gang) target = i;
    }
    if (target >= 0) {
      const need = Math.min(FIGHTERS.max, Math.ceil(s.districts[target].gang * 1.6) + 2);
      for (let guard = 0; guard < 100 && s.fighters < need && s.money > fighterCost(s) + keep; guard++) {
        const before = s.fighters;
        cmd({ type: 'hireFighter' });
        if (s.fighters === before) break;
      }
      if (s.fighters >= need) {
        cmd({ type: 'attack', district: target });
        cmd({ type: 'battleAuto' });
        cmd({ type: 'battleClose' });
      }
    } else if (strategy !== 'sauber' && s.fighters < 12 && s.money > fighterCost(s) + keep * 2) cmd({ type: 'hireFighter' });
  }

  const started = performance.now();
  const conquered: Record<string, number> = {};
  const moneyAt: Record<number, number> = {};
  let maxHeat = 0;
  let heatDays30 = 0;
  let emptyHours = 0;
  if (!QUIET) console.log(`\nStrategie ${strategy}\nTag  Geld      Heute   Verk.  Regale  Kisten  Vertr.  Kämpfer  Viertel  Druck  Ampel  Auftrag`);
  for (let day = 0; day < DAYS; day++) {
    const startDay = s.day;
    while (s.day === startDay) {
      if (s.dayTick % TICKS_PER_HOUR === 0) {
        decide();
        // Leerlauf zählt nur, solange Höfe und Lager mehr hergeben könnten (sonst begrenzt der Nachschub)
        const farmRoom = s.farms.reduce((a, f, i) => a + (f.owner === 'gang' ? 0 : FARMS[i].capacity), 0) - FRUIT_IDS.reduce((a, f) => a + contracted(f), 0);
        const canGrow = s.shelves < maxShelves(world) && farmRoom > 2;
        if (day > 0 && canGrow && s.crates.length === 0 && s.dealers.some((d) => d.mode === 'idle' && d.load.length === 0)) emptyHours++;
      }
      step(s, world, out);
      out.sales.length = 0;
      out.cues.length = 0;
    }
    maxHeat = Math.max(maxHeat, s.heat);
    if (s.heat >= 30) heatDays30++;
    if ([10, 20, 40, 80, 120].includes(day + 1)) moneyAt[day + 1] = Math.round(s.money);
    DISTRICT_IDS.forEach((d, i) => {
      if (isOwned(s, i) && conquered[d] === undefined) conquered[d] = day + 1;
    });
    if (!QUIET && (day < 30 || (day + 1) % 10 === 0)) {
      const owned = DISTRICT_IDS.filter((_, i) => isOwned(s, i)).length;
      const contracts = s.farms.filter((f) => hasContract(f, s.day)).length;
      console.log(
        `${String(day + 1).padStart(3)}  ${s.money.toFixed(0).padStart(7)} €  ${String(s.history[s.history.length - 1] ?? 0).padStart(5)} €  ${String(
          s.dealers.length,
        ).padStart(4)}  ${String(s.shelves).padStart(6)}  ${String(s.crates.length).padStart(6)}  ${String(contracts).padStart(6)}  ${String(s.fighters).padStart(
          7,
        )}  ${String(owned).padStart(7)}  ${String(Math.round(s.heat)).padStart(5)}  ${stockAmpel(s).ampel.padEnd(6)} ${STORY[s.story]?.title ?? 'fertig'}`,
      );
    }
  }
  return {
    strategy,
    conquered,
    moneyAt,
    maxHeat,
    heatDays30,
    actions,
    contracts: s.stats.contracts,
    ownFarms: s.farms.filter((f) => f.owner === 'player').length,
    emptyHours,
    sold: s.stats.sold,
    seconds: (performance.now() - started) / 1000,
  };
}

const strategies: Strategy[] = ONLY ? [ONLY] : ['sauber', 'gemischt', 'brutal'];
const results = strategies.map(play);
const inRange = (v: number | undefined, a: number, b: number) => v !== undefined && v >= a && v <= b;
let failed = false;
console.log('\nErgebnis');
for (const r of results) {
  console.log(`\n${r.strategy}: Eroberungen ${DISTRICT_IDS.map((d) => `${DISTRICT_NAMES[d]} ${r.conquered[d] ?? '-'}`).join(', ')}`);
  console.log(`  Geld an Tag ${Object.entries(r.moneyAt).map(([d, m]) => `${d}: ${m} €`).join(', ')}`);
  console.log(`  Ermittlungsdruck höchstens ${Math.round(r.maxHeat)}, ${r.heatDays30} Tage ab 30 (beobachtet)`);
  console.log(`  Verträge ${r.contracts}, eigene Höfe ${r.ownFarms}, Aktionen ${Object.entries(r.actions).map(([a, n]) => `${a} ${n}`).join(', ') || 'keine'}`);
  console.log(`  Verkauft ${r.sold} Stück, Laufzeit ${r.seconds.toFixed(1)} s`);
  const checks = [
    { name: 'Bahnhofsviertel an Tag 2 bis 7', ok: inRange(r.conquered.station, 2, 7), info: r.conquered.station },
    { name: 'Bankenviertel an Tag 12 bis 30', ok: inRange(r.conquered.banking, 12, 30), info: r.conquered.banking },
    { name: 'Verkäufer ohne Ware (solange Höfe und Lager mehr hergeben) in höchstens 5 % der Stunden', ok: r.emptyHours <= DAYS * 16 * 0.05, info: `${r.emptyHours} Stunden` },
    { name: 'Laufzeit unter 30 Sekunden', ok: r.seconds < 30, info: `${r.seconds.toFixed(1)} s` },
  ];
  if (r.strategy === 'sauber') checks.push({ name: 'sauber: kein Ermittlungsdruck', ok: r.maxHeat === 0, info: Math.round(r.maxHeat) });
  if (r.strategy === 'brutal') checks.push({ name: 'brutal: wird beobachtet (Druck ab 30)', ok: r.maxHeat >= 30, info: Math.round(r.maxHeat) });
  for (const c of checks) {
    console.log(`  [${c.ok ? 'erfüllt ' : 'VERFEHLT'}] ${c.name}: ${c.info ?? '-'}`);
    if (!c.ok) failed = true;
  }
}
if (failed) process.exitCode = 1;
