import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Item, PutDownNote } from './types/item';
import { ItemsService } from './lib/items';
import { IndexedDbStorage } from './lib/storage';
import { buildExport, importExport, serializeExport } from './lib/exportImport';
import { deriveHandle } from './lib/handle';
import { CaptureSurface } from './components/CaptureSurface';
import { RetrievalView } from './components/RetrievalView';
import { ReEntryView } from './components/ReEntryView';
import { PutDownFlow } from './components/PutDownFlow';
import { CloseFlow } from './components/CloseFlow';
import { FinishedView } from './components/FinishedView';
import { DataControls } from './components/DataControls';

/** The single visible surface. One surface at a time, never several at once. */
type View =
  | { kind: 'home' }
  | { kind: 'reentry'; id: string }
  | { kind: 'putdown'; id: string }
  | { kind: 'close'; id: string; handle: string }
  | { kind: 'finished' };

/** Landing sub-mode: capture (default) or find. */
type HomeMode = 'capture' | 'find';

/**
 * Root component. Owns the persistence stack and drives the surface state
 * machine. Confirmations are bare and added by the relevant action; nothing
 * here reaches toward the user.
 */
export function App(): JSX.Element {
  const storage = useMemo(() => new IndexedDbStorage(), []);
  const service = useMemo(() => new ItemsService(storage), [storage]);

  const [items, setItems] = useState<Item[]>([]);
  const [view, setView] = useState<View>({ kind: 'home' });
  const [mode, setMode] = useState<HomeMode>('capture');
  const [confirmation, setConfirmation] = useState('');

  const refresh = useCallback(async () => {
    setItems(await service.list());
  }, [service]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const selected =
    view.kind === 'reentry' || view.kind === 'putdown'
      ? items.find((i) => i.id === view.id)
      : undefined;

  const goHome = useCallback(() => {
    setView({ kind: 'home' });
  }, []);

  async function onCapture(content: string): Promise<void> {
    await service.capture(content);
    await refresh();
    setConfirmation('Saved.');
  }

  function open(id: string): void {
    setConfirmation('');
    setView({ kind: 'reentry', id });
  }

  async function pickUp(id: string): Promise<void> {
    await service.pickUp(id);
    await refresh();
    setConfirmation('Picked up.');
    goHome();
  }

  async function commitSetDown(id: string, note: PutDownNote): Promise<void> {
    await service.setDown(id, note);
    await refresh();
    setConfirmation('Set down.');
    goHome();
  }

  async function finish(id: string): Promise<void> {
    await service.finish(id);
    await refresh();
    setConfirmation('Finished.');
    goHome();
  }

  async function confirmClose(id: string, closeNote: string): Promise<void> {
    await service.close(id, closeNote);
    await refresh();
  }

  const living = items.filter((i) => i.state === 'living' || i.state === 'dormant');
  const finished = items.filter((i) => i.state === 'finished');

  return (
    <div className="app">
      <main className="surface">
        <p className="wordmark">Drey</p>

        {view.kind === 'home' && (
          <>
            <p className="confirmation" role="status" aria-live="polite">
              {confirmation}
            </p>
            <div className="modeswitch">
              <button
                type="button"
                aria-current={mode === 'capture'}
                onClick={() => {
                  setMode('capture');
                  setConfirmation('');
                }}
              >
                Capture
              </button>
              <button
                type="button"
                aria-current={mode === 'find'}
                onClick={() => {
                  setMode('find');
                  setConfirmation('');
                }}
              >
                Find
              </button>
            </div>

            {mode === 'capture' ? (
              <CaptureSurface onCapture={onCapture} />
            ) : (
              <RetrievalView items={living} onOpen={open} />
            )}

            <div style={{ marginTop: '3rem' }}>
              <button
                type="button"
                className="btn-quiet"
                onClick={() => setView({ kind: 'finished' })}
              >
                Finished
              </button>
              <DataControls
                getExport={async () => serializeExport(await buildExport(storage))}
                onImport={async (raw) => {
                  await importExport(storage, raw);
                  await refresh();
                }}
              />
            </div>
          </>
        )}

        {view.kind === 'finished' && (
          <FinishedView items={finished} onOpen={open} onBack={goHome} />
        )}

        {view.kind === 'reentry' && selected && (
          <ReEntryView
            item={selected}
            onPickUp={() => void pickUp(selected.id)}
            onSetDown={() => setView({ kind: 'putdown', id: selected.id })}
            onFinish={() => void finish(selected.id)}
            onClose={() =>
              setView({
                kind: 'close',
                id: selected.id,
                handle: deriveHandle(selected.content),
              })
            }
            onBack={goHome}
          />
        )}

        {view.kind === 'putdown' && selected && (
          <PutDownFlow
            onCommit={(note) => void commitSetDown(selected.id, note)}
            onCancel={() => setView({ kind: 'reentry', id: selected.id })}
          />
        )}

        {view.kind === 'close' && (
          <CloseFlow
            handle={view.handle}
            onConfirm={(closeNote) => confirmClose(view.id, closeNote)}
            onCancel={() => setView({ kind: 'reentry', id: view.id })}
            onDone={goHome}
          />
        )}
      </main>
    </div>
  );
}
