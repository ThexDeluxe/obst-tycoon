// Siegchance im Würfelduell (exakt per dynamischer Programmierung über alle Runden).
// Wahrscheinlichkeiten einer Runde je nach Zahl der Würfel (Angreifer gegen Verteidiger).

interface Outcome {
  /** Verluste Angreifer, Verluste Verteidiger, Wahrscheinlichkeit */
  a: number;
  d: number;
  p: number;
}

function outcomes(ad: number, dd: number): Outcome[] {
  // Alle Würfelkombinationen abzählen
  const counts = new Map<string, number>();
  let total = 0;
  const n = ad + dd;
  const dice = new Array(n).fill(1);
  for (;;) {
    const a = dice.slice(0, ad).sort((x, y) => y - x);
    const d = dice.slice(ad).sort((x, y) => y - x);
    let la = 0;
    let ld = 0;
    for (let i = 0; i < Math.min(ad, dd); i++) {
      if (a[i] > d[i]) ld++;
      else la++;
    }
    const key = `${la},${ld}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    total++;
    let k = 0;
    while (k < n && dice[k] === 6) dice[k++] = 1;
    if (k === n) break;
    dice[k]++;
  }
  return [...counts.entries()].map(([k, c]) => {
    const [a, d] = k.split(',').map(Number);
    return { a, d, p: c / total };
  });
}

const table = new Map<string, Outcome[]>();
function roundOutcomes(ad: number, dd: number): Outcome[] {
  const key = `${ad}v${dd}`;
  let o = table.get(key);
  if (!o) {
    o = outcomes(ad, dd);
    table.set(key, o);
  }
  return o;
}

const memo = new Map<number, number>();

/** Wahrscheinlichkeit, dass a Angreifer d Verteidiger besiegen (bis zum Ende gekämpft) */
export function winChance(a: number, d: number): number {
  if (d <= 0) return 1;
  if (a <= 0) return 0;
  const key = a * 1000 + d;
  const hit = memo.get(key);
  if (hit !== undefined) return hit;
  let p = 0;
  for (const o of roundOutcomes(Math.min(3, a), Math.min(2, d))) p += o.p * winChance(a - o.a, d - o.d);
  memo.set(key, p);
  return p;
}
