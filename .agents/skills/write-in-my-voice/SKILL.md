---
name: write-in-my-voice
description: Draft prose in Sam Bautista's voice for PR descriptions, Slack posts, kudos, bug replies, standup updates, and similar internal comms. Use when Sam asks to write, draft, or polish something in their voice, or mentions PR body, Slack post, release note, kudos, or "how I usually write".
---

# Write in Sam's voice

Ghostwrite prose that sounds like Sam wrote it. **Read [notes/writing-style.md](../../../notes/writing-style.md) first** for full patterns, good/bad samples, and channel norms.

**Out of scope:** resume bullets and job-facing copy (use [notes/resume-guidance.md](../../../notes/resume-guidance.md)); UI strings (`.cursor/rules/copywriting.mdc`).

## Workflow

1. **Classify output** (ask if unclear):

   | Type | Register | Typical length |
   | --- | --- | --- |
   | PR body (substantive) | Structured + optional Sam's notes | Problem/Solution sections |
   | PR body (small fix) | Casual only | 1–3 sentences |
   | `#product-release` | Structured | 3–30 lines |
   | `#bugs` ack / fix | Casual, ultra-terse | 3–8 words to 2 lines |
   | `#bugs` root cause | Structured | TL;DR + bullets |
   | `#tech-squad` standup | Structured buckets | Shipped / Shipping / POC |
   | `#alpha-squad` | Casual | One line unless proposing design |
   | `#kudos` | Casual, enthusiastic | Named thanks + emoji |
   | Resume / portfolio | Formal third-person | See resume-guidance, not this skill |

2. **Gather facts** from the user, diff, or `notes/unravel-work/`. Do not invent customer names, metrics, entitlements, or who asked.

3. **Draft** using templates below. Match Sam's habits from writing-style.md.

4. **Self-check** before returning:

   - [ ] Right register for channel (not resume voice in Slack)
   - [ ] Right length (no release essay for a bug fix ack)
   - [ ] Ops details Sam would include: entitlements, flags, who to cc, where to test
   - [ ] No em dash, no corporate filler ("pleased to announce", "leverage", "stakeholders")
   - [ ] Lists over paragraphs where Sam would use lists
   - [ ] `@mention` person who should verify, when applicable

## Voice (short)

- **Direct, practical, slightly informal.** Structured when audience is wide; ultra-terse when thread has context.
- **Sam's notes:** first person, discovery story, `(lol)` / `(big surprise)` ok, "Testable on dev"
- **Problem/Solution:** `-` bullets + numbered steps, backtick code names, plain English
- **Slack:** lowercase "i" ok; emoji as punctuation; parenthetical honesty (`tho`, `for now`)

## Templates

### PR (substantive)

```markdown
### Sam's notes
[Optional: why, who asked, how found, test hint]

### Problem

- [What was wrong / missing]
- [User pain or link to Notion / #bugs if relevant]

### Solution

1. [First change]
2. [Second change]
```

### PR (small)

```markdown
### Sam's notes
[1–2 sentences: discovery + caveat + "Testable on dev"]
```

### `#product-release`

```markdown
<!here> [Feature name] :shipit:

[One-line nav or context]

Feature includes:
1. …
    a. …

Customer impact: [accounts] cc @PM

Notes:
1. :alert: [Entitlement / flag caveat] :alert:

Contributors: @…
```

Minor ship: start with `Hello minor update on…` or `Custom charts update:` (no `<!here>`).

### `#bugs`

- Ack: `Checking this out`
- Fix: `@Name should be fixed!` or `@Name this should be fixed, can you try it out?`
- Root cause:

```markdown
TL;DR: [One dense sentence with the actual cause]

• [Supporting detail]
• [Supporting detail]
```

### `#tech-squad`

```markdown
Shipped:
1. …

Shipping this week/UAT:
1. …

Made progress / POC:
1. …
```

### `#kudos`

```markdown
Huge kudos to @… for [specific thing they did] :emoji:

[Optional numbered list of people + what each contributed]
```

## Good vs bad (sanity check)

| Good (Sam) | Bad (not Sam) |
| --- | --- |
| Apparently it was never supported? Only found out because Vinay was testing… | This PR remediates unsupported export columns identified during QA. |
| @Christal Tang should be fixed! | The defect has been resolved. Please verify at your earliest convenience. |
| Hello minor update on data export, if you select upload job as a column… | We are pleased to announce enhanced data export traceability. |

## Additional reference

- Full channel guide + more samples: [notes/writing-style.md](../../../notes/writing-style.md)
- Resume copy (different register): [notes/resume-guidance.md](../../../notes/resume-guidance.md)
