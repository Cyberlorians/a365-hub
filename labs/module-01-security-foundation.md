# Module 1: Follow Along Step by Step

<!-- source-only -->
[Open the visual student labs](https://cyberlorians.github.io/a365-hub/?view=lab).
This Markdown guide follows the same business case and evidence boundaries as the
teaching deck and numbered labs.
<!-- /source-only -->

**What you will do:** Review one agent and create a readiness worksheet.
**You need:** A browser, somewhere to take notes, and tested read-only registry access
or the instructor's authorized presenter/labeled prior-run evidence.
**Allow:** 25 core minutes including the registry activity and discussion, plus
12 proposed onboarding minutes, including a one-minute sign-in check. No write role
is needed; standing AI Reader or the presenter fallback provides read-only access.

## Get ready

Use the event's tested access form or privately distributed credentials. Visual
Lab 1 requests access. Slide 4 explains admin-center sign-in; Lab 2 is a one-screen,
one-minute confirmation, not a second walkthrough. Both sit outside the core timebox.
Never use a production account, share a TAP, or bypass a security prompt.
The instructor preflights AI Reader
separately. If blocked, follow the prepared presenter view; do not request write rights.

The **worksheet is a plain-text note**, not a separate handout or Excel file.
Open Notepad, OneNote or any blank note and paste the template below. The first
screen of visual Lab 3 has the same template with a Copy button.

```text
Evidence mode (current lab / presenter view / prior run), source and time:
Registry counts (Total agents / Agents at risk / Agents without owners):
Risk details, or "Count shown; risk details not returned":
Selected agent name:
What does the agent do?
Who is accountable, and who actually acts?
What reach is actually reported? (Permissions / Data & tools; "not shown" is valid.)
What is the intended task/data/recipient boundary? (Not proof of effective access.)
What evidence shows what happened?
One gap:
Next action and accountable person or role:
```

## Step 1: Understand the business case (4 minutes)

**Do:** Open [Slide 6](https://cyberlorians.github.io/a365-hub/#slide-6), then
[Slide 7](https://cyberlorians.github.io/a365-hub/#slide-7). Project Beacon is a
fictional rollout, and you are its coordinator. The approved brief has three of four
documentation tasks complete, an architecture diagram still to review, and a next
action to confirm the review owner. The Mail Agent should draft an update; you
review the content and one approved internal recipient before explicitly requesting
send and checking receipt in Module 2. Module 1 reviews its registration only.
Start the worksheet's purpose and boundary answers.

**Check:** You know the useful task and four review questions. You have not claimed
the runtime or boundary was tested merely because a record exists.

**Next:** Step 2.

## Step 2: Compare scenarios and risks (4 minutes)

**Do:** Read [Slide 8](https://cyberlorians.github.io/a365-hub/#slide-8), then
[Slide 9](https://cyberlorians.github.io/a365-hub/#slide-9). Recognize four overlapping
lenses: Agent 365 customers, Microsoft first-party runtimes, agents anywhere calling
Microsoft APIs, and cross-cloud workflows/federation. Write why a correctly signed-in
agent could still do the wrong thing.

**Check:** Hosting is not permission. Federation alone grants no resource access.
Both identity misuse and content manipulation need investigation; a sign-in alone
cannot establish every action. Module 3 traces authority in detail.

**Next:** Step 3.

## Step 3: Start the registry review (4 minutes)

**Do:** Read [Slide 10](https://cyberlorians.github.io/a365-hub/#slide-10), then
[Slide 11](https://cyberlorians.github.io/a365-hub/#slide-11). Start visual Lab 3:
open **Agents > All agents > Registry** using tested access, or follow labeled
presenter evidence. Find the prepared **Project Beacon Mail Agent** and begin the
four-question review. Start with Lab 3's copyable worksheet, then record source/time,
actual counts and available fields.

**Check:** Unknowns stay unknown. A zero/dash risk count does not prove safety.
If the risk count opens an empty list, record **Count shown; risk details not
returned** and continue. The separate Relay Agent is the staged training-risk
example, not the Mail Agent or a live incident. The instructor can compare Entra
Identity Protection > Risky agents later; learners need no extra role.
Do not click Block or change anything.

**Next:** Continue Lab 3 within Step 4, not as extra time.

## Step 4: Complete the review and choose a control (5 minutes)

**Do:** Open [Slide 12](https://cyberlorians.github.io/a365-hub/#slide-12). Complete
Lab 3's read-only profile review: Details, Permissions, Data & tools, Security,
Users and Activity where available. Record purpose, accountable people, reach and
evidence. Match one finding to an Entra control objective.

**Check:** Permissions and Data & tools may both be blank for this record. Write
**Permissions: not shown** and **Data & tools: not shown** as applicable.
You are not expected to find capabilities, knowledge sources or tools.
Ask the instructor to verify the mapped app/service principal grants in Entra and
the deployed tool configuration; Module 2 tests the actual task.
An available permission list is not proof of every effective grant. A displayed
security link does not prove a control is configured or effective.
Use a labeled fallback if the selected record or tab is unavailable.

**Next:** Return from Lab 3 to the teaching deck and continue with Step 5.

## Step 5: Decide what proof you need (4 minutes)

**Do:** Read [Slide 13](https://cyberlorians.github.io/a365-hub/#slide-13),
[Slide 14](https://cyberlorians.github.io/a365-hub/#slide-14), and
[Slide 15](https://cyberlorians.github.io/a365-hub/#slide-15). Connect one worksheet
gap to identity, runtime/tool, data/workload or supported network evidence.

**Check:** Entra addresses identity/access, Agent 365 supported management visibility,
Purview data controls/improvement work, and Defender investigation/response.
Audit is not block. Slide 14 gives actual navigation paths for Entra sign-in and
directory audit logs, Azure Container App Log stream, Purview Audit and Defender
Incidents & alerts. They require separate access and appropriate logging.
Opening more portals is not required in this module.

**Next:** Step 6.

## Step 6: Discuss your readiness worksheet (3 minutes)

**Do:** Open [Slide 16](https://cyberlorians.github.io/a365-hub/#slide-16).
Spend two minutes finishing the four answers, one gap and one owned next action;
then discuss for one minute. Use the
[discussion answer key](../slides/module-01/exercise.md) for examples.

**Check:** Explain why a valid sign-in does not prove safe behavior. Explicit unknowns
with a concrete validation step are valid; invented results are not.
This is a discussion, not an interactive quiz.

**Next:** Step 7.

## Step 7: Keep the next action and hand off (1 minute)

**Do:** Read [Slide 17](https://cyberlorians.github.io/a365-hub/#slide-17).
Retain your worksheet and share feedback for the next remote session.

**Check:** You have four answers, one gap and one owned next action. Module 2 needs
its own runtime/mail preflight; registration is not deployment or delivery proof.

**Next:** [Module 2 walkthrough](module-02-business-agent.md), when the instructor
confirms its setup is ready.

## Finished

Keep the worksheet. Do not delete accounts, change grants, or alter policy.
The instructor handles approved support, retention and run-scoped cleanup.

<details>
<summary>Optional reference: per-slide timing</summary>

## Walk through the core

These timeboxes include the visual registry lab and worksheet work, not extra
exercises after the teaching slides.

| Step | Open | What you do | Expected result / checkpoint | Minutes |
|---|---|---|---|---:|
| 1 | [Slide 6](https://cyberlorians.github.io/a365-hub/#slide-6) | Frame secure adoption | See/control/protect; readiness output | 1 |
| 2 | [Slide 7](https://cyberlorians.github.io/a365-hub/#slide-7) | Follow the concrete Beacon email scenario | Purpose, people, reach, evidence | 3 |
| 3 | [Slide 8](https://cyberlorians.github.io/a365-hub/#slide-8) | Recognize the four overlapping scenarios | Hosting, identity, visibility and permission differ | 1 |
| 4 | [Slide 9](https://cyberlorians.github.io/a365-hub/#slide-9) | Compare identity/content misuse | Valid sign-in is not safe behavior | 3 |
| 5 | [Slide 10](https://cyberlorians.github.io/a365-hub/#slide-10) | Relate observe/govern/secure | Inventory is not complete coverage | 1 |
| 6 | [Slide 11](https://cyberlorians.github.io/a365-hub/#slide-11) | Start Lab 3's prepared registry review | Actual counts, evidence mode, source/time | 3 |
| 7 | [Slide 12](https://cyberlorians.github.io/a365-hub/#slide-12) | Finish Lab 3 and map one control | Four answers; no write actions | 5 |
| 8 | [Slide 13](https://cyberlorians.github.io/a365-hub/#slide-13) | Identify supported data controls | Audit is not block; own improvement | 1.5 |
| 9 | [Slide 14](https://cyberlorians.github.io/a365-hub/#slide-14) | Identify evidence sources and gaps | Unknown is not safe | 1 |
| 10 | [Slide 15](https://cyberlorians.github.io/a365-hub/#slide-15) | Connect evidence to response | Scoped action and verification | 1.5 |
| 11 | [Slide 16](https://cyberlorians.github.io/a365-hub/#slide-16) | Finish and discuss worksheet | Four answers, gap, owned next action | 3 |
| 12 | [Slide 17](https://cyberlorians.github.io/a365-hub/#slide-17) | Keep notes and give feedback | Module 2's independent runtime gate | 1 |

Presenting? Use the [admin runbook](../docs/07-module-01-admin-runbook.md) and
[lab-by-lab preparation](../docs/09-admin-lab-by-lab.md).

</details>
