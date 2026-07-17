# Module 1 — See It. Control It. Protect It.

**Theme:** Microsoft 365 E7 and Agent 365 value story

**Duration:** 25–35 minutes, including attendee sign-in

**Audience:** Identity, security, SOC, platform, and AI-maker teams

**Placement:** Workshop entry and security foundation, immediately before the first build lab

## Purpose

The package has two parts. Five prerequisite slides get attendees into the workshop with
the event form, access email, lab username, and Temporary Access Pass. The official
thirteen-slide Module 1 then answers four security questions:

1. What agents exist?
2. Who owns them?
3. Which data, tools, and permissions can they use?
4. What happened, and can unsafe activity be stopped?

This is a **recognition-level introduction**, not the architecture deep dive. Module 2
owns authentication flows and object anatomy; Module 3 owns permissions; Module 4 owns
blast radius and attacks.

## Learning objectives

By the end, customers can:

- complete form-driven onboarding and sign in with a TAP;
- describe Agent 365 with three verbs: observe, govern, and secure;
- explain the roles of Entra identity, Purview data security, and Defender threat protection;
- state that Agent 365 is included in Microsoft 365 E7;
- use the four-question review for one real agent.

## Package

| File | Use |
|------|-----|
| [index.html](index.html) | Self-contained 18-slide prerequisite and Module 1 presentation |
| [interactive-guide.md](interactive-guide.md) | Local use, keyboard controls, presenter workflow, sharing, and customization |
| [permissions-preflight.md](permissions-preflight.md) | Simple admin setup guide that separates presenter access from audience access |
| [slides.md](slides.md) | Five prerequisite slides and thirteen official Module 1 slides |
| [speaker-notes.md](speaker-notes.md) | Timed talk track, prompts, misconceptions, and transitions |
| [exercise.md](exercise.md) | 6-minute learner classification exercise and answer key |
| [taxonomy-handout.md](taxonomy-handout.md) | One-page learner reference |
| [facilitator-guide.md](facilitator-guide.md) | Setup, delivery modes, validation rubric, and recovery plan |
| [sources.md](sources.md) | Claim-to-source map and content boundaries |

## Launch the interactive deck

- **Hosted:** [Open the click-through presentation](https://cyberlorians.github.io/a365-hub/)
- **Offline:** download the repository and open `index.html` in this folder.

Use arrow buttons, swipe, or the keyboard. Press `N` for presenter notes, `F` for
fullscreen, and `?` for help. The hidden admin shortcut `R` opens presenter setup. The HTML
performs no tenant API calls. Learners need only the workshop account; the presenter uses
least-privilege access for the admin views.

## Run of show

| Time | Segment | Slides |
|------|---------|--------|
| 0:00–0:12 | Form, email, TAP, and lab sign-in | 1–5 |
| 0:12–0:16 | Module goals, agent concept, and Agent 365 | 6–9 |
| 0:16–0:21 | Agent Registry and one-agent review | 10–11 |
| 0:21–0:29 | Entra, Purview, and Defender security layers | 12–16 |
| 0:29–0:32 | E7 value, recap, and next agent | 17–18 |

## Definition of done

Module 1 is delivery-ready when:

- [x] slide source is complete and scoped to 25–35 minutes including onboarding;
- [x] each slide has a tested talk track and timing;
- [x] the exercise has an answer key and objective scoring rubric;
- [x] the learner handout uses current Microsoft terminology;
- [x] authoritative claims map to sources;
- [x] interactive HTML deck supports keyboard, touch, presenter notes, print, deep links,
      and reduced motion;
- [x] admin setup guide separates presenter access from audience access;
- [ ] visual design has been applied in PowerPoint;
- [ ] delivery has been dry-run by a second facilitator;
- [ ] final deck has been exported to accessible PDF/PPTX.

## Delivery rule

Do not teach every technical detail here. The desired learner reaction is:

> “Agents are already here. E7 gives us Agent 365 and the integrated controls to scale
> them with confidence.”

If learners leave asking how token exchange, inherited permissions, or cross-tenant
blueprints work, the module has succeeded—the next modules answer those questions.
