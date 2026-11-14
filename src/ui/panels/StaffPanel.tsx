// Personal: eigene Leute und Bewerber des Tages.
import { STAFF } from '../../data/balance';
import { EQUIPMENT_NAMES } from '../../data/names';
import { currentGame } from '../../game';
import { canSpend, staffLimit } from '../../sim/selectors';
import { Pips } from '../components';
import { money } from '../format';
import { selection, uiTick } from '../store';
import { statusText } from '../status';

export function StaffPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const limit = staffLimit(s);
  const full = s.staff.length >= limit;
  return (
    <div class="stack">
      <div class="row">
        <span>
          Personal <b>{s.staff.length}</b> von {limit}
        </span>
        <span class="muted small-text">Löhne heute {money(s.staff.reduce((n, p) => n + p.wage, 0) + s.pendingWages)}</span>
      </div>
      {s.staff.map((p) => (
        <button
          key={p.id}
          class={`list-item ${selection.value?.kind === 'person' && selection.value.id === p.id ? 'selected' : ''}`}
          onClick={() => {
            selection.value = { kind: 'person', id: p.id };
            g.focus(p.x, p.y);
          }}
        >
          <div class="li-main">
            <b>{p.name}</b>
            <span class="muted small-text">
              {EQUIPMENT_NAMES[p.equipment]} · {statusText(g.world, p)}
            </span>
          </div>
          <div class="li-side small-text">
            <div>
              Talent <Pips value={p.talent} />
            </div>
            <div>
              Wachsamkeit <Pips value={p.vigilance} />
            </div>
          </div>
        </button>
      ))}

      <h3>Bewerber heute</h3>
      {s.applicants.length === 0 && <p class="muted small-text">Heute gibt es keine weiteren Bewerber.</p>}
      {s.applicants.map((a) => (
        <div key={a.id} class="list-item static">
          <div class="li-main">
            <b>{a.name}</b>
            <span class="muted small-text">Lohn {money(a.wage)} pro Tag</span>
          </div>
          <div class="li-side small-text">
            <div>
              Talent <Pips value={a.talent} />
            </div>
            <div>
              Wachsamkeit <Pips value={a.vigilance} />
            </div>
          </div>
          <button
            class="btn small primary"
            disabled={full || !canSpend(s, STAFF.hireCost)}
            title={full ? 'Personalgrenze erreicht. Büro ausbauen.' : undefined}
            onClick={() => g.command({ type: 'hire', applicantId: a.id })}
          >
            Anwerben {money(STAFF.hireCost)}
          </button>
        </div>
      ))}
      {full && <p class="muted small-text">Die Personalgrenze ist erreicht. Ein größeres Büro gibt es unter Lager und Bau.</p>}
    </div>
  );
}
