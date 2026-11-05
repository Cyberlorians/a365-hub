# Admin guide, lab by lab

One page for the admin. For every lab in the student decks, this says **what the learner
does**, **what you must do before class**, **what to run**, **how to check it**, and **what
to do if it breaks**. The long runbooks stay the detailed reference:
[Module 1 admin](07-module-01-admin-runbook.md) and
[Module 2 admin](08-module-02-admin-runbook.md).

Learners never get admin rights to set anything up. You prepare the tenant; they learn
and look.

## Status of each lab (tested November 2, 2026)

| Lab | Status |
|---|---|
| M1 Lab 1: Request your lab access | **Works.** A new test user submitted the form and received the account and an 8-hour pass by email in about 2 minutes. |
| M1 Lab 2: Sign in to your lab mailbox | **Works.** The new test user signed in with the pass and the mailbox opened. |
| M1 Lab 3: See your agents in the Agent 365 registry | **Fixed in the admin's tenant on Nov 5.** Project Beacon was missing because nothing registered it. I published it from the admin center (Route A in **Populate Lab 3**) and confirmed it appears in the Registry. **Still to confirm:** that a learner with the AI Reader role (not an admin) can see it, and the first-time role assignment. |
| M2 Labs 1-4 | **Not run live.** Written from the runbook; rehearse them first. |

## Before any lab (once)

1. Use a **dedicated lab tenant**. Never production.
2. Have PowerShell 7.2+, Git and Azure CLI. Clone the repo and keep `.workshop` on a private disk.
3. Pick **one** way to create learner accounts:
   - **Access form (recommended):** learners go to `aka.ms/a365hub`. A Logic App creates the
     account and emails the pass. No script from you.
   - **Scripts:** you create the accounts with `New-WorkshopUsers.ps1`.
4. GCC High / US Government tenants: the scripts and the Logic App use commercial endpoints and
   have not been tested there. Learners use `outlook.office365.us`.

---

## Module 1

### Lab 1: Request your lab access

**Learner does:** opens the access form, submits name, email and "I agree", waits for the email.

**You do before class**

- **Form route:** confirm the form (`aka.ms/a365hub`) and the Logic App **A365-Workshop-Provisioner**
  (resource group **A365-Workshop**) are enabled. Submit one test response with your own email.
- **Script route:** create the group, allow Temporary Access Pass for it, then create accounts:

```powershell
$tenant = '<your-tenant-guid>'
$domain = '<your-verified-tenant-domain>'
$run    = 'beacon01'

.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain -RunName $run -Stage PrepareGroup
# Entra admin center: Entra ID > Authentication methods > Policies > Temporary Access Pass.
# Enable it for the group from the step above, not the whole organization.
$licenses = @('<approved-mailbox-sku-guid>')
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain -RunName $run `
  -Stage Provision -LearnerCount 25 -SkuIds $licenses -UsageLocation US -TapLifetimeMinutes 180
```

**Check:** the test email "Your A365 Workshop lab access" arrives in about 2 to 3 minutes and shows a
username and a pass. Check Junk if it is late.

**If it fails:** open the Logic App, **Runs history**, and find the step that failed (Get response
details, Create user, Issue TAP, Send email). Tell learners **not** to submit twice: that creates a second account.

**Heads-up:** the email's "Step 2" tells learners to build agents in Copilot Studio and open Entra and
Defender. Our labs do not ask for that. Tell learners to ignore Step 2, or edit the Logic App email.

### Lab 2: Sign in to your lab mailbox

**Learner does:** opens Outlook in a private window, signs in with the username and pass, answers
"Stay signed in?" with No, and sees an empty inbox.

**You do before class:** nothing new. The pass policy and a mailbox license from Lab 1 are what matter.

**Check:** sign in as your test user in a separate browser profile. The inbox must open.
A brand-new mailbox can take a few minutes. An empty inbox is correct.

**If it fails**

| Symptom | Fix |
|---|---|
| Pass expired (8 hours via the form) | Issue a new pass: Entra admin center > Users > the user > Authentication methods > Add > Temporary Access Pass. Script route: re-run Provision with `-RenewTaps`. |
| Personal account signs in by mistake | Use a private window. |
| Asked to add a sign-in method | Stop and ask. Never loosen Conditional Access or MFA. |
| No mailbox | Check the license is assigned and wait a few minutes. |

### Lab 3: See your agents in the Agent 365 registry

**Learner does:** opens the Microsoft 365 admin center, goes to **Agents > All agents > Registry**,
reads the three numbers, finds **Project Beacon** and its owner, and opens the **Risks** column.
They only look.

> **If learners do not see Project Beacon (found November 5, 2026):** nothing in Module 1 creates it.
> A new tenant has no agent with that name, and the registry shows only what has been added to it. I checked
> the real registry (401 agents) and searching **Beacon** returned nothing. Do **Populate Lab 3** below,
> once, before class.

#### Populate Lab 3

Pick one route. **Route A is the default: it takes about 5 minutes and was run end to end in a live tenant
on November 5, 2026.** Route B is the full toolkit route; use it when you also deploy Module 2.

**Route A (default): publish the practice agent from the admin center**

You need a Microsoft 365 admin (the one who runs the lab) and PowerShell. Nothing else: no Azure, no `a365`
CLI, no consent pages.

1. Build the package. It is a local file only and changes nothing in your tenant:

```powershell
.\scripts\New-Lab3AgentPackage.ps1
# Creates .workshop\lab3\ProjectBeacon.zip from labs\workshop\lab3-project-beacon
```

2. Open the [Microsoft 365 admin center](https://admin.microsoft.com), then **Agents > All agents**
   (the **Registry** tab). Click **Add agent** and choose the file `ProjectBeacon.zip`. Click **Next**.
3. **Publish to users:** choose **Specific users/groups** and add **only yourself**. Set **Install** to
   **None**. Nothing is pushed to the rest of the company.
4. **Security policy:** keep the default template. **Accept permissions** will say no permissions are
   required. Click **Next**, then **Publish**. It finishes in under a minute.
5. **Check:** back on the Registry, search for **Beacon**. You should see **Project Beacon** (Publisher
   type: Your org). The numbers at the top can take a while to update; the list is immediate.

This is a small declarative agent with no actions: it cannot send email. In the Details pane it shows
**Owner: a dash**, **Entra agent ID: a dash**, **Data and tools: unavailable** and **Permissions: none from
Entra ID**. That is deliberate and honest: the learner finds an agent nobody owns and nothing governs.
To remove it later: Registry > Project Beacon > delete or remove the agent.

**Route B (full): register the Module 2 agent with the Agent 365 CLI**

You need: PowerShell 7, Git, Azure CLI, the .NET SDK and the `a365` CLI
([install steps](08-module-02-admin-runbook.md)), an Azure subscription in the lab tenant, and an
Entra admin who can approve the consent pages. **Not tested in a live tenant: rehearse it.** This is the
same agent Module 2 uses, with a real blueprint and agent identity.
The Route A practice agent is only a stand-in so Module 1 has something to look at. When you do Route B, the
real Module 2 agent is also named Project Beacon, so **remove the Route A stand-in first** (Registry >
Project Beacon > remove). Then learners see one **Project Beacon**, the real one.

**1. Config.** Create `.workshop\config.json` (Module 1 admin Step 1 creates it; Module 2 admin Step 1 lists
every field). For registration only, `tenantId`, `subscriptionId`, `runName` and `location` matter.
The Azure OpenAI and resource-group fields must still be filled in with valid-looking names, because the
script only checks their format (for example `unused`). Replace them with real values before you
deploy Module 2.

**2. Sign in and prepare the toolkit.**

```powershell
$ErrorActionPreference = 'Stop'
$hub = (Get-Location).Path
$c = Get-Content .\.workshop\config.json -Raw | ConvertFrom-Json
az login --tenant $c.tenantId
az account set --subscription $c.subscriptionId
.\scripts\Initialize-Workshop.ps1 -ConfigPath .\.workshop\config.json -RegisterApps
Set-Location (Join-Path $hub '.workshop\toolkit\aca\obo')
# Check the names the registry will show. Edit them now if they are not right:
Get-Content .\a365.config.json | Select-String 'DisplayName'
```

**Check:** both display names start with **Project Beacon**. If `a365.config.json` already existed from an
earlier run it keeps its old names (for example "A365 Hub beacon01 ..."): edit both lines by hand.

**3. Optional extra agents FIRST.** These make the registry worth reading (more than one row, and one
you can call out as not yours). Skip this step for a minimal lab. Run one command at a time:

```powershell
a365 setup requirements
a365 setup all --m365 --agent-name 'Beacon Finance Helper'
a365 setup all --m365 --agent-name 'Beacon Travel Helper'
```

> **Order matters.** Every `a365 setup all` writes `a365.generated.config.json` and `.env` in this
> same folder, so each run replaces the last one. Module 2's `Deploy-Workshop.ps1` reads that file.
> Register the extras **first** and **Project Beacon last**, so the saved IDs are Project Beacon's. For
> the extras ignore the blueprint secret it prints and do not deploy them. (Edit the display names in
> `a365.config.json` first if you want them to differ.)

**4. Project Beacon, last.** The same commands as Module 2 admin Step 4:

```powershell
$agentName = 'Project Beacon Mail Agent'
a365 setup requirements
a365 setup all --m365 --agent-name $agentName
a365 setup permissions mcp --agent-name $agentName
a365 setup permissions bot --agent-name $agentName
```

Approve each consent page and answer `y` to the Observability prompt. Leave the messaging endpoint
blank. Store the blueprint secret privately; you need it for the Module 2 deploy. Then return to the hub
root: `Set-Location $hub`.

**5. Verify as the admin.** Open `admin.microsoft.com`, then **Agents > All agents > Registry**. Allow a
few minutes, refresh, and clear any filter. You should see **Project Beacon Mail Agent** (and the two extras
if you ran step 3). Optional check from PowerShell (**beta Graph, untested**; if it errors, use the
Entra admin center, **Entra ID > Agents**):

```powershell
Connect-MgGraph -TenantId $c.tenantId -Scopes Application.Read.All -NoWelcome
(Invoke-MgGraphRequest -Method GET `
  -Uri 'https://graph.microsoft.com/beta/applications/microsoft.graph.agentIdentityBlueprint').value |
  Select-Object displayName, appId
```

**6. Give learners the AI Reader role** (next section) and test as a lab user.

**What the learner should find, and why** (so you can explain it in class).

- **Route A (observed in a live tenant, November 5, 2026):** Project Beacon is in the Registry with
  Publisher type **Your org**. On the **Details** tab the Overview shows **Owner** and **Created by** as a
  dash, and **Entra agent ID** as a dash. **Data & tools** says "Data and tools are unavailable".
  **Permissions** says "This agent doesn't have permissions from Microsoft Entra ID". The **Risks** column
  shows 0, and the **Security** tab lists enabled policies and protections (Microsoft Purview and others).
  The honest message: this agent has no named owner and no governed identity. That is the finding.
  The numbers at the top (Total agents, Agents at risk, Agents without owners) can lag behind the list.
- **Route B:** per Microsoft Learn an agent identity blueprint **must have a sponsor** and should have an
  owner, so the agent will show whoever was signed in when you ran `a365 setup all`, and it has an Entra
  agent ID and permissions.
- The **Risks** column needs an E7 or Agent 365 license to appear. If you want learners to also find an
  agent with **no owner** in the count, use a different agent (for example a Copilot Studio agent whose
  creator was deleted).
- **Search matters.** The Registry lists hundreds of agents (401 in the test tenant), so learners search
  for **Beacon**.
- **Panel tour step.** Lab 3 has learners open the **Instructions**, **Identity** and **Environment**
  sections on the Details tab and read the tabs and the Install and Block buttons. Open all three sections
  yourself before class and note what they show for your agent; their contents were not recorded. Learners
  must not click Install or Block (both act on the whole tenant).

**Optional: make "Agents at risk" show a number (staged signal)**

Today that number is a dash, because nothing is flagged. That is normal, and the lab works either way.
If you want learners to see a flagged agent, you can flag one **on purpose** in the lab tenant. Rules:

- **Only an Entra agent identity can be flagged.** The Route A stand-in has no Entra identity, so it cannot be
  flagged. Use an extra agent registered with the Agent 365 CLI (Route B, step 3, for example
  **Beacon Finance Helper**).
- **Never flag the real Module 2 agent.** A High risk level can be blocked by a Conditional Access policy and
  would break Module 2.
- **Tell learners it was staged.** It is a deliberate flag for the exercise, not a real attack.
- **Needs** Microsoft Entra ID P2 during preview, and soon a Microsoft Agent 365 license (Microsoft Learn,
  Identity Protection for agents). Only for a lab tenant. Never do this in production.

Per Microsoft Learn, an admin can **confirm an agent as compromised**, which sets its risk level to **High**.
In the portal this is the **Risky agents** report in Entra ID Protection. From PowerShell
(**beta, untested: rehearse it**; permission `IdentityRiskyAgent.ReadWrite.All`):

```powershell
Connect-MgGraph -TenantId $c.tenantId -Scopes IdentityRiskyAgent.ReadWrite.All -NoWelcome
Confirm-MgBetaRiskyAgentCompromised -AgentIds @('<object-id-of-the-lab-only-agent-identity>')
```

Afterwards the number at the top of the Registry can take up to an hour to change. Undo it with **Confirm
safe** or **Dismiss risk** in the same report. If it works, learners can click the **Agents at risk** number
(it should filter the list to the flagged agents), open that agent, and read its Security tab.

**You do before class (checklist)**

1. **Give every learner a read-only role.** Microsoft Learn names **AI Reader** as the least-privilege
   role to view the registry (no extra license for the inventory). Without it, the admin center
   returned an empty page for our test user. Roles can only go to a role-assignable group, so assign it to
   the users directly. **This snippet is untested: rehearse it.**

```powershell
Connect-MgGraph -TenantId $tenant -Scopes RoleManagement.ReadWrite.Directory,User.Read.All -NoWelcome
$role = Get-MgRoleManagementDirectoryRoleDefinition -Filter "displayName eq 'AI Reader'"
# Form route users have department = workshop. Script route users: filter your own way.
$users = Get-MgUser -Filter "department eq 'workshop'" -All
foreach ($u in $users) {
  New-MgRoleManagementDirectoryRoleAssignment -PrincipalId $u.Id `
    -RoleDefinitionId $role.Id -DirectoryScopeId '/' | Out-Null
}
```

   Run it **after** learners have their accounts, right before Lab 3. The same pass can also be
   done by hand: Entra admin center > Roles & admins > **AI Reader** > Add assignments.

2. **Make sure Project Beacon is in the registry.** Do **Populate Lab 3**, Route A. Searching the
   Registry for **Beacon** must return **Project Beacon**.
3. **Extra agents (optional).** Route B step 3 registers two extra agents (extras first, Project Beacon
   last). Another option: a **Copilot Studio** agent created and shared by a throwaway user appears in the
   registry on its own, and hard deleting that user makes it an ownerless agent (the **Agents without
   owners** count goes up). Untested.
4. **Risks column.** It needs an **E7 or Agent 365 license** in the tenant. If it is missing, tell
   learners: that is what an unlicensed tenant sees. Counts can lag up to an hour.

**Check:** sign in as a lab user in a separate profile, open `admin.microsoft.com`, go to
**Agents > All agents > Registry**. You should see the summary tiles and at least Project Beacon.

**If it fails**

| Symptom | Fix |
|---|---|
| Blank page or HTTP 401 at the admin center | The user has no role yet. Assign **AI Reader**. |
| Registry empty | Add the agent: **Populate Lab 3**, Route A. Check no filter is set. |
| Project Beacon missing | Nothing in Module 1 creates it. Run **Populate Lab 3**, Route A, then search the Registry for **Beacon**. On Route B check the registered name starts with **Project Beacon** (`a365.config.json`); if it exists in Entra (Entra ID > Agents) but not in the registry, re-run only the registration step: `a365 setup all --agent-registration-only` (documented on [Microsoft Learn](https://learn.microsoft.com/entra/agent-id/create-blueprint#register-agents-in-the-agent-365-registry)). |
| A learner is blocked | Show the registry on your screen. Never grant a write role. |
| Learner clicks Block, Install, Uninstall or Pin | They should not. Read-only AI Reader cannot, but remind them. |

---

## Module 2

Do the [Module 2 admin runbook](08-module-02-admin-runbook.md) Steps 1 to 7 **once, before class**.
The labs below depend on it. A configured exporter is not proof of evidence; test it.

### Lab 1: Sign in to the agent

**Learner does:** opens the agent website link, signs in with their lab user.

**You do before class** (from the repo root):

```powershell
.\scripts\Initialize-Workshop.ps1 -ConfigPath .\.workshop\config.json -RegisterApps
# Register the agent (Module 2 admin Step 4). One command at a time:
a365 setup requirements
a365 setup all --m365 --agent-name 'Project Beacon Mail Agent'
a365 setup permissions mcp --agent-name 'Project Beacon Mail Agent'
a365 setup permissions bot --agent-name 'Project Beacon Mail Agent'
.\scripts\Deploy-Workshop.ps1 -ConfigPath .\.workshop\config.json -Plan
.\scripts\Deploy-Workshop.ps1 -ConfigPath .\.workshop\config.json -ApproveDeployment
.\scripts\Test-Workshop.ps1   -ConfigPath .\.workshop\config.json
```

Then consent browser access and register the endpoint (Module 2 admin Step 6).

**Check:** `Test-Workshop.ps1` shows Health, UnauthenticatedChat (401) and SignInPage as PASS.
The three NOT TESTED lines are expected: you test them in the labs below.
Give learners the **UI URL** from `.workshop\deployment.json`.

**If it fails:** the first request after deploy can be slow (cold start). Wait a minute and retry.
Investigate failed revisions or RBAC. Never change security policy to make it work.

### Lab 2: Draft the email

**Learner does:** pastes a draft-only prompt, reviews the draft (60 to 80 words, no added recipients).

**You do before class:** run this lab yourself as a lab user. Confirm a draft comes back and **no
email is sent yet**. Check the runtime log without exposing prompts:

```powershell
az containerapp logs show --subscription $c.subscriptionId -g $c.resourceGroup `
  -n "hub-$($c.runName)-api" --type console --tail 50
```

**If it fails:** wait a few seconds and retry once. If the agent sends before being asked, stop and
tell the instructor; record it, do not call it approved behavior.

### Lab 3: Send it and check the mailbox

**Learner does:** asks the agent to send the reviewed email to one approved recipient. The instructor
checks the recipient's mailbox.

**You do before class:** the **approved recipient** is the `<run>-recipient` account created by
`New-WorkshopUsers.ps1`. Keep it with you. Open its Outlook during the lab and read out sender,
recipient, subject, body and time.

**Check:** the real email arrived with the right sender and recipient.

**If it fails:** wait two minutes and check Junk. Do not resend. Check the runtime log. Never add
permissions or recipients to force delivery.

### Lab 4: Record the proof

**Learner does:** opens the sent email in Outlook, captures a screenshot of From, To, Subject and time,
and signs out.

**You do before class:** nothing new. Have somewhere for learners to send the screenshot.

**After class:** close the accounts and the deployment (below).

---

## After class

```powershell
# Disable only this run's recorded accounts (script route). Preview first:
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain -RunName $run -Stage Close -WhatIf
.\scripts\New-WorkshopUsers.ps1 -TenantId $tenant -Domain $domain -RunName $run -Stage Close

# Azure resources. Preview first:
.\scripts\Remove-WorkshopDeployment.ps1 -ConfigPath .\.workshop\config.json -WhatIf
.\scripts\Remove-WorkshopDeployment.ps1 -ConfigPath .\.workshop\config.json
```

- **Form route accounts:** the cleanup Logic App deletes `department=workshop` users after the pass
  expires. If it is not running, delete your test accounts by hand (for example the walkthrough test
  user). Never bulk-delete every "workshop" user without checking the list.
- Remove any extra agents you registered for Lab 3 if you do not want them to stay.
- Securely delete any file that holds passes.

## Go deeper (Microsoft Learn)

- [Overview of Microsoft Agent 365](https://learn.microsoft.com/microsoft-agent-365/overview)
- [Get started with Microsoft Agent 365](https://learn.microsoft.com/microsoft-agent-365/get-started)
- [Manage the agent registry](https://learn.microsoft.com/microsoft-agent-365/admin/agent-registry-overview)
- [How do we start governing agents without slowing innovation?](https://learn.microsoft.com/microsoft-agent-365/guidance/govern-agents-support-innovation)
- [Agent management essentials for Microsoft 365](https://learn.microsoft.com/microsoft-365/copilot/agent-essentials/agent-essentials-overview)
- [Protect agent identities with Microsoft Entra](https://learn.microsoft.com/entra/agent-id/)
- [Create an agent identity blueprint, and register it in the Agent 365 registry](https://learn.microsoft.com/entra/agent-id/create-blueprint)
