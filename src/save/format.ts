// Speicherformat: JSON mit Versionsnummer und einer Migrationsfunktion pro Version.
// Diese Datei hat keine Abhängigkeit zum Browser und wird in den Tests geprüft.
import type { GameState } from '../sim/types';
import { initEconomy, STATE_VERSION } from '../sim/state';
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

/** migrations[v] hebt einen Spielstand von Version v auf v + 1. */
export const migrations: Record<number, Migration> = {
  // Version 1 (M1) kannte noch keine Wirtschaft: Startkapital, Startbestand und Startverkäufer ergänzen.
  1: (raw) => {
    initEconomy(raw as unknown as GameState, getWorld());
    return raw;
  },
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
  if (!s.warehouse || !Array.isArray(s.warehouse.rooms)) fail('Lager');
  if (!Array.isArray(s.queue)) s.queue = [];
  if (!Array.isArray(s.messages)) s.messages = [];
  if (s.phase !== 'day' && s.phase !== 'dayEnd') fail('Phase');
  if (typeof s.money !== 'number' || !Number.isFinite(s.money)) fail('Kontostand');
  if (!Array.isArray(s.staff) || !Array.isArray(s.crates) || !Array.isArray(s.orders)) fail('Personal oder Lager');
  if (!s.marketFactors || !s.priceFactors || !s.ledger) fail('Großmarkt');
  if (!Array.isArray(s.reports)) s.reports = [];
}
