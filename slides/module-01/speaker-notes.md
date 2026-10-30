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

**1 minute.** Pitch secure AI adoption, not a string of product demos. The workshop is the vehicle. Explain that every module uses the Agent Identities chapter as its security spine: risk, control, evidence, decision. E7 is a later entitlement/value discussion, not the opening proof of security.

**Source:** Cloud-Architekt Agent Identities; Microsoft Learn Agent 365 overview. This presentation is an original teaching synthesis, not copied diagrams.

## Slide 7 - One business case. Four questions.

**2 minutes.** Project Beacon is a fictional training case. The candidate is Stefano's documented Mail MCP task from the signed-in user's mailbox. Do not claim a working deployment or specific identity objects exist yet. Keep using these four questions in every later module. The eventual mailbox, recipient, actual authority, and evidence must be verified.

## Slide 8 - An agent has four parts

**1 minute.** Contrast answering a question with invoking a tool. For this case, sending mail is a write action, not read-only access. Avoid token-flow detail here; Module 3 maps actual authority. Teach the difference between task instructions, effective permissions, and independently enforced controls.

## Slide 9 - Two attack surfaces. Two evidence planes.

**3 minutes.** This is the chapter's core lesson. An indirect prompt injection/XPIA can arrive in content the agent is permitted to read; do not demonstrate a live attack here. The absence of a suspicious sign-in is not proof of safe behavior, and identity evidence is still useful for subsequent actions. Ask: what tells us what the tool actually did?

**Control boundary:** Entra controls authentication/authorization. Runtime/tool controls and data protections address different parts of the risk. Logging alone is not detection or blocking.

## Slide 10 - Agent 365: observe, govern, secure

**1 minute.** Explain Microsoft Agent 365 as the agent-management/control-plane story. Inventory/discovery, enrollment, and actual activity visibility are different checks. Do not infer low risk from zero high-severity counts or absent alerts; scope and processing delays matter.

## Slide 11 - Review one agent, not three portals

**3 minutes.** This is deliberately not a screenshot or real inventory record. After content approval, replace it with an authorized real record or clearly labeled verified prior run. The presenter can use Microsoft 365 admin center's Agents/Registry path after rechecking the tenant. Do not block, deploy, delete, or change policy during Module 1. Empty/unavailable fields remain gaps, not completed checks.

## Slide 12 - Five Entra pillars, one control map

**5 minutes.** Introduce the control structure without five demos. A sponsor is not automatically a technical owner or privileged manager. Explain that agent identity, agent user, delegated user, and blueprint are distinct concepts; map the selected route later. CA has documented exceptions and user/agent targeting differences. GSA integration/discovery/GenAI Insights require supported routes and prerequisites; do not promise they protect the candidate Mail task today.

**Sources:** Agent Identities chapter; Microsoft Learn Agent ID, governance, Conditional Access for agents, ID Protection for agents, and gateway guidance.

## Slide 13 - Protect the data. Record the evidence.

**1.5 minutes.** Use the Mail example to ask which Exchange policy, if any, applies. Do not describe Purview as a universal prompt filter for custom agents. Compliance Manager belongs in the customer story as accountable improvement work, not an incident tool. Specific assessment templates/controls and supported interactions depend on configuration and licensing. No live policy deployment occurs in this introduction.

## Slide 14 - Ask what each evidence source can prove

**1 minute.** Signal coverage differs by platform/integration. Treat prompt/MCP content as sensitive: synthetic data, approved access, retention, and diagnostic settings. Do not assume a process/network log contains an MCP payload. Keep an unobserved action labeled unknown, not safe.

## Slide 15 - Connect the evidence to a decision

**1.5 minutes.** Explain ISOC as the connected operations story, with Blue16 as original-explainer inspiration and Microsoft Learn as product authority. Current preview has eligibility/workspace conditions; do not disconnect Sentinel. Entra and Purview management and Compliance Manager remain their own responsibilities. Runtime protection coverage depends on agent integration. Do not force a DLP incident when current tenant tuning produces behaviors instead.

## Slide 16 - Three-minute readiness check

**3 minutes.** Two minutes to answer, one to discuss. One point for each defensible answer; question 3 is mandatory for the target. An example unexpected action is an unapproved recipient or tool. No new attack scenario runs here. If the class treats sign-in success as end-to-end protection, revisit slide 9 before moving on.

## Slide 17 - Sell the outcome. Validate the fit.

**1 minute.** Use Microsoft Learn comparison/service-description/transition sources for the actual proposal. This workshop supports a readiness assessment and scoped pilot; it is not evidence that every customer must upgrade. Do not quote Blue16 calculator assumptions as customer pricing.

## Slide 18 - Establish normal before investigating abnormal

**1 minute.** Total core: 25 minutes. Explain the new numbering and transition to the approved business-agent baseline. During this review, ask for feedback on the story and activity scope only. Test-user provisioning and fake-data preparation occur after approval, with the per-module data/automation plan.
