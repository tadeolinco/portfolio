# Sam's writing style (for agents)

How Sam usually writes in **PR descriptions** (pre-template body) and **Slack**. Read this when Sam asks you to draft prose in their voice: release notes, PR bodies, Slack updates, kudos, bug replies, standup status, or similar.

**Not covered here:** resume bullets and job-facing copy (see [resume-guidance.md](./resume-guidance.md) and [CONTEXT.md](../CONTEXT.md)); UI strings (see `.cursor/rules/copywriting.mdc`).

**Sources re-checked:** 200 merged Unravel frontend PRs (Jul 2026), ~49 `#product-release` posts, `#bugs`, `#tech-squad`, `#alpha-squad`, `#kudos` via Slack search (Jul 2026).

---

## Voice in one sentence

Direct, practical, slightly informal; structured when the audience is wide (releases, PRs), ultra-terse when the thread already has context (bug fixes, squad chat).

---

## Two registers (know which to use)

| Register | Where | Tone |
| --- | --- | --- |
| **Structured** | PR Problem/Solution, `#product-release`, longer `#bugs` writeups | Clear headings, numbered steps, bullets, entitlement/flag caveats |
| **Casual** | `### Sam's notes` on PRs, `#bugs` ack/fix, `#alpha-squad`, thread replies | First person, lowercase ok, parenthetical asides, emoji, humor |

Sam often uses **both in one PR**: casual `### Sam's notes` up top, then formal Problem/Solution below.

---

## PR descriptions (pre-template)

### Structure (2025–2026 norm)

Most substantive PRs follow:

1. **`### Sam's notes`** (optional) — why this PR exists, how you found the bug, who asked, where to test
2. **`### Problem`** — bullet list of what was wrong or missing
3. **`### Solution`** — numbered list of what changed

Smaller PRs may be **only** Sam's notes (one or two sentences). ~10% of recent PRs have empty bodies (title-only); Sam does not always fill descriptions for trivial or env-branch PRs.

### Problem section

- Bullets start with `-`
- Plain English, but precise (component names, API field names, scale numbers)
- Tie to user pain or discovery path when relevant
- Link to Notion asks, `#bugs` threads, or CS context when that drove the work

**Good (Sam, PR #3102):**

> - User management on the main platform lists all company users with no way to search or narrow by role.
> - Finding a specific person or auditing role assignments requires scanning the full table.
> - [Ask from Amanda](notion-link)

**Bad (too vague / resume voice):**

> - The user management experience was suboptimal for enterprise administrators seeking efficient workflows.
> - Implemented a comprehensive filtering solution to enhance usability.

### Solution section

- Numbered list (`1.`, `2.`, …)
- Imperative or outcome-focused ("Add…", "Remove…", "Centralize…", "Wire X through Y")
- Backtick code identifiers for helpers, enums, URL params
- One idea per step; sub-bullets for details

**Good (Sam, PR #3115):**

> 1. Remove the 500-facility gate so intensity metrics show whenever metrics exist.
> 2. Split intensity drill queries: lighter groups for the intensity widget, full scope groups for the over-time chart overlay.
> 3. Build facility period maps sparsely from drill rows instead of pre-filling every facility and month.

**Bad (marketing / passive):**

> The intensity metrics pipeline was refactored to leverage a more scalable architecture, ensuring improved performance across diverse organizational structures.

### Sam's notes (casual PR voice)

This is the most "Sam" section. Patterns:

- First person: "I just want…", "I've noticed…", "Apparently it was never supported?"
- Discovery story: "Only found out because Vinay was testing…", "Old deprecated help center link still in use."
- Credit others: "Thanks @FinnWoelm for raising this!"
- Humor / personality: `(big surprise)`, `(lol)`, `(AGAIN)`, joke awards ("⭐ **PR review** ⭐")
- Practical test hint: "Testable on dev", "Spot checked the charts in dashboards, looks fine"
- Honest caveats without over-explaining

**Good (Sam, PR #3114):**

> This is technically a security update. Was flagged to upgrade vite (AGAIN) and echarts to 6. Spot checked the charts in dashboards, looks fine. Then noticed a minor bug on the translations for ScopeCategoryBreakdownWidget, so also fixed there.

**Good (Sam, PR #3112):**

> Apparently it was never supported? Only found out because Vinay was testing fuel combined in data export with selecting all columns

**Bad (too formal / no Sam):**

> This pull request addresses Dependabot alerts by upgrading ECharts to version 6. Additionally, a localization defect in ScopeCategoryBreakdownWidget was remediated.

**Bad (over-written):**

> In the course of performing routine dependency maintenance, I identified an ancillary i18n regression that warranted inclusion in this changeset to maintain release quality standards.

---

## Slack

### `#product-release` (primary release voice)

Longest, most polished Slack writing. Pattern:

1. Hook: `<!here>` or "Hello" / feature name / `:mega:`
2. What shipped (numbered, nested `a.` / `i.` when needed)
3. `:white_check_mark:` benefits, `:warning:` caveats, `:bulb:` tips
4. **Customer impact:** named accounts + cc PM/CS (`IXOM, SATS and QSR cc @Laurentia`)
5. **Entitlement / flag warnings** in ALL CAPS or `:alert:` when internal-only
6. Contributors with @mentions and emoji praise
7. Links to app routes, PRD, mastermind entitlement names

**Good (Sam, custom charts release):**

> <!here> Custom charts has been released to production :shipit:
>
> You can navigate to these pages via the sidebar under "Track" -> "Custom dashboards"
>
> Feature includes:
> 1. Custom charts
>     a. Supports bar, line, scatter, pie, treemap charts and a table view
>     ...
>
> Reminder: This is implicitly available for all internal users. To enable this for external users… enable the CustomChartsEntitlement entitlement

**Good (Sam, minor update):**

> Hello minor update on data export, if you select upload job as a column, you can now click on the id to open up the same sidepeek from data history, so you can track which uploads each row come from easier.

**Bad (too corporate):**

> We are pleased to announce the general availability of Custom Charts, empowering stakeholders to unlock actionable insights through flexible visualization capabilities.

**Bad (missing ops detail Sam always adds):**

> Custom charts is live! Check it out under Track.

### `#bugs` (triage and resolution)

Three tiers:

| Tier | When | Example |
| --- | --- | --- |
| **Ack** | Picking up | "Checking this out", "Okay! Will check out" |
| **Fix** | Shipped | "@Person should be fixed!", "should be fixed now :pray-intensifies:" |
| **Root cause** | Complex / CS waiting | `TL;DR:` one dense sentence, then `•` bullets |

**Good (Sam, fix):**

> @Christal Tang should be fixed!

**Good (Sam, TL;DR):**

> TL;DR: Upload job 69a8f770… completed successfully in production, but Rockhampton→Gladstone trips have no distance because the geocoder resolved Gladstone to Oregon, USA (not Queensland, AU), so road-distance lookup returned None.

**Bad (too much process):**

> Hi team, I've investigated this issue and deployed a fix to production. Please verify at your earliest convenience and let me know if you require further assistance.

### `#tech-squad` / standup

Bucket lists with clear labels:

> Shipped:
> 1. …
>
> Shipping this week/UAT:
> 1. …
>
> Made progress / POC:
> 1. …

Short items; no essays.

### `#alpha-squad` / eng coordination

Very terse by default ("prod down?", "Can if no other implications :thumbsup:"). Longer when proposing architecture: context link, "I was thinking of…", explicit open questions for BE ("Is there any concerns from a BE perspective?").

### `#kudos`

Enthusiastic, generous, specific about *what* each person did. Numbered list of people + emoji nicknames (`:kevin-the-lemon:`). Self-deprecating when receiving/onboarding ("Thank you for entertaining my noob questions :bow:").

---

## Cross-cutting habits

**Do (Sam does):**

- Lowercase "i" in Slack is fine; PR Problem/Solution stays sentence-case
- Parenthetical asides for honesty: `(big surprise)`, `(lol)`, `tho`, `for now`
- Emoji as punctuation, not decoration spam
- Name customers, entitlements, feature flags explicitly when ops need them
- `@mention` the person who asked or should verify
- Link to Notion, Slack threads, PR diffs, app URLs
- Split long topics into numbered lists instead of paragraphs
- Say "minor update" / "Hello hello" for small ships

**Don't (not Sam):**

- Em dash (use comma, colon, period, or hyphen; see copywriting rule)
- Resume-style metric stacking in Slack/PR ("spearheaded", "leveraged", "synergy")
- Passive corporate voice ("it is recommended that stakeholders…")
- Over-hedging ("I think maybe we could possibly…") in ack/fix messages
- Generic praise without naming the contribution
- Hiding entitlement/flag caveats (Sam puts them front and center)

---

## Resume / job prose (different bar)

When writing **resume bullets** or **portfolio copy** for Sam, shift register:

- Third-person implied, no "I"
- Lead with outcome + metric where verified
- No emoji, no "Hello fellow chart exporters"
- See [resume-guidance.md](./resume-guidance.md) for structure

**Good (resume):**

> Primary frontend owner for production support: triaged 100+ customer-facing bugs, built in-app bug reporting (platform → Slack → Notion), with ~24-minute median first response on urgent issues.

**Bad (Slack voice pasted into resume):**

> Shoutout to myself for being the ever-present frontline for everything platform :pray-intensifies:

---

## Quick reference: channel → length → structure

| Channel | Typical length | Structure |
| --- | --- | --- |
| PR Sam's notes | 1–5 sentences | Story + caveat + test hint |
| PR Problem/Solution | 150–1200 chars | Bullets + numbered steps |
| `#product-release` | 3–30 lines | Header, numbered features, flags, cc |
| `#bugs` fix | 3–8 words | @person + should be fixed |
| `#bugs` root cause | 2–8 lines | TL;DR + bullets |
| `#tech-squad` | 5–15 lines | Shipped / Shipping / POC buckets |
| `#kudos` | 5–20 lines | Named thanks + emoji |

---

## Samples cheat sheet

### PR Sam's notes — good

> I just want to put in the upload job ID derived from simulated callbacks or from actual uploads to show up on slack so i don't have to log in just to check

### PR Sam's notes — bad

> Enhancement to improve developer experience by surfacing upload job identifiers in automated notification channels.

### Slack release — good

> Custom charts update:
>
> 1. Users can now lock time period and facilities on the chart level…
> 2. This is useful if they want to view multiple time periods…
>
> Customer impact: IXOM, SATS and QSR cc @Laurentia

### Slack release — bad

> Excited to share that chart-level filter overrides are now available for enhanced dashboard flexibility!

### Bug fix — good

> @Natsune Nomura this should be fixed, can you try it out?

### Bug fix — bad

> The reported localization defect has been resolved in the latest deployment. Kindly confirm resolution.

---

## When Sam asks you to write something

1. Ask (or infer) **channel/register**: PR body, Slack release, bug reply, kudos, resume
2. Match **length** to context (don't write a `#product-release` essay for a fix ack)
3. Include **ops details** Sam would: entitlements, flags, who to cc, where to test
4. Use **Sam's notes** voice for optional color; **Problem/Solution** for reviewer-facing PRs
5. Pull facts from [unravel-work/](./unravel-work/) or ask; do not invent metrics or customer names
