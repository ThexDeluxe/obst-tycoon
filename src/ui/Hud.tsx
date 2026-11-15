// Spieloberfläche über der 3D-Ansicht: schlanke Leiste oben, drei große Aktionen unten,
// Blätter zum Kaufen, Würfelduell, Meldungen.
import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { CRATE_UNITS, DISTRICT_IDS, DISTRICTS, FIGHTERS, FRUIT_IDS, FRUITS, UPGRADES } from '../data/balance';
import { DISTRICT_NAMES, FRUIT_NAMES, UPGRADE_NAMES } from '../data/names';
import { currentGame } from '../game';
import { dealerUnits } from '../sim/dealers';
import { winChance } from '../sim/odds';
import {
  capacity,
  carryCrates,
  countCrates,
  dealerCost,
  fighterCost,
  isAttackable,
  isFruitUnlocked,
  isOwned,
  nextUpgrade,
  ownedCount,
  spotCapacity,
} from '../sim/selectors';
import { STORY } from '../sim/story';
import { clockText } from '../sim/time';
import type { Dealer } from '../sim/types';
import type { World } from '../sim/world';
import { int, money, moneyExact, pct } from './format';
import {
  IconClose,
  IconCrate,
  IconFaster,
  IconFist,
  IconFullscreen,
  IconInfo,
  IconLock,
  IconPause,
  IconPhoneRotate,
  IconPlay,
  IconRotateLeft,
  IconRotateRight,
  IconSettings,
  IconStar,
  IconTarget,
  IconUserPlus,
  IconWarning,
  IconZoomIn,
  IconZoomOut,
} from './icons';
import { SettingsPanel } from './panels/SettingsPanel';
import { attackTarget, notices, portraitDismissed, selectedDealer, settings, sheet, speedIndex, toast, uiTick, winShown, type SheetId } from './store';

const hex = (c: number) => `#${c.toString(16).padStart(6, '0')}`;

// ---------------------------------------------------------------------------
// Obere Leiste
// ---------------------------------------------------------------------------

function storyAction(): void {
  const g = currentGame();
  if (!g) return;
  const step = STORY[g.state.story];
  if (!step) return;
  // Ohne Obst geht nichts: dann zuerst zum Großhändler
  if (g.state.crates.length === 0 && step.hint !== 'shelf' && step.hint !== 'fighter' && step.hint !== 'district') {
    sheet.value = 'fruit';
    return;
  }
  switch (step.hint) {
    case 'fruit':
      sheet.value = 'fruit';
      break;
    case 'dealer':
      sheet.value = 'dealers';
      break;
    case 'fighter':
      sheet.value = 'fighters';
      break;
    case 'shelf':
      sheet.value = null;
      g.view.focusWarehouse();
      break;
    case 'district': {
      const target = step.district ?? DISTRICT_IDS.findIndex((_, i) => isAttackable(g.state, g.world, i));
      if (target >= 0) {
        const [x, y] = g.world.labels[target];
        g.focus(x, y + 6);
        g.openDistrict(target);
      }
      break;
    }
    default:
      break;
  }
}

export function TopBar() {
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const step = STORY[s.story];
  return (
    <div class="topbar">
      <div class="money panel" title="Geld">
        <span class="money-value">{money(s.money)}</span>
        <span class="money-sub">
          Tag {s.day + 1} · {clockText(s)}
        </span>
      </div>
      <button class="objective panel" onClick={storyAction} title="Auftrag: antippen für Hilfe">
        <IconTarget size={18} />
        <span class="obj-text">
          {step ? (
            <>
              <b>
                Auftrag {s.story + 1}/{STORY.length}:
              </b>{' '}
              {step.text}
            </>
          ) : (
            <b>Die ganze Stadt gehört dir.</b>
          )}
        </span>
      </button>
      <div class="controls panel">
        <button
          class={`icon-btn ${speedIndex.value === 0 ? 'active' : ''}`}
          aria-label={speedIndex.value === 0 ? 'Weiter' : 'Pause'}
          title="Pause (Leertaste)"
          onClick={() => g.togglePause()}
        >
          {speedIndex.value === 0 ? <IconPlay size={16} /> : <IconPause size={16} />}
        </button>
        <button
          class={`icon-btn speed-btn ${speedIndex.value > 1 ? 'active' : ''}`}
          aria-label="Tempo"
          title="Tempo 1x, 2x, 4x"
          onClick={() => g.setSpeed(speedIndex.value >= 3 ? 1 : speedIndex.value + 1)}
        >
          <IconFaster size={15} />
          <span>{speedIndex.value === 0 ? '1x' : ['', '1x', '2x', '4x'][speedIndex.value]}</span>
        </button>
        <button class="icon-btn" aria-label="Einstellungen" title="Einstellungen" onClick={() => toggleSheet('settings')}>
          <IconSettings size={18} />
        </button>
      </div>
    </div>
  );
}

function toggleSheet(id: SheetId): void {
  sheet.value = sheet.value === id ? null : id;
  selectedDealer.value = null;
}

// ---------------------------------------------------------------------------
// Aktionen unten
// ---------------------------------------------------------------------------

export function ActionBar() {
  void uiTick.value;
  const g = currentGame();
  if (!g) return null;
  const s = g.state;
  const hint = STORY[s.story]?.hint;
  const items: { id: SheetId; icon: (p: { size?: number }) => JSX.Element; label: string; sub: string; warn?: boolean }[] = [
    { id: 'fruit', icon: IconCrate, label: 'Obst', sub: `${s.crates.length}/${capacity(s)} Kisten`, warn: s.crates.length === 0 },
    { id: 'dealers', icon: IconUserPlus, label: 'Verkäufer', sub: `${s.dealers.length} im Einsatz` },
    { id: 'fighters', icon: IconFist, label: 'Kämpfer', sub: `${s.fighters} im Hof` },
  ];
  const hintFor: Record<string, SheetId> = { fruit: 'fruit', dealer: 'dealers', fighter: 'fighters' };
  return (
    <div class="actionbar">
      {items.map((it) => (
        <button
          key={it.id}
          class={`action panel ${sheet.value === it.id ? 'active' : ''} ${hintFor[hint ?? ''] === it.id || (it.warn && s.dealers.length > 0) ? 'hint' : ''} ${it.warn ? 'warn' : ''}`}
          onClick={() => toggleSheet(it.id)}
        >
          <it.icon size={22} />
          <span class="action-text">
            <b>{it.label}</b>
            <small>{it.sub}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Blätter
// ---------------------------------------------------------------------------

function FruitSheet() {
  const g = currentGame()!;
  const s = g.state;
  const free = capacity(s) - s.crates.length;
  return (
    <>
      <p class="sheet-intro">
        Eine Kiste hat {CRATE_UNITS} Stück. Deine Verkäufer holen sie selbst aus dem Lager, die wertvollste Sorte zuerst.{' '}
        <b>
          Lager: {s.crates.length} von {capacity(s)}
        </b>
        {free <= 0 && <span class="neg"> · voll, Plus im Lager antippen</span>}
      </p>
      <div class="fruit-grid">
        {FRUIT_IDS.map((f) => {
          const def = FRUITS[f];
          const unlocked = isFruitUnlocked(s, f);
          const canBuy = unlocked && free > 0 && s.money >= def.crateCost;
          const fill = Math.min(free, Math.floor(s.money / def.crateCost));
          return (
            <div key={f} class={`fruit-card ${unlocked ? '' : 'locked'}`}>
              <button class="fruit-main" disabled={!canBuy} onClick={() => g.command({ type: 'buyCrate', fruit: f })}>
                <span class="crate-icon" style={{ background: hex(def.color) }}>
                  {unlocked && countCrates(s, f) > 0 ? <b>{countCrates(s, f)}</b> : null}
                </span>
                <span class="fruit-name">{FRUIT_NAMES[f]}</span>
                {unlocked ? (
                  <>
                    <span class="fruit-price">{money(def.crateCost)}</span>
                    <small>Erlös ab {money(def.unitPrice * CRATE_UNITS)}</small>
                  </>
                ) : (
                  <small>
                    <IconLock size={12} /> nach Eroberung: {DISTRICT_NAMES[def.unlock]}
                  </small>
                )}
              </button>
              {unlocked && fill > 1 && (
                <button class="fill-btn" onClick={() => g.command({ type: 'buyCrate', fruit: f, count: fill })}>
                  +{fill}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function dealerStatus(world: World, d: Dealer, hasCrates: boolean): string {
  const spot = d.spot !== null ? world.spots[d.spot].name : '';
  switch (d.mode) {
    case 'idle':
      return d.load.length ? 'Sucht einen freien Platz' : hasCrates ? 'Holt Obst' : 'Wartet auf Obst';
    case 'loading':
      return 'Nimmt Kisten auf';
    case 'toSpot':
      return `Unterwegs: ${spot}`;
    case 'setup':
      return `Baut auf: ${spot}`;
    case 'selling':
      return `Verkauft: ${spot}`;
    case 'packing':
      return 'Baut ab';
    case 'toWarehouse':
      return 'Zurück zum Lager';
  }
}

function DealerSheet() {
  const g = currentGame()!;
  const s = g.state;
  const cost = dealerCost(s);
  const cap = spotCapacity(s, g.world);
  const full = s.dealers.length >= cap;
  const up = nextUpgrade(s);
  const upUnlocked = up ? isOwned(s, DISTRICT_IDS.indexOf(up.unlock)) : false;
  return (
    <>
      <p class="sheet-intro">
        Verkäufer suchen sich selbst den besten freien Platz in deinen Vierteln. Plätze: {s.dealers.length} von {cap} besetzt.
      </p>
      <div class="sheet-actions">
        <button class="btn primary big" disabled={full || s.money < cost} onClick={() => g.command({ type: 'hireDealer' })}>
          <IconUserPlus size={18} /> Verkäufer anheuern · {money(cost)}
        </button>
        {full && <span class="small-text neg">Alle Plätze besetzt. Erobere ein neues Viertel.</span>}
      </div>
      {up && (
        <div class="upgrade">
          <div>
            <b>{UPGRADE_NAMES[up.id]} für alle</b>
            <small>
              Jeder Verkäufer trägt {up.crates} Kisten statt {carryCrates(s)}
              {up.speed > UPGRADES[0].speed ? ' und ist schneller' : ''}.
            </small>
          </div>
          {upUnlocked ? (
            <button class="btn small primary" disabled={s.money < up.cost} onClick={() => g.command({ type: 'buyUpgrade' })}>
              {money(up.cost)}
            </button>
          ) : (
            <span class="small-text muted">
              <IconLock size={12} /> nach Eroberung: {DISTRICT_NAMES[up.unlock]}
            </span>
          )}
        </div>
      )}
      <div class="dealer-list">
        {s.dealers.map((d) => (
          <button
            key={d.id}
            class="dealer-row"
            onClick={() => {
              selectedDealer.value = d.id;
              sheet.value = null;
              g.followDealer(d.id);
            }}
          >
            <b>{d.name}</b>
            <span class="muted">{dealerStatus(g.world, d, s.crates.length > 0)}</span>
            <span class="mono">{money(d.earnedToday)}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function FighterSheet() {
  const g = currentGame()!;
  const s = g.state;
  const cost = fighterCost(s);
  let five = 0;
  for (let i = 0; i < 5; i++) five += cost + i * (FIGHTERS.costPerOwned);
  const target = DISTRICT_IDS.findIndex((_, i) => isAttackable(s, g.world, i));
  return (
    <>
      <p class="sheet-intro">
        Straßenkämpfer warten im Hof neben dem Lager. Mit ihnen eroberst du die roten Viertel der Gemüsegang im Würfelduell. Im Hof: <b>{s.fighters}</b>
      </p>
      <div class="sheet-actions">
        <button class="btn primary big" disabled={s.money < cost || s.fighters >= FIGHTERS.max} onClick={() => g.command({ type: 'hireFighter' })}>
          <IconFist size={18} /> 1 Kämpfer · {money(cost)}
        </button>
        <button class="btn big" disabled={s.money < five || s.fighters + 5 > FIGHTERS.max} onClick={() => g.command({ type: 'hireFighter', count: 5 })}>
          5 Kämpfer · {money(five)}
        </button>
      </div>
      {target >= 0 && s.fighters > 0 && (
        <button
          class="btn danger-solid"
          onClick={() => {
            const [x, y] = g.world.labels[target];
            g.focus(x, y + 6);
            g.openDistrict(target);
          }}
        >
          Zum nächsten Ziel: {DISTRICT_NAMES[DISTRICT_IDS[target]]}
        </button>
      )}
    </>
  );
}

function chanceText(p: number): string {
  if (p >= 0.85) return 'sehr gut';
  if (p >= 0.6) return 'gut';
  if (p >= 0.4) return 'offen';
  if (p >= 0.15) return 'schlecht';
  return 'sehr schlecht';
}

function AttackSheet() {
  const g = currentGame()!;
  const s = g.state;
  const i = attackTarget.value;
  if (i === null || !s.districts[i]) return null;
  const id = DISTRICT_IDS[i];
  const ds = s.districts[i];
  const def = DISTRICTS[id];
  const attackable = isAttackable(s, g.world, i);
  const p = winChance(s.fighters, ds.gang);
  const fruits = FRUIT_IDS.filter((f) => FRUITS[f].unlock === id).map((f) => FRUIT_NAMES[f]);
  const spots = g.world.spots.filter((sp) => sp.district === id).length;
  if (ds.owner === 'player') return <p class="sheet-intro">{DISTRICT_NAMES[id]} gehört dir.</p>;
  return (
    <>
      <div class="attack-head">
        <div>
          <span class="gang-tag">Gemüsegang</span>
          <b>{ds.gang} Kämpfer</b>
        </div>
        <div>
          <span class="own-tag">Deine Leute</span>
          <b>{s.fighters} Kämpfer</b>
        </div>
      </div>
      <p class="sheet-intro">
        Nach der Eroberung: {spots} neue Verkaufsplätze, Preise {pct(def.priceLevel - 1)} höher als im Untergrund
        {fruits.length ? `, neu: ${fruits.join(', ')}` : ''}.
      </p>
      {!attackable ? (
        <p class="small-text muted">
          <IconLock size={12} /> Dieses Viertel grenzt noch nicht an dein Gebiet. Erobere zuerst ein Nachbarviertel.
        </p>
      ) : s.fighters === 0 ? (
        <button class="btn primary big" onClick={() => (sheet.value = 'fighters')}>
          <IconFist size={18} /> Erst Kämpfer anheuern
        </button>
      ) : (
        <>
          <p class="small-text">
            Siegchance: <b class={p >= 0.6 ? 'pos' : p < 0.4 ? 'neg' : ''}>{pct(p)}</b> ({chanceText(p)})
          </p>
          <div class="sheet-actions">
            <button
              class="btn danger-solid big"
              onClick={() => {
                g.command({ type: 'attack', district: i });
                sheet.value = null;
              }}
            >
              <IconFist size={18} /> Angreifen mit {s.fighters} Kämpfern
            </button>
            <button class="btn big" onClick={() => (sheet.value = 'fighters')}>
              Mehr Kämpfer
            </button>
          </div>
        </>
      )}
    </>
  );
}

const SHEET_TITLES: Record<SheetId, string> = {
  fruit: 'Obst kaufen',
  dealers: 'Verkäufer',
  fighters: 'Straßenkämpfer',
  attack: 'Viertel',
  settings: 'Einstellungen',
};

export function Sheet() {
  void uiTick.value;
  const g = currentGame();
  const id = sheet.value;
  if (!g || !id) return null;
  const title = id === 'attack' && attackTarget.value !== null ? DISTRICT_NAMES[DISTRICT_IDS[attackTarget.value]] : SHEET_TITLES[id];
  return (
    <section class={`sheet panel sheet-${id}`}>
      <header>
        <h2>{title}</h2>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (sheet.value = null)}>
          <IconClose size={18} />
        </button>
      </header>
      <div class="sheet-body">
        {id === 'fruit' && <FruitSheet />}
        {id === 'dealers' && <DealerSheet />}
        {id === 'fighters' && <FighterSheet />}
        {id === 'attack' && <AttackSheet />}
        {id === 'settings' && <SettingsPanel />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Verkäuferkarte
// ---------------------------------------------------------------------------

export function DealerCard() {
  void uiTick.value;
  const g = currentGame();
  const id = selectedDealer.value;
  if (!g || id === null || sheet.value) return null;
  const d = g.state.dealers.find((x) => x.id === id);
  if (!d) return null;
  return (
    <div class="dealer-card panel">
      <div class="row">
        <b>{d.name}</b>
        <button class="icon-btn" aria-label="Schließen" onClick={() => (selectedDealer.value = null)}>
          <IconClose size={16} />
        </button>
      </div>
      <span class="muted small-text">{dealerStatus(g.world, d, g.state.crates.length > 0)}</span>
      <span class="small-text">
        Trägt: {d.load.length ? d.load.map((l) => `${l.units} ${FRUIT_NAMES[l.fruit]}`).join(', ') : 'nichts'} ({dealerUnits(d)} Stück)
      </span>
      <span class="small-text">
        Heute: {int(d.soldToday)} verkauft, {moneyExact(d.earnedToday)}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Würfelduell
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Abschluss, Meldungen, Kamera, Debug
// ---------------------------------------------------------------------------

export function WinModal() {
  void uiTick.value;
  const g = currentGame();
  if (!g || !g.state.won || winShown.value || g.state.battle) return null;
  const s = g.state;
  return (
    <div class="modal-backdrop">
      <div class="modal panel win">
        <header>
          <h2>Vom Untergrund ins Bankenviertel</h2>
        </header>
        <div class="modal-body">
          <p>Das Bankenviertel gehört dir. Aus einer Lagerhalle im Untergrund ist ein Obsthandel geworden, den die ganze Stadt kennt.</p>
          <ul class="events">
            <li>Spieltage: {s.day + 1}</li>
            <li>Verkauft: {int(s.stats.sold)} Stück, {money(s.earnedTotal)} Umsatz</li>
            <li>
              Viertel: {ownedCount(s)} von {DISTRICT_IDS.length}, Kämpfe gewonnen: {s.stats.battlesWon}, verloren: {s.stats.battlesLost}
            </li>
          </ul>
          <p class="muted small-text">Das Spiel geht weiter, solange du willst.</p>
        </div>
        <footer>
          <button class="btn primary" onClick={() => (winShown.value = true)}>
            Weiterspielen
          </button>
        </footer>
      </div>
    </div>
  );
}

const NOTICE_ICON: Record<string, (p: { size?: number }) => JSX.Element> = {
  warning: IconWarning,
  danger: IconWarning,
  unlock: IconStar,
  story: IconTarget,
  money: IconCrate,
  info: IconInfo,
};

export function Notices() {
  void uiTick.value;
  const g = currentGame();
  const now = performance.now();
  const list = notices.value.filter((n) => now - n.time < 6000);
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
              if (n.x !== undefined && n.y !== undefined) g.focus(n.x + 0.5, n.y + 4);
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

function toggleFullscreen(): void {
  const doc = document as Document & { webkitFullscreenElement?: Element };
  const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
  if (document.fullscreenElement || doc.webkitFullscreenElement) {
    document.exitFullscreen?.().catch(() => undefined);
    return;
  }
  const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
  Promise.resolve(req?.())
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
      <button class="icon-btn round" aria-label="Links drehen (Q)" onClick={() => rig.rotate(-1)}>
        <IconRotateLeft size={17} />
      </button>
      <button class="icon-btn round" aria-label="Rechts drehen (E)" onClick={() => rig.rotate(1)}>
        <IconRotateRight size={17} />
      </button>
      <button class="icon-btn round" aria-label="Vergrößern" onClick={() => rig.zoomStep(-1)}>
        <IconZoomIn size={17} />
      </button>
      <button class="icon-btn round" aria-label="Verkleinern" onClick={() => rig.zoomStep(1)}>
        <IconZoomOut size={17} />
      </button>
      <button class="icon-btn round" aria-label="Vollbild" onClick={toggleFullscreen}>
        <IconFullscreen size={17} />
      </button>
    </div>
  );
}

export function DebugOverlay() {
  void uiTick.value;
  const g = currentGame();
  if (!g || !settings.value.debug) return null;
  const s = g.state;
  return (
    <div class="debug mono">
      <div>FPS {g.fps}</div>
      <div>Draw Calls {g.view.stats.drawCalls}</div>
      <div>Dreiecke {int(g.view.stats.triangles)}</div>
      <div>Ticks/s {g.tps}</div>
      <div>
        Entitäten {s.peds.length + s.vehicles.length + s.dealers.length} (Passanten {s.peds.length}, Verkäufer {s.dealers.length}, Fahrzeuge{' '}
        {s.vehicles.length})
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
