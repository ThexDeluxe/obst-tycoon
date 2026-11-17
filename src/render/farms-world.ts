// Eigenständige, statische 3D-Übersicht des Umlands. Die Simulation bleibt davon getrennt.
import {
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  HemisphereLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Raycaster,
  RingGeometry,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { UMLAND } from '../data/map';
import { FARM_NAMES } from '../data/names';
import type { FarmState, PendingEvent } from '../sim/types';

type FarmMarker = {
  ownerRing: Mesh<RingGeometry, MeshBasicMaterial>;
  selectedRing: Mesh<RingGeometry, MeshBasicMaterial>;
  alert: Mesh<SphereGeometry, MeshBasicMaterial>;
  route: Mesh<BoxGeometry, MeshBasicMaterial>;
};

const COLORS = {
  grass: 0xcbdcb7,
  grassLight: 0xd9e5c9,
  field: 0xb7c98e,
  fieldDark: 0xa6bc7d,
  road: 0xc9b997,
  roadEdge: 0xb8a987,
  city: 0xb6c0c4,
  brick: 0xa84d3e,
  roof: 0x8d453b,
  wood: 0x8c6748,
  glass: 0x9cc9c6,
  green: 0x2f7d4a,
  red: 0xc0392b,
  gold: 0xe0ad37,
  white: 0xf7f5ed,
};

const FARM_POINTS = UMLAND.farms;

function material(color: number, extra: ConstructorParameters<typeof MeshLambertMaterial>[0] = {}): MeshLambertMaterial {
  return new MeshLambertMaterial({ color, ...extra });
}

function box(
  parent: { add: (...objects: import('three').Object3D[]) => void },
  w: number,
  h: number,
  d: number,
  color: number,
  x: number,
  y: number,
  z: number,
  extra: ConstructorParameters<typeof MeshLambertMaterial>[0] = {},
): Mesh {
  const mesh = new Mesh(new BoxGeometry(w, h, d), material(color, extra));
  mesh.position.set(x, y, z);
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function tree(parent: { add: (...objects: import('three').Object3D[]) => void }, x: number, z: number, fruitColor: number, scale = 1): void {
  const trunk = new Mesh(new CylinderGeometry(0.35 * scale, 0.5 * scale, 3.2 * scale, 5), material(0x79543a));
  trunk.position.set(x, 1.6 * scale, z);
  parent.add(trunk);
  const crown = new Mesh(new ConeGeometry(2.8 * scale, 5.2 * scale, 7), material(0x5d8b4e));
  crown.position.set(x, 5.2 * scale, z);
  parent.add(crown);
  const fruit = new Mesh(new SphereGeometry(0.62 * scale, 6, 5), material(fruitColor));
  fruit.position.set(x + 1.25 * scale, 4.7 * scale, z + 0.6 * scale);
  parent.add(fruit);
}

function cropRows(parent: { add: (...objects: import('three').Object3D[]) => void }, fruitColor: number, rows: number, length: number): void {
  for (let r = 0; r < rows; r++) {
    const z = (r - (rows - 1) / 2) * 3.2;
    box(parent, length, 0.24, 1.8, r % 2 ? COLORS.fieldDark : COLORS.field, 0, 0.16, z);
    for (let x = -length / 2 + 2; x < length / 2 - 1; x += 4) {
      const plant = new Mesh(new ConeGeometry(0.75, 1.6, 5), material(0x638b4d));
      plant.position.set(x, 1.0, z);
      parent.add(plant);
      const fruit = new Mesh(new SphereGeometry(0.32, 5, 4), material(fruitColor));
      fruit.position.set(x + 0.55, 1.25, z + 0.35);
      parent.add(fruit);
    }
  }
}

function house(
  parent: { add: (...objects: import('three').Object3D[]) => void },
  w: number,
  d: number,
  bodyColor: number,
  roofColor: number,
  roofHeight = 5,
): void {
  box(parent, w, 6, d, bodyColor, 0, 3, 0);
  const roof = new Mesh(new ConeGeometry(Math.max(w, d) * 0.72, roofHeight, 4), material(roofColor));
  roof.position.set(0, 6 + roofHeight / 2 - 0.2, 0);
  roof.rotation.y = Math.PI / 4;
  parent.add(roof);
  box(parent, 2.1, 3.4, 0.18, 0x694936, 0, 1.7, d / 2 + 0.11);
  box(parent, 2.2, 1.7, 0.2, 0x9bc4cb, -w / 3, 3.5, d / 2 + 0.12);
  box(parent, 2.2, 1.7, 0.2, 0x9bc4cb, w / 3, 3.5, d / 2 + 0.12);
}

function greenhouse(parent: { add: (...objects: import('three').Object3D[]) => void }, w: number, d: number): void {
  box(parent, w, 5.5, d, 0x9bb9ad, 0, 2.75, 0, { transparent: true, opacity: 0.55, depthWrite: false });
  const roof = new Mesh(new ConeGeometry(Math.max(w, d) * 0.72, 4.5, 4), material(0x8db9b6, { transparent: true, opacity: 0.58, depthWrite: false }));
  roof.position.set(0, 7.2, 0);
  roof.rotation.y = Math.PI / 4;
  parent.add(roof);
  for (let x = -w / 2 + 2; x < w / 2; x += 4) {
    box(parent, 0.28, 7, d + 0.3, 0xe5eee5, x, 3.5, 0);
  }
  for (let z = -d / 2 + 2; z < d / 2; z += 4) {
    box(parent, w + 0.3, 0.22, 0.22, 0xe5eee5, 0, 5.2, z);
  }
}

function labelSprite(text: string): Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 112;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.94)';
    ctx.fillRect(8, 8, 496, 96);
    ctx.strokeStyle = 'rgba(42,58,48,0.18)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 496, 96);
    ctx.fillStyle = '#26352c';
    ctx.font = '700 38px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 57, 460);
  }
  const texture = new CanvasTexture(canvas);
  const sprite = new Sprite(new SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(46, 10, 1);
  return sprite;
}

export class FarmsWorldView {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
  private readonly raycaster = new Raycaster();
  private readonly hitTargets: Mesh[] = [];
  private readonly markers: FarmMarker[] = [];
  private readonly target = new Vector3(UMLAND.width / 2, 0, UMLAND.height / 2);
  /** Von der Oberfläche verdeckte Ränder in Pixeln (Leiste oben, Blatt, Knöpfe) */
  private insets = { top: 0, right: 0, bottom: 0, left: 0 };
  private readonly pointer = { id: -1, x: 0, y: 0, startX: 0, startY: 0, dragging: false };
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private pinchDistance = 0;
  private multiTouch = false;
  private resizeObserver: ResizeObserver | null = null;
  private raf = 0;
  private baseHeight = 240;
  private zoom = 1;
  private selected = 0;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly onSelect: (farm: number) => void) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.outputColorSpace = 'srgb';
    this.scene.background = new Color(0xdce8d4);
    this.scene.add(new HemisphereLight(0xf4f7ed, 0x8b9076, 2.0));
    const sun = new DirectionalLight(0xfff2d8, 2.1);
    sun.position.set(-80, 220, 150);
    this.scene.add(sun);
    this.buildLandscape();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerCancel);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.resize();
    this.frame();
  }

  private buildLandscape(): void {
    // Großzügiger Boden, damit auch bei breiten Bildschirmen kein Rand sichtbar wird
    const ground = new Mesh(new PlaneGeometry(UMLAND.width * 12, UMLAND.height * 12), material(COLORS.grass));
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(UMLAND.width / 2, -0.12, UMLAND.height / 2);
    this.scene.add(ground);

    // Unterschiedliche Felder lockern die große Grünfläche auf.
    const plots: [number, number, number, number, number][] = [
      [18, 80, 54, 34, COLORS.field], [200, 86, 62, 28, COLORS.fieldDark], [96, 150, 36, 30, COLORS.grassLight],
      [178, 10, 44, 26, COLORS.field], [84, 20, 40, 30, COLORS.fieldDark], [190, 150, 40, 30, COLORS.field],
    ];
    for (const [x, z, w, d, color] of plots) {
      const patch = new Mesh(new PlaneGeometry(w, d), material(color));
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(x + w / 2, 0.015, z + d / 2);
      this.scene.add(patch);
    }

    const city = UMLAND.city;
    const townPad = new Mesh(new BoxGeometry(city.w, 0.5, city.h), material(COLORS.city));
    townPad.position.set(city.x, 0.18, city.y);
    this.scene.add(townPad);
    const cityBlocks = [
      [-23, -10, 12, 12, 0x8c999e], [-7, -13, 10, 16, 0xaab4b5], [9, -9, 12, 12, 0x87969a], [24, -11, 10, 17, 0xa0aaad],
      [-20, 9, 13, 12, 0x9ba8a7], [0, 10, 16, 13, 0x7e8e91], [22, 9, 12, 12, 0xb0b9b6],
    ] as const;
    for (const [x, z, w, d, color] of cityBlocks) {
      box(this.scene, w, 9 + (w % 4), d, color, city.x + x, 5, city.y + z);
    }
    box(this.scene, 16, 8, 11, 0x7d898d, city.x + 2, 4, city.y + 22);
    const cityLabel = labelSprite('STADT · LAGER');
    cityLabel.position.set(city.x, 18, city.y + 34);
    this.scene.add(cityLabel);

    // Straßen werden als breite, leicht erhöhte Wege gebaut.
    for (const [x, z] of FARM_POINTS) {
      const dx = x - city.x;
      const dz = z - city.y;
      const length = Math.hypot(dx, dz);
      const road = new Mesh(new BoxGeometry(length, 0.12, 5.4), material(COLORS.road));
      road.position.set((x + city.x) / 2, 0.06, (z + city.y) / 2);
      road.rotation.y = -Math.atan2(dz, dx);
      this.scene.add(road);
      const verge = new Mesh(new BoxGeometry(length, 0.04, 0.65), material(COLORS.roadEdge));
      verge.position.set((x + city.x) / 2, 0.13, (z + city.y) / 2 + 2.7);
      verge.rotation.y = -Math.atan2(dz, dx);
      this.scene.add(verge);
    }

    FARM_POINTS.forEach(([x, z], i) => this.buildFarm(i, x, z));
  }

  private buildFarm(index: number, x: number, z: number): void {
    const plot = new Mesh(new BoxGeometry(33, 0.25, 27), material(index % 2 ? COLORS.grassLight : COLORS.field));
    plot.position.set(x, 0.12, z);
    this.scene.add(plot);

    const farm = new Mesh(new CircleGeometry(16.5, 32), material(0xffffff, { transparent: true, opacity: 0.001, depthWrite: false }));
    farm.rotation.x = -Math.PI / 2;
    farm.position.set(x, 0.3, z);
    farm.userData.farmIndex = index;
    this.hitTargets.push(farm);
    this.scene.add(farm);

    const group = new Group();
    // Farm-Gruppen sind eigene Szenenobjekte, damit die sechs Anlagen unabhängig bleiben.
    group.position.set(x, 0.25, z);
    this.scene.add(group);

    if (index === 0) {
      house(group, 12, 10, 0xd7c6a4, 0x9b4439, 5.5);
      for (const [tx, tz] of [[-12, -8], [-12, 0], [-12, 8], [12, -8], [12, 0], [12, 8]] as [number, number][]) tree(group, tx, tz, 0xc8402f, 0.9);
      cropRows(group, 0xc8402f, 2, 12);
    } else if (index === 1) {
      house(group, 10, 9, 0xe0d2b5, 0x567c53, 4.8);
      for (const [tx, tz] of [[-12, -8], [-7, -8], [-12, 0], [-7, 0], [8, -8], [13, -8], [8, 0], [13, 0], [-2, 10], [4, 10]] as [number, number][]) tree(group, tx, tz, 0xd9364a, 0.85);
    } else if (index === 2) {
      greenhouse(group, 17, 12);
      for (const [tx, tz] of [[-11, 10], [10, 10], [-12, -10], [12, -10]] as [number, number][]) tree(group, tx, tz, 0xf0a030, 1.05);
    } else if (index === 3) {
      house(group, 14, 10, 0xd8c6a8, 0x744b62, 5.5);
      for (let row = 0; row < 4; row++) {
        const tz = -11 + row * 7;
        const vine = new Mesh(new CylinderGeometry(0.22, 0.22, 22, 5), material(0x7b6046));
        vine.rotation.z = Math.PI / 2;
        vine.position.set(0, 2.4, tz);
        group.add(vine);
        for (let tx = -10; tx <= 10; tx += 4) {
          const leaves = new Mesh(new SphereGeometry(1.35, 6, 5), material(0x5f884b));
          leaves.position.set(tx, 3.3, tz);
          group.add(leaves);
          const grapes = new Mesh(new SphereGeometry(0.45, 5, 4), material(0x75478a));
          grapes.position.set(tx + 0.5, 2.4, tz + 0.8);
          group.add(grapes);
        }
      }
    } else if (index === 4) {
      house(group, 15, 11, 0xbca98e, 0x704a3d, 6);
      box(group, 8, 7, 8, 0x9b8a75, -12, 3.5, 9);
      cropRows(group, 0xe8c547, 4, 17);
      for (const [tx, tz] of [[-14, -10], [14, -10], [14, 10]] as [number, number][]) tree(group, tx, tz, 0xe8c547, 0.8);
    } else {
      greenhouse(group, 19, 13);
      const second = new Mesh(new BoxGeometry(12, 5, 10), material(0xa7c9c1, { transparent: true, opacity: 0.55, depthWrite: false }));
      second.position.set(0, 2.5, 13);
      group.add(second);
      for (const [tx, tz] of [[-13, -10], [13, -10], [-13, 12], [13, 12]] as [number, number][]) tree(group, tx, tz, 0xd8478e, 0.9);
      cropRows(group, 0xd8478e, 2, 15);
    }

    const ownerRing = new Mesh(new RingGeometry(15.5, 16.5, 48), new MeshBasicMaterial({ color: 0x8b9690, transparent: true, opacity: 0.9, depthWrite: false }));
    ownerRing.rotation.x = -Math.PI / 2;
    ownerRing.position.set(x, 0.42, z);
    this.scene.add(ownerRing);
    const selectedRing = new Mesh(new RingGeometry(18, 19.4, 48), new MeshBasicMaterial({ color: COLORS.gold, transparent: true, opacity: 0.95, depthWrite: false }));
    selectedRing.rotation.x = -Math.PI / 2;
    selectedRing.position.set(x, 0.48, z);
    selectedRing.visible = index === this.selected;
    this.scene.add(selectedRing);
    const alert = new Mesh(new SphereGeometry(1.8, 10, 8), new MeshBasicMaterial({ color: COLORS.red }));
    alert.position.set(x + 12, 13, z - 10);
    alert.visible = false;
    this.scene.add(alert);
    const route = new Mesh(new BoxGeometry(Math.hypot(x - UMLAND.city.x, z - UMLAND.city.y), 0.07, 0.7), new MeshBasicMaterial({ color: COLORS.green, transparent: true, opacity: 0, depthWrite: false }));
    route.position.set((x + UMLAND.city.x) / 2, 0.18, (z + UMLAND.city.y) / 2);
    route.rotation.y = -Math.atan2(z - UMLAND.city.y, x - UMLAND.city.x);
    this.scene.add(route);
    this.markers.push({ ownerRing, selectedRing, alert, route });

    const name = labelSprite(FARM_NAMES[index].replace(/^(Hof|Obsthof|Tropenhaus|Weingut|Glashaus) /, ''));
    name.position.set(x, 17, z + 17);
    this.scene.add(name);
  }

  update(farms: FarmState[], day: number, pending: PendingEvent[], selected: number): void {
    this.selected = selected;
    farms.forEach((farm, index) => {
      const marker = this.markers[index];
      if (!marker) return;
      marker.ownerRing.material.color.setHex(farm.owner === 'gang' ? COLORS.red : farm.owner === 'player' ? COLORS.green : 0x8b9690);
      marker.selectedRing.visible = index === selected;
      const activeContract = !!farm.contract && farm.contract.endDay >= day;
      marker.route.material.opacity = farm.owner === 'player' || activeContract ? 0.88 : 0;
      marker.alert.visible = pending.some((event) => event.farm === index) || (!!farm.contract && farm.contract.endDay - day <= 2 && farm.contract.endDay >= day);
    });
  }

  /** Teilt mit, welche Ränder die Oberfläche verdeckt; die Karte wird in den freien Bereich eingepasst. */
  setInsets(top: number, right: number, bottom: number, left: number): void {
    const i = this.insets;
    if (Math.abs(i.top - top) + Math.abs(i.right - right) + Math.abs(i.bottom - bottom) + Math.abs(i.left - left) < 2) return;
    this.insets = { top, right, bottom, left };
    this.resize();
  }

  private resize(): void {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    // Freier Bereich zwischen Leiste, Blatt und Knöpfen
    const freeW = Math.max(120, width - this.insets.left - this.insets.right);
    const freeH = Math.max(90, height - this.insets.top - this.insets.bottom);
    // Die ganze Umgebung (Breite und schräg gesehene Tiefe samt Gebäuden) passt in den freien Bereich
    const spanW = UMLAND.width + 30;
    const spanH = UMLAND.height * 0.84 + 45;
    const worldPerPixel = Math.max(spanW / freeW, spanH / freeH);
    this.baseHeight = worldPerPixel * height;
    this.applyCamera();
  }

  private applyCamera(): void {
    const height = this.baseHeight / this.zoom;
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const aspect = w / Math.max(1, h);
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.left = (-height * aspect) / 2;
    this.camera.right = (height * aspect) / 2;
    // Bildmitte in die Mitte des freien Bereichs schieben
    const shiftX = (this.insets.right - this.insets.left) / 2;
    const shiftY = (this.insets.bottom - this.insets.top) / 2;
    if (shiftX || shiftY) this.camera.setViewOffset(w, h, Math.round(shiftX), Math.round(shiftY), w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
    this.camera.position.set(this.target.x, this.target.y + 390, this.target.z + 250);
    this.camera.lookAt(this.target);
  }

  private frame = (): void => {
    this.raf = requestAnimationFrame(this.frame);
    this.applyCamera();
    this.renderer.render(this.scene, this.camera);
  };

  private onPointerDown = (event: PointerEvent): void => {
    this.canvas.setPointerCapture?.(event.pointerId);
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size === 1) {
      this.pointer.id = event.pointerId;
      this.pointer.x = this.pointer.startX = event.clientX;
      this.pointer.y = this.pointer.startY = event.clientY;
      this.pointer.dragging = false;
      this.multiTouch = false;
    } else if (this.pointers.size === 2) {
      this.multiTouch = true;
      const [a, b] = [...this.pointers.values()];
      this.pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  private onPointerMove = (event: PointerEvent): void => {
    const point = this.pointers.get(event.pointerId);
    if (!point) return;
    const dx = event.clientX - point.x;
    const dy = event.clientY - point.y;
    point.x = event.clientX;
    point.y = event.clientY;

    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (this.pinchDistance > 0) {
        this.zoom = Math.max(0.8, Math.min(2.5, this.zoom * (distance / this.pinchDistance)));
        this.applyCamera();
      }
      this.pinchDistance = distance;
      return;
    }

    if (event.pointerId !== this.pointer.id) return;
    if (!this.pointer.dragging && Math.hypot(event.clientX - this.pointer.startX, event.clientY - this.pointer.startY) > 7) this.pointer.dragging = true;
    if (this.pointer.dragging) {
      const unitsPerPixel = (this.baseHeight / this.zoom) / Math.max(1, this.canvas.clientHeight);
      this.target.x -= dx * unitsPerPixel;
      this.target.z += dy * unitsPerPixel;
      this.target.x = Math.max(0, Math.min(UMLAND.width, this.target.x));
      this.target.z = Math.max(0, Math.min(UMLAND.height, this.target.z));
    }
  };

  private onPointerUp = (event: PointerEvent): void => {
    const wasMultiTouch = this.multiTouch;
    this.pointers.delete(event.pointerId);
    if (wasMultiTouch) {
      if (this.pointers.size === 0) {
        this.pointer.id = -1;
        this.pointer.dragging = false;
        this.multiTouch = false;
        this.pinchDistance = 0;
      }
      return;
    }
    if (event.pointerId !== this.pointer.id) return;
    if (!this.pointer.dragging) {
      const rect = this.canvas.getBoundingClientRect();
      const point = new Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      this.raycaster.setFromCamera(point, this.camera);
      const hit = this.raycaster.intersectObjects(this.hitTargets, false)[0]?.object;
      const index = hit?.userData.farmIndex;
      if (typeof index === 'number') this.onSelect(index);
    }
    this.pointer.id = -1;
  };

  private onPointerCancel = (event: PointerEvent): void => {
    this.pointers.delete(event.pointerId);
    this.pointer.id = -1;
    this.pointer.dragging = false;
    this.multiTouch = this.pointers.size > 0;
    this.pinchDistance = 0;
  };

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    this.zoom = Math.max(0.8, Math.min(2.5, this.zoom * (event.deltaY > 0 ? 0.92 : 1.08)));
    this.applyCamera();
  };

  dispose(): void {
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('pointercancel', this.onPointerCancel);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.scene.traverse((object) => {
      const mesh = object as Mesh;
      mesh.geometry?.dispose?.();
      if (Array.isArray(mesh.material)) mesh.material.forEach((item) => item.dispose());
      else mesh.material?.dispose?.();
      const sprite = object as Sprite;
      const map = sprite.material instanceof SpriteMaterial ? sprite.material.map : null;
      map?.dispose();
    });
    this.renderer.dispose();
  }
}
