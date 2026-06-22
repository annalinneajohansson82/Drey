import { useRef } from 'react';

/** Props for {@link DataControls}. */
interface DataControlsProps {
  /** Produce the export payload (pretty JSON). */
  getExport: () => Promise<string>;
  /** Restore from an export payload. */
  onImport: (raw: string) => Promise<void>;
}

/**
 * Quiet export/import controls. The export is the user's data in plain,
 * human-readable JSON: they own it and can take it elsewhere. Kept unobtrusive
 * in the footer, never a feature that reaches for attention.
 */
export function DataControls({ getExport, onImport }: DataControlsProps): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);

  async function doExport(): Promise<void> {
    const raw = await getExport();
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'drey-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function onFile(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const raw = await file.text();
    await onImport(raw);
    event.target.value = '';
  }

  return (
    <div className="actions">
      <button type="button" className="btn-quiet" onClick={() => void doExport()}>
        Export
      </button>
      <button type="button" className="btn-quiet" onClick={() => fileRef.current?.click()}>
        Import
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={(e) => void onFile(e)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
