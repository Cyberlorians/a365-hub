# A365 Hub — Project Outline

**Goal:** Onboard a customer into the tenant and teach agentic identity end-to-end — from concepts,
through Microsoft Entra Agent ID and Microsoft Agent 365 (E7), to hands-on portal navigation, a light
capture-the-flag (CTF), and custom detections in Microsoft Defender XDR (`AIAgents` table, advanced
hunting).

> Status: active development. Infrastructure is working; curriculum modules remain in
> progress. See the [module development roadmap](module-roadmap.md) for current status and
> acceptance criteria. Grounding lives in [`../grounding/`](../grounding/).

---

## 1. Audience & outcomes

**Audience:** Customer security/identity teams new to AI agents in Microsoft 365 / Entra.

**By the end, a learner can:**
- Distinguish Generative AI vs. Agentic AI vs. AI Agents, and where Agent ID / Agent 365 fit.
- Name the Agent ID objects (blueprint, blueprint principal, agent identity, agent user) and how they
  authenticate.
- Navigate the Entra admin center Agents experience and inventory agents + permissions.
- Explain the blast radius of a blueprint compromise and the main attack paths.
- Hunt agent activity in Defender XDR and write/deploy a custom detection rule.
- Disable/contain a compromised agent (object-scoped + Conditional Access).

---

## 2. Curriculum modules

### Module 1 — E7 and Agent 365 value story
- Why agents create a new visibility and control gap.
- Agent 365 as the control plane to observe, govern, and secure agents.
- Microsoft Entra Agent ID as the security foundation.
- Microsoft 365 E7 as the integrated path to controlled agent adoption.
- Deliverable: [simple 10–15 minute package](../slides/module-01/README.md) with an
  eight-slide interactive deck, speaker notes, facilitator guide, source map, and workshop
  permission preflight. Technical taxonomy remains available as supporting material.

### Module 2 — Anatomy of Entra Agent ID  ⭐ (anchor: Datadog "Blueprint Blast Radius")
- The four objects and how they map to app reg / SP / user.
- Permissions: direct, inheritable, restricted.
- Authentication: credentials live only on the blueprint; the two-hop token exchange.
- The blast radius: 1 blueprint → many identities → many tenants.
- Deliverable: anatomy slides + a diagram (blueprint → principal → identities → users).

### Module 3 — Portal walkthrough (hands-on)
- Entra ID → Agents: create a blueprint, an agent identity, view an agent user.
- Review Access → Granted permissions (admin consent / user consent / Entra roles).
- Inspect a blueprint's credentials, owners, inheritable permissions.
- Deliverable: guided lab in `labs/` with screenshots + checkpoints.

### Module 4 — Attack paths (demo / storytelling)
- Cross-tenant blueprint compromise → TAP → Global Admin (Datadog part 2).
- Ownership abuse & consent phishing (Compass).
- Enterprise AI security best-practices overlay (ref: `grounding/reference-images.md`, Image 1).
- Deliverable: attack-path slides + optional scripted walkthrough (read-only, safe lab tenant).

### Module 5 — Detect, respond, govern
- Audit/sign-in mapping: agent create = "add service principal"; `agentType`, `agentSignIn`.
- Blueprint credential-add detection; secret-using blueprint discovery.
- Defender XDR `AIAgents` table + advanced hunting; custom detection rules in `detections/`.
- Respond: disable (object-scoped) + 3 Conditional Access block policies (report-only first).
- ID Protection for risky agents (P2).
- Deliverable: detection pack + response runbook.

### Module 6 — Capture the Flag (light)
- Mixed challenges (not all KQL): portal scavenger hunt, "spot the over-privileged agent,"
  find the foreign blueprint, identify the secret-authenticating blueprint, write one detection.
- Deliverable: CTF challenge set + answer key + scoring.

---

## 3. Repository plan

```
a365-hub/
├─ README.md
├─ docs/
│  └─ 00-project-outline.md        ← this file
├─ grounding/
│  ├─ sources.md
│  ├─ datadog-agent-id-series.md
│  ├─ compass-agent-id-security.md
│  ├─ ms-learn-disable-agent-identities.md
│  └─ reference-images.md
├─ slides/                          ← markdown source per module → .pptx
├─ labs/                            ← portal walkthroughs, CTF
└─ detections/                      ← KQL / advanced hunting, AIAgents table
```

---

## 4. Hands-on assets to build (backlog)

The detailed ownership, module boundaries, and definition of done are maintained in the
[module development roadmap](module-roadmap.md).

- [ ] Module 2 slide deck (markdown → .pptx) from the Blueprint Blast Radius outline.
- [ ] Agent ID anatomy diagram.
- [ ] Portal walkthrough lab (Module 3).
- [ ] Detection: blueprint credential added (audit-based).
- [ ] Detection: agent identity assigned Tier-0 permission (`UserAuthMethod-*`, `RoleAssignmentSchedule.ReadWrite.Directory`).
- [ ] Detection: TAP created by a service/agent identity.
- [ ] Advanced hunting queries against the `AIAgents` table (XDR).
- [ ] Conditional Access block policies (3 templates, report-only).
- [ ] CTF challenge set + answer key.

---

## 5. Open questions / to confirm

- Which tenant is the demo/lab tenant, and is Agent 365 / E7 licensed there?
- Confirm the `AIAgents` XDR table schema/columns available in the target tenant.
- Live demo vs. recorded/screenshot walkthroughs for the attack module.
- Depth of CTF (portal-only vs. Graph API challenges).
