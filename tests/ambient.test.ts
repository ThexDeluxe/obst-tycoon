import { describe, expect, it } from 'vitest';
import { AMBIENT } from '../src/data/balance';
import { pedestrianTarget } from '../src/sim/ambient';
import { createInitialState } from '../src/sim/state';
import { createStepOutput, step } from '../src/sim/step';
import { createWorld, isFootTile } from '../src/sim/world';

const world = createWorld();

describe('Passanten und Verkehr', () => {
  it('Zahl der Passanten folgt der Nachfrage und bleibt unter der Obergrenze', () => {
    const s = createInitialState(world, { seed: 3 });
    const out = createStepOutput();
    for (let i = 0; i < 600; i++) step(s, world, out);
    let target = 0;
    for (let d = 0; d < 5; d++) target += pedestrianTarget(s, d);
    const alive = s.peds.filter((p) => !p.leaving).length;
    expect(Math.abs(alive - target)).toBeLessThan(target * 0.2 + 10);
    expect(s.peds.length).toBeLessThanOrEqual(AMBIENT.maxPedestrians + 20);
  });

  it('Passanten bleiben auf begehbaren Feldern', () => {
    const s = createInitialState(world, { seed: 4 });
    const out = createStepOutput();
    for (let i = 0; i < 300; i++) {
      step(s, world, out);
      for (const p of s.peds) expect(isFootTile(world.tiles[p.to])).toBe(true);
    }
  });

  it('Fahrzeuge bewegen sich, Passanten nutzen einen eigenen Zufallsstrom', () => {
    const a = createInitialState(world, { seed: 5 });
    const b = createInitialState(world, { seed: 5, ambient: false });
    const out = createStepOutput();
    const s0 = a.vehicles[0].s;
    a.queue.push({ type: 'buyCrate', fruit: 'apple', count: 3 });
    b.queue.push({ type: 'buyCrate', fruit: 'apple', count: 3 });
    for (let i = 0; i < 200; i++) {
      step(a, world, out);
      step(b, world, out);
    }
    expect(a.vehicles[0].s).not.toBe(s0);
    expect(a.rng).toBe(b.rng);
  });
});
