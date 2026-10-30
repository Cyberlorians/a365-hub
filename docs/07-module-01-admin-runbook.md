# Module 1: Admin and Presenter Step-by-Step Runbook

**Updated:** October 30, 2026.
**Status:** Written operator walkthrough. Slide/browser checks do not establish live
tenant access, successful onboarding, or an independent 25-minute rehearsal.

[Module 1 slides](https://cyberlorians.github.io/a365-hub/#slide-6) |
[Learner steps and worksheet](../labs/module-01-security-foundation.md) |
[Speaker notes](../slides/module-01/speaker-notes.md) |
[Module 2 admin runbook](08-module-02-admin-runbook.md)

## 1. Select the run mode

Record one mode before opening any tenant portal:

| Mode | Allowed actions | Required evidence |
|---|---|---|
| Content review | Open slides/guide, discuss fictional card, answer check | Record wording/navigation findings; no account or tenant changes |
| Prepared presentation | Present a preflighted read-only lab view or authorized sanitized prior run | Real target/source/time and limits; never imply prior-run data is current |
| Event onboarding + presentation | Approved form/account/sign-in flow followed by prepared presentation | Separate tested onboarding plan, support owner, credentials/privacy/expiry handling |

**Current published default:** content review. No event signup is connected.
Do not create a user merely to review Module 1.

## 2. Prepare the operator record

1. Assign presenter, access-support owner, evidence owner, and reset owner. One person
   may hold several responsibilities; do not confuse roles with standing admin rights.
2. Record event/run ID, content revision, mode, date/time zone, and evidence retention
   location in approved restricted records.
3. For a live view, record the authorized tenant, presenter account/role, actual feature
   entitlement, selected target's typed identifiers, and permitted scope.
4. Record what will be fictional, current, prior-run, or unavailable.
5. Confirm the blue deck is used; do not replace lesson content with an older deck.

**Checkpoint:** Mode and owners are known. Any missing live prerequisite means review/
prior-run mode, not permission escalation or a silent readiness claim.

## 3. Preflight the presentation without a tenant

1. Open [Module 1 slide 6](https://cyberlorians.github.io/a365-hub/#slide-6).
2. Click Next through slides 6-18; use Jump to return to slide 9.
3. Open **Notes (N)** and confirm the note matches the current slide.
4. Open **Learner guide** and **Admin runbook** in the toolbar.
5. Open **Data & automation** and verify that preparation remains gated by approval.
6. If printing, preview all eighteen slides; onboarding is outside the core timebox.
7. Keep the four-question learner worksheet and slide 16 answer key ready.

**Checkpoint:** Correct slides, links, notes, and worksheet. This is a content/browser
preflight, not a test of identity, policy, telemetry, or delivery timing.

## 4. Prepare one read-only agent view, only if approved

Skip this section for content review.

1. In a separate presenter browser profile, sign into the approved lab tenant with the
   smallest authorized role that supports the intended view. Confirm account and tenant.
2. Open Microsoft 365 admin center at `https://admin.microsoft.com`.
3. In the reviewed experience, select **Agents -> All agents -> Registry**.
   Recheck the actual tenant's navigation; do not invent a missing view.
4. Open the selected safe lab agent. Read purpose, owner/publisher, available platform/
   access context, and activity/security information. Do not block, deploy, delete,
   change grants, or switch policy state.
5. Record what each field actually establishes. Verify identifiers against the real
   preparation record; display names and inventory counts alone are insufficient.
6. Prepare a sanitized authorized screenshot/prior-run record if needed, recording
   target/source/time and permission to show it.
7. Remove credentials, attendee information, unrelated tenant content, and sensitive
   prompts from any shared view.

**Checkpoint:** A legitimate view or explicitly labeled fallback exists. The published
slide 11 card remains fictional; do not describe it as a Registry export. Zero risk
counts or empty activity do not prove safety.

Module 1 does not require opening Purview or Defender live. Slides explain those
control/evidence planes. No DLP, GSA/TLS, ISOC enrollment, connector, or query deployment
is a prerequisite.

## 5. Optional event onboarding: a separate approval gate

Skip for content review or a presentation without learner sign-in.

1. Obtain approval for the specific isolated event user lifecycle, form/data collection,
   licenses, TAP/authentication configuration, CA behavior, mailbox needs, and support.
2. Review the [existing deployment reference](05-onboarding-deployment-runbook.md) and
   the actual scripts/templates before choosing a preparation method. It is not a
   current-event readiness certificate.
3. **Do not run bulk teardown or age-based cleanup.** Local notes report automated
   cleanup disabled. Account age is not TAP expiry. Verify actual live state and
   approve a manifest-based cleanup plan independently.
4. After authorization, test one event submission end-to-end: intended identity,
   license/access, credential delivery, actual sign-in prompts, and intended app access.
   Never project TAPs or record them in public run notes.
5. Confirm configured credential lifetime/reuse rather than promise eight hours or
   no Authenticator/device prompts. Resolve restrictions with the policy owner.
6. Only then deliver slides 1-5: access process 2 minutes, submission 3, email 4,
   sign-in 4, readiness 2. Record actual timing separately.

**Checkpoint:** Explicit approval and actual end-to-end proof before enrollment is
described as working. Opening Microsoft 365 home does not prove Module 2 mailbox/UI/
tool access. Module 1 learners never inherit presenter admin roles.

## 6. Deliver the core in 25 proposed minutes

Follow the [learner step table](../labs/module-01-security-foundation.md#walk-through-the-core)
and [per-slide notes](../slides/module-01/speaker-notes.md).

| Slides | Operator action | Checkpoint |
|---|---|---|
| 6-7 | State secure-adoption outcome and fictional status-mail case | Audience knows four review questions |
| 8-9 | Contrast tool action and dual attack surfaces | Legitimate authentication is not proof of safe behavior |
| 10-11 | Use one real/labeled view, or clearly fictional card | Actual versus hypothetical fields are distinguished |
| 12 | Explain five pillars without five demos | Flow/target/route support caveats remain |
| 13-15 | Connect supported data controls, runtime/tool evidence, and operations | Audit/block and event/behavior/alert/incident remain distinct |
| 16 | Allow two minutes to answer, one to discuss | At least 3/4 including question 3; revisit slide 9 when missed |
| 17-18 | Gap-first E7 fit; handoff | No exclusivity/universal-coverage claim; Module 2 preparation gate retained |

No live attack, containment, tenant policy edit, or production-content demonstration.

## 7. Troubleshoot, close, and record

| Failure | Stop / recovery |
|---|---|
| Missing portal or role | Record reason, use labeled fallback; do not grant broad roles |
| Missing evidence | Mark unknown; no safety claim |
| Access/credential failure | Support owner handles approved recovery; never bypass CA |
| Wrong tenant, unsafe content, exposed secret | Stop sharing; follow authorized incident/remediation process |
| Poor dual-plane understanding | Revisit slide 9 and repeat question 3 |
| Time overrun | Remove extra demos, not safety caveats; record actual duration |

1. Collect only approved worksheet results and content feedback.
2. Close presenter tenant tabs and sign out as appropriate; no deletion is required
   for a content-only walkthrough.
3. If onboarding created resources, use only its approved run manifest and verified
   cleanup process. Do not bulk-delete all `department=workshop` users.
4. Complete this run record in restricted event notes:

| Field | Record |
|---|---|
| Run ID / revision / date / operator | |
| Mode and selected actual target or fictional fixture | |
| Current/prior/synthetic/missing evidence and source/time | |
| Onboarding approved/tested or skipped, with reason | |
| Actual core minutes; independent facilitator or author-only review | |
| Knowledge-check outcome and remaining gap | |
| Error / owner / next step | |
| Reset not needed / verified / blocked, with manifest reference | |

**Release gate:** User feedback incorporated, actual chosen presentation mode prepared,
and independent timed rehearsal completed. Browser checks alone do not satisfy it.
See the [master plan](06-customer-learning-plan.md) and
[source map](../slides/module-01/sources.md).

## Content walkthrough record: October 30, 2026

| Verification | Result |
|---|---|
| Guide links cover core slides 6-18 in order | Passed static validation; proposed row timings total 25 minutes |
| All eighteen presentation slides at desktop/mobile widths | Passed browser visibility/layout and note-population checks |
| Learner/admin toolbar links, Home navigation, notes open/close | Passed browser checks |
| Restored navy/cyan branding | Verified unchanged |
| Live onboarding, real Registry/policy/evidence, reset | Not run |
| Independent facilitator and measured teaching duration | Not run; 25 minutes remains a proposed timebox |

This is an author-assisted content/browser walkthrough, not a completed event run record.
