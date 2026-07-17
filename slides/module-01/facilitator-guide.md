# Module 1 Facilitator Guide

## Delivery target

Deliver a 10–15 minute executive-friendly conversation that creates urgency without fear,
positions Microsoft Agent 365 clearly, and lands Microsoft 365 E7 as the integrated path
to controlled agent adoption.

## Preparation checklist

- [ ] Open the [interactive deck](index.html), press `?`, and test navigation/fullscreen.
- [ ] Complete the [permission preflight](permissions-preflight.md) with a real attendee test
      account; the deck's `R` checklist is a manual record, not an API audit.
- [ ] Confirm current product terminology against [sources.md](sources.md).
- [ ] Confirm the current E7 and Agent 365 licensing statement against Microsoft sources.
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

A customer has understood the story when they can state:

1. agents create a visibility and control gap because they access data and take action;
2. Agent 365 helps organizations observe, govern, and secure agents;
3. identity is the security foundation for agent access and accountability;
4. Agent 365 is included in Microsoft 365 E7;
5. the next step is to discover, assess, and pilot against a real use case.

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

### Standard 10–15 minute mode

Use all eight slides. Ask the customer which control-gap question is hardest today.

### Five-minute executive mode

Use slides 1, 3, 4, 6, and 8.

### Virtual mode

Use a poll on slide 3: inventory, ownership, access, or activity/containment.

## Transition into the build lab

Close with:

> “We have the business question: how do we scale agents without losing control? Now we
> will build one, reveal its identity and access, and prove the visibility, risk, and
> control story behind Microsoft 365 E7.”
