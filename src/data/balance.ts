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
  money: 120,
  dealers: 1,
  shelves: 2,
  fighters: 0,
  district: 'underground' as DistrictId,
};

// ---------------------------------------------------------------------------
// Obst: wird kistenweise gekauft, verkauft wird einzeln
// ---------------------------------------------------------------------------
export interface FruitDef {
  id: FruitId;
  /** Preis einer Kiste beim Großhändler */
  crateCost: number;
  /** Verkaufspreis je Stück (vor dem Preisniveau des Viertels) */
  unitPrice: number;
  /** Viertel, dessen Eroberung die Sorte freischaltet */
  unlock: DistrictId;
  color: number;
}

export const CRATE_UNITS = 20;

export const FRUITS: Record<FruitId, FruitDef> = {
  apple: { id: 'apple', crateCost: 10, unitPrice: 1.0, unlock: 'underground', color: 0xc8402f },
  banana: { id: 'banana', crateCost: 12, unitPrice: 1.2, unlock: 'station', color: 0xe8c547 },
  strawberry: { id: 'strawberry', crateCost: 18, unitPrice: 1.8, unlock: 'oldtown', color: 0xd9364a },
  grape: { id: 'grape', crateCost: 21, unitPrice: 2.1, unlock: 'scene', color: 0x7a4a8c },
  mango: { id: 'mango', crateCost: 28, unitPrice: 2.8, unlock: 'shopping', color: 0xf0a030 },
  dragonfruit: { id: 'dragonfruit', crateCost: 36, unitPrice: 3.6, unlock: 'banking', color: 0xd8478e },
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
export const STORY_REWARDS = [20, 30, 40, 40, 50, 150, 200, 300, 400, 600, 1500];
/** Schwellen der Aufträge */
export const STORY_TARGETS = {
  firstEarnings: 15,
  dealers: 2,
  shelves: 3,
  fighters: 5,
  dealersMid: 5,
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
