# Module 1 Reworked Slide Source

Published content draft, not a validated hands-on lab. HTML and Markdown must remain aligned.

## Slide 1 - Get your lab account - planned

**Planned time:** 2 minutes (onboarding).

Onboarding 1 of 5 / Outside the 25-minute core

### Get your lab account

For the eventual lab, use only the event-specific access process approved by the facilitator.

**Not active in this review draft.** No form, QR code, test account, or provisioning endpoint is connected.

- The facilitator confirms the event's tested access route.

- Learners use only their assigned lab tenant and account.

- Account creation happens after content review and an approved preparation plan.

Review the wording now. Do not enroll or provision accounts yet.

## Slide 2 - Use the approved access process

**Planned time:** 3 minutes (onboarding).

Onboarding 2 of 5 / Planned

### Use the approved access process

- Use the correct event link after the facilitator releases it.

- Supply only the minimum details the event needs.

- Read and accept the lab terms.

- Submit once; ask for help rather than repeat submissions.

Never enter passwords, secrets, customer information, or production data into a workshop form.

## Slide 3 - Check the lab-access email

**Planned time:** 4 minutes (onboarding).

Onboarding 3 of 5 / Planned

### Check the lab-access email

### Expect from the approved flow

- Assigned lab username

- Approved sign-in instructions

- A Temporary Access Pass, if configured

- Event support and expiry guidance

### If access does not arrive

- Check Junk.

- Confirm the submitted address with the facilitator.

- Do not repeatedly submit the form.

TAP lifetime and reuse are deployment settings. Do not assume an eight-hour window or infer expiry from account age.

## Slide 4 - Sign in using the approved method

**Planned time:** 4 minutes (onboarding).

Onboarding 4 of 5 / Planned

### Sign in using the approved method

- Open the approved sign-in link after the event setup is ready.

- Use the lab username, not your personal or production account.

- Follow the configured authentication prompts.

- Ask for help if policy, account, or mailbox access fails.

Do not bypass Conditional Access, device compliance, or MFA requirements. A TAP is a credential; never share it.

## Slide 5 - Confirm readiness without extra privileges

**Planned time:** 2 minutes (onboarding).

Onboarding 5 of 5 / Planned

### Confirm readiness. Keep privileges low.

### Identity

Correct isolated lab account and tenant.

### Access

Only the apps/mailbox required by the approved activity.

### Support

Known owner for access issues and eventual cleanup.

Module 1 is presenter-led. Learners do not need admin portals or tenant-wide roles.

## Slide 6 - See It. Control It. Protect It.

**Planned time:** 1 minutes (core).

Module 1 / 25-minute core / Reworked review draft

### See It.
Control It.
Protect It.

Adopt AI. Govern agents. Protect the business.

### Risk

An agent can misuse legitimate access.

### Control

Connect identity, data, runtime, and operations.

### Decision

Prove the boundary before expanding adoption.

## Slide 7 - One business case. Four questions.

**Planned time:** 2 minutes (core).

Shared case / Fictional Project Beacon

### One business case. Four questions.

An agent helps a colleague prepare and send a short internal project-status email.

### What?

Which agent and purpose?

### Who?

Who is accountable, and who actually acts?

### Which?

Which tools, permissions, and data?

### What happened?

Which evidence and response?

Today: review this story. Later, after approval: provision an isolated test account and verify the actual task.

## Slide 8 - An agent can act, not just answer

**Planned time:** 1 minutes (core).

Agent action model

### An agent can act, not just answer.

### Read

A brief, email, document, or tool response.

### Decide

Interpret the task and choose a next step.

### Use a tool

Send a message or change a connected resource.

Useful access needs an explicit operating boundary.

Identity establishes who may access a resource. It does not prove that the agent's intended action is safe.

## Slide 9 - Two attack surfaces. Two evidence planes.

**Planned time:** 3 minutes (core).

Playbook focus / The dual attack surface gap

### Two attack surfaces. Different evidence.

### Identity-based compromise

Misused credentials, excessive grants, consent, or management rights.

**Look for:** sign-ins, grants, audit changes, and identity risk where supported.

### AI-native manipulation

Untrusted instructions in an email, document, webpage, tool response, or memory.

**Look for:** runtime/tool behavior, resulting actions, and supported data/network evidence.

A correctly authenticated agent can still be manipulated into misusing legitimate access.

Injection need not cause a new IdP event at ingestion. Later token/resource activity may still leave identity evidence.

## Slide 10 - Agent 365: observe, govern, secure

**Planned time:** 1 minutes (core).

Management and accountability

### Observe. Govern. Secure.

### Observe

Discover and review supported agents, context, and activity.

### Govern

Establish accountability, lifecycle, and access decisions.

### Secure

Connect supported identity, data, and threat controls.

The Registry starts a review. A clean inventory is not proof of safe runtime behavior.

## Slide 11 - Review one agent, not three portals

**Planned time:** 3 minutes (core).

One review / Planned fixture, not a Registry export

### Review one agent.

**Fictional teaching card - replace with a verified record after approval**

| Question | Project Beacon baseline | Still to verify |
| --- | --- | --- |
| What? | Proposed status-mail assistant | Actual registration, platform, and identifiers |
| Who? | Named technical owner + sponsor; signed-in user sends | Actual ownership, sponsorship, and actor attribution |
| Which? | Synthetic brief; Mail MCP; approved internal recipient | Effective grants, policy scope, and resource boundaries |
| What happened? | Expected: reviewed status email and attributed evidence | Actual receipt, runtime/tool result, downstream evidence |

Final delivery: one preflighted presenter Registry view or a labeled prior-run screenshot. No learners receive admin roles.

## Slide 12 - Five Entra pillars, one control map

**Planned time:** 5 minutes (core).

Entra foundation / Controls depend on flow and support

### Five pillars. One accountable agent workforce.

| Control objective | Entra capability | Question to ask |
| --- | --- | --- |
| Manage identities and lifecycle | Entra Agent ID | What is the real identity, and who manages its lifecycle? |
| Govern creators and managers | ID Governance + management controls | Who can create, own, sponsor, and technically control it? |
| Govern permissions | Supported entitlement management | Why this access, for how long, approved by whom? |
| Protect resource access | Conditional Access + ID Protection | Which user/agent flow, resource, and risk controls apply? |
| Protect supported traffic | Global Secure Access / Secure Web & AI Gateway | Is this actual route forwarded, inspected, and covered? |

Not every token exchange is evaluated identically. Copilot Studio gateway documentation does not prove coverage of the proposed ACA-hosted Mail path.

## Slide 13 - Protect the data. Record the evidence.

**Planned time:** 1.5 minutes (core).

Purview / Data security and compliance follow-through

### Protect the data. Record the evidence.

### Know and classify

Identify sensitive information, effective access, and supported labels.

### Limit unsafe sharing

Test DLP on the actual supported workload and policy scope.

### Own the improvement

Compliance Manager: owner, action, implementation/test status, evidence.

Audit is not a block. Generated Agent 365 content does not automatically inherit source sensitivity labels.

Module 5 tests a scoped control. A Compliance Manager score is not certification.

## Slide 14 - Ask what each evidence source can prove

**Planned time:** 1 minutes (core).

Coverage, not assumptions

### Ask what each evidence source can prove.

### Identity and access

Who authenticated? Which rights or grants changed?

### Runtime and tools

What instruction was processed, which tool ran, and what result followed?

### Data and workload

What was sent or accessed? Did the actual policy audit, warn, or block?

### Applicable network

What crossed a supported inspected route? What is outside its visibility?

Remote MCP network logging does not see local MCP server traffic. Captured content does not itself prove injection detection.

## Slide 15 - Connect the evidence to a decision

**Planned time:** 1.5 minutes (core).

Defender XDR / Integrated security operations

### Connect the evidence to a decision.

Observe -> attribute -> investigate -> contain -> verify -> improve.

### Defender / ISOC

Correlate the right agent, user, resource, and evidence.

### Scoped response

Act on the affected target; check that the response worked.

### Governance feedback

Correct access, data boundaries, ownership, or telemetry gaps.

An event, behavior, alert, and incident are different things. Existing Sentinel customers keep their supported experience; ISOC preview is not a workshop prerequisite.

## Slide 16 - Three-minute readiness check

**Planned time:** 3 minutes (core).

Learner check / Four points

### Can you explain the boundary?

- Name the proposed agent's purpose and accountable roles.

- State the allowed task, data, tool, and recipient boundary.

- Explain why a valid sign-in does not prove safe behavior.

- Choose evidence and a next decision for an unexpected action.

**Facilitator answer key**

1: Status-mail purpose; technical owner/sponsor, with a separate acting user. 2: Synthetic brief, Mail MCP, reviewed status email to an approved internal recipient. 3: AI-native instructions can manipulate legitimate access without a new sign-in at ingestion. 4: Inspect attributed tool/action and workload evidence, correlate identity, and investigate/restrict the specific target as justified.

**Target:** at least 3/4, including question 3. Unverified controls remain open findings.

## Slide 17 - Sell the outcome. Validate the fit.

**Planned time:** 1 minutes (core).

E7 / A connected value conversation

### Sell the outcome. Validate the fit.

Connect useful AI adoption with accountable agents, governed access, protected data, and operational response.

### Assess the gap first

Existing subscriptions, needed capabilities, deployment readiness, and operating ownership.

### Then discuss the offer

E7 brings E5, Microsoft 365 Copilot, Entra Suite, and Agent 365 together. Compare eligible alternatives and additional costs.

Do not sell ordinary XDR, basic DLP, or ISOC as exclusively E7. Revalidate exact entitlement, availability, Azure usage, and ingestion/retention costs.

## Slide 18 - Establish normal before investigating abnormal

**Planned time:** 1 minutes (core).

Module 1 complete / Handoff

### Establish normal before investigating abnormal.

Risk -> control -> evidence -> decision.

Next: define a useful approved task, identify who actually acts, and record the evidence we expect to see.

Then map authority, govern access, protect data, investigate misuse, and plan adoption.

Module 2 is a rough draft. Original identity-anatomy content becomes Module 3; it has not been discarded.
