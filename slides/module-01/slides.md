# Module 1: See It. Control It. Protect It.

Teaching reference for the seventeen-slide HTML deck. Introductory concepts and
read-only review stay inside this workshop; no external course, build, chat or
knowledge test is a prerequisite. Instructor budget: 12-minute onboarding plus
25-minute core, subject to rehearsal. Student labs have no duration labels.

## Slide 1 - Get your lab account

Request the approved event account. Follow each numbered lab when released, then
return to the teaching slides. Never use production credentials.

## Slide 2 - Use the approved access process

Open the released event form, provide only the requested details, accept the terms
and submit once. Lab 1 requests access, not agent creation.

## Slide 3 - Check the lab-access email

Find the username, Temporary Access Pass and sign-in link. Read the actual lifetime;
keep credentials private. Check Junk and ask for help rather than resubmitting.

## Slide 4 - Sign in using the approved method

Open [Microsoft 365 admin center](https://admin.microsoft.com/) in a private window
with the lab account. Lab 2 only confirms that account. Do not bypass security prompts.

## Slide 5 - Confirm readiness without extra privileges

Use the approved account and standing read-only AI Reader for registry review.
No maker access, deployment, chat channel or knowledge test is required.
If access fails, use the authorized instructor live view and report the access gap.

## Slide 6 - See It. Control It. Protect It.

See purpose and accountable people. Control data and actions. Protect useful work
with evidence and response. Start with a useful employee task, not portal complexity.

## Slide 7 - What does an agent do?

An employee asks for laptop help and a support ticket. A tool-enabled agent can
use an approved guide to provide instructions and call a configured service-desk
tool to create the ticket. **Knowledge supplies information. Tools perform actions.**
Permissions govern access; instructions alone do not grant it.
The learning goal is to distinguish answering from acting. This is an original
teaching illustration, not a deployed helpdesk or a claim about Relay.

## Slide 8 - Why does agent access matter?

Continue the same task. Reading the approved guide and creating a service-desk
ticket are needed; payroll/HR records and employee-account changes are not.
**Least privilege** means access limited to what the approved task requires.
Governance establishes the accountable owner and approved boundaries; Security
examines unsafe use. A successful sign-in does not prove safe behavior.
The learning goal is to explain why the job needs an owner and a data/action
boundary. No permission changes, new scenarios or source-course artwork.

## Slide 9 - How do we know what an agent did?

The reply "I opened a ticket" is a claim, not proof. Check the actual ticket and
its queue/problem (**Evaluation**), recorded information/tool calls and results
(**Tracing**), then failure rates, response time and usage across requests
(**Monitoring**). These checks support operational management.
A registry is a list of agents, not proof of task success. Ask the same owner
to arrange the result and action records. The learning goal is to
distinguish inventory, recorded activity and a verified result.
[Foundry observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability)
grounds the concepts; actual collection and integrations must be verified.
No Foundry setup or ticket-system test is required in Module 1.

## Slide 10 - One job. Four Microsoft services.

Agent 365 helps review supported inventory and accountability; Entra addresses
identity and access; Purview addresses supported data/compliance controls; Defender
supports threat investigation and response. Each has its own coverage, roles and
configuration. No single portal proves all four pillars.

## Slide 11 - Review one prepared agent

Launch Lab 3 after this slide, then return to slide 12. Review the existing
**Project Beacon Relay Agent**, not a newly deployed helpdesk sample.
The six steps are find, owner, reach, staged risk, evidence and oral explanation.
Use admin.microsoft.com > Agents > All agents > Registry > Total agents, search
**Project Beacon Relay**, press **Enter**, then open **Project Beacon Relay Agent**.
No copying, worksheet, written submission or student changes.

## Slide 12 - Who owns it and what can it reach?

Agent 365 discovers and lists agents; Microsoft Entra manages their identity and
access. Five Entra control areas connect each registry field to its control:
identity (**Entra Agent ID**; Details: Entra agent ID), accountability
(**Identity Governance**; Details: Owner and Created by), permissions
(**Entitlement management**; Permissions tab), sign-in rules (**Conditional Access /
ID Protection**; Security tab risk) and network (**Global Secure Access**; not shown
in the registry). A registry field is a clue, not proof a control is configured or
effective, and a blank field means follow up, not guess. Distinguish ownership,
creation and approval; missing reporting is a gap, not proof nobody is accountable.
This is a teaching map, not five setup tasks or a promise of universal coverage.

## Slide 13 - What data can it touch?

Using the support agent from slides 7-9, Microsoft Purview can extend sensitivity
labels, data loss prevention (DLP) and audit, the protections used for people, to
supported agent activity. Labels mark confidential information, DLP can warn or
block unsafe sharing, and audit records what happened without blocking anything.
In Agent 365, the **Security** tab lists the Purview protections reported for the
agent; a listed protection is not proof it was tested. Blank or unavailable fields
mean unknown, not no access. No grants, blocking or policy changes.

## Slide 14 - What if the agent gets it wrong?

The support agent from slides 7-9 opens a laptop ticket that lands in the wrong
queue with details the employee never gave. Follow **Spot it > Find who >
Investigate > Contain > Check it worked > Fix the gap**. Two causes are possible:
its access was misused, or untrusted content (such as hidden text in a document)
misled it. The agent signs in either way, so a valid sign-in alone cannot tell
them apart, so compare sign-in and audit evidence with the input, tool call and
result. Defender and the security operations center help connect supported signals;
no automatic correlation or ISOC preview is required. An event, alert and incident
are different things. Containment belongs to the authorized response team.
Expand the evidence-location reference on this slide as needed. Registry
**Activity** is inventory usage, not a full execution trace, security investigation
or workload audit trail; no Foundry or Copilot Studio test is required.

## Slide 15 - Is the agent worth it?

For the support agent, ask whether it solved the problem (tickets created correctly
the first time), saved effort (time per request before and after) and justified its
cost (licenses, usage and effort to run and review it). Registry **Activity** shows
usage, not value. Set a baseline and an accountable measure; do not infer business
value from registration or staged risk.

## Slide 16 - What can you now say about an agent?

Recap the four questions: management (is it working?), governance (who owns it and
what can it reach?), security (what if it goes wrong?) and business value (is it
worth it?). Then orally name one observed fact from the Relay record and one thing
it could not tell you.
On the same Relay record, **Security > Risk details** must show **High** and
**The agent is compromised.** This is staged training, not a live attack.
Do not use the faulty Agents at risk count filter. If missing, use the instructor
live view or report unresolved access/setup; do not call the check complete.

## Slide 17 - Establish normal before investigating abnormal

Carry the method into Module 2, where using/testing and any optional maker build
belong. The current mail runtime/content remains unchanged and needs its own
preflight. No replacement sample or optional maker path is claimed deployed.

## Sources and scope

See [sources](sources.md) and the [reference-only provenance note](../../grounding/reference-images.md#images-4-7---ai-observability-overview-four-pillars).
Supplied screenshots are not reproduced or redistributed. The old Agent ID
scenarios image also remains rights-unconfirmed. Admin observations do not prove
fresh learner access.
