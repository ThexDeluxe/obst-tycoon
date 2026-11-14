import { describe, expect, it } from 'vitest';
import { deserialize, serialize } from '../src/save/format';
import { createInitialState, STATE_VERSION } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { createWorld } from '../src/sim/world';

const world = createWorld();

describe('Migrationen', () => {
  it('hebt einen Spielstand aus M1 (Version 1) auf die aktuelle Version', () => {
    const v1State = {
      version: 1,
      seed: 3,
      rng: 123456,
      ambientRng: 654321,
      day: 2,
      dayTick: 300,
      totalTicks: 5100,
      phase: 'day',
      nextId: 50,
      ambient: true,
      peds: [],
      vehicles: [],
      ambientTimer: 0,
      warehouse: {
        sections: 1,
        rooms: [
          { slot: 0, type: 'office', level: 1, buildTicks: 0 },
          { slot: 1, type: 'shelf', level: 1, buildTicks: 0 },
        ],
      },
      queue: [],
      messages: [],
    };
    const text = JSON.stringify({ format: 'obst-tycoon-save', version: 1, savedAt: '', label: 'Alt', state: v1State });
    const file = deserialize(text);
    expect(file.version).toBe(STATE_VERSION);
    const s = file.state;
    expect(s.version).toBe(STATE_VERSION);
    expect(s.day).toBe(2);
    expect(s.money).toBe(1500);
    expect(s.staff).toHaveLength(1);
    expect(s.crates).toHaveLength(7);
    // Der migrierte Stand läuft weiter
    const out = createStepOutput();
    for (let i = 0; i < 200; i++) step(s, world, out);
    expect(s.dayTick).toBe(500);
  });

  it('ein aktueller Spielstand mit Wirtschaft bleibt beim Speichern und Laden identisch', () => {
    const s = createInitialState(world, { seed: 9, ambient: false });
    s.queue.push({ type: 'assign', personId: s.staff[0].id, spot: 0 });
    const out = createStepOutput();
    for (let i = 0; i < 900; i++) step(s, world, out);
    const loaded = deserialize(serialize(s, '')).state;
    expect(loaded).toEqual(s);
    for (let i = 0; i < 600; i++) {
      step(s, world, out);
      step(loaded, world, out);
    }
    expect(JSON.stringify(loaded)).toBe(JSON.stringify(s));
  });
});
