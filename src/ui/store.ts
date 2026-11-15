// Zustand der Oberfläche (Signale) und Einstellungen.
import { signal } from '@preact/signals';
import { SAVE } from '../data/balance';

export interface Settings {
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
export type SheetId = 'fruit' | 'dealers' | 'fighters' | 'attack' | 'settings';
export const sheet = signal<SheetId | null>(null);
/** Viertel, das im Angriffsblatt gezeigt wird */
export const attackTarget = signal<number | null>(null);
/** Angetippter Verkäufer */
export const selectedDealer = signal<number | null>(null);
/** Abschlussbild wurde schon gezeigt */
export const winShown = signal(false);

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
