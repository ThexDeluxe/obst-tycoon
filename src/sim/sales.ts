// Verkaufsmodell: Kaufinteressenten je Platz und Stunde, Poisson-verteilt pro Tick.
import { DISTRICTS, PRICING, PRODUCTS, SALES, TICKS_PER_HOUR, type DistrictId, type ProductId } from '../data/balance';
import { freshnessPriceFactor } from './economy';
import { poisson, rand } from './rng';
import { talentFactor } from './staff';
import { demandCurve, hourOf, weekdayFactor } from './time';
import { unlockedProducts } from './selectors';
import type { GameState, Person } from './types';
import type { World } from './world';

export interface SaleEvent {
  x: number;
  y: number;
  amount: number;
  spotTile: number;
}

/** Wirkung des Preisfaktors auf die Kaufwahrscheinlichkeit */
export function priceEffect(factor: number): number {
  return Math.pow(1 / factor, PRICING.elasticity);
}

/** Kaufinteressenten pro Stunde an einem Platz */
export function interestedPerHour(s: GameState, district: DistrictId, spotFactor: number, hour: number): number {
  return demandCurve(district, hour) * spotFactor * weekdayFactor(district, s.day);
}

/** Verkaufspreis einer Einheit */
export function unitPrice(s: GameState, p: ProductId, district: DistrictId, fresh: number): number {
  const premium = district === 'oldtown' ? PRICING.oldtownPremium : 1;
  return PRODUCTS[p].sell * s.priceFactors[p] * premium * freshnessPriceFactor(fresh);
}

const weights: number[] = [];

function chooseProduct(s: GameState, district: DistrictId, products: ProductId[]): ProductId {
  weights.length = products.length;
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const w = DISTRICTS[district].prefs[p] * priceEffect(s.priceFactors[p]);
    weights[i] = w;
    sum += w;
  }
  let r = rand(s) * sum;
  for (let i = 0; i < products.length; i++) {
    r -= weights[i];
    if (r < 0) return products[i];
  }
  return products[products.length - 1];
}

function hasProduct(v: Person, p: ProductId): boolean {
  for (const c of v.cargo) if (c.product === p && c.units > 0) return true;
  return false;
}

/**
 * Ein Kunde am Stand eines Verkäufers. Er wählt ein Produkt nach den Vorlieben im Viertel
 * und dem Preis. Fehlt es, wählt er einmal ein anderes, sonst geht er.
 * Liefert den Umsatz oder 0.
 */
export function serveCustomer(s: GameState, v: Person, district: DistrictId, products: ProductId[]): number {
  let p = chooseProduct(s, district, products);
  if (!hasProduct(v, p)) {
    p = chooseProduct(s, district, products);
    if (!hasProduct(v, p)) return 0;
  }
  const chance = Math.min(1, SALES.baseBuyChance * talentFactor(v) * priceEffect(s.priceFactors[p]));
  if (rand(s) >= chance) return 0;
  // Älteste Ware zuerst
  let item = null;
  for (const c of v.cargo) if (c.product === p && c.units > 0 && (!item || c.fresh < item.fresh)) item = c;
  if (!item) return 0;
  const price = unitPrice(s, p, district, item.fresh);
  item.units--;
  if (item.units <= 0) v.cargo.splice(v.cargo.indexOf(item), 1);
  return price;
}

const sellers: Person[] = [];

export function stepSales(s: GameState, world: World, out: SaleEvent[] | null): void {
  const hour = hourOf(s);
  const products = unlockedProducts(s);
  if (!products.length) return;
  for (const spot of world.spots) {
    sellers.length = 0;
    for (const p of s.staff) if (p.mode === 'selling' && p.activeSpot === spot.index) sellers.push(p);
    if (!sellers.length) continue;
    const lambda = interestedPerHour(s, spot.district, spot.factor, hour) / TICKS_PER_HOUR;
    const n = poisson(s, lambda);
    for (let k = 0; k < n; k++) {
      // Die Kundschaft verteilt sich gleichmäßig auf alle Verkäufer am Platz
      const v = sellers[Math.floor(rand(s) * sellers.length)];
      const amount = serveCustomer(s, v, spot.district, products);
      if (amount <= 0) continue;
      s.money += amount;
      s.ledger.sales += amount;
      s.totalRevenue += amount;
      s.districtDay[spot.districtIndex].revenue += amount;
      s.districtDay[spot.districtIndex].units++;
      v.revenueToday += amount;
      v.unitsToday++;
      v.revenueTotal += amount;
      out?.push({ x: v.x, y: v.y, amount, spotTile: spot.tile });
    }
  }
}
