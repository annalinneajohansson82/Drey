import { describe, expect, it } from 'vitest';
import { deriveHandle } from './handle';

describe('deriveHandle', () => {
  it('uses the first non-empty line', () => {
    expect(deriveHandle('Rebuild the synth patch\nsome more detail')).toBe(
      'Rebuild the synth patch',
    );
  });

  it('skips leading blank lines and trims', () => {
    expect(deriveHandle('\n\n   Knitting the grey jumper  \n')).toBe(
      'Knitting the grey jumper',
    );
  });

  it('falls back to the first 60 characters when there is no line break', () => {
    const content = 'a'.repeat(100);
    expect(deriveHandle(content)).toBe('a'.repeat(60));
  });

  it('returns an empty string for empty content', () => {
    expect(deriveHandle('   \n  ')).toBe('');
  });
});
