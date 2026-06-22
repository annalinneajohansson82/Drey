import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { ClosedItem, Item } from '../../types/item';
import type { Storage } from './index';

const DB_NAME = 'drey';
const DB_VERSION = 1;
const ITEM_STORE = 'items';
const CLOSED_STORE = 'closed';

interface DreySchema extends DBSchema {
  [ITEM_STORE]: {
    key: string;
    value: Item;
  };
  [CLOSED_STORE]: {
    key: string;
    value: ClosedItem;
  };
}

/**
 * On-device persistence backed by IndexedDB.
 *
 * Two object stores keep the closed space structurally separate from the active
 * space, so closed items can never surface in active views. Nothing here leaves
 * the user's device.
 */
export class IndexedDbStorage implements Storage {
  private dbPromise: Promise<IDBPDatabase<DreySchema>>;

  constructor() {
    this.dbPromise = openDB<DreySchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(ITEM_STORE)) {
          db.createObjectStore(ITEM_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(CLOSED_STORE)) {
          db.createObjectStore(CLOSED_STORE, { keyPath: 'id' });
        }
      },
    });
  }

  /** @inheritdoc */
  async getItem(id: string): Promise<Item | undefined> {
    return (await this.dbPromise).get(ITEM_STORE, id);
  }

  /** @inheritdoc */
  async listItems(): Promise<Item[]> {
    return (await this.dbPromise).getAll(ITEM_STORE);
  }

  /** @inheritdoc */
  async saveItem(item: Item): Promise<void> {
    await (await this.dbPromise).put(ITEM_STORE, item);
  }

  /** @inheritdoc */
  async removeItem(id: string): Promise<void> {
    await (await this.dbPromise).delete(ITEM_STORE, id);
  }

  /** @inheritdoc */
  async saveClosed(record: ClosedItem): Promise<void> {
    await (await this.dbPromise).put(CLOSED_STORE, record);
  }

  /** @inheritdoc */
  async listClosed(): Promise<ClosedItem[]> {
    return (await this.dbPromise).getAll(CLOSED_STORE);
  }
}
