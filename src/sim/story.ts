// Aufträge: führen Schritt für Schritt durch das Spiel, vom Untergrund ins Bankenviertel.
import { DISTRICT_IDS, FRUIT_IDS, STORY_REWARDS, STORY_TARGETS } from '../data/balance';
import { districtIndex, isOwned } from './selectors';
import { stockAmpel } from './supply';
import type { GameState, MessageKind } from './types';

/** Worauf die Oberfläche beim aktuellen Auftrag hinweist */
export type StoryHint = 'stock' | 'people' | 'build' | 'shelf' | 'district' | 'farm' | 'none';

export interface StoryStep {
  title: string;
  text: string;
  hint: StoryHint;
  /** Viertel, auf das hingewiesen wird */
  district?: number;
  done: (s: GameState) => boolean;
}

const owned = (s: GameState, id: (typeof DISTRICT_IDS)[number]) => isOwned(s, districtIndex(id));

/** Sorten mit laufender Lieferung */
export function suppliedFruits(s: GameState): number {
  return FRUIT_IDS.filter((f) => s.orders[f] > 0).length;
}

export const STORY: StoryStep[] = [
  {
    title: 'Erste Lieferung',
    text: 'Bestelle eine tägliche Lieferung: Tippe unten auf Lager und erhöhe bei Äpfeln die Kisten pro Tag.',
    hint: 'stock',
    done: (s) => suppliedFruits(s) >= 1,
  },
  {
    title: 'Erster Umsatz',
    text: `Dein Verkäufer holt die Kisten selbst und sucht sich einen Platz. Verdiene ${STORY_TARGETS.firstEarnings} €.`,
    hint: 'none',
    done: (s) => s.earnedTotal >= STORY_TARGETS.firstEarnings,
  },
  {
    title: 'Lagerampel',
    text: 'Bring die Lagerampel oben auf Grün: Jede Sorte soll mindestens anderthalb Tage reichen.',
    hint: 'stock',
    done: (s) => s.day >= 1 && stockAmpel(s).ampel === 'green',
  },
  {
    title: 'Verstärkung',
    text: 'Heuere einen zweiten Verkäufer an: Tippe unten auf Leute.',
    hint: 'people',
    done: (s) => s.dealers.length >= STORY_TARGETS.dealers,
  },
  {
    title: 'Mehr Platz',
    text: 'Tippe im Lager auf das Plus über dem freien Regalplatz.',
    hint: 'shelf',
    done: (s) => s.shelves >= STORY_TARGETS.shelves,
  },
  {
    title: 'Eigene Leute',
    text: `Stelle ${STORY_TARGETS.fighters} Straßenkämpfer zusammen. Sie warten im Hof neben dem Lager.`,
    hint: 'people',
    done: (s) => s.fighters >= STORY_TARGETS.fighters || s.stats.battlesWon > 0,
  },
  {
    title: 'Raus aus dem Untergrund',
    text: 'Erobere das Bahnhofsviertel: Tippe auf das rote Schild und greife an.',
    hint: 'district',
    district: districtIndex('station'),
    done: (s) => owned(s, 'station'),
  },
  {
    title: 'Gemischte Ware',
    text: 'Bestelle Bananen dazu. Jedes Viertel kauft je Sorte nur eine begrenzte Menge, gemischt verdienst du mehr.',
    hint: 'stock',
    done: (s) => suppliedFruits(s) >= STORY_TARGETS.fruits,
  },
  {
    title: 'Mitten in der Stadt',
    text: 'Erobere die Altstadt.',
    hint: 'district',
    district: districtIndex('oldtown'),
    done: (s) => owned(s, 'oldtown'),
  },
  {
    title: 'Neue Kundschaft',
    text: 'Erobere die Einkaufsmeile oder das Szeneviertel.',
    hint: 'district',
    done: (s) => owned(s, 'shopping') || owned(s, 'scene'),
  },
  {
    title: 'Ganz oben',
    text: 'Erobere das Bankenviertel.',
    hint: 'district',
    district: districtIndex('banking'),
    done: (s) => owned(s, 'banking'),
  },
  {
    title: 'Die ganze Stadt',
    text: 'Erobere die übrigen Viertel.',
    hint: 'district',
    done: (s) => DISTRICT_IDS.every((_, i) => isOwned(s, i)),
  },
];

/** Prüft den aktuellen Auftrag und zahlt die Belohnung aus. Mehrere erledigte Aufträge werden nacheinander abgehakt. */
export function checkStory(s: GameState, push: (s: GameState, kind: MessageKind, text: string) => void): void {
  while (s.story < STORY.length && STORY[s.story].done(s)) {
    const reward = STORY_REWARDS[s.story] ?? 0;
    s.money += reward;
    push(s, 'story', `Auftrag erledigt: ${STORY[s.story].title}. Belohnung ${reward} €.`);
    s.story++;
  }
}
