// Würfelduell um ein Viertel: Der Angreifer würfelt mit bis zu drei Würfeln, die Gang mit bis zu zwei.
// Die höchsten Würfel werden paarweise verglichen; wer niedriger liegt, verliert einen Kämpfer,
// bei Gleichstand gewinnt die Gang.
import { BATTLE, DISTRICT_IDS, FRUIT_IDS, FRUITS } from '../data/balance';
import { DISTRICT_NAMES, FRUIT_NAMES } from '../data/names';
import { rand } from './rng';
import { isAttackable } from './selectors';
import type { BattleRoll, GameState, MessageKind } from './types';
import type { World } from './world';

type Push = (s: GameState, kind: MessageKind, text: string, x?: number, y?: number) => void;

export function rollDie(s: GameState): number {
  return 1 + Math.floor(rand(s) * 6);
}

/** Vergleicht zwei Würfelreihen (absteigend sortiert) und liefert die Verluste */
export function compareDice(attacker: number[], defender: number[]): { attackerLoss: number; defenderLoss: number } {
  let attackerLoss = 0;
  let defenderLoss = 0;
  const n = Math.min(attacker.length, defender.length);
  for (let i = 0; i < n; i++) {
    if (attacker[i] > defender[i]) defenderLoss++;
    else attackerLoss++;
  }
  return { attackerLoss, defenderLoss };
}

export function startBattle(s: GameState, world: World, district: number): string | null {
  if (s.battle && s.battle.result === 'running') return 'Es läuft bereits ein Kampf.';
  if (!isAttackable(s, world, district)) return 'Dieses Viertel grenzt nicht an dein Gebiet.';
  if (s.fighters < 1) return 'Du brauchst Straßenkämpfer für einen Angriff.';
  const defenders = s.districts[district].gang;
  s.battle = {
    district,
    attackers: s.fighters,
    defenders,
    startAttackers: s.fighters,
    startDefenders: defenders,
    rounds: 0,
    last: null,
    result: 'running',
  };
  s.fighters = 0;
  return null;
}

export function battleRound(s: GameState, world: World, push: Push): BattleRoll | null {
  const b = s.battle;
  if (!b || b.result !== 'running') return null;
  const a: number[] = [];
  const d: number[] = [];
  for (let i = 0; i < Math.min(BATTLE.attackerDice, b.attackers); i++) a.push(rollDie(s));
  for (let i = 0; i < Math.min(BATTLE.defenderDice, b.defenders); i++) d.push(rollDie(s));
  a.sort((x, y) => y - x);
  d.sort((x, y) => y - x);
  const { attackerLoss, defenderLoss } = compareDice(a, d);
  b.attackers -= attackerLoss;
  b.defenders -= defenderLoss;
  b.rounds++;
  b.last = { attacker: a, defender: d, attackerLoss, defenderLoss };
  s.stats.fightersLost += attackerLoss;
  s.stats.gangDefeated += defenderLoss;
  if (b.defenders <= 0) finish(s, world, 'won', push);
  else if (b.attackers <= 0) finish(s, world, 'lost', push);
  return b.last;
}

export function battleAuto(s: GameState, world: World, push: Push): void {
  for (let i = 0; i < BATTLE.maxAutoRounds && s.battle?.result === 'running'; i++) battleRound(s, world, push);
}

export function battleRetreat(s: GameState, world: World, push: Push): void {
  if (s.battle?.result !== 'running') return;
  finish(s, world, 'retreated', push);
}

function finish(s: GameState, world: World, result: 'won' | 'lost' | 'retreated', push: Push): void {
  const b = s.battle!;
  b.result = result;
  const name = DISTRICT_NAMES[DISTRICT_IDS[b.district]];
  const [lx, ly] = world.labels[b.district];
  if (result === 'won') {
    s.districts[b.district] = { owner: 'player', gang: 0 };
    s.fighters += b.attackers;
    s.stats.battlesWon++;
    const fruits = FRUIT_IDS.filter((f) => FRUITS[f].unlock === DISTRICT_IDS[b.district]).map((f) => FRUIT_NAMES[f]);
    push(s, 'unlock', `${name} erobert.${fruits.length ? ` Neu beim Großhändler: ${fruits.join(', ')}.` : ''}`, lx, ly);
    if (DISTRICT_IDS[b.district] === 'banking') s.won = true;
  } else {
    s.districts[b.district].gang = Math.max(0, b.defenders);
    s.fighters += Math.max(0, b.attackers);
    if (result === 'lost') {
      s.stats.battlesLost++;
      push(s, 'danger', `Angriff auf ${name} gescheitert. Die Gang hat noch ${b.defenders} Kämpfer.`, lx, ly);
    } else push(s, 'info', `Rückzug aus ${name}. ${b.attackers} Kämpfer kehren in den Hof zurück.`, lx, ly);
  }
}
