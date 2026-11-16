# Fortschritt

## M1 Grundgerüst: erledigt

- Projekt mit Vite, TypeScript (strict), Three.js, Preact und @preact/signals, idb-keyval, Vitest, Playwright, ESLint. `base: './'`.
- Karte 64 × 64 als ASCII-Raster in `src/data/map.ts` mit 18 Verkaufsplätzen in fünf Vierteln, Fahrzeugrouten und Lagergrundstück.
- Stadt aus Grundformen: Straßen mit Markierungen, Überwege, Gehwege, Plätze, Grünflächen, Reihenhäuser, Backstein- und Putzbauten, Läden mit Markisen, Bahnhof mit Uhrturm, Hallen, Hochschule, Mensa, Dienststelle, Brunnen, Zäune, Gleise, Wartehäuschen. Pro Kartenabschnitt ein Mesh, Bäume und Laternen als InstancedMesh.
- Aufgeschnittenes Lagerhaus mit Büro und Regalreihe, Erweiterungsflächen markiert.
- Isometrische Kamera: Zoomstufen per Mausrad oder Pinch, Verschieben per Ziehen und WASD/Pfeiltasten, Drehen mit Q/E oder Knöpfen, Doppelklick zum Verfolgen.
- Zeit mit 10 Ticks pro Sekunde, Tempo Pause/1x/2x/4x (Leertaste, 1, 2, 3), Tagesabschluss um 22:00.
- Passanten (bis 300) nach Nachfragekurve, Autos und Busse.
- Speichern: drei Plätze plus Autosave in IndexedDB, Versionsnummer, Migrationen, Export und Import als .json.
- F3-Anzeige mit FPS, Draw Calls, Ticks pro Sekunde und Entitäten. Entwicklerkonsole im Entwicklungsmodus.
- Tests: Karte und Weglängen, Wegfindung, Zeit, Passanten, Speichern und Laden.
- GitHub Pages über GitHub Actions.

## M2 Wirtschaft: erledigt

- Großmarkt mit Tagespreisen (±5 % pro Tag, 0,85 bis 1,15), Mengenrabatt ab 10 Kisten, Lieferung um 06:00 (mit Laderampe zusätzlich 12:00), Erstattung bei vollem Lager, Stornieren.
- Lager mit Kisten, Frische und Verderb, Kühlzellen mit automatischer Belegung, Regale zeigen den Füllstand als Kistenstapel in Produktfarben.
- Räume bauen (Regalreihe, Kühlzelle, Laderampe, Funkzentrale) mit einer Spielstunde Bauzeit, Abriss mit 50 % Erstattung, Büro-Ausbau, Bauabschnitte.
- Personal: drei Bewerber pro Tag, Anwerben, Entlassen, Lohn nach Formel, Personalgrenze durch das Büro.
- Verkäufer: Laden im Lager, Laufwege per A* mit Zwischenspeicher, Aufbau mit Fortschrittsring, Verkauf, Abbau, Nachladen, Rückkehr um 21:30. Sortiment automatisch oder von Hand. Ausrüstung kaufen und zuweisen.
- Verkaufsmodell: Kaufinteressenten nach Viertelkurve, Platzfaktor und Wochentag, Poisson pro Tick, Produktwahl nach Vorlieben und Preis, Talentfaktor, Altstadtaufschlag, Abschlag bei geringer Frische.
- Kunden bleiben am Stand kurz stehen, aufsteigende Umsatzzahlen (abschaltbar).
- Tagesabschluss mit Bericht: Einnahmen und Ausgaben nach Posten, Saldo, verdorbene Ware, Umsatz und Marktanteil pro Viertel, Verkäufe pro Verkäufer, Ereignisse, Umsatzverlauf der letzten 14 Tage.
- Ruf-Stufen nach Gesamtumsatz mit Fortschrittsbalken, Dispositionsrahmen bis −1.000 € mit Zinsen.
- Oberfläche: obere Leiste, Reiter Personal, Großmarkt, Lager und Bau, Ausrüstung, Viertel, Ziel, Berichte, Einstellungen; Personen- und Platzkarten; Meldungen mit Kamerafahrt. Für Touch im Querformat ausgelegt.
- Spielstand Version 2 mit Migration von Version 1.
- Balancing-Bot über 60 Tage in unter einer Sekunde; Korridore für M2 erfüllt.
- Tests: Verkaufsmodell, Verderb und Kühlung, Großmarkt, Personal, Bau, Tagesablauf der Verkäufer, Migration, Speichern und Laden.

## Nächste Schritte

- M3 Gewerbeaufsicht und Aufklärung.

## Neuausrichtung: vereinfachtes Spiel (Version 2 der Spezifikation)

- Neue Großstadtkarte 96 × 96 mit sechs Vierteln: Untergrund, Bahnhofsviertel, Altstadt, Szeneviertel, Einkaufsmeile, Bankenviertel (Glastürme, Hubschrauberlandeplatz).
- Geräumige Lagerhalle mit 12 Regalplätzen, Plus mit Preis über dem nächsten freien Platz, Kisten in Sortenfarben, Büro, Gabelstapler; Hof mit Sandsack für die Straßenkämpfer.
- Obst kistenweise mit einem Tippen, sechs Sorten über Eroberungen freigeschaltet.
- Verkäufer arbeiten selbstständig (Platzwahl, Stand mit Schirm, Nachschub), Ausrüstung für alle (Handkarren, Lastenräder).
- Gang-Viertel rot markiert mit Schildern, Gangständen und Gangmitgliedern; Eroberung im Würfelduell mit Siegchance.
- Aufträge als Einführung und Geschichte vom Untergrund ins Bankenviertel, Abschlussbild.
- Schlanke Oberfläche: Geld, Auftrag, Tempo oben; Obst, Verkäufer, Kämpfer unten; kurze Blätter.
- Spielstand Version 3 mit Migration aus Version 1 und 2.
- Tests neu (35), Balancing-Bot neu, alle Korridore erfüllt.

## M7 Lager: erledigt

- Ware kommt per Lieferwagen jeden Morgen um 06:00. Er ist auf der Lagerstraße zu sehen, fährt vor, lädt Kiste für Kiste ab und fährt weiter. Bis M8 liefert ein Großhändler über Daueraufträge je Sorte.
- Kiosk um die Ecke als Notlösung: höchstens 3 Kisten am Tag zum doppelten Preis.
- Frische und Verderb nach Sorte (Tabelle 4.3), Qualität in Sternen, unter 40 % Frische 60 % des Preises, verdorbene Ware wird beim Tagesabschluss entsorgt und gemeldet. Kühlraum mit 12 Plätzen, automatisch mit den verderblichsten Sorten belegt.
- Reichweite je Sorte und Lagerampel in der Leiste oben, Hinweis über dem Lager („Erdbeeren reichen bis 17 Uhr“, „Lieferung: 3 von 8 Kisten“).
- Tagesbedarf je Viertel und Sorte nach Vorlieben, Aufpreis bis 1,6-fach, Sättigung. Vertriebsqualität 70 %.
- Lagerblatt: je Sorte Bestand, Reichweite in Ampelfarbe, Lieferung pro Tag mit Plus und Minus, Hinweis („Altstadt sucht, Bahnhof satt“), Kiosk; darunter Belegung, Kühlung, Kiosk und Vertrieb. Jede Zahl ist antippbar und erklärt sich in einem Satz.
- Fünf Knöpfe unten vorbereitet (Lager, Leute, Bauen, Akt; Höfe folgt mit M8), Blätter höchstens zwei Drittel hoch, Wischen nach unten schließt.
- Tonmodul `src/audio/engine.ts`: Kassenklingeln, Lieferwagen, Abladen, Warnton bei roter Ampel, Klicken und Wischen, Bauen, dazu Stadtlärm nach Tageszeit und Passanten, abends Grillen. Stummschalter oben, Effekte und Umgebung getrennt in den Einstellungen.
- Spielstand Version 4 mit Migration aus Version 3.
- Tests: 51 (neu: Verderb, Kühlung, Lieferung, Rückstand, Kiosk, Sättigung, Sortiment, Reichweite, Leerlauf, Vertriebsqualität).

### Bot-Ergebnis M7

`npm run balance` (40 Tage, Standardstrategie mit Daueraufträgen nach Verkauf und Bedarf):

| Seed | Bahnhofsviertel | Altstadt | Szeneviertel | Einkaufsmeile | Bankenviertel |
|---|---|---|---|---|---|
| 1 | 5 | 10 | 13 | 17 | 22 |
| 2 | 5 | 9 | 11 | 15 | 23 |
| 3 | 5 | 11 | 14 | 19 | 22 |

- Alle Korridore erfüllt (Bahnhofsviertel Tag 2 bis 5, Altstadt 5 bis 12, Bankenviertel 12 bis 25, Verkäufer ohne Ware unter 5 % der Stunden, solange das Lager wachsen kann). Laufzeit unter einer Sekunde.
- Sortiment: Ein Lager nur mit Drachenfrüchten bringt 36 % weniger Gewinn als ein gemischtes (Test in `tests/stock.test.ts`).
- Leerlauf: Ohne Lieferung ist das Lager spätestens nach zwei Tagen leer, mit Lieferung nicht (Test).
- Nach dem Bankenviertel begrenzt die Halle (12 Regale, 72 Kisten) den Nachschub. Das ist für den ersten Akt gewollt; mehr Lieferungen bringt die Laderampe in Akt 2.

## M8 Bauern: erledigt

- Blatt „Höfe“ (fünfter Knopf unten) mit Umlandkarte: Stadt in der Mitte, sechs Höfe mit Straßen, Besitzer als Farbe (frei, Gang rot, eigener Hof grün), laufende Verträge gestrichelt.
- Hof-Karte mit Porträt, Name, Eigenschaft (stur, ängstlich, gierig, ehrlich), Kapazität, Preisen je Sorte, Qualität in Sternen, Loyalität und Angst als Balken, letzter Erinnerung des Bauern. Jede Zahl ist antippbar.
- Verträge: Kisten je Sorte bis zur Kapazität, Preis in Prozent, Laufzeit 3, 7 oder 14 Tage, exklusiv; Annahmechance vor dem Abschicken. Fertiges Angebot mit einem Tipp, Editor für eigene Bedingungen, Ändern, Kündigen, Verlängern mit einem Tipp.
- Lieferungen kommen aus den Verträgen, bezahlt beim Abladen; Rückstand bei vollem Lager kostet Loyalität. Der Großhändler entfällt.
- Neun Aktionen (sauber, Druck, schmutzig) mit Kosten, Chance, Wirkung und Druck auf dem Knopf, Abklingzeit zwei Tage, Misserfolge nach Abschnitt 5.3. Eigene Höfe liefern zu Erzeugerkosten.
- Angst sinkt ohne neuen Druck, Loyalität wächst mit Verträgen, Verrat bei viel Angst und wenig Loyalität.
- Ereignisse (Hagel, Nachverhandeln, gute Ernte, Bio-Siegel) als Meldungen mit Porträt und zwei Antworten.
- Ermittlungsdruck in der Leiste oben (Folgen mit M10).
- Lagerblatt: Lieferung morgen je Sorte aus den Verträgen, Antippen einer Sorte zeigt die Höfe mit Sprung zum Hof.
- Aufträge neu: erster Vertrag, Umsatz, Lagerampel, Verstärkung, Platz, gemischte Ware, Kämpfer, erster Druck, dann die Viertel.
- Töne: Stempel beim Vertrag, eigene Klänge für gelungene und misslungene Aktionen, tiefer Klang für schmutzige Aktionen, Alarm bei Verrat.
- Spielstand Version 5 mit Migration aus Version 4.
- Tests: 77 (neu in `tests/farms.test.ts`: Annahmechance, Vorschlag, Abschluss, Lieferung, Laufzeit, Verlängern, Absage, Rückstand, alle wichtigen Aktionen, Abklingzeit, Misserfolg, Angst, Verrat, Ermittlungsdruck, Ereignisse, Speichern, Migration).

### Bot-Ergebnis M8

`npm run balance` spielt drei Strategien über 120 Tage (Laufzeit je etwa 2,5 Sekunden). Eroberungstag des Bankenviertels:

| Seed | sauber | gemischt | brutal |
|---|---|---|---|
| 1 | 19 | 22 | 26 |
| 2 | 17 | 17 | 19 |
| 3 | 18 | 18 | 19 |

Seed 1 im Detail:

| | sauber | gemischt | brutal |
|---|---|---|---|
| Bahnhofsviertel | Tag 6 | Tag 6 | Tag 6 |
| Altstadt | Tag 12 | Tag 13 | Tag 14 |
| Geld an Tag 20 | 2.176 € | 791 € | 1.728 € |
| Geld an Tag 120 | 334.812 € | 319.206 € | 534.921 € |
| Ermittlungsdruck höchstens | 0 | 19 | 51 |
| Aktionen | Vorschuss 9, Binden 5 | Schutz 6, Vorschuss 9, Abwerben 1 | Bodenproben 3, Schutz 6, Vorschuss 26 |

- Alle Korridore erfüllt: Bahnhofsviertel an Tag 2 bis 7, Bankenviertel an Tag 12 bis 30, Verkäufer ohne Ware unter 5 % der Stunden (solange Höfe und Lager mehr hergeben), sauber ohne Ermittlungsdruck, brutal wird beobachtet (ab 30).
- Brutal verdient langfristig am meisten (billigere Ware durch Angst, Schutz und gefälschte Bodenproben), bezahlt aber mit hohem Ermittlungsdruck. Weil dessen Folgen erst mit M10 kommen, scheitert brutal noch an keiner Stufe; die Zielreihenfolge aus Abschnitt 12 (gemischt am schnellsten, brutal scheitert mindestens einmal) lässt sich erst danach prüfen.
- Nach der Eroberung aller Viertel begrenzen die Höfe den Nachschub (44 Kisten am Tag ohne Gang-Höfe). Abends sind die Lager leer, die Ampel steht dann auf Rot. Laufende Kosten (M9) fehlen noch, deshalb wächst das Geld danach ungebremst.
