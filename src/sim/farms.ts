// Bauern im Umland: Verträge, Lieferungen, Aktionen, Angst und Loyalität, Ereignisse und Erinnerungen.
// Alle Zahlen stehen in balance.ts (FARMS, CONTRACTS, FARM_ACTIONS, FARM_RULES, FARM_EVENTS, HEAT).
import {
  CONTRACTS,
  CRATE_UNITS,
  DISTRICT_IDS,
  FARM_ACTIONS,
  FARM_EVENTS,
  FARM_RULES,
  FARMS,
  FRUITS,
  HEAT,
  TRAITS,
  type FarmActionId,
  type FruitId,
} from '../data/balance';
import { FARM_ACTION_NAMES, FARM_NAMES, FARMER_NAMES, FRUIT_NAMES, GANG_BOSS } from '../data/names';
import { rand } from './rng';
import { isOwned } from './selectors';
import { dailyDemand } from './stock';
import type { Contract, ContractTerms, Cue, FarmMemory, FarmState, GameState, IncomingCrate, MessageKind, PendingEvent } from './types';
import type { World } from './world';

type Push = (s: GameState, kind: MessageKind, text: string, x?: number, y?: number) => void;

/** Laufzeit eigener Höfe (ohne Ende) */
const FOREVER = 999999;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const round2 = (v: number) => Math.round(v * 100) / 100;

export function createFarms(): FarmState[] {
  return FARMS.map((f) => ({
    owner: f.owner,
    loyalty: f.loyalty,
    fear: f.fear,
    quality: f.quality,
    priceBonus: 0,
    contract: null,
    lastTerms: null,
    credit: 0,
    guards: 0,
    helpersUntil: -1,
    helpers: 0,
    hailUntil: -1,
    bonusCrates: 0,
    refusedUntil: -1,
    closedUntil: -1,
    poached: false,
    licenseLost: false,
    cooldowns: {},
    lastPressure: -99,
    talkDay: 0,
    memory: [],
  }));
}

export const farmName = (i: number) => FARM_NAMES[i];
export const farmerName = (i: number) => FARMER_NAMES[i];

// ---------------------------------------------------------------------------
// Erinnerungen
// ---------------------------------------------------------------------------

const GOOD_MEMORY = new Set<FarmMemory>(['advance', 'helpers', 'hailHelp', 'bind']);
const BAD_MEMORY = new Set<FarmMemory>(['protect', 'refuse', 'soil', 'hailPenalty', 'cancel', 'takeover']);

const MEMORY_LINES: Record<FarmMemory, string> = {
  advance: '{n} weiß noch, dass du im Voraus bezahlt hast.',
  helpers: '{n} denkt gern an deine Erntehelfer zurück.',
  hailHelp: '{n} hat nicht vergessen, wie du nach dem Hagel geholfen hast.',
  bind: '{n} schätzt den langen Vertrag mit dir.',
  protect: '{n} schaut nervös zu deinen Leuten am Hoftor.',
  refuse: '{n} weiß noch, wie du die Ware einfach stehen gelassen hast.',
  soil: '{n} hat die gefälschten Bodenproben nicht vergessen.',
  hailPenalty: '{n} hat dir die Vertragsstrafe nach dem Hagel nicht verziehen.',
  cancel: '{n} erinnert sich an den gekündigten Vertrag.',
  takeover: '{n} arbeitet jetzt für dich. Freiwillig war das nicht.',
};

export function remember(f: FarmState, m: FarmMemory): void {
  const at = f.memory.indexOf(m);
  if (at >= 0) f.memory.splice(at, 1);
  f.memory.push(m);
  if (f.memory.length > FARM_RULES.memorySlots) f.memory.shift();
}

/** Gute minus schlechte Erinnerungen */
export function memoryScore(f: FarmState): number {
  let n = 0;
  for (const m of f.memory) n += GOOD_MEMORY.has(m) ? 1 : BAD_MEMORY.has(m) ? -1 : 0;
  return n;
}

/** Satz zur jüngsten Erinnerung eines Bauern, etwa für Meldungen und die Hof-Karte */
export function farmerLine(s: GameState, i: number): string | null {
  const f = s.farms[i];
  const m = f.memory[f.memory.length - 1];
  return m ? MEMORY_LINES[m].replace('{n}', FARMER_NAMES[i]) : null;
}

// ---------------------------------------------------------------------------
// Kapazität und Preise
// ---------------------------------------------------------------------------

/** Kapazität eines Hofs an einem Tag (Kisten), mit Erntehelfern und Hagel */
export function farmCapacity(s: GameState, i: number, day = s.day): number {
  const f = s.farms[i];
  let cap = FARMS[i].capacity;
  if (f.helpersUntil >= day) cap *= 1 + FARM_ACTIONS.helpers.capacity!;
  if (f.hailUntil >= day) cap *= FARM_EVENTS.hail.capacity;
  return Math.floor(cap);
}

/** Grundpreis einer Kiste beim Hof (mit Aufschlag durch Ereignisse) */
export function farmBasePrice(s: GameState, i: number, fruit: FruitId): number {
  return FRUITS[fruit].crateCost * FARMS[i].priceFactor * (1 + s.farms[i].priceBonus);
}

/**
 * Preis einer Kiste: Prozent vom Grundpreis, Angst senkt ihn sofort, Schutz und verlorene Zulassung ebenso.
 * Eigene Höfe liefern zu Erzeugerkosten, gebundene Verträge zum festen Preis.
 */
export function cratePrice(s: GameState, i: number, fruit: FruitId, pricePct?: number): number {
  const f = s.farms[i];
  const base = farmBasePrice(s, i, fruit);
  if (f.owner === 'player') return round2(base * CONTRACTS.producerPrice);
  const locked = pricePct === undefined ? f.contract?.lockedPrices?.[fruit] : undefined;
  if (locked !== undefined) return locked;
  let p = (base * (pricePct ?? f.contract?.pricePct ?? 100)) / 100;
  p *= 1 - f.fear * CONTRACTS.fearDiscount;
  if (f.guards > 0) p *= 1 + FARM_ACTIONS.protect.price!;
  if (f.licenseLost) p *= 1 + FARM_ACTIONS.soil.price!;
  return round2(p);
}

/** Ein Vertrag ist an diesem Tag aktiv */
export function contractActive(c: Contract | null, day: number): c is Contract {
  return !!c && day >= c.startDay && day <= c.endDay;
}

/** Ein Vertrag läuft oder beginnt morgen */
export function hasContract(f: FarmState, day: number): boolean {
  return !!f.contract && f.contract.endDay >= day;
}

// ---------------------------------------------------------------------------
// Verträge
// ---------------------------------------------------------------------------

export type Offer = ContractTerms;

export function offerCrates(o: Offer): number {
  let n = 0;
  for (const v of Object.values(o.crates)) n += v ?? 0;
  return n;
}

/** Annahmechance: Preis, Loyalität, Angst und Erinnerungen gegen die Schwelle des Bauern */
export function contractChance(s: GameState, i: number, offer: Offer): number {
  const f = s.farms[i];
  if (f.owner === 'player') return 1;
  if (f.owner === 'gang') return 0;
  if (f.licenseLost) return CONTRACTS.maxChance;
  const tr = TRAITS[FARMS[i].trait];
  let score =
    (offer.pricePct - 100) * CONTRACTS.priceWeight * tr.price +
    (f.loyalty - 50) * CONTRACTS.loyaltyWeight * tr.loyalty +
    f.fear * CONTRACTS.fearWeight * tr.fear +
    memoryScore(f) * CONTRACTS.memoryWeight -
    tr.threshold;
  if (offer.exclusive) score -= CONTRACTS.exclusivePct * CONTRACTS.priceWeight;
  return clamp(CONTRACTS.baseChance + score / 100, CONTRACTS.minChance, CONTRACTS.maxChance);
}

/** Kisten pro Tag, die andere Höfe von einer Sorte schon liefern */
function contractedElsewhere(s: GameState, fruit: FruitId, except: number): number {
  let n = 0;
  s.farms.forEach((f, i) => {
    if (i !== except && hasContract(f, s.day + 1)) n += f.contract!.crates[fruit] ?? 0;
  });
  return n;
}

/** Tagesbedarf einer Sorte in den eigenen Vierteln (Kisten) */
export function demandCrates(s: GameState, world: World, fruit: FruitId): number {
  let n = 0;
  for (let d = 0; d < DISTRICT_IDS.length; d++) if (isOwned(s, d)) n += dailyDemand(world, d, fruit);
  return n / CRATE_UNITS;
}

/**
 * Vorschlag für ein Angebot: je Sorte, was die eigenen Viertel noch brauchen (höchstens die Kapazität),
 * sieben Tage, und der niedrigste Preis mit guter Annahmechance. So reicht ein Tipp zum Abschicken.
 */
export function suggestOffer(s: GameState, world: World, i: number): Offer {
  const f = s.farms[i];
  const fruits = FARMS[i].fruits;
  const cap = FARMS[i].capacity;
  const crates: Partial<Record<FruitId, number>> = {};
  if (f.lastTerms) {
    for (const fr of fruits) crates[fr] = f.lastTerms.crates[fr] ?? 0;
  } else {
    const need = fruits.map((fr) => Math.max(0, Math.round(demandCrates(s, world, fr) - contractedElsewhere(s, fr, i))));
    const total = need.reduce((a, b) => a + b, 0);
    const scale = total > cap ? cap / total : 1;
    fruits.forEach((fr, k) => (crates[fr] = Math.floor(need[k] * scale)));
    if (fruits.every((fr) => !crates[fr])) crates[fruits[0]] = Math.min(cap, 2);
  }
  const offer: Offer = { crates, pricePct: 100, days: f.lastTerms?.days ?? CONTRACTS.defaultDays, exclusive: f.lastTerms?.exclusive ?? false };
  offer.pricePct = suggestPrice(s, i, offer);
  return offer;
}

/** Niedrigster Preis (in Schritten) mit mindestens der Vorschlagschance, sonst der mit der höchsten Chance */
export function suggestPrice(s: GameState, i: number, offer: Offer): number {
  for (let p = CONTRACTS.pricePctMin; p <= CONTRACTS.pricePctMax; p += CONTRACTS.pricePctStep) {
    if (contractChance(s, i, { ...offer, pricePct: p }) >= CONTRACTS.suggestChance) return p;
  }
  return CONTRACTS.pricePctMax;
}

/** Prüft ein Angebot und liefert einen Fehlertext oder null */
export function offerProblem(s: GameState, i: number, offer: Offer): string | null {
  const f = s.farms[i];
  if (!f) return 'Diesen Hof gibt es nicht.';
  if (f.owner === 'gang') return `${FARM_NAMES[i]} gehört der Gemüsegang und liefert nur an sie.`;
  if (f.owner === 'player') return null;
  if (f.talkDay > s.day) return `${FARMER_NAMES[i]} will erst morgen wieder verhandeln.`;
  const n = offerCrates(offer);
  if (n <= 0) return 'Der Vertrag braucht mindestens eine Kiste pro Tag.';
  if (n > FARMS[i].capacity) return `${FARM_NAMES[i]} schafft höchstens ${FARMS[i].capacity} Kisten pro Tag.`;
  for (const k of Object.keys(offer.crates) as FruitId[]) if (!FARMS[i].fruits.includes(k) && (offer.crates[k] ?? 0) > 0) return `${FARM_NAMES[i]} baut keine ${FRUIT_NAMES[k]} an.`;
  if (!(CONTRACTS.durations as readonly number[]).includes(offer.days)) return 'Laufzeit 3, 7 oder 14 Tage.';
  if (offer.pricePct < CONTRACTS.pricePctMin || offer.pricePct > CONTRACTS.pricePctMax) return 'Dieser Preis ist nicht verhandelbar.';
  return null;
}

function contractText(i: number, c: { crates: Partial<Record<FruitId, number>> }): string {
  return FARMS[i].fruits
    .filter((fr) => (c.crates[fr] ?? 0) > 0)
    .map((fr) => `${c.crates[fr]} ${FRUIT_NAMES[fr]}`)
    .join(' und ');
}

/** Vertrag anbieten: Der Bauer nimmt mit der angezeigten Chance an. Lieferung ab dem nächsten Morgen. */
export function offerContract(s: GameState, i: number, offer: Offer, push: Push, cue: (c: Cue) => void): boolean {
  const problem = offerProblem(s, i, offer);
  if (problem) {
    push(s, 'warning', problem);
    return false;
  }
  const f = s.farms[i];
  if (f.owner === 'player') {
    // Eigener Hof: Mengen einfach festlegen
    f.contract = makeContract(s, offer, true);
    return true;
  }
  const chance = contractChance(s, i, offer);
  // Einführung: Der erste Vertrag soll nicht am Zufall scheitern
  const first = s.stats.contracts === 0 && chance >= CONTRACTS.firstContractMinChance;
  if (rand(s) < chance || first) {
    f.contract = makeContract(s, offer, false);
    f.lastTerms = { ...offer, crates: { ...offer.crates } };
    s.stats.contracts++;
    cue('contract');
    push(s, 'story', `Vertrag mit ${FARM_NAMES[i]}: ${contractText(i, offer)} pro Tag, ${offer.days} Tage${offer.exclusive ? ', exklusiv' : ''}.`);
    return true;
  }
  f.talkDay = s.day + CONTRACTS.rejectCooldownDays;
  cue('bad');
  const line = farmerLine(s, i);
  push(s, 'warning', `${FARMER_NAMES[i]} lehnt ab und will erst morgen wieder verhandeln.${line ? ` ${line}` : ''}`);
  return false;
}

function makeContract(s: GameState, offer: Offer, own: boolean): Contract {
  const c: Contract = {
    crates: { ...offer.crates },
    pricePct: offer.pricePct,
    days: offer.days,
    startDay: s.day + 1,
    endDay: own ? FOREVER : s.day + offer.days,
    exclusive: own || offer.exclusive,
    priceLock: false,
    lockedPrices: null,
  };
  return c;
}

/** Verlängern mit einem Tipp zu den letzten Bedingungen, wenn Loyalität und Angst es zulassen */
export function renewContract(s: GameState, i: number, push: Push, cue: (c: Cue) => void): boolean {
  const f = s.farms[i];
  const c = f.contract ?? null;
  const terms: Offer | null = c ? { crates: c.crates, pricePct: c.pricePct, days: c.days, exclusive: c.exclusive } : f.lastTerms;
  if (!terms || f.owner !== 'free') return false;
  if (contractChance(s, i, terms) < CONTRACTS.renewMinChance) {
    push(s, 'warning', `${FARMER_NAMES[i]} will zu diesen Bedingungen nicht verlängern. Biete einen neuen Vertrag an.`);
    cue('bad');
    return false;
  }
  if (c && c.endDay >= s.day) c.endDay += terms.days;
  else f.contract = makeContract(s, terms, false);
  f.lastTerms = { ...terms, crates: { ...terms.crates } };
  s.stats.contracts++;
  cue('contract');
  push(s, 'story', `Vertrag mit ${FARM_NAMES[i]} verlängert bis Tag ${f.contract!.endDay + 1}.`);
  return true;
}

export function cancelContract(s: GameState, i: number, push: Push): void {
  const f = s.farms[i];
  if (!f.contract) return;
  if (f.owner === 'free') {
    f.loyalty = clamp(f.loyalty + CONTRACTS.cancelLoyalty, 0, 100);
    remember(f, 'cancel');
  }
  f.contract = null;
  f.credit = 0;
  push(s, 'info', `Vertrag mit ${FARM_NAMES[i]} gekündigt.`);
}

// ---------------------------------------------------------------------------
// Lieferungen
// ---------------------------------------------------------------------------

/** Kisten, die ein Hof am Morgen eines Tages liefert */
export function farmDelivery(s: GameState, i: number, day: number): IncomingCrate[] {
  const f = s.farms[i];
  const c = f.contract;
  if (!contractActive(c, day) || f.closedUntil >= day || f.refusedUntil >= day || f.owner === 'gang') return [];
  const res: IncomingCrate[] = [];
  let cap = farmCapacity(s, i, day);
  const boost = f.helpersUntil >= day ? 1 + FARM_ACTIONS.helpers.capacity! : 1;
  for (const fruit of FARMS[i].fruits) {
    const want = Math.round((c.crates[fruit] ?? 0) * boost);
    const n = Math.min(want, cap);
    cap -= n;
    const price = cratePrice(s, i, fruit);
    for (let k = 0; k < n; k++) res.push({ fruit, quality: f.quality, price, source: i });
  }
  // Gute Ernte: Zusatzkisten zum halben Preis mit der nächsten Lieferung
  if (f.bonusCrates > 0 && day === s.day) {
    const fruits = FARMS[i].fruits.filter((fr) => (c.crates[fr] ?? 0) > 0);
    for (let k = 0; k < f.bonusCrates; k++) {
      const fruit = fruits[k % fruits.length] ?? FARMS[i].fruits[0];
      res.push({ fruit, quality: f.quality, price: round2(cratePrice(s, i, fruit) * FARM_EVENTS.harvest.price), source: i });
    }
  }
  return res;
}

/** Alle Kisten, die am Morgen eines Tages ankommen */
export function farmDeliveries(s: GameState, day = s.day): IncomingCrate[] {
  const res: IncomingCrate[] = [];
  for (let i = 0; i < s.farms.length; i++) for (const c of farmDelivery(s, i, day)) res.push(c);
  return res;
}

/** Kisten pro Tag, die laut Vertrag morgen kommen (je Sorte) */
export function contractedTomorrow(s: GameState, fruit: FruitId): number {
  let n = 0;
  for (let i = 0; i < s.farms.length; i++) for (const c of farmDelivery(s, i, s.day + 1)) if (c.fruit === fruit) n++;
  return n;
}

/** Anteil des Kistenpreises, der schon per Vorschuss bezahlt ist */
export function creditFor(s: GameState, c: IncomingCrate): number {
  const f = c.source >= 0 ? s.farms[c.source] : null;
  return f ? Math.min(f.credit, c.price) : 0;
}

/** Lager voll: Der Rest bleibt auf dem Hof, der Bauer wird unzufrieden (einmal je Lieferung) */
export function onBacklog(s: GameState, sources: Set<number>): void {
  for (const i of sources) {
    const f = s.farms[i];
    if (f) f.loyalty = clamp(f.loyalty + CONTRACTS.backlogLoyalty, 0, 100);
  }
}

// ---------------------------------------------------------------------------
// Aktionen
// ---------------------------------------------------------------------------

/** Welche Aktionen die Hof-Karte zeigt (drei bis fünf, je nach Lage) */
export function visibleActions(s: GameState, i: number): FarmActionId[] {
  const f = s.farms[i];
  if (f.owner === 'player') return ['helpers'];
  if (f.owner === 'gang') return ['protect', 'poach', 'inspect', 'soil', 'takeover'];
  if (hasContract(f, s.day)) {
    return f.fear > (FARM_ACTIONS.takeover.fearMin ?? 70) ? ['advance', 'bind', 'helpers', 'protect', 'takeover'] : ['advance', 'bind', 'helpers', 'protect', 'refuse'];
  }
  return ['protect', 'poach', 'soil', 'takeover'];
}

/** Wert einer Tageslieferung laut Vertrag */
function dailyValue(s: GameState, i: number): number {
  const c = s.farms[i].contract;
  if (!c) return 0;
  let v = 0;
  for (const fruit of FARMS[i].fruits) v += (c.crates[fruit] ?? 0) * cratePrice(s, i, fruit);
  return v;
}

export function actionCost(s: GameState, i: number, id: FarmActionId): number {
  const def = FARM_ACTIONS[id];
  if (id === 'advance') return Math.round(dailyValue(s, i) * (def.deliveries ?? 3));
  return def.cost;
}

export function actionChance(s: GameState, i: number, id: FarmActionId): number {
  const def = FARM_ACTIONS[id];
  const tr = TRAITS[FARMS[i].trait];
  if (id === 'bind') {
    const c = s.farms[i].contract;
    if (!c) return 0;
    const terms = { crates: c.crates, pricePct: c.pricePct, days: def.days ?? 14, exclusive: c.exclusive };
    return clamp(contractChance(s, i, terms) + FARM_RULES.bindBonus, FARM_RULES.actionMinChance, FARM_RULES.actionMaxChance);
  }
  const mod = def.kind === 'pressure' ? tr.pressure : def.kind === 'dirty' ? tr.dirty : 0;
  return clamp(def.chance + mod, FARM_RULES.actionMinChance, FARM_RULES.actionMaxChance);
}

/** Ob eine Aktion gerade möglich ist, sonst der Grund */
export function actionProblem(s: GameState, i: number, id: FarmActionId): string | null {
  const f = s.farms[i];
  const def = FARM_ACTIONS[id];
  const cd = f.cooldowns[id] ?? 0;
  if (cd > s.day) return `wieder ab Tag ${cd + 1}`;
  if (s.money < actionCost(s, i, id)) return 'zu wenig Geld';
  switch (id) {
    case 'advance':
    case 'refuse':
      if (!hasContract(f, s.day) || f.owner !== 'free') return 'nur mit Vertrag';
      if (id === 'refuse' && f.refusedUntil >= s.day) return 'läuft schon';
      return null;
    case 'bind':
      if (!hasContract(f, s.day) || f.owner !== 'free') return 'nur mit Vertrag';
      return f.contract!.priceLock ? 'schon gebunden' : null;
    case 'helpers':
      if (f.owner === 'gang') return 'nicht bei der Gang';
      if (!hasContract(f, s.day)) return 'nur mit Vertrag';
      if (f.helpersUntil >= s.day) return 'helfen schon';
      return s.fighters < (def.fighters ?? 2) ? `${def.fighters} Kämpfer nötig` : null;
    case 'protect':
      if (f.owner === 'player') return 'gehört dir';
      if (f.guards > 0) return 'schon geschützt';
      return s.fighters < (def.fighters ?? 2) ? `${def.fighters} Kämpfer nötig` : null;
    case 'poach':
      if (f.poached) return 'schon abgeworben';
      return f.owner === 'player' || f.contract?.exclusive ? 'liefert nur an dich' : null;
    case 'soil':
      if (f.owner === 'player') return 'gehört dir';
      return f.licenseLost ? 'schon geschehen' : null;
    case 'inspect':
      if (f.owner !== 'gang') return 'nur bei Gang-Höfen';
      return f.closedUntil >= s.day ? 'schon geschlossen' : null;
    case 'takeover':
      if (f.owner === 'player') return 'gehört dir';
      return f.fear <= (def.fearMin ?? 70) ? `Angst über ${def.fearMin} nötig` : null;
  }
}

/** Ermittlungsdruck erhöhen */
export function addHeat(s: GameState, amount: number): void {
  if (amount <= 0) return;
  s.heat = clamp(s.heat + amount, 0, HEAT.max);
  s.heatDay = s.day;
}

function addFear(s: GameState, i: number, amount: number): void {
  const f = s.farms[i];
  f.fear = clamp(f.fear + amount * TRAITS[FARMS[i].trait].fearGain, 0, 100);
}

/** Kurzbeschreibung der Wirkung für den Knopf */
export function actionEffectText(id: FarmActionId): string {
  const d = FARM_ACTIONS[id];
  switch (id) {
    case 'advance':
      return `Loyalität +${d.loyalty}, wird mit Lieferungen verrechnet`;
    case 'bind':
      return `${d.days} Tage, Preis fest, Loyalität +${d.loyalty}`;
    case 'helpers':
      return `${d.fighters} Kämpfer für ${d.days} Tage, +${Math.round(d.capacity! * 100)} % Kisten`;
    case 'protect':
      return `${d.fighters} Kämpfer bleiben dort, Angst +${d.fear}, Preis ${Math.round(d.price! * 100)} %`;
    case 'refuse':
      return `${d.days} Tage keine Lieferung, Angst +${d.fear}`;
    case 'poach':
      return `Kapazität für andere ${Math.round(d.capacity! * 100)} %, Angst +${d.fear}`;
    case 'soil':
      return `verkauft nur noch an dich, Preis ${Math.round(d.price! * 100)} %`;
    case 'inspect':
      return `Gang-Hof ${d.days} Tage geschlossen`;
    case 'takeover':
      return 'Hof gehört dir, Preis = Erzeugerkosten';
  }
}

/** Führt eine Aktion aus. Misslingt sie, fallen die Kosten trotzdem an. */
export function performAction(s: GameState, i: number, id: FarmActionId, push: Push, cue: (c: Cue) => void): boolean {
  const f = s.farms[i];
  const def = FARM_ACTIONS[id];
  if (!f || !FARM_ACTIONS[id]) return false;
  if (!visibleActions(s, i).includes(id)) return false;
  const problem = actionProblem(s, i, id);
  if (problem) {
    push(s, 'warning', `${FARM_ACTION_NAMES[id]}: ${problem}.`);
    return false;
  }
  const cost = actionCost(s, i, id);
  s.money -= cost;
  s.spentToday += cost;
  f.cooldowns[id] = s.day + FARM_RULES.cooldownDays;
  s.stats.actions++;
  if (def.kind !== 'clean') f.lastPressure = s.day;
  if (def.kind === 'pressure') s.stats.pressureActions++;
  if (def.kind === 'dirty') s.stats.dirtyActions++;
  const ok = rand(s) < actionChance(s, i, id);
  const name = FARMER_NAMES[i];
  if (!ok) {
    if (def.kind === 'dirty') {
      addHeat(s, def.heat * FARM_RULES.failHeatFactor);
      f.loyalty = clamp(f.loyalty + FARM_RULES.failLoyalty, 0, 100);
    } else addHeat(s, def.heat);
    if (id === 'advance') {
      // Das Geld ist trotzdem beim Bauern: es wird verrechnet
      f.credit += cost;
    }
    cue('bad');
    push(s, 'warning', `${FARM_ACTION_NAMES[id]} bei ${FARM_NAMES[i]} misslungen${cost > 0 ? `, ${cost} € sind weg` : ''}.`);
    return false;
  }
  addHeat(s, def.heat);
  switch (id) {
    case 'advance':
      f.credit += cost;
      f.loyalty = clamp(f.loyalty + (def.loyalty ?? 0), 0, 100);
      remember(f, 'advance');
      push(s, 'info', `${name} nimmt den Vorschuss gern. Er wird mit den nächsten Lieferungen verrechnet.`);
      break;
    case 'bind': {
      const c = f.contract!;
      c.endDay = Math.max(c.endDay, s.day + (def.days ?? 14));
      c.days = def.days ?? 14;
      c.priceLock = true;
      c.lockedPrices = {};
      for (const fruit of FARMS[i].fruits) c.lockedPrices[fruit] = cratePrice(s, i, fruit);
      f.loyalty = clamp(f.loyalty + (def.loyalty ?? 0), 0, 100);
      remember(f, 'bind');
      push(s, 'info', `${FARM_NAMES[i]} ist bis Tag ${c.endDay + 1} gebunden, der Preis steht fest.`);
      break;
    }
    case 'helpers':
      s.fighters -= def.fighters ?? 2;
      f.helpers = def.fighters ?? 2;
      f.helpersUntil = s.day + (def.days ?? 3);
      remember(f, 'helpers');
      push(s, 'info', `${def.fighters} deiner Leute helfen ${def.days} Tage bei der Ernte auf ${FARM_NAMES[i]}.`);
      break;
    case 'protect':
      s.fighters -= def.fighters ?? 2;
      f.guards = def.fighters ?? 2;
      addFear(s, i, def.fear ?? 0);
      remember(f, 'protect');
      push(s, 'info', `Zwei deiner Leute stehen jetzt am Tor von ${FARM_NAMES[i]}. ${name} hat verstanden.`);
      break;
    case 'refuse':
      f.refusedUntil = s.day + (def.days ?? 2);
      addFear(s, i, def.fear ?? 0);
      remember(f, 'refuse');
      push(s, 'info', `Du lässt die Ware von ${FARM_NAMES[i]} ${def.days} Tage stehen. ${name} verliert Geld und wird nervös.`);
      break;
    case 'poach':
      f.poached = true;
      addFear(s, i, def.fear ?? 0);
      push(s, 'info', `Die Erntehelfer von ${FARM_NAMES[i]} arbeiten jetzt woanders.`);
      break;
    case 'soil':
      f.licenseLost = true;
      remember(f, 'soil');
      if (f.owner === 'gang') {
        f.owner = 'free';
        push(s, 'unlock', `${FARM_NAMES[i]} hat die Zulassung verloren. Die Gang bekommt dort nichts mehr, nur du darfst noch kaufen.`);
      } else push(s, 'info', `${FARM_NAMES[i]} hat die Zulassung verloren und verkauft nur noch an dich.`);
      break;
    case 'inspect':
      f.closedUntil = s.day + (def.days ?? 5);
      push(s, 'info', `Das Lebensmittelamt schließt ${FARM_NAMES[i]} für ${def.days} Tage. Die Gang muss sehen, wo sie bleibt.`);
      break;
    case 'takeover':
      takeOver(s, i);
      push(s, 'unlock', `${FARM_NAMES[i]} gehört jetzt dir. ${name} liefert zu Erzeugerkosten.`);
      break;
  }
  cue(def.kind === 'dirty' ? 'dirty' : 'good');
  return true;
}

function takeOver(s: GameState, i: number): void {
  const f = s.farms[i];
  const old = f.contract;
  f.owner = 'player';
  f.licenseLost = false;
  s.fighters += f.guards;
  f.guards = 0;
  remember(f, 'takeover');
  const crates: Partial<Record<FruitId, number>> = {};
  const fruits = FARMS[i].fruits;
  if (old) for (const fr of fruits) crates[fr] = old.crates[fr] ?? 0;
  else fruits.forEach((fr, k) => (crates[fr] = Math.floor(FARMS[i].capacity / fruits.length) + (k === 0 ? FARMS[i].capacity % fruits.length : 0)));
  f.contract = makeContract(s, { crates, pricePct: 100, days: 14, exclusive: true }, true);
  f.contract.startDay = s.day + 1;
}

/** Schutz beenden: die Kämpfer kommen zurück in den Hof */
export function withdrawGuards(s: GameState, i: number): void {
  const f = s.farms[i];
  s.fighters += f.guards;
  f.guards = 0;
}

// ---------------------------------------------------------------------------
// Tageswechsel und Ereignisse
// ---------------------------------------------------------------------------

const EVENT_KINDS: PendingEvent['kind'][] = ['hail', 'renegotiate', 'harvest', 'bio'];

function eligible(s: GameState, i: number, kind: PendingEvent['kind']): boolean {
  const f = s.farms[i];
  if (s.pending.some((p) => p.farm === i)) return false;
  const active = contractActive(f.contract, s.day);
  switch (kind) {
    case 'hail':
      return active && f.hailUntil < s.day;
    case 'renegotiate':
      return active && f.owner === 'free' && !f.contract!.priceLock && !f.licenseLost;
    case 'harvest':
      return active && f.bonusCrates === 0;
    case 'bio':
      return f.owner !== 'gang' && f.quality < 3 && active;
    case 'contractEnd':
      return false;
  }
}

/** Morgens: abgelaufene Verträge, Helfer zurück, Angst und Loyalität, Verrat, Druck, Ereignisse */
export function farmsNewDay(s: GameState, push: Push, cue: (c: Cue) => void): void {
  const day = s.day;
  // Unbeantwortete Meldungen vom Vortag verfallen
  for (const p of [...s.pending]) if (p.day < day) resolveEvent(s, p.id, null, push, cue);
  s.farms.forEach((f, i) => {
    const c = f.contract;
    if (c && c.endDay < day) {
      f.lastTerms = { crates: { ...c.crates }, pricePct: c.pricePct, days: c.days, exclusive: c.exclusive };
      f.contract = null;
      if (f.credit > 0) f.credit = 0;
      push(s, 'warning', `Der Vertrag mit ${FARM_NAMES[i]} ist ausgelaufen.`);
    }
    if (f.helpers > 0 && f.helpersUntil < day) {
      s.fighters += f.helpers;
      f.helpers = 0;
    }
    if (f.bonusCrates > 0 && !contractActive(f.contract, day)) f.bonusCrates = 0;
    // Angst sinkt ohne neuen Druck, Kämpfer am Tor halten sie oben
    if (f.lastPressure < day - 1 && f.guards === 0) f.fear = clamp(f.fear - FARM_RULES.fearDecay, 0, 100);
    // Loyalität: steigt langsam mit laufendem Vertrag, sonst zurück Richtung Ausgangswert
    if (f.owner === 'free') {
      if (contractActive(f.contract, day - 1)) f.loyalty = clamp(f.loyalty + CONTRACTS.loyaltyPerDay, 0, 100);
      else if (f.loyalty < FARMS[i].loyalty) f.loyalty = Math.min(FARMS[i].loyalty, f.loyalty + FARM_RULES.loyaltyDrift);
      else if (f.loyalty > FARMS[i].loyalty) f.loyalty = Math.max(FARMS[i].loyalty, f.loyalty - FARM_RULES.loyaltyDrift);
    }
    // Viel Angst, wenig Loyalität: der Bauer läuft über oder sagt aus
    if (f.owner === 'free' && f.fear > FARM_RULES.betrayFear && f.loyalty < FARM_RULES.betrayLoyalty && rand(s) < FARM_RULES.betrayChance) {
      if (rand(s) < FARM_RULES.defectShare) {
        f.owner = 'gang';
        f.contract = null;
        f.credit = 0;
        withdrawGuards(s, i);
        push(s, 'danger', `${FARMER_NAMES[i]} ist zur Gemüsegang übergelaufen. ${FARM_NAMES[i]} liefert jetzt an ${GANG_BOSS}.`);
      } else {
        addHeat(s, FARM_RULES.testifyHeat);
        push(s, 'danger', `${FARMER_NAMES[i]} hat bei der Polizei ausgesagt. Ermittlungsdruck +${FARM_RULES.testifyHeat}.`);
      }
      cue('alarm');
    }
    // Vertrag endet heute: Meldung zum Verlängern
    if (f.owner === 'free' && f.contract && f.contract.endDay === day) s.pending.push({ id: s.nextId++, kind: 'contractEnd', farm: i, day });
  });
  // Ermittlungsdruck sinkt ohne neuen Druck
  if (s.heatDay < day - 1) s.heat = Math.max(0, s.heat - HEAT.decayPerDay);
  // Etwa alle zwei Tage ein Ereignis an einem Hof
  if (rand(s) < FARM_EVENTS.chancePerDay) {
    const kind = EVENT_KINDS[Math.floor(rand(s) * EVENT_KINDS.length)];
    const farms = s.farms.map((_, i) => i).filter((i) => eligible(s, i, kind));
    if (farms.length) {
      const i = farms[Math.floor(rand(s) * farms.length)];
      if (kind === 'hail') s.farms[i].hailUntil = day + FARM_EVENTS.hail.days - 1;
      s.pending.push({ id: s.nextId++, kind, farm: i, day });
      cue(kind === 'hail' ? 'bad' : 'good');
    }
  }
}

export interface EventView {
  title: string;
  text: string;
  /** Beschriftung der beiden Antworten */
  options: [string, string];
  /** Porträt: Hof oder Boss */
  portrait: 'farmer' | 'boss';
}

/** Texte einer Meldung mit zwei Antworten */
export function eventView(s: GameState, p: PendingEvent): EventView {
  const i = p.farm;
  const farm = FARM_NAMES[i];
  const who = FARMER_NAMES[i];
  const e = FARM_EVENTS;
  switch (p.kind) {
    case 'contractEnd': {
      const c = s.farms[i].contract;
      const chance = c ? contractChance(s, i, { crates: c.crates, pricePct: c.pricePct, days: c.days, exclusive: c.exclusive }) : 0;
      const line = farmerLine(s, i);
      return {
        title: `Vertrag läuft aus: ${farm}`,
        text: `Heute kommt die letzte Lieferung. ${chance >= CONTRACTS.renewMinChance ? `${who} würde zu den gleichen Bedingungen weitermachen.` : `${who} will neu verhandeln.`}${line ? ` ${line}` : ''}`,
        options: [chance >= CONTRACTS.renewMinChance ? 'Verlängern' : 'Verhandeln', 'Auslaufen'],
        portrait: 'farmer',
      };
    }
    case 'hail':
      return {
        title: `Hagel auf ${farm}`,
        text: `Drei Tage nur halbe Ernte. ${who} hofft auf dich.`,
        options: [`Aushelfen (${e.hail.helpCost} €)`, 'Vertragsstrafe'],
        portrait: 'farmer',
      };
    case 'renegotiate':
      return {
        title: `${who} will nachverhandeln`,
        text: `${GANG_BOSS} bietet für die Ware von ${farm} mehr als du.`,
        options: [`${e.renegotiate.pricePct} % mehr zahlen`, 'Ablehnen'],
        portrait: 'boss',
      };
    case 'harvest':
      return {
        title: `Gute Ernte auf ${farm}`,
        text: `${Math.round(e.harvest.extra * 100)} % mehr Kisten zum halben Preis mit der nächsten Lieferung, wenn das Lager Platz hat.`,
        options: ['Annehmen', 'Ablehnen'],
        portrait: 'farmer',
      };
    case 'bio':
      return {
        title: `Bio-Siegel für ${farm}`,
        text: `Ein Stern mehr Qualität, aber ${who} will ${e.bio.pricePct} % mehr.`,
        options: ['Zustimmen', 'Ablehnen'],
        portrait: 'farmer',
      };
  }
}

/** Antwort auf eine Meldung (null: ohne Antwort verfallen) */
export function resolveEvent(s: GameState, id: number, choice: 0 | 1 | null, push: Push, cue: (c: Cue) => void): void {
  const at = s.pending.findIndex((p) => p.id === id);
  if (at < 0) return;
  const p = s.pending[at];
  s.pending.splice(at, 1);
  const f = s.farms[p.farm];
  const i = p.farm;
  const e = FARM_EVENTS;
  switch (p.kind) {
    case 'contractEnd':
      if (choice === 0) renewContract(s, i, push, cue);
      break;
    case 'hail':
      if (choice === 0) {
        if (s.money < e.hail.helpCost) {
          push(s, 'warning', `Für die Hilfe fehlen ${Math.ceil(e.hail.helpCost - s.money)} €.`);
          break;
        }
        s.money -= e.hail.helpCost;
        s.spentToday += e.hail.helpCost;
        f.loyalty = clamp(f.loyalty + e.hail.helpLoyalty, 0, 100);
        remember(f, 'hailHelp');
        cue('good');
      } else if (choice === 1) {
        addFear(s, i, e.hail.penaltyFear);
        f.lastPressure = s.day;
        s.money += e.hail.penaltyMoney;
        remember(f, 'hailPenalty');
        cue('bad');
      }
      break;
    case 'renegotiate':
      if (choice === 0 && f.contract) {
        f.contract.pricePct = Math.min(CONTRACTS.pricePctMax, f.contract.pricePct + e.renegotiate.pricePct);
        f.loyalty = clamp(f.loyalty + e.renegotiate.acceptLoyalty, 0, 100);
        cue('good');
      } else {
        f.loyalty = clamp(f.loyalty + e.renegotiate.refuseLoyalty, 0, 100);
        if (choice === 1) cue('bad');
      }
      break;
    case 'harvest':
      if (choice === 0 && f.contract) {
        let n = 0;
        for (const fr of FARMS[i].fruits) n += f.contract.crates[fr] ?? 0;
        f.bonusCrates = Math.max(1, Math.round(n * e.harvest.extra));
        cue('good');
      }
      break;
    case 'bio':
      if (choice === 0) {
        f.quality = Math.min(3, f.quality + e.bio.quality);
        f.priceBonus += e.bio.pricePct / 100;
        cue('good');
      } else if (choice === 1) f.loyalty = clamp(f.loyalty + e.bio.refuseLoyalty, 0, 100);
      break;
  }
}

/** Kurzer Zustand eines Hofs für Listen */
export function farmStatus(s: GameState, i: number): string {
  const f = s.farms[i];
  if (f.owner === 'gang') return f.closedUntil >= s.day ? `geschlossen bis Tag ${f.closedUntil + 1}` : `liefert an ${GANG_BOSS}`;
  if (f.owner === 'player') return 'gehört dir';
  const c = f.contract;
  if (c && c.endDay >= s.day) return c.startDay > s.day ? 'Vertrag ab morgen' : `Vertrag bis Tag ${c.endDay + 1}`;
  return 'frei';
}

export { FARM_NAMES, FARMER_NAMES };
