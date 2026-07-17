# Module 1 Sources and Claim Map

**Reviewed:** July 17, 2026

Module 1 prefers current Microsoft documentation for product definitions and uses external
research only for clearly attributed security context. Product capabilities and licensing
change; facilitators should recheck the linked pages before a customer delivery.

## Authoritative Microsoft sources

| Claim used in Module 1 | Source |
|------------------------|--------|
| Entra Agent ID is an identity and security framework extending Entra to AI agents | [What is Microsoft Entra Agent ID?](https://learn.microsoft.com/entra/agent-id/what-is-microsoft-entra-agent-id) |
| Agent ID supports Microsoft and non-Microsoft platforms | [What is Microsoft Entra Agent ID?](https://learn.microsoft.com/entra/agent-id/what-is-microsoft-entra-agent-id) |
| Agent identity is the primary identity; it has no credential of its own | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) |
| Blueprint is the template/authentication foundation and holds credentials | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) and [Agent identity blueprints](https://learn.microsoft.com/entra/agent-id/agent-blueprint) |
| Blueprint principal records a blueprint's presence in a tenant | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) |
| Agent user is optional, paired 1:1, and used for user-shaped resources | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) |
| Owners, sponsors, and managers separate technical and business accountability | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) |
| Interactive agents commonly use delegated/OBO access; autonomous agents use their own identity | [Fundamental concepts](https://learn.microsoft.com/entra/agent-id/key-concepts) |
| Agent 365 provides observe, govern, and secure capabilities | [Microsoft Agent 365 overview](https://learn.microsoft.com/microsoft-agent-365/overview) |
| Agent Registry navigation is Microsoft 365 admin center → Agents → All agents → Registry | [Agent Registry in Microsoft 365 admin center](https://learn.microsoft.com/microsoft-365/admin/manage/agent-registry) |
| Registry reports total agents, ownerless agents, unmanaged agents, filters, and aggregated high-severity risks | [Agent Registry in Microsoft 365 admin center](https://learn.microsoft.com/microsoft-365/admin/manage/agent-registry) |
| Agent 365 is generally available commercially and licensed per user | [Microsoft Agent 365 overview](https://learn.microsoft.com/microsoft-agent-365/overview) |
| Agent 365 is included in Microsoft 365 E7 | [Microsoft Entra Agent ID licensing guidance](https://learn.microsoft.com/entra/agent-id/what-is-microsoft-entra-agent-id) and [Microsoft Agent 365 plans](https://www.microsoft.com/microsoft-agent-365#plans-and-pricing) |
| E7 combines Agent 365 with unified identity/security/network controls, XDR, data security, and secure AI capabilities | [Microsoft Agent 365 plans](https://www.microsoft.com/microsoft-agent-365#plans-and-pricing) |
| Purview supports Agent 365 audit, classification, labels, DLP, insider risk, eDiscovery, retention, and compliance controls | [Use Microsoft Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) |
| Current Purview navigation is DSPM → AI observability; DSPM classic does not support Agent 365 | [Use Microsoft Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) |
| Newly created Agent 365 content does not inherit sensitivity labels from source items | [Use Microsoft Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) |
| Defender's default real-time rule audits, while custom rules can block supported risky actions | [Protect AI agents in real time](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-real-time-protection) |
| Defender navigation is Settings → Security for AI → Policies & rules → Real-time protection | [Protect AI agents in real time](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-real-time-protection) |
| Agent in a Day builds agents in Copilot Chat and Copilot Studio | [Agent in a Day learning path](https://learn.microsoft.com/training/paths/agents-online-workshop/) |

## Workshop onboarding source

The prerequisite slides reflect this repository's deployed design and templates:

- [Form-driven onboarding flow](../../docs/04-onboarding-flow.md)
- [Forms Logic App template](../../labs/logic-app/provisioner-forms.template.json)

The workflow creates a lab account, issues an eight-hour multi-use TAP, and sends the
subject **Your A365 Workshop lab access** with the UPN and sign-in instructions. The live
form URL remains engagement-specific and must not be hard-coded into the published deck.

## Security grounding

- Katie Knowles, Datadog Security Labs: [Entra Agent ID: The blueprint blast
  radius](https://securitylabs.datadoghq.com/articles/agent-id-blueprint-blast-radius/).
  Module 1 uses only the high-level idea that a blueprint is the shared authentication
  foundation; detailed compromise mechanics are reserved for Module 4.
- The project's broader research catalog is in
  [grounding/sources.md](../../grounding/sources.md).

## Taxonomy caveat

“Generative AI,” “agentic AI,” and “AI agent” do not form a universally standardized,
mutually exclusive ladder. The course therefore classifies examples by observable
behavior: data/tool access, decision authority, system actions, recurrence, and human
oversight. The supplied infographic remains optional visual inspiration, not the source of
normative product definitions.

## Module boundary

The following claims intentionally appear only as previews here:

- credentials are configured on the blueprint;
- agent identities do not hold their own credentials;
- one blueprint can support multiple identities.

Module 1 does **not** teach token-exchange protocol details, inheritable permissions,
restricted roles, cross-tenant attack mechanics, or numerical blast-radius limits. Those
belong to Modules 2–4 and must be sourced and validated there.
