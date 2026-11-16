// Zustand der Oberfläche (Signale) und Einstellungen.
import { signal } from '@preact/signals';
import { SAVE } from '../data/balance';

export interface Settings {
  muted: boolean;
  effectsVolume: number;
  ambienceVolume: number;
  shadows: boolean;
  quality: 'low' | 'medium' | 'high';
  saleNumbers: boolean;
  autosaveSeconds: number;
  debug: boolean;
  tutorial: boolean;
}

const KEY = 'obst-tycoon-settings';
const isTouch = typeof window !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

function defaults(): Settings {
  return {
    muted: false,
    effectsVolume: 0.7,
    ambienceVolume: 0.4,
    shadows: true,
    quality: isTouch ? 'medium' : 'high',
    saleNumbers: true,
    autosaveSeconds: SAVE.autosaveSeconds,
    debug: false,
    tutorial: true,
  };
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults(), ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    // Speicher nicht verfügbar: Standardwerte
  }
  return defaults();
}

export const settings = signal<Settings>(loadSettings());

export function updateSettings(patch: Partial<Settings>): void {
  settings.value = { ...settings.value, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(settings.value));
  } catch {
    // ignorieren
  }
}

/** Wird viermal pro Sekunde erhöht; die Oberfläche liest dann den Spielzustand neu. */
export const uiTick = signal(0);
export const screen = signal<'menu' | 'game'>('menu');
export const speedIndex = signal(1);
export const toast = signal<{ text: string; kind: 'info' | 'error'; id: number } | null>(null);
export const portraitDismissed = signal(false);

/** Geöffnetes Blatt am unteren Rand */
export type SheetId = 'stock' | 'farms' | 'people' | 'build' | 'act' | 'attack' | 'settings';
export const sheet = signal<SheetId | null>(null);
/** Viertel, das im Angriffsblatt gezeigt wird */
export const attackTarget = signal<number | null>(null);
/** Angetippter Verkäufer */
export const selectedDealer = signal<number | null>(null);
/** Aufgeklappte Sorte im Lagerblatt */
export const expandedFruit = signal<string | null>(null);
/** Gewählter Hof im Blatt Höfe */
export const selectedFarm = signal(0);
/** Vertrag in Bearbeitung (Hof und Bedingungen) */
export const contractDraft = signal<{ farm: number; crates: Record<string, number>; pricePct: number; days: number; exclusive: boolean } | null>(null);
/** Abschlussbild wurde schon gezeigt */
export const winShown = signal(false);
/** Erklärung zu einer angetippten Zahl */
export const explain = signal<{ text: string; id: number } | null>(null);
let explainId = 0;
export function showExplain(text: string): void {
  const id = ++explainId;
  explain.value = { text, id };
  setTimeout(() => {
    if (explain.value?.id === id) explain.value = null;
  }, 5000);
}

export interface Notice {
  id: number;
  kind: string;
  text: string;
  x?: number;
  y?: number;
  time: number;
}
export const notices = signal<Notice[]>([]);

let toastId = 0;
export function showToast(text: string, kind: 'info' | 'error' = 'info'): void {
  const id = ++toastId;
  toast.value = { text, kind, id };
  setTimeout(() => {
    if (toast.value?.id === id) toast.value = null;
  }, 3200);
}

export const IS_TOUCH = isTouch;
