# Microsoft Learn — Disable Agent Identities in Your Tenant (grounding)

Source: https://learn.microsoft.com/entra/agent-id/disable-agent-identities

## Two kinds of AI agents in a tenant
- **With agent identities** — created in Entra Agent ID or recent Copilot Studio / Azure AI Foundry /
  Security Copilot. Rich metadata, agent-specific security controls.
- **Without agent identities** — older Copilot Studio / Foundry agents created as classic apps/SPs.
  May carry tags marking them as AI agents, but governed like any other app/SP.

## Monitoring agent activity (audit/sign-in mapping)
Agent activities log under their base identity type:
- Creating an agent identity → **"add service principal"** in audit logs.
- Adding an agent blueprint → **"add application"** in audit logs.
- Check the **`agentType`** property on `initiatedBy` and `targetResources` — any value other than
  `notAgentic` indicates agent involvement.
- The **`agentSignIn`** resource type classifies sign-ins as agentic.

## Approaches to disabling
- **Object-scoped (Entra admin center):** disable a specific blueprint or agent identity.
  Entra ID → Agents → Agent identities / Agent blueprints → select → **Disable**. Requires **Agent ID
  Administrator**. Keeps the object + metadata but blocks token issuance.
- **Tenant-wide (Conditional Access, requires P1):** block token issuance for broad categories.
  Recommended in **report-only** mode first.

### Three CA policy templates
1. **Block agent identity authentication** — Include *All agent identities* → Block.
   Graph: `clientApplications.includeAgentIdServicePrincipals = ["All"]`.
2. **Block agent's user account authentication** — Include *All agents acting as users* → Block.
   Graph: `users.includeUsers = ["AllAgentIdUsers"]`.
3. **Block users signing into agents** — Include *All users*, target *All agent resources* → Block.
   Graph: `applications.includeApplications = ["AllAgentIdResources"]`.

## (Optional) Block creation of agent identities
- Remove eligible/active **Agent ID Administrator** and **Agent ID Developer** assignments.
- Remove grants of: `AgentIdentity.Create.All`, `AgentIdentityBlueprint.Create`,
  `AgentIdentityBlueprint.ReadWrite.All`, `AgentIdentityBlueprintPrincipal.Create`,
  `AgentIdentityBlueprintPrincipal.ReadWrite.All`, `AgentIdUser.ReadWrite.IdentityParentedBy`,
  `AgentIdUser.ReadWrite.All`, `User.ReadWrite.All` (note: also manages human users).
- **Block ISV agents:** restrict user consent (broad — also affects legit SaaS) or rely on CA blocks.
- **Block per Microsoft product:** Security Copilot (remove SCU capacity / workspace owners),
  Copilot Studio (licensing/RBAC/data policies), Azure AI Foundry (subscription + project + Azure AI
  User roles), Teams (Teams admin center app controls).

## Caution
Disabling can break running agents and Microsoft experiences that assume agent identities
(Copilot Studio agents, Security Copilot scenario agents, Entra Conditional Access Optimization Agent).
