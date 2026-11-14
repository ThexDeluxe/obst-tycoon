// Autos und Busse zur Optik. Die Position folgt der Route, die Fahrzeuge halten sich rechts.
import { Color, DynamicDrawUsage, Group, InstancedMesh, Matrix4, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import type { Vehicle } from '../sim/types';
import { routePoint, type World } from '../sim/world';
import { modelGeometry } from './models';
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
    this.cars = new InstancedMesh(modelGeometry('car'), mat, capacity);
    this.buses = new InstancedMesh(modelGeometry('bus'), mat, 8);
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
