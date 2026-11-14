// Sammelt Dreiecke mit Vertexfarben und Flächennormalen in einem Puffer,
// damit die feste Stadtgeometrie pro Kartenabschnitt ein einziges Mesh ergibt.
import { BufferAttribute, BufferGeometry, Color } from 'three';

export const FACE = {
  PX: 1,
  NX: 2,
  PY: 4,
  NY: 8,
  PZ: 16,
  NZ: 32,
  ALL: 63,
  SIDES: 1 | 2 | 16 | 32,
} as const;

const tmp = new Color();

export class Batcher {
  private pos: number[] = [];
  private nor: number[] = [];
  private col: number[] = [];
  private r = 1;
  private g = 1;
  private b = 1;

  get vertexCount(): number {
    return this.pos.length / 3;
  }

  color(hex: number): this {
    tmp.setHex(hex);
    this.r = tmp.r;
    this.g = tmp.g;
    this.b = tmp.b;
    return this;
  }

  /** Farbe heller oder dunkler machen (Faktor auf die lineare Farbe) */
  shade(f: number): this {
    this.r *= f;
    this.g *= f;
    this.b *= f;
    return this;
  }

  tri(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): void {
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l;
    ny /= l;
    nz /= l;
    this.pos.push(ax, ay, az, bx, by, bz, cx, cy, cz);
    this.nor.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    const { r, g, b } = this;
    this.col.push(r, g, b, r, g, b, r, g, b);
  }

  quad(
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
    cx: number, cy: number, cz: number,
    dx: number, dy: number, dz: number,
  ): void {
    this.tri(ax, ay, az, bx, by, bz, cx, cy, cz);
    this.tri(ax, ay, az, cx, cy, cz, dx, dy, dz);
  }

  /** Waagrechte Fläche nach oben */
  flat(x0: number, z0: number, x1: number, z1: number, y: number): void {
    this.quad(x0, y, z0, x0, y, z1, x1, y, z1, x1, y, z0);
  }

  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, faces: number = FACE.ALL): void {
    if (faces & FACE.PY) this.quad(x0, y1, z0, x0, y1, z1, x1, y1, z1, x1, y1, z0);
    if (faces & FACE.NY) this.quad(x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1);
    if (faces & FACE.PX) this.quad(x1, y0, z0, x1, y1, z0, x1, y1, z1, x1, y0, z1);
    if (faces & FACE.NX) this.quad(x0, y0, z1, x0, y1, z1, x0, y1, z0, x0, y0, z0);
    if (faces & FACE.PZ) this.quad(x1, y0, z1, x1, y1, z1, x0, y1, z1, x0, y0, z1);
    if (faces & FACE.NZ) this.quad(x0, y0, z0, x0, y1, z0, x1, y1, z0, x1, y0, z0);
  }

  /** Box um einen Mittelpunkt */
  cbox(cx: number, cy: number, cz: number, sx: number, sy: number, sz: number, faces: number = FACE.ALL): void {
    this.box(cx - sx / 2, cy - sy / 2, cz - sz / 2, cx + sx / 2, cy + sy / 2, cz + sz / 2, faces);
  }

  /** Satteldach über einem Rechteck, First entlang X (alongX) oder Z */
  gable(x0: number, z0: number, x1: number, z1: number, yb: number, rh: number, alongX: boolean, gableColor?: number): void {
    if (alongX) {
      const zm = (z0 + z1) / 2;
      const yr = yb + rh;
      this.quad(x0, yb, z0, x0, yr, zm, x1, yr, zm, x1, yb, z0);
      this.quad(x1, yb, z1, x1, yr, zm, x0, yr, zm, x0, yb, z1);
      if (gableColor !== undefined) this.color(gableColor);
      this.tri(x0, yb, z1, x0, yr, zm, x0, yb, z0);
      this.tri(x1, yb, z0, x1, yr, zm, x1, yb, z1);
    } else {
      const xm = (x0 + x1) / 2;
      const yr = yb + rh;
      this.quad(x0, yb, z1, xm, yr, z1, xm, yr, z0, x0, yb, z0);
      this.quad(x1, yb, z0, xm, yr, z0, xm, yr, z1, x1, yb, z1);
      if (gableColor !== undefined) this.color(gableColor);
      this.tri(x0, yb, z0, xm, yr, z0, x1, yb, z0);
      this.tri(x1, yb, z1, xm, yr, z1, x0, yb, z1);
    }
  }

  /** Senkrechtes Rechteck auf einer Wandseite (für Fenster und Türen) */
  wallQuad(side: 'px' | 'nx' | 'pz' | 'nz', fixed: number, a0: number, a1: number, y0: number, y1: number): void {
    const o = 0.012;
    switch (side) {
      case 'px':
        this.quad(fixed + o, y0, a0, fixed + o, y1, a0, fixed + o, y1, a1, fixed + o, y0, a1);
        break;
      case 'nx':
        this.quad(fixed - o, y0, a1, fixed - o, y1, a1, fixed - o, y1, a0, fixed - o, y0, a0);
        break;
      case 'pz':
        this.quad(a1, y0, fixed + o, a1, y1, fixed + o, a0, y1, fixed + o, a0, y0, fixed + o);
        break;
      case 'nz':
        this.quad(a0, y0, fixed - o, a0, y1, fixed - o, a1, y1, fixed - o, a1, y0, fixed - o);
        break;
    }
  }

  /** Einfacher Zylinder als Prisma */
  cylinder(cx: number, cz: number, y0: number, y1: number, r: number, seg = 8, cap = true): void {
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2;
      const a1 = ((i + 1) / seg) * Math.PI * 2;
      const x0 = cx + Math.cos(a0) * r, z0 = cz + Math.sin(a0) * r;
      const x1 = cx + Math.cos(a1) * r, z1 = cz + Math.sin(a1) * r;
      this.quad(x0, y0, z0, x0, y1, z0, x1, y1, z1, x1, y0, z1);
      if (cap) this.tri(cx, y1, cz, x1, y1, z1, x0, y1, z0);
    }
  }

  /** Kegel (für Bäume) */
  cone(cx: number, cz: number, y0: number, y1: number, r: number, seg = 7): void {
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2;
      const a1 = ((i + 1) / seg) * Math.PI * 2;
      this.tri(cx + Math.cos(a0) * r, y0, cz + Math.sin(a0) * r, cx, y1, cz, cx + Math.cos(a1) * r, y0, cz + Math.sin(a1) * r);
      this.tri(cx, y0, cz, cx + Math.cos(a0) * r, y0, cz + Math.sin(a0) * r, cx + Math.cos(a1) * r, y0, cz + Math.sin(a1) * r);
    }
  }

  build(): BufferGeometry {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(this.pos), 3));
    g.setAttribute('normal', new BufferAttribute(new Float32Array(this.nor), 3));
    g.setAttribute('color', new BufferAttribute(new Float32Array(this.col), 3));
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}
