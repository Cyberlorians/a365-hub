# Module 1 Reworked Slide Source

Aligned November 13, 2026, with the customer-facing outline. This is the plain-text
teaching reference for the HTML deck, not proof of tenant readiness.
Five onboarding slides take 12 proposed minutes; the twelve-slide core takes 25.

## Slide 1 - Get your lab account

**Planned time:** 2 minutes (onboarding).

Learn, then practice. When a LAB button appears, follow its numbered steps and return
to the next teaching slide. Use only your approved lab account, never production.
The first lab starts on slide 2.

## Slide 2 - Use the approved access process

**Planned time:** 3 minutes (onboarding).

After the facilitator releases the event link, supply only the approved name/email
and optional company, accept the lab terms and submit once. Lab 1 requests access.
Use privately distributed credentials if the event uses scripted accounts instead.
Never enter passwords, secrets, customer information or production data in the form.

## Slide 3 - Check the lab-access email

**Planned time:** 4 minutes (onboarding).

Find your username, Temporary Access Pass and sign-in instructions. The current form
template describes an eight-hour pass; the instructor must verify the actual event
configuration. Check Junk, wait up to five minutes, then ask for help instead of
submitting again. Keep credentials private.

## Slide 4 - Sign in using the approved method

**Planned time:** 1 minute (onboarding).

Open [Microsoft 365 admin center](https://admin.microsoft.com/) in a private window. Use your lab username and TAP, and answer No to
Stay signed in. Lab 2 is a one-screen, one-minute check of the signed-in lab account,
not another full sign-in walkthrough. If prompts require a different method
or a security change, stop and ask the instructor; do not bypass policy.

## Slide 5 - Confirm readiness without extra privileges

**Planned time:** 2 minutes (onboarding).

Project Beacon is a fictional internal rollout. A project coordinator needs a weekly
status email; Project Beacon Mail Agent is intended to draft it from an approved
brief for human review. Module 1 reviews the registration; it does not send mail.
Keep the admin center open with standing read-only AI Reader access. Lab 3 uses
Agents > All agents > Registry. If blocked, follow the presenter view without write
privileges.

## Slide 6 - See It. Control It. Protect It.

**Planned time:** 1 minute (core).

An agent reads, decides and acts with real access.

- **See it:** Know its purpose, owner and context.
- **Control it:** Approve access, data and tool boundaries.
- **Protect it:** Check what happened and act on evidence.

Takeaway: a readiness worksheet with four answers, one gap and one owned next action,
not proof that every agent or control is visible.

## Slide 7 - One business case. Four questions.

**Planned time:** 3 minutes (core).

You are Project Beacon's coordinator. The approved fictional brief contains three
facts from Module 2: three of four documentation tasks are complete, the architecture
diagram needs review, and the next action is to confirm the review owner.
The agent drafts an internal update from those facts. You review the wording and
one instructor-approved internal recipient, explicitly request the reviewed send,
then verify actual receipt in Module 2. No customer data or inbox-reading task is
needed. These are intended boundaries, not claims of enforced permissions.

Before expanding its use, ask:

1. What exists: which agent and purpose?
2. Who owns it: who is responsible, and who acts?
3. What can it reach: which permissions, tools and data?
4. What is watching it: which evidence shows what happened?

Lab 3 reviews a prepared record and provides the copyable worksheet for any blank
note; no separate spreadsheet or handout is needed. Module 2 runs the task only
after runtime preflight.

## Slide 8 - Four scenarios. The same four questions.

**Planned time:** 1 minute (core).

| Scenario lens | Orientation |
|---|---|
| Agent 365 customers | A shared management view for supported agents |
| Microsoft first-party runtimes | Platforms such as Copilot Studio or Foundry |
| Agents anywhere calling Microsoft APIs | Externally hosted agents requesting Microsoft resource access |
| Cross-cloud workflows / federation | Approved trust used to request access across platforms |

These scenarios overlap. Hosting, identity, registry visibility and resource
permission are different questions. Federation alone does not grant resource access.
Ask the same four questions in every case; Module 3 traces actual authority.
This original text overview does not reproduce the supplied reference picture.

## Slide 9 - Two attack surfaces. Two evidence planes.

**Planned time:** 3 minutes (core).

- **Identity/management misuse:** Compromised credentials or management access can
  enable activity beyond the approved business boundary. Inspect identity and audit
  evidence, grants and supported risk information.
- **Content manipulation:** Untrusted instructions in permitted content can steer
  a correctly signed-in agent. Inspect actual runtime, tool and data actions.

The point: a valid sign-in does not prove a safe email. An unexpected Beacon email
could result from misused identity/access or misleading content, and is a reason to
investigate, not proof of either cause.

For identity changes, use Entra > Entra ID > Monitoring & health > Sign-in logs or
Audit logs. For the actual action, ask the instructor to check the deployed agent's
Container App > Monitoring > Log stream and sent-message evidence. Logs may not
contain a complete transcript. Slide 14 maps the other sources; these are instructor
or later-module checks, not extra learner access requirements. No live attack occurs.

## Slide 10 - Agent 365: observe, govern, secure

**Planned time:** 1 minute (core).

Apply observe, govern and secure to the same Beacon case: find the Mail Agent and
owner; verify approval for the task and access; compare actual actions and reported
risks with that boundary. Use the same task throughout, not a separate unexplained incident.
Module 1 starts in Microsoft 365 admin center > Agents > All agents > Registry.
Discovery, registration and runtime visibility are separate checks; a clean inventory
is not proof of safe behavior.

## Slide 11 - Review one agent, not three portals

**Planned time:** 3 minutes (core).

Start Lab 3 by copying its worksheet template into Notepad, OneNote or any blank
note. No separate handout or spreadsheet is needed. Review the prepared
Project Beacon Mail Agent record using tested AI Reader access, an authorized
presenter view, or labeled prior-run evidence.

| Question | Look for |
|---|---|
| What exists? | Actual registry counts and selected record |
| Who owns it? | Owner, Created by and available identity context |
| What can it reach? | Permissions and Data & tools may be blank; write not shown |
| What is watching it? | Security and Activity, and what they actually establish |

Lab 3 fits across this review and the control-map segment; it is not eight extra
minutes. Record source/time and unknowns. Do not click Block or change settings.
Registration does not prove a working runtime.

If the Agents at risk count opens an empty list, write **Count shown; risk details
not returned** and continue. Do not wait or repeatedly refresh. The separate Relay
agent is a staged training-risk example, not the Mail Agent or a live incident.
The instructor can follow up in Entra Identity Protection > Risky agents.

## Slide 12 - Five Entra pillars, one control map

**Planned time:** 5 minutes (core).

| Objective | Capability | Evidence boundary |
|---|---|---|
| Identity and lifecycle | Entra Agent ID | Verify the actual identity and lifecycle owner |
| Creators/managers | Identity Governance | A displayed owner is not a complete technical-rights review |
| Permissions | Entitlement management | Permissions may be blank; grants alone do not prove approval or expiry |
| Access protection | Conditional Access and ID Protection | Verify actual policy scope and result in Entra |
| Supported traffic | Global Secure Access | Coverage requires the actual supported forwarded/inspected route |

Agent 365 gives some context, not proof all these controls are configured or effective.
Map one control to a worksheet gap while completing Lab 3. No policy changes occur.

## Slide 13 - Protect the data. Record the evidence.

**Planned time:** 1.5 minutes (core).

Know the data and effective access; test supported DLP; assign improvement work in
Compliance Manager. Audit records activity but does not block. A compliance score is
not certification. Module 5 tests a scoped control, not universal prompt protection.

## Slide 14 - Ask what each evidence source can prove

**Planned time:** 1 minute (core).

| Question | Evidence location |
|---|---|
| Who signed in or changed access? | [Entra](https://entra.microsoft.com/) > Entra ID > Monitoring & health > Sign-in logs or Audit logs |
| Which tool ran and what happened? | [Azure portal](https://portal.azure.com/) > the deployed agent's Container App > Monitoring > Log stream; collected detail depends on logging |
| Which workload activity was audited? | [Purview](https://purview.microsoft.com/) > Solutions > Audit > Search; supported events, audit access and retention required |
| Was a threat investigated? | [Defender](https://security.microsoft.com/) > Incidents & alerts > Incidents or Alerts |

Reference for instructor/later modules only. AI Reader does not grant all these log
permissions. Module 1 students stay in the registry and record a follow-up source.
Unobserved means unknown, not safe; none of these records guarantees complete coverage.

## Slide 15 - Connect the evidence to a decision

**Planned time:** 1.5 minutes (core).

Observe, attribute, investigate, contain, verify and improve.
Defender and security operations correlate the right actor/resource/evidence; response
must be scoped and verified. Feed gaps back into ownership, access and data controls.
Events, behaviors, alerts and incidents differ. ISOC preview is not a prerequisite;
keep existing Sentinel customers on their supported experience.

## Slide 16 - Three-minute readiness check

**Planned time:** 3 minutes (core).

Complete and discuss the readiness worksheet, not an interactive quiz:

1. Purpose, accountable people and acting identity.
2. Intended task/data/tool/recipient boundary.
3. Why legitimate authentication does not prove safe behavior.
4. Evidence observed, unknowns, one gap and one owned next action.

Use two minutes to write and one to discuss. Unknowns with concrete validation steps
are valid. No control is claimed tested by this discussion.

## Slide 17 - Establish normal before investigating abnormal

**Planned time:** 1 minute (core).

Keep the worksheet for Module 2's approved task and actual baseline evidence.
Registration alone does not establish a working mail route. Later modules deepen
identity, governance, data protection and investigation. Collect feedback before
finalizing the next remote session.
