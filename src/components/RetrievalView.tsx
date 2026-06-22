import { useMemo, useState } from 'react';
import type { Item } from '../types/item';
import { deriveHandle } from '../lib/handle';
import { formatLocation } from '../lib/time';

/** How many results the space will answer with. Retrieval, never inventory. */
const MAX_RESULTS = 7;

/** Props for {@link RetrievalView}. */
interface RetrievalViewProps {
  /** Active living/dormant items to retrieve from. */
  items: Item[];
  /** Open an item for re-entry. */
  onOpen: (id: string) => void;
}

/**
 * Retrieval surface. The user asks; the space answers with one or a few. With no
 * query, nothing is listed (an empty space is correct, not a backlog). There are
 * no counts and never a full list.
 */
export function RetrievalView({ items, onOpen }: RetrievalViewProps): JSX.Element {
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      return [];
    }
    return items
      .filter((item) => item.content.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [items, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <input
        className="userinput findfield"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Find"
        placeholder=""
      />

      {matches.length > 0 && (
        <ul className="results">
          {matches.map((item) => (
            <li key={item.id}>
              <button type="button" className="result" onClick={() => onOpen(item.id)}>
                <span className="handle serif">{deriveHandle(item.content)}</span>
                {item.state === 'dormant' && item.put_down_at !== null && (
                  <span className="meta">Set down {formatLocation(item.put_down_at)}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {hasQuery && matches.length === 0 && (
        <p className="empty">Nothing by that name.</p>
      )}
    </div>
  );
}
