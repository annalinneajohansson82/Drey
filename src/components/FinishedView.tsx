import type { Item } from '../types/item';
import { deriveHandle } from '../lib/handle';
import { formatLocation } from '../lib/time';

/** Props for {@link FinishedView}. */
interface FinishedViewProps {
  items: Item[];
  onOpen: (id: string) => void;
  onBack: () => void;
}

/**
 * The finished area: its own marked room, kept apart from living and dormant
 * items. Finished work remains accessible but never crowds the landing. No
 * counts; the items speak for themselves.
 */
export function FinishedView({ items, onOpen, onBack }: FinishedViewProps): JSX.Element {
  return (
    <div>
      <div className="topbar">
        <span className="area-title">Finished</span>
        <button type="button" className="btn-quiet" onClick={onBack}>
          Back
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty">Nothing here.</p>
      ) : (
        <ul className="results">
          {items.map((item) => (
            <li key={item.id}>
              <button type="button" className="result" onClick={() => onOpen(item.id)}>
                <span className="handle serif">{deriveHandle(item.content)}</span>
                {item.finished_at !== null && (
                  <span className="meta">Finished {formatLocation(item.finished_at)}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
