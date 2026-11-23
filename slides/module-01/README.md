# Module 1: See It. Control It. Protect It.

**Status:** Introductory documentation aligned with the approved simplification.
Fresh-learner registry rehearsal remains required; this is not a tenant-readiness
or publication claim. No new helpdesk deployment is required.
**Core:** 25 proposed minutes / twelve slides. **Onboarding:** five separate slides /
12 proposed minutes, including the one-minute sign-in check. Presenter-led with
standing read-only AI Reader or labeled presenter evidence; no learner write roles.

[Open Module 1 core](https://cyberlorians.github.io/a365-hub/#slide-6) |
[Labs](https://cyberlorians.github.io/a365-hub/?view=lab) |
[Instructor deck](https://cyberlorians.github.io/a365-hub/instructor/) |
[Open onboarding](https://cyberlorians.github.io/a365-hub/#slide-1) |
[Open Module 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-1)

## Outcome

Introduce management, governance, security and business value, then conceptual
evaluation, monitoring and tracing. Review the existing Project Beacon Relay Agent
read-only and orally explain an observed fact, a gap and accountable next check.
Teach Read > Decide > Act and the two attack surfaces before the portal walkthrough.
Retain the visual five-area Entra control map and connected security-operations
response sequence in Module 1; these lessons were not moved into Module 2.
No external Academy lab, build, chat or knowledge test; no required copying,
worksheet or written submission.

## Grounding and prepared record

Use generic illustrative IT support, not a deployed sample claim. The authorized
[four-pillar screenshots](../../grounding/reference-images.md#images-4-7---ai-observability-overview-four-pillars)
are separate from the old Agent ID scenarios image whose rights remain unconfirmed.
The four authorized originals are expandable inside teaching slide 8; no other
course or lab file is required.
[Foundry observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability)
grounds concepts, not guaranteed Copilot Studio/Agent 365 telemetry or a setup lab.
The [source map](sources.md) retains Academy/Learn MCP provenance as instructor/
Module 2 reference, not a core Module 1 learner lab.

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
| [exercise.md](exercise.md) | Oral observed-fact/gap/accountable-next-check discussion |
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
| Useful work / illustrative task | 4 |
| Four pillars / conceptual observability | 4 |
| Services / registry launch | 4 |
| Accountability / lab continuation | 5 |
| Boundaries / evidence / value | 4 |
| Oral discussion | 3 |
| Module 2 handoff | 1 |
| **Total** | **25** |

The first five slides preserve the access sequence; Lab 1 includes the event access
form, which must be smoke-tested and approved before use. TAP lifetime/reuse and CA
prompts require actual tenant testing. Lab 1 has three access steps, Lab 2 one
sign-in check and Lab 3 six registry steps: eleven generated learner screens.
Launch Lab 3 after slide 11 and return to slide 12, not directly to Module 2.
Core minutes remain [1,3,1,3,1,3,5,1.5,1,1.5,3,1].

Find the same prepared Relay through admin.microsoft.com > Agents > All agents >
Registry > Total agents > search Project Beacon Relay > Enter > Project Beacon
Relay Agent. Read Details Owner/Created by, Data & tools/Permissions, Security >
Risk details, Activity, then discuss. Blanks mean unknown; Activity is inventory
usage, not full execution/security/audit evidence. No Foundry/Copilot Test activity.
Required risk is High / The agent is compromised., staged training not live attack.
Avoid the faulty Agents at risk count filter. Missing risk uses instructor live
view or remains unresolved access/setup, not complete. No learner changes.

Instructor a-seed prepares/preflights the existing record; a-risk rehearses staged
risk; a-l2 rehearses fresh learner registry access. No current a-publish requirement
or maker role changes. Current Module 2 mail runtime/content remains unchanged.
Using/testing and any optional maker build belong there, but no replacement sample
or optional path is claimed implemented/deployed.

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
