<!-- SEED: re-run /impeccable document once there's code to capture the actual components and their states. -->

---
name: Drey
description: Holds your projects. Holds its tongue.
---

# Design System: Drey

## 1. Overview

**Creative North Star: "The Ordered Studio"**

Drey's visual system is the interior of a perfectly ordered studio: spacious, surfaces clear, nothing on the desk unless it needs to be there. The tools here are the ones someone decided to keep. The light is even; the surfaces perform nothing. Returning to this space feels neutral, not nostalgic. The studio holds; it does not welcome.

Typography is the primary carrier of personality. Two materials: a reading serif for the user's own words (notes, ideas, the things they've set down), and a clean sans for the app's voice (labels, confirmations, timestamps). These two materials are distinct by design. The interface has one voice; the user has another. They never look the same on screen.

Color barely exists. The background is an off-white that reads calmer than pure screen-white — not cream, just quieter. One accent at very low chroma marks primary actions and active state. The system's restraint is the identity.

**Key Characteristics:**
- Off-white surface (not cream — no warmth-by-default)
- Rose-adjacent accent at very low chroma; primary actions and active state only
- Serif for user-authored content; clean sans for UI chrome
- Flat surfaces — no shadows, no layering unless structurally required
- Motion: state-change only; `prefers-reduced-motion` respected on every transition
- Visual references: iA Writer (reading-surface feel), Obsidian (minimal chrome), Bear (typographic quiet — the aesthetic, not the task features)

This system explicitly rejects:
- Notion's calm-but-dense language: sidebars, nested structures, icon-heavy items, the illusion of control through surface complexity
- Gamification visual grammar: streaks, badges, progress indicators, confetti, celebration moments
- Task-manager affordances: checkboxes, due-date stamps, completion states as primary UI chrome

## 2. Colors: The Quiet Palette

Color strategy: **Restrained.** One very low-chroma accent alongside four neutral roles. The palette is monochromatic: all roles share the same hue family (~357°, rose-adjacent) at different lightness levels.

**The Restrained Rule.** Color does almost nothing here. The accent appears on ≤10% of any screen. Its rarity is the signal that something is interactive or selected. Decoration is never a valid reason to add color.

**The Hue Discipline Rule.** All five roles share hue ~357°. The palette is not multi-hue. The accent is not a different color from the ink — it is the same hue at a deliberately saturated midpoint. This coherence makes the system feel settled rather than assembled.

### Primary
- **Muted rose accent** (hue ~357°, L ~0.45, C ~0.07): `#8B5E5E` — primary action buttons, active navigation state, text cursor. Never decorative. White text on filled backgrounds.

### Neutral
- **Off-white background** (hue ~357°, L ~0.975, C ~0.005): `#F7F4F4` — calmer than pure white, not warm enough to read as cream or paper.
- **Near-black ink** (hue ~357°, L ~0.12, C ~0.010): `#1C1818` — body text on all surfaces. 15.4:1 contrast against background (WCAG AAA).
- **Muted text** (~L 0.52, same hue): `#7A6E6E` — timestamps, metadata, secondary labels. 4.6:1 against background (WCAG AA).
- **Surface panel** (~L 0.955, same hue): `#F0ECEC` — secondary regions, set-down prompt containers, re-entry panels.

## 3. Typography

**Body / Content Font:** Lora — warm but not ornate, legible at body sizes. Open source, excellent italic for user-authored emphasis.
**UI Font:** Inter — neutral, excellent at small sizes, open source, tabular nums for timestamps.

**Character:** Two materials; one reading, one functional. The user's own words appear in the serif. The app's own voice — confirmations, labels, timestamps — appears in the sans. This material distinction tells the user whose voice they're reading without any other treatment.

**The Two Materials Rule.** User-authored text (notes, project titles, answers to put-down prompts) renders in the reading serif. App chrome (buttons, timestamps, navigation, bare confirmations like "Saved.") renders in the sans. Never serif for UI actions. Never sans for the user's content body.

### Hierarchy
- **Project title / heading** (sans, medium weight, ~1.125–1.25rem fixed): project names in list and re-entry views.
- **Body / user content** (serif, regular, ~1rem, line-height 1.6–1.7): notes, put-down answers, re-entry displayed text. Max 65–75ch.
- **Label / metadata** (sans, ~0.75–0.875rem, regular): "Set down in October." Timestamps, state descriptions. Never all-caps.
- **Confirmation** (sans, regular, ~0.875rem): "Saved." "Set down." "Archived." One word, full stop, nothing after.

## 4. Elevation

Flat by default. No shadows. Depth is conveyed through the one additional neutral surface layer (background vs panel) and through a single 1px border at `--color-muted` when a container needs legible edges.

**The Flat-By-Default Rule.** If a shadow is appearing, remove it. Ask whether the element needs to feel elevated, or whether it just needs a boundary. A 1px border at muted satisfies boundary needs without introducing material depth. Shadows are not used — not restrained, not refined. Not used.

## 5. Tokens (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-accent:       #8B5E5E;
  --color-background:   #F7F4F4;
  --color-ink:          #1C1818;
  --color-muted:        #7A6E6E;
  --color-surface:      #F0ECEC;

  /* Typography */
  --font-body:    'Lora', serif;
  --font-ui:      'Inter', system-ui, sans-serif;

  /* Scale */
  --text-heading:   1.125rem;
  --text-body:      1rem;
  --text-label:     0.8125rem;
  --text-confirm:   0.875rem;
  --line-height-body: 1.65;
  --max-ch:         70ch;
}
```

## 6. Components

No components yet. Re-run `/impeccable document` once there is code.

Planned primitives: set-down prompt area (the put-down flow), re-entry view (return state), project list item (retrieval result), primary action button, bare confirmation, text input for capture.

## 7. Do's and Don'ts

### Do:
- **Do** use the reading serif exclusively for the user's own words. The material difference is functional: it marks whose voice is on screen.
- **Do** make confirmations one word followed by a full stop: "Saved." "Set down." "Archived." The period is where a lesser app would add comfort. Stop there.
- **Do** display time as location: "Set down in October" rather than "247 days ago."
- **Do** keep background lightness at L ~0.975 or above, chroma ≤0.010. Lower than that reads as paper; higher reads as glare. Warmer than C 0.010 reads as cream-and-comfort-seeking.
- **Do** test every new screen: is color doing anything that value contrast alone couldn't do? If yes, that's decoration. Remove it.
- **Do** add `prefers-reduced-motion` alternatives on every transition — typically an instant switch or crossfade.
- **Do** reflect the user's own words verbatim in re-entry views. Never paraphrase or summarize.

### Don't:
- **Don't** use the accent color for anything other than a primary action or active/selected state. No decorative rules, highlights, or section dividers.
- **Don't** add shadows. No `box-shadow` on any element. Flat.
- **Don't** show aggregate counts: project totals, activity summaries, items-remaining numbers. Counts read as backlog. Backlog reads as debt.
- **Don't** use checkboxes, due-date fields, completion indicators, or priority labels. These are task-manager affordances; Drey is not a task manager.
- **Don't** add streaks, badges, progress bars, confetti, or any moment of congratulation. The reward for completing an action is that the action is done.
- **Don't** build a sidebar, nested structure, or icon-heavy interface. One surface. Minimum chrome.
- **Don't** let the background drift toward cream or paper. Warmth is carried by the accent and ink, not the surface.
- **Don't** use the serif for UI chrome (buttons, labels, confirmations) or the sans for user-authored content. The two-materials rule is not a guideline.
- **Don't** pair border AND shadow on the same element. Pick one. Neither is usually the right answer.
