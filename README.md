# A365 Hub

## Adopt AI. Govern Agents. Protect the Business.

An open, attack-informed security workshop connecting Microsoft Entra, Agent 365,
Microsoft Purview, and Defender / integrated security operations.

**A correctly authenticated agent can still be manipulated into misusing legitimate
access.** Every module follows **risk -> control -> evidence -> decision**, anchored
in the Cloud-Architekt Agent Identities chapter and grounded in Microsoft Learn.

## Open the slides

| Module | Public presentation | Supporting material | Status |
|---|---|---|---|
| 1. See It. Control It. Protect It. | [Open Module 1](https://cyberlorians.github.io/a365-hub/#slide-6) | [Package and notes](slides/module-01/README.md) | Reworked content draft: 25-minute core; five separate onboarding slides |
| 2. Establish the Approved Agent Baseline | [Open Module 2](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) | [Package and notes](slides/module-02/README.md), [labs](https://cyberlorians.github.io/a365-hub/module-02/?view=lab) | Eight teaching slides plus four numbered labs and an instructor guide; runtime not yet validated |

These are **separate, independently addressable slide decks**, not a combined local
review file. Press **N** for per-slide presenter notes. Use the module links in either
deck to switch presentations. Each HTML file also works offline for its own slides.

> Public content drafts are not hands-on release claims. No test accounts, tenant
> fixtures, GBB scenarios, or tenant automation have been executed for this publication.
> The deployment scripts below are provided for an authorized lab admin to run.
> Local tests and compiled templates do not establish tenant readiness.

## Deploy and run Modules 1-2

Each module is **one presentation with three parts**, all in the original blue style:

1. **Learn** - the teaching slides. After the lessons that need practice, a
   **LAB 1, LAB 2...** button appears (Module 1 has five labs, Module 2 has four).
2. **Labs** - each lab is a handful of tiny steps: numbered "Do this" actions, a picture
   of what you should see, Copy boxes, and a "You are done when" line. The last step
   of each lab sends you back to the next slide. A toggle shows instructor-only notes
   for every step.
3. **Instructor guide** - the same format for the person preparing the labs: portal
   steps, copy-and-run scripts, expected output, and, per lab, what to do manually
   when something goes wrong.

Start here:

1. **Instructor:** [Module 1 guide - accounts, licenses, TAPs, mailbox test, lab recovery](https://cyberlorians.github.io/a365-hub/?view=admin).
2. **Instructor:** [Module 2 guide - deploy the agent and website, prove a real email task, lab recovery](https://cyberlorians.github.io/a365-hub/module-02/?view=admin).
3. **Everyone:** follow the slides and press the lab buttons, using the
   instructor-provided account, agent link, and approved internal recipient.

This route does not require the old Forms/Logic App pipeline. It uses run-owned
manifests, does not alter CA/DLP, and never invokes the upstream destructive deployment
script. Budget, tenant eligibility, licenses, and model quota are required inputs.
Reuse a chat-model deployment or follow the optional model-creation snippets in the
Module 2 admin guide. [Deployment files](labs/workshop/) and [scripts](scripts/) are included.

## Step-by-step walkthroughs

| Module | Labs | Instructor guide |
|---|---|---|
| 1 | [Start Module 1 labs](https://cyberlorians.github.io/a365-hub/?view=lab) | [Open Module 1 instructor guide](https://cyberlorians.github.io/a365-hub/?view=admin) |
| 2 | [Start Module 2 labs](https://cyberlorians.github.io/a365-hub/module-02/?view=lab) | [Open Module 2 instructor guide](https://cyberlorians.github.io/a365-hub/module-02/?view=admin) |

Both teaching decks have **Labs** and **Instructor guide** buttons. Labs have
illustrative pictures (not live screens or evidence), a progress tracker, Next/Previous,
a step selector, fullscreen, print and Copy. The **Instructor notes** toggle adds
preparation, script/data needs, student cues and cleanup to each lab step.
Instructor view is a display mode, **not an authorization boundary**: notes are public,
and must never contain credentials or private tenant/attendee information.
No Copy button executes code or stores attendee data.

> **Not yet done:** nobody has run the labs end to end as a real fake user in a live
> tenant, so the pictures are schematic (not captured screenshots), and the access-form
> step needs an instructor-provided link. Live tenant proof remains unverified until
> actual deployment and tests are recorded.

The Markdown guides remain a plain-text reference and the source of every copy-and-run
snippet used in the slides (a check fails if they drift):
[Module 1 learner](labs/module-01-security-foundation.md),
[Module 2 learner](labs/module-02-business-agent.md),
[Module 1 admin](docs/07-module-01-admin-runbook.md),
[Module 2 admin](docs/08-module-02-admin-runbook.md).
Build the two integrated presentations locally with
`node scripts/build-walkthroughs.mjs`; output is in ignored `_site/index.html` and
`_site/module-02/index.html`. Edit teaching slides in `slides/module-01/index.html` and
`slides/module-02/index.html`; edit lab/setup steps, pictures and instructor notes in
`scripts/workshop-lab-content.mjs`; page layout is in `scripts/build-walkthroughs.mjs`.
Use this same learn -> numbered labs -> instructor guide pattern for future modules.

## Complete eight-module story

| # | Module | Learner output | Minutes |
|---|---|---|---:|
| 1 | See It. Control It. Protect It. | Readiness worksheet | 25 |
| 2 | Establish the Approved Agent Baseline | Actual actor/tool/data/evidence passport | 35 |
| 3 | Understand Identity, Authority, and Blast Radius | Authority diagram and justified boundary | 35 |
| 4 | Govern Creators, Access, and Lifecycle | Ownership/access/lifecycle decision | 40 |
| 5 | Protect Data and Record Control Evidence | Supported DLP result and owned Compliance Manager action | 40 |
| 6 | Recognize Agent Compromise and Misuse | Attributed identity/AI-native scenario evidence | 40 |
| 7 | Investigate and Contain in Defender / ISOC | Timeline, scoped response, retest/reset | 75 |
| 8 | Prove Readiness and Plan Adoption | Four findings and a 30-day pilot decision | 40 |

Proposed instruction: **330 minutes**. Onboarding 15 + lunch 45 + breaks 30 =
**420 minutes / seven hours**. Modules 1-2 alone: 60 instructional minutes plus
15 onboarding. Modules 3-8 are planned, not complete teaching packages.

## Start here

| Goal | Link |
|---|---|
| Read the whole story and first-release plan | [Master learning plan](docs/06-customer-learning-plan.md) |
| See what each module needs for data/automation | [Per-module preparation matrix](docs/06-customer-learning-plan.md#16-per-module-data-and-automation-preparation) |
| Understand source contributions | [Integration map](grounding/integration-map.md), [grounding index](grounding/sources.md) |
| Follow the customer/security pitch | [Delivery playbook](docs/02-baseline-agenda.md) |
| Plan the full day | [Agenda](docs/01-full-day-workshop.md) |
| Check actual package status | [Roadmap](docs/module-roadmap.md) |
| Review the existing onboarding code | [Logic App quick start](labs/logic-app/README.md), [deployment runbook](docs/05-onboarding-deployment-runbook.md) |

## What we incorporate

- **Cloud-Architekt Agent Identities:** security spine in all eight modules.
- **Microsoft Learn:** supported behavior, roles, schemas, licensing, prerequisites, and limits.
- **Stefano's a365-lab-toolkit:** candidate shared UI/runtime and documented internal-mail task.
- **Approved GBB material:** selected setup explanation, AI-workload cases, and hunting patterns.
- **Blue16 explainers:** inspiration for original secure-AI/ISOC explanations, not copied implementation.
- **New A365 Hub authoring:** customer activities, passports, evidence records, answer keys, reset, and pilot assessment.

The original anatomy module becomes **Module 3**. The first new Module 2 establishes
approved behavior before later modules investigate misuse. The maker-heavy
"Agent in a Day" path is an optional extension, not four extra builds in the core day.

## Safety and readiness

Use a **dedicated authorized lab environment**, never production. The repository
contains existing identity-provisioning and access automation; its presence is not
proof that the current event deployment works. Local operational notes report
cleanup disabled. Verify actual state, expiry, roles, CA, licensing, and teardown;
do not enable account-age deletion as a shortcut.

The candidate Mail task uses delegated-user authority; its sample name does not prove
OAuth OBO. Its documented setup includes a blueprint secret and powerful instructor
consents. Do not promise secretless workload authentication or proven least privilege.
TAP-based attendee onboarding is a different authentication claim.

E7 is a connected value/entitlement discussion after identifying the gap. Basic DLP,
ordinary XDR, and ISOC are not all E7-exclusive. Additional Azure, ingestion, retention,
and capacity costs require assessment.

No raw GBB extraction, credentials, tenant IDs, attendee data, or third-party assets
without confirmed reuse rights belong in this repository.

## Publishing

The [Pages workflow](.github/workflows/module-01-pages.yml) validates both packages
and publishes Module 1 at the existing root and Module 2 under `/module-02/`.
Published status is visible in the repository's Actions and Pages deployment.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [LICENSE](LICENSE).
