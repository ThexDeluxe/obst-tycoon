// Autos und Busse zur Optik. Die Position folgt der Route, die Fahrzeuge halten sich rechts.
import { Color, DynamicDrawUsage, Group, InstancedMesh, Matrix4, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import type { Vehicle } from '../sim/types';
import { routePoint, type World } from '../sim/world';
import { Batcher } from './batcher';
import { CAR_COLORS } from './palette';

const pA = { x: 0, y: 0, dx: 0, dy: 0 };
const pB = { x: 0, y: 0, dx: 0, dy: 0 };

export class VehicleLayer {
  readonly group = new Group();
  private cars: InstancedMesh;
  private buses: InstancedMesh;
  private m = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3(1, 1, 1);
  private c = new Color();
  private up = new Vector3(0, 1, 0);

  constructor(capacity: number) {
    const mat = new MeshLambertMaterial({ vertexColors: true });
    // Auto, Fahrtrichtung entlang +Z
    const car = new Batcher();
    car.color(0xffffff);
    car.box(-0.22, 0.1, -0.45, 0.22, 0.34, 0.45);
    car.color(0x39434c);
    car.box(-0.2, 0.34, -0.25, 0.2, 0.55, 0.2);
    car.color(0x22262a);
    for (const [x, z] of [[-0.23, -0.28], [0.23, -0.28], [-0.23, 0.28], [0.23, 0.28]]) car.box(x - 0.03, 0, z - 0.09, x + 0.03, 0.17, z + 0.09);
    car.color(0xfff4d0);
    car.box(-0.18, 0.2, 0.45, -0.08, 0.26, 0.46);
    car.box(0.08, 0.2, 0.45, 0.18, 0.26, 0.46);
    // Bus
    const bus = new Batcher();
    bus.color(0xe8e2d0);
    bus.box(-0.3, 0.12, -1.0, 0.3, 0.82, 1.0);
    bus.color(0x2f5d7c);
    bus.box(-0.305, 0.12, -1.0, 0.305, 0.3, 1.0);
    bus.color(0x39434c);
    bus.box(-0.31, 0.45, -0.9, 0.31, 0.72, 0.95);
    bus.box(-0.25, 0.42, 1.0, 0.25, 0.75, 1.01);
    bus.color(0x22262a);
    for (const [x, z] of [[-0.3, -0.65], [0.3, -0.65], [-0.3, 0.65], [0.3, 0.65]]) bus.box(x - 0.03, 0, z - 0.12, x + 0.03, 0.22, z + 0.12);
    this.cars = new InstancedMesh(car.build(), mat, capacity);
    this.buses = new InstancedMesh(bus.build(), mat, 8);
    for (const im of [this.cars, this.buses]) {
      im.instanceMatrix.setUsage(DynamicDrawUsage);
      im.castShadow = true;
      im.receiveShadow = true;
      im.frustumCulled = false;
      im.count = 0;
      im.setColorAt(0, this.c.setHex(0xffffff));
      this.group.add(im);
    }
  }

  update(world: World, vehicles: Vehicle[], alpha: number): void {
    let nc = 0;
    let nb = 0;
    for (const v of vehicles) {
      const route = v.kind === 'bus' ? world.busRoutes[v.route] : world.carRoutes[v.route];
      if (!route) continue;
      const s = v.ps + (v.s - v.ps) * alpha;
      // Richtung aus einem kleinen Vor- und Rückblick, damit Kurven weich wirken
      routePoint(route, s - 0.5, pA);
      routePoint(route, s + 0.5, pB);
      let dx = pB.x - pA.x;
      let dy = pB.y - pA.y;
      const l = Math.hypot(dx, dy) || 1;
      dx /= l;
      dy /= l;
      const cx = (pA.x + pB.x) / 2;
      const cy = (pA.y + pB.y) / 2;
      // Rechtsverkehr: halbe Fahrbahn nach rechts versetzt
      const x = cx - dy * 0.5;
      const z = cy + dx * 0.5;
      const yaw = Math.atan2(dx, dy);
      this.q.setFromAxisAngle(this.up, yaw);
      this.m.compose(this.p.set(x, 0, z), this.q, this.s);
      if (v.kind === 'bus') {
        this.buses.setMatrixAt(nb++, this.m);
      } else {
        this.cars.setMatrixAt(nc, this.m);
        this.cars.setColorAt(nc, this.c.setHex(CAR_COLORS[v.color % CAR_COLORS.length]));
        nc++;
      }
    }
    this.cars.count = nc;
    this.buses.count = nb;
    for (const im of [this.cars, this.buses]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }
}
