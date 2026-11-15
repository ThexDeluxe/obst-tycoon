import { describe, expect, it } from 'vitest';
import { DISTRICTS, RUSH_FACTOR, TICKS_PER_DAY, TICKS_PER_HOUR } from '../src/data/balance';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { clockText, customersPerHour } from '../src/sim/time';
import { createWorld } from '../src/sim/world';

const world = createWorld();

describe('Zeit', () => {
  it('ein Tag (06:00 bis 22:00) dauert 4 Minuten bei 10 Ticks pro Sekunde', () => {
    expect(TICKS_PER_HOUR).toBe(150);
    expect(TICKS_PER_DAY).toBe(2400);
  });

  it('um 22:00 beginnt ohne Unterbrechung der nächste Tag, die Gang erholt sich', () => {
    const s = createInitialState(world, { seed: 1, ambient: false });
    s.districts[1].gang = 1;
    const out = createStepOutput();
    expect(clockText(s)).toBe('06:00');
    for (let i = 0; i < TICKS_PER_DAY; i++) step(s, world, out);
    expect(s.day).toBe(1);
    expect(clockText(s)).toBe('06:00');
    expect(s.history).toHaveLength(1);
    expect(s.districts[1].gang).toBe(1 + DISTRICTS.station.regenPerDay);
  });

  it('die Kundschaft ist in der Stoßzeit höher und geht weich über', () => {
    expect(customersPerHour('station', 7.5)).toBe(DISTRICTS.station.customers * RUSH_FACTOR);
    expect(customersPerHour('station', 12.5)).toBe(DISTRICTS.station.customers);
    let prev = customersPerHour('station', 6);
    for (let h = 6; h < 22; h += 0.01) {
      const v = customersPerHour('station', h);
      expect(Math.abs(v - prev)).toBeLessThan(1.5);
      prev = v;
    }
  });
});
