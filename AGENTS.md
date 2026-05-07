# Agent instructions

Context for AI coding agents working in this repository.

## Stack

- **App**: [Next.js](https://nextjs.org) (App Router) + React 19; dev server uses Turbopack (`next dev --turbopack`)
- **UI**: Tailwind CSS 3; global styles in `src/app/globals.css`
- **Components**: [Headless UI](https://headlessui.com)
- **Media / infra**: Cloudinary (`cloudinary`), Vercel Analytics
- **Data scripts**: Node scripts under `scripts/` use Playwright for scraping (see `getFilms.ts`, `getFilmPosters.ts`); `.env` / secrets for API keys and Cloudinary

## Repository layout

| Area | Path |
| --- | --- |
| App routes & layouts | `src/app/` |
| Shared UI | `src/components/` |
| Generated/static film data & CDN map | `src/*.json`, `src/staticImports.ts` (tool-generated when running sync scripts) |
| Shared client helpers | `src/utils/` |
| One-off data / asset pipelines | `scripts/` |

## Cursor rules (read these)

Persistent guidance lives in `.cursor/rules/`:

- **`module-layout.mdc`**: Constants/utilities grouping, one React component per file, export conventions under `src/`.
- **`tanstack.mdc`**: TanStack ecosystem reference (this app is Next-based; rule is general reference).
- **`verbose-variables.mdc`**: Prefer descriptive names; avoid terse indices and vague abbreviations.
- **`commit-message.mdc`**: Commit messages are a single subject line only (no body).
- **`copywriting.mdc`**: UI copy punctuation (single-sentence strings omit trailing period; multi-sentence use normal punctuation), no em dash in project prose.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Start production server | `npm run start` |
| Lint | `npm run lint` |
| Full film data sync pipeline | `npm run sync` |
| Sync from existing export (skip `export-data`) | `npm run sync-file` |

Individual script steps: `export-data`, `convert-json`, `get-posters`, `generate-static-imports`, `sync-cloud` (see `package.json`).

## Testing

- No automated test script in `package.json` today; run `npm run lint` after substantive edits.
- Playwright appears in dependencies for **scraping scripts**, not as a configured app test runner unless you add one.

## Editing discipline

- Prefer verbose, meaningful variable names in new and touched code (see `verbose-variables.mdc`).
- Match existing patterns in the file you touch; avoid unrelated refactors.
- Follow `module-layout.mdc` when adding components, constants, or utilities under `src/`.
- Environment-specific behavior may depend on `.env`; do not commit secrets.
