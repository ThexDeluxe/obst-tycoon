// Eigene Leute: Figuren mit grüner Weste, sichtbare Ausrüstung, aufgebaute Stände mit Schirm
// und ein Fortschrittsring beim Auf- und Abbau.
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
import { EQUIPMENT_IDS, PRODUCTS, type EquipmentId } from '../data/balance';
import type { GameState, Person } from '../sim/types';
import { setupProgress } from '../sim/vendors';
import type { FigureInput, FigureLayer } from './figures';
import { modelGeometry } from './models';
import { PANTS, SKIN } from './palette';

const VEST = 0x3f9a55;
const SHIRT = 0xdedad0;
const UMBRELLA = 0x3f8f55;
const RING_SEGMENTS = 24;

export class StaffLayer {
  readonly group = new Group();
  private stands: InstancedMesh;
  private umbrellas: InstancedMesh;
  private equip: Record<string, InstancedMesh> = {};
  private ring: InstancedMesh;
  private m = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3(1, 1, 1);
  private c = new Color();
  private up = new Vector3(0, 1, 0);
  private fig: FigureInput = {
    x: 0, z: 0, ang: 0, moving: false, phase: 0, scale: 1, shirt: SHIRT, pants: 0, skin: 0, vest: VEST, tray: false, trayColor: 0,
  };

  constructor(capacity: number) {
    const mat = new MeshLambertMaterial({ vertexColors: true });
    this.stands = new InstancedMesh(modelGeometry('stand'), mat, capacity);
    this.umbrellas = new InstancedMesh(modelGeometry('umbrella'), mat, capacity);
    this.umbrellas.setColorAt(0, this.c.setHex(UMBRELLA));
    const all = [this.stands, this.umbrellas];
    for (const id of EQUIPMENT_IDS) {
      if (id === 'tray') continue;
      const im = new InstancedMesh(modelGeometry(id), mat, capacity);
      this.equip[id] = im;
      all.push(im);
    }
    const seg = new BoxGeometry(0.1, 0.02, 0.05);
    this.ring = new InstancedMesh(seg, new MeshBasicMaterial({ color: 0xffffff }), capacity * RING_SEGMENTS);
    this.ring.setColorAt(0, this.c.setHex(0xffffff));
    all.push(this.ring);
    for (const im of all) {
      im.instanceMatrix.setUsage(DynamicDrawUsage);
      im.castShadow = im !== this.ring;
      im.frustumCulled = false;
      im.count = 0;
      this.group.add(im);
    }
  }

  private mainProductColor(p: Person): number {
    let best = 0;
    let color = 0x999999;
    for (const c of p.cargo) {
      if (c.units > best) {
        best = c.units;
        color = PRODUCTS[c.product].color;
      }
    }
    return color;
  }

  /** Schreibt Figuren, Stände und Ausrüstung. Liefert die Positionen für die Auswahl. */
  update(state: GameState, alpha: number, simTime: number, figures: FigureLayer): void {
    let ns = 0;
    let nr = 0;
    const ne: Record<string, number> = {};
    for (const id of EQUIPMENT_IDS) ne[id] = 0;
    for (const p of state.staff) {
      const x = p.px + (p.x - p.px) * alpha;
      const z = p.py + (p.y - p.py) * alpha;
      const moving = p.x !== p.px || p.y !== p.py;
      const atStand = p.mode === 'setup' || p.mode === 'selling' || p.mode === 'packing';
      const f = this.fig;
      f.x = x;
      f.z = z;
      f.ang = atStand ? Math.PI / 2 : p.ang;
      f.moving = moving;
      f.phase = simTime * 9 + p.id;
      f.scale = 1;
      f.pants = PANTS[p.id % PANTS.length];
      f.skin = SKIN[(p.id * 7) % SKIN.length];
      f.tray = p.equipment === 'tray' && !atStand && p.cargo.length > 0;
      f.trayColor = this.mainProductColor(p);
      figures.add(f);

      const yaw = Math.PI / 2 - f.ang;
      this.q.setFromAxisAngle(this.up, yaw);
      if (atStand) {
        const k = p.mode === 'selling' ? 1 : Math.max(0.05, setupProgress(p));
        // Stand vor dem Verkäufer (in Blickrichtung Süden)
        this.m.compose(this.p.set(x, 0.07, z + 0.34), this.q, this.s.set(k, k, k));
        this.stands.setMatrixAt(ns, this.m);
        this.m.compose(this.p.set(x + 0.18, 0.07, z + 0.12), this.q, this.s.set(k, k, k));
        this.umbrellas.setMatrixAt(ns, this.m);
        this.umbrellas.setColorAt(ns, this.c.setHex(UMBRELLA));
        ns++;
        if (p.mode !== 'selling') {
          const prog = setupProgress(p);
          for (let i = 0; i < RING_SEGMENTS; i++) {
            const a = (i / RING_SEGMENTS) * Math.PI * 2 - Math.PI / 2;
            this.q.setFromAxisAngle(this.up, -a);
            this.m.compose(this.p.set(x + Math.cos(a) * 0.62, 0.1, z + 0.2 + Math.sin(a) * 0.62), this.q, this.s.set(1, 1, 1));
            this.ring.setMatrixAt(nr, this.m);
            this.ring.setColorAt(nr, this.c.setHex(i / RING_SEGMENTS < prog ? 0x2f7d4a : 0xd6dbd8));
            nr++;
          }
        }
      }
      const eq = p.equipment as EquipmentId;
      if (eq !== 'tray' && p.mode !== 'idle' && p.mode !== 'loading' && p.mode !== 'waitStock') {
        const im = this.equip[eq];
        const i = ne[eq]++;
        if (atStand) {
          this.q.setFromAxisAngle(this.up, 0);
          this.m.compose(this.p.set(x - 0.55, 0.07, z + 0.1), this.q, this.s.set(1, 1, 1));
        } else {
          this.q.setFromAxisAngle(this.up, yaw);
          const ahead = eq === 'handcart' ? 0.42 : eq === 'foodtruck' ? 0 : 0.05;
          this.m.compose(this.p.set(x + Math.cos(f.ang) * ahead, 0.07, z + Math.sin(f.ang) * ahead), this.q, this.s.set(1, 1, 1));
        }
        im.setMatrixAt(i, this.m);
      }
    }
    this.stands.count = ns;
    this.umbrellas.count = ns;
    this.ring.count = nr;
    for (const id of EQUIPMENT_IDS) if (this.equip[id]) this.equip[id].count = ne[id];
    for (const im of [this.stands, this.umbrellas, this.ring, ...Object.values(this.equip)]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }
}
