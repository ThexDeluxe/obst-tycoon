// Großmarkt, Lager, Frische und Kühlung.
import {
  CRATE_UNITS,
  DISTRICTS,
  FRESHNESS,
  MARKET,
  PRODUCT_IDS,
  PRODUCTS,
  SALES,
  TICKS_PER_DAY,
  type ProductId,
} from '../data/balance';
import { PRODUCT_NAMES } from '../data/names';
import { rand } from './rng';
import {
  capacityOf,
  cargoUnits,
  coldCapacity,
  hasRoom,
  shelfCapacity,
  totalCapacity,
  unlockedProducts,
} from './selectors';
import { tickAtHour } from './time';
import type { CargoItem, GameState, OrderLine, Person } from './types';
import type { World } from './world';

// ---------------------------------------------------------------------------
// Frische
// ---------------------------------------------------------------------------

/** Frischeverlust pro Tick */
export function decayPerTick(p: ProductId, cooled: boolean): number {
  const def = PRODUCTS[p];
  const days = cooled && def.cooledDays !== null ? def.cooledDays : def.shelfDays;
  return 1 / (days * TICKS_PER_DAY);
}

export function stepFreshness(s: GameState, ticks = 1): void {
  for (const c of s.crates) {
    if (c.fresh > 0) c.fresh = Math.max(0, c.fresh - decayPerTick(c.product, c.cooled) * ticks);
  }
  for (const p of s.staff) {
    for (const c of p.cargo) if (c.fresh > 0) c.fresh = Math.max(0, c.fresh - decayPerTick(c.product, false) * ticks);
  }
}

/** Preisabschlag bei geringer Frische */
export function freshnessPriceFactor(fresh: number): number {
  return fresh < FRESHNESS.lowThreshold ? FRESHNESS.lowPriceFactor : 1;
}

/**
 * Belegt die Kühlplätze mit den kühlbaren Kisten, die am schnellsten verderben
 * (kürzeste Haltbarkeit zuerst, innerhalb eines Produkts die ältesten).
 */
export function assignCooling(s: GameState): void {
  const cap = coldCapacity(s);
  const coolable = s.crates.filter((c) => PRODUCTS[c.product].cooledDays !== null && c.fresh > 0);
  coolable.sort((a, b) => PRODUCTS[a.product].shelfDays - PRODUCTS[b.product].shelfDays || a.fresh - b.fresh || a.id - b.id);
  const chosen = new Set<number>();
  // Bananen und andere nicht kühlbare Ware braucht Regalplatz; kühlbare Ware darf ins Regal ausweichen
  for (let i = 0; i < coolable.length && chosen.size < cap; i++) chosen.add(coolable[i].id);
  for (const c of s.crates) c.cooled = chosen.has(c.id);
}

// ---------------------------------------------------------------------------
// Lager
// ---------------------------------------------------------------------------

/** Prüft, ob eine weitere Kiste dieses Produkts ins Lager passt. */
export function canStore(s: GameState, p: ProductId): boolean {
  if (s.crates.length >= totalCapacity(s)) return false;
  if (PRODUCTS[p].cooledDays === null) {
    let nonCool = 0;
    for (const c of s.crates) if (PRODUCTS[c.product].cooledDays === null) nonCool++;
    return nonCool < shelfCapacity(s);
  }
  return true;
}

export function addCrate(s: GameState, p: ProductId, units: number, fresh: number): boolean {
  if (!canStore(s, p)) return false;
  s.crates.push({ id: s.nextId++, product: p, units, fresh, cooled: false });
  return true;
}

/** Nimmt Einheiten eines Produkts aus dem Lager, älteste Kisten zuerst. */
export function takeUnits(s: GameState, p: ProductId, want: number, into: CargoItem[]): number {
  if (want <= 0) return 0;
  const list = s.crates.filter((c) => c.product === p && c.units > 0 && c.fresh > 0);
  list.sort((a, b) => a.fresh - b.fresh || a.id - b.id);
  let taken = 0;
  for (const c of list) {
    if (taken >= want) break;
    const n = Math.min(c.units, want - taken);
    c.units -= n;
    taken += n;
    const same = into.find((x) => x.product === p && Math.abs(x.fresh - c.fresh) < 0.005);
    if (same) same.units += n;
    else into.push({ product: p, units: n, fresh: c.fresh });
  }
  if (taken > 0) s.crates = s.crates.filter((c) => c.units > 0);
  return taken;
}

/** Bringt Ware zurück ins Lager. Was keinen Platz findet, wird mit vorhandenen Kisten zusammengelegt oder geht verloren. */
export function storeCargo(s: GameState, cargo: CargoItem[]): number {
  let lost = 0;
  for (const item of cargo) {
    let units = item.units;
    if (units <= 0) continue;
    // Zuerst angebrochene Kisten desselben Produkts auffüllen
    for (const c of s.crates) {
      if (units <= 0) break;
      if (c.product !== item.product || c.units >= CRATE_UNITS) continue;
      const n = Math.min(CRATE_UNITS - c.units, units);
      c.fresh = (c.fresh * c.units + item.fresh * n) / (c.units + n);
      c.units += n;
      units -= n;
    }
    while (units > 0) {
      const n = Math.min(CRATE_UNITS, units);
      if (!addCrate(s, item.product, n, item.fresh)) {
        lost += units;
        break;
      }
      units -= n;
    }
  }
  cargo.length = 0;
  assignCooling(s);
  return lost;
}

/** Entfernt verdorbene Ware und liefert Menge und Einkaufswert. */
export function removeSpoiled(s: GameState): { units: number; value: number } {
  let units = 0;
  let value = 0;
  s.crates = s.crates.filter((c) => {
    if (c.fresh > 0) return true;
    units += c.units;
    value += c.units * PRODUCTS[c.product].buy;
    return false;
  });
  return { units, value };
}

// ---------------------------------------------------------------------------
// Beladen der Verkäufer
// ---------------------------------------------------------------------------

/** Gewichte für das Sortiment eines Verkäufers */
export function assortmentWeights(s: GameState, world: World, p: Person): Map<ProductId, number> {
  const res = new Map<ProductId, number>();
  const products = unlockedProducts(s);
  if (p.assortment === 'auto') {
    const spot = p.spot !== null ? world.spots[p.spot] : null;
    for (const id of products) res.set(id, spot ? DISTRICTS[spot.district].prefs[id] : 1);
  } else {
    for (const id of products) {
      const v = p.assortment[id] ?? 0;
      if (v > 0) res.set(id, v);
    }
    if (res.size === 0) for (const id of products) res.set(id, 1);
  }
  return res;
}

/** Füllt die Ware eines Verkäufers bis zur Tragkraft auf. Liefert die geladene Menge. */
export function loadCargo(s: GameState, world: World, p: Person): number {
  const cap = capacityOf(p);
  let space = cap - cargoUnits(p);
  if (space <= 0) return 0;
  const weights = assortmentWeights(s, world, p);
  let sum = 0;
  for (const w of weights.values()) sum += w;
  if (sum <= 0) return 0;
  let loaded = 0;
  // Erster Durchgang: nach Gewicht
  const order = [...weights.entries()].sort((a, b) => b[1] - a[1]);
  for (const [id, w] of order) {
    const have = p.cargo.reduce((n, c) => (c.product === id ? n + c.units : n), 0);
    const target = Math.round((cap * w) / sum) - have;
    const n = takeUnits(s, id, Math.min(space, target), p.cargo);
    loaded += n;
    space -= n;
  }
  // Zweiter Durchgang: Restplatz mit vorhandener Ware füllen
  for (const [id] of order) {
    if (space <= 0) break;
    const n = takeUnits(s, id, space, p.cargo);
    loaded += n;
    space -= n;
  }
  p.cargo.sort((a, b) => a.fresh - b.fresh);
  if (loaded > 0) assignCooling(s);
  return loaded;
}

export function needsRestock(p: Person): boolean {
  return cargoUnits(p) < capacityOf(p) * SALES.restockThreshold;
}

// ---------------------------------------------------------------------------
// Großmarkt
// ---------------------------------------------------------------------------

export function buyPrice(s: GameState, p: ProductId): number {
  return PRODUCTS[p].buy * s.marketFactors[p];
}

export function orderDiscount(totalCrates: number): number {
  return totalCrates >= MARKET.bulkCrates ? MARKET.bulkDiscount : 0;
}

export function orderCost(s: GameState, lines: { product: ProductId; crates: number }[]): number {
  let crates = 0;
  let cost = 0;
  for (const l of lines) {
    crates += l.crates;
    cost += l.crates * CRATE_UNITS * buyPrice(s, l.product);
  }
  return cost * (1 - orderDiscount(crates));
}

/** Liefertermin für eine jetzt aufgegebene Bestellung */
export function deliverySlot(s: GameState): { day: number; tick: number; label: string } {
  const rampTick = tickAtHour(MARKET.rampOrderDeadlineHour);
  if (s.phase === 'day' && hasRoom(s, 'ramp') && s.dayTick < rampTick) {
    return { day: s.day, tick: tickAtHour(MARKET.rampDeliveryHour), label: `heute ${MARKET.rampDeliveryHour}:00 Uhr` };
  }
  return { day: s.day + 1, tick: 0, label: `morgen ${String(MARKET.deliveryHour).padStart(2, '0')}:00 Uhr` };
}

export function buildOrderLines(s: GameState, lines: { product: ProductId; crates: number }[]): OrderLine[] {
  let crates = 0;
  for (const l of lines) crates += l.crates;
  const d = orderDiscount(crates);
  return lines.filter((l) => l.crates > 0).map((l) => ({ product: l.product, crates: l.crates, unitPrice: buyPrice(s, l.product) * (1 - d) }));
}

/** Liefert fällige Bestellungen aus. Was nicht ins Lager passt, wird erstattet. */
export function deliverOrders(s: GameState, notes: string[]): { crates: number; refund: number } {
  let delivered = 0;
  let refund = 0;
  const due = s.orders.filter((o) => o.deliverDay < s.day || (o.deliverDay === s.day && o.deliverTick <= s.dayTick));
  if (!due.length) return { crates: 0, refund: 0 };
  s.orders = s.orders.filter((o) => !due.includes(o));
  for (const o of due) {
    for (const l of o.lines) {
      let back = 0;
      for (let i = 0; i < l.crates; i++) {
        if (addCrate(s, l.product, CRATE_UNITS, 1)) delivered++;
        else back++;
      }
      if (back > 0) {
        const amount = back * CRATE_UNITS * l.unitPrice;
        refund += amount;
        notes.push(`${back} Kisten ${PRODUCT_NAMES[l.product]} passten nicht ins Lager und wurden erstattet (${amount.toFixed(2).replace('.', ',')} €).`);
      }
    }
  }
  if (refund > 0) {
    s.money += refund;
    s.ledger.refunds += refund;
  }
  assignCooling(s);
  return { crates: delivered, refund };
}

/** Tagespreise des Großmarkts für den nächsten Tag */
export function driftMarket(s: GameState): void {
  for (const p of PRODUCT_IDS) {
    const f = s.marketFactors[p] * (1 + (rand(s) * 2 - 1) * MARKET.priceDrift);
    s.marketFactors[p] = Math.min(MARKET.priceFactorMax, Math.max(MARKET.priceFactorMin, f));
  }
}
