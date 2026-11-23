# Module 1: See It. Control It. Protect It.

<!-- source-only -->
[Open the visual student labs](https://cyberlorians.github.io/a365-hub/?view=lab).
This guide follows the introductory teaching sequence inside our workshop.
<!-- /source-only -->

**You need:** Your approved lab account and read-only registry access, or the
authorized instructor live view while access issues are investigated.
No external course, agent build, chat or knowledge test is required.

Lab 1 has three access steps: open the approved process, submit once, check the
access email. Slide 4 explains sign-in; Lab 2 is one sign-in/account check.
Keep TAPs private and never bypass security prompts. Lab 3 has six steps: eleven
generated learner screens total across the three labs. No duration labels,
required copying, worksheet or submission.

## Step 1: Start with useful work

**Do:** Open [Slide 6](https://cyberlorians.github.io/a365-hub/#slide-6), then
[Slide 7](https://cyberlorians.github.io/a365-hub/#slide-7). Consider an illustrative
IT support task: use approved guidance to help with a laptop and create a support ticket.

**Check:** You can distinguish providing information from performing an action,
and explain why a tool needs permission. This
generic illustration is not a claim that a helpdesk sample is deployed.

**Next:** Step 2.

## Step 2: Connect access to evidence

**Do:** Read [Slide 8](https://cyberlorians.github.io/a365-hub/#slide-8), then
[Slide 9](https://cyberlorians.github.io/a365-hub/#slide-9). Explain why the ticket
job needs guide/ticket access, not unrelated payroll/account changes. Then ask
what proves the ticket exists, which recorded steps ran and how the service
behaves across requests. These checks introduce evaluation, tracing and monitoring.

**Check:** You can explain least privilege and distinguish registration from
recorded activity and a verified outcome. No automatic telemetry, additional
setup or external lab is assumed.

**Next:** Step 3.

## Step 3: Review the support agent, then a flagged one

**Do:** Read [Slide 10](https://cyberlorians.github.io/a365-hub/#slide-10), then
[Slide 11](https://cyberlorians.github.io/a365-hub/#slide-11). Launch Lab 3:

1. **r3-open:** Open admin.microsoft.com > Agents > All agents > Registry. Read the
   **Total agents**, **Agents at risk** and **Agents without owners** numbers (do not
   click them). Select **Total agents**, search **Workshop IT Support**, press
   **Enter** and open **Workshop IT Support Agent (synthetic)**, the support agent
   from the slides.
2. **r3-owner:** Read Details **Owner**, **Created by** and **Entra agent ID**.
   Distinguish reporting gaps from known accountability.
3. **r3-reach:** Inspect **Data & tools** (Capabilities, Knowledge, Tools) and
   **Permissions**. If blank, say unknown; do not infer permissions or absence of access.
4. **r3-registry:** Open a second record that Security flagged: search
   **Project Beacon Relay** and open **Project Beacon Relay Agent**, then
   **Security > Risk details**. Required: **High** and **The agent is compromised.**
   This is staged training, not a live attack. Do not use the faulty
   **Agents at risk** count filter. If missing, use the instructor live view or
   report unresolved access/setup; the risk check is not complete without the
   required observation.
5. **r3-evidence:** Back on the support agent, inspect **Activity**. A new agent
   shows no data. Distinguish inventory usage from full execution traces, security
   and audit evidence. No Foundry/Copilot Studio Test activity is required.
6. **r3-watch:** Orally explain an observed fact, a gap and the accountable next
   check. No written output.

**Check:** You reviewed two existing records read-only, with no new deployment or
agent testing. Missing evidence remains a gap.

**Next:** Return from Lab 3 to slide 12 and Step 4, not directly to Module 2.

## Step 4: Map the clues to Entra's controls

**Do:** Open [Slide 12](https://cyberlorians.github.io/a365-hub/#slide-12).
Match Owner, Created by and Permissions from the selected record to the five Entra
controls. Agent 365 shows clues; Entra holds the controls.

**Check:** Creation, ownership and approval differ. A registry field is a clue, not
proof a control works. Name the accountable next check when the record does not
answer the question.

**Next:** Step 5.

## Step 5: Data, a wrong result and value

**Do:** Read [Slide 13](https://cyberlorians.github.io/a365-hub/#slide-13),
[Slide 14](https://cyberlorians.github.io/a365-hub/#slide-14) and
[Slide 15](https://cyberlorians.github.io/a365-hub/#slide-15).
Using the support agent from the slides, ask what data it could touch, how you would
respond if it opened a ticket in the wrong queue, and what would show it is worth
keeping.

**Check:** Registry metadata is not complete effective access or execution proof.
Entra, Purview and Defender evidence has separate coverage/access requirements.
Registration and usage alone do not establish business value.

**Next:** Step 6.

## Step 6: Say what you can now explain

**Do:** Open [Slide 16](https://cyberlorians.github.io/a365-hub/#slide-16).
Review the four questions, then discuss one observed fact, one gap and the
accountable next check.

**Check:** You do not invent permissions, traces, control outcomes or a live attack.
No copying, worksheet or written submission is required.

**Next:** Step 7.

## Step 7: Establish normal before investigating abnormal

**Do:** Read [Slide 17](https://cyberlorians.github.io/a365-hub/#slide-17).
Reuse the four questions with other implementations. For optional extra reading,
see [How Agent 365 monitors and manages agents](https://learn.microsoft.com/en-us/training/modules/agent-365-monitor-manage/monitor-agent)
and the [Explore Microsoft Agent 365 learning path](https://learn.microsoft.com/en-us/training/paths/agent-365-solutions/)
on Microsoft Learn. Neither is part of the workshop.

**Check:** Using/testing and any optional maker build belong in Module 2.
Its current separate mail runtime/content is unchanged; no replacement sample or
optional path is claimed implemented or deployed.

**Next:** [Module 2 walkthrough](module-02-business-agent.md), when released.

## Finished

Do not alter grants, risk or shared resources. The instructor handles approved
retention/reset/cleanup. Fresh learner registry access still requires independent
preflight; prior admin observations are not learner proof.
