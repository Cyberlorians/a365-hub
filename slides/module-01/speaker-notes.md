# Module 1 Speaker Notes

Proposed 25-minute core plus separate 12-minute onboarding. No independent rehearsal or runtime validation is claimed.

## Slide 1 - Get your lab account

**Planned time: 2 minutes; onboarding only.** The form-to-account flow worked end to end in a test run: about two to three minutes from Submit to the access email. Confirm the form, the provisioner and the sender mailbox are healthy before each event, and do not enable account-age deletion as a shortcut.

## Slide 2 - Use the approved access process

**Planned time: 3 minutes.** The form is live; Lab 1 walks through it. Finalize privacy/terms, approved collection, retention, and support arrangements before a real event. Submission success is not proof of account creation: verify the email arrives, and check Junk.

## Slide 3 - Check the lab-access email

**Planned time: 4 minutes.** The existing flow uses the subject "Your A365 Workshop lab access"; confirm the event's real template. Only state TAP lifetime/reusability after configuration and sign-in testing. Local notes say automated cleanup is disabled. Credentials and attendee information must never be projected or included in public materials.

## Slide 4 - Sign in using the approved method

**Planned time: 1 minute.** Sign in once using the lab account. Lab 2 is a single-screen
check, not a repeated walkthrough. Confirm the username and continue; move access
failures to a helper and presenter fallback. Never weaken CA/MFA/device rules.

## Slide 5 - Confirm readiness without extra privileges

**Planned time: 2 minutes.** Introduce Project Beacon as the fictional rollout, and
Project Beacon Mail Agent as the agent named after it. Learners are coordinators
reviewing a registration, not sending email today. Keep the admin center open with
standing read-only AI Reader. Module 2 tests the task after runtime preflight.
Total onboarding is 12 proposed minutes, including the one-minute sign-in check.

## Slide 6 - See It. Control It. Protect It.

**1 minute.** An agent can invoke tools, so useful access needs an explicit boundary.
Introduce see/control/protect and the readiness worksheet: four answers, one gap,
one owned next action. Do not promise universal inventory or protection.
Keep object models/token flows for Module 3.

**Source:** Cloud-Architekt Agent Identities; Microsoft Learn Agent 365 overview. This presentation is an original teaching synthesis, not copied diagrams.

## Slide 7 - One business case. Four questions.

**3 minutes.** Use Module 2's fictional documentation rollout: three of four tasks
complete, architecture diagram review remains, confirm the review owner next.
The coordinator asks for a draft, reviews it and the one approved
internal recipient, explicitly requests send, then verifies receipt in Module 2.
Today we only review the registration. Intended boundaries are not implemented
enforcement. The worksheet is a copyable blank note in Lab 3, not a missing handout.

## Slide 8 - Four scenarios. The same four questions.

**1 minute.** Orient to Agent 365 customers, Microsoft first-party runtimes, agents
anywhere calling Microsoft APIs, and cross-cloud workflows/federation. These lenses
overlap. Hosting, identity, registry visibility and resource permission differ;
federation alone does not grant resource access. Use original text, not the supplied
picture pending provenance/reuse confirmation. No four-deployment requirement.
Module 3 traces authority, objects and blast radius.

## Slide 9 - Two attack surfaces. Two evidence planes.

**3 minutes.** Explain one point: a valid sign-in does not prove a safe email.
Contrast identity/access misuse with misleading content using the same Beacon
task. An unexpected recipient is a finding, not a diagnosis. Show where the Entra
sign-in/directory audit logs and Container App Log stream are, without requiring
extra learner portal access. No live attack is executed; mechanics belong in Module 6.

**Control boundary:** Entra controls authentication/authorization. Runtime/tool controls and data protections address different parts of the risk. Logging alone is not detection or blocking.

## Slide 10 - Agent 365: observe, govern, secure

**1 minute.** Apply observe/govern/secure to the same Beacon case: find the record,
verify task/access approval, then compare actual activity and reported risks.
Use only this case, not an unexplained incident. Inventory, registration and runtime
visibility are different checks. No universal discovery or automatic enforcement claim.

## Slide 11 - Review one agent, not three portals

**3 minutes.** Start Lab 3 by pasting the worksheet from its first step into a blank
note. Use tested AI Reader or labeled presenter evidence. Complete the lab across
this review and slide 12's five minutes, not as extra time. An Agents at risk count
with an empty result list is recorded as **Count shown; risk details not returned**;
do not make learners wait. Permissions/Data & tools can be blank. Relay is a
separate staged training-risk record, not proof of a live incident. No write actions.

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

**1 minute.** Point to the named locations on the slide: Entra directory sign-in/audit
logs, the deployed Container App's Log stream, Purview Solutions > Audit > Search,
and Defender Incidents & alerts. These need separate access and appropriate
collection. AI Reader does not grant all log access. This is a reference for the
instructor and later modules; students stay in the registry.

## Slide 15 - Connect the evidence to a decision

**1.5 minutes.** Explain ISOC as the connected operations story, with Blue16 as original-explainer inspiration and Microsoft Learn as product authority. Current preview has eligibility/workspace conditions; do not disconnect Sentinel. Entra and Purview management and Compliance Manager remain their own responsibilities. Runtime protection coverage depends on agent integration. Do not force a DLP incident when current tenant tuning produces behaviors instead.

## Slide 16 - Three-minute readiness check

**3 minutes.** Two minutes to complete the worksheet, one to discuss. Purpose/people,
intended boundary, why sign-in is insufficient, and evidence/gap/owned next action
are the four prompts. Use the discussion answer key; no interactive quiz. Accept
unknowns with a concrete next check. If sign-in is treated as end-to-end protection,
revisit slide 9. Do not claim a control was tested.

## Slide 17 - Establish normal before investigating abnormal

**1 minute.** Total core: 25 minutes; sign-in is separate. Retain the worksheet.
Module 2 must pass its own runtime, sender, task and receipt preflight; a matching
registration name is insufficient. Collect feedback before finalizing the next
remote session. Independent timing and live preparation remain release gates.
