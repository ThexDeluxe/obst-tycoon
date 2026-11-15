# Obst-Tycoon: Projektregeln

Die Spezifikation steht in `SPEC.md` (Version 2, vereinfachtes Spiel: Kisten, selbstständige Verkäufer, Eroberung der Viertel im Würfelduell).
Die ursprüngliche, ausführlichere Fassung liegt in `docs/SPEC-v1.md` und gilt nur noch für Technik und Projektregeln.
Leitlinie des Auftraggebers: einfach, sofort verständlich, ohne überladene Oberfläche, soll Spaß machen.
Vor jedem Commit: `npm test` grün, `npm run build` und `npm run lint` ohne Fehler.

## Regeln (aus der ersten Spezifikation, Abschnitt 2)

- UI-Texte und Code-Kommentare auf Deutsch mit echten Umlauten (ä, ö, ü, ß). Bezeichner im Code auf Englisch.
- Keine Emojis, an keiner Stelle. Symbole sind eigene SVG-Icons (`src/ui/icons.tsx`).
- In Texten und Kommentaren keine Gedankenstriche als Ersatz für Kommas.
- Ton nüchtern und sachlich wie in klassischen Wirtschaftssimulationen. Keine Witze, keine Comic-Effekte.
- Keine Abhängigkeiten von einem CDN. Alles kommt über npm, der Build läuft offline.
- Alle Spielwerte stehen zentral in `src/data/balance.ts`. Nirgendwo sonst stehen Zahlen fürs Balancing.
- Das Spiel läuft nur weiter, solange gespielt wird: kein Fortschritt offline, ein verborgener Tab pausiert das Spiel.
- Dezimalzahlen stehen in der SPEC mit Komma, im Code als normale Zahlen.

## Arbeitsweise

- Unklarheiten: sinnvolle Annahme treffen, mit Begründung in `DECISIONS.md` notieren, weiterarbeiten.
- Stand pro Meilenstein in `PROGRESS.md` festhalten.
- `referenz.jpg` ist die Stilvorlage für die Darstellung.
- Das Spiel wird auf dem Handy im Querformat getestet: Touch-Bedienung (Ziehen, Pinch, Tippen) und kleine Bildschirme (etwa 844 × 390) immer mitdenken.

## Architektur

- `src/sim/` Simulation ohne DOM- oder Three-Importe. Zustand ist reines JSON (`GameState`), Systeme sind Funktionen.
  10 Ticks pro Sekunde bei 1x, deterministischer Zufall (mulberry32, Zustand im Spielstand).
  Eingaben laufen als Befehle (`src/sim/commands.ts`) über `state.queue`; Oberfläche und Balancing-Bot nutzen dieselben Befehle.
- `src/render/` Three.js-Szene. Stadt pro Kartenabschnitt zusammengeführt, wiederkehrende Objekte als InstancedMesh.
- `src/ui/` Preact mit @preact/signals. Die Oberfläche liest den Zustand viermal pro Sekunde (`uiTick`).
- `src/data/` `balance.ts`, `map.ts` (ASCII-Karte plus Listen), Namen.
- `src/save/` Speicherformat mit Versionsnummer und Migrationen, IndexedDB über idb-keyval.
- `scripts/` Balancing-Bot (`npm run balance`) und Screenshot-Prüfung (`npm run shots`).
- Wichtige Dateien: `src/sim/dealers.ts` (Verkäufer-KI), `src/sim/battle.ts` und `src/sim/odds.ts` (Würfelduell),
  `src/sim/story.ts` (Aufträge), `src/render/labels.ts` (Schilder und Plus in der Welt), `src/ui/Hud.tsx` (Oberfläche).

## Befehle

- `npm run dev` Entwicklungsserver
- `npm test` Vitest
- `npm run lint` ESLint
- `npm run build` Typprüfung und Build nach `dist/`
- `npm run balance` Balancing-Bot über 40 Spieltage
- `npm run shots` Screenshots mit Playwright (Software-WebGL)

## Veröffentlichung

GitHub Actions (`.github/workflows/deploy.yml`) baut bei jedem Push auf `main` und veröffentlicht `dist/` auf dem Branch `gh-pages`.
Adresse: https://thexdeluxe.github.io/obst-tycoon/
