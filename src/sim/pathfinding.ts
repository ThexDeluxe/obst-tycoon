// Wegfindung per A* auf dem Raster mit Binärheap. Die Puffer werden wiederverwendet,
// damit bei häufigen Suchen kein neuer Speicher entsteht.
import type { PathMode } from '../data/balance';
import type { World } from './world';

const SQRT2 = Math.SQRT2;

class Pathfinder {
  private g: Float32Array;
  private parent: Int32Array;
  private seen: Uint32Array;
  private closed: Uint32Array;
  private gen = 1;
  private heap: Int32Array;
  private heapF: Float32Array;
  private heapSize = 0;
  private cache = new Map<string, number[] | null>();

  constructor(private world: World) {
    const n = world.w * world.h;
    this.g = new Float32Array(n);
    this.parent = new Int32Array(n);
    this.seen = new Uint32Array(n);
    this.closed = new Uint32Array(n);
    this.heap = new Int32Array(n * 8);
    this.heapF = new Float32Array(n * 8);
  }

  private push(node: number, f: number): void {
    let i = this.heapSize++;
    const heap = this.heap;
    const hf = this.heapF;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (hf[p] <= f) break;
      heap[i] = heap[p];
      hf[i] = hf[p];
      i = p;
    }
    heap[i] = node;
    hf[i] = f;
  }

  private pop(): number {
    const heap = this.heap;
    const hf = this.heapF;
    const top = heap[0];
    const n = --this.heapSize;
    if (n > 0) {
      const node = heap[n];
      const f = hf[n];
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        if (l >= n) break;
        const r = l + 1;
        const c = r < n && hf[r] < hf[l] ? r : l;
        if (hf[c] >= f) break;
        heap[i] = heap[c];
        hf[i] = hf[c];
        i = c;
      }
      heap[i] = node;
      hf[i] = f;
    }
    return top;
  }

  /**
   * Sucht einen Weg von start nach goal (Feldindizes). Liefert die Feldfolge
   * einschließlich Start und Ziel oder null.
   */
  find(start: number, goal: number, mode: PathMode, useCache = true): number[] | null {
    const key = useCache ? `${mode}:${start}:${goal}` : '';
    if (useCache) {
      const hit = this.cache.get(key);
      if (hit !== undefined) return hit;
    }
    const result = this.search(start, goal, mode);
    if (useCache) {
      if (this.cache.size > 4000) this.cache.clear();
      this.cache.set(key, result);
    }
    return result;
  }

  /** Kosten des gefundenen Weges (Weglänge in Feldern, gewichtet) */
  lastCost = 0;

  private search(start: number, goal: number, mode: PathMode): number[] | null {
    const world = this.world;
    const cost = world.costs[mode];
    const w = world.w;
    const h = world.h;
    if (start === goal) {
      this.lastCost = 0;
      return [start];
    }
    if (!cost[goal] || !cost[start]) return null;
    this.gen++;
    if (this.gen > 0xfffffff0) {
      this.seen.fill(0);
      this.closed.fill(0);
      this.gen = 1;
    }
    const gen = this.gen;
    const g = this.g;
    const parent = this.parent;
    const seen = this.seen;
    const closed = this.closed;
    this.heapSize = 0;
    const gx = goal % w;
    const gy = (goal / w) | 0;
    const heur = (i: number): number => {
      const dx = Math.abs((i % w) - gx);
      const dy = Math.abs(((i / w) | 0) - gy);
      return dx > dy ? dx + (SQRT2 - 1) * dy : dy + (SQRT2 - 1) * dx;
    };
    g[start] = 0;
    parent[start] = -1;
    seen[start] = gen;
    this.push(start, heur(start));
    while (this.heapSize > 0) {
      const cur = this.pop();
      if (closed[cur] === gen) continue;
      closed[cur] = gen;
      if (cur === goal) break;
      const cx = cur % w;
      const cy = (cur / w) | 0;
      const gc = g[cur];
      for (let dy = -1; dy <= 1; dy++) {
        const ny = cy + dy;
        if (ny < 0 || ny >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cx + dx;
          if (nx < 0 || nx >= w) continue;
          const ni = ny * w + nx;
          const c = cost[ni];
          if (!c || closed[ni] === gen) continue;
          let step = c;
          if (dx !== 0 && dy !== 0) {
            // Keine Ecken abschneiden
            if (!cost[cy * w + nx] || !cost[ny * w + cx]) continue;
            step = c * SQRT2;
          }
          const ng = gc + step;
          if (seen[ni] !== gen || ng < g[ni]) {
            seen[ni] = gen;
            g[ni] = ng;
            parent[ni] = cur;
            this.push(ni, ng + heur(ni));
          }
        }
      }
    }
    if (closed[goal] !== gen) return null;
    this.lastCost = g[goal];
    const path: number[] = [];
    for (let i = goal; i !== -1; i = parent[i]) path.push(i);
    path.reverse();
    return path;
  }
}

const finders = new WeakMap<World, Pathfinder>();

function finder(world: World): Pathfinder {
  let f = finders.get(world);
  if (!f) {
    f = new Pathfinder(world);
    finders.set(world, f);
  }
  return f;
}

export function findPath(world: World, start: number, goal: number, mode: PathMode, useCache = true): number[] | null {
  return finder(world).find(start, goal, mode, useCache);
}

/** Länge eines Weges in Feldern (diagonale Schritte zählen √2) */
export function pathLength(world: World, path: number[]): number {
  let len = 0;
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    const dx = Math.abs((a % world.w) - (b % world.w));
    const dy = Math.abs(((a / world.w) | 0) - ((b / world.w) | 0));
    len += dx && dy ? SQRT2 : 1;
  }
  return len;
}
