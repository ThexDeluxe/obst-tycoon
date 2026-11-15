# Obst-Tycoon: Spezifikation (Arbeitstitel)

Diese Datei beschreibt ein Wirtschaftsspiel für den Browser. Setze es in den Meilensteinen aus Abschnitt 14 um.

## 1. Auftrag und Arbeitsweise

- Baue ein Aufbau- und Wirtschaftsspiel für den Browser. Der Spieler leitet von einem Lagerhaus aus einen Obsthandel mit Straßenverkäufern in einer kleinen Stadt.
- Arbeite die Meilensteine der Reihe nach ab. Am Ende jedes Meilensteins ist das Spiel spielbar, die Tests sind grün, `npm run build` läuft ohne Fehler, und du machst einen Git-Commit.
- Lege zu Beginn ein Git-Repository an. Schreib außerdem eine `CLAUDE.md` mit den Projektregeln aus Abschnitt 2, damit spätere Sitzungen sie kennen.
- Wenn etwas unklar ist, triff eine sinnvolle Annahme, notiere sie mit Begründung in `DECISIONS.md` und arbeite weiter.
- Halte in `PROGRESS.md` den Stand pro Meilenstein fest.
- Wenn eine Datei `referenz.jpg` im Projektordner liegt, ist sie die Stilvorlage für die Darstellung.

## 2. Projektregeln

- UI-Texte und Code-Kommentare auf Deutsch mit echten Umlauten (ä, ö, ü, ß). Bezeichner im Code auf Englisch.
- Keine Emojis, an keiner Stelle. Symbole sind eigene SVG-Icons.
- In Texten und Kommentaren keine Gedankenstriche als Ersatz für Kommas.
- Der Ton ist nüchtern und sachlich wie in klassischen Wirtschaftssimulationen. Keine Witze, keine Comic-Effekte.
- Keine Abhängigkeiten von einem CDN. Alles kommt über npm, und der Build läuft offline.
- Alle Spielwerte stehen zentral in `src/data/balance.ts`. Nirgendwo sonst stehen Zahlen fürs Balancing.
- Das Spiel läuft nur weiter, solange gespielt wird: kein Fortschritt offline, und ein verborgener Tab pausiert das Spiel.
- Dezimalzahlen sind in dieser Datei mit Komma geschrieben, im Code sind sie normale Zahlen.

## 3. Spielidee

Der Spieler startet mit einem kleinen Lagerhaus im Wohnviertel, 1.500 € und einem Verkäufer mit Bauchladen. Er kauft Obst beim Großmarkt und lagert es, wobei es mit der Zeit verdirbt. Seine Verkäufer schickt er zu Verkaufsplätzen in fünf Vierteln, wo sie an Passanten verkaufen. Vom Gewinn baut er das Lager aus, stellt Personal ein, gibt den Verkäufern schnellere und größere Transportmittel und schaltet neue Obstsorten frei.

Zwei Gegenspieler stören das Geschäft. Die Gewerbeaufsicht setzt Verkäufer fest, die sie beim Verkaufen ohne Erlaubnis antrifft. Die Gemüsegang verteidigt ihre Reviere und nimmt Verkäufern die Ware ab. Dagegen helfen Aufklärung mit Spähern und einem Funknetz aus Walkie-Talkies, außerdem Begleitschutz, Abgaben an die Bande, Erlaubnisse und ein hoher Marktanteil.

Das Ziel ist das Stadtmonopol. Danach geht das Spiel endlos weiter. Die eigenen Leute, die Streifen, die Bande und die Passanten bewegen sich sichtbar durch die Straßen.

## 4. Technik und Architektur

**Werkzeuge:** Vite, TypeScript (strict), Three.js, Preact mit @preact/signals für die Oberfläche, idb-keyval für IndexedDB, Vitest für Tests, Playwright für die Screenshot-Prüfung, ESLint. Stell Vite auf `base: './'`, damit der Build auf jedem statischen Hoster läuft.

**Ordner:**

```
src/
  sim/       Simulation, ohne DOM- oder Three-Importe
  render/    Three.js-Szene, Modelle, Animation, Overlays
  ui/        Preact-Oberfläche
  data/      balance.ts, Karte, Texte, Namen
  save/      Speichern, Laden, Migrationen
scripts/     Balancing-Bot, Screenshot-Skript
tests/
```

**Simulation**

- Sie läuft mit 10 Ticks pro Sekunde bei 1x. Bei 2x und 4x werden pro Frame entsprechend mehr Ticks gerechnet (mit Akkumulator und einer Obergrenze pro Frame, damit sich nichts aufstaut).
- Der gesamte Spielzustand ist ein serialisierbares Datenobjekt, ohne Klasseninstanzen und ohne Verweise auf Three-Objekte. Systeme sind Funktionen, die den Zustand Tick für Tick fortschreiben.
- Sie ist deterministisch: Ein eigener Zufallsgenerator mit Seed (zum Beispiel mulberry32) erzeugt alle Zufallswerte, und sein Zustand gehört zum Spielstand.
- Eingaben wie Anwerben, Zuweisen, Bestellen oder Bauen landen als Befehle in einer Warteschlange und werden im nächsten Tick ausgeführt. Oberfläche und Balancing-Bot nutzen dieselben Befehle.
- Wegfindung per A* auf dem Raster mit Binärheap, mit getrennten Kostenkarten für Fußwege und Straßen. Häufige Wege, etwa vom Lager zu einem Verkaufsplatz, werden zwischengespeichert.

**Darstellung**

- Sie liest den Zustand der Simulation, interpoliert die Positionen zwischen zwei Ticks und rendert mit 60 fps.
- Die feste Stadtgeometrie wird pro Kartenabschnitt zusammengeführt (mergeGeometries). Wiederkehrende Objekte wie Bäume, Laternen, Kisten und Passanten sind InstancedMeshes. Ziel: weniger als 300 Draw Calls.
- Ein gerichtetes Licht wirft Schatten (Shadow Map 2048, der Schattenbereich folgt der Kamera). Schatten lassen sich in den Einstellungen abschalten. Die Pixel Ratio ist auf 2 begrenzt.
- In häufig durchlaufenen Schleifen wird kein neuer Speicher angelegt.

**Oberfläche:** Sie liest viermal pro Sekunde einen Schnappschuss des Zustands, nicht in jedem Frame.

**Leistungsziel:** 60 fps auf einem Mittelklasse-Laptop mit integrierter Grafik in 1080p, bei 300 Passanten, 40 eigenen Leuten und 20 Gegnern.

**Debug:** F3 zeigt FPS, Draw Calls, Ticks pro Sekunde und die Zahl der Entitäten. Im Entwicklungsmodus gibt es eine Konsole, um Geld und Ruf-Stufe zu setzen und in der Zeit zu springen.

## 5. Darstellung und Stil

- **Ansicht:** isometrisch mit OrthographicCamera, um 45° um die Hochachse gedreht und etwa 35° geneigt.
- **Steuerung:** Zoom in Stufen per Mausrad oder Pinch, verschieben per Ziehen, WASD oder Pfeiltasten, drehen in 90°-Schritten mit Q und E. Die Kamera bleibt innerhalb der Karte. Ein Doppelklick auf eine Person lässt die Kamera ihr folgen.
- **Stil:** Low-Poly, flach schattiert, ruhige Farben wie in der Vorlage. Graue Straßen mit weißen Markierungen, hellgraue Gehwege, Fassaden aus Backstein und Putz, Rasenflächen, Bäume aus Kegeln.
- **Modelle:** Zuerst entstehen alle Modelle prozedural aus Grundformen, gesammelt in einer Modell-Registry (`src/render/models/`). Pro Objekttyp gibt es eine Funktion, die ein Object3D liefert. Später soll die Registry auch GLB-Modelle aus CC0-Paketen laden können (KayKit, Kenney, Quaternius). Dafür liegen die Dateien unter `public/models/`, Skalierung und Versatz stehen pro Modell in einer Konfiguration, und fehlt eine Datei, wird das prozedurale Modell genutzt.
- **Lagerhaus:** aufgeschnitten wie in der Vorlage. Das Dach ist ausgeblendet, die Wände sind halbhoch, sodass Räume und Mitarbeiter sichtbar sind. Die Regale zeigen ihren Füllstand als Kistenstapel in den Farben der Produkte.
- **Figuren:** einfache Menschen aus Körper, Kopf und Beinen mit prozeduraler Laufanimation. Die Gruppen erkennt man an der Farbe: eigene Leute tragen eine grüne Weste, Späher zusätzlich ein Fernglas. Die Gewerbeaufsicht trägt Dunkelblau mit heller Warnweste, die Gemüsegang Rotbraun, Passanten gedeckte Zufallsfarben.
- **Ausrüstung und Stände** sind sichtbar: Bauchladen, Handkarren, E-Scooter mit Box, Lastenrad, Verkaufswagen. Ein aufgebauter Stand zeigt Kisten und einen Schirm. Beim Auf- und Abbau erscheint ein Fortschrittsring.
- **Overlays** zum Umschalten: Funkabdeckung, Sichtfelder, Reviere der Gang, Aufmerksamkeit pro Viertel, Nachfrage pro Verkaufsplatz.
- **Rückmeldungen:** kleine aufsteigende Umsatzzahlen beim Verkauf (abschaltbar), ein Warnsymbol über gewarnten Verkäufern und eine Markierung bei Festnahme oder Überfall.
- **Licht:** Die Stimmung folgt der Tageszeit, morgens warm, mittags neutral, abends wärmer. Ab 20 Uhr brennen die Straßenlaternen.
- **Sichtfeld:** Gegner außerhalb des eigenen Sichtfelds werden nicht gezeigt. An der letzten bekannten Position bleibt 10 Sekunden lang eine verblassende Markierung.

## 6. Spielwelt

**Karte:** von Hand gebaut, als Datendatei in `src/data/map.ts`: ein ASCII-Raster plus Listen für Verkaufsplätze, Routen und Gebiete, etwa 64 × 64 Felder. Feldtypen: Straße, Gehweg, Überweg, Platz (Pflaster), Grünfläche, Gebäude (nicht begehbar, mit Höhe und Fassadenstil) und Lagerhaus.

**Viertel** (Weglänge vom Lager in Feldern):

| Viertel | Lage | Weglänge | Verkaufsplätze | Charakter |
|---|---|---|---|---|
| Wohnviertel | rund ums Lager, Westen | 5–12 | 3 | Reihenhäuser, ruhige Straßen |
| Bahnhof | Norden | 25–32 | 4 | Bahnhofsgebäude, Vorplatz, Bushaltestellen |
| Altstadt | Mitte-Ost | 30–38 | 6 | Fußgängerzone, Platz mit Brunnen, Läden mit Markisen, Dienststelle der Gewerbeaufsicht |
| Uni | Südosten | 38–46 | 3 | Campus mit Wiese, Mensa, Hörsaalgebäude, Treffpunkt der Gemüsegang |
| Industriegebiet | Nordosten | 45–55 | 2 | Hallen, Zäune, Lkw |

- Ein Test prüft die Weglängen mit der Wegfindung.
- Verkaufsplätze liegen auf Gehwegen oder Plätzen. Jeder Platz hat einen Platzfaktor von 0,8 bis 1,2. Plätze mit Parkbucht sind für den Verkaufswagen markiert. Pro Platz stehen höchstens 2 eigene Verkäufer.
- Passanten sind sichtbare Fußgänger. Wie viele unterwegs sind, folgt der Nachfragekurve des Viertels. Sie dienen nur der Optik, denn die Verkäufe werden pro Platz statistisch berechnet. Bei jedem Verkauf bleibt ein Passant kurz am Stand stehen.
- Ein paar Autos und Busse fahren zur Optik über die Straßen.

## 7. Zeit

- 1 Spielstunde dauert bei 1x 15 Sekunden. Ein Verkaufstag geht von 06:00 bis 22:00, also 4 Minuten.
- Um 06:00 kommt die Lieferung vom Großmarkt. Um 21:30 kehren alle ins Lager zurück, und nicht verkaufte Ware wird wieder eingelagert. Um 22:00 folgt der Tagesabschluss mit Bericht, die Nacht wird übersprungen.
- Tempo: Pause, 1x, 2x, 4x (Leertaste, 1, 2, 3).
- Das Spiel beginnt an einem Montag. Am Wochenende ändert sich die Kundschaft: Uni ×0,3, Industriegebiet ×0,2, Bahnhof ×0,8, Altstadt ×1,3, Wohnviertel ×1,1.
- Alle Zeitangaben in dieser Datei sind Sekunden bei 1x und werden intern in Ticks umgerechnet.

## 8. Wirtschaft

### 8.1 Produkte

Eine Einheit ist eine Tüte oder Schale, eine Kiste fasst 20 Einheiten. Eingekauft wird immer in ganzen Kisten.

| ID | Name | Einkauf €/Einheit | Verkauf €/Einheit | Haltbar (Tage) | Gekühlt (Tage) | Freischaltung |
|---|---|---|---|---|---|---|
| apple | Äpfel | 0,70 | 1,80 | 10 | 20 | Start |
| banana | Bananen | 0,50 | 1,40 | 5 | nicht kühlbar | Start |
| grape | Trauben | 1,10 | 2,90 | 4 | 8 | Stufe 2 |
| strawberry | Erdbeeren | 1,40 | 3,90 | 2 | 4 | Stufe 2 |
| mango | Mangos | 1,60 | 4,50 | 6 | 9 | Stufe 4 und Importlizenz (3.000 €) |
| dragonfruit | Drachenfrüchte | 2,20 | 5,80 | 8 | 14 | Stufe 5 |
| pomegranate | Granatäpfel | 2,00 | 5,20 | 10 | 18 | Stufe 5 |

**Großmarkt**

- Was bis 22:00 bestellt wird, kommt am nächsten Tag um 06:00. Mit einer Laderampe gibt es eine zweite Lieferung: Bestellung bis 10:00, Lieferung um 12:00.
- Der Tagespreis ist der Grundpreis mal einem Faktor. Der Faktor ändert sich täglich um bis zu ±5 % und bleibt zwischen 0,85 und 1,15.
- Ab 10 Kisten pro Bestellung gibt es 5 % Rabatt.
- Daueraufträge (ab Stufe 2): Der Spieler legt pro Produkt einen Zielbestand fest, beim Tagesabschluss wird automatisch nachbestellt.
- Was bei der Lieferung nicht ins Lager passt, wird voll erstattet und im Bericht vermerkt. Die Bestellmaske zeigt den freien Platz an.

**Frische**

- Jede Kiste beginnt bei 100 % und sinkt gleichmäßig auf 0 % über ihre Haltbarkeit, in der Kühlung über die gekühlte Haltbarkeit. Ware, die ein Verkäufer bei sich trägt, altert normal.
- Unter 40 % Frische gibt es nur noch 60 % des Verkaufspreises. Bei 0 % ist die Ware verdorben und wird beim Tagesabschluss als Verlust entsorgt.
- Verkäufer laden die ältesten Kisten zuerst. Die Kühlplätze werden automatisch mit den kühlbaren Produkten belegt, die am schnellsten verderben.

**Preise**

- Für jedes Produkt gibt es einen Preisfaktor zwischen 0,7 und 1,3 (Standard 1,0). Die Kaufwahrscheinlichkeit wird mit (1 / Preisfaktor)^1,5 multipliziert.
- In der Altstadt zahlen die Kunden 20 % mehr: Dort gilt der 1,2-fache Preis, ohne dass die Nachfrage sinkt.

### 8.2 Verkaufsmodell

- Jeder Verkaufsplatz hat pro Stunde eine bestimmte Zahl an Kaufinteressenten. Sie ergibt sich aus der Kurve seines Viertels mal Platzfaktor mal Wochentagsfaktor. Zwischen den Stunden gehen die Werte weich ineinander über.
- In jedem Tick entstehen zufällig Kunden (Poisson-Verteilung). Jeder Kunde wählt ein Produkt, das der Verkäufer dabeihat. Die Wahl ist gewichtet nach den Vorlieben im Viertel und nach dem Preis. Er kauft mit der Wahrscheinlichkeit 0,85 × Talentfaktor × Preiseffekt, höchstens 1. Fehlt das Produkt, wählt er einmal ein anderes, sonst geht er.
- Stehen mehrere Verkäufer an einem Platz, auch ein Stand der Gang, teilen sie sich die Kundschaft gleichmäßig.
- Ein Verkäufer bleibt an seinem Platz, bis seine Ware unter 10 % der Tragkraft fällt oder es 21:30 ist. Dann geht er zum Lager, lädt in 3 Sekunden nach und kehrt zurück. Das Sortiment pro Verkäufer stellt sich entweder automatisch nach den Vorlieben im Viertel ein oder wird von Hand in Prozent festgelegt.

**Kaufinteressenten pro Stunde und Platz**

| Viertel | Spitze | Normal | Spitzenzeiten |
|---|---|---|---|
| Wohnviertel | 20 | 8 | 07–09, 17–20 |
| Bahnhof | 45 | 15 | 06–09, 16–19 |
| Altstadt | 40 | 15 | 11–18 |
| Uni | 35 | 5 | 11–15 |
| Industriegebiet | 25 | 5 | 06–08, 12–13 |

**Vorlieben (Nachfragegewicht; Exoten = Drachenfrüchte und Granatäpfel)**

| Viertel | Äpfel | Bananen | Trauben | Erdbeeren | Mangos | Exoten |
|---|---|---|---|---|---|---|
| Wohnviertel | 1,2 | 1,2 | 1,0 | 0,9 | 0,7 | 0,5 |
| Bahnhof | 1,1 | 1,4 | 0,9 | 0,8 | 0,8 | 0,6 |
| Altstadt | 0,8 | 0,7 | 1,1 | 1,5 | 1,3 | 1,4 |
| Uni | 1,3 | 1,3 | 1,0 | 0,9 | 0,6 | 0,6 |
| Industriegebiet | 1,3 | 1,4 | 0,8 | 0,6 | 0,6 | 0,4 |

### 8.3 Personal

- Jeden Tag gibt es drei neue Bewerber, die einen Tag lang verfügbar sind. Sie haben Werte von 1 bis 5 für Verkaufstalent und Wachsamkeit, meist 2 oder 3. Ihre Namen kommen aus einer Liste gängiger Vor- und Nachnamen.
- Die Anwerbung kostet 150 €. Der Lohn pro Tag beträgt 40 € + 9 € × (Talent + Wachsamkeit − 2). Entlassen geht jederzeit, der Tageslohn wird trotzdem fällig.

| Wert | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Talentfaktor | 0,8 | 0,9 | 1,0 | 1,15 | 1,3 |
| Sichtweite (Felder) | 3 | 4 | 5 | 6 | 7 |
| Reaktionszeit (s) | 2,0 | 1,5 | 1,0 | 0,7 | 0,5 |

- **Späher:** Anwerbung 100 €, 30 € pro Tag. Der Spieler setzt seinen Posten per Klick. Der Späher geht morgens dorthin und abends zurück. Er sieht 7 Felder weit, mit Fernglas (150 €, ab Stufe 3) 10 Felder.
- **Aufpasser** (ab Stufe 3): Anwerbung 150 €, 50 € pro Tag. Er begleitet einen zugewiesenen Verkäufer und sieht 4 Felder weit.
- **Personalgrenze** durch das Büro: Stufe I 3 Personen, Stufe II 6 (1.000 €), Stufe III 10 (3.000 €, ab Ruf-Stufe 2), Stufe IV 16 (8.000 €, ab Ruf-Stufe 4).
- Jeder Verkäufer hat kostenlos einen Bauchladen. Gekaufte Ausrüstung und Walkie-Talkies kommen ins Inventar und werden von dort Personen zugewiesen.

### 8.4 Ausrüstung

| Ausrüstung | Tragkraft | Tempo (Felder/s) | Auf- und Abbau (s) | Auffälligkeit | Preis | Unterhalt pro Tag | Wege | Stufe |
|---|---|---|---|---|---|---|---|---|
| Bauchladen | 20 | 1,5 | 2 | 1 | kostenlos | 0 | Gehweg | 1 |
| Handkarren | 60 | 1,2 | 6 | 2 | 300 € | 0 | Gehweg | 1 |
| E-Scooter mit Box | 35 | 3,5 | 3 | 2 | 800 € | 5 € | Gehweg, Straße | 2 |
| Lastenrad | 120 | 2,6 | 5 | 3 | 2.000 € | 5 € | Gehweg, Straße | 3 |
| Verkaufswagen | 400 | 5,0 | 12 | 5 | 12.000 € | 30 € | Straße, nur Plätze mit Parkbucht | 4 |

### 8.5 Lager und Ausbau

- Das Lagerhaus besteht aus Bauabschnitten mit je 4 Raumplätzen. Abschnitt 1 ist von Anfang an da. Abschnitt 2 kostet 4.000 € (ab Stufe 2), Abschnitt 3 kostet 12.000 € (ab Stufe 3), Abschnitt 4 kostet 35.000 € (ab Stufe 4). Mit jedem Abschnitt wird das Gebäude sichtbar größer.
- **Räume:**
  - Regalreihe: 10 Kisten, 400 €
  - Kühlzelle: 8 gekühlte Kisten, 2.500 €, 15 € Strom pro Tag, ab Stufe 2
  - Laderampe: 1.200 €, ab Stufe 2, nur einmal
  - Funkzentrale: 1.500 €, ab Stufe 2, nur einmal
  - Büro: belegt einen Platz, Ausbaustufen siehe 8.3
- Gebaut wird per Klick auf einen freien Raumplatz. Ein Bau dauert 1 Spielstunde, in der eine Baustelle zu sehen ist. Ein Abriss erstattet 50 %.
- Das Lager kostet 20 € pro Tag, plus 15 € für jeden weiteren Bauabschnitt.
- Zum Start besteht Abschnitt 1 aus Büro I und einer Regalreihe. Es gibt also 2 freie Plätze und Platz für 10 Kisten.

### 8.6 Ruf-Stufen

| Stufe | Gesamtumsatz | Freischaltungen |
|---|---|---|
| 1 | Start | Äpfel, Bananen, Bauchladen, Handkarren, Walkie-Talkie, Späher, Regalreihe, Büro II |
| 2 | 2.500 € | Trauben, Erdbeeren, E-Scooter, Kühlzelle, Laderampe, Funkzentrale, Daueraufträge, Bauabschnitt 2, Büro III |
| 3 | 12.000 € | Lastenrad, Funkmast, Fernglas, Aufpasser, Sondernutzungserlaubnis, Bauabschnitt 3 |
| 4 | 40.000 € | Mangos mit Importlizenz, Verkaufswagen, Bauabschnitt 4, Büro IV |
| 5 | 120.000 € | Drachenfrüchte, Granatäpfel |

### 8.7 Konto

- Startkapital 1.500 €. Startbestand: 4 Kisten Äpfel und 3 Kisten Bananen, frisch und kostenlos. Dazu ein Verkäufer mit Talent 2 und Wachsamkeit 2.
- Abgerechnet wird nach Einnahmen und Ausgaben. Löhne und laufende Kosten werden beim Tagesabschluss gebucht, Einkäufe, Anwerbungen, Käufe und Bauten sofort.
- Der Kontostand darf bis −1.000 € fallen (Dispo, 1 % Zinsen pro Tag). Darunter sind keine Einkäufe, Anwerbungen oder Bauten möglich. Liegt der Kontostand an drei Tagesabschlüssen in Folge unter −1.000 €, ist das Spiel verloren (Insolvenz).

## 9. Gegenspieler und Aufklärung

### 9.1 Sichtfeld

- Der Spieler sieht alle Gegner, die irgendeine seiner Personen sieht. Sichtweiten: Verkäufer je nach Wachsamkeit, Späher 7 (mit Fernglas 10), Aufpasser 4, Lagerhaus 5.
- Ein Verkäufer reagiert dagegen nur auf das, was er selbst sieht oder über seine Funkgruppe erfährt.
- In Version 1 hängt die Sicht nur vom Radius ab, Gebäude verdecken nichts.

### 9.2 Funknetz

- **Walkie-Talkie:** 60 € pro Gerät, ein Gerät pro Person. Zwei Geräte erreichen sich direkt bis 8 Felder.
- **Funkzentrale im Lager:** Sie verbindet alle Geräte im Umkreis von 15 Feldern um das Lager.
- **Funkmast** (ab Stufe 3): 1.200 € plus 15 € pro Tag. Er wird auf ein Gebäudedach gesetzt und hat einen Radius von 12 Feldern. Stationen verbinden sich miteinander, wenn sich ihre Radien überschneiden.
- Das Netz wird mehrmals pro Sekunde per Union-Find über alle Geräte und Stationen berechnet.
- Sieht ein Mitglied einen Gegner, bekommen alle Mitglieder derselben verbundenen Gruppe sofort eine Warnung mit Gegnertyp, Position und Laufrichtung.

### 9.3 Verhalten der Verkäufer bei Gefahr

Pro Verkäufer einstellbar:

- **Vorsichtig:** baut bei jeder Warnung vor einem Gegner im Umkreis von 15 Feldern sofort ab.
- **Normal:** baut ab, wenn ein Gegner 8 Felder oder näher ist oder auf den Platz zuläuft.
- **Riskant:** baut erst ab, wenn er den Gegner selbst sieht.

Nach dem Abbau:

- Bei einer Streife geht der Verkäufer etwa 3 Felder zur Seite (Seitenstraße, Hauseingang). Er wartet, bis die Streife mehr als 10 Felder entfernt ist, und baut dann wieder auf.
- Bei der Gang flieht er Richtung Lager oder zum nächsten Aufpasser, solange ein Bandenmitglied 8 Felder oder näher ist.
- Jede Reaktion setzt erst nach der Reaktionszeit des Verkäufers ein.
- Der Spieler kann jedem Verkäufer jederzeit befehlen, abzubauen, den Platz zu wechseln oder ins Lager zurückzukehren.

### 9.4 Gewerbeaufsicht

- Zweierteams starten an der Dienststelle in der Altstadt. Ziele, die weiter als 20 Felder entfernt sind, erreichen sie mit einem Dienstwagen. Dann laufen sie ihren Streifenweg ab. Pro Viertel gibt es in den Kartendaten 2 bis 3 Rundwege, von denen einer zufällig gewählt wird. Zu Fuß sind die Teams mit 1,3 Feldern pro Sekunde unterwegs.
- **Streifengänge pro Tag:** Wohnviertel 1, Bahnhof 4, Altstadt 4, Uni 1, Industriegebiet 0,5 (also jeden zweiten Tag einer). Sie beginnen zu zufälligen Zeiten zwischen 07:00 und 20:00.
- **Erkennen:** Eine Streife erkennt einen Verkäufer auf 3 Felder plus die Auffälligkeit seiner Ausrüstung. Hat er seinen Stand aufgebaut oder baut er gerade auf oder ab, geht sie direkt auf ihn zu.
- **Festnahme:** Kommt die Streife auf 1 Feld heran, während der Stand steht oder auf- oder abgebaut wird, ist der Verkäufer festgenommen. Ist der Abbau vorher fertig, kann sie ihm nichts nachweisen und geht weiter.
- **Folgen einer Festnahme:** 200 € Bußgeld, dazu je 100 € für jede weitere Festnahme im selben Viertel innerhalb von 7 Tagen. Die Ware, die der Verkäufer trägt, wird beschlagnahmt. Er fällt für den Rest des Tages aus, die Ausrüstung kommt zurück ins Lager.
- Auf lizenzierten Plätzen (9.7) prüft die Streife kurz und geht weiter, ohne Folgen.

**Aufmerksamkeit** pro Viertel (0 bis 100):

- +1 je 100 € Umsatz im Viertel
- +0,2 × Auffälligkeit je Verkäufer und Spielstunde mit aufgebautem Stand
- +5, wenn eine Streife nichts nachweisen konnte, +15 bei einer Festnahme
- −12 bei jedem Tagesabschluss
- Ab 50 gibt es doppelt so viele Streifengänge. Ab 80 folgt am nächsten Tag eine Razzia: drei Teams sind 2 Spielstunden lang gleichzeitig im Viertel.
- War am Vortag ein Späher im Viertel postiert, kündigt der Tagesbericht die Razzia vorher als Gerücht mit Zeitfenster an.

### 9.5 Gemüsegang

- **Reviere** (in den Kartendaten): die ganze Uni, der südliche Teil des Industriegebiets und der Ostteil des Bahnhofs mit einem Verkaufsplatz. Das Overlay zeigt sie in Rotbraun.
- Die Bande betreibt in jedem Revier einen eigenen Gemüsestand an einem Verkaufsplatz. Er zählt wie ein Verkäufer mit Talent 3 und teilt sich dort die Kundschaft.
- **Bandenmitglieder** laufen zufällig durch ihr Revier. Es sind 2, plus 1 je 15 % eigenem Marktanteil im Viertel, höchstens 6. Sie sind mit 1,6 Feldern pro Sekunde unterwegs und sehen 5 Felder weit.
- Sieht ein Mitglied einen eigenen Verkäufer im Revier oder bis 3 Felder davor, verfolgt es ihn bis zu 12 Felder weit. Holt es ihn ein, ist seine Ware weg, und er fällt 2 Spielstunden aus, weil er ins Lager zurückkehrt. Ein Bußgeld gibt es nicht.
- Steht ein Aufpasser höchstens 3 Felder neben dem Verkäufer, dreht die Bande ab.

**Gegenmittel**

- **Revierabgabe:** 150 € pro Woche und Revier, jederzeit kündbar. Solange gezahlt wird, greift die Bande dort nicht an, verkauft aber weiter.
- **Verdrängung:** Liegt der eigene Marktanteil im Viertel des Reviers 5 Tage in Folge über 60 %, gibt die Bande das Revier auf. Fällt er danach 3 Tage in Folge unter 30 %, kommt sie zurück.

### 9.6 Marktanteil

- Marktanteil eines Viertels = eigener Tagesumsatz ÷ (eigener Tagesumsatz + Umsatz der Konkurrenz).
- Zur Konkurrenz gehören feste andere Händler und die Stände der Gang. Die festen Händler setzen pro Tag um: Wohnviertel 250 €, Bahnhof 900 €, Altstadt 1.200 €, Uni 200 €, Industriegebiet 150 €. Diese Werte steigen um 2 % pro Woche und folgen denselben Wochentagsfaktoren wie die Kundschaft.

### 9.7 Sondernutzungserlaubnis (ab Stufe 3)

- Sie kostet pro Viertel 2.500 € plus 20 € pro Tag und macht 2 Verkaufsplätze dieses Viertels zu lizenzierten Plätzen, die sichtbar markiert sind. Dort kann die Gewerbeaufsicht nichts ausrichten. Für die Gang ändert sich nichts.

## 10. Ziel und Spielende

- **Stadtmonopol:** In allen fünf Vierteln 7 Tage in Folge mindestens 50 % Marktanteil, und die Gemüsegang hat alle Reviere aufgegeben.
- Ein Ziel-Panel zeigt pro Viertel den Marktanteil, die laufende Serie und den Stand der Reviere.
- Ist das Ziel erreicht, erscheint ein Abschlussbildschirm mit Statistik (Spieltage, Gesamtumsatz, Festnahmen, Überfälle, verdorbene Ware). Danach geht das Spiel endlos weiter.
- Niederlage: Insolvenz (8.7). Danach wird angeboten, einen Spielstand zu laden.

## 11. Oberfläche

- **Stil:** helle, klare Panels mit dezenten Schatten und einer gut lesbaren serifenlosen Schrift, lokal mitgeliefert (zum Beispiel Inter). Die Farben haben eine feste Bedeutung: Grün für die eigene Firma, Dunkelblau für die Behörde, Rotbraun für die Gang, Rot für Gefahr.
- **Obere Leiste:** Kontostand, Gewinn heute, Wochentag, Datum und Uhrzeit, Ruf-Stufe mit Fortschrittsbalken, Tempo-Schalter.
- **Hauptmenü** mit Reitern: Personal, Großmarkt, Lager und Bau, Ausrüstung, Viertel, Ziel, Berichte, Einstellungen.
- **Auswahl:** Ein Klick auf eine Person zeigt ihre Werte, Ausrüstung, Ware, ihren Status und ihr Verhalten bei Gefahr. Einen Platz weist man ihr per Klick auf einen Verkaufsplatz zu. Ein Klick auf einen Verkaufsplatz zeigt seine Nachfragekurve, die Verkäufer dort und ob er lizenziert ist.
- **Meldungen** zu Festnahmen, Überfällen, Warnungen, Lieferungen und Freischaltungen. Ein Klick auf eine Meldung fährt die Kamera zum Ort.
- **Tagesbericht** als Fenster:
  - Einnahmen und Ausgaben nach Posten (Einkauf, Löhne, laufende Kosten, Bußgelder, Investitionen) und Saldo
  - Wert der verdorbenen Ware
  - Umsatz, Marktanteil und Aufmerksamkeit pro Viertel
  - Verkäufe pro Verkäufer
  - Ereignisse und Gerüchte
  - Umsatzverlauf der letzten 14 Tage
- Tooltips mit genauen Zahlen, Tastenkürzel für die Reiter.
- **Einführung** (abschaltbar) in kurzen, sachlichen Schritten für die ersten Tage: Ware bestellen, Verkäufer zuweisen, zweiten Verkäufer anwerben, Späher und Walkie-Talkies einsetzen.
- Gedacht für den Desktop ab 1280 × 720 mit Maus. Die Grundbedienung funktioniert auch per Touch (Ziehen, Pinch, Tippen), auf Tablets im Querformat ist das Spiel spielbar.
- **Einstellungen:** Schatten, Grafikqualität, Umsatzzahlen ein oder aus, Autosave-Intervall, Einführung zurücksetzen.

## 12. Speichern

- IndexedDB über idb-keyval: drei Speicherplätze plus ein Autosave.
- Automatisch gespeichert wird alle 60 Sekunden Echtzeit, beim Tagesabschluss sowie bei `visibilitychange` (hidden) und `pagehide`.
- Format: JSON mit Versionsnummer und einer Migrationsfunktion pro Version. Gespeichert wird der vollständige Zustand der Simulation, einschließlich Zufallsgenerator.
- Spielstände lassen sich als .json-Datei exportieren und importieren. Eine fehlerhafte Datei führt zu einer Meldung, nicht zu einem Absturz.
- Hauptmenü: Neues Spiel, Fortsetzen, Laden, Löschen, Importieren.

## 13. Tests und Prüfungen

- **Vitest** für die Simulation:
  - Verkaufsmodell, Verderb und Kühlung
  - Funknetz
  - Regeln für Festnahmen, mit rechtzeitigem und zu spätem Abbau
  - Verfolgung durch die Gang und Schutz durch den Aufpasser
  - Marktanteil und Verdrängung
  - Wegfindung und Weglängen
  - Speichern und Laden (der Zustand nach dem Laden ist identisch)
  - Migrationen
- **Balancing-Bot** (`npm run balance`, ab M2 laufend gepflegt): Er spielt 60 Spieltage ohne Darstellung mit einer einfachen Standardstrategie und nutzt dieselben Befehle wie die Oberfläche. Pro Tag gibt er Kontostand, Umsatz, Personal, Stufe und Marktanteile aus. Ein Durchlauf dauert weniger als 20 Sekunden. Zielkorridore:
  - kein Kontostand unter 0 in den ersten 10 Tagen
  - Stufe 2 an Tag 4–6, Stufe 3 an Tag 9–13, Stufe 4 an Tag 16–22, Stufe 5 an Tag 26–40
  - Stadtmonopol frühestens an Tag 40

  Verfehlt der Bot einen Korridor, passe `balance.ts` an und begründe die Änderung in `DECISIONS.md`.
- **Screenshots** (`npm run shots`): Playwright startet das Spiel, lässt einige Spielminuten im Schnelldurchlauf laufen und speichert Screenshots der Übersicht, des Lagerhauses und einer Straßenszene. Starte Chromium dafür mit Software-WebGL (`--use-angle=swiftshader --enable-unsafe-swiftshader`). Sieh dir die Bilder an und verbessere die Darstellung, bis sie der Vorlage nahekommt.
- TypeScript strict und ESLint laufen ohne Fehler.

## 14. Meilensteine

1. **M1 Grundgerüst:** Projekt, Karte, Stadt aus Grundformen, Kamera, Zeit mit Tempo-Stufen, Passanten, Grundgerüst fürs Speichern, F3-Anzeige.
2. **M2 Wirtschaft:** Großmarkt, Lager mit Kisten und Verderb, Verkäufer anwerben und zuweisen, Laufwege, Verkaufsmodell, Tagesbericht, Balancing-Bot. Am Ende ist das Spiel über mehrere Tage ohne Gegner spielbar.
3. **M3 Gewerbeaufsicht und Aufklärung:** Sichtfeld, Streifen, Auf- und Abbau, Festnahmen, Späher, Walkie-Talkies, Funknetz, Verhalten bei Gefahr, Aufmerksamkeit, Razzien.
4. **M4 Ausbau:** Ruf-Stufen, alle Produkte und Ausrüstungen, Bauabschnitte und Räume, Funkzentrale und Funkmasten, Daueraufträge, Preisfaktoren, Sondernutzungserlaubnis.
5. **M5 Gemüsegang und Ziel:** Reviere, Stände der Gang, Verfolgung, Aufpasser, Revierabgabe, Verdrängung, Marktanteil, Stadtmonopol, Insolvenz.
6. **M6 Feinschliff:** Einführung, Overlays, Lichtstimmung, Rückmeldungen, Touch, Leistung, Prüfung per Screenshots, Balancing nach den Ergebnissen des Bots, README mit Anleitung zum Starten und Bauen.

## 15. Nicht in Version 1

Obstbecher mit eigenem Schneideraum, ein zweites Lager, Jahreszeiten und Wetter, Sound und Musik, GLB-Modelle aus CC0-Paketen (die Registry ist darauf vorbereitet), weitere Städte.
