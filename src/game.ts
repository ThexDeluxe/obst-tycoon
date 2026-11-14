// Steuert Simulation, Darstellung und Oberfläche: feste Tickrate mit Akkumulator,
// Pause bei verborgenem Tab, Autosave.
import { CAMERA, TIME } from './data/balance';
import { GameView } from './render/view';
import { PointerInput } from './render/input';
import { saveToSlot } from './save/storage';
import { enqueue, type Command } from './sim/commands';
import { createStepOutput, flushCommands, step, type StepOutput } from './sim/step';
import type { GameState } from './sim/types';
import { getWorld, type World } from './sim/world';
import { assignFor, notices, reportHidden, screen, selection, settings, speedIndex, uiTick, type Settings } from './ui/store';
import { moneyExact } from './ui/format';

export class Game {
  readonly world: World;
  readonly view: GameView;
  state: GameState;
  private out: StepOutput = createStepOutput();
  private acc = 0;
  private lastTime = 0;
  private uiTimer = 0;
  private autosaveTimer = 0;
  private raf = 0;
  private keys = new Set<string>();
  private hiddenSpeed: number | null = null;
  private input: PointerInput;
  // Messwerte für die Debug-Anzeige
  fps = 0;
  tps = 0;
  private fpsFrames = 0;
  private fpsTime = 0;
  private tickCount = 0;
  /** Wird nach jedem Tagesabschluss aufgerufen */
  onDayEnd: (() => void) | null = null;
  /** Hintergrundspiel hinter dem Hauptmenü (wird nie gespeichert) */
  demo = false;

  constructor(readonly canvas: HTMLCanvasElement, state: GameState) {
    this.world = getWorld();
    this.state = state;
    const s = settings.value;
    this.view = new GameView(canvas, this.world, { shadows: s.shadows, quality: s.quality }, document.getElementById('floaters') ?? document.body);
    this.input = new PointerInput(canvas, this.view.rig, {
      onTap: (x, y) => this.onTap(x, y),
      onDoubleTap: (x, y) => this.onDoubleTap(x, y),
    });
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('visibilitychange', this.onVisibility);
    window.addEventListener('pagehide', this.onPageHide);
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  dispose(): void {
    cancelAnimationFrame(this.raf);
    this.input.dispose();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('visibilitychange', this.onVisibility);
    window.removeEventListener('pagehide', this.onPageHide);
    this.view.renderer.dispose();
  }

  /** Übernimmt einen neuen oder geladenen Spielstand. */
  load(state: GameState, demo: boolean): void {
    this.state = state;
    this.demo = demo;
    this.acc = 0;
    this.autosaveTimer = 0;
    this.view.selectedPedId = null;
    this.view.rig.follow = null;
    this.view.rig.lookAt(this.world.warehouse.x + 6, this.world.warehouse.y + 2);
    this.view.floaters.clear();
    this.lastMessageId = state.messages.length ? state.messages[state.messages.length - 1].id : 0;
    selection.value = null;
    assignFor.value = null;
    reportHidden.value = false;
    notices.value = [];
  }
  private lastMessageId = 0;

  /** Neue Meldungen aus der Simulation an die Oberfläche geben */
  private pollMessages(): void {
    const msgs = this.state.messages;
    if (!msgs.length || msgs[msgs.length - 1].id <= this.lastMessageId) return;
    const fresh = msgs.filter((m) => m.id > this.lastMessageId);
    this.lastMessageId = msgs[msgs.length - 1].id;
    if (this.demo) return;
    const now = performance.now();
    // Der Tagesabschluss hat sein eigenes Fenster und braucht keine Meldung
    const add = fresh.filter((m) => m.kind !== 'report').map((m) => ({ id: m.id, kind: m.kind, text: m.text, x: m.x, y: m.y, time: now }));
    if (!add.length) return;
    notices.value = [...notices.value, ...add].slice(-4);
  }

  /** Kamera zu einem Ort fahren */
  focus(x: number, y: number): void {
    this.view.rig.follow = null;
    this.view.rig.lookAt(x, y);
  }

  /** Kamera folgt einer eigenen Person */
  followPerson(id: number): void {
    this.view.rig.follow = () => {
      const p = this.state.staff.find((q) => q.id === id);
      return p ? { x: p.x, y: p.y } : null;
    };
  }

  applySettings(s: Settings): void {
    this.view.applySettings({ shadows: s.shadows, quality: s.quality });
  }

  command(cmd: Command): void {
    enqueue(this.state, cmd);
  }

  setSpeed(i: number): void {
    speedIndex.value = Math.max(0, Math.min(TIME.speeds.length - 1, i));
  }

  togglePause(): void {
    if (speedIndex.value === 0) this.setSpeed(this.lastSpeed || 1);
    else {
      this.lastSpeed = speedIndex.value;
      this.setSpeed(0);
    }
  }
  private lastSpeed = 1;

  autosave(): void {
    if (this.demo) return;
    saveToSlot('auto', this.state).catch(() => {
      /* Speichern im Hintergrund darf das Spiel nicht stören */
    });
  }

  private onResize = () => this.view.resize();

  private onVisibility = () => {
    if (document.hidden) {
      this.autosave();
      if (this.hiddenSpeed === null) {
        this.hiddenSpeed = speedIndex.value;
        this.setSpeed(0);
      }
    } else if (this.hiddenSpeed !== null) {
      this.setSpeed(this.hiddenSpeed);
      this.hiddenSpeed = null;
      this.lastTime = performance.now();
      this.acc = 0;
    }
  };

  private onPageHide = () => this.autosave();

  private onBlur = () => this.keys.clear();

  private onKeyDown = (e: KeyboardEvent) => {
    if (screen.value !== 'game') return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) return;
    this.keys.add(e.code);
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        this.togglePause();
        break;
      case 'Digit1':
        this.setSpeed(1);
        break;
      case 'Digit2':
        this.setSpeed(2);
        break;
      case 'Digit3':
        this.setSpeed(3);
        break;
      case 'KeyQ':
        this.view.rig.rotate(-1);
        break;
      case 'KeyE':
        this.view.rig.rotate(1);
        break;
      case 'F3':
        e.preventDefault();
        settings.value = { ...settings.value, debug: !settings.value.debug };
        break;
    }
    this.keyHook?.(e);
  };
  /** Zusätzliche Tastenkürzel der Oberfläche */
  keyHook: ((e: KeyboardEvent) => void) | null = null;

  private onKeyUp = (e: KeyboardEvent) => this.keys.delete(e.code);

  private onTap(x: number, y: number): void {
    // Zuweisungsmodus: Tippen auf einen Verkaufsplatz weist ihn zu
    if (assignFor.value !== null) {
      const spot = this.view.spotAt(x, y, 1.2);
      if (spot !== null) {
        this.command({ type: 'assign', personId: assignFor.value, spot });
        selection.value = { kind: 'person', id: assignFor.value };
      }
      assignFor.value = null;
      return;
    }
    const person = this.view.nearestStaff(x, y, 30);
    if (person !== null) {
      selection.value = { kind: 'person', id: person };
      this.view.selectedPedId = null;
      return;
    }
    const spot = this.view.spotAt(x, y);
    if (spot !== null) {
      selection.value = { kind: 'spot', index: spot };
      this.view.selectedPedId = null;
      return;
    }
    selection.value = null;
    const ped = this.view.nearestPed(x, y, 26);
    this.view.selectedPedId = ped;
    if (ped === null) this.view.rig.follow = null;
  }

  private onDoubleTap(x: number, y: number): void {
    const person = this.view.nearestStaff(x, y, 32);
    if (person !== null) {
      selection.value = { kind: 'person', id: person };
      this.followPerson(person);
      return;
    }
    const ped = this.view.nearestPed(x, y, 30);
    if (ped !== null) {
      this.view.selectedPedId = ped;
      this.view.rig.follow = () => {
        const p = this.state.peds.find((q) => q.id === ped);
        return p ? { x: p.x, y: p.y } : null;
      };
    }
  }

  private handleKeys(dt: number): void {
    let r = 0;
    let f = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) r -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) r += 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) f += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) f -= 1;
    if (r || f) {
      const sp = CAMERA.panKeySpeed * (this.view.rig.visibleHeight / 20) * dt;
      this.view.rig.panUnits(r * sp, f * sp);
    }
  }

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.1, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.handleKeys(dt);
    const inMenu = screen.value === 'menu';
    const speed = inMenu ? (this.demo ? 1 : 0) : TIME.speeds[speedIndex.value];
    const out = this.out;
    out.dayEnded = false;
    if (speed > 0 && this.state.phase === 'day') {
      this.acc += dt * speed * TIME.ticksPerSecond;
      let n = Math.floor(this.acc);
      if (n > TIME.maxTicksPerFrame) {
        n = TIME.maxTicksPerFrame;
        this.acc = n;
      }
      for (let i = 0; i < n; i++) {
        step(this.state, this.world, out);
        this.tickCount++;
        if (this.state.phase !== 'day') {
          this.acc = n;
          break;
        }
      }
      this.acc -= n;
    } else {
      flushCommands(this.state, this.world, out);
    }
    const alpha = this.state.phase === 'day' && speed > 0 ? Math.min(1, Math.max(0, this.acc)) : 1;
    // Umsatzzahlen über den Ständen
    if (out.sales.length) {
      if (settings.value.saleNumbers && !this.demo && !inMenu) {
        const start = Math.max(0, out.sales.length - 3);
        for (let i = start; i < out.sales.length; i++) {
          const e = out.sales[i];
          this.view.floaters.spawn(e.x, e.y + 0.3, `+${moneyExact(e.amount)}`);
        }
      }
      out.sales.length = 0;
    }
    const sel = selection.value;
    this.view.highlight.personId = sel?.kind === 'person' ? sel.id : assignFor.value;
    this.view.highlight.spot = sel?.kind === 'spot' ? sel.index : null;
    this.view.highlight.assigning = assignFor.value !== null;
    this.view.frame(this.state, alpha, dt);

    if (out.dayEnded) {
      reportHidden.value = false;
      if (this.demo) this.command({ type: 'nextDay' });
      this.autosave();
      this.onDayEnd?.();
    }

    // Messwerte
    this.fpsFrames++;
    this.fpsTime += dt;
    if (this.fpsTime >= 1) {
      this.fps = Math.round(this.fpsFrames / this.fpsTime);
      this.tps = Math.round(this.tickCount / this.fpsTime);
      this.fpsFrames = 0;
      this.tickCount = 0;
      this.fpsTime = 0;
    }
    // Oberfläche viermal pro Sekunde
    this.uiTimer += dt;
    if (this.uiTimer >= 0.25) {
      this.uiTimer = 0;
      this.pollMessages();
      uiTick.value++;
    }
    if (!inMenu) this.autosaveTimer += dt;
    if (this.autosaveTimer >= settings.value.autosaveSeconds) {
      this.autosaveTimer = 0;
      this.autosave();
    }
  };
}

let current: Game | null = null;
export function currentGame(): Game | null {
  return current;
}
export function setCurrentGame(g: Game | null): void {
  current = g;
}
