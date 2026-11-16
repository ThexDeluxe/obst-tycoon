// Tonmodul: alle Töne entstehen per Synthese mit der Web Audio API, ohne externe Dateien.
// Das Modul kennt die Simulation nicht. Die Spielsteuerung meldet Ereignisse und Umgebungswerte.

export type SoundName =
  | 'sale'
  | 'truck'
  | 'unload'
  | 'warn'
  | 'click'
  | 'sheetOpen'
  | 'sheetClose'
  | 'build'
  | 'stamp'
  | 'good'
  | 'bad'
  | 'dirty'
  | 'dice'
  | 'roundWin'
  | 'roundLose'
  | 'conquer'
  | 'defeat'
  | 'alarm';

/** Mindestabstand zwischen zwei gleichen Tönen in Sekunden (häufige Töne werden gebündelt) */
const THROTTLE: Partial<Record<SoundName, number>> = {
  sale: 0.5,
  unload: 0.14,
  click: 0.05,
  dice: 0.3,
};

export interface AudioVolumes {
  muted: boolean;
  effects: number;
  ambience: number;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private fx: GainNode | null = null;
  private amb: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private city: GainNode | null = null;
  private cityFilter: BiquadFilterNode | null = null;
  private last = new Map<SoundName, number>();
  private volumes: AudioVolumes = { muted: false, effects: 0.7, ambience: 0.4 };
  private active = true;
  private cricketTimer = 0;
  private evening = false;

  /** Der Ton darf erst nach dem ersten Tippen starten (Vorgabe der Browser) */
  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended' && this.active) this.ctx.resume().catch(() => undefined);
      return;
    }
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    try {
      this.ctx = new Ctx();
    } catch {
      return;
    }
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.connect(ctx.destination);
    this.fx = ctx.createGain();
    this.fx.connect(this.master);
    this.amb = ctx.createGain();
    this.amb.connect(this.master);
    // Rauschpuffer für Stadtlärm und Geräusche
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < len; i++) {
      // braunes Rauschen: weicher als weißes
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    this.startCity();
    this.applyVolumes();
  }

  get running(): boolean {
    return !!this.ctx && this.ctx.state === 'running';
  }

  setVolumes(v: AudioVolumes): void {
    this.volumes = { ...v };
    this.applyVolumes();
  }

  /** Pause oder verlassene App: sofort still */
  setActive(active: boolean): void {
    this.active = active;
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(active && !this.volumes.muted ? 1 : 0, t, active ? 0.08 : 0.01);
    if (!active) this.ctx.suspend().catch(() => undefined);
    else this.ctx.resume().catch(() => undefined);
  }

  private applyVolumes(): void {
    if (!this.ctx || !this.master || !this.fx || !this.amb) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.volumes.muted || !this.active ? 0 : 1, t, 0.05);
    this.fx.gain.setTargetAtTime(this.volumes.effects, t, 0.05);
    this.amb.gain.setTargetAtTime(this.volumes.ambience, t, 0.2);
  }

  private startCity(): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    this.cityFilter = ctx.createBiquadFilter();
    this.cityFilter.type = 'lowpass';
    this.cityFilter.frequency.value = 420;
    this.city = ctx.createGain();
    this.city.gain.value = 0;
    src.connect(this.cityFilter).connect(this.city).connect(this.amb!);
    src.start();
  }

  /**
   * Umgebung: Stadtlärm folgt der Zahl der Passanten und der Uhrzeit, abends zirpen Grillen.
   * Bei hohem Tempo wird die Umgebung leiser.
   */
  ambience(hour: number, crowd: number, speed: number): void {
    if (!this.ctx || !this.city || !this.cityFilter) return;
    const t = this.ctx.currentTime;
    const day = hour >= 7 && hour < 20 ? 1 : 0.55;
    const slow = speed >= 4 ? 0.45 : speed >= 2 ? 0.75 : 1;
    this.city.gain.setTargetAtTime((0.12 + 0.35 * Math.min(1, crowd)) * day * slow, t, 0.8);
    this.cityFilter.frequency.setTargetAtTime(300 + 260 * Math.min(1, crowd), t, 1);
    this.evening = hour >= 20;
    if (this.evening && this.active && !this.cricketTimer) {
      this.cricketTimer = window.setInterval(() => this.cricket(), 700);
    } else if ((!this.evening || !this.active) && this.cricketTimer) {
      clearInterval(this.cricketTimer);
      this.cricketTimer = 0;
    }
  }

  private cricket(): void {
    if (!this.ctx || !this.amb || !this.running || Math.random() < 0.35) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (let k = 0; k < 3; k++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 4300 + Math.random() * 300;
      g.gain.setValueAtTime(0, t + k * 0.06);
      g.gain.linearRampToValueAtTime(0.025, t + k * 0.06 + 0.01);
      g.gain.linearRampToValueAtTime(0, t + k * 0.06 + 0.04);
      o.connect(g).connect(this.amb);
      o.start(t + k * 0.06);
      o.stop(t + k * 0.06 + 0.05);
    }
  }

  play(name: SoundName): void {
    if (!this.ctx || !this.fx || this.volumes.muted || !this.active || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const gap = THROTTLE[name];
    if (gap) {
      const last = this.last.get(name) ?? -1;
      if (now - last < gap) return;
    }
    this.last.set(name, now);
    SOUNDS[name](this.ctx, this.fx, this.noise!, now);
  }
}

// ---------------------------------------------------------------------------
// Klangbausteine
// ---------------------------------------------------------------------------

type Synth = (ctx: AudioContext, out: AudioNode, noise: AudioBuffer, t: number) => void;

function tone(ctx: AudioContext, out: AudioNode, t: number, freq: number, dur: number, vol: number, type: OscillatorType = 'sine', endFreq?: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noiseBurst(
  ctx: AudioContext,
  out: AudioNode,
  noise: AudioBuffer,
  t: number,
  dur: number,
  vol: number,
  filter: BiquadFilterType,
  f0: number,
  f1?: number,
): void {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const bq = ctx.createBiquadFilter();
  bq.type = filter;
  bq.frequency.setValueAtTime(f0, t);
  if (f1) bq.frequency.exponentialRampToValueAtTime(f1, t + dur);
  bq.Q.value = 1.2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bq).connect(g).connect(out);
  src.start(t, Math.random());
  src.stop(t + dur + 0.05);
}

function thud(ctx: AudioContext, out: AudioNode, noise: AudioBuffer, t: number, vol: number): void {
  tone(ctx, out, t, 130, 0.16, vol, 'sine', 55);
  noiseBurst(ctx, out, noise, t, 0.06, vol * 0.5, 'lowpass', 900);
}

const SOUNDS: Record<SoundName, Synth> = {
  sale: (ctx, out, _n, t) => {
    tone(ctx, out, t, 1760, 0.22, 0.05);
    tone(ctx, out, t + 0.05, 2349, 0.3, 0.04);
  },
  truck: (ctx, out, noise, t) => {
    // Motor, Bremse, Stillstand
    const o = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(70, t);
    o.frequency.linearRampToValueAtTime(48, t + 1.1);
    lp.type = 'lowpass';
    lp.frequency.value = 280;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.2);
    g.gain.linearRampToValueAtTime(0.0001, t + 1.2);
    o.connect(lp).connect(g).connect(out);
    o.start(t);
    o.stop(t + 1.25);
    noiseBurst(ctx, out, noise, t + 0.9, 0.35, 0.05, 'bandpass', 3200, 1800);
  },
  unload: (ctx, out, noise, t) => thud(ctx, out, noise, t, 0.12),
  warn: (ctx, out, _n, t) => {
    tone(ctx, out, t, 220, 0.14, 0.09, 'square');
    tone(ctx, out, t + 0.2, 196, 0.18, 0.09, 'square');
  },
  click: (ctx, out, noise, t) => noiseBurst(ctx, out, noise, t, 0.025, 0.06, 'highpass', 2500),
  sheetOpen: (ctx, out, noise, t) => noiseBurst(ctx, out, noise, t, 0.18, 0.05, 'bandpass', 600, 2400),
  sheetClose: (ctx, out, noise, t) => noiseBurst(ctx, out, noise, t, 0.16, 0.045, 'bandpass', 2200, 500),
  build: (ctx, out, noise, t) => {
    for (let k = 0; k < 3; k++) thud(ctx, out, noise, t + k * 0.16, 0.12);
    tone(ctx, out, t + 0.55, 880, 0.35, 0.05);
    tone(ctx, out, t + 0.62, 1320, 0.4, 0.04);
  },
  stamp: (ctx, out, noise, t) => {
    thud(ctx, out, noise, t, 0.18);
    noiseBurst(ctx, out, noise, t + 0.01, 0.12, 0.05, 'highpass', 1800);
  },
  good: (ctx, out, _n, t) => {
    tone(ctx, out, t, 660, 0.18, 0.06, 'triangle');
    tone(ctx, out, t + 0.1, 990, 0.25, 0.06, 'triangle');
  },
  bad: (ctx, out, _n, t) => {
    tone(ctx, out, t, 440, 0.2, 0.06, 'triangle');
    tone(ctx, out, t + 0.12, 311, 0.3, 0.06, 'triangle');
  },
  dirty: (ctx, out, noise, t) => {
    tone(ctx, out, t, 98, 0.6, 0.12, 'sine', 70);
    noiseBurst(ctx, out, noise, t, 0.4, 0.03, 'lowpass', 300);
  },
  dice: (ctx, out, noise, t) => {
    for (let k = 0; k < 5; k++) noiseBurst(ctx, out, noise, t + k * 0.05 + Math.random() * 0.02, 0.03, 0.06, 'bandpass', 2600 + Math.random() * 800);
  },
  roundWin: (ctx, out, _n, t) => tone(ctx, out, t, 784, 0.18, 0.05, 'triangle'),
  roundLose: (ctx, out, _n, t) => tone(ctx, out, t, 262, 0.22, 0.05, 'triangle'),
  conquer: (ctx, out, _n, t) => {
    tone(ctx, out, t, 523, 0.18, 0.07, 'triangle');
    tone(ctx, out, t + 0.14, 659, 0.18, 0.07, 'triangle');
    tone(ctx, out, t + 0.28, 784, 0.45, 0.08, 'triangle');
  },
  defeat: (ctx, out, _n, t) => {
    tone(ctx, out, t, 196, 0.3, 0.08, 'triangle');
    tone(ctx, out, t + 0.22, 147, 0.5, 0.08, 'triangle');
  },
  alarm: (ctx, out, _n, t) => {
    for (let k = 0; k < 3; k++) tone(ctx, out, t + k * 0.22, 880, 0.12, 0.06, 'square');
  },
};

export const audio = new AudioEngine();
