// Blatt Höfe: 3D-Umland, kompakte Hofverwaltung und Meldungen mit zwei Antworten.
import { useEffect, useRef } from 'preact/hooks';
import { FarmsWorldView } from '../render/farms-world';
import { CONTRACTS, FARM_ACTIONS, FARMS, FRUITS, HEAT, type FarmActionId, type FruitId } from '../data/balance';
import { FARM_ACTION_NAMES, FARM_NAMES, FARMER_NAMES, FRUIT_NAMES, GANG_BOSS, TRAIT_NAMES } from '../data/names';
import { currentGame } from '../game';
import {
  actionChance,
  actionCost,
  actionEffectText,
  actionProblem,
  contractChance,
  cratePrice,
  eventView,
  farmCapacity,
  farmerLine,
  farmStatus,
  hasContract,
  offerCrates,
  suggestOffer,
  visibleActions,
  type Offer,
} from '../sim/farms';
import type { FarmMemory, PendingEvent } from '../sim/types';
import { money, moneyExact, pct } from './format';
import { IconStar } from './icons';
import { Num } from './Num';
import { BossPortrait, FarmerPortrait } from './Portrait';
import { contractDraft, farmSheetLevel, farmTab, selectedFarm, sheet, uiTick } from './store';

const hex = (c: number) => `#${c.toString(16).padStart(6, '0')}`;

function chanceClass(p: number): string {
  return p >= 0.7 ? 'pos' : p < 0.4 ? 'neg' : 'mid';
}

// ---------------------------------------------------------------------------
// 3D-Umlandansicht
// ---------------------------------------------------------------------------

export function FarmsWorldOverlay() {
  void uiTick.value;
  const canvas = useRef<HTMLCanvasElement>(null);
  const view = useRef<FarmsWorldView | null>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const instance = new FarmsWorldView(element, (farm) => {
      selectedFarm.value = farm;
      contractDraft.value = null;
      if (farmSheetLevel.value === 'collapsed') farmSheetLevel.value = 'normal';
    });
    view.current = instance;
    return () => {
      instance.dispose();
      view.current = null;
    };
  }, []);

  useEffect(() => {
    const game = currentGame();
    if (game) view.current?.update(game.state.farms, game.state.day, game.state.pending, selectedFarm.value);
    // Verdeckte Ränder messen: Leiste oben, Blatt (unten oder als Seitenpanel rechts), Knöpfe unten
    const top = document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0;
    const bar = document.querySelector('.actionbar')?.getBoundingClientRect().top ?? window.innerHeight;
    const panel = document.querySelector('.sheet-farms')?.getBoundingClientRect();
    const side = !!panel && panel.left > window.innerWidth * 0.3;
    const bottom = window.innerHeight - (panel && !side ? Math.min(panel.top, bar) : bar);
    const right = panel && side ? window.innerWidth - panel.left : 0;
    view.current?.setInsets(top + 6, right + 6, bottom + 6, 6);
  }, [uiTick.value, selectedFarm.value, farmSheetLevel.value]);

  return (
    <div class="farms-world" aria-label="Umlandkarte mit sechs Höfen">
      <canvas ref={canvas} aria-label="3D-Karte: Hof antippen, ziehen zum Verschieben, Mausrad zum Zoomen" />
      <span class="farms-world-hint">Hof antippen · Ziehen zum Verschieben · Pinch / Mausrad zum Zoomen</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hof-Karte
// ---------------------------------------------------------------------------

function Stars({ n }: { n: number }) {
  return (
    <span class="stars" aria-label={`${n} Sterne`}>
      {[1, 2, 3].map((k) => (
        <IconStar key={k} size={12} class={k <= n ? 'on' : 'off'} />
      ))}
    </span>
  );
}

function Bar({ label, value, kind, text }: { label: string; value: number; kind: 'loyalty' | 'fear'; text: string }) {
  return (
    <Num text={text} class="fbar">
      <span class="fbar-label">
        {label} <b>{Math.round(value)}</b>
      </span>
      <span class="bar">
        <span class={`fill ${kind}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </span>
    </Num>
  );
}

function offerSummary(i: number, o: Offer): string {
  const parts = FARMS[i].fruits.filter((fr) => (o.crates[fr] ?? 0) > 0).map((fr) => `${o.crates[fr]} ${FRUIT_NAMES[fr]}`);
  return `${parts.join(' und ')} pro Tag, ${o.days} Tage, ${o.pricePct} %${o.exclusive ? ', exklusiv' : ''}`;
}

function draftFrom(i: number, o: Offer) {
  const crates: Record<string, number> = {};
  for (const fr of FARMS[i].fruits) crates[fr] = o.crates[fr] ?? 0;
  return { farm: i, crates, pricePct: o.pricePct, days: o.days, exclusive: o.exclusive };
}

function draftOffer(d: NonNullable<typeof contractDraft.value>): Offer {
  return { crates: { ...d.crates } as Partial<Record<FruitId, number>>, pricePct: d.pricePct, days: d.days, exclusive: d.exclusive };
}

function ContractEditor({ i }: { i: number }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const d = contractDraft.value!;
  const offer = draftOffer(d);
  const own = s.farms[i].owner === 'player';
  const chance = contractChance(s, i, offer);
  const cap = FARMS[i].capacity;
  const total = offerCrates(offer);
  const set = (patch: Partial<typeof d>) => (contractDraft.value = { ...d, ...patch });
  return (
    <div class="contract-editor">
      {FARMS[i].fruits.map((fr) => (
        <div key={fr} class="ce-row">
          <span class="dot" style={{ background: hex(FRUITS[fr].color) }} />
          <span class="ce-label">{FRUIT_NAMES[fr]}</span>
          <button class="icon-btn small-btn" aria-label="weniger" disabled={(d.crates[fr] ?? 0) <= 0} onClick={() => set({ crates: { ...d.crates, [fr]: (d.crates[fr] ?? 0) - 1 } })}>
            −
          </button>
          <b class="mono ce-val">{d.crates[fr] ?? 0}</b>
          <button class="icon-btn small-btn" aria-label="mehr" disabled={total >= cap} onClick={() => set({ crates: { ...d.crates, [fr]: (d.crates[fr] ?? 0) + 1 } })}>
            +
          </button>
          <small class="muted">je {moneyExact(cratePrice(s, i, fr, d.pricePct))}</small>
        </div>
      ))}
      {!own && (
        <>
          <div class="ce-row">
            <span class="ce-label">Preis</span>
            <button
              class="icon-btn small-btn"
              aria-label="billiger"
              disabled={d.pricePct <= CONTRACTS.pricePctMin}
              onClick={() => set({ pricePct: d.pricePct - CONTRACTS.pricePctStep })}
            >
              −
            </button>
            <b class="mono ce-val">{d.pricePct} %</b>
            <button
              class="icon-btn small-btn"
              aria-label="teurer"
              disabled={d.pricePct >= CONTRACTS.pricePctMax}
              onClick={() => set({ pricePct: d.pricePct + CONTRACTS.pricePctStep })}
            >
              +
            </button>
            <small class="muted">vom Grundpreis</small>
          </div>
          <div class="ce-row">
            <span class="ce-label">Laufzeit</span>
            <div class="seg">
              {CONTRACTS.durations.map((n) => (
                <button key={n} class={d.days === n ? 'on' : ''} onClick={() => set({ days: n })}>
                  {n} Tage
                </button>
              ))}
            </div>
          </div>
          <label class="ce-row toggle">
            <span class="ce-label">Exklusiv</span>
            <input type="checkbox" checked={d.exclusive} onChange={(e) => set({ exclusive: (e.target as HTMLInputElement).checked })} />
            <small class="muted">liefert an niemanden sonst, kostet {CONTRACTS.exclusivePct} % oder Angst</small>
          </label>
        </>
      )}
      <div class="ce-foot">
        {!own && (
          <Num text="Annahmechance: Preis, Loyalität, Angst und frühere Erfahrungen gegen die Schwelle des Bauern.">
            Chance <b class={chanceClass(chance)}>{pct(chance)}</b>
          </Num>
        )}
        <button class="btn" onClick={() => (contractDraft.value = null)}>
          Abbrechen
        </button>
        <button
          class="btn primary"
          disabled={total <= 0}
          onClick={() => {
            g.command({ type: 'offerContract', farm: i, offer });
            contractDraft.value = null;
          }}
        >
          {own ? 'Übernehmen' : 'Abschicken'}
        </button>
      </div>
    </div>
  );
}

function ContractBox({ i }: { i: number }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const f = s.farms[i];
  if (contractDraft.value?.farm === i) return <ContractEditor i={i} />;
  if (f.owner === 'gang') {
    return (
      <p class="small-text muted fc-note">
        Liefert an {GANG_BOSS}. Einen Vertrag gibt es erst, wenn der Hof nicht mehr der Gang gehört.
        {f.closedUntil >= s.day ? ` Vom Lebensmittelamt geschlossen bis Tag ${f.closedUntil + 1}.` : ''}
      </p>
    );
  }
  const c = f.contract;
  if (c && c.endDay >= s.day) {
    const parts = FARMS[i].fruits.filter((fr) => (c.crates[fr] ?? 0) > 0).map((fr) => `${c.crates[fr]} ${FRUIT_NAMES[fr]}`);
    const own = f.owner === 'player';
    return (
      <div class="contract-box">
        <Num
          text={
            own
              ? 'Eigener Hof: Die Ware kommt jeden Morgen zu Erzeugerkosten, ohne Vertragsende.'
              : 'Vertrag: Die Lieferung kommt jeden Morgen um 06:00 und wird beim Abladen bezahlt.'
          }
        >
          <b>{own ? 'Eigener Hof' : 'Vertrag'}:</b> {parts.join(' und ')} pro Tag
          {own ? ' zu Erzeugerkosten' : `, ${c.pricePct} %, ${c.startDay > s.day ? 'ab morgen' : `bis Tag ${c.endDay + 1}`}`}
          {c.exclusive && !own ? ', exklusiv' : ''}
          {c.priceLock ? ', Preis fest' : ''}
          {f.credit > 0 ? `, Vorschuss ${money(f.credit)}` : ''}
        </Num>
        <div class="row-btns">
          {!own && c.endDay - s.day <= 2 && (
            <button class="btn small primary" onClick={() => g.command({ type: 'renewContract', farm: i })}>
              Verlängern
            </button>
          )}
          <button class="btn small" onClick={() => (contractDraft.value = draftFrom(i, { crates: c.crates, pricePct: c.pricePct, days: c.days, exclusive: c.exclusive }))}>
            {own ? 'Mengen ändern' : 'Ändern'}
          </button>
          {!own && (
            <button class="btn small" onClick={() => g.command({ type: 'cancelContract', farm: i })}>
              Kündigen
            </button>
          )}
        </div>
      </div>
    );
  }
  const offer = suggestOffer(s, g.world, i);
  const chance = contractChance(s, i, offer);
  const later = f.talkDay > s.day;
  return (
    <div class="contract-box">
      <button class="btn primary offer-btn" disabled={later} onClick={() => g.command({ type: 'offerContract', farm: i, offer })}>
        <span>
          <b>Vertrag anbieten</b>
          <small>{later ? `${FARMER_NAMES[i]} verhandelt erst morgen wieder` : offerSummary(i, offer)}</small>
        </span>
        {!later && <span class={`chance ${chanceClass(chance)}`}>{pct(chance)}</span>}
      </button>
      <button class="link-btn" disabled={later} onClick={() => (contractDraft.value = draftFrom(i, offer))}>
        Bedingungen ändern
      </button>
    </div>
  );
}

const KIND_TEXT = { clean: 'sauber', pressure: 'Druck', dirty: 'schmutzig' } as const;

function ActionButton({ i, id }: { i: number; id: FarmActionId }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const def = FARM_ACTIONS[id];
  const problem = actionProblem(s, i, id);
  const cost = actionCost(s, i, id);
  const chance = actionChance(s, i, id);
  return (
    <button class={`action-card ${def.kind}`} disabled={!!problem} onClick={() => g.command({ type: 'farmAction', farm: i, action: id })}>
      <span class="ac-top">
        <b>{FARM_ACTION_NAMES[id]}</b>
        <span class={`kind ${def.kind}`}>{def.heat > 0 ? `Druck +${def.heat}` : KIND_TEXT[def.kind]}</span>
      </span>
      <small>{actionEffectText(id)}</small>
      <span class="ac-foot">
        <span>{cost > 0 ? money(cost) : id === 'helpers' || id === 'protect' ? `${def.fighters} Kämpfer` : 'kostenlos'}</span>
        <span class={chanceClass(chance)}>{problem ?? `Chance ${pct(chance)}`}</span>
      </span>
    </button>
  );
}

type FarmTab = 'overview' | 'contract' | 'actions' | 'history';

const MEMORY_TEXT: Record<FarmMemory, string> = {
  advance: 'Du hast im Voraus bezahlt.',
  helpers: 'Du hast Erntehelfer gestellt.',
  hailHelp: 'Du hast nach dem Hagel geholfen.',
  bind: 'Du hast einen langfristigen Vertrag angeboten.',
  protect: 'Du hast Schutz durch deine Leute angeboten.',
  refuse: 'Du hast eine Lieferung nicht abgenommen.',
  soil: 'Du hast Bodenproben fälschen lassen.',
  hailPenalty: 'Du hast nach dem Hagel eine Vertragsstrafe verlangt.',
  cancel: 'Du hast den Vertrag gekündigt.',
  takeover: 'Du hast den Hof übernommen.',
};

function FarmCard({ i, tab }: { i: number; tab: FarmTab }) {
  void uiTick.value;
  const g = currentGame()!;
  const s = g.state;
  const f = s.farms[i];
  const def = FARMS[i];
  const line = farmerLine(s, i);
  const owner = f.owner === 'gang' ? 'Gang' : f.owner === 'player' ? 'gehört dir' : 'frei';

  return (
    <div class="farm-card">
      <div class="fc-head">
        <FarmerPortrait farm={i} size={48} />
        <div class="fc-title">
          <b>{FARM_NAMES[i]}</b>
          <small>{FARMER_NAMES[i]}, {TRAIT_NAMES[def.trait]}</small>
          <small class="muted">{farmStatus(s, i)}</small>
        </div>
        <span class={`owner-tag ${f.owner}`}>{owner}</span>
      </div>

      {tab === 'overview' && (
        <>
          <div class="fc-stats small-text">
            <Num text="Kapazität: So viele Kisten liefert der Hof höchstens pro Tag. Erntehelfer bringen mehr, Hagel halbiert sie.">
              <b>{farmCapacity(s, i)}</b> Kisten/Tag
            </Num>
            {def.fruits.map((fr) => (
              <Num key={fr} text={`Preis einer Kiste ${FRUIT_NAMES[fr]} beim jetzigen Vertrag oder zum Grundpreis. Angst und Schutz senken ihn.`}>
                <span class="dot" style={{ background: hex(FRUITS[fr].color) }} /> {moneyExact(cratePrice(s, i, fr))}
              </Num>
            ))}
            <Num text="Qualität: Jeder Stern über zwei bringt 10 % mehr Haltbarkeit und Verkaufspreis, jeder darunter 10 % weniger.">
              <Stars n={f.quality} />
            </Num>
          </div>
          <div class="fc-bars">
            <Bar label="Loyalität" value={f.loyalty} kind="loyalty" text="Loyalität steigt langsam mit laufenden Verträgen und sauberen Aktionen, sinkt bei Druck, Kündigung und vollem Lager." />
            <Bar label="Angst" value={f.fear} kind="fear" text="Angst senkt sofort die Preise und sinkt um 5 pro Tag ohne neuen Druck. Über 60 Angst und unter 20 Loyalität läuft ein Bauer über oder sagt aus." />
          </div>
          {/* Freier Hof ohne Vertrag: Angebot direkt hier, damit ein Vertrag zwei Tipps braucht */}
          {f.owner === 'free' && !hasContract(f, s.day) ? (
            <ContractBox i={i} />
          ) : (
            <div class="farm-overview-contract">
              <span>
                <b>Vertrag & Lieferung</b>
                <small>{farmStatus(s, i)}</small>
              </span>
              <button class="btn small" onClick={() => (farmTab.value = 'contract')}>Verwalten</button>
            </div>
          )}
          {line && <p class="fc-memory">{line}</p>}
        </>
      )}

      {tab === 'contract' && (
        <div class="farm-tab-content">
          <h3>Liefervertrag</h3>
          <ContractBox i={i} />
        </div>
      )}

      {tab === 'actions' && (
        <div class="farm-tab-content">
          <p class="farm-tab-note">Aktionen verändern Loyalität, Angst, Kapazität oder Ermittlungsdruck. Kosten und Erfolgschance stehen direkt an jeder Aktion.</p>
          <div class="fc-actions">
            {visibleActions(s, i).map((id) => <ActionButton key={id} i={i} id={id} />)}
          </div>
          {f.guards > 0 && (
            <button class="link-btn" onClick={() => g.command({ type: 'withdrawGuards', farm: i })}>
              Schutz beenden: {f.guards} Kämpfer zurück in den Hof
            </button>
          )}
        </div>
      )}

      {tab === 'history' && (
        <div class="farm-tab-content">
          <h3>Was sich der Bauer merkt</h3>
          {f.memory.length ? (
            <ol class="farm-history">
              {[...f.memory].reverse().map((memory, index) => <li key={`${memory}-${index}`}>{MEMORY_TEXT[memory]}</li>)}
            </ol>
          ) : (
            <p class="muted small-text">Noch keine besonderen Erinnerungen. Wie du mit dem Hof umgehst, prägt die nächsten Verhandlungen.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function FarmsSheet() {
  void uiTick.value;
  const i = Math.max(0, Math.min(FARMS.length - 1, selectedFarm.value));
  const tabs: { id: FarmTab; label: string }[] = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'contract', label: 'Vertrag' },
    { id: 'actions', label: 'Aktionen' },
    { id: 'history', label: 'Verlauf' },
  ];
  return (
    <div class="farms-panel">
      <nav class="farm-tabs" aria-label="Hofverwaltung">
        {tabs.map((tab) => (
          <button key={tab.id} class="farm-tab" type="button" aria-pressed={farmTab.value === tab.id} onClick={() => (farmTab.value = tab.id)}>
            {tab.label}
          </button>
        ))}
      </nav>
      <div class="farm-scroll">
        <FarmCard i={i} tab={farmTab.value} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meldungen mit zwei Antworten
// ---------------------------------------------------------------------------

export function EventCard({ p }: { p: PendingEvent }) {
  // Liest den veränderlichen Spielzustand: bei jedem UI-Takt neu zeichnen
  void uiTick.value;
  const g = currentGame()!;
  const v = eventView(g.state, p);
  const open = () => {
    selectedFarm.value = p.farm;
    contractDraft.value = null;
    farmTab.value = 'overview';
    farmSheetLevel.value = 'normal';
    sheet.value = 'farms';
  };
  return (
    <div class="event-card panel">
      <button class="ev-body" onClick={open}>
        {v.portrait === 'boss' ? <BossPortrait size={38} /> : <FarmerPortrait farm={p.farm} size={38} />}
        <span>
          <b>{v.title}</b>
          <small>{v.text}</small>
        </span>
      </button>
      <div class="ev-btns">
        <button
          class="btn small primary"
          onClick={() => {
            if (p.kind === 'contractEnd' && v.options[0] === 'Verhandeln') {
              open();
              g.command({ type: 'answerEvent', id: p.id, choice: 1 });
              return;
            }
            g.command({ type: 'answerEvent', id: p.id, choice: 0 });
          }}
        >
          {v.options[0]}
        </button>
        <button class="btn small" onClick={() => g.command({ type: 'answerEvent', id: p.id, choice: 1 })}>
          {v.options[1]}
        </button>
      </div>
    </div>
  );
}

/** Ermittlungsdruck als Stufe (Folgen mit M10) */
export function heatLevel(heat: number): { cls: string; text: string } {
  if (heat >= HEAT.charges) return { cls: 'charges', text: 'Anklage droht' };
  if (heat >= HEAT.investigation) return { cls: 'investigation', text: 'Ermittlungen' };
  if (heat >= HEAT.watched) return { cls: 'watched', text: 'beobachtet' };
  return { cls: 'calm', text: 'ruhig' };
}
