# Resume guidance for agents

Operational guide for editing `/resume` and job-facing copy. **Ubiquitous language** (term definitions, career narrative vocabulary) lives in [CONTEXT.md](../CONTEXT.md). **Unravel metrics and bullet candidates** live in [unravel-work/](./unravel-work/). **Sam's PR/Slack prose voice** (when ghostwriting updates for Sam) lives in [writing-style.md](./writing-style.md).

## Source files

| What | Path |
| --- | --- |
| Resume data | `src/app/resume/resume-content.ts` |
| Resume variants | `activeResumeVariantId` + `resumeVariants` in `resume-content.ts` |
| Resume page | `src/app/resume/page.tsx` |
| Work history detail | `notes/unravel-work/` |

After substantive edits, run `npm run lint`. Follow `.cursor/rules/copywriting.mdc` and `.cursor/rules/commit-message.mdc`.

## Tailoring for a job post

The public resume supports variants without duplicating the whole page.

1. Open `src/app/resume/resume-content.ts`
2. Set `activeResumeVariantId` to one of: `default`, `climate`, `ai`, `platform`
3. Optionally edit that variant's `focusLine`, `skills`, or `unravelBulletKeys`
4. Add new bullet copy to `unravelBulletPool` if needed, then reference the key from a variant

| Variant | Focus | Unravel bullets (keys) |
| --- | --- | --- |
| `default` | High-growth B2B, enterprise UX, AI, ownership | copilot, chartBuilder, productionSupport, emissionsDashboards |
| `climate` | B2B climate SaaS, domain-specific | copilot, chartBuilder, emissionsDashboards, dataUpload |
| `ai` | AI copilot, streaming, agents | copilot, chartBuilder, platformQuality, productionSupport |
| `platform` | E2E, i18n, design systems | chartBuilder, platformQuality, productionSupport, emissionsDashboards |

Future options: query param (`/resume?variant=ai`), deploy preview per application, or PDF export script.

Default variant uses Option B focus line (industry-agnostic; climate lives in Unravel bullets and `climate` variant).

## Career timeline

| Period | Company | Notes |
| --- | --- | --- |
| Jul 2018 to Jul 2019 | Stratpoint | Frontend; Globe telecom dashboards; first commercial React Native project |
| Jul 2019 to Dec 2020 | Insync | Lead UI; legacy React refactor, virtualization, TypeScript migration |
| Dec 2020 to Sep 2021 | eFeed | Early startup; SlateJS chat, kanban feeds |
| Sep 2021 to Aug 2022 | OOZOU | Full-stack; LMS for client; Singapore relocation; later ~70% layoffs (restructuring exit) |
| Aug 2022 to Oct 2022 | Pomelo Pay | ~2.5 months; minimal or one concrete bullet (see CONTEXT.md: **Pomelo Pay**, **Vague bullet**) |
| Nov 2022 to present | Unravel Carbon | Frontend → Senior Frontend (Apr 2024); primary recent work |

## Unravel work notes

| File | Contents |
| --- | --- |
| [overview.md](./unravel-work/overview.md) | Scope by product area, suggested resume bullets, interview strengths |
| [platform-and-infrastructure.md](./unravel-work/platform-and-infrastructure.md) | i18n, E2E, Sentry, PostHog, design system, tooling |
| [bug-triage-and-support.md](./unravel-work/bug-triage-and-support.md) | Production support, Notion/Slack triage, metrics |
| [slack-praise-and-identity.md](./unravel-work/slack-praise-and-identity.md) | Peer recognition from Slack |

### Headline facts (for bullets)

- ~1,500+ merged PRs over ~3.5 years; continuous production shipping in B2B climate/SaaS
- Largest contribution areas by merged PRs: emissions dashboards (222), data upload (144), data review (101), platform quality (93), AI/Copilot (70)
- Differentiators: chart builder ROI ($10K+ vendor avoided, 3 weeks, 70+ post-launch feedback items), production support ownership (~24 min median first response on urgent issues in sampled threads)

## Resume review (strategy)

Last reviewed: Jul 5, 2026. Compared `resume-content.ts` to `notes/unravel-work/` and [CONTEXT.md](../CONTEXT.md).

### Overall read

You read as a **senior IC who ships B2B product, builds AI UX, and owns production**—not a generic React developer. Unravel bullets are the strongest section: metrics, ownership, domain vocabulary.

Three structural problems:

1. **Title lag** — page says "Frontend Engineer"; current role is Senior since April 2024.
2. **Coverage skew** — resume highlights AI, chart builder, support, and upload, but **emissions dashboards (222 merged PRs) are absent**. That is the largest body of work on the page.
3. **Middle collapse** — Pomelo Pay (~2.5 months) has the weakest bullets on the entire resume. OOZOU bullets are process-heavy. Together they undercut an otherwise strong 3+ year Unravel anchor.

Career arc context (from CONTEXT.md): OOZOU enabled Singapore relocation; employer later restructured (~70% layoffs). Pomelo was a **short stint** between OOZOU and a **quick landing** at Unravel (~3 weeks). None of this is a performance story—do not leave Pomelo looking like unexplained filler.

### Header and positioning

| Current | Issue | Suggestion |
| --- | --- | --- |
| Title: "Frontend Engineer" | Understates seniority | **Senior Frontend Engineer** |
| Focus line: "Startups, high-growth teams: ownership, pace, product-minded work." | Could describe any IC; no domain | Name B2B SaaS + climate/enterprise data + AI product. Example: *"B2B climate SaaS: enterprise data workflows, Sustainability Copilot UX, production ownership."* |
| No location | Recruiters and SG employers filter on this | Add **Singapore** (enabled by OOZOU relocation) |
| Phone on public page | Spam risk | Optional: email + LinkedIn only |

Optional adds: GitHub link if public repos matter for the role.

### Skills section

Current list mixes good signals with noise:

| Problem | Fix |
| --- | --- |
| "GitHub" | Remove; not a skill |
| "TanStack" alone | Specify: TanStack Query, Router, Table (or Start for side projects) |
| "ReactJS", "NextJS", "TailwindCSS", "Typescript" | Normalize: React, Next.js, Tailwind CSS, TypeScript |
| Missing | Design systems, i18n, Playwright E2E (not just Playwright), streaming/AI chat UX, Vite |

Suggested default: React, TypeScript, Next.js, TanStack (Query/Router/Table), Tailwind CSS, MUI, Playwright E2E, Supabase, i18n. Tailor per job.

### Unravel Carbon (4 bullets — rotate by role)

**Current bullets — grade:**

| # | Topic | Grade | Notes |
| --- | --- | --- | --- |
| 1 | Sustainability Copilot + agents | A | Strong for AI roles; names chat UX, artifacts, streaming, enterprise users |
| 2 | Chart builder | A+ | Best bullet: $10K+, 3 weeks, 70+ feedback, POC→prod ownership |
| 3 | Production support | B+ | Differentiating for startups; slightly long; "54 Notion tickets" is redundant with "100+ bugs" |
| 4 | Data upload | B | Good domain signal; jargon-heavy (OCR, fuel/waste/refrigerants) for general FE roles |

**Missing high-value themes** (from work notes contribution counts):

- **Emissions dashboards** (222 PRs) — highest priority swap-in
- **Reporting / ISSB disclosures** (33 merged)
- **PCF** (33 merged)
- **Platform quality** (93 merged): E2E, i18n/Japanese, Sentry, PostHog

**Recommended default set:**

1. Sustainability Copilot + agents (keep)
2. Chart builder (keep)
3. Emissions dashboards *or* data upload (pick by job; default **emissions dashboards** since upload is already represented and dashboards are underrepresented)
4. Production support ownership *or* platform quality (pick by job)

**Draft swap-in bullets** (from work notes, ready to paste/adapt):

- *Shipped emissions dashboards and Track module UX (Scope 1/2/3 drill-down, benchmarking, time-series) for enterprise sustainability teams.*
- *Contributed to PCF: assessment library, BOM upload flows, templates, and product comparison.*
- *Built disclosure and ISSB reporting UI for regulatory and voluntary sustainability reports.*
- *Drove platform quality: Playwright E2E across environments, i18n (including Japanese), Sentry and PostHog observability.*

**Compress production support** if keeping it:

> *Primary frontend owner for production support: triaged 100+ customer-facing bugs, built in-app reporting (platform → Slack → Notion), ~24-minute median first response on urgent issues.*

### Pomelo Pay — fix or minimize

**Current state:** two **vague bullets** ("updated legacy Redux", "introduced best practices"). Worst section on the page.

**Context to use in interviews, not necessarily on resume:** post-OOZOU restructuring environment; ~2.5 months; landed at Unravel within ~3 weeks.

**Resume options (pick one):**

1. **Dates only** — no bullets (cleanest if nothing defensible to quantify)
2. **One concrete bullet** — only if you can name what shipped (e.g. Redux Toolkit migration on specific surfaces)
3. **Never** leave current vague copy

### OOZOU

**Current state:** process narration ("worked as", "translate from JIRA") without outcomes.

**Keep:** Singapore relocation enabled this role; full-stack LMS work (Next.js/NestJS admin CMS, bookings, notifications).

**Suggested rewrite (1 bullet):**

> *Full-stack engineer on a client LMS rebuild (Next.js, NestJS): admin CMS, course management, session bookings, and notification tooling.*

Second bullet optional; compress or drop JIRA wording.

### Older roles (pre-2021)

| Role | Verdict |
| --- | --- |
| **eFeed** | Keep 1 bullet: early startup, SlateJS chat + Pusher, kanban feeds. Drop company-description opener. |
| **Insync** | Keep both: legacy React refactor, virtualization, TS migration. Strong senior signals. |
| **Stratpoint** | Keep 1–2: Globe telecom dashboards + first commercial React Native project. Good name recognition in PH market. |

Target: **1–2 bullets max** per pre-2022 role on a senior resume.

### Side projects

**Can Book** is the **flagship side project** — full product, scraping pipeline, 8+ cinema chains, digest email, TanStack Start. Should lead the section. Make `canbook.sh` a link in the UI if not already.

**Expenses Tracker** and **Workout Tracker**: credible "shipped and used daily" signal but less distinctive. Option: combine into one line to save space for Unravel breadth.

### Education

Fine as-is. No graduation year needed at this seniority.

### Role-targeting cheat sheet

| Applying for | Lead with | Swap in | De-emphasize |
| --- | --- | --- | --- |
| AI / agent products | Sustainability Copilot, streaming UX, Gap Analyzer | Agent artifacts, knowledge vault | GHG category module lists |
| Senior frontend / product eng | Chart builder ROI, emissions dashboards + upload breadth | PCF or reporting if relevant | Bug ticket counts |
| Platform / quality | Platform quality, E2E, i18n, Sentry | Design system contributions | eFeed/Stratpoint detail |
| Startup IC | Chart builder speed, production support ownership, Can Book | Quick landing narrative in interviews | Long pre-2020 history |
| Enterprise / climate tech | Scope 1–3, ISSB, PCF, enterprise upload | Data review, financed emissions | Side projects (unless full page) |

### What to add

1. **Senior Frontend Engineer** title
2. **Singapore** location
3. **Domain-specific focus line**
4. **One emissions dashboards bullet** at Unravel
5. **Sharper skills** (drop GitHub, specify TanStack)
6. **Can Book** as clickable link

### What to remove or shorten

1. Pomelo **vague bullets** (replace or drop entirely)
2. **"GitHub"** from skills
3. **"54 Notion tickets"** (redundant with 100+ bugs)
4. OOZOU **JIRA / "worked as"** phrasing
5. eFeed **company-description** opener (lead with what you built)

### Priority fixes (do these first)

1. Fix header: Senior title, Singapore, specific focus line
2. Swap one Unravel bullet for **emissions dashboards**
3. Rewrite or minimize **Pomelo Pay**

### Interview strengths (not on resume, but support the story)

From work notes — use when bullets cannot fit:

- Breadth across upload, analytics, reporting, AI, admin, industry modules
- 1,500+ PRs, continuous staging/prod delivery
- Enterprise sustainability domain: Scope 1/2/3, PCF, ISSB, materiality, financed emissions
- Production fixes under customer deadlines (SATS, GFG, Lestari, Canon, Sony, MHI)
- Restructuring exit → short stint → quick landing at Unravel (career arc, not performance)
