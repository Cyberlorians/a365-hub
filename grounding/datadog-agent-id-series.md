# Datadog Security Labs — Entra Agent ID Series (grounding)

Source: Datadog Security Labs, author Katie Knowles. Three-part series. Summarized here as
teaching grounding; see `sources.md` for URLs.

---

## Part 1 — The Blueprint Blast Radius

**Thesis:** Entra Agent ID extends Entra's application model. Unlike a classic app registration
(1 app reg → 1 service principal per tenant), a single **blueprint** can back **many** identities
across **many** tenants — dramatically increasing the blast radius of a compromise.

### The four new objects

| Object | Subtype of | Role |
|--------|-----------|------|
| **Agent identity blueprint** | App registration | Template: display name, config, and the **credentials** that authenticate every identity under it |
| **Blueprint principal** | Service principal | Tenant-local instance of the blueprint; can create/authenticate agents in that tenant. Always carries `AgentIdentity.CreateAsManager` |
| **Agent identity** | Service principal | The worker identity for an individual agent instance. Up to **250 per blueprint per tenant** |
| **Agent user** | User | Optional user account per agent identity — can have a mailbox, join Teams, etc. Created only via Graph `/beta/users/microsoft.graph.agentUser` |

Created in Entra admin center under **Entra ID → Agents** (blueprints + agent identities), or via
Microsoft Graph. Blueprint principals and agent users have limited/no portal management today.

### Permissions model
- **Direct** — app/delegated permissions or Entra roles assigned directly to an identity.
- **Inheritable** (`inheritablePermissions`) — delegated permissions defined on the blueprint; if
  granted to the blueprint principal, inherited by all agent identities. **Not visible** on the
  agent identity object — must inspect the blueprint + blueprint principal to know effective perms.
- **Restricted** — many Tier-0 roles/permissions (e.g., Global Admin) are blocked from agents, but
  **not all** (Exchange Admin, Global Reader, `UserAuthMethod-*`, etc. remain assignable).

### Authentication (credentials live ONLY on the blueprint)
Credentials cannot be added to blueprint principals, agent identities, or agent users — only the
blueprint. Authenticating as an agent is a **two-hop token exchange**:
1. Blueprint credential → `client_credentials` grant → blueprint principal token
   (audience `api://AzureADTokenExchange/.default`, `fmi_path` = target agent identity OID).
2. That token → second `client_credentials` grant (`client_assertion`) → agent identity token
   (audience = target resource, e.g., Microsoft Graph).

### The blast radius
Whoever controls the blueprint controls **every** identity + permission context under it — more
identities and more permission contexts than a classic app. Cross-tenant (third-party / "agent
factory") blueprints extend this across tenant boundaries → Midnight Blizzard–style risk.

---

## Part 2 — Inside a Cross-Tenant Agent Compromise

Demonstrated attack path (uses Microsoft Graph because portal support is limited):

1. **Compromise a blueprint** — attacker with **Agent ID Administrator** adds a credential via
   `POST /beta/applications/{blueprintAppId}/addPassword` → gets `secretText`.
2. **Discover affiliated tenants** — find a guest user's domain, resolve tenant ID via
   `/.well-known/openid-configuration`.
3. **Authenticate in the second tenant** — `client_credentials` with the blueprint secret returns a
   blueprint principal token carrying `AgentIdentity.CreateAsManager`.
4. **Enumerate agents** — `GET /beta/serviceprincipals/Microsoft.Graph.AgentIdentity?$filter=agentAppId eq '...'`.
5. **Pivot to a privileged agent** — double token exchange to become e.g. "Temporary Access Agent"
   holding `UserAuthMethod-TAP.ReadWrite.All` + `User.Read.All`.
6. **Escalate to Global Admin** — set a **TAP** on a `globaladmin` user
   (`POST /users/{id}/authentication/temporaryAccessPassMethods`), sign in bypassing password + MFA.

**Impact:** one compromised blueprint credential → takeover of all associated identities in any
tenant → full tenant compromise. Trusting a third-party agent = trusting its developer with those
permissions.

---

## Part 3 — Protect, Detect, Respond

### Protect
- **Restrict takeover roles/permissions:** Agent ID Administrator, AI Administrator, custom roles with
  `microsoft.directory/agentIdentityBlueprints/credentials/update`, and Graph
  `AgentIdentityBlueprint.AddRemoveCreds.All` / `AgentIdentityBlueprint.ReadWrite.All`.
- **Restrict agent permissions:** review Entra roles + app/delegated perms; remove Tier-0
  (`UserAuthMethod-*`, etc.). Review in Entra admin center → Agents → Access → Granted permissions.
- **Avoid blueprint secrets:** prefer certificates or FICs. Find secret-using blueprints in sign-in
  logs: `Category=ServicePrincipalSignInLogs`, `clientCredentialType=clientSecret`,
  `agent.agentType=agentIdentityBlueprintPrincipal`.
- **Limit third-party blueprints:** prefer creating a local blueprint; carefully review permissions
  granted to foreign blueprint identities.

### Detect
- **Credential added to a blueprint:** Service = Core Directory, Category = ApplicationManagement,
  Activity = "Update application – Certificates and secrets management" (same as app cred add).
- **ID Protection for agents** (Entra P2) — risky agent detections (largely offline at publication).

### Respond
- **Disable** an agent/blueprint in Entra admin center → Agents → Disable.
- **Delete** only via Microsoft Graph (portal delete errors out).

### Detection ideas for the CTF / detections/ folder
- Blueprint credential add (audit) → high-severity custom detection.
- Agent identity sign-in from unusual location / first-seen.
- Agent assigned a Tier-0 permission (`UserAuthMethod-*`, `RoleAssignmentSchedule.ReadWrite.Directory`).
- TAP created by a service/agent identity.
