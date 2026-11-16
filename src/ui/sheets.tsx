// Inhalte der Blätter: Lager, Leute, Bauen, Akt und Viertel.
import { DISTRICT_IDS, DISTRICTS, FIGHTERS, FRUIT_IDS, FRUITS, SATURATION, SHELVES, STOCK, UPGRADES, WHOLESALER, type FruitId } from '../data/balance';
import { DISTRICT_NAMES, FRUIT_NAMES, UPGRADE_NAMES } from '../data/names';
import { currentGame } from '../game';
import { plannedDeliveries } from '../sim/delivery';
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
  maxShelves,
  nextUpgrade,
  ownedCount,
  shelfCost,
  spotCapacity,
} from '../sim/selectors';
import { dailyDemand, openDemand } from '../sim/stock';
import { ampelFor, fruitRange } from '../sim/supply';
import { STORY } from '../sim/story';
import type { Dealer } from '../sim/types';
import type { World } from '../sim/world';
import { dec1, int, money, pct } from './format';
import { IconCheck, IconFist, IconLock, IconUserPlus } from './icons';
import { Num } from './Num';
import { attackTarget, selectedDealer, sheet } from './store';

const hex = (c: number) => `#${c.toString(16).padStart(6, '0')}`;

/** Reichweite als Text: Stunden unter einem Tag, sonst Tage */
export function rangeText(days: number): string {
  if (!Number.isFinite(days)) return 'lange';
  if (days <= 0) return 'leer';
  if (days < 1) return `${Math.max(1, Math.round(days * 16))} Std.`;
  return `${dec1(days)} Tage`;
}

/** Kurzer Hinweis je Sorte: welches eigene Viertel sucht, welches ist satt */
function demandHint(world: World, f: FruitId): string {
  const g = currentGame()!;
  const s = g.state;
  let want: { name: string; open: number } | null = null;
  let full: string | null = null;
  for (let i = 0; i < DISTRICT_IDS.length; i++) {
    if (!isOwned(s, i) || dailyDemand(world, i, f) <= 0) continue;
    const open = openDemand(s, world, i, f);
    if (open <= 0) full = full ?? DISTRICT_NAMES[DISTRICT_IDS[i]];
    else if (!want || open > want.open) want = { name: DISTRICT_NAMES[DISTRICT_IDS[i]], open };
  }
  const parts: string[] = [];
  if (want && want.open > 0.5) parts.push(`${want.name} sucht`);
  if (full) parts.push(`${full} satt`);
  return parts.join(', ');
}

export function StockSheet() {
  const g = currentGame()!;
  const s = g.state;
  const planned = plannedDeliveries(s);
  const cap = capacity(s);
  const cooled = s.crates.filter((c) => c.cooled).length;
  return (
    <>
      <div class="stock-list">
        {FRUIT_IDS.map((f) => {
          const unlocked = isFruitUnlocked(s, f);
          const r = fruitRange(s, f);
          const amp = r.perDay > 0 || r.units > 0 ? ampelFor(r.days) : 'none';
          const crates = countCrates(s, f);
          const tomorrow = planned.filter((c) => c.fruit === f).length;
          const kiosk = FRUITS[f].crateCost * STOCK.kioskFactor;
          const canKiosk = unlocked && s.kioskToday < STOCK.kioskPerDay && s.crates.length < cap && s.money >= kiosk;
          const oldest = s.crates.filter((c) => c.fruit === f).reduce((m, c) => Math.min(m, c.fresh), 1);
          return (
            <div key={f} class={`stock-row ${unlocked ? '' : 'locked'}`}>
              <span class="crate-icon" style={{ background: hex(FRUITS[f].color) }}>
                {crates > 0 ? <b>{crates}</b> : null}
              </span>
              <div class="sr-main">
                <b>{FRUIT_NAMES[f]}</b>
                {unlocked ? (
                  <small class="muted">
                    {demandHint(g.world, f) || (crates ? `älteste Kiste ${pct(oldest)} frisch` : 'kein Bestand')}
                  </small>
                ) : (
                  <small class="muted">
                    <IconLock size={11} /> nach Eroberung: {DISTRICT_NAMES[FRUITS[f].unlock]}
                  </small>
                )}
              </div>
              <Num
                class={`range ${amp}`}
                text={
                  r.perDay > 0
                    ? `Reichweite: ${int(r.units)} Stück im Bestand geteilt durch etwa ${int(r.perDay)} verkaufte Stück pro Tag.`
                    : 'Reichweite: Von dieser Sorte wurde in den letzten Tagen nichts verkauft.'
                }
              >
                {r.perDay > 0 ? rangeText(r.days) : r.units > 0 ? `${int(r.units)} St.` : '–'}
              </Num>
              <div class="sr-order">
                <button
                  class="icon-btn small-btn"
                  aria-label="weniger"
                  disabled={!unlocked || s.orders[f] <= 0}
                  onClick={() => g.command({ type: 'setOrder', fruit: f, crates: s.orders[f] - 1 })}
                >
                  −
                </button>
                <Num text={`Lieferung jeden Morgen um 06:00: ${s.orders[f]} Kisten zu je ${money(FRUITS[f].crateCost)}, bezahlt beim Abladen.`}>
                  <b class="mono">{tomorrow}</b>
                </Num>
                <button
                  class="icon-btn small-btn"
                  aria-label="mehr"
                  disabled={!unlocked || s.orders[f] >= WHOLESALER.maxCratesPerFruit}
                  onClick={() => g.command({ type: 'setOrder', fruit: f, crates: s.orders[f] + 1 })}
                >
                  +
                </button>
              </div>
              <button class="btn small kiosk-btn" disabled={!canKiosk} onClick={() => g.command({ type: 'kioskBuy', fruit: f })}>
                Kiosk {money(kiosk)}
              </button>
            </div>
          );
        })}
      </div>
      <div class="stock-foot small-text">
        <Num text="Belegung: Kisten im Lager. Jedes Regal fasst 6 Kisten, mehr Regale über das Plus in der Halle.">
          Lager {s.crates.length}/{cap}
        </Num>
        <Num text={s.coldRoom ? 'Im Kühlraum hält Obst etwa doppelt so lange. Belegt wird er automatisch mit den verderblichsten Sorten.' : 'Ohne Kühlraum verdirbt Obst nach der normalen Haltbarkeit. Bauen lässt er sich unter Bauen.'}>
          {s.coldRoom ? `Kühlung ${cooled}/${STOCK.coldRoomCrates}` : 'kein Kühlraum'}
        </Num>
        <Num text={`Kiosk um die Ecke: höchstens ${STOCK.kioskPerDay} Kisten pro Tag zum doppelten Grundpreis, sofort im Lager.`}>
          Kiosk {s.kioskToday}/{STOCK.kioskPerDay}
        </Num>
        <Num text="Vertriebsqualität: wie gut deine Verkäufer Sorten und Viertel wählen. Steigt nur durch Ausbau des Hauptquartiers.">
          Vertrieb {pct(s.salesQuality)}
        </Num>
      </div>
      <p class="sheet-intro">
        Mit + und − legst du fest, wie viele Kisten jeden Morgen kommen. Jedes Viertel kauft je Sorte nur eine begrenzte Menge am Tag, gemischt verdienst du mehr.
      </p>
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

export { dealerStatus };

export function PeopleSheet() {
  const g = currentGame()!;
  const s = g.state;
  const cost = dealerCost(s);
  const cap = spotCapacity(s, g.world);
  const full = s.dealers.length >= cap;
  const fc = fighterCost(s);
  let five = 0;
  for (let i = 0; i < 5; i++) five += fc + i * FIGHTERS.costPerOwned;
  const up = nextUpgrade(s);
  const upUnlocked = up ? isOwned(s, DISTRICT_IDS.indexOf(up.unlock)) : false;
  return (
    <>
      <div class="people-grid">
        <div class="people-card">
          <span class="pc-title">Verkäufer</span>
          <Num text={`Verkäufer arbeiten selbstständig. Höchstens zwei pro Verkaufsplatz, in deinen Vierteln gibt es Platz für ${cap}.`}>
            <b class="pc-count">{s.dealers.length}</b>
            <small> von {cap}</small>
          </Num>
          <button class="btn primary" disabled={full || s.money < cost} onClick={() => g.command({ type: 'hireDealer' })}>
            <IconUserPlus size={16} /> {money(cost)}
          </button>
          {full && <small class="neg">Alle Plätze besetzt</small>}
        </div>
        <div class="people-card">
          <span class="pc-title">Kämpfer</span>
          <Num text={`Straßenkämpfer warten im Hof und erobern Viertel im Würfelduell. Jeder weitere kostet ${FIGHTERS.costPerOwned} € mehr.`}>
            <b class="pc-count">{s.fighters}</b>
            <small> im Hof</small>
          </Num>
          <div class="row-btns">
            <button class="btn primary" disabled={s.money < fc || s.fighters >= FIGHTERS.max} onClick={() => g.command({ type: 'hireFighter' })}>
              <IconFist size={16} /> {money(fc)}
            </button>
            <button class="btn" disabled={s.money < five || s.fighters + 5 > FIGHTERS.max} onClick={() => g.command({ type: 'hireFighter', count: 5 })}>
              5 für {money(five)}
            </button>
          </div>
        </div>
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

export function BuildSheet() {
  const g = currentGame()!;
  const s = g.state;
  const cost = shelfCost(s);
  const canShelf = s.shelves < maxShelves(g.world);
  return (
    <div class="build-list">
      <div class="build-item">
        <div>
          <b>Regal</b>
          <small>
            +{SHELVES.cratesPerShelf} Kisten Platz, jetzt {s.shelves} von {maxShelves(g.world)}. Auch über das Plus in der Halle.
          </small>
        </div>
        <button class="btn primary" disabled={!canShelf || s.money < cost} onClick={() => g.command({ type: 'buyShelf' })}>
          {canShelf ? money(cost) : 'voll'}
        </button>
      </div>
      <div class="build-item">
        <div>
          <b>Kühlraum</b>
          <small>{STOCK.coldRoomCrates} Kisten bleiben etwa doppelt so lange frisch. Bananen lassen sich nicht kühlen.</small>
        </div>
        <button class="btn primary" disabled={s.coldRoom || s.money < STOCK.coldRoomCost} onClick={() => g.command({ type: 'buyColdRoom' })}>
          {s.coldRoom ? 'gebaut' : money(STOCK.coldRoomCost)}
        </button>
      </div>
    </div>
  );
}

export function ActSheet() {
  const g = currentGame()!;
  const s = g.state;
  const owned = ownedCount(s);
  return (
    <>
      <div class="act-head">
        <span class="act-tag">Akt 1</span>
        <b>Die Straße</b>
        <p class="sheet-intro">Vom Untergrund ins Bankenviertel: Bring alle sechs Viertel der Stadt unter deine Kontrolle.</p>
        <div class="bar">
          <div style={{ width: `${(owned / DISTRICT_IDS.length) * 100}%`, background: 'var(--green)' }} />
        </div>
        <small class="muted">
          {owned} von {DISTRICT_IDS.length} Vierteln
        </small>
      </div>
      <h3>Aufträge</h3>
      <ul class="task-list">
        {STORY.map((st, i) => (
          <li key={i} class={i < s.story ? 'done' : i === s.story ? 'current' : ''}>
            {i < s.story ? <IconCheck size={14} /> : <span class="task-dot" />}
            <span>
              <b>{st.title}</b>
              {i === s.story ? ` · ${st.text}` : ''}
            </span>
          </li>
        ))}
      </ul>
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

export function AttackSheet() {
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
        {fruits.length ? `, beim Großhändler neu: ${fruits.join(', ')}` : ''}. Pro Platz kauft das Viertel etwa {int(SATURATION.demandPerSpot)} Stück am Tag.
      </p>
      {!attackable ? (
        <p class="small-text muted">
          <IconLock size={12} /> Dieses Viertel grenzt noch nicht an dein Gebiet. Erobere zuerst ein Nachbarviertel.
        </p>
      ) : s.fighters === 0 ? (
        <button class="btn primary big" onClick={() => (sheet.value = 'people')}>
          <IconFist size={18} /> Erst Kämpfer anheuern
        </button>
      ) : (
        <>
          <p class="small-text">
            <Num text="Siegchance: exakt berechnet aus deinen und den gegnerischen Kämpfern, wenn bis zum Ende gewürfelt wird.">
              Siegchance: <b class={p >= 0.6 ? 'pos' : p < 0.4 ? 'neg' : ''}>{pct(p)}</b> ({chanceText(p)})
            </Num>
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
            <button class="btn big" onClick={() => (sheet.value = 'people')}>
              Mehr Kämpfer
            </button>
          </div>
        </>
      )}
    </>
  );
}
