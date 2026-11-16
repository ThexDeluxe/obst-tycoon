// Lieferungen: Jeden Morgen um 06:00 fährt der Lieferwagen vor und lädt Kiste für Kiste ab.
// Bezahlt wird beim Abladen. Was nicht ins Lager passt, bleibt beim Lieferanten und kommt mit der nächsten Lieferung.
import { DELIVERY, FRUIT_IDS, FRUITS, WHOLESALER, secondsToTicks, type FruitId } from '../data/balance';
import { FRUIT_NAMES } from '../data/names';
import { isFruitUnlocked } from './selectors';
import { assignCooling, storeCrate } from './stock';
import type { GameState, IncomingCrate, MessageKind } from './types';

type Push = (s: GameState, kind: MessageKind, text: string, x?: number, y?: number) => void;

export interface DeliveryEvents {
  /** Lieferwagen ist angekommen */
  arrived: boolean;
  /** So viele Kisten wurden in diesem Tick abgeladen */
  unloaded: number;
}

/** Kisten, die mit der nächsten Morgenlieferung kommen (Daueraufträge beim Großhändler) */
export function plannedDeliveries(s: GameState): IncomingCrate[] {
  const res: IncomingCrate[] = [];
  for (const f of FRUIT_IDS) {
    const n = isFruitUnlocked(s, f) ? Math.min(WHOLESALER.maxCratesPerFruit, s.orders[f]) : 0;
    for (let i = 0; i < n; i++) res.push({ fruit: f, quality: WHOLESALER.quality, price: FRUITS[f].crateCost, source: -1 });
  }
  return res;
}

/** Kisten einer Sorte, die am Morgen in so vielen Tagen ankommen (1 = morgen) */
export function incomingCrates(s: GameState, fruit: FruitId, dayOffset: number): number {
  let n = 0;
  for (const c of plannedDeliveries(s)) if (c.fruit === fruit) n++;
  if (dayOffset === 1) for (const c of s.backlog) if (c.fruit === fruit) n++;
  return n;
}

/** Startet die Morgenlieferung: zuerst der Rückstand, dann die Daueraufträge */
export function startDelivery(s: GameState, items: IncomingCrate[]): void {
  const queue = [...s.backlog, ...items];
  s.backlog = [];
  if (!queue.length) return;
  s.delivery = { phase: 'arrive', t: 0, queue, total: queue.length, unloaded: 0, daily: Math.max(1, items.length) };
}

export function stepDelivery(s: GameState, ev: DeliveryEvents, push: Push, onBacklog?: (c: IncomingCrate) => void): void {
  const d = s.delivery;
  if (!d) return;
  d.t++;
  if (d.phase === 'arrive') {
    if (d.t >= secondsToTicks(DELIVERY.arriveSeconds)) {
      d.phase = 'unload';
      d.t = 0;
      ev.arrived = true;
    }
    return;
  }
  if (d.phase === 'unload') {
    if (d.t % Math.max(1, secondsToTicks(DELIVERY.unloadSecondsPerCrate)) !== 0) return;
    const c = d.queue[0];
    if (!c) {
      d.phase = 'leave';
      d.t = 0;
      assignCooling(s);
      return;
    }
    if (s.money < c.price) {
      // Ohne Geld nimmt der Fahrer die Ware wieder mit
      const n = d.queue.length;
      d.queue = [];
      push(s, 'warning', `Kein Geld für die Lieferung: ${n} Kisten gehen zurück.`);
      return;
    }
    if (!storeCrate(s, c.fruit, c.quality)) {
      // Lager voll: der Rest bleibt beim Lieferanten, höchstens eine Tageslieferung (den Rest verkauft er anderweitig)
      const kept = d.queue.splice(0, d.queue.length).slice(-d.daily);
      for (const r of kept) {
        s.backlog.push(r);
        onBacklog?.(r);
      }
      const byFruit = FRUIT_IDS.map((f) => [f, kept.filter((r) => r.fruit === f).length] as const).filter(([, n]) => n > 0);
      push(s, 'warning', `Lager voll: ${byFruit.map(([f, n]) => `${n} ${FRUIT_NAMES[f]}`).join(', ')} kommen mit der nächsten Lieferung.`);
      return;
    }
    d.queue.shift();
    s.money -= c.price;
    s.spentToday += c.price;
    d.unloaded++;
    ev.unloaded++;
    return;
  }
  if (d.t >= secondsToTicks(DELIVERY.leaveSeconds)) s.delivery = null;
}
