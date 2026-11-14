// Viertel: Nachfrage jetzt, Umsatz heute, Marktanteil des Vortags und Verkaufsplätze.
import { DISTRICT_IDS, DISTRICTS } from '../../data/balance';
import { DISTRICT_NAMES } from '../../data/names';
import { currentGame } from '../../game';
import { competitorRevenue } from '../../sim/day';
import { demandCurve, hourOf, weekdayFactor } from '../../sim/time';
import { CurveChart } from '../components';
import { money, pct } from '../format';
import { selection, uiTick } from '../store';

export function DistrictsPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const hour = Math.min(21.99, hourOf(s));
  return (
    <div class="stack">
      {DISTRICT_IDS.map((d, i) => {
        const spots = g.world.spots.filter((sp) => sp.district === d);
        const own = s.districtDay[i].revenue;
        return (
          <div key={d} class="card">
            <div class="row">
              <b>{DISTRICT_NAMES[d]}</b>
              <span class="small-text muted">
                Anteil gestern {pct(s.shares[i] ?? 0)} · Konkurrenz {money(competitorRevenue(s.day, i))}/Tag
              </span>
            </div>
            <div class="row small-text">
              <span>Kaufinteressenten jetzt je Platz</span>
              <b class="mono">{Math.round(demandCurve(d, hour) * weekdayFactor(d, s.day))} pro Stunde</b>
            </div>
            <div class="row small-text">
              <span>Eigener Umsatz heute</span>
              <b class="mono">{money(own)}</b>
            </div>
            <CurveChart fn={(h) => demandCurve(d, h) * weekdayFactor(d, s.day)} now={hour} height={46} />
            <div class="spot-list">
              {spots.map((sp) => {
                const n = s.staff.filter((p) => p.spot === sp.index).length;
                return (
                  <button
                    key={sp.id}
                    class="chip-btn"
                    onClick={() => {
                      selection.value = { kind: 'spot', index: sp.index };
                      g.focus(sp.x + 0.5, sp.y + 0.5);
                    }}
                  >
                    {sp.name}
                    {n > 0 ? ` (${n})` : ''}
                  </button>
                );
              })}
            </div>
            <p class="muted small-text">
              Spitzenzeiten {DISTRICTS[d].peakHours.map(([a, b]) => `${a} bis ${b} Uhr`).join(', ')}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function GoalPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  return (
    <div class="stack">
      <p class="small-text">
        Ziel ist das Stadtmonopol: in allen fünf Vierteln sieben Tage in Folge mindestens 50 % Marktanteil, und die Gemüsegang hat alle Reviere
        aufgegeben.
      </p>
      <table class="table">
        <thead>
          <tr>
            <th>Viertel</th>
            <th class="num">Marktanteil gestern</th>
          </tr>
        </thead>
        <tbody>
          {DISTRICT_IDS.map((d, i) => (
            <tr key={d}>
              <td>{DISTRICT_NAMES[d]}</td>
              <td class={`num mono ${(s.shares[i] ?? 0) >= 0.5 ? 'pos' : ''}`}>{pct(s.shares[i] ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p class="muted small-text">Serien und Reviere der Gemüsegang folgen in einem späteren Ausbauschritt.</p>
    </div>
  );
}
