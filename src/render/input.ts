// Zeiger-Eingaben auf der Spielfläche: Ziehen, Pinch, Tippen, Doppeltippen, Mausrad.
import type { CameraRig } from './camera';

export interface InputCallbacks {
  onTap(x: number, y: number): void;
  onDoubleTap(x: number, y: number): void;
}

interface PointerInfo {
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
}

export class PointerInput {
  private pointers = new Map<number, PointerInfo>();
  private dragging = false;
  private pinchBase = 0;
  private lastTap = { time: 0, x: 0, y: 0 };
  private wheelAcc = 0;
  private multiTouch = false;

  constructor(private el: HTMLElement, private rig: CameraRig, private cb: InputCallbacks) {
    el.addEventListener('pointerdown', this.down);
    el.addEventListener('pointermove', this.move);
    el.addEventListener('pointerup', this.up);
    el.addEventListener('pointercancel', this.cancel);
    el.addEventListener('wheel', this.wheel, { passive: false });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  dispose(): void {
    this.el.removeEventListener('pointerdown', this.down);
    this.el.removeEventListener('pointermove', this.move);
    this.el.removeEventListener('pointerup', this.up);
    this.el.removeEventListener('pointercancel', this.cancel);
    this.el.removeEventListener('wheel', this.wheel);
  }

  private down = (e: PointerEvent) => {
    this.el.setPointerCapture?.(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, startTime: performance.now() });
    if (this.pointers.size === 1) {
      this.dragging = false;
      this.multiTouch = false;
    }
    if (this.pointers.size === 2) {
      this.multiTouch = true;
      this.pinchBase = this.pinchDistance();
    }
  };

  private pinchDistance(): number {
    const [a, b] = [...this.pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private move = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (this.pointers.size === 1) {
      if (!this.dragging && Math.hypot(e.clientX - p.startX, e.clientY - p.startY) > 8) this.dragging = true;
      if (this.dragging) this.rig.panPixels(dx, dy);
    } else if (this.pointers.size === 2) {
      // Verschieben mit zwei Fingern (halbe Bewegung je Finger) und Pinch in Stufen
      this.rig.panPixels(dx / 2, dy / 2);
      p.x = e.clientX;
      p.y = e.clientY;
      const d = this.pinchDistance();
      if (this.pinchBase > 0) {
        const ratio = d / this.pinchBase;
        if (ratio > 1.28) {
          this.rig.zoomStep(-1);
          this.pinchBase = d;
        } else if (ratio < 1 / 1.28) {
          this.rig.zoomStep(1);
          this.pinchBase = d;
        }
      }
      return;
    }
    p.x = e.clientX;
    p.y = e.clientY;
  };

  private up = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId);
    this.pointers.delete(e.pointerId);
    if (!p) return;
    if (this.pointers.size === 0 && !this.dragging && !this.multiTouch && performance.now() - p.startTime < 500) {
      const now = performance.now();
      const isDouble = now - this.lastTap.time < 320 && Math.hypot(e.clientX - this.lastTap.x, e.clientY - this.lastTap.y) < 30;
      if (isDouble) {
        this.lastTap.time = 0;
        this.cb.onDoubleTap(e.clientX, e.clientY);
      } else {
        this.lastTap = { time: now, x: e.clientX, y: e.clientY };
        this.cb.onTap(e.clientX, e.clientY);
      }
    }
    if (this.pointers.size === 1) {
      const rest = [...this.pointers.values()][0];
      rest.startX = rest.x;
      rest.startY = rest.y;
    }
  };

  private cancel = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
  };

  private wheel = (e: WheelEvent) => {
    e.preventDefault();
    this.wheelAcc += e.deltaY;
    const threshold = 60;
    while (this.wheelAcc > threshold) {
      this.rig.zoomStep(1);
      this.wheelAcc -= threshold * 2;
    }
    while (this.wheelAcc < -threshold) {
      this.rig.zoomStep(-1);
      this.wheelAcc += threshold * 2;
    }
    if (Math.abs(this.wheelAcc) < threshold) this.wheelAcc *= 0.5;
  };
}
