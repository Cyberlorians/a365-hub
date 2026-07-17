# Module 1 — Agents Are Identities

**Theme:** Concepts and taxonomy  
**Duration:** 30 minutes  
**Audience:** Identity, security, SOC, platform, and AI-maker teams  
**Placement:** Welcome/framing, immediately before the first Agent in a Day build lab

## Purpose

Module 1 gives learners a shared vocabulary before they build anything. It answers four
questions:

1. What changes as AI moves from generating content to taking actions?
2. Why does an acting agent need a purpose-built identity?
3. What is the difference between Microsoft Entra Agent ID and Microsoft Agent 365?
4. Which Agent ID object names should learners recognize in later modules?

This is a **recognition-level introduction**, not the architecture deep dive. Module 2
owns authentication flows and object anatomy; Module 3 owns permissions; Module 4 owns
blast radius and attacks.

## Learning objectives

By the end, learners can:

- distinguish generative AI, interactive agents, and autonomous agents using behavior—not
  marketing labels;
- explain why tools, data access, and actions create identity and authorization needs;
- describe Microsoft Entra Agent ID as the purpose-built identity and security framework;
- distinguish Entra Agent ID from Microsoft Agent 365;
- recognize blueprint, blueprint principal, agent identity, and agent user;
- identify the minimum controls required by a simple agent scenario.

## Package

| File | Use |
|------|-----|
| [slides.md](slides.md) | 16-slide presentation source |
| [speaker-notes.md](speaker-notes.md) | Timed talk track, prompts, misconceptions, and transitions |
| [exercise.md](exercise.md) | 6-minute learner classification exercise and answer key |
| [taxonomy-handout.md](taxonomy-handout.md) | One-page learner reference |
| [facilitator-guide.md](facilitator-guide.md) | Setup, delivery modes, validation rubric, and recovery plan |
| [sources.md](sources.md) | Claim-to-source map and content boundaries |

## Run of show

| Time | Segment | Slides |
|------|---------|--------|
| 0:00–0:03 | Hook and outcomes | 1–2 |
| 0:03–0:08 | Behavior taxonomy | 3–5 |
| 0:08–0:14 | Identity control plane | 6–8 |
| 0:14–0:19 | Agent ID vocabulary | 9–11 |
| 0:19–0:22 | Observe, govern, secure | 12–13 |
| 0:22–0:28 | Scenario exercise + debrief | 14–15 |
| 0:28–0:30 | Takeaways and lab transition | 16 |

## Definition of done

Module 1 is delivery-ready when:

- [x] slide source is complete and scoped to 30 minutes;
- [x] each slide has a tested talk track and timing;
- [x] the exercise has an answer key and objective scoring rubric;
- [x] the learner handout uses current Microsoft terminology;
- [x] authoritative claims map to sources;
- [ ] visual design has been applied in PowerPoint;
- [ ] delivery has been dry-run by a second facilitator;
- [ ] final deck has been exported to accessible PDF/PPTX.

## Delivery rule

Do not teach every technical detail here. The desired learner reaction is:

> “An agent takes actions under an identity. I now know which control plane and object
> names to look for.”

If learners leave asking how token exchange, inherited permissions, or cross-tenant
blueprints work, the module has succeeded—the next modules answer those questions.
