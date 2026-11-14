// Deterministischer Zufallsgenerator (mulberry32). Der Zustand ist eine Zahl im Spielstand.

export interface RngHolder {
  rng: number;
}

/** Liefert eine Zufallszahl in [0, 1) und schreibt den Generatorzustand fort. */
export function rand(h: RngHolder, key: 'rng' | 'ambientRng' = 'rng'): number {
  const holder = h as unknown as Record<string, number>;
  let t = (holder[key] = (holder[key] + 0x6d2b79f5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function randInt(h: RngHolder, min: number, max: number, key: 'rng' | 'ambientRng' = 'rng'): number {
  return min + Math.floor(rand(h, key) * (max - min + 1));
}

export function randRange(h: RngHolder, min: number, max: number, key: 'rng' | 'ambientRng' = 'rng'): number {
  return min + rand(h, key) * (max - min);
}

/** Poisson-verteilte Zufallszahl (Knuth), geeignet für kleine Erwartungswerte. */
export function poisson(h: RngHolder, lambda: number, key: 'rng' | 'ambientRng' = 'rng'): number {
  if (lambda <= 0) return 0;
  const l = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rand(h, key);
  } while (p > l && k < 1000);
  return k - 1;
}

/** Wählt einen Index gewichtet aus. Liefert -1, wenn alle Gewichte 0 sind. */
export function pickWeighted(h: RngHolder, weights: ArrayLike<number>, count = weights.length, key: 'rng' | 'ambientRng' = 'rng'): number {
  let sum = 0;
  for (let i = 0; i < count; i++) sum += weights[i];
  if (sum <= 0) return -1;
  let r = rand(h, key) * sum;
  for (let i = 0; i < count; i++) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return count - 1;
}

/** Startwert des Generators aus einem Seed */
export function seedState(seed: number): number {
  return (seed ^ 0x5bd1e995) | 0;
}
