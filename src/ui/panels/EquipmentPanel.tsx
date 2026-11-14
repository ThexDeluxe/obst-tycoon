// Ausrüstung: Katalog, Kauf und Bestand.
import { EQUIPMENT, EQUIPMENT_IDS } from '../../data/balance';
import { EQUIPMENT_NAMES } from '../../data/names';
import { currentGame } from '../../game';
import { uiTick } from '../store';
import { canSpend, equipmentOwned } from '../../sim/selectors';
import { int, money } from '../format';

const WAYS = { foot: 'Gehweg', mixed: 'Gehweg, Straße', road: 'Straße, nur Plätze mit Parkbucht' } as const;

export function EquipmentPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  return (
    <div class="stack">
      <p class="muted small-text">Gekaufte Ausrüstung kommt ins Inventar. Zuweisen geht über die Personenkarte, solange die Person im Lager ist.</p>
      {EQUIPMENT_IDS.map((id) => {
        const def = EQUIPMENT[id];
        const locked = s.level < def.level;
        const owned = equipmentOwned(s, id);
        const free = s.inventory[id] ?? 0;
        return (
          <div key={id} class={`card ${locked ? 'locked' : ''}`}>
            <div class="row">
              <b>{EQUIPMENT_NAMES[id]}</b>
              {id === 'tray' ? (
                <span class="muted small-text">kostenlos für jeden Verkäufer</span>
              ) : (
                <button class="btn small primary" disabled={locked || !canSpend(s, def.price)} onClick={() => g.command({ type: 'buyEquipment', equipment: id })}>
                  Kaufen {money(def.price)}
                </button>
              )}
            </div>
            <div class="spec-grid small-text">
              <span>Tragkraft</span>
              <b>{int(def.capacity)}</b>
              <span>Tempo</span>
              <b>{String(def.speed).replace('.', ',')} Felder/s</b>
              <span>Auf- und Abbau</span>
              <b>{def.setupSeconds} s</b>
              <span>Auffälligkeit</span>
              <b>{def.visibility}</b>
              <span>Unterhalt</span>
              <b>{money(def.upkeep)} pro Tag</b>
              <span>Wege</span>
              <b>{WAYS[def.pathMode]}</b>
            </div>
            {locked && <p class="muted small-text">ab Ruf-Stufe {def.level}</p>}
            {id !== 'tray' && owned > 0 && (
              <p class="small-text">
                Bestand {owned}, davon frei {free}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
