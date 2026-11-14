// Spieloberfläche über der 3D-Ansicht: obere Leiste, Menü-Reiter, Kamera-Knöpfe, Debug-Anzeige.
import type { ComponentChildren, JSX } from 'preact';
import { currentGame } from '../game';
import { REPUTATION_THRESHOLDS } from '../data/balance';
import { levelProgress, profitToday } from '../sim/selectors';
import { clockText, WEEKDAYS, WEEKDAYS_SHORT, weekdayOf } from '../sim/time';
import {
  IconClose,
  IconEquipment,
  IconGoal,
  IconInfo,
  IconMap,
  IconMarket,
  IconReport,
  IconStaff,
  IconStar,
  IconTruck,
  IconWarehouse,
  IconWarning,
  IconFast,
  IconFaster,
  IconFullscreen,
  IconPause,
  IconPhoneRotate,
  IconPlay,
  IconRotateLeft,
  IconRotateRight,
  IconSettings,
  IconZoomIn,
  IconZoomOut,
} from './icons';
import { activeTab, notices, portraitDismissed, reportHidden, settings, speedIndex, toast, uiTick, type TabId } from './store';
import { SettingsPanel } from './panels/SettingsPanel';
import { StaffPanel } from './panels/StaffPanel';
import { MarketPanel } from './panels/MarketPanel';
import { WarehousePanel } from './panels/WarehousePanel';
import { EquipmentPanel } from './panels/EquipmentPanel';
import { DistrictsPanel, GoalPanel } from './panels/DistrictsPanel';
import { ReportsPanel } from './panels/ReportsPanel';
import { ReportView } from './panels/ReportView';
import { int, money, signedMoney } from './format';

export interface TabDef {
  id: TabId;
  label: string;
  key: string;
  icon: (p: { size?: number }) => JSX.Element;
  render: () => ComponentChildren;
}

export const TABS: TabDef[] = [
  { id: 'staff', label: 'Personal', key: 'P', icon: IconStaff, render: () => <StaffPanel /> },
  { id: 'market', label: 'Großmarkt', key: 'G', icon: IconMarket, render: () => <MarketPanel /> },
  { id: 'warehouse', label: 'Lager und Bau', key: 'L', icon: IconWarehouse, render: () => <WarehousePanel /> },
  { id: 'equipment', label: 'Ausrüstung', key: 'R', icon: IconEquipment, render: () => <EquipmentPanel /> },
  { id: 'districts', label: 'Viertel', key: 'V', icon: IconMap, render: () => <DistrictsPanel /> },
  { id: 'goal', label: 'Ziel', key: 'Z', icon: IconGoal, render: () => <GoalPanel /> },
  { id: 'reports', label: 'Berichte', key: 'B', icon: IconReport, render: () => <ReportsPanel /> },
  { id: 'settings', label: 'Einstellungen', key: 'O', icon: IconSettings, render: () => <SettingsPanel /> },
];

function SpeedButtons() {
  const g = currentGame();
  const icons = [IconPause, IconPlay, IconFast, IconFaster];
  const titles = ['Pause (Leertaste)', 'Tempo 1x (1)', 'Tempo 2x (2)', 'Tempo 4x (3)'];
  return (
    <div class="speed">
      {icons.map((Icon, i) => (
        <button
          key={i}
          class={`icon-btn ${speedIndex.value === i ? 'active' : ''}`}
          title={titles[i]}
          aria-label={titles[i]}
          onClick={() => g?.setSpeed(i)}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}

export function TopBar() {
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const profit = profitToday(s.ledger);
  const nextThreshold = REPUTATION_THRESHOLDS[s.level];
  return (
    <div class="topbar panel">
      <div class="tb-item" title="Kontostand (Dispositionsrahmen bis −1.000 €)">
        <span class="tb-label">Konto</span>
        <span class={`tb-value ${s.money < 0 ? 'neg' : ''}`}>{money(s.money)}</span>
      </div>
      <div class="tb-item" title="Einnahmen minus Ausgaben heute">
        <span class="tb-label">Heute</span>
        <span class={`tb-value ${profit >= 0 ? 'pos' : 'neg'}`}>{signedMoney(profit)}</span>
      </div>
      <div class="tb-item">
        <span class="tb-label">
          <span class="tb-hide-narrow">{WEEKDAYS[weekdayOf(s.day)]}</span>
          <span class="tb-show-narrow">{WEEKDAYS_SHORT[weekdayOf(s.day)]}</span>
        </span>
        <span class="tb-value">Tag {s.day + 1}</span>
      </div>
      <div class="tb-item">
        <span class="tb-label">Uhrzeit</span>
        <span class="tb-value mono">{clockText(s)}</span>
      </div>
      <div
        class="tb-item"
        title={nextThreshold ? `Gesamtumsatz ${money(s.totalRevenue)} von ${money(nextThreshold)} für Stufe ${s.level + 1}` : 'Höchste Ruf-Stufe'}
      >
        <span class="tb-label">Ruf</span>
        <span class="tb-value rep">
          <IconStar size={13} /> {s.level}
          <div class="rep-bar">
            <div style={{ width: `${(levelProgress(s) * 100).toFixed(0)}%` }} />
          </div>
        </span>
      </div>
      <div class="tb-spacer" />
      {s.phase === 'dayEnd' && reportHidden.value ? (
        <>
          <button class="btn small" onClick={() => (reportHidden.value = false)}>
            Bericht
          </button>
          <button class="btn small primary" onClick={() => g.command({ type: 'nextDay' })}>
            Tag beginnen
          </button>
        </>
      ) : (
        <SpeedButtons />
      )}
    </div>
  );
}

const NOTICE_ICON: Record<string, (p: { size?: number }) => JSX.Element> = {
  delivery: IconTruck,
  warning: IconWarning,
  danger: IconWarning,
  unlock: IconStar,
  info: IconInfo,
  report: IconReport,
};

/** Meldungen oben rechts; ein Tippen fährt die Kamera zum Ort */
export function Notices() {
  void uiTick.value;
  const g = currentGame();
  const now = performance.now();
  const list = notices.value.filter((n) => now - n.time < 7000);
  if (!g || !list.length) return null;
  return (
    <div class="notices">
      {list.map((n) => {
        const Icon = NOTICE_ICON[n.kind] ?? IconInfo;
        return (
          <button
            key={n.id}
            class={`notice panel ${n.kind}`}
            onClick={() => {
              if (n.x !== undefined && n.y !== undefined) g.focus(n.x + 0.5, n.y + 0.5);
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

export function TabRail() {
  return (
    <nav class="rail panel">
      {TABS.map((t) => (
        <button
          key={t.id}
          class={`icon-btn rail-btn ${activeTab.value === t.id ? 'active' : ''}`}
          title={`${t.label} (${t.key})`}
          aria-label={t.label}
          onClick={() => (activeTab.value = activeTab.value === t.id ? null : t.id)}
        >
          <t.icon size={20} />
        </button>
      ))}
    </nav>
  );
}

export function SidePanel() {
  void uiTick.value;
  const tab = TABS.find((t) => t.id === activeTab.value);
  if (!tab) return null;
  return (
    <section class="side-panel panel">
      <header>
        <h2>{tab.label}</h2>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (activeTab.value = null)}>
          <IconClose size={18} />
        </button>
      </header>
      <div class="side-body">{tab.render()}</div>
    </section>
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
  const p = req?.();
  Promise.resolve(p)
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
      <button class="icon-btn round" aria-label="Links drehen (Q)" title="Links drehen (Q)" onClick={() => rig.rotate(-1)}>
        <IconRotateLeft size={18} />
      </button>
      <button class="icon-btn round" aria-label="Rechts drehen (E)" title="Rechts drehen (E)" onClick={() => rig.rotate(1)}>
        <IconRotateRight size={18} />
      </button>
      <button class="icon-btn round" aria-label="Vergrößern" title="Vergrößern" onClick={() => rig.zoomStep(-1)}>
        <IconZoomIn size={18} />
      </button>
      <button class="icon-btn round" aria-label="Verkleinern" title="Verkleinern" onClick={() => rig.zoomStep(1)}>
        <IconZoomOut size={18} />
      </button>
      <button class="icon-btn round" aria-label="Vollbild" title="Vollbild" onClick={toggleFullscreen}>
        <IconFullscreen size={18} />
      </button>
    </div>
  );
}

export function DebugOverlay() {
  void uiTick.value;
  const g = currentGame();
  if (!g || !settings.value.debug) return null;
  const s = g.state;
  const entities = s.peds.length + s.vehicles.length + s.staff.length;
  return (
    <div class="debug mono">
      <div>FPS {g.fps}</div>
      <div>Draw Calls {g.view.stats.drawCalls}</div>
      <div>Dreiecke {int(g.view.stats.triangles)}</div>
      <div>Ticks/s {g.tps}</div>
      <div>
        Entitäten {entities} (Passanten {s.peds.length}, eigene Leute {s.staff.length}, Fahrzeuge {s.vehicles.length})
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

export function DayEndDialog() {
  void uiTick.value;
  const g = currentGame();
  if (!g || g.state.phase !== 'dayEnd' || reportHidden.value) return null;
  const s = g.state;
  const r = s.reports[s.reports.length - 1];
  return (
    <div class="modal-backdrop">
      <div class="modal panel">
        <header>
          <h2>
            Tagesbericht {WEEKDAYS_SHORT[weekdayOf(s.day)]}, Tag {s.day + 1}
          </h2>
        </header>
        <div class="modal-body">{r ? <ReportView report={r} state={s} /> : <p>Der Verkaufstag ist beendet.</p>}</div>
        <footer>
          <button
            class="btn"
            onClick={() => {
              reportHidden.value = true;
              activeTab.value = 'market';
            }}
          >
            Zum Großmarkt
          </button>
          <button class="btn" onClick={() => (reportHidden.value = true)}>
            Ausblenden
          </button>
          <button class="btn primary" onClick={() => g.command({ type: 'nextDay' })}>
            Nächster Tag
          </button>
        </footer>
      </div>
    </div>
  );
}
