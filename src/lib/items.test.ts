import { beforeEach, describe, expect, it } from 'vitest';
import { ItemsService, cleanPutDownNote } from './items';
import { MemoryStorage } from './storage/memory';

describe('cleanPutDownNote', () => {
  it('drops blank and whitespace-only fields', () => {
    expect(
      cleanPutDownNote({ left_off: 'half-wired', next_step: '   ', draw: '' }),
    ).toEqual({ left_off: 'half-wired' });
  });

  it('returns null when nothing was answered', () => {
    expect(cleanPutDownNote({ left_off: '', reminder: '   ' })).toBeNull();
  });
});

describe('ItemsService', () => {
  let storage: MemoryStorage;
  let service: ItemsService;

  beforeEach(() => {
    storage = new MemoryStorage();
    service = new ItemsService(storage);
  });

  it('captures content as a living item', async () => {
    const item = await service.capture('Write the second chapter', 1000);
    expect(item.state).toBe('living');
    expect(item.created_at).toBe(1000);
    expect(item.put_down).toBeNull();
    expect(await service.get(item.id)).toEqual(item);
  });

  it('sets down a living item with a cleaned note', async () => {
    const item = await service.capture('Loom project', 1000);
    const dormant = await service.setDown(
      item.id,
      { left_off: 'warped the loom', next_step: '   ' },
      2000,
    );
    expect(dormant.state).toBe('dormant');
    expect(dormant.put_down_at).toBe(2000);
    expect(dormant.put_down).toEqual({ left_off: 'warped the loom' });
  });

  it('records a null note for a bare set-down', async () => {
    const item = await service.capture('Loom project', 1000);
    const dormant = await service.setDown(item.id, {}, 2000);
    expect(dormant.put_down).toBeNull();
  });

  it('picks a dormant item back up, retaining its last note', async () => {
    const item = await service.capture('Loom project', 1000);
    await service.setDown(item.id, { left_off: 'warped the loom' }, 2000);
    const living = await service.pickUp(item.id);
    expect(living.state).toBe('living');
    expect(living.put_down).toEqual({ left_off: 'warped the loom' });
    expect(living.put_down_at).toBe(2000);
  });

  it('finishes an item silently from dormant', async () => {
    const item = await service.capture('Loom project', 1000);
    await service.setDown(item.id, {}, 2000);
    const finished = await service.finish(item.id, 3000);
    expect(finished.state).toBe('finished');
    expect(finished.finished_at).toBe(3000);
  });

  it('closes an item into a reduced record and removes it from active space', async () => {
    const item = await service.capture('Loom project\nextra detail', 1000);
    const record = await service.close(item.id, '  done with this  ', 4000);
    expect(record).toEqual({
      id: item.id,
      handle: 'Loom project',
      closed_at: 4000,
      close_note: 'done with this',
    });
    expect(await service.get(item.id)).toBeUndefined();
    expect(await storage.listClosed()).toEqual([record]);
  });

  it('keeps a null close note when none is given', async () => {
    const item = await service.capture('Loom project', 1000);
    const record = await service.close(item.id, '   ', 4000);
    expect(record.close_note).toBeNull();
  });

  it('rejects invalid transitions', async () => {
    const item = await service.capture('Loom project', 1000);
    await expect(service.pickUp(item.id)).rejects.toThrow();
    await service.setDown(item.id, {}, 2000);
    await expect(service.setDown(item.id, {}, 3000)).rejects.toThrow();
  });

  it('lists active items newest first', async () => {
    await service.capture('older', 1000);
    await service.capture('newer', 2000);
    const list = await service.list();
    expect(list.map((i) => i.content)).toEqual(['newer', 'older']);
  });
});
