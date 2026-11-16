// Aufträge: führen Schritt für Schritt durch das Spiel, vom Untergrund ins Bankenviertel.
// Die Einführung folgt den Systemen: zuerst ein Vertrag, dann die Lagerampel, dann der erste Druck auf einen Bauern.
import { DISTRICT_IDS, FRUIT_IDS, STORY_REWARDS, STORY_TARGETS } from '../data/balance';
import { hasContract } from './farms';
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
  /** Hof, der im Blatt Höfe vorausgewählt wird */
  farm?: number;
  done: (s: GameState) => boolean;
}

const owned = (s: GameState, id: (typeof DISTRICT_IDS)[number]) => isOwned(s, districtIndex(id));

/** Sorten mit laufendem Vertrag oder eigenem Hof */
export function suppliedFruits(s: GameState): number {
  return FRUIT_IDS.filter((f) => s.farms.some((farm) => hasContract(farm, s.day) && (farm.contract!.crates[f] ?? 0) > 0)).length;
}

export const STORY: StoryStep[] = [
  {
    title: 'Erster Vertrag',
    text: 'Ohne Bauern kein Obst. Tippe unten auf Höfe, wähle Hof Brinkmann und biete ihm einen Vertrag an.',
    hint: 'farm',
    farm: 0,
    done: (s) => s.stats.contracts > 0 || suppliedFruits(s) > 0,
  },
  {
    title: 'Erster Umsatz',
    text: `Dein Verkäufer holt die Kisten selbst und sucht sich einen Platz. Verdiene ${STORY_TARGETS.firstEarnings} €.`,
    hint: 'none',
    done: (s) => s.earnedTotal >= STORY_TARGETS.firstEarnings,
  },
  {
    title: 'Lagerampel',
    text: 'Bring die Lagerampel oben auf Grün: Bestand und Lieferungen sollen anderthalb Tage reichen.',
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
    title: 'Gemischte Ware',
    text: 'Jedes Viertel kauft je Sorte nur eine begrenzte Menge. Schließe einen Vertrag für eine zweite Sorte, etwa Bananen bei Kessler.',
    hint: 'farm',
    farm: 2,
    done: (s) => suppliedFruits(s) >= STORY_TARGETS.fruits,
  },
  {
    title: 'Eigene Leute',
    text: `Stelle ${STORY_TARGETS.fighters} Straßenkämpfer zusammen. Sie warten im Hof neben dem Lager.`,
    hint: 'people',
    done: (s) => s.fighters >= STORY_TARGETS.fighters || s.stats.battlesWon > 0,
  },
  {
    title: 'Erster Druck',
    text: 'Ein Bauer, der dich fürchtet, liefert billiger: Biete einem Hof Schutz an oder wirb Helfer ab. Die Ermittler sehen zu. Wer sauber bleiben will, zahlt einen Vorschuss.',
    hint: 'farm',
    done: (s) => s.stats.actions > 0,
  },
  {
    title: 'Raus aus dem Untergrund',
    text: 'Erobere das Bahnhofsviertel: Tippe auf das rote Schild und greife an.',
    hint: 'district',
    district: districtIndex('station'),
    done: (s) => owned(s, 'station'),
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
    text: 'Erobere das Bankenviertel. Dort zahlen sie für Drachenfrüchte jeden Preis, aber die wachsen nur im Glashaus der Gang.',
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
