# Drey: Session Handoff
*Focus: Continue refining the data model*
*Generated: 2026-06-14*

## Project context

Drey is a small, calm, donationware app for capturing ideas/projects and setting them down without guilt, with low-friction re-entry later. Design phase; no production stack chosen yet.

Read these before anything else:
- `docs/handoffs/drey-handoff.md` — project framing, constraints, vocabulary, open questions
- `docs/voice-and-principles.md` — soul, voice rules, design principles (source of truth)
- `docs/plans/data-model.md` — the artifact being refined (current state is correct and committed)
- `docs/plans/capture-surface-brief.md` — locked design brief for the capture surface

## What was done this session

1. Compared handoff doc against actual project state; updated it to reflect completed work (design system, capture surface, bare set-down question resolved).
2. Drafted `docs/plans/data-model.md` from scratch.
3. Refined the data model through discussion:
   - Locked `put_down: PutDownNote?` as a structured object (not a flat string).
   - Renamed prompt fields: `pull` → `draw` ("What drew you to this?"), `future_note` → `reminder` ("Anything you want to be sure not to forget if you pick this back up later?").
   - Clarified `AppetiteTags` are settable at any point (capture, set-down, or when handling an existing item), not only at capture.
   - Documented that the appetite input gesture should be a slider or equivalent non-deterministic control — the user approximates, does not classify.
   - Fixed `put_down_at` comment: "null if never set down" (not "null when living", since a picked-up item retains its last put-down timestamp).

All changes are committed. Current HEAD: `28f0367` (PutDownNote field renames and `put_down_at` comment fix).

## Current state of the data model

See `docs/plans/data-model.md` for the full document. Key shape:

- **Item**: `id`, `content`, `state`, `created_at`, `put_down_at?`, `put_down: PutDownNote?`, `finished_at?`, `tags: AppetiteTags?`
- **PutDownNote**: `left_off?`, `next_step?`, `draw?`, `reminder?` — all optional; bare set-down (none answered) is a complete act
- **AppetiteTags**: `energy: EnergyLevel?`, `engagement: EngagementType?` — taxonomies not yet locked
- **States**: `living | dormant | finished | closed`
- **Storage**: one JSON file per item in `~/.drey/items/{id}.json`; closing deletes the file entirely (close note and pattern view are post-v1)

## Open questions (from doc section 9)

1. **Appetite tag taxonomy** — specific values for `EnergyLevel` and `EngagementType` need UX validation. Slider/non-deterministic input is locked as the gesture; the underlying taxonomy must be invisible to the user.
2. **Put-down note history** — v1 stores only the most recent put-down note. Whether to retain history across multiple set-down/pick-up cycles is a scope decision.
3. **Finished state behavior** — does finishing produce a prompt, or is it a silent state change? Not resolved.
4. **State taxonomy naming** — `living`, `dormant`, `finished`, `closed` are internal identifiers; display strings come from `voice-and-principles.md`. Whether these internal names are final is open.

## Suggested next actions

- Work through open questions 1-4 above, deciding or deferring each.
- Once the data model is settled, proceed to the next handoff action: **decide v1 scope** against the design principles.

## Suggested skills

- `brainstorming` — if any open question needs structured exploration before deciding
- `impeccable` — when the focus shifts to UI/UX surface design

## Working preferences (apply throughout)

- Lead with the answer, structure over prose, max 2-3 options.
- No em dashes. No motivational filler. No sycophancy.
- JSDoc on all JS/TS (hard requirement).
- Bare confirmations match Drey's voice: "Saved." "Set down." — the code follows the same discipline as the product.
