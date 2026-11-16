// Verkauf: Kaufinteressenten je Platz und Stunde, Poisson-verteilt pro Tick.
// Jedes Viertel hat je Sorte einen Tagesbedarf: Solange er offen ist, gibt es einen Aufpreis,
// danach verkauft sich die Sorte dort nur noch zu einem Viertel der Menge.
import { DEALERS, DISTRICT_PREFS, DISTRICTS, FRUITS, TICKS_PER_HOUR, type DistrictId, type FruitId } from '../data/balance';
import { poisson, rand } from './rng';
import { demandRatio, freshnessPriceFactor, openDemand, premiumFactor, qualityFactor, saturationFactor } from './stock';
import { customersPerHour, hourOf } from './time';
import type { Dealer, GameState, Load } from './types';
import type { World } from './world';

export interface SaleEvent {
  x: number;
  y: number;
  amount: number;
  spotTile: number;
}

/** Grunderlös für ein Stück Obst in einem Viertel (ohne Aufpreis, Qualität und Frische) */
export function unitRevenue(fruit: FruitId, district: DistrictId): number {
  return FRUITS[fruit].unitPrice * DISTRICTS[district].priceLevel;
}

/** Erlös für ein Stück aus einer bestimmten Ladung */
export function saleValue(s: GameState, world: World, districtIndex: number, item: Load): number {
  const d = world.spots.find((sp) => sp.districtIndex === districtIndex)!.district;
  const open = openDemand(s, world, districtIndex, item.fruit);
  return unitRevenue(item.fruit, d) * premiumFactor(open) * qualityFactor(item.quality) * freshnessPriceFactor(item.fresh);
}

const sellers: Dealer[] = [];
const weights: number[] = [];

/** Kunde wählt eine Sorte aus der Ware des Verkäufers, gewichtet nach den Vorlieben im Viertel */
function chooseItem(s: GameState, d: Dealer, district: DistrictId): Load | null {
  if (!d.load.length) return null;
  if (d.load.length === 1) return d.load[0];
  let sum = 0;
  weights.length = d.load.length;
  for (let i = 0; i < d.load.length; i++) {
    weights[i] = DISTRICT_PREFS[district][d.load[i].fruit];
    sum += weights[i];
  }
  let r = rand(s) * sum;
  for (let i = 0; i < d.load.length; i++) {
    r -= weights[i];
    if (r < 0) return d.load[i];
  }
  return d.load[d.load.length - 1];
}

export function stepSales(s: GameState, world: World, out: SaleEvent[] | null): void {
  const hour = hourOf(s);
  for (const spot of world.spots) {
    sellers.length = 0;
    for (const d of s.dealers) if (d.mode === 'selling' && d.spot === spot.index && d.load.length) sellers.push(d);
    if (!sellers.length) continue;
    const n = poisson(s, customersPerHour(spot.district, hour) / TICKS_PER_HOUR);
    for (let k = 0; k < n; k++) {
      // Die Kundschaft verteilt sich gleichmäßig auf alle Verkäufer am Platz
      const d = sellers[Math.floor(rand(s) * sellers.length)];
      const item = chooseItem(s, d, spot.district);
      if (!item) continue;
      const ratio = demandRatio(s, world, spot.districtIndex, item.fruit);
      if (rand(s) >= DEALERS.buyChance * saturationFactor(ratio)) continue;
      const open = Math.max(0, Math.min(1, 1 - ratio));
      const amount =
        unitRevenue(item.fruit, spot.district) * premiumFactor(open) * qualityFactor(item.quality) * freshnessPriceFactor(item.fresh);
      item.units--;
      if (item.units <= 0) d.load.splice(d.load.indexOf(item), 1);
      s.money += amount;
      s.earnedTotal += amount;
      s.earnedToday += amount;
      s.stats.sold++;
      s.soldToday[item.fruit]++;
      s.districtSold[spot.districtIndex][item.fruit]++;
      d.soldToday++;
      d.earnedToday += amount;
      d.earnedTotal += amount;
      out?.push({ x: d.x, y: d.y, amount, spotTile: spot.tile });
    }
  }
}
