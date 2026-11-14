// Karte der Stadt: ASCII-Raster (64 × 64) plus Listen für Verkaufsplätze, Routen und Gebiete.
// x wächst nach Osten, y nach Süden. Ein Zeichen entspricht einem Feld.
//
// Feldtypen:
//   #  Straße            .  Gehweg           =  Überweg
//   :  Platz (Pflaster)  ,  Grünfläche       W  Lagerhaus (Grundstück)
// Gebäude (nicht begehbar). Groß- und Kleinbuchstaben trennen benachbarte Gebäude:
//   R r  Reihenhaus      B b  Backstein       P p  Putz
//   L l  Laden mit Markise                    S    Bahnhof
//   H h  Halle           U u  Hochschule      M    Mensa
//   A    Dienststelle der Gewerbeaufsicht     F    Brunnen
//   Z    Zaun            T    Baum            |    Gleise
//   Q    Wartehäuschen   V    Pavillon (Treffpunkt der Gemüsegang)
import type { DistrictId } from './balance';

export const MAP_ROWS: readonly string[] = [
  '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||', // 0
  '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||', // 1
  'BBBBB.PPPppp,,SSSSSSSSSSSSSSSSSS,,,.........::..................', // 2
  'BBBBB.PPPppp,,SSSSSSSSSSSSSSSSSS,,,.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 3
  'BBBBB.PPPppp,,SSSSSSSSSSSSSSSSSS,,,.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 4
  'bbbbb.......,,SSSSSSSSSSSSSSSSSS,,,.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 5
  'bbbbb.BBBbbbT:::::::::::::::::::::T.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 6
  'bbbbb.BBBbbb:::::::::::::::::::::::.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 7
  'BBBBB.BBBbbb:::::::::::::::::::::::.HHHHHHHH::HHHHHHHH..HHHHHHHH', // 8
  'BBBBB.BBBbbb:::::::::::::::::::::::.HHHHHHHH::..........HHHHHHHH', // 9
  'BBBBB.BBBbbbT:::::Q:::::::::::Q:::T.ZZZZZZZZ::.........ZZZZZZZZZ', // 10
  '................................................................', // 11
  '###############=#################=#####=#####=##################', // 12
  '###############=#################=#####=#####=##################', // 13
  '......==..................==......................==............', // 14
  'RRrrR.##.RRrr,,:,,RRrrRRr.##.BBBbbbBBB::PPPpppPPP.##............', // 15
  'RRrrR.##.RRrrT,:,,RRrrRRr.##.BBBbbbBBB::PPPpppPPP.##..HHHHHHHHHH', // 16
  'RRrrR.##.RRrr,,:,TRRrrRRr.##.BBBbbbBBB::PPPpppPPP.##..HHHHHHHHHH', // 17
  ',,,,,.##.,,,,,,:,,,,,,,,,.##.BBBbbbBBB::PPPpppPPP.##..HHHHHHHHHH', // 18
  ',,,,,.##.,,,,:::::,,,,,,,.==.::::PPPPP::PPPpppPPP.##..HHHHHHHHHH', // 19
  ',,,,,.##.,,,,,,:,,,,,,,,,.##.LLLLLLT::::::::::TLL.==..HHHHHHHHHH', // 20
  'RRrrR.##.RRrr,,:,TRRrrRRr.##.LLLLLL::::::::::::LL.##..HHHHHHHHHH', // 21
  'RRrrR.##.RRrrT,:,,RRrrRRr.##.LLLLLL:::::FFF::::LL.##..HHHHHHHHHH', // 22
  'RRrrR.##.RRrr,,:,,RRrrRRr.##.llllll:::::FFF::::ll.##..ZZZZZZZZZZ', // 23
  '......==..................##.llllll::::::::::::ll.##.........ZZZ', // 24
  '#####=##=######=#########=##.llllll::::::::::::ll.##..HHHHHHHZZZ', // 25
  '#####=##=######=#########=##.::::::::::::::::::::.##..HHHHHHHZZZ', // 26
  '......==..................==.::::::::::::::::::::.==..HHHHHHHZZZ', // 27
  'RRrrR.##.,WWWWWWWWWWWWRRR.##.::::::::::::::::::::.##..HHHHHHHZZZ', // 28
  'RRrrR.##.,WWWWWWWWWWWWRRR.##.LLLLLL::::::::::::LL.##..HHHHHHHZZZ', // 29
  'RRrrR.##.TWWWWWWWWWWWWrrr.##.LLLLLL::::::::::::LL.##..HHHHHHHZZZ', // 30
  ',,,,,.##.,WWWWWWWWWWWWrrr.##.LLLLLL::::::::::::LL.##..HHHHHHHZZZ', // 31
  ',,,,,.##.,WWWWWWWWWWWW,,,.##.llllll::::::::::::ll.##.........ZZZ', // 32
  ',,,,,.##.,WWWWWWWWWWWW,T,.##.llllllT::::::::::Tll.##............', // 33
  'RRrrR.##.,WWWWWWWWWWWW,,,.##.llllAA:::::BBBbbbBBB.##..HHHHHHHHHH', // 34
  'RRrrR.##.,WWWWWWWWWWWW,,,.##.LLLLAAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 35
  'RRrrR.##.,,,,,,,,,,,,,,,,.==.::::AAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 36
  ',,,,,.##.T,,,,,,,,,,,,,,,.##.PPppAAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 37
  'RRrrR.##.,RRrrRRrrRRrrRRr.##.PPppAAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 38
  'RRrrR.##.,RRrrRRrrRRrrRRr.##.PPppAAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 39
  'RRrrR.##.,RRrrRRrrRRrrRRr.##.PPppAAAAA::BBBbbbBBB.##..HHHHHHHHHH', // 40
  '......==..................==......................==............', // 41
  '#####=##=###=############=##=#####=####=#########=##=###########', // 42
  '#####=##=###=############=##=#####=####=#########=##=###########', // 43
  '......==..................==......................==............', // 44
  'RRrrR.##.RRrrRRrrRRrrRRrr.##.,,,,::,,UUUUUUuuuuuu.##.,,,,,,,,,,,', // 45
  'RRrrR.##.RRrrRRrrRRrrRRrr.##.,T,,::,,UUUUUUuuuuuu.##.,UUUUUuuuu,', // 46
  'RRrrR.##.RRrrRRrrRRrrRRrr.##.,,,,::,,UUUUUUuuuuuu.##.,UUUUUuuuu,', // 47
  ',,,,,.##.,,,.,,,,,,,,,,,,.==.,,T,::,,UUUUUUuuuuuu.##.,UUUUUuuuu,', // 48
  ',,,,,.##.,,,.,,,,,,,,,,,,.##.,,,,::,,,,,,,,,,,,,,.==.,UUUUUuuuu,', // 49
  'RRrrR.##.RRrrRRrrRRrrRRrr.##.::::::::::::::::::::.##.,UUUUUuuuu,', // 50
  'RRrrR.##.RRrrRRrrRRrrRRrr.##.::::::::::::::::::::.##.,,,,,,,,,,,', // 51
  ',,,,,.##..................##.,,,,::,,,,,,,,T,,,,,.##.:::::::::::', // 52
  ',,,,,.######=############=##.UUUU::,,MMMMMM,,,,T,.##.,,,,,,,,,,,', // 53
  ',,,,,.######=############=##.UUUU::,,MMMMMM,,,,,,.##.,,UUUUUUUU,', // 54
  ',,,,,.,,..................##.UUUU::,,MMMMMM,VVV,,.##.,,UUUUUUUU,', // 55
  'RRrrR.,,,RRrrRRrrRRrrRRrr.##.UUUU::,,MMMMMM,VVV,,.##.,,UUUUUUUU,', // 56
  'RRrrR.,,,RRrrRRrrRRrrRRrr.##.UUUU::,,MMMMMM,VVV,,.##.,,UUUUUUUU,', // 57
  'RRrrR.,,,RRrrRRrrRRrrRRrr.##.,,,,::,T,,,,,,,,,,,T.##.,,UUUUUUUU,', // 58
  ',,,,,.,,,,,,,,,,,,,,,,,,,.##.,T,,::,,,,,,,,,,,,,,.##.,,UUUUUUUU,', // 59
  ',,,,,.,,,,,,,,,,,,,T,,,,,.##......................##.,,,,,,,,,,,', // 60
  ',,T,,.,,,,,,,,T,,,,,,,,,,.##########################.,T,,,T,,,,,', // 61
  ',,,,,.,,,T,,,,,,,,,,,,,,,.##########################.,,,,,,,,,T,', // 62
  ',,,,,.,,,,,,,,,,,,,,,,,,,............................,,,,,,,,,,,', // 63
];

export interface DistrictArea {
  id: DistrictId;
  /** Rechtecke [x0, y0, x1, y1] einschließlich, spätere überschreiben frühere */
  rects: [number, number, number, number][];
}

export const DISTRICT_AREAS: DistrictArea[] = [
  { id: 'residential', rects: [[0, 12, 25, 63]] },
  { id: 'station', rects: [[0, 0, 34, 11]] },
  { id: 'industrial', rects: [[35, 0, 63, 11], [52, 12, 63, 41]] },
  { id: 'oldtown', rects: [[26, 12, 51, 41]] },
  { id: 'campus', rects: [[26, 42, 63, 63]] },
];

export interface SpotData {
  id: string;
  name: string;
  x: number;
  y: number;
  district: DistrictId;
  /** Platzfaktor 0,8 bis 1,2 */
  factor: number;
  /** Parkbucht für den Verkaufswagen */
  parking?: boolean;
}

export const SPOTS: SpotData[] = [
  { id: 'res-1', name: 'Lindenstraße', x: 18, y: 27, district: 'residential', factor: 1.0 },
  { id: 'res-2', name: 'Gartenweg', x: 8, y: 31, district: 'residential', factor: 0.9, parking: true },
  { id: 'res-3', name: 'Stadtpark', x: 15, y: 19, district: 'residential', factor: 1.1 },
  { id: 'sta-1', name: 'Bahnhofsvorplatz West', x: 20, y: 7, district: 'station', factor: 1.1 },
  { id: 'sta-2', name: 'Haupteingang', x: 25, y: 9, district: 'station', factor: 1.2 },
  { id: 'sta-3', name: 'Busbahnhof', x: 22, y: 10, district: 'station', factor: 0.9, parking: true },
  { id: 'sta-4', name: 'Bahnhofsvorplatz Ost', x: 27, y: 10, district: 'station', factor: 1.0 },
  { id: 'old-1', name: 'Fußgängerzone', x: 47, y: 27, district: 'oldtown', factor: 1.1 },
  { id: 'old-2', name: 'Marktplatz Nord', x: 42, y: 24, district: 'oldtown', factor: 1.2 },
  { id: 'old-3', name: 'Marktplatz Süd', x: 44, y: 31, district: 'oldtown', factor: 1.0 },
  { id: 'old-4', name: 'Kirchgasse', x: 39, y: 33, district: 'oldtown', factor: 0.9 },
  { id: 'old-5', name: 'Brunnengasse', x: 38, y: 18, district: 'oldtown', factor: 0.8 },
  { id: 'old-6', name: 'Rathausecke', x: 46, y: 21, district: 'oldtown', factor: 1.0, parking: true },
  { id: 'uni-1', name: 'Campuswiese', x: 31, y: 50, district: 'campus', factor: 1.0 },
  { id: 'uni-2', name: 'Hörsaalgebäude', x: 34, y: 46, district: 'campus', factor: 1.2, parking: true },
  { id: 'uni-3', name: 'Mensa', x: 36, y: 50, district: 'campus', factor: 1.1 },
  { id: 'ind-1', name: 'Werkstor Nord', x: 46, y: 11, district: 'industrial', factor: 1.0, parking: true },
  { id: 'ind-2', name: 'Hallenhof', x: 56, y: 24, district: 'industrial', factor: 0.9 },
];

/** Grundstück des Lagerhauses (4 Bauabschnitte zu je 6 × 4 Feldern) und Tor */
export const WAREHOUSE_LOT = { x: 10, y: 28, w: 12, h: 8, door: [12, 27] as [number, number] };

// Fahrzeugrouten entlang der Fahrbahnmitte. Die Fahrzeuge halten sich rechts.
export const CAR_ROUTES: [number, number][][] = [
  [[7, 13], [51, 13], [51, 43], [7, 43]],
  [[27, 43], [51, 43], [51, 13], [27, 13]],
  [[7, 13], [27, 13], [27, 26], [7, 26]],
  [[7, 43], [27, 43], [27, 26], [7, 26]],
  [[7, 43], [7, 54], [27, 54], [27, 43]],
  [[27, 43], [27, 62], [51, 62], [51, 43]],
  [[51, 13], [7, 13], [7, 43], [51, 43]],
];

export const BUS_ROUTES: { points: [number, number][]; stops: [number, number][] }[] = [
  { points: [[7, 13], [51, 13], [51, 43], [27, 43], [27, 13]], stops: [[18, 13], [30, 13], [36, 43]] },
];
