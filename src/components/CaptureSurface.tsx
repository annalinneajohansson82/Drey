import { useEffect, useRef, useState } from 'react';

/** Props for {@link CaptureSurface}. */
interface CaptureSurfaceProps {
  /** Persist captured content. Resolves once saved. */
  onCapture: (content: string) => Promise<void>;
}

/**
 * The capture surface: a single free-text input. The first line silently
 * becomes the retrieval handle. On desktop the field autofocuses; on touch it
 * waits for a tap, so the keyboard never springs up uninvited.
 *
 * Submission is deliberate (the Save action or Ctrl/Cmd+Enter) so newlines stay
 * available within the captured text.
 */
export function CaptureSurface({ onCapture }: CaptureSurfaceProps): JSX.Element {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      ref.current?.focus();
    }
  }, []);

  async function save(): Promise<void> {
    const content = value.trim();
    if (content.length === 0) {
      return;
    }
    await onCapture(content);
    setValue('');
    ref.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      void save();
    }
  }

  return (
    <div>
      <textarea
        ref={ref}
        className="userinput"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Capture"
        placeholder=""
      />
      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => void save()}
          disabled={value.trim().length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
}
