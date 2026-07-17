# A365 Hub — Full-Day Workshop Agenda

**Format:** Instructor-led, ~1 day (7 hrs content + breaks). Blends Microsoft's **"Agent in a Day"**
builder track with the A365 Hub **identity & security** track, so learners *build* an agent, then
*see its identity*, *secure it*, and *detect abuse of it*.

- MS Learn path (build): https://learn.microsoft.com/training/paths/agents-online-workshop/
- Instructor-led "Agent in a Day": https://aka.ms/AGIAD
- Grounding: [`../grounding/`](../grounding/) · Module map: [`00-project-outline.md`](00-project-outline.md)

**Prereqs per learner:** every attendee is **temporarily licensed** with an M365 Copilot / Copilot
Studio environment, Entra admin center access to a shared safe lab tenant, and Defender XDR access
(advanced hunting). Because licensing is temporary, all build blocks are **fully hands-on** and the
day ends with a **teardown/deprovision** step (Block 8).

---

## The "build it and secure it" spine

| MS Learn module (build) | A365 Hub overlay (secure) |
|---|---|
| Build agents in Copilot Chat (declarative) | What identity did that create? Classic app/SP vs. agent identity |
| Build a conversational agent in Copilot Studio | Agent ID objects: blueprint → principal → agent identity → agent user |
| Use tools in Copilot Studio | Permissions: direct vs. inheritable vs. restricted; blast radius |
| Make your agent autonomous | Attack paths + detect/respond/govern; disable & Conditional Access |

---

## Timeboxed agenda

### 08:30 – 09:00 · Welcome & framing (0:30)
- Generative AI vs Agentic AI vs AI Agents (ref image 2).
- The day's promise: build four agents, and secure/detect each one.
- Lab tenant + access check.

### 09:00 – 10:00 · Block 1 — Declarative agent in Copilot Chat (1:00)
- **Build (MS):** create a customer-service declarative agent from template + from scratch.
- **Secure (A365):** inspect the resulting identity. Agents *with* vs *without* agent identities;
  where agents show up (Copilot Studio, Foundry, Security Copilot, Agent 365 / E7).

### 10:00 – 10:15 · Break

### 10:15 – 11:30 · Block 2 — Conversational agent in Copilot Studio (1:15)
- **Build (MS):** import solution, build with natural language, add knowledge sources.
- **Secure (A365):** Anatomy of Entra Agent ID — the four objects; credentials live only on the
  blueprint; the two-hop token exchange. Portal walkthrough: Entra ID → Agents.

### 11:30 – 12:30 · Block 3 — Tools & permissions (1:00)
- **Build (MS):** add tools, build a custom prompt, run an order cancellation via agent flow.
- **Secure (A365):** permissions model — direct / inheritable / restricted; review Access → Granted
  permissions; **the blueprint blast radius** (anchor deck from Datadog part 1).

### 12:30 – 13:15 · Lunch

### 13:15 – 14:15 · Block 4 — Autonomous agents (1:00)
- **Build (MS):** autonomous triggers, conditional triggers, test/validate, monitor, publish.
- **Secure (A365):** why autonomy raises the stakes — over-privileged agents, Tier-0 permissions
  still assignable (`UserAuthMethod-*`, `RoleAssignmentSchedule.ReadWrite.Directory`, Azure Owner).

### 14:15 – 15:00 · Block 5 — Attack paths (0:45)
- Story-driven demo: cross-tenant blueprint compromise → TAP → Global Admin (Datadog part 2).
- Ownership abuse & consent phishing (Compass). Enterprise AI security best-practices overlay (image 1).

### 15:00 – 15:15 · Break

### 15:15 – 16:15 · Block 6 — Detect, respond, govern (1:00)
- Audit/sign-in mapping (`agentType`, `agentSignIn`; create = "add service principal").
- Defender XDR `AIAgents` table + advanced hunting; deploy a **custom detection rule** together.
- Respond: disable (object-scoped) + 3 Conditional Access block policies (report-only first).

### 16:15 – 16:55 · Block 7 — Capture the Flag (0:40)
- Mixed challenges (not all KQL): find the over-privileged agent, the foreign blueprint, the
  secret-authenticating blueprint; write one detection. Scoreboard + prizes.

### 16:55 – 17:10 · Block 8 — Teardown & wrap (0:15)
- Disable/delete the agents and blueprints each learner created (object-scoped disable in the portal;
  delete via Microsoft Graph). Confirm no orphaned agent identities/blueprints remain.
- Reconcile temporary license reclamation + lab-tenant cleanup checklist.
- Wrap & next steps; share the repo + takeaways.

---

## Facilitator notes
- Each block = ~30–45 min build + 20–30 min secure. Keep the lab tenant separate from anything real.
- All attendees are temporarily licensed → every build block is hands-on; still keep pre-baked agents +
  screenshots as a fallback so the security overlay runs even if a learner's build stalls.
- Attack demos are **read-only / narrated** unless run in an isolated throwaway tenant.
- Temporary licensing = plan reclamation: track who built what, and run Block 8 teardown before licenses
  expire so nothing is left dangling (dangling agent identities/blueprints are a real risk, not just cleanup).

## To build for delivery (backlog)
- [x] Module 1 content package (slides, notes, exercise, handout, facilitator guide).
- [ ] Apply visual design/export to Module 1 and build slide packages for Blocks 1–8.
- [ ] Portal walkthrough lab + screenshots in `labs/`.
- [ ] `AIAgents` advanced-hunting queries + 3 custom detections in `detections/`.
- [ ] CTF challenge set + answer key + scoreboard.
- [ ] Instructor run-of-show one-pager + learner prereq checklist.
