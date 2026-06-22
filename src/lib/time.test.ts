import { describe, expect, it } from 'vitest';
import { formatLocation } from './time';

describe('formatLocation', () => {
  const oct2025 = new Date('2025-10-14T12:00:00Z').getTime();

  it('states the month without a year within the reference year', () => {
    const now = new Date('2025-12-01T12:00:00Z').getTime();
    expect(formatLocation(oct2025, now)).toBe('in October');
  });

  it('states the year when it differs from the reference year', () => {
    const now = new Date('2026-06-22T12:00:00Z').getTime();
    expect(formatLocation(oct2025, now)).toBe('in October 2025');
  });

  it('never expresses elapsed time', () => {
    const now = new Date('2026-06-22T12:00:00Z').getTime();
    expect(formatLocation(oct2025, now)).not.toMatch(/ago|days|months/i);
  });
});
