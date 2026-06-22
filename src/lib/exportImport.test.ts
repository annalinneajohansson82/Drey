import { describe, expect, it } from 'vitest';
import { buildExport, importExport, serializeExport } from './exportImport';
import { ItemsService } from './items';
import { MemoryStorage } from './storage/memory';

describe('export / import', () => {
  it('round-trips items and closed records through plain JSON', async () => {
    const source = new MemoryStorage();
    const service = new ItemsService(source);
    const living = await service.capture('Keep working on this', 1000);
    const toClose = await service.capture('Done thinking about this', 1500);
    await service.setDown(living.id, { left_off: 'midway' }, 2000);
    await service.close(toClose.id, 'enough', 2500);

    const snapshot = await buildExport(source, 9999);
    const json = serializeExport(snapshot);

    const target = new MemoryStorage();
    await importExport(target, json);

    expect(await target.listItems()).toEqual(await source.listItems());
    expect(await target.listClosed()).toEqual(await source.listClosed());
  });

  it('rejects an unrecognised payload', async () => {
    const target = new MemoryStorage();
    await expect(importExport(target, '{"nope":true}')).rejects.toThrow();
  });
});
