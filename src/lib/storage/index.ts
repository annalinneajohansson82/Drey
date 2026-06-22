import type { ClosedItem, Item } from '../../types/item';

/**
 * Persistence seam for Drey.
 *
 * Domain logic (lib/items.ts) depends only on this interface, never on a
 * concrete store. v1 ships {@link IndexedDbStorage}; a future Tauri desktop
 * build can supply a filesystem implementation that writes one JSON file per
 * item (~/.drey/items/{id}.json) without any change to the domain layer.
 *
 * Active items (`living` | `dormant` | `finished`) live in the item space.
 * Closing moves an item out of that space into the reduced closed space; there
 * is intentionally no API to list a closed item back into active views.
 */
export interface Storage {
  /** Fetch a single active item by id, or undefined if absent. */
  getItem(id: string): Promise<Item | undefined>;
  /** All active items. Order is not guaranteed; callers sort as needed. */
  listItems(): Promise<Item[]>;
  /** Insert or replace an active item. */
  saveItem(item: Item): Promise<void>;
  /** Remove an item from the active space (used as part of closing). */
  removeItem(id: string): Promise<void>;
  /** Persist a reduced closed record. */
  saveClosed(record: ClosedItem): Promise<void>;
  /** All closed records. Read only by the (deferred) pattern view and export. */
  listClosed(): Promise<ClosedItem[]>;
}

export { IndexedDbStorage } from './indexeddb';
