import { describe, expect, it } from 'vitest';
import { START } from '../src/data/balance';
import { deserialize, SaveError, serialize } from '../src/save/format';
import { createInitialState, STATE_VERSION } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { createWorld } from '../src/sim/world';

const world = createWorld();

describe('Speichern und Laden', () => {
  it('der Zustand nach dem Laden ist identisch und läuft deterministisch weiter', () => {
    const s = createInitialState(world, { seed: 11 });
    s.queue.push({ type: 'buyCrate', fruit: 'apple', count: 4 });
    const out = createStepOutput();
    for (let i = 0; i < 600; i++) step(s, world, out);
    const copy = deserialize(serialize(s, 'Test')).state;
    expect(copy).toEqual(s);
    for (let i = 0; i < 800; i++) {
      step(s, world, out);
      step(copy, world, out);
    }
    expect(JSON.stringify(copy)).toBe(JSON.stringify(s));
  });

  it('fehlerhafte Dateien führen zu einer Meldung statt zu einem Absturz', () => {
    expect(() => deserialize('kein json')).toThrow(SaveError);
    expect(() => deserialize('{"format":"anderes"}')).toThrow(SaveError);
    expect(() => deserialize('{"format":"obst-tycoon-save","version":999,"state":{}}')).toThrow(SaveError);
    expect(() => deserialize(`{"format":"obst-tycoon-save","version":${STATE_VERSION},"state":{"day":"x"}}`)).toThrow(SaveError);
  });
});

describe('Migrationen', () => {
  const old = (version: number, extra: Record<string, unknown>) =>
    JSON.stringify({
      format: 'obst-tycoon-save',
      version,
      savedAt: '',
      label: 'Alt',
      state: { version, seed: 3, rng: 1, ambientRng: 2, day: 4, dayTick: 300, peds: [], vehicles: [], queue: [], messages: [], ...extra },
    });

  it('hebt einen Stand aus M1 (Version 1) auf das vereinfachte Spiel', () => {
    const f = deserialize(old(1, {}));
    expect(f.version).toBe(STATE_VERSION);
    expect(f.state.day).toBe(4);
    expect(f.state.money).toBe(START.money);
    expect(f.state.dealers.length).toBeGreaterThanOrEqual(1);
  });

  it('übernimmt aus M2 (Version 2) Geld und Zahl der Verkäufer', () => {
    const f = deserialize(old(2, { money: 2400, staff: [{}, {}, {}] }));
    expect(f.state.money).toBe(2400);
    expect(f.state.dealers).toHaveLength(3);
    const out = createStepOutput();
    for (let i = 0; i < 100; i++) step(f.state, world, out);
    expect(f.state.totalTicks).toBe(100);
  });
});
