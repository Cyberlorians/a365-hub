# Module 2: Establish the Approved Agent Baseline

**Rough draft for content review - October 29, 2026.**
**Proposed duration:** 35 minutes, including the accompanying eight-slide flow.
**Status:** No test user, mailbox, agent deployment, message, or telemetry has been
created for this draft. This is not a tested runbook or evidence of a working lab.

Review alongside the [Module 2 presentation](https://cyberlorians.github.io/a365-hub/module-02/#slide-1).
Presenter notes are built into that presentation; press **N**.
The [master plan](../docs/06-customer-learning-plan.md) contains the eight-module story and
per-module data/automation considerations.

## What this module teaches

Establish useful, approved behavior before investigating misuse.

| Thread | Application |
|---|---|
| Playbook focus | Actual authority and legitimate tool use before living off the agent's tools (LOAT) |
| Risk | An action can succeed with poorly understood rights, data boundaries, or observability |
| Controls to verify | Isolated identity/mailbox, reviewed effective grants, approved internal recipient, supported policies, attributed evidence |
| Activity | Draft, review, explicitly request sending, verify receipt, complete a passport |
| Output | Observed actor/tool/action/result plus an honest operating-boundary statement |
| Decision | Define normal behavior and a deviation that needs investigation |

Prompt instructions and learner review are not proven technical approval or recipient
controls. Sending mail is a write capability, not read-only access.

## Before anything is provisioned

First review the content. Then approve a preparation plan covering:

1. A dedicated initial lab user/mailbox and a controlled internal recipient.
2. The selected tenant/subscription, entitlement, licenses, and cost limit.
3. Reviewed instructor roles, actual permissions/consent, and isolated resources.
4. The pinned runtime, actual authentication route, protected credential handling,
   registration, and evidence path.
5. Synthetic fixtures, run identifiers, manifest, support, and exact cleanup.

Use the approved onboarding/runtime preparation where appropriate; do not run every
source setup command or accept all grants by default. Existing disabled cleanup stays
disabled until a separate reviewed change. Do not bypass CA/device-compliance rules.

After an initial test, validate two fresh learner accounts and an independent
facilitator before calling the package hands-on-ready.

## Candidate runtime: important distinctions

Candidate: [Stefano's ACA-OBO setup at the reviewed revision](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md).

- Documented useful task: Mail MCP sends internal mail from the signed-in user's mailbox.
- The sample label does not prove OAuth OBO. Its documented web UI `/chat` route uses
  `MAIL_TOKEN_MODE=direct`, with delegated user authority.
- Do not assume an autonomous agent identity or optional agent user is the mailbox actor.
- Registration/app/object/telemetry identifiers have different types. Verify the real
  joins; display-name matches are not sufficient.
- Setup includes powerful instructor admin-consent steps and a blueprint client secret.
  The workload is not proven secretless end-to-end or least-privilege by this draft.
- Runtime health, inference, actual mail delivery, registration, and downstream
  observability each need separate proof.
- Reuse rights and third-party material must be confirmed before redistribution.

## Fictional teaching fixture

This short author-written brief is a proposed input, not tenant data, model output,
or security telemetry. It contains no customer information.

| Field | Synthetic value |
|---|---|
| Case | Project Beacon training rollout |
| Progress | Three of four documentation tasks complete |
| Remaining task | Review the architecture diagram |
| Next milestone | November 6, 2026 |
| Next action | Confirm the review owner by November 3, 2026 |
| Example sender | `learner-01@workshop.invalid` - non-routable placeholder |
| Example recipient | `beacon-recipient@workshop.invalid` - non-routable placeholder |
| Subject | `[A365 TRAINING] Project Beacon status` |
| Data boundary | Synthetic brief only; no attachments, retrieval, or extra sources |

The `.invalid` domain is reserved for invalid names. **Never attempt to deliver to
these placeholders.** After approval, substitute only the facilitator's verified real
internal test recipient and lab identity. No recipient has been provisioned yet.

## Proposed 35-minute activity

| Presentation slide | Step | Minutes |
|---|---|---:|
| 1 | Outcome and baseline | 2 |
| 2 | Approve the operating boundary | 2 |
| 3 | Identify the acting user and actual route | 4 |
| 4 | Draft and review from the synthetic brief | 7 |
| 5 | Explicit send and actual receipt | 5 |
| 6 | Inspect evidence and provenance | 7 |
| 7 | Passport and boundary explanation | 5 |
| 8 | Debrief and handoff | 3 |
| **Total** | **Presentation and activity together** | **35** |

### Step 1: Identify the approved boundary and actor

After preparation is approved and verified:

- Open only the prepared UI and correct isolated lab account.
- Confirm actual tenant and signed-in user privately with the facilitator.
- Record the planned agent/runtime, technical owner, sponsor, Mail tool, and recipient.
- Mark anything not independently verified as unknown.

**Checkpoint:** The mailbox sender is the signed-in user in this candidate task;
the exported agent identifier is a separate attribution field.

### Step 2: Request a draft, not a send

Proposed learner prompt:

```text
Use only this synthetic training brief to draft a 60-80-word internal status email.

Project: Beacon training rollout.
Progress: Three of four documentation tasks are complete.
Remaining task: Review the architecture diagram.
Next milestone: November 6, 2026.
Next action: Confirm the review owner by November 3, 2026.
Subject: [A365 TRAINING] Project Beacon status.

Return the subject and draft text only.
Do not send, invoke a sending tool, add recipients, add attachments, or invent facts.
```

Compare the output with the brief. If an unrequested action happens, stop and record
it; do not silently treat it as successful completion.

**Author-written illustrative body - not generated output or proof of a run:**

> Project Beacon's training rollout has completed three of its four documentation
> tasks. The remaining task is to review the architecture diagram. The next milestone
> is November 6, 2026. Please confirm who will own the diagram review by November 3,
> 2026, so we can track that remaining item. This status update uses only the synthetic
> training brief and is intended for the approved internal workshop recipient.

### Step 3: Review, then explicitly request sending

Proceed only in the later approved test environment:

1. Check facts, subject, recipient, and lack of attachments.
2. Use the facilitator-approved real internal recipient, not a `.invalid` example.
3. Explicitly request sending the reviewed message with no extra recipients/sources.
4. Record the response and inspect the recipient mailbox for actual receipt.
5. Verify sender, subject, content, and time.

If delivery is uncertain, check for receipt before retrying to avoid duplicate messages.
If tool/authentication access fails, stop and follow approved facilitator recovery.
Never widen permissions or bypass policy to make a learner check turn green.

**Checkpoint:** A draft, healthy endpoint, or successful HTTP response is not proof
that the intended email arrived.

### Step 4: Inspect evidence with provenance

| Evidence class | Record | Limit |
|---|---|---|
| Workload receipt | Real message, intended sender/recipient/subject/time | Does not prove every security control worked |
| Runtime/tool action | Actual tool/action, target, result, time, actor | Exact availability is not yet verified |
| Registration/authority | Actual objects, identifier types, owner/sponsor and effective grants | Do not substitute display names or infer objects |
| Downstream observability | Verified source/path, target/join key, time, result | Export configuration alone is not ingestion |
| Policy result, if tested | Actual scoped policy and audit/warn/block outcome | Not part of baseline proof unless independently tested |

Every record must use one of these modes:

- **Current run:** evidence from the learner's present activity.
- **Verified prior run:** real sanitized evidence with its own time and actual target.
- **Synthetic example:** author-created teaching content, not system evidence.
- **Missing:** a coverage/preparation gap, not a safe outcome.

A prior verified record can cover downstream ingestion delay when clearly labeled.
Do not make it appear to be the learner's current event. There is no validated
evidence pack yet. GBB's separate model fixture must not be joined to the toolkit agent
as though it were the same runtime.

### Step 5: Complete the passport

| Field | Learner record after preparation |
|---|---|
| Purpose | |
| Runtime/platform and version | |
| Agent/registration identifiers, each with type and source | |
| Acting user/mailbox | |
| Technical owner | |
| Business sponsor/accountability | |
| Actual authentication/authority route | |
| Effective tool/resource permissions | |
| Approved data/recipient boundary | |
| Action, result, and timestamp | |
| Evidence source/location, target/join key, and mode | |
| Remaining gap and response owner | |

Keep actual operational identifiers in approved restricted records. Public materials
use placeholders. Never record/publish credentials, TAPs, tokens, real attendee
information, production messages, or unnecessary sensitive prompt content.

### Step 6: Explain the result

Answer:

1. What useful task did the actual result prove?
2. What remains unproven about effective permissions or security controls?
3. What unexpected action would matter, and which evidence/decision would follow?

Examples of deviations: an additional recipient, an unrequested tool, unexpected
data, or missing attributed evidence. These are discussion questions, not live attack
or exfiltration instructions.

## Future facilitator acceptance and recovery

| Condition | Required response |
|---|---|
| Health is good but inference fails | Record the inference failure; do not proceed as a successful task |
| Wrong tenant, user, mailbox, recipient, or authority | Stop; resolve with the authorized preparation owner |
| Expired token / 401 | Approved re-authentication/refresh and retest; do not bypass CA or increase grants |
| Tool permission error | Stop and review intended grants with the instructor; no blanket consent shortcut |
| Send response uncertain | Check mailbox/tool evidence before any repeat send |
| Downstream data delayed | Use a real labeled prior run if available; otherwise mark missing and explain the gap |
| Unexpected action or policy mismatch | Stop, preserve appropriate evidence, scope response, and reset only the affected target |
| No approved environment or verified demonstration | Review the draft conceptually; do not claim a hands-on completion |

Eventual completion requires the intended real receipt, accurate actor/authority,
proven evidence path, completed passport, and defensible operating-boundary explanation.
Reset only resources/grants/messages created for the approved run, according to an
explicit manifest. Do not turn on old account-age cleanup or delete shared resources.

## Data and automation: prepare only after review

| Needed | First choice | Automation consideration |
|---|---|---|
| Initial lab user and recipient | Approved isolated onboarding plus controlled internal mailbox | Confirm licenses, roles, account lifecycle, support, and cleanup before creation |
| Runtime | Reuse the reviewed candidate with approved settings | Review script permissions/consents/secrets and cost before executing |
| Brief | This static synthetic text is sufficient | No data generator or document store required |
| Receipt and tool activity | Run the approved task | Capture real results; never forge security-table rows |
| Registration/observability | Verify real target and supported evidence source | Optional bounded read-only export after schema/access validation |
| Rehearsal | One initial proof, then two fresh learner accounts | Independent facilitator verifies repeatability and safe recovery |

GBB can inform approved later setup, scenarios, and hunting. It is not a reason to
deploy its entire environment for this baseline activity.

## Sources

- [Cloud-Architekt Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md): required threat-model spine.
- [Stefano ACA-OBO setup](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md): candidate task, web route, preparation and credential caveats.
- [Stefano observability](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/aca-a365-observability.md): exporter/downstream checks.
- [Microsoft Learn Agent 365](https://learn.microsoft.com/microsoft-agent-365/overview),
  [agent governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview),
  and [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365):
  supported capabilities, prerequisites, and limits.
