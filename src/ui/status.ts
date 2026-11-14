// Statustexte für Personen.
import type { Person } from '../sim/types';
import type { World } from '../sim/world';

export function statusText(world: World, p: Person): string {
  const spot = p.activeSpot !== null ? world.spots[p.activeSpot]?.name : p.spot !== null ? world.spots[p.spot]?.name : '';
  switch (p.mode) {
    case 'idle':
      return p.spot === null ? 'Im Lager, ohne Platz' : 'Im Lager';
    case 'loading':
      return 'Lädt Ware';
    case 'waitStock':
      return 'Wartet auf Ware';
    case 'toSpot':
      return `Unterwegs zu ${spot}`;
    case 'setup':
      return `Baut auf: ${spot}`;
    case 'selling':
      return `Verkauft: ${spot}`;
    case 'packing':
      return `Baut ab: ${spot}`;
    case 'toWarehouse':
      return 'Auf dem Weg zum Lager';
  }
}
