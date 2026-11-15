// Karte der Großstadt: ASCII-Raster (96 × 96) plus Listen für Viertel, Verkaufsplätze, Lager und Routen.
// x wächst nach Osten, y nach Süden. Ein Zeichen entspricht einem Feld.
//
// Feldtypen:
//   #  Straße            .  Gehweg           =  Überweg
//   :  Platz (Pflaster)  ,  Grünfläche       W  Lagergrundstück (Halle und Hof)
// Gebäude (nicht begehbar). Groß- und Kleinbuchstaben trennen benachbarte Gebäude:
//   B b  Backstein       P p  Putz           L l  Laden mit Markise
//   D d  Kaufhaus/Büro   X x  Hochhaus       Y    höchstes Hochhaus mit Hubschrauberlandeplatz
//   S    Hauptbahnhof    K    Kirche         H h  Halle
//   G g  Garagen         U u  Hochschule     E    U-Bahn-Eingang
//   F    Brunnen         T    Baum           |    Gleise
//   Q    Wartehäuschen   V    Pavillon       Z    Zaun
import type { DistrictId } from './balance';

export const MAP_ROWS: readonly string[] = [
  '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||', // 0
  '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||', // 1
  '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||', // 2
  '.##.BBB||||||||||||||||||||||PPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 3
  '.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 4
  '.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 5
  '.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 6
  '.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 7
  '.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.', // 8
  '.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##::T:::T:::T:::T:::T:::T:::T::.##.:T:::T:::T:::T:::T:::T:##.', // 9
  '.##.T::::::::::::::::::::::::::::T.##:::::::::::::::::::::::::::::.##.:::::::::::::::::::::::##.', // 10
  '.##.::::::::::::::::::::::::::::::.##:::::::::::::::::::::::::::::.==.:::::::::::::::::::::::##.', // 11
  '.##.::::::::::::::::::::::::::::::.##=#######=############=#######=##=########=#########=###=##.', // 12
  '.##.::::::::::::::::::::::::::::::.##=#######=############=#######=##=########=#########=###=##.', // 13
  '.##.::::::::T:::::::::::::T:::::::.##:::::::::::::::::::::::::::::.==.:::::::::::::::::::::::##.', // 14
  '.##.::::::::::::::::::::::::::::::.==:::::::::::::::::::::::::::::.##.:::::::::::::::::::::::##.', // 15
  '.##.::::::::::::::::::::::::::::::.##::T:::T:::T:::T:::T:::T:::T::.##.:T:::T:::T:::T:::T:::T:##.', // 16
  '.##.::::::::::::::::::::::::::::::.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 17
  '.##.T::::Q::::::::::Q:::::::::Q::T.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 18
  '.==................................##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 19
  '=##=######=#############=#########=##.DDDDDDDdddddddDDDDDDDddddddd.==.DDDDDDDdddddddDDDDDDDd.##.', // 20
  '=##=######=#############=#########=##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 21
  '.==................................##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 22
  '.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 23
  '.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 24
  '.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.', // 25
  '.==................................==..............................==........................==.', // 26
  '=##=###########=############=#####=##=############=###############=##=##########=###########=##=', // 27
  '=##=###########=############=#####=##=############=###############=##=##########=###########=##=', // 28
  '.==................................==..............................==........................==.', // 29
  '.##.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.##.BBBBBBB::::::::::::PPPPPPPPP.##.::::::::::T:::::::::::.##.', // 30
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.', // 31
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.', // 32
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.', // 33
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX:T::xxxxxxxx::.##.', // 34
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.', // 35
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.', // 36
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWW,T,,,.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.', // 37
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.==.BBBBBBB::::::::::::PPPPPPPPP.==.::::::::::::xxxxxxxx::.##.', // 38
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.', // 39
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLLT::::::::::::TLLLLLLL.##.:DDDDDD::T::::::::::::.##.', // 40
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLL::::::::::::::LLLLLLL.##.:DDDDDD:::::::::::::::.##.', // 41
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.lllllll::::::::::::::lllllll.##.:DDDDDD:::::::::::::T:.##.', // 42
  '.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.lllllll::::::::::::::lllllll.##.:DDDDDD:::::::::::::::.##.', // 43
  '.==................................##.lllllll:::::FFFF:::::lllllll.##........................##.', // 44
  '=##=########=#############=#######=##.LLLLLLL:::::FFFF:::::LLLLLLL.##=########=#######=#####=##.', // 45
  '=##=########=#############=#######=##.::::::::::::FFFF::::::::::::.##=########=#######=#####=##.', // 46
  '.==................................==.::::::::::::FFFF::::::::::::.==........................##.', // 47
  '.##.BBBBBBBBT::::::::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.', // 48
  '.##.BBBBBBBB:::::::::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.:T:::T:::T:::T:::T:::T.##.', // 49
  '.##.BBBBBBBB:::EEE:::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.', // 50
  '.##.BBBBBBBB:::EEE:::HHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.', // 51
  '.##.bbbbbbbb:::::::::HHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.', // 52
  '.##.bbbbbbbb::::::::THHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.', // 53
  '.##.bbbbbbbb,,,,,,,,,HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.:::::::::::::YYYYYYYY:.##.', // 54
  '.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPPT::::::::::::TPPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.', // 55
  '.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPP::::::::::::::PPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.', // 56
  '.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.==.PPPPPPPLLLLllllLLLLllPPPPPPP.==.::XXXXXXX::::YYYYYYYY:.##.', // 57
  '.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPPLLLLllllLLLLllPPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.', // 58
  '.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.', // 59
  '.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.', // 60
  '.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.', // 61
  '.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::::::::::::::::::::::.##.', // 62
  '.==................................==..............................==........................==.', // 63
  '=##=########=#####################=##=####=###############=#######=##=##########=###########=##=', // 64
  '=##=########=#####################=##=####=###############=#######=##=##########=###########=##=', // 65
  '.==................................==.............==...............==........................==.', // 66
  '.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.::::::::::::::::::::::.##.', // 67
  '.##.BBBBbbbbBBBBbbbb,,T,,,,,,,,,::,,,T,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx::T::XXXXXXXX:.##.', // 68
  '.##.BBBBbbbbBBBBbbbb,,,,,,,VVV,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 69
  '.##.BBBBbbbbBBBBbbbb,,,,,,,VVV,,::,,,,,,,,T,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 70
  '.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 71
  '.##.BBBBbbbbBBBBbbbb::::::::::::::::::::::::::lll.==.UUUUUUUuuuuuu.==.:xxxxxxx:T:::XXXXXXXX:.##.', // 72
  '.##.BBBBbbbbBBBBbbbb::::::::::::::::::::::::::lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 73
  '.##.BBBBbbbbBBBBbbbb,,,,,T,,,,,,::,,,,,,T,,,,,lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 74
  '.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,T,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 75
  '.##.BBBBbbbbBBBBbbbb,,,T,,,,,,,,::,,,,T,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.', // 76
  '.##.BBBBbbbbBBBBbbbb,,,,,,,,,T,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.::::::::::T::XXXXXXXX:.##.', // 77
  '.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,LLL.##.:::::::::::::.##.::::::::::::::::::::::.##.', // 78
  '.==................................==.............==...............==........................==.', // 79
  '=##=######################=#######=##=###########=##=#######=#####=##=##########=###########=##=', // 80
  '=##=######################=#######=##=###########=##=#######=#####=##=##########=###########=##=', // 81
  '.==................................==.............==...............==........................==.', // 82
  '.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 83
  '.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 84
  '.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 85
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.==.DDDDDDDdddddddDDDDDDDd.##.', // 86
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 87
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 88
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 89
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 90
  '.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.', // 91
  '.==................................==.............==...............==........................==.', // 92
  '=##############################################################################################=', // 93
  '=##############################################################################################=', // 94
  '.==................................==..............................==........................==.', // 95
];

export interface DistrictArea {
  id: DistrictId;
  /** Rechtecke [x0, y0, x1, y1] einschließlich; spätere überschreiben frühere */
  rects: [number, number, number, number][];
}

export const DISTRICT_AREAS: DistrictArea[] = [
  { id: 'underground', rects: [[0, 27, 34, 64]] },
  { id: 'station', rects: [[0, 0, 34, 26]] },
  { id: 'oldtown', rects: [[35, 27, 66, 64]] },
  { id: 'shopping', rects: [[35, 0, 95, 26]] },
  { id: 'banking', rects: [[67, 27, 95, 95]] },
  { id: 'scene', rects: [[0, 65, 66, 95]] },
];

/** Benachbarte Viertel: angreifen kann man nur ein Nachbarviertel eines eigenen Viertels */
export const DISTRICT_LINKS: [DistrictId, DistrictId][] = [
  ['underground', 'station'],
  ['underground', 'oldtown'],
  ['underground', 'scene'],
  ['station', 'oldtown'],
  ['station', 'shopping'],
  ['oldtown', 'shopping'],
  ['oldtown', 'banking'],
  ['oldtown', 'scene'],
  ['shopping', 'banking'],
  ['scene', 'banking'],
];

/** Ankerpunkt für das Schild über jedem Viertel */
export const DISTRICT_LABELS: Record<DistrictId, [number, number]> = {
  underground: [17, 54],
  station: [18, 14],
  oldtown: [51, 42],
  shopping: [60, 14],
  banking: [80, 50],
  scene: [33, 72],
};

export interface SpotData {
  id: string;
  name: string;
  x: number;
  y: number;
  district: DistrictId;
}

export const SPOTS: SpotData[] = [
  { id: 'u-1', name: 'Lagerstraße', x: 24, y: 44, district: 'underground' },
  { id: 'u-2', name: 'U-Bahn-Platz', x: 16, y: 52, district: 'underground' },
  { id: 'u-3', name: 'Garagenhof', x: 34, y: 40, district: 'underground' },
  { id: 'b-1', name: 'Bahnhofsvorplatz West', x: 9, y: 12, district: 'station' },
  { id: 'b-2', name: 'Busbahnhof', x: 18, y: 16, district: 'station' },
  { id: 'b-3', name: 'Haupteingang', x: 26, y: 12, district: 'station' },
  { id: 'b-4', name: 'Bahnhofsvorplatz Ost', x: 31, y: 16, district: 'station' },
  { id: 'a-1', name: 'Marktplatz Nord', x: 48, y: 41, district: 'oldtown' },
  { id: 'a-2', name: 'Am Brunnen', x: 55, y: 50, district: 'oldtown' },
  { id: 'a-3', name: 'Ladenpassage West', x: 41, y: 47, district: 'oldtown' },
  { id: 'a-4', name: 'Ladenpassage Ost', x: 61, y: 47, district: 'oldtown' },
  { id: 'a-5', name: 'Kirchplatz', x: 50, y: 38, district: 'oldtown' },
  { id: 'e-1', name: 'Boulevard West', x: 42, y: 10, district: 'shopping' },
  { id: 'e-2', name: 'Kaufhausecke', x: 52, y: 15, district: 'shopping' },
  { id: 'e-3', name: 'Boulevard Mitte', x: 62, y: 10, district: 'shopping' },
  { id: 'e-4', name: 'Galerie', x: 74, y: 15, district: 'shopping' },
  { id: 'e-5', name: 'Boulevard Ost', x: 86, y: 10, district: 'shopping' },
  { id: 'k-1', name: 'Turmplatz', x: 80, y: 36, district: 'banking' },
  { id: 'k-2', name: 'Bankenplatz', x: 80, y: 51, district: 'banking' },
  { id: 'k-3', name: 'Börsenecke', x: 88, y: 51, district: 'banking' },
  { id: 'k-4', name: 'Konzernhof', x: 81, y: 72, district: 'banking' },
  { id: 'k-5', name: 'Bankenallee', x: 74, y: 44, district: 'banking' },
  { id: 's-1', name: 'Parkweg', x: 32, y: 70, district: 'scene' },
  { id: 's-2', name: 'Parkpromenade', x: 40, y: 72, district: 'scene' },
  { id: 's-3', name: 'Campus', x: 58, y: 78, district: 'scene' },
  { id: 's-4', name: 'Kulturplatz', x: 22, y: 84, district: 'scene' },
];

/**
 * Lagergrundstück: geräumige Halle mit 12 Regalplätzen (je 3 × 1 Felder) und ein Hof für die Kämpfer.
 * Die Regalplätze stehen in der Reihenfolge, in der sie ausgebaut werden (vorn am Tor zuerst).
 */
export const WAREHOUSE = {
  lot: { x: 5, y: 31, w: 24, h: 13 },
  hall: { x: 5, y: 31, w: 16, h: 13 },
  yard: { x: 22, y: 31, w: 7, h: 13 },
  office: { x: 5, y: 40, w: 4, h: 4 },
  door: [12, 44] as [number, number],
  doorWidth: 2,
  yardGate: [25, 44] as [number, number],
  shelfSlots: [
    [9, 38], [13, 38], [17, 38], [5, 38],
    [9, 35], [13, 35], [17, 35], [5, 35],
    [9, 32], [13, 32], [17, 32], [5, 32],
  ] as [number, number][],
};

// Fahrzeugrouten entlang der Fahrbahnmitte. Die Fahrzeuge halten sich rechts.
export const CAR_ROUTES: [number, number][][] = [
  [[2, 28], [36, 28], [36, 65], [2, 65]],
  [[36, 28], [68, 28], [68, 65], [36, 65]],
  [[68, 28], [94, 28], [94, 65], [68, 65]],
  [[2, 65], [36, 65], [36, 94], [2, 94]],
  [[36, 65], [68, 65], [68, 94], [36, 94]],
  [[68, 65], [94, 65], [94, 94], [68, 94]],
  [[36, 13], [68, 13], [68, 28], [36, 28]],
  [[68, 13], [94, 13], [94, 28], [68, 28]],
  [[2, 21], [36, 21], [36, 28], [2, 28]],
  [[68, 65], [68, 28], [36, 28], [36, 65]],
  [[2, 94], [94, 94], [94, 65], [2, 65]],
  [[36, 13], [36, 94], [68, 94], [68, 13]],
];

export const BUS_ROUTES: { points: [number, number][]; stops: [number, number][] }[] = [
  { points: [[2, 28], [68, 28], [68, 65], [2, 65]], stops: [[18, 28], [50, 28], [68, 46], [24, 65]] },
  { points: [[36, 13], [94, 13], [94, 94], [36, 94]], stops: [[52, 13], [80, 13], [94, 50], [60, 94]] },
];
