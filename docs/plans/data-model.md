# Data Model: Drey

*Draft 2026-06-14. Status: for review. Stack-agnostic — describes shape, not implementation.*

---

## 1. Core Entity: Item

An item is anything the user has captured. It has content (free text), a state, optional put-down metadata, optional appetite tags, and timestamps.

```
Item {
  id:           UUID
  content:      string        // free text; first line is the retrieval handle (derived, not stored)
  state:        ItemState
  created_at:   timestamp
  put_down_at:  timestamp?    // null if never set down
  put_down:     PutDownNote?
  finished_at:  timestamp?    // null unless explicitly finished
  closed_at:    timestamp?    // null unless closed
  close_note:   string?       // persists after close; input to pattern view
  tags:         AppetiteTags?
}
```

**Retrieval handle.** Not a stored field. Derived at display time from the first line of `content`. Fallback when there is no natural first line: first ~60 characters. The user is never exposed to this derivation.

---

## 2. States

```
ItemState = "living" | "dormant" | "finished" | "closed"
```

| State | Meaning | Where it appears |
|---|---|---|
| `living` | Active — the user is working on it or just captured it | Main view |
| `dormant` | Set down — deliberately paused | Main view |
| `finished` | Declared done by the user | Separate finished area |
| `closed` | Closed — item removed from active space; close note retained | Pattern view only |

**Dormancy is the default healthy state.** An item that has been set down is not overdue, not abandoned and not a problem. The data model makes no distinction between "set down yesterday" and "set down two years ago."

---

## 3. State Transitions

```
living  ──set down──►  dormant
dormant ──pick up───►  living
living  ──finish────►  finished   (opt-in, never pushed)
dormant ──finish────►  finished   (opt-in, never pushed)
living  ──close─────►  closed
dormant ──close─────►  closed
finished──close─────►  closed
```

- There is no transition back from `closed`. The item is gone from active space.
- `finished` items live in a separate area; they are still accessible but not in the main view alongside living/dormant items.
- Setting down and picking up can repeat any number of times. Each set-down may produce a new put-down note; the most recent note is what re-entry shows. Past notes are not preserved in v1.

---

## 4. Put-down Note

Recorded when an item transitions from `living` to `dormant`. All fields are optional. Answering none is a complete act: "Set down."

```
PutDownNote {
  left_off:  string?   // "Where did you leave off?"
  next_step: string?   // "What would the next small step be?"
  draw:      string?   // "What drew you to this?"
  reminder:  string?   // "Anything you want to be sure not to forget if you pick this back up later?"
}
```

**Re-entry display.** When a dormant item is opened, the app shows the most recent put-down note verbatim. Each answered prompt is shown under its question. Unanswered prompts are not shown. If all prompts were skipped, no note section appears — the item is shown without commentary.

**Prompt order at put-down.** Prompts are shown one at a time, in the order above. Each is individually skippable. Reaching "Set down" from any prompt (including the first) is a complete act.

---

## 5. Closed State

### What closing means

Closing removes an item from the user's active space permanently. It is a deliberate, one-way act. Completion is not required — an item can be closed from any state.

Closing is distinct from finishing:

| | Finishing | Closing |
|---|---|---|
| Declares | Done | Done handling |
| Requires completion | Yes | No |
| Remains accessible | Yes, in finished area | No |

The app never initiates closing. It never suggests it. It is always the user's act.

### Transition

One-way. There is no undo.

```
living   ──close──►  closed
dormant  ──close──►  closed
finished ──close──►  closed
```

Once closed, an item does not appear in any active, dormant, or finished view.

### Close note

One optional question before the item is removed:

> Any final thoughts on this before it's closed?

Skippable. Answering nothing is a complete act. **Confirmation:** "Closed." — bare, no tail.

The interface must show the close note persisting visibly at the moment the item is removed. This communicates without explanation that the note is kept and that closing is not deletion.

**Close and put-down ask different questions.** They are opposite acts — put-down means "I'm coming back," closing means "I'm done handling this" — so they must never share a prompt or feel interchangeable.

### What is retained after closing

Closed items are not deleted from disk. A reduced record is kept.

```
ClosedItem {
  id:         UUID
  handle:     string     // first line of original content; stored at close
  closed_at:  timestamp
  close_note: string?
}
```

Fields dropped at close: `content`, `state`, `created_at`, `put_down_at`, `put_down`, `finished_at`, `tags`.

The handle is stored explicitly at the moment of closing, since the source `content` is not retained. Closing is not archiving — the reduced record signals this structurally.

### What closed items are not

- Not an archive. No "all closed items" list exists. Closed items are invisible to the user except through the pattern view.
- Not a recycle bin. There is no restore.

---

## 6. Appetite Tags

Optional, settable at any point — at capture, at set-down, or when handling an existing item. Power "browse by appetite" retrieval: the user asks what fits their current capacity and the app returns matching items, never a full list.

```
AppetiteTags {
  energy:      EnergyLevel?
  engagement:  EngagementType?
}
```

**EnergyLevel** and **EngagementType** taxonomies are open questions for UX design. Rough direction from product framing:

- Energy: low / medium / high
- Engagement: hands-busy (making, physical) / mind-idle (background, low cognitive load) / focused (deep work) / social (involves others)

These are not labels the user manages. The input gesture (slider or equivalent non-deterministic control) keeps the interaction below the level of deliberate classification — approximate is fine, blank is fine. Values can be set or revised whenever the user is handling the item, not only at capture.

---

## 7. Storage Shape

Local-first. One JSON file per item, stored in a flat directory. No database required for v1.

```
~/.drey/items/{id}.json
```

Items in `closed` state are not deleted. They remain on disk so the pattern view can read their close notes. The file for a closed item contains only the fields needed for pattern view: `id`, `closed_at`, `close_note`, and the derived handle.

**Export.** The items directory is the export. Plain JSON, human-readable without tooling.

---

## 8. Pattern View Input

The pattern view reads `close_note` from all `closed` items. It surfaces, never concludes. It is shown only on explicit request, in its own marked area, never inline. It is never the landing view.

Nothing in the data model generates or stores patterns. Patterns are derived at display time and not cached.

---

## 9. Open Questions

1. **Appetite tag taxonomy.** The specific values for `EnergyLevel` and `EngagementType` need UX validation. The input gesture should be a slider or equivalent non-deterministic control — the user approximates, they do not classify. Approximate is fine; blank is fine. This rules out discrete labeled options as the primary input: a dropdown forces a decision; a slider accepts a gesture. Whatever taxonomy underlies the slider must be invisible to the user during input.
2. **Put-down note history.** v1 stores only the most recent note. If the user sets down and picks up an item multiple times, earlier notes are lost. Whether to retain history is a scope decision.
3. **Finished state behavior.** Does finishing an item produce a prompt ("Any thoughts on completing this?"), or is it a silent state change? Not resolved yet.
4. **State taxonomy naming.** The handoff flags this as uncertain pending the data model. Current terms (`living`, `dormant`, `finished`, `closed`) are internal identifiers; display strings come from `voice-and-principles.md`.
