import type { Item } from '../types/item';
import { PUT_DOWN_PROMPTS } from '../lib/prompts';
import { formatLocation } from '../lib/time';

/** Props for {@link ReEntryView}. */
interface ReEntryViewProps {
  item: Item;
  onPickUp: () => void;
  onSetDown: () => void;
  onFinish: () => void;
  onClose: () => void;
  onBack: () => void;
}

/**
 * Re-entry: the item's own words, then any answered put-down prompts shown
 * verbatim under their questions. Skipped prompts are omitted; with no note, the
 * item is shown without commentary. The app reflects, it does not interpret.
 */
export function ReEntryView({
  item,
  onPickUp,
  onSetDown,
  onFinish,
  onClose,
  onBack,
}: ReEntryViewProps): JSX.Element {
  const note = item.put_down;
  const answered = PUT_DOWN_PROMPTS.filter((p) => {
    const value = note?.[p.key];
    return typeof value === 'string' && value.length > 0;
  });

  return (
    <div>
      <p className="content serif">{item.content}</p>

      {item.state === 'dormant' && item.put_down_at !== null && (
        <p className="state-label">Set down {formatLocation(item.put_down_at)}</p>
      )}
      {item.state === 'finished' && item.finished_at !== null && (
        <p className="state-label">Finished {formatLocation(item.finished_at)}</p>
      )}

      {answered.length > 0 && (
        <div className="note">
          {answered.map((p) => (
            <div key={p.key}>
              <p className="question">{p.question}</p>
              <p className="answer serif">{note?.[p.key]}</p>
            </div>
          ))}
        </div>
      )}

      <div className="actions">
        {item.state === 'dormant' && (
          <button type="button" className="btn-primary" onClick={onPickUp}>
            Pick up
          </button>
        )}
        {item.state === 'living' && (
          <button type="button" className="btn-primary" onClick={onSetDown}>
            Set down
          </button>
        )}
        {item.state !== 'finished' && (
          <button type="button" className="btn" onClick={onFinish}>
            Finish
          </button>
        )}
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="btn-quiet" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
