import { describe, expect, it } from 'vitest';
import { DISTRICT_IDS } from '../src/data/balance';
import { findPath, pathLength } from '../src/sim/pathfinding';
import { createWorld, TILE } from '../src/sim/world';

const world = createWorld();

describe('Karte', () => {
  it('ist eine Großstadt mit 96 × 96 Feldern und sechs Vierteln', () => {
    expect(world.w).toBe(96);
    expect(world.h).toBe(96);
    expect(world.labels).toHaveLength(DISTRICT_IDS.length);
    expect(world.buildings.some((b) => b.style === 'tower' && b.height >= 20)).toBe(true);
  });

  it('jedes Viertel hat Verkaufsplätze auf Gehwegen oder Plätzen im richtigen Viertel', () => {
    for (const d of DISTRICT_IDS) expect(world.spots.filter((s) => s.district === d).length).toBeGreaterThanOrEqual(3);
    for (const s of world.spots) {
      expect([TILE.SIDEWALK, TILE.PLAZA]).toContain(world.tiles[s.tile]);
      expect(DISTRICT_IDS[world.district[s.tile]]).toBe(s.district);
    }
  });

  it('alle Verkaufsplätze sind vom Lagertor aus erreichbar, die eigenen Plätze liegen nah', () => {
    for (const s of world.spots) {
      const p = findPath(world, world.warehouse.door, s.tile, 'foot');
      expect(p, s.id).not.toBeNull();
      if (s.district === 'underground') expect(pathLength(world, p!)).toBeLessThan(30);
    }
  });

  it('die Nachbarschaften der Viertel sind symmetrisch und verbinden die ganze Stadt', () => {
    const n = DISTRICT_IDS.length;
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) expect(world.links[a][b]).toBe(world.links[b][a]);
    const seen = new Set([0]);
    const stack = [0];
    while (stack.length) {
      const a = stack.pop()!;
      for (let b = 0; b < n; b++) if (world.links[a][b] && !seen.has(b)) {
        seen.add(b);
        stack.push(b);
      }
    }
    expect(seen.size).toBe(n);
  });

  it('das Lager hat zwölf Regalplätze innerhalb der Halle', () => {
    const h = world.warehouse.hall;
    expect(world.warehouse.shelfSlots).toHaveLength(12);
    for (const [x, y] of world.warehouse.shelfSlots) {
      expect(x).toBeGreaterThanOrEqual(h.x);
      expect(x + 3).toBeLessThanOrEqual(h.x + h.w);
      expect(y).toBeGreaterThanOrEqual(h.y);
      expect(y + 1).toBeLessThanOrEqual(h.y + h.h);
    }
  });

  it('alle begehbaren Felder sind vom Lager aus erreichbar', () => {
    let unreachable = 0;
    for (let i = 0; i < world.w * world.h; i++) {
      if (!world.costs.foot[i]) continue;
      if (!findPath(world, world.warehouse.door, i, 'foot', false)) unreachable++;
    }
    expect(unreachable).toBe(0);
  });
});
