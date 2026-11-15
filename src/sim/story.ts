// Aufträge: führen Schritt für Schritt durch das Spiel, vom Untergrund ins Bankenviertel.
import { DISTRICT_IDS, STORY_REWARDS, STORY_TARGETS } from '../data/balance';
import { districtIndex, isOwned } from './selectors';
import type { GameState, MessageKind } from './types';

/** Worauf die Oberfläche beim aktuellen Auftrag hinweist */
export type StoryHint = 'fruit' | 'dealer' | 'shelf' | 'fighter' | 'district' | 'none';

export interface StoryStep {
  title: string;
  text: string;
  hint: StoryHint;
  /** Viertel, auf das hingewiesen wird */
  district?: number;
  done: (s: GameState) => boolean;
}

const owned = (s: GameState, id: (typeof DISTRICT_IDS)[number]) => isOwned(s, districtIndex(id));

export const STORY: StoryStep[] = [
  {
    title: 'Erste Kiste',
    text: 'Kaufe eine Kiste Äpfel: Tippe unten auf Obst und dann auf Äpfel.',
    hint: 'fruit',
    done: (s) => s.stats.cratesBought >= 1,
  },
  {
    title: 'Erster Umsatz',
    text: `Dein Verkäufer holt die Kiste selbst und sucht sich einen Platz. Verdiene ${STORY_TARGETS.firstEarnings} €.`,
    hint: 'none',
    done: (s) => s.earnedTotal >= STORY_TARGETS.firstEarnings,
  },
  {
    title: 'Verstärkung',
    text: 'Heuere einen zweiten Verkäufer an.',
    hint: 'dealer',
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
    hint: 'fighter',
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
    title: 'Wachstum',
    text: `Baue dein Geschäft aus: ${STORY_TARGETS.dealersMid} Verkäufer.`,
    hint: 'dealer',
    done: (s) => s.dealers.length >= STORY_TARGETS.dealersMid,
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
