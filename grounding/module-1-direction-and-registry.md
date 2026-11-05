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

## Microsoft Learn: Agent 365 learning (read before changing slides 10-11, 17)

- Overview: `learn.microsoft.com/microsoft-agent-365/overview`. Agent 365 = **observe, govern, secure**.
  Observe = the single registry (plus agent map); Govern = lifecycle, access control and compliance
  through the registry, Entra and Purview; Secure = Entra risk-based access, Purview DLP and data risk,
  Defender threat detection.
- Availability: generally available for the **Commercial** segment since **May 1, 2026**, licensed **per
  user**. Works best with **Microsoft E5**. At least one user needs a qualifying Agent 365 license.
  Check plans and pricing on Learn before quoting.
- More: `/microsoft-agent-365/get-started`, `/microsoft-agent-365/admin/agent-registry-overview`,
  `/microsoft-agent-365/guidance/govern-agents-support-innovation`,
  `/microsoft-365/copilot/agent-essentials/agent-essentials-overview`.

## Lab 3 finding, November 5, 2026 (learner could not see Project Beacon)

- Root cause: nothing in Module 1 registers an agent. The agent appears in the registry only after
  `a365 setup all` (toolkit setup section 4: it "registers the agent (appears in All agents / Registry)",
  endpoint deferred). Our runbook first ran it in Module 2 Step 4, after Lab 3.
- Name mismatch: `Initialize-Workshop.ps1` wrote the registry display names as
  "A365 Hub <run> Identity/Blueprint". Fixed to **Project Beacon Mail Agent** (+ " Blueprint").
  An existing `a365.config.json` keeps old names: edit by hand.
- Registration needs no deployment. `Read-WorkshopConfig` only checks the FORMAT of the Azure OpenAI fields,
  so placeholder names work for Lab 3 only (from the code, not run).
- Trap: every `a365 setup all` overwrites `a365.generated.config.json` and `.env` in the same folder, and
  `Deploy-Workshop.ps1` reads them. Register optional extra agents FIRST and Project Beacon LAST.
- The admin guide `docs/09-admin-lab-by-lab.md` now has "Populate Lab 3" with the ordered commands. The
  instructor deck slide "Lab 3: register Project Beacon before class" matches.
- Still unverified in a live tenant: the registry showing the agent, how long it takes, the AI Reader
  assignment snippet and the beta Graph check. My CLI session was a different (US Gov) tenant, so I could
  not run `a365` there.

## Live run, November 2, 2026 (new test user "Walkthrough Tester Two")

- Form `aka.ms/a365hub` submitted: account `walkthrough.tester.two@DibSecurity.onmicrosoft.com` and an
  8-hour pass arrived by email in about 2 minutes. Lab 1 works.
- Signed in with the pass and the mailbox opened. Lab 2 works.
- Lab 3 not runnable: the admin center returned an empty page (HTTP 401) for the lab user, so a read-only
  role (AI Reader) must be assigned first. Roles cannot go to a plain group; assign to users.
- The access email's "Step 2" says to build agents in Copilot Studio and open Entra and Defender. Our labs do
  not. Ignore it or edit the Logic App email.
- Registry name bug fixed: the runbook registered the agent as `A365 Hub <run>`, so Lab 3's
  "find Project Beacon" would not match. Use `Project Beacon Mail Agent`.
- Delete the test users `module.one.tester` and `walkthrough.tester.two` if the cleanup Logic App does not.

## Reuse warning: playbook images

Do **not** embed images from Cloud-Architekt `media/ai-agent-identities/`. Its
`THIRD_PARTY_NOTICES.md` says that folder includes MITRE ATT&CK material and Microsoft
diagrams or screenshots that the repository's MIT license does not cover. Module 1 slides 8
and 9 use **original inline SVG** drawings instead, with the playbook cited as the source.
Text and concepts can be cited and re-expressed; link to the figures, do not copy them.

## Not verified

- Whether the Project Beacon (ACA-OBO) agent appears in the registry.
- Which Details-pane fields a lab user sees with AI Reader.
- The `a365` seeding commands, Module 2 end to end, and any GCC High behavior (scripts and
  the Logic App target commercial endpoints).
- Lab 3 portal pictures are illustrations, not real screenshots.

## Next work

0. **Blue16 Secure AI explainer, mapped to our modules** (inspiration only: redraw in our own
   words, never copy text, code or artwork; preview features, not GA claims):
   - M1 slides 6/10: "Agents are the new insider risk." Three needs map to See / Control /
     Protect: *observe everything* (which agents, who owns them, what they reach), *contain what
     the agent can do*, *operate at machine speed*. Line: "Contain the agent, not the employee."
   - M1 slide 9 / M3: "Don't ask a model to be its own security authority. Keep controls over
     access, actions and whether it may keep running outside the model."
   - M3: identity is the foundation. Natively integrated agents (Copilot Studio, Foundry, Agent
     365 SDK) get an Agent ID from the platform; discovered agents (Defender + Entra GSA signals)
     get one from Entra. Ties to shadow-AI discovery.
   - M4: Dynamic Permissions (agent starts at zero; task-specific, time-bound grants) versus
     Dynamic Conditional Access (graduated: allow, constrain, human approval, restrict data,
     block). Good comparison table.
   - M6: containment layers for local agents: endpoint (Defender), runtime, network (Entra GSA),
     data (Purview DLP). Caveat from the source: attribution is best effort; do not promise
     perfect isolation.
   - M7: one dynamic risk level per agent fusing runtime signals, exposure and blast radius.
     Source says its algorithm is unpublished and its demo is illustrative.
   - M8: ME5 + Agent 365 + Entra Suite coverage, red/blue/green "Guardian agent" teams, roadmap.
     Everything announced was limited private preview on Oct 19, 2026. Use as outcome language,
     never as a pricing or availability authority.
   - Format idea: a clickable layer diagram as an instructor-led visual. No student quizzes.
1. Admin seed script for the incident: credential-add audit entry, first-seen sign-in,
   ownerless agent, using the Cloud-Architekt queries and GBB scenarios.
2. Rewrite slides 12-15, 17-18 in plain language; add Blue16 ISOC points
   ($2.40/GB non-Microsoft data, ISOC for E5/E7/Defender Suite) as the E7 close.
3. Sync `slides.md` and the learner guide bodies with the rewritten HTML.
4. Later portal labs (kept in `scripts/workshop-lab-content.mjs`, unused): Entra agent
   identity and permissions, Conditional Access for agents, Purview DLP and Compliance
   Manager, Defender incidents.
5. Delete the `module.one.tester` account if the cleanup Logic App did not.
