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
