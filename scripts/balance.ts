// Balancing-Bot: spielt 60 Spieltage ohne Darstellung mit einer einfachen Standardstrategie.
// Er nutzt dieselben Befehle wie die Oberfläche.
// Aufruf: npm run balance [-- --days 60 --seed 1 --quiet]
import {
  DISTRICT_IDS,
  DISTRICTS,
  EQUIPMENT,
  OFFICE_LEVELS,
  PRODUCTS,
  REPUTATION_THRESHOLDS,
  ROOMS,
  SALES,
  STAFF,
  TIME,
  WAREHOUSE,
  type EquipmentId,
  type ProductId,
} from '../src/data/balance';
import { enqueue, type Command } from '../src/sim/commands';
import { findPath, pathLength } from '../src/sim/pathfinding';
import {
  freeSlots,
  freeSpace,
  officeLevel,
  staffLimit,
  stockUnits,
  totalCapacity,
  unlockedProducts,
} from '../src/sim/selectors';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, flushCommands, step } from '../src/sim/step';
import { demandCurve, weekdayFactor } from '../src/sim/time';
import type { GameState } from '../src/sim/types';
import { getWorld, type Spot } from '../src/sim/world';

const args = process.argv.slice(2);
const arg = (name: string, def: number) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : def;
};
const DAYS = arg('days', 60);
const SEED = arg('seed', 1);
const QUIET = args.includes('--quiet');

const world = getWorld();
const out = createStepOutput();
const s: GameState = createInitialState(world, { seed: SEED, ambient: false });

function cmd(c: Command): void {
  enqueue(s, c);
  flushCommands(s, world, out);
}

const pathLen = new Map<string, number>();
function spotDistance(spot: Spot, mode: 'foot' | 'mixed' | 'road'): number {
  const key = `${spot.index}:${mode}`;
  let v = pathLen.get(key);
  if (v === undefined) {
    const p = findPath(world, world.warehouse.door, spot.tile, mode === 'road' ? 'mixed' : mode);
    v = p ? pathLength(world, p) : 999;
    pathLen.set(key, v);
  }
  return v;
}

/** Grobe Schätzung der verkauften Einheiten pro Tag für einen Verkäufer an einem Platz */
function estimateUnits(spot: Spot, eq: EquipmentId, talent: number, sharers: number, day: number): number {
  const def = EQUIPMENT[eq];
  const L = spotDistance(spot, def.pathMode);
  const hourPerSec = 1 / TIME.secondsPerGameHour;
  const oneWay = (L / def.speed) * hourPerSec;
  const turnaround = 2 * oneWay + (SALES.reloadSeconds + 2 * def.setupSeconds) * hourPerSec;
  const buy = Math.min(1, SALES.baseBuyChance * STAFF.talentFactor[talent - 1]);
  const wf = weekdayFactor(spot.district, day);
  let t = TIME.dayStartHour + oneWay + (SALES.reloadSeconds + def.setupSeconds) * hourPerSec;
  let units = 0;
  const dt = 0.05;
  while (t < TIME.returnHour) {
    let left = def.capacity * (1 - SALES.restockThreshold);
    while (left > 0 && t < TIME.returnHour) {
      const rate = (demandCurve(spot.district, t) * spot.factor * wf * buy) / sharers;
      const sold = Math.min(left, rate * dt);
      left -= sold;
      units += sold;
      t += dt;
    }
    t += turnaround;
  }
  return units;
}

function planAssignments(day: number): Map<number, number> {
  const plan = new Map<number, number>();
  const count = new Map<number, number>();
  const vendors = [...s.staff].sort((a, b) => EQUIPMENT[b.equipment].capacity - EQUIPMENT[a.equipment].capacity || b.talent - a.talent);
  for (const v of vendors) {
    let best = -1;
    let bestGain = -1;
    for (const spot of world.spots) {
      if (EQUIPMENT[v.equipment].pathMode === 'road' && !spot.parking) continue;
      const n = count.get(spot.index) ?? 0;
      if (n >= 2) continue;
      const gain = estimateUnits(spot, v.equipment, v.talent, n + 1, day) * (spot.district === 'oldtown' ? 1.2 : 1);
      // Bei geteiltem Platz verliert der erste Verkäufer die Hälfte
      const loss = n > 0 ? estimateUnits(spot, v.equipment, v.talent, 1, day) - estimateUnits(spot, v.equipment, v.talent, 2, day) : 0;
      if (gain - loss > bestGain) {
        bestGain = gain - loss;
        best = spot.index;
      }
    }
    if (best >= 0) {
      plan.set(v.id, best);
      count.set(best, (count.get(best) ?? 0) + 1);
    }
  }
  return plan;
}

function expectedDailyUnits(plan: Map<number, number>, day: number): number {
  let n = 0;
  const count = new Map<number, number>();
  for (const spot of plan.values()) count.set(spot, (count.get(spot) ?? 0) + 1);
  for (const v of s.staff) {
    const spot = plan.get(v.id);
    if (spot === undefined) continue;
    n += estimateUnits(world.spots[spot], v.equipment, v.talent, count.get(spot)!, day);
  }
  return n;
}

function productMix(plan: Map<number, number>): Map<ProductId, number> {
  const mix = new Map<ProductId, number>();
  const products = unlockedProducts(s).filter((p) => PRODUCTS[p].shelfDays >= 4 || s.warehouse.rooms.some((r) => r.type === 'coldroom'));
  for (const v of s.staff) {
    const spot = plan.get(v.id);
    if (spot === undefined) continue;
    const prefs = DISTRICT_PREFS[world.spots[spot].district];
    for (const p of products) mix.set(p, (mix.get(p) ?? 0) + prefs[p]);
  }
  return mix;
}

const DISTRICT_PREFS = Object.fromEntries(DISTRICT_IDS.map((d) => [d, DISTRICTS[d].prefs])) as Record<string, Record<ProductId, number>>;

function invest(plan: Map<number, number>, needCrates: number): void {
  const reserve = 150 + s.staff.length * 40;
  // Lager erweitern, wenn es knapp wird
  if (totalCapacity(s) < needCrates * 1.25) {
    const slots = freeSlots(s);
    if (slots.length && s.money > ROOMS.shelf.cost + reserve) cmd({ type: 'build', slot: slots[0], room: 'shelf' });
    else if (!slots.length && s.warehouse.sections < WAREHOUSE.sectionCosts.length) {
      const next = s.warehouse.sections;
      if (s.level >= WAREHOUSE.sectionLevels[next] && s.money > WAREHOUSE.sectionCosts[next] + reserve + 800) cmd({ type: 'buySection' });
    }
  }
  // Büro ausbauen, wenn die Personalgrenze erreicht ist
  if (s.staff.length >= staffLimit(s)) {
    const next = OFFICE_LEVELS[officeLevel(s)];
    if (next && s.level >= next.level && s.money > next.cost + reserve) cmd({ type: 'upgradeOffice' });
  }
  // Personal: so viele wie Büro und Kasse erlauben
  while (s.staff.length < staffLimit(s) && s.applicants.length && s.money > STAFF.hireCost + reserve) {
    const best = [...s.applicants].sort((a, b) => b.talent - a.talent || b.vigilance - a.vigilance)[0];
    cmd({ type: 'hire', applicantId: best.id });
  }
  // Ausrüstung: schnellere oder größere Geräte für Verkäufer an weiten Plätzen
  const upgrades: EquipmentId[] = ['foodtruck', 'cargobike', 'scooter', 'handcart'];
  for (const eq of upgrades) {
    const def = EQUIPMENT[eq];
    if (s.level < def.level || eq === 'foodtruck') continue;
    const candidate = s.staff.find((p) => EQUIPMENT[p.equipment].capacity < def.capacity && EQUIPMENT[p.equipment].price < def.price);
    if (!candidate) continue;
    if ((s.inventory[eq] ?? 0) === 0 && s.money > def.price + reserve) cmd({ type: 'buyEquipment', equipment: eq });
    if ((s.inventory[eq] ?? 0) > 0) cmd({ type: 'equip', personId: candidate.id, equipment: eq });
  }
  void plan;
}

function order(plan: Map<number, number>, day: number): number {
  const units = expectedDailyUnits(plan, day) * 1.1;
  const need = Math.ceil(Math.max(0, units - stockUnits(s)) / 20);
  const room = freeSpace(s);
  const mix = productMix(plan);
  let total = 0;
  for (const w of mix.values()) total += w;
  if (total <= 0) return Math.ceil(units / 20);
  const lines: { product: ProductId; crates: number }[] = [];
  let crates = Math.min(need, room);
  // Geld: Dispo nur begrenzt nutzen
  const avgCrate = 20 * 0.8;
  crates = Math.min(crates, Math.max(0, Math.floor((s.money + 600) / avgCrate)));
  let left = crates;
  const entries = [...mix.entries()].sort((a, b) => b[1] - a[1]);
  for (const [p, w] of entries) {
    const n = Math.min(left, Math.round((crates * w) / total));
    if (n > 0) lines.push({ product: p, crates: n });
    left -= n;
  }
  if (left > 0 && lines.length) lines[0].crates += left;
  if (lines.length) cmd({ type: 'order', lines });
  return Math.ceil(units / 20);
}

function applyPlan(plan: Map<number, number>): void {
  for (const v of s.staff) {
    const spot = plan.get(v.id) ?? null;
    if (v.spot !== spot) cmd({ type: 'assign', personId: v.id, spot });
  }
}

const started = performance.now();
const levelDay: number[] = [0, 0, 0, 0, 0, 0];
levelDay[1] = 1;
let minMoneyFirst10 = Infinity;
const header = 'Tag  Wt  Konto      Umsatz   Gewinn  Pers  Stufe  Lager  Anteile W/B/A/U/I';
if (!QUIET) console.log(header);

// Erster Tag: Bewerber anwerben und alle Verkäufer zuweisen
let plan = planAssignments(0);
invest(plan, 0);
plan = planAssignments(0);
applyPlan(plan);

for (let day = 0; day < DAYS; day++) {
  while (s.phase === 'day') step(s, world, out);
  out.sales.length = 0;
  const r = s.reports[s.reports.length - 1];
  for (let l = 1; l <= REPUTATION_THRESHOLDS.length; l++) if (s.level >= l && !levelDay[l]) levelDay[l] = day + 1;
  if (day < 10) minMoneyFirst10 = Math.min(minMoneyFirst10, s.money);
  if (!QUIET) {
    const shares = r.districts.map((d) => String(Math.round(d.share * 100)).padStart(3)).join(' ');
    console.log(
      `${String(day + 1).padStart(3)}  ${['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][day % 7]}  ${s.money.toFixed(0).padStart(7)} €  ${r.ledger.sales
        .toFixed(0)
        .padStart(6)} €  ${r.net.toFixed(0).padStart(6)}  ${String(s.staff.length).padStart(4)}  ${String(s.level).padStart(5)}  ${String(s.crates.length).padStart(2)}/${String(totalCapacity(s)).padStart(3)}  ${shares}`,
    );
  }
  // Planung für den nächsten Tag
  plan = planAssignments(day + 1);
  const need = order(plan, day + 1);
  invest(plan, need);
  plan = planAssignments(day + 1);
  applyPlan(plan);
  cmd({ type: 'nextDay' });
}

const seconds = (performance.now() - started) / 1000;
type Check = { name: string; ok: boolean; info: string; relevant: boolean };
const inRange = (v: number, a: number, b: number) => v >= a && v <= b;
const checks: Check[] = [
  { name: 'Kein Kontostand unter 0 in den ersten 10 Tagen', ok: minMoneyFirst10 >= 0, info: `Minimum ${minMoneyFirst10.toFixed(0)} €`, relevant: true },
  { name: 'Stufe 2 an Tag 4 bis 6', ok: inRange(levelDay[2], 4, 6), info: `Tag ${levelDay[2] || '-'}`, relevant: true },
  { name: 'Stufe 3 an Tag 9 bis 13', ok: inRange(levelDay[3], 9, 13), info: `Tag ${levelDay[3] || '-'}`, relevant: false },
  { name: 'Stufe 4 an Tag 16 bis 22', ok: inRange(levelDay[4], 16, 22), info: `Tag ${levelDay[4] || '-'}`, relevant: false },
  { name: 'Stufe 5 an Tag 26 bis 40', ok: inRange(levelDay[5], 26, 40), info: `Tag ${levelDay[5] || '-'}`, relevant: false },
  { name: 'Laufzeit unter 20 Sekunden', ok: seconds < 20, info: `${seconds.toFixed(1)} s`, relevant: true },
];
console.log('\nZielkorridore:');
for (const c of checks) {
  const status = c.ok ? 'erfüllt ' : c.relevant ? 'VERFEHLT' : 'offen   ';
  console.log(`  [${status}] ${c.name}: ${c.info}${c.relevant ? '' : ' (maßgeblich ab M4)'}`);
}
console.log(`\nGesamtumsatz ${s.totalRevenue.toFixed(0)} €, verdorbene Ware ${s.stats.spoiledValue.toFixed(0)} €.`);
if (checks.some((c) => c.relevant && !c.ok)) process.exitCode = 1;
