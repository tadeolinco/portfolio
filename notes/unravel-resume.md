# Unravel Carbon — Resume Bullets

> Evidence-backed. Every claim tied to a PR or verifiable source.  
> Fill in any `[?]` placeholders with outcomes you can confirm from memory, customer data, or internal docs.

---

## Role line (suggested)

**Senior Frontend Engineer** · Unravel Carbon · Nov 2022 – Apr 2026 · Singapore

---

## Option A — 5 bullets (product features + own initiatives)

**1. Feature — Data driller + Audit trail**  
Redesigned the core data exploration UX with a configurable column-based data driller and introduced an audit trail — a full, filterable activity log of data changes across the platform, with column templates and export. The primary tool data-heavy customers use to interrogate and verify their emissions data.

> *Tech: React, Vite, GraphQL, React Query, TypeScript*  
> *Evidence: PRs #1943, #1980 (~21k lines combined, Nov 2024)*

---

**2. Feature — Agents and AI surface**  
Built the frontend for Unravel's AI product across three major iterations: agents dashboard + data transformer (May 2025), data review v2 fused with Unravel AI (Oct 2025 — largest epic at ~70k combined lines), and agents phase 1.2 (Mar 2026). Implemented streaming chat, tool-use artifact rendering where the backend streams annotations that the frontend executes in real time, and entitlement gating for AI features.

> *Tech: React, streaming APIs, tool-use artifact system, React Query*  
> *Evidence: PR #2142 (+10.5k lines), PRs #2470 + #2485 (~70k lines), PR #2726 (+10.3k lines)*

---

**3. Feature — Custom charts and dashboards**  
Built a full self-serve data visualisation product: multiple chart types (grid/line/bar/area, pie, scatter, treemap), AI-powered chart generation from natural language, a drag-and-drop dashboard builder with resizable widgets, a theme builder, and granular access controls (private / workspace / public). Charts export as PNG/SVG with underlying data export.

> *Tech: React, Vite, ECharts (or equivalent), drag-and-drop*  
> *Evidence: PR #2257 (+15k lines, Jul 2025)*

---

**4. Initiative — Version check system**  
Designed and shipped a non-cached Vercel API endpoint to expose the running app version. When a user's cached client is behind the latest release, a `VersionManager` component prompts them to refresh — eliminating stale-cache complaints that previously required manual support intervention. Automated version bumping via a Husky pre-commit hook that writes the API function on every commit.

> *Tech: Vite, Vercel functions, Husky*  
> *Evidence: PR #2334 (Aug 2025); PR description explicitly describes the problem and solution*

---

**5. Initiative — Bug reporting flow + TypeScript overhaul**  
Built an in-app bug reporting workflow with optional session recording (screen, network, console) that auto-populates user/company context and submits via webhook — halving the back-and-forth needed to reproduce issues. Separately, enforced TypeScript strict checking across all apps for the first time by consolidating duplicated component packages into a shared design system, removing 10,500+ lines of redundant code and establishing a zero-error TS baseline across the monorepo.

> *Tech: Screen Capture API, webhooks, TypeScript, shared package architecture*  
> *Evidence: PR #2531 (bug report, Nov 2025); PR #2314 (-10.5k lines, Aug 2025)*

---

## Option B — 2 tight bullets (compressed, one-page friendly)

**1.**  
Led delivery of three flagship features at Unravel Carbon: the data driller + audit trail (core data UX for enterprise customers), the agents and AI surface (streaming chat, tool-use artifact execution, three major releases), and a self-serve custom charts and dashboards product with AI-assisted chart generation and drag-and-drop layout.

**2.**  
Drove three self-initiated platform improvements: a non-cached version-check API that eliminated stale-cache support complaints; an in-app bug reporting flow with session recording and auto-populated context; and a TypeScript strict-checking overhaul across all apps — consolidating duplicate component packages, removing 10,500+ lines of redundant code, and establishing a zero-error TS baseline across the monorepo.

---

## Number sheet (use sparingly on the public resume)

| Stat | Value | Notes |
|------|-------|-------|
| Merged PRs | 1,383 | `gh api` search, author:tadeolinco, is:merged |
| Tenure | Nov 2022 – Apr 2026 (~3.5 yrs) | First/last PR dates |
| Non-merge commits | ~10,030 | `git log --author='Sam Bautista' --no-merges` |
| Bundle reduction | 64% (14 MB → 5 MB) | PR #2621 body, explicit before/after screenshots |
| Lines removed (component cleanup) | 10,500+ | PR #2314 |
| Lines removed (data review v1 deprecation) | 4,400+ | PR #2448 |
| Largest single epic (lines) | ~70k net | PRs #2470 + #2485 (data review v2 + Unravel AI) |

---

## Interview story bank

### Primary (features and initiatives to lead with)

| Story | "Tell me about a time when…" angle | PR(s) |
|-------|-----------------------------------|----|
| Data driller + Audit trail | Designed a configurable data UX from scratch; what tradeoffs did you make? | #1943, #1980 |
| Agents / AI surface | Streaming, tool-use, real-time FE execution of backend annotations | #2142, #2470, #2726 |
| Custom charts | Complex data viz product with AI-assisted generation and drag-and-drop layout | #2257 |
| Version check system | Self-initiated; identified a recurring support pain point and solved it systematically | #2334 |
| Bug reporting flow | Customer empathy; session recording as a debugging tool | #2531 |
| TypeScript overhaul | Technical debt and code ownership; zero-error baseline, -10.5k lines | #2314 |

### Secondary (good supporting stories)

| Story | Angle | PR(s) |
|-------|-------|-------|
| Bundle optimisation | Performance investigation + measurable impact (64%, 14MB → 5MB) | #2621 |
| Sentry hard-refresh diagnostics | Customer-specific production incident (SATS on Edge) | #2887 |
| PCF app from zero | Architecting and scaffolding a full new app | #2053 |
| Yarn 4 migration | Large-scale tooling change across an entire monorepo | #2249 |
