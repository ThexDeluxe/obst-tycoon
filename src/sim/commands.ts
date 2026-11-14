// Befehle an die Simulation. Oberfläche und Balancing-Bot nutzen dieselben Befehle.
// Sie landen in einer Warteschlange und werden im nächsten Tick ausgeführt.
import type { GameState } from './types';

export type Command =
  | { type: 'nextDay' }
  | { type: 'debugSkipHours'; hours: number };

export function enqueue(state: GameState, cmd: Command): void {
  state.queue.push(cmd);
}
