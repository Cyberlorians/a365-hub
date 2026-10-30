# Module 2: Admin - Deploy, Test, Then Teach

**Goal:** Deploy a real Mail agent and its sign-in/chat website, then run the learner
steps. Start with the [Module 1 admin guide](07-module-01-admin-runbook.md) for accounts.

This package builds the pinned Stefano toolkit source and deploys it through our own
non-destructive Bicep templates. It **does not run upstream `deploy-aca.ps1`**, which
deletes its entire resource group by default.

**Before you begin:** An authorized Agent 365-enabled lab tenant, the tested lab
mailboxes, an Azure subscription, and an existing Azure OpenAI **chat model deployment**
with quota/network access. Install the Agent 365 CLI (`a365`) and its .NET runtime.
The pinned sample also documents Python 3.12+ and `uv` as prerequisites. Install
[Python for Windows](https://www.python.org/downloads/windows/) if missing, then check:

```powershell
python --version
if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
  python -m pip install uv
  if ($LASTEXITCODE -ne 0) { throw 'uv installation failed' }
}
uv --version
```

The runtime itself is built in Azure from the sample's Dockerfile; you do not need
Docker Desktop, a local model, the Static Web Apps CLI, or every toolkit variant.

If `a365` is missing, install the [.NET SDK](https://learn.microsoft.com/en-us/dotnet/core/install/windows)
and then use the [official CLI installation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-cli):

```powershell
dotnet tool install --global Microsoft.Agents.A365.DevTools.Cli
a365 --version
```

If already installed, record its version instead of reinstalling. The pinned sample
documents CLI 1.1.x or later. A newer CLI may use Microsoft's managed client or fall
back to the tenant-owned client; requirements/consent must still pass in your tenant.

The operator needs rights to create the dedicated resource group, deploy resources in
that group **and the existing model resource group**, and assign the scoped runtime
roles on the registry/model account. Use the authorized Contributor/deployment and
RBAC-administrator roles; do not grant them to learners. An authorized Entra admin must approve
app/blueprint permissions and consent. The source's broad grants and blueprint secret
are **not** a production least-privilege/fully-secretless design.

## Step 1: Fill in the config once

**Do:** In the repository root, edit `.workshop\config.json`. Replace every `<...>`:

```json
{
  "tenantId": "<tenant-guid>",
  "subscriptionId": "<subscription-guid>",
  "runName": "beacon01",
  "location": "eastus2",
  "resourceGroup": "a365-beacon01",
  "openAiResourceGroup": "<existing-model-resource-group>",
  "openAiAccount": "<existing-azure-openai-account>",
  "modelDeployment": "<existing-chat-model-deployment-name>",
  "modelApiVersion": "2024-12-01-preview",
  "cliAppId": "",
  "spaAppId": ""
}
```

Use a **new dedicated resource group name**. Keep the two app IDs blank for automatic
creation. The model stays in its existing group and is not deleted by our deployment.
Get its account/deployment names from Azure Portal -> your Azure OpenAI resource ->
model deployments. Ensure it supports Chat Completions and the selected API version.

**Check:** No placeholders remain except the blank app IDs. Confirm the region, model
quota, and budget. ACR Basic, containers, and model usage can incur charges.

**Next:** Step 2.

## Step 2: Sign in and prepare Azure

**Do:** Use an external PowerShell 7 / Windows Terminal window (not the VS Code
integrated terminal) for this guide. Start at the repository root and keep this
window open through Step 7:

```powershell
$ErrorActionPreference = 'Stop'
$hub = (Get-Location).Path
$c = Get-Content .\.workshop\config.json -Raw | ConvertFrom-Json
az login --tenant $c.tenantId
if ($LASTEXITCODE -ne 0) { throw 'Azure sign-in failed' }
$account = az account show --subscription $c.subscriptionId -o json | ConvertFrom-Json
if ($LASTEXITCODE -ne 0 -or $account.tenantId -ne $c.tenantId) { throw 'Wrong or unavailable Azure context' }
$account | Select-Object id, tenantId
az bicep version
if ($LASTEXITCODE -ne 0) {
  az bicep install
  if ($LASTEXITCODE -ne 0) { throw 'Bicep installation failed' }
}
foreach ($provider in @('Microsoft.App', 'Microsoft.ContainerRegistry',
    'Microsoft.ManagedIdentity', 'Microsoft.CognitiveServices')) {
  az provider register --namespace $provider --subscription $c.subscriptionId --wait
  if ($LASTEXITCODE -ne 0) { throw "Provider registration failed: $provider" }
}
```

**Check:** The tenant/subscription shown match the config. Have the subscription owner
register providers if you lack that right. Do not disable Azure Policy to get past a failure.

<details>
<summary>No existing model? Create a dedicated lab model account first</summary>

Do this only with approved quota/region/cost. Replace the model group/account names in
the config with **new dedicated names**, then run from the hub root:

```powershell
$modelGroupExists = az group exists -n $c.openAiResourceGroup --subscription $c.subscriptionId
if ($LASTEXITCODE -ne 0) { throw 'Could not check the model group; do not continue' }
if ($modelGroupExists -eq 'true') {
  throw 'This optional creation path requires a new model resource group. Reuse an existing model through the normal config instead.'
}
az group create -n $c.openAiResourceGroup -l $c.location --subscription $c.subscriptionId
if ($LASTEXITCODE -ne 0) { throw 'Model group creation failed' }
az deployment group create --subscription $c.subscriptionId -g $c.openAiResourceGroup `
  --template-file .\labs\workshop\model-account.bicep `
  --parameters accountName=$($c.openAiAccount) location=$($c.location)
if ($LASTEXITCODE -ne 0) { throw 'Model account creation failed' }
az cognitiveservices account list-models --subscription $c.subscriptionId `
  -g $c.openAiResourceGroup -n $c.openAiAccount -o json
if ($LASTEXITCODE -ne 0) { throw 'Could not list supported models' }
```

The account disables API-key authentication. From the returned available-model list,
choose an available **Chat Completions** model/version/deployment SKU that your approved
quota supports. Do not copy a retired model name from an old lab. Replace these values:

```powershell
az cognitiveservices account deployment create --subscription $c.subscriptionId `
  -g $c.openAiResourceGroup -n $c.openAiAccount `
  --deployment-name $c.modelDeployment `
  --model-format OpenAI --model-name '<available-chat-model>' `
  --model-version '<available-version>' --sku-name '<supported-deployment-SKU>' `
  --sku-capacity 1
if ($LASTEXITCODE -ne 0) { throw 'Model deployment failed; verify quota and supported model/SKU. Do not continue.' }
```

Quota/capacity and regional availability are actual tenant inputs, not guaranteed by
this script. Keep the new model group in your run record. Our runtime cleanup keeps
model resources; the owner must separately remove this **new lab-only** model group
when finished. Never delete a reused model group.

</details>

**Next:** Step 3.

## Step 3: Download the pinned toolkit and create sign-in apps

**Do:**

```powershell
.\scripts\Initialize-Workshop.ps1 -ConfigPath .\.workshop\config.json -RegisterApps
```

This downloads revision `1a1d3f5253771a20915fa519aaaa58f576a5cf35`, creates a
tenant-owned CLI client and browser sign-in app, and writes the local config.
The browser app requests the delegated Mail MCP scope; consent is a separate step.

**Check:** Output ends with `Sources and app configuration ready`.
The config now has two app IDs, and `.workshop\apps.json` records created app IDs.
Errors are blockers, not a reason to grant learners admin roles.

**Next:** Step 4.

## Step 4: Register the real agent

**Do:** Stay in the external terminal from Step 2. Run **one command at a time**:

```powershell
Set-Location (Join-Path $hub '.workshop\toolkit\aca\obo')
$agentName = "A365 Hub $($c.runName)"
a365 setup requirements
if ($LASTEXITCODE -ne 0) { throw 'Agent 365 requirements failed; stop here' }
```

Complete approved sign-in/consent. Continue only when requirements report no failures.
Then run:

```powershell
a365 setup all --m365 --agent-name $agentName
if ($LASTEXITCODE -ne 0) { throw 'Agent setup failed; stop here' }
a365 setup permissions mcp --agent-name $agentName
if ($LASTEXITCODE -ne 0) { throw 'Mail permission setup failed; stop here' }
a365 setup permissions bot --agent-name $agentName
if ($LASTEXITCODE -ne 0) { throw 'Bot/observability permission setup failed; stop here' }
```

Review each proposed grant and approve **only under the lab's authorized scope**.
If the source's grants are not acceptable, stop. The CLI may create first-party
service principals and request observability permission. Leave the messaging endpoint
blank for now. Store the displayed blueprint secret privately; do not tee the output
to a log or share your screen. The setup commands change Entra objects and grants.

**Check:** Setup creates `a365.generated.config.json` with `agentBlueprintId` and
`agenticAppId`. They are different IDs. Do not use the CLI app ID as the agent.

**Next:** Step 5.

## Step 5: Deploy the agent and website

**Do:** Return to the hub root. Preview the changes, then explicitly approve:

```powershell
Set-Location $hub
.\scripts\Deploy-Workshop.ps1 -ConfigPath .\.workshop\config.json -Plan

# After reviewing the scope and budget:
.\scripts\Deploy-Workshop.ps1 -ConfigPath .\.workshop\config.json -ApproveDeployment
```

When prompted, enter the blueprint secret in the hidden-input prompt. The script uses
a restricted temporary secure-parameter file and removes it afterward. The application
stores it as a Container App secret reference, not a plain environment-variable value.
Azure OpenAI uses a managed identity, **not an API key**.

The script creates the dedicated group, registry, managed identity, environment, API
and UI; assigns AcrPull and OpenAI User; cloud-builds tracked source only; and adds the
UI's redirect URI. It refuses to modify an existing unowned resource group.
It does not delete resources, create users, change CA/DLP, or weaken model policy.

**Check:** Output gives `UI: https://...` and `API: https://...`.
They are also in `.workshop\deployment.json`. This means deployed, not yet a passed lab.

**Next:** Step 6.

## Step 6: Consent browser access and register the endpoint

**Do:**

```powershell
$c = Get-Content .\.workshop\config.json -Raw | ConvertFrom-Json
$d = Get-Content .\.workshop\deployment.json -Raw | ConvertFrom-Json
$redirect = [uri]::EscapeDataString($d.uiUrl)
$scope = [uri]::EscapeDataString('ea9ffc3e-8a23-4a7d-836d-234d7c7565c1/.default')
Start-Process "https://login.microsoftonline.com/$($c.tenantId)/v2.0/adminconsent?client_id=$($c.spaAppId)&scope=$scope&redirect_uri=$redirect"
```

Check the app is your **A365 Hub beacon01 spa** app before approving its Mail access.
Then register the messaging endpoint:

```powershell
Set-Location (Join-Path $hub '.workshop\toolkit\aca\obo')
a365 setup blueprint --endpoint-only --agent-name $agentName `
  --messaging-endpoint "$($d.apiUrl)/api/messages"
if ($LASTEXITCODE -ne 0) { throw 'Endpoint registration failed' }
Set-Location $hub
```

**Check:** Consent is granted for the intended app; endpoint registration succeeds.
The chat uses the signed-in user's delegated Mail token (`direct`), not a proven
OAuth OBO exchange just because the upstream sample is named ACA-OBO.

**Next:** Step 7.

## Step 7: Test it before giving out the link

**Do:**

```powershell
.\scripts\Test-Workshop.ps1 -ConfigPath .\.workshop\config.json
```

Expected HTTP checks:

```text
Health                 PASS
UnauthenticatedChat    401 PASS
SignInPage             PASS
LiveInference          NOT TESTED
MailReceipt            NOT TESTED
DownstreamEvidence     NOT TESTED
```

Then open the emitted learner URL in the learner's isolated browser profile.
Follow the [Module 2 learner Steps 1-8](../labs/module-02-business-agent.md) **yourself**.
Use **Sign in**, select **Project Beacon Mail Agent**, type the draft prompt, then
explicitly request the reviewed send. The facilitator checks the recipient's Outlook.
If first-use Mail connections require consent, complete the approved connection as the
lab user; do not substitute an admin token.

Check actual runtime logs, without publishing raw prompt/user data:

```powershell
az containerapp logs show --subscription $c.subscriptionId -g $c.resourceGroup `
  -n "hub-$($c.runName)-api" --type console --tail 50
```

Record in private notes: user, sender/recipient, subject, receipt time, actual tool
record, typed agent ID, evidence location, and missing telemetry. A configured
Agent 365 exporter is not proof of downstream ingestion.

**Check:** Draft/inference succeeds, the right email actually arrives, and the actual
actor/action evidence is identified. If any part fails, do not announce a working lab.
For a cold start, rerun the HTTP check after the container is running; investigate
failed revisions/RBAC/model networking rather than changing security policies.

**Next:** Step 8.

## Step 8: Rehearse, hand off, and clean up

**Do:** Prepare two additional fresh learners using the Module 1 command with
`-LearnerCount 3`:

```powershell
$u = Get-Content .\.workshop\users\users.json -Raw | ConvertFrom-Json
.\scripts\New-WorkshopUsers.ps1 -TenantId $c.tenantId -Domain $u.domain `
  -RunName $c.runName -Stage Provision -LearnerCount 3 `
  -SkuIds $u.licenseSkuIds -TapLifetimeMinutes 180
```

Have another facilitator run the same learner steps with fresh browser profiles.
Confirm actual timing and recovery from an expired session.

Give each learner:

```text
Their own lab username and TAP (private)
The UI URL from deployment.json
The single approved real internal recipient
The Module 1 and Module 2 learner-guide links
The name of the support person
```

After class, close accounts using Module 1 Step 7. Preview Azure removal before acting:

```powershell
.\scripts\Remove-WorkshopDeployment.ps1 -ConfigPath .\.workshop\config.json -WhatIf
# After checking the dedicated group and preserving required evidence:
.\scripts\Remove-WorkshopDeployment.ps1 -ConfigPath .\.workshop\config.json
```

The cleanup script checks the exact recorded principal, role ID, and scope before
removing this runtime's OpenAI User assignment; it keeps the existing model.
Verify model IAM afterward. If deployment failed before recording the role ID, use
Azure Portal -> model resource -> **Access control (IAM) -> Role assignments** and
the recorded runtime principal ID to remove only this run's assignment.
In Entra, use the IDs in `apps.json` and the generated agent config to remove only
the run's registered agent/blueprint and CLI/SPA apps when retention/lifecycle approval
permits it. Have the tenant owner verify removal. Users/licenses/mail retention and
private TAP files also require the event owner's cleanup; Azure deletion does not do it.

**Check:** Account access, Azure resources, the external model role, app/agent grants,
licenses, and retained evidence each have an explicit completed or blocked outcome.
No "delete every workshop user" or upstream resource-group reset is part of this flow.

**Next:** Ready for delivery only after the actual live checks and fresh-user rehearsal pass.

<details>
<summary>Optional technical reference: exact permissions, source caveats, evidence, and recovery</summary>

## 1. Select mode and obtain approval

1. **Content review now:** walk all eight slides and learner steps without sign-in,
   model/tool calls, account creation, or deployment. Use only author-written examples,
   labeled synthetic. Record missing environment details rather than invent them.
2. **Live proof later:** requires explicit approval for the environment, roles/grants,
   initial test identity/mailbox, internal recipient, runtime, costs, evidence, and reset.
3. **Hands-on release later:** additionally requires two fresh learner accounts and
   an independent facilitator following the written steps within 35 minutes.

A real, verified prior run can support a labeled demo; no verified evidence pack exists
yet for this activity. Without proof, deliver review mode, not a successful demonstration.

## 2. Fill the private preparation card

Do not place real values or credentials into the public guide. Keep this record in an
approved restricted location. Blank/unknown mandatory fields block live execution.

| Input | Record before live proof |
|---|---|
| Event/run ID, time zone, content/toolkit revision, owners | |
| Authorized tenant/subscription and isolated resource scope | |
| Operator roles, grant approver, data/evidence viewer | |
| Entitlements, mailbox licenses, model quota/region, approved cost/run limit | |
| Existing/new resource inventory and explicit create/change/reset manifest | |
| Initial lab user/mailbox and controlled real internal recipient | |
| Actual UI URL, selected agent label, visible submit control, sign-in route | |
| Runtime endpoint/health verification method and model deployment | |
| Public client, blueprint, registration, runtime and telemetry IDs with types | |
| Effective grants, inheritance, consent, and intended authority route | |
| Secret storage/expiry/rotation owner, without secret values | |
| Runtime/workload/downstream evidence locations, access, retention, expected delay | |
| Response/support owner and approved reset/teardown method | |

The reviewed candidate web UI sends from the signed-in user's mailbox with delegated
authority. Its sample name, ACA-OBO, does not prove an OAuth OBO exchange.
Do not equate configured agent telemetry ID, app ID, object ID, or sender.

## 3. Inspect the pinned toolkit before any mutation

Use the reviewed [toolkit setup](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md)
and [observability guide](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/aca-a365-observability.md).
Confirm reuse rights before redistributing source/assets.

1. Obtain an authorized local source copy at the pinned revision and record its actual
   checkout path. The source copy is separate from this workshop repository.
2. Review `aca\obo`, its configuration examples, actual setup/deployment scripts, UI
   route, and verification code. Do not install/run other agent variants by default.
3. Check source-documented prerequisites: Azure CLI, Agent 365 CLI (source says at least
   1.1.x), its .NET runtime, Python 3.12+, `uv`, and script requirements. Follow the
   pinned project's environment/dependency setup only after approval.
4. Review the public-client requirement separately from the blueprint. The source
   requires powerful instructor setup/admin consent; learners do not receive those roles.
5. Review every proposed grant, inheritance setting, consent, secret, and output sink.
   The documented `allAllowed`/broad consent and printed blueprint secret are not
   demonstrated least privilege or secretless workload authentication.
6. **Deployment stop:** the source says `deploy-aca.ps1` deletes its entire resource
   group by default. Do not run that default command. `-ReuseEnv` is only a possible
   reviewed path for a verified existing environment; the source says it fails when
   the environment is absent. It is not a safe fresh-deployment substitute.
7. Approve an exact non-destructive setup plan for a new environment, or use an
   approved existing runtime. If neither exists, record the blocker and stay in review
   mode. This runbook intentionally supplies no unreviewed deployment one-liner.

**Checkpoint:** Actual source, prerequisites, proposed mutations, grants, cost, and
reset are reviewed. A documented source procedure is not permission to execute it.

## 4. Prepare isolated access, only after approval

1. Confirm the actual tenant/subscription in the approved operator session. Azure CLI
   context can change across sessions; explicitly scope approved resource commands.
2. Arrange one initial test identity/mailbox and a controlled internal recipient using
   the approved method. Reuse an existing safe fixture when possible.
3. If using the [existing onboarding reference](05-onboarding-deployment-runbook.md),
   inspect the scripts and cleanup templates first. Do not run bulk deletion or enable
   historical age-based cleanup. Account age is not TAP expiry.
4. Verify actual authentication/CA and mailbox access for the intended user. Do not
   bypass device compliance, MFA, or policy to complete a demo.
5. Keep instructor deployment/consent roles out of learner sessions. Record any
   standing permissions and who can revoke them.
6. Confirm the real internal recipient is test-only and approved; `.invalid` examples
   in the learner guide are not routable. No external recipients or real customer data.

**Checkpoint:** Correct user, tenant, mailbox, recipient, actual permissions, and support
owner. A signup/email or Microsoft 365 home page is insufficient.

## 5. Prepare and verify the actual runtime route

1. Apply only the separately reviewed setup plan. Preserve deployment logs in the
   approved restricted location, with secrets removed. Do not copy cleartext secrets
   into shell arguments, screenshots, source files, or public records.
2. Confirm actual registration and typed identifiers against source/system records.
3. Configure the selected UI route from the pinned guide; record its real URL,
   selected label, and chat submit control rather than guessing UI button text.
4. Confirm the actual `/chat` implementation uses the documented
   `MAIL_TOKEN_MODE=direct` route, or document/test any deviation before teaching it.
5. Check model authentication and policy compliance. Where required, use the approved
   Entra/managed-identity route instead of weakening a no-local-key policy.
6. Independently prove **health** and a minimal **inference** round trip using the
   source's verification procedure after dependencies/environment are configured.
   A CLI exit status and expected actual output must be recorded; health alone is not
   inference, Mail MCP access, or observability.
7. Complete the private preparation card with verified URLs/control labels. Test the
   learner path in a clean browser profile, not only the operator's cached login.

**Checkpoint:** Actual route, actor, registration, health and inference are known.
Any failure blocks sending until resolved through approved changes.

## 6. Prepare evidence without fabricating events

1. Review the real runtime/tool evidence available for the selected route. Record
   actual source, identifier types, supported fields, access and retention.
2. Verify exporter configuration, configured agent ID, actual downstream ingestion,
   and source/engine/key mapping separately. Configuration is not proof of ingestion.
3. Plan the internal receipt check: authorized admin confirms the controlled recipient
   mailbox, so learners do not need access to other users' mailboxes.
4. Label each record **current run**, **verified prior run**, **synthetic example**,
   or **missing**, with target, time/time zone, result, and provenance.
5. If downstream ingestion is delayed, preserve a real verified sanitized prior run
   from the same identified target with its own time. Never present it as current.
6. Do not seed fake rows into security tables, force alerts, disable global tuning, or
   join the GBB workload fixture to the toolkit agent by display name.

**Checkpoint:** Defined evidence can actually be accessed and attributed. Missing
coverage remains an open finding, not success.

## 7. Conduct the first approved task proof

Use the [learner guide](../labs/module-02-business-agent.md) exactly.

| Slide | Admin/facilitator action | Pass condition | Minutes |
|---|---|---|---:|
| 1 | State mode, utility, and limits | Learner knows proof has not established complete security | 2 |
| 2 | Confirm approved data/tool/recipient boundary | No extra sources, attachments, recipients, or production data | 2 |
| 3 | Verify user/tenant/UI route privately | Actual delegated sender distinguished from agent telemetry identity | 4 |
| 4 | Request draft only; inspect facts/word count | No unrequested action; synthetic facts preserved | 7 |
| 5 | Explicit send after review; confirm real receipt | Intended internal sender/recipient/subject/content/time; no duplicate retry | 5 |
| 6 | Inspect current tool/workload and proven downstream evidence | Typed attribution and evidence provenance; gaps explicit | 7 |
| 7 | Complete passport and deviation discussion | No invented identifiers, grants, policy results, or approval control | 5 |
| 8 | Debrief and record gaps | Useful outcome versus unproven controls is clear | 3 |
| **Total** | | **Slides and activity together** | **35** |

This is the initial one-user proof after approval, not independent hands-on validation.
If the agent acts before the learner requests it, stop and investigate; do not pretend
the prompt instruction was an enforced approval boundary.

## 8. Test repeatability and recovery

After the first proof, prepare two fresh learner accounts under the approved scope.
Have another facilitator follow the same written steps. Record actual control labels,
elapsed time, necessary corrections, and outcomes.

| Check | Safe expectation |
|---|---|
| Fresh profile / second fresh account | No author's cached session or hidden setup needed |
| Reload / naturally expired auth / approved test session expiry | Explicit failure/re-authentication and observed recovery, not false success |
| Tool permission failure, approved test condition only | No delivery claim; instructor reviews intended grants, never blanket consent |
| Inference failure, approved test or labeled tabletop | Error and stop; do not label a hypothetical recovery as tested |
| Delayed/missing downstream evidence | Labeled prior run or explicit coverage gap; no fabricated result |
| Uncertain send outcome | Inspect receipt/tool evidence before retry to avoid duplicate email |
| Wrong user/tenant/recipient or unsafe content | Stop and involve the responsible owner |

Do not induce failures by breaking shared/production policies or resources.
Differentiate observed recovery from tabletop discussion in the run record.

## 9. Reset, close, and make the release decision

1. Record created/reused identities, grants, runtime resources, messages and evidence
   in the approved manifest with exact identifiers and prior state.
2. Close learner/presenter sessions according to the event plan. Revoke/expire only
   the run's approved access and rotate/delete credentials through the responsible owner.
3. Remove test content or resources only if the manifest/policy authorizes it. Retain
   required evidence appropriately. Do not delete shared resources or all workshop users.
4. Verify cleanup/restore and residual access; deletion requests alone are not proof.
   Record blocked cleanup with owner/next action rather than hiding it.
5. Decide review-only, labeled verified demo, or hands-on-ready. Hands-on requires
   actual task/authority/evidence, two fresh users, recovery/reset, and independent timing.

| Run-record field | Record privately |
|---|---|
| Run/revision, operator, date/time zone and mode | |
| Actual approved user/target/route and typed identifier references | |
| Health / inference / receipt / registration / downstream proof, separately | |
| Evidence mode, location/time and gaps | |
| Fresh-user and independent-facilitator results; elapsed minutes | |
| Observed versus tabletop recovery results | |
| Manifest / restore/cleanup result / support owner | |
| Go / conditional go / hold and remaining prerequisites | |

## Automation and GBB boundary

Static synthetic brief is enough for Module 2. No document store, new custom MCP
server, GBB simulator, full SDK/AWS deployment, GSA rollout, or ISOC onboarding is a
hidden prerequisite. Reuse approved onboarding/runtime preparation only after script
review and authorization. Record any proposed generator's scope, permissions, cost/
request cap, evidence mode, idempotency, exact manifest, and manual alternative in the
[per-module automation plan](06-customer-learning-plan.md#16-per-module-data-and-automation-preparation).

## Content walkthrough record: October 30, 2026

The earlier browser record below predates the deployable package. Current package
checks: offline PowerShell/CLI/Graph/snippet assertions pass, the Bicep templates
compile, and generated ARM uses a secure blueprint parameter/secret reference with no
OpenAI API key. Real deployment, authenticated inference, email receipt, downstream
telemetry, fresh-user recovery, and independent timing remain untested here.

| Verification | Result |
|---|---|
| Learner guide links cover all eight slides in order | Passed static validation; proposed row timings total 35 minutes |
| Eight slides at desktop/mobile widths and populated notes | Passed browser checks |
| Learner/admin links, Home navigation, notes open/close | Passed browser checks |
| Restored navy/cyan branding | Verified unchanged |
| Pinned setup prerequisites and default-deletion caveat | Reviewed against source documentation; no setup command executed |
| Initial/two-fresh-user proof, runtime, mail receipt, telemetry, recovery/reset | Not run |
| Independent facilitator and measured teaching duration | Not run; 35 minutes remains a proposed timebox |

The source review and content/browser walkthrough do not establish hands-on readiness.

</details>
