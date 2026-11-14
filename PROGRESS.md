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
