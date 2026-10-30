# Module 1: Admin - Start Here

<!-- source-only -->
[Open this as a visual instructor presentation](https://cyberlorians.github.io/a365-hub/?view=admin).
Use [instructor lab notes](https://cyberlorians.github.io/a365-hub/?view=lab&instructor=1)
for teaching cues alongside the student steps. This Markdown file is the editable source.
<!-- /source-only -->

**Goal:** Prepare the lab accounts, test sign-in, then deliver Module 1.
Complete this guide **and the Module 2 admin steps before class**.
The new scripts are a deployable package, not a claim that your tenant has been tested.

Use an authorized **dedicated lab tenant**. Never run this in production.
Keep the checkout and `.workshop` on a private, non-shared disk, not a synced/shared folder.
You need PowerShell 7.2+, Git, Azure CLI, available mailbox/Agent 365 entitlements, and
an admin authorized to create ordinary users/groups, assign the selected licenses,
and issue Temporary Access Passes (TAPs). Learners get **no admin roles**.

## Step 1: Get the files

**Do:** Open PowerShell 7 and run:

Already have the checkout? Open it in PowerShell and skip this clone block.
Do not copy the example over an existing working config.

```powershell
$ErrorActionPreference = 'Stop'
git clone https://github.com/Cyberlorians/a365-hub.git
if ($LASTEXITCODE -ne 0) { throw 'Clone failed' }
Set-Location .\a365-hub
```

From the repository root, prepare the local files:

```powershell
$ErrorActionPreference = 'Stop'
if (-not (Get-Module -ListAvailable Microsoft.Graph.Authentication)) {
  Install-Module Microsoft.Graph.Authentication -Scope CurrentUser
}
New-Item -ItemType Directory -Path .\.workshop -Force
if (-not (Test-Path .\.workshop\config.json)) {
  Copy-Item .\labs\workshop\config.example.json .\.workshop\config.json
}
$hub = (Get-Location).Path
```

**Check:** You see the scripts and a local config file. `.workshop` is excluded from Git.
Keep this PowerShell window open for the following commands.

**Next:** Step 2.

## Step 2: Set your lab values and create its group

**Do:** Replace these three values, then run:

```powershell
$tenant = '<your-tenant-guid>'
$domain = '<your-verified-tenant-domain>'
$run = 'beacon01'

.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain `
  -RunName $run -Stage PrepareGroup
```

Sign in as the authorized lab administrator. Review the requested Graph scopes before
consenting. The script creates one security group; it does not change any tenant policy.

**Check:** The output contains `Group ID:`. Record it privately.
An error stops the script; do not continue until it is resolved.

**Next:** Step 3.

## Step 3: Allow TAP sign-in for that group

**Do:** Open [Microsoft Entra admin center](https://entra.microsoft.com).
Go to **Entra ID -> Authentication methods -> Policies -> Temporary Access Pass**.
Enable TAP for the **A365 Hub beacon01** group from Step 2, not the entire organization.
Configure a lifetime that permits your planned 180-minute lab window and permits a
multi-use pass. Save. The actual tenant policy must allow the requested duration.

This is the one authentication-policy setup step; the script intentionally does not
weaken Conditional Access or change MFA/device-compliance requirements.

**Check:** The saved policy targets the correct group. Actual sign-in is tested in Step 5.
If you cannot edit it, have the Authentication Policy Administrator do this step.

**Next:** Step 4.

## Step 4: Create one learner and one test recipient

**Do:** List your actual license SKU IDs:

```powershell
Connect-MgGraph -TenantId $tenant -Scopes Organization.Read.All -NoWelcome
(Invoke-MgGraphRequest -Method GET `
  -Uri 'https://graph.microsoft.com/v1.0/subscribedSkus').value |
  Select-Object skuPartNumber, skuId, consumedUnits, prepaidUnits
```

Choose the licensed services required by your tenant's Agent 365 enrollment, including
a working Exchange Online mailbox. Do not select every SKU or assume a marketing
bundle name is a Graph SKU. You need seats for **both** accounts.

```powershell
$licenses = @('<approved-mailbox-sku-guid>', '<other-required-sku-guid>')
# If one SKU covers the approved requirements, put only that GUID in the array.
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain `
  -RunName $run -Stage Provision -LearnerCount 1 `
  -SkuIds $licenses -UsageLocation US -TapLifetimeMinutes 180
```

Replace `US` if the lab's licensing location is different.

**Check:** The script reports these two accounts and a private credentials-file path:

```text
beacon01-learner01@your-domain
beacon01-recipient@your-domain
```

It records exact object IDs for later shutdown. It will not take over a same-name
account outside its manifest. It never prints TAP values to the console.

**Next:** Step 5.

## Step 5: Test both accounts before inviting learners

**Do:**

1. Open the private credentials file locally, **off screen share**.
2. In a separate browser profile, open [Outlook](https://outlook.office.com/mail/).
3. Use the learner username and TAP. Follow the actual sign-in prompts.
4. Confirm the learner's mailbox opens.
5. In another isolated browser profile, repeat for the recipient account.
6. Send a training message from learner to recipient in Outlook and verify receipt.

**Check:** Both mailboxes work and the test arrives. A newly assigned license may take
time to provision a mailbox. A TAP does not bypass CA/MFA/device rules.
If any check fails, stop and resolve it with the relevant policy/license owner.

If preparation outlasts the passes, explicitly renew this run's TAPs immediately before
class, then distribute the updated private credential file:

```powershell
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain `
  -RunName $run -Stage Provision -LearnerCount 1 -SkuIds $licenses `
  -TapLifetimeMinutes 180 -RenewTaps
```

Use the actual class learner count, not `1`, once additional learners exist. Renewal
invalidates the previous TAPs for those accounts; notify the affected lab users.

**Next:** [Prepare and deploy the agent using the Module 2 admin guide](08-module-02-admin-runbook.md).
Return here after that guide's live test passes.

## Step 6: Run Module 1 with the class

**Do:** Give each learner only their own lab username/TAP through an approved private
channel. Keep the recipient account with the facilitator. Then:

1. [Open Module 1 at slide 6](https://cyberlorians.github.io/a365-hub/#slide-6).
2. Have learners open the [numbered learner walkthrough](../labs/module-01-security-foundation.md).
3. Follow learner Steps 1-7 in order. **Next** moves slides; **N** opens your notes.
4. At learner Step 6, use the [answer key](../slides/module-01/exercise.md).
5. If showing a real agent, use the read-only Registry instructions in the optional reference below.

**Check:** Each learner has four short answers, understands the identity/runtime
monitoring gap, and can name one next action. Allow 25 core minutes; record actual time.

**Next:** Run the [Module 2 learner walkthrough](../labs/module-02-business-agent.md).

## Step 7: Close accounts when the workshop is over

**Do:** First preview, then disable **only this run's recorded accounts**:

```powershell
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain `
  -RunName $run -Stage Close -WhatIf

# After checking the listed accounts:
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain `
  -RunName $run -Stage Close
```

**Check:** Verify these accounts are disabled. The script also requests session
revocation. It does not delete mail, remove licenses, or delete users/groups.
The event owner must handle those exact objects under the retention policy and
securely remove expired TAP files. Never bulk-delete all "workshop" users.

**Next:** Follow Module 2's Azure cleanup steps to stop ongoing resource charges.

<details>
<summary>Optional admin reference: roles, read-only Registry demo, onboarding alternatives, and run records</summary>

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

The earlier browser record below predates the deployable package. Current package
checks: offline PowerShell/CLI/Graph/snippet assertions pass; all Bicep entry
templates compile; visible learner/admin steps and links pass the workshop validator.
These checks use fake services. No live tenant/user/model/mail test was run here.

| Verification | Result |
|---|---|
| Guide links cover core slides 6-18 in order | Passed static validation; proposed row timings total 25 minutes |
| All eighteen presentation slides at desktop/mobile widths | Passed browser visibility/layout and note-population checks |
| Learner/admin toolbar links, Home navigation, notes open/close | Passed browser checks |
| Restored navy/cyan branding | Verified unchanged |
| Live onboarding, real Registry/policy/evidence, reset | Not run |
| Independent facilitator and measured teaching duration | Not run; 25 minutes remains a proposed timebox |

This is an author-assisted content/browser walkthrough, not a completed event run record.

</details>
