// Auswahlkarten für Personen und Verkaufsplätze, Hinweis im Zuweisungsmodus.
import { useState } from 'preact/hooks';
import { EQUIPMENT, EQUIPMENT_IDS, PRODUCTS, SPOT, type EquipmentId, type ProductId } from '../data/balance';
import { DISTRICT_NAMES, EQUIPMENT_NAMES, PRODUCT_NAMES } from '../data/names';
import { currentGame } from '../game';
import { capacityOf, cargoUnits, unlockedProducts } from '../sim/selectors';
import { demandCurve, hourOf, weekdayFactor } from '../sim/time';
import type { Person } from '../sim/types';
import { isInWarehouse } from '../sim/vendors';
import { Bar, CurveChart, Pips, Stepper, freshColor } from './components';
import { dec1, money, pct } from './format';
import { IconClose, IconCrosshair, IconHome, IconPin } from './icons';
import { assignFor, selection, uiTick } from './store';
import { statusText } from './status';

function PersonCard({ p }: { p: Person }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const [confirmFire, setConfirmFire] = useState(false);
  const [showAssort, setShowAssort] = useState(false);
  const cap = capacityOf(p);
  const units = cargoUnits(p);
  const inside = isInWarehouse(p);
  const options: EquipmentId[] = EQUIPMENT_IDS.filter((id) => id === 'tray' || id === p.equipment || (s.inventory[id] ?? 0) > 0);
  const products = unlockedProducts(s);
  const manual = p.assortment !== 'auto' ? p.assortment : null;
  const spotName = p.spot !== null ? g.world.spots[p.spot].name : 'kein Platz';
  return (
    <>
      <header>
        <div>
          <h2>{p.name}</h2>
          <span class="muted small-text">Verkäufer · {statusText(g.world, p)}</span>
        </div>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (selection.value = null)}>
          <IconClose size={18} />
        </button>
      </header>
      <div class="card-body">
        <div class="spec-grid small-text">
          <span>Verkaufstalent</span>
          <Pips value={p.talent} />
          <span>Wachsamkeit</span>
          <Pips value={p.vigilance} />
          <span>Lohn</span>
          <b class="mono">{money(p.wage)} pro Tag</b>
          <span>Platz</span>
          <b>{spotName}</b>
          <span>Umsatz heute</span>
          <b class="mono">
            {money(p.revenueToday)} ({p.unitsToday} Einh.)
          </b>
        </div>
        <div class="row small-text">
          <span>Ware</span>
          <span class="mono">
            {units} von {cap}
          </span>
        </div>
        <Bar value={units / cap} />
        {p.cargo.length > 0 && (
          <div class="crate-chips">
            {p.cargo.map((c, i) => (
              <span key={i} class="chip wide" style={{ background: freshColor(c.fresh) }} title={`Frische ${pct(c.fresh)}`}>
                {c.units} {PRODUCT_NAMES[c.product]}
              </span>
            ))}
          </div>
        )}
        <label class="row small-text">
          <span>Ausrüstung</span>
          <select
            value={p.equipment}
            disabled={!inside}
            onChange={(e) => g.command({ type: 'equip', personId: p.id, equipment: (e.target as HTMLSelectElement).value as EquipmentId })}
          >
            {options.map((id) => (
              <option key={id} value={id}>
                {EQUIPMENT_NAMES[id]} ({EQUIPMENT[id].capacity})
              </option>
            ))}
          </select>
        </label>
        {!inside && options.length > 1 && <p class="muted small-text">Ausrüstung wechseln geht nur im Lager.</p>}
        <div class="row small-text">
          <span>Sortiment</span>
          <button class="btn small" onClick={() => setShowAssort(!showAssort)}>
            {manual ? 'Von Hand' : 'Automatisch'}
          </button>
        </div>
        {showAssort && (
          <div class="assort">
            <label class="row small-text toggle">
              <span>Automatisch nach Vorlieben im Viertel</span>
              <input
                type="checkbox"
                checked={!manual}
                onChange={(e) => {
                  const auto = (e.target as HTMLInputElement).checked;
                  if (auto) g.command({ type: 'setAssortment', personId: p.id, assortment: 'auto' });
                  else {
                    const share = Math.floor(100 / products.length / 10) * 10;
                    const a: Partial<Record<ProductId, number>> = {};
                    for (const id of products) a[id] = share;
                    g.command({ type: 'setAssortment', personId: p.id, assortment: a });
                  }
                }}
              />
            </label>
            {manual &&
              products.map((id) => (
                <div key={id} class="row small-text">
                  <span>
                    <span class="swatch" style={{ background: `#${PRODUCTS[id].color.toString(16).padStart(6, '0')}` }} />
                    {PRODUCT_NAMES[id]}
                  </span>
                  <Stepper
                    value={manual[id] ?? 0}
                    max={100}
                    step={10}
                    onChange={(v) => g.command({ type: 'setAssortment', personId: p.id, assortment: { ...manual, [id]: v } })}
                  />
                </div>
              ))}
            {manual && <p class="muted small-text">Anteile in Prozent der Tragkraft. Wird beim nächsten Beladen übernommen.</p>}
          </div>
        )}
        <div class="btn-row">
          <button class="btn small primary" onClick={() => (assignFor.value = p.id)}>
            <IconPin size={16} /> Platz zuweisen
          </button>
          <button class="btn small" disabled={p.spot === null && inside} onClick={() => g.command({ type: 'assign', personId: p.id, spot: null })}>
            <IconHome size={16} /> Ins Lager
          </button>
          <button class="btn small" onClick={() => g.followPerson(p.id)}>
            <IconCrosshair size={16} /> Folgen
          </button>
          {!confirmFire ? (
            <button class="btn small danger" onClick={() => setConfirmFire(true)}>
              Entlassen
            </button>
          ) : (
            <button
              class="btn small danger"
              onClick={() => {
                g.command({ type: 'fire', personId: p.id });
                selection.value = null;
              }}
            >
              Wirklich entlassen? Lohn {money(p.wage)} wird fällig.
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function SpotCard({ index }: { index: number }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const spot = g.world.spots[index];
  const here = s.staff.filter((p) => p.spot === index);
  const others = s.staff.filter((p) => p.spot !== index);
  const full = here.length >= SPOT.maxOwnVendors;
  const hour = Math.min(21.99, hourOf(s));
  const perHour = (h: number) => demandCurve(spot.district, h) * spot.factor * weekdayFactor(spot.district, s.day);
  return (
    <>
      <header>
        <div>
          <h2>{spot.name}</h2>
          <span class="muted small-text">Verkaufsplatz · {DISTRICT_NAMES[spot.district]}</span>
        </div>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (selection.value = null)}>
          <IconClose size={18} />
        </button>
      </header>
      <div class="card-body">
        <div class="spec-grid small-text">
          <span>Platzfaktor</span>
          <b class="mono">{dec1(spot.factor)}</b>
          <span>Parkbucht</span>
          <b>{spot.parking ? 'ja (Verkaufswagen möglich)' : 'nein'}</b>
          <span>Lizenziert</span>
          <b>nein</b>
          <span>Interessenten jetzt</span>
          <b class="mono">{Math.round(perHour(hour))} pro Stunde</b>
        </div>
        <div class="small-text muted">Nachfragekurve heute (Kaufinteressenten pro Stunde)</div>
        <CurveChart fn={perHour} now={hour} height={52} />
        <div class="small-text">
          <b>Eigene Verkäufer hier:</b> {here.length ? here.map((p) => p.name).join(', ') : 'keine'}
        </div>
        {!full && others.length > 0 && (
          <>
            <div class="small-text muted">Verkäufer hierher schicken:</div>
            <div class="btn-row">
              {others.map((p) => (
                <button key={p.id} class="btn small" onClick={() => g.command({ type: 'assign', personId: p.id, spot: index })}>
                  {p.name}
                </button>
              ))}
            </div>
          </>
        )}
        {full && <p class="muted small-text">Hier stehen schon {SPOT.maxOwnVendors} eigene Verkäufer.</p>}
      </div>
    </>
  );
}

export function SelectionCard() {
  void uiTick.value;
  const g = currentGame();
  const sel = selection.value;
  if (!g || !sel || assignFor.value !== null) return null;
  if (sel.kind === 'person') {
    const p = g.state.staff.find((x) => x.id === sel.id);
    if (!p) return null;
    return (
      <section class="select-card panel" key={`p${p.id}`}>
        <PersonCard p={p} />
      </section>
    );
  }
  return (
    <section class="select-card panel" key={`s${sel.index}`}>
      <SpotCard index={sel.index} />
    </section>
  );
}

export function AssignBanner() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  const id = assignFor.value;
  if (!g || id === null) return null;
  const p = g.state.staff.find((x) => x.id === id);
  return (
    <div class="assign-banner panel">
      <span>
        Verkaufsplatz für <b>{p?.name}</b> antippen. Grün: frei, gelb: ein Verkäufer, rot: voll.
      </span>
      <button class="btn small" onClick={() => (assignFor.value = null)}>
        Abbrechen
      </button>
    </div>
  );
}
