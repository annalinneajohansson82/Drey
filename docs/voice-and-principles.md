# Voice & Principles
*Working document for Drey (working name; English, a squirrel's nest: the home base returned to between foraging runs). Version 0.5. Everything here is open for iteration except the soul.*

---

## The soul

**The app holds, it never reaches.**

It holds your projects, holds your patterns, holds its tongue. Every feature, every string, every design decision is checked against this. If something reaches toward the user (a nudge, a streak, a suggestion, an unrequested insight, a reassurance) it is wrong, no matter how well-intentioned.

Reassurance counts as reaching. When the app tells you "nothing is owed" or "no effort is wasted," it is forming an opinion about how you might feel and trying to manage it. That is the app reaching for your emotional state through words. Confirming an action and then comforting you about it are two different acts; the app does the first and never the second.

Three stances follow, all non-negotiable:

1. **Assumes competence.** The user is a capable adult having a normal experience. Not a patient, not a child, not a problem to be managed. The app never explains what the user already knows, never softens information into mush, never reassures, never congratulates anyone for existing.
2. **No dopamine hunting.** The app does not want the user's attention. No streaks, no confetti, no points, no engagement loops, no celebration. The reward for using the app is that the thing the user wanted done is done.
3. **No opinions.** The app states facts and asks questions. It does not evaluate, diagnose, encourage, warn, or reassure. "Set down in October" is a fact. "You should pick this back up" is an opinion. "No effort is wasted" is a kind opinion, which is still an opinion. "You always abandon craft projects" is an accusation built from the user's own data, which is the worst opinion of all.

**The discipline of the full stop:** confirm the action, add nothing. "Saved." "Set down." "Archived." The period is exactly where a lesser app would add comfort. We stop there. Reassurance is the user's job, not the app's.

---

## Two tiers: neutral base, optional skin

The metaphor is structural, not decorative. A theme heavy enough to *notice* is itself a reach: it makes the user register that the app is trying to shape how they feel. So the baseline ships metaphor-free, and the garden (if it ships at all) is an opt-in skin for people who want it.

**Neutral base (default).** Quiet typography, no mascot, no identity performance. Looks at home for a developer, writer, or designer. This is the product.

**Optional skins (later).** Themed vocabularies for users who find them warming rather than twee. Never the default, never assumed, and freely selectable; more than one can exist and the user picks among them at will.

- *Garden skin.* Seasons vocabulary: planting, resting, composting. Frames dormancy as lifecycle.
- *Squirrel / drey skin.* Caching vocabulary, leaning on the name. A drey is the nest a squirrel returns to between scattered foraging runs, which maps to the app's core (store, scatter, return, sometimes forget, that's fine) more closely than the garden does. Guardrail: the joke is always *with* the user, never *at* them. The squirrel is skilled (caching is sophisticated animal cognition), not scatterbrained. Any framing that tips into "squirrel brain" self-deprecation breaks the no-shame rule and is out.

The behavioral architecture (dormancy as the default state, time as location rather than countdown, retrieval over confrontation, putting-down as a first-class act) is identical across both tiers. That architecture *is* the nursery soul. The words are just paint.

---

## The register (neutral base)

Unhurried. Matter-of-fact. Plain. Comfortable with silence. States things the way one states the date. Has no feelings about your projects and pretends none.

Warmth, to the extent it exists, comes from restraint and respect: the app treats you as competent and leaves you alone. It does not come from word choice, encouragement, or theme.

### The flinch test

Every string must pass:

> *Would this sentence be fine to hear from someone you respect, on a bad day, without flinching?*

This filters the clinical register (flinch: being handled) and the cute register (flinch: being patronized) in one pass. Add a second filter now:

> *Is the app stating a fact, or managing my feelings?*

If it's managing feelings, cut to the fact.

---

## Voice rules

**Never:**

- Exclamation marks. Anywhere.
- Imperatives directed at the user ("Add your first project", "Try checking in"). Imperatives are demands; demands trigger avoidance.
- Praise ("Great job", "Well done"). Implies evaluation, and that the prior state was failure.
- Reassurance ("Nothing is owed", "No effort is wasted", "It's still part of your history"). The kindest version of an opinion is still an opinion. Confirm and stop.
- Motivational language ("You've got this", "Small steps count"). The audience has been encouraged into nausea. The absence is the feature.
- Diagnosis or inference about the user ("You seem to prefer", "You tend to"). The app surfaces; the user concludes.
- Apology theater ("Oops", "Something went wrong :("). Errors are stated plainly.
- Urgency or scarcity in any form.

**Always:**

- Statements over suggestions. "Your note from October is here" rather than "Want to see your note?"
- Past-tense confirmations that close the action and end there. "Saved." "Set down." "Archived."
- Confirmations are bare. One word where one word does the job. No tail, no "it's here when you return," no comfort after the period.
- Questions only when the app genuinely needs an answer, one at a time.
- Time as location, not countdown. "Set down in October," never "247 days ago."
- The user's own words reflected back verbatim, never paraphrased into the app's interpretation.

---

## Vocabulary

| Action / state | Neutral base (default) | Garden skin (optional) |
|---|---|---|
| Capture | Save / Stored | Plant |
| Dormant | Set down | Resting |
| Close | Close | Compost |
| Finish | (open question, see below) | Harvest |
| Empty state | The space is open | The bed is ready |

"Set down" is the spine of the whole thing: it's the user's chosen verb, it implies deliberate action rather than failure or neglect, and it has a natural partner in "pick up." Re-entry is picking up what was set down.

---

## Example strings (neutral base)

**Capture confirmation**
> Saved.

**Put-down prompts** *(all skippable, shown one at a time)*
> Where did you leave off?
> What would the next step be?
> What was pulling you toward this?
> Anything future-you would want to know?

**Put-down confirmation**
> Set down.

**Re-entry greeting** *(returning to a dormant item)*
> Your note when you set this down last:
> *[user's own words, verbatim]*

**Dormancy display**
> Set down in October.
*(Never "Last edited 247 days ago.")*

**Close prompt**
> Any final thoughts on this before it's closed?
*(The item is closed; this note is kept and is the input to the pattern view. The interface must make the retained note visibly persist at the moment of closing, so the prompt never has to explain itself.)*

**Close confirmation**
> Closed.

**Pattern view, on explicit request only**
> Across what you've closed, these patterns came up more than once: [observed, concrete commonalities].

**Empty state**
> Nothing added yet.

**Error**
> That didn't save. Your text is still in the field. Trying again usually works; copying it somewhere safe first is wise if not.

---

## Design principles inherited from the voice

Product decisions the voice forces:

1. **The app never initiates.** No notifications, reminders, emails, or "we miss you." It speaks when spoken to. Silence is a feature.
2. **Dormancy is the default, healthy state.** The data model treats activity as the exception. A space where everything is set down is a valid space, including this app's own if the user steps away.
3. **Retrieval-first, not list-first.** The full inventory is never the landing view. The user asks ("what fits low energy and busy hands?") and the space answers with one or a few. Browsing everything is a deliberate walk, not a default confrontation.
4. **No aggregate numbers in view.** Counts read as backlog. Backlog reads as debt.
5. **Putting down is a first-class action**, with the same care as starting. It's where re-entry gets cheap.
6. **Patterns are mirrors, shown on request, in their own marked room.** Never inline, never unsolicited, never conclusive.
7. **The user owns the data, structurally.** Local-first, exportable, plain formats. Your data stays yours. This is an architecture decision and the whole trust story in one sentence.
8. **Put-down and close ask different questions.** They are opposite acts (one means "I'm coming back," the other means "I'm done handling this"), so they must never share a prompt. Put-down asks what future-you returning to the item would want to know. Close asks for final thoughts before the item is gone. If the two ever read the same, the app is telling the user it can't tell the acts apart.
9. **The close note is the input to the pattern view.** The item is closed; its close note persists and becomes raw material for patterns. This couples the close prompt and the pattern feature: they evolve together, and the field's existence is justified by the pattern view it feeds. The interface must show the retained note persisting at the moment of closing, so the prompt never has to explain its own mechanics.

---

## Settled

- **Name:** Drey (working). English, a squirrel's nest: the home base returned to between foraging runs. Reads as a clean short name on the surface, with an apt hidden meaning for the curious. English, so no cultural-borrowing question; flagship domains are taken, so launch likely on drey.se or a prefixed domain, which suits a Swedish-built tool. Reversible if it ever needs to be.
- **Finish state:** Finishing is opt-in, never pushed by the app, and finished items live in a separate area from the living/dormant items so the active space stays uncluttered. Finishing is a thing the user may declare, not a goal the app ranks above setting-down.
- **Skins:** Deferred. Ship later or never, never at v1. The neutral base is the product. Multiple skins (garden, squirrel/drey) may coexist and are freely user-selectable; none is the default.

