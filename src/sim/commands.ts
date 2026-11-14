// Befehle an die Simulation. Oberfläche und Balancing-Bot nutzen dieselben Befehle.
// Sie landen in einer Warteschlange und werden im nächsten Tick ausgeführt.
import {
  CRATE_UNITS,
  EQUIPMENT,
  MARKET,
  OFFICE_LEVELS,
  PRICING,
  PRODUCTS,
  REPUTATION_THRESHOLDS,
  ROOMS,
  SPOT,
  STAFF,
  TICKS_PER_HOUR,
  WAREHOUSE,
  type EquipmentId,
  type ProductId,
  type RoomType,
} from '../data/balance';
import { EQUIPMENT_NAMES, PRODUCT_NAMES, ROMAN, ROOM_NAMES } from '../data/names';
import { assignCooling, buildOrderLines, deliverySlot, orderCost, storeCargo } from './economy';
import {
  canSpend,
  coldCapacity,
  freeSlots,
  isProductUnlocked,
  levelForRevenue,
  officeLevel,
  shelfCapacity,
  staffLimit,
} from './selectors';
import { createVendor } from './staff';
import type { Assortment, GameState, MessageKind } from './types';
import { arriveHome, isInWarehouse } from './vendors';
import type { World } from './world';

export type Command =
  | { type: 'nextDay' }
  | { type: 'debugSkipHours'; hours: number }
  | { type: 'debugSetMoney'; amount: number }
  | { type: 'debugSetLevel'; level: number }
  | { type: 'order'; lines: { product: ProductId; crates: number }[] }
  | { type: 'cancelOrder'; id: number }
  | { type: 'hire'; applicantId: number }
  | { type: 'fire'; personId: number }
  | { type: 'assign'; personId: number; spot: number | null }
  | { type: 'setAssortment'; personId: number; assortment: Assortment }
  | { type: 'buyEquipment'; equipment: EquipmentId }
  | { type: 'equip'; personId: number; equipment: EquipmentId }
  | { type: 'build'; slot: number; room: RoomType }
  | { type: 'demolish'; slot: number }
  | { type: 'upgradeOffice' }
  | { type: 'buySection' }
  | { type: 'setPrice'; product: ProductId; factor: number };

export function enqueue(state: GameState, cmd: Command): void {
  state.queue.push(cmd);
}

export function pushMessage(state: GameState, kind: MessageKind, text: string, x?: number, y?: number): void {
  state.messages.push({ id: state.nextId++, day: state.day, dayTick: state.dayTick, kind, text, x, y });
  if (state.messages.length > 60) state.messages.splice(0, state.messages.length - 60);
}

function fail(s: GameState, text: string): void {
  pushMessage(s, 'warning', text);
}

function spend(s: GameState, amount: number, what: 'purchases' | 'investments', failText: string): boolean {
  if (!canSpend(s, amount)) {
    fail(s, `${failText}: Dafür reicht der Dispositionsrahmen nicht.`);
    return false;
  }
  s.money -= amount;
  s.ledger[what] += amount;
  return true;
}

const fmt = (v: number) => `${v.toFixed(2).replace('.', ',')} €`;

/** Prüft die Ruf-Stufe und meldet Freischaltungen. */
export function checkLevel(s: GameState): void {
  const lvl = levelForRevenue(s.totalRevenue);
  while (s.level < lvl) {
    s.level++;
    pushMessage(s, 'unlock', `Ruf-Stufe ${s.level} erreicht. Neue Möglichkeiten sind freigeschaltet.`);
    s.dayEvents.push(`Ruf-Stufe ${s.level} erreicht.`);
  }
}

/** Führt einen Befehl aus (außer nextDay und debugSkipHours, die die Zeit betreffen). */
export function applyEconomyCommand(s: GameState, world: World, cmd: Command): void {
  switch (cmd.type) {
    case 'debugSetMoney':
      s.money = cmd.amount;
      break;
    case 'debugSetLevel': {
      const lvl = Math.max(1, Math.min(REPUTATION_THRESHOLDS.length, Math.round(cmd.level)));
      s.totalRevenue = Math.max(s.totalRevenue, REPUTATION_THRESHOLDS[lvl - 1]);
      checkLevel(s);
      break;
    }
    case 'order': {
      const lines = cmd.lines.filter((l) => l.crates > 0).map((l) => ({ product: l.product, crates: Math.floor(l.crates) }));
      if (!lines.length) return;
      for (const l of lines) {
        if (!isProductUnlocked(s, l.product)) return fail(s, `${PRODUCT_NAMES[l.product]} sind noch nicht freigeschaltet.`);
      }
      const total = lines.reduce((n, l) => n + l.crates, 0);
      if (total > MARKET.maxCratesPerOrder) return fail(s, `Höchstens ${MARKET.maxCratesPerOrder} Kisten pro Bestellung.`);
      const cost = orderCost(s, lines);
      if (!spend(s, cost, 'purchases', 'Bestellung nicht möglich')) return;
      const slot = deliverySlot(s);
      s.orders.push({ id: s.nextId++, lines: buildOrderLines(s, lines), deliverDay: slot.day, deliverTick: slot.tick });
      pushMessage(s, 'delivery', `Bestellung über ${total} Kisten aufgegeben (${fmt(cost)}). Lieferung ${slot.label}.`);
      break;
    }
    case 'cancelOrder': {
      const o = s.orders.find((x) => x.id === cmd.id);
      if (!o) return;
      const refund = o.lines.reduce((n, l) => n + l.crates * CRATE_UNITS * l.unitPrice, 0);
      s.orders = s.orders.filter((x) => x !== o);
      s.money += refund;
      s.ledger.purchases -= refund;
      pushMessage(s, 'info', `Bestellung storniert, ${fmt(refund)} erstattet.`);
      break;
    }
    case 'hire': {
      const a = s.applicants.find((x) => x.id === cmd.applicantId);
      if (!a) return;
      if (s.staff.length >= staffLimit(s)) return fail(s, 'Die Personalgrenze des Büros ist erreicht.');
      if (!spend(s, STAFF.hireCost, 'investments', 'Anwerbung nicht möglich')) return;
      s.applicants = s.applicants.filter((x) => x !== a);
      createVendor(s, world, a);
      pushMessage(s, 'info', `${a.name} wurde als Verkäufer angeworben.`);
      s.dayEvents.push(`${a.name} angeworben.`);
      break;
    }
    case 'fire': {
      const p = s.staff.find((x) => x.id === cmd.personId);
      if (!p) return;
      // Der Tageslohn wird trotzdem fällig
      s.pendingWages += p.wage;
      storeCargo(s, p.cargo);
      if (p.equipment !== 'tray') s.inventory[p.equipment] = (s.inventory[p.equipment] ?? 0) + 1;
      s.staff = s.staff.filter((x) => x !== p);
      pushMessage(s, 'info', `${p.name} wurde entlassen.`);
      s.dayEvents.push(`${p.name} entlassen.`);
      break;
    }
    case 'assign': {
      const p = s.staff.find((x) => x.id === cmd.personId);
      if (!p) return;
      if (cmd.spot !== null) {
        const spot = world.spots[cmd.spot];
        if (!spot) return;
        if (EQUIPMENT[p.equipment].pathMode === 'road' && !spot.parking) {
          return fail(s, `Der Verkaufswagen braucht einen Platz mit Parkbucht.`);
        }
        const others = s.staff.filter((o) => o !== p && o.spot === cmd.spot).length;
        if (others >= SPOT.maxOwnVendors) return fail(s, `Am Platz ${spot.name} stehen schon ${SPOT.maxOwnVendors} eigene Verkäufer.`);
      }
      p.spot = cmd.spot;
      break;
    }
    case 'setAssortment': {
      const p = s.staff.find((x) => x.id === cmd.personId);
      if (p) p.assortment = cmd.assortment;
      break;
    }
    case 'buyEquipment': {
      const def = EQUIPMENT[cmd.equipment];
      if (cmd.equipment === 'tray') return;
      if (s.level < def.level) return fail(s, `${EQUIPMENT_NAMES[cmd.equipment]} ist erst ab Ruf-Stufe ${def.level} verfügbar.`);
      if (!spend(s, def.price, 'investments', 'Kauf nicht möglich')) return;
      s.inventory[cmd.equipment] = (s.inventory[cmd.equipment] ?? 0) + 1;
      pushMessage(s, 'info', `${EQUIPMENT_NAMES[cmd.equipment]} gekauft.`);
      break;
    }
    case 'equip': {
      const p = s.staff.find((x) => x.id === cmd.personId);
      if (!p || p.equipment === cmd.equipment) return;
      if (!isInWarehouse(p)) return fail(s, `${p.name} muss zum Wechseln der Ausrüstung im Lager sein.`);
      if (cmd.equipment !== 'tray' && !(s.inventory[cmd.equipment] > 0)) return fail(s, `Kein freies Gerät: ${EQUIPMENT_NAMES[cmd.equipment]}.`);
      if (EQUIPMENT[cmd.equipment].pathMode === 'road' && p.spot !== null && !world.spots[p.spot].parking) p.spot = null;
      if (p.equipment !== 'tray') s.inventory[p.equipment] = (s.inventory[p.equipment] ?? 0) + 1;
      if (cmd.equipment !== 'tray') s.inventory[cmd.equipment]--;
      p.equipment = cmd.equipment;
      // Überzählige Ware zurück ins Lager
      arriveHome(s, world, p);
      break;
    }
    case 'build': {
      const def = ROOMS[cmd.room];
      if (cmd.room === 'office') return;
      if (!freeSlots(s).includes(cmd.slot)) return fail(s, 'Dieser Raumplatz ist nicht frei.');
      if (s.level < def.level) return fail(s, `${ROOM_NAMES[cmd.room]} ist erst ab Ruf-Stufe ${def.level} verfügbar.`);
      if (def.unique && s.warehouse.rooms.some((r) => r.type === cmd.room)) return fail(s, `${ROOM_NAMES[cmd.room]} gibt es nur einmal.`);
      if (!spend(s, def.cost, 'investments', 'Bau nicht möglich')) return;
      // Nach Feierabend wird über Nacht gebaut
      const night = s.phase === 'dayEnd';
      s.warehouse.rooms.push({ slot: cmd.slot, type: cmd.room, level: 1, buildTicks: night ? 0 : WAREHOUSE.buildHours * TICKS_PER_HOUR });
      pushMessage(s, 'info', night ? `${ROOM_NAMES[cmd.room]} wird über Nacht gebaut.` : `Bau begonnen: ${ROOM_NAMES[cmd.room]}.`);
      assignCooling(s);
      break;
    }
    case 'demolish': {
      const r = s.warehouse.rooms.find((x) => x.slot === cmd.slot);
      if (!r || r.type === 'office') return;
      if (r.buildTicks === 0 && (r.type === 'shelf' || r.type === 'coldroom')) {
        // Nach dem Abriss muss die vorhandene Ware noch Platz finden
        const shelf = shelfCapacity(s) - (r.type === 'shelf' ? ROOMS.shelf.crates : 0);
        const cold = coldCapacity(s) - (r.type === 'coldroom' ? ROOMS.coldroom.crates : 0);
        const nonCool = s.crates.filter((c) => PRODUCTS[c.product].cooledDays === null).length;
        if (s.crates.length > shelf + cold || nonCool > shelf) return fail(s, `${ROOM_NAMES[r.type]} ist noch belegt. Erst Ware verkaufen.`);
      }
      const refund = ROOMS[r.type].cost * WAREHOUSE.demolishRefund;
      s.warehouse.rooms = s.warehouse.rooms.filter((x) => x !== r);
      s.money += refund;
      s.ledger.investments -= refund;
      pushMessage(s, 'info', `${ROOM_NAMES[r.type]} abgerissen, ${fmt(refund)} erstattet.`);
      break;
    }
    case 'upgradeOffice': {
      const office = s.warehouse.rooms.find((r) => r.type === 'office');
      if (!office || office.buildTicks > 0) return;
      const next = OFFICE_LEVELS[officeLevel(s)];
      if (!next) return;
      if (s.level < next.level) return fail(s, `Büro ${ROMAN[officeLevel(s)]} ist erst ab Ruf-Stufe ${next.level} verfügbar.`);
      if (!spend(s, next.cost, 'investments', 'Ausbau nicht möglich')) return;
      if (s.phase === 'dayEnd') {
        office.level++;
        pushMessage(s, 'info', `Büro ${ROMAN[office.level - 1]} wird über Nacht eingerichtet.`);
      } else {
        office.buildTicks = WAREHOUSE.buildHours * TICKS_PER_HOUR;
        pushMessage(s, 'info', `Ausbau zu Büro ${ROMAN[officeLevel(s)]} begonnen.`);
      }
      break;
    }
    case 'buySection': {
      const next = s.warehouse.sections;
      if (next >= WAREHOUSE.sectionCosts.length) return;
      if (s.level < WAREHOUSE.sectionLevels[next]) return fail(s, `Bauabschnitt ${next + 1} ist erst ab Ruf-Stufe ${WAREHOUSE.sectionLevels[next]} verfügbar.`);
      if (!spend(s, WAREHOUSE.sectionCosts[next], 'investments', 'Ausbau nicht möglich')) return;
      s.warehouse.sections++;
      pushMessage(s, 'info', `Bauabschnitt ${next + 1} fertiggestellt.`);
      break;
    }
    case 'setPrice': {
      s.priceFactors[cmd.product] = Math.min(PRICING.factorMax, Math.max(PRICING.factorMin, cmd.factor));
      break;
    }
    case 'nextDay':
    case 'debugSkipHours':
      break;
  }
}
