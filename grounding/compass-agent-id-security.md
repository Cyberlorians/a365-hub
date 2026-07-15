# Compass Security — Entra Agent ID from a Security Perspective (grounding)

Author: Christian Feuchter (Jun 2026). Research over ~2 weeks; schemas may change.
Source: see `sources.md`.

## Objects & credentials
- Blueprint = template (like app registration), holds credentials + required resource access.
- Blueprint principal = tenant-specific instance (like enterprise app), manages agent identities.
- Agent identity = primary agent auth account (SP). Agent user = optional secondary, behaves like a user.
- **Credentials only on the blueprint** (secrets, certs, federated). Not on principal/identity.

## Authentication flows (3)
- Autonomous agent app OAuth flow
- On-behalf-of OAuth flow
- Agent's user account OAuth flow
Token-exchange model: blueprint authenticates, obtains exchange token for a child agent identity,
which is used as a client assertion for the final resource token. **Blueprint holds credentials,
agent identity holds permissions** → blueprint compromise affects all child identities.

## Security-relevant capabilities
- **Entra roles:** Global Admin / Group Admin blocked; agents can't be members/owners of
  role-assignable groups. But **Exchange Admin, Windows 365 Admin** (can manage security groups),
  and (undocumented) **Security Reader** are assignable.
- **Azure RBAC:** no observed restrictions — agent identities can get **Owner** on Azure resources.
- **API permissions:** of 1041 tested, 97 blocked / 944 allowed. Dangerous ones still allowed:
  `Application.ReadUpdate.All`, `PrivilegedAccess.ReadWrite.AzureADGroup`,
  `PrivilegedAssignmentSchedule.ReadWrite.AzureADGroup`,
  `PrivilegedEligibilitySchedule.ReadWrite.AzureADGroup`,
  `RoleAssignmentSchedule.ReadWrite.Directory`, `RoleEligibilitySchedule.ReadWrite.Directory`,
  plus `ADSynchronization.ReadWrite.All`. (`Application.ReadWrite.All` blocked but
  `Application.ReadUpdate.All` allowed → still add app credentials.)
- **Inheritable permissions:** must be (a) allowed on blueprint (specific or `allAllowed` per
  resource) and (b) consented on blueprint principal. Not visible on the agent identity object.
  `AgentIdentity.CreateAsManager` is ALWAYS in the blueprint principal token, even if not visibly
  consented → a blueprint principal can always create child agent identities.
- **Cross-tenant:** multitenant blueprints → agent identities as cross-tenant SPs. Two-step consent
  (create blueprint principal, then grant/consent perms). Inheritable perms work cross-tenant.

## Control & ownership (who can take over)
Full control of a blueprint via: **blueprint owners**, **Agent ID Administrator**, **AI Administrator**,
Graph `AgentIdentityBlueprint.AddRemoveCreds.All` and `AgentIdentityBlueprint.ReadWrite.All`.
Notably **Cloud Application Administrator / Application Administrator could NOT** control Agent ID
objects. Sponsors have no technical control (except adding sponsors).

## Example attacks
1. **Ownership abuse** — blueprint owner adds a secret → auth as child agent identity holding
   `RoleAssignmentSchedule.ReadWrite.Directory` → assign Global Admin to attacker.
2. **Agent ID consent phishing** — attacker publishes a multitenant blueprint with `allAllowed`
   inheritable Graph perms + required resource access; admin consents → blueprint principal created
   in victim tenant with `AgentIdentity.CreateAsManager` → attacker creates a child agent identity →
   inherits `Application.ReadUpdate.All` → adds credentials to existing app registrations.

## Discovery / tooling
**EntraFalcon** (open-source PowerShell) enumerates blueprints, principals, agent identities, agent
users; flags foreign blueprints, dangerous perms (~80 mapped to risk), privileged roles/RBAC,
inactive agents, and blueprints owned by non-Tier-0 users (17 automated Agent ID checks).

## Recommendations
Treat as highly privileged: Agent ID Administrator, AI Administrator,
`AgentIdentityBlueprint.AddRemoveCreds.All`, `AgentIdentityBlueprint.ReadWrite.All`, blueprint
owners of privileged child objects. Least privilege + strong MFA + strict Conditional Access +
regular review. Prefer delegated over application permissions. Scrutinize consent to foreign blueprints.
