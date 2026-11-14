// Datentypen des Spielstands. Alles ist reines, serialisierbares JSON ohne Klasseninstanzen.
import type { RoomType } from '../data/balance';
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
}
