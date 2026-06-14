# Drey: Handoff

### Goal
Build Drey: a small, calm, donationware app that lets a user capture ideas/projects, deliberately *set them down* without guilt, and pick them back up later with low-friction re-entry. The core problem it solves is re-entry: returning to a paused project weeks or months later without shame and without reconstructing lost context.

### Current state
- **Project framing decided.** Not a business venture. Donationware: "good enough to pay for, without the demand to." Success = the tool is useful and gets finished, plus portfolio signal. No revenue pressure, no growth obligations. The reframe is deliberate, to create structure and forward motion without financial/social pressure, since the user's stated core difficulty is that ideas don't fail on their own, their *implementation decays*.
- **Standalone product**, outside the Chaos Inc / chaosgoblin-xyz org. Reasoning: the framing suits a wider audience than developers, and the product identity (voice, trust posture) *is* the differentiator.
- **Working name: Drey.** English, a squirrel's nest (the home base returned to between foraging runs). No app-name collision found in the notes/productivity/memory category. Flagship domains (drey.com/.app/.io) appear taken by unrelated owners; drey.se and prefixed domains (getdrey, trydrey) appear open. `[uncertain]` Domain registration and trademark status NOT authoritatively confirmed; only DNS-proxy and web-search screening done. Verify at a registrar + EUIPO/USPTO before committing.
- **Voice & Principles doc is at v0.5**, at `docs/voice-and-principles.md`. It is the source of truth for soul, register, voice rules, vocabulary, example strings, and design principles.
- **Design system seeded.** `DESIGN.md` defines the visual direction: off-white surface, monochromatic rose-adjacent accent (~357 hue family), two-material typography (reading serif for user content, neutral sans for UI chrome), flat elevation (no shadows). Specific token values to be resolved at implementation.
- **Capture surface designed and prototyped.** `docs/plans/capture-surface-brief.md` is the locked design brief (status: confirmed, ready for implementation). `index.html` is a static prototype. Decisions locked: single free-text input (first line silently becomes retrieval handle), mobile wait-for-tap, desktop autofocus, all put-down prompts skippable.
- **Bare set-down question resolved** (was the gate to the data model): skipping all put-down prompts is a complete, guilt-free act. "Set down." is the confirmation. Re-entry when there is no note shows the item itself; nothing else is required.
- **Soul (non-negotiable):** "The app holds, it never reaches." Three stances: assumes competence; no dopamine hunting; no opinions (incl. no reassurance). The discipline of the full stop: confirm the action, add nothing.
- **Two-tier design:** neutral base (metaphor-free, the actual product) + optional skins (deferred to post-v1). Skins are plural and freely user-selectable, none default: garden skin and squirrel/drey skin may coexist.
- **Naming history (so it isn't relitigated):** Excluded along the way: Until (unsearchable), Mada (weak availability + MadNotes adjacency), Manet (no personality), Cairn/Varda (too thematic), Träda (too many issues), Fallow (fallow.tools adjacent + felt thematic), Geyma (collision: geyma.app is an existing physical-storage inventory app), Hirða/Hirda (clean namespace but anglicized-Icelandic raised a cultural-borrowing question and pronunciation friction). Drey won on: no collision, clean pronunciation, English (no cultural question), and a latent skin that fits the core better than the garden.

### Open questions
1. Domain + trademark verification for Drey (see Current state). Not yet done at a registrar or EUIPO/USPTO.
2. `[uncertain]` Whether "set down" / "save" / "archive" remain the final state taxonomy or get revisited once the data model exists.

### Next actions
1. **Draft a minimal data model.** Now unblocked. Item, its states (living/dormant, finished-opt-in-separate-area, released/archived), the optional put-down note, the optional release note (input to the pattern view), and capture-time tags (e.g. energy level, type of engagement) that power "browse by appetite" retrieval.
2. **Decide v1 scope** against the design principles (retrieval-first, no aggregate counts, app never initiates, local-first storage).
3. **Pick stack** and begin production implementation. Likely PWA given frontend background (React/TypeScript/Astro/Angular); not yet decided.
4. **Confirm Drey availability** at a registrar (drey.se, getdrey.com) and run an EUIPO/USPTO mark check.

### Key constraints
- **Behavioral non-negotiables (from voice doc):** App never initiates (no notifications/reminders/nudges/streaks). Dormancy is the default healthy state in the data model; activity is the exception. Retrieval-first, never list-first as the landing view. No aggregate numbers in view. Putting-down is a first-class action. Patterns are mirrors, shown only on request, in their own marked room, never conclusive. User owns the data structurally: local-first, exportable, plain formats.
- **Voice non-negotiables:** No exclamation marks. No imperatives at the user. No praise, no reassurance, no motivational language, no diagnosis/inference about the user, no apology theater, no urgency/scarcity. Confirmations are bare ("Saved." "Set down." "Archived."). Time as location ("Set down in October"), never countdown ("247 days ago"). Reflect the user's own words verbatim, never paraphrased.
- **Finish state:** opt-in only, never pushed, kept in a separate area from living/dormant items.
- **Release note coupling:** the release prompt ("Any final thoughts on this before it's removed?") and the pattern view evolve together; the released note must be visibly retained at the moment of removal so the prompt never has to explain itself.
- **Audience:** neurodivergent adults (ADHD/autistic/AuDHD), with particular attention to late-identified adults. PDA-informed: self-imposed structure can become a demand, so the tool must never issue demands.
- **Environment/tooling:** continuing in Claude CLI from a local project folder. Stack not yet chosen. `[uncertain]` Likely a web/PWA given the user's frontend background (React/TypeScript/Astro/Angular), but not decided.

### User working preferences (apply when drafting/coding)
- Reply in the language used. Lead with the answer, structure over prose, concise by default, max 2-3 options.
- Never use em dashes or `--` as substitutes.
- Tone: calm, factual, analytical. Name weaknesses and merit. No sycophancy, no motivational filler, no therapeutic framing.
- Code: JSDoc on all JS/TS (hard requirement), PHPDoc on all PHP (hard requirement). Code in fenced blocks with language tags.
- Git branch names: descriptive of intent (what the change does, not how).
- When writing Swedish: spell "symptom" with a p. Don't mix Swedish and English in the same text when a translation exists; italicize untranslatable terms kept in the original language.

### Vocabulary / domain terms
- **Drey** = the project/app. Also literally: a squirrel's nest.
- **The app holds, it never reaches** = the soul / one-line design test. Reaching includes nudges, suggestions, unrequested insight, and reassurance.
- **Set down** = the user deliberately pausing a project (not failing/abandoning it). Partner action: pick up.
- **Re-entry** = returning to a set-down item; the app's signature interaction.
- **Neutral base** = the default metaphor-free product. **Skin** = optional themed vocabulary layer (garden, squirrel), deferred post-v1, freely selectable.
- **Living / dormant items** = active vs. set-down. **Finished** = opt-in, separate area. **Released / archived** = let go; its note feeds the pattern view.
- **Pattern view** = on-request-only mirror of commonalities across released items; surfaces, never concludes.
- **Browse by appetite** = retrieval by current capacity ("what fits low energy / busy hands / bored brain") rather than by list.
- **Flinch test** = "Would this sentence be fine to hear from someone you respect, on a bad day, without flinching?" Plus the second filter: "Is the app stating a fact, or managing my feelings?"
- **Donationware** = the funding/relationship model: payable, but never required.
- **Chaos Inc / chaosgoblin-xyz** = the user's developer portfolio org. Drey is deliberately NOT part of it.
