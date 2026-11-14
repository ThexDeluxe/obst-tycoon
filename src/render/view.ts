// Darstellung: liest den Zustand der Simulation, interpoliert zwischen zwei Ticks und rendert.
import {
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PCFShadowMap,
  Plane,
  Quaternion,
  Raycaster,
  RingGeometry,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RENDER, SPOT } from '../data/balance';
import type { GameState } from '../sim/types';
import type { World } from '../sim/world';
import { CameraRig } from './camera';
import { buildCity, H_SIDEWALK, type CityMeshes } from './city';
import { FigureLayer, type FigureInput } from './figures';
import { Floaters } from './floaters';
import { CLOTHES, PAL, PANTS, SKIN } from './palette';
import { StaffLayer } from './staff';
import { VehicleLayer } from './vehicles';
import { WarehouseView, type CrateView } from './warehouse';

export interface ViewSettings {
  shadows: boolean;
  quality: 'low' | 'medium' | 'high';
}

/** Was die Oberfläche hervorheben möchte */
export interface ViewHighlight {
  personId: number | null;
  spot: number | null;
  /** Zuweisungsmodus: alle Plätze markieren */
  assigning: boolean;
}

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
  private staff: StaffLayer;
  private vehicles: VehicleLayer;
  private selectRing: Mesh;
  private spotRings: InstancedMesh;
  private spotSelect: Mesh;
  readonly floaters: Floaters;
  private raycaster = new Raycaster();
  private ground = new Plane(new Vector3(0, 1, 0), 0);
  private fig: FigureInput = {
    x: 0, z: 0, ang: 0, moving: false, phase: 0, scale: 1, shirt: 0, pants: 0, skin: 0, vest: 0, tray: false, trayColor: 0,
  };
  /** Ausgewählter Passant (nur zum Verfolgen) */
  selectedPedId: number | null = null;
  highlight: ViewHighlight = { personId: null, spot: null, assigning: false };
  private lastState: GameState | null = null;
  private lastAlpha = 0;
  private crateTimer = 0;
  private m = new Matrix4();
  private q = new Quaternion();
  private c = new Color();
  private one = new Vector3(1, 1, 1);
  stats = { drawCalls: 0, triangles: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly world: World, settings: ViewSettings, overlay: HTMLElement) {
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
    this.staff = new StaffLayer(48);
    this.scene.add(this.staff.group);
    this.vehicles = new VehicleLayer(40);
    this.scene.add(this.vehicles.group);

    this.selectRing = new Mesh(new RingGeometry(0.3, 0.38, 24), new MeshBasicMaterial({ color: 0x2f8f4e }));
    this.selectRing.rotation.x = -Math.PI / 2;
    this.selectRing.visible = false;
    this.scene.add(this.selectRing);

    const ringGeo = new RingGeometry(0.5, 0.68, 4, 1, Math.PI / 4);
    ringGeo.rotateX(-Math.PI / 2);
    this.spotRings = new InstancedMesh(ringGeo, new MeshBasicMaterial({ color: 0xffffff }), world.spots.length);
    this.spotRings.instanceMatrix.setUsage(DynamicDrawUsage);
    this.spotRings.setColorAt(0, this.c.setHex(0xffffff));
    this.spotRings.visible = false;
    this.spotRings.frustumCulled = false;
    this.scene.add(this.spotRings);
    this.spotSelect = new Mesh(new RingGeometry(0.55, 0.66, 4, 1, Math.PI / 4), new MeshBasicMaterial({ color: 0xffffff }));
    this.spotSelect.rotation.x = -Math.PI / 2;
    this.spotSelect.visible = false;
    this.scene.add(this.spotSelect);

    this.floaters = new Floaters(overlay);
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
    f.scale = (0.92 + ((p.look * 7.3) % 1) * 0.14) * fade;
    f.shirt = CLOTHES[Math.floor(p.look * CLOTHES.length) % CLOTHES.length];
    f.pants = PANTS[Math.floor(p.look * 37) % PANTS.length];
    f.skin = SKIN[Math.floor(p.look * 113) % SKIN.length];
    f.vest = 0;
    f.tray = false;
    return f;
  }

  private updateCrates(state: GameState): void {
    const regular: CrateView[] = [];
    const cooled: CrateView[] = [];
    for (const c of state.crates) (c.cooled ? cooled : regular).push({ product: c.product, fill: c.units / 20 });
    this.warehouse.updateCrates(regular, cooled);
  }

  private updateSpotMarkers(state: GameState): void {
    const hl = this.highlight;
    this.spotRings.visible = hl.assigning;
    if (hl.assigning) {
      // Pulsierende Markierung aller Verkaufsplätze
      const pulse = 1 + 0.12 * Math.sin(performance.now() / 180);
      this.one.set(pulse, 1, pulse);
      for (const s of this.world.spots) {
        let n = 0;
        for (const p of state.staff) if (p.spot === s.index && p.id !== hl.personId) n++;
        this.q.identity();
        this.m.compose(tmpV.set(s.x + 0.5, H_SIDEWALK + 0.02, s.y + 0.5), this.q, this.one);
        this.spotRings.setMatrixAt(s.index, this.m);
        this.spotRings.setColorAt(s.index, this.c.setHex(n >= SPOT.maxOwnVendors ? 0xc0392b : n > 0 ? 0xd2a640 : 0x2f7d4a));
      }
      this.spotRings.instanceMatrix.needsUpdate = true;
      if (this.spotRings.instanceColor) this.spotRings.instanceColor.needsUpdate = true;
      this.one.set(1, 1, 1);
    }
    if (hl.spot !== null && this.world.spots[hl.spot]) {
      const s = this.world.spots[hl.spot];
      this.spotSelect.visible = true;
      this.spotSelect.position.set(s.x + 0.5, H_SIDEWALK + 0.03, s.y + 0.5);
    } else this.spotSelect.visible = false;
  }

  /** Zeichnet ein Bild. alpha ist der Anteil zwischen dem letzten und dem nächsten Tick. */
  frame(state: GameState, alpha: number, dt: number): void {
    this.lastState = state;
    this.lastAlpha = alpha;
    this.rig.update(dt);
    this.updateSun();
    this.warehouse.sync(state.warehouse);
    this.crateTimer -= dt;
    if (this.crateTimer <= 0) {
      this.crateTimer = 0.25;
      this.updateCrates(state);
    }

    const simTime = (state.totalTicks + alpha) / 10;
    const figs = this.figures;
    figs.begin();
    for (const p of state.peds) figs.add(this.pedFigure(p, alpha, simTime));
    for (const w of this.warehouse.officeWorkers) figs.add(w);
    this.staff.update(state, alpha, simTime, figs);
    figs.end();
    this.vehicles.update(this.world, state.vehicles, alpha);
    this.updateSpotMarkers(state);

    // Auswahlring
    let sx: number | null = null;
    let sz = 0;
    const person = this.highlight.personId !== null ? state.staff.find((p) => p.id === this.highlight.personId) : undefined;
    if (person) {
      sx = person.px + (person.x - person.px) * alpha;
      sz = person.py + (person.y - person.py) * alpha;
    } else if (this.selectedPedId !== null) {
      const sel = state.peds.find((p) => p.id === this.selectedPedId);
      if (sel) {
        sx = sel.px + (sel.x - sel.px) * alpha;
        sz = sel.py + (sel.y - sel.py) * alpha;
      }
    }
    if (sx !== null) {
      this.selectRing.visible = true;
      this.selectRing.position.set(sx, 0.11, sz);
    } else this.selectRing.visible = false;

    this.renderer.render(this.scene, this.rig.camera);
    const info = this.renderer.info.render;
    this.stats.drawCalls = info.calls;
    this.stats.triangles = info.triangles;
    this.floaters.update(dt, (x, y, z, out) => this.project(x, y, z, out));
  }

  /** Bildschirmposition (CSS-Pixel) einer Weltposition */
  project(x: number, y: number, z: number, out: { x: number; y: number }): void {
    tmpV.set(x, y, z).project(this.rig.camera);
    const rect = this.canvas.getBoundingClientRect();
    out.x = rect.left + ((tmpV.x + 1) / 2) * rect.width;
    out.y = rect.top + ((1 - tmpV.y) / 2) * rect.height;
  }

  /** Bodenpunkt unter einer Bildschirmposition */
  groundAt(clientX: number, clientY: number): { x: number; y: number } | null {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.rig.camera);
    const hit = new Vector3();
    this.ground.constant = -H_SIDEWALK;
    if (!this.raycaster.ray.intersectPlane(this.ground, hit)) return null;
    return { x: hit.x, y: hit.z };
  }

  /** Verkaufsplatz unter einer Bildschirmposition (mit etwas Toleranz) */
  spotAt(clientX: number, clientY: number, tolerance = 0.9): number | null {
    const g = this.groundAt(clientX, clientY);
    if (!g) return null;
    let best: number | null = null;
    let bestD = tolerance * tolerance;
    for (const s of this.world.spots) {
      const d = (s.x + 0.5 - g.x) ** 2 + (s.y + 0.5 - g.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = s.index;
      }
    }
    return best;
  }

  /** Nächste eigene Person zu einer Bildschirmposition (in Pixeln) */
  nearestStaff(clientX: number, clientY: number, maxPx: number): number | null {
    const s = this.lastState;
    if (!s) return null;
    const a = this.lastAlpha;
    const pt = { x: 0, y: 0 };
    let best: number | null = null;
    let bestD = maxPx * maxPx;
    for (const p of s.staff) {
      this.project(p.px + (p.x - p.px) * a, 0.35, p.py + (p.y - p.py) * a, pt);
      const d = (pt.x - clientX) ** 2 + (pt.y - clientY) ** 2;
      if (d < bestD) {
        bestD = d;
        best = p.id;
      }
    }
    return best;
  }

  /** Nächster Passant zu einer Bildschirmposition (in Pixeln) */
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
