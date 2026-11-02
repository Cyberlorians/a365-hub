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
| M1 Lab 3: See your agents in the Agent 365 registry | **Blocked until you assign a read-only role.** As provisioned, the lab user got an empty page (HTTP 401) at the Microsoft 365 admin center. That strongly suggests a missing role, but it was tested through the lab tenant's sign-in endpoint, so confirm with a normal browser profile after you assign the role. |
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

**You do before class**

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

2. **Make sure Project Beacon is in the registry.** It is created in the Module 2 admin steps.
   Register it as **Project Beacon Mail Agent** so the row matches the lab text:
   `$agentName = 'Project Beacon Mail Agent'` in [Module 2 admin Step 4](08-module-02-admin-runbook.md).
3. **Fill the registry so there is something to compare (recommended).** Run one command at a time
   (each opens its own sign-in window):

```powershell
a365 setup requirements
a365 setup all --m365 --agent-name "Beacon Finance Helper"
a365 setup all --m365 --agent-name "Beacon Travel Helper"
```

   These need no deployment. Optional: a **Copilot Studio** agent created and shared by a throwaway
   user appears in the registry on its own; hard deleting that user makes it an ownerless agent
   (the **Agents without owners** count goes up). Untested.
4. **Risks column.** It needs an **E7 or Agent 365 license** in the tenant. If it is missing, tell
   learners: that is what an unlicensed tenant sees. Counts can lag up to an hour.

**Check:** sign in as a lab user in a separate profile, open `admin.microsoft.com`, go to
**Agents > All agents > Registry**. You should see the summary tiles and at least Project Beacon.

**If it fails**

| Symptom | Fix |
|---|---|
| Blank page or HTTP 401 at the admin center | The user has no role yet. Assign **AI Reader**. |
| Registry empty | Register the agent: Module 2 admin Step 4. Check no filter is set. |
| Project Beacon missing | Blueprint agents must be registered to appear. Re-run `a365 setup all`. |
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
