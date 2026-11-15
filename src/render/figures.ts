// Einfache Menschen aus Körper, Kopf und Beinen als InstancedMeshes mit prozeduraler Laufanimation.
import { BoxGeometry, Color, DynamicDrawUsage, Group, InstancedMesh, Matrix4, MeshLambertMaterial, Quaternion, Vector3 } from 'three';

export const FIGURE_KIND = {
  PEDESTRIAN: 0,
  STAFF: 1,
  SCOUT: 2,
  INSPECTOR: 3,
  GANG: 4,
} as const;

export interface FigureInput {
  x: number;
  z: number;
  /** Blickrichtung in der Kartenebene (0 = Osten, π/2 = Süden) */
  ang: number;
  moving: boolean;
  /** Laufphase (fortlaufend) */
  phase: number;
  scale: number;
  shirt: number;
  pants: number;
  skin: number;
  /** Westenfarbe, 0 = keine */
  vest: number;
  /** Kiste vor dem Körper */
  tray: boolean;
  trayColor: number;
}

const LEG_H = 0.27;
const TORSO_H = 0.25;
const HEAD = 0.13;

export class FigureLayer {
  readonly group = new Group();
  private legs: InstancedMesh;
  private torso: InstancedMesh;
  private head: InstancedMesh;
  private vest: InstancedMesh;
  private tray: InstancedMesh;
  private count = 0;
  private vestCount = 0;
  private trayCount = 0;
  private m = new Matrix4();
  private m2 = new Matrix4();
  private q = new Quaternion();
  private p = new Vector3();
  private s = new Vector3();
  private c = new Color();
  private axisY = new Vector3(0, 1, 0);
  private axisX = new Vector3(1, 0, 0);

  constructor(readonly capacity: number) {
    const mat = new MeshLambertMaterial({ color: 0xffffff });
    const legGeo = new BoxGeometry(0.075, LEG_H, 0.09);
    legGeo.translate(0, -LEG_H / 2, 0);
    const torsoGeo = new BoxGeometry(0.22, TORSO_H, 0.13);
    const headGeo = new BoxGeometry(HEAD, HEAD, HEAD);
    const vestGeo = new BoxGeometry(0.235, 0.17, 0.145);
    // Getragene Kiste vor dem Körper
    const trayGeo = new BoxGeometry(0.26, 0.17, 0.2);
    this.legs = new InstancedMesh(legGeo, mat, capacity * 2);
    this.torso = new InstancedMesh(torsoGeo, mat, capacity);
    this.head = new InstancedMesh(headGeo, mat, capacity);
    this.vest = new InstancedMesh(vestGeo, mat, capacity);
    this.tray = new InstancedMesh(trayGeo, mat, capacity);
    for (const im of [this.legs, this.torso, this.head, this.vest, this.tray]) {
      im.instanceMatrix.setUsage(DynamicDrawUsage);
      im.castShadow = true;
      im.frustumCulled = false;
      im.count = 0;
      // Farbpuffer anlegen
      im.setColorAt(0, this.c.setHex(0xffffff));
      this.group.add(im);
    }
  }

  begin(): void {
    this.count = 0;
    this.vestCount = 0;
    this.trayCount = 0;
  }

  add(f: FigureInput): void {
    if (this.count >= this.capacity) return;
    const i = this.count++;
    const { m, m2, q, p, s, c } = this;
    const yaw = Math.PI / 2 - f.ang;
    const sc = f.scale;
    const swing = f.moving ? Math.sin(f.phase) * 0.55 : 0;
    const bob = f.moving ? Math.abs(Math.cos(f.phase)) * 0.025 : 0;
    const hip = (LEG_H + bob) * sc;
    q.setFromAxisAngle(this.axisY, yaw);
    // Körper
    m.compose(p.set(f.x, hip + (TORSO_H / 2) * sc, f.z), q, s.set(sc, sc, sc));
    this.torso.setMatrixAt(i, m);
    this.torso.setColorAt(i, c.setHex(f.shirt));
    m.compose(p.set(f.x, hip + (TORSO_H + HEAD / 2 + 0.005) * sc, f.z), q, s);
    this.head.setMatrixAt(i, m);
    this.head.setColorAt(i, c.setHex(f.skin));
    // Beine: um die Hüfte schwingen
    for (let k = 0; k < 2; k++) {
      const side = k === 0 ? -0.055 : 0.055;
      m.compose(p.set(f.x, hip, f.z), q, s);
      m2.makeTranslation(side, 0, 0);
      m.multiply(m2);
      m2.makeRotationAxis(this.axisX, k === 0 ? swing : -swing);
      m.multiply(m2);
      this.legs.setMatrixAt(i * 2 + k, m);
      this.legs.setColorAt(i * 2 + k, c.setHex(f.pants));
    }
    if (f.vest) {
      const j = this.vestCount++;
      m.compose(p.set(f.x, hip + (TORSO_H - 0.085 - 0.01) * sc, f.z), q, s);
      this.vest.setMatrixAt(j, m);
      this.vest.setColorAt(j, c.setHex(f.vest));
    }
    if (f.tray) {
      const j = this.trayCount++;
      m.compose(p.set(f.x, hip + 0.1 * sc, f.z), q, s);
      m2.makeTranslation(0, 0, 0.17);
      m.multiply(m2);
      this.tray.setMatrixAt(j, m);
      this.tray.setColorAt(j, c.setHex(f.trayColor));
    }
  }

  end(): void {
    this.torso.count = this.count;
    this.head.count = this.count;
    this.legs.count = this.count * 2;
    this.vest.count = this.vestCount;
    this.tray.count = this.trayCount;
    for (const im of [this.legs, this.torso, this.head, this.vest, this.tray]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }

  get drawCalls(): number {
    let n = 0;
    for (const im of [this.legs, this.torso, this.head, this.vest, this.tray]) if (im.count > 0) n++;
    return n;
  }
}
