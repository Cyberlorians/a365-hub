# Module 1: Follow Along Step by Step

<!-- source-only -->
[Open the visual student labs](https://cyberlorians.github.io/a365-hub/?view=lab).
This Markdown guide follows the same business case and evidence boundaries as the
teaching deck and numbered labs.
<!-- /source-only -->

**What you will do:** Review one agent and discuss what the registry does and does not tell you.
**You need:** A browser and tested read-only registry access
or the instructor's authorized presenter/labeled prior-run evidence.
Standing AI Reader or the presenter fallback provides read-only access. No write role is needed.

## Get ready

Use the event's tested access form or privately distributed credentials. Visual
Lab 1 requests access. Slide 4 explains admin-center sign-in; Lab 2 is a one-screen
account confirmation, not a second walkthrough.
Never use a production account, share a TAP, or bypass a security prompt.
The instructor preflights AI Reader
separately. If blocked, follow the prepared presenter view; do not request write rights.

There is no worksheet, copying exercise or written submission. Optional notes are for your own use.

## Step 1: Understand the business case

**Do:** Open [Slide 6](https://cyberlorians.github.io/a365-hub/#slide-6), then
[Slide 7](https://cyberlorians.github.io/a365-hub/#slide-7). Project Beacon is a
fictional rollout, and you are its coordinator. The approved brief has three of four
documentation tasks complete, an architecture diagram still to review, and a next
action to confirm the review owner. The Mail Agent should draft an update; you
review the content and one approved internal recipient before explicitly requesting
send and checking receipt in Module 2. Module 1 reviews its registration only.
Identify the task and its intended boundary.

**Check:** You know the useful task and four review questions. You have not claimed
the runtime or boundary was tested merely because a record exists.

**Next:** Step 2.

## Step 2: Compare scenarios and risks

**Do:** Read [Slide 8](https://cyberlorians.github.io/a365-hub/#slide-8), then
[Slide 9](https://cyberlorians.github.io/a365-hub/#slide-9). Recognize four overlapping
lenses: Agent 365 customers, Microsoft first-party runtimes, agents anywhere calling
Microsoft APIs, and cross-cloud workflows/federation. Write why a correctly signed-in
agent could still do the wrong thing.

**Check:** Hosting is not permission. Federation alone grants no resource access.
Both identity misuse and content manipulation need investigation; a sign-in alone
cannot establish every action. Module 3 traces authority in detail.

**Next:** Step 3.

## Step 3: Start the registry review

**Do:** Read [Slide 10](https://cyberlorians.github.io/a365-hub/#slide-10), then
[Slide 11](https://cyberlorians.github.io/a365-hub/#slide-11). Start visual Lab 3:
open **Agents > All agents > Registry** using tested access, or follow labeled
presenter evidence. Find the prepared **Project Beacon Mail Agent** and begin the
four-question review. Look at the counts and available fields. No copying is needed.

**Check:** Unknowns stay unknown. A zero/dash risk count does not prove safety.
If the risk count opens an empty list, continue; the count's details are unavailable in this view. The separate Relay Agent is the staged training-risk
example, not the Mail Agent or a live incident. The instructor can compare Entra
Identity Protection > Risky agents later; learners need no extra role.
Do not click Block or change anything.

**Next:** Continue Lab 3 within Step 4, not as extra time.

## Step 4: Complete the review and choose a control

**Do:** Open [Slide 12](https://cyberlorians.github.io/a365-hub/#slide-12). Complete
Lab 3's read-only profile review: Details, Permissions, Data & tools, Security,
Users and Activity where available. Look for purpose, accountable people, reach and evidence. Match one finding to an Entra control objective.

**Check:** Permissions and Data & tools may both be blank for this record. Continue when they are blank; access is unknown from this view.
You are not expected to find capabilities, knowledge sources or tools.
Ask the instructor to verify the mapped app/service principal grants in Entra and
the deployed tool configuration; Module 2 tests the actual task.
An available permission list is not proof of every effective grant. A displayed
security link does not prove a control is configured or effective.
Use a labeled fallback if the selected record or tab is unavailable.

**Next:** Return from Lab 3 to the teaching deck and continue with Step 5.

## Step 5: Decide what proof you need

**Do:** Read [Slide 13](https://cyberlorians.github.io/a365-hub/#slide-13),
[Slide 14](https://cyberlorians.github.io/a365-hub/#slide-14), and
[Slide 15](https://cyberlorians.github.io/a365-hub/#slide-15). Connect one open
question to the source that could answer it.

**Check:** Entra addresses identity/access, Agent 365 supported management visibility,
Purview data controls/improvement work, and Defender investigation/response.
Audit is not block. Slide 14 gives actual navigation paths for Entra sign-in and
directory audit logs, Azure Container App Log stream, Purview Audit and Defender
Incidents & alerts. They require separate access and appropriate logging.
Opening more portals is not required in this module.

**Next:** Step 6.

## Step 6: Discuss what you saw

**Do:** Open [Slide 16](https://cyberlorians.github.io/a365-hub/#slide-16).
Discuss one thing the registry showed and one thing you still cannot verify. Use the
[discussion answer key](../slides/module-01/exercise.md) for examples.

**Check:** Explain why a valid sign-in does not prove safe behavior. Explicit unknowns
with a concrete validation step are valid; invented results are not.
This is a discussion, not an interactive quiz.

**Next:** Step 7.

## Step 7: Keep the next action and hand off

**Do:** Read [Slide 17](https://cyberlorians.github.io/a365-hub/#slide-17).
Share feedback for the next remote session.

**Check:** You can describe one observation and one unanswered question. Module 2 needs
its own runtime/mail preflight; registration is not deployment or delivery proof.

**Next:** [Module 2 walkthrough](module-02-business-agent.md), when the instructor
confirms its setup is ready.

## Finished

Do not delete accounts, change grants, or alter policy.
The instructor handles approved support, retention and run-scoped cleanup.
