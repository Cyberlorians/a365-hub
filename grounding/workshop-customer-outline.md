# Secure AI Agents Workshop

## See It. Control It. Protect It.

**A hands-on learning series helping security teams understand, govern, protect, and
investigate AI agents.**

Saved November 13, 2026, from the November 12 customer-facing outline. This is
curriculum grounding based on Brooke's proposed framing and the supplied
[Agent ID scenarios image](reference-images.md#image-3---agent-id-scenarios), not
an independent source of product behavior or a claim of delivery readiness.
The [delivery agenda](../docs/01-full-day-workshop.md#customer-facing-outline)
contains the expanded activities and proposed timing.

## What the workshop is

- **Hands-on learning.** Short teaching segments introduce each topic, followed by
  guided exercises using a sample business agent and prepared investigation evidence.
- **Modular and virtual.** Eight modules delivered as a series of remote sessions,
  with a practical outcome from each.
- **Shaped by your feedback.** Bechtel would be our proposed pilot customer, with
  feedback after each module helping refine the next session.
- **A controlled lab environment.** Exercises are planned for a dedicated
  Microsoft-hosted environment using synthetic business data. An approved Bechtel
  development tenant or subscription could also let your team retain selected work
  and build on it afterward.

## Proposed modules

### 1. See It. Control It. Protect It.

Understand why AI agents need governance and how Agent 365, Entra, Purview, and
Defender fit together. Explore agents running on Microsoft platforms, externally
hosted agents calling Microsoft APIs, and cross-cloud workflows. Identify what an
agent does, who owns it, what it can access, and where evidence should appear.

**Takeaway:** An agent-security readiness worksheet.

### 2. Meet Your Business Agent

Work with a sample business agent to complete an approved task. Document its purpose,
owner, tools, data, acting identity, and expected behavior, establishing a baseline
before investigating misuse.

**Takeaway:** An agent passport and a record of normal, approved activity.

### 3. Understand Agent Identity

Trace whose authority an agent uses, how it authenticates, and which permissions
determine its potential impact. Compare Microsoft-hosted, externally hosted, and
federated scenarios to understand what changes and what still needs protection.

**Takeaway:** An identity, authority, and access-boundary diagram.

### 4. Govern Access and Lifecycle

Explore ownership, sponsorship, approvals, access reviews, renewal, and retirement.
Review a sample governance case and decide whether an agent's access should be
retained, restricted, renewed, or removed.

**Takeaway:** A governance decision with an accountable owner and review date.

### 5. Protect Data and Tools

Examine how to keep agents within approved data and action boundaries. Test a
supported control using synthetic information, review the result, and identify
gaps requiring further action.

**Takeaway:** A documented control result and an owned improvement action.

### 6. Recognize Risky AI Behavior

Learn to distinguish identity compromise from misuse of legitimate agent capabilities.
Examine suspicious activity, compare it with expected behavior, and identify the
evidence and visibility gaps that should guide an investigation.

**Takeaway:** An evidence-backed finding and a clear investigation question.

### 7. Investigate and Contain in Defender XDR

Triage and hunt for agent-related activity, correlate evidence, and build an
investigation timeline. Choose a scoped containment action and verify its effect,
incorporating Sentinel and integrated security operations where supported.

**Takeaway:** An investigation timeline and a containment and verification plan.

### 8. Prove It and Plan Adoption

Apply the learning in a capture-the-flag challenge covering agent authority,
governance, data protection, and investigation. Turn the findings into a proposed
30-day Bechtel pilot with owners, success measures, and rollout boundaries.

**Takeaway:** Challenge findings and a practical adoption plan.

*Proposed pilot outline. Lab exercises, environment availability, licensing, and
supported capabilities will be validated before each module is delivered.*

## Module 1 alignment review - November 13, 2026

**Historical assessment before the November 13 alignment edits:** The module aligned with the purpose and main learner output,
but is not yet fully aligned with the revised scope and supporting references.
This assessment does not change the teaching deck or claim a fresh live tenant test.

| Updated outline expectation | Current evidence | Assessment |
|---|---|---|
| Explain why agents need governance | HTML slides 6-9 introduce agents, ownership/credential abuse, and dual attack surfaces | Aligned in purpose; the current opening is more attack-led than the broad outline |
| Connect Agent 365, Entra, Purview, and Defender | HTML slides 10 and 12-15 map visibility, identity controls, data protection, and investigation | Aligned |
| Explore the image's four overlapping scenario lenses | Facilitator guide includes a brief orientation; HTML has no explicit four-scenario comparison | Partial: guidance exists, but learner-facing teaching still needs the overview |
| Identify purpose, owner/actor, reach, and evidence | HTML slides 7 and 11 and the registry activity use these four questions | Aligned |
| Produce a readiness worksheet and next action | Learner guide, readiness check, and closing handoff retain the four answers, risk explanation, and next action | Aligned intent; plain-text references need to match the current live-registry route |
| Keep the first module introductory | HTML slide 8 introduces blueprint/principal/identity/user; slide 9 and its notes go into credential-abuse mechanics | Needs a scope pass: keep a brief orientation here, with detailed authority and attack-path teaching in Modules 3 and 6 |
| Make evidence gaps explicit, not guaranteed successes | HTML slide 11 says the registry risk count shows 1 after manual flagging | Needs correction: November 5 grounding records Entra risk while the registry remained 0 after more than three hours |

### Supporting-reference gaps

- The [HTML teaching deck](../slides/module-01/index.html) now opens with the
  Monday incident story and a real registry review. The
  [Markdown slide source](../slides/module-01/slides.md) and
  [learner guide](../labs/module-01-security-foundation.md) still describe the
  earlier synthetic-mail introduction and fictional teaching card. These should be
  reconciled before treating the package as aligned.
- The [facilitator guide](../slides/module-01/facilitator-guide.md) already places
  the scenario orientation in Module 1 and authority tracing in Module 3. That is
  guidance, not proof the overview is present in the student deck.
- Use the [November 5 registry findings](module-1-direction-and-registry.md)
  when correcting the staged-risk promise. Demonstrate confirmed risk in Entra
  where available and describe missing registry risk as a visibility/sync gap.

### Recommended alignment work

1. Add a concise learner-facing four-scenario orientation using original text;
   do not publish the supplied image until provenance/reuse is resolved.
2. Keep the four-question registry review and readiness worksheet as the core
   activity; move detailed authority/attack mechanics to the later modules.
3. Remove the guaranteed registry risk count and distinguish Entra's observed
   risk from Agent 365's registry visibility.
4. Align the HTML, Markdown, learner guide, and instructor scripts to the same
   story, evidence mode, and actual access prerequisites; then rehearse timing.

### Implemented alignment - November 13, 2026

The teaching deck now leads with the useful synthetic-mail case, includes the four
scenario lenses in original text, and keeps detailed identity/credential-abuse mechanics
for Modules 3 and 6. The registry lab, learner guide, notes and instructor scripts use
the same four-question readiness worksheet, including source/time, unknowns, one gap
and one owned next action. Staged risk is optional; no registry count or sync is promised.
AI Reader access is preflighted or replaced with labeled presenter/prior-run evidence.
The 18-slide structure and proposed 25-minute core remain; Lab 3 fits the existing
review/control-map segment. Fresh-learner live checks and independent timing remain
release gates, not outcomes established by content alignment.
