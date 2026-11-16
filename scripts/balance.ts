// Balancing-Bot: spielt das Spiel ohne Darstellung und nutzt dieselben Befehle wie die Oberfläche.
// Aufruf: npm run balance [-- --days 40 --seed 1 --quiet]
import { CRATE_UNITS, DISTRICT_IDS, FIGHTERS, FRUIT_IDS, STOCK, TICKS_PER_HOUR, WHOLESALER, type FruitId } from '../src/data/balance';
import { DISTRICT_NAMES } from '../src/data/names';
import { enqueue, type Command } from '../src/sim/commands';
import {
  capacity,
  countCrates,
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
import { dailyDemand, dailySales } from '../src/sim/stock';
import { stockAmpel } from '../src/sim/supply';
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

/** Tagesbedarf je Sorte in den eigenen Vierteln (Stück) */
function demandOf(f: FruitId): number {
  let n = 0;
  for (let i = 0; i < DISTRICT_IDS.length; i++) if (isOwned(s, i)) n += dailyDemand(world, i, f);
  return n;
}

/**
 * Daueraufträge: Je Sorte so viel, wie voraussichtlich verkauft wird, und den Bestand Richtung
 * anderthalb Tage Reichweite schieben. Verkauft wird höchstens der Tagesbedarf der eigenen Viertel.
 */
function planOrders(): void {
  const fruits = unlockedFruits(s);
  const perDealer = 150;
  const totalDemand = fruits.reduce((a, f) => a + demandOf(f), 0);
  const throughput = s.dealers.length * perDealer;
  const wants = new Map<FruitId, number>();
  for (const f of FRUIT_IDS) {
    if (!fruits.includes(f)) continue;
    const demand = demandOf(f);
    const expected = Math.max(dailySales(s, f), Math.min(demand, (throughput * demand) / Math.max(1, totalDemand)));
    const perDay = expected / CRATE_UNITS;
    // Lieferung deckt den Tagesverkauf, dazu ein Teil der Lücke zum Zielbestand am Abend (halber Tag)
    const want = Math.ceil(perDay + Math.max(0, perDay * 0.5 - countCrates(s, f)) * 0.5);
    wants.set(f, Math.max(0, Math.min(WHOLESALER.maxCratesPerFruit, want)));
  }
  // Nicht mehr bestellen, als morgens ins Lager passt
  const total = [...wants.values()].reduce((a, b) => a + b, 0);
  const room = Math.max(0, capacity(s) - Math.round(s.crates.length * 0.3));
  const scale = total > room ? room / total : 1;
  for (const [f, n] of wants) {
    const order = Math.floor(n * scale);
    if (order !== s.orders[f]) cmd({ type: 'setOrder', fruit: f, crates: order });
  }
}

function plannedCrates(): number {
  return FRUIT_IDS.reduce((a, f) => a + s.orders[f], 0);
}

function decide(): void {
  planOrders();
  const reserve = 30 + plannedCrates() * 25;
  // Notlösung Kiosk: Lager leer am Vormittag
  if (s.crates.length === 0 && s.dayTick < TICKS_PER_HOUR * 6) {
    const f = unlockedFruits(s).sort((a, b) => demandOf(b) - demandOf(a))[0];
    for (let i = 0; i < STOCK.kioskPerDay && f; i++) cmd({ type: 'kioskBuy', fruit: f });
  }
  // Lager groß genug für Lieferung plus Bestand
  const wanted = unlockedFruits(s).reduce((a, f) => a + Math.max(dailySales(s, f), 1) / CRATE_UNITS, 0);
  if (capacity(s) < wanted * 1.6 + 2 && s.shelves < maxShelves(world) && s.money > shelfCost(s) + reserve) cmd({ type: 'buyShelf' });
  // Kühlraum, sobald empfindliche Ware im Spiel ist
  if (!s.coldRoom && unlockedFruits(s).includes('strawberry') && s.money > STOCK.coldRoomCost + reserve) cmd({ type: 'buyColdRoom' });
  // Ausrüstung
  const up = nextUpgrade(s);
  if (up && isOwned(s, DISTRICT_IDS.indexOf(up.unlock)) && s.money > up.cost + reserve) cmd({ type: 'buyUpgrade' });
  // Verkäufer, solange Plätze frei sind und die Nachfrage reicht
  const totalDemand = unlockedFruits(s).reduce((a, f) => a + demandOf(f), 0);
  // Mehr Verkäufer, als das Lager täglich versorgen kann, stehen nur herum (etwa 5 Kisten je Verkäufer und Tag)
  const supplyLimited = (s.dealers.length + 1) * 5 > capacity(s) && s.shelves >= maxShelves(world);
  if (s.dealers.length < spotCapacity(s, world) && !supplyLimited && s.dealers.length * 110 < totalDemand && s.money > dealerCost(s) + reserve)
    cmd({ type: 'hireDealer' });
  // Nächstes Ziel erobern
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
let redHours = 0;
let emptyHours = 0;
let spoiled = 0;
if (!QUIET) console.log('Tag  Geld      Heute   Verk.  Regale  Kisten  Bestellt  Kämpfer  Viertel  Ampel  Leer  Auftrag');
for (let day = 0; day < DAYS; day++) {
  const startDay = s.day;
  let emptyToday = 0;
  while (s.day === startDay) {
    if (s.dayTick % TICKS_PER_HOUR === 0) {
      decide();
      if (day > 0 && stockAmpel(s).ampel === 'red') redHours++;
      // Leerlauf zählt nur, solange das Lager noch wachsen kann (danach begrenzt die Halle den Nachschub)
      if (day > 0 && s.shelves < maxShelves(world) && s.crates.length === 0 && s.dealers.some((d) => d.mode === 'idle' && d.load.length === 0)) {
        emptyHours++;
        emptyToday++;
      }
    }
    step(s, world, out);
    out.sales.length = 0;
    out.cues.length = 0;
  }
  const last = s.messages.filter((m) => m.kind === 'money').pop();
  const m = last?.text.match(/(\d+) Kisten? verdorben/);
  if (m) spoiled += Number(m[1]);
  DISTRICT_IDS.forEach((d, i) => {
    if (isOwned(s, i) && conquered[d] === undefined) conquered[d] = day + 1;
  });
  if (!QUIET) {
    const owned = DISTRICT_IDS.filter((_, i) => isOwned(s, i)).length;
    console.log(
      `${String(day + 1).padStart(3)}  ${s.money.toFixed(0).padStart(7)} €  ${String(s.history[s.history.length - 1] ?? 0).padStart(5)} €  ${String(
        s.dealers.length,
      ).padStart(4)}  ${String(s.shelves).padStart(6)}  ${String(s.crates.length).padStart(6)}  ${String(plannedCrates()).padStart(8)}  ${String(
        s.fighters,
      ).padStart(7)}  ${String(owned).padStart(7)}  ${stockAmpel(s).ampel.padEnd(6)} ${String(emptyToday).padStart(4)}  ${STORY[s.story]?.title ?? 'fertig'}`,
    );
  }
}
const seconds = (performance.now() - started) / 1000;
const inRange = (v: number | undefined, a: number, b: number) => v !== undefined && v >= a && v <= b;
const checks = [
  { name: 'Bahnhofsviertel an Tag 2 bis 5', ok: inRange(conquered.station, 2, 5), info: conquered.station },
  { name: 'Altstadt an Tag 5 bis 12', ok: inRange(conquered.oldtown, 5, 12), info: conquered.oldtown },
  { name: 'Bankenviertel an Tag 12 bis 25', ok: inRange(conquered.banking, 12, 25), info: conquered.banking },
  { name: 'Verkäufer ohne Ware in höchstens 5 % der Stunden', ok: emptyHours <= DAYS * 16 * 0.05, info: `${emptyHours} Stunden` },
  { name: 'Laufzeit unter 30 Sekunden', ok: seconds < 30, info: `${seconds.toFixed(1)} s` },
];
console.log('\nEroberungen:', DISTRICT_IDS.map((d) => `${DISTRICT_NAMES[d]} ${conquered[d] ?? '-'}`).join(', '));
console.log('Zielkorridore:');
for (const c of checks) console.log(`  [${c.ok ? 'erfüllt ' : 'VERFEHLT'}] ${c.name}: ${c.info ?? '-'}`);
console.log(`Verkauft ${s.stats.sold} Stück, verdorben ${spoiled} Kisten, Ampel rot in ${redHours} Stunden, Kämpfe ${s.stats.battlesWon} gewonnen, ${s.stats.battlesLost} verloren.`);
if (checks.some((c) => !c.ok)) process.exitCode = 1;
