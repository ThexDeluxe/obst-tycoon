// Speicherplätze in IndexedDB über idb-keyval: drei Plätze plus ein Autosave.
import { createStore, del, get, set } from 'idb-keyval';
import { SAVE } from '../data/balance';
import type { GameState } from '../sim/types';
import { clockText } from '../sim/time';
import { deserialize, serialize, type SaveFile } from './format';

export type SlotId = 'auto' | 'slot1' | 'slot2' | 'slot3';

export const SLOT_IDS: SlotId[] = ['auto', ...Array.from({ length: SAVE.slots }, (_, i) => `slot${i + 1}` as SlotId)];

export function slotName(slot: SlotId): string {
  return slot === 'auto' ? 'Autosave' : `Speicherplatz ${slot.slice(4)}`;
}

let store: ReturnType<typeof createStore> | null = null;
function db() {
  if (!store) store = createStore('obst-tycoon', 'saves');
  return store;
}

export interface SlotInfo {
  slot: SlotId;
  label: string;
  savedAt: string;
}

export function stateLabel(state: GameState): string {
  return `Tag ${state.day + 1}, ${clockText(state)}, ${Math.round(state.money)} €`;
}

export async function saveToSlot(slot: SlotId, state: GameState): Promise<void> {
  await set(slot, serialize(state, stateLabel(state)), db());
}

export async function loadFromSlot(slot: SlotId): Promise<SaveFile | null> {
  const text = await get<string>(slot, db());
  if (!text) return null;
  return deserialize(text);
}

export async function deleteSlot(slot: SlotId): Promise<void> {
  await del(slot, db());
}

export async function listSlots(): Promise<(SlotInfo | null)[]> {
  const result: (SlotInfo | null)[] = [];
  for (const slot of SLOT_IDS) {
    try {
      const text = await get<string>(slot, db());
      if (!text) {
        result.push(null);
        continue;
      }
      const head = JSON.parse(text) as { label?: string; savedAt?: string };
      result.push({ slot, label: head.label ?? '', savedAt: head.savedAt ?? '' });
    } catch {
      result.push(null);
    }
  }
  return result;
}

/** Spielstand als .json-Datei herunterladen */
export function exportToFile(state: GameState): void {
  const text = serialize(state, stateLabel(state));
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `obst-tycoon-tag-${state.day + 1}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Datei auswählen und als Spielstand lesen. Fehler werden als SaveError geworfen. */
export function importFromFile(): Promise<SaveFile | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      file
        .text()
        .then((t) => resolve(deserialize(t)))
        .catch(reject);
    };
    input.click();
  });
}
