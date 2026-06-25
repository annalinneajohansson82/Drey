# Design Brief: Capture Surface

*Shaped 2026-06-14. Status: confirmed. Ready for implementation (`/impeccable craft` or freeform).*

## 1. Feature Summary

Where a user first externalizes an idea or project into Drey. The moment of arrival: something moves from head to held space. Scope is the full surface, including chrome, empty state, input, save confirmation, and the optional continuation into put-down.

## 2. Primary User Action

Type something and have it saved. No required structure, but optional input for .

## 3. Design Direction

- **Color strategy:** Restrained (inherits DESIGN.md). Monochromatic ~357deg hue family, near-black ink on off-white, rose accent at very low chroma on the save action only.
- **Scene sentence:** A user late at night at a desk with dim overhead light, something on their mind they want to put somewhere before sleep; the screen is the only light. Forces light mode, relaxed typography, no visual noise.
- **Anchor references:** iA Writer (one thing on screen, the cursor is the interface), Field Notes (single-page discipline), Reeder (quiet chrome).

## 4. Decisions Locked

- **Input shape:** Single free-text area. No separate title field. The first line silently becomes the retrieval handle, read out of what the user wrote, never demanded in. Structure accretes at put-down, not at capture.
- **Mobile keyboard:** Wait-for-tap. The surface does not auto-open the keyboard; a deliberate tap focuses the input. Desktop keeps autofocus (no keyboard cost).
- **Capture-to-put-down flow:** User's choice. Capture saves; the user can optionally continue into put-down in the same session.

## 5. Scope

Full capture surface. Production-quality intent. Mobile-first responsive. Static visual implementation (interactive prototype belongs to `craft`).

## 6. Layout Strategy

The input area is the page. Surface starts empty. The save action appears only once text exists; until then nothing competes with the cursor. Post-save, a quiet secondary option surfaces the put-down continuation. Substantial breathing room above the input; comfortable tap target below. One element in focus at any time.

## 7. Key States

| State | What the user sees | Feel |
|---|---|---|
| Empty (arrival), desktop | Blank surface, cursor ready (autofocus). No placeholder. | Space, no instruction. |
| Empty (arrival), mobile | Blank surface, cursor not active. Tap focuses input and raises keyboard. | Arrives on own terms. |
| Composing | Text appearing. No word/char count. | Uninterrupted. |
| Has content | Save action appears below input. | One clear next step. |
| Saved | "Saved." plus a quiet secondary option: "Set down?" | Done, no pressure to continue. |
| Put-down (optional) | Prompts one at a time, each skippable. | User controls the pace. |
| Set down | "Set down." | Complete. |
| Dismissed without saving | Returns to previous view silently. Nothing confirmed because nothing happened. | No friction, no apology. |
| Error | Error copy below. Text stays in field. | Informed, not alarmed. |

## 8. Interaction Model

- The whole surface is the focus target for the input.
- Desktop: autofocus on load. Mobile: wait-for-tap.
- Save: button, or `Cmd/Ctrl + Enter`.
- After save: micro-pause, then "Saved." The put-down option appears as a quiet secondary label/button, present but not prominent. User can exit from here.
- Put-down continuation: prompts appear one at a time, each skippable (next prompt, or "Set down" to end). Skipping all prompts is a complete act.
- Dismiss: minimal close gesture (X or system back) from all states. No confirmation dialog. Saved items are already held; dismissing just closes.

## 9. Content Requirements

| Element | Copy |
|---|---|
| Placeholder | (none) |
| Save button | Save |
| Save confirmation | Saved. |
| Put-down continuation prompt | Set down? |
| Put-down prompt 1 | Where did you leave off? |
| Put-down prompt 2 | What would the next small step be? |
| Put-down prompt 3 | What was pulling you toward this? |
| Put-down prompt 4 | Anything future-you would want to know? |
| Put-down final action | Set down |
| Put-down confirmation | Set down. |
| Error | That didn't save. Your text is still in the field. Trying again usually works; copying it somewhere safe first is wise if not. |
| Empty state (if shown) | Nothing here yet. The space is open. |

No aggregate counts visible at any point.

## 10. Recommended References

- `typeset.md` — two-material typography (serif for user content, sans for chrome).
- `animate.md` — state transitions: save confirmation, put-down reveal.
- `harden.md` — mobile keyboard UX, offline/error, long-input and paste behavior.

## 11. Retrieval-row rule (carry to retrieval surface)

In retrieval rows, show the derived first line slightly emphasized. The user is never made aware they "wrote a title." Fallback when there is no natural first line: first ~60 chars, wrapping naturally.
