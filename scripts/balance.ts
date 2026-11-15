// Balancing-Bot: spielt das Spiel ohne Darstellung mit einer einfachen Standardstrategie und nutzt
// dieselben Befehle wie die Oberfläche. Aufruf: npm run balance [-- --days 40 --seed 1 --quiet]
import { DISTRICT_IDS, FIGHTERS, FRUITS, TICKS_PER_HOUR, type FruitId } from '../src/data/balance';
import { DISTRICT_NAMES } from '../src/data/names';
import { enqueue, type Command } from '../src/sim/commands';
import {
  capacity,
  carryCrates,
  dealerCost,
  fighterCost,
  isAttackable,
  isOwned,
  maxShelves,
  nextUpgrade,
  shelfCost,
  spotCapacity,
  unlockedFruits,
} from '../src/sim/selectors';
import { createInitialState } from '../src/sim/state';
import { STORY } from '../src/sim/story';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import type { GameState } from '../src/sim/types';
import { getWorld } from '../src/sim/world';

const args = process.argv.slice(2);
const arg = (name: string, def: number) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : def;
};
const DAYS = arg('days', 40);
const SEED = arg('seed', 1);
const QUIET = args.includes('--quiet');

const world = getWorld();
const out = createStepOutput();
const s: GameState = createInitialState(world, { seed: SEED, ambient: false });

function cmd(c: Command): void {
  enqueue(s, c);
  flushCommands(s, world, out);
}

/** Beste freigeschaltete Sorte nach Gewinn je Kiste, die man sich leisten kann */
function bestFruit(budget: number): FruitId | null {
  let best: FruitId | null = null;
  for (const f of unlockedFruits(s)) {
    if (FRUITS[f].crateCost > budget) continue;
    if (!best || FRUITS[f].unitPrice * 20 - FRUITS[f].crateCost > FRUITS[best].unitPrice * 20 - FRUITS[best].crateCost) best = f;
  }
  return best;
}

function decide(): void {
  const carry = carryCrates(s);
  const wantStock = Math.min(capacity(s), s.dealers.length * carry * 2);
  // 1. Obst nachkaufen
  for (let guard = 0; guard < 80 && s.crates.length < wantStock; guard++) {
    const f = bestFruit(s.money);
    if (!f) break;
    const before = s.crates.length;
    cmd({ type: 'buyCrate', fruit: f });
    if (s.crates.length === before) break;
  }
  const reserve = 20 + s.dealers.length * carry * 12;
  // 2. Ausrüstung
  const up = nextUpgrade(s);
  if (up && isOwned(s, DISTRICT_IDS.indexOf(up.unlock)) && s.money > up.cost + reserve) cmd({ type: 'buyUpgrade' });
  // 3. Verkäufer, solange Plätze frei sind
  if (s.dealers.length < spotCapacity(s, world) && s.money > dealerCost(s) + reserve) cmd({ type: 'hireDealer' });
  // 4. Regale, wenn das Lager knapp ist
  if (capacity(s) < s.dealers.length * carry * 2 && s.shelves < maxShelves(world) && s.money > shelfCost(s) + reserve) cmd({ type: 'buyShelf' });
  // 5. Nächstes Ziel erobern
  let target = -1;
  for (let i = 0; i < DISTRICT_IDS.length; i++) {
    if (!isAttackable(s, world, i)) continue;
    if (target < 0 || s.districts[i].gang < s.districts[target].gang) target = i;
  }
  if (target >= 0) {
    const need = Math.min(FIGHTERS.max, Math.ceil(s.districts[target].gang * 1.6) + 2);
    for (let guard = 0; guard < 100 && s.fighters < need && s.money > fighterCost(s) + reserve; guard++) {
      const before = s.fighters;
      cmd({ type: 'hireFighter' });
      if (s.fighters === before) break;
    }
    if (s.fighters >= need) {
      cmd({ type: 'attack', district: target });
      cmd({ type: 'battleAuto' });
      cmd({ type: 'battleClose' });
    }
  }
}

const started = performance.now();
const conquered: Record<string, number> = {};
if (!QUIET) console.log('Tag  Geld      Heute   Verk.  Regale  Kisten  Kämpfer  Viertel  Auftrag');
for (let day = 0; day < DAYS; day++) {
  const startDay = s.day;
  while (s.day === startDay) {
    if (s.dayTick % TICKS_PER_HOUR === 0) decide();
    step(s, world, out);
    out.sales.length = 0;
  }
  DISTRICT_IDS.forEach((d, i) => {
    if (isOwned(s, i) && conquered[d] === undefined) conquered[d] = day + 1;
  });
  if (!QUIET) {
    const owned = DISTRICT_IDS.filter((_, i) => isOwned(s, i)).length;
    console.log(
      `${String(day + 1).padStart(3)}  ${s.money.toFixed(0).padStart(7)} €  ${String(s.history[s.history.length - 1] ?? 0).padStart(5)} €  ${String(
        s.dealers.length,
      ).padStart(4)}  ${String(s.shelves).padStart(6)}  ${String(s.crates.length).padStart(6)}  ${String(s.fighters).padStart(7)}  ${String(owned).padStart(7)}  ${
        STORY[s.story]?.title ?? 'fertig'
      }`,
    );
  }
}
const seconds = (performance.now() - started) / 1000;
const inRange = (v: number | undefined, a: number, b: number) => v !== undefined && v >= a && v <= b;
const checks = [
  { name: 'Bahnhofsviertel an Tag 2 bis 4', ok: inRange(conquered.station, 2, 4), info: conquered.station },
  { name: 'Altstadt an Tag 4 bis 9', ok: inRange(conquered.oldtown, 4, 9), info: conquered.oldtown },
  { name: 'Bankenviertel an Tag 12 bis 25', ok: inRange(conquered.banking, 12, 25), info: conquered.banking },
  { name: 'Laufzeit unter 20 Sekunden', ok: seconds < 20, info: `${seconds.toFixed(1)} s` },
];
console.log('\nEroberungen:', DISTRICT_IDS.map((d) => `${DISTRICT_NAMES[d]} ${conquered[d] ?? '-'}`).join(', '));
console.log('Zielkorridore:');
for (const c of checks) console.log(`  [${c.ok ? 'erfüllt ' : 'VERFEHLT'}] ${c.name}: ${c.info ?? '-'}`);
console.log(`Verkauft ${s.stats.sold} Stück, Kämpfe ${s.stats.battlesWon} gewonnen, ${s.stats.battlesLost} verloren.`);
if (checks.some((c) => !c.ok)) process.exitCode = 1;
