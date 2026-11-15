// Hauptmenü: Neues Spiel, Fortsetzen, Laden, Löschen, Importieren.
import { useEffect, useState } from 'preact/hooks';
import { SaveError } from '../save/format';
import { deleteSlot, importFromFile, listSlots, loadFromSlot, slotName, SLOT_IDS, type SlotInfo, type SlotId } from '../save/storage';
import type { GameState } from '../sim/types';
import { showToast } from './store';

interface Props {
  onNew(): void;
  onLoad(state: GameState): void;
}

export function MainMenu({ onNew, onLoad }: Props) {
  const [slots, setSlots] = useState<(SlotInfo | null)[]>([]);
  const [mode, setMode] = useState<'main' | 'load' | 'delete'>('main');

  const refresh = () => {
    listSlots()
      .then(setSlots)
      .catch(() => setSlots([]));
  };
  useEffect(refresh, []);

  const latest = slots
    .filter((s): s is SlotInfo => !!s)
    .sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1))[0];

  const load = async (slot: SlotId) => {
    try {
      const f = await loadFromSlot(slot);
      if (f) onLoad(f.state);
    } catch (e) {
      showToast(e instanceof SaveError ? e.message : 'Der Spielstand konnte nicht geladen werden.', 'error');
    }
  };

  const doImport = async () => {
    try {
      const f = await importFromFile();
      if (f) onLoad(f.state);
    } catch (e) {
      showToast(e instanceof SaveError ? e.message : 'Die Datei konnte nicht gelesen werden.', 'error');
    }
  };

  return (
    <div class="menu-screen">
      <div class="menu-card">
        <div class="menu-title">
          <h1>Obst-Tycoon</h1>
          <p>Vom Untergrund ins Bankenviertel: Kaufe Obst kistenweise, schick Verkäufer auf die Straße und erobere die Stadt von der Gemüsegang.</p>
        </div>
        {mode === 'main' && (
          <div class="menu-buttons">
            <button class="btn primary" onClick={onNew}>
              Neues Spiel
            </button>
            <button class="btn" disabled={!latest} onClick={() => latest && load(latest.slot)}>
              Weiterspielen{latest ? ` (${latest.label})` : ''}
            </button>
            <button class="btn" onClick={() => setMode('load')}>
              Laden
            </button>
            <button class="btn" onClick={() => setMode('delete')}>
              Löschen
            </button>
            <button class="btn" onClick={doImport}>
              Importieren
            </button>
          </div>
        )}
        {mode !== 'main' && (
          <div class="menu-buttons">
            {SLOT_IDS.map((id, i) => {
              const info = slots[i];
              return (
                <button
                  key={id}
                  class={`btn slot ${mode === 'delete' ? 'danger' : ''}`}
                  disabled={!info}
                  onClick={async () => {
                    if (!info) return;
                    if (mode === 'load') await load(id);
                    else {
                      await deleteSlot(id);
                      showToast(`${slotName(id)} gelöscht.`);
                      refresh();
                    }
                  }}
                >
                  <span>{slotName(id)}</span>
                  <small>{info ? info.label : 'leer'}</small>
                </button>
              );
            })}
            <button class="btn" onClick={() => setMode('main')}>
              Zurück
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
