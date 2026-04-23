# Unravel Carbon — Full Picture

> Personal record of my time as a frontend engineer at Unravel Carbon.  
> Not optimised for one page — written to be honest and complete.

---

## Tenure at a glance

| | |
|---|---|
| **First merged PR** | 2022-11-15 (PR #558 — `fix: Replace Typography with Text/Header`) |
| **Most recent merged PR** | 2026-04-22 (PR #2913 — `feat: implement read-only mode for Custom EF forms`) |
| **Duration** | ~3 years 5 months |
| **Merged PRs (author)** | **1,383** |
| **Non-merge commits** | ~10,030 |
| **Lines touched** | ~727k insertions / ~352k deletions (non-merge commits; includes lockfiles) |
| **Work type split (500-PR sample)** | feat ~41% · fix ~35% · chore/tooling ~6% · release/sync ~18% |

---

## The repository

A **Yarn 4 + Turborepo** monorepo with multiple React + Vite apps deployed on Vercel:

| App | What it is |
|-----|------------|
| `www` | Main customer-facing web app (bulk of my work) |
| `pcf` | Product Carbon Footprint assessment tool |
| `workspace` | Multi-tenant workspace management |
| `admin` | Internal admin panel |
| `esg` | ESG reporting module |
| `gap-analysis-agent` | AI-powered gap analysis product |

Shared packages: `@unravel/lego` (design system), `@unravel/shared` (utils/hooks), `@unravel/types` (GraphQL types).

---

## How the work evolved — by phase

### Phase 1 — Onboarding & product build (Nov 2022 – Dec 2023)

*~651 merged PRs. Sprint-based release cadence (staging + prod each sprint).*

I joined mid-product-build and immediately shipped across the breadth of `www`. The team was moving fast on sprint cadences; my name is on a large share of sprint releases during this period.

**What I worked on:**
- **Emissions overview revamp** (PR #1414, Nov 2023 — +25k lines): Complete rebuild of the L2/L3 emissions breakdown pages. Every scope category (business travel, employee commute, facilities, etc.) got its own page with shared chart components, filters, and a new folder structure.
- **Design system & icons** (PR #1242, Jun 2023; PR #1241, Jul 2023): Migrated from legacy icon set to Untitled UI icons across the entire app; created a common icon component and a docs reference page.
- **Company/org builder** (PR #1293, Jul 2023): Integrated the company info, industry, and org structure builder flows.
- General product work: dashboards, charts, data tables, filter systems, onboarding flows, action plans, upload workflows — steady stream of features and bug fixes throughout.

**Character of the work:** Broad ownership over `www`. Very high velocity, mostly feature work with a lot of visual/UX polish. Design system contribution started here.

---

### Phase 2 — ISSB, Data driller, PCF setup (Oct 2024 – Mar 2025)

*~175 merged PRs. Larger epics; less sprint releases, more feature-branch epics.*

The company made a strategic push on regulatory compliance reporting (ISSB IFRS S2) and a brand-new Product Carbon Footprint app. I was the primary frontend owner of both.

**What I worked on:**
- **ISSB compliance reporting** (PRs #1940, #1944, #1952 — multiple waves, ~65k+ lines combined): Full frontend build for ISSB IFRS S2 — risk/opportunity matrices, scenario analysis, peer comparisons, metric tracking, report export. Multiple staging iterations before going live.
- **Data driller v2 + Audit trail** (PRs #1943, #1980 — ~21k lines combined): Redesigned the data table and drill-down experience. Added audit trail — full activity log for data changes, with column templates, filters, and export. Core product UX for data-heavy customers.
- **PCF app foundation** (PR #2053, Mar 2025 — +25k lines): Scaffolded the entire `pcf` app: authentication, routing, resource forms, lifecycle template management (drag-and-drop lifecycle stages), real-time emissions tracking, new GraphQL queries/mutations, ESLint/Prettier/TypeScript/Vite config from scratch.
- Custom fields, data export improvements, refrigerant improvements.

**Character of the work:** First time owning a full app (PCF) from zero. ISSB was the largest compliance deliverable the company had shipped — tight deadline, high business stakes.

---

### Phase 3 — PCF deepening, agents, i18n, workspaces (Apr – Jul 2025)

*~136 merged PRs. Focus shifted to new product surfaces and platform foundations.*

**What I worked on:**
- **PCF improvements** (ongoing): PICO improvements, motorbike travel mode, LPG fuel, better routing and lazy-loading.
- **Gap analysis agent** (GAA app): End client management, PDF viewer + citation management, analytics integration.
- **Agents dashboard + Data transformer** (PR #2142, May 2025 — +10.5k lines): First version of the agents product surface — dashboard entry point, data transformer agent UI, entitlement gating.
- **Localization / i18n** (PR #2130, Jun 2025 — +17k lines): Full internationalization pass — English/Japanese translation across `www`. Laid the foundation for ongoing Japanese-market work.
- **Workspaces** (PR #2242, Jun 2025 — +6.6k lines): Multi-tenant workspace features for the `workspace` app.
- **Yarn 4 migration** (PR #2249, Jun 2025 — +14.6k/-10.1k lines): Upgraded entire monorepo from Yarn classic/v1 to Yarn v4 (Plug'n'Play). Dependency management, CI, and DX overhaul.

**Character of the work:** More architectural scope — platform tooling (Yarn), new apps (workspace), internationalisation infrastructure. AI product surface starts here.

---

### Phase 4 — Custom charts, component cleanup, version infrastructure (Jul – Sep 2025)

*~176 merged PRs. High velocity; feature + quality in parallel.*

**What I worked on:**
- **Custom charts & dashboards** (PR #2257, Jul 2025 — +15k lines): Full custom data visualisation product: grid/pie/scatter/treemap chart types, AI-powered chart generation from natural language, drag-and-drop dashboard builder with resizable widgets, theme builder, access controls (private/shared/public). Export as PNG/SVG.
- **Component cleanup** (PR #2314, Aug 2025 — -10.5k lines): Removed duplicated `lego` components from `www`, unified into `@unravel/lego` package; migrated shared utilities to `@unravel/shared`; enabled TypeScript strict checks across all apps — first time TS errors were actually enforced repo-wide.
- **Version check system** (PR #2334, Aug 2025): Non-cached Vercel API function to detect stale client versions; `VersionManager` prompts users to refresh when their cached app is outdated. Husky pre-commit hook auto-writes the version check endpoint.
- **NPS feedback flow** (Jul/Aug 2025): Integrated NPS survey and webhook to n8n for automated feedback routing.
- **Decipher AI integration** (Jul 2025): Set up Decipher AI analytics.

**Character of the work:** Mix of significant product feature (custom charts) and major platform quality work (TS enforcement, component deduplication).

---

### Phase 5 — Data review v2 + Unravel AI, bug reporting, custom EF (Sep – Dec 2025)

*~133 merged PRs.*

**What I worked on:**
- **Data review v2 + Unravel AI** (PRs #2470, #2485 — ~70k lines combined, Oct 2025): Epic merge of two major parallel workstreams — a fully rebuilt data review UX (`v2`) and the Unravel AI product surface. Deprecated the old v1 (PR #2448 — removed 4.4k lines) simultaneously.
- **Bug report flow** (PR #2531, Nov 2025 — +3k lines): In-app bug reporting with session recording (screen + network + console capture), auto-populates user/company context, integrates with Mastermind backend webhook. Error boundary auto-triggers recording stop.
- **Custom emission factors** (PR #2593, Dec 2025 — +4.3k lines): Unified creation/edit form for custom EFs, CRUD table (search, export, delete, duplicate), integration into EF search filters.
- Ongoing i18n: Japanese translations for new features added throughout.

---

### Phase 6 — PCF/LCA revamp, bundle optimisation, agents 1.2, custom EF completion (Jan – Apr 2026)

*~128 merged PRs to date.*

**What I worked on:**
- **Bundle size reduction** (PR #2621, Jan 2026): Reduced initial JS bundle from **14 MB → 5 MB (64% reduction)** through strategic code splitting, lazy-loaded routes, manual vendor chunking, and removal of dev-only dependencies (faker, mock files, Cypress files).
- **PCF / LCA major revamp** (PR #2541, Feb 2026 — +25.3k lines): Large-scale overhaul of the PCF app, rebranded/expanded to cover Life Cycle Assessment — projects page, completely new table-style product builder (toggleable columns + sidepeek replacing the old form), bulk upload for processes/products/waste with review flows, new lifecycle stage management, and a PCF AI co-pilot (builder + analysis workflows) with tool-use artifact streaming.
- **Agents phase 1.2** (PR #2726, Mar 2026 — +10.3k lines): Extended agents product surface.
- **Custom EF completion** (PR #2824, Apr 2026 — +7.1k lines): Full `www` integration of custom emission factors — list, table, creation modal, action bar, form split by type (fuel/electricity/PGS), data export + data review wiring, English + Japanese i18n.
- Hard-refresh diagnostics (Sentry captures for SATS customer issue).
- Read-only mode for Custom EF forms (PR #2913, most recent).

---

## Themes across the whole tenure

### Product domains I owned or heavily contributed to

| Domain | Phase | Representative PR(s) |
|--------|-------|---------------------|
| Emissions overview / dashboards | 1–ongoing | #1414, sprint releases |
| Design system (`@unravel/lego`) | 1, 4 | #1242, #2314 |
| ISSB compliance reporting | 2 | #1940, #1944, #1952 |
| Data driller + Audit trail | 2, 4 | #1943, #1980 |
| PCF app (incl. LCA revamp) | 2–3, 6 | #2053, #2094, #2541 |
| Agents / Unravel AI | 3–6 | #2142, #2470, #2726 |
| Localization / i18n (EN + JP) | 3–ongoing | #2130, #2824 |
| Workspaces | 3–ongoing | #2242 |
| Custom charts & dashboards | 4 | #2257 |
| Data review v2 | 5 | #2470, #2448 |
| Custom emission factors | 5–6 | #2593, #2824 |

### Platform / tooling contributions

- **Yarn 4 migration** (PR #2249) — full monorepo PnP upgrade
- **TypeScript enforcement** (PR #2314) — enabled `check-types` across all apps, zero-error baseline
- **Version check system** (PR #2334) — non-cached API + pre-commit hook
- **Bundle optimisation** (PR #2621) — 64% initial bundle size reduction
- **Bug report flow** (PR #2531) — session recording + webhook integration
- **Sentry / observability** — diagnostics for customer-specific issues (hard refresh, error boundary)
- Storybook setup (PR #2785)

### Work type breakdown (from 500-PR sample)

| Type | Share |
|------|-------|
| Feature (`feat:`) | ~41% |
| Bug fix (`fix:`) | ~35% |
| Chore / tooling (`chore:`) | ~6% |
| Releases / sync / misc | ~18% |

### Verified metrics (from PR descriptions)

- **64% initial bundle size reduction** — 14 MB → 5 MB (PR #2621)
- **1,383 merged PRs** over 3.5 years
- Deleted 4,400+ lines when deprecating data review v1 (PR #2448)
- Component cleanup removed 10,500+ lines of duplicate code (PR #2314)

---

## What git cannot show

*(Add from memory as relevant)*

- Customer-facing work: direct support for named enterprise customers (e.g., SATS), debugging production issues from Slack threads
- Product decisions and prioritisation discussions
- Code review load (reviewed many PRs from teammates; not easily queryable)
- Pair programming, onboarding teammates
- Context on which features were built under tight deadline vs. long runway
- Communication with design (Figma-to-code fidelity work)
- On-call and incident response

---

## Appendix: PR cadence by year/month

| Period | Merged PRs |
|--------|-----------|
| 2022 (Nov–Dec) | ~60 |
| 2023 | ~531 |
| 2024 | ~383 |
| 2025 | ~281 |
| 2026 (Jan–Apr) | ~128 |
| **Total** | **~1,383** |

Monthly peak periods: Jan–Feb 2023 (~120 PRs in 2 months); Aug–Oct 2025 (~130 in 3 months).
