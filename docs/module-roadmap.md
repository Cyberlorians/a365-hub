# Module Development Roadmap

This roadmap separates the **working workshop platform** from the **teaching modules still
under development**. A module is complete only when its slides, lab, facilitator notes,
validation steps, and teardown guidance all meet the definition of done below.

## Delivery model

Each module is designed as an independent teaching package:

```text
module-N/
├── README.md          # objective, duration, prerequisites, and facilitator flow
├── slides.md          # source deck
├── lab.md             # attendee instructions and checkpoints
├── facilitator.md     # demo notes, timing, failure recovery, and answers
└── assets/            # sanitized screenshots and diagrams
```

Cross-module detection content belongs in `detections/`; reusable deployment automation
belongs in `labs/`.

## Status at a glance

| Module | Outcome | Current evidence | Next deliverable | Status |
|--------|---------|------------------|------------------|--------|
| 1 — Concepts & taxonomy | Explain behavior-based agent taxonomy, Agent ID, and Agent 365 | Interactive HTML deck plus complete 30-minute package in `slides/module-01/` | Complete second-facilitator dry run; optionally export branded PPTX/PDF | 🟢 Interactive package complete; delivery validation pending |
| 2 — Agent ID anatomy | Map blueprint, principal, identity, and agent user | Outline and grounding research | Architecture diagram, deck, object-mapping exercise | 📋 Planned |
| 3 — Portal walkthrough | Inventory identities, credentials, owners, and permissions | Workshop outline | Screenshot-guided lab with checkpoints | 📋 Planned |
| 4 — Attack paths | Explain blueprint blast radius, ownership abuse, and consent risk | Curated research narratives | Safe lab demo and attack-path deck | 📋 Planned |
| 5 — Detect, respond, govern | Hunt, detect, contain, and apply Conditional Access | Response research and deployment runbook | KQL pack, validation data, response lab | 🟡 Partial |
| 6 — Capture the Flag | Apply portal, Graph, and hunting skills | Challenge themes in project outline | Challenges, answer key, scoring rubric | 📋 Planned |

## Platform workstream

| Component | State | Notes |
|-----------|-------|-------|
| Form-driven attendee provisioner | ✅ Working | Creates user, issues TAP, sends email |
| Expired-account cleanup | ✅ Working | Hourly, department-scoped deletion |
| Entra prerequisite automation | ✅ Working | Dynamic group, CA MFA policy, licensing discovery |
| Repeatable ARM deployment | ✅ Working | Parameterized templates and managed identities |
| Permission and teardown runbook | ✅ Working | Deployer, runtime, XDR, Sentinel, and revocation tracking |
| Defender XDR URBAC assignment | 🟠 Manual | Portal-only; documented and must be validated per tenant |
| Other-CA exclusions | 🟠 Manual | Script reports policies; operator tests and decides exclusions |

## Detection-pack backlog

The `detections/` workstream will deliver tested queries and—not merely query snippets—
expected telemetry, tuning notes, false-positive guidance, and response actions.

1. Blueprint credential added.
2. Agent identity receives a Tier-0 permission.
3. TAP created by a service or agent identity.
4. Secret-authenticating blueprints and stale credentials.
5. Agent inventory and activity hunting using the Defender XDR `AIAgents` table.
6. Conditional Access containment templates, report-only first.

## Definition of done

A teaching module is **done** when it has:

- clear learner objectives and prerequisites;
- a time-boxed facilitator flow;
- finished slide source with attribution;
- attendee instructions that work in a fresh lab tenant;
- checkpoints and an answer key;
- a security boundary and safe teardown;
- validation by someone other than the author;
- no live tenant identifiers, credentials, or attendee information.

A detection is **done** when it has:

- a documented data source and required licensing;
- valid KQL tested against representative telemetry;
- expected result examples with sensitive values removed;
- tuning and false-positive guidance;
- a mapped investigation and containment action.

## Near-term milestones

### Milestone 1 — teachable foundation

- [x] Finish Module 1 interactive deck, speaker notes, exercise, facilitator guide, source map, taxonomy handout, and permission preflight.
- [ ] Complete a second-facilitator dry run and optionally export branded PPTX/PDF.
- Produce the Module 2 object model diagram.
- Add the Module 3 portal walkthrough skeleton.

### Milestone 2 — security content

- Ship the first three detections with test notes.
- Build the object-scoped disable and Conditional Access response exercise.
- Validate XDR and Sentinel read-only attendee access in a clean tenant.

### Milestone 3 — workshop release candidate

- Complete Modules 4–6.
- Run a facilitator dry run from a fresh deployment.
- Publish timing, troubleshooting, answer keys, and teardown validation.

## Help wanted

- Microsoft Entra Agent ID reviewers.
- Defender XDR/Sentinel KQL contributors.
- Facilitators willing to test the runbook in a disposable tenant.
- Slide designers and technical diagram contributors.
- CTF authors focused on safe, reversible exercises.

Use an issue or pull request and identify the module/workstream in the title.
