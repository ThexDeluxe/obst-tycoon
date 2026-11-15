# Obst-Tycoon: Spezifikation (Version 2, vereinfacht)

Diese Fassung ersetzt die ursprüngliche Spezifikation (`docs/SPEC-v1.md`). Grundlage ist der Wunsch nach einem deutlich einfacheren Spiel, das ohne Einarbeitung Spaß macht. Technik, Projektregeln und Arbeitsweise aus der ersten Fassung gelten weiter (siehe `CLAUDE.md`).

## 1. Idee und Geschichte

Vom Untergrund ins Bankenviertel: Der Spieler startet mit einer Lagerhalle im heruntergekommenen Untergrund-Viertel, einem Verkäufer und 120 €. Er kauft Obst kistenweise, seine Verkäufer bringen es selbstständig auf die Straße. Alle anderen Viertel der Großstadt gehören der Gemüsegang und sind sofort sichtbar rot markiert. Mit einer kleinen Armee aus Straßenkämpfern erobert er sie Viertel für Viertel im Würfelduell. Ziel ist das Bankenviertel mit seinen Hochhäusern, danach geht das Spiel endlos weiter.

## 2. Grundsätze

- Jede Entscheidung ist ein Tippen. Keine Tabellen, keine Mengenfelder, keine Untermenüs.
- Aufträge oben am Bildschirm führen Schritt für Schritt durch das Spiel und dienen als Einführung. Ein Tippen auf den Auftrag zeigt, wo es weitergeht.
- Für das Handy im Querformat gebaut (etwa 844 × 390), mit Maus und Tastatur ebenso bedienbar.

## 3. Stadt

- Großstadtzentrum mit 96 × 96 Feldern in sechs Vierteln: Untergrund (Start), Bahnhofsviertel, Altstadt, Szeneviertel, Einkaufsmeile, Bankenviertel.
- Je Viertel 3 bis 5 Verkaufsplätze. Das Bankenviertel hat Glastürme, das höchste mit Hubschrauberlandeplatz.
- Viertel der Gang: roter Schleier über Boden und Dächern, rote Grenzlinie, rote Stände der Gang an den Verkaufsplätzen, Gangmitglieder am Schild des Viertels. Das Schild zeigt Name und Stärke der Gang.
- Angreifen kann man nur Viertel, die an ein eigenes Viertel grenzen (Schild mit Faust). Andere zeigen ein Schloss.

## 4. Wirtschaft

- **Obst:** Kauf mit einem Tippen je Kiste (20 Stück), sofort im Lager. Sorten werden durch Eroberungen freigeschaltet: Äpfel (Start), Bananen (Bahnhofsviertel), Erdbeeren (Altstadt), Trauben (Szeneviertel), Mangos (Einkaufsmeile), Drachenfrüchte (Bankenviertel).
- **Lager:** geräumige Halle mit 12 Regalplätzen zu je 6 Kisten, zwei Regale zu Beginn. Über dem nächsten freien Regalplatz schwebt ein Plus mit Preis; ein Tippen kauft das Regal, es erscheint sofort. Jedes weitere Regal wird teurer.
- **Verkäufer:** werden mit einem Tippen angeheuert (jeder weitere teurer). Sie holen selbst die wertvollste Kiste, suchen den besten freien Platz in den eigenen Vierteln (Kundschaft mal Preisniveau, geteilt durch Belegung und Weg), bauen Stand und Schirm auf, verkaufen und holen Nachschub. Höchstens zwei pro Platz; mehr Verkäufer als Plätze gibt es nicht.
- **Verkauf:** Kundschaft je Platz nach Viertel und Stoßzeit, Kauf mit 85 % Wahrscheinlichkeit, Erlös je Stück mal Preisniveau des Viertels (Untergrund 1,0 bis Bankenviertel 2,0).
- **Ausrüstung für alle Verkäufer:** Handkarren (2 Kisten, nach der Altstadt), Lastenräder (4 Kisten, schneller, nach der Einkaufsmeile).
- Keine Löhne, kein Verderb, keine Tagesberichte. Der Tag läuft von 06:00 bis 22:00 ohne Unterbrechung weiter, eine kurze Meldung nennt die Tageseinnahmen.

## 5. Straßenkämpfer und Würfelduell

- Kämpfer werden einzeln oder zu fünft angeheuert und stehen sichtbar im Hof neben dem Lager. Jeder weitere kostet etwas mehr, höchstens 60.
- Angriff mit allen Kämpfern aus dem Hof. Das Angriffsblatt zeigt Gangstärke, eigene Stärke, die Siegchance und was die Eroberung bringt.
- Würfelduell: Der Angreifer würfelt mit bis zu drei Würfeln, die Gang mit bis zu zwei. Die höchsten Würfel werden paarweise verglichen, der niedrigere verliert einen Kämpfer, bei Gleichstand gewinnt die Gang. Würfeln, bis zum Ende würfeln oder Rückzug.
- Sieg: Das Viertel gehört dem Spieler, der rote Schleier verschwindet, Überlebende kehren in den Hof zurück. Niederlage: Die Gang behält ihre Verluste, erholt sich aber um 1 bis 2 Kämpfer pro Tag bis zur vollen Stärke.
- Gangstärke: Bahnhofsviertel 4, Altstadt 10, Szeneviertel 16, Einkaufsmeile 24, Bankenviertel 40.

## 6. Aufträge

1. Erste Kiste kaufen. 2. 30 € verdienen. 3. Zweiter Verkäufer. 4. Regal per Plus kaufen. 5. Fünf Straßenkämpfer. 6. Bahnhofsviertel erobern. 7. Fünf Verkäufer. 8. Altstadt erobern. 9. Einkaufsmeile oder Szeneviertel erobern. 10. Bankenviertel erobern (Abschlussbild mit Statistik). 11. Die ganze Stadt.

Jeder erledigte Auftrag bringt eine kleine Belohnung.

## 7. Oberfläche

- Oben: Geld mit Tag und Uhrzeit, der aktuelle Auftrag, Pause, Tempo (1x, 2x, 4x), Einstellungen.
- Unten: drei große Knöpfe Obst, Verkäufer, Kämpfer. Sie öffnen kurze Blätter. Der Knopf des aktuellen Auftrags pulsiert.
- In der Welt: Plus über dem freien Regalplatz, rote Schilder der Gang-Viertel, Hinweis „Lager leer“, Umsatzzahlen über den Ständen.
- Rechts: Drehen, Zoomen, Vollbild. Ziehen verschiebt, zwei Finger zoomen, Doppeltippen folgt einer Person.

## 8. Technik

Wie in der ersten Fassung: Vite, TypeScript strict, Three.js, Preact mit Signals, idb-keyval, Vitest, Playwright, ESLint, deterministische Simulation mit 10 Ticks pro Sekunde, Befehlswarteschlange für Oberfläche und Balancing-Bot, Spielstand mit Versionsnummer und Migrationen (Version 3, ältere Stände werden übernommen), Autosave, verborgener Tab pausiert.

## 9. Prüfungen

- Vitest: Karte und Erreichbarkeit, Zeit, Passanten, Kisten und Lager, Verkäufer, Würfelregeln und Siegchance, Kampfablauf, Aufträge, Speichern und Laden, Migrationen.
- Balancing-Bot (`npm run balance`): Bahnhofsviertel an Tag 2 bis 4, Altstadt an Tag 4 bis 9, Bankenviertel an Tag 12 bis 25, Laufzeit unter 20 Sekunden.
