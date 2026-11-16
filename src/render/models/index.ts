// Modell-Registry: pro Objekttyp eine Funktion, die das Modell prozedural aus Grundformen baut.
// Die Registry ist darauf vorbereitet, später GLB-Modelle aus CC0-Paketen zu laden
// (Dateien unter public/models/, Skalierung und Versatz in MODEL_FILES). Fehlt eine Datei,
// wird das prozedurale Modell genutzt.
import { BufferGeometry, Mesh, MeshLambertMaterial, type Object3D } from 'three';
import { Batcher } from '../batcher';
import { PAL } from '../palette';

export type ModelId =
  | 'tree'
  | 'lamp'
  | 'car'
  | 'bus'
  | 'stand'
  | 'umbrella'
  | 'handcart'
  | 'scooter'
  | 'cargobike'
  | 'foodtruck'
  | 'truck'
  | 'crate';

export interface ModelFile {
  file: string;
  scale: number;
  offset: [number, number, number];
}

/** GLB-Dateien je Modell (in Version 1 leer, alle Modelle sind prozedural) */
export const MODEL_FILES: Partial<Record<ModelId, ModelFile>> = {};

/** Prozedurale Modelle. Fahrtrichtung bzw. Vorderseite zeigt nach +Z. */
export const MODELS: Record<ModelId, (b: Batcher) => void> = {
  tree(b) {
    b.color(0xffffff);
    b.cone(0, 0, 0.35, 1.05, 0.42, 7);
    b.cone(0, 0, 0.75, 1.45, 0.32, 7);
  },
  lamp(b) {
    b.color(PAL.lamp);
    b.cylinder(0, 0, 0, 1.35, 0.035, 5);
    b.box(0, 1.3, -0.025, 0.32, 1.35, 0.025);
  },
  car(b) {
    b.color(0xffffff);
    b.box(-0.22, 0.1, -0.45, 0.22, 0.34, 0.45);
    b.color(0x39434c);
    b.box(-0.2, 0.34, -0.25, 0.2, 0.55, 0.2);
    b.color(0x22262a);
    for (const [x, z] of [[-0.23, -0.28], [0.23, -0.28], [-0.23, 0.28], [0.23, 0.28]]) b.box(x - 0.03, 0, z - 0.09, x + 0.03, 0.17, z + 0.09);
    b.color(0xfff4d0);
    b.box(-0.18, 0.2, 0.45, -0.08, 0.26, 0.46);
    b.box(0.08, 0.2, 0.45, 0.18, 0.26, 0.46);
  },
  bus(b) {
    b.color(0xe8e2d0);
    b.box(-0.3, 0.12, -1.0, 0.3, 0.82, 1.0);
    b.color(0x2f5d7c);
    b.box(-0.305, 0.12, -1.0, 0.305, 0.3, 1.0);
    b.color(0x39434c);
    b.box(-0.31, 0.45, -0.9, 0.31, 0.72, 0.95);
    b.box(-0.25, 0.42, 1.0, 0.25, 0.75, 1.01);
    b.color(0x22262a);
    for (const [x, z] of [[-0.3, -0.65], [0.3, -0.65], [-0.3, 0.65], [0.3, 0.65]]) b.box(x - 0.03, 0, z - 0.12, x + 0.03, 0.22, z + 0.12);
  },
  /** Klapptisch mit Kisten, steht vor dem Verkäufer */
  stand(b) {
    b.color(0x8c6a4a);
    b.box(-0.3, 0.3, -0.13, 0.3, 0.34, 0.13);
    for (const x of [-0.27, 0.27]) for (const z of [-0.1, 0.1]) b.box(x - 0.02, 0, z - 0.02, x + 0.02, 0.3, z + 0.02);
    b.color(PAL.crateWood);
    b.box(-0.27, 0.34, -0.11, -0.02, 0.46, 0.11);
    b.box(0.02, 0.34, -0.11, 0.27, 0.46, 0.11);
    b.box(-0.24, 0, -0.1, 0.0, 0.14, 0.1);
  },
  /** Schirm, Farbe über die Instanzfarbe */
  umbrella(b) {
    b.color(0x6f6a64);
    b.cylinder(0, 0, 0, 1.0, 0.018, 4);
    b.color(0xffffff);
    const r = 0.5;
    const seg = 8;
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2;
      const a1 = ((i + 1) / seg) * Math.PI * 2;
      b.tri(Math.cos(a0) * r, 0.86, Math.sin(a0) * r, 0, 1.06, 0, Math.cos(a1) * r, 0.86, Math.sin(a1) * r);
      b.tri(0, 0.86, 0, Math.cos(a0) * r, 0.86, Math.sin(a0) * r, Math.cos(a1) * r, 0.86, Math.sin(a1) * r);
    }
  },
  handcart(b) {
    b.color(0x7a5a3c);
    b.box(-0.2, 0.18, -0.3, 0.2, 0.22, 0.25);
    b.color(PAL.crateWood);
    b.box(-0.18, 0.22, -0.28, 0.18, 0.4, 0.22);
    b.color(0x3a3f45);
    b.box(-0.23, 0.02, -0.05, -0.2, 0.2, 0.13);
    b.box(0.2, 0.02, -0.05, 0.23, 0.2, 0.13);
    b.color(0x5a5f66);
    b.box(-0.16, 0.2, 0.25, -0.13, 0.5, 0.5);
    b.box(0.13, 0.2, 0.25, 0.16, 0.5, 0.5);
  },
  scooter(b) {
    b.color(0x3a3f45);
    b.box(-0.05, 0.04, -0.3, 0.05, 0.08, 0.3);
    b.box(-0.03, 0.08, 0.26, 0.03, 0.62, 0.3);
    b.box(-0.16, 0.6, 0.27, 0.16, 0.63, 0.3);
    b.color(0x2f7d4a);
    b.box(-0.13, 0.08, -0.32, 0.13, 0.34, -0.08);
    b.color(0x22262a);
    b.box(-0.025, 0, -0.32, 0.025, 0.09, -0.22);
    b.box(-0.025, 0, 0.22, 0.025, 0.09, 0.32);
  },
  cargobike(b) {
    b.color(0x22262a);
    for (const z of [-0.38, 0.32]) b.box(-0.03, 0, z - 0.11, 0.03, 0.22, z + 0.11);
    b.color(0x4a4f55);
    b.box(-0.03, 0.18, -0.38, 0.03, 0.24, 0.1);
    b.box(-0.03, 0.18, -0.1, 0.03, 0.5, -0.06);
    b.box(-0.03, 0.5, -0.15, 0.03, 0.54, 0.0);
    b.color(0x2f7d4a);
    b.box(-0.22, 0.2, 0.1, 0.22, 0.48, 0.55);
    b.color(PAL.crateWood);
    b.box(-0.18, 0.48, 0.14, 0.18, 0.56, 0.5);
  },
  foodtruck(b) {
    b.color(0xe8e4da);
    b.box(-0.32, 0.12, -0.7, 0.32, 0.86, 0.45);
    b.color(0x2f7d4a);
    b.box(-0.325, 0.12, -0.7, 0.325, 0.3, 0.45);
    b.color(0xe8e4da);
    b.box(-0.3, 0.12, 0.45, 0.3, 0.6, 0.75);
    b.color(0x39434c);
    b.box(-0.28, 0.42, 0.6, 0.28, 0.58, 0.76);
    b.box(-0.33, 0.45, -0.55, -0.32, 0.72, 0.25);
    b.color(0x22262a);
    for (const [x, z] of [[-0.32, -0.45], [0.32, -0.45], [-0.32, 0.5], [0.32, 0.5]]) b.box(x - 0.03, 0, z - 0.11, x + 0.03, 0.22, z + 0.11);
  },
  /** Lieferwagen mit Kastenaufbau, Fahrtrichtung +Z */
  truck(b) {
    b.color(0xf2f0ea);
    b.box(-0.42, 0.18, -1.15, 0.42, 1.25, 0.55);
    b.color(0x2f7d4a);
    b.box(-0.425, 0.42, -1.1, 0.425, 0.62, 0.5);
    b.color(0xe8e4da);
    b.box(-0.4, 0.18, 0.55, 0.4, 0.95, 1.15);
    b.color(0x39434c);
    b.box(-0.38, 0.62, 1.0, 0.38, 0.9, 1.16);
    b.box(-0.41, 0.62, 0.62, -0.4, 0.88, 1.0);
    b.box(0.4, 0.62, 0.62, 0.41, 0.88, 1.0);
    b.color(0x22262a);
    for (const [x, z] of [[-0.42, -0.75], [0.42, -0.75], [-0.42, 0.8], [0.42, 0.8]]) b.box(x - 0.04, 0, z - 0.17, x + 0.04, 0.3, z + 0.17);
    b.color(0xfff4d0);
    b.box(-0.32, 0.3, 1.15, -0.18, 0.4, 1.17);
    b.box(0.18, 0.3, 1.15, 0.32, 0.4, 1.17);
  },
  crate(b) {
    b.color(PAL.crateWood);
    b.box(-0.22, 0, -0.17, 0.22, 0.27, 0.17);
  },
};

const geometryCache = new Map<ModelId, BufferGeometry>();

/** Geometrie eines Modells (zwischengespeichert, für InstancedMesh) */
export function modelGeometry(id: ModelId): BufferGeometry {
  let g = geometryCache.get(id);
  if (!g) {
    const b = new Batcher();
    MODELS[id](b);
    g = b.build();
    geometryCache.set(id, g);
  }
  return g;
}

let sharedMaterial: MeshLambertMaterial | null = null;

/** Liefert ein einzelnes Object3D eines Modells */
export function createModel(id: ModelId): Object3D {
  if (!sharedMaterial) sharedMaterial = new MeshLambertMaterial({ vertexColors: true });
  const m = new Mesh(modelGeometry(id), sharedMaterial);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
