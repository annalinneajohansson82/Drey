/** Maximum length of a handle derived from content without a natural first line. */
const HANDLE_FALLBACK_LENGTH = 60;

/**
 * Derive an item's retrieval handle from its content.
 *
 * The handle is the first non-empty line of `content`. When there is no natural
 * line break, it falls back to roughly the first {@link HANDLE_FALLBACK_LENGTH}
 * characters. The derivation is never exposed to the user and the result is
 * never stored on an active item.
 *
 * @param content Raw item content.
 * @returns A trimmed single-line handle, or an empty string for empty content.
 */
export function deriveHandle(content: string): string {
  const firstLine = content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (firstLine === undefined) {
    return '';
  }

  if (firstLine.length <= HANDLE_FALLBACK_LENGTH) {
    return firstLine;
  }

  return firstLine.slice(0, HANDLE_FALLBACK_LENGTH).trimEnd();
}
