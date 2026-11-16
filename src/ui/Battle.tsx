// Würfelduell: Kampf um ein Viertel mit Würfeln, Siegchance und Tönen.
import { useEffect, useState } from 'preact/hooks';
import { DISTRICT_IDS } from '../data/balance';
import { DISTRICT_NAMES } from '../data/names';
import { audio } from '../audio/engine';
import { currentGame } from '../game';
import { winChance } from '../sim/odds';
import { pct } from './format';
import { uiTick } from './store';

function Die({ value, state }: { value: number; state: 'win' | 'lose' | 'none' }) {
  const pips: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[28, 26], [72, 26], [28, 50], [72, 50], [28, 74], [72, 74]],
  };
  return (
    <svg class={`die ${state}`} viewBox="0 0 100 100" width="46" height="46" aria-label={`Würfel ${value}`}>
      <rect x="4" y="4" width="92" height="92" rx="16" />
      {(pips[value] ?? []).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" />
      ))}
    </svg>
  );
}

function Troops({ n, side }: { n: number; side: 'own' | 'gang' }) {
  const shown = Math.min(n, 30);
  return (
    <div class={`troops ${side}`}>
      {Array.from({ length: shown }, (_, i) => (
        <i key={i} />
      ))}
      {n > shown && <span>+{n - shown}</span>}
    </div>
  );
}

export function BattleModal() {
  void uiTick.value;
  const g = currentGame();
  const b = g?.state.battle;
  const [rolling, setRolling] = useState(false);
  const [shownRound, setShownRound] = useState(0);
  const [fake, setFake] = useState<number[]>([1, 1, 1, 1, 1]);
  useEffect(() => {
    if (!b) return;
    if (b.rounds !== shownRound) {
      setRolling(true);
      let n = 0;
      const t = setInterval(() => {
        setFake(Array.from({ length: 5 }, () => 1 + Math.floor(Math.random() * 6)));
        if (++n >= 6) {
          clearInterval(t);
          setRolling(false);
          setShownRound(b.rounds);
        }
      }, 70);
      return () => clearInterval(t);
    }
  }, [b?.rounds]);
  // Töne: Würfeln, Ausgang der Runde, Ausgang des Kampfes
  useEffect(() => {
    if (!b || !b.last) return;
    audio.play('dice');
    const t = setTimeout(() => {
      if (b.result === 'won') audio.play('conquer');
      else if (b.result === 'lost') audio.play('defeat');
      else audio.play(b.last!.defenderLoss >= b.last!.attackerLoss ? 'roundWin' : 'roundLose');
    }, 450);
    return () => clearTimeout(t);
  }, [b?.rounds]);
  if (!g || !b) return null;
  const name = DISTRICT_NAMES[DISTRICT_IDS[b.district]];
  const last = b.last;
  const done = b.result !== 'running';
  const pairs = last ? Math.min(last.attacker.length, last.defender.length) : 0;
  const dieState = (side: 'a' | 'd', i: number): 'win' | 'lose' | 'none' => {
    if (!last || rolling || i >= pairs) return 'none';
    const aWins = last.attacker[i] > last.defender[i];
    return side === 'a' ? (aWins ? 'win' : 'lose') : aWins ? 'lose' : 'win';
  };
  const p = winChance(b.attackers, b.defenders);
  return (
    <div class="modal-backdrop battle-backdrop">
      <div class="battle panel">
        <header>
          <h2>Kampf um {name}</h2>
          {!done && <span class="small-text muted">Siegchance {pct(p)}</span>}
        </header>
        <div class="battle-body">
          <div class="side own">
            <span class="side-name">Deine Kämpfer</span>
            <span class="side-count">{b.attackers}</span>
            <Troops n={b.attackers} side="own" />
            <div class="dice">
              {(rolling ? fake.slice(0, Math.min(3, b.attackers + (last?.attackerLoss ?? 0))) : last?.attacker ?? []).map((v, i) => (
                <Die key={i} value={v} state={dieState('a', i)} />
              ))}
            </div>
          </div>
          <div class="versus">gegen</div>
          <div class="side gang">
            <span class="side-name">Gemüsegang</span>
            <span class="side-count">{b.defenders}</span>
            <Troops n={b.defenders} side="gang" />
            <div class="dice">
              {(rolling ? fake.slice(3, 3 + Math.min(2, b.defenders + (last?.defenderLoss ?? 0))) : last?.defender ?? []).map((v, i) => (
                <Die key={i} value={v} state={dieState('d', i)} />
              ))}
            </div>
          </div>
        </div>
        <p class="battle-info small-text">
          {done && !rolling
            ? b.result === 'won'
              ? `Sieg. ${name} gehört jetzt dir. ${b.attackers} Kämpfer kehren in den Hof zurück.`
              : b.result === 'lost'
                ? `Niederlage. Die Gemüsegang hält ${name} mit ${b.defenders} Kämpfern.`
                : `Rückzug. ${b.attackers} Kämpfer kehren zurück, die Gang hat noch ${b.defenders}.`
            : last && !rolling
              ? `Du verlierst ${last.attackerLoss}, die Gang verliert ${last.defenderLoss}. Der höhere Würfel gewinnt, bei Gleichstand die Gang.`
              : 'Du würfelst mit bis zu drei Würfeln, die Gang mit bis zu zwei. Die höchsten Würfel werden verglichen.'}
        </p>
        <footer>
          {!done ? (
            <>
              <button class="btn" disabled={rolling} onClick={() => g.command({ type: 'battleRetreat' })}>
                Rückzug
              </button>
              <button class="btn" disabled={rolling} onClick={() => g.command({ type: 'battleAuto' })}>
                Bis zum Ende
              </button>
              <button class="btn danger-solid big" disabled={rolling} onClick={() => g.command({ type: 'battleRoll' })}>
                Würfeln
              </button>
            </>
          ) : (
            <button class="btn primary big" disabled={rolling} onClick={() => g.command({ type: 'battleClose' })}>
              Weiter
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

