# Module Development Roadmap

**Updated October 29, 2026.** This is the eight-module security journey, replacing
the old six-module map. The original anatomy module moves to Module 3.

| Module | Current deliverable | Remaining gate |
|---|---|---|
| [1. See It. Control It. Protect It.](../slides/module-01/README.md) | Reworked 18-slide package: five planned onboarding slides + thirteen core slides, notes, check, handout, sources | User content review, actual presentation-mode preparation, independent 25-minute rehearsal |
| [2. Establish the Approved Agent Baseline](../slides/module-02/README.md) | Separate eight-slide rough draft, notes, synthetic learner guide, passport, recovery guidance | User review before provisioning; actual runtime/authority/task/evidence proof; fresh learners; 35-minute rehearsal |
| 3. Identity, Authority, and Blast Radius | Playbook-aligned scope, output, source map, preparation needs | Actual authority diagram and validated activity |
| 4. Governance and Lifecycle | Playbook-aligned scope and governance-case design | Supported roles/entitlements, actual effect, reset |
| 5. Data and Compliance Evidence | DLP/Compliance Manager activity design | Scoped supported policy/result, action record and evidence |
| 6. Compromise and Misuse | Separate GBB/identity-case design | Authorized fixture, actual observed or labeled prior-run evidence |
| 7. Investigate and Contain | Defender/ISOC investigation and response design | Source/engine/schema/keys, scope, retest/reset |
| 8. Prove Readiness and Plan Adoption | Four flags and pilot decision design | Validated earlier evidence, answer key, timing |

## Publication versus readiness

- **Public draft:** reviewable content exists at stable module URLs.
- **Content-ready:** feedback incorporated, sources/supporting surfaces aligned.
- **Hands-on-ready:** actual task, supported controls/evidence, fresh accounts, explicit
  error recovery, safe reset, and independent timed rehearsal pass.

No tenant provisioning, test-user creation, GBB execution, or data generator deployment
was performed for the current publication. Automation candidates for all eight modules
are recorded in the [master plan](06-customer-learning-plan.md#16-per-module-data-and-automation-preparation).

## Platform state

Existing managed-identity onboarding/deployment scripts remain in the repository.
Historical successful runs do not establish this event's live state. Local operational
notes report cleanup disabled. Verify TAP expiry, CA, licenses, mailbox/UI access, and
controlled cleanup. Never infer TAP expiry from account age.

No broad learner admin roles; presenter access stays presenter-only. XDR/Sentinel
read access, tenant changes, and entitlement details require per-event validation.

## Detection workstream

The [detection pack](../detections/README.md) remains a backlog, not tested production
rules. Candidate cases include blueprint credential changes, excessive grants, TAP
creation, secret-authenticating blueprints, and activity attribution. Validate current
`AgentsInfo`, relevant activity/behavior/alert tables, engines, keys, history, roles,
license, expected output, tuning, and response. New identities do not have a
fourteen-day baseline by default.

## Definition of done

Each module needs objectives, prerequisites, timed slide flow, sources, instructions,
checkpoint/answer key, actual role/control/evidence validation, error recovery, scoped
reset, and independent rehearsal. A source guide or README checkbox is not proof.
No secrets, live tenant identifiers, real attendee data, or unapproved third-party
content belongs in public packages.

Near term: review Modules 1-2 -> approve preparation -> prove one task -> finalize ->
test fresh learners -> rehearse. Then author Modules 3-8 against the same customer case
and playbook focus. See the [master plan](06-customer-learning-plan.md).
