// Kleine wiederverwendbare Bausteine der Oberfläche.
import type { ComponentChildren } from 'preact';
import { int, money, pct } from './format';

export function Stepper({ value, onChange, min = 0, max = 99, step = 1 }: { value: number; onChange(v: number): void; min?: number; max?: number; step?: number }) {
  return (
    <div class="stepper">
      <button class="icon-btn small-btn" aria-label="weniger" disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))}>
        −
      </button>
      <span class="mono">{int(value)}</span>
      <button class="icon-btn small-btn" aria-label="mehr" disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))}>
        +
      </button>
    </div>
  );
}

export function Bar({ value, color, title }: { value: number; color?: string; title?: string }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div class="bar" title={title}>
      <div style={{ width: `${(v * 100).toFixed(1)}%`, background: color ?? 'var(--green)' }} />
    </div>
  );
}

export function freshColor(f: number): string {
  if (f < 0.4) return 'var(--red)';
  if (f < 0.7) return '#c99a2e';
  return 'var(--green)';
}

export function StatGrid({ rows }: { rows: [string, ComponentChildren][] }) {
  return (
    <dl class="stat-grid">
      {rows.map(([k, v]) => (
        <>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </>
      ))}
    </dl>
  );
}

/** Stufenwert 1 bis 5 als Punkte */
export function Pips({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span class="pips" title={`${value} von ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <i key={i} class={i < value ? 'on' : ''} />
      ))}
    </span>
  );
}

/** Balkendiagramm (z. B. Umsatzverlauf) */
export function BarChart({ values, labels, height = 90, color = '#2f7d4a', format = money }: { values: number[]; labels?: string[]; height?: number; color?: string; format?: (v: number) => string }) {
  const max = Math.max(1, ...values);
  const n = values.length;
  const w = 300;
  const bw = w / Math.max(1, n);
  return (
    <svg class="chart" viewBox={`0 0 ${w} ${height + 16}`} preserveAspectRatio="none" role="img">
      {values.map((v, i) => {
        const h = (v / max) * height;
        return (
          <g key={i}>
            <rect x={i * bw + bw * 0.15} y={height - h} width={bw * 0.7} height={h} fill={color} rx={1.5}>
              <title>{`${labels?.[i] ?? ''}: ${format(v)}`}</title>
            </rect>
            {labels && (n <= 16 || i % 2 === 0) && (
              <text x={i * bw + bw / 2} y={height + 12} text-anchor="middle" font-size="9" fill="#5f6b72">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Linienverlauf über die Stunden 6 bis 22 (Nachfragekurve) */
export function CurveChart({ fn, now, height = 70 }: { fn: (h: number) => number; now?: number; height?: number }) {
  const w = 300;
  const pts: string[] = [];
  let max = 1;
  const vals: number[] = [];
  for (let i = 0; i <= 64; i++) {
    const h = 6 + (i / 64) * 16;
    const v = fn(h);
    vals.push(v);
    max = Math.max(max, v);
  }
  vals.forEach((v, i) => pts.push(`${((i / 64) * w).toFixed(1)},${(height - (v / max) * (height - 6)).toFixed(1)}`));
  const nx = now !== undefined ? ((now - 6) / 16) * w : -1;
  return (
    <svg class="chart" viewBox={`0 0 ${w} ${height + 14}`} preserveAspectRatio="none" role="img">
      <polyline points={`0,${height} ${pts.join(' ')} ${w},${height}`} fill="rgba(47,125,74,0.15)" stroke="#2f7d4a" stroke-width="1.6" />
      {nx >= 0 && <line x1={nx} x2={nx} y1={0} y2={height} stroke="#c0392b" stroke-width="1.2" />}
      {[6, 10, 14, 18, 22].map((h) => (
        <text key={h} x={((h - 6) / 16) * w} y={height + 11} font-size="9" fill="#5f6b72" text-anchor={h === 6 ? 'start' : h === 22 ? 'end' : 'middle'}>
          {h}
        </text>
      ))}
    </svg>
  );
}

export function Share({ value }: { value: number }) {
  return <span class="mono">{pct(value)}</span>;
}

export function Empty({ children }: { children: ComponentChildren }) {
  return <p class="muted small-text">{children}</p>;
}
