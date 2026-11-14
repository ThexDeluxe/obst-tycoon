import { describe, expect, it } from 'vitest';
import { DISTRICTS, TICKS_PER_DAY, TICKS_PER_HOUR } from '../src/data/balance';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { clockText, demandCurve, weekdayFactor } from '../src/sim/time';
import { createWorld } from '../src/sim/world';

const world = createWorld();

describe('Zeit', () => {
  it('ein Tag dauert 4 Minuten bei 10 Ticks pro Sekunde', () => {
    expect(TICKS_PER_HOUR).toBe(150);
    expect(TICKS_PER_DAY).toBe(2400);
  });

  it('endet um 22:00 mit dem Tagesabschluss und beginnt danach am nächsten Tag um 06:00', () => {
    const s = createInitialState(world, { seed: 1, ambient: false });
    expect(clockText(s)).toBe('06:00');
    const out = createStepOutput();
    for (let i = 0; i < TICKS_PER_DAY; i++) step(s, world, out);
    expect(s.phase).toBe('dayEnd');
    expect(clockText(s)).toBe('22:00');
    step(s, world, out);
    expect(s.dayTick).toBe(TICKS_PER_DAY);
    s.queue.push({ type: 'nextDay' });
    step(s, world, out);
    expect(s.day).toBe(1);
    expect(s.phase).toBe('day');
  });

  it('die Nachfragekurve geht an den Stundengrenzen weich über', () => {
    const d = 'station';
    expect(demandCurve(d, 7.5)).toBe(DISTRICTS[d].peak);
    expect(demandCurve(d, 12.5)).toBe(DISTRICTS[d].normal);
    let prev = demandCurve(d, 6);
    for (let h = 6; h < 22; h += 0.01) {
      const v = demandCurve(d, h);
      expect(Math.abs(v - prev)).toBeLessThan(1.5);
      prev = v;
    }
    // Der Mittelwert über einen Übergang bleibt erhalten
    let sum = 0;
    for (let h = 8; h < 10; h += 0.001) sum += demandCurve(d, h) * 0.001;
    expect(sum).toBeCloseTo(DISTRICTS[d].peak + DISTRICTS[d].normal, 1);
  });

  it('am Wochenende ändert sich die Kundschaft', () => {
    expect(weekdayFactor('campus', 0)).toBe(1);
    expect(weekdayFactor('campus', 5)).toBe(0.3);
    expect(weekdayFactor('oldtown', 6)).toBe(1.3);
  });
});
