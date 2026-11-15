// Verkauf: Kaufinteressenten je Platz und Stunde, Poisson-verteilt pro Tick.
import { DEALERS, DISTRICTS, FRUITS, TICKS_PER_HOUR, type DistrictId, type FruitId } from '../data/balance';
import { poisson, rand } from './rng';
import { customersPerHour, hourOf } from './time';
import type { Dealer, GameState } from './types';
import type { World } from './world';

export interface SaleEvent {
  x: number;
  y: number;
  amount: number;
  spotTile: number;
}

/** Erlös für ein Stück Obst in einem Viertel */
export function unitRevenue(fruit: FruitId, district: DistrictId): number {
  return FRUITS[fruit].unitPrice * DISTRICTS[district].priceLevel;
}

const sellers: Dealer[] = [];

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
      if (rand(s) >= DEALERS.buyChance) continue;
      const item = d.load[0];
      if (!item) continue;
      const amount = unitRevenue(item.fruit, spot.district);
      item.units--;
      if (item.units <= 0) d.load.shift();
      s.money += amount;
      s.earnedTotal += amount;
      s.earnedToday += amount;
      s.stats.sold++;
      d.soldToday++;
      d.earnedToday += amount;
      d.earnedTotal += amount;
      out?.push({ x: d.x, y: d.y, amount, spotTile: spot.tile });
    }
  }
}
