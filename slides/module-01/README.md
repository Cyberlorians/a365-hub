# Module 1: See It. Control It. Protect It.

**Status:** Published sample-led learning materials. New helpdesk deployment and
fresh-learner rehearsal remain required; this is not a tenant-readiness claim.
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
Follow Microsoft's Academy IT helpdesk sequence: understand purpose/instructions,
inspect real knowledge, test an answer, and review ownership/access/risk.
The output is an observed source/answer comparison and one unproven control.
No worksheet or written submission. Students do not create/publish in Module 1.

## Microsoft sample foundation

Use [Academy Recruit standard harness](https://microsoft.github.io/agent-academy/recruit/):
[setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/),
[solution](https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/),
[helpdesk build](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/)
and [publication](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/).
Microsoft's sample site supplies policy pages and Devices/Tickets lists.
This is a guided build, not a prebuilt package or a deployment performed by this site.
The instructor prepares it and verifies a learner channel, source access and
matching registry entry. The sparse Beacon Mail Agent is no longer the Module 1
sample. The existing separate Relay still supplies the staged-risk comparison.

The [source map](sources.md) links the official lab catalog and distinguishes
low-code Academy labs from pro-code Agent 365 SDK samples. Current Module 2 remains
the separate mail-agent implementation with its own preflight.

## Package

The published module has a student deck (slides and numbered labs) and a separate
instructor deck. Build with
`node scripts/build-walkthroughs.mjs` from the repository root before local preview.
The Markdown guides are the plain-text reference; their copy-and-run snippets are used
in the labs and the instructor deck.

| File | Use |
|---|---|
| [index.html](index.html) | Student presentation: 17 teaching slides, two labs and a sign-in check; presenter tools hidden |
| [Instructor deck](https://cyberlorians.github.io/a365-hub/instructor/) | Separate instructor deck with show/say scripts, lab cues and recovery |
| [slides.md](slides.md) | Aligned slide content |
| [speaker-notes.md](speaker-notes.md) | Per-slide timing and talk track |
| [exercise.md](exercise.md) | Three-minute four-point check and answer key |
| [taxonomy-handout.md](taxonomy-handout.md) | Four questions and current eight-module map |
| [facilitator-guide.md](facilitator-guide.md) | Scope, preparation, recovery, review/release gates |
| [permissions-preflight.md](permissions-preflight.md) | Presenter versus learner access |
| [interactive-guide.md](interactive-guide.md) | Navigation, offline/print, and authoring rules |
| [sources.md](sources.md) | Source roles and claim boundaries |
| [Learner step-by-step guide](../../labs/module-01-security-foundation.md) | Slide-by-slide actions, expected results, discussion, recovery |
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
prompts require actual tenant testing. Lab 3 follows the actual sample configuration,
answer/source test and corresponding registry review. Individual access failures
can use the live presenter view but must be recorded as access failures.
Registration is not runtime proof. The separate Relay Agent must show staged High
risk in Security > Risk details; bypass the broken risk-count filter.

**Current sample-led revision:** Lab 2 remains a single-screen account check.
Slide 7 introduces Microsoft's helpdesk scenario; slide 8 separates purpose,
instructions, knowledge and tools; slide 9 retains the dual attack surfaces;
slide 10 separates maker/user/reviewer roles. Lab 3 follows eight understand/test/
inspect steps. Slide 14 uses Copilot Studio test activity for this implementation.
Missing sample knowledge is blocked preparation, not a valid empty result.
Registry blanks remain visibility gaps that can be compared with the real maker
view. The separate Relay Security tab supplies required staged High risk.
Detailed authority stays in Module 3 and misuse mechanics in Module 6.
The seventeen-slide structure and core budget remain; timing needs a new rehearsal.

Complete only after user review, aligned content/supporting sources, actual prepared
presentation mode, and an independent 25-minute rehearsal. The deeper classification
exercise moves to Module 3; original anatomy is not lost.

See the [master plan](../../docs/06-customer-learning-plan.md) and
[roadmap](../../docs/module-roadmap.md).

## Historical November 18 verification (prior Mail-based version)

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
unknowns in the discussion. Fresh-learner access and an independent 25-minute
rehearsal remain release gates; do not describe the workshop as fully validated.
