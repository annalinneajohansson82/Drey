import { useState } from 'react';
import type { PutDownNote } from '../types/item';
import { PUT_DOWN_PROMPTS } from '../lib/prompts';

/** Props for {@link PutDownFlow}. */
interface PutDownFlowProps {
  /** Commit the set-down with the collected answers. */
  onCommit: (note: PutDownNote) => void;
  /** Abandon the flow without setting the item down. */
  onCancel: () => void;
}

/**
 * The set-down flow: prompts shown one at a time, in order, each individually
 * skippable. "Set down" is reachable from any prompt, including the first, so a
 * bare set-down is always one action away. Answering none is a complete act.
 */
export function PutDownFlow({ onCommit, onCancel }: PutDownFlowProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<PutDownNote>({});

  const prompt = PUT_DOWN_PROMPTS[index];
  const isLast = index === PUT_DOWN_PROMPTS.length - 1;

  function setCurrent(value: string): void {
    setAnswers((prev) => ({ ...prev, [prompt.key]: value }));
  }

  function advanceOrCommit(): void {
    if (isLast) {
      onCommit(answers);
    } else {
      setIndex(index + 1);
    }
  }

  function skip(): void {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[prompt.key];
      return next;
    });
    advanceOrCommit();
  }

  return (
    <div>
      <p className="prompt">{prompt.question}</p>
      <textarea
        className="userinput"
        rows={3}
        value={answers[prompt.key] ?? ''}
        onChange={(e) => setCurrent(e.target.value)}
        aria-label={prompt.question}
      />
      <div className="actions">
        <button type="button" className="btn-primary" onClick={() => onCommit(answers)}>
          Set down
        </button>
        {!isLast && (
          <button type="button" className="btn" onClick={advanceOrCommit}>
            Continue
          </button>
        )}
        <button type="button" className="btn-quiet" onClick={skip}>
          Skip
        </button>
        <button type="button" className="btn-quiet" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
