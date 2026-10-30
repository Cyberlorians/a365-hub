# Module 1: See It. Control It. Protect It.

**Status:** Reworked content draft for review; not independently rehearsed or tenant-validated.
**Core:** 25 proposed minutes / thirteen slides. **Onboarding:** five separate slides /
15 proposed minutes. Presenter-led; no learner admin roles.

[Open Module 1 core](https://cyberlorians.github.io/a365-hub/#slide-6) |
[Student lab](https://cyberlorians.github.io/a365-hub/?view=lab) |
[Instructor setup](https://cyberlorians.github.io/a365-hub/?view=admin) |
[Instructor lab notes](https://cyberlorians.github.io/a365-hub/?view=lab&instructor=1) |
[Open onboarding](https://cyberlorians.github.io/a365-hub/#slide-1) |
[Open Module 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-1)

## Outcome

Explain the dual attack surfaces, identify the purpose/accountability/access/evidence
boundary, and connect Entra's five pillars, Agent 365, Purview, and Defender/ISOC.
The Agent Identities chapter anchors risk -> control -> evidence -> decision.
E7 fit follows the customer gap, not an unsupported exclusivity claim.

## Package

The published module includes visual student lab and instructor sections. Build with
`node scripts/build-walkthroughs.mjs` from the repository root before local preview.
The Markdown guides are the step source, not the primary classroom experience.

| File | Use |
|---|---|
| [index.html](index.html) | Standalone 18-slide presentation with built-in notes |
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
| Customer outcome / shared case | 3 |
| Agent action model / dual attack surface | 4 |
| Four questions / one agent review | 4 |
| Five Entra pillars | 5 |
| Data/runtime/SOC loop | 4 |
| Knowledge check | 3 |
| E7 fit / Module 2 handoff | 2 |
| **Total** | **25** |

The first five slides preserve the access sequence but contain no active provisioning
link. TAP lifetime/reuse and CA prompts require actual tenant testing. The agent-review
card is explicitly fictional, not a Registry export or validated evidence.

Complete only after user review, aligned content/supporting sources, actual prepared
presentation mode, and an independent 25-minute rehearsal. The deeper classification
exercise moves to Module 3; original anatomy is not lost.

See the [master plan](../../docs/06-customer-learning-plan.md) and
[roadmap](../../docs/module-roadmap.md).
