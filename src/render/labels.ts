// Schilder in der Welt als HTML über der 3D-Ansicht: Viertel (rot für feindliches Gebiet, mit Angriff),
// das Plus über dem nächsten freien Regalplatz und ein Hinweis zum Lager (leer, Sorte geht aus, Lieferung).
import { DISTRICT_IDS } from '../data/balance';
import { DISTRICT_NAMES } from '../data/names';

export interface LabelState {
  owner: 'player' | 'gang';
  gang: number;
  attackable: boolean;
}

export interface LabelHandlers {
  onDistrict(i: number): void;
  onShelf(): void;
  onWarehouse(): void;
}

const SVG_FIST =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11M10 10V6.5a1.5 1.5 0 0 1 3 0V10M13 10V7.5a1.5 1.5 0 0 1 3 0V12M16 11a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L9 14"/></svg>';
const SVG_LOCK =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const SVG_FLAG =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>';

export class WorldLabels {
  private districtEls: HTMLButtonElement[] = [];
  private districtKey: string[] = [];
  private shelfEl: HTMLButtonElement;
  private shelfKey = '';
  private warehouseEl: HTMLButtonElement;
  handlers: LabelHandlers = { onDistrict: () => {}, onShelf: () => {}, onWarehouse: () => {} };
  private pt = { x: 0, y: 0 };

  constructor(private root: HTMLElement) {
    DISTRICT_IDS.forEach((_, i) => {
      const el = document.createElement('button');
      el.className = 'dlabel';
      el.addEventListener('click', () => this.handlers.onDistrict(i));
      root.appendChild(el);
      this.districtEls.push(el);
      this.districtKey.push('');
    });
    this.shelfEl = document.createElement('button');
    this.shelfEl.className = 'plus-btn';
    this.shelfEl.setAttribute('aria-label', 'Regal kaufen');
    this.shelfEl.addEventListener('click', () => this.handlers.onShelf());
    root.appendChild(this.shelfEl);
    this.warehouseEl = document.createElement('button');
    this.warehouseEl.className = 'wh-bubble';
    this.warehouseEl.textContent = '';
    this.warehouseEl.addEventListener('click', () => this.handlers.onWarehouse());
    root.appendChild(this.warehouseEl);
  }

  private place(el: HTMLElement, x: number, y: number): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (x < -120 || y < -60 || x > w + 120 || y > h + 60) {
      el.style.display = 'none';
      return;
    }
    el.style.display = '';
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
  }

  update(
    project: (x: number, y: number, z: number, out: { x: number; y: number }) => void,
    districts: LabelState[],
    anchors: [number, number][],
    hintDistrict: number | null,
    shelf: { x: number; y: number; z: number; cost: number; affordable: boolean; hint: boolean } | null,
    warehouseNote: { x: number; y: number; z: number; text: string; info: boolean } | null,
    visible: boolean,
  ): void {
    this.root.style.display = visible ? '' : 'none';
    if (!visible) return;
    const pt = this.pt;
    districts.forEach((d, i) => {
      const el = this.districtEls[i];
      const key = `${d.owner}|${d.gang}|${d.attackable}|${hintDistrict === i}`;
      if (key !== this.districtKey[i]) {
        this.districtKey[i] = key;
        const name = DISTRICT_NAMES[DISTRICT_IDS[i]];
        if (d.owner === 'player') {
          el.className = 'dlabel own';
          el.innerHTML = `${SVG_FLAG}<span>${name}</span>`;
          el.disabled = true;
        } else {
          el.disabled = false;
          el.className = `dlabel gang ${d.attackable ? 'attackable' : 'locked'} ${hintDistrict === i ? 'hint' : ''}`;
          el.innerHTML =
            `<span class="dl-top">${d.attackable ? SVG_FIST : SVG_LOCK}<b>${name}</b></span>` +
            `<span class="dl-sub">Gemüsegang: ${d.gang} Kämpfer${d.attackable ? ' · Angreifen' : ''}</span>`;
        }
      }
      const [ax, ay] = anchors[i];
      project(ax + 0.5, d.owner === 'player' ? 1.5 : 3, ay + 0.5, pt);
      this.place(el, pt.x, pt.y);
    });
    if (shelf) {
      const key = `${shelf.cost}|${shelf.affordable}|${shelf.hint}`;
      if (key !== this.shelfKey) {
        this.shelfKey = key;
        this.shelfEl.className = `plus-btn ${shelf.affordable ? '' : 'poor'} ${shelf.hint ? 'hint' : ''}`;
        this.shelfEl.innerHTML = `<span class="plus">+</span><span class="price">${shelf.cost} €</span>`;
      }
      project(shelf.x, shelf.y, shelf.z, pt);
      this.place(this.shelfEl, pt.x, pt.y);
    } else this.shelfEl.style.display = 'none';
    if (warehouseNote) {
      if (this.warehouseEl.textContent !== warehouseNote.text) {
        this.warehouseEl.textContent = warehouseNote.text;
        this.warehouseEl.className = `wh-bubble ${warehouseNote.info ? 'info' : ''}`;
      }
      project(warehouseNote.x, warehouseNote.y, warehouseNote.z, pt);
      this.place(this.warehouseEl, pt.x, pt.y);
    } else this.warehouseEl.style.display = 'none';
  }
}
