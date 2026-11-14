// Lage der Bauabschnitte und Raumplätze auf dem Lagergrundstück.
import { WAREHOUSE } from '../data/balance';
import type { World } from './world';

export const SECTION_W = 6;
export const SECTION_H = 4;
export const ROOM_W = 3;
export const ROOM_H = 2;

export function sectionOrigin(world: World, section: number): { x: number; y: number } {
  return {
    x: world.warehouse.x + (section % 2) * SECTION_W,
    y: world.warehouse.y + Math.floor(section / 2) * SECTION_H,
  };
}

export function slotRect(world: World, slot: number): { x: number; y: number; w: number; h: number } {
  const section = Math.floor(slot / WAREHOUSE.slotsPerSection);
  const k = slot % WAREHOUSE.slotsPerSection;
  const o = sectionOrigin(world, section);
  return { x: o.x + (k % 2) * ROOM_W, y: o.y + Math.floor(k / 2) * ROOM_H, w: ROOM_W, h: ROOM_H };
}

/** Ladepunkt im Lager direkt hinter dem Tor */
export function loadingPoint(world: World): { x: number; y: number } {
  return { x: world.warehouse.doorX + 0.5, y: world.warehouse.y + 0.6 };
}
