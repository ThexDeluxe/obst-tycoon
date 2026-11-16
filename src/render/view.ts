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
import { DELIVERY, FRUIT_IDS, RENDER, secondsToTicks } from '../data/balance';
import { FRUIT_NAMES } from '../data/names';
import { isAttackable, shelfCost } from '../sim/selectors';
import { fruitRange, runsOutAt } from '../sim/supply';
import type { GameState } from '../sim/types';
import type { World } from '../sim/world';
import { CameraRig } from './camera';
import { buildCity, buildDistrictOverlays, type CityMeshes } from './city';
import { FigureLayer, type FigureInput } from './figures';
import { Floaters } from './floaters';
import { WorldLabels, type LabelState } from './labels';
import { CLOTHES, PAL, PANTS, SKIN } from './palette';
import { PeopleLayer } from './people';
import { VehicleLayer } from './vehicles';
import { WarehouseView } from './warehouse';
import { createModel } from './models';

export interface ViewSettings {
  shadows: boolean;
  quality: 'low' | 'medium' | 'high';
}

/** Hinweise der Oberfläche an die Darstellung */
export interface ViewHints {
  dealerId: number | null;
  district: number | null;
  shelf: boolean;
  labels: boolean;
}

const tmpV = new Vector3();

export class GameView {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly rig: CameraRig;
  private sun: DirectionalLight;
  private city: CityMeshes;
  readonly warehouse: WarehouseView;
  private figures: FigureLayer;
  private people: PeopleLayer;
  private vehicles: VehicleLayer;
  private overlays: Mesh[];
  private overlayAlpha: number[];
  private selectRing: Mesh;
  private truck = createModel('truck');
  readonly floaters: Floaters;
  readonly labels: WorldLabels;
  private raycaster = new Raycaster();
  private ground = new Plane(new Vector3(0, 1, 0), 0);
  private fig: FigureInput = {
    x: 0, z: 0, ang: 0, moving: false, phase: 0, scale: 1, shirt: 0, pants: 0, skin: 0, vest: 0, tray: false, trayColor: 0,
  };
  /** Ausgewählter Passant (nur zum Verfolgen) */
  selectedPedId: number | null = null;
  hints: ViewHints = { dealerId: null, district: null, shelf: false, labels: true };
  private lastState: GameState | null = null;
  private lastAlpha = 0;
  private crateTimer = 0;
  stats = { drawCalls: 0, triangles: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly world: World, settings: ViewSettings, floaterRoot: HTMLElement, labelRoot: HTMLElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.shadowMap.type = PCFShadowMap;
    this.scene.background = new Color(PAL.sky);
    this.rig = new CameraRig(world.w, world.h);
    this.focusWarehouse();

    this.scene.add(new HemisphereLight(0xe4edf3, 0x8a8072, 1.35));
    this.sun = new DirectionalLight(0xfff2e0, 2.3);
    this.sun.shadow.mapSize.set(RENDER.shadowMapSize, RENDER.shadowMapSize);
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.02;
    this.scene.add(this.sun, this.sun.target);

    this.city = buildCity(world);
    this.scene.add(this.city.group);
    this.warehouse = new WarehouseView(world);
    this.scene.add(this.warehouse.group);
    this.figures = new FigureLayer(1000);
    this.scene.add(this.figures.group);
    this.people = new PeopleLayer(world, 96);
    this.scene.add(this.people.group);
    this.vehicles = new VehicleLayer(40);
    this.scene.add(this.vehicles.group);
    this.overlays = buildDistrictOverlays(world);
    this.overlayAlpha = this.overlays.map(() => -1);
    for (const o of this.overlays) this.scene.add(o);

    this.truck.visible = false;
    this.scene.add(this.truck);

    this.selectRing = new Mesh(new RingGeometry(0.3, 0.38, 24), new MeshBasicMaterial({ color: 0x2f8f4e }));
    this.selectRing.rotation.x = -Math.PI / 2;
    this.selectRing.visible = false;
    this.scene.add(this.selectRing);

    this.floaters = new Floaters(floaterRoot);
    this.labels = new WorldLabels(labelRoot);
    this.applySettings(settings);
  }

  focusWarehouse(): void {
    const wh = this.world.warehouse;
    this.rig.lookAt(wh.x + wh.w / 2 - 1, wh.y + wh.h / 2 + 1);
  }

  applySettings(s: ViewSettings): void {
    const dpr = window.devicePixelRatio || 1;
    const cap = s.quality === 'high' ? RENDER.maxPixelRatio : s.quality === 'medium' ? 1.5 : 1;
    this.renderer.setPixelRatio(Math.min(dpr, cap));
    this.renderer.shadowMap.enabled = s.shadows;
    this.sun.castShadow = s.shadows;
    this.renderer.shadowMap.needsUpdate = true;
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
    this.sun.position.set(t.x - 18, 34, t.z + 10);
    this.sun.target.position.set(t.x, 0, t.z);
    const ext = Math.max(this.rig.visibleWidth, this.rig.visibleHeight) * 0.75 + 6;
    const cam = this.sun.shadow.camera;
    if (cam.right !== ext) {
      cam.left = -ext;
      cam.right = ext;
      cam.top = ext;
      cam.bottom = -ext;
      cam.near = 1;
      cam.far = 120;
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

  /** Rote Markierung der Gang-Viertel; nach der Eroberung blendet sie langsam aus */
  private updateOverlays(state: GameState, dt: number): void {
    for (let i = 0; i < this.overlays.length; i++) {
      const target = state.districts[i].owner === 'gang' ? 1 : 0;
      let a = this.overlayAlpha[i];
      if (a < 0) a = target;
      else a += Math.sign(target - a) * Math.min(Math.abs(target - a), dt * 0.7);
      this.overlayAlpha[i] = a;
      const o = this.overlays[i];
      o.visible = a > 0.001;
      (o.material as MeshBasicMaterial).opacity = 0.3 * a;
      const border = o.children[0] as Mesh;
      (border.material as MeshBasicMaterial).opacity = 0.45 * a;
    }
  }

  /** Lieferwagen auf der Lagerstraße: fährt von Westen vor, hält am Tor, fährt nach Osten weiter */
  private updateTruck(state: GameState, alpha: number): void {
    const d = state.delivery;
    if (!d) {
      this.truck.visible = false;
      return;
    }
    const wh = this.world.warehouse;
    const stopX = wh.doorX + wh.doorWidth / 2 + 0.6;
    const laneZ = wh.doorY + 2.5;
    const t = d.t + alpha;
    let x = stopX;
    if (d.phase === 'arrive') {
      const k = Math.min(1, t / secondsToTicks(DELIVERY.arriveSeconds));
      x = -6 + (stopX + 6) * (1 - (1 - k) * (1 - k));
    } else if (d.phase === 'leave') {
      const k = Math.min(1, t / secondsToTicks(DELIVERY.leaveSeconds));
      x = stopX + 24 * k * k;
    }
    this.truck.visible = true;
    this.truck.position.set(x, 0, laneZ);
    this.truck.rotation.y = Math.PI / 2;
  }

  /** Hinweis über dem Lager: leer, oder eine Sorte geht heute noch aus */
  private warehouseNote(state: GameState): string | null {
    if (state.delivery) {
      const d = state.delivery;
      return d.phase === 'arrive' ? `Lieferung: ${d.total} Kisten` : `Lieferung: ${d.unloaded} von ${d.total} Kisten`;
    }
    const idleWithout = state.crates.length === 0 && state.dealers.some((d) => d.mode === 'idle' && d.load.length === 0);
    if (idleWithout) return 'Lager leer: Lager antippen';
    let soonest: { fruit: string; at: number } | null = null;
    for (const f of FRUIT_IDS) {
      const r = fruitRange(state, f);
      if (r.perDay <= 0) continue;
      const at = runsOutAt(state, r);
      if (at !== null && (!soonest || at < soonest.at)) soonest = { fruit: FRUIT_NAMES[f], at };
    }
    if (!soonest) return null;
    return `${soonest.fruit} reichen bis ${Math.floor(soonest.at)} Uhr`;
  }

  private noteTimer = 0;
  private noteText: string | null = null;
  private labelStates: LabelState[] = [];

  /** Zeichnet ein Bild. alpha ist der Anteil zwischen dem letzten und dem nächsten Tick. */
  frame(state: GameState, alpha: number, dt: number): void {
    this.lastState = state;
    this.lastAlpha = alpha;
    this.rig.update(dt);
    this.updateSun();
    this.warehouse.sync(state.shelves, state.coldRoom);
    this.crateTimer -= dt;
    if (this.crateTimer <= 0) {
      this.crateTimer = 0.2;
      this.warehouse.updateCrates(state.crates);
    }
    this.updateTruck(state, alpha);
    this.updateOverlays(state, dt);

    const simTime = (state.totalTicks + alpha) / 10;
    const figs = this.figures;
    figs.begin();
    for (const p of state.peds) figs.add(this.pedFigure(p, alpha, simTime));
    for (const w of this.warehouse.officeWorkers) figs.add(w);
    this.people.update(state, alpha, simTime, figs);
    figs.end();
    this.vehicles.update(this.world, state.vehicles, alpha);

    // Auswahlring
    let sx: number | null = null;
    let sz = 0;
    const dealer = this.hints.dealerId !== null ? state.dealers.find((d) => d.id === this.hints.dealerId) : undefined;
    if (dealer) {
      sx = dealer.px + (dealer.x - dealer.px) * alpha;
      sz = dealer.py + (dealer.y - dealer.py) * alpha;
    } else if (this.selectedPedId !== null) {
      const sel = state.peds.find((p) => p.id === this.selectedPedId);
      if (sel) {
        sx = sel.px + (sel.x - sel.px) * alpha;
        sz = sel.py + (sel.y - sel.py) * alpha;
      }
    }
    if (sx !== null) {
      this.selectRing.visible = true;
      this.selectRing.position.set(sx, 0.12, sz);
    } else this.selectRing.visible = false;

    this.renderer.render(this.scene, this.rig.camera);
    const info = this.renderer.info.render;
    this.stats.drawCalls = info.calls;
    this.stats.triangles = info.triangles;

    const project = (x: number, y: number, z: number, out: { x: number; y: number }) => this.project(x, y, z, out);
    this.floaters.update(dt, project);
    // Schilder
    this.labelStates.length = state.districts.length;
    for (let i = 0; i < state.districts.length; i++) {
      const d = state.districts[i];
      this.labelStates[i] = { owner: d.owner, gang: d.gang, attackable: isAttackable(state, this.world, i) };
    }
    const anchor = this.warehouse.nextShelfAnchor(state.shelves);
    const cost = shelfCost(state);
    const wh = this.world.warehouse;
    this.noteTimer -= dt;
    if (this.noteTimer <= 0) {
      this.noteTimer = 0.5;
      this.noteText = this.warehouseNote(state);
    }
    this.labels.update(
      project,
      this.labelStates,
      this.world.labels,
      this.hints.district,
      anchor ? { ...anchor, cost, affordable: state.money >= cost, hint: this.hints.shelf } : null,
      this.noteText ? { x: wh.doorX + 1, y: 2.2, z: wh.hall.y + wh.hall.h - 1, text: this.noteText, info: !!state.delivery } : null,
      this.hints.labels,
    );
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
    if (!this.raycaster.ray.intersectPlane(this.ground, hit)) return null;
    return { x: hit.x, y: hit.z };
  }

  /** Nächster eigener Verkäufer zu einer Bildschirmposition (in Pixeln) */
  nearestDealer(clientX: number, clientY: number, maxPx: number): number | null {
    const s = this.lastState;
    if (!s) return null;
    const a = this.lastAlpha;
    const pt = { x: 0, y: 0 };
    let best: number | null = null;
    let bestD = maxPx * maxPx;
    for (const d of s.dealers) {
      this.project(d.px + (d.x - d.px) * a, 0.35, d.py + (d.y - d.py) * a, pt);
      const dd = (pt.x - clientX) ** 2 + (pt.y - clientY) ** 2;
      if (dd < bestD) {
        bestD = dd;
        best = d.id;
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

  /** Viertel unter einer Bildschirmposition */
  districtAt(clientX: number, clientY: number): number | null {
    const g = this.groundAt(clientX, clientY);
    if (!g) return null;
    const x = Math.floor(g.x);
    const y = Math.floor(g.y);
    if (x < 0 || y < 0 || x >= this.world.w || y >= this.world.h) return null;
    return this.world.district[y * this.world.w + x];
  }

  get drawCallsStatic(): number {
    return this.city.drawCallsStatic;
  }
}
