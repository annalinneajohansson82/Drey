import { useState } from 'react';
import { CLOSE_PROMPT } from '../lib/prompts';

/** Props for {@link CloseFlow}. */
interface CloseFlowProps {
  /** The item's handle, shown so the act is unambiguous and retained on close. */
  handle: string;
  /** Perform the close with the optional note. Resolves once removed. */
  onConfirm: (closeNote: string) => Promise<void>;
  /** Leave without closing. */
  onCancel: () => void;
  /** Return to the landing after the retained note has been seen. */
  onDone: () => void;
}

/**
 * The close flow. One optional prompt, then a one-way removal. At the moment the
 * item leaves the active space its close note is shown persisting, so the act
 * reads as keeping-not-deleting without any explanation. Confirmation: "Closed."
 */
export function CloseFlow({
  handle,
  onConfirm,
  onCancel,
  onDone,
}: CloseFlowProps): JSX.Element {
  const [note, setNote] = useState('');
  const [closed, setClosed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function confirm(): Promise<void> {
    setBusy(true);
    await onConfirm(note);
    setBusy(false);
    setClosed(true);
  }

  if (closed) {
    const retained = note.trim();
    return (
      <div>
        <p className="confirmation">Closed.</p>
        <p className="closing-handle serif">{handle}</p>
        {retained.length > 0 && <p className="answer serif">{retained}</p>}
        <div className="actions">
          <button type="button" className="btn" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="closing-handle serif">{handle}</p>
      <p className="prompt">{CLOSE_PROMPT}</p>
      <textarea
        className="userinput"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        aria-label={CLOSE_PROMPT}
      />
      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => void confirm()}
          disabled={busy}
        >
          Close
        </button>
        <button type="button" className="btn-quiet" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
      </div>
    </div>
  );
}
