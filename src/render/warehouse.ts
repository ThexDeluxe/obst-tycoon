// Aufgeschnittenes Lagerhaus: kein Dach, halbhohe Wände, Räume mit Einrichtung,
// Regale zeigen ihren Füllstand als Kistenstapel in den Farben der Produkte.
import { Color, DynamicDrawUsage, Group, InstancedMesh, Matrix4, Mesh, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import { PRODUCTS, ROOMS, WAREHOUSE, type ProductId } from '../data/balance';
import type { Room, WarehouseState } from '../sim/types';
import { ROOM_H, ROOM_W, SECTION_H, SECTION_W, sectionOrigin, slotRect } from '../sim/warehouseLayout';
import type { World } from '../sim/world';
import { Batcher } from './batcher';
import type { FigureInput } from './figures';
import { PAL } from './palette';

const FLOOR_Y = 0.08;
const WALL_H = 0.9;
const WALL_T = 0.12;
const CRATE = { w: 0.44, h: 0.27, d: 0.34 };

export interface CrateView {
  product: ProductId;
  /** Füllgrad 0..1 (Teilkisten sind niedriger gefüllt) */
  fill: number;
}

export class WarehouseView {
  readonly group = new Group();
  private staticMesh: Mesh | null = null;
  private signature = '';
  private crateBody: InstancedMesh;
  private crateTop: InstancedMesh;
  private mat = new MeshLambertMaterial({ vertexColors: true });
  /** Kistenplätze je Raum, in Weltkoordinaten */
  private crateSlots: { x: number; y: number; z: number; cooled: boolean }[] = [];
  private m = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3();
  private c = new Color();
  officeWorkers: FigureInput[] = [];

  constructor(private world: World) {
    const body = new Batcher().color(PAL.crateWood);
    body.box(-CRATE.w / 2, 0, -CRATE.d / 2, CRATE.w / 2, CRATE.h, CRATE.d / 2);
    body.color(0x8e6a42);
    body.box(-CRATE.w / 2 - 0.005, 0.1, -CRATE.d / 2 - 0.005, CRATE.w / 2 + 0.005, 0.14, CRATE.d / 2 + 0.005);
    const top = new Batcher().color(0xffffff);
    top.box(-CRATE.w / 2 + 0.04, 0, -CRATE.d / 2 + 0.04, CRATE.w / 2 - 0.04, 0.05, CRATE.d / 2 - 0.04);
    this.crateBody = new InstancedMesh(body.build(), this.mat, 200);
    this.crateTop = new InstancedMesh(top.build(), new MeshLambertMaterial({ color: 0xffffff }), 200);
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

  private sig(wh: WarehouseState): string {
    return `${wh.sections}|${wh.rooms.map((r) => `${r.slot}:${r.type}:${r.level}:${r.buildTicks > 0 ? 1 : 0}`).join(',')}`;
  }

  /** Baut die feste Geometrie neu, wenn sich Abschnitte oder Räume geändert haben. */
  sync(wh: WarehouseState): void {
    const sig = this.sig(wh);
    if (sig === this.signature) return;
    this.signature = sig;
    if (this.staticMesh) {
      this.group.remove(this.staticMesh);
      this.staticMesh.geometry.dispose();
    }
    const b = new Batcher();
    this.crateSlots = [];
    this.officeWorkers = [];
    const world = this.world;
    const built = (s: number) => s < wh.sections;
    const roomAt = new Map<number, Room>();
    for (const r of wh.rooms) roomAt.set(r.slot, r);

    for (let s = 0; s < 4; s++) {
      const o = sectionOrigin(world, s);
      if (!built(s)) {
        // Erweiterungsfläche: Eckmarkierungen
        b.color(PAL.site);
        const y = 0.065;
        for (const [cx, cz] of [[o.x, o.y], [o.x + SECTION_W, o.y], [o.x, o.y + SECTION_H], [o.x + SECTION_W, o.y + SECTION_H]]) {
          b.flat(cx - 0.3 + (cx > o.x ? 0 : 0.3), cz - 0.04, cx + (cx > o.x ? 0 : 0.3), cz + 0.04, y);
          b.flat(cx - 0.04, cz - 0.3 + (cz > o.y ? 0 : 0.3), cx + 0.04, cz + (cz > o.y ? 0 : 0.3), y);
        }
        continue;
      }
      // Boden
      b.color(PAL.whFloor);
      b.box(o.x, 0, o.y, o.x + SECTION_W, FLOOR_Y, o.y + SECTION_H);
      // Außenwände, wo kein gebauter Nachbarabschnitt anschließt
      const right = s % 2 === 0 && built(s + 1);
      const left = s % 2 === 1 && built(s - 1);
      const below = s < 2 && built(s + 2);
      const above = s >= 2 && built(s - 2);
      const x0 = o.x, z0 = o.y, x1 = o.x + SECTION_W, z1 = o.y + SECTION_H;
      const wall = (ax: number, az: number, bx: number, bz: number) => {
        b.color(PAL.whWall);
        b.box(ax, FLOOR_Y, az, bx, WALL_H, bz);
        b.color(PAL.whWallTop);
        b.box(ax - 0.01, WALL_H, az - 0.01, bx + 0.01, WALL_H + 0.04, bz + 0.01);
      };
      if (!above) {
        if (s === 0) {
          // Tor zur Straße
          const dx = world.warehouse.doorX;
          wall(x0, z0, dx, z0 + WALL_T);
          wall(dx + 1, z0, x1, z0 + WALL_T);
          b.color(0x6a7178);
          b.box(dx - 0.05, FLOOR_Y, z0, dx, 1.3, z0 + WALL_T);
          b.box(dx + 1, FLOOR_Y, z0, dx + 1.05, 1.3, z0 + WALL_T);
          b.box(dx - 0.05, 1.22, z0, dx + 1.05, 1.32, z0 + WALL_T);
        } else wall(x0, z0, x1, z0 + WALL_T);
      }
      if (!below) wall(x0, z1 - WALL_T, x1, z1);
      if (!left) wall(x0, z0, x0 + WALL_T, z1);
      if (!right) wall(x1 - WALL_T, z0, x1, z1);
      // Trennwände zwischen den Räumen mit Durchgängen
      b.color(PAL.whInner);
      const ih = 0.55;
      const mx = x0 + ROOM_W;
      b.box(mx - 0.04, FLOOR_Y, z0 + WALL_T, mx + 0.04, ih, z0 + 0.6);
      b.box(mx - 0.04, FLOOR_Y, z0 + 1.4, mx + 0.04, ih, z0 + ROOM_H + 0.6);
      b.box(mx - 0.04, FLOOR_Y, z0 + ROOM_H + 1.4, mx + 0.04, ih, z1 - WALL_T);
      const mz = z0 + ROOM_H;
      b.box(x0 + WALL_T, FLOOR_Y, mz - 0.04, x0 + 1.1, ih, mz + 0.04);
      b.box(x0 + 1.9, FLOOR_Y, mz - 0.04, x0 + ROOM_W + 1.1, ih, mz + 0.04);
      b.box(x0 + ROOM_W + 1.9, FLOOR_Y, mz - 0.04, x1 - WALL_T, ih, mz + 0.04);

      for (let k = 0; k < WAREHOUSE.slotsPerSection; k++) {
        const slot = s * WAREHOUSE.slotsPerSection + k;
        const r = slotRect(world, slot);
        const room = roomAt.get(slot);
        this.buildRoom(b, r, room);
      }
    }
    this.staticMesh = new Mesh(b.build(), this.mat);
    this.staticMesh.castShadow = true;
    this.staticMesh.receiveShadow = true;
    this.group.add(this.staticMesh);
  }

  private buildRoom(b: Batcher, r: { x: number; y: number; w: number; h: number }, room: Room | undefined): void {
    const fy = FLOOR_Y + 0.002;
    const inset = 0.14;
    const rx0 = r.x + inset, rz0 = r.y + inset, rx1 = r.x + r.w - inset, rz1 = r.y + r.h - inset;
    if (!room) {
      b.color(0xc4c7c5);
      b.flat(rx0, rz0, rx1, rz1, fy);
      return;
    }
    if (room.buildTicks > 0) {
      b.color(0xcfc8b8);
      b.flat(rx0, rz0, rx1, rz1, fy);
      b.color(PAL.site);
      for (const [px, pz] of [[rx0 + 0.1, rz0 + 0.1], [rx1 - 0.1, rz0 + 0.1], [rx0 + 0.1, rz1 - 0.1], [rx1 - 0.1, rz1 - 0.1]]) {
        b.box(px - 0.04, fy, pz - 0.04, px + 0.04, 0.5, pz + 0.04);
      }
      b.box(rx0 + 0.1, 0.4, rz0 + 0.08, rx1 - 0.1, 0.45, rz0 + 0.12);
      b.box(rx0 + 0.1, 0.4, rz1 - 0.12, rx1 - 0.1, 0.45, rz1 - 0.08);
      b.color(0xbfa77f);
      b.box(rx0 + 0.5, fy, rz0 + 0.5, rx0 + 1.3, 0.35, rz0 + 1.0);
      b.color(0x9a9a96);
      b.box(rx1 - 1.1, fy, rz1 - 0.8, rx1 - 0.4, 0.22, rz1 - 0.35);
      return;
    }
    const def = ROOMS[room.type];
    switch (room.type) {
      case 'office': {
        b.color(PAL.whOffice);
        b.flat(rx0, rz0, rx1, rz1, fy);
        const desks = Math.min(4, room.level);
        for (let i = 0; i < desks; i++) {
          const dx = rx0 + 0.25 + (i % 2) * 1.35;
          const dz = rz0 + 0.25 + Math.floor(i / 2) * 0.8;
          b.color(PAL.desk);
          b.box(dx, 0.36, dz, dx + 0.9, 0.42, dz + 0.42);
          b.box(dx + 0.04, fy, dz + 0.04, dx + 0.1, 0.36, dz + 0.38);
          b.box(dx + 0.8, fy, dz + 0.04, dx + 0.86, 0.36, dz + 0.38);
          b.color(0x2f3540);
          b.box(dx + 0.35, 0.42, dz + 0.06, dx + 0.6, 0.6, dz + 0.1);
          b.color(PAL.chair);
          b.box(dx + 0.32, 0.18, dz + 0.5, dx + 0.6, 0.24, dz + 0.74);
          this.officeWorkers.push({
            x: dx + 0.46,
            z: dz + 0.62,
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
        }
        b.color(0x8f969c);
        b.box(rx1 - 0.35, fy, rz1 - 0.45, rx1 - 0.05, 0.75, rz1 - 0.05);
        break;
      }
      case 'shelf':
      case 'coldroom': {
        b.color(room.type === 'coldroom' ? PAL.whCold : 0xd9dbd8);
        b.flat(rx0, rz0, rx1, rz1, fy);
        if (room.type === 'coldroom') {
          b.color(0xeaf3f7);
          b.box(rx0, fy, rz0, rx1, 0.7, rz0 + 0.05);
          b.box(rx0, fy, rz0, rx0 + 0.05, 0.7, rz1);
          b.box(rx1 - 0.05, fy, rz0, rx1, 0.7, rz1);
          b.color(0x9fb4bf);
          b.box(rx0 + 0.2, 0.62, rz0 + 0.06, rx0 + 0.8, 0.7, rz0 + 0.3);
        }
        const perLevel = def.crates / 2;
        const rackX0 = r.x + 0.25;
        const rackX1 = r.x + r.w - 0.25;
        const rz = r.y + 0.22;
        const depth = 0.42;
        b.color(PAL.rack);
        const levels = [fy + 0.04, 0.42];
        for (const ly of levels) b.box(rackX0, ly, rz, rackX1, ly + 0.03, rz + depth);
        for (const px of [rackX0, (rackX0 + rackX1) / 2, rackX1 - 0.04]) {
          b.box(px, fy, rz, px + 0.04, 0.82, rz + 0.04);
          b.box(px, fy, rz + depth - 0.04, px + 0.04, 0.82, rz + depth);
        }
        const step = (rackX1 - rackX0) / perLevel;
        for (let lv = 0; lv < 2; lv++) {
          for (let i = 0; i < perLevel; i++) {
            this.crateSlots.push({ x: rackX0 + step * (i + 0.5), y: levels[lv] + 0.03, z: rz + depth / 2, cooled: def.cooled });
          }
        }
        break;
      }
      case 'ramp': {
        b.color(0xb9b6ad);
        b.box(rx0, fy, rz0 + 0.6, rx1, 0.3, rz1);
        b.color(PAL.site);
        b.box(rx0, 0.3, rz0 + 0.6, rx1, 0.31, rz0 + 0.68);
        b.color(PAL.crateWood);
        b.box(rx0 + 0.3, 0.3, rz0 + 0.9, rx0 + 1.1, 0.38, rz0 + 1.5);
        break;
      }
      case 'radio': {
        b.color(0xd8d4c8);
        b.flat(rx0, rz0, rx1, rz1, fy);
        b.color(PAL.desk);
        b.box(rx0 + 0.3, 0.36, rz0 + 0.2, rx0 + 1.8, 0.42, rz0 + 0.65);
        b.color(0x30363d);
        b.box(rx0 + 0.45, 0.42, rz0 + 0.25, rx0 + 0.95, 0.65, rz0 + 0.55);
        b.box(rx0 + 1.1, 0.42, rz0 + 0.25, rx0 + 1.6, 0.58, rz0 + 0.55);
        b.color(0x8a9096);
        b.cylinder(rx1 - 0.3, rz0 + 0.3, fy, 2.6, 0.04, 5);
        b.box(rx1 - 0.6, 2.2, rz0 + 0.27, rx1, 2.25, rz0 + 0.33);
        break;
      }
    }
  }

  /** Belegt die Kistenplätze in Reihenfolge der Räume mit den Kisten aus dem Lager. */
  updateCrates(regular: CrateView[], cooled: CrateView[]): void {
    let n = 0;
    let ri = 0;
    let ci = 0;
    for (const slot of this.crateSlots) {
      const crate = slot.cooled ? cooled[ci++] : regular[ri++];
      if (!crate) continue;
      this.q.identity();
      this.m.compose(this.p.set(slot.x, slot.y, slot.z), this.q, this.s.set(1, 1, 1));
      this.crateBody.setMatrixAt(n, this.m);
      const fy = 0.04 + Math.max(0.15, crate.fill) * (CRATE.h - 0.06);
      this.m.compose(this.p.set(slot.x, slot.y + fy, slot.z), this.q, this.s);
      this.crateTop.setMatrixAt(n, this.m);
      this.crateTop.setColorAt(n, this.c.setHex(PRODUCTS[crate.product].color));
      n++;
    }
    this.crateBody.count = n;
    this.crateTop.count = n;
    this.crateBody.instanceMatrix.needsUpdate = true;
    this.crateTop.instanceMatrix.needsUpdate = true;
    if (this.crateTop.instanceColor) this.crateTop.instanceColor.needsUpdate = true;
  }
}
