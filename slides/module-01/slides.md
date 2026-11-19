# Module 1 Reworked Slide Source

Aligned November 13, 2026, with the customer-facing outline. This is the plain-text
teaching reference for the HTML deck, not proof of tenant readiness.
Five onboarding slides take 15 proposed minutes; the thirteen-slide core takes 25.

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

**Planned time:** 4 minutes (onboarding).

Open Outlook in a private window. Use your lab username and TAP, and answer No to
Stay signed in. Lab 2 walks through sign-in. If prompts require a different method
or a security change, stop and ask the instructor; do not bypass policy.

## Slide 5 - Confirm readiness without extra privileges

**Planned time:** 2 minutes (onboarding).

Confirm your lab inbox is open in Outlook and keep your TAP private. Return to the
Module 1 slides and open each numbered lab when directed. In Lab 3, open Microsoft
365 admin center > Agents > All agents > Registry and find Project Beacon Mail
Agent. Your lab account uses standing read-only AI Reader access, not management
rights. If blocked, ask the instructor and follow the presenter view. Module 1
does not require building an agent or running Advanced Hunting.

## Slide 6 - See It. Control It. Protect It.

**Planned time:** 1 minute (core).

An agent reads, decides and acts with real access.

- **See it:** Know its purpose, owner and context.
- **Control it:** Approve access, data and tool boundaries.
- **Protect it:** Check what happened and act on evidence.

Takeaway: a readiness worksheet with four answers, one gap and one owned next action,
not proof that every agent or control is visible.

## Slide 7 - One business case. Four questions.

**Planned time:** 2 minutes (core).

Project Beacon helps draft and send a short internal project-status email.
Before expanding its use, ask:

1. What exists: which agent and purpose?
2. Who owns it: who is responsible, and who acts?
3. What can it reach: which permissions, tools and data?
4. What is watching it: which evidence shows what happened?

The intended task uses a synthetic brief, reviewed email and approved internal
recipient. Intended limits are not demonstrated enforcement. Lab 3 reviews a prepared
record; Module 2 runs the task only after runtime preflight.

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

An unexpected recipient is a reason to investigate, not proof of one attack path.
Injection need not cause a new sign-in at ingestion; later authentication/resource
activity may still leave identity evidence. Logging is not detection or blocking.
No live attack occurs here; detailed mechanics belong in Modules 3 and 6.

## Slide 10 - Agent 365: observe, govern, secure

**Planned time:** 1 minute (core).

Use Agent 365 to review supported inventory, accountability and security context.
Discovery, registration and actual activity visibility are separate checks.
A clean inventory is not proof of safe behavior.

## Slide 11 - Review one agent, not three portals

**Planned time:** 3 minutes (core).

Review the prepared Project Beacon Mail Agent record using tested AI Reader access,
an authorized presenter view, or labeled prior-run evidence.

| Question | Look for |
|---|---|
| What exists? | Actual registry counts and selected record |
| Who owns it? | Owner, Created by and available identity context |
| What can it reach? | Permissions and Data & tools, including missing metadata |
| What is watching it? | Security and Activity, and what they actually establish |

Lab 3 fits across this review and the control-map segment; it is not eight extra
minutes. Record source/time and unknowns. Do not click Block or change settings.
Registration does not prove a working runtime.

Risk staging is optional. On November 5, Entra showed the separate Relay Agent as
High/confirmedCompromised, while registry risk stayed a dash/0 after more than three
hours. A zero/missing registry count does not prove safety or promise eventual sync.

## Slide 12 - Five Entra pillars, one control map

**Planned time:** 5 minutes (core).

| Objective | Capability | Evidence boundary |
|---|---|---|
| Identity and lifecycle | Entra Agent ID | Verify the actual identity and lifecycle owner |
| Creators/managers | Identity Governance | A displayed owner is not a complete technical-rights review |
| Permissions | Entitlement management | Grants alone do not prove approval or expiry |
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

- Identity/access: who signed in and which grants changed?
- Runtime/tools: which instruction, tool and result?
- Data/workload: what was sent/accessed and which policy result?
- Supported network: what crossed the inspected route, and what is unseen?

Unobserved means unknown, not safe. Captured content is not itself injection detection.

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

## Slide 17 - Sell the outcome. Validate the fit.

**Planned time:** 1 minute (core).

Find the customer gap before discussing E7. Compare existing subscriptions,
entitlements, alternatives and Azure/ingestion costs. Ordinary XDR, basic DLP and
ISOC are not E7-exclusive.

## Slide 18 - Establish normal before investigating abnormal

**Planned time:** 1 minute (core).

Keep the worksheet for Module 2's approved task and actual baseline evidence.
Registration alone does not establish a working mail route. Later modules deepen
identity, governance, data protection and investigation. Collect feedback before
finalizing the next remote session.
