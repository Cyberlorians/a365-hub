# Module 1 Facilitator Guide

Use the [notes](speaker-notes.md) for all seventeen slides.
The 25-minute core starts at slide 6; five onboarding slides sit outside it.
Onboarding is budgeted at 12 minutes, including the single-screen, one-minute
Lab 2 sign-in check. Do not repeat Slide 4's instructions for signed-in learners.

Use the [learner step-by-step guide](../../labs/module-01-security-foundation.md)
and [ordered admin runbook](../../docs/07-module-01-admin-runbook.md) for a complete
walkthrough. They separate content-only rehearsal from authorized tenant preparation.

## Delivery

- Lead with secure AI adoption, the dual attack surface, and one customer case.
- Use one preflighted read-only Registry view or authorized sanitized prior-run
  evidence with source/time. The teaching deck now describes that review, not a
  fictional card. Registration does not prove a working runtime.
- Explain the five Entra pillars without five demos. Keep deep flow/authority work
  for Module 3; do not promise CA on every exchange or universal gateway coverage.
- On slide 8, use the four
  [Agent ID scenario prompts](../../grounding/reference-images.md#image-3---agent-id-scenarios)
  for a one-minute orientation: Agent 365 visibility, Microsoft runtimes, external
  agents calling Microsoft APIs, and cross-cloud federation. These lenses overlap.
  The student deck uses original text; the supplied picture remains a reference
  pending provenance/reuse confirmation. Defer authority tracing to Module 3 and
  credential-abuse mechanics to Module 6. Do not add four deployments.
- Explain Purview supported data controls, owned improvement evidence, and the
  Defender/ISOC loop. Do not add three live portal transitions.
- Lab 3 uses eight minutes across slide 11's review and slide 12's control mapping,
  not eight additional minutes. Match one observed gap to a control as learners
  finish the registry review. The proposed 25-minute core still needs rehearsal.
- Start Lab 3 directly in the registry. No worksheet, copying exercise or written
  submission is required. Let learners continue when a risk list or Permissions
  and Data & tools is blank; explain that the information is unknown from this view.
- Keep timing estimates in instructor planning only, not on student lab pages.
- Keep the story on the fictional Beacon coordinator, three-fact brief, human review
  and approved recipient. Slide 9 compares two possible causes of a wrong email;
  slide 14 gives log navigation for instructor/later-module follow-up, not a new
  learner access requirement.
- Close with slide 16's readiness discussion: four answers, one gap and one owned
  next action. Revisit slide 9 if legitimate sign-in is treated as safe behavior.
- Prepare the required staged-risk Relay Agent. Select Total agents, search Relay,
  press Enter, then open Security > Risk details: High / The agent is compromised.
  Verified in the admin view on November 19; the risk-count filter still returned
  an empty list. Test the profile route with AI Reader before class. Missing risk
  blocks preparation; do not mark an empty list as completion or flag the Mail Agent.
- Test AI Reader access with a fresh learner. If unavailable, use the presenter
  evidence rather than granting write roles. Finish with feedback for the next session.
- Handoff to the separate [Module 2 draft](../module-02/README.md).
- The former sales slide is removed. Slide 17 is now the Module 2 handoff.

## Review and preparation gates

Content review precedes test users, fake-data fixtures, simulator execution, and
automation. Then approve the isolated environment, actual roles/entitlements,
presentation/evidence mode, cost/run bounds, and exact reset manifest.
No broad admin roles for attendees, policy bypass, or silent account-age cleanup.

## Recovery

### Presenter preflight observation: November 18

The prepared Mail Agent profile opened through **Agents > All agents > Registry**.
Its Details, Users, Data & tools, Security, Permissions and Activity tabs were
present. Data & tools reported unavailable, Permissions displayed
`AgentIdentity.CreateAsManager`, and Security linked to Entra protections.
Use these as observed visibility limits, not as evidence of mail authority,
runtime success or policy enforcement. Do not copy management permissions into
the learner's intended mail boundary. Activity loading or an empty panel is not
proof that no activity occurred. Recheck before each event.

This was an authorized presenter session, not a fresh AI Reader learner test.
No tenant settings were changed. The read-only presenter route is usable for
content review; independent rehearsal and learner-access validation remain open.

| Problem | Response |
|---|---|
| Identity-only interpretation | Revisit slide 9; distinguish injection-time versus later identity evidence |
| Missing actual agent view | Use prepared labeled prior-run evidence or record the activity as blocked; do not claim live inventory success |
| Empty/late telemetry | State missing/late coverage; do not infer safety |
| Portal/role unavailable | Use approved prior-run evidence or narrow scope; do not elevate learners |
| Onboarding trouble | Confirm real event setup with the owner after approval; do not activate signup in the draft |
| Time overrun | Remove extra demos, not the control/evidence caveats or knowledge check |

Rehearse with another facilitator; confirm source/HTML/notes parity, keyboard/notes/
print behavior, proposed 25-minute timing, and explicit release mode.
See [permissions](permissions-preflight.md), [exercise](exercise.md),
and [master plan](../../docs/06-customer-learning-plan.md).
