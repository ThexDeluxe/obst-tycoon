// Isometrische Kamera: OrthographicCamera, 45° um die Hochachse gedreht und etwa 35° geneigt.
// Zoom in Stufen, Verschieben, Drehen in 90°-Schritten, Verfolgen einer Person.
import { MathUtils, OrthographicCamera, Vector3 } from 'three';
import { CAMERA } from '../data/balance';

export class CameraRig {
  readonly camera: OrthographicCamera;
  readonly target = new Vector3();
  zoomIndex = CAMERA.defaultZoomIndex;
  private zoom: number = CAMERA.zoomLevels[CAMERA.defaultZoomIndex];
  private rotIndex = 0;
  private yaw = MathUtils.degToRad(CAMERA.baseYawDegrees);
  private pitch = MathUtils.degToRad(CAMERA.tiltDegrees);
  private aspect = 1;
  private viewH = 1;
  /** Liefert die Position der verfolgten Person oder null */
  follow: (() => { x: number; y: number } | null) | null = null;
  private tmp = new Vector3();

  constructor(private mapW: number, private mapH: number) {
    this.camera = new OrthographicCamera(-1, 1, 1, -1, -200, 400);
  }

  setViewport(w: number, h: number): void {
    this.aspect = w / Math.max(1, h);
    this.viewH = h;
    this.applyProjection();
  }

  private applyProjection(): void {
    const half = this.zoom / 2;
    this.camera.top = half;
    this.camera.bottom = -half;
    this.camera.left = -half * this.aspect;
    this.camera.right = half * this.aspect;
    this.camera.updateProjectionMatrix();
  }

  get visibleHeight(): number {
    return this.zoom;
  }

  get visibleWidth(): number {
    return this.zoom * this.aspect;
  }

  zoomStep(dir: number): void {
    this.zoomIndex = MathUtils.clamp(this.zoomIndex + dir, 0, CAMERA.zoomLevels.length - 1);
  }

  rotate(dir: number): void {
    this.rotIndex = (this.rotIndex + dir + 4) % 4;
  }

  get rotation(): number {
    return this.rotIndex;
  }

  /** Bodenrichtungen der Bildschirmachsen */
  private axes() {
    const rx = Math.cos(this.yaw);
    const rz = -Math.sin(this.yaw);
    const fx = -Math.sin(this.yaw);
    const fz = -Math.cos(this.yaw);
    return { rx, rz, fx, fz };
  }

  /** Verschiebt die Ansicht um Bildschirmpixel (Ziehen mit Finger oder Maus) */
  panPixels(dx: number, dy: number): void {
    const upp = this.zoom / Math.max(1, this.viewH);
    const { rx, rz, fx, fz } = this.axes();
    const gy = (dy * upp) / Math.sin(this.pitch);
    this.target.x += -rx * dx * upp + fx * gy;
    this.target.z += -rz * dx * upp + fz * gy;
    this.follow = null;
    this.clamp();
  }

  /** Verschiebt in Bildschirmrichtung um Felder (Tastatur) */
  panUnits(right: number, forward: number): void {
    const { rx, rz, fx, fz } = this.axes();
    this.target.x += rx * right + fx * forward;
    this.target.z += rz * right + fz * forward;
    if (right || forward) this.follow = null;
    this.clamp();
  }

  lookAt(x: number, z: number): void {
    this.target.set(x, 0, z);
    this.clamp();
  }

  private clamp(): void {
    this.target.x = MathUtils.clamp(this.target.x, 0, this.mapW);
    this.target.z = MathUtils.clamp(this.target.z, 0, this.mapH);
  }

  update(dt: number): void {
    const k = 1 - Math.exp(-dt * 12);
    const targetZoom = CAMERA.zoomLevels[this.zoomIndex];
    if (Math.abs(this.zoom - targetZoom) > 0.001) {
      this.zoom += (targetZoom - this.zoom) * k;
      if (Math.abs(this.zoom - targetZoom) < 0.01) this.zoom = targetZoom;
      this.applyProjection();
    }
    const targetYaw = MathUtils.degToRad(CAMERA.baseYawDegrees + this.rotIndex * 90);
    let d = targetYaw - this.yaw;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    this.yaw += d * k;
    if (this.follow) {
      const p = this.follow();
      if (p) {
        const f = 1 - Math.exp(-dt * 6);
        this.target.x += (p.x - this.target.x) * f;
        this.target.z += (p.y - this.target.z) * f;
        this.clamp();
      } else this.follow = null;
    }
    const dist = 120;
    this.tmp.set(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch));
    this.camera.position.copy(this.target).addScaledVector(this.tmp, dist);
    this.camera.lookAt(this.target);
  }
}
