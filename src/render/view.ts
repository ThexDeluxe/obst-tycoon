// Darstellung: liest den Zustand der Simulation, interpoliert zwischen zwei Ticks und rendert.
import {
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PCFShadowMap,
  Plane,
  Raycaster,
  RingGeometry,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RENDER } from '../data/balance';
import type { GameState } from '../sim/types';
import type { World } from '../sim/world';
import { CameraRig } from './camera';
import { buildCity, type CityMeshes } from './city';
import { FigureLayer, type FigureInput } from './figures';
import { CLOTHES, PAL, PANTS, SKIN } from './palette';
import { VehicleLayer } from './vehicles';
import { WarehouseView } from './warehouse';

export interface ViewSettings {
  shadows: boolean;
  quality: 'low' | 'medium' | 'high';
}

export type PickResult =
  | { kind: 'ped'; id: number }
  | { kind: 'tile'; x: number; y: number }
  | null;

const tmpV = new Vector3();

export class GameView {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly rig: CameraRig;
  private sun: DirectionalLight;
  private hemi: HemisphereLight;
  private city: CityMeshes;
  readonly warehouse: WarehouseView;
  private figures: FigureLayer;
  private vehicles: VehicleLayer;
  private selectRing: Mesh;
  private raycaster = new Raycaster();
  private ground = new Plane(new Vector3(0, 1, 0), 0);
  private fig: FigureInput = {
    x: 0, z: 0, ang: 0, moving: false, phase: 0, scale: 1, shirt: 0, pants: 0, skin: 0, vest: 0, tray: false, trayColor: 0,
  };
  /** Verfolgte oder ausgewählte Person (Passant) */
  selectedPedId: number | null = null;
  private lastState: GameState | null = null;
  private lastAlpha = 0;
  stats = { drawCalls: 0, triangles: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly world: World, settings: ViewSettings) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.shadowMap.type = PCFShadowMap;
    this.scene.background = new Color(PAL.sky);
    this.rig = new CameraRig(world.w, world.h);
    this.rig.lookAt(world.warehouse.x + 6, world.warehouse.y + 2);

    this.hemi = new HemisphereLight(0xe4edf3, 0x8a8072, 1.35);
    this.scene.add(this.hemi);
    this.sun = new DirectionalLight(0xfff2e0, 2.3);
    this.sun.shadow.mapSize.set(RENDER.shadowMapSize, RENDER.shadowMapSize);
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.02;
    this.scene.add(this.sun, this.sun.target);

    this.city = buildCity(world);
    this.scene.add(this.city.group);
    this.warehouse = new WarehouseView(world);
    this.scene.add(this.warehouse.group);
    this.figures = new FigureLayer(900);
    this.scene.add(this.figures.group);
    this.vehicles = new VehicleLayer(40);
    this.scene.add(this.vehicles.group);

    this.selectRing = new Mesh(new RingGeometry(0.3, 0.38, 24), new MeshBasicMaterial({ color: 0x2f8f4e }));
    this.selectRing.rotation.x = -Math.PI / 2;
    this.selectRing.visible = false;
    this.scene.add(this.selectRing);

    this.applySettings(settings);
  }

  applySettings(s: ViewSettings): void {
    const dpr = window.devicePixelRatio || 1;
    const cap = s.quality === 'high' ? RENDER.maxPixelRatio : s.quality === 'medium' ? 1.5 : 1;
    this.renderer.setPixelRatio(Math.min(dpr, cap));
    this.renderer.shadowMap.enabled = s.shadows;
    this.sun.castShadow = s.shadows;
    this.renderer.shadowMap.needsUpdate = true;
    // Materialien neu übersetzen, wenn Schatten umgeschaltet werden
    this.scene.traverse((o) => {
      const m = (o as Mesh).material;
      if (m && !Array.isArray(m)) m.needsUpdate = true;
    });
    this.resize();
  }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.rig.setViewport(w, h);
  }

  private updateSun(): void {
    const t = this.rig.target;
    this.sun.position.set(t.x - 18, 30, t.z + 10);
    this.sun.target.position.set(t.x, 0, t.z);
    const ext = Math.max(this.rig.visibleWidth, this.rig.visibleHeight) * 0.75 + 4;
    const cam = this.sun.shadow.camera;
    if (cam.right !== ext) {
      cam.left = -ext;
      cam.right = ext;
      cam.top = ext;
      cam.bottom = -ext;
      cam.near = 1;
      cam.far = 90;
      cam.updateProjectionMatrix();
    }
  }

  private pedFigure(p: GameState['peds'][number], alpha: number, simTime: number): FigureInput {
    const f = this.fig;
    f.x = p.px + (p.x - p.px) * alpha;
    f.z = p.py + (p.y - p.py) * alpha;
    f.ang = p.ang;
    f.moving = p.mode !== 1 && (p.x !== p.px || p.y !== p.py);
    f.phase = simTime * p.speed * 7 + p.id;
    const fade = p.fade < 1 ? p.fade * p.fade * (3 - 2 * p.fade) : 1;
    f.scale = 0.92 + (p.look * 7.3 % 1) * 0.14;
    f.scale *= fade;
    f.shirt = CLOTHES[Math.floor(p.look * CLOTHES.length) % CLOTHES.length];
    f.pants = PANTS[Math.floor(p.look * 37) % PANTS.length];
    f.skin = SKIN[Math.floor(p.look * 113) % SKIN.length];
    f.vest = 0;
    f.tray = false;
    return f;
  }

  /** Zeichnet ein Bild. alpha ist der Anteil zwischen dem letzten und dem nächsten Tick. */
  frame(state: GameState, alpha: number, dt: number): void {
    this.lastState = state;
    this.lastAlpha = alpha;
    this.rig.update(dt);
    this.updateSun();
    this.warehouse.sync(state.warehouse);

    const simTime = (state.totalTicks + alpha) / 10;
    const figs = this.figures;
    figs.begin();
    for (const p of state.peds) figs.add(this.pedFigure(p, alpha, simTime));
    for (const w of this.warehouse.officeWorkers) figs.add(w);
    figs.end();
    this.vehicles.update(this.world, state.vehicles, alpha);

    // Auswahlring
    const sel = this.selectedPedId !== null ? state.peds.find((p) => p.id === this.selectedPedId) : undefined;
    if (sel) {
      this.selectRing.visible = true;
      this.selectRing.position.set(sel.px + (sel.x - sel.px) * alpha, 0.1, sel.py + (sel.y - sel.py) * alpha);
    } else this.selectRing.visible = false;

    this.renderer.render(this.scene, this.rig.camera);
    const info = this.renderer.info.render;
    this.stats.drawCalls = info.calls;
    this.stats.triangles = info.triangles;
  }

  /** Bildschirmposition (CSS-Pixel) einer Weltposition */
  project(x: number, y: number, z: number, out: { x: number; y: number }): void {
    tmpV.set(x, y, z).project(this.rig.camera);
    const rect = this.canvas.getBoundingClientRect();
    out.x = rect.left + ((tmpV.x + 1) / 2) * rect.width;
    out.y = rect.top + ((1 - tmpV.y) / 2) * rect.height;
  }

  /** Feld unter einer Bildschirmposition */
  groundAt(clientX: number, clientY: number): { x: number; y: number } | null {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.rig.camera);
    const hit = new Vector3();
    if (!this.raycaster.ray.intersectPlane(this.ground, hit)) return null;
    return { x: hit.x, y: hit.z };
  }

  /** Sucht die Person, die einer Bildschirmposition am nächsten ist (in Pixeln). */
  nearestPed(clientX: number, clientY: number, maxPx: number): number | null {
    const s = this.lastState;
    if (!s) return null;
    const a = this.lastAlpha;
    const pt = { x: 0, y: 0 };
    let best: number | null = null;
    let bestD = maxPx * maxPx;
    for (const p of s.peds) {
      this.project(p.px + (p.x - p.px) * a, 0.35, p.py + (p.y - p.py) * a, pt);
      const d = (pt.x - clientX) ** 2 + (pt.y - clientY) ** 2;
      if (d < bestD) {
        bestD = d;
        best = p.id;
      }
    }
    return best;
  }

  get drawCallsStatic(): number {
    return this.city.drawCallsStatic;
  }
}
