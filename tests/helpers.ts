// Hilfen für Tests: Verträge direkt setzen, ohne Zufall bei der Annahme.
import { FARMS, type FruitId } from '../src/data/balance';
import type { GameState } from '../src/sim/types';

/** Setzt einen Vertrag mit dem ersten freien Hof, der die Sorte anbaut (Lieferung ab dem nächsten Morgen) */
export function giveContract(s: GameState, fruit: FruitId, crates: number, days = 14): number {
  const i = FARMS.findIndex((f, k) => f.fruits.includes(fruit) && s.farms[k].owner === 'free');
  if (i < 0) throw new Error(`Kein freier Hof für ${fruit}`);
  const f = s.farms[i];
  const prev = f.contract && f.contract.endDay >= s.day ? f.contract.crates : {};
  f.contract = {
    crates: { ...prev, [fruit]: crates },
    pricePct: 100,
    days,
    startDay: s.day + 1,
    endDay: s.day + days,
    exclusive: false,
    priceLock: false,
    lockedPrices: null,
  };
  s.stats.contracts++;
  return i;
}
