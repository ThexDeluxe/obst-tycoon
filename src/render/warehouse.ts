// Geräumiges, aufgeschnittenes Lagerhaus: kein Dach, halbhohe Wände, Regale mit Kistenstapeln in den
// Farben der Sorten, freie Regalplätze am Boden markiert. Daneben der Hof für die Straßenkämpfer.
import { Color, DynamicDrawUsage, Group, InstancedMesh, Matrix4, Mesh, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import { FRUITS, SHELVES, type FruitId } from '../data/balance';
import { SHELF_W, shelfRect } from '../sim/warehouseLayout';
import type { World } from '../sim/world';
import { Batcher } from './batcher';
import type { FigureInput } from './figures';
import { PAL } from './palette';

const FLOOR_Y = 0.1;
const WALL_H = 1.1;
const WALL_T = 0.15;
const CRATE = { w: 0.5, h: 0.32, d: 0.42 };

export class WarehouseView {
  readonly group = new Group();
  private staticMesh: Mesh | null = null;
  private shelvesBuilt = -1;
  private crateBody: InstancedMesh;
  private crateTop: InstancedMesh;
  private mat = new MeshLambertMaterial({ vertexColors: true });
  private crateSlots: { x: number; y: number; z: number }[] = [];
  private m = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3(1, 1, 1);
  private c = new Color();
  officeWorkers: FigureInput[] = [];

  constructor(private world: World) {
    const body = new Batcher().color(PAL.crateWood);
    body.box(-CRATE.w / 2, 0, -CRATE.d / 2, CRATE.w / 2, CRATE.h, CRATE.d / 2);
    body.color(0x8e6a42);
    body.box(-CRATE.w / 2 - 0.005, 0.12, -CRATE.d / 2 - 0.005, CRATE.w / 2 + 0.005, 0.17, CRATE.d / 2 + 0.005);
    const top = new Batcher().color(0xffffff);
    top.box(-CRATE.w / 2 + 0.04, 0, -CRATE.d / 2 + 0.04, CRATE.w / 2 - 0.04, 0.07, CRATE.d / 2 - 0.04);
    const cap = world.warehouse.shelfSlots.length * SHELVES.cratesPerShelf;
    this.crateBody = new InstancedMesh(body.build(), this.mat, cap);
    this.crateTop = new InstancedMesh(top.build(), new MeshLambertMaterial({ color: 0xffffff }), cap);
    for (const im of [this.crateBody, this.crateTop]) {
      im.instanceMatrix.setUsage(DynamicDrawUsage);
      im.castShadow = true;
      im.receiveShadow = true;
      im.frustumCulled = false;
      im.count = 0;
      this.group.add(im);
    }
    this.crateTop.setColorAt(0, this.c.setHex(0xffffff));
  }

  /** Baut die feste Geometrie neu, wenn sich die Zahl der Regale geändert hat. */
  sync(shelves: number): void {
    if (shelves === this.shelvesBuilt) return;
    this.shelvesBuilt = shelves;
    if (this.staticMesh) {
      this.group.remove(this.staticMesh);
      this.staticMesh.geometry.dispose();
    }
    const world = this.world;
    const wh = world.warehouse;
    const hall = wh.hall;
    const b = new Batcher();
    this.crateSlots = [];
    this.officeWorkers = [];
    const x0 = hall.x, z0 = hall.y, x1 = hall.x + hall.w, z1 = hall.y + hall.h;

    // Hallenboden mit Markierungen
    b.color(PAL.whFloor);
    b.box(x0, 0, z0, x1, FLOOR_Y, z1);
    b.color(0xd9b13c);
    const fy = FLOOR_Y + 0.003;
    // Ladezone am Tor
    const lz0 = wh.doorX - 2, lz1 = wh.doorX + wh.doorWidth + 2;
    for (let x = lz0; x < lz1; x += 0.5) b.flat(x, z1 - 2.6, x + 0.22, z1 - 2.5, fy);
    b.flat(lz0, z1 - 2.6, lz0 + 0.08, z1 - 0.15, fy);
    b.flat(lz1 - 0.08, z1 - 2.6, lz1, z1 - 0.15, fy);
    // Gang zwischen den Regalreihen
    b.color(0xe7e9e6);
    for (const row of [34.4, 37.4]) b.flat(x0 + 0.3, row, x1 - 0.3, row + 0.06, fy);

    // Außenwände, halbhoch, mit breitem Tor
    const wall = (ax: number, az: number, bx: number, bz: number) => {
      b.color(PAL.whWall);
      b.box(ax, FLOOR_Y, az, bx, WALL_H, bz);
      b.color(PAL.whWallTop);
      b.box(ax - 0.01, WALL_H, az - 0.01, bx + 0.01, WALL_H + 0.05, bz + 0.01);
    };
    wall(x0, z0, x1, z0 + WALL_T);
    wall(x0, z0, x0 + WALL_T, z1);
    wall(x1 - WALL_T, z0, x1, z1);
    wall(x0, z1 - WALL_T, wh.doorX, z1);
    wall(wh.doorX + wh.doorWidth, z1 - WALL_T, x1, z1);
    b.color(0x6a7178);
    b.box(wh.doorX - 0.08, FLOOR_Y, z1 - WALL_T, wh.doorX, 1.6, z1);
    b.box(wh.doorX + wh.doorWidth, FLOOR_Y, z1 - WALL_T, wh.doorX + wh.doorWidth + 0.08, 1.6, z1);
    b.box(wh.doorX - 0.08, 1.5, z1 - WALL_T, wh.doorX + wh.doorWidth + 0.08, 1.62, z1);

    // Büro mit Glaswand
    const o = wh.office;
    b.color(PAL.whOffice);
    b.flat(o.x + WALL_T, o.y, o.x + o.w, o.y + o.h - WALL_T, FLOOR_Y + 0.004);
    b.color(PAL.glass);
    b.box(o.x + WALL_T, FLOOR_Y, o.y, o.x + o.w - 1.2, 0.95, o.y + 0.05);
    b.box(o.x + o.w - 0.05, FLOOR_Y, o.y, o.x + o.w, 0.95, o.y + o.h - WALL_T);
    b.color(PAL.desk);
    const dx = o.x + 0.7, dz = o.y + 1.4;
    b.box(dx, 0.42, dz, dx + 1.3, 0.48, dz + 0.55);
    b.box(dx + 0.05, FLOOR_Y, dz + 0.05, dx + 0.12, 0.42, dz + 0.5);
    b.box(dx + 1.18, FLOOR_Y, dz + 0.05, dx + 1.25, 0.42, dz + 0.5);
    b.color(0x2f3540);
    b.box(dx + 0.5, 0.48, dz + 0.08, dx + 0.85, 0.72, dz + 0.13);
    b.color(PAL.chair);
    b.box(dx + 0.5, 0.22, dz + 0.65, dx + 0.85, 0.28, dz + 0.95);
    b.color(0x8f969c);
    b.box(o.x + 0.25, FLOOR_Y, o.y + o.h - 0.75, o.x + 0.75, 0.95, o.y + o.h - 0.3);
    b.color(0x7a5a3c);
    b.cylinder(o.x + 3.4, o.y + 3.2, FLOOR_Y, 0.4, 0.15, 6);
    b.color(0x4f8a3c);
    b.cone(o.x + 3.4, o.y + 3.2, 0.35, 0.95, 0.25, 6);
    this.officeWorkers.push({
      x: dx + 0.67,
      z: dz + 0.8,
      ang: -Math.PI / 2,
      moving: false,
      phase: 0,
      scale: 0.95,
      shirt: 0xe8e4da,
      pants: 0x3d4452,
      skin: 0xe6b894,
      vest: 0,
      tray: false,
      trayColor: 0,
    });

    // Regale und freie Regalplätze
    for (let i = 0; i < wh.shelfSlots.length; i++) {
      const r = shelfRect(world, i);
      if (i < shelves) this.buildShelf(b, r.x, r.y);
      else {
        b.color(0xd9b13c);
        const t = 0.06;
        const ax = r.x + 0.15, az = r.y + 0.12, bx = r.x + SHELF_W - 0.15, bz = r.y + 0.88;
        for (let x = ax; x < bx; x += 0.36) {
          b.flat(x, az, Math.min(bx, x + 0.2), az + t, fy);
          b.flat(x, bz - t, Math.min(bx, x + 0.2), bz, fy);
        }
        b.flat(ax, az, ax + t, bz, fy);
        b.flat(bx - t, az, bx, bz, fy);
      }
    }

    // Gabelstapler
    const fx = x1 - 2.2, fz = z1 - 1.6;
    b.color(0xe0b030);
    b.box(fx - 0.35, 0.15, fz - 0.5, fx + 0.35, 0.65, fz + 0.4);
    b.color(0x2b2f33);
    b.box(fx - 0.3, 0.65, fz - 0.15, fx + 0.3, 1.15, fz + 0.35);
    b.box(fx - 0.3, FLOOR_Y, fz - 0.62, fx - 0.25, 1.4, fz - 0.55);
    b.box(fx + 0.25, FLOOR_Y, fz - 0.62, fx + 0.3, 1.4, fz - 0.55);
    b.color(0x55595e);
    b.box(fx - 0.22, FLOOR_Y + 0.02, fz - 1.15, fx - 0.14, FLOOR_Y + 0.07, fz - 0.55);
    b.box(fx + 0.14, FLOOR_Y + 0.02, fz - 1.15, fx + 0.22, FLOOR_Y + 0.07, fz - 0.55);
    b.color(0x22262a);
    for (const [wx, wz] of [[fx - 0.36, fz - 0.35], [fx + 0.36, fz - 0.35], [fx - 0.36, fz + 0.25], [fx + 0.36, fz + 0.25]]) b.box(wx - 0.05, 0, wz - 0.12, wx + 0.05, 0.25, wz + 0.12);

    this.buildYard(b);

    this.staticMesh = new Mesh(b.build(), this.mat);
    this.staticMesh.castShadow = true;
    this.staticMesh.receiveShadow = true;
    this.group.add(this.staticMesh);
  }

  private buildShelf(b: Batcher, x: number, z: number): void {
    const levels = [FLOOR_Y + 0.06, 0.62];
    const zd0 = z + 0.12, zd1 = z + 0.88;
    b.color(PAL.rack);
    for (const ly of levels) b.box(x + 0.1, ly, zd0, x + SHELF_W - 0.1, ly + 0.04, zd1);
    for (const px of [x + 0.1, x + SHELF_W / 2 - 0.03, x + SHELF_W - 0.16]) {
      b.box(px, FLOOR_Y, zd0, px + 0.06, 1.15, zd0 + 0.06);
      b.box(px, FLOOR_Y, zd1 - 0.06, px + 0.06, 1.15, zd1);
    }
    b.color(0xd96f2a);
    b.box(x + 0.1, 1.12, zd0, x + SHELF_W - 0.1, 1.16, zd0 + 0.04);
    b.box(x + 0.1, 1.12, zd1 - 0.04, x + SHELF_W - 0.1, 1.16, zd1);
    const per = SHELVES.cratesPerShelf / 2;
    for (const ly of levels) {
      for (let k = 0; k < per; k++) this.crateSlots.push({ x: x + 0.1 + ((SHELF_W - 0.2) / per) * (k + 0.5), y: ly + 0.04, z: z + 0.5 });
    }
  }

  private buildYard(b: Batcher): void {
    const y = this.world.warehouse.yard;
    const x0 = y.x, z0 = y.y, x1 = y.x + y.w, z1 = y.y + y.h;
    b.color(0x7d7f80);
    b.box(x0, 0, z0, x1, 0.09, z1);
    b.color(0xe9e6df);
    b.flat(x0 + 0.4, z0 + 0.6, x1 - 0.4, z0 + 0.66, 0.093);
    // Zaun mit Tor zur Straße
    b.color(PAL.fence);
    const gate0 = this.world.warehouse.yard.x + 2.5, gate1 = gate0 + 2;
    const fence = (ax: number, az: number, bx: number, bz: number) => {
      b.box(ax, 0.09, az, bx, 0.95, bz);
    };
    fence(x0, z0, x1, z0 + 0.06);
    fence(x1 - 0.06, z0, x1, z1);
    fence(x0, z0, x0 + 0.06, z1);
    fence(x0, z1 - 0.06, gate0, z1);
    fence(gate1, z1 - 0.06, x1, z1);
    // Sandsack, Bank, Reifen
    b.color(0x4a4f55);
    b.box(x1 - 1.4, 0.09, z0 + 0.4, x1 - 1.32, 1.6, z0 + 0.48);
    b.box(x1 - 0.5, 0.09, z0 + 0.4, x1 - 0.42, 1.6, z0 + 0.48);
    b.box(x1 - 1.4, 1.55, z0 + 0.4, x1 - 0.42, 1.63, z0 + 0.48);
    b.color(0x7a2c24);
    b.cylinder(x1 - 0.91, z0 + 0.44, 0.55, 1.4, 0.17, 8);
    b.color(PAL.wood);
    b.box(x0 + 0.4, 0.3, z1 - 1.0, x0 + 2.0, 0.36, z1 - 0.7);
    b.box(x0 + 0.5, 0.09, z1 - 0.95, x0 + 0.58, 0.3, z1 - 0.75);
    b.box(x0 + 1.82, 0.09, z1 - 0.95, x0 + 1.9, 0.3, z1 - 0.75);
    b.color(0x26292c);
    b.cylinder(x1 - 0.7, z1 - 0.8, 0.09, 0.3, 0.32, 10);
    b.cylinder(x1 - 0.7, z1 - 0.8, 0.3, 0.5, 0.32, 10);
  }

  /** Belegt die Kistenplätze der Regale mit den Kisten aus dem Lager. */
  updateCrates(fruits: FruitId[]): void {
    let n = 0;
    for (let i = 0; i < this.crateSlots.length && i < fruits.length; i++) {
      const slot = this.crateSlots[i];
      this.q.identity();
      this.m.compose(this.p.set(slot.x, slot.y, slot.z), this.q, this.s);
      this.crateBody.setMatrixAt(n, this.m);
      this.m.compose(this.p.set(slot.x, slot.y + CRATE.h - 0.02, slot.z), this.q, this.s);
      this.crateTop.setMatrixAt(n, this.m);
      this.crateTop.setColorAt(n, this.c.setHex(FRUITS[fruits[i]].color));
      n++;
    }
    this.crateBody.count = n;
    this.crateTop.count = n;
    this.crateBody.instanceMatrix.needsUpdate = true;
    this.crateTop.instanceMatrix.needsUpdate = true;
    if (this.crateTop.instanceColor) this.crateTop.instanceColor.needsUpdate = true;
  }

  /** Position für das Plus über dem nächsten freien Regalplatz */
  nextShelfAnchor(shelves: number): { x: number; y: number; z: number } | null {
    if (shelves >= this.world.warehouse.shelfSlots.length) return null;
    const r = shelfRect(this.world, shelves);
    return { x: r.x + SHELF_W / 2, y: 0.9, z: r.y + 0.5 };
  }
}
