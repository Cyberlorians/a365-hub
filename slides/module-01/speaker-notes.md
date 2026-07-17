# Module 1 Speaker Notes

These notes correspond to [slides.md](slides.md). Total target: **30 minutes**.

## Slide 1 — Agents are identities (1:00)

**Say:** “Today is not an AI-features tour. It is a control-plane workshop. The moment
software can act in enterprise systems, we must identify it, authorize it, observe it, and
stop it when necessary.”

**Do:** Point to the sequence: build → identify → authorize → observe → govern.

**Transition:** “First, we need a taxonomy that survives product marketing.”

## Slide 2 — Outcomes (1:30)

Set the contract. Learners do not need to memorize protocol details. They must be able to
classify a scenario, distinguish the two Microsoft products, and recognize object names.

**Prompt:** “Which outcome is newest to you?” Take two responses only.

## Slide 3 — Inspect behavior (1:30)

Explain that the categories overlap and are not universal standards. A generative model may
be embedded inside an agent. An interactive agent can use sophisticated planning without
being fully autonomous.

**Say:** “Our control decision follows access, decisions, and actions—not the presence of an
LLM.”

**Check:** Ask, “Can a chatbot be an agent?” Expected answer: yes, if it uses tools/data and
acts under defined authority; the interface alone does not decide.

## Slide 4 — Autonomy and trust (1:30)

Walk left to right. Each step increases potential impact and reduces the immediacy of human
review. Stress that autonomy itself is not bad; unmanaged autonomy is the problem.

**Prompt:** “At which arrow does identity become non-negotiable?” Accept “tools,” “actions,”
or “enterprise data” if the learner explains the boundary.

## Slide 5 — Three scenarios (1:30)

Take a quick show of hands for A, B, or C as strongest control need. The expected answer is
C because it acts independently and changes financial state. Note that B still needs strong
controls because delegated user authority can be abused.

Do not debrief every control yet; the exercise returns to these scenarios.

## Slide 6 — Identity is the control point (2:00)

Read the questions, not the control names. Connect each to incident response:

- if “who” is unknown, attribution fails;
- if authority is unclear, consent and accountability fail;
- if actions are not logged, investigation fails;
- without disable/rollback, containment fails.

**Anchor line:** “Identity is necessary, but not sufficient—it connects all other controls.”

## Slide 7 — Entra Agent ID (2:00)

Use Microsoft's definition. Explain “purpose-built” without overselling: Agent ID extends
familiar Entra capabilities to specialized agent constructs and supports Microsoft and
non-Microsoft platforms.

**Do not say:** every AI application automatically uses Agent ID.

**Check:** “What problem does Agent ID solve?” Expected: identity, access, governance,
protection, and traceability for agents at scale.

## Slide 8 — Agent ID versus Agent 365 (2:00)

This is the main product-positioning slide.

**Say:** “Agent ID is the identity/security substrate. Agent 365 is the operational control
plane: observe, govern, secure. They are complementary.”

Call out that Agent ID availability does not mean every advanced protection is unlicensed.
Licensing depends on capability and current plans; use the current Microsoft pages for
customer-specific claims.

**Check:** Ask one learner to finish: “Agent ID tells me __; Agent 365 helps me __.”
Expected: who the agent is; operate/govern the fleet.

## Slide 9 — Familiar foundation (1:30)

Use this as a confidence bridge for identity professionals. Say “built on familiar object
types,” not “exactly the same.” The hierarchy and agent-aware lifecycle are important
differences.

For beginners: app registration is the application definition; service principal is its
presence/identity in a tenant. Stop there.

## Slide 10 — Four names (2:00)

Introduce names at recognition level:

- blueprint: template and authentication foundation;
- principal: tenant-local presence;
- agent identity: primary acting identity;
- agent user: optional user-shaped companion.

**Check:** “Which object is optional?” Expected: agent user.

## Slide 11 — Hierarchy map (1:30)

Trace top to bottom. Carefully state the preview supported by Microsoft documentation:
agent identities have no credentials of their own; authentication is rooted in the
blueprint.

**Boundary line:** “How tokens move through this hierarchy is Module 2. How compromise
expands through it is Module 4.”

## Slide 12 — Accountability (1:30)

Explain why a technically valid identity can still be operationally orphaned.

- owner: can administer;
- sponsor: says the agent should exist and remain in service;
- manager: applies to the optional agent user relationship.

**Prompt:** “Who decides this agent is still worth its access six months from now?” Expected:
the sponsor/business owner, supported by governance reviews.

## Slide 13 — Operating model (1:30)

Connect the day:

- Entra Agent ID handles identity/access foundations;
- Agent 365 centralizes fleet operations;
- Defender and Purview protect runtime/data;
- XDR and Sentinel support SOC workflows.

Avoid presenting product boundaries as absolute; integrations evolve.

## Slide 14 — Exercise (0:30 instruction + 4:00 work)

Pairs complete [exercise.md](exercise.md). Announce halfway and at 30 seconds. Ask them to
select one spokesperson and circle the highest-impact action.

Walk the room. Listen for authority confusion: Scenario B is delegated; Scenario C uses its
own workload/agent identity.

## Slide 15 — Debrief (2:00)

Reveal one row at a time. Ask a pair for a preventive control and another pair for an event
the SOC should observe.

Emphasize that Scenario A is not “no security”; it still has data handling, safety, and
logging concerns. It simply has a smaller enterprise action boundary.

## Slide 16 — Takeaways and transition (1:00)

Ask the room to say the product distinction aloud:

- Entra Agent ID: identity/security framework.
- Agent 365: fleet control plane.

Then transition directly to the first build lab. Give learners the taxonomy handout and ask
them to annotate which data, tools, decisions, and actions their build receives.
