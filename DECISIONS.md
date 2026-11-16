# Entscheidungen und Annahmen

Hier stehen Annahmen zu Punkten, die in der SPEC offen sind, jeweils mit Begründung.

## M1

- **Kartenmaßstab und Weglängen:** Die Weglänge wird mit der Fußwegfindung (8 Nachbarn, diagonale Schritte zählen √2, keine abgeschnittenen Ecken) vom Lagertor bis zum Verkaufsplatz gemessen. Grünflächen sind begehbar, kosten aber das 1,6-fache, damit Wege bevorzugt über Gehwege führen. Fahrbahnen sind für Fußgänger nur über Überwege passierbar.
- **Lage der Viertel:** Damit die vorgegebenen Weglängen passen, liegt der genutzte Teil der Stadt kompakt um das Lager. Die östlichen Ränder von Altstadt, Uni und Industriegebiet sind Kulisse ohne Verkaufsplätze.
- **Lagergrundstück:** 12 × 8 Felder für vier Bauabschnitte zu je 6 × 4 Feldern mit je vier Raumplätzen (3 × 2 Felder). Abschnitt 1 liegt am Tor. Nicht gebaute Abschnitte sind als Erweiterungsfläche markiert.
- **Passanten und Verkehr:** Sie gehören zum Spielstand, nutzen aber einen eigenen Zufallsstrom (`ambientRng`). So bleibt die Wirtschaft identisch, auch wenn der Balancing-Bot die Optik abschaltet. Passanten gehen ein Zufallsmuster über Gehwege, Plätze und Überwege; nur Kunden, die zum Stand gehen, nutzen die Wegfindung.
- **Zahl der Passanten:** Je Viertel ein Anteil an höchstens 300 Passanten, skaliert mit der Nachfragekurve des Viertels (mindestens 18 % auch außerhalb der Spitzenzeit, damit die Stadt nie leer wirkt).
- **Nacht:** Um 22:00 hält die Simulation im Tagesabschluss an, bis der Spieler den nächsten Tag startet. Bestellungen in diesem Fenster gelten noch als vor 22:00 aufgegeben.
- **Weiche Stundenübergänge:** Die Nachfrage wechselt in einem Fenster von einer halben Stunde um jede Stundengrenze (Smoothstep). Der Mittelwert über den Übergang bleibt dabei erhalten.
- **Kamera auf dem Handy:** Q und E gibt es dort nicht, daher Knöpfe zum Drehen und Zoomen unten rechts. Pinch zoomt in denselben Stufen wie das Mausrad. Ein Vollbild-Knopf versucht zusätzlich, das Querformat zu sperren (Android).
- **Grafikqualität:** Auf Touch-Geräten ist die Pixel Ratio standardmäßig auf 1,5 begrenzt (Einstellung „Mittel“), auf dem Desktop auf 2. Die Obergrenze 2 aus der SPEC bleibt bestehen.
- **Hauptmenü:** Hinter dem Hauptmenü läuft eine Demo-Stadt, die nie gespeichert wird.

## M2

- **Produktwahl der Kunden:** Ein Kunde wählt aus allen freigeschalteten Produkten, gewichtet nach den Vorlieben im Viertel und dem Preiseffekt. Hat der Verkäufer das Produkt nicht dabei, wählt er genau einmal neu; fehlt es wieder, geht er ohne Kauf. So lohnt sich ein breites Sortiment, wie es der zweite Satz der SPEC nahelegt.
- **Aufteilung der Kundschaft:** Jeder Kunde geht zufällig gleichverteilt zu einem der Verkäufer am Platz. Im Mittel teilen sich alle die Kundschaft gleichmäßig.
- **Nachladen:** Ein Verkäufer behält beim Nachladen tagsüber seine Restware und füllt nur bis zur Tragkraft auf. Erst um 21:30 (spätestens 22:00) wird alles wieder eingelagert. Das verhindert viele angebrochene Kisten.
- **Rücklagerung:** Zurückgebrachte Ware füllt zuerst angebrochene Kisten desselben Produkts auf (Frische als gewichteter Mittelwert), danach neue Kisten. Findet sie keinen Platz, geht sie verloren und wird nicht erstattet (kommt praktisch nur nach Abriss eines Regals vor).
- **Kühlung:** Die Zuteilung der Kühlplätze wird bei jeder Änderung des Bestands neu berechnet: kühlbare Ware mit der kürzesten Haltbarkeit zuerst, innerhalb eines Produkts die ältesten Kisten. Kühlbare Ware darf auf Regale ausweichen, Bananen nie in die Kühlung.
- **Wert verdorbener Ware:** Einheiten mal Grundpreis im Einkauf (Einkaufswert), unabhängig vom tatsächlich gezahlten Tagespreis.
- **Bauen nach Feierabend:** Die Nacht wird übersprungen, also werden Bauten, die beim Tagesabschluss noch laufen oder danach begonnen werden, über Nacht fertig. So kann man abends ein Regal bauen und die größere Lieferung schon am nächsten Morgen einlagern.
- **Bestellen im Tagesabschluss:** Der Tagesbericht lässt sich ausblenden. Bis „Tag beginnen“ gelten Bestellungen als vor 22:00 aufgegeben und kommen um 06:00.
- **Buchungen:** Anwerbungen, Ausrüstung und Bauten zählen im Bericht als Investitionen. Dispozinsen (1 % des negativen Kontostands beim Tagesabschluss) zählen zu den laufenden Kosten.
- **Ausrüstung wechseln:** Nur im Lager. Beim Wechsel wird die getragene Ware eingelagert.
- **Ruf-Stufen schon in M2:** Die Stufe ergibt sich aus dem Gesamtumsatz und wird bereits angezeigt, weil sie bestimmt, welche Produkte, Räume und Geräte verfügbar sind. Das Datenmodell für Räume, Bauabschnitte, Büro und Ausrüstung ist allgemein angelegt und schon nutzbar. Aus M4 fehlen noch Daueraufträge, Preisfaktoren in der Oberfläche, Importlizenz, Funkmast, Sondernutzungserlaubnis und die Wirkung der Funkzentrale (M3).
- **Platzfaktoren in balance.ts:** Nach der Regel „alle Spielwerte zentral“ stehen die Platzfaktoren nicht in `map.ts`, sondern als `SPOT_FACTORS` in `balance.ts`. Die Karte enthält nur Lage und Parkbucht.
- **Bewerber:** Werte 1 bis 5 mit den Wahrscheinlichkeiten 10, 35, 35, 14 und 6 Prozent („meist 2 oder 3“).
- **Bedienung auf dem Handy:** Zuweisen geht auf zwei Wegen: Person antippen, „Platz zuweisen“, Platz antippen (alle Plätze pulsieren farbig: grün frei, gelb ein Verkäufer, rot voll), oder Platz antippen und in der Platzkarte einen Verkäufer wählen.
- **Stand:** Beim Verkaufen schaut der Verkäufer nach Süden, der Stand mit Kisten und Schirm steht vor ihm. Der Fortschrittsring liegt beim Auf- und Abbau am Boden um den Stand.
- **Aufmerksamkeit im Bericht:** Die Spalte ist vorhanden und zeigt bis M3 den Wert 0.

### Balancing M2

- Der Balancing-Bot (`npm run balance`) hat mit den Platzfaktoren aus der ersten Fassung (Wohnviertel 1,0 / 0,9 / 1,1) Stufe 2 erst an Tag 7 erreicht. Am Anfang begrenzen Startbestand, ein Regal und drei Verkäufer mit Bauchladen den Umsatz; das Wohnviertel ist wegen der kurzen Wege dann der beste Ort. Die Platzfaktoren im Wohnviertel wurden auf 1,2 / 1,1 / 1,15 angehoben (weiter im Bereich 0,8 bis 1,2). Damit erreicht der Bot Stufe 2 bei sechs geprüften Seeds an Tag 6, ohne in den ersten zehn Tagen unter 0 € zu fallen.
- Die Korridore für Stufe 3 bis 5 und das Stadtmonopol hängen von Inhalten aus M3 bis M5 ab (weitere Produkte, Kühlung, schnellere Geräte, Gegner). Der Bot meldet sie bis dahin als „offen“.

## Neuausrichtung (Version 2 der Spezifikation)

Auf Wunsch des Auftraggebers ist das Spiel deutlich einfacher geworden. Die frühere Spezifikation liegt in `docs/SPEC-v1.md`, die neue in `SPEC.md`. Annahmen dazu:

- **Was entfällt:** Frische und Verderb, Löhne, Tagespreise, Bestellung mit Lieferzeit, Tagesbericht als Fenster, Ruf-Stufen, Gewerbeaufsicht, Personalwerte und Bewerber. Sie machten die Oberfläche voll und den Einstieg schwer.
- **Kistenweise:** Kauf mit einem Tippen, die Kiste steht sofort im Regal. Ein Knopf „+N“ füllt das Lager mit der gewählten Sorte, soweit Geld und Platz reichen.
- **Verkäufer wählen selbst:** Bewertung je Platz = Kundschaft der aktuellen Stunde mal Preisniveau, geteilt durch (Belegung + 1) und durch (1 + Weg / 70 Felder). Gewählt wird beim Beladen; ein Verkäufer bleibt bis die Ware verkauft ist.
- **Wertvollste Sorte zuerst:** So lohnt sich teures Obst sofort, ohne dass der Spieler ein Sortiment einstellen muss.
- **Regale per Plus:** Es wird immer nur der nächste freie Regalplatz mit Plus und Preis angezeigt (vorn am Tor zuerst), damit die Halle nicht voller Symbole ist. Freie Plätze sind am Boden gestrichelt markiert.
- **Größere Stadt:** 96 × 96 Felder statt 64 × 64, Lagerhalle 16 × 13 Felder statt 12 × 8, Gebäude höher (Kaufhäuser 5 bis 8 Geschosse, Hochhäuser bis 22). Das Lager wirkt dadurch geräumig und die Proportionen zur Stadt stimmen.
- **Storyline:** Start im Untergrund-Viertel mit U-Bahn-Eingang und Garagen, Ziel Bankenviertel. Die Reihenfolge ergibt sich aus Nachbarschaften und Gangstärke, der Spieler kann zwischen Szeneviertel und Einkaufsmeile wählen.
- **Rote Gebiete:** halbtransparenter roter Schleier über Boden und Flachdächern plus Grenzlinie; nach der Eroberung blendet er in etwa anderthalb Sekunden aus.
- **Würfelduell:** Regeln wie bei klassischen Eroberungs-Brettspielen (drei gegen zwei Würfel, Gleichstand für den Verteidiger), aber ohne Namen oder Gestaltung eines bestimmten Spiels. Angegriffen wird immer mit allen Kämpfern aus dem Hof, das hält die Entscheidung einfach. Die Siegchance wird exakt berechnet und angezeigt.
- **Gang erholt sich:** 1 bis 2 Kämpfer pro Tag, damit man ein Viertel nicht risikolos über Wochen zermürben kann.
- **Kein Verlieren:** Ohne Löhne und laufende Kosten kann man nicht pleitegehen. Fehlinvestitionen (verlorene Kämpfe) kosten nur Zeit.
- **Zeit:** Während des Würfelduells steht die Simulation still. Um 22:00 beginnt sofort der nächste Tag.
- **Spielstände:** Version 3. Stände aus M1 und M2 werden umgewandelt: Tag, Geld (mindestens Startkapital) und Zahl der Verkäufer bleiben, alles andere startet neu.

### Balancing Version 2

- Erste Werte (Preisniveau Bankenviertel 2,5, Drachenfrucht 6 € je Stück, Gang Bankenviertel 20) ließen den Bot das Bankenviertel schon an Tag 10 erobern; danach explodierten die Einnahmen. Angepasst: Preisniveau 1,0 / 1,15 / 1,3 / 1,4 / 1,6 / 2,0, Stückpreise 1,00 bis 3,60 €, Gangstärken 4 / 10 / 16 / 24 / 40, Kämpferpreis +3 € je vorhandenem Kämpfer. Ergebnis: Bahnhofsviertel Tag 3, Altstadt Tag 8, Bankenviertel Tag 22 (Bot mit vorsichtiger Strategie; Spieler mit Schnelldurchlauf brauchen deutlich weniger Echtzeit).

## M7 Lager (Version 3 der Spezifikation)

- **Lieferant bis M8:** Bis die Höfe kommen, liefert ein Großhändler über Daueraufträge (Kisten pro Tag je Sorte, Qualität 2 Sterne, Grundpreis). Die Sorten bleiben bis dahin an die Eroberungen gebunden. Mit M8 ersetzen Verträge mit Höfen den Großhändler.
- **Bezahlung und Rückstand:** Bezahlt wird je Kiste beim Abladen. Fehlt Platz, bleibt der Rest beim Lieferanten und kommt am nächsten Morgen zuerst, höchstens aber eine Tageslieferung, damit sich bei zu großen Aufträgen kein endloser Rückstand aufbaut. Fehlt Geld, nimmt der Fahrer den Rest wieder mit.
- **Reichweite mit Lieferungen:** Die Reichweite rechnet den Bestand mit dem Verkauf der letzten drei Tage und zählt die bestellten Lieferungen der nächsten drei Morgen mit. Sonst stünde die Ampel jeden Abend vor der Morgenlieferung auf Gelb oder Rot, obwohl die Aufträge passen. Die Ampel zeigt also, ob Bestand und Lieferungen den Verkauf decken.
- **Verkauf hochrechnen:** War eine Sorte nur einen Teil des Tages vorrätig, wird ihr Tagesverkauf auf einen ganzen Tag mit Ware hochgerechnet (mindestens ein Viertel des Tages als Basis). Ein Ausverkauf am Mittag zählt so nicht als geringe Nachfrage. Die Hochrechnung des laufenden Tages beginnt erst nach vier Stunden mit Ware, sonst schlagen Stoßzeiten zu stark durch.
- **Sättigung als Menge:** „Nur noch zu einem Viertel der Menge“ ist als Kaufbereitschaft umgesetzt: bis zum Tagesbedarf voll, danach 25 %, und bis zum Anderthalbfachen des Bedarfs sinkt sie auf null. Eine reine Rate von 25 % hätte bei vielen Verkäufern kaum gebremst, weil genug Kundschaft vorbeikommt. Verkäufer packen ein, wenn sich ihre Ware im Viertel heute gar nicht mehr verkauft, und gehen woandershin.
- **Sortiment-Test:** Verglichen wird ein volles Lager im späten ersten Akt (alle Viertel, 12 Verkäufer, 60 Kisten pro Tag) mit nur Drachenfrüchten gegen eine Mischung, die die wertvollsten Sorten bis zu ihrem Tagesbedarf nimmt. Ergebnis: nur Drachenfrucht bringt 36 % weniger Gewinn.
- **Vertriebsqualität:** Mit der Wahrscheinlichkeit der Vertriebsqualität wählt ein Verkäufer die beste Kombination aus Sorte und Platz (Kundschaft, Preis, Aufpreis, Sättigung, Weg, Frische), sonst eine zufällige, die überhaupt noch etwas bringt. Ware, die bald verdirbt, bekommt Vorrang. Der Wert bleibt bei 70 %, bis das Hauptquartier (M11) ihn erhöht.
- **Kühlraum schon jetzt:** Der Kühlraum lässt sich im Blatt „Bauen“ für 600 € kaufen. Er steht als Raum in der Halle und fasst 12 Kisten. In M11 wird er Teil der Etagen.
- **Kiosk:** höchstens 3 Kisten pro Tag zum doppelten Grundpreis, sofort im Lager, nur für freigeschaltete Sorten.
- **Ausgaben im Tagessaldo:** Alle Käufe (Lieferungen, Kiosk, Leute, Bauten, Ausrüstung) zählen als Ausgaben des Tages.
- **Auftragsleiste bleibt:** Die Leiste oben zeigt zusätzlich zum Inhalt aus Abschnitt 11.1 den aktuellen Auftrag, weil er die Einführung trägt. Ermittlungsdruck folgt mit M10.
- **Ton:** Alle Töne entstehen per Synthese mit der Web Audio API, es gibt keine Tondateien. Die Simulation meldet Ereignisse (Verkauf, Lieferwagen, Abladen, Bauten) über die Ausgabe eines Ticks, die Spielsteuerung spielt die Töne. Der Ton startet beim ersten Tippen und verstummt bei Pause und verborgenem Tab. Während eines Würfelduells bleibt er an, obwohl die Zeit steht.
- **Spielstand Version 4:** Stände aus Version 3 behalten Fortschritt, Geld, Viertel und Leute. Kisten gelten als frisch, die Aufträge beginnen von vorn und erledigte werden sofort nachgeholt.
