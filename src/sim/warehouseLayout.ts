// Lage von Regalplätzen, Ladezone und Hof auf dem Lagergrundstück.
import type { World } from './world';

/** Länge und Tiefe eines Regalplatzes in Feldern */
export const SHELF_W = 3;
export const SHELF_D = 1;

export function shelfRect(world: World, slot: number): { x: number; y: number; w: number; h: number } {
  const [x, y] = world.warehouse.shelfSlots[slot];
  return { x, y, w: SHELF_W, h: SHELF_D };
}

/** Ladepunkt im Lager direkt hinter dem Tor */
export function loadingPoint(world: World): { x: number; y: number } {
  const wh = world.warehouse;
  return { x: wh.doorX + wh.doorWidth / 2, y: wh.hall.y + wh.hall.h - 2.2 };
}

/** Warteplatz eines Verkäufers in der Ladezone (Index i) */
export function idleSpot(world: World, i: number): { x: number; y: number } {
  const lp = loadingPoint(world);
  const col = i % 6;
  const row = Math.floor(i / 6) % 3;
  return { x: lp.x + 1.6 + col * 0.55, y: lp.y + 0.2 + row * 0.55 };
}

/** Aufstellung der Kämpfer im Hof (Index i) */
export function yardSpot(world: World, i: number): { x: number; y: number } {
  const y = world.warehouse.yard;
  const perRow = 6;
  const col = i % perRow;
  const row = Math.floor(i / perRow);
  return { x: y.x + 0.75 + col * ((y.w - 1.5) / (perRow - 1)), y: y.y + 1.4 + row * 1.05 };
}
