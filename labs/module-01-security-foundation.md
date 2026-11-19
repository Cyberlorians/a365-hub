# Module 1: Understand, Test and Inspect an Agent

<!-- source-only -->
[Open the visual student labs](https://cyberlorians.github.io/a365-hub/?view=lab).
This guide follows the same sample-led sequence as the teaching deck.
<!-- /source-only -->

**What you will do:** Explore Microsoft's IT helpdesk learning scenario, inspect
real knowledge, compare an answer with its source and review access/risk.
**You need:** Your approved lab account, the exact sample name and tested chat link
from the instructor, and standing AI Reader for registry review.
The instructor shows configuration from their maker view. Chat and source access
are separate from AI Reader. If your access is blocked, follow the live demonstration
while the instructor investigates; do not request maker or admin rights.

## Get ready

Lab 1 requests the event account. Slide 4 explains sign-in; Lab 2 only confirms
the signed-in username. Keep TAPs private. Never bypass a security prompt.
You do not create or publish an agent in Module 1. No worksheet, prescribed copied
answer, written submission, ticket creation or production data is required.

## Step 1: Understand Microsoft's sample

**Do:** Open [Slide 6](https://cyberlorians.github.io/a365-hub/#slide-6), then
[Slide 7](https://cyberlorians.github.io/a365-hub/#slide-7). Read the use case in
[Microsoft Agent Academy's helpdesk lesson](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/#use-case).
An employee needs help with an IT issue or policy. The agent should use approved
sources and escalate unknowns. The course's Contoso IT site provides sample policy
pages and Devices/Tickets lists; a list is not automatically a tool.

**Check:** You can state the useful task and intended boundary: answer and explain
from approved knowledge. Microsoft supplies a learning sequence, not a running
agent in your tenant. The instructor must prepare the actual sample.

**Next:** Step 2.

## Step 2: Separate knowledge, tools and authority

**Do:** Read [Slide 8](https://cyberlorians.github.io/a365-hub/#slide-8), then
[Slide 9](https://cyberlorians.github.io/a365-hub/#slide-9). Distinguish purpose,
instructions, knowledge and tools. Compare access/configuration misuse with
misleading source content.

**Check:** Knowledge supplies information; tools perform configured actions.
Instructions are not an access-control policy. A valid sign-in or a correct answer
does not prove safe access or complete protection.

**Next:** Step 3.

## Step 3: Start the sample lab

**Do:** Read [Slide 10](https://cyberlorians.github.io/a365-hub/#slide-10), then
[Slide 11](https://cyberlorians.github.io/a365-hub/#slide-11). Start Lab 3.
Follow the instructor's real instructions and Knowledge view. Open an actual ready
source, ask a support question through the tested channel, and compare the answer
with that source. Try an ordinary out-of-scope question and inspect the actual result.
The instructor shows Test activity; you do not need maker access.

**Check:** You have seen real configuration and a real answer/source comparison.
If the sample or source is missing, report blocked setup; reading the lesson alone
is not completion. If an answer is invented, report the failure rather than calling
the boundary successful. Do not follow the linked lesson's Create or Publish steps.

**Next:** Continue Lab 3 within Step 4.

## Step 4: Review access and risk

**Do:** Open [Slide 12](https://cyberlorians.github.io/a365-hub/#slide-12). Find the
same prepared helpdesk sample in **Agents > All agents > Registry**: select
**Total agents**, search its exact event name, press **Enter** and open its Details.
Read ownership and available identity context. Compare Data & tools and Permissions
with the instructor's live configuration.

For the separate staged-risk example, search **Project Beacon Relay**, open
**Project Beacon Relay Agent > Security > Risk details**, and see **High /
The agent is compromised.** This is a separate identity, not the helpdesk agent or
a live attack. Bypass the risk-count filter; it can return an empty list despite
profile risk. Missing profile risk is not a completed risk check.

**Check:** You can name an actual knowledge source and distinguish a configured
tool from a list or answer. Registry blanks are visibility gaps; continue the
comparison in the live configuration view, not by guessing. Match one finding to
an Entra control. Do not Block, publish, grant access or change risk.

**Next:** Return to the teaching deck and continue with Step 5.

## Step 5: Decide what each source proves

**Do:** Read [Slide 13](https://cyberlorians.github.io/a365-hub/#slide-13),
[Slide 14](https://cyberlorians.github.io/a365-hub/#slide-14) and
[Slide 15](https://cyberlorians.github.io/a365-hub/#slide-15). Connect one open
question to an evidence source.

**Check:** Copilot Studio test activity helps inspect this sample's knowledge/action
path. Entra sign-in/audit, Purview Audit and Defender Incidents & alerts answer
different questions and require separate roles. Audit is not blocking; a test pane
is not a complete security audit trail. The separate Module 2 custom runtime uses
Container App Log stream, not this sample's test view.

**Next:** Step 6.

## Step 6: Explain what you observed

**Do:** Open [Slide 16](https://cyberlorians.github.io/a365-hub/#slide-16).
Discuss the employee task, one real source, whether a tool action was configured
or observed, and one unproven control. Notes are optional.

**Check:** You can explain one observed result and one unknown without inventing
permissions, tool executions or policy outcomes. A failed test is a finding.

**Next:** Step 7.

## Step 7: Carry the method into the next module

**Do:** Read [Slide 17](https://cyberlorians.github.io/a365-hub/#slide-17).
Use the same purpose, people, reach and evidence questions with other agents.

**Check:** The current Module 2 is a separate custom mail-agent exercise. This
helpdesk test does not prove its runtime, sender or delivery, and does not mean you
created an agent. The instructor must preflight that exercise separately.

**Next:** [Module 2 walkthrough](module-02-business-agent.md), when released by the instructor.

## Finished

Do not delete shared resources or alter grants/policy. The instructor handles
approved retention, risk reset and run-scoped cleanup.
