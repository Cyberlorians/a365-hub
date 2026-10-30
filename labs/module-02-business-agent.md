# Module 2: Follow Along Step by Step

<!-- source-only -->
[Open the visual student lab inside Module 2](https://cyberlorians.github.io/a365-hub/module-02/?view=lab).
This Markdown file is the editable source; the presentation includes chat, email and evidence illustrations.
<!-- /source-only -->

**What you will do:** Use the lab agent to draft an email, review it, explicitly request
sending, and check the real result.
**You need:** Your tested lab account, the deployed agent URL, one approved internal
recipient, and the admin's go-ahead.
**Allow:** 35 minutes after admin setup. Use fictional training data only.

## Get ready

1. [Open Module 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) in a second tab.
2. Open the **agent URL supplied by the admin**, not the slide URL.
3. Click **Sign in**. Use your isolated lab account, not your personal/production account.
4. Select **Project Beacon Mail Agent**. You should see a message box and **Send** button.
   Here, **Send** submits a chat message; it is not itself an email approval control.
5. Confirm the recipient with the admin. Keep this guide and a blank note open.

If you have only the slides, stop here: the admin must complete the
[deployment and live checks](../docs/08-module-02-admin-runbook.md).
The public slide site is not the deployed agent.

## Step 1: Name the task (2 minutes)

**Do:** Open [Slide 1](https://cyberlorians.github.io/a365-hub/module-02/#slide-1).
Write: "Draft, review, and send one internal Project Beacon status email."

**Check:** The goal is to establish normal behavior before investigating misuse.
That is this module's focus from the Agent Identities playbook.

**Next:** Step 2.

## Step 2: Set the limits (2 minutes)

**Do:** Open [Slide 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-2).
Under your task, write: "Supplied fictional facts only. One approved internal recipient.
No attachments, extra sources, or extra recipients."

**Check:** These are the intended limits, not proof that a technical policy enforces them.

**Next:** Step 3.

## Step 3: Identify who would send it (4 minutes)

**Do:** Open [Slide 3](https://cyberlorians.github.io/a365-hub/module-02/#slide-3).
Confirm the lab username shown in the agent UI. Write: "Mail sends from this signed-in
user's mailbox." Record the lab username privately, not in public notes.

**Check:** The signed-in user is your assigned lab user. The agent's registration is
a separate object. Do not treat the sample `.invalid` address as a working account.

**Next:** Step 4.

## Step 4: Ask the agent for a draft (7 minutes)

**Do:** Open [Slide 4](https://cyberlorians.github.io/a365-hub/module-02/#slide-4).
Copy this into the agent's message box and click the chat **Send** button:

```text
Use only this fictional brief to draft a 60-80-word internal status email.
Project: Beacon training rollout.
Progress: Three of four documentation tasks complete.
Remaining task: Review the architecture diagram.
Next milestone: November 6, 2026.
Next action: Confirm the review owner by November 3, 2026.
Subject: [A365 TRAINING] Project Beacon status.

Return the subject and draft text only.
Do not send email, call a sending tool, add recipients, attachments, or facts.
```

**Check:** A draft appears. Check the word count, all five facts, and subject.
No email should be sent yet. If the agent acts before you request it, stop and tell
the admin. The prompt is an instruction, not a proven technical approval boundary.

**Next:** Step 5.

## Step 5: Request sending and check receipt (5 minutes)

**Do:** Open [Slide 5](https://cyberlorians.github.io/a365-hub/module-02/#slide-5).
Check the draft with the admin. Replace **both placeholders** below, paste the complete
instruction into the same chat, and click the chat **Send** button:

```text
Send only this reviewed training email to the single approved internal recipient.
To: <approved-real-internal-recipient>
Subject: [A365 TRAINING] Project Beacon status
Body:
<paste-the-reviewed-draft>

Do not add recipients, attachments, sources, or facts.
```

Ask the facilitator to check the controlled recipient's Outlook. You do not need access
to someone else's mailbox.

**Check:** The actual email arrives with the correct sender, recipient, subject, body,
and time. A chat success message alone is not receipt. If uncertain, ask the admin to
check before retrying; do not send duplicates or broaden permissions.

**Next:** Step 6.

## Step 6: Record the proof (7 minutes)

**Do:** Open [Slide 6](https://cyberlorians.github.io/a365-hub/module-02/#slide-6).
Ask the facilitator to show the actual records. For each item below, write the result,
source, and time, or write "not observed":

- The intended recipient received the email.
- A tool record identifies the action, target, time, and result.
- The user, agent registration, and actual permissions are verified.
- Any claimed security-policy result has its own evidence.

**Check:** Distinguish your current run from a clearly labeled earlier run, a fictional
example, or missing evidence. Do not invent logs, alerts, IDs, or a successful policy test.
A missing downstream record remains a gap even when email delivery succeeds.

**Next:** Step 7.

## Step 7: Make a short agent record (5 minutes)

**Do:** Open [Slide 7](https://cyberlorians.github.io/a365-hub/module-02/#slide-7).
Fill in these six lines in a private note. The longer record is optional below.

```text
Task: Draft, review, and send a Project Beacon status email.
Sender: <actual lab user>
Responsible owner: <admin-provided owner>
Allowed data/tool: Fictional brief, Mail tool, one approved internal recipient.
Result/evidence: <actual receipt and tool record, or the exact failure/missing proof>
Next gap: <one permission, data-policy, or observability question still unproven>
```

**Check:** Your record separates what you actually observed from what remains unproven.

**Next:** Step 8.

## Step 8: Explain what you learned (3 minutes)

**Do:** Open [Slide 8](https://cyberlorians.github.io/a365-hub/module-02/#slide-8).
Answer: What did we do? What did we not prove? What unexpected action would worry us?

**Check:** If the task passed, a good answer is: "The intended email arrived. This does
not prove every security control. An extra recipient or unrequested tool needs investigation."
If it failed, describe the failure instead of claiming success.

**Next:** Save your approved evidence note, click **Sign out**, and close the lab profile.

## Finished

You should have a real checked outcome, a six-line agent record, and a list of remaining
gaps. The admin handles message retention, account shutdown, and Azure cleanup.
Do not delete shared resources.

Presenting this module? Use the [simple admin steps](../docs/08-module-02-admin-runbook.md).
Stop on an error, unexpected recipient/tool action, wrong account, or missing approval.
Do not bypass Conditional Access or request blanket permissions to complete a step.

<details>
<summary>Optional reference: future live prompts, full agent record, evidence, and sources</summary>

## Start here: choose review or live mode

1. Open [slide 1](https://cyberlorians.github.io/a365-hub/module-02/#slide-1)
   and this guide side-by-side. Slides and activity together take 35 proposed minutes.
2. Ask the facilitator which mode applies:
   - **Content review (current):** read the proposed steps and author-written example;
     do not sign in, call a model/tool, create users, or send messages. In the passport,
     write "not provisioned" or "not observed" where applicable.
   - **Approved live proof:** the admin supplies a privately verified lab user, UI URL,
     selected agent/control labels, and controlled internal recipient. Use only these
     values after the admin confirms the setup/evidence gate passed.
3. Keep the synthetic brief and a blank passport available.
4. Do not proceed live when the URL, user/tenant, recipient, actual authority, or support
   owner is unknown. A `.invalid` address or fictional record is never a live substitute.

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
| [Slide 1](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) | Outcome and baseline | 2 |
| [Slide 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-2) | Approve the operating boundary | 2 |
| [Slide 3](https://cyberlorians.github.io/a365-hub/module-02/#slide-3) | Identify the acting user and actual route | 4 |
| [Slide 4](https://cyberlorians.github.io/a365-hub/module-02/#slide-4) | Draft and review from the synthetic brief | 7 |
| [Slide 5](https://cyberlorians.github.io/a365-hub/module-02/#slide-5) | Explicit send and actual receipt | 5 |
| [Slide 6](https://cyberlorians.github.io/a365-hub/module-02/#slide-6) | Inspect evidence and provenance | 7 |
| [Slide 7](https://cyberlorians.github.io/a365-hub/module-02/#slide-7) | Passport and boundary explanation | 5 |
| [Slide 8](https://cyberlorians.github.io/a365-hub/module-02/#slide-8) | Debrief and handoff | 3 |
| **Total** | **Presentation and activity together** | **35** |

### Step 1: Identify the approved boundary and actor

After preparation is approved and verified:

1. Read slides 1-2 and repeat the approved task/data/recipient boundary.
2. At slide 3, open only the verified UI URL supplied by the facilitator; do not guess
   a host or reuse an earlier event's link.
3. Sign in with the isolated lab identity and confirm actual tenant and signed-in user
   privately with the facilitator.
4. Select only the verified candidate agent. Use the actual UI labels recorded by the
   admin; the workshop has not yet verified a particular chat button/control.
5. Record the runtime, technical owner, sponsor, Mail tool, and recipient.
6. Mark anything not independently verified as unknown.

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

At slide 4, paste the prompt into the approved UI and submit through the chat control
identified during admin preflight. Expect draft text only. Check the 60-80-word body,
facts, subject, and lack of attachments/extra sources. In review mode, read the example
below instead of submitting anything.

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

At slide 5, use this proposed instruction only after all placeholders are replaced
with privately approved real values and the draft is reviewed:

```text
Send only the reviewed message below to the single approved internal test recipient.
To: <approved-internal-recipient>
Subject: [A365 TRAINING] Project Beacon status
Body:
<paste-the-reviewed-draft>

Do not add recipients, attachments, sources, or facts.
```

These are instructions, not a proven technical allowlist/approval control. Record the
tool's actual result. The facilitator checks the controlled recipient mailbox and
confirms actual receipt; do not request access to another person's mailbox yourself.
If the UI cannot perform the task as documented, stop and record the blocker.

If delivery is uncertain, check for receipt before retrying to avoid duplicate messages.
If tool/authentication access fails, stop and follow approved facilitator recovery.
Never widen permissions or bypass policy to make a learner check turn green.

**Checkpoint:** A draft, healthy endpoint, or successful HTTP response is not proof
that the intended email arrived.

### Step 4: Inspect evidence with provenance

At slide 6, ask the facilitator to show the authorized evidence for the actual target
and explain the source/time/mode. You do not need admin portals or raw prompt access
to observe the explanation. Record missing fields explicitly.

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

Use slide 7. Fill each field from observed/admin-verified records, not sample names.

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

Use slide 8. In content review, explain what a future result would prove; do not claim
that a send or security check has already occurred.

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

</details>

## Sources

- [Cloud-Architekt Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md): required threat-model spine.
- [Stefano ACA-OBO setup](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md): candidate task, web route, preparation and credential caveats.
- [Stefano observability](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/aca-a365-observability.md): exporter/downstream checks.
- [Microsoft Learn Agent 365](https://learn.microsoft.com/microsoft-agent-365/overview),
  [agent governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview),
  and [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365):
  supported capabilities, prerequisites, and limits.
