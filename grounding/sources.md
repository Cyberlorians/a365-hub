# Grounding and Source Index

**Updated November 21, 2026.** Product behavior comes from Microsoft Learn.
The Cloud-Architekt Agent Identities chapter is the required security spine in every
module. A reviewed source does not prove a deployment, entitlement, or reuse permission.

The baseline **39-entry source register**, immutable reviewed revisions, and product
boundaries are in the [master plan](../docs/06-customer-learning-plan.md#14-grounding-and-traceability).
The [integration map](integration-map.md) explains exactly what we reuse, adapt, or author.
Supplemental user-supplied visual grounding is cataloged below and in the
[reference-image notes](reference-images.md).

| Source family | Role |
|---|---|
| [Cloud-Architekt Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md) | Dual attack surfaces, objects/authority, management and ownership risks, LOAT, investigation, mitigations |
| [Microsoft Learn Agent 365](https://learn.microsoft.com/microsoft-agent-365/overview) | Current supported platform behavior and prerequisites |
| [Microsoft Foundry observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability) | Evaluation, monitoring and tracing across the AI lifecycle; official grounding for operational/quality visibility, with Foundry-specific integration and consumption-cost boundaries |
| [Entra governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview), [CA](https://learn.microsoft.com/entra/identity/conditional-access/agent-id), [agent risk](https://learn.microsoft.com/entra/id-protection/concept-risky-agents) | Five-pillar control structure, flow/role/licensing boundaries |
| [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365), [DLP](https://learn.microsoft.com/purview/dlp-learn-about-dlp), [Compliance Manager](https://learn.microsoft.com/purview/compliance-manager) | Supported data controls and owned improvement evidence |
| [Defender agent investigation](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-detection-protection), [ISOC](https://learn.microsoft.com/defender-xdr/isoc-overview) | Evidence, response, operating model and eligibility |
| [Stefano's a365-lab-toolkit](https://github.com/stefanpems/a365-lab-toolkit/tree/1a1d3f5253771a20915fa519aaaa58f576a5cf35) | Candidate runtime/UI, documented internal-mail task, selected governance and observability |
| [GBBLabs](https://github.com/mcaps-microsoft/GBBLabs) | Selected approved SDK/setup, workload case and hunting patterns; authorization may be required |
| [Blue16 Secure AI](https://blue16.nl/secure-ai-explainer.html#why) and [ISOC Explained](https://blue16.nl/isoc-explainer.html) | Inspiration for original explanations, not copied code/artwork or pricing authority |
| [Reference-only four-pillar provenance](reference-images.md#images-4-7---ai-observability-overview-four-pillars) | Informal conceptual reference; screenshots are not redistributed. Module 1 uses original support-task explanations and visuals, not copied course material or verified product behavior |
| [Explore Microsoft Agent 365 (Learn learning path)](https://learn.microsoft.com/en-us/training/paths/agent-365-solutions/) | Official three-module path; see the [module mapping](#microsoft-learn-learning-path-explore-microsoft-agent-365) below. Cite and paraphrase; do not copy its text, screenshots or exercises |

## Prior research retained for context

- [Datadog Agent ID series](datadog-agent-id-series.md)
- [Compass ownership/consent research](compass-agent-id-security.md)
- [Object-scoped disable research](ms-learn-disable-agent-identities.md)
- [Reference-image notes](reference-images.md)
- [Module 1 direction, registry and admin seeding](module-1-direction-and-registry.md)

## Curriculum grounding

### Microsoft Learn learning path: Explore Microsoft Agent 365

**Reviewed November 23, 2026:** [Explore Microsoft Agent 365](https://learn.microsoft.com/en-us/training/paths/agent-365-solutions/),
three modules and 37 units. Microsoft owns this content; this note records structure
and paraphrased takeaways only. The unit text was read from a local copy kept outside
the repository.

| Learn module | Units | Takeaways used here | Workshop placement |
|---|---|---|---|
| [Get started with Microsoft Agent 365](https://learn.microsoft.com/en-us/training/modules/agent-365-get-started/) (beginner) | 9 | Agent 365 is a control plane framed as Observe, Govern and Secure; it extends the admin center, Entra, Purview and Defender to agents; Copilot Studio agents integrate automatically | Module 1: matches slide 6 (See, Control, Protect) and slide 10 (four services) |
| [Monitor and manage agents with Microsoft Agent 365](https://learn.microsoft.com/en-us/training/modules/agent-365-monitor-manage/) (intermediate; AI Administrator and an Agent 365 license) | 12 | Overview page, registry indicators (total agents, agents at risk, agents without owners, unmanaged agents, connected platforms), agent map, exceptions, adoption and usage measures | Module 1 lab context; Module 8 value. Ownerless and unmanaged agents support the slide 12 accountability point |
| [Govern agents using Agent 365](https://learn.microsoft.com/en-us/training/modules/agent-365-govern/) (intermediate; AI Administrator and an Agent 365 license) | 16 | Agent settings, policy templates, access packages, onboarding, owners, blocking, rules that expire or flag agents, tools, audit logs | Modules 4 and 5 (access, lifecycle, tools) |

**Boundaries:** The Monitor and Govern modules are administrator exercises, including
blocking agents and changing policy. Workshop learners hold read-only AI Reader, so use
them as instructor or later-module grounding, not Module 1 learner steps. The
Monitor module's example uses the Microsoft Researcher agent with data sources
shown; in the workshop tenant on November 23, 2026 Researcher showed no knowledge
sources, no tools and no owner, so do not assume the course's example screens match
the tenant.

### Foundry observability: source grounding and placement

**Reviewed November 21, 2026:** [Observability in Generative AI - Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability).
The source describes three complementary capabilities:

- **Evaluation:** Assess task/output quality, safety and reliability using suitable
  tests and evaluators; one successful response is not comprehensive validation.
- **Monitoring:** Watch operational and quality signals over time, such as latency,
  errors and token consumption, where the application is integrated and configured.
- **Tracing:** Follow recorded execution steps across model calls, tools and services.
  A trace is execution evidence, not a complete account of internal model reasoning.

These are technical capabilities, not replacements for the four introductory
management, governance, security and business-value lenses in the supplied screenshots.

| Module | Placement | Scope |
|---|---|---|
| 1: See It. Control It. Protect It. | After explaining agent capabilities and least privilege through one support job; teach concrete evidence before naming observability concepts | Check the actual ticket, recorded tool steps and reliability across requests. No Foundry setup, evaluator configuration or external lab |
| 2: Meet Your Business Agent | Approved-task/result check | Compare an actual answer/action with the expected result and available evidence; use the selected runtime's supported test view, not an assumed Foundry dashboard |
| 6: Recognize Risky AI Behavior | Quality/safety versus suspicious behavior | A poor answer, an evaluator score and a security detection are different evidence; adversarial testing stays approved and isolated |
| 7: Investigate and Contain | Runtime/tool evidence in the investigation timeline | Correlate validated traces with identity and data/security evidence; use prepared, labeled evidence where live integration is absent |
| 8: Prove It and Plan Adoption | Operational readiness and business value | Relate measured usage/performance/cost to an outcome; token counts alone do not establish value or total cost |

**Product and delivery boundaries:** The article describes Microsoft Foundry and its
Azure Monitor Application Insights/OpenTelemetry integrations. It does not establish
automatic Foundry telemetry for every Copilot Studio, Agent 365 or externally hosted
agent. Check instrumentation, collection, roles, regional support and applicable costs
before promising a live view. Foundry evaluations can incur consumption charges,
including playground evaluations described as enabled by default in the source.
Do not run evaluations or enable new instrumentation merely to teach the overview.
This grounding addition does not deploy anything or revise the published decks.

- [Customer-ready eight-module outline and Module 1 alignment review](workshop-customer-outline.md)
  - Brooke's pilot framing plus the supplied Agent ID scenarios; curriculum direction,
  not product documentation or evidence of live readiness.

Historical notes can contain obsolete portal, table, integration, or licensing statements.
Use current Microsoft Learn and actual tenant validation before delivery. No raw GBB extract or unrelated external source-code/screenshot collection is
redistributed here. The four AI Observability Overview screenshots were informal
conceptual references, not redistribution permission; their reproduced files have
been removed. See the reference-only provenance note.

Cloud-Architekt contributor-owned material is MIT; preserve notices when reusing it.
Third-party assets and toolkit/GBB material need separate rights review.
