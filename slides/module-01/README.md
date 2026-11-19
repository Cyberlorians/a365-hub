# Module 1: See It. Control It. Protect It.

**Status:** Reworked content draft for review; not independently rehearsed or tenant-validated.
**Core:** 25 proposed minutes / twelve slides. **Onboarding:** five separate slides /
12 proposed minutes, including the one-minute sign-in check. Presenter-led with
standing read-only AI Reader or labeled presenter evidence; no learner write roles.

[Open Module 1 core](https://cyberlorians.github.io/a365-hub/#slide-6) |
[Labs](https://cyberlorians.github.io/a365-hub/?view=lab) |
[Instructor deck](https://cyberlorians.github.io/a365-hub/instructor/) |
[Open onboarding](https://cyberlorians.github.io/a365-hub/#slide-1) |
[Open Module 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-1)

## Outcome

Explain the dual attack surfaces, identify the purpose/accountability/access/evidence
boundary, and connect Entra's five pillars, Agent 365, Purview, and Defender/ISOC.
The Agent Identities chapter anchors risk -> control -> evidence -> decision.
The output is a plain-text readiness worksheet copied at the start of Lab 3.

## Package

The published module has a student deck (slides and numbered labs) and a separate
instructor deck. Build with
`node scripts/build-walkthroughs.mjs` from the repository root before local preview.
The Markdown guides are the plain-text reference; their copy-and-run snippets are used
in the labs and the instructor deck.

| File | Use |
|---|---|
| [index.html](index.html) | Student presentation: 17 teaching slides, two labs and a one-minute sign-in check; presenter tools hidden |
| [Instructor deck](https://cyberlorians.github.io/a365-hub/instructor/) | Separate instructor deck with show/say scripts, lab cues and recovery |
| [slides.md](slides.md) | Aligned slide content |
| [speaker-notes.md](speaker-notes.md) | Per-slide timing and talk track |
| [exercise.md](exercise.md) | Three-minute four-point check and answer key |
| [taxonomy-handout.md](taxonomy-handout.md) | Four questions and current eight-module map |
| [facilitator-guide.md](facilitator-guide.md) | Scope, preparation, recovery, review/release gates |
| [permissions-preflight.md](permissions-preflight.md) | Presenter versus learner access |
| [interactive-guide.md](interactive-guide.md) | Navigation, offline/print, and authoring rules |
| [sources.md](sources.md) | Source roles and claim boundaries |
| [Learner step-by-step guide](../../labs/module-01-security-foundation.md) | Slide-by-slide actions, expected results, worksheet, check, recovery |
| [Admin runbook](../../docs/07-module-01-admin-runbook.md) | Copy/paste account, license, TAP, sign-in test, delivery and shutdown steps |

## Core flow

| Segment | Minutes |
|---|---:|
| Customer outcome / shared case | 4 |
| Agent action model / dual attack surface | 4 |
| Four questions / one agent review | 4 |
| Five Entra pillars | 5 |
| Data/runtime/SOC loop | 4 |
| Knowledge check | 3 |
| Module 2 handoff | 1 |
| **Total** | **25** |

The first five slides preserve the access sequence; Lab 1 includes the event access
form, which must be smoke-tested and approved before use. TAP lifetime/reuse and CA
prompts require actual tenant testing. Lab 3 reviews a prepared registry record using
tested AI Reader access, an authorized presenter view, or labeled prior-run evidence.
Registration is not runtime proof; staged risk is optional and registry sync is not
guaranteed.

**November 19 student-feedback revision:** Lab 2 is a single-screen check, not an
eight-minute repeated sign-in lab. The Beacon case now names the coordinator,
fictional brief, review, recipient and intended send/receipt sequence. Slide 9
explains why authentication alone is insufficient; slide 14 gives actual log
navigation paths for instructor/later-module follow-up. Lab 3 starts with a
copyable note template and accepts blank reach metadata and count/empty-risk-list
mismatches as observations. Relay is explicitly the staged training example.
The sales slide was removed; the handoff is now slide 17. Its minute moves to the
scenario, preserving the 25-minute core.

**November 13 alignment:** Slide 8 introduces the four overlapping Agent ID scenarios
in original text. The core stays introductory: detailed authority moves to Module 3
and compromise mechanics to Module 6. The student slides, notes, learner guide and
instructor scripts use the same synthetic-mail case, four-question review and
readiness worksheet. Lab 3 fits within the existing review/control-map segment.
See the [customer outline](../../grounding/workshop-customer-outline.md).

Complete only after user review, aligned content/supporting sources, actual prepared
presentation mode, and an independent 25-minute rehearsal. The deeper classification
exercise moves to Module 3; original anatomy is not lost.

See the [master plan](../../docs/06-customer-learning-plan.md) and
[roadmap](../../docs/module-roadmap.md).

## November 18 verification

The local package was rebuilt with `node scripts/build-walkthroughs.mjs` and passed
`node scripts/check-workshop.mjs`. The pre-build teaching page navigated all eighteen
slides without horizontal page overflow at the tested viewport. This is a browser
smoke check, not an independent timed rehearsal.

An authorized presenter opened **Agents > All agents > Registry > Project Beacon
Mail Agent** in the Microsoft 365 admin center. Details, Permissions, Data & tools,
Security, Users and Activity tabs were available. Data & tools reported unavailable;
Permissions displayed `AgentIdentity.CreateAsManager`; Security linked to Entra
protections. These observations do not prove Mail MCP execution, approved mail
permissions, effective policy enforcement, or learner access. No tenant settings
were changed.

**Delivery mode:** use the authorized presenter-led registry review until a fresh
learner's read-only access has passed preflight. Record current source/time and
unknowns in the worksheet. Fresh-learner access and an independent 25-minute
rehearsal remain release gates; do not describe the workshop as fully validated.
