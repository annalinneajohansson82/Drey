/**
 * Domain types for Drey, mirroring docs/plans/data-model.md.
 *
 * Timestamps are epoch milliseconds (JSON-friendly, plain-format storage).
 * The retrieval handle is never stored on an active item; it is derived from
 * the first line of `content` at display time (see lib/handle.ts).
 */

/**
 * Lifecycle state of an item.
 *
 * - `living`   active; being worked on or just captured
 * - `dormant`  set down; deliberately paused (the default healthy state)
 * - `finished` declared done by the user; lives in a separate area
 * - `closed`   done handling; removed from active space, reduced record kept
 *
 * Active items (stored in the `items` space) are only ever `living`, `dormant`,
 * or `finished`. A `closed` item is reduced to a {@link ClosedItem} and moved
 * out of the active space, so its state is implicit rather than stored.
 */
export type ItemState = 'living' | 'dormant' | 'finished' | 'closed';

/** The state an active (non-closed) item can hold. */
export type ActiveState = Exclude<ItemState, 'closed'>;

/**
 * Note recorded when an item is set down (living -> dormant). Every field is
 * optional: answering none is a complete act ("Set down."). Re-entry shows only
 * the answered fields, each under its question, verbatim.
 */
export interface PutDownNote {
  /** "Where did you leave off?" */
  left_off?: string;
  /** "What would the next small step be?" */
  next_step?: string;
  /** "What drew you to this?" */
  draw?: string;
  /** "Anything you want to be sure not to forget if you pick this back up later?" */
  reminder?: string;
}

/**
 * Optional capacity tags powering "browse by appetite". Reserved in the data
 * model but unused in v1 (the browse surface is deferred); kept so stored items
 * remain forward-compatible.
 */
export interface AppetiteTags {
  energy?: string;
  engagement?: string;
}

/**
 * A captured idea/project in the active space.
 */
export interface Item {
  /** Stable identifier (UUID). */
  id: string;
  /** Free text. The first line is the retrieval handle (derived, not stored). */
  content: string;
  /** Active state; never `closed` while in the active space. */
  state: ActiveState;
  /** When the item was first captured. */
  created_at: number;
  /** When the item was most recently set down; null if it never has been. */
  put_down_at: number | null;
  /** The most recent put-down note; null if none. v1 keeps only the latest. */
  put_down: PutDownNote | null;
  /** When the item was finished; null unless `state` is `finished`. */
  finished_at: number | null;
  /** Reserved for v1.x browse-by-appetite; unused in v1. */
  tags: AppetiteTags | null;
}

/**
 * The reduced record retained after closing. Closing is one-way and is not
 * deletion: the close note is kept so the (deferred) pattern view can read it.
 * All other fields of the original item are intentionally dropped.
 */
export interface ClosedItem {
  /** Same identifier the active item had. */
  id: string;
  /** First line of the original content, captured at the moment of closing. */
  handle: string;
  /** When the item was closed. */
  closed_at: number;
  /** Optional final thought recorded at close. */
  close_note: string | null;
}
