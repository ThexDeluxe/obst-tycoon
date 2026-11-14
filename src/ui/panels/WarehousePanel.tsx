// Lager und Bau: Bestand mit Frische, Räume, Büro und Bauabschnitte.
import { useState } from 'preact/hooks';
import { OFFICE_LEVELS, PRODUCT_IDS, PRODUCTS, ROOMS, WAREHOUSE, type RoomType } from '../../data/balance';
import { PRODUCT_NAMES, ROMAN, ROOM_NAMES } from '../../data/names';
import { currentGame } from '../../game';
import { uiTick } from '../store';
import { runningCosts } from '../../sim/day';
import { canSpend, coldCapacity, freeSlots, officeLevel, shelfCapacity, staffLimit } from '../../sim/selectors';
import { freshColor } from '../components';
import { money, pct } from '../format';

const BUILDABLE: RoomType[] = ['shelf', 'coldroom', 'ramp', 'radio'];

const ROOM_INFO: Record<RoomType, string> = {
  shelf: '10 Kisten Lagerplatz',
  coldroom: '8 gekühlte Kisten, 15 € Strom pro Tag',
  ramp: 'Zweite Lieferung: Bestellung bis 10:00, Lieferung 12:00',
  radio: 'Verbindet Walkie-Talkies im Umkreis von 15 Feldern',
  office: '',
};

export function WarehousePanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  const [slotOpen, setSlotOpen] = useState<number | null>(null);
  if (!g) return null;
  const s = g.state;
  const shelf = shelfCapacity(s);
  const cold = coldCapacity(s);
  const cooled = s.crates.filter((c) => c.cooled).length;
  const free = freeSlots(s);
  const office = s.warehouse.rooms.find((r) => r.type === 'office');
  const lvl = officeLevel(s);
  const nextOffice = OFFICE_LEVELS[lvl];
  const nextSection = s.warehouse.sections < WAREHOUSE.sectionCosts.length ? s.warehouse.sections : null;

  return (
    <div class="stack">
      <div class="summary">
        <div class="row">
          <span>Belegt</span>
          <b class="mono">
            {s.crates.length} von {shelf + cold} Kisten
          </b>
        </div>
        {cold > 0 && (
          <div class="row">
            <span>Davon gekühlt</span>
            <b class="mono">
              {cooled} von {cold}
            </b>
          </div>
        )}
        <div class="row">
          <span>Laufende Kosten</span>
          <b class="mono">{money(runningCosts(s))} pro Tag</b>
        </div>
      </div>

      <h3>Bestand</h3>
      {s.crates.length === 0 && <p class="muted small-text">Das Lager ist leer.</p>}
      {PRODUCT_IDS.filter((p) => s.crates.some((c) => c.product === p)).map((p) => {
        const list = s.crates.filter((c) => c.product === p).sort((a, b) => a.fresh - b.fresh);
        const units = list.reduce((n, c) => n + c.units, 0);
        return (
          <div key={p} class="stock-row">
            <div class="row">
              <span>
                <span class="swatch" style={{ background: `#${PRODUCTS[p].color.toString(16).padStart(6, '0')}` }} />
                {PRODUCT_NAMES[p]}
              </span>
              <span class="mono small-text">
                {list.length} Kisten, {units} Einheiten
              </span>
            </div>
            <div class="crate-chips">
              {list.map((c) => (
                <span
                  key={c.id}
                  class={`chip ${c.cooled ? 'cooled' : ''}`}
                  title={`${c.units} Einheiten, Frische ${pct(c.fresh)}${c.cooled ? ', gekühlt' : ''}`}
                  style={{ background: freshColor(c.fresh) }}
                >
                  {Math.round(c.fresh * 100)}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <p class="muted small-text">Zahlen in den Kisten: Frische in Prozent. Unter 40 % gibt es nur 60 % des Preises, bei 0 % wird die Ware entsorgt.</p>

      <h3>Räume</h3>
      <div class="slot-grid">
        {Array.from({ length: s.warehouse.sections * WAREHOUSE.slotsPerSection }, (_, slot) => {
          const room = s.warehouse.rooms.find((r) => r.slot === slot);
          const isFree = free.includes(slot);
          return (
            <div key={slot} class={`slot ${room ? 'used' : 'free'} ${slotOpen === slot ? 'open' : ''}`}>
              <button class="slot-head" onClick={() => setSlotOpen(slotOpen === slot ? null : slot)}>
                <span>
                  {room ? (room.type === 'office' ? `Büro ${ROMAN[room.level - 1]}` : ROOM_NAMES[room.type]) : 'Freier Platz'}
                </span>
                <span class="muted small-text">{room && room.buildTicks > 0 ? 'im Bau' : `Abschnitt ${Math.floor(slot / 4) + 1}`}</span>
              </button>
              {slotOpen === slot && isFree && (
                <div class="slot-options">
                  {BUILDABLE.map((t) => {
                    const def = ROOMS[t];
                    const locked = s.level < def.level;
                    const exists = def.unique && s.warehouse.rooms.some((r) => r.type === t);
                    return (
                      <button
                        key={t}
                        class="btn small option"
                        disabled={locked || exists || !canSpend(s, def.cost)}
                        onClick={() => {
                          g.command({ type: 'build', slot, room: t });
                          setSlotOpen(null);
                        }}
                      >
                        <span>
                          {ROOM_NAMES[t]} <b class="mono">{money(def.cost)}</b>
                        </span>
                        <small>{locked ? `ab Ruf-Stufe ${def.level}` : exists ? 'schon vorhanden' : ROOM_INFO[t]}</small>
                      </button>
                    );
                  })}
                </div>
              )}
              {slotOpen === slot && room && room.type !== 'office' && (
                <div class="slot-options">
                  <button
                    class="btn small danger"
                    onClick={() => {
                      g.command({ type: 'demolish', slot });
                      setSlotOpen(null);
                    }}
                  >
                    Abreißen (Erstattung {money(ROOMS[room.type].cost * WAREHOUSE.demolishRefund)})
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p class="muted small-text">Ein Bau dauert eine Spielstunde. Nach Feierabend wird über Nacht gebaut.</p>

      <h3>Büro</h3>
      <div class="row">
        <span>
          Büro {ROMAN[lvl - 1]}: bis zu {staffLimit(s)} Personen
        </span>
        {nextOffice ? (
          <button
            class="btn small primary"
            disabled={s.level < nextOffice.level || !canSpend(s, nextOffice.cost) || (office?.buildTicks ?? 0) > 0}
            onClick={() => g.command({ type: 'upgradeOffice' })}
          >
            Büro {ROMAN[lvl]} ({nextOffice.staff} Pers.) {money(nextOffice.cost)}
          </button>
        ) : (
          <span class="muted small-text">höchste Stufe</span>
        )}
      </div>
      {nextOffice && s.level < nextOffice.level && <p class="muted small-text">Büro {ROMAN[lvl]} ab Ruf-Stufe {nextOffice.level}.</p>}

      <h3>Bauabschnitte</h3>
      <div class="row">
        <span>{s.warehouse.sections} von 4 gebaut</span>
        {nextSection !== null && (
          <button
            class="btn small primary"
            disabled={s.level < WAREHOUSE.sectionLevels[nextSection] || !canSpend(s, WAREHOUSE.sectionCosts[nextSection])}
            onClick={() => g.command({ type: 'buySection' })}
          >
            Abschnitt {nextSection + 1} {money(WAREHOUSE.sectionCosts[nextSection])}
          </button>
        )}
      </div>
      {nextSection !== null && s.level < WAREHOUSE.sectionLevels[nextSection] && (
        <p class="muted small-text">
          Abschnitt {nextSection + 1} ab Ruf-Stufe {WAREHOUSE.sectionLevels[nextSection]}. Jeder weitere Abschnitt kostet {money(WAREHOUSE.sectionUpkeep)} pro Tag.
        </p>
      )}
    </div>
  );
}
