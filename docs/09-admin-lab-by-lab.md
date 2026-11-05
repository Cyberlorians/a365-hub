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

**Learner does:** opens the Microsoft 365 admin center, goes to **Agents > All agents > Registry**, reads the
three numbers, clicks **Agents at risk**, opens the **Risks** number on the flagged **Project Beacon Relay
Agent**, then opens **Project Beacon Mail Agent** and reads every part of its profile: the **Block** and
**View in map** buttons, **About this agent**, the **Details** tab (Overview, Instructions, Identity,
Environment, Properties), **Permissions**, **Data & tools**, **Security**, **Users** and **Activity**. They only look.

> **If learners do not see the agents (found November 5, 2026):** nothing in Module 1 creates them.
> A new tenant has no agent with that name, and the registry shows only what has been added to it. I checked
> the real registry (401 agents) and searching **Beacon** returned nothing. Do **Populate Lab 3** below,
> once, before class.

#### Populate Lab 3

The finished lab needs **two registered agents and one staged flag**, all made before class:

| Agent | Made how | Why |
|---|---|---|
| **Project Beacon Relay Agent** | `a365 setup all --agent-name "Project Beacon Relay"` (Route B, step 3; the CLI adds " Agent"), then flagged compromised | The lab-only agent that makes **Agents at risk** show **1** and gives learners Risk details to read |
| **Project Beacon Mail Agent** | `a365 setup all --m365 --agent-name "Project Beacon Mail"` (Route B, step 4; the real Module 2 agent) | Has an Entra agent ID, an owner (sponsor), identity IDs and Entra permissions, so Details and Permissions have real values |

**Route B is the recommended route.** It is the only one that fills Data & tools, Permissions and the Entra
agent ID, and the only one that gives an agent that can be flagged. **Route A** (upload a stand-in from the
admin center) was run end to end on November 5, 2026 and is the fallback: it registers an agent with
**empty** Data & tools, Permissions and Entra agent ID, and it cannot be flagged.

**Route A (fallback): publish a stand-in from the admin center**

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
5. **Check:** back on the Registry, search for **Beacon**. You should see **Project Beacon Mail Agent**
   (Publisher type: Your org). The numbers at the top can take a while to update; the list is immediate.
   If you uploaded the older package named **Project Beacon**, remove it first.

This is a small declarative agent with no actions: it cannot send email. In the Details pane it shows
**Owner: a dash**, **Entra agent ID: a dash**, **Data and tools: unavailable** and **Permissions: none from
Entra ID**. Lab 3 expects populated tabs, so with Route A tell learners these are the findings (an agent
nobody owns and nothing governs) and skip the Relay Agent steps.
To remove it later: Registry > Project Beacon Mail Agent > delete or remove the agent.

**Route B (recommended): register the agents with the Agent 365 CLI**

You need: PowerShell 7, Git, Azure CLI, the .NET SDK and the `a365` CLI
([install steps](08-module-02-admin-runbook.md)), an Azure subscription in the lab tenant, and an
Entra admin who can approve the consent pages.
**Run on November 5, 2026 with CLI 2.0.1 in the live lab tenant:** both agents were created and registered with
the commands below, the Relay Agent was flagged, and the registry showed both. Notes from that run:
- `a365 setup all --agent-name '<name>'` needs **no config file** and detects the tenant from `az login`.
  Use `--dry-run` first to see the steps.
- **The CLI adds the word "Agent" to the registry name.** Give it `Project Beacon Mail`, not
  `Project Beacon Mail Agent`, or the registry shows "Project Beacon Mail Agent Agent".
- On native Windows the CLI signs in through **Windows Account Manager**. Run it in your own PowerShell window and
  choose the lab admin account when prompted. It also needs the PowerShell module
  `Microsoft.Graph.Applications`: `Install-Module Microsoft.Graph.Applications -Scope CurrentUser`.
- Setup opens an **admin consent** page for broad delegated grants (Mail.ReadWrite, Mail.Send, Files.ReadWrite.All
  and others). Lab 3 does not need them to display. Grant them only for the Mail Agent, only in a lab tenant, and
  only if you deploy Module 2. We did not grant them for the Relay Agent.
- `a365 cleanup --agent-name '<base name>' --yes` (run in the same folder) removes the registration, blueprint
  and agent identity, so you can redo a bad name.
When you do Route B, remove the Route A stand-in first if you uploaded one, so learners do not see a third
"Project Beacon" row (the admin center row menu has no delete, so use Apps in the admin center).

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

**3. The lab-only Relay Agent FIRST.** It is the agent you flag in the next section, so it must have an
Entra agent identity. Do not deploy it and do not use it in Module 2. Run one command at a time:

```powershell
a365 setup requirements
a365 setup all --agent-name 'Project Beacon Relay'
```

> **Order matters.** Every `a365 setup all` writes `a365.generated.config.json` and `.env` in the folder you
> run it from, so run the Relay Agent and the Mail Agent from **different folders**, or the second run
> replaces the first. Module 2's `Deploy-Workshop.ps1` reads the Mail Agent's file.
> Note the Relay Agent's **agent identity ID** from the setup summary ("Agent identity ... created ... ID").
> You need it for the flag step.

**4. The Mail Agent, last.** The same commands as Module 2 admin Step 4:

```powershell
$agentName = 'Project Beacon Mail'
a365 setup requirements
a365 setup all --m365 --agent-name $agentName
a365 setup permissions mcp --agent-name $agentName
a365 setup permissions bot --agent-name $agentName
```

Approve each consent page and answer `y` to the Observability prompt. Leave the messaging endpoint
blank. Store the blueprint secret privately; you need it for the Module 2 deploy. Then return to the hub
root: `Set-Location $hub`.

**5. Verify as the admin.** Open `admin.microsoft.com`, then **Agents > All agents > Registry**. Allow a
few minutes, refresh, and clear any filter. You should see **Project Beacon Mail Agent** and **Project Beacon
Relay Agent**. Optional check from PowerShell (**beta Graph, untested**; if it errors, use the
Entra admin center, **Entra ID > Agents**):

```powershell
Connect-MgGraph -TenantId $c.tenantId -Scopes Application.Read.All -NoWelcome
(Invoke-MgGraphRequest -Method GET `
  -Uri 'https://graph.microsoft.com/beta/applications/microsoft.graph.agentIdentityBlueprint').value |
  Select-Object displayName, appId
```

**6. Give learners the AI Reader role** (next section) and test as a lab user.

**What the learner should find, and why** (so you can explain it in class).

- **Agents at risk = 1.** The Relay Agent, flagged by you (next section). Learners click the number, open the
  **Risks** number on the Relay Agent and read **Risk details**: severity group, description, source
  (Microsoft Entra). Tell them it is staged. The numbers can lag up to an hour, so stage it early.
- **Project Beacon Mail Agent (observed November 5, 2026).** Details: **Owner** and **Created by** show whoever
  ran setup (the CLI makes that person sponsor and owner), **Publisher** None, **Publisher type** Your users, an
  **Entra agent ID**. **Instructions**: "No instructions provided". **Identity**: Entra agent ID, Blueprint ID,
  Source agent ID, Bot ID (a dash). **Environment**: "This agent doesn't have an environment". **Properties**:
  Editors. **Permissions**: an "Entra Permissions" list (for example AgentIdentity.CreateAsManager, type
  Application). **Data & tools**: **"Data and tools are unavailable"**, even though the agent is registered:
  the tab shows only what the agent platform reports, and these agents report no tools or data. **Security**:
  Microsoft Entra protections and Microsoft Purview protections. **Users**: Installed for, Available to, Shared
  with. **Activity**: No data until the agent is used. The buttons at the top are **Block** and **View in map**
  (no Install). Lab 3 is written to these values; yours will differ in names and IDs.
- **To make Data & tools show rows** you need an agent whose platform reports knowledge sources and tools, for
  example a **Copilot Studio** agent with a knowledge source and a tool. We could not build one from our
  automated browser (Copilot Studio would not render). It is an optional extra; build it by hand and update
  Lab 3 step 5 to match what you see.
- **Route A (observed in a live tenant, November 5, 2026):** Project Beacon is in the Registry with
  Publisher type **Your org**. **Owner**, **Created by** and **Entra agent ID** are a dash. **Data & tools**
  says "Data and tools are unavailable". **Permissions** says "This agent doesn't have permissions from
  Microsoft Entra ID". **Risks** shows 0 and the **Security** tab lists enabled policies and protections
  (Microsoft Purview and others). The honest message: no named owner, no governed identity.
- The **Risks** column and Security tab need an E7 or Agent 365 license to appear. If you also want learners
  to find an agent with **no owner** in the count, use another agent (for example a Copilot Studio agent whose
  creator was deleted).
- **Search matters.** The Registry lists hundreds of agents (401 in the test tenant), so learners search
  for **Beacon**.
- **Data & tools.** Per Microsoft Learn it lists capabilities (public sites, files, email, calendar), knowledge
  sources and tools (connectors, MCP servers, actions), and stays empty when none are configured, when the
  agent type does not report them, or before the first sync. Learn says AI Administrator or Global
  Administrator see it for all agents; confirm what an AI Reader learner sees before class.
- **Why not have every learner build an agent in Module 2?** Learners have a read-only role, a build needs
  Copilot Studio licensing and an environment per person, and it would crowd the 35-minute Module 2 core
  (the README keeps the maker path as an optional extension). Instead the admin builds it once and learners
  review it in Lab 3, then use it in Module 2. A build-and-install lab belongs in an optional later module.
- Learners must not click **Block** (it acts on the whole tenant).

**Stage the flag: make "Agents at risk" show 1 (required for the finished Lab 3)**

Flag the **Project Beacon Relay Agent** on purpose, in the lab tenant only. Rules:

- **Only an Entra agent identity can be flagged.** The Route A stand-in has no Entra identity, so it cannot be
  flagged. Use the Relay Agent registered in Route B, step 3.
- **Never flag the Mail Agent.** A High risk level can be blocked by a Conditional Access policy and
  would break Module 2.
- **Tell learners it was staged.** It is a deliberate flag for the exercise, not a real attack. How it
  happened, in one sentence for the room: you marked it compromised in Entra ID Protection, which is the
  same action a security analyst takes after a real detection such as a stolen secret (slide 9).
- **Needs** Microsoft Entra ID P2 during preview, and soon a Microsoft Agent 365 license (Microsoft Learn,
  Identity Protection for agents). Only for a lab tenant. Never do this in production.

Per Microsoft Learn, an admin can **confirm an agent as compromised**, which sets its risk level to **High**.
In the portal this is the **Risky agents** report in Entra ID Protection. From PowerShell this exact call was
**run successfully on November 5, 2026** (it returns nothing on success; permission
`IdentityRiskyAgent.ReadWrite.All`; it needs the agent **identity ID** from the setup summary). Sign in with
`-UseDeviceCode` if the window handle error appears, and accept the consent for your own account only:

```powershell
Connect-MgGraph -TenantId <tenant-id> -Scopes IdentityRiskyAgent.ReadWrite.All -UseDeviceCode -NoWelcome
$body = @{ agentIds = @('<agent-identity-id-of-the-Relay-Agent>') } | ConvertTo-Json
Invoke-MgGraphRequest -Method POST -ContentType 'application/json' `
  -Uri 'https://graph.microsoft.com/beta/identityProtection/riskyAgents/confirmCompromised' -Body $body
# Check (it can take about 10 minutes to appear):
(Invoke-MgGraphRequest -Method GET -Uri 'https://graph.microsoft.com/beta/identityProtection/riskyAgents').value |
  Select-Object agentDisplayName, riskLevel, riskState
```

It should list the Relay Agent as **high** and **confirmedCompromised**. Afterwards the number at the top of the
Registry can take up to an hour to change. Undo it with **Confirm safe** or **Dismiss risk** in the same report
(`.../riskyAgents/dismiss` with the same body). If you delete and re-register the Relay Agent, its old risk
record stays; dismiss it. Learners can click the **Agents at risk** number (Microsoft Learn says it filters the
list to the flagged agents; **not yet observed by us**), open that agent, and read its Risk details.

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

2. **Make sure both agents are in the registry and the flag is staged.** Do **Populate Lab 3**, Route B
   (Route A only as a fallback), then stage the flag. Searching the Registry for **Beacon** must return
   **Project Beacon Mail Agent** and **Project Beacon Relay Agent**, and **Agents at risk** must show **1**.
   Do this at least two hours before class.
3. **Other agents (optional).** Another option: a **Copilot Studio** agent created and shared by a throwaway
   user appears in the registry on its own, and hard deleting that user makes it an ownerless agent (the
   **Agents without owners** count goes up). Untested.
4. **Risks column.** It needs an **E7 or Agent 365 license** in the tenant. If it is missing, tell
   learners: that is what an unlicensed tenant sees. Counts can lag up to an hour.

**Check:** sign in as a lab user in a separate profile, open `admin.microsoft.com`, go to
**Agents > All agents > Registry**. You should see the summary tiles with **Agents at risk = 1**, the Relay
Agent's Risk details, and every tab of **Project Beacon Mail Agent**.

**If it fails**

| Symptom | Fix |
|---|---|
| Blank page or HTTP 401 at the admin center | The user has no role yet. Assign **AI Reader**. |
| Registry empty | Add the agents: **Populate Lab 3**. Check no filter is set. |
| Agents at risk shows a dash | The flag is not staged yet, or the counts have not caught up (up to an hour). Check the Relay Agent in Entra ID Protection, Risky agents. A Route A stand-in cannot be flagged. |
| Project Beacon missing | Nothing in Module 1 creates the agents. Run **Populate Lab 3**, then search the Registry for **Beacon**. On Route B check the registered names start with **Project Beacon**; if the agent exists in Entra (Entra ID > Agents) but not in the registry, re-run only the registration step: `a365 setup all --agent-registration-only` (documented on [Microsoft Learn](https://learn.microsoft.com/entra/agent-id/create-blueprint#register-agents-in-the-agent-365-registry)). |
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
a365 setup all --m365 --agent-name 'Project Beacon Mail'
a365 setup permissions mcp --agent-name 'Project Beacon Mail'
a365 setup permissions bot --agent-name 'Project Beacon Mail'
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
