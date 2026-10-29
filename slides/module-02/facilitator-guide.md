# Module 2 Facilitator Guide

**Rough draft, not a tested runbook.** Use the [per-slide notes](speaker-notes.md)
and [learner guide](../../labs/module-02-business-agent.md) together.

## Content review before preparation

Confirm useful scope and understandable actor/evidence boundaries. Then approve the
environment, one initial test user/mailbox, controlled internal recipient, actual
runtime/grants/credentials, synthetic input, roles, cost/run limit, and reset manifest.
No provisioning or GBB execution is authorized by reading the slides.

## Separate proofs

1. Healthy runtime and successful inference.
2. Actual internal receipt from the intended signed-in user.
3. Actual identities/registration and typed authority/grant mapping.
4. Verified downstream evidence path; exporter enabled is not ingestion.
5. Isolation, safe instructor consents and credential handling.
6. Two fresh learners, reload/expiry/error/reset recovery.
7. Another facilitator's 35-minute run without hidden setup.

The UI documents direct delegated-user Mail access, not automatically OAuth OBO or
an autonomous agent-user sender. Prompt review is not a technical approval boundary.

## Answer expectations

Useful-task proof: actual correct receipt and attributed action. Not proven merely
by delivery: least privilege, approval enforcement, complete DLP/runtime protection,
or all downstream visibility. A deviation could be an unapproved recipient/tool/data.
Look at the actual relevant tool/workload evidence, correlate identity, and scope the
decision to the actual target.

## Recovery and reset

| Failure | Response |
|---|---|
| Incorrect user/tenant/recipient or unsupported route | Stop and correct with the preparation owner |
| Inference/tool/auth failure | Explicit error and approved recovery; no wider grants or policy bypass |
| Uncertain send | Verify receipt before retrying |
| Missing/late downstream evidence | Label missing or use a real sanitized prior run with its own time |
| Unexpected action | Stop, preserve appropriate evidence, scope response/reset |
| No approved environment | Content walkthrough only, not a completed hands-on exercise |

Record current run / verified prior run / synthetic example / missing. Never forge
security-table data or join unrelated GBB and toolkit targets.
Remove/restore only run-owned resources/grants/messages under an explicit manifest.
Do not enable old cleanup or delete shared resources.

See the [per-module data/automation plan](../../docs/06-customer-learning-plan.md#16-per-module-data-and-automation-preparation).
