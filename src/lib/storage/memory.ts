import type { ClosedItem, Item } from '../../types/item';
import type { Storage } from './index';

/**
 * In-memory {@link Storage} for tests. Mirrors the two-space model: active items
 * and reduced closed records are kept separate.
 */
export class MemoryStorage implements Storage {
  private items = new Map<string, Item>();
  private closed = new Map<string, ClosedItem>();

  async getItem(id: string): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async listItems(): Promise<Item[]> {
    return [...this.items.values()];
  }

  async saveItem(item: Item): Promise<void> {
    this.items.set(item.id, item);
  }

  async removeItem(id: string): Promise<void> {
    this.items.delete(id);
  }

  async saveClosed(record: ClosedItem): Promise<void> {
    this.closed.set(record.id, record);
  }

  async listClosed(): Promise<ClosedItem[]> {
    return [...this.closed.values()];
  }
}
