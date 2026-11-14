// Baut die feste Stadtgeometrie aus Grundformen. Pro Kartenabschnitt entsteht ein Mesh,
// wiederkehrende Objekte (Bäume, Laternen) sind InstancedMeshes.
import {
  Color,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from 'three';
import { RENDER } from '../data/balance';
import { TILE, type Building, type World } from '../sim/world';
import { Batcher, FACE } from './batcher';
import { modelGeometry } from './models';
import { PAL } from './palette';

const H_SIDEWALK = 0.07;
const H_GREEN = 0.06;

function hash(a: number, b: number): number {
  let h = Math.imul(a * 374761393 + b * 668265263, 1274126177);
  h ^= h >>> 13;
  h = Math.imul(h, 1103515245);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export interface CityMeshes {
  group: Group;
  material: MeshLambertMaterial;
  lampHeads: InstancedMesh;
  drawCallsStatic: number;
}

function tileAt(world: World, x: number, y: number): number {
  if (x < 0 || y < 0 || x >= world.w || y >= world.h) return -1;
  return world.tiles[y * world.w + x];
}

function isRoadish(t: number): boolean {
  return t === TILE.ROAD || t === TILE.CROSSWALK;
}

function buildGround(b: Batcher, world: World, x: number, y: number): void {
  const t = tileAt(world, x, y);
  const x0 = x, z0 = y, x1 = x + 1, z1 = y + 1;
  const lowerSides = (h: number): number => {
    let f = FACE.PY;
    const n = (dx: number, dy: number) => {
      const nt = tileAt(world, x + dx, y + dy);
      return nt === -1 || isRoadish(nt) || nt === TILE.BUILDING;
    };
    if (n(1, 0)) f |= FACE.PX;
    if (n(-1, 0)) f |= FACE.NX;
    if (n(0, 1)) f |= FACE.PZ;
    if (n(0, -1)) f |= FACE.NZ;
    void h;
    return f;
  };
  const alt = (x + y) % 2 === 0;
  switch (t) {
    case TILE.ROAD: {
      b.color(PAL.road);
      b.flat(x0, z0, x1, z1, 0);
      b.color(PAL.marking);
      const up = tileAt(world, x, y - 1), dn = tileAt(world, x, y + 1), dn2 = tileAt(world, x, y + 2);
      if (!isRoadish(up) && dn === TILE.ROAD && !isRoadish(dn2)) b.flat(x + 0.2, y + 1 - 0.035, x + 0.8, y + 1 + 0.035, 0.004);
      const lf = tileAt(world, x - 1, y), rt = tileAt(world, x + 1, y), rt2 = tileAt(world, x + 2, y);
      if (!isRoadish(lf) && rt === TILE.ROAD && !isRoadish(rt2)) b.flat(x + 1 - 0.035, y + 0.2, x + 1 + 0.035, y + 0.8, 0.004);
      break;
    }
    case TILE.CROSSWALK: {
      b.color(PAL.road);
      b.flat(x0, z0, x1, z1, 0);
      b.color(PAL.marking);
      const horizontalTraffic = tileAt(world, x - 1, y) === TILE.ROAD || tileAt(world, x + 1, y) === TILE.ROAD;
      for (let k = 0; k < 3; k++) {
        const a = 0.1 + k * 0.3;
        if (horizontalTraffic) b.flat(x + 0.08, y + a, x + 0.92, y + a + 0.18, 0.004);
        else b.flat(x + a, y + 0.08, x + a + 0.18, y + 0.92, 0.004);
      }
      break;
    }
    case TILE.SIDEWALK:
      b.color(alt ? PAL.sidewalk : PAL.sidewalkAlt);
      b.box(x0, 0, z0, x1, H_SIDEWALK, z1, lowerSides(H_SIDEWALK));
      break;
    case TILE.PLAZA:
      b.color(alt ? PAL.plaza : PAL.plazaAlt);
      b.box(x0, 0, z0, x1, H_SIDEWALK, z1, lowerSides(H_SIDEWALK));
      break;
    case TILE.GREEN:
      b.color(hash(x, y) < 0.5 ? PAL.grass : PAL.grassAlt);
      b.box(x0, 0, z0, x1, H_GREEN, z1, lowerSides(H_GREEN));
      break;
    case TILE.WAREHOUSE:
      b.color(PAL.lot);
      b.box(x0, 0, z0, x1, H_GREEN, z1, lowerSides(H_GREEN));
      break;
    case TILE.BUILDING:
      b.color(PAL.sidewalkAlt);
      b.flat(x0, z0, x1, z1, 0.01);
      break;
  }
}

/** Seiten eines Gebäudefeldes, an denen kein Feld desselben Gebäudes liegt */
function exteriorFaces(world: World, bld: Building, tx: number, ty: number): number {
  let f = 0;
  const other = (dx: number, dy: number) => {
    const nx = tx + dx, ny = ty + dy;
    if (nx < 0 || ny < 0 || nx >= world.w || ny >= world.h) return true;
    return world.buildingOf[ny * world.w + nx] !== bld.id;
  };
  if (other(1, 0)) f |= FACE.PX;
  if (other(-1, 0)) f |= FACE.NX;
  if (other(0, 1)) f |= FACE.PZ;
  if (other(0, -1)) f |= FACE.NZ;
  return f;
}

function walkableNeighbor(world: World, tx: number, ty: number, dx: number, dy: number): boolean {
  const t = tileAt(world, tx + dx, ty + dy);
  return t === TILE.SIDEWALK || t === TILE.PLAZA || t === TILE.CROSSWALK;
}

type Side = 'px' | 'nx' | 'pz' | 'nz';
const SIDES: { side: Side; face: number; dx: number; dy: number }[] = [
  { side: 'px', face: FACE.PX, dx: 1, dy: 0 },
  { side: 'nx', face: FACE.NX, dx: -1, dy: 0 },
  { side: 'pz', face: FACE.PZ, dx: 0, dy: 1 },
  { side: 'nz', face: FACE.NZ, dx: 0, dy: -1 },
];

function sideFixed(side: Side, tx: number, ty: number): number {
  return side === 'px' ? tx + 1 : side === 'nx' ? tx : side === 'pz' ? ty + 1 : ty;
}
function sideRange(side: Side, tx: number, ty: number): [number, number] {
  return side === 'px' || side === 'nx' ? [ty, ty + 1] : [tx, tx + 1];
}

interface WindowOpts {
  frame?: boolean;
  band?: boolean;
  firstFloor?: number;
  color?: number;
}

function windows(b: Batcher, side: Side, tx: number, ty: number, h: number, opts: WindowOpts = {}): void {
  const fixed = sideFixed(side, tx, ty);
  const [a0, a1] = sideRange(side, tx, ty);
  const floors = Math.max(1, Math.floor(h - 0.15));
  for (let f = opts.firstFloor ?? 0; f < floors; f++) {
    const y0 = f + 0.32;
    const y1 = f + 0.78;
    if (opts.band) {
      b.color(opts.color ?? PAL.uniBand);
      b.wallQuad(side, fixed, a0 + 0.04, a1 - 0.04, y0, y1);
      continue;
    }
    if (opts.frame) {
      b.color(PAL.frame);
      b.wallQuad(side, fixed, a0 + 0.27, a1 - 0.27, y0 - 0.04, y1 + 0.03);
    }
    b.color(opts.color ?? PAL.window);
    wallQuadOut(b, side, fixed, a0 + 0.31, a1 - 0.31, y0, y1);
  }
}

/** Wie wallQuad, aber etwas weiter außen (über dem Rahmen) */
function wallQuadOut(b: Batcher, side: Side, fixed: number, a0: number, a1: number, y0: number, y1: number): void {
  const d = side === 'px' || side === 'pz' ? 0.01 : -0.01;
  b.wallQuad(side, fixed + d, a0, a1, y0, y1);
}

function parapet(b: Batcher, faces: number, tx: number, ty: number, h: number): void {
  b.color(PAL.roofParapet);
  const t = 0.08;
  const ph = 0.12;
  if (faces & FACE.PX) b.box(tx + 1 - t, h, ty, tx + 1, h + ph, ty + 1);
  if (faces & FACE.NX) b.box(tx, h, ty, tx + t, h + ph, ty + 1);
  if (faces & FACE.PZ) b.box(tx, h, ty + 1 - t, tx + 1, h + ph, ty + 1);
  if (faces & FACE.NZ) b.box(tx, h, ty, tx + 1, h + ph, ty + t);
}

function isRect(bld: Building): boolean {
  return bld.tiles.length === (bld.x1 - bld.x0 + 1) * (bld.y1 - bld.y0 + 1);
}

function pick<T>(arr: T[], v: number): T {
  return arr[Math.floor(v * arr.length) % arr.length];
}

function buildBuilding(b: Batcher, world: World, bld: Building): void {
  const w = world.w;
  const h = bld.height;
  const v = bld.variant;
  switch (bld.style) {
    case 'rowhouse': {
      const wall = v < 0.55 ? pick(PAL.brick, v * 1.8) : pick(PAL.plaster, (v - 0.55) * 2.2);
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const faces = exteriorFaces(world, bld, tx, ty);
        b.color(wall);
        b.box(tx, 0, ty, tx + 1, h, ty + 1, faces | FACE.PY);
        for (const s of SIDES) {
          if (!(faces & s.face)) continue;
          windows(b, s.side, tx, ty, h, { frame: true });
          if (walkableNeighbor(world, tx, ty, s.dx, s.dy) && (tx + ty) % 2 === 0) {
            b.color(PAL.door);
            const [a0, a1] = sideRange(s.side, tx, ty);
            b.wallQuad(s.side, sideFixed(s.side, tx, ty), a0 + 0.62, a1 - 0.12, 0.02, 0.62);
          }
        }
      }
      if (isRect(bld)) {
        const alongX = bld.x1 - bld.x0 >= bld.y1 - bld.y0;
        const o = 0.08;
        b.color(pick(PAL.roofTiles, hash(bld.x0, bld.y0)));
        b.gable(bld.x0 - o, bld.y0 - o, bld.x1 + 1 + o, bld.y1 + 1 + o, h, 0.75, alongX, wall);
        b.color(0x7a5548);
        const cx = bld.x0 + 0.6 + hash(bld.y0, bld.x0) * (bld.x1 - bld.x0);
        const cz = bld.y0 + 0.5 + hash(bld.x0 + 3, bld.y0) * (bld.y1 - bld.y0);
        b.box(cx - 0.1, h + 0.2, cz - 0.1, cx + 0.1, h + 0.95, cz + 0.1);
      }
      break;
    }
    case 'brick':
    case 'plaster':
    case 'shop':
    case 'office': {
      const wall =
        bld.style === 'brick'
          ? pick(PAL.brick, v)
          : bld.style === 'office'
            ? PAL.office
            : pick(PAL.plaster, v);
      const awning = pick(PAL.awning, hash(bld.x0 * 7, bld.y0 * 3));
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const faces = exteriorFaces(world, bld, tx, ty);
        b.color(wall);
        b.box(tx, 0, ty, tx + 1, h, ty + 1, faces);
        b.color(PAL.roofFlat);
        b.flat(tx, ty, tx + 1, ty + 1, h);
        parapet(b, faces, tx, ty, h);
        for (const s of SIDES) {
          if (!(faces & s.face)) continue;
          const fixed = sideFixed(s.side, tx, ty);
          const [a0, a1] = sideRange(s.side, tx, ty);
          const street = walkableNeighbor(world, tx, ty, s.dx, s.dy);
          if (bld.style === 'shop' && street) {
            windows(b, s.side, tx, ty, h, { frame: true, firstFloor: 1 });
            b.color(PAL.frame);
            b.wallQuad(s.side, fixed, a0 + 0.06, a1 - 0.06, 0.08, 0.86);
            b.color(PAL.windowLight);
            wallQuadOut(b, s.side, fixed, a0 + 0.1, a1 - 0.1, 0.12, 0.8);
            // Markise
            b.color(awning);
            const out = 0.42;
            const yTop = 1.02, yLow = 0.84;
            if (s.side === 'px') b.quad(fixed, yTop, a0, fixed, yTop, a1, fixed + out, yLow, a1, fixed + out, yLow, a0);
            if (s.side === 'nx') b.quad(fixed, yTop, a1, fixed, yTop, a0, fixed - out, yLow, a0, fixed - out, yLow, a1);
            if (s.side === 'pz') b.quad(a1, yTop, fixed, a0, yTop, fixed, a0, yLow, fixed + out, a1, yLow, fixed + out);
            if (s.side === 'nz') b.quad(a0, yTop, fixed, a1, yTop, fixed, a1, yLow, fixed - out, a0, yLow, fixed - out);
          } else if (bld.style === 'office') {
            windows(b, s.side, tx, ty, h, { frame: false, color: PAL.window });
            b.color(PAL.officeBand);
            b.wallQuad(s.side, fixed, a0, a1, h - 0.32, h - 0.12);
          } else {
            windows(b, s.side, tx, ty, h, { frame: true });
          }
        }
      }
      if (bld.tiles.length >= 6) {
        b.color(0x9a9da1);
        const k = Math.floor(hash(bld.x0, bld.y1) * bld.tiles.length);
        const t = bld.tiles[k];
        const tx = t % w, ty = (t / w) | 0;
        b.box(tx + 0.25, h, ty + 0.3, tx + 0.7, h + 0.28, ty + 0.7);
      }
      break;
    }
    case 'station': {
      const wh = 2.4;
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const faces = exteriorFaces(world, bld, tx, ty);
        b.color(PAL.stationWall);
        b.box(tx, 0, ty, tx + 1, wh, ty + 1, faces);
        for (const s of SIDES) {
          if (!(faces & s.face)) continue;
          const fixed = sideFixed(s.side, tx, ty);
          const [a0, a1] = sideRange(s.side, tx, ty);
          b.color(PAL.frame);
          b.wallQuad(s.side, fixed, a0 + 0.2, a1 - 0.2, 0.25, 1.95);
          b.color(PAL.window);
          wallQuadOut(b, s.side, fixed, a0 + 0.26, a1 - 0.26, 0.3, 1.9);
        }
      }
      b.color(PAL.stationRoof);
      b.gable(bld.x0 - 0.1, bld.y0 - 0.1, bld.x1 + 1.1, bld.y1 + 1.1, wh, 1.3, true, PAL.stationWall);
      // Uhrturm
      const cx = Math.floor((bld.x0 + bld.x1 + 1) / 2);
      const cz = bld.y1 + 0.2;
      b.color(PAL.stationWall);
      b.box(cx - 0.75, 0, cz - 1.2, cx + 0.75, 5.2, cz);
      b.color(PAL.frame);
      b.wallQuad('pz', cz, cx - 0.42, cx + 0.42, 4.1, 4.94);
      b.color(0x2f3a44);
      b.wallQuad('pz', cz + 0.01, cx - 0.32, cx + 0.32, 4.2, 4.84);
      b.color(PAL.stationRoof);
      b.gable(cx - 0.85, cz - 1.3, cx + 0.85, cz + 0.1, 5.2, 0.9, false, PAL.stationWall);
      break;
    }
    case 'hall': {
      const wall = pick(PAL.hall, v);
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const faces = exteriorFaces(world, bld, tx, ty);
        b.color(wall);
        b.box(tx, 0, ty, tx + 1, h, ty + 1, faces);
        for (const s of SIDES) {
          if (!(faces & s.face)) continue;
          const fixed = sideFixed(s.side, tx, ty);
          const [a0, a1] = sideRange(s.side, tx, ty);
          b.color(PAL.windowLight);
          b.wallQuad(s.side, fixed, a0 + 0.05, a1 - 0.05, h - 0.62, h - 0.3);
          const gatePos = s.side === 'px' || s.side === 'nx' ? ty : tx;
          if (walkableNeighbor(world, tx, ty, s.dx, s.dy) && gatePos % 4 === 1) {
            b.color(PAL.gate);
            b.wallQuad(s.side, fixed, a0 + 0.1, a1 + 0.5, 0.02, 1.45);
          }
        }
      }
      if (isRect(bld)) {
        const alongX = bld.x1 - bld.x0 >= bld.y1 - bld.y0;
        b.color(PAL.hallRoof);
        b.gable(bld.x0 - 0.05, bld.y0 - 0.05, bld.x1 + 1.05, bld.y1 + 1.05, h, 0.55, alongX, wall);
      } else {
        b.color(PAL.hallRoof);
        for (const t of bld.tiles) b.flat(t % w, (t / w) | 0, (t % w) + 1, ((t / w) | 0) + 1, h);
      }
      break;
    }
    case 'uni':
    case 'mensa': {
      const wall = bld.style === 'uni' ? PAL.uni : PAL.mensa;
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const faces = exteriorFaces(world, bld, tx, ty);
        b.color(wall);
        b.box(tx, 0, ty, tx + 1, h, ty + 1, faces);
        b.color(PAL.roofFlat);
        b.flat(tx, ty, tx + 1, ty + 1, h);
        parapet(b, faces, tx, ty, h);
        for (const s of SIDES) {
          if (!(faces & s.face)) continue;
          if (bld.style === 'mensa') {
            const fixed = sideFixed(s.side, tx, ty);
            const [a0, a1] = sideRange(s.side, tx, ty);
            b.color(PAL.glass);
            b.wallQuad(s.side, fixed, a0 + 0.04, a1 - 0.04, 0.12, 1.2);
          } else windows(b, s.side, tx, ty, h, { band: true });
        }
      }
      break;
    }
    case 'fountain': {
      const x0 = bld.x0 + 0.1, z0 = bld.y0 + 0.1, x1 = bld.x1 + 0.9, z1 = bld.y1 + 0.9;
      const t = 0.18, rh = 0.38;
      b.color(PAL.stone);
      b.box(x0, 0, z0, x1, rh, z0 + t);
      b.box(x0, 0, z1 - t, x1, rh, z1);
      b.box(x0, 0, z0 + t, x0 + t, rh, z1 - t);
      b.box(x1 - t, 0, z0 + t, x1, rh, z1 - t);
      b.color(PAL.water);
      b.flat(x0 + t, z0 + t, x1 - t, z1 - t, 0.28);
      const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      b.color(PAL.stone);
      b.cylinder(cx, cz, 0, 0.9, 0.16, 8);
      b.cylinder(cx, cz, 0.9, 1.0, 0.45, 10);
      b.color(PAL.water);
      b.cylinder(cx, cz, 1.0, 1.25, 0.08, 6);
      break;
    }
    case 'fence': {
      b.color(PAL.fence);
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        const same = (dx: number, dy: number) => {
          const nx = tx + dx, ny = ty + dy;
          return nx >= 0 && ny >= 0 && nx < w && ny < world.h && world.buildingOf[ny * w + nx] === bld.id;
        };
        const alongX = same(1, 0) || same(-1, 0);
        const alongZ = same(0, 1) || same(0, -1);
        if (alongX || !alongZ) {
          b.box(tx, 0.18, ty + 0.46, tx + 1, 0.24, ty + 0.54);
          b.box(tx, 0.5, ty + 0.46, tx + 1, 0.56, ty + 0.54);
          b.box(tx, 0.1, ty + 0.49, tx + 1, 0.56, ty + 0.51);
        }
        if (alongZ) {
          b.box(tx + 0.46, 0.18, ty, tx + 0.54, 0.24, ty + 1);
          b.box(tx + 0.46, 0.5, ty, tx + 0.54, 0.56, ty + 1);
          b.box(tx + 0.49, 0.1, ty, tx + 0.51, 0.56, ty + 1);
        }
        b.box(tx + 0.44, 0, ty + 0.44, tx + 0.56, 0.62, ty + 0.56);
      }
      break;
    }
    case 'rail': {
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        b.color(PAL.gravel);
        b.box(tx, 0, ty, tx + 1, 0.05, ty + 1, FACE.PY);
        b.color(PAL.sleeper);
        b.box(tx + 0.1, 0.05, ty + 0.15, tx + 0.28, 0.08, ty + 0.85, FACE.PY | FACE.SIDES);
        b.box(tx + 0.6, 0.05, ty + 0.15, tx + 0.78, 0.08, ty + 0.85, FACE.PY | FACE.SIDES);
        b.color(PAL.rail);
        b.box(tx, 0.08, ty + 0.27, tx + 1, 0.13, ty + 0.33, FACE.PY | FACE.PZ | FACE.NZ);
        b.box(tx, 0.08, ty + 0.67, tx + 1, 0.13, ty + 0.73, FACE.PY | FACE.PZ | FACE.NZ);
      }
      break;
    }
    case 'shelter': {
      for (const t of bld.tiles) {
        const tx = t % w, ty = (t / w) | 0;
        b.color(PAL.plaza);
        b.box(tx, 0, ty, tx + 1, H_SIDEWALK, ty + 1, FACE.PY);
        b.color(PAL.shelterFrame);
        b.box(tx + 0.05, 0, ty + 0.1, tx + 0.12, 0.95, ty + 0.17);
        b.box(tx + 0.88, 0, ty + 0.1, tx + 0.95, 0.95, ty + 0.17);
        b.box(tx, 0.95, ty + 0.05, tx + 1, 1.02, ty + 0.75);
        b.color(PAL.glass);
        b.box(tx + 0.12, 0.15, ty + 0.12, tx + 0.88, 0.9, ty + 0.15);
        b.color(0x8a6a4a);
        b.box(tx + 0.2, 0.25, ty + 0.2, tx + 0.8, 0.3, ty + 0.4);
      }
      break;
    }
    case 'pavilion': {
      const x0 = bld.x0 + 0.15, z0 = bld.y0 + 0.15, x1 = bld.x1 + 0.85, z1 = bld.y1 + 0.85;
      b.color(PAL.wood);
      b.box(x0, 0, z0, x1, 0.14, z1);
      for (const [cx, cz] of [[x0 + 0.1, z0 + 0.1], [x1 - 0.1, z0 + 0.1], [x0 + 0.1, z1 - 0.1], [x1 - 0.1, z1 - 0.1]]) {
        b.box(cx - 0.07, 0.14, cz - 0.07, cx + 0.07, 1.2, cz + 0.07);
      }
      b.color(PAL.pavilionRoof);
      b.gable(x0 - 0.2, z0 - 0.2, x1 + 0.2, z1 + 0.2, 1.2, 0.7, true, PAL.wood);
      b.color(PAL.wood);
      b.box(x0 + 0.5, 0.14, z0 + 0.8, x1 - 0.5, 0.5, z1 - 0.8);
      break;
    }
    case 'tree':
      break;
  }
}

const m4 = new Matrix4();
const q = new Quaternion();
const v3 = new Vector3();
const s3 = new Vector3();
const up = new Vector3(0, 1, 0);

export function buildCity(world: World): CityMeshes {
  const group = new Group();
  group.name = 'city';
  const material = new MeshLambertMaterial({ vertexColors: true });
  const cs = RENDER.chunkSize;
  const cw = Math.ceil(world.w / cs);
  const ch = Math.ceil(world.h / cs);
  const batchers: Batcher[] = [];
  for (let i = 0; i < cw * ch; i++) batchers.push(new Batcher());

  for (let y = 0; y < world.h; y++) {
    for (let x = 0; x < world.w; x++) {
      buildGround(batchers[Math.floor(y / cs) * cw + Math.floor(x / cs)], world, x, y);
    }
  }
  for (const bld of world.buildings) {
    const bi = Math.floor(bld.y0 / cs) * cw + Math.floor(bld.x0 / cs);
    buildBuilding(batchers[bi], world, bld);
  }
  // Verkaufsplätze als dezente Bodenmarkierung
  for (const s of world.spots) {
    const b = batchers[Math.floor(s.y / cs) * cw + Math.floor(s.x / cs)];
    b.color(s.parking ? PAL.spotParking : PAL.spot);
    const y = H_SIDEWALK + 0.006;
    const x0 = s.x + 0.08, z0 = s.y + 0.08, x1 = s.x + 0.92, z1 = s.y + 0.92, t = 0.07;
    b.flat(x0, z0, x1, z0 + t, y);
    b.flat(x0, z1 - t, x1, z1, y);
    b.flat(x0, z0 + t, x0 + t, z1 - t, y);
    b.flat(x1 - t, z0 + t, x1, z1 - t, y);
  }

  let calls = 0;
  for (const b of batchers) {
    if (b.vertexCount === 0) continue;
    const mesh = new Mesh(b.build(), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    group.add(mesh);
    calls++;
  }

  // Umgebung außerhalb der Karte
  const outsideMat = new MeshLambertMaterial({ color: PAL.outside });
  const outside = new Mesh(new PlaneGeometry(world.w + 160, world.h + 160), outsideMat);
  outside.rotation.x = -Math.PI / 2;
  outside.position.set(world.w / 2, -0.02, world.h / 2);
  outside.receiveShadow = true;
  group.add(outside);
  calls++;

  // Bäume: ausdrücklich gesetzte und einige zufällig auf Grünflächen
  const treeTiles: number[] = [...world.trees];
  for (let i = 0; i < world.w * world.h; i++) {
    if (world.tiles[i] !== TILE.GREEN || world.trees.includes(i)) continue;
    const x = i % world.w, y = (i / world.w) | 0;
    let nearPath = false;
    for (let dy = -1; dy <= 1 && !nearPath; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const t = tileAt(world, x + dx, y + dy);
        if (t === TILE.ROAD || t === TILE.CROSSWALK || t === TILE.SIDEWALK || t === TILE.PLAZA) nearPath = true;
      }
    if (!nearPath && hash(x * 13, y * 7) < 0.16) treeTiles.push(i);
  }
  const trunkB = new Batcher().color(PAL.trunk);
  trunkB.cylinder(0, 0, 0, 0.4, 0.06, 5);
  const foliage = new InstancedMesh(modelGeometry('tree'), new MeshLambertMaterial({ vertexColors: true }), treeTiles.length);
  const trunks = new InstancedMesh(trunkB.build(), material, treeTiles.length);
  const col = new Color();
  treeTiles.forEach((t, i) => {
    const x = (t % world.w) + 0.5 + (hash(t, 1) - 0.5) * 0.3;
    const z = ((t / world.w) | 0) + 0.5 + (hash(t, 2) - 0.5) * 0.3;
    const s = 0.8 + hash(t, 3) * 0.45;
    q.setFromAxisAngle(up, hash(t, 4) * Math.PI);
    m4.compose(v3.set(x, H_GREEN, z), q, s3.set(s, s, s));
    foliage.setMatrixAt(i, m4);
    trunks.setMatrixAt(i, m4);
    foliage.setColorAt(i, col.setHex(PAL.foliage[Math.floor(hash(t, 5) * PAL.foliage.length)]));
  });
  foliage.castShadow = trunks.castShadow = true;
  foliage.receiveShadow = true;
  group.add(foliage, trunks);
  calls += 2;

  // Straßenlaternen
  const headB = new Batcher().color(0xfff1c9);
  headB.box(0.22, 1.24, -0.07, 0.4, 1.31, 0.07);
  const poles = new InstancedMesh(modelGeometry('lamp'), material, world.lamps.length);
  const heads = new InstancedMesh(headB.build(), new MeshLambertMaterial({ vertexColors: true, emissive: 0x000000 }), world.lamps.length);
  heads.instanceMatrix.setUsage(DynamicDrawUsage);
  world.lamps.forEach((l, i) => {
    // Zur Straße hin ausrichten
    let ang: number;
    let ox = 0, oz = 0;
    if (tileAt(world, l.x + 1, l.y) === TILE.ROAD) { ang = 0; ox = 0.38; }
    else if (tileAt(world, l.x - 1, l.y) === TILE.ROAD) { ang = Math.PI; ox = -0.38; }
    else if (tileAt(world, l.x, l.y + 1) === TILE.ROAD) { ang = -Math.PI / 2; oz = 0.38; }
    else { ang = Math.PI / 2; oz = -0.38; }
    q.setFromAxisAngle(up, ang);
    m4.compose(v3.set(l.x + 0.5 + ox, H_SIDEWALK, l.y + 0.5 + oz), q, s3.set(1, 1, 1));
    poles.setMatrixAt(i, m4);
    heads.setMatrixAt(i, m4);
  });
  poles.castShadow = true;
  group.add(poles, heads);
  calls += 2;

  return { group, material, lampHeads: heads, drawCallsStatic: calls };
}

export { H_SIDEWALK, H_GREEN };
