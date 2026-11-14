import { describe, expect, it } from 'vitest';
import { DISTRICT_IDS, DISTRICT_PATH_RANGES } from '../src/data/balance';
import { findPath, pathLength } from '../src/sim/pathfinding';
import { createWorld, TILE } from '../src/sim/world';

const world = createWorld();

describe('Karte', () => {
  it('hat 64 × 64 Felder', () => {
    expect(world.w).toBe(64);
    expect(world.h).toBe(64);
  });

  it('hat die vorgesehene Zahl an Verkaufsplätzen je Viertel', () => {
    const count = (d: string) => world.spots.filter((s) => s.district === d).length;
    expect(count('residential')).toBe(3);
    expect(count('station')).toBe(4);
    expect(count('oldtown')).toBe(6);
    expect(count('campus')).toBe(3);
    expect(count('industrial')).toBe(2);
  });

  it('Verkaufsplätze liegen auf Gehwegen oder Plätzen und im richtigen Viertel', () => {
    for (const s of world.spots) {
      const t = world.tiles[s.tile];
      expect([TILE.SIDEWALK, TILE.PLAZA]).toContain(t);
      expect(DISTRICT_IDS[world.district[s.tile]]).toBe(s.district);
      expect(s.factor).toBeGreaterThanOrEqual(0.8);
      expect(s.factor).toBeLessThanOrEqual(1.2);
    }
  });

  it('Weglängen vom Lager liegen in den Bereichen der Viertel', () => {
    for (const s of world.spots) {
      const path = findPath(world, world.warehouse.door, s.tile, 'foot');
      expect(path, s.id).not.toBeNull();
      const len = pathLength(world, path!);
      const [min, max] = DISTRICT_PATH_RANGES[s.district];
      expect(len, `${s.id}: ${len.toFixed(1)}`).toBeGreaterThanOrEqual(min);
      expect(len, `${s.id}: ${len.toFixed(1)}`).toBeLessThanOrEqual(max);
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

describe('Wegfindung', () => {
  it('findet keinen Fußweg über Gebäude', () => {
    const b = world.buildings.find((x) => x.style === 'brick')!;
    expect(findPath(world, world.warehouse.door, b.tiles[0], 'foot')).toBeNull();
  });

  it('Straßenwege nutzen nur Fahrbahn und Überwege', () => {
    const roadTiles: number[] = [];
    for (let i = 0; i < world.w * world.h; i++) if (world.tiles[i] === TILE.ROAD) roadTiles.push(i);
    const path = findPath(world, roadTiles[0], roadTiles[roadTiles.length - 1], 'road')!;
    expect(path).not.toBeNull();
    for (const t of path) expect([TILE.ROAD, TILE.CROSSWALK]).toContain(world.tiles[t]);
  });

  it('liefert für häufige Wege denselben zwischengespeicherten Weg', () => {
    const a = findPath(world, world.warehouse.door, world.spots[5].tile, 'foot');
    const b = findPath(world, world.warehouse.door, world.spots[5].tile, 'foot');
    expect(a).toBe(b);
  });

  it('geht keine Ecken diagonal an Hindernissen vorbei', () => {
    const path = findPath(world, world.warehouse.door, world.spots[10].tile, 'foot')!;
    for (let i = 1; i < path.length; i++) {
      const ax = path[i - 1] % world.w, ay = (path[i - 1] / world.w) | 0;
      const bx = path[i] % world.w, by = (path[i] / world.w) | 0;
      if (ax !== bx && ay !== by) {
        expect(world.costs.foot[ay * world.w + bx]).toBeGreaterThan(0);
        expect(world.costs.foot[by * world.w + ax]).toBeGreaterThan(0);
      }
    }
  });
});
