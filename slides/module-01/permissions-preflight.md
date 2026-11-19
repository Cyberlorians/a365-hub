# Module 1 Permissions and Preparation

The presentation calls no tenant APIs. Lab 1 links to the event's access form, so
approve and smoke-test that route before delivery; skip it for content-only review.
Learners do not need admin/write roles.

For the ordered operator process, use the
[Module 1 admin runbook](../../docs/07-module-01-admin-runbook.md); the audience uses
the [learner walkthrough](../../labs/module-01-security-foundation.md).

| Later presentation mode | Required preparation |
|---|---|
| Slides only | Browser/navigation/notes/print checks; no claim that a real agent was reviewed |
| Approved live Registry view | Preflight AI Reader for exact run-owned learners; test a fresh account and tab visibility. Use an authorized presenter view if blocked, never a learner write role |
| Verified screenshot/prior run | Authorized sanitized content, source/target/time/mode, rights |
| Onboarding | Separate approved form-to-workflow test, actual account/license/email/TAP/CA behavior, support and cleanup |
| Later Module 2 task | Its own isolated mailbox/UI/tool/authority/evidence preflight, not inherited from Microsoft 365 home access |

Do not grant Global Administrator or other broad learner roles to fix missing menus.
Do not bypass CA/device compliance, publish TAPs, or assume a universal eight-hour TAP
or no-Authenticator flow.

Verify the required staged Relay risk through **Registry > Total agents > search
Relay > Enter > Project Beacon Relay Agent > Security > Risk details**. Expect
**High / The agent is compromised.** Test this with AI Reader; use the live presenter
view if learner visibility is blocked, without granting more roles. The risk-count
filter can return no agents despite visible profile risk. Missing profile risk
blocks readiness. A fixed count of 1 and populated Activity are not required.

Local operational notes report cleanup disabled; verify live state. Do not infer TAP
expiry from account age or enable destructive cleanup merely to prepare slides.

See the [Module 2 preparation](../module-02/facilitator-guide.md) and
[existing deployment runbook](../../docs/05-onboarding-deployment-runbook.md).
