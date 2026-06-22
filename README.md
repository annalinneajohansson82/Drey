# Drey

Holds your projects. Holds its tongue.

A small, calm app for capturing ideas/projects, deliberately *setting them down*
without guilt, and picking them back up later with low-friction re-entry. The
problem it solves is re-entry: returning to a paused project months later without
shame and without reconstructing lost context.

The product principles, voice, and data model live in `docs/` and the root
markdown files; `docs/voice-and-principles.md` is the source of truth.

## Stack

- React + Vite + TypeScript, shipped as an installable, offline-capable PWA.
- All data lives **on-device** in IndexedDB. Nothing is sent to a server; the
  build serves only static assets, so one deployment reaches every install.
- Export/import is plain, human-readable JSON: the user owns their data.

The persistence layer sits behind a `Storage` interface (`src/lib/storage`), so a
future Tauri desktop build can write one JSON file per item without touching the
domain logic.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run test       # unit tests (domain logic)
npm run typecheck  # tsc, no emit
npm run lint       # eslint
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run icons      # regenerate PWA PNG icons from public/icon.svg
```

## Deploy (Cloudflare Pages)

The app is a static SPA. On Cloudflare Pages, connect this repository and set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22

`public/_redirects` routes all paths to `index.html`. No backend, environment
variables, or per-user resources are required.

## Scope

v1 ships the core loop plus close/finish: capture, set-down with put-down note,
re-entry, pick-up, a separate finished area, and one-way close with a retained
close note. Browse-by-appetite, the pattern view, optional skins, and a signed
Tauri desktop build are deferred to later milestones.
