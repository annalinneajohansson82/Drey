# Adversarial Doc Review: Drey
*Generated: 2026-06-16. Branch: docs/data-model. Method: 5 parallel subagents, condensed role-specific doc bundles.*

---

## Dangling File References

Checked by orchestrator before spawning subagents.

| File | Referenced in | Status |
|------|--------------|--------|
| `animate.md` | capture-surface-brief.md §10 | MISSING |
| `harden.md` | capture-surface-brief.md §10 | MISSING |
| `typeset.md` | capture-surface-brief.md §10 | MISSING |
| `drey-handoff.md` | bare ref in docs | STALE — renamed to `drey-handoff-main.md` |
| `STATUS.md` | referenced somewhere in docs | MISSING |

---

## Role: Project Owner

### AGENTS.md
- GOOD: Soul statement is crisp and unambiguous. Hard constraints are enumerated and machine-readable. Key file index gives a map of the project.
- NEEDS WORK: No version or last-updated date — unclear if current when briefing stakeholders. "Design phase, no stack chosen" should note what decisions are blocking stack choice (the 4 open data-model questions).
- MISSING: Nothing blocking at this level — it's an orientation doc and it orients.

### PRODUCT.md
- GOOD: User portrait is specific and honest (AuDHD named, not euphemised). Problem framing ("re-entry, not productivity") is a one-line answer to any stakeholder question. Anti-references are exact and defensible. Donationware model stated without hedging.
- NEEDS WORK: No success metrics or definition of "done for v1." Accessibility commitments listed but not tied to a testing plan or acceptance gate.
- MISSING: No competitive differentiation summary (why not Obsidian / a text file?). No platform target stated — blocks scope questions.

### docs/voice-and-principles.md
- GOOD: Flinch test is operational — any contributor can self-check. Vocabulary table and example strings remove ambiguity. Nine design principles are ordered and concrete. Settled decisions are explicitly marked.
- NEEDS WORK: v0.5 version label implies it's not locked — should clarify what advances it to v1.0.
- MISSING: Nothing blocking. Strongest document in the set.

### docs/plans/data-model.md
- GOOD: Four-state model maps to product philosophy. Storage path and export strategy are concrete. Closing as one-way irreversible is clearly articulated.
- NEEDS WORK: Four open questions not prioritised or owned — unclear which blocks implementation. AppetiteTags taxonomy is TBD with no decision target.
- MISSING: No migration/versioning strategy for JSON schema. No decision on put-down note history — blocks capture surface implementation.

### docs/plans/capture-surface-brief.md
- GOOD: "Confirmed, locked" status is unambiguous. State table and copy strings are the right level of detail for handoff.
- NEEDS WORK: Three dangling references (animate.md, harden.md, typeset.md) — brief is incomplete as a handoff package.
- MISSING: No definition of "done" for the capture surface. No accessibility acceptance criteria specific to this surface.

### docs/handoffs/drey-handoff-main.md
- GOOD: Current-state snapshot is honest. Next actions are concrete. Full glossary is valuable for onboarding.
- NEEDS WORK: Domain/trademark unverified with no owner or deadline. `drey-handoff.md` bare reference found — will confuse new contributors.
- MISSING: No risk register. No explicit v1 scope boundary — "decide v1 scope" is a next action, not a decision.

### DESIGN.md
- GOOD: CSS tokens defined means a developer can start without a design handoff meeting. Typography choices are specific. Do's and don'ts are short and enforceable.
- NEEDS WORK: Components section empty with no trigger for when it gets populated.
- MISSING: No motion/animation principles beyond the empty reference to animate.md. No dark mode / theming stance.

### Overall — Owner
**Top 3 concerns:**
1. No v1 scope decision. Single most important strategic question — what ships in v1? — remains open. Cannot answer timeline or "what will users get?" until closed.
2. Four open data-model questions without owners or deadlines. Two directly block the locked capture surface spec. If these drift, the "locked" brief unlocks by default.
3. Legal/naming risk unresolved. Domain and trademark unverified, no owner, no deadline. Low-probability, high-consequence, costs little to resolve now.

**Working well:** Philosophical foundation is exceptionally solid. Soul statement, voice-and-principles.md, and hard constraints are clear enough that any contributor can make consistent micro-decisions. Anti-pattern framing is as useful as positive principles.

---

## Role: Project Manager

### AGENTS.md
- GOOD: Hard constraints are unambiguous and non-negotiable — gives PM a clear scope fence.
- NEEDS WORK: "Design phase" not time-boxed. No indication of when the design phase ends or what decision gates close it.
- MISSING: No version target, no milestone definitions, no owner assignments. Cannot derive sprint boundaries from this doc.

### PRODUCT.md
- GOOD: User personas concrete enough to anchor acceptance criteria. Donationware removes revenue-driven scope pressure.
- NEEDS WORK: Design principles not prioritized — when two conflict, no tiebreaker.
- MISSING: No feature list, no MVP definition, no "what is out of scope for v1." Cannot decompose into backlog items.

### docs/voice-and-principles.md
- GOOD: Settled decisions explicitly labelled — directly reduces scope churn risk on UX side.
- NEEDS WORK: Design principles are product guidance, not implementation tasks. PM must manually translate each into work items.
- MISSING: No traceability to backlog. No review/sign-off record.

### docs/plans/data-model.md
- GOOD: 4-state model and transitions are well-defined — sprint-ready for a data layer ticket.
- NEEDS WORK: 4 open questions unowned and undated. Each is a potential sprint blocker.
- MISSING: No decision deadline on open questions. No indication of which must resolve before coding vs. which can be deferred.

### docs/plans/capture-surface-brief.md
- GOOD: "Confirmed, locked" — clearest sprint-ready spec in the project. State table and copy strings give developers direct targets.
- NEEDS WORK: Three missing spec files (animate.md, typeset.md, harden.md) represent undefined sub-tasks that could expand scope mid-sprint.
- MISSING: Effort estimate, acceptance criteria, test definition.

### docs/handoffs/drey-handoff-main.md
- GOOD: Next actions explicitly listed — closest thing to a sprint zero checklist.
- NEEDS WORK: Next actions are undated and unowned. Handoff without assignees and due dates is a parking lot, not a plan.
- MISSING: No record of what was decided vs. deferred. Old `drey-handoff.md` reference — doc hygiene not enforced.

### DESIGN.md
- GOOD: Tokens, colors, typography defined — design system foundation unblocks UI work once stack is chosen.
- NEEDS WORK: Components empty with no marker for when it becomes required.
- MISSING: No readiness gate tied to project milestones.

### STATUS.md (file missing)
- MISSING: **Blocking.** No single source of truth for current project state. PM cannot answer "where are we right now" without reading every doc.

### Overall — PM
**Top 3 concerns:**
1. No backlog exists. No feature list, no ticket decomposition, no MVP definition. Sprint planning is impossible.
2. Open questions are unowned and undated. Potential sprint blockers with no owner, deadline, or escalation path.
3. STATUS.md is missing. Without a living status file, every contributor must re-derive project state from scratch. Ironic given the app's purpose.

**Working well:** Hard constraints are exceptionally clear and stable — scope fence is well-defined. capture-surface-brief.md is genuinely sprint-ready. Settled decisions in voice-and-principles.md reduce rework risk.

---

## Role: Developer

### AGENTS.md
- GOOD: Soul non-negotiables are clear and enforceable as code constraints (no nudges, no streaks, no aggregate counts, dormancy as default).
- NEEDS WORK: No stack chosen — blocked at day zero. No platform target.
- MISSING: Platform target (web? native? Electron? CLI?). Without this: no runtime, no bundler, no file I/O strategy. Local-first + `~/.drey/` path implies desktop or CLI, but nothing confirms this.

### PRODUCT.md
- GOOD: WCAG AA commitment concrete. Donationware means no auth, no accounts, no backend — significant scope reduction.
- NEEDS WORK: `harden.md` (which likely carries WCAG implementation detail) is missing — guessing at focus management and ARIA roles.
- MISSING: Nothing here defines the platform or distribution method.

### docs/plans/data-model.md
- GOOD: Item entity fully specified and buildable as-is. State machine complete with full transition table. Storage path (`~/.drey/items/{id}.json`) concrete. PutDownNote shape defined. Retrieval handle derivation rule unambiguous. Closing = delete file is a clear semantic.
- NEEDS WORK: 4 open questions — three directly affect what to build: AppetiteTags taxonomy blocks tag UI; finished-state behavior unknown; state identifier naming may cause refactor.
- MISSING: AppetiteTags taxonomy values. Finished-state behavior spec. What happens if a JSON file is malformed or missing?

### docs/plans/capture-surface-brief.md
- GOOD: Capture interaction most fully specced surface. Flow is clear: free-text → save → "Saved." + "Set down?" → prompts one-at-a-time. Copy strings complete. Keyboard shortcut specified.
- NEEDS WORK: "Quiet 'Set down?' option" — "quiet" undefined. Need visual weight guidance (opacity? font size? delay?). Prompt sequence order not listed.
- MISSING: `animate.md` — no transition spec; will either ship hard cuts or invent animations that may violate prefers-reduced-motion. `typeset.md` — two-materials rule stated but no per-element spec for capture surface. `harden.md` — no error handling spec, no mobile edge cases (iOS Safari viewport, paste behavior, max content length).

### docs/voice-and-principles.md
- GOOD: Example strings directly usable as literal UI copy. Time-as-location rule precise and implementable.
- NEEDS WORK: Re-entry greeting template — need all null-branch variants. What shows if left_off is null? If all PutDownNote fields are null?
- MISSING: Full re-entry display template with null-branch variants. Without this: inventing fallback copy that may violate the voice.

### DESIGN.md
- GOOD: Color tokens complete and immediately usable. Font choices named. Type scale is numeric and buildable. No shadows is a useful negative constraint. `--max-ch 70ch` gives content column width.
- NEEDS WORK: No spacing scale defined (margin, padding, gap). No breakpoints defined — mobile/desktop autofocus split implies at least one exists.
- MISSING: No spacing/layout tokens. No breakpoint definitions. No component-level token assignments (which color token does the textarea border use?).

### Overall — Developer
**Top 3 concerns:**
1. Platform is undefined. `~/.drey/items/` implies local filesystem but whether this is Electron, Tauri, CLI, or PWA with OPFS changes every dependency and every file I/O call. Cannot write a line of setup code.
2. Three missing spec files block real surfaces. animate.md, typeset.md, and harden.md cover motion (accessibility-critical), the textarea itself (the entire capture primary element), and error/edge-case handling. Will invent requirements if building without them.
3. AppetiteTags taxonomy is open and blocks a feature. Slider input is specified but there are no values to put on it. If taxonomy changes after build, stored JSON values become stale.

**Working well:** Data model is the strongest part of the spec — nearly implementation-ready. State machine, entity shape, storage path, retrieval handle rule all concrete enough to build against today. Hard constraints are precise enough to use as an automated test oracle.

---

## Role: Designer

### PRODUCT.md
- GOOD: User profiles specific enough to design for — AuDHD, developers, writers all share low-distraction, high-legibility preferences. Anti-references are precise and immediately actionable. Accessibility requirements concrete.
- NEEDS WORK: No target screen sizes or primary platform. Accessibility list doesn't address focus ring styling, touch target minimums (44px), or motion-safe defaults.
- MISSING: No visual hierarchy of user needs. Which user type's workflow is v1 primary? Without priority ordering, ambiguity when their needs diverge in a layout decision.

### docs/voice-and-principles.md
- GOOD: Flinch test is practical — apply directly to UI copy and microcopy. Two-tier architecture is a clean constraint. Example strings for all key states. "Warmth comes from restraint" translates directly: no rounded-corner friendliness theater, no illustrated empty states.
- NEEDS WORK: "Put-down and close are opposite acts" (Principle 8) not visualized anywhere. Need to know: different locations on screen? Different affordances? The principle names them distinct but doesn't differentiate them spatially.
- MISSING: No definition of what a "marked room" looks like for pattern view (Principle 6). Post-v1 but its absence means can't design nav/wayfinding that will eventually need to accommodate it.

### docs/plans/capture-surface-brief.md
- GOOD: Scene sentence ("late at night, screen is the only light") is the single best design tool in the entire doc set. State table with exact copy strings directly usable. Anchor references (iA Writer, Field Notes, Reeder) share a coherent aesthetic. "One element in focus at any time" resolves a huge class of layout questions.
- NEEDS WORK: Put-down flow is mentioned as a state but not described visually. "Substantial breathing room above input" — "substantial" needs a token or ratio. Post-save "quiet Set down?" — what visual weight constitutes "quiet"?
- MISSING: `animate.md` — state transitions carry semantic meaning; saved ≠ set down is largely communicated through motion and timing. Cannot finalize composing → saved → put-down sequence. `typeset.md` — brief explicitly reserved this for surface-specific typography decisions; DESIGN.md tokens alone are insufficient. `harden.md` — mobile keyboard behavior, safe area insets, viewport-height changes not covered.

### DESIGN.md
- GOOD: Color system complete and immediately usable — five tokens, coherent hue family, concrete usage rule (accent ≤10%). Typographic scale fully specified. Material distinction (Lora/Inter) functional and memorable. Flat elevation with 1px muted borders is complete vocabulary. Do's and don'ts covers most common designer failure modes.
- NEEDS WORK: Components section empty with no component inventory even as a placeholder list. Can't know what to not design for now and may create layout debt.
- MISSING: No spacing system. Color and type are tokenized; spacing is not. No grid system or layout container rules — know max-ch is 70ch but not if page is centered, what horizontal padding is, or max-width container. No interactive states defined: hover, focus, active, disabled. Accent for save specified at rest; hover/focus behavior unspecified.

### Overall — Designer
**Top 3 concerns:**
1. animate.md, typeset.md, and harden.md all missing and all block finalization of the capture surface. Brief explicitly delegates three design categories to files that don't exist. Can start static composition but cannot deliver a finished, shippable design.
2. No spacing system. Color and typography are tokenized; spacing is not. "Substantial breathing room" is a direction, not a constraint to hand to an engineer. Will make arbitrary spacing decisions that will be inconsistent and hard to maintain.
3. Interactive states (hover, focus, active, disabled) undefined. For a product whose voice is restraint and whose users include keyboard-first developers, focus ring design and hover behavior are not cosmetic — they're part of the voice.

**Working well:** DESIGN.md + voice-and-principles.md + capture-surface-brief.md form an unusually coherent triangle. Color system, material distinction, flinch test, scene sentence, and one-element-in-focus rule together form a working design filter. Copy strings being pre-written means visual hierarchy is pre-decided.

---

## Role: QA/Tester

### PRODUCT.md
- GOOD: User personas specific enough to write accessibility test cases. Problem statement gives a clear rejection criterion for feature scope creep.
- NEEDS WORK: "Low-friction" acceptance criteria are subjective — no latency targets, no interaction count targets. Keyboard navigation listed but scope undefined (what is navigable? what is tab order?).
- MISSING: No error states at product level. No platform/browser matrix. No offline behavior spec.

### docs/plans/data-model.md
- GOOD: State machine gives enough to write state transition tests. "No undo on close" and "closing = delete from disk" are unambiguous destructive action tests. "Most recent put-down note only" is a concrete v1 constraint to test against.
- NEEDS WORK: AppetiteTags slider valid range, default state, and null behavior unspecified. No spec for what happens if a JSON file is malformed or missing on disk.
- MISSING: No error states for storage operations (write failure, disk full, permission denied, concurrent write). No spec for "export = copy dir" when an item is mid-write. Finished-state behavior is an open question — cannot write acceptance criteria for that state. No validation rules on item creation (max length? required fields? empty string?).

### docs/plans/capture-surface-brief.md
- GOOD: State table is the strongest testable artifact in the project. Save triggers (button + Cmd/Ctrl+Enter) explicit. Post-save flow sequenced. Dismiss behavior (no confirmation dialog) is a concrete, testable decision. Mobile/desktop autofocus divergence called out.
- NEEDS WORK: "Quiet" in "quiet Set down? option" undefined. Error retry behavior unspecified (does button re-enable?). Put-down prompts not listed individually.
- MISSING: `animate.md` — cannot write tests for transition timing, reduced-motion behavior, or animation states. `harden.md` — mobile edge cases (keyboard dismiss on iOS, back gesture on Android, viewport resize mid-compose) entirely unspecified. `typeset.md` — no font size, line length, or overflow behavior; cannot write visual regression acceptance criteria. No spec for beforeunload behavior (user navigates away mid-compose on web). No timeout or session behavior.

### docs/voice-and-principles.md
- GOOD: Error copy is verbatim and testable. Time display format ("Set down in October") is explicit with counterexample — strong enough to write a copy-accuracy test. Bare confirmation rule ("one word, full stop, nothing after") is enforceable. No-exclamation-marks and no-imperatives rules can be linted against all UI strings.
- NEEDS WORK: No exhaustive string inventory — cannot confirm coverage. Full set of confirmation contexts not listed.
- MISSING: No spec for empty states beyond capture surface. No error copy for storage failures. No copy spec for close/delete — or confirmation that there is no confirmation dialog for close.

### Overall — QA
**Top 3 concerns:**
1. Three missing spec files (animate.md, harden.md, typeset.md) block an entire test category. Any visual regression suite, reduced-motion testing, or mobile acceptance testing cannot be written until these exist. Hard blocker for front-end QA.
2. Storage error states entirely unspecified. Write failure, disk full, permission denied, malformed JSON, and mid-write export not covered in any doc. The app is local-first — storage reliability is a core contract — but no acceptance criteria for failure paths.
3. Four open questions in data-model.md mean cannot write complete acceptance criteria for the data layer. Finished-state behavior is the most blocking.

**Working well:** Capture surface state table is production-quality for a spec document — can write the majority of capture-surface tests from it today. Voice-and-principles verbatim copy strings and explicit counterexamples are directly testable. Hard constraints phrased as negative rules ("never reaches," "never initiates," "no aggregate counts") are easier to test than positive requirements.

---

## Prioritized Actions

Deduplicated across all 5 roles. Ordered by: blocking count + consequence.

| Priority | Action | Raised by | Impact |
|----------|--------|-----------|--------|
| P0 | Define v1 scope — explicit list of what ships and what doesn't | Owner, PM | Unblocks all planning, sprint, and timeline decisions |
| P0 | Resolve the 4 data-model open questions (assign owner + deadline) | Owner, PM, Dev, QA | Unblocks data layer implementation; 2 of 4 block capture surface |
| P1 | Create `animate.md` — state transitions and motion spec | Dev, Designer, QA | Blocks capture surface finalization, reduced-motion testing |
| P1 | Create `typeset.md` — surface-specific typography spec | Dev, Designer, QA | Blocks capture surface finalization, visual regression testing |
| P1 | Create `harden.md` — mobile edge cases, error states, offline | Dev, Designer, QA | Blocks mobile QA, accessibility testing, error handling |
| P1 | Decide platform target (web/PWA/Electron/Tauri/CLI) | Owner, PM, Dev | Blocks all architectural decisions and dev setup |
| P2 | Create `STATUS.md` — living project status file | PM | Reduces re-entry friction for all contributors (and fits the app's purpose) |
| P2 | Define spacing system — tokenize spacing alongside color and type | Designer | Blocks consistent layout across surfaces |
| P2 | Define interactive states — hover, focus, active, disabled | Designer, Dev | Focus rings and hover behavior are part of the voice, not cosmetic |
| P2 | Verify domain + trademark for "Drey" | Owner | Low-probability but high-consequence naming risk |
| P3 | Advance voice-and-principles.md from v0.5 to v1.0 (clarify what changes to lock it) | Owner | Removes ambiguity about authority of the doc |
| P3 | Define re-entry display null-branch template (all PutDownNote fields empty) | Dev | Prevents invented fallback copy that may violate the voice |
| P3 | Add storage error copy to voice-and-principles.md | Dev, QA | Currently only save failure is covered |
| P3 | Remove or fix `drey-handoff.md` bare reference | PM | Broken pointer confuses contributors |

---

## What's Solid

Unchanged findings from prior review, confirmed by this run:

- **voice-and-principles.md** is the strongest doc in the set. The flinch test is operational. Soul + stances + vocabulary + example strings are clear enough that any contributor can self-check.
- **The data model** is nearly implementation-ready. State machine, entity shape, storage path, retrieval handle rule are all concrete enough to build against today.
- **The hard constraints** are phrased as negative rules — easier to test and enforce than positive requirements. They function as an automated test oracle.
- **capture-surface-brief.md** is the clearest sprint-ready spec in the project, despite the three missing companion files. State table and copy strings are production-quality.
