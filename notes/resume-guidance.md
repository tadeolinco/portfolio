# Resume guidance for agents

Operational guide for editing `/resume` and job-facing copy. **Ubiquitous language** (term definitions, career narrative vocabulary) lives in [CONTEXT.md](../CONTEXT.md). **Unravel metrics and bullet candidates** live in [unravel-work/](./unravel-work/).

## Source files

| What | Path |
| --- | --- |
| Resume data | `src/app/resume/resume-content.ts` |
| Resume page | `src/app/resume/page.tsx` |
| Work history detail | `notes/unravel-work/` |

After substantive edits, run `npm run lint`. Follow `.cursor/rules/copywriting.mdc` and `.cursor/rules/commit-message.mdc`.

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
- Breadth: data upload, emissions dashboards, reporting/disclosures, PCF, Sustainability Copilot/agents, onboarding, platform quality
- Differentiators: chart builder ROI ($10K+ vendor avoided, 3 weeks, 70+ post-launch feedback items), production support ownership (~24 min median first response on urgent issues in sampled threads)

## Resume review (strategy)

Last reviewed: Jul 2026. Compared `resume-content.ts` to `notes/unravel-work/`.

### Overall read

Strong at the top (Unravel): outcomes, numbers, ownership. Weaker in the middle (Pomelo Pay, some older bullets). Resume **under-represents** emissions dashboards, analytics, reporting, and PCF; **over-represents** production support relative to feature delivery. Tune by target role.

### Header and positioning

| Current | Issue | Suggestion |
| --- | --- | --- |
| Title: "Frontend Engineer" | Current role is Senior | **Senior Frontend Engineer** (optionally "· B2B SaaS") |
| Focus line | Generic | Specific domain: B2B SaaS, enterprise data workflows, Sustainability Copilot UX, climate tech |
| No location | Recruiters filter on this | **Singapore** |

Optional: GitHub link; drop public phone if spam is a concern.

### Skills section

Problems: "GitHub" is not a skill; "TanStack" too vague; missing design systems, i18n, E2E, streaming/AI UI; inconsistent casing (`Typescript` → TypeScript).

Example grouped list: React, TypeScript, Next.js, TanStack (Query/Router/Table), Tailwind CSS, design systems (MUI), Playwright E2E, Supabase, streaming/AI chat UX, i18n, Vite. Tailor per application.

### Unravel Carbon bullets (keep 4; rotate by job)

**Keep as anchors:**

1. **Chart builder** — $10K+ vendor avoided, 3 weeks, 70+ feedback items.
2. **Sustainability Copilot** — chat UX, tool artifacts, streaming; enterprise sustainability teams.

**Revise or compress:**

3. **Production support ownership** — strong differentiator but long; compress triage + in-app reporting into one line if tight on space.
4. **Data upload** — good domain signal; trim jargon (OCR, GHG category lists) unless climate-tech role.

**Swap in (pick 1 to 2 by job posting):**

- Emissions dashboards / Track module (Scope 1/2/3, drill-down, benchmarking)
- Disclosure / ISSB reporting UI
- PCF (assessment library, BOM upload, templates, compare)
- Platform quality (Playwright E2E, i18n including Japanese, Sentry/PostHog)

**Default four:** Sustainability Copilot · chart builder · emissions dashboards *or* data upload · production support ownership *or* platform quality.

### Pomelo Pay

Biggest weak spot. Short tenure plus vague bullets reads like filler. Use **Restructuring exit** and **Quick landing** from CONTEXT.md for honest framing—not a performance story.

Options: one outcome-focused bullet; dates only; never leave vague bullets.

### Older roles

Compress pre-2022 to 1 to 2 bullets each. Keep Insync (virtualization, TS migration) and Stratpoint (Globe, React Native). Trim process narration (JIRA, "worked as").

### Side projects

**Can Book** (**Flagship side project**) leads the section; link canbook.sh prominently.

Expenses Tracker and Workout Tracker: personal apps in daily use; can combine into one line if space is tight.

### Role-targeting cheat sheet

| Applying for | Lead with | De-emphasize |
| --- | --- | --- |
| AI / agent products | Sustainability Copilot, streaming UX, Gap Analyzer | Data upload minutiae |
| Senior frontend / product eng | Chart builder ROI, upload + emissions dashboards breadth | Bug ticket counts |
| Platform / quality | Platform quality, E2E, i18n, Sentry | Early-career detail |
| Startup IC | Production support ownership, chart builder speed, Can Book | Long history section |
| Enterprise / climate tech | Scope 1 to 3, ISSB, PCF, enterprise upload | Side projects (unless full page) |

### Priority fixes

1. Rewrite or minimize Pomelo Pay (with restructuring-exit context).
2. Swap one Unravel bullet for emissions dashboards.
3. Fix header: Senior title, Singapore, specific focus line.
