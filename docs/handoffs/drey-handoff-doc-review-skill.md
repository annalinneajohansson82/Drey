# Drey: Session Handoff
*Focus: Discussion — skill for multi-persona adversarial doc review*
*Generated: 2026-06-16*

## Project context

Drey is a small, calm, donationware app for capturing ideas/projects and setting them down without guilt, with low-friction re-entry later. Design phase; no production stack chosen yet.

Read these before anything else:
- `docs/handoffs/drey-handoff-main.md` — project framing, constraints, vocabulary, open questions
- `docs/voice-and-principles.md` — soul, voice rules, design principles (source of truth)
- `docs/plans/data-model.md` — minimal data model (four open questions remain)
- `docs/plans/capture-surface-brief.md` — locked design brief for the capture surface
- `PRODUCT.md` — product overview
- `DESIGN.md` — design system seed

## What was done this session

1. Ran an adversarial doc review of all Drey project docs from five role perspectives: Project Owner, PM, Developer, Designer, QA/Tester.
2. Published review to `docs/reviews/adversarial-review-2026-06-15.md`.
3. Merge of `main` into `docs/data-model` added `PRODUCT.md` and `DESIGN.md`.
4. Re-ran the review after the merge — updated the same file, flagged remaining gaps.
5. Updated `docs/handoffs/drey-handoff-data-model.md` to fix stale references (wrong filename, outdated skill suggestions).

Current branch: `docs/data-model`.

## Current state of docs

### Exists and current
- `AGENTS.md` — project index, hard constraints, key files
- `PRODUCT.md` — product overview, users, anti-references, design principles, accessibility targets
- `DESIGN.md` — design system: color, typography, elevation, do's/don'ts. Token values TBD at implementation. Components section empty (intentional).
- `docs/voice-and-principles.md` — soul, voice rules, vocabulary, flinch test, design principles
- `docs/plans/data-model.md` — Item entity, 4 states, PutDownNote, AppetiteTags, JSON-per-item storage. 4 open questions in section 9.
- `docs/plans/capture-surface-brief.md` — locked brief for capture surface. States, interaction model, exact copy.
- `docs/handoffs/drey-handoff-main.md` — primary handoff. Open questions, next actions, constraints.
- `docs/handoffs/drey-handoff-data-model.md` — session handoff for data model work (now updated).
- `docs/reviews/adversarial-review-2026-06-15.md` — full adversarial review with per-role findings and priority table.

### Still missing (from review)
- No stack decision documented
- No roadmap or phased plan
- No decision log
- No acceptance criteria or test strategy
- No retrieval surface design brief
- 3 dangling file references (typeset.md, animate.md, harden.md)
- No API/operations contract for data model

## Focus for next session

**Topic:** Discuss and possibly create a Hermes skill for running multi-persona adversarial reviews of project documentation.

The review done this session is the reference example. It covered:
- Reading all project docs
- Assuming 5 roles (Owner, PM, Developer, Designer, QA)
- For each role: what's good, what needs work, what's missing
- Writing findings to `docs/reviews/`
- Prioritized action table

The skill would formalize this so it can be run on any project. Key questions to discuss:
1. Should the skill be project-agnostic or Drey-specific?
2. Which personas to include (the 5 above, or configurable)?
3. Output format and location
4. How to handle docs that are referenced but missing vs. docs that simply don't exist yet
5. Whether to include an automated "check that referenced files exist" step
6. How the skill should interact with the reviewee (ask questions or just report?)

## Suggested skills for next session

- `hermes-agent-skill-authoring` — for writing the actual SKILL.md
- `plan` — if the discussion needs structure before writing

## Working preferences

- Lead with the answer, structure over prose, max 2-3 options.
- No em dashes. No motivational filler. No sycophancy.
- JSDoc on all JS/TS (hard requirement). PHPDoc on all PHP (hard requirement).
- Code in fenced blocks with language tags.
