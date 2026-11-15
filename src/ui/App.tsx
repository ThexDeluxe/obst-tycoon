// Wurzel der Oberfläche.
import { useEffect } from 'preact/hooks';
import { currentGame } from '../game';
import { createInitialState } from '../sim/state';
import type { GameState } from '../sim/types';
import { getWorld } from '../sim/world';
import { ActionBar, BattleModal, CameraControls, DealerCard, DebugOverlay, Notices, PortraitHint, Sheet, Toast, TopBar, WinModal } from './Hud';
import { MainMenu } from './MainMenu';
import { screen, selectedDealer, settings, sheet, winShown } from './store';

function startGame(state: GameState): void {
  const g = currentGame();
  if (!g) return;
  g.load(state, false);
  g.setSpeed(1);
  winShown.value = state.won;
  screen.value = 'game';
}

export function App() {
  useEffect(() => {
    const g = currentGame();
    if (!g) return;
    g.keyHook = (e) => {
      if (screen.value !== 'game') return;
      if (e.code === 'Escape') {
        if (sheet.value) sheet.value = null;
        else selectedDealer.value = null;
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const keys: Record<string, 'fruit' | 'dealers' | 'fighters'> = { KeyO: 'fruit', KeyV: 'dealers', KeyK: 'fighters' };
      const id = keys[e.code];
      if (id) sheet.value = sheet.value === id ? null : id;
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
      <Notices />
      <Sheet />
      <DealerCard />
      <ActionBar />
      <CameraControls />
      <DebugOverlay />
      <BattleModal />
      <WinModal />
      <Toast />
      <PortraitHint />
    </>
  );
}
