# Module 1 direction, registry grounding, and admin seeding (grounding)

**Saved October 30, 2026.** Decisions from the working sessions plus the Microsoft Learn
and toolkit facts they rest on. Re-check Learn and the actual tenant before delivery.

## Direction (owner decisions)

- Students **learn**. Admins **populate** all lab data on the backend by script. Students do
  no GUI setup and build no agents.
- Module 1 teaches one story: *an agent was abused, here is what we found.* Admin plants the
  evidence; the instructor tells it.
- Teach the objects: blueprint (holds credentials), blueprint principal, agent identity
  (holds permissions), agent user (optional).
- Labs are real actions only. No quizzes, no note-taking, no "look at the picture".
- Student deck and instructor deck are separate. The instructor deck says what to show,
  say, and recover from.
- Reuse everything from Stefano's toolkit, GBBLabs, Cloud-Architekt, Datadog, Compass and
  Blue16 as *admin seed data and teaching content*, not student GUI work.
- Module map: 1 see it (registry), 2 use the agent, 3 identity behind it, 4 govern,
  5 data (Purview), 6 misuse, 7 investigate (Defender/ISOC), 8 adopt (E7).

## The incident story (Module 1, slide 6, 8, 9)

Sources: Compass "ownership abuse" example, Datadog Part 2 path, Cloud-Architekt chapter.

1. Someone with Agent ID Administrator or blueprint-owner rights **adds a secret to the
   blueprint** (audit: Core Directory / ApplicationManagement / certificates and secrets).
2. They authenticate through the two-step token exchange and **act as a child agent
   identity** that holds a powerful permission (for example
   `RoleAssignmentSchedule.ReadWrite.Directory` or `UserAuthMethod-TAP.ReadWrite.All`).
3. They **set a Temporary Access Pass on an administrator** and sign in without password or MFA.
4. Separately, **hidden instructions in content** (indirect prompt injection) can steer a
   correctly signed-in agent with no new sign-in event.

## Agent 365 registry (Microsoft Learn)

- Path: **Microsoft 365 admin center -> Agents -> All agents -> Registry**
  (`admin.microsoft.com`).
- Least-privilege role to view: **AI Reader** (or AI Administrator). Viewing the inventory
  needs no extra license.
- Summary cards: **Total agents**, **Agents without owners** (creator deleted),
  **Unmanaged agents** (built outside Agent 365). Filters do not change Total agents.
- **Risks column / Risk details** show signals from Microsoft Purview, Entra and Defender.
  Prerequisite: tenant has an **E7 or Agent 365 license**. Counts can lag up to an hour.
  Zero means no active signals, not proof of safety.
- Details pane actions to avoid in class: **Block, Install, Uninstall, Pin for users**.
- Copilot Studio agents appear in the registry on their own once created and shared.
  Blueprint agents must be registered to appear.
- Learn pages: `learn.microsoft.com/microsoft-agent-365/admin/agent-registry-overview`,
  `.../agent-details`, `learn.microsoft.com/entra/agent-id/agent-registry-convergence`.

## Admin seeding (Stefano's toolkit, `setup-MAF-ACA-OBO.md`)

- `a365 setup requirements`, then `a365 setup all --m365 --agent-name "<name>"` creates the
  agent identity and registers it so it appears under All agents / Registry. The messaging
  endpoint is deferred, so extra agents need no deployment.
- Run one `a365 setup` at a time: each opens its own sign-in window.
- "Client app not found in tenant": follow toolkit section 0.1, then re-run requirements.
- Optional: create a Copilot Studio agent as a throwaway user and hard delete that user to
  produce an ownerless agent. Untested.

## Verified in this work

- Lab 1-2 flow run live with a test lab user (form -> Logic App -> 8-hour TAP -> Outlook).
- Student and instructor decks build and pass `node scripts/check-workshop.mjs`.

## Not verified

- Whether the Project Beacon (ACA-OBO) agent appears in the registry.
- Which Details-pane fields a lab user sees with AI Reader.
- The `a365` seeding commands, Module 2 end to end, and any GCC High behavior (scripts and
  the Logic App target commercial endpoints).
- Lab 3 portal pictures are illustrations, not real screenshots.

## Next work

1. Admin seed script for the incident: credential-add audit entry, first-seen sign-in,
   ownerless agent, using the Cloud-Architekt queries and GBB scenarios.
2. Rewrite slides 12-15, 17-18 in plain language; add Blue16 ISOC points
   ($2.40/GB non-Microsoft data, ISOC for E5/E7/Defender Suite) as the E7 close.
3. Sync `slides.md` and the learner guide bodies with the rewritten HTML.
4. Later portal labs (kept in `scripts/workshop-lab-content.mjs`, unused): Entra agent
   identity and permissions, Conditional Access for agents, Purview DLP and Compliance
   Manager, Defender incidents.
5. Delete the `module.one.tester` account if the cleanup Logic App did not.
