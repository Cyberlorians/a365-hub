# Module 1 Facilitator Guide

## Delivery target

Guide attendees through lab sign-in, then deliver a 17–23 minute security-first Module 1
that positions Agent 365 and Microsoft 365 E7 without fear or unnecessary complexity.

## Preparation checklist

- [ ] Open the [interactive deck](index.html), press `?`, and test navigation/fullscreen.
- [ ] Test the event form, email, TAP, and sign-in link end to end.
- [ ] Complete the [admin setup guide](permissions-preflight.md). The audience needs no
      admin permissions; it needs only the workshop lab account.
- [ ] Confirm current product terminology against [sources.md](sources.md).
- [ ] Confirm the current E7 and Agent 365 licensing statement against Microsoft sources.
- [ ] Sign in with the presenter account and open Agent Registry, Purview AI observability,
      and Defender real-time protection.
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
3. Entra controls identity, Purview protects data, and Defender protects runtime activity;
4. Agent 365 is included in Microsoft 365 E7;
5. every review asks what, who, which access, and what happened.

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

### Standard 25–35 minute mode

Use all 18 slides. Slides 1–5 are attendee prerequisites. Slides 6–18 are official Module
1. Learners act only during prerequisites and watch the administrator on slides 10, 14,
and 16.

### Five-minute executive mode

Skip prerequisites only when accounts are already validated. Use slides 6, 8, 9, 12, 13,
15, 17, and 18.

### Virtual mode

Use a poll on slide 3: inventory, ownership, access, or activity/containment.

## Transition into the build lab

Close with:

> “We have the business question: how do we scale agents without losing control? Now we
> will build one, reveal its identity and access, and prove the visibility, risk, and
> control story behind Microsoft 365 E7.”
