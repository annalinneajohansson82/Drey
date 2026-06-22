import type { ClosedItem, Item } from '../types/item';
import type { Storage } from './storage';

/** Current shape version of an export file. */
export const EXPORT_VERSION = 1;

/**
 * A complete, human-readable snapshot of a user's data. Plain JSON with no
 * tooling required to read it: the user owns their data, structurally.
 */
export interface DreyExport {
  version: number;
  exported_at: number;
  items: Item[];
  closed: ClosedItem[];
}

/**
 * Build a full snapshot of everything on the device.
 *
 * @param now Snapshot time; defaults to now.
 */
export async function buildExport(
  storage: Storage,
  now: number = Date.now(),
): Promise<DreyExport> {
  const [items, closed] = await Promise.all([storage.listItems(), storage.listClosed()]);
  return { version: EXPORT_VERSION, exported_at: now, items, closed };
}

/** Serialise a snapshot to pretty-printed JSON for download. */
export function serializeExport(data: DreyExport): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Restore a snapshot, replacing current data. Validates the envelope shape and
 * version before writing anything.
 *
 * @throws If the payload is not a recognised Drey export.
 */
export async function importExport(storage: Storage, raw: string): Promise<void> {
  const parsed = JSON.parse(raw) as Partial<DreyExport>;
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    parsed.version !== EXPORT_VERSION ||
    !Array.isArray(parsed.items) ||
    !Array.isArray(parsed.closed)
  ) {
    throw new Error('Unrecognised export file.');
  }

  for (const item of parsed.items) {
    await storage.saveItem(item);
  }
  for (const record of parsed.closed) {
    await storage.saveClosed(record);
  }
}
