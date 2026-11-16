// Einstiegspunkt: Schrift, Stile, Spielschleife und Oberfläche.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './ui/styles.css';
import { render } from 'preact';
import { effect } from '@preact/signals';
import { audio } from './audio/engine';
import { Game, setCurrentGame } from './game';
import { createInitialState } from './sim/state';
import { getWorld } from './sim/world';
import { App } from './ui/App';
import { screen, settings, sheet } from './ui/store';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const world = getWorld();
const game = new Game(canvas, createInitialState(world, { seed: 7 }));
game.demo = true;
setCurrentGame(game);

effect(() => {
  game.applySettings(settings.value);
});
effect(() => {
  document.body.classList.toggle('in-game', screen.value === 'game');
});

// Ton: startet erst nach dem ersten Tippen (Vorgabe der Browser)
const unlockAudio = () => audio.unlock();
for (const type of ['pointerdown', 'touchend', 'click', 'keydown']) window.addEventListener(type, unlockAudio, { capture: true });
effect(() => {
  const s = settings.value;
  audio.setVolumes({ muted: s.muted, effects: s.effectsVolume, ambience: s.ambienceVolume });
});
// Dezentes Klicken bei Knöpfen, Wischen beim Öffnen und Schließen der Blätter
document.addEventListener(
  'click',
  (e) => {
    const el = e.target as Element | null;
    if (el?.closest?.('button, [role="button"]')) audio.play('click');
  },
  { capture: true },
);
let lastSheet = sheet.value;
effect(() => {
  const v = sheet.value;
  if (v && !lastSheet) audio.play('sheetOpen');
  else if (!v && lastSheet) audio.play('sheetClose');
  lastSheet = v;
});

render(<App />, document.getElementById('ui')!);

// Für die Screenshot-Prüfung und die Fehlersuche
(window as unknown as { __game: Game }).__game = game;
