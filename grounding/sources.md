# Grounding and Source Index

**Updated October 29, 2026.** Product behavior comes from Microsoft Learn.
The Cloud-Architekt Agent Identities chapter is the required security spine in every
module. A reviewed source does not prove a deployment, entitlement, or reuse permission.

The complete **39-entry source register**, immutable reviewed revisions, and product
boundaries are in the [master plan](../docs/06-customer-learning-plan.md#14-grounding-and-traceability).
The [integration map](integration-map.md) explains exactly what we reuse, adapt, or author.

| Source family | Role |
|---|---|
| [Cloud-Architekt Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md) | Dual attack surfaces, objects/authority, management and ownership risks, LOAT, investigation, mitigations |
| [Microsoft Learn Agent 365](https://learn.microsoft.com/microsoft-agent-365/overview) | Current supported platform behavior and prerequisites |
| [Entra governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview), [CA](https://learn.microsoft.com/entra/identity/conditional-access/agent-id), [agent risk](https://learn.microsoft.com/entra/id-protection/concept-risky-agents) | Five-pillar control structure, flow/role/licensing boundaries |
| [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365), [DLP](https://learn.microsoft.com/purview/dlp-learn-about-dlp), [Compliance Manager](https://learn.microsoft.com/purview/compliance-manager) | Supported data controls and owned improvement evidence |
| [Defender agent investigation](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-detection-protection), [ISOC](https://learn.microsoft.com/defender-xdr/isoc-overview) | Evidence, response, operating model and eligibility |
| [Stefano's a365-lab-toolkit](https://github.com/stefanpems/a365-lab-toolkit/tree/1a1d3f5253771a20915fa519aaaa58f576a5cf35) | Candidate runtime/UI, documented internal-mail task, selected governance and observability |
| [GBBLabs](https://github.com/mcaps-microsoft/GBBLabs) | Selected approved SDK/setup, workload case and hunting patterns; authorization may be required |
| [Blue16 Secure AI](https://blue16.nl/secure-ai-explainer.html#why) and [ISOC Explained](https://blue16.nl/isoc-explainer.html) | Inspiration for original explanations, not copied code/artwork or pricing authority |

## Prior research retained for context

- [Datadog Agent ID series](datadog-agent-id-series.md)
- [Compass ownership/consent research](compass-agent-id-security.md)
- [Object-scoped disable research](ms-learn-disable-agent-identities.md)
- [Reference-image notes](reference-images.md)
- [Module 1 direction, registry and admin seeding](module-1-direction-and-registry.md)

Historical notes can contain obsolete portal, table, integration, or licensing statements.
Use current Microsoft Learn and actual tenant validation before delivery. No raw GBB
extract or external source-code/screenshot collection is redistributed here.

Cloud-Architekt contributor-owned material is MIT; preserve notices when reusing it.
Third-party assets and toolkit/GBB material need separate rights review.
