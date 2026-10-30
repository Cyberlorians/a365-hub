# A365 Hub: Secure AI Adoption Master Plan

**Updated:** October 30, 2026.
**Status:** Published Module 1-2 content drafts and full curriculum plan; not a completed or tenant-validated workshop.
**Priority:** Finish Modules 1-2 first; keep the complete customer story planned.

This is the current curriculum and delivery plan, replacing the older six-module
and multiple-build proposals. [Module 1](../slides/module-01/README.md) and
[Module 2](../slides/module-02/README.md) have separate public content drafts:

- [Module 1 slides](https://cyberlorians.github.io/a365-hub/#slide-6)
- [Module 2 slides](https://cyberlorians.github.io/a365-hub/module-02/#slide-1)
- [Module 2 learner guide](../labs/module-02-business-agent.md)

### Step-by-step delivery guides

| Module | Learner walkthrough | Admin walkthrough |
|---|---|---|
| 1 | [Slide-by-slide guide and worksheet](../labs/module-01-security-foundation.md) | [Presenter/admin runbook](07-module-01-admin-runbook.md) |
| 2 | [Task, prompts, evidence and passport](../labs/module-02-business-agent.md) | [Preparation/proof/rehearsal runbook](08-module-02-admin-runbook.md) |

Guide authoring and browser checks do not constitute live tenant or independent
facilitator validation. No test accounts, deployments, model calls, mail, or fake
security telemetry were created to produce these guides.

**Deployment package:** Modules 1-2 now also include
[run-scoped account/TAP scripts](../scripts/New-WorkshopUsers.ps1),
[pinned source/app initialization](../scripts/Initialize-Workshop.ps1),
[non-destructive runtime/UI deployment](../scripts/Deploy-Workshop.ps1), and
[infrastructure templates](../labs/workshop/). The admin guides provide executable
commands; learner guides follow the actual sign-in/draft/send/check path.
Compilation/offline tests are not live tenant proof. No claims of tested mail,
downstream observability, policy enforcement, or independent timing are added.

**Review-first gate:** Publication is for content review, not hands-on readiness.
No test users, tenant fixtures, GBB scenarios, or tenant automation were executed.
The user requested executable deployment; operators still approve their environment,
grants, cost, and run scope before provisioning.
Runtime proof gates the final hands-on release, not creation of an untested draft.
Per-module synthetic-data/automation considerations are recorded in Section 16.
The existing local onboarding edits and extracted GBB material are not modified or published.

## 1. The offer and customer story

### Positioning

**A365 Hub: Adopt AI. Govern Agents. Protect the Business.**

The workshop is the vehicle; secure AI adoption is the offer.

> AI agents can act with legitimate access and still put business data at risk.
> A365 Hub is an attack-informed, hands-on learning journey connecting Microsoft Entra,
> Agent 365, Purview, and integrated security operations. Customers learn to establish
> accountable agent identities, govern access, protect data, investigate misuse, and
> turn their findings into a practical adoption plan.

The central security lesson is:

**A correctly authenticated agent can still be manipulated into misusing legitimate
access. No suspicious sign-in does not mean no malicious agent activity.**

An injected instruction need not cause a new sign-in or Conditional Access evaluation
at that moment. Subsequent authentication/resource activity may still leave identity
evidence. Correlate identity, runtime/tool, data, and applicable network signals.

### Business outcomes, not a product tour

| Customer outcome | What the workshop demonstrates |
|---|---|
| Useful AI work | One approved business-agent task with a clear operating boundary |
| Accountable agents | Actual identities, sponsors/owners, effective authority, and lifecycle decisions |
| Protected information | A supported data-control decision and evidence of what happened |
| Connected defense | Attribution, investigation, scoped response, and verification across the required evidence planes |
| A credible adoption decision | Named owners, identified gaps, measurable success criteria, and a scoped 30-day pilot |

**Engagement motion:** workshop -> readiness assessment -> scoped pilot -> licensing
decision -> broader adoption.

E7 connects E5 capabilities, Microsoft 365 Copilot, Entra Suite, and Agent 365.
Demonstrate the risk/control gap before discussing which entitlements close it.
Compare existing subscriptions and eligible add-on alternatives. Basic DLP, ordinary
XDR, and ISOC are not all uniquely E7 capabilities. Azure usage and additional ingestion,
retention, capacity, and platform costs need separate assessment.

## 2. What the current review actually found

The pre-publication A365 Hub baseline reviewed was `ccf6fcdb0648d20be427aacdc3edd18817b687af`
(July 17, 2026), rechecked October 29. The local checkout is older:
`67d730de10bec9e3b1dd1294cd005b28e146d198` (July 13).

| Reviewed surface | Actual state | Planning decision |
|---|---|---|
| Module 1 package | HTML presentation, slide source, notes, exercise, handout, facilitator guide, preflight, and sources exist | Revise and rehearse; do not rebuild the presentation platform |
| Module 1 size | Eighteen slides: five onboarding prerequisites and thirteen core slides | Retain that structure; budget onboarding separately from 25 instructional minutes |
| Module 1 teaching emphasis | Already includes Registry, Entra, Purview, Defender, and E7; the new playbook/dual-plane story is not yet incorporated | Reframe around the customer case and security gap, with E7 fit near the close |
| Module 1 exercise | Six-minute classification/authority exercise with a 12-point answer key | Replace the introductory exercise with a three-minute check; reuse deeper classification in Module 3 |
| Supporting references | Handout retains the old six-module map; exercise recovery and facilitator poll cite stale slide numbers | Align every learner/facilitator surface, not just the HTML |
| Module 2 | No teaching package existed at the reviewed baseline; a separate eight-slide rough draft and learner guide are now published | Review the draft, then approve preparation and prove the task; original anatomy content moves to Module 3 |
| Publishing | The baseline workflow uploaded only Module 1; the updated workflow stages both standalone presentations | One root-preserving deployment, separate Module 2 subpath, and aligned HTML/Markdown/notes |
| Toolkit candidate | Stefano's documented Mail MCP task sends internal email from the signed-in user's mailbox | Use this bounded task rather than invent a document-retrieval capability |
| Toolkit authentication | The named ACA-OBO sample's web UI documents `MAIL_TOKEN_MODE=direct`; its delegated-user path is not the autonomous token flow | Describe actual authority and route, not a protocol inferred from the repository label |
| Toolkit preparation | Guide includes powerful admin consents, broad grants, and a blueprint client secret | Instructor-only preparation, reviewed isolation/permissions, secure credential handling; no blanket end-to-end secretless claim |
| Onboarding/cleanup | Public roadmap says cleanup works; local user edits say the deployed cleanup is intentionally disabled and account age is not TAP expiry | Preserve local changes and verify actual state before event claims or cleanup automation |
| Readiness evidence | No live tenant, Mail task, policy enforcement, telemetry, or second-facilitator rehearsal was run for this plan | Keep content readiness separate from hands-on delivery readiness |

The local changes to preserve are `docs/03-onboarding-access.md`,
`docs/04-onboarding-flow.md`, and the untracked `GBBLabs-main` extraction.
Do not blindly pull/reset the checkout or publish the raw GBB folder.

## 3. Curriculum rules and source roles

### The playbook is the security spine

The Cloud-Architekt **Agent Identities** chapter (C1) anchors every module.
Each module and its existing worksheet/lab output must connect:

**Risk -> control -> evidence -> response or governance decision.**

A decision may be an approval, restriction, correction, containment, or pilot go/no-go.
Every module does not need a live attack. Successful task execution alone is not proof
that an agent is secure.

Use one consistent customer case throughout the day. Initially there are two explicit
technical targets: the toolkit business agent, and a separate GBB-supported AI-workload
security fixture. Do not join their evidence or describe them as the same agent without
verified identifiers. A later single-target lab is an improvement, not an assumed fact.

### Five Entra control pillars

| Pillar | Workshop control objective | Main placement |
|---|---|---|
| Identity and lifecycle | Identify the real agent, blueprint/principal, accountable people, and lifecycle state | Modules 1-4 |
| Creation/management governance | Review technical management, direct ownership, and sponsorship separately | Modules 4 and 8 |
| Permission governance | Compare requested, granted, and effective access; approve, renew, or expire supported access | Modules 3-4 |
| Access protection | Apply Conditional Access and identity risk to the correct user/agent flow and protected resource | Modules 3, 6-7 |
| Network protection | Verify supported forwarding, policy, and network evidence rather than assume gateway coverage | Module 1 framing; optional Modules 5/7; Module 8 pilot |

These are control objectives, not a promise that all agents receive identical user
protections. They complement runtime protection and Purview data controls.

### Exact role of the material being incorporated

| Source | What we use | What we are not importing into the first release |
|---|---|---|
| Cloud-Architekt Agent Identities chapter | Dual attack surfaces, identity/authority model, ownership/privilege risks, permission blast radius, LOAT, detection and mitigation questions | A privileged compromise, every attack path, or untested queries presented as deployable detections |
| Microsoft Learn | Product definitions, supported controls, roles, schemas, prerequisites, licensing, limitations | A claim that documented features are enabled in our tenant |
| Stefano's `stefanpems/a365-lab-toolkit` | Prepared ACA-OBO candidate, shared UI, documented internal-mail task, selected governance cases, observability guidance | Whole Demo Builder, all agent variants, or learner infrastructure installation |
| Approved local GBB material | Selected SDK explanation, one AI-workload scenario, useful hunting progression/evidence, optional AWS extension | Internal enrollment steps, credential-publication workflows, full SDK/AWS deployments in Module 2 |
| Blue16 Secure AI Explained | Inspiration for an original control explanation | Copied code/artwork or unverified preview claims |
| Blue16 ISOC Explained | Business/technical explanation, integrated protection loop, data paths, eligibility and cost-question patterns | A new explainer application, copied calculator/quiz, or roadmap/pricing treated as current entitlement |
| Existing A365 Hub | Onboarding, Module 1 delivery shell, security research, facilitation and CTF direction | The old module numbering or four-build agenda as additional mandatory content |
| New A365 Hub authoring | Customer instructions, actual-actor passport, supported control tests, evidence records, answers/reset, scoring, adoption assessment | Unsupported demonstrations made to look successful |

Microsoft Learn is the product-behavior authority. The playbook is the threat-model
and defensive-design spine. Its examples still require implementation validation.

## 4. Complete learning journey

| Module | Minutes | Playbook anchor / customer focus | Activity and output | Planned state |
|---|---:|---|---|---|
| 1. See It. Control It. Protect It. | 25 | C1 dual attack surfaces and responsibilities | One customer case, five-pillar control map, one agent review, three-minute readiness check | Reworked content draft published; review and rehearse next |
| 2. Establish the Approved Agent Baseline | 35 | C1 authority and legitimate tool use before misuse | Verified synthetic internal-mail task and actor/tool/data/evidence passport | Eight-slide rough draft published; prove runtime after review |
| 3. Understand Identity, Authority, and Blast Radius | 35 | C1 objects, flows, inheritance, consent | Actual authority diagram and allowed/denied-operation explanation | Plan now; author after baseline |
| 4. Govern Creators, Access, and Lifecycle | 40 | C1 management privilege, ownership, sponsorship | One access/ownership review and supported approval/expiry/lifecycle decision | Plan now; validate selected case later |
| 5. Protect Data and Record Control Evidence | 40 | C1 data/tool impact under valid authority | One supported DLP comparison and owned Compliance Manager improvement action | New exercise to validate |
| 6. Recognize Agent Compromise and Misuse | 40 | C1 identity-based versus AI-native access; LOAT | One approved GBB AI-workload case and one narrated identity/consent case | Prepare controlled evidence later |
| 7. Investigate and Contain in Defender / ISOC | 75 | C1 detection, correlation, mitigation | Attributed evidence, scoped response, retest/reset, residual uncertainty | Validate queries/routing/response later |
| 8. Prove Readiness and Plan Adoption | 40 | C1 mitigation and feedback into prevention | Four scored findings and an owned 30-day remediation/pilot decision | Build from validated preceding evidence |

Instruction: **330 minutes**. Onboarding: 15. Lunch: 45. Two breaks: 30.
Full day: **420 minutes / seven hours**.

The first release is only **25 + 35 = 60 instructional minutes**, plus 15 minutes
of onboarding: **75 minutes total**. Instructor setup is outside learner time.
All timeboxes are proposed and must be measured in rehearsal.

### Explicit migration from the original repository

| Original material | New home |
|---|---|
| Module 1 value story | New Module 1, revised rather than replaced |
| Module 2 anatomy/authentication | New Module 3; do not discard it or quietly keep conflicting numbering |
| Module 3 portal walkthrough | Selected identity/governance/evidence activities across new Modules 2-4 and 7 |
| Module 4 attack paths | New Modules 3-4 for exposure/boundaries and Module 6 for controlled cases |
| Module 5 detect/respond/govern | New Modules 4-5 and 7 |
| Module 6 CTF | New Module 8 |
| Full-day agenda with several agent builds | Optional maker track, not extra builds added to the security day |

## 5. Module definitions

### Module 1: See It. Control It. Protect It. - 25 minutes

**Playbook focus:** C1 dual attack surfaces and the need for identity, runtime/tool,
data, and operational evidence.

- **Risk:** A legitimate agent can be manipulated; an identity-only view misses part
  of the story.
- **Control:** Agent 365 accountability/visibility, the five Entra pillars, supported
  Purview controls, and Defender/ISOC investigation responsibilities.
- **Activity:** Follow the synthetic status-mail customer case, inspect one prepared
  agent record, and complete the short knowledge check.
- **Evidence/output:** Four-question readiness worksheet with an exposure, a relevant
  control/evidence source, and an accountable next action.
- **Decision:** State the approved operating boundary and what must be verified next.
- **Sources:** C1, H2, B1-B2, L1, L7, L10, L12, L15, L17, L19, L21, L23.

Keep protocol mechanics, full DLP setup, risk hunts, and live policy changes out of this
introduction. Detailed completion work is specified in Section 6.

### Module 2: Establish the Approved Agent Baseline - 35 minutes

**Playbook focus:** C1 actual authority and legitimate tool use before evaluating LOAT.

- **Risk:** A useful action can succeed without proving that permissions, oversight,
  tool boundaries, and observability are adequate.
- **Control:** Approved lab identity, isolated mailboxes, reviewed delegated permissions,
  an approved internal recipient, and attributed task evidence.
- **Activity:** Draft a status message from a synthetic brief, review it, explicitly
  request sending, verify receipt, and complete the passport.
- **Evidence/output:** Actual sender/actor, agent/runtime identifiers with their types,
  tool/resource, result, permitted data/recipient boundary, and evidence source/time.
- **Decision:** Define approved behavior and a deviation that would need investigation.
- **Sources:** C1, T1, T3, L1, L12, L18-L19.

Use the documented candidate; do not invent retrieval or autonomous-mail capabilities.
The user's mailbox is not an optional agent-user mailbox. The web UI's delegated-user
route must not be described as a demonstrated OAuth OBO exchange solely because the
sample is named ACA-OBO. Detailed completion work is specified in Section 7.

### Module 3: Understand Identity, Authority, and Blast Radius - 35 minutes

**Playbook focus:** C1 objects, actual authentication/authorization, consent and
inherited-versus-direct authority, and blueprint-wide impact.

- **Risk:** Confusing the actor or reviewing only one grant hides effective authority
  and the impact of a blueprint or management change.
- **Control:** Inspect the real object relationships and permission boundaries. Separate
  delegated-user authority from autonomous agent authority.
- **Activity:** Map the selected runtime's actual identities and one allowed/denied
  operation; reuse selected classification material moved from Module 1.
- **Evidence/output:** An authority diagram with identifier types, grant/resource,
  actor, scope, and blast-radius explanation.
- **Decision:** Justify the permission boundary or a required correction.
- **Sources:** C1, H1, T1, selected G1 explanation, L2, L18-L19.

The playbook's autonomous diagram labels an app-only exchange "OBO"; it explicitly
distinguishes that from delegated OAuth OBO. Teach the difference accurately.
Do not require every runtime to create all four object types.

### Module 4: Govern Creators, Access, and Lifecycle - 40 minutes

**Playbook focus:** C1 management privilege, direct ownership, sponsorship, and
permissions that may persist independently of role activation.

- **Risk:** An agent has unaccountable ownership, inappropriate management rights, or
  access that persists longer than intended.
- **Control:** Review technical rights separately from business sponsorship; use a
  supported access-package approval/expiry and lifecycle example.
- **Activity:** Inspect one prepared rights/access record; approve, reject, renew,
  expire, or correct one condition. Privileged changes are instructor-controlled.
- **Evidence/output:** Rights/ownership review, accountable sponsor/owner, decision,
  expected effect, observed result where demonstrated, and reset.
- **Decision:** Retain justified access and remove or remediate unjustified access.
- **Sources:** C1, C3, selected T2, L3, L16-L17.

Select one validated governance case, not every Demo Builder scenario. An expired
assignment does not prove all resource access ended if other grants remain.

### Module 5: Protect Data and Record Control Evidence - 40 minutes

**Playbook focus:** C1 misuse of legitimate integrations and data-side impact despite
valid authentication.

- **Risk:** Approved agent access still enables inappropriate disclosure or sharing.
- **Control:** A supported workload policy, effective access, appropriate classification,
  and an owned improvement action.
- **Activity:** Compare a permitted task with a controlled restricted test under one
  scoped DLP policy; record one Compliance Manager improvement action.
- **Evidence/output:** Policy intent/reference, expected action, observed result,
  evidence, owner, implementation/test status, and residual gap.
- **Decision:** Accept, correct, or strengthen the data boundary based on evidence.
- **Sources:** C1, selected T1 workload, L4, L12-L15; optional L23-L25 network lens.

Timebox: concepts 7 minutes; DLP comparison 20; Compliance Manager 8; debrief 5.
Prove the actual workload path, such as Exchange for the Mail MCP task. Audit-only is
not blocking. Generated Agent 365 content does not automatically inherit source labels.
Assessment templates depend on licensing; a compliance score is not certification.

A GSA network-policy comparison is optional and separately validated. It complements
DLP; it does not establish gateway coverage for the ACA-hosted candidate.

### Module 6: Recognize Agent Compromise and Misuse - 40 minutes

**Playbook focus:** C1 dual initial-access surfaces and living off the agent's tools
(LOAT), including XPIA as indirect prompt injection.

- **Risk:** A legitimate identity/tool sequence carries out an unintended action.
- **Control:** Flow-appropriate identity protections, supported runtime/tool/data
  controls, and evidence from the appropriate plane.
- **Activity:** Predict and compare evidence for one approved GBB AI-workload case and
  one narrated identity/consent case using sanitized evidence.
- **Evidence/output:** Target ID, time, flow, intended action, control, actual outcome,
  signal source, and uncertainty.
- **Decision:** Escalate, explain benign behavior, or identify a coverage gap.
- **Sources:** C1, C3, G3, L6, L18.

No live credential theft, privileged takeover, or mandatory offensive tooling. A request
running is not proof of detection or alert publication. Preserve explicit target
separation and use a real, labeled evidence pack if live signals are unavailable.

### Module 7: Investigate and Contain in Defender / ISOC - 75 minutes

**Playbook focus:** C1 attribution, table correlations, coverage gaps, scoped mitigation,
and response verification.

- **Risk:** Wrong joins, missing telemetry, or an overbroad response lead to a false
  conclusion or disruption of an unrelated agent/user.
- **Control:** Verify source coverage, query engine/schema/keys, actual target, response
  scope, authorization, and residual access.
- **Activity:** Work one primary case through coverage, triage, timeline,
  evidence/entities, correlation, and scoped containment/retest/reset. Use the GBB
  five-hunt progression as patterns, not five extra labs plus every optional data source.
- **Evidence/output:** Attributed incident/evidence record, timeline, uncertainty,
  response justification, observed retest, and reset.
- **Decision:** Contain the affected target or identify the additional proof required.
- **Sources:** C1-C2, G2-G3, T3, L3, L5-L6, L10-L14; optional L20 and L25.

Suggested flow: coverage 10 minutes; triage/timeline 15; attribution/correlation 15;
data-security evidence 10; response/retest/reset 15; debrief 10.

Use `AgentsInfo`, relevant `CloudAppEvents`, and applicable behavior/alert tables only
after tenant validation. Keep Advanced Hunting and Log Analytics queries distinct.
The chapter's examples use both `TimeGenerated` and `Timestamp`; do not copy them
unchanged across engines. A fourteen-day example baseline cannot be presumed for a
new workshop identity.

Current Microsoft guidance describes built-in DLP tuning that represents signals in
`BehaviorInfo`/`BehaviorEntities` rather than incident alerts. Check actual tenant
tuning and policy configuration. Do not disable tenant-wide tuning to manufacture a demo.

ISOC is the operating-model story, not a hidden prerequisite. Current preview
eligibility includes Defender Suite/E5/E7 customers without an active Sentinel workspace.
Existing Sentinel customers keep their current Defender/Sentinel experience; never
disconnect production Sentinel to qualify for preview.

Optional depth: C2 workbook, GSA `NetworkAccessGenerativeAIInsights`, additional
connectors, or reviewed/tested natural-language playbooks. These need separate
permissions, routing, cost, and safety validation and are not first-release dependencies.

### Module 8: Prove Readiness and Plan Adoption - 40 minutes

**Playbook focus:** C1 mitigations and feedback from observed risk into stronger
pre-breach governance, permissions, data protection, and monitoring.

- **Risk:** Teams leave with product familiarity but no accountable operational change.
- **Control:** Evidence-based scoring, named remediation owners, scoped pilot, and
  measurable controls/telemetry.
- **Activity:** Solve four flags and prioritize the customer pilot.
- **Evidence/output:** Scored findings and a 30-day remediation/adoption assessment.
- **Decision:** Go, conditional go, or hold, with explicit prerequisites and owners.
- **Sources:** C1, validated earlier evidence, H1, B2, L7, L11, L15-L17, L22.

Four flags: identify actor/accountability; explain an authority/control gap; find
appropriate activity/behavior/alert evidence or justify a coverage gap; choose a scoped
response and verification. Use an answer key; no automated scoreboard is required.

The pilot records use case, affected identities/data, owners, success measures,
control/evidence gaps, actual entitlements and costs, and one owned improvement action.
Sentinel's Azure-to-Defender portal transition is separate from ISOC preview enrollment;
Microsoft currently states Azure-portal support ends after March 31, 2027.

## 6. Finish Module 1: revise, align, rehearse

### Keep / change / defer

| Keep | Change now | Defer |
|---|---|---|
| Existing self-contained HTML and controls | Reframe the opening around secure AI adoption and the playbook's dual attack surfaces | New frontend framework or separate explainer application |
| Five onboarding slides plus thirteen core slides | Treat onboarding as a separate 15-minute block; qualify TAP/CA behavior using actual tests | Full workload-authentication deep dive |
| Observe/govern/secure and four review questions | Add the five Entra pillars as one control map; explain identity alone is insufficient | Full GSA/TLS/ISOC onboarding |
| One Registry agent review | Prefer one live portal transition; use labeled, current control screenshots for the rest | Three live portal tours and policy editing |
| Existing notes/handout/source-map structure | Update all numbering, sources, timing, recovery prompts, and transitions | Branding/export perfection as a release blocker |

### Proposed core sequence, retaining slides 6-18

| Slide | Planned role |
|---|---|
| 6 | Secure AI adoption: customer value and learning outcome |
| 7 | The shared status-mail case and four review questions |
| 8 | What the agent can read, decide, and change |
| 9 | Two attack surfaces; correct authentication does not establish safe behavior |
| 10 | Agent 365 observe/govern/secure and the Registry |
| 11 | Review one actual agent: purpose, accountability, access, activity |
| 12 | Five Entra control pillars, with flow/support boundaries |
| 13 | Purview data boundary and Compliance Manager evidence follow-through |
| 14 | Runtime/tool and applicable network evidence: what identity logs cannot show alone |
| 15 | Defender/ISOC investigation-response-improvement loop |
| 16 | Three-minute readiness check |
| 17 | E7 fit, existing entitlements, and adoption options |
| 18 | Recap and handoff to the approved baseline task |

Do not turn every slide into a separate product demonstration. Use original explanations
inspired by Blue16, not copied implementation or graphics.

### Twenty-five-minute facilitator flow

| Segment | Minutes |
|---|---:|
| Customer outcome and shared case | 3 |
| Dual attack surface | 4 |
| Four questions and one prepared agent record | 4 |
| Five Entra pillars | 5 |
| Data/runtime/SOC loop | 4 |
| Readiness check | 3 |
| E7 fit and Module 2 transition | 2 |
| **Total** | **25** |

### Readiness check

Use the existing exercise surface for a four-point check:
identify agent/accountability; state the approved action/data boundary; explain why
a valid sign-in does not prove safe behavior; name an appropriate control/evidence
source and next decision.

Target: **at least 3/4, including the dual-plane explanation**. If missed, clarify the
example before the handoff; do not solve comprehension problems by granting admin roles.

### Files to update during implementation

These Module 1 files are aligned in the published content draft; content review and independent rehearsal remain outstanding.

| File in `slides/module-01/` | Required update |
|---|---|
| `index.html` | Apply the revised core sequence; preserve entry/navigation/accessibility behavior |
| `slides.md` | Match the HTML's actual slide content and numbering |
| `speaker-notes.md` | Match the 25-minute core, separated onboarding, new talking points, check, and transition |
| `exercise.md` | Replace the introductory six-minute task with the three-minute check and answer key |
| `taxonomy-handout.md` | Replace the old six-module map; move deep anatomy emphasis to Module 3 |
| `facilitator-guide.md` | Correct poll/recovery slide references, scope, actual demo/fallback modes, and rehearsal checklist |
| `permissions-preflight.md` | Preserve presenter/learner separation; state tested roles and available views |
| `interactive-guide.md` | Correct changed slide links/navigation and later Module 2 access |
| `sources.md` | Revalidate claims and availability; include playbook, five pillars, and current first-party sources |
| `README.md` | Correct duration, objectives, next-module numbering, and readiness status |

Module 1 is complete only after source/HTML/notes agree, the check has an answer key,
the required presentation mode is tested, and a second facilitator rehearses the core
within 25 minutes. A clearly labeled screenshot-led introduction can ship before the
Module 2 runtime, but it is not evidence that the combined hands-on workshop is ready.

## 7. Finish Module 2: draft now, prove the task before finalizing

### Scope freeze

Use the pinned Stefano ACA-OBO candidate and shared UI for a **delegated-user internal
mail task**, subject to preflight. Do not add retrieval, a second platform, new custom
MCP tools, full SDK onboarding, or live attack simulation to this release.

Learner sequence:

1. Open the approved UI with the already-provisioned lab identity.
2. Read the supplied synthetic workshop brief and approved recipient boundary.
3. Ask the agent to draft a short status message.
4. Review the content and the internal test recipient.
5. Explicitly request sending; verify receipt, sender, and result.
6. Record the passport and inspect the prepared/current evidence with its mode and time.
7. State an unexpected action and the evidence/control needed to investigate it.

Review-before-send is an instruction in the activity, not an implemented approval
security boundary. Do not advertise technically enforced human approval unless tested.

### Thirty-five-minute facilitator flow

| Segment | Minutes |
|---|---:|
| Case and approved operating boundary | 4 |
| UI sign-in and actor identification | 4 |
| Draft and review | 7 |
| Explicit send and receipt verification | 5 |
| Inspect actor/tool/action evidence | 7 |
| Complete passport and distinguish unexpected behavior | 5 |
| Debrief and Module 3 handoff | 3 |
| **Total** | **35** |

### Minimum package: seven authored files

| Proposed file | Contents |
|---|---|
| `slides/module-02/README.md` | Objective, duration, prerequisites, mode/status, source version, run of show, completion gate |
| `slides/module-02/index.html` | Short presentation using the existing delivery approach, not a new application platform |
| `slides/module-02/slides.md` | Approximately 6-8 teaching/activity slides, included within the 35-minute flow |
| `slides/module-02/speaker-notes.md` | Exact prompts, demonstrations, timing, interpretation, and transition |
| `slides/module-02/facilitator-guide.md` | Setup, permissions, evidence preparation, answers, failures, reset, and teardown |
| `slides/module-02/sources.md` | Playbook, pinned toolkit, Microsoft Learn, limitations, and validation status |
| `labs/module-02-business-agent.md` | Learner steps, synthetic brief, checkpoints, passport template, result/evidence record |

Keep the synthetic brief and passport inside the learner guide initially. Add assets
only when needed for a real screenshot/fallback; do not create empty scaffolding.

Passport fields: purpose; runtime/platform/version; agent/registration identifiers
with type/source; acting user; technical owner and sponsor; tool/resource; actual
authority/authentication route; permitted data/recipient boundary; action/result/time;
evidence location/mode; known gaps; response owner.

Use placeholders in public teaching material. Keep full operational identifiers and
test records in approved restricted lab records. Never publish tokens, TAPs, secrets,
real attendee details, or production messages.

### Mandatory preparation gates

| Gate | Required proof | What does not satisfy it |
|---|---|---|
| Runtime | Correct tenant/subscription, supported services/licenses/quota, healthy agent, inference response | Health endpoint alone |
| Actual task | Internal message received from the intended signed-in user's mailbox, with approved content/recipient | A draft, an HTTP success without receipt, or simulated success |
| Identity/authority | Actual registration/identity/actor mapping and reviewed permissions; document the selected UI route | Assuming the sample's name proves OAuth OBO or every identity object exists |
| Evidence | Actual tool/action/result evidence and a previously verified downstream management/observability path | Exporter enabled in code, empty hunting output, or unrelated-target events |
| Isolation/safety | Approved instructor consents, isolated accounts/mailboxes, reviewed credential storage, scoped roles and reset | Broad learner admin access or accepting every permission to meet a date |
| Repeatability | Two fresh learner accounts; reload/re-authentication and failed-tool recovery tested | Author's cached session or a single successful developer run |
| Facilitation | A second facilitator follows the written package within 35 minutes | Author narration that fills undocumented gaps |

A current learner action may precede downstream telemetry ingestion. Preseed a real,
sanitized evidence record from the same identified target and label its run/time.
Distinguish current receipt/runtime evidence from earlier downstream evidence. Do not
fabricate a join or imply a stale event belongs to the current learner action.

### Authentication and preparation findings to retain

- The sample's documented `/chat` path uses delegated user access with
  `MAIL_TOKEN_MODE=direct`. Record this accurately; the autonomous app flow is different.
- The guide includes powerful instructor admin-consent steps and broad scopes. Review
  actual grants and support requirements; do not call the setup read-only or proven
  least-privilege. All such preparation stays outside learner time.
- Its documented deployment stores a blueprint secret by secret reference. This is
  not proof of secretless workload authentication. TAP-based onboarding and workload
  credential design are different claims. Protect/rotate any approved lab credential;
  validate a federated/managed-identity design separately before promising it.
- The Agent 365 exporter being enabled is not proof of downstream visibility or correct
  actor correlation. Label client/app IDs versus object IDs; verify the join keys.
- Authentication troubleshooting in a source guide is not authorization to bypass
  Conditional Access or device-compliance restrictions. Resolve access with the policy owner.
- Confirm reuse/redistribution rights before publishing adapted third-party code or
  material. Do not vendor the full toolkit or GBB extraction as the workshop integration.

## 8. Fast delivery plan

### Critical path and parallel work

**Review drafts -> user content review -> approved lab/data/automation preparation ->
safe working task/identity/evidence proof -> finalized learner package ->
fresh-account tests -> independent rehearsal -> approved publication.**

Drafting Module 1 and Module 2 happens before provisioning. Following approval,
Module 1 revisions can run in parallel with runtime proof. Do not hold a ready
introduction for completion of the full day. Do not label Module 2 hands-on-ready
before its gates pass.

| Work item | Owner role | Depends on | Completion evidence |
|---|---|---|---|
| P0-00 Review the reworked Module 1 and rough Module 2 drafts | User + curriculum lead | Review copies | Content feedback and explicit approval to move to preparation planning |
| P0-01 Freeze the story, numbering, task, and scoped preparation plan | Curriculum lead + lab owner | P0-00 | Approved environment, test-user/data needs, automation scope, costs, and cleanup |
| P0-02 Prepare the approved fixtures and prove runtime/task/authority/evidence | Platform/lab owner | P0-01 | Recorded results for Section 7 gates; explicit blockers |
| P0-03 Align Module 1 package | Content owner | P0-01 | Revised HTML/source/notes/handout/check; current sources |
| P0-04 Finalize Module 2 package | Content owner | P0-02 | Seven-file package follows the proven path, not assumed behavior |
| P0-05 Extend one Pages pipeline and module navigation | Repository maintainer | P0-03, P0-04 | Both modules accessible; existing Module 1 entry remains valid |
| P0-06 Test fresh learners, failures, evidence, and reset | Lab owner + reviewer | P0-02, P0-04 | Two fresh-account records and explicit recovery outcomes |
| P0-07 Rehearse the combined slice independently | Second facilitator | P0-03, P0-04, P0-05, P0-06 | 60 instructional minutes plus separate onboarding; no hidden steps |
| P0-08 Publish the appropriate release mode | Maintainer + facilitator | P0-07 | Accurate readiness label, known limitations, source/version record |

### ASAP sequence, gated by review rather than assumed dates

| When | Target |
|---|---|
| Now: October 29 | Deliver the reworked Module 1, rough Module 2, learner guide, and data/automation considerations for review |
| After content review | Incorporate feedback and approve the isolated test-user/fixture/automation preparation plan |
| After preparation approval | Create the initial test user and scoped fixtures; prove the actual task/authority/evidence while finalizing Module 1 |
| Once proof passes | Finalize Module 2; test fresh learners, errors, and reset |
| Next available independent rehearsal | Confirm timing and completion gates; publish only the approved release mode |

The previous October 30/November 3 fast-path estimates are superseded by this explicit
review gate. If existing preparation works, compress post-approval work. If tenant
access, licensing, permission review, or evidence is blocked, keep the blocker visible.
No deadline overrides approval or completion gates.

### Release modes

| Release | What can be claimed |
|---|---|
| R0: public content draft (current) | Module 1-2 slides and supporting documents published for review; no runtime or delivery-readiness claim |
| R1: Module 1 introduction | Aligned and rehearsed introduction; live/screenshot mode clearly stated |
| R2: Modules 1-2 hands-on | Real approved task, actual authority/evidence, safe preparation, two fresh accounts, independent rehearsal, working publication |
| R2-demo: facilitated preview | Clearly labeled demonstration/recording from a real validated run; not learner hands-on completion |
| R3: complete core day | Every Module 3-8 activity, evidence, role, control, answer, and reset validated and rehearsed |
| R4: advanced variants | Separately validated SDK, AWS, deeper identity, GSA, Sentinel, or automation extensions |

If no real validated runtime/recording exists, release R1 or an explicitly conceptual
walkthrough, not a fabricated successful Module 2 demonstration.

## 9. What stays off the first-release critical path

- Full GBB SDK lab, new Foundry simulator deployment, AWS/AgentCore integration.
- Full toolkit Demo Builder or multiple agent-platform deployments.
- A new knowledge/retrieval system or custom MCP server.
- GSA client rollout, TLS inspection, tenant baseline-policy change, or preview discovery pipeline.
- ISOC preview onboarding or production Sentinel changes.
- Full DLP deployment or new Compliance Manager assessment build.
- Inventory workbook deployment, UEBA, data-lake connectors, every community KQL example.
- Autonomous response, generated playbook execution, custom detection-rule deployment.
- Seven additional finished presentation packages, new explainer application, or automated scoreboard.

These remain in the full story where appropriate; they are not prerequisites for a
useful, honest 75-minute first release.

## 10. Building the remainder after the first slice

| Next package | Real prerequisite | Minimum next deliverable |
|---|---|---|
| Module 3 | Baseline's actual actor/identity/grant mapping | Actual authority diagram and one allowed/denied-operation exercise |
| Module 4 | Supported identity/resource governance path and approved instructor roles | One sponsor/ownership/access-package lifecycle case and verified effect |
| Module 5 | Proven business workload path and scoped policy/assessment permissions | One DLP comparison, evidence matrix, and owned improvement-action record |
| Module 6 | Authorized GBB fixture plus playbook-aligned identity case | Two scenario cards, target/time mapping, observed/labeled evidence |
| Module 7 | Verified source routing, queries/keys/roles, and response scope | One complete investigation/containment/retest/reset record |
| Module 8 | Validated earlier evidence and answer key | Four flags, scoring rubric, pilot/licensing/cost worksheet, teardown checks |

Modules 4 and 5 can be prepared in parallel after the relevant authority/workload
boundaries are known. An optional full builder track or third-party platform variant
has its own licensing, role, cost, and validation plan.

## 11. Repository and publication alignment

The current publication aligns the core module packages and curriculum documents below. Live preparation, tests, and remaining modules are still gated.

| Surface | Required reconciliation |
|---|---|
| `docs/00-project-outline.md` and `docs/module-roadmap.md` | Replace competing six-module numbering; correct actual Module 1 count; distinguish planned/content-ready/delivery-ready |
| `docs/01-full-day-workshop.md` and `docs/02-baseline-agenda.md` | Replace the multiple-build core with this eight-module security journey; separate optional maker track |
| `README.md` and navigation | Explain the secure-AI-adoption offer, first-release availability, and full-day roadmap |
| `grounding/sources.md` and proposed `grounding/integration-map.md` | Record source revision, role, rights, module mapping, and validation status |
| Proposed `docs/06-customer-learning-plan.md` | Repository home for the approved master plan after implementation work is authorized |
| Module 1 package | Apply Section 6 consistently across HTML, source, notes, handout, exercise, and guides |
| Module 2 package and learner guide | Create only the complete first-release package in Section 7 |
| `.github/workflows/module-01-pages.yml` | Generalize the existing single pipeline to include Module 2 paths/assets; avoid competing root deployments |
| Onboarding/deployment documents | Preserve local edits; reconcile actual TAP, CA, licensing, access, and cleanup behavior before claiming operational readiness |
| `detections/README.md` and later query assets | Replace assumed `AIAgents` references with validated current schemas; document engines, prerequisites, results, and tuning |

Preserve `https://cyberlorians.github.io/a365-hub/` and its Module 1 entry behavior.
Serve Module 2 at a stable subpath such as `/module-02/`. A simple staging layout can
retain Module 1 files at the Pages root and place Module 2 under `module-02/`.
Check relative assets, notes/help, cross-module navigation, offline use, and deep links.
Changing Markdown alone does not update the existing manually authored HTML.

The local branch is behind reviewed public main. Reconcile it on an appropriate
implementation branch/worktree while preserving the user's two onboarding edits and
GBB extraction. Do not use a destructive reset or publish the raw extracted sources.

## 12. Validation checklist for implementation

Tenant/task/control checks and independent delivery rehearsal remain **not run**.
Static package and browser-navigation checks validate publication, not live tenant
behavior or hands-on delivery readiness.

| Check | Expected outcome |
|---|---|
| Module 1 content parity | HTML/source/notes/handout state the same story and module numbering |
| Module 1 knowledge check | Four-point answer key; target at least 3/4 including correct dual-plane explanation |
| Module 1 facilitation | Second facilitator delivers core within 25 minutes without learner admin roles |
| Onboarding | Real event form/email/lab identity/TAP tested; CA and access behavior observed, not universally promised |
| Module 2 runtime | Correct approved environment; healthy runtime plus actual inference |
| Module 2 action | Approved internal recipient receives the intended message from the expected signed-in user |
| Module 2 attribution | Actual actor and identifier types match the selected route; no autonomous/agent-user assumption |
| Module 2 evidence | Current versus preseeded evidence clearly labeled; real downstream path verified before claiming it works |
| Fresh learners | Two fresh accounts complete without the author's cached tokens or undocumented setup |
| Failure recovery | Expired authentication, tool/permission failure, inference failure, and delayed/missing telemetry produce explicit recovery, not false success |
| Retry/reset | No unnoticed duplicate actions or unintended residual grants/resources; document actual rollback/cleanup responsibility |
| Safe access | No broad admin roles for attendees, unauthorized consent changes, published credentials, or personal/production content |
| Presentation UX | Keyboard, notes/help, browser zoom/contrast, deep links, offline/print behavior, and cross-module navigation checked |
| Publishing | Existing Module 1 entry still works; Module 2 subpath and assets load through one Pages release |
| Combined rehearsal | 25 + 35 instructional minutes, plus separately measured onboarding; known limitations and mode stated |

Do not infer TAP expiry from account age. Local notes say cleanup is disabled; verify
live state and use controlled teardown until an approved expiry-aware process exists.

## 13. Product and evidence boundaries

- **Conditional Access:** Not every token request is covered. Microsoft documents
  blueprint-provisioning and intermediate-exchange exceptions; API-key access bypasses
  Entra token issuance. Target OBO users, autonomous identities, and agent users correctly.
- **Agent risk:** OBO/delegated-user risky activity is attributed to the user. Offline
  detections/learning mode mean a new agent need not produce a live agent-risk alert.
- **Gateway:** The reviewed direct GSA agent integration is documented for Copilot
  Studio forwarding, not automatically the ACA-hosted candidate. Discovery and GenAI
  Insights are preview and need their supported forwarding/inspection setup.
- **MCP/network evidence:** GSA remote MCP logging does not see local MCP server traffic.
  Traffic/content capture does not itself prove XPIA detection or blocking. Export
  `NetworkAccessGenerativeAIInsights` only after route, access, retention, and schema validation.
- **Data protection:** Use supported workloads and real policy intent/results. Audit,
  warning, and block are different outcomes. Prompt/MCP content logging needs approved
  access/retention and synthetic data.
- **Compliance Manager:** It records owned control improvement/testing evidence; it
  is not an incident engine, automatic certification, or guarantee every assessment is licensed.
- **ISOC:** Current preview eligibility/availability is not E7 exclusivity or a reason
  to disconnect Sentinel. Current Learn guidance states 30 days of included Defender
  retention; later 90-day/Ignite expectations are not a blanket current promise.
- **Community pricing/roadmaps:** Blue16 calculator rates, future timelines, and
  Perception imagery are not proof of current price, entitlement, or lab capability.
- **Hunting:** A query, alert, behavior, exported event, and deployed detection rule are
  different deliverables. Validate schema/engine/keys, coverage/history, output, and rule semantics.
- **Containment:** Disabling an identity does not prove every session/action has stopped.
  Test the affected target and residual access; do not disable unrelated resources.
- **Reuse:** Cloud-Architekt declares MIT for contributor-owned material; preserve
  required notices. Screenshots, MITRE material, linked content, toolkit/GBB material,
  and other third-party assets require their own rights review.

## 14. Grounding and traceability

Reviewed revisions:

- A365 Hub: `ccf6fcdb0648d20be427aacdc3edd18817b687af`, rechecked October 29.
- Stefano toolkit: `1a1d3f5253771a20915fa519aaaa58f576a5cf35`, rechecked October 29.
- Cloud-Architekt: `09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27`, rechecked October 29.
- GBB: approved local extraction; no upstream revision inferred.
- Microsoft Learn: earlier grounding reviewed October 28 and extended October 29.
  Recheck feature/licensing claims before customer delivery.

The immutable public source links below preserve traceability. Private/local reference snapshots and the GBB extraction are not redistributed. No reviewed scripts, queries, or deployments were executed.

### Source register

| ID | Source | Use / qualification |
|---|---|---|
| H1 | [A365 Hub outline](https://github.com/Cyberlorians/a365-hub/blob/ccf6fcdb0648d20be427aacdc3edd18817b687af/docs/00-project-outline.md) and [roadmap](https://github.com/Cyberlorians/a365-hub/blob/ccf6fcdb0648d20be427aacdc3edd18817b687af/docs/module-roadmap.md) | Actual older numbering, backlog, and readiness claims to reconcile |
| H2 | [A365 Hub Module 1](https://github.com/Cyberlorians/a365-hub/tree/ccf6fcdb0648d20be427aacdc3edd18817b687af/slides/module-01) and [publishing workflow](https://github.com/Cyberlorians/a365-hub/blob/ccf6fcdb0648d20be427aacdc3edd18817b687af/.github/workflows/module-01-pages.yml) | Current package, support-file inconsistencies, manual HTML and publication boundary |
| T1 | [Stefano ACA-OBO setup](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md) and [toolkit UI](https://github.com/stefanpems/a365-lab-toolkit/tree/1a1d3f5253771a20915fa519aaaa58f576a5cf35/ui) | Documented internal Mail task, direct delegated web-UI route, setup/consent/credential caveats |
| T2 | [Stefano governance pack](https://github.com/stefanpems/a365-lab-toolkit/tree/1a1d3f5253771a20915fa519aaaa58f576a5cf35/demo-packs/agent-governance) | Selected cases only; full Demo Builder is not a validated fresh-tenant dependency |
| T3 | [Stefano observability](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/aca-a365-observability.md) | Attribution/export and downstream-visibility preflight |
| G1 | [Approved GBB SDK guide](../grounding/integration-map.md#gbb-access-and-reuse) | Selected registration explanation; full SDK exercise optional, internal prerequisites require adaptation |
| G2 | [Approved GBB hunting guide](../grounding/integration-map.md#gbb-access-and-reuse) | Coverage/triage/timeline/evidence/correlation patterns, not automatically shipped detections |
| G3 | [Approved GBB setup](../grounding/integration-map.md#gbb-access-and-reuse) and [logging guide](../grounding/integration-map.md#gbb-access-and-reuse) | Authorized separate workload fixture and distinct diagnostic/trace/alert paths |
| G4 | [Approved GBB AWS guide](../grounding/integration-map.md#gbb-access-and-reuse) | Optional connection/activity track; IAM/mock checks do not prove a live connection |
| B1 | [Blue16 Secure AI Explained](https://blue16.nl/secure-ai-explainer.html#why) | Original teaching inspiration, not copied code/graphics or product authority |
| B2 | [Blue16 ISOC Explained](https://blue16.nl/isoc-explainer.html) | Operating-model, data-path, eligibility/assessment patterns; preserve phase/pricing distinctions |
| L1 | [Agent 365 overview](https://learn.microsoft.com/microsoft-agent-365/overview) and [getting started](https://learn.microsoft.com/microsoft-agent-365/get-started) | Observe/govern/secure and platform prerequisites |
| L2 | [Entra Agent ID concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) | Identity objects and authority concepts |
| L3 | [Manage agent identities](https://learn.microsoft.com/entra/agent-id/manage-agent-identities-admin) | Management, roles, permissions, lifecycle |
| L4 | [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) | Supported data/compliance controls and generated-label limitation |
| L5 | [Defender AI inventory](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-inventory) | Current inventory guidance and platform/context dependence |
| L6 | [Agent detection/investigation](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-detection-protection) | Supported preview detection and evidence paths |
| L7 | [E3/E5/E7 comparison](https://learn.microsoft.com/microsoft-365/copilot/compare-copilot-e3-e5-e7), [Agent 365 service description](https://learn.microsoft.com/office365/servicedescriptions/microsoft-agent-365/microsoft-agent-365), and [transition guidance](https://learn.microsoft.com/defender-xdr/security-for-ai/transition-agent-security-to-agent-365) | Entitlements/value assessment, not generic upgrade advice |
| L8 | [Agent in a Day](https://learn.microsoft.com/training/paths/agents-online-workshop/) | Optional maker track, not extra required builds |
| L9 | [Sentinel billing](https://learn.microsoft.com/azure/sentinel/billing) | Separate usage/cost planning |
| L10 | [ISOC overview](https://learn.microsoft.com/defender-xdr/isoc-overview) | Preview eligibility, workspace requirements, supported operating model |
| L11 | [ISOC data/billing](https://learn.microsoft.com/defender-xdr/integrated-security-operations-data-billing-retention) | Native versus additional data, current retention and additional ingestion |
| L12 | [DLP overview](https://learn.microsoft.com/purview/dlp-learn-about-dlp) | Workload-specific policy planning and protection |
| L13 | [DLP investigation in Defender](https://learn.microsoft.com/defender-xdr/dlp-investigate-alerts-defender) | Current behavior/alert tuning, roles, conditional incident path |
| L14 | [DLP alert prerequisites](https://learn.microsoft.com/purview/dlp-alerts-get-started) | Alert options/licensing and separate content-viewing permission |
| L15 | [Compliance Manager](https://learn.microsoft.com/purview/compliance-manager) | Owned improvement actions, assessments, test evidence, score limitations |
| L16 | [Governance licensing](https://learn.microsoft.com/entra/id-governance/licensing-fundamentals) | Human/agent entitlements and dependencies |
| L17 | [Governing agent identities](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview) | Sponsors, access packages, approval/expiry and lifecycle |
| L18 | [ID Protection for agents](https://learn.microsoft.com/entra/id-protection/concept-risky-agents) | OBO user attribution, offline risk, learning mode and export |
| L19 | [Conditional Access for agents](https://learn.microsoft.com/entra/identity/conditional-access/agent-id) | Flow/target boundaries and documented exceptions |
| L20 | [AI-generated playbooks](https://learn.microsoft.com/defender-xdr/siem-defender-generate-playbooks) | Optional reviewed/tested automation with explicit permissions and activation |
| L21 | [Microsoft ISOC announcement](https://www.microsoft.com/en-us/security/blog/2026/09/23/reimagining-the-soc-for-the-agentic-era-in-microsoft-defender/) | Signals/context/actuators and human-directed agentic narrative, not lab entitlement |
| L22 | [Sentinel portal transition](https://learn.microsoft.com/azure/sentinel/overview#microsoft-sentinel-in-the-azure-portal-retirement-timeline) | Portal migration is separate from ISOC enrollment |
| L23 | [Gateway for Copilot Studio agents](https://learn.microsoft.com/entra/global-secure-access/concept-secure-web-ai-gateway-agents) | Specific supported forwarding/policy scope, not assumed ACA coverage |
| L24 | [GSA AI discovery](https://learn.microsoft.com/entra/global-secure-access/concept-ai-agent-discovery) | Preview supported discovery, attribution, and prerequisites |
| L25 | [Generative AI Insights](https://learn.microsoft.com/entra/global-secure-access/concept-generative-ai-insights) | Preview supported prompt/remote MCP logging, limitations, and diagnostic export |
| C1 | [Cloud-Architekt Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md) | Required security spine in all eight modules; community findings are not product guarantees |
| C2 | [Inventory/permissions workbook](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/queries/AgentIdentities/AgentInventoryPermissionsRisks.workbook) | Candidate prepared view; parsed/reviewed, not deployed or executed |
| C3 | [Consent Grant](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/ConsentGrant.md) and [monitoring appendix](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/IdentitySecurityMonitoring.md) | Safe identity case and historical background; replace obsolete portal/integration claims with current guidance |

GBB references can require authorized access and are not automatically approved for redistribution
to colleagues/customers. Provide approved references/material before external delivery.
No imported scripts, attack simulations, queries, setup commands, or deployments were
executed for this plan.

## 15. Immediate implementation recommendation

1. Review the standalone Module 1-2 presentation, built-in notes, and rough learner guide.
2. Incorporate feedback and freeze the first-release story/task.
3. Agree the environment, initial test user, fake-data fixtures, optional automation, cost, and cleanup.
4. After approval, prove the instructor-owned task while applying Module 1 feedback.
5. Finalize Module 2 from the observed path; test fresh learners and rehearse independently.
6. Publish only after approval and gates pass; build Modules 3-8 against the same case.

**The immediate goal is not eight completed modules. It is two genuinely teachable
modules, with the whole eight-module security/adoption story already coherent.**

## 16. Per-module data and automation preparation

**Status: design considerations only. Nothing here has been deployed or run.**
The draft's fictional brief is author-written review content, not populated tenant
data, model output, or security evidence. Review content first; approve exact lab
resources, access, and automation separately before provisioning.

Start with one isolated test user after approval, then test two fresh learners before
delivery. Do not create a separate tenant, agent, or simulator for each module when an
approved shared fixture can satisfy the lesson.

| Module | Later fixture/evidence needed | Proposed automation, only if needed | Scope/cost prerequisites | Reset / manual alternative |
|---|---|---|---|---|
| 1 | One actual agent review or labeled prior-run view; event access if onboarding is delivered | No generator required. Reuse the approved Module 2 agent. Enable the event onboarding route only after its own approval/testing | Presenter read access; actual tenant/roles/licenses. No learner admin roles | Sanitized verified screenshot works for an introduction. Fictional cards must stay labeled. No runtime changes needed for content review |
| 2 | Dedicated user/mailbox, controlled internal recipient, reviewed candidate runtime, synthetic brief, real receipt/tool evidence, actual downstream path | Reuse approved onboarding/runtime preparation. Static brief is enough; no retrieval store or fake-event injector needed | Instructor-only consent/deployment; actual grants, isolated environment, secure credentials, licenses, inference/hosting cost bound | Exact account/resource/message manifest; inspect before retry. Manual test-user preparation is acceptable. No fabricated receipt or security telemetry |
| 3 | Actual object relationships, typed identifiers, grants/permissions, and one allowed/denied operation | Optional bounded read-only inventory/grant export after API/role review | Read access only where possible; actual IDs kept in restricted records. No broad scope expansion for convenience | Instructor capture or sanitized prior-run diagram. Reset only a specifically approved test change; do not invent IDs/joins |
| 4 | One supported sponsor/owner/access-package case, approval/lifecycle state, and before/after evidence | Optional scoped governance fixture setup after role/feature review; prepare a real prior state if expiry cannot occur within class | Governance entitlement, protected test group/resource/package, authorized approver, verified effect | Remove only run-created assignments/packages or restore the documented prior state. A labeled prior run can replace live expiry; expiry does not prove all access is gone |
| 5 | Synthetic restricted document/message, approved test pattern/label if needed, one supported DLP policy, owned improvement-action record | Optional scoped content/policy preparation; do not enable tenant-wide rules. Compliance Manager action may be prepared manually | Purview roles/license, supported workload, test-only policy scope, approved content-viewing/retention. Verify audit/warn/block separately | Remove run-created content/policy assignments or restore exact prior scope. Use a labeled verified test record if live enforcement is unavailable; a synthetic example is not control proof |
| 6 | Approved GBB AI-workload target and bounded scenario; narrated/sanitized identity/consent case | Optional reviewed GBB resource setup/simulator for the authorized workload. No privileged live takeover is required | Approved subscriptions/resources, model quota/cost/request cap, diagnostics, actual target IDs, explicit scenario authorization and reuse rights | Stop bounded execution and clean only manifest-owned resources. Prefer an existing verified sanitized evidence pack when safe live setup is unnecessary |
| 7 | Actual queryable signals, source/engine/key mapping, response authorization, and retest/reset evidence | Bounded read-only evidence capture can help. Do not automatically execute generated playbooks, change tuning, or fabricate rows in security tables | Applicable Defender/Sentinel/read roles; connector/workspace/ingestion/retention costs and supported response scope | Static verified case pack/manual investigation is acceptable when labeled. Actual containment is instructor-controlled; restore only the affected approved target |
| 8 | Four flags, answer key, preceding validated evidence, and pilot worksheet | None required. Optional scoring only after content/rehearsal proves useful | No additional cloud platform required for static scoring; use restricted evidence where necessary | Reset local answers/worksheet. Do not deploy a scoreboard as a hidden prerequisite |

### Common contract for any future generator or setup script

- **Purpose and mode:** Record module/scenario, fixture version, event/run ID, and
  `synthetic example`, `verified prior run`, `current run`, or `missing`.
- **Approval and owner:** Named responsible role, allowed environment/targets,
  permissions, data handling, and explicit pre-execution approval.
- **Before state and preview:** Inventory what already exists and preview intended
  operations. No production scope by default; no hidden tenant-wide consent or policy changes.
- **Bounded execution:** Defined request/resource/run limits and a cost cap approved
  for that environment. Start with one status message per initial approved test run;
  inspect uncertain outcomes rather than automatically retry sends.
- **Idempotency and isolation:** Reuse only approved fixtures; tag/record run-owned
  resources. Never adopt/delete unrelated resources because their display names match.
- **Evidence:** Actual typed target IDs, timestamp/time zone, source/engine, expected
  versus observed result, errors, and provenance. Do not manufacture an incident or join
  the separate GBB workload to the toolkit agent without proof.
- **Secrets and safety:** Do not publish tokens, TAPs, secrets, attendee information,
  or production content. Use approved credential storage and least privilege; source
  troubleshooting is not permission to bypass CA/device policy.
- **Cleanup and retest:** An explicit resource/grant/content manifest, restore points,
  support owner, and verified cleanup result. Never infer TAP expiry from account age,
  turn on existing disabled cleanup silently, or delete shared/root resources.
- **Manual alternative:** State how the module works without automation and exactly
  which claims then remain unverified. A fictional example is not a successful lab run.

This is a preparation checklist, not a deployment specification. Select and validate
the exact fixtures/scripts after review; no executable data generator is introduced
by the current drafting task.
