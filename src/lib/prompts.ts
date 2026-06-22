import type { PutDownNote } from '../types/item';

/** A single put-down prompt: the field it fills and the question shown. */
export interface PutDownPrompt {
  key: keyof PutDownNote;
  question: string;
}

/**
 * The put-down prompts, in the order they are shown. Each is individually
 * skippable; reaching "Set down" from any prompt (including the first) is a
 * complete act. Wording is the source of truth for re-entry display.
 */
export const PUT_DOWN_PROMPTS: readonly PutDownPrompt[] = [
  { key: 'left_off', question: 'Where did you leave off?' },
  { key: 'next_step', question: 'What would the next small step be?' },
  { key: 'draw', question: 'What drew you to this?' },
  {
    key: 'reminder',
    question:
      'Anything you want to be sure not to forget if you pick this back up later?',
  },
];

/** The single close prompt. Opposite act to put-down; never shares its wording. */
export const CLOSE_PROMPT = 'Any final thoughts on this before it’s closed?';
