// Spieloberfläche über der 3D-Ansicht: Leiste oben, Knöpfe unten, Blätter, Meldungen.
import type { JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { DISTRICT_IDS } from '../data/balance';
import { DISTRICT_NAMES, FRUIT_NAMES } from '../data/names';
import { currentGame } from '../game';
import { dealerUnits } from '../sim/dealers';
import { capacity, isAttackable, ownedCount } from '../sim/selectors';
import { stockAmpel } from '../sim/supply';
import { HEAT } from '../data/balance';
import { EventCard, FarmsSheet, heatLevel } from './farms';
import { hasContract } from '../sim/farms';
import { STORY } from '../sim/story';
import { clockText } from '../sim/time';
import { int, money, moneyExact } from './format';
import {
  IconClose,
  IconCrate,
  IconFarm,
  IconFaster,
  IconFist,
  IconFullscreen,
  IconInfo,
  IconPause,
  IconPhoneRotate,
  IconPlay,
  IconRotateLeft,
  IconRotateRight,
  IconSearch,
  IconSettings,
  IconSound,
  IconSoundOff,
  IconStar,
  IconTarget,
  IconTruck,
  IconUserPlus,
  IconWarehouse,
  IconWarning,
  IconZoomIn,
  IconZoomOut,
} from './icons';
import { Num } from './Num';
import { SettingsPanel } from './panels/SettingsPanel';
import { ActSheet, AttackSheet, BuildSheet, dealerStatus, PeopleSheet, rangeText, StockSheet } from './sheets';
import {
  attackTarget,
  contractDraft,
  explain,
  notices,
  portraitDismissed,
  selectedDealer,
  selectedFarm,
  settings,
  sheet,
  speedIndex,
  toast,
  uiTick,
  updateSettings,
  winShown,
  type SheetId,
} from './store';

// ---------------------------------------------------------------------------
// Obere Leiste
// ---------------------------------------------------------------------------

function storyAction(): void {
  const g = currentGame();
  if (!g) return;
  const step = STORY[g.state.story];
  if (!step) {
    sheet.value = 'act';
    return;
  }
  switch (step.hint) {
    case 'stock':
      sheet.value = 'stock';
      break;
    case 'people':
      sheet.value = 'people';
      break;
    case 'build':
      sheet.value = 'build';
      break;
    case 'farm':
      if (step.farm !== undefined) selectedFarm.value = step.farm;
      contractDraft.value = null;
      sheet.value = 'farms';
      break;
    case 'shelf':
      sheet.value = null;
      g.view.focusWarehouse();
      break;
    case 'district': {
      const target = step.district ?? DISTRICT_IDS.findIndex((_, i) => isAttackable(g.state, g.world, i));
      if (target >= 0) {
        const [x, y] = g.world.labels[target];
        g.focus(x, y + 6);
        g.openDistrict(target);
      }
      break;
    }
    default:
      sheet.value = 'act';
      break;
  }
}

const AMPEL_TEXT = { green: 'Lager reicht', yellow: 'Lager knapp', red: 'Lager leer', none: 'Lager' } as const;

export function TopBar() {
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const step = STORY[s.story];
  const { ampel, range } = stockAmpel(s);
  const muted = settings.value.muted;
  const heat = heatLevel(s.heat);
  return (
    <div class="topbar">
      <div class="money panel">
        <Num text="Kontostand. Einnahmen kommen aus dem Verkauf, Ausgaben sind Lieferungen, Kiosk, Leute und Bauten.">
          <span class="money-value">{money(s.money)}</span>
        </Num>
        <span class="money-sub">
          Tag {s.day + 1} · {clockText(s)}
        </span>
      </div>
      <button class={`ampel panel ${ampel}`} onClick={() => toggleSheet('stock')} title="Lagerampel">
        <span class="ampel-dot" />
        <span class="ampel-text">
          <b>{AMPEL_TEXT[ampel]}</b>
          <small>{range ? `${FRUIT_NAMES[range.fruit]} ${range.perDay > 0 ? rangeText(range.days) : ''}` : `${s.crates.length} Kisten`}</small>
        </span>
      </button>
      <Num
        class={`heat panel ${heat.cls}`}
        text={`Ermittlungsdruck ${Math.round(s.heat)} von 100 (${heat.text}): steigt durch Druck und schmutzige Aktionen bei Bauern, sinkt um ${HEAT.decayPerDay} pro Tag ohne neuen Druck.`}
      >
        <IconSearch size={17} />
        <b class="mono">{Math.round(s.heat)}</b>
      </Num>
      <button class="objective panel" onClick={storyAction} title="Auftrag: antippen für Hilfe">
        <IconTarget size={18} />
        <span class="obj-text">
          {step ? (
            <>
              <b>{step.title}:</b> {step.text}
            </>
          ) : (
            <b>Die ganze Stadt gehört dir.</b>
          )}
        </span>
      </button>
      <div class="controls panel">
        <button class="icon-btn" aria-label={muted ? 'Ton an' : 'Ton aus'} title="Ton" onClick={() => updateSettings({ muted: !muted })}>
          {muted ? <IconSoundOff size={18} /> : <IconSound size={18} />}
        </button>
        <button
          class={`icon-btn ${speedIndex.value === 0 ? 'active' : ''}`}
          aria-label={speedIndex.value === 0 ? 'Weiter' : 'Pause'}
          title="Pause (Leertaste)"
          onClick={() => g.togglePause()}
        >
          {speedIndex.value === 0 ? <IconPlay size={16} /> : <IconPause size={16} />}
        </button>
        <button
          class={`icon-btn speed-btn ${speedIndex.value > 1 ? 'active' : ''}`}
          aria-label="Tempo"
          title="Tempo 1x, 2x, 4x"
          onClick={() => g.setSpeed(speedIndex.value >= 3 ? 1 : speedIndex.value + 1)}
        >
          <IconFaster size={15} />
          <span>{speedIndex.value === 0 ? '1x' : ['', '1x', '2x', '4x'][speedIndex.value]}</span>
        </button>
        <button class="icon-btn" aria-label="Einstellungen" title="Einstellungen" onClick={() => toggleSheet('settings')}>
          <IconSettings size={18} />
        </button>
      </div>
    </div>
  );
}

function toggleSheet(id: SheetId): void {
  sheet.value = sheet.value === id ? null : id;
  selectedDealer.value = null;
}

// ---------------------------------------------------------------------------
// Knöpfe unten
// ---------------------------------------------------------------------------

export function ActionBar() {
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const hint = STORY[s.story]?.hint;
  const { ampel } = stockAmpel(s);
  const contracts = s.farms.filter((f) => hasContract(f, s.day)).length;
  const items: { id: SheetId; icon: (p: { size?: number }) => JSX.Element; label: string; sub: string; warn?: boolean; badge?: number }[] = [
    { id: 'stock', icon: IconCrate, label: 'Lager', sub: `${s.crates.length}/${capacity(s)} Kisten`, warn: ampel === 'red' },
    { id: 'farms', icon: IconFarm, label: 'Höfe', sub: `${contracts} ${contracts === 1 ? 'Vertrag' : 'Verträge'}`, badge: s.pending.length },
    { id: 'people', icon: IconUserPlus, label: 'Leute', sub: `${s.dealers.length} V · ${s.fighters} K` },
    { id: 'build', icon: IconWarehouse, label: 'Bauen', sub: `${s.shelves} Regale` },
    { id: 'act', icon: IconFist, label: 'Akt 1', sub: `${ownedCount(s)}/6 Viertel` },
  ];
  const hintFor: Record<string, SheetId> = { stock: 'stock', people: 'people', build: 'build', farm: 'farms' };
  return (
    <div class="actionbar">
      {items.map((it) => (
        <button
          key={it.id}
          class={`action panel ${sheet.value === it.id ? 'active' : ''} ${hintFor[hint ?? ''] === it.id || it.warn ? 'hint' : ''} ${it.warn ? 'warn' : ''}`}
          onClick={() => toggleSheet(it.id)}
        >
          <it.icon size={20} />
          {it.badge ? <span class="badge">{it.badge}</span> : null}
          <span class="action-text">
            <b>{it.label}</b>
            <small>{it.sub}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Blätter
// ---------------------------------------------------------------------------

const SHEET_TITLES: Record<SheetId, string> = {
  stock: 'Lager',
  farms: 'Höfe',
  people: 'Leute',
  build: 'Bauen',
  act: 'Akt 1: Die Straße',
  attack: 'Viertel',
  settings: 'Einstellungen',
};

export function Sheet() {
  void uiTick.value;
  const g = currentGame();
  const id = sheet.value;
  const drag = useRef<{ y: number } | null>(null);
  if (!g || !id) return null;
  const title = id === 'attack' && attackTarget.value !== null ? DISTRICT_NAMES[DISTRICT_IDS[attackTarget.value]] : SHEET_TITLES[id];
  return (
    <section class={`sheet panel sheet-${id}`}>
      <header
        onPointerDown={(e) => (drag.current = { y: e.clientY })}
        onPointerMove={(e) => {
          // Nach unten wischen schließt das Blatt
          if (drag.current && e.clientY - drag.current.y > 40) {
            drag.current = null;
            sheet.value = null;
          }
        }}
        onPointerUp={() => (drag.current = null)}
      >
        <span class="grabber" />
        <h2>{title}</h2>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (sheet.value = null)}>
          <IconClose size={18} />
        </button>
      </header>
      <div class="sheet-body">
        {id === 'stock' && <StockSheet />}
        {id === 'farms' && <FarmsSheet />}
        {id === 'people' && <PeopleSheet />}
        {id === 'build' && <BuildSheet />}
        {id === 'act' && <ActSheet />}
        {id === 'attack' && <AttackSheet />}
        {id === 'settings' && <SettingsPanel />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Verkäuferkarte, Erklärungen, Abschluss
// ---------------------------------------------------------------------------

export function DealerCard() {
  void uiTick.value;
  const g = currentGame();
  const id = selectedDealer.value;
  if (!g || id === null || sheet.value) return null;
  const d = g.state.dealers.find((x) => x.id === id);
  if (!d) return null;
  return (
    <div class="dealer-card panel">
      <div class="row">
        <b>{d.name}</b>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (selectedDealer.value = null)}>
          <IconClose size={16} />
        </button>
      </div>
      <span class="muted small-text">{dealerStatus(g.world, d, g.state.crates.length > 0)}</span>
      <span class="small-text">
        Trägt: {d.load.length ? d.load.map((l) => `${l.units} ${FRUIT_NAMES[l.fruit]}`).join(', ') : 'nichts'} ({dealerUnits(d)} Stück)
      </span>
      <span class="small-text">
        Heute: {int(d.soldToday)} verkauft, {moneyExact(d.earnedToday)}
      </span>
    </div>
  );
}

export function ExplainPopup() {
  const e = explain.value;
  if (!e) return null;
  return (
    <button class="explain panel" onClick={() => (explain.value = null)}>
      <IconInfo size={16} />
      <span>{e.text}</span>
    </button>
  );
}

export function WinModal() {
  void uiTick.value;
  const g = currentGame();
  if (!g || !g.state.won || winShown.value || g.state.battle) return null;
  const s = g.state;
  return (
    <div class="modal-backdrop">
      <div class="modal panel win">
        <header>
          <h2>Vom Untergrund ins Bankenviertel</h2>
        </header>
        <div class="modal-body">
          <p>Das Bankenviertel gehört dir. Aus einer Lagerhalle im Untergrund ist ein Obsthandel geworden, den die ganze Stadt kennt.</p>
          <ul class="events">
            <li>Spieltage: {s.day + 1}</li>
            <li>
              Verkauft: {int(s.stats.sold)} Stück, {money(s.earnedTotal)} Umsatz
            </li>
            <li>
              Viertel: {ownedCount(s)} von {DISTRICT_IDS.length}, Kämpfe gewonnen: {s.stats.battlesWon}, verloren: {s.stats.battlesLost}
            </li>
          </ul>
          <p class="muted small-text">Das Spiel geht weiter, solange du willst.</p>
        </div>
        <footer>
          <button class="btn primary" onClick={() => (winShown.value = true)}>
            Weiterspielen
          </button>
        </footer>
      </div>
    </div>
  );
}

const NOTICE_ICON: Record<string, (p: { size?: number }) => JSX.Element> = {
  warning: IconWarning,
  danger: IconWarning,
  unlock: IconStar,
  story: IconTarget,
  money: IconCrate,
  delivery: IconTruck,
  info: IconInfo,
};

export function Notices() {
  void uiTick.value;
  const g = currentGame();
  const now = performance.now();
  const list = notices.value.filter((n) => now - n.time < 6000);
  const pending = g && !sheet.value && !g.state.battle ? g.state.pending.slice(0, 2) : [];
  if (!g || (!list.length && !pending.length)) return null;
  return (
    <div class="notices">
      {pending.map((p) => (
        <EventCard key={p.id} p={p} />
      ))}
      {pending.length > 0 && g.state.pending.length > pending.length && <span class="more-events">+{g.state.pending.length - pending.length} weitere unter Höfe</span>}
      {list.map((n) => {
        const Icon = NOTICE_ICON[n.kind] ?? IconInfo;
        return (
          <button
            key={n.id}
            class={`notice panel ${n.kind}`}
            onClick={() => {
              if (n.x !== undefined && n.y !== undefined) g.focus(n.x + 0.5, n.y + 4);
              notices.value = notices.value.filter((x) => x.id !== n.id);
            }}
          >
            <Icon size={16} />
            <span>{n.text}</span>
          </button>
        );
      })}
    </div>
  );
}

function toggleFullscreen(): void {
  const doc = document as Document & { webkitFullscreenElement?: Element };
  const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
  if (document.fullscreenElement || doc.webkitFullscreenElement) {
    document.exitFullscreen?.().catch(() => undefined);
    return;
  }
  const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
  Promise.resolve(req?.())
    .then(() => {
      const o = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
      return o?.lock?.('landscape');
    })
    .catch(() => undefined);
}

export function CameraControls() {
  const g = currentGame();
  if (!g) return null;
  const rig = g.view.rig;
  return (
    <div class="cam-controls">
      <button class="icon-btn round" aria-label="Links drehen (Q)" onClick={() => rig.rotate(-1)}>
        <IconRotateLeft size={17} />
      </button>
      <button class="icon-btn round" aria-label="Rechts drehen (E)" onClick={() => rig.rotate(1)}>
        <IconRotateRight size={17} />
      </button>
      <button class="icon-btn round" aria-label="Vergrößern" onClick={() => rig.zoomStep(-1)}>
        <IconZoomIn size={17} />
      </button>
      <button class="icon-btn round" aria-label="Verkleinern" onClick={() => rig.zoomStep(1)}>
        <IconZoomOut size={17} />
      </button>
      <button class="icon-btn round" aria-label="Vollbild" onClick={toggleFullscreen}>
        <IconFullscreen size={17} />
      </button>
    </div>
  );
}

export function DebugOverlay() {
  void uiTick.value;
  const g = currentGame();
  if (!g || !settings.value.debug) return null;
  const s = g.state;
  return (
    <div class="debug mono">
      <div>FPS {g.fps}</div>
      <div>Draw Calls {g.view.stats.drawCalls}</div>
      <div>Dreiecke {int(g.view.stats.triangles)}</div>
      <div>Ticks/s {g.tps}</div>
      <div>
        Entitäten {s.peds.length + s.vehicles.length + s.dealers.length} (Passanten {s.peds.length}, Verkäufer {s.dealers.length}, Fahrzeuge{' '}
        {s.vehicles.length})
      </div>
    </div>
  );
}

export function Toast() {
  const t = toast.value;
  if (!t) return null;
  return <div class={`toast ${t.kind}`}>{t.text}</div>;
}

export function PortraitHint() {
  if (portraitDismissed.value) return null;
  return (
    <div class="portrait-hint">
      <div class="panel">
        <IconPhoneRotate size={40} />
        <p>Das Spiel ist für das Querformat gedacht. Bitte das Gerät drehen.</p>
        <button class="btn" onClick={() => (portraitDismissed.value = true)}>
          Trotzdem fortfahren
        </button>
      </div>
    </div>
  );
}
