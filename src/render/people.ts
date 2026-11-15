// Eigene Leute und die Gemüsegang: Verkäufer mit grüner Weste und Kiste, Stände mit Schirm,
// Straßenkämpfer im Hof, Gangmitglieder mit roten Ständen in ihren Vierteln.
import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Quaternion,
  Vector3,
} from 'three';
import { FRUITS } from '../data/balance';
import { setupProgress } from '../sim/dealers';
import type { GameState } from '../sim/types';
import { yardSpot } from '../sim/warehouseLayout';
import type { World } from '../sim/world';
import type { FigureInput, FigureLayer } from './figures';
import { modelGeometry } from './models';
import { PANTS, SKIN } from './palette';

const DEALER_SHIRT = 0xdedad0;
const DEALER_VEST = 0x3f9a55;
const FIGHTER_SHIRT = 0x2d3238;
const FIGHTER_VEST = 0x2f6b3f;
const GANG_SHIRT = 0x8a3a2a;
const GANG_VEST = 0x5e2418;
const OWN_UMBRELLA = 0x3f8f55;
const GANG_UMBRELLA = 0xb03a2e;
const RING_SEGMENTS = 20;
const MAX_VISIBLE_FIGHTERS = 42;

export class PeopleLayer {
  readonly group = new Group();
  private stands: InstancedMesh;
  private umbrellas: InstancedMesh;
  private carts: InstancedMesh[];
  private ring: InstancedMesh;
  private m = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3(1, 1, 1);
  private c = new Color();
  private up = new Vector3(0, 1, 0);
  private fig: FigureInput = {
    x: 0, z: 0, ang: 0, moving: false, phase: 0, scale: 1, shirt: 0, pants: 0, skin: 0, vest: 0, tray: false, trayColor: 0,
  };

  constructor(private world: World, capacity: number) {
    const mat = new MeshLambertMaterial({ vertexColors: true });
    this.stands = new InstancedMesh(modelGeometry('stand'), mat, capacity);
    this.umbrellas = new InstancedMesh(modelGeometry('umbrella'), mat, capacity);
    this.umbrellas.setColorAt(0, this.c.setHex(OWN_UMBRELLA));
    this.carts = [new InstancedMesh(modelGeometry('handcart'), mat, capacity), new InstancedMesh(modelGeometry('cargobike'), mat, capacity)];
    this.ring = new InstancedMesh(new BoxGeometry(0.1, 0.02, 0.05), new MeshBasicMaterial({ color: 0xffffff }), capacity * RING_SEGMENTS);
    this.ring.setColorAt(0, this.c.setHex(0xffffff));
    for (const im of [this.stands, this.umbrellas, ...this.carts, this.ring]) {
      im.instanceMatrix.setUsage(DynamicDrawUsage);
      im.castShadow = im !== this.ring;
      im.frustumCulled = false;
      im.count = 0;
      this.group.add(im);
    }
  }

  private addStand(n: number, x: number, z: number, scale: number, umbrella: number): void {
    this.q.setFromAxisAngle(this.up, 0);
    this.m.compose(this.p.set(x, 0.08, z + 0.36), this.q, this.s.set(scale, scale, scale));
    this.stands.setMatrixAt(n, this.m);
    this.m.compose(this.p.set(x + 0.2, 0.08, z + 0.12), this.q, this.s);
    this.umbrellas.setMatrixAt(n, this.m);
    this.umbrellas.setColorAt(n, this.c.setHex(umbrella));
    this.s.set(1, 1, 1);
  }

  update(state: GameState, alpha: number, simTime: number, figures: FigureLayer): void {
    const world = this.world;
    const f = this.fig;
    let ns = 0;
    let nr = 0;
    const nc = [0, 0];

    // Verkäufer
    for (const d of state.dealers) {
      const x = d.px + (d.x - d.px) * alpha;
      const z = d.py + (d.y - d.py) * alpha;
      const atStand = d.mode === 'setup' || d.mode === 'selling' || d.mode === 'packing';
      const walkingWithLoad = d.load.length > 0 && (d.mode === 'toSpot' || d.mode === 'loading');
      f.x = x;
      f.z = z;
      f.ang = atStand ? Math.PI / 2 : d.ang;
      f.moving = d.x !== d.px || d.y !== d.py;
      f.phase = simTime * 9 + d.id;
      f.scale = 1;
      f.shirt = DEALER_SHIRT;
      f.vest = DEALER_VEST;
      f.pants = PANTS[Math.floor(d.look * 31) % PANTS.length];
      f.skin = SKIN[Math.floor(d.look * 97) % SKIN.length];
      f.tray = walkingWithLoad && state.upgrade === 0;
      f.trayColor = d.load.length ? FRUITS[d.load[0].fruit].color : 0x999999;
      figures.add(f);
      if (walkingWithLoad && state.upgrade > 0) {
        const im = this.carts[Math.min(1, state.upgrade - 1)];
        const i = nc[Math.min(1, state.upgrade - 1)]++;
        this.q.setFromAxisAngle(this.up, Math.PI / 2 - f.ang);
        const ahead = state.upgrade === 1 ? 0.42 : 0.05;
        this.m.compose(this.p.set(x + Math.cos(f.ang) * ahead, 0.08, z + Math.sin(f.ang) * ahead), this.q, this.s);
        im.setMatrixAt(i, this.m);
      }
      if (atStand) {
        const k = d.mode === 'selling' ? 1 : Math.max(0.05, setupProgress(d));
        this.addStand(ns++, x, z, k, OWN_UMBRELLA);
        if (d.mode !== 'selling') {
          const prog = setupProgress(d);
          for (let i = 0; i < RING_SEGMENTS; i++) {
            const a = (i / RING_SEGMENTS) * Math.PI * 2 - Math.PI / 2;
            this.q.setFromAxisAngle(this.up, -a);
            this.m.compose(this.p.set(x + Math.cos(a) * 0.62, 0.12, z + 0.2 + Math.sin(a) * 0.62), this.q, this.s);
            this.ring.setMatrixAt(nr, this.m);
            this.ring.setColorAt(nr, this.c.setHex(i / RING_SEGMENTS < prog ? 0x2f7d4a : 0xd6dbd8));
            nr++;
          }
        }
      }
    }

    // Straßenkämpfer im Hof
    const shown = Math.min(MAX_VISIBLE_FIGHTERS, state.fighters + (state.battle?.result === 'running' ? 0 : 0));
    for (let i = 0; i < shown; i++) {
      const pos = yardSpot(world, i);
      f.x = pos.x;
      f.z = pos.y;
      f.ang = Math.PI / 2;
      f.moving = false;
      f.scale = 1.02;
      f.shirt = FIGHTER_SHIRT;
      f.vest = FIGHTER_VEST;
      f.pants = 0x24272b;
      f.skin = SKIN[(i * 7) % SKIN.length];
      f.tray = false;
      figures.add(f);
    }

    // Gemüsegang: Stände an den Plätzen und Leute am Schild
    for (const sp of world.spots) {
      const ds = state.districts[sp.districtIndex];
      if (ds.owner !== 'gang') continue;
      const x = sp.x + 0.5;
      const z = sp.y + 0.5;
      this.addStand(ns++, x, z, 1, GANG_UMBRELLA);
      f.x = x;
      f.z = z;
      f.ang = Math.PI / 2;
      f.moving = false;
      f.scale = 1;
      f.shirt = GANG_SHIRT;
      f.vest = GANG_VEST;
      f.pants = 0x2a2d31;
      f.skin = SKIN[(sp.index * 3) % SKIN.length];
      f.tray = false;
      figures.add(f);
    }
    for (let di = 0; di < state.districts.length; di++) {
      const ds = state.districts[di];
      if (ds.owner !== 'gang' || ds.gang <= 0) continue;
      const [lx, ly] = world.labels[di];
      const n = Math.min(5, Math.ceil(ds.gang / 5));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + di;
        f.x = lx + 0.5 + Math.cos(a) * 0.9;
        f.z = ly + 1.6 + Math.sin(a) * 0.6;
        f.ang = a + Math.PI;
        f.moving = false;
        f.scale = 1.03;
        f.shirt = GANG_SHIRT;
        f.vest = GANG_VEST;
        f.pants = 0x2a2d31;
        f.skin = SKIN[(i + di) % SKIN.length];
        f.tray = false;
        figures.add(f);
      }
    }

    this.stands.count = ns;
    this.umbrellas.count = ns;
    this.ring.count = nr;
    this.carts[0].count = nc[0];
    this.carts[1].count = nc[1];
    for (const im of [this.stands, this.umbrellas, this.ring, ...this.carts]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }
}
