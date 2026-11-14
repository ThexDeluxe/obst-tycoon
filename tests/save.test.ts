import { describe, expect, it } from 'vitest';
import { deserialize, SaveError, serialize } from '../src/save/format';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { createWorld } from '../src/sim/world';

const world = createWorld();

describe('Speichern und Laden', () => {
  it('der Zustand nach dem Laden ist identisch', () => {
    const s = createInitialState(world, { seed: 11 });
    const out = createStepOutput();
    for (let i = 0; i < 500; i++) step(s, world, out);
    const loaded = deserialize(serialize(s, 'Test')).state;
    expect(loaded).toEqual(s);
  });

  it('nach dem Laden läuft die Simulation genauso weiter (deterministisch)', () => {
    const s = createInitialState(world, { seed: 12 });
    const out = createStepOutput();
    for (let i = 0; i < 300; i++) step(s, world, out);
    const copy = deserialize(serialize(s, '')).state;
    for (let i = 0; i < 700; i++) {
      step(s, world, out);
      step(copy, world, out);
    }
    expect(JSON.stringify(copy)).toBe(JSON.stringify(s));
  });

  it('fehlerhafte Dateien führen zu einer Meldung statt zu einem Absturz', () => {
    expect(() => deserialize('kein json')).toThrow(SaveError);
    expect(() => deserialize('{"format":"anderes"}')).toThrow(SaveError);
    expect(() => deserialize('{"format":"obst-tycoon-save","version":999,"state":{}}')).toThrow(SaveError);
    expect(() => deserialize('{"format":"obst-tycoon-save","version":1,"state":{"day":"x"}}')).toThrow(SaveError);
  });
});
