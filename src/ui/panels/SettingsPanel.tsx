// Einstellungen, Speichern und Entwicklerkonsole.
import { useEffect, useState } from 'preact/hooks';
import { currentGame } from '../../game';
import { exportToFile, listSlots, saveToSlot, slotName, SLOT_IDS, type SlotInfo } from '../../save/storage';
import { screen, settings, showToast, updateSettings, type Settings, uiTick } from '../store';

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange(v: boolean): void }) {
  return (
    <label class="row toggle">
      <span>{label}</span>
      <input type="checkbox" checked={value} onChange={(e) => onChange((e.target as HTMLInputElement).checked)} />
    </label>
  );
}

export function SettingsPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const s = settings.value;
  const g = currentGame();
  const [slots, setSlots] = useState<(SlotInfo | null)[]>([]);
  const refresh = () => {
    listSlots().then(setSlots).catch(() => setSlots([]));
  };
  useEffect(refresh, []);

  const set = (patch: Partial<Settings>) => {
    updateSettings(patch);
    g?.applySettings(settings.value);
  };

  return (
    <div class="stack">
      <h3>Grafik</h3>
      <Toggle label="Schatten" value={s.shadows} onChange={(v) => set({ shadows: v })} />
      <label class="row">
        <span>Grafikqualität</span>
        <select value={s.quality} onChange={(e) => set({ quality: (e.target as HTMLSelectElement).value as Settings['quality'] })}>
          <option value="low">Niedrig</option>
          <option value="medium">Mittel</option>
          <option value="high">Hoch</option>
        </select>
      </label>
      <Toggle label="Umsatzzahlen anzeigen" value={s.saleNumbers} onChange={(v) => set({ saleNumbers: v })} />
      <Toggle label="Debug-Anzeige (F3)" value={s.debug} onChange={(v) => set({ debug: v })} />

      <h3>Speichern</h3>
      <label class="row">
        <span>Autosave-Intervall</span>
        <select value={String(s.autosaveSeconds)} onChange={(e) => set({ autosaveSeconds: Number((e.target as HTMLSelectElement).value) })}>
          <option value="30">30 Sekunden</option>
          <option value="60">60 Sekunden</option>
          <option value="120">2 Minuten</option>
          <option value="300">5 Minuten</option>
        </select>
      </label>
      {SLOT_IDS.filter((id) => id !== 'auto').map((id) => {
        const info = slots[SLOT_IDS.indexOf(id)];
        return (
          <button
            key={id}
            class="btn slot"
            onClick={async () => {
              if (!g) return;
              try {
                await saveToSlot(id, g.state);
                showToast(`Gespeichert in ${slotName(id)}.`);
                refresh();
              } catch {
                showToast('Speichern ist fehlgeschlagen.', 'error');
              }
            }}
          >
            <span>Speichern in {slotName(id)}</span>
            <small>{info ? info.label : 'leer'}</small>
          </button>
        );
      })}
      <button class="btn" onClick={() => g && exportToFile(g.state)}>
        Als Datei exportieren
      </button>
      <button
        class="btn"
        onClick={() => {
          g?.autosave();
          screen.value = 'menu';
        }}
      >
        Zum Hauptmenü
      </button>

      {import.meta.env.DEV && g && (
        <>
          <h3>Entwicklerkonsole</h3>
          <div class="row wrap">
            <button class="btn small" onClick={() => g.command({ type: 'debugSkipHours', hours: 1 })}>
              +1 Stunde
            </button>
            <button class="btn small" onClick={() => g.command({ type: 'debugSkipHours', hours: 4 })}>
              +4 Stunden
            </button>
            <button class="btn small" onClick={() => g.command({ type: 'debugSkipHours', hours: 24 })}>
              Bis Tagesende
            </button>
            <button class="btn small" onClick={() => g.command({ type: 'debugSetMoney', amount: g.state.money + 5000 })}>
              +5.000 €
            </button>
            <button class="btn small" onClick={() => g.command({ type: 'debugSetLevel', level: g.state.level + 1 })}>
              Ruf-Stufe +1
            </button>
          </div>
        </>
      )}
    </div>
  );
}
