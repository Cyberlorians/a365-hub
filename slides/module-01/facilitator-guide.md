# Module 1 Facilitator Guide

## Delivery target

Deliver a 30-minute shared vocabulary lesson that prepares mixed identity, SOC, executive,
and maker audiences for the build labs. The module is successful when learners reason from
capability to control instead of debating AI marketing labels.

## Preparation checklist

- [ ] Confirm current product terminology against [sources.md](sources.md).
- [ ] Print or share [taxonomy-handout.md](taxonomy-handout.md).
- [ ] Give each pair [exercise.md](exercise.md) without the answer-key section visible.
- [ ] Confirm a timer is available for the four-minute exercise.
- [ ] Know whether the engagement has Agent 365, Entra P1/P2, Defender, and Sentinel.
- [ ] Do not promise that every build lab produces every Agent ID object; verify in the lab
      tenant and describe only what learners actually observe.

## Audience calibration

### Identity-heavy audience

Spend less time on the classic app analogy. Ask learners to contrast delegated authority
with workload identity and reserve protocol questions for Module 2.

### SOC-heavy audience

Emphasize attribution: sign-in, decision, tool call, target, result, and containment. Do not
turn Module 1 into a KQL session.

### Maker-heavy audience

Use the three scenarios and connect every tool/API addition to permissions and an owner.
Avoid implying builders must become identity administrators.

### Executive-heavy audience

Lead with accountability and the operating model. Keep object vocabulary to recognition
level and anchor the value proposition in safe scale—not fear.

## Validation rubric

A learner is ready for the build lab when they can state:

1. an agent's risk follows what it can access, decide, and change;
2. an interactive agent may act under delegated user authority while an autonomous agent
   commonly needs its own identity;
3. Entra Agent ID and Agent 365 are complementary, not synonyms;
4. blueprint, principal, agent identity, and optional agent user are different objects;
5. at least one preventive and one detective control for a scenario.

Use the exercise score:

- **9–12:** proceed;
- **7–8:** repeat the identity/authority distinction;
- **0–6:** facilitate one scenario from start to finish before proceeding.

## Misconception recovery

| Misconception | Response |
|---------------|----------|
| “Anything using an LLM is an agent.” | Ask whether it uses tools, takes actions, has durable state, or runs without a prompt. Classify behavior, not branding. |
| “Agentic AI and autonomous agents are identical.” | Autonomy is a spectrum. An interactive tool-using agent may remain under human authority; an autonomous agent acts independently. |
| “Agent ID and Agent 365 are the same product.” | Agent ID is the identity/security framework. Agent 365 is the broader fleet control plane that integrates identity, administration, observability, compliance, and defense. |
| “An agent user replaces the agent identity.” | The user is optional and paired 1:1 for user-shaped resources. The agent identity remains primary. |
| “A service principal is good enough for every agent.” | Current Microsoft guidance recommends purpose-built agent identities because traditional service principals lack agent-aware sponsorship, audit, and blueprint lifecycle. |
| “The blueprint is just documentation.” | It is an Entra object and authentication foundation used to create/manage agent identities. The architecture details come next. |

## Hard boundaries

Do not:

- teach detailed token exchange in Module 1;
- enumerate privileged role exceptions;
- claim every Copilot or third-party agent already has an Agent ID;
- claim licensing is uniform across all controls;
- use a production tenant for demonstrations;
- make numerical scale claims without revalidating current service limits.

## Delivery modes

### Full 30-minute mode

Use all 16 slides and the exercise.

### Compressed 15-minute mode

Use slides 1, 3, 4, 6–8, 10–11, 13, and 16. Ask Scenario C verbally. The exercise is
assigned as a handout checkpoint before Module 2.

### Virtual mode

Use a poll for slide 5 and breakout pairs for slide 14. Have pairs post one preventive and
one detective control in chat.

## Transition into the build lab

Close with:

> “We classified the control boundary before building. Now we will build the first agent,
> record what it can access and change, and then inspect which identity objects actually
> appear in this tenant. We will not assume—the portal and logs are our evidence.”
