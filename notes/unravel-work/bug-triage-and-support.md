# Bug Triage & Production Support

Supplement to PR-based notes. Sourced from the [Notion bug board](https://app.notion.com/p/unravel/29c698df98e4807f8617f2c0ffc39077?v=2ea698df98e480908947000ca34992e8) and [#bugs Slack channel](https://unravelcarbongroup.slack.com/archives/C055WC1KJCV).

## Role

Primary frontend owner for production bug triage: investigate reports from CS, sustainability consultants, and customers; reproduce on staging/prod; ship fixes or route to backend/ML/data; confirm resolution in Slack threads.

Also built and iterated on the in-app bug reporting pipeline (form → Slack → Notion), including urgency/deadline UX ([PR #2531](https://github.com/unravelcarbonorg/Unravel-frontend/pull/2531), [PR #2562](https://github.com/unravelcarbonorg/Unravel-frontend/pull/2562), [PR #3031](https://github.com/unravelcarbonorg/Unravel-frontend/pull/3031)).

## Coverage

| Era | System | Approx. volume |
|-----|--------|----------------|
| ~2023 – Oct 2025 | [#bugs Slack](https://unravelcarbongroup.slack.com/archives/C055WC1KJCV) + Jira (PF-*, BR-*) | 120+ Sam messages; 42 "should be fixed" confirmations |
| Nov 2025 – Jul 2026 | [Notion bug board](https://app.notion.com/p/unravel/29c698df98e4807f8617f2c0ffc39077?v=2ea698df98e480908947000ca34992e8) | 339 rows total; 64 assigned to Sam |

Not everything before Nov 2025 is on the board. The team migrated from Slack/Jira; use this file's **pre-migration backfill** section for that period.

## Assignee stats (Notion, Nov 2025 – Jul 2026)

| Status | Count |
|--------|------:|
| Done | 54 |
| In review | 1 |
| Won't do | 4 |
| Discarded | 5 |
| **Total assigned** | **64** |

## Metrics (Jul 2026 snapshot)

### Total bugs (what we can count)

| Source | Count | Period | Notes |
|--------|------:|--------|-------|
| Notion bug board rows | **339** | Nov 2025 – Jul 2026 | Earliest row Nov 7 2025 |
| Board: Done / open | 236 / 26 | | Plus 53 Discarded, 24 Won't do |
| Bug reporter IDs (BR-*) | **~449** | Nov 2025 – Jul 2026 | Latest in Slack: BR-449 |
| Jira BR-* (legacy, in Slack) | **264+** | pre-Notion | At least BR-264–292 in #bugs; numbering continued into Notion |
| Sam: Notion assignee | **64** | Nov 2025 – Jul 2026 | 19% of board rows |
| Sam: Notion Done | **54** | | 23% of all Done on board |
| Sam: Slack "should be fixed" | **42** | ~2023 – Jul 2026 | All-era fix confirmations |
| Sam: Slack "Checking this out" | **12** | | Triage ack floor (undercount) |
| Sam: #bugs messages | **120+** | May 2023 – Jul 2026 | 6+ pages in Slack search; more exist |

**All-time org total:** not fully knowable. Jira PF-* and pre-form Slack reports were never migrated. Floor: **450+ formal reports** (BR numbering) plus untracked Slack threads since May 2023.

**Sam all-time (estimate):** **~100–130 unique bugs** = 64 Notion assigned + ~40–70 pre-Notion Slack/Jira (42 Slack fix msgs span both eras; ~15–20 overlap).

### Response rate

True time-to-first-reply needs thread timestamps; Notion has no first-response field.

| Metric | Value | Meaning |
|--------|------:|---------|
| Notion assignee share | **19%** | 64 / 339 board tickets |
| Done share (team) | **23%** | 54 / 236 Done on board |
| Close rate (your assigned) | **84%** Done | 54 / 64; rest In review (1), Won't do (4), Discarded (5) |
| Slack fix confirmations | **42** | "should be fixed" in #bugs (all eras) |
| **Slack thread sample (n=20)** | **75%** | Sam replied in 15 / 20 sampled #bugs threads (Jul 2026) |

Pre-Notion triage was Slack-first with no assignee field, so assignee share understates your role before Nov 2025.

**20-thread sample (no Sam reply):** BR-449, BR-447 (Cursor automation only, ~3–4 min), BR-148 (Finn resolved cache drift), BR-154 (Finn/Akshat on OneSchema validation), BR-438 (Finn on Gap Analyzer). Not every report lands on you; backend/outage owners often pick up first.

### Slack first-response time (20-thread sample, Jul 2026)

Random-ish mix across eras: 5 pre-Notion/manual (2024), 5 Jira-era (2025), 10 Notion bug-reporter (2025–2026). Measured report post → first Sam message in thread.

| Stat | All Sam replies (n=15) | Excl. BR-150 outlier |
|------|----------------------:|---------------------:|
| Median | **29 min** | **24 min** |
| Within 1 h | **67%** | **71%** |
| Within 4 h | **73%** | **79%** |
| Within 24 h | **87%** | **93%** |

Fastest in sample: **BR-371** (~1 min, duplicate bug already in flight). Slowest: **BR-150** (~6 days, fix-only reply). Typical urgent/day-of: **BR-269** (3 min ack, 18 min fix), **BR-371** (27 min to prod), **BR-446** (~49 min fix).

| Bug | Era | First Sam | Notes |
|-----|-----|----------:|-------|
| BR-371 Invalid Date | 2026-05 | 1 min | Linked existing PR |
| BR-269 data history tree | 2026-03 | 3 min | "on it" |
| 2024 report gen error | 2024-02 | 4 min | Manual @Sam tag |
| PF-2322 onboarding FY | 2024-05 | 4 min | Hotfix assigned |
| BR-416 Firefox login | 2026-06 | 7 min | "Checking this out" |
| BR-378 Copilot download | 2026-05 | 16 min | "issue found" |
| BR-445 Copilot Scope 1 | 2026-07 | 19 min | After Cursor triage (~9 min) |
| BR-433 staging task crash | 2026-06 | 29 min | After Kevin @Sam |
| BR-155 dashboard timeout | 2025-05 | 41 min | Export workaround (Finn on infra) |
| BR-446 intensity cap | 2026-07 | 49 min | Fix confirm (pre-investigated) |
| BR-143 Business Travel | 2025-04 | 2.6 h | After Wang Chen backend trace |
| BR-346 intensity zero | 2026-04 | 13 h | "Taking a look" |
| BR-373 SATS export rows | 2026-05 | 19 h | Repro + root-cause writeup |
| BR-395 PCF Japanese IME | 2026-06 | 1.1 d | Fix-only reply |
| BR-150 export YoY chart | 2025-05 | 5.9 d | Fix-only reply |

**Cursor automation (Jul 2026):** On recent Notion-era reports, Cursor "Investigate bug report" often posts a full triage in **~3–9 min** before any human. BR-447 and BR-449 had automation only (no Sam thread reply yet). BR-445: Cursor at 9 min, Sam at 19 min. Treat automation as first-line triage; your human ack/fix cadence above is unchanged for threads you own.

**Caveats:** Sample is small and biased toward threads where you eventually replied or fixed. Pre-Notion threads used manual @tags or Jira bot posts with different timing semantics. First reply ≠ fix shipped.

### Time to finish (Notion, your Done tickets)

Proxy: `Created time` → `Last edited date` (not true Done timestamp; many rows batch-update ~02:00 UTC).

| Stat | All Done (n=54) | Now / Today / Deadline (n=13) |
|------|----------------:|-------------------------------:|
| Median | **44 h (~2 days)** | **~25 h (~1 day)** |
| Within 24 h | 35% | ~46% |
| Within 48 h | 54% | ~62% |
| Within 7 d | 89% | ~92% |

By urgency (median): Deadline 17h · Today 25h · Now 48h · When time allows 46h · This week 66h.

**Caveats:** Last edited ≠ shipped to prod. Urgent bugs often get next-business-day status sweeps. Slack-era timing now has a 20-thread first-response sample above (not full corpus).

---

## Pre-migration backfill (Slack + Jira, ~2023 – Oct 2025)

Recovered from Sam's messages in #bugs. Grouped by product area; not exhaustive but covers recurring themes and high-impact fixes missing from Notion.

### 2023 – early platform / dashboard era

- **Chart data gaps (BE)**: Breakdown-by-supplier and breakdown-by-item charts returning empty arrays; traced GraphQL responses and escalated to backend ([PF-1647](https://unravelcarbon.atlassian.net/browse/PF-1647) era).
- **Scope 1 missing on energy chart**: FE received scope 2 only from `breakdownByEnergyAndFacility`; empty scope 1 display was a backend data gap, not FE.
- **Market-based emissions hidden**: Null market-based values caused charts to hide series; confirmed with backend.
- **Rounding totals off by ±1**: Documented known display rounding vs raw decimal totals for product/CS.
- **Financial year defaults**: Explained and adjusted dashboard default date logic (financial year vs latest year with data vs all-time legacy behavior).
- **Upload route regression**: `/input` broken while `/input/upload` worked; workaround and fix for demo accounts.
- **Chrome file picker**: Customer could not select upload folders; diagnosed Chrome restriction, advised drag-and-drop or browser switch.
- **OneSchema init failures**: Customer network blocking OneSchema embed; isolation steps (VPN, wifi, extensions).
- **Delete file permissions**: Clarified and shipped rule: ADMIN or original uploader only.
- **Login issues (Chrome)**: Customer-specific login failures; browser isolation checklist, redeploy, Safari workaround.
- **Duplicate user roles**: Diagnosed dual-role account causing access confusion.
- **Legacy waste data**: Negative waste amounts from old `-1` recycled flag misread as percent allocation (Saladstop, GFG accounts).
- **Division/subclass queries empty**: Custom dashboard queries with division grouping returned no results; escalated mview rebuild issues.
- **Employee commute prefill**: Traced country-dependent prefill GraphQL for webform vs bulk upload behavior.
- **GFG spend categories**: Flagged duplicate/near-duplicate spend categories on new dashboard for data team.

### 2024 – data export, onboarding, ESG

- **Data export column rounding (7 columns)**: Location-based emissions, grid emissions, waste, business travel, leased assets, electricity columns rounded incorrectly in export table; batch fix shipped ([PF-1816](https://unravelcarbon.atlassian.net/browse/PF-1816) era).
- **Business travel trips table wrong query**: FE used incorrect GraphQL query; charts wrong but data export values still correct.
- **Materiality filter hiding "Add data"**: Purchased heat/cold hidden when immaterial in latest materiality assessment; explained filter checkbox to CS.
- **Company stuck at ORG_BUILDER**: Cloned accounts with facilities still showed onboarding gate; manual `/onboarding` workaround and status fix.
- **Drill-down ObjectId serialization**: `drillData` failed with "ObjectId is not JSON serializable" after company ID migration.
- **User invite name fields**: Ambiguous single name field on invite; split into explicit first/last name on prod.
- **ESG improvements week**: Batch fixes for Christian-reported items (3 issues in one thread).
- **Wrong React Query key**: Hook used incorrect query key causing stale/wrong data (improvements week).
- **Password reset for invite-pending users**: Traced BE error for users not yet fully confirmed.
- **Data input overview query errors**: `getDataInputOverview` failures with null class alias fields.
- **Climate program / decarb plan**: Investigated `getDecarbPlan` query issues for program details.
- **Lestari reporting year**: FE bug conflated future-dated uploads with missing rows; separate from data issue.
- **Date filter retracting to all months**: FE auto-reset month filter when navigating back in data status views.
- **LMB totals mismatch**: Fixed FE aggregation; explained remaining difference vs CS expected numbers.
- **Purchased electricity empty state**: Added dashboard override for misleading "no data" when filter-specific empty vs global empty.
- **Pie chart zero values**: Backend inconsistently omitted zero values from chart payloads; product discussion on display.
- **Chart breakdown item errors**: Recurring BE errors on `getBreakdownByItemChartData` for customer accounts (Lestari and others).

### 2025 (Jan – Oct) – export scale, i18n, agents, onboarding

- **Japanese export filename (S3)**: CSV download failed with ISO-8859-1 header error when filename contained Japanese entity name; URI-encode fix before BE request.
- **Large export download UX**: Explained 75MB fetch-then-blob behavior vs browser download; advised reload for stuck "download started" state.
- **416k-row query timeout**: Data export table 30s timeout; guided CS to direct CSV download (15min timeout) for huge datasets.
- **Org builder onboarding redirect**: Companies without facilities showed NaN instead of redirecting to onboarding; fixed redirect and auto-expand invalid tree nodes.
- **Login error toast missing**: Failed login gave no user feedback; restored error alert/toast on auth failure.
- **Disclosures linked data point tooltip**: Shipped warning when linked data point should be included in package.
- **Emissions dashboard behavior alignment**: Fixed module to conform to same filter/date behavior as main emissions dashboards.
- **Material composition chart filter**: Added "is not empty" filter so custom charts could exclude blank composition rows.
- **New data export fields (events)**: Shipped Electricity used, Amount of fuel, Space type, Space name, Capacity, Upstream/downstream columns.
- **PCF / agents epic lag**: PCF app FE behind agents epic changes; diagnosed blank message list (BE) vs FE drift.
- **Gap Analyzer routing**: Redirect fix when agent links pointed at wrong app host.
- **Audit trail tree traversal**: UI error when reference node missing in audit trail tree.
- **Jira tickets referenced in thread**: [PF-2151](https://unravelcarbon.atlassian.net/jira/software/projects/PF/boards/23?selectedIssue=PF-2151), [PF-2202](https://unravelcarbon.atlassian.net/browse/PF-2202), server PR #1977 for backend-dependent fixes.

### Slack fix-confirmation patterns (all eras)

Searchable signals of shipped work in #bugs (Sam as author):

| Pattern | Approx. count |
|---------|--------------:|
| "should be fixed" / "This is fixed" | 60+ |
| "Up on prod" / "Fix is up on prod" | 8+ |
| "Checking this out" / "Looking into this" | many (triage entry) |

Regular confirmees: Christal, Viola, Marc, Natsune, Amanda, Christian, Heather, Nhu, Hannah, Linh, Finn.

---

## Notable fixes by product area (Notion board, Nov 2025 – Jul 2026)

### Emissions tracking & dashboards (12+)

- **Intensity hidden for large orgs**: Pickup Coffee (>500 facilities) hit arbitrary facility cap; diagnosed root cause in #bugs ([BR-446](https://app.notion.com/391698df98e481119796cf1d042b4539)).
- **Scope 2 dashboard vs drill-down mismatch**: Canon Australia totals disagreed between overview and purchased-electricity view ([BR-435](https://app.notion.com/38b698df98e4817f96deccf3f07e479f)).
- **Emissions intensity chart line wrong**: Pharmaforte intensity series not rendering on overview chart ([BR-383](https://app.notion.com/365698df98e481dbaa54c78420ef974c)).
- **Quarterly chart export "Invalid Date"**: Hangry comparison exports showed bad axis labels ([BR-371](https://app.notion.com/35a698df98e4810facc2f114a06732ee), [BR-351](https://app.notion.com/351698df98e481ecac09e8ce670d55b0)).
- **Dashboard scope links dead**: Scope 1/2/3 click targets did nothing ([BR-386](https://app.notion.com/366698df98e481308f5dfe05cfaa2751)).
- **S2 electricity drill-down loops**: Facility links from purchased-electricity view bounced back to main dashboard ([BR-387](https://app.notion.com/366698df98e48143931de60e359562f7)); clarified UX vs bug in thread.
- **Insights not generating**: Flight Centre dashboard insights stuck ([BR-311](https://app.notion.com/311698df98e4818e8b3fe9ccb0ee8104)).
- **Misleading chart totals**: Media Prima totals did not update with filters ([BR-308](https://app.notion.com/30d698df98e481eab541eded52268e38)).

### Data export & reporting accuracy (15+)

- **Excel row count ≠ on-screen count**: SATS export showed 75 rows in UI but 33 in downloaded file ([BR-373](https://app.notion.com/35c698df98e4817ebaa9fbc4955499af)).
- **Duplicate filter options**: Calculation-type filter listed multiple "unmatched" variants, hiding real unmatched rows ([BR-364](https://app.notion.com/358698df98e481c1980ecb2df3b77680)).
- **Missing upstream fuel/energy export entity**: Scope 3 category export gap ([BR-329](https://app.notion.com/329698df98e481279ce5ff6b9422c956)).
- **kWh column wrong, emissions correct**: Greenpac electricity quantity mismatch ([BR-340](https://app.notion.com/2fc698df98e4814c87c2ce764e4ba14f)).
- **Empty Excel download**: Big Dutchman export produced blank file ([BR-338](https://app.notion.com/2e0698df98e48101b0c7dfdb894ab0c7)).
- **Custom fields missing from export**: Big Dutchman custom field columns dropped ([BR-327](https://app.notion.com/2a7698df98e48199b980e3b800abfc63)).
- **Audit trail vs export mismatch**: SATS waste treatment totals disagreed ([BR-334](https://app.notion.com/2fd698df98e4818a80f1e6d0c4f37b3a)).
- **Transport formula units**: Audit trail showed kg instead of tonnes for upstream/downstream transport ([BR-345](https://app.notion.com/345698df98e4818c8233d5e811d19665), [BR-321](https://app.notion.com/321698df98e48114bde2e2aacc3ffefc)).
- **Upload ID filter broken**: SATS data export filter non-functional ([BR-321](https://app.notion.com/321698df98e48128b707f27af07dc865)).
- **Data history "view data" incomplete**: Aurora Atelier PG&S link excluded rows ([BR-342](https://app.notion.com/342698df98e4810ebd01d79f493b7c3d)).
- **Broken tree after back-navigation**: Data export formula drill-down broke on browser back ([BR-376](https://app.notion.com/376698df98e4811e81c3d8feab0f05cd)).

### Data upload & collection (6+)

- **Upload page HTTP 500**: Production upload hub down; part of broader regression response ([BR-360](https://app.notion.com/357698df98e48145a599e08ba36551e8)).
- **DTA / OneSchema validation timeout**: MHI 33k-row sheet; polling validation timed out ([BR-390](https://app.notion.com/36b698df98e4818bb9c1cea56a119346)).
- **Delete file permission**: New Toyo user could not delete own uploads; clarified ADMIN vs uploader rules ([BR-432](https://app.notion.com/38a698df98e481299f6ed0905c4941bb)).
- **Upload Management task view error**: Staging task detail crash after row-traceability merge ([BR-433](https://app.notion.com/38a698df98e481a7a592faad14355e3b)).
- **ECA creating wrong job type**: Emissions Calculation Agent should create UploadJobGroup ([Notion](https://app.notion.com/2a4698df98e481399280cdad26b367af)).
- **Data processing toast blocking UI**: Big Dutchman overlay covered actions ([Notion](https://app.notion.com/2b7698df98e48172b0c5eee3de95ad70)).

### Data review & quality (4+)

- **Bulk correction fetch limit**: Flight Centre ~12k row selection hit "Failed to fetch data" (discarded as expected limit) ([BR-398](https://app.notion.com/373698df98e481aca74cdbf16eed0932)).
- **Custom EF category filter**: Aurora Atelier filter misbehaved ([BR-318](https://app.notion.com/33e698df98e481fc9dc7fee827551fe0)).
- **Data history tree broken**: Global Fashion Group navigation error ([BR-312](https://app.notion.com/318698df98e481cd95f9d0480383bc00)).

### Reporting & disclosures (5+)

- **ISSB export hangs forever**: Ixom package download stuck ([BR-307](https://app.notion.com/305698df98e481ea88c5f15de6035a18)).
- **ISSB risk section auto-completed**: Tyrell demo false completion state ([BR-306](https://app.notion.com/305698df98e4814b9340c7b90fcb8db0)).
- **Failed to create ISSB report**: Tyrell demo creation error ([BR-337](https://app.notion.com/2f5698df98e48131ae62ddc028814537)).
- **Custom framework page broken**: Tyrell demo reporting UI crash ([BR-314](https://app.notion.com/313698df98e48196aa31e23d3a674b44)).
- **Invalid "last synced" date**: Disclosures sync showed Invalid Date until resync ([BR-377](https://app.notion.com/35f698df98e481dbb53efe525707eb42)).
- **One-click report error**: SATS UC report generation failed ([Notion](https://app.notion.com/2b1698df98e481d3ba72c31af4e507de)).

### AI, Copilot & agents (5+)

- **Gap Analyzer send button stuck**: Production outage blocking TÜV Rheinland Japan trial ([BR-438](https://app.notion.com/38e698df98e4818e9353ead2b2590dc5)); Finn diagnosed same day (refresh workaround).
- **Gap Analyzer analysis error**: Sony GAA run failure ([BR-376](https://app.notion.com/35f698df98e48170a841d5714a53a8ba)).
- **Copilot table download broken**: Sony thread export failed ([BR-378](https://app.notion.com/35f698df98e4819b86d1d3bcb6470b83)).
- **Emissions Calculation Agent not triggered**: Richard Crookes upload stuck ([Notion](https://app.notion.com/2ae698df98e48155bb11dabf296d423a)).
- **Copilot citation click (staging)**: Side panel citation interaction bug ([BR-325](https://app.notion.com/2b0698df98e481cdbdd4e3491857c4e2)).

### PCF (2)

- **Japanese IME in search bar**: PCF product search broke composed character input ([BR-395](https://app.notion.com/371698df98e481eeaafcf37a8aec6123)).
- **Lifecycle stage reorder** (in review): Toitu-reported PCF builder issue ([BR-442](https://app.notion.com/390698df98e48187a2c2ec0fa280629c)).

### Custom dashboards & analytics (4+)

- **Custom charts not loading**: Global Fashion Group and SCCC chart timeouts ([BR-311](https://app.notion.com/311698df98e481da92c4f725124d3e5b), [BR-356](https://app.notion.com/356698df98e481618c41ed32a1af086e)).
- **Tooltip label wrong for custom metrics**: Generic "Emission factor value" on custom metric columns ([BR-431](https://app.notion.com/38a698df98e48178aa67df184dca43bf)).

### Onboarding, access & platform (8+)

- **Workspace invite broken**: Password setup flow error ([BR-344](https://app.notion.com/344698df98e481c8b52efc6b537fd92d)).
- **Mastermind job status flicker**: Admin job list showed stale status on navigation ([BR-363](https://app.notion.com/357698df98e481f9a8d9dd60efa2c333)).
- **Mastermind user/company linking**: Internal admin could not add self to SATS ([BR-319](https://app.notion.com/32f698df98e4816b95d6f3da160d224a)).
- **Firefox login inquiry**: TÜV Rheinland Japan corporate browser compatibility ([BR-416](https://app.notion.com/37d698df98e48154959cf65d1a12d98f)).
- **Facility picker resets selections**: SATS org filter unticked all facilities on edit ([BR-348](https://app.notion.com/348698df98e481108749d8676c8ad525)).
- **Data delete notification overflow**: Toast layout broke on long messages ([BR-339](https://app.notion.com/2e1698df98e480d6bd7bea3df62bbf03)).
- **On-site renewables multiplied by days**: Dexa Group Scope 2 input processing error ([BR-367](https://app.notion.com/358698df98e481e6bc58d4f48daa631c)).

## Slack triage patterns (ongoing)

Beyond formal tickets, #bugs threads show recurring work:

- **Reproduce and confirm**: OneSchema closing mid-edit, upload job failures, staging regressions after large merges (upload management + row traceability).
- **Root-cause analysis**: Geocoder resolving Gladstone, AU to Oregon, US (no road distance for Rockhampton→Gladstone trips); Copilot anomaly vs incomplete 2024 fuel data timing.
- **Cross-team routing**: ML team for engine/geocoder issues; backend for data override/exclude logic; Nicholas for DCA validation.
- **Production comms**: "Should be fixed" confirmations to CS (Christal, Viola, Marc, Natsune, Amanda, etc.); version callouts (e.g. v2.9.0 auto-update).
- **Tooling**: Cursor "Investigate bug report" automation on #bugs; guidance for regex-triggered log analysis from bug form attachments.

## Resume bullets (bug-focused)

Pick 1–2 alongside feature bullets from [overview.md](./overview.md):

1. Primary frontend owner for production bug triage across ~3 years: 100+ #bugs threads (2023–Oct 2025) plus 64 Notion tickets (54 resolved, Nov 2025–Jul 2026).
2. Built in-app bug reporting flow (platform → Slack → Notion) with urgency tiers and deadlines, replacing ad-hoc Slack/Jira escalation.
3. Shipped rapid production fixes for enterprise accounts (SATS, Canon, Sony, MHI, Dexa, Flight Centre, GFG, Lestari) under deadline pressure from CS and consultants.
4. Diagnosed cross-layer issues (frontend display limits, export filter bugs, geocoder mis-resolution, Mongo/DuckDB sync drift, GraphQL query mismatches) and coordinated fixes across frontend, backend, and data teams.
5. Improved platform reliability around data export accuracy, chart rendering, i18n export downloads, and upload workflows based on recurring production bug patterns.

## Strengths for interviews

- **Long tenure on support**: Active in #bugs since early dashboard era (~2023), not just post-migration board work.
- **Customer-facing urgency**: Comfortable owning "Now" and deadline bugs tied to customer inventory close, demos, and partner launches (TÜV Rheinland, RWS, PROTIVITI).
- **Breadth under pressure**: Same week might span export filters, ISSB export, Gap Analyzer outage, and upload v2 staging regression.
- **Systems thinking**: Distinguishes frontend caps vs engine bugs vs data timing; explains tradeoffs in Slack without over-promising.
- **Product + infra**: Bug reporter is both support workflow and shipped product surface you designed.

## Sources

| Source | Link |
|--------|------|
| Notion bug board (all bugs view) | [Bug board](https://app.notion.com/p/unravel/29c698df98e4807f8617f2c0ffc39077?v=2ea698df98e480908947000ca34992e8) |
| Slack #bugs | [C055WC1KJCV](https://unravelcarbongroup.slack.com/archives/C055WC1KJCV) |
| Jira (legacy, referenced in Slack) | PF-1647, PF-1816, PF-2151, PF-2202 |
| PR notes (bug reporter, urgency UX) | [platform-and-infrastructure.md](./platform-and-infrastructure.md), [2025.md](./2025.md), [2026.md](./2026.md) |
