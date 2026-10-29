# Module 1 Claim and Source Map

| Claim/topic | Source | Boundary |
|---|---|---|
| Dual attack surfaces; legitimate tool misuse | [Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md) | Required security spine; identity evidence remains useful but insufficient |
| Observe/govern/secure | [Agent 365 overview](https://learn.microsoft.com/microsoft-agent-365/overview) | Discovery/enrollment/activity are separate checks |
| Governance/accountability | [Agent governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview) | Technical rights and sponsor differ |
| CA/risk | [CA for agents](https://learn.microsoft.com/entra/identity/conditional-access/agent-id), [ID Protection](https://learn.microsoft.com/entra/id-protection/concept-risky-agents) | Flow/target/exception and offline-learning boundaries |
| Data controls/labels | [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) | Supported workloads; no automatic generated-content label inheritance |
| DLP and improvement evidence | [DLP](https://learn.microsoft.com/purview/dlp-learn-about-dlp), [Compliance Manager](https://learn.microsoft.com/purview/compliance-manager) | Audit is not block; score is not certification |
| Runtime/investigation | [Defender agent protection](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-detection-protection), [ISOC](https://learn.microsoft.com/defender-xdr/isoc-overview) | Coverage/integration and preview/workspace eligibility |
| Gateway/network | [Gateway](https://learn.microsoft.com/entra/global-secure-access/concept-secure-web-ai-gateway-agents), [GenAI Insights](https://learn.microsoft.com/entra/global-secure-access/concept-generative-ai-insights) | Copilot Studio route does not establish ACA Mail coverage; remote MCP is not local MCP |
| E7 value/fit | [E3/E5/E7 comparison](https://learn.microsoft.com/microsoft-365/copilot/compare-copilot-e3-e5-e7) | Feature-specific entitlement/cost assessment; not every capability is exclusive |

Blue16 explainers inspire original explanations, not copied code/artwork or product
claims. The agent-review card is fictional. Product availability and portal paths must
be rechecked before delivery. Full revisions/39-source register:
[master plan](../../docs/06-customer-learning-plan.md#14-grounding-and-traceability).
