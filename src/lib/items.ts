import type { ClosedItem, Item, PutDownNote } from '../types/item';
import type { Storage } from './storage';
import { deriveHandle } from './handle';

/**
 * Drop empty/whitespace-only fields from a put-down note so re-entry shows only
 * what the user actually answered. Returns null when nothing was answered, which
 * keeps a bare set-down ("Set down.") free of an empty note section.
 *
 * @param note Raw answers, any of which may be blank or absent.
 * @returns A note with only non-empty fields, or null if none remain.
 */
export function cleanPutDownNote(note: PutDownNote): PutDownNote | null {
  const entries = Object.entries(note).filter(
    ([, value]) => typeof value === 'string' && value.trim().length > 0,
  );
  if (entries.length === 0) {
    return null;
  }
  return Object.fromEntries(
    entries.map(([key, value]) => [key, (value as string).trim()]),
  ) as PutDownNote;
}

/**
 * Domain operations over items, enforcing the state machine from
 * docs/plans/data-model.md. Persistence is injected via {@link Storage}, so this
 * layer is unaware of IndexedDB (or any future filesystem store).
 */
export class ItemsService {
  constructor(private readonly storage: Storage) {}

  /** All active items, newest first. */
  async list(): Promise<Item[]> {
    const items = await this.storage.listItems();
    return items.sort((a, b) => b.created_at - a.created_at);
  }

  /** Fetch one active item. */
  async get(id: string): Promise<Item | undefined> {
    return this.storage.getItem(id);
  }

  /**
   * Capture new content as a living item.
   *
   * @param content Free text; the first line becomes the (derived) handle.
   * @param now Capture time; defaults to now. Injectable for testing.
   * @returns The created item.
   */
  async capture(content: string, now: number = Date.now()): Promise<Item> {
    const item: Item = {
      id: crypto.randomUUID(),
      content,
      state: 'living',
      created_at: now,
      put_down_at: null,
      put_down: null,
      finished_at: null,
      tags: null,
    };
    await this.storage.saveItem(item);
    return item;
  }

  /**
   * Set a living item down. The note is cleaned to its answered fields; a bare
   * set-down (no answers) records a null note.
   *
   * @returns The updated dormant item.
   */
  async setDown(id: string, note: PutDownNote, now: number = Date.now()): Promise<Item> {
    const item = await this.require(id);
    if (item.state !== 'living') {
      throw new Error(`Cannot set down an item in state "${item.state}".`);
    }
    const updated: Item = {
      ...item,
      state: 'dormant',
      put_down_at: now,
      put_down: cleanPutDownNote(note),
    };
    await this.storage.saveItem(updated);
    return updated;
  }

  /**
   * Pick a dormant item back up. Its last put-down timestamp and note are
   * retained (re-entry already showed them); the state simply returns to living.
   *
   * @returns The updated living item.
   */
  async pickUp(id: string): Promise<Item> {
    const item = await this.require(id);
    if (item.state !== 'dormant') {
      throw new Error(`Cannot pick up an item in state "${item.state}".`);
    }
    const updated: Item = { ...item, state: 'living' };
    await this.storage.saveItem(updated);
    return updated;
  }

  /**
   * Finish an item. Opt-in, never pushed; a silent state change with no prompt.
   * Allowed from living or dormant.
   *
   * @returns The updated finished item.
   */
  async finish(id: string, now: number = Date.now()): Promise<Item> {
    const item = await this.require(id);
    if (item.state === 'finished') {
      throw new Error('Item is already finished.');
    }
    const updated: Item = { ...item, state: 'finished', finished_at: now };
    await this.storage.saveItem(updated);
    return updated;
  }

  /**
   * Close an item. One-way and irreversible: the active record is removed and a
   * reduced {@link ClosedItem} (id, handle, closed_at, close_note) is kept so the
   * pattern view can read the close note later. Closing is not deletion.
   *
   * @param closeNote Optional final thought; blank is a complete act.
   * @returns The reduced closed record.
   */
  async close(id: string, closeNote: string, now: number = Date.now()): Promise<ClosedItem> {
    const item = await this.require(id);
    const trimmed = closeNote.trim();
    const record: ClosedItem = {
      id: item.id,
      handle: deriveHandle(item.content),
      closed_at: now,
      close_note: trimmed.length > 0 ? trimmed : null,
    };
    await this.storage.saveClosed(record);
    await this.storage.removeItem(item.id);
    return record;
  }

  private async require(id: string): Promise<Item> {
    const item = await this.storage.getItem(id);
    if (!item) {
      throw new Error(`No active item with id "${id}".`);
    }
    return item;
  }
}
