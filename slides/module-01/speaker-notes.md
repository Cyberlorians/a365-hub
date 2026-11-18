# Module 1 Speaker Notes

Content draft. Proposed 25-minute core plus separate 15-minute onboarding. No independent rehearsal or runtime validation is claimed.

## Slide 1 - Get your lab account

**Planned time: 2 minutes; onboarding only.** The form-to-account flow worked end to end in a test run: about two to three minutes from Submit to the access email. Confirm the form, the provisioner and the sender mailbox are healthy before each event, and do not enable account-age deletion as a shortcut.

## Slide 2 - Use the approved access process

**Planned time: 3 minutes.** The form is live; Lab 1 walks through it. Finalize privacy/terms, approved collection, retention, and support arrangements before a real event. Submission success is not proof of account creation: verify the email arrives, and check Junk.

## Slide 3 - Check the lab-access email

**Planned time: 4 minutes.** The existing flow uses the subject "Your A365 Workshop lab access"; confirm the event's real template. Only state TAP lifetime/reusability after configuration and sign-in testing. Local notes say automated cleanup is disabled. Credentials and attendee information must never be projected or included in public materials.

## Slide 4 - Sign in using the approved method

**Planned time: 4 minutes.** Do not promise that Authenticator, device registration, or MFA prompts can never occur. Test the actual tenant's CA/TAP behavior, mailbox readiness, and required access. Support learners through approved policy-owner procedures; never grant broad admin roles as a shortcut.

## Slide 5 - Confirm readiness without extra privileges

**Planned time: 2 minutes.** Total proposed onboarding: 15 minutes, separate from the core. During draft review, skip these access actions entirely. At delivery, move unresolved issues to a helper. Viewing Microsoft 365 home alone is not proof that the later business-agent UI, Mail MCP, or observability works.

## Slide 6 - See It. Control It. Protect It.

**1 minute.** An agent can invoke tools, so useful access needs an explicit boundary.
Introduce see/control/protect and the readiness worksheet: four answers, one gap,
one owned next action. Do not promise universal inventory or protection.
Keep object models/token flows for Module 3; E7 follows the customer gap.

**Source:** Cloud-Architekt Agent Identities; Microsoft Learn Agent 365 overview. This presentation is an original teaching synthesis, not copied diagrams.

## Slide 7 - One business case. Four questions.

**2 minutes.** Project Beacon's synthetic status-mail case gives a useful task before
misuse. Ask purpose, people/actor, permitted reach, and evidence. The intended boundary
is a reviewed message to an approved internal recipient; intended limits are not
implemented enforcement. Registration and actual runtime proof differ.

## Slide 8 - Four scenarios. The same four questions.

**1 minute.** Orient to Agent 365 customers, Microsoft first-party runtimes, agents
anywhere calling Microsoft APIs, and cross-cloud workflows/federation. These lenses
overlap. Hosting, identity, registry visibility and resource permission differ;
federation alone does not grant resource access. Use original text, not the supplied
picture pending provenance/reuse confirmation. No four-deployment requirement.
Module 3 traces authority, objects and blast radius.

## Slide 9 - Two attack surfaces. Two evidence planes.

**3 minutes.** Contrast identity/management misuse with content-driven manipulation.
An unexpected recipient is a reason to investigate, not proof of one attack path.
Injection need not cause a new sign-in at ingestion; later authentication/resource
activity may still leave identity evidence. Ask what shows the actual tool action.
No live attack or new attack fixture is needed; detailed mechanics belong in Module 6.

**Control boundary:** Entra controls authentication/authorization. Runtime/tool controls and data protections address different parts of the risk. Logging alone is not detection or blocking.

## Slide 10 - Agent 365: observe, govern, secure

**1 minute.** Explain Microsoft Agent 365 as the agent-management/control-plane story. Inventory/discovery, enrollment, and actual activity visibility are different checks. Do not infer low risk from zero high-severity counts or absent alerts; scope and processing delays matter.

## Slide 11 - Review one agent, not three portals

**3 minutes.** Start Lab 3 using tested AI Reader access, an authorized presenter
view, or labeled prior-run evidence with source/time. Review the prepared Mail Agent
record, not an imaginary card. Registration is not runtime proof. Complete Lab 3
across this review and slide 12's five minutes, not as eight extra minutes.
Risk staging is optional: on November 5, Entra showed the separate Relay Agent as
High/confirmedCompromised, while registry risk stayed a dash/0 after more than three
hours. Do not promise sync or Risk details. Missing fields are unknowns. No Block,
deployment, grant, deletion or policy action is allowed.

## Slide 12 - Five Entra pillars, one control map

**5 minutes.** Finish the registry review while matching a worksheet gap to a control
objective. Registry context does not establish approval/expiry, effective technical
rights, policy targeting or actual enforcement. Verify those in the relevant source.
A sponsor is not automatically a technical owner or privileged manager. CA depends
on flow/target and GSA on supported routes. No five demos or policy changes.

**Sources:** Agent Identities chapter; Microsoft Learn Agent ID, governance, Conditional Access for agents, ID Protection for agents, and gateway guidance.

## Slide 13 - Protect the data. Record the evidence.

**1.5 minutes.** Use the Mail example to ask which Exchange policy, if any, applies. Do not describe Purview as a universal prompt filter for custom agents. Compliance Manager belongs in the customer story as accountable improvement work, not an incident tool. Specific assessment templates/controls and supported interactions depend on configuration and licensing. No live policy deployment occurs in this introduction.

## Slide 14 - Ask what each evidence source can prove

**1 minute.** Signal coverage differs by platform/integration. Treat prompt/MCP content as sensitive: synthetic data, approved access, retention, and diagnostic settings. Do not assume a process/network log contains an MCP payload. Keep an unobserved action labeled unknown, not safe.

## Slide 15 - Connect the evidence to a decision

**1.5 minutes.** Explain ISOC as the connected operations story, with Blue16 as original-explainer inspiration and Microsoft Learn as product authority. Current preview has eligibility/workspace conditions; do not disconnect Sentinel. Entra and Purview management and Compliance Manager remain their own responsibilities. Runtime protection coverage depends on agent integration. Do not force a DLP incident when current tenant tuning produces behaviors instead.

## Slide 16 - Three-minute readiness check

**3 minutes.** Two minutes to complete the worksheet, one to discuss. Purpose/people,
intended boundary, why sign-in is insufficient, and evidence/gap/owned next action
are the four prompts. Use the discussion answer key; no interactive quiz. Accept
unknowns with a concrete next check. If sign-in is treated as end-to-end protection,
revisit slide 9. Do not claim a control was tested.

## Slide 17 - Sell the outcome. Validate the fit.

**1 minute.** Use Microsoft Learn comparison/service-description/transition sources for the actual proposal. This workshop supports a readiness assessment and scoped pilot; it is not evidence that every customer must upgrade. Do not quote Blue16 calculator assumptions as customer pricing.

## Slide 18 - Establish normal before investigating abnormal

**1 minute.** Total core: 25 minutes; sign-in is separate. Retain the worksheet.
Module 2 must pass its own runtime, sender, task and receipt preflight; a matching
registration name is insufficient. Collect feedback before finalizing the next
remote session. Independent timing and live preparation remain release gates.
