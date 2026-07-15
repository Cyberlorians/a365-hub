# A365 Hub — Baseline Agenda & Delivery Playbook

**This is the canonical, repeatable version of the workshop.** Run it as-is for any customer.
It teaches agentic identity end-to-end, proves the risk in a live SOC (Defender XDR + Sentinel),
and lands the business outcome: **sell E7 / Microsoft Agent 365 with identity protection as the hero.**

- Detailed timeboxed run-of-show: [`01-full-day-workshop.md`](01-full-day-workshop.md)
- Module map: [`00-project-outline.md`](00-project-outline.md) · Grounding: [`../grounding/`](../grounding/)
- Onboarding & access (repeatable deploy): [`03-onboarding-access.md`](03-onboarding-access.md)

---

## 1. The play (why this exists)

**Narrative arc:** *Agents are arriving in your tenant whether you plan for them or not → each agent
is a real identity with real permissions → an ungoverned agent identity is a tenant-takeover path →
Microsoft Agent 365 + E7 + the Entra identity stack + your SOC are how you get the value safely.*

**Hero message:** it's not "AI is scary." It's **"agents are identities, and identity protection is
the control plane."** E7 / Agent 365 is the enablement; Entra Agent ID + XDR + Sentinel is the
protection. Sell the protection, and the platform comes with it.

**Three proof points we land during the day:**
1. **Visibility** — you can *see* every agent identity, its owner, and its permissions (Entra + XDR `AIAgents`).
2. **Risk** — an over-privileged / foreign blueprint is a real cross-tenant compromise path (live demo).
3. **Control** — you can detect (Sentinel/XDR) and contain (disable + Conditional Access) in minutes.

---

## 2. Objectives (dual: learn + sell)

| Learning objective | Selling objective it supports |
|---|---|
| Distinguish GenAI vs Agentic AI vs AI Agents | Establish that agents are coming → need a plan |
| Build agents (Copilot Chat, Copilot Studio, tools, autonomous) | Show E7 / Agent 365 value hands-on |
| Understand Agent ID anatomy + blast radius | Create urgency: ungoverned = tenant risk |
| Hunt agents in XDR + Sentinel, write detections | Prove the SOC story (XDR + Sentinel) |
| Detect, disable, and govern agents | Land identity protection as the buying reason |

---

## 3. Baseline structure (repeatable spine)

Each block = **Build → Reveal the identity → Secure/Detect → Value moment.**

| # | Block | Build (Agent in a Day lab) | Identity / SOC overlay | Value / upsell moment |
|---|---|---|---|---|
| 0 | Frame | — | GenAI vs Agentic vs Agents; "agents are identities" | Why a plan is needed now |
| 1 | Declarative agent (Copilot Chat) | Lab 1 | Agent identity vs classic SP; where agents originate | E7 / Copilot value |
| 2 | Conversational agent (Copilot Studio) | Lab 2 | Agent ID anatomy: blueprint→principal→identity→user | Agent 365 governance |
| 3 | Tools & permissions | Lab 3 | Direct/inheritable/restricted perms; **blast radius** | Entra Agent ID controls |
| 4 | Autonomous agent | Lab 4 | Autonomy raises stakes; Tier-0 perms still assignable | Conditional Access / P2 |
| 5 | Attack path (demo) | — | Cross-tenant blueprint → TAP → Global Admin | Urgency: this is real |
| 6 | SOC: detect (XDR + Sentinel) | — | `AIAgents` hunting; Sentinel analytics rule + workbook | SOC value; Sentinel upsell |
| 7 | Capture the Flag (KQL-scored) | reuses Labs 1–4 artifacts | Find over-privileged / foreign / secret blueprints | Reinforce + engage |
| 8 | Teardown + business wrap | — | Disable/delete agents; clean tenant | The ask / next steps |

> Labs = Microsoft "Agent in a Day" modules (see `../grounding/sources.md`). Learners' own built
> agents become the **CTF targets** and the **detection data** — one dataset, used three ways.

---

## 4. SOC integration (XDR + Sentinel)

Wire the customer's (or lab) SOC so the security story is *lived*, not slideware:

- **Defender XDR — Advanced hunting:** query the `AIAgents` table + `IdentityLogonEvents` /
  `CloudAppEvents` / `AADSignInEventsBeta`. Build queries in `../detections/`.
- **Sentinel:** ingest Entra audit + sign-in logs; ship the same hunting logic as **Analytics Rules**
  and a **"Agent Identity Overview" workbook** (agents by owner, permission risk, foreign blueprints,
  new-credential events). Optional: Sentinel **playbook (Logic App)** to auto-disable on detection.
- **Custom detections to ship (baseline pack):**
  1. Credential added to an agent blueprint (audit).
  2. Agent identity granted a Tier-0 permission (`UserAuthMethod-*`, `RoleAssignmentSchedule.ReadWrite.Directory`, Azure Owner).
  3. TAP created by a service/agent identity.
  4. Agent sign-in from a first-seen/unusual location.
  5. Foreign (externally published) blueprint consented in-tenant.

---

## 5. Capture the Flag (fun + KQL-tracked)

- **Dual-track scoring:** portal challenges (navigate Entra Agents) **and** KQL challenges (hunt in
  XDR/Sentinel). Not all KQL — keep it approachable, but KQL is how we *track & score*.
- **Sample flags:** find the agent with the most permissions; identify the foreign blueprint; find the
  blueprint authenticating with a secret; catch the credential-add event; write a detection that fires
  on a planted "malicious" agent.
- **Scoreboard:** a Sentinel workbook or KQL leaderboard tallies solves → doubles as a live SOC demo.
- Learners' own Agent-in-a-Day builds seed the CTF, so everyone has skin in the game.

---

## 6. Repeatability kit (what makes this a product, not a one-off)

- [ ] Instructor run-of-show one-pager + timing card.
- [ ] Learner prereq + temporary-licensing checklist (build → teardown).
- [ ] Naming convention for lab artifacts (e.g., `wksp-<initials>-agent`) so CTF + cleanup are clean.
- [ ] Slide decks per block (markdown → .pptx) in `../slides/`.
- [ ] Lab guides (Agent in a Day overlay + portal walkthroughs) in `../labs/`.
- [ ] Baseline detection pack + Sentinel workbook + CTF answer key in `../detections/`.
- [ ] Sales overlay: value-moment talk track + the ask, mapped to each block.
- [ ] Environment provisioning script/checklist (spin up + tear down the lab tenant).

---

## 7. Selling E7 / Agent 365 — value-moment cheat sheet

| Moment in the day | What they feel | The line |
|---|---|---|
| Build first agent | "This is easy and useful" | E7 / Agent 365 makes agents first-class |
| See the agent identity | "Oh, that's a real identity" | Every agent needs governance |
| Blast radius | "One blueprint = many identities/tenants" | This is why identity protection matters |
| Attack demo | "That's a tenant takeover" | Urgency — you need this before you scale agents |
| Detect in XDR/Sentinel | "We can see and stop it" | The SOC + Entra stack delivers it |
| Teardown | "We stayed in control" | Repeatable governance = confidence to adopt |

---

## 8. Open items to confirm per engagement
- Lab tenant: Agent 365 / E7 licensed? XDR + Sentinel available for the SOC blocks?
- Live attack demo vs. narrated/recorded (isolated tenant required for live).
- `AIAgents` table schema/columns available in the target tenant (validate before CTF).
- Audience mix (makers vs. SOC vs. decision-makers) → tune build-depth vs. sell-depth.
