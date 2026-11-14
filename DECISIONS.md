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
