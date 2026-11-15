// Datentypen des Spielstands. Alles ist reines, serialisierbares JSON ohne Klasseninstanzen.
import type { FruitId } from '../data/balance';
import type { Command } from './commands';

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

export type MessageKind = 'info' | 'money' | 'warning' | 'danger' | 'unlock' | 'story' | 'battle';

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

/** Eine volle Kiste im Lager */
export interface Crate {
  id: number;
  fruit: FruitId;
}

/** Ware, die ein Verkäufer trägt: eine angebrochene oder volle Kiste */
export interface Load {
  fruit: FruitId;
  units: number;
}

export type DealerMode = 'idle' | 'loading' | 'toSpot' | 'setup' | 'selling' | 'packing' | 'toWarehouse';

export interface Dealer {
  id: number;
  name: string;
  /** Zufallswert für das Aussehen */
  look: number;
  mode: DealerMode;
  timer: number;
  x: number;
  y: number;
  px: number;
  py: number;
  ang: number;
  path: number[] | null;
  pathIdx: number;
  endX: number;
  endY: number;
  /** Platz, den der Verkäufer gewählt hat (Index) */
  spot: number | null;
  /** Position am Platz (0 oder 1) */
  slot: number;
  load: Load[];
  soldToday: number;
  earnedToday: number;
  earnedTotal: number;
}

export interface DistrictState {
  owner: 'player' | 'gang';
  /** Kämpfer der Gemüsegang in diesem Viertel */
  gang: number;
}

export interface BattleRoll {
  attacker: number[];
  defender: number[];
  attackerLoss: number;
  defenderLoss: number;
}

export interface Battle {
  district: number;
  attackers: number;
  defenders: number;
  startAttackers: number;
  startDefenders: number;
  rounds: number;
  last: BattleRoll | null;
  result: 'running' | 'won' | 'lost' | 'retreated';
}

export interface GameStats {
  cratesBought: number;
  sold: number;
  battlesWon: number;
  battlesLost: number;
  fightersLost: number;
  gangDefeated: number;
}

export interface GameState {
  version: number;
  seed: number;
  rng: number;
  ambientRng: number;
  /** Spieltag, 0 ist der erste Tag */
  day: number;
  /** Ticks seit 06:00 des aktuellen Tages */
  dayTick: number;
  totalTicks: number;
  nextId: number;
  /** Passanten und Verkehr berechnen (im Balancing-Bot abgeschaltet) */
  ambient: boolean;
  peds: Pedestrian[];
  vehicles: Vehicle[];
  ambientTimer: number;
  queue: Command[];
  messages: Message[];

  money: number;
  earnedTotal: number;
  earnedToday: number;
  /** Einnahmen der letzten abgeschlossenen Tage */
  history: number[];
  crates: Crate[];
  shelves: number;
  dealers: Dealer[];
  fighters: number;
  /** Gekaufte Ausrüstung für alle Verkäufer: 0 keine, 1 Handkarren, 2 Lastenräder */
  upgrade: number;
  districts: DistrictState[];
  battle: Battle | null;
  /** Aktueller Auftrag (Index in der Geschichte) */
  story: number;
  won: boolean;
  stats: GameStats;
}
