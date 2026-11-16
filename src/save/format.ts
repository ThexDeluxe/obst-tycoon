// Speicherformat: JSON mit Versionsnummer und einer Migrationsfunktion pro Version.
// Diese Datei hat keine Abhängigkeit zum Browser und wird in den Tests geprüft.
import { DISTRICT_IDS, SALES_QUALITY, START, WHOLESALER } from '../data/balance';
import { createDealer } from '../sim/dealers';
import { spotCapacity } from '../sim/selectors';
import { emptyCounts } from '../sim/stock';
import type { GameState } from '../sim/types';
import { createInitialState, STATE_VERSION } from '../sim/state';
import { getWorld } from '../sim/world';

export const SAVE_FORMAT = 'obst-tycoon-save';

export interface SaveFile {
  format: typeof SAVE_FORMAT;
  version: number;
  savedAt: string;
  label: string;
  state: GameState;
}

export class SaveError extends Error {}

type Migration = (state: Record<string, unknown>) => Record<string, unknown>;

/**
 * Version 3 ist das vereinfachte Spiel (Kisten, selbstständige Verkäufer, Eroberung der Viertel).
 * Ältere Stände werden übernommen, soweit es passt: Tag, Geld (mindestens das Startkapital) und die Zahl der Verkäufer.
 */
function toVersion3(raw: Record<string, unknown>): Record<string, unknown> {
  const world = getWorld();
  const seed = typeof raw.seed === 'number' ? raw.seed : 1;
  const fresh = createInitialState(world, { seed, ambient: raw.ambient !== false });
  if (typeof raw.day === 'number' && raw.day >= 0) fresh.day = Math.floor(raw.day);
  if (typeof raw.money === 'number' && Number.isFinite(raw.money)) fresh.money = Math.max(START.money, Math.round(raw.money));
  const staff = Array.isArray(raw.staff) ? raw.staff.length : 0;
  while (fresh.dealers.length < Math.min(staff, spotCapacity(fresh, world))) createDealer(fresh, world);
  return fresh as unknown as Record<string, unknown>;
}

/**
 * Version 4 (M7): Lieferungen, Frische, Kühlung und Sättigung. Der Spielfortschritt bleibt erhalten,
 * vorhandene Kisten gelten als frisch, die Verkäufer laden ihre Ware ins Lager zurück.
 */
function toVersion4(raw: Record<string, unknown>): Record<string, unknown> {
  const s = raw as unknown as GameState & { crates: { id: number; fruit: string }[] };
  s.crates = (s.crates ?? []).map((c) => ({ id: c.id, fruit: c.fruit as GameState['crates'][number]['fruit'], fresh: 1, quality: WHOLESALER.quality, cooled: false }));
  for (const d of s.dealers ?? []) d.load = (d.load ?? []).map((l) => ({ ...l, fresh: 1, quality: WHOLESALER.quality }));
  s.coldRoom = false;
  s.delivery = null;
  s.backlog = [];
  s.orders = emptyCounts();
  s.kioskToday = 0;
  s.soldToday = emptyCounts();
  s.salesDays = [];
  s.availToday = emptyCounts();
  s.districtSold = DISTRICT_IDS.map(() => emptyCounts());
  s.salesQuality = SALES_QUALITY.base;
  s.spentToday = 0;
  s.spoiledToday = 0;
  // Die Aufträge wurden neu geschrieben: von vorn, erledigte werden sofort nachgeholt
  s.story = 0;
  return raw;
}

/** migrations[v] hebt einen Spielstand von Version v auf v + 1. */
export const migrations: Record<number, Migration> = {
  // Version 1 (M1) und 2 (M2) hatten das ausführliche Wirtschaftsmodell.
  1: (raw) => raw,
  2: toVersion3,
  3: toVersion4,
};

export function serialize(state: GameState, label: string): string {
  const file: SaveFile = {
    format: SAVE_FORMAT,
    version: STATE_VERSION,
    savedAt: new Date().toISOString(),
    label,
    state: { ...state, version: STATE_VERSION },
  };
  return JSON.stringify(file);
}

export function migrateState(raw: Record<string, unknown>, fromVersion: number): GameState {
  let v = fromVersion;
  let s = raw;
  while (v < STATE_VERSION) {
    const m = migrations[v];
    if (!m) throw new SaveError(`Keine Migration von Version ${v} vorhanden.`);
    try {
      s = m(s);
    } catch {
      throw new SaveError(`Der Spielstand ist beschädigt (Migration von Version ${v}).`);
    }
    v++;
    s.version = v;
  }
  return s as unknown as GameState;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Liest einen Spielstand. Fehlerhafte Daten führen zu einem SaveError. */
export function deserialize(text: string): SaveFile {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new SaveError('Die Datei ist kein gültiges JSON.');
  }
  if (!isObject(data) || data.format !== SAVE_FORMAT) throw new SaveError('Die Datei ist kein Spielstand von Obst-Tycoon.');
  const version = data.version;
  if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) throw new SaveError('Die Versionsnummer fehlt oder ist ungültig.');
  if (version > STATE_VERSION) throw new SaveError('Der Spielstand stammt aus einer neueren Version des Spiels.');
  if (!isObject(data.state)) throw new SaveError('Der Spielstand enthält keine Spieldaten.');
  const state = migrateState(data.state, version);
  validateState(state);
  return {
    format: SAVE_FORMAT,
    version: STATE_VERSION,
    savedAt: typeof data.savedAt === 'string' ? data.savedAt : '',
    label: typeof data.label === 'string' ? data.label : '',
    state,
  };
}

/** Grobe Plausibilitätsprüfung, damit ein beschädigter Stand nicht zum Absturz führt. */
export function validateState(s: GameState): void {
  const fail = (what: string): never => {
    throw new SaveError(`Der Spielstand ist beschädigt (${what}).`);
  };
  if (typeof s.day !== 'number' || s.day < 0) fail('Tag');
  if (typeof s.dayTick !== 'number') fail('Uhrzeit');
  if (typeof s.rng !== 'number' || typeof s.ambientRng !== 'number') fail('Zufallsgenerator');
  if (!Array.isArray(s.peds) || !Array.isArray(s.vehicles)) fail('Passanten');
  if (!Array.isArray(s.queue)) s.queue = [];
  if (!Array.isArray(s.messages)) s.messages = [];
  if (typeof s.money !== 'number' || !Number.isFinite(s.money)) fail('Kontostand');
  if (!Array.isArray(s.dealers) || !Array.isArray(s.crates) || !Array.isArray(s.districts)) fail('Verkäufer oder Lager');
  if (typeof s.shelves !== 'number' || typeof s.fighters !== 'number') fail('Lager oder Kämpfer');
  if (!s.stats) fail('Statistik');
  if (!Array.isArray(s.history)) s.history = [];
  if (!s.orders || !s.soldToday || !s.availToday || !Array.isArray(s.districtSold) || !Array.isArray(s.salesDays)) fail('Lager');
}
