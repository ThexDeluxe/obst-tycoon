// Einstiegspunkt: Schrift, Stile, Spielschleife und Oberfläche.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './ui/styles.css';
import { render } from 'preact';
import { effect } from '@preact/signals';
import { Game, setCurrentGame } from './game';
import { createInitialState } from './sim/state';
import { getWorld } from './sim/world';
import { App } from './ui/App';
import { screen, settings } from './ui/store';

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

render(<App />, document.getElementById('ui')!);

// Für die Screenshot-Prüfung und die Fehlersuche
(window as unknown as { __game: Game }).__game = game;
