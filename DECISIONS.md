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
