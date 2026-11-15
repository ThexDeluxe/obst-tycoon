// Statische Spielwelt, aus den Kartendaten abgeleitet. Gehört nicht zum Spielstand.
import { DISTRICT_IDS, type DistrictId, type PathMode } from '../data/balance';
import * as MAP from '../data/map';

export const TILE = {
  ROAD: 0,
  SIDEWALK: 1,
  CROSSWALK: 2,
  PLAZA: 3,
  GREEN: 4,
  BUILDING: 5,
  WAREHOUSE: 6,
} as const;
export type TileType = (typeof TILE)[keyof typeof TILE];

export type BuildingStyle =
  | 'rowhouse'
  | 'brick'
  | 'plaster'
  | 'shop'
  | 'station'
  | 'hall'
  | 'uni'
  | 'mensa'
  | 'office'
  | 'store'
  | 'tower'
  | 'church'
  | 'garage'
  | 'subway'
  | 'fountain'
  | 'fence'
  | 'tree'
  | 'rail'
  | 'shelter'
  | 'pavilion';

interface StyleInfo {
  style: BuildingStyle;
  /** Grundhöhe in Feldern */
  height: number;
  /** Zufällige Zusatzhöhe (deterministisch je Gebäude) */
  vary: number;
}

/** Zeichen der Karte für Gebäude. Groß- und Kleinbuchstaben trennen Nachbargebäude. */
export const BUILDING_CHARS: Record<string, StyleInfo> = {
  R: { style: 'rowhouse', height: 1.7, vary: 0.5 },
  r: { style: 'rowhouse', height: 1.7, vary: 0.5 },
  B: { style: 'brick', height: 3.5, vary: 2.5 },
  b: { style: 'brick', height: 3.5, vary: 2.5 },
  P: { style: 'plaster', height: 4, vary: 3 },
  p: { style: 'plaster', height: 4, vary: 3 },
  L: { style: 'shop', height: 3, vary: 1.5 },
  l: { style: 'shop', height: 3, vary: 1.5 },
  D: { style: 'store', height: 5.5, vary: 2.5 },
  d: { style: 'store', height: 5.5, vary: 2.5 },
  X: { style: 'tower', height: 13, vary: 6 },
  x: { style: 'tower', height: 11, vary: 5 },
  Y: { style: 'tower', height: 22, vary: 0 },
  S: { style: 'station', height: 3.4, vary: 0 },
  K: { style: 'church', height: 4.5, vary: 0 },
  H: { style: 'hall', height: 2.8, vary: 0.8 },
  h: { style: 'hall', height: 2.8, vary: 0.8 },
  G: { style: 'garage', height: 1.3, vary: 0.3 },
  g: { style: 'garage', height: 1.3, vary: 0.3 },
  U: { style: 'uni', height: 4, vary: 1.5 },
  u: { style: 'uni', height: 4, vary: 1.5 },
  M: { style: 'mensa', height: 1.8, vary: 0 },
  A: { style: 'office', height: 3.0, vary: 0 },
  E: { style: 'subway', height: 0.6, vary: 0 },
  F: { style: 'fountain', height: 0.35, vary: 0 },
  Z: { style: 'fence', height: 0.6, vary: 0 },
  T: { style: 'tree', height: 0, vary: 0 },
  '|': { style: 'rail', height: 0.05, vary: 0 },
  Q: { style: 'shelter', height: 0.9, vary: 0 },
  V: { style: 'pavilion', height: 1.2, vary: 0 },
};

const TILE_CHARS: Record<string, TileType> = {
  '#': TILE.ROAD,
  '.': TILE.SIDEWALK,
  '=': TILE.CROSSWALK,
  ':': TILE.PLAZA,
  ',': TILE.GREEN,
  W: TILE.WAREHOUSE,
};

export interface Building {
  id: number;
  char: string;
  style: BuildingStyle;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  tiles: number[];
  height: number;
  /** Deterministischer Wert 0..1 für Farbvarianten */
  variant: number;
}

export interface Spot {
  index: number;
  id: string;
  name: string;
  x: number;
  y: number;
  tile: number;
  district: DistrictId;
  districtIndex: number;
}

export interface WarehouseInfo {
  x: number;
  y: number;
  w: number;
  h: number;
  hall: { x: number; y: number; w: number; h: number };
  yard: { x: number; y: number; w: number; h: number };
  office: { x: number; y: number; w: number; h: number };
  doorX: number;
  doorY: number;
  door: number;
  doorWidth: number;
  shelfSlots: [number, number][];
}

export interface CarRoute {
  /** Eckpunkte der Mittellinie in Feldkoordinaten */
  points: [number, number][];
  /** Kumulierte Länge bis zu jedem Punkt */
  cum: number[];
  length: number;
  /** Haltestellen als Strecke entlang der Route */
  stops: number[];
}

export interface World {
  w: number;
  h: number;
  rows: readonly string[];
  tiles: Uint8Array;
  buildingOf: Int32Array;
  buildings: Building[];
  district: Uint8Array;
  spots: Spot[];
  warehouse: WarehouseInfo;
  /** links[a][b]: Viertel a und b grenzen aneinander */
  links: boolean[][];
  /** Ankerpunkt des Schildes je Viertel (Index wie DISTRICT_IDS) */
  labels: [number, number][];
  /** Felder je Viertel (alle Bodenfelder, für die Markierung feindlicher Gebiete) */
  districtTiles: number[][];
  costs: Record<PathMode, Float32Array>;
  /** Begehbare Felder je Viertel, für das Erzeugen von Passanten */
  footTilesByDistrict: number[][];
  carRoutes: CarRoute[];
  busRoutes: CarRoute[];
  /** Felder, auf denen ein Baum steht (Grünfläche) */
  trees: number[];
  lamps: { x: number; y: number }[];
}

function hash2(a: number, b: number): number {
  let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

export function isFootTile(t: number): boolean {
  return t === TILE.SIDEWALK || t === TILE.CROSSWALK || t === TILE.PLAZA || t === TILE.GREEN;
}

function buildRoute(points: [number, number][], stops: [number, number][] = []): CarRoute {
  const cum: number[] = [0];
  let length = 0;
  for (let i = 1; i <= points.length; i++) {
    const a = points[i - 1];
    const b = points[i % points.length];
    length += Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
    cum.push(length);
  }
  // Haltestellen auf die Route projizieren
  const stopDist: number[] = [];
  for (const [sx, sy] of stops) {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      const segLen = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
      for (let s = 0; s <= segLen; s += 0.5) {
        const t = segLen === 0 ? 0 : s / segLen;
        const px = a[0] + (b[0] - a[0]) * t;
        const py = a[1] + (b[1] - a[1]) * t;
        const d = (px - sx) ** 2 + (py - sy) ** 2;
        if (d < bestD) {
          bestD = d;
          best = cum[i] + s;
        }
      }
    }
    stopDist.push(best);
  }
  return { points, cum, length, stops: stopDist };
}

export function createWorld(): World {
  const rows = MAP.MAP_ROWS;
  const h = rows.length;
  const w = rows[0].length;
  const n = w * h;
  const tiles = new Uint8Array(n);
  const buildingOf = new Int32Array(n).fill(-1);
  const chars: string[] = new Array(n);

  for (let y = 0; y < h; y++) {
    const row = rows[y];
    if (row.length !== w) throw new Error(`Kartenzeile ${y} hat ${row.length} statt ${w} Zeichen`);
    for (let x = 0; x < w; x++) {
      const c = row[x];
      chars[y * w + x] = c;
      if (c in TILE_CHARS) tiles[y * w + x] = TILE_CHARS[c];
      else if (c in BUILDING_CHARS) tiles[y * w + x] = BUILDING_CHARS[c].style === 'tree' ? TILE.GREEN : TILE.BUILDING;
      else throw new Error(`Unbekanntes Kartenzeichen "${c}" bei ${x},${y}`);
    }
  }

  // Gebäude als zusammenhängende Flächen gleichen Zeichens
  const buildings: Building[] = [];
  const trees: number[] = [];
  const stack: number[] = [];
  for (let i = 0; i < n; i++) {
    const c = chars[i];
    if (!(c in BUILDING_CHARS) || buildingOf[i] !== -1) continue;
    const info = BUILDING_CHARS[c];
    if (info.style === 'tree') {
      trees.push(i);
      continue;
    }
    const id = buildings.length;
    const b: Building = {
      id,
      char: c,
      style: info.style,
      x0: w,
      y0: h,
      x1: -1,
      y1: -1,
      tiles: [],
      height: 0,
      variant: 0,
    };
    stack.length = 0;
    stack.push(i);
    buildingOf[i] = id;
    while (stack.length) {
      const t = stack.pop()!;
      b.tiles.push(t);
      const tx = t % w;
      const ty = (t / w) | 0;
      b.x0 = Math.min(b.x0, tx);
      b.y0 = Math.min(b.y0, ty);
      b.x1 = Math.max(b.x1, tx);
      b.y1 = Math.max(b.y1, ty);
      const nb = [tx > 0 ? t - 1 : -1, tx < w - 1 ? t + 1 : -1, ty > 0 ? t - w : -1, ty < h - 1 ? t + w : -1];
      for (const o of nb) {
        if (o >= 0 && buildingOf[o] === -1 && chars[o] === c) {
          buildingOf[o] = id;
          stack.push(o);
        }
      }
    }
    b.variant = hash2(b.x0 * 31 + b.y0, b.tiles.length);
    b.height = info.height + info.vary * hash2(b.y0 * 17 + 3, b.x0 + 11);
    if (info.vary > 0) b.height = Math.round(b.height * 2) / 2;
    buildings.push(b);
  }

  // Viertel
  const district = new Uint8Array(n).fill(0);
  for (const area of MAP.DISTRICT_AREAS) {
    const di = DISTRICT_IDS.indexOf(area.id);
    for (const [x0, y0, x1, y1] of area.rects) {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) district[y * w + x] = di;
    }
  }

  // Kostenkarten
  const foot = new Float32Array(n);
  const mixed = new Float32Array(n);
  const road = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = tiles[i];
    foot[i] = t === TILE.SIDEWALK || t === TILE.CROSSWALK || t === TILE.PLAZA ? 1 : t === TILE.GREEN ? 1.6 : 0;
    road[i] = t === TILE.ROAD || t === TILE.CROSSWALK ? 1 : 0;
    mixed[i] = t === TILE.ROAD || t === TILE.CROSSWALK ? 1 : t === TILE.SIDEWALK || t === TILE.PLAZA ? 1.15 : 0;
  }

  const wh = MAP.WAREHOUSE;
  const door = wh.door[1] * w + wh.door[0];
  // Das Lagertor ist für alle Wegearten erreichbar
  foot[door] = 1;
  mixed[door] = 1;

  const spots: Spot[] = MAP.SPOTS.map((s, index) => {
    const tile = s.y * w + s.x;
    if (!foot[tile]) throw new Error(`Verkaufsplatz ${s.id} liegt nicht auf einem begehbaren Feld`);
    return {
      index,
      id: s.id,
      name: s.name,
      x: s.x,
      y: s.y,
      tile,
      district: s.district,
      districtIndex: DISTRICT_IDS.indexOf(s.district),
    };
  });

  const footTilesByDistrict: number[][] = DISTRICT_IDS.map(() => []);
  for (let i = 0; i < n; i++) {
    const t = tiles[i];
    if (t === TILE.SIDEWALK || t === TILE.PLAZA) footTilesByDistrict[district[i]].push(i);
  }

  // Laternen an Gehwegen neben Straßen, in festem Raster
  const lamps: { x: number; y: number }[] = [];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      if (tiles[i] !== TILE.SIDEWALK) continue;
      if ((x + y * 3) % 7 !== 0) continue;
      const nearRoad =
        tiles[i - 1] === TILE.ROAD || tiles[i + 1] === TILE.ROAD || tiles[i - w] === TILE.ROAD || tiles[i + w] === TILE.ROAD;
      if (nearRoad) lamps.push({ x, y });
    }
  }

  const links = DISTRICT_IDS.map(() => DISTRICT_IDS.map(() => false));
  for (const [a, b] of MAP.DISTRICT_LINKS) {
    const ia = DISTRICT_IDS.indexOf(a);
    const ib = DISTRICT_IDS.indexOf(b);
    links[ia][ib] = links[ib][ia] = true;
  }
  const districtTiles: number[][] = DISTRICT_IDS.map(() => []);
  for (let i = 0; i < n; i++) districtTiles[district[i]].push(i);

  return {
    w,
    h,
    rows,
    tiles,
    buildingOf,
    buildings,
    district,
    spots,
    warehouse: {
      x: wh.lot.x,
      y: wh.lot.y,
      w: wh.lot.w,
      h: wh.lot.h,
      hall: wh.hall,
      yard: wh.yard,
      office: wh.office,
      doorX: wh.door[0],
      doorY: wh.door[1],
      door,
      doorWidth: wh.doorWidth,
      shelfSlots: wh.shelfSlots,
    },
    links,
    labels: DISTRICT_IDS.map((d) => MAP.DISTRICT_LABELS[d]),
    districtTiles,
    costs: { foot, mixed, road },
    footTilesByDistrict,
    carRoutes: MAP.CAR_ROUTES.map((r) => buildRoute(r)),
    busRoutes: MAP.BUS_ROUTES.map((r) => buildRoute(r.points, r.stops)),
    trees,
    lamps,
  };
}

let cached: World | null = null;
/** Die Welt ist unveränderlich und wird nur einmal aufgebaut. */
export function getWorld(): World {
  if (!cached) cached = createWorld();
  return cached;
}

/** Position entlang einer Fahrzeugroute (Mittellinie) */
export function routePoint(route: CarRoute, s: number, out: { x: number; y: number; dx: number; dy: number }): void {
  const L = route.length;
  let d = s % L;
  if (d < 0) d += L;
  const pts = route.points;
  let i = 0;
  while (i < pts.length - 1 && route.cum[i + 1] <= d) i++;
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const segLen = route.cum[i + 1] - route.cum[i];
  const t = segLen > 0 ? (d - route.cum[i]) / segLen : 0;
  out.x = a[0] + (b[0] - a[0]) * t;
  out.y = a[1] + (b[1] - a[1]) * t;
  out.dx = Math.sign(b[0] - a[0]);
  out.dy = Math.sign(b[1] - a[1]);
}
