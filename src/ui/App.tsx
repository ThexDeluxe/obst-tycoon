// Wurzel der Oberfläche.
import { useEffect } from 'preact/hooks';
import { currentGame } from '../game';
import { getWorld } from '../sim/world';
import { createInitialState } from '../sim/state';
import type { GameState } from '../sim/types';
import { CameraControls, DayEndDialog, DebugOverlay, PortraitHint, SidePanel, TabRail, TABS, Toast, TopBar } from './Hud';
import { MainMenu } from './MainMenu';
import { activeTab, screen, settings } from './store';

function startGame(state: GameState): void {
  const g = currentGame();
  if (!g) return;
  g.load(state, false);
  g.setSpeed(1);
  activeTab.value = null;
  screen.value = 'game';
}

export function App() {
  useEffect(() => {
    const g = currentGame();
    if (!g) return;
    g.keyHook = (e) => {
      if (screen.value !== 'game') return;
      if (e.code === 'Escape') {
        activeTab.value = null;
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tab = TABS.find((t) => `Key${t.key}` === e.code);
      if (tab) activeTab.value = activeTab.value === tab.id ? null : tab.id;
    };
  }, []);
  void settings.value;

  if (screen.value === 'menu') {
    return (
      <>
        <MainMenu
          onNew={() => startGame(createInitialState(getWorld(), { seed: (Math.random() * 2 ** 31) | 0 }))}
          onLoad={(s) => startGame(s)}
        />
        <Toast />
      </>
    );
  }
  return (
    <>
      <TopBar />
      <TabRail />
      <SidePanel />
      <CameraControls />
      <DebugOverlay />
      <DayEndDialog />
      <Toast />
      <PortraitHint />
    </>
  );
}
