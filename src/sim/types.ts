// Datentypen des Spielstands. Alles ist reines, serialisierbares JSON ohne Klasseninstanzen.
import type { EquipmentId, ProductId, RoomType } from '../data/balance';
import type { Command } from './commands';

export type Phase = 'day' | 'dayEnd';

export interface Pedestrian {
  id: number;
  /** Position in Feldkoordinaten (Feldmitte bei +0,5) */
  x: number;
  y: number;
  /** Position im vorigen Tick, für die Interpolation */
  px: number;
  py: number;
  /** Aktuelles Teilstück von Feld from nach Feld to */
  from: number;
  to: number;
  t: number;
  speed: number;
  /** Blickrichtung in Radiant (0 = Osten, π/2 = Süden) */
  ang: number;
  /** Zufallswert für Kleidung und Hautfarbe */
  look: number;
  /** 0 gehen, 1 stehen (Kunde am Stand), 2 auf dem Weg zum Stand */
  mode: number;
  timer: number;
  /** 0..1, für sanftes Ein- und Ausblenden */
  fade: number;
  leaving: boolean;
  path: number[] | null;
  pathIdx: number;
}

export interface Vehicle {
  id: number;
  kind: 'car' | 'bus';
  route: number;
  s: number;
  ps: number;
  speed: number;
  color: number;
  wait: number;
  /** Strecke bis zur nächsten Haltestelle (nur Bus), fortlaufend gezählt */
  nextStop: number;
}

export interface Room {
  slot: number;
  type: RoomType;
  /** Ausbaustufe (nur Büro) */
  level: number;
  /** Verbleibende Bauzeit in Ticks, 0 = fertig */
  buildTicks: number;
}

export interface WarehouseState {
  sections: number;
  rooms: Room[];
}

export type MessageKind = 'info' | 'delivery' | 'warning' | 'danger' | 'unlock' | 'report';

export interface Message {
  id: number;
  day: number;
  dayTick: number;
  kind: MessageKind;
  text: string;
  /** Ort für die Kamerafahrt */
  x?: number;
  y?: number;
}

// ---------------------------------------------------------------------------
// Wirtschaft (ab Version 2)
// ---------------------------------------------------------------------------

/** Eine Kiste im Lager. Frische 1 = 100 %, 0 = verdorben. */
export interface Crate {
  id: number;
  product: ProductId;
  units: number;
  fresh: number;
  cooled: boolean;
}

/** Ware, die ein Verkäufer bei sich trägt (eine Charge gleicher Frische) */
export interface CargoItem {
  product: ProductId;
  units: number;
  fresh: number;
}

export interface OrderLine {
  product: ProductId;
  crates: number;
  /** Preis je Einheit nach Tagesfaktor und Rabatt */
  unitPrice: number;
}

export interface PendingOrder {
  id: number;
  lines: OrderLine[];
  /** Liefertag und Uhrzeit (Ticks seit 06:00) */
  deliverDay: number;
  deliverTick: number;
}

export interface Applicant {
  id: number;
  name: string;
  talent: number;
  vigilance: number;
  wage: number;
}

export type VendorMode =
  | 'idle'
  | 'loading'
  | 'waitStock'
  | 'toSpot'
  | 'setup'
  | 'selling'
  | 'packing'
  | 'toWarehouse';

export type Assortment = 'auto' | Partial<Record<ProductId, number>>;

export interface Person {
  id: number;
  name: string;
  role: 'vendor';
  talent: number;
  vigilance: number;
  wage: number;
  hiredDay: number;
  equipment: EquipmentId;
  /** Zugewiesener Verkaufsplatz (Index) oder null */
  spot: number | null;
  /** Platz an dem der Verkäufer gerade steht oder hingeht */
  activeSpot: number | null;
  /** Position am Platz (0 oder 1) */
  slot: number;
  mode: VendorMode;
  timer: number;
  x: number;
  y: number;
  px: number;
  py: number;
  ang: number;
  path: number[] | null;
  pathIdx: number;
  /** Zielpunkt am Ende des Weges (mit Versatz am Platz) */
  endX: number;
  endY: number;
  cargo: CargoItem[];
  assortment: Assortment;
  revenueToday: number;
  unitsToday: number;
  revenueTotal: number;
}

export interface Ledger {
  sales: number;
  refunds: number;
  purchases: number;
  wages: number;
  running: number;
  fines: number;
  investments: number;
}

export interface DistrictDay {
  revenue: number;
  units: number;
}

export interface DayReport {
  day: number;
  ledger: Ledger;
  net: number;
  moneyEnd: number;
  spoiledValue: number;
  spoiledUnits: number;
  districts: { revenue: number; competitor: number; share: number; attention: number }[];
  vendors: { id: number; name: string; revenue: number; units: number }[];
  events: string[];
}

export interface GameState {
  version: number;
  seed: number;
  rng: number;
  ambientRng: number;
  /** Spieltag, 0 ist der erste Montag */
  day: number;
  /** Ticks seit 06:00 des aktuellen Tages */
  dayTick: number;
  totalTicks: number;
  phase: Phase;
  nextId: number;
  /** Passanten und Verkehr berechnen (im Balancing-Bot abgeschaltet) */
  ambient: boolean;
  peds: Pedestrian[];
  vehicles: Vehicle[];
  ambientTimer: number;
  warehouse: WarehouseState;
  queue: Command[];
  messages: Message[];

  // Ab Version 2
  money: number;
  totalRevenue: number;
  level: number;
  ledger: Ledger;
  crates: Crate[];
  /** Tagespreisfaktor des Großmarkts je Produkt */
  marketFactors: Record<ProductId, number>;
  /** Verkaufspreisfaktor des Spielers je Produkt */
  priceFactors: Record<ProductId, number>;
  orders: PendingOrder[];
  staff: Person[];
  applicants: Applicant[];
  /** Gekaufte, nicht zugewiesene Ausrüstung */
  inventory: Record<string, number>;
  /** Löhne entlassener Personen, die beim Tagesabschluss fällig werden */
  pendingWages: number;
  districtDay: DistrictDay[];
  /** Marktanteil des Vortags je Viertel */
  shares: number[];
  reports: DayReport[];
  dayEvents: string[];
  insolvencyStreak: number;
  stats: { spoiledValue: number; daysPlayed: number };
}
