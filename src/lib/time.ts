const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Format a timestamp as a location in time, never a countdown.
 *
 * Drey states *when* something happened the way one states a date ("in October",
 * "in October 2024"), and never as elapsed time ("247 days ago"). The year is
 * shown only when it differs from the reference year, so recent events read as
 * plainly as possible.
 *
 * @param timestamp Epoch milliseconds of the event.
 * @param now Reference time; defaults to the current time. Used for testing and
 *   to decide whether the year needs stating.
 * @returns A phrase like "in October" or "in October 2024".
 */
export function formatLocation(timestamp: number, now: number = Date.now()): string {
  const date = new Date(timestamp);
  const reference = new Date(now);
  const month = MONTHS[date.getMonth()];

  if (date.getFullYear() === reference.getFullYear()) {
    return `in ${month}`;
  }

  return `in ${month} ${date.getFullYear()}`;
}
