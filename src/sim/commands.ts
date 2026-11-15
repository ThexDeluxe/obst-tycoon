// Befehle an die Simulation. Oberfläche und Balancing-Bot nutzen dieselben Befehle.
// Sie landen in einer Warteschlange und werden im nächsten Tick ausgeführt.
import { DISTRICT_IDS, FIGHTERS, FRUITS, type FruitId } from '../data/balance';
import { FRUIT_NAMES, UPGRADE_NAMES } from '../data/names';
import { battleAuto, battleRetreat, battleRound, startBattle } from './battle';
import { createDealer } from './dealers';
import {
  capacity,
  dealerCost,
  fighterCost,
  isFruitUnlocked,
  maxShelves,
  nextUpgrade,
  shelfCost,
  spotCapacity,
} from './selectors';
import type { GameState, MessageKind } from './types';
import type { World } from './world';

export type Command =
  | { type: 'buyCrate'; fruit: FruitId; count?: number }
  | { type: 'hireDealer' }
  | { type: 'buyShelf' }
  | { type: 'hireFighter'; count?: number }
  | { type: 'buyUpgrade' }
  | { type: 'attack'; district: number }
  | { type: 'battleRoll' }
  | { type: 'battleAuto' }
  | { type: 'battleRetreat' }
  | { type: 'battleClose' }
  | { type: 'debugMoney'; amount: number }
  | { type: 'debugSkipHours'; hours: number }
  | { type: 'debugConquer'; district: number };

export function enqueue(state: GameState, cmd: Command): void {
  state.queue.push(cmd);
}

export function pushMessage(state: GameState, kind: MessageKind, text: string, x?: number, y?: number): void {
  state.messages.push({ id: state.nextId++, day: state.day, dayTick: state.dayTick, kind, text, x, y });
  if (state.messages.length > 60) state.messages.splice(0, state.messages.length - 60);
}

function fail(s: GameState, text: string): void {
  pushMessage(s, 'warning', text);
}

/** Bezahlen, wenn genug Geld da ist */
function pay(s: GameState, amount: number): boolean {
  if (s.money < amount) {
    fail(s, `Dafür fehlen noch ${Math.ceil(amount - s.money)} €.`);
    return false;
  }
  s.money -= amount;
  return true;
}

/**
 * Führt einen Befehl aus. Befehle, die die Zeit betreffen (debugSkipHours), erledigt step.ts.
 */
export function applyCommand(s: GameState, world: World, cmd: Command): void {
  switch (cmd.type) {
    case 'buyCrate': {
      const count = Math.max(1, Math.floor(cmd.count ?? 1));
      if (!isFruitUnlocked(s, cmd.fruit)) return fail(s, `${FRUIT_NAMES[cmd.fruit]} gibt es erst nach der nächsten Eroberung.`);
      const free = capacity(s) - s.crates.length;
      if (free <= 0) return fail(s, 'Das Lager ist voll. Tippe auf das Plus im Lager, um ein Regal dazuzukaufen.');
      const n = Math.min(count, free);
      if (!pay(s, FRUITS[cmd.fruit].crateCost * n)) return;
      for (let i = 0; i < n; i++) s.crates.push({ id: s.nextId++, fruit: cmd.fruit });
      s.stats.cratesBought += n;
      break;
    }
    case 'hireDealer': {
      if (s.dealers.length >= spotCapacity(s, world)) return fail(s, 'Alle Verkaufsplätze sind besetzt. Erobere ein neues Viertel.');
      if (!pay(s, dealerCost(s))) return;
      const d = createDealer(s, world);
      pushMessage(s, 'info', `${d.name} verkauft jetzt für dich.`);
      break;
    }
    case 'buyShelf': {
      if (s.shelves >= maxShelves(world)) return fail(s, 'Das Lager ist voll ausgebaut.');
      if (!pay(s, shelfCost(s))) return;
      s.shelves++;
      break;
    }
    case 'hireFighter': {
      const count = Math.max(1, Math.floor(cmd.count ?? 1));
      for (let i = 0; i < count; i++) {
        if (s.fighters >= FIGHTERS.max) return fail(s, 'Der Hof ist voll.');
        if (!pay(s, fighterCost(s))) return;
        s.fighters++;
      }
      break;
    }
    case 'buyUpgrade': {
      const up = nextUpgrade(s);
      if (!up) return;
      if (s.districts[DISTRICT_IDS.indexOf(up.unlock)].owner !== 'player') return fail(s, 'Diese Ausrüstung gibt es erst nach der nächsten Eroberung.');
      if (!pay(s, up.cost)) return;
      s.upgrade++;
      pushMessage(s, 'unlock', `${UPGRADE_NAMES[up.id]} gekauft: Jeder Verkäufer trägt jetzt ${up.crates} Kisten.`);
      break;
    }
    case 'attack': {
      const err = startBattle(s, world, cmd.district);
      if (err) fail(s, err);
      break;
    }
    case 'battleRoll':
      battleRound(s, world, pushMessage);
      break;
    case 'battleAuto':
      battleAuto(s, world, pushMessage);
      break;
    case 'battleRetreat':
      battleRetreat(s, world, pushMessage);
      break;
    case 'battleClose':
      if (s.battle && s.battle.result !== 'running') s.battle = null;
      break;
    case 'debugMoney':
      s.money += cmd.amount;
      break;
    case 'debugConquer':
      if (s.districts[cmd.district]) s.districts[cmd.district] = { owner: 'player', gang: 0 };
      break;
    case 'debugSkipHours':
      break;
  }
}

