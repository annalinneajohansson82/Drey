# Adversarial Doc Review — Drey

*2026-06-15. Updated 2026-06-16 after merge of `main` (added PRODUCT.md, DESIGN.md).*
*Reviewed by role: Project Owner, Project Manager, Developer, Designer, QA/Tester.*

---

## 1. Project Owner

**Lens:** Where are we, how far to go, what's decided vs. open, what can't change.

### Good

- `drey-handoff-main.md` is the strongest doc. Open questions, next actions, and constraints are all listed. The naming history section prevents relitigation.
- `voice-and-principles.md` makes the soul legible and auditable.
- **`PRODUCT.md` now exists** — covers users, purpose, brand personality, anti-references, design principles, and accessibility targets. The "anti-references" section is particularly useful for an owner: it says what the product is not, concretely.

### Needs work

- **No roadmap or milestone doc.** "Decide v1 scope" is a next action but there's no framing of what's in or out, no phased plan, no v1 vs. later breakdown. An owner can't see the trajectory.
- Domain/trademark verification is flagged as open but has no next step, no owner assigned, no deadline. This is a legal risk that needs a date.
- `PRODUCT.md` says "Donationware" but there's no doc covering the actual go-to-market mechanics: where it lives, how the pay prompt works, what "pay" means for a local-first app.

### Missing

- Roadmap or phased plan (even rough: v1 / v2 / never)
- Go-to-market / launch considerations (distribution, platform, donation prompt copy)
- Competitive landscape — what similar tools exist, what makes Drey distinct beyond voice

---

## 2. Project Manager

**Lens:** Current milestone, open questions blocking progress, who decides what, critical path.

### Good

- `drey-handoff-main.md` sections 1–4 (goal, current state, open questions, next actions) are exactly what a PM needs.
- `data-model.md` section 9 (open questions) is well-structured — four items, each with enough context to schedule a decision.
- Handoff doc flags uncertainty explicitly with `[uncertain]` markers.
- `PRODUCT.md` gives clear "what this is not" boundaries via anti-references. Useful for scope control.

### Needs work

- **No living project status doc.** The handoff is accurate now but will drift. A lightweight `STATUS.md` updated at each session boundary would serve this role.
- **No decision log.** Open questions are tracked, but decided questions aren't recorded with rationale. When something gets answered, where does the decision land?
- `drey-handoff-data-model.md` is out of date — references `drey-handoff.md` (wrong filename, should be `drey-handoff-main.md`) and lists suggested skills (brainstorming, impeccable) that don't map to the current workflow.

### Missing

- Decision log (ADR-style or flat list: date, question, decision, rationale)
- Project status doc — the living "where are we" snapshot, separate from the narrative handoff
- Milestone tracking (even informal)
- No timeline or estimate for anything

---

## 3. Developer

**Lens:** What to build, constraints, data model, decided vs. fluid, stack.

### Good

- `data-model.md` is solid. Entity definitions are clear, state transitions are explicit, storage shape is described. A developer could start implementing from this.
- `capture-surface-brief.md` is excellent — states in a table, interaction model is specific, content requirements have exact copy, edge cases (dismiss, error) are covered.
- `voice-and-principles.md` gives clear behavioral constraints (no notifications, no counts, retrieval-first).
- `DESIGN.md` now defines the visual system: color strategy, typography (two-materials rule), flat elevation, do's and don'ts. Components section is empty but marked as intentional — to be filled from code.

### Needs work

- **No stack decision.** AGENTS.md says "stack not yet chosen." The handoff says "likely PWA given frontend background" but it's not resolved. A developer can't start without this. `PRODUCT.md` says "PWA" implicitly by mentioning offline and local-first, but it's not explicit.
- **No API/operations contract.** The data model describes shape but not operations. What are the core functions? What does the put-down flow look like as calls? Need either a sequence diagram or a list of core operations with inputs/outputs.
- **Open question #3 in data-model.md** (finished-state behavior) directly affects what gets built. If finishing produces a prompt, that's a new UI flow. If silent, it's a one-liner. Needs resolving before implementation.
- `capture-surface-brief.md` references `typeset.md`, `animate.md`, `harden.md` as "recommended references" — none of these files exist. Either create stubs or remove the references.
- No error handling strategy beyond the one error string in the capture brief. What happens on corrupt JSON, full disk, duplicate IDs?

### Missing

- Stack choice documented with rationale
- API/operations contract (even informal)
- Technical architecture doc (app structure: main process, renderer, storage layer)
- Build/test/deployment approach
- The three referenced but nonexistent files (`typeset.md`, `animate.md`, `harden.md`) — or remove the references
- `index.html` exists at root (prototype) but no doc explains its status — is it current? The starting point?
- CONTRIBUTING.md or equivalent (setup, run, test)

---

## 4. Designer

**Lens:** What does it look like, visual system, key screens, interaction model, what's locked vs. open.

### Good

- `capture-surface-brief.md` is a proper design brief. Scene sentence, anchor references, locked decisions, state table, interaction model — ready for implementation.
- `voice-and-principles.md` section "Design principles inherited from the voice" translates soul into product decisions a designer can work from.
- Vocabulary table in `voice-and-principles.md` maps actions to neutral and skin variants.
- **`DESIGN.md` now exists** — defines creative north star ("The Ordered Studio"), color palette (monochromatic ~357° hue family, five roles), typography (two-materials rule), flat elevation policy, and a thorough do's and don'ts section. This is a strong foundation.
- `PRODUCT.md` anti-references give clear boundaries for visual direction.

### Needs work

- **Token values are unresolved.** Every color role says "[to be resolved during implementation]." This is marked as intentional in the seed comment, but it means the designer can't hand off a finished spec yet.
- **No components defined.** DESIGN.md section 5 says "No components yet" — the set-down prompt area, re-entry view, project list item, primary action button, and text input are all "planned" but not spec'd.
- **Only one screen is fully spec'd.** Capture surface is locked, but retrieval surface, put-down flow (as separate screens), finished area, settings, and empty states for non-capture views are undesigned.
- **No responsive breakpoints or layout grid.** The brief says "mobile-first responsive" but doesn't define breakpoints or a grid system. DESIGN.md hierarchy gives font sizes but no spacing scale or layout rules.

### Missing

- Resolved design token values (or a plan for when/how they get resolved)
- Component specs (set-down prompt, re-entry view, project list item, primary action button)
- Retrieval surface design brief
- Put-down flow screen designs (beyond what's in the capture brief)
- Finished area design
- Responsive breakpoint definitions and spacing scale
- Icon set / visual language decisions

---

## 5. QA / Tester

**Lens:** What to test, what "done" looks like, edge cases, acceptance criteria.

### Good

- `capture-surface-brief.md` has a state table that doubles as a test matrix. Each state has a "what the user sees" column — that's a testable assertion.
- `data-model.md` defines state transitions explicitly. Each transition is a test case.
- Error string is specified word-for-word, which gives a testable target.
- `DESIGN.md` do's and don'ts are verifiable: "no shadows," "no aggregate counts," "two-materials rule" — these are testable constraints.
- `PRODUCT.md` now states WCAG AA and `prefers-reduced-motion` as explicit targets.

### Needs work

- **No acceptance criteria for any feature.** The capture surface brief describes behavior but doesn't define "done." When can you say the capture surface works?
- **No test strategy.** Manual only? Automated? What's the approach?
- **No edge case coverage.** What happens with very long input? Empty content save? Rapid state transitions? Concurrent edits? The data model says "one JSON file per item" — what happens if two processes write the same file? What happens at 10,000 items?
- **No performance expectations.** At what item count does retrieval degrade? Is there a target?

### Missing

- Acceptance criteria per feature (at minimum: capture surface, put-down flow, retrieval, close)
- Test strategy doc (even one paragraph)
- Edge case catalog
- Performance expectations / targets
- Data migration / versioning strategy (what happens to JSON files when the schema changes in v2?)

---

## Summary: What to do first

| Priority | Action | Blocked role |
|----------|--------|-------------|
| 1 | Decide stack and document it | Developer, PM |
| 2 | Resolve data-model open questions 1–4 | Developer, Designer |
| 3 | Write retrieval surface design brief | Designer, Developer |
| 4 | Resolve design token values (or stub with direction) | Designer |
| 5 | Create acceptance criteria for capture surface | QA, PM |
| 6 | Create a decision log | PM, Owner |
| 7 | Remove or create the three missing reference files (`typeset.md`, `animate.md`, `harden.md`) | Developer |
| 8 | Fix `drey-handoff-data-model.md` — wrong filename reference, stale skill suggestions | PM |

### What this review no longer flags (fixed by the merge)

- `PRODUCT.md` — existed in the review, now created and solid
- `DESIGN.md` — existed in the review, now created as a strong design system seed
- AGENTS.md key files list — now accurate (all referenced files exist)
