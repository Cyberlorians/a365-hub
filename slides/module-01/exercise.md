# Module 1 Exercise — Classify the Control Boundary

**Time:** 4 minutes in pairs + 2 minutes debrief  
**Score:** 12 points  
**Target:** 9/12 before moving into the build lab

## Instructions

For each scenario, record:

1. classification: generative experience, interactive agent, or autonomous agent;
2. authority: no enterprise identity, delegated user authority, or workload/agent identity;
3. highest-impact action;
4. one preventive control;
5. one event the SOC should observe.

There can be multiple defensible controls and events. Classification and authority must
match the behavior described.

## Scenario A — Public research helper

A user pastes a public annual report into a chat experience and asks for five key findings.
The experience cannot call tools, access tenant data, save files, or act after the response.

| Prompt | Your answer |
|--------|-------------|
| Classification | |
| Authority | |
| Highest-impact action | |
| Preventive control | |
| Observable event | |

## Scenario B — Customer cancellation assistant

A signed-in support representative asks an agent to find an order, explain the refund
impact, and cancel it only after the representative confirms. The agent calls the CRM and
order APIs using the representative's delegated access.

| Prompt | Your answer |
|--------|-------------|
| Classification | |
| Authority | |
| Highest-impact action | |
| Preventive control | |
| Observable event | |

## Scenario C — Autonomous refund monitor

An agent runs every 15 minutes without a user prompt. It reviews refund transactions,
decides whether activity is anomalous, suspends selected refunds, opens an incident, and
notifies the fraud team using its own identity.

| Prompt | Your answer |
|--------|-------------|
| Classification | |
| Authority | |
| Highest-impact action | |
| Preventive control | |
| Observable event | |

## Cross-scenario reflection

In one sentence: **why do tools, enterprise data, and system actions create a need for
governed identity and authorization?**

________________________________________________________________________________

---

# Facilitator answer key

## Scenario A

- **Classification:** generative experience.
- **Authority:** no enterprise identity for downstream systems; only the signed-in chat
  session if the product requires one.
- **Impact:** generated content could be inaccurate or mishandle pasted content.
- **Controls:** approved data handling, content safety, retention policy, user education.
- **Observe:** prompt/response usage or policy event where available.

## Scenario B

- **Classification:** interactive agent.
- **Authority:** delegated user authority.
- **Impact:** cancelling an order and issuing/refusing a refund.
- **Controls:** least-privilege delegated scopes, explicit user confirmation, transaction
  limit, API authorization, separation of duties.
- **Observe:** delegated sign-in, CRM/order lookup, confirmation, cancellation API call,
  result and actor correlation.

## Scenario C

- **Classification:** autonomous agent.
- **Authority:** workload/agent identity.
- **Impact:** suspending financial transactions without immediate human review.
- **Controls:** narrowly scoped application access, transaction threshold, policy guardrail,
  owner/sponsor, emergency disable, credential hygiene, tested rollback.
- **Observe:** workload sign-in, decision record, tool/API calls, permission/policy changes,
  anomaly, suspension result, incident creation.

## Scoring

Award **4 points per scenario**:

- 1 point: classification;
- 1 point: authority;
- 1 point: credible preventive control tied to the action;
- 1 point: observable event that identifies actor and action.

The “highest-impact action” drives discussion but is not separately scored.
The cross-scenario reflection is also unscored; use it to confirm the learner can connect
capability to identity: access and actions must be attributable, explicitly authorized,
observable, and containable.

| Score | Interpretation | Action |
|-------|----------------|--------|
| 10–12 | Ready | Move to the build lab |
| 9 | Ready with reinforcement | Restate Agent ID vs Agent 365 during transition |
| 7–8 | Partial | Revisit slides 3, 6, and 8 |
| 0–6 | Not ready | Redo one scenario with facilitator guidance |
