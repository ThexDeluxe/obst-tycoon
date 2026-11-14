// Spieloberfläche über der 3D-Ansicht: obere Leiste, Menü-Reiter, Kamera-Knöpfe, Debug-Anzeige.
import type { ComponentChildren, JSX } from 'preact';
import { currentGame } from '../game';
import { clockText, WEEKDAYS, WEEKDAYS_SHORT, weekdayOf } from '../sim/time';
import {
  IconClose,
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
import { activeTab, portraitDismissed, settings, speedIndex, toast, uiTick, type TabId } from './store';
import { SettingsPanel } from './panels/SettingsPanel';
import { int } from './format';

export interface TabDef {
  id: TabId;
  label: string;
  key: string;
  icon: (p: { size?: number }) => JSX.Element;
  render: () => ComponentChildren;
}

export const TABS: TabDef[] = [{ id: 'settings', label: 'Einstellungen', key: 'O', icon: IconSettings, render: () => <SettingsPanel /> }];

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
  return (
    <div class="topbar panel">
      <div class="tb-item">
        <span class="tb-label">{WEEKDAYS[weekdayOf(s.day)]}</span>
        <span class="tb-value">Tag {s.day + 1}</span>
      </div>
      <div class="tb-item">
        <span class="tb-label">Uhrzeit</span>
        <span class="tb-value mono">{clockText(s)}</span>
      </div>
      <div class="tb-spacer" />
      <SpeedButtons />
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
  const entities = s.peds.length + s.vehicles.length;
  return (
    <div class="debug mono">
      <div>FPS {g.fps}</div>
      <div>Draw Calls {g.view.stats.drawCalls}</div>
      <div>Dreiecke {int(g.view.stats.triangles)}</div>
      <div>Ticks/s {g.tps}</div>
      <div>Entitäten {entities} (Passanten {s.peds.length})</div>
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
  if (!g || g.state.phase !== 'dayEnd') return null;
  const s = g.state;
  return (
    <div class="modal-backdrop">
      <div class="modal panel">
        <header>
          <h2>Tagesabschluss {WEEKDAYS_SHORT[weekdayOf(s.day)]}, Tag {s.day + 1}</h2>
        </header>
        <div class="modal-body">
          <p>Der Verkaufstag ist beendet. Die Nacht wird übersprungen.</p>
        </div>
        <footer>
          <button class="btn primary" onClick={() => g.command({ type: 'nextDay' })}>
            Nächster Tag
          </button>
        </footer>
      </div>
    </div>
  );
}
