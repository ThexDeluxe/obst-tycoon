// Kleine aufsteigende Umsatzzahlen beim Verkauf (abschaltbar). Ein fester Vorrat an
// DOM-Elementen wird wiederverwendet.
const POOL = 24;
const LIFE = 1.4;

interface Floater {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  age: number;
  active: boolean;
}

export class Floaters {
  private items: Floater[] = [];
  private next = 0;
  private pt = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement('div');
      el.className = 'floater';
      el.style.display = 'none';
      container.appendChild(el);
      this.items.push({ el, x: 0, y: 0, z: 0, age: 0, active: false });
    }
  }

  spawn(x: number, z: number, text: string): void {
    const f = this.items[this.next];
    this.next = (this.next + 1) % POOL;
    f.x = x;
    f.y = 1.0;
    f.z = z;
    f.age = 0;
    f.active = true;
    f.el.textContent = text;
    f.el.style.display = 'block';
  }

  update(dt: number, project: (x: number, y: number, z: number, out: { x: number; y: number }) => void): void {
    for (const f of this.items) {
      if (!f.active) continue;
      f.age += dt;
      if (f.age >= LIFE) {
        f.active = false;
        f.el.style.display = 'none';
        continue;
      }
      project(f.x, f.y + f.age * 0.55, f.z, this.pt);
      const a = 1 - Math.max(0, (f.age - LIFE * 0.6) / (LIFE * 0.4));
      f.el.style.transform = `translate(${this.pt.x.toFixed(1)}px, ${this.pt.y.toFixed(1)}px) translate(-50%, -100%)`;
      f.el.style.opacity = a.toFixed(2);
    }
  }

  clear(): void {
    for (const f of this.items) {
      f.active = false;
      f.el.style.display = 'none';
    }
  }
}
