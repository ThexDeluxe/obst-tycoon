// Großmarkt: Tagespreise, Bestellung mit Mengenrabatt, offene Lieferungen.
import { useState } from 'preact/hooks';
import { CRATE_UNITS, MARKET, PRODUCT_IDS, PRODUCTS, type ProductId } from '../../data/balance';
import { PRODUCT_NAMES } from '../../data/names';
import { currentGame } from '../../game';
import { uiTick } from '../store';
import { buyPrice, deliverySlot, orderCost, orderDiscount } from '../../sim/economy';
import { canSpend, freeSpace, isProductUnlocked } from '../../sim/selectors';
import { clockText } from '../../sim/time';
import { Stepper } from '../components';
import { money, moneyExact } from '../format';

export function MarketPanel() {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame();
  const [basket, setBasket] = useState<Partial<Record<ProductId, number>>>({});
  if (!g) return null;
  const s = g.state;
  const lines = PRODUCT_IDS.filter((p) => (basket[p] ?? 0) > 0).map((p) => ({ product: p, crates: basket[p]! }));
  const total = lines.reduce((n, l) => n + l.crates, 0);
  const cost = orderCost(s, lines);
  const free = freeSpace(s);
  const slot = deliverySlot(s);
  const discount = orderDiscount(total);
  const affordable = canSpend(s, cost);
  const stock = (p: ProductId) => s.crates.filter((c) => c.product === p).length;

  return (
    <div class="stack">
      <p class="muted small-text">
        Eine Kiste fasst {CRATE_UNITS} Einheiten. Ab {MARKET.bulkCrates} Kisten pro Bestellung gibt es {Math.round(MARKET.bulkDiscount * 100)}{'\u00a0'}% Rabatt. Lieferung {slot.label}.
      </p>
      <table class="table">
        <thead>
          <tr>
            <th>Produkt</th>
            <th class="num">Kiste</th>
            <th class="num">Lager</th>
            <th class="num">Bestellen</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCT_IDS.map((p) => {
            const unlocked = isProductUnlocked(s, p);
            const f = s.marketFactors[p];
            const diff = Math.round((f - 1) * 100);
            return (
              <tr key={p} class={unlocked ? '' : 'locked'}>
                <td>
                  <span class="swatch" style={{ background: `#${PRODUCTS[p].color.toString(16).padStart(6, '0')}` }} />
                  {PRODUCT_NAMES[p]}
                  {!unlocked && (
                    <div class="muted small-text">
                      ab Stufe {PRODUCTS[p].level}
                      {PRODUCTS[p].licenseCost > 0 ? ' und Importlizenz' : ''}
                    </div>
                  )}
                </td>
                <td class="num mono" title={`${moneyExact(buyPrice(s, p))} je Einheit, Verkauf ${moneyExact(PRODUCTS[p].sell)}`}>
                  {moneyExact(buyPrice(s, p) * CRATE_UNITS)}
                  <div class={`small-text ${diff > 0 ? 'neg' : diff < 0 ? 'pos' : 'muted'}`}>
                    {diff > 0 ? '+' : ''}
                    {diff} %
                  </div>
                </td>
                <td class="num mono">{stock(p)}</td>
                <td class="num">
                  {unlocked ? (
                    <Stepper value={basket[p] ?? 0} max={MARKET.maxCratesPerOrder} onChange={(v) => setBasket({ ...basket, [p]: v })} />
                  ) : (
                    <span class="muted">gesperrt</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div class="summary">
        <div class="row">
          <span>Kisten</span>
          <b class="mono">{total}</b>
        </div>
        <div class="row">
          <span>Freier Lagerplatz</span>
          <b class={`mono ${total > free ? 'neg' : ''}`}>{free} Kisten</b>
        </div>
        {discount > 0 && (
          <div class="row">
            <span>Mengenrabatt</span>
            <b class="mono pos">{Math.round(discount * 100)} %</b>
          </div>
        )}
        <div class="row">
          <span>Summe</span>
          <b class="mono">{money(cost)}</b>
        </div>
        {total > free && <p class="small-text neg">Was bei der Lieferung nicht ins Lager passt, wird erstattet.</p>}
        <button
          class="btn primary"
          disabled={total === 0 || !affordable}
          onClick={() => {
            g.command({ type: 'order', lines });
            setBasket({});
          }}
        >
          Bestellen
        </button>
        {!affordable && total > 0 && <p class="small-text neg">Der Dispositionsrahmen reicht dafür nicht.</p>}
      </div>

      <h3>Offene Lieferungen</h3>
      {s.orders.length === 0 && <p class="muted small-text">Keine offenen Bestellungen.</p>}
      {s.orders.map((o) => (
        <div key={o.id} class="list-item static">
          <div class="li-main">
            <b>{o.deliverDay === s.day ? `Heute ${clockText({ day: o.deliverDay, dayTick: o.deliverTick })}` : `Tag ${o.deliverDay + 1}, 06:00`}</b>
            <span class="muted small-text">{o.lines.map((l) => `${l.crates} × ${PRODUCT_NAMES[l.product]}`).join(', ')}</span>
          </div>
          <button class="btn small" onClick={() => g.command({ type: 'cancelOrder', id: o.id })}>
            Stornieren
          </button>
        </div>
      ))}
    </div>
  );
}
