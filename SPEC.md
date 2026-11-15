# Obst-Tycoon: Spezifikation (Version 3, Obstmafia)

Diese Fassung baut auf dem bestehenden Spiel auf (Commit `8c930c4`, beschrieben in `docs/SPEC-v2.md`). Die Stadt, die Kisten, die selbstständigen Verkäufer, die Straßenkämpfer und das Würfelduell bleiben erhalten. Neu hinzu kommen der Nachschub über Bauern, Lieferungen statt Sofortkauf, laufende Kosten, Rückeroberungen, Ermittler, ein Hauptquartier, das in die Höhe wächst, und fünf Akte vom Straßenstand bis zum Weltkonzern.

Für Technik, Architektur und Projektregeln gelten weiter `CLAUDE.md` und `docs/SPEC-v1.md`. Wo diese Fassung etwas anderes sagt, gilt diese.

## 1. Problem der jetzigen Fassung

- Nach etwa 10 Minuten ist alles erobert.
- Es lohnt sich nur, die teuerste Sorte zu kaufen.
- Das Lager wird per Antippen sofort gefüllt, deshalb gibt es nichts zu planen.
- Erobertes bleibt für immer, und nichts kostet laufend Geld. Es gibt kein Risiko und keine Strategie.
- Nach dem Bankenviertel gibt es kein Wachstum mehr.

## 2. Leitlinien

- **Handy zuerst:** Gespielt wird im Querformat ab 844 × 390. Jede Entscheidung braucht höchstens zwei Tipps. Nichts muss auf kleine Flächen in der Welt gezogen oder genau platziert werden.
- **Keine Einzelsteuerung:** Entscheidungen gelten für das ganze Geschäft, ein ganzes Viertel oder einen ganzen Hof, nie für einzelne Personen. Verkäufer, Kämpfer und Fahrer arbeiten selbstständig. Gekaufte Ausrüstung gilt automatisch für alle.
- **Ton:** eine augenzwinkernde Obstmafia-Geschichte mit wiederkehrenden Figuren, Deals und Verrat. Die Texte sind trocken und knapp, nicht albern. Keine Emojis, keine Gedankenstriche als Kommaersatz, echte Umlaute. Gewalt wird nur angedeutet (Kämpfer „überzeugen“, Lkw „verschwinden“), nie gezeigt.
- **Drei Fronten, die sich gegenseitig beeinflussen:** Bauern (Nachschub), Gang (Gebiet), Ermittler (Risiko). Wer eine Front vernachlässigt, bekommt es an einer anderen zu spüren.
- **Jede Zahl ist antippbar** und erklärt in einem Satz, woher sie kommt.

## 3. Kernschleife

Höfe liefern Kisten → Lager (Reichweite, Verderb) → Verkäufer verteilen selbstständig auf die Viertel → Umsatz → Verträge, Leute, Etagen, Eroberungen → größere Karte im nächsten Akt.

Der Spieler entscheidet vor allem drei Dinge: mit welchen Höfen er zu welchen Bedingungen arbeitet, welche Viertel er erobert und verteidigt, und wie weit er dabei die Ermittler reizt.

## 4. Lager und Lieferungen

### 4.1 Lieferungen statt Sofortkauf

- Ware kommt nur noch über Lieferungen: aus Verträgen mit Höfen (Abschnitt 5) jeden Morgen um 06:00, später zusätzlich mittags (Laderampe).
- Sofort kaufen geht nur noch am Kiosk um die Ecke: höchstens 3 Kisten pro Tag zum doppelten Grundpreis. Das ist eine Notlösung, kein Weg zum Wachsen.
- Der Lieferwagen ist in der Welt zu sehen. Er fährt vor, lädt ab, und die Kisten erscheinen nach und nach in den Regalen.
- Fehlt Lagerplatz, bleibt der Rest auf dem Hof und kommt mit der nächsten Lieferung. Der Hof wird dabei unzufrieden (Loyalität −2).

### 4.2 Reichweite und Lagerampel

- Für jede Sorte rechnet das Spiel aus dem Verkauf der letzten drei Tage aus, wie lange der Bestand reicht, in Stunden oder Tagen.
- Oben in der Leiste steht immer die Lagerampel: die kürzeste Reichweite aller Sorten. Grün ab 1,5 Tagen, gelb ab 0,5 Tagen, darunter rot.
- Wird eine Sorte vor 22:00 ausgehen, erscheint auf der Karte ein Hinweis mit Uhrzeit, etwa „Erdbeeren reichen bis 17 Uhr“. Antippen öffnet das Lagerblatt.

### 4.3 Verderb und Kühlung

| Sorte | Haltbar (Tage) | Gekühlt (Tage) |
|---|---|---|
| Äpfel | 8 | 16 |
| Bananen | 4 | nicht kühlbar |
| Erdbeeren | 2 | 4 |
| Trauben | 3 | 6 |
| Mangos | 5 | 8 |
| Drachenfrüchte | 6 | 10 |

- Unter 40 % Frische gibt es nur noch 60 % des Preises. Bei 0 % ist die Ware verdorben und wird beim Tagesabschluss entsorgt.
- Verkäufer nehmen immer die ältesten Kisten zuerst. Die Kühlung wird automatisch mit den verderblichsten Sorten belegt.

### 4.4 Sättigung

- Jedes Viertel kauft pro Tag nur eine begrenzte Menge je Sorte (Tagesbedarf). Er hängt von den Vorlieben des Viertels ab. Das Bahnhofsviertel will Bananen und Äpfel, das Bankenviertel Exoten, das Szeneviertel Trauben und Erdbeeren.
- Ist der Tagesbedarf einer Sorte erreicht, verkauft sie sich in diesem Viertel nur noch zu einem Viertel der Menge.
- Sorten, von denen ein Viertel heute noch wenig bekommen hat, bringen einen Aufpreis von bis zu 1,6×.
- Folge: Ein gemischtes Sortiment bringt deutlich mehr als nur die teuerste Sorte. Der Balancing-Bot muss das belegen (Abschnitt 12).

### 4.5 Vertriebsqualität

- Die Verkäufer entscheiden selbst, welche Sorten sie mitnehmen und wohin sie gehen. Wie gut sie das machen, bestimmt ein einziger Wert, die Vertriebsqualität.
- Bei 70 % nehmen sie grob das Richtige mit und schicken auch mal Erdbeeren in ein Viertel, das schon satt ist. Bei 95 % verteilen sie fast optimal nach Bedarf, Aufpreis und Frische.
- Die Vertriebsqualität steigt nur durch Ausbau: Vertriebsleiter, später Planungsabteilung und Rechenzentrum im Hauptquartier (Abschnitt 9).

### 4.6 Lagerblatt

Eine Zeile pro Sorte mit:

- Bestand als Balken
- Reichweite in der Farbe der Ampel
- erwarteter Lieferung morgen
- einem kurzen Hinweis, etwa „Altstadt sucht, Bahnhof satt“

Darunter stehen Belegung und Kühlung. Antippen einer Sorte zeigt, welche Höfe sie liefern, und springt auf Wunsch zum Hof.

## 5. Bauern

### 5.1 Umlandkarte

- Ein eigener Kartenreiter zeigt das Umland mit Höfen als Symbole, verbunden mit der Stadt über Straßen. Im ersten Akt sind es 6 Höfe, mit jedem Akt kommen mehr dazu (Abschnitt 10).
- Jeder Hof liefert eine oder zwei Sorten und hat diese Werte:
  - **Kapazität:** Kisten pro Tag
  - **Grundpreis:** Preis pro Kiste
  - **Qualität:** 1 bis 3 Sterne, wirkt auf Haltbarkeit und Verkaufspreis um ±10 % je Stern
  - **Loyalität:** 0 bis 100
  - **Angst:** 0 bis 100
  - **Besitzer:** frei, Gang oder du
- Jeder Hof hat einen Bauern mit Namen und einer Eigenschaft, etwa stur, ängstlich, gierig oder ehrlich. Die Eigenschaft verändert die Erfolgschancen der Aktionen.

### 5.2 Verträge

- Ein Vertrag legt fest: Kisten pro Tag (bis zur Kapazität), Preis in Prozent vom Grundpreis, Laufzeit (3, 7 oder 14 Tage) und ob er exklusiv ist.
- Er läuft danach von allein. Die Lieferung kommt jeden Morgen, bezahlt wird bei Lieferung.
- Läuft ein Vertrag aus, erscheint eine Meldung. Verlängern ist ein Tipp, zu den letzten Bedingungen, wenn Loyalität und Angst es zulassen.
- **Exklusiv** heißt: Der Hof liefert an niemanden sonst. Exklusive Höfe fehlen der Gang (Abschnitt 6.4). Exklusivität kostet +20 % auf den Preis oder entsprechend Angst.
- Der Bauer nimmt einen Vertrag an, wenn Preis, Loyalität und Angst zusammen über seiner Schwelle liegen. Das Vertragsblatt zeigt die Annahmechance vor dem Abschicken.

### 5.3 Aktionen

Jeder Hof ist eine Karte mit drei bis fünf Aktionsknöpfen. Jeder Knopf zeigt Kosten, Erfolgschance und Wirkung, bevor man tippt. Jede Aktion hat pro Hof eine Abklingzeit von 2 Tagen.

| Art | Aktion | Kosten | Wirkung bei Erfolg | Druck |
|---|---|---|---|---|
| Sauber | Vorschuss zahlen | 3 Tageslieferungen | Loyalität +20 | 0 |
| Sauber | Langfristig binden | Vertrag über 14 Tage | Loyalität +10, Preis fest | 0 |
| Sauber | Erntehelfer stellen | 2 eigene Leute für 3 Tage | Kapazität +30 % | 0 |
| Druck | Schutz anbieten | 2 Kämpfer bleiben dort | Angst +25, Preis −15 % | +3 |
| Druck | Abnahme verweigern | 2 Tage keine Lieferung | Angst +15, Bauer verliert Geld | +1 |
| Druck | Helfer abwerben | 150 € | Kapazität des Hofs für Rivalen −50 % | +4 |
| Schmutzig | Bodenproben fälschen | 400 € | Hof verliert Zulassung und kann nur noch an dich verkaufen, Preis −30 % | +12 |
| Schmutzig | Tipp ans Lebensmittelamt | 200 € | Gang-Hof wird 5 Tage geschlossen | +8 |
| Schmutzig | Hof übernehmen | 4.000 € plus Angst über 70 | Hof gehört dir, Preis = Erzeugerkosten | +15 |

- Misslingt eine Aktion, fallen die Kosten trotzdem an. Schmutzige Aktionen erzeugen dann doppelten Druck, und die Loyalität sinkt um 20.
- **Angst** senkt sofort die Preise, sinkt aber um 5 pro Tag, wenn kein Druck nachkommt.
- **Loyalität** steigt langsam und sinkt langsam.
- Ein Bauer mit Angst über 60 und Loyalität unter 20 kann jeden Tag mit 10 % Chance überlaufen (zur Gang) oder aussagen (Ermittlungsdruck +25).

### 5.4 Ereignisse

Etwa alle 2 Tage passiert an einem Hof etwas, als kurze Meldung mit zwei Antworten:

- Hagel: Kapazität 3 Tage halbiert. Aushelfen (Loyalität +15) oder Vertragsstrafe fordern (Angst +10).
- Der Bauer will nachverhandeln, weil die Gang mehr bietet.
- Gute Ernte: 50 % mehr Kisten zum halben Preis, wenn das Lager Platz hat.
- Bio-Siegel: Qualität +1 Stern, aber der Bauer will 15 % mehr.

## 6. Gang und Gebiete

### 6.1 Kontrolle

- Jedes eroberte Viertel hat einen Kontrollwert von 0 bis 100. Nach der Eroberung steht er bei 60.
- Er steigt um 5 pro Tag je 2 stationierte Kämpfer, bis 100. Ohne Kämpfer sinkt er um 5 pro Tag.
- Bei Kontrolle unter 30 ist das Viertel umkämpft. Die Verkäufer verdienen dort 30 % weniger, und die Gang kann angreifen.

### 6.2 Stationieren

- Die Kämpfer verteilen sich selbst. Der Spieler stellt pro Viertel nur eine Stufe ein: keine, leicht (2), normal (4) oder stark (8). Die übrigen Kämpfer bleiben im Hof und stehen für Angriffe bereit.
- Kämpfer kosten Lohn (Abschnitt 7).

### 6.3 Gegenangriffe

- Die Gang hat eigenes Geld: Umsatz aus ihren Vierteln und Höfen. Davon wirbt sie Kämpfer an.
- Etwa alle 3 Tage greift sie das eigene Viertel mit der niedrigsten Verteidigung an. Gekämpft wird im bekannten Würfelduell, mit den stationierten Kämpfern plus allen aus dem Hof, die du schickst.
- Eine Warnung erscheint 2 Spielstunden vorher.
- Verlierst du, fällt das Viertel zurück an die Gang. Seine Verkaufsplätze sind dann weg, deine Verkäufer dort weichen aus.

### 6.4 Lieferkette als Waffe

- Jeder exklusive Hof, der vorher die Gang beliefert hat, senkt ihr Einkommen. Hat die Gang keine Ware mehr, stehen ihre Stände leer, und sie verliert jeden Tag 10 % ihrer Kämpfer.
- Umgekehrt überfällt die Gang deine Lieferwagen. Etwa einmal pro Woche verschwindet eine Lieferung, wenn die Route durch umkämpftes Gebiet führt. Begleitschutz (1 Kämpfer pro Wagen, automatisch, ab Etage „Fuhrpark“) verhindert das.
- Die Gang wirbt deine Bauern ab, wenn deren Loyalität unter 30 liegt.

### 6.5 Rivalen in späteren Akten

- Akt 2: Gemüsegang (wie bisher)
- Akt 3: Nussmafia (kämpft mit Geld: überbietet Verträge, kauft Höfe)
- Akt 4: FreshCorp (ein Großkonzern, kämpft mit Anwälten und Preiskampf)
- Akt 5: Kartelle in Häfen und Anbauländern

Jeder Rivale hat ein eigenes Verhalten, damit sich die Akte unterschiedlich spielen.

## 7. Kosten und Pleite

- **Löhne pro Tag:** Verkäufer 15 €, Kämpfer 8 €, Fahrer 20 €. Spezialisten (Anwalt, Steuerberater, Vertriebsleiter) siehe Abschnitt 9.
- **Miete und Unterhalt:** 20 € pro Tag für die Halle, dazu die Kosten jeder Etage.
- Alles wird beim Tagesabschluss gebucht. Die Tagesmeldung zeigt Einnahmen, Ausgaben und Saldo.
- Der Kontostand darf bis −500 € fallen, im zweiten Akt bis −5.000 € und so weiter mit dem Faktor 10 pro Akt. Bleibt er drei Tagesabschlüsse lang darunter, übernimmt die Gang dein Geschäft und das Spiel ist verloren. Danach wird angeboten, einen Spielstand zu laden.

## 8. Ermittler

### 8.1 Ermittlungsdruck

Ein Wert von 0 bis 100, sichtbar als Symbol oben in der Leiste.

- Er steigt durch Druck- und schmutzige Aktionen (Tabelle 5.3), durch verlorene oder gewonnene Würfelduelle (+2) und durch Bauern, die aussagen (+25).
- Er sinkt um 3 pro Tag ohne neuen Druck.

| Stufe | Ab | Folge |
|---|---|---|
| Beobachtet | 30 | Hinweis in der Leiste. Schmutzige Aktionen haben 10 % weniger Erfolg. |
| Ermittlungen | 60 | Jeden Tag 20 % Chance auf eine Lagerkontrolle: 2 Tage keine Lieferungen, verdächtige Ware beschlagnahmt. |
| Anklage | 85 | Konten 3 Tage eingefroren (keine Ausgaben möglich), eine Etage geschlossen. |
| Zugriff | 100 | Der Spieler verliert die Hälfte seines Geldes und alle Höfe mit Angst über 50. Der Druck fällt auf 40. |

### 8.2 Gegenmittel

- **Anwalt** (Etage „Kanzlei“): Druck sinkt 3 pro Tag schneller. Aussagen bringen nur +10.
- **Steuerberater** (Etage „Buchhaltung“): Die Stufe „Anklage“ beginnt erst bei 95.
- **Strohfirma** (ab Akt 3): Ein Hof, der der Strohfirma gehört, erzeugt keinen Druck.
- **Saubere Phase:** Wer 5 Tage keine Druck- und schmutzigen Aktionen nutzt, bekommt einmalig −15.

## 9. Hauptquartier

Die Lagerhalle wächst Etage für Etage in die Höhe. Am Ende steht ein Hochhaus, die saubere Fassade des Konzerns. Gebaut wird über das schwebende Plus an der nächsten freien Etage, wie heute bei den Regalen. Jede Etage hat Baukosten und laufende Kosten und schaltet etwas frei. Die genauen Preise legt das Balancing fest. Als Richtwert steigen die Kosten von Akt zu Akt um den Faktor 10.

| Etage | Akt | Wirkung |
|---|---|---|
| Regale (mehrere) | 1 | +6 Kisten Platz je Regal |
| Kühlraum | 1 | 12 gekühlte Kisten |
| Hinterzimmer | 1 | Druck-Aktionen bei Bauern, Kämpfer anwerben |
| Laderampe | 2 | zweite Lieferung mittags |
| Vertriebsleiter | 2 | Vertriebsqualität 80 % |
| Kanzlei | 2 | Anwalt |
| Fuhrpark | 2 | eigene Lieferwagen mit Begleitschutz, Höfe weiter weg erreichbar |
| Buchhaltung | 3 | Steuerberater, Strohfirmen |
| Planungsabteilung | 3 | Vertriebsqualität 88 % |
| Verteilzentrum | 3 | beliefert Filialen in anderen Städten |
| Saftfabrik | 4 | verwandelt Ware unter 50 % Frische in Saft (doppelter Wert, 20 Tage haltbar) |
| Rechenzentrum | 4 | Vertriebsqualität 95 %, Reichweite pro Stadt |
| Börsenparkett | 4 | Aktien von Rivalen kaufen, feindliche Übernahmen |
| Reederei | 5 | Kühlschiffe aus Übersee |
| Dachterrasse | 5 | Prestige: Abschlussbild und Statistik |

## 10. Akte

Jeder Akt zoomt die Karte heraus und verzehnfacht die Zahlen: Kisten werden zu Paletten, Paletten zu Lkw-Ladungen, Lkw-Ladungen zu Containern. Was im vorigen Akt erarbeitet wurde, läuft automatisch weiter und liefert ein festes Einkommen. Gespielt wird immer die neue Ebene.

| Akt | Karte | Einheit | Neue Mechanik | Ziel zum Abschluss |
|---|---|---|---|---|
| 1 Straße | 6 Viertel deiner Stadt | Kiste | Höfe, Verträge, Druck, Kontrolle | alle 6 Viertel 3 Tage lang über 60 Kontrolle |
| 2 Stadt | ganze Stadt mit Vororten | Palette | eigene Läden statt Stände, Fuhrpark, Laderampe | Gemüsegang besiegt, 10 Läden |
| 3 Region | Niedersachsen mit Städten als Knoten | Lkw-Ladung | Filialstädte, Lkw-Routen, Strohfirmen, Nussmafia | 5 Städte beliefert |
| 4 Land | Deutschland | Zugladung | Supermarktketten als Großkunden, Saftfabrik, Börse, FreshCorp | 50 % Marktanteil in Deutschland |
| 5 Welt | Weltkarte | Container | Plantagen in Anbauländern, Kühlschiffe, Häfen, Kartelle | Obstimperium: 3 Kontinente |

- Ab Akt 2 bestehen die Viertel und Städte der vorigen Akte als Kacheln mit einem Wert für Einkommen und Kontrolle weiter. Sie werden nicht mehr im Detail gespielt, können aber angegriffen werden und brauchen weiter Kämpfer.
- In jedem Akt gibt es eine Umlandkarte mit passenden Lieferanten: Höfe, dann Großerzeuger, Anbaugenossenschaften, Importeure und Plantagen. Das System aus Abschnitt 5 bleibt gleich, nur die Größenordnung wächst.
- Nach Akt 5 läuft das Spiel endlos weiter. Ziel ist dann der Weltmarktanteil.
- Jeder Akt endet mit einem Zwischenbild: kurze Geschichte, Statistik, was neu freigeschaltet wird.
- Die Darstellung in Akt 1 bleibt die 3D-Stadt. Ab Akt 3 ist die Karte eine vereinfachte Übersicht mit Knoten und Routen. Das Hochhaus bleibt in jedem Akt in einer eigenen Ansicht sichtbar.

## 11. Oberfläche

### 11.1 Leiste oben

Kontostand, Datum und Uhrzeit, Lagerampel, Ermittlungsdruck, Tempo, Zahnrad.

### 11.2 Fünf Knöpfe unten

- **Lager:** Lagerblatt (4.6)
- **Höfe:** Umlandkarte mit Hof-Karten (5.1 bis 5.3)
- **Leute:** anwerben von Verkäufern, Kämpfern, Fahrern und Spezialisten, jeweils nur als Anzahl
- **Bauen:** Etagen des Hauptquartiers
- **Akt:** Ziel des aktuellen Akts mit Fortschritt und die laufenden Aufträge

### 11.3 Weitere Bedienung

- **Antippen eines Viertels** auf der Karte öffnet das Viertelblatt nur für Macht: Kontrolle, Stärke der Gang, Stationierungsstufe, Angriff. Ein Sortiment gibt es dort nicht.
- **Blätter** fahren von unten hoch und bedecken höchstens zwei Drittel des Bildschirms, damit die Welt sichtbar bleibt. Schließen geht durch Wischen nach unten oder Tippen auf die Karte.
- **Meldungen** erscheinen als kurze Karten am Rand: Vertrag läuft aus, Hof-Ereignis, Gegenangriff droht, Lieferung überfallen. Jede Meldung hat höchstens zwei Antwortknöpfe. Antippen springt zum Ort.
- **Figuren:** Bauern, der Gang-Boss, der Ermittler und dein Anwalt tauchen in Meldungen mit Namen und einem gezeichneten Porträt auf (eigene SVG, kein Emoji). Sie erinnern sich an frühere Entscheidungen, zum Beispiel „Bauer Henning hat die gefälschten Bodenproben nicht vergessen“.
- **Einführung:** Die bestehenden Aufträge werden umgeschrieben, sodass sie die neuen Systeme nacheinander einführen. Zuerst ein Vertrag, dann die Lagerampel, dann der erste Druck auf einen Bauern, dann die erste Verteidigung.

### 11.4 Toneffekte

- **Technik:** Web Audio API über ein eigenes kleines Modul `src/audio/`, ohne externe Bibliothek. Töne entstehen entweder per Synthese im Code oder stammen aus CC0-Paketen (zum Beispiel Kenney Audio), die im Repository liegen. Kein Laden aus dem Netz. Das Modul hört nur auf Ereignisse aus der Simulation und importiert nichts aus `src/sim/`, das umgekehrt etwas von ihm wüsste.
- **Am Handy:** Der Ton startet erst nach dem ersten Tipp (Vorgabe der Browser). Verlässt man die App oder pausiert das Spiel, verstummt alles sofort.
- **Einstellungen:** Effekte und Umgebung getrennt regelbar, dazu ein Stummschalter direkt in der oberen Leiste. Die Wahl wird gespeichert.
- **Dosierung:** Häufige Töne sind leise und kurz und werden gebündelt. Bei vielen Verkäufen gleichzeitig klingt höchstens ein Kassenton pro halbe Sekunde. Bei 4x werden Umgebungsgeräusche leiser und seltene Töne bleiben normal.
- **Ereignisse und Töne:**

| Ereignis | Ton |
|---|---|
| Verkauf | leises Kassenklingeln |
| Lieferwagen kommt an | Motor, Bremse, Kisten werden abgestellt |
| Lagerampel springt auf Rot | kurzer, tiefer Warnton |
| Antippen von Knöpfen, Blätter öffnen und schließen | dezentes Klicken und Wischen |
| Etage oder Regal gebaut | Hämmern, dann ein kurzer Abschlussklang |
| Vertrag abgeschlossen | Stempel auf Papier |
| Aktion bei einem Bauern gelungen oder misslungen | zwei unterschiedliche kurze Klänge |
| Schmutzige Aktion | gedämpfter, tiefer Klang |
| Würfelduell | Würfelrollen, eigener Klang für gewonnene und verlorene Runde |
| Viertel erobert oder verloren | kurze Fanfare oder dumpfer Abschluss |
| Gegenangriff droht, Lieferung überfallen | Alarmton |
| Ermittlungsdruck steigt eine Stufe | Sirene in der Ferne |
| Akt abgeschlossen | längere Erfolgsmelodie |
| Umgebung | leiser Stadtlärm, der der Tageszeit und der Zahl der Passanten folgt, nachts Grillen |

## 12. Balancing und Prüfungen

- Der Balancing-Bot wird auf die neuen Systeme erweitert und spielt drei Strategien, jeweils über 120 Spieltage:
  - **sauber:** nur saubere Aktionen
  - **gemischt**
  - **brutal:** Druck und schmutzige Aktionen, wo möglich
- **Zielkorridore** bei 1x:
  - Akt 1 dauert 60 bis 90 Minuten (etwa 15 bis 22 Spieltage).
  - Akt 2 dauert 2 bis 3 Stunden.
  - Kein Akt ist ohne Verteidigung schaffbar.
- **Strategien:** Alle drei Strategien schaffen Akt 1. „Brutal“ ist in den ersten Tagen schneller, scheitert aber mindestens einmal an einer Stufe des Ermittlungsdrucks. „Sauber“ ist langsamer, aber stabiler. „Gemischt“ ist am schnellsten.
- **Sortiment:** Ein Lager nur mit der teuersten Sorte bringt mindestens 30 % weniger Gewinn als ein gemischtes. Dafür gibt es einen eigenen Test.
- **Leerlauf:** Ohne Eingriff ist das Lager nach spätestens 2 Tagen leer, wenn kein Vertrag läuft. Mit Verträgen hält es, solange die Verträge laufen. Der Spieler muss also regelmäßig verlängern und nachjustieren, aber nicht ständig tippen.
- **Speicherstand:** neue Version mit Migration. Alte Spielstände dürfen in einen Neustart mit kleinem Startbonus umgewandelt werden, wenn eine echte Migration zu aufwendig ist. Notiere das in `DECISIONS.md`.

## 13. Meilensteine

1. **M7 Lager:** Lieferungen statt Sofortkauf, Kiosk als Notlösung, Verderb und Kühlung, Reichweite, Lagerampel, Lagerblatt, Sättigung, Vertriebsqualität. Dazu das Tonmodul mit Einstellungen und den Tönen für Verkauf, Lieferung, Lagerampel und Bedienung.
2. **M8 Bauern:** Umlandkarte, Hof-Karten, Verträge, Aktionen, Ereignisse, Figuren.
3. **M9 Kosten und Gebiete:** Löhne und Miete, Pleite, Kontrolle, Stationierungsstufen, Gegenangriffe, Lieferkette als Waffe.
4. **M10 Ermittler:** Ermittlungsdruck, Stufen, Gegenmittel.
5. **M11 Hauptquartier:** Etagen von Akt 1 und 2 als Hochhaus-Ansicht.
6. **M12 Akt 2:** herausgezoomte Stadt, Läden, Fuhrpark, Übergang zwischen den Akten, Abschlussbild.
7. **M13 Akte 3 bis 5:** Knotenkarte, weitere Rivalen, restliche Etagen, Endlosspiel.

Jeder weitere Meilenstein bringt die Töne für seine eigenen Ereignisse mit.

Nach jedem Meilenstein: Tests grün, Build und Lint ohne Fehler, Bot-Ergebnis in `PROGRESS.md`, Commit, GitHub Pages aktualisiert. Nach M8 anhalten und auf Rückmeldung warten, weil Lager und Bauern zusammen das neue Herzstück sind.
