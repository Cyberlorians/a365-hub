# Module 1 Facilitator Guide

Use the seventeen-slide [teaching reference](slides.md), [notes](speaker-notes.md)
and separate [instructor deck](https://cyberlorians.github.io/a365-hub/instructor/).
Internal budget: 12 onboarding + 25 core minutes. Rehearse; no learner duration labels.

## Scope

Keep the introductory management, governance, security and business-value pillars,
then conceptual evaluation/monitoring/tracing grounded in
[Foundry observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability).
Foundry-specific coverage does not guarantee Copilot Studio/Agent 365 telemetry.
The IT support task is generic illustration, not a deployed sample.
All learner steps stay inside this workshop; no Academy, build, chat or knowledge test.

Introductory does not mean portal-only. Teach the read/decide/act support example
and its two attack surfaces before the registry walkthrough. Keep the visual
five-area Entra control map and connected security-operations response sequence
in Module 1; they were not moved into Module 2. The four authorized source
screenshots can be expanded on slide 8 without leaving the workshop.
Module 2 uses/tests an actual agent; Modules 3-7 configure and investigate.

## Before class

- **a-seed:** [Prepare/preflight the existing registry record](../../docs/07-module-01-admin-runbook.md#prepare-the-module-1-registry-review).
  No new helpdesk deployment is required.
- **a-risk:** Rehearse the existing approved staged Relay risk without duplicate
  flags. Same Project Beacon Relay Agent must show Security > Risk details >
  High / The agent is compromised. This is training, not a live attack.
- **a-l2:** Rehearse registry access and the six read-only checks as a fresh learner,
  not chat/source tests. No maker role changes. Fresh learner access has not been
  independently verified by prior admin observations.
- There is no current Module 1 **a-publish** preparation requirement.
- Preflight access/email/TAP privately. Never bypass CA/MFA or grant broad roles.
- Use the authorized four-pillar screenshots with their recorded scope. Image 3's
  unconfirmed rights remain separate; do not publish it.

## Delivery

Lab 1: three access steps. Lab 2: one account check. Lab 3: six steps, eleven
generated learner screens total. Launch Lab 3 after slide 11 and return to slide 12.
Find through admin.microsoft.com > Agents > All agents > Registry > Total agents >
search Project Beacon Relay > Enter > Project Beacon Relay Agent.
Read Details Owner/Created by; inspect Data & tools/Permissions; check staged risk;
inspect Activity; orally explain a fact, gap and accountable next check.
No required copying, worksheet, submission, student changes or extra portals.

## Recovery and honest outcomes

| Problem | Response |
|---|---|
| Learner blocked | Use the authorized live presenter for the same checks and record unresolved learner access; never elevate to maker/admin |
| Record absent | Investigate access/setup; a screenshot or illustration is not live completion |
| Blank owner/reach | State reporting gap/unknown; do not infer no ownership or permissions |
| Agents at risk filter empty | Use Total agents and exact Relay search; the count filter is faulty |
| Required profile risk missing | Use instructor live view or report unresolved access/setup; do not call the risk check complete |
| Empty Activity | State a coverage gap; inventory usage is not full execution/security/audit evidence |
| Overrun | Reduce narration, not required checks; record actual rehearsal time |

Current Module 2 mail runtime/content remains unchanged and needs its own preflight.
Using/testing and any optional maker build belong there; this revision does not
implement or deploy a replacement sample or optional path.
