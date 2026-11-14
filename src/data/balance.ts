// Zentrale Spielwerte. Alle Zahlen fürs Balancing stehen ausschließlich hier.
// Zeitangaben in Sekunden beziehen sich auf das Tempo 1x.

export const PRODUCT_IDS = ['apple', 'banana', 'grape', 'strawberry', 'mango', 'dragonfruit', 'pomegranate'] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export const DISTRICT_IDS = ['residential', 'station', 'oldtown', 'campus', 'industrial'] as const;
export type DistrictId = (typeof DISTRICT_IDS)[number];

export const EQUIPMENT_IDS = ['tray', 'handcart', 'scooter', 'cargobike', 'foodtruck'] as const;
export type EquipmentId = (typeof EQUIPMENT_IDS)[number];

export const ROOM_TYPES = ['shelf', 'coldroom', 'ramp', 'radio', 'office'] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

// ---------------------------------------------------------------------------
// Zeit
// ---------------------------------------------------------------------------
export const TIME = {
  ticksPerSecond: 10,
  secondsPerGameHour: 15,
  dayStartHour: 6,
  dayEndHour: 22,
  returnHour: 21.5,
  speeds: [0, 1, 2, 4] as const,
  // Obergrenze an Ticks pro Frame, damit sich nach Rucklern nichts aufstaut.
  maxTicksPerFrame: 12,
  // Wochentagsfaktoren am Wochenende (Samstag und Sonntag).
  weekendFactor: {
    residential: 1.1,
    station: 0.8,
    oldtown: 1.3,
    campus: 0.3,
    industrial: 0.2,
  } as Record<DistrictId, number>,
};

export const TICKS_PER_HOUR = TIME.ticksPerSecond * TIME.secondsPerGameHour;
export const DAY_HOURS = TIME.dayEndHour - TIME.dayStartHour;
export const TICKS_PER_DAY = TICKS_PER_HOUR * DAY_HOURS;

/** Wandelt Sekunden (bei 1x) in Ticks um. */
export function secondsToTicks(seconds: number): number {
  return Math.round(seconds * TIME.ticksPerSecond);
}

// ---------------------------------------------------------------------------
// Produkte
// ---------------------------------------------------------------------------
export interface ProductDef {
  id: ProductId;
  buy: number;
  sell: number;
  shelfDays: number;
  /** null bedeutet: nicht kühlbar */
  cooledDays: number | null;
  level: number;
  /** Zusätzliche Freischaltung (Importlizenz) mit Preis */
  licenseCost: number;
  color: number;
}

export const PRODUCTS: Record<ProductId, ProductDef> = {
  apple: { id: 'apple', buy: 0.7, sell: 1.8, shelfDays: 10, cooledDays: 20, level: 1, licenseCost: 0, color: 0xc8402f },
  banana: { id: 'banana', buy: 0.5, sell: 1.4, shelfDays: 5, cooledDays: null, level: 1, licenseCost: 0, color: 0xe8c547 },
  grape: { id: 'grape', buy: 1.1, sell: 2.9, shelfDays: 4, cooledDays: 8, level: 2, licenseCost: 0, color: 0x7a4a8c },
  strawberry: { id: 'strawberry', buy: 1.4, sell: 3.9, shelfDays: 2, cooledDays: 4, level: 2, licenseCost: 0, color: 0xd9364a },
  mango: { id: 'mango', buy: 1.6, sell: 4.5, shelfDays: 6, cooledDays: 9, level: 4, licenseCost: 3000, color: 0xf0a030 },
  dragonfruit: { id: 'dragonfruit', buy: 2.2, sell: 5.8, shelfDays: 8, cooledDays: 14, level: 5, licenseCost: 0, color: 0xd8478e },
  pomegranate: { id: 'pomegranate', buy: 2.0, sell: 5.2, shelfDays: 10, cooledDays: 18, level: 5, licenseCost: 0, color: 0x9c2232 },
};

export const CRATE_UNITS = 20;

// ---------------------------------------------------------------------------
// Großmarkt
// ---------------------------------------------------------------------------
export const MARKET = {
  deliveryHour: 6,
  rampOrderDeadlineHour: 10,
  rampDeliveryHour: 12,
  priceDrift: 0.05,
  priceFactorMin: 0.85,
  priceFactorMax: 1.15,
  bulkCrates: 10,
  bulkDiscount: 0.05,
  maxCratesPerOrder: 60,
};

// ---------------------------------------------------------------------------
// Frische und Preise
// ---------------------------------------------------------------------------
export const FRESHNESS = {
  lowThreshold: 0.4,
  lowPriceFactor: 0.6,
};

export const PRICING = {
  factorMin: 0.7,
  factorMax: 1.3,
  factorDefault: 1.0,
  elasticity: 1.5,
  oldtownPremium: 1.2,
};

// ---------------------------------------------------------------------------
// Viertel: Nachfrage, Vorlieben, Konkurrenz
// ---------------------------------------------------------------------------
export interface DistrictDef {
  id: DistrictId;
  peak: number;
  normal: number;
  /** Spitzenzeiten als [von, bis) in vollen Stunden */
  peakHours: [number, number][];
  prefs: Record<ProductId, number>;
  competitorRevenue: number;
  /** Anteil an der Höchstzahl sichtbarer Passanten */
  pedestrianShare: number;
  /** Farbe für Karten und Diagramme */
  color: number;
}

export const DISTRICTS: Record<DistrictId, DistrictDef> = {
  residential: {
    id: 'residential',
    peak: 20,
    normal: 8,
    peakHours: [[7, 9], [17, 20]],
    prefs: { apple: 1.2, banana: 1.2, grape: 1.0, strawberry: 0.9, mango: 0.7, dragonfruit: 0.5, pomegranate: 0.5 },
    competitorRevenue: 250,
    pedestrianShare: 0.17,
    color: 0x6f9a5a,
  },
  station: {
    id: 'station',
    peak: 45,
    normal: 15,
    peakHours: [[6, 9], [16, 19]],
    prefs: { apple: 1.1, banana: 1.4, grape: 0.9, strawberry: 0.8, mango: 0.8, dragonfruit: 0.6, pomegranate: 0.6 },
    competitorRevenue: 900,
    pedestrianShare: 0.27,
    color: 0x5a7fa8,
  },
  oldtown: {
    id: 'oldtown',
    peak: 40,
    normal: 15,
    peakHours: [[11, 18]],
    prefs: { apple: 0.8, banana: 0.7, grape: 1.1, strawberry: 1.5, mango: 1.3, dragonfruit: 1.4, pomegranate: 1.4 },
    competitorRevenue: 1200,
    pedestrianShare: 0.3,
    color: 0xb08a4e,
  },
  campus: {
    id: 'campus',
    peak: 35,
    normal: 5,
    peakHours: [[11, 15]],
    prefs: { apple: 1.3, banana: 1.3, grape: 1.0, strawberry: 0.9, mango: 0.6, dragonfruit: 0.6, pomegranate: 0.6 },
    competitorRevenue: 200,
    pedestrianShare: 0.16,
    color: 0x8a6fa8,
  },
  industrial: {
    id: 'industrial',
    peak: 25,
    normal: 5,
    peakHours: [[6, 8], [12, 13]],
    prefs: { apple: 1.3, banana: 1.4, grape: 0.8, strawberry: 0.6, mango: 0.6, dragonfruit: 0.4, pomegranate: 0.4 },
    competitorRevenue: 150,
    pedestrianShare: 0.1,
    color: 0x8a8f96,
  },
};

/** Wöchentliches Wachstum der festen Konkurrenz */
export const COMPETITOR_WEEKLY_GROWTH = 0.02;

/** Weglängen vom Lager je Viertel in Feldern (für den Kartentest) */
export const DISTRICT_PATH_RANGES: Record<DistrictId, [number, number]> = {
  residential: [5, 12],
  station: [25, 32],
  oldtown: [30, 38],
  campus: [38, 46],
  industrial: [45, 55],
};

/** Platzfaktor je Verkaufsplatz (0,8 bis 1,2), Schlüssel ist die ID aus map.ts */
export const SPOT_FACTORS: Record<string, number> = {
  'res-1': 1.2,
  'res-2': 1.1,
  'res-3': 1.15,
  'sta-1': 1.1,
  'sta-2': 1.2,
  'sta-3': 0.9,
  'sta-4': 1.0,
  'old-1': 1.1,
  'old-2': 1.2,
  'old-3': 1.0,
  'old-4': 0.9,
  'old-5': 0.8,
  'old-6': 1.0,
  'uni-1': 1.0,
  'uni-2': 1.2,
  'uni-3': 1.1,
  'ind-1': 1.0,
  'ind-2': 0.9,
};

export const SPOT = {
  factorMin: 0.8,
  factorMax: 1.2,
  maxOwnVendors: 2,
};

// ---------------------------------------------------------------------------
// Verkauf
// ---------------------------------------------------------------------------
export const SALES = {
  baseBuyChance: 0.85,
  restockThreshold: 0.1,
  reloadSeconds: 3,
  /** Wie lange ein Passant nach einem Kauf am Stand stehen bleibt */
  customerStandSeconds: 2.5,
  /** Breite der weichen Übergänge zwischen zwei Stunden (Anteil einer Stunde) */
  hourBlend: 0.5,
};

// ---------------------------------------------------------------------------
// Personal
// ---------------------------------------------------------------------------
export const STAFF = {
  applicantsPerDay: 3,
  hireCost: 150,
  wageBase: 40,
  wagePerPoint: 9,
  wageOffset: 2,
  /** Wahrscheinlichkeiten für die Werte 1 bis 5 */
  statWeights: [0.1, 0.35, 0.35, 0.14, 0.06],
  talentFactor: [0.8, 0.9, 1.0, 1.15, 1.3],
  sightRange: [3, 4, 5, 6, 7],
  reactionSeconds: [2.0, 1.5, 1.0, 0.7, 0.5],
  starterTalent: 2,
  starterVigilance: 2,
  scout: { hireCost: 100, wage: 30, sight: 7, binocularSight: 10, binocularCost: 150, binocularLevel: 3 },
  guard: { hireCost: 150, wage: 50, sight: 4, level: 3 },
};

/** Büro-Ausbaustufen: Personalgrenze, Kosten, nötige Ruf-Stufe */
export const OFFICE_LEVELS: { staff: number; cost: number; level: number }[] = [
  { staff: 3, cost: 0, level: 1 },
  { staff: 6, cost: 1000, level: 1 },
  { staff: 10, cost: 3000, level: 2 },
  { staff: 16, cost: 8000, level: 4 },
];

// ---------------------------------------------------------------------------
// Ausrüstung
// ---------------------------------------------------------------------------
export type PathMode = 'foot' | 'mixed' | 'road';

export interface EquipmentDef {
  id: EquipmentId;
  capacity: number;
  speed: number;
  setupSeconds: number;
  visibility: number;
  price: number;
  upkeep: number;
  pathMode: PathMode;
  level: number;
}

export const EQUIPMENT: Record<EquipmentId, EquipmentDef> = {
  tray: { id: 'tray', capacity: 20, speed: 1.5, setupSeconds: 2, visibility: 1, price: 0, upkeep: 0, pathMode: 'foot', level: 1 },
  handcart: { id: 'handcart', capacity: 60, speed: 1.2, setupSeconds: 6, visibility: 2, price: 300, upkeep: 0, pathMode: 'foot', level: 1 },
  scooter: { id: 'scooter', capacity: 35, speed: 3.5, setupSeconds: 3, visibility: 2, price: 800, upkeep: 5, pathMode: 'mixed', level: 2 },
  cargobike: { id: 'cargobike', capacity: 120, speed: 2.6, setupSeconds: 5, visibility: 3, price: 2000, upkeep: 5, pathMode: 'mixed', level: 3 },
  foodtruck: { id: 'foodtruck', capacity: 400, speed: 5.0, setupSeconds: 12, visibility: 5, price: 12000, upkeep: 30, pathMode: 'road', level: 4 },
};

// ---------------------------------------------------------------------------
// Lager und Ausbau
// ---------------------------------------------------------------------------
export const WAREHOUSE = {
  slotsPerSection: 4,
  sectionCosts: [0, 4000, 12000, 35000],
  sectionLevels: [1, 2, 3, 4],
  baseUpkeep: 20,
  sectionUpkeep: 15,
  buildHours: 1,
  demolishRefund: 0.5,
  sightRange: 5,
};

export interface RoomDef {
  type: RoomType;
  cost: number;
  level: number;
  upkeep: number;
  crates: number;
  cooled: boolean;
  unique: boolean;
}

export const ROOMS: Record<RoomType, RoomDef> = {
  shelf: { type: 'shelf', cost: 400, level: 1, upkeep: 0, crates: 10, cooled: false, unique: false },
  coldroom: { type: 'coldroom', cost: 2500, level: 2, upkeep: 15, crates: 8, cooled: true, unique: false },
  ramp: { type: 'ramp', cost: 1200, level: 2, upkeep: 0, crates: 0, cooled: false, unique: true },
  radio: { type: 'radio', cost: 1500, level: 2, upkeep: 0, crates: 0, cooled: false, unique: true },
  office: { type: 'office', cost: 0, level: 1, upkeep: 0, crates: 0, cooled: false, unique: true },
};

// ---------------------------------------------------------------------------
// Ruf-Stufen (Gesamtumsatz)
// ---------------------------------------------------------------------------
export const REPUTATION_THRESHOLDS = [0, 2500, 12000, 40000, 120000];

// ---------------------------------------------------------------------------
// Konto
// ---------------------------------------------------------------------------
export const ACCOUNT = {
  startMoney: 1500,
  overdraftLimit: -1000,
  overdraftInterest: 0.01,
  insolvencyDays: 3,
  startStock: [
    { product: 'apple' as ProductId, crates: 4 },
    { product: 'banana' as ProductId, crates: 3 },
  ],
};

// ---------------------------------------------------------------------------
// Passanten und Verkehr (nur Optik)
// ---------------------------------------------------------------------------
export const AMBIENT = {
  maxPedestrians: 300,
  /** Mindestanteil sichtbarer Passanten auch außerhalb der Spitzenzeit */
  minPedestrianFraction: 0.18,
  pedSpeedMin: 0.9,
  pedSpeedMax: 1.4,
  pedFadeSeconds: 0.8,
  pedTurnChance: 0.18,
  pedGreenChance: 0.15,
  /** Bis zu dieser Entfernung wird ein Passant als Kunde zum Stand umgeleitet */
  customerSearchRadius: 7,
  cars: 14,
  buses: 2,
  carSpeed: 4.2,
  busSpeed: 3.2,
  populationCheckSeconds: 0.5,
};

// ---------------------------------------------------------------------------
// Speichern und Darstellung
// ---------------------------------------------------------------------------
export const SAVE = {
  slots: 3,
  autosaveSeconds: 60,
};

export const CAMERA = {
  zoomLevels: [9, 13, 18, 25, 34, 46],
  defaultZoomIndex: 2,
  tiltDegrees: 35,
  baseYawDegrees: 45,
  panKeySpeed: 22,
  followLerp: 0.12,
};

export const RENDER = {
  shadowMapSize: 2048,
  maxPixelRatio: 2,
  chunkSize: 16,
  uiSnapshotsPerSecond: 4,
  saleFloatSeconds: 1.4,
};
