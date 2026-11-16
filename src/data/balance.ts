// Zentrale Spielwerte. Alle Zahlen fürs Balancing stehen ausschließlich hier.
// Zeitangaben in Sekunden beziehen sich auf das Tempo 1x.

export const DISTRICT_IDS = ['underground', 'station', 'oldtown', 'scene', 'shopping', 'banking'] as const;
export type DistrictId = (typeof DISTRICT_IDS)[number];

export const FRUIT_IDS = ['apple', 'banana', 'strawberry', 'grape', 'mango', 'dragonfruit'] as const;
export type FruitId = (typeof FRUIT_IDS)[number];

export type PathMode = 'foot' | 'mixed' | 'road';

// ---------------------------------------------------------------------------
// Zeit
// ---------------------------------------------------------------------------
export const TIME = {
  ticksPerSecond: 10,
  secondsPerGameHour: 15,
  dayStartHour: 6,
  dayEndHour: 22,
  speeds: [0, 1, 2, 4] as const,
  /** Obergrenze an Ticks pro Frame, damit sich nach Rucklern nichts aufstaut */
  maxTicksPerFrame: 12,
};

export const TICKS_PER_HOUR = TIME.ticksPerSecond * TIME.secondsPerGameHour;
export const DAY_HOURS = TIME.dayEndHour - TIME.dayStartHour;
export const TICKS_PER_DAY = TICKS_PER_HOUR * DAY_HOURS;

/** Wandelt Sekunden (bei 1x) in Ticks um. */
export function secondsToTicks(seconds: number): number {
  return Math.round(seconds * TIME.ticksPerSecond);
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
export const START = {
  money: 150,
  dealers: 1,
  shelves: 2,
  fighters: 0,
  district: 'underground' as DistrictId,
};

// ---------------------------------------------------------------------------
// Obst: kommt kistenweise per Lieferung, verkauft wird einzeln
// ---------------------------------------------------------------------------
export interface FruitDef {
  id: FruitId;
  /** Grundpreis einer Kiste beim Erzeuger */
  crateCost: number;
  /** Verkaufspreis je Stück (vor Preisniveau, Aufpreis, Qualität und Frische) */
  unitPrice: number;
  /** Haltbarkeit in Spieltagen, gekühlt (null: nicht kühlbar) */
  shelfDays: number;
  cooledDays: number | null;
  color: number;
}

export const CRATE_UNITS = 20;

export const FRUITS: Record<FruitId, FruitDef> = {
  apple: { id: 'apple', crateCost: 10, unitPrice: 1.0, shelfDays: 8, cooledDays: 16, color: 0xc8402f },
  banana: { id: 'banana', crateCost: 12, unitPrice: 1.2, shelfDays: 4, cooledDays: null, color: 0xe8c547 },
  strawberry: { id: 'strawberry', crateCost: 18, unitPrice: 1.8, shelfDays: 2, cooledDays: 4, color: 0xd9364a },
  grape: { id: 'grape', crateCost: 21, unitPrice: 2.1, shelfDays: 3, cooledDays: 6, color: 0x7a4a8c },
  mango: { id: 'mango', crateCost: 28, unitPrice: 2.8, shelfDays: 5, cooledDays: 8, color: 0xf0a030 },
  dragonfruit: { id: 'dragonfruit', crateCost: 36, unitPrice: 3.6, shelfDays: 6, cooledDays: 10, color: 0xd8478e },
};

// ---------------------------------------------------------------------------
// Lager, Lieferungen und Kiosk
// ---------------------------------------------------------------------------
export const STOCK = {
  /** Kiosk um die Ecke: Notlösung mit Tageslimit zum mehrfachen Grundpreis */
  kioskPerDay: 3,
  kioskFactor: 2,
  /** Unter dieser Frische gibt es nur noch einen Teil des Preises */
  lowFreshness: 0.4,
  lowFreshnessPrice: 0.6,
  /** Qualität: Abweichung je Stern von 2 Sternen auf Haltbarkeit und Verkaufspreis */
  qualityStep: 0.1,
  /** Kühlraum: gekühlte Kisten und Baukosten */
  coldRoomCrates: 12,
  coldRoomCost: 600,
  /** Reichweite: Durchschnitt der verkauften Menge über so viele Tage */
  rangeDays: 3,
  /** Hochrechnung des laufenden Tages erst nach so vielen Stunden mit Ware */
  extrapolateAfterHours: 4,
  /** Hochrechnung eines Tages mit Ausverkauf: höchstens bis zu diesem Anteil des Tages mit Ware */
  minAvailShare: 0.25,
  /** Lagerampel in Tagen: grün ab, gelb ab, darunter rot */
  ampelGreen: 1.5,
  ampelYellow: 0.5,
  /** Startbestand */
  startCrates: [{ fruit: 'apple' as FruitId, crates: 4 }],
};

export const DELIVERY = {
  /** Uhrzeit der Morgenlieferung */
  hour: 6,
  arriveSeconds: 5,
  unloadSecondsPerCrate: 0.3,
  leaveSeconds: 4,
};

/** Qualität der Ware vom Kiosk und des Startbestands (Sterne) */
export const KIOSK_QUALITY = 2;

// ---------------------------------------------------------------------------
// Bauern: Höfe, Verträge, Aktionen, Ereignisse
// ---------------------------------------------------------------------------
export type FarmTrait = 'stubborn' | 'fearful' | 'greedy' | 'honest';
export type FarmOwner = 'free' | 'gang' | 'player';

export interface FarmDef {
  id: string;
  /** Eine oder zwei Sorten */
  fruits: FruitId[];
  /** Kisten pro Tag (alle Sorten zusammen) */
  capacity: number;
  /** Faktor auf den Grundpreis der Sorte */
  priceFactor: number;
  /** Sterne 1 bis 3 */
  quality: number;
  trait: FarmTrait;
  owner: FarmOwner;
  loyalty: number;
  fear: number;
}

/** Höfe des ersten Akts (Namen in names.ts, Lage auf der Umlandkarte in map.ts) */
export const FARMS: FarmDef[] = [
  { id: 'brinkmann', fruits: ['apple'], capacity: 12, priceFactor: 1.0, quality: 2, trait: 'honest', owner: 'free', loyalty: 60, fear: 0 },
  { id: 'lindenau', fruits: ['apple', 'strawberry'], capacity: 10, priceFactor: 1.1, quality: 3, trait: 'stubborn', owner: 'free', loyalty: 45, fear: 0 },
  { id: 'kessler', fruits: ['banana', 'mango'], capacity: 12, priceFactor: 1.0, quality: 2, trait: 'greedy', owner: 'free', loyalty: 40, fear: 0 },
  { id: 'sonnenhang', fruits: ['grape', 'strawberry'], capacity: 10, priceFactor: 0.95, quality: 2, trait: 'fearful', owner: 'free', loyalty: 45, fear: 10 },
  { id: 'petersen', fruits: ['banana', 'grape'], capacity: 12, priceFactor: 0.9, quality: 1, trait: 'fearful', owner: 'gang', loyalty: 20, fear: 30 },
  { id: 'exotica', fruits: ['dragonfruit', 'mango'], capacity: 10, priceFactor: 1.05, quality: 3, trait: 'greedy', owner: 'gang', loyalty: 15, fear: 20 },
];

/** Eigenschaften der Bauern: Schwelle für Verträge, Gewichte für Preis, Loyalität und Angst, Wirkung auf Aktionen */
export const TRAITS: Record<FarmTrait, { threshold: number; price: number; loyalty: number; fear: number; fearGain: number; pressure: number; dirty: number }> = {
  /** stur: hohe Schwelle, Druck wirkt schwächer */
  stubborn: { threshold: 15, price: 1, loyalty: 1, fear: 0.7, fearGain: 0.7, pressure: -0.2, dirty: 0 },
  /** ängstlich: Angst wirkt stark, Druck gelingt leichter */
  fearful: { threshold: 0, price: 1, loyalty: 1, fear: 1.6, fearGain: 1.5, pressure: 0.2, dirty: 0 },
  /** gierig: Geld zählt mehr als Treue */
  greedy: { threshold: 5, price: 1.8, loyalty: 0.6, fear: 1, fearGain: 1, pressure: 0, dirty: 0.1 },
  /** ehrlich: Treue zählt viel, schmutzige Aktionen misslingen öfter */
  honest: { threshold: 0, price: 0.8, loyalty: 1.4, fear: 1, fearGain: 1, pressure: 0, dirty: -0.25 },
};

export const CONTRACTS = {
  durations: [3, 7, 14] as const,
  defaultDays: 7,
  pricePctMin: 70,
  pricePctMax: 150,
  pricePctStep: 5,
  /** Vorschlag: niedrigster Preis mit mindestens dieser Annahmechance */
  suggestChance: 0.75,
  /** Exklusiv kostet so viele Prozentpunkte Preis (oder entsprechend Angst) */
  exclusivePct: 20,
  /** Annahmechance: Basis plus Punkte (je Punkt 1 %) */
  baseChance: 0.65,
  priceWeight: 2,
  loyaltyWeight: 0.6,
  fearWeight: 0.5,
  /** Gute und schlechte Erinnerungen an frühere Entscheidungen */
  memoryWeight: 5,
  minChance: 0.02,
  maxChance: 0.98,
  /** Verlängern mit einem Tipp gelingt ab dieser Chance */
  renewMinChance: 0.5,
  /** Einführung: Der allererste Vertrag klappt ab dieser Chance sicher */
  firstContractMinChance: 0.5,
  /** Nach einer Absage verhandelt der Bauer erst am nächsten Tag wieder */
  rejectCooldownDays: 1,
  /** Kündigen kostet Loyalität */
  cancelLoyalty: -10,
  /** Loyalität je Tag mit laufendem Vertrag */
  loyaltyPerDay: 1,
  /** Lager voll, Rest bleibt auf dem Hof */
  backlogLoyalty: -2,
  /** Angst senkt den Preis: Abschlag je Punkt Angst */
  fearDiscount: 0.002,
  /** Preis eigener Höfe (Erzeugerkosten) als Anteil am Grundpreis */
  producerPrice: 0.6,
};

export type FarmActionId = 'advance' | 'bind' | 'helpers' | 'protect' | 'refuse' | 'poach' | 'soil' | 'inspect' | 'takeover';
export type FarmActionKind = 'clean' | 'pressure' | 'dirty';

export interface FarmActionDef {
  kind: FarmActionKind;
  /** Erfolgschance vor Eigenschaften */
  chance: number;
  /** Kosten in Euro (Vorschuss: Tageslieferungen, siehe deliveries) */
  cost: number;
  /** Ermittlungsdruck bei Erfolg (bei Misserfolg schmutziger Aktionen doppelt) */
  heat: number;
  loyalty?: number;
  fear?: number;
  /** Tage, die die Wirkung anhält */
  days?: number;
  /** Eigene Leute (Kämpfer), die gebunden werden */
  fighters?: number;
  /** Preis- oder Kapazitätsänderung als Anteil */
  price?: number;
  capacity?: number;
  /** Vorschuss: so viele Tageslieferungen */
  deliveries?: number;
  /** Mindestangst (Hof übernehmen) */
  fearMin?: number;
}

export const FARM_ACTIONS: Record<FarmActionId, FarmActionDef> = {
  advance: { kind: 'clean', chance: 0.95, cost: 0, heat: 0, loyalty: 20, deliveries: 3 },
  bind: { kind: 'clean', chance: 0.85, cost: 0, heat: 0, loyalty: 10, days: 14 },
  helpers: { kind: 'clean', chance: 0.9, cost: 0, heat: 0, fighters: 2, days: 3, capacity: 0.3 },
  protect: { kind: 'pressure', chance: 0.65, cost: 0, heat: 3, fear: 25, fighters: 2, price: -0.15 },
  refuse: { kind: 'pressure', chance: 0.9, cost: 0, heat: 1, fear: 15, days: 2 },
  poach: { kind: 'pressure', chance: 0.7, cost: 150, heat: 4, fear: 10, capacity: -0.5 },
  soil: { kind: 'dirty', chance: 0.6, cost: 400, heat: 12, price: -0.3 },
  inspect: { kind: 'dirty', chance: 0.7, cost: 200, heat: 8, days: 5 },
  takeover: { kind: 'dirty', chance: 0.8, cost: 4000, heat: 15, fearMin: 70 },
};

export const FARM_RULES = {
  /** Abklingzeit jeder Aktion je Hof in Tagen */
  cooldownDays: 2,
  /** Grenzen der Erfolgschance von Aktionen */
  actionMinChance: 0.05,
  actionMaxChance: 0.98,
  /** Langfristig binden: Aufschlag auf die Annahmechance des laufenden Vertrags */
  bindBonus: 0.1,
  /** So viele frühere Entscheidungen merkt sich ein Bauer */
  memorySlots: 4,
  /** Verrat: Anteil Überlaufen (sonst Aussage) */
  defectShare: 0.5,
  /** Misslungene schmutzige Aktion: Druck mal Faktor, Loyalität */
  failHeatFactor: 2,
  failLoyalty: -20,
  /** Angst sinkt je Tag ohne neuen Druck */
  fearDecay: 5,
  /** Loyalität sinkt je Tag ohne Vertrag Richtung Ausgangswert (langsam) */
  loyaltyDrift: 1,
  /** Bauer läuft über oder sagt aus */
  betrayFear: 60,
  betrayLoyalty: 20,
  betrayChance: 0.1,
  testifyHeat: 25,
};

/** Hof-Ereignisse: etwa alle zwei Tage, Antwort mit zwei Knöpfen */
export const FARM_EVENTS = {
  chancePerDay: 0.5,
  hail: { days: 3, capacity: 0.5, helpCost: 100, helpLoyalty: 15, penaltyFear: 10, penaltyMoney: 60 },
  renegotiate: { pricePct: 10, acceptLoyalty: 5, refuseLoyalty: -15 },
  harvest: { extra: 0.5, price: 0.5 },
  bio: { quality: 1, pricePct: 15, refuseLoyalty: -5 },
};

/** Ermittlungsdruck (Stufen und Folgen mit M10) */
export const HEAT = {
  max: 100,
  decayPerDay: 3,
  watched: 30,
  investigation: 60,
  charges: 85,
};

// ---------------------------------------------------------------------------
// Nachfrage: Tagesbedarf, Sättigung und Aufpreis
// ---------------------------------------------------------------------------
export const SATURATION = {
  /** Tagesbedarf je Verkaufsplatz über alle Sorten (Stück) */
  demandPerSpot: 130,
  /** Ist der Tagesbedarf erreicht, verkauft sich nur noch dieser Anteil */
  saturatedFactor: 0.25,
  /** Darüber hinaus sinkt die Kaufbereitschaft bis zu diesem Überhang (Anteil des Tagesbedarfs) auf null */
  overflow: 0.5,
  /** Aufpreis für Sorten, von denen ein Viertel heute noch wenig bekommen hat */
  premiumMax: 1.6,
};

/** Vorlieben der Viertel (relative Gewichte, bestimmen den Tagesbedarf je Sorte) */
export const DISTRICT_PREFS: Record<DistrictId, Record<FruitId, number>> = {
  underground: { apple: 3, banana: 3, strawberry: 1, grape: 1, mango: 0.5, dragonfruit: 0.5 },
  station: { apple: 3, banana: 4, strawberry: 1, grape: 1, mango: 1, dragonfruit: 0.5 },
  oldtown: { apple: 1.5, banana: 1, strawberry: 3, grape: 2, mango: 2, dragonfruit: 1.5 },
  scene: { apple: 1, banana: 1, strawberry: 3, grape: 4, mango: 1.5, dragonfruit: 1 },
  shopping: { apple: 1, banana: 1, strawberry: 2.5, grape: 2, mango: 3, dragonfruit: 2 },
  banking: { apple: 0.5, banana: 0.5, strawberry: 1.5, grape: 2, mango: 3, dragonfruit: 4 },
};

/** Vertriebsqualität: wie gut die Verkäufer Sorten und Viertel wählen (0..1) */
export const SALES_QUALITY = {
  base: 0.7,
};

// ---------------------------------------------------------------------------
// Viertel
// ---------------------------------------------------------------------------
export interface DistrictDef {
  id: DistrictId;
  /** Kaufinteressenten pro Spielstunde und Verkaufsplatz */
  customers: number;
  /** Preisniveau: Faktor auf den Verkaufspreis */
  priceLevel: number;
  /** Kämpfer der Gemüsegang zu Beginn (0 = gehört von Anfang an dir) */
  garrison: number;
  /** So viele Kämpfer holt sich die Gang pro Tag zurück, bis zur vollen Stärke */
  regenPerDay: number;
  /** Stoßzeiten [von, bis) mit mehr Kundschaft */
  rush: [number, number][];
  /** Anteil an der Höchstzahl sichtbarer Passanten */
  pedestrianShare: number;
}

export const DISTRICTS: Record<DistrictId, DistrictDef> = {
  underground: { id: 'underground', customers: 16, priceLevel: 1.0, garrison: 0, regenPerDay: 0, rush: [[7, 9], [17, 20]], pedestrianShare: 0.13 },
  station: { id: 'station', customers: 26, priceLevel: 1.15, garrison: 4, regenPerDay: 1, rush: [[6, 9], [16, 19]], pedestrianShare: 0.2 },
  oldtown: { id: 'oldtown', customers: 30, priceLevel: 1.3, garrison: 10, regenPerDay: 1, rush: [[11, 18]], pedestrianShare: 0.2 },
  scene: { id: 'scene', customers: 28, priceLevel: 1.4, garrison: 16, regenPerDay: 1, rush: [[12, 15], [19, 22]], pedestrianShare: 0.14 },
  shopping: { id: 'shopping', customers: 34, priceLevel: 1.6, garrison: 24, regenPerDay: 2, rush: [[10, 19]], pedestrianShare: 0.18 },
  banking: { id: 'banking', customers: 38, priceLevel: 2.0, garrison: 40, regenPerDay: 2, rush: [[7, 9], [12, 14], [17, 19]], pedestrianShare: 0.15 },
};

/** Faktor auf die Kundschaft in den Stoßzeiten */
export const RUSH_FACTOR = 1.5;
/** Breite der weichen Übergänge zwischen zwei Stunden (Anteil einer Stunde) */
export const HOUR_BLEND = 0.5;

// ---------------------------------------------------------------------------
// Verkäufer
// ---------------------------------------------------------------------------
export const DEALERS = {
  /** Preis für den zweiten Verkäufer, jeder weitere wird teurer */
  baseCost: 60,
  costGrowth: 1.4,
  /** Höchstens so viele eigene Verkäufer an einem Platz */
  maxPerSpot: 2,
  buyChance: 0.85,
  speed: 2.2,
  setupSeconds: 1,
  /** Kisten, die ein Verkäufer ohne Ausrüstung trägt */
  crates: 1,
  /** Gewicht der Weglänge bei der Platzwahl (Felder, ab denen sich der Wert halbiert) */
  distanceHalf: 70,
  /** Warten im Lager, wenn kein Obst da ist (Sekunden bis zum nächsten Blick ins Regal) */
  waitSeconds: 1,
};

export interface UpgradeDef {
  id: 'handcart' | 'cargobike';
  cost: number;
  crates: number;
  speed: number;
  unlock: DistrictId;
}

/** Ausrüstung für alle Verkäufer, wird einmal gekauft */
export const UPGRADES: UpgradeDef[] = [
  { id: 'handcart', cost: 400, crates: 2, speed: 2.2, unlock: 'oldtown' },
  { id: 'cargobike', cost: 2500, crates: 4, speed: 3.2, unlock: 'shopping' },
];

// ---------------------------------------------------------------------------
// Lager
// ---------------------------------------------------------------------------
export const SHELVES = {
  cratesPerShelf: 6,
  /** Preis des dritten Regals, jedes weitere wird teurer */
  baseCost: 40,
  costGrowth: 1.45,
};

// ---------------------------------------------------------------------------
// Straßenkämpfer und Würfelduell
// ---------------------------------------------------------------------------
export const FIGHTERS = {
  baseCost: 25,
  /** Aufschlag je Kämpfer, der schon im Hof steht */
  costPerOwned: 3,
  /** Höchstzahl, die im Hof Platz hat */
  max: 60,
};

export const BATTLE = {
  /** Würfel des Angreifers und des Verteidigers pro Runde */
  attackerDice: 3,
  defenderDice: 2,
  /** Beim Schnelldurchlauf höchstens so viele Runden */
  maxAutoRounds: 200,
};

// ---------------------------------------------------------------------------
// Aufträge (Geschichte und Einführung): Belohnung je Schritt
// ---------------------------------------------------------------------------
export const STORY_REWARDS = [20, 30, 40, 40, 50, 60, 60, 80, 150, 300, 400, 600, 1500];
/** Schwellen der Aufträge */
export const STORY_TARGETS = {
  firstEarnings: 15,
  dealers: 2,
  shelves: 3,
  fighters: 5,
  fruits: 2,
};

// ---------------------------------------------------------------------------
// Passanten und Verkehr (nur Optik)
// ---------------------------------------------------------------------------
export const AMBIENT = {
  maxPedestrians: 320,
  /** Mindestanteil sichtbarer Passanten auch außerhalb der Stoßzeit */
  minPedestrianFraction: 0.35,
  pedSpeedMin: 0.9,
  pedSpeedMax: 1.4,
  pedFadeSeconds: 0.8,
  pedTurnChance: 0.18,
  pedGreenChance: 0.15,
  /** Bis zu dieser Entfernung wird ein Passant als Kunde zum Stand umgeleitet */
  customerSearchRadius: 7,
  customerStandSeconds: 2.5,
  cars: 26,
  buses: 3,
  carSpeed: 4.2,
  busSpeed: 3.2,
  populationCheckSeconds: 0.5,
};

// ---------------------------------------------------------------------------
// Speichern und Darstellung
// ---------------------------------------------------------------------------
export const SAVE = {
  slots: 3,
  autosaveSeconds: 30,
};

export const CAMERA = {
  zoomLevels: [10, 15, 21, 30, 42, 58],
  defaultZoomIndex: 2,
  tiltDegrees: 35,
  baseYawDegrees: 45,
  panKeySpeed: 22,
};

export const RENDER = {
  shadowMapSize: 2048,
  maxPixelRatio: 2,
  chunkSize: 16,
};
