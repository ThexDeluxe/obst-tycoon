// Tagesbericht: Einnahmen und Ausgaben, verdorbene Ware, Viertel, Verkäufer, Ereignisse, Verlauf.
import { DISTRICT_IDS } from '../../data/balance';
import { DISTRICT_NAMES } from '../../data/names';
import { WEEKDAYS_SHORT } from '../../sim/time';
import type { DayReport, GameState } from '../../sim/types';
import { BarChart } from '../components';
import { money, pct, signedMoney } from '../format';
import { uiTick } from '../store';

export function ReportView({ report, state }: { report: DayReport; state: GameState }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const l = report.ledger;
  const income: [string, number][] = [
    ['Verkauf', l.sales],
    ['Erstattungen', l.refunds],
  ];
  const expenses: [string, number][] = [
    ['Einkauf', l.purchases],
    ['Löhne', l.wages],
    ['Laufende Kosten', l.running],
    ['Bußgelder', l.fines],
    ['Investitionen', l.investments],
  ];
  const hist = state.reports.slice(-14);
  return (
    <div class="report">
      <div class="report-head">
        <div>
          <span class="tb-label">Saldo des Tages</span>
          <div class={`big mono ${report.net >= 0 ? 'pos' : 'neg'}`}>{signedMoney(report.net)}</div>
        </div>
        <div>
          <span class="tb-label">Kontostand</span>
          <div class={`big mono ${report.moneyEnd < 0 ? 'neg' : ''}`}>{money(report.moneyEnd)}</div>
        </div>
      </div>
      <div class="report-cols">
        <table class="table">
          <thead>
            <tr>
              <th>Einnahmen</th>
              <th class="num" />
            </tr>
          </thead>
          <tbody>
            {income.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td class="num mono">{money(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class="table">
          <thead>
            <tr>
              <th>Ausgaben</th>
              <th class="num" />
            </tr>
          </thead>
          <tbody>
            {expenses.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td class="num mono">{money(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class="small-text">
        Wert der verdorbenen Ware: <b class={report.spoiledValue > 0 ? 'neg' : ''}>{money(report.spoiledValue)}</b>
        {report.spoiledUnits > 0 ? ` (${report.spoiledUnits} Einheiten)` : ''}
      </p>

      <h3>Viertel</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Viertel</th>
            <th class="num">Umsatz</th>
            <th class="num">Marktanteil</th>
            <th class="num">Aufmerksamkeit</th>
          </tr>
        </thead>
        <tbody>
          {DISTRICT_IDS.map((d, i) => (
            <tr key={d}>
              <td>{DISTRICT_NAMES[d]}</td>
              <td class="num mono">{money(report.districts[i].revenue)}</td>
              <td class="num mono">{pct(report.districts[i].share)}</td>
              <td class="num mono">{Math.round(report.districts[i].attention)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Verkäufe pro Verkäufer</h3>
      <table class="table">
        <tbody>
          {report.vendors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td class="num mono">{v.units} Einh.</td>
              <td class="num mono">{money(v.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Ereignisse</h3>
      {report.events.length === 0 ? (
        <p class="muted small-text">Keine besonderen Ereignisse.</p>
      ) : (
        <ul class="events">
          {report.events.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      <h3>Umsatz der letzten {hist.length} Tage</h3>
      <BarChart values={hist.map((r) => r.ledger.sales)} labels={hist.map((r) => `${WEEKDAYS_SHORT[r.day % 7]}`)} />
    </div>
  );
}
