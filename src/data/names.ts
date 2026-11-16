// Namen und Bezeichnungen.
import type { DistrictId, FruitId } from './balance';

export const FIRST_NAMES = [
  'Anna', 'Ben', 'Clara', 'David', 'Elena', 'Felix', 'Greta', 'Hannah', 'Jan', 'Jonas', 'Julia', 'Karl', 'Laura', 'Lea',
  'Leon', 'Lukas', 'Marie', 'Max', 'Mia', 'Niklas', 'Nina', 'Paul', 'Sophie', 'Tim', 'Tobias', 'Lena', 'Emma', 'Finn',
  'Sarah', 'Moritz', 'Katharina', 'Simon', 'Lisa', 'Erik', 'Johanna', 'Philipp', 'Ayşe', 'Mehmet', 'Elif', 'Can', 'Olga',
  'Piotr', 'Marta', 'Luca', 'Sofia', 'Ahmad', 'Yasmin', 'Stefan', 'Sabine', 'Thomas', 'Andrea', 'Michael', 'Petra',
];

export const LAST_NAMES = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer',
  'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger',
  'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier', 'Lehmann', 'Schmid', 'Schulze',
  'Maier', 'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber', 'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz',
  'Yılmaz', 'Kaya', 'Nowak', 'Kowalski', 'Jung', 'Hahn', 'Vogel', 'Friedrich', 'Keller', 'Günther', 'Frank', 'Berger',
];

export const FRUIT_NAMES: Record<FruitId, string> = {
  apple: 'Äpfel',
  banana: 'Bananen',
  strawberry: 'Erdbeeren',
  grape: 'Trauben',
  mango: 'Mangos',
  dragonfruit: 'Drachenfrüchte',
};

export const DISTRICT_NAMES: Record<DistrictId, string> = {
  underground: 'Untergrund',
  station: 'Bahnhofsviertel',
  oldtown: 'Altstadt',
  scene: 'Szeneviertel',
  shopping: 'Einkaufsmeile',
  banking: 'Bankenviertel',
};

export const UPGRADE_NAMES = {
  handcart: 'Handkarren',
  cargobike: 'Lastenräder',
} as const;

/** Höfe des ersten Akts in der Reihenfolge von FARMS */
export const FARM_NAMES = ['Hof Brinkmann', 'Obsthof Lindenau', 'Tropenhaus Kessler', 'Weingut Sonnenhang', 'Hof Petersen', 'Glashaus Exotica'];
export const FARMER_NAMES = ['Henning Brinkmann', 'Greta Lindenau', 'Ralf Kessler', 'Ilse Hartmann', 'Jens Petersen', 'Vera Nowak'];

export const TRAIT_NAMES = {
  stubborn: 'stur',
  fearful: 'ängstlich',
  greedy: 'gierig',
  honest: 'ehrlich',
} as const;

export const FARM_ACTION_NAMES = {
  advance: 'Vorschuss zahlen',
  bind: 'Langfristig binden',
  helpers: 'Erntehelfer stellen',
  protect: 'Schutz anbieten',
  refuse: 'Abnahme verweigern',
  poach: 'Helfer abwerben',
  soil: 'Bodenproben fälschen',
  inspect: 'Tipp ans Lebensmittelamt',
  takeover: 'Hof übernehmen',
} as const;

/** Der Boss der Gemüsegang taucht in Meldungen auf */
export const GANG_BOSS = 'Kohl-Kalle';
