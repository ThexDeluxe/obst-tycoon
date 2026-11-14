// Berichte: frühere Tagesberichte und Meldungen.
import { useState } from 'preact/hooks';
import { currentGame } from '../../game';
import { uiTick } from '../store';
import { WEEKDAYS_SHORT } from '../../sim/time';
import { signedMoney } from '../format';
import { ReportView } from './ReportView';

export function ReportsPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  const [idx, setIdx] = useState<number | null>(null);
  if (!g) return null;
  const s = g.state;
  if (!s.reports.length) {
    return (
      <div class="stack">
        <p class="muted small-text">Der erste Tagesbericht erscheint um 22:00 Uhr.</p>
        <Messages />
      </div>
    );
  }
  const i = idx === null ? s.reports.length - 1 : Math.min(idx, s.reports.length - 1);
  const r = s.reports[i];
  return (
    <div class="stack">
      <div class="report-tabs">
        {s.reports.slice(-14).map((rep) => {
          const k = s.reports.indexOf(rep);
          return (
            <button key={rep.day} class={`chip-btn ${k === i ? 'active' : ''}`} onClick={() => setIdx(k)} title={signedMoney(rep.net)}>
              {WEEKDAYS_SHORT[rep.day % 7]} {rep.day + 1}
            </button>
          );
        })}
      </div>
      <h3>
        Tag {r.day + 1}
      </h3>
      <ReportView report={r} state={s} />
      <Messages />
    </div>
  );
}

function Messages() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const msgs = g.state.messages.slice(-15).reverse();
  return (
    <>
      <h3>Meldungen</h3>
      <ul class="events">
        {msgs.map((m) => (
          <li key={m.id}>
            <span class="muted small-text">Tag {m.day + 1} · </span>
            {m.text}
          </li>
        ))}
      </ul>
    </>
  );
}
