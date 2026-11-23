# Module 1 Claim and Source Map

**Direction update, November 21, 2026:** Keep Module 1 introductory. The
[reference-only AI Observability Overview ideas](../../grounding/reference-images.md#images-4-7---ai-observability-overview-four-pillars)
ground a simple management, governance, security and business-value frame.
The Academy sources below describe the earlier published sample-led version and
support instructor preparation/Module 2; students should not need to open an
external course lab in Module 1. Current documentation reflects the approved
simplification; publication and fresh learner access require separate validation.

**Teaching restoration, November 23, 2026:** Introductory means no extra setup,
not less learning. Slides 7-9 define agent capabilities, least privilege and
evidence through the same support task. Module 1 retains the five-area Entra
control map and connected response sequence; attack mechanics stay later.
These concepts were not moved into Module 2. Following the November 23 clarification,
slide 8 uses an original needed-versus-unrelated-access comparison, not source screenshots.
Shared course material was conceptual reference only; reproduced files and the
gallery have been removed from the current package.
Control setup, task testing and investigation retain their later-module boundaries.

Sample-learning references checked November 19, 2026 using Microsoft Learn MCP
search/fetch and the linked Microsoft-maintained Academy lessons. The deck is an
original adaptation, not a verbatim copy or Microsoft certification course.

| Claim/topic | Source | Boundary |
|---|---|---|
| Introductory four-pillar frame | [Reference-only provenance](../../grounding/reference-images.md#images-4-7---ai-observability-overview-four-pillars) | Informal conceptual reference, not redistribution permission. Original support-task wording and visuals; no source screenshots, copied artwork or product/release claims |
| What observability means: evaluation, monitoring and tracing | [Microsoft Foundry observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability), [curriculum placement](../../grounding/sources.md#foundry-observability-source-grounding-and-placement) | Brief conceptual explanation after the four-pillar overview; Foundry-specific integrations and evaluation costs do not imply automatic Copilot Studio/Agent 365 coverage; no additional Module 1 setup or lab |
| Learning/sample selection | [Microsoft Learn sample catalog](https://learn.microsoft.com/microsoft-copilot-studio/guidance/agent-samples) | Separates Microsoft-owned samples, learning labs and community resources |
| Instructor/Module 2 learning reference | [Agent Academy Recruit standard harness](https://microsoft.github.io/agent-academy/recruit/), [Mission 06 helpdesk build](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/) | Earlier sample-led research retained; not current Module 1 learner steps or a deployed replacement claim |
| Instructor/Module 2 sample prerequisites | [Mission 00 course setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/), [Mission 04 solution](https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/) | Contoso IT source setup requires separate rights/licensing; no new helpdesk deployment is required for Module 1 |
| Instructor/Module 2 publication reference | [Mission 11 publishing](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/) | Separate publication/channel/source checks if that later path is approved; not a Module 1 prerequisite or implemented optional path claim |
| Alternate template route | [Mission 05 Safe Travels](https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/) | A genuine prebuilt travel template; not the same agent or prerequisites as Mission 06's custom helpdesk build |
| Alternate hands-on curricula | [Microsoft Copilot Agents Labs](https://microsoft.github.io/mcs-labs/), [Learn create-agent exercise](https://learn.microsoft.com/training/modules/build-manage-no-code-copilot-agent-sharepoint/6-exercise-create-copilot-chat-agent) | Further learning links, not extra mandatory Module 1 builds; licensed access is required |
| Pro-code A365 route | [Agent 365 SDK samples](https://learn.microsoft.com/microsoft-agent-365/developer/samples) | Separate SDK/runtime/model prerequisites; not a Copilot Studio import or an interchangeable maker lesson |
| Registry review and metadata | [Agent registry overview](https://learn.microsoft.com/microsoft-agent-365/admin/agent-registry-overview) | Inventory is not runtime proof; actual platform reporting and role visibility must be checked |
| Valid access does not prove safe use | [Agent Identities](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/09e9d2365e89c1eedb36c8a01ac0a3dcbb229a27/AgentIdentities.md) | Foundational distinction on slide 8; identity misuse and content-driven tool misuse are developed in later security modules |
| Observe/govern/secure | [Agent 365 overview](https://learn.microsoft.com/microsoft-agent-365/overview), [Learn path: Explore Microsoft Agent 365](https://learn.microsoft.com/en-us/training/paths/agent-365-solutions/) ([mapping](../../grounding/sources.md#microsoft-learn-learning-path-explore-microsoft-agent-365)) | Discovery/enrollment/activity are separate checks. The path's Observe, Govern, Secure framing matches slides 6 and 10; its Monitor and Govern modules are administrator exercises, not learner steps |
| Agent 365 versus Entra (slide 12) | [Protect agent identities with Microsoft Entra](https://learn.microsoft.com/microsoft-agent-365/admin/capabilities-entra), [Entra ID Governance for agents](https://learn.microsoft.com/entra/id-governance/identity-governance-overview#identity-governance-for-agent-identities) | Agent 365 is the registry for discovery; Entra Agent ID supplies identity, sponsors/lifecycle, access packages, Conditional Access, ID Protection and (for Copilot Studio agents) network controls. Registry fields (Details: Owner, Created by, Entra agent ID; Permissions; Security risk) were observed in the admin center November 23, 2026; they are clues, not proof a control is configured |
| Purview and Defender for agents (slides 13-14) | [Purview support for Agent 365](https://learn.microsoft.com/microsoft-agent-365/guidance/purview-agent-365), [Defender support for Agent 365](https://learn.microsoft.com/microsoft-agent-365/guidance/defender-agent-365) | Labels, DLP and audit extend to supported agent activity; Defender runtime protection and investigation depend on onboarding and integration. The registry Security tab lists reported Purview protections; reported is not tested |
| Governance/accountability | [Agent governance](https://learn.microsoft.com/entra/id-governance/agent-id-governance-overview) | Technical rights and sponsor differ |
| CA/risk | [CA for agents](https://learn.microsoft.com/entra/identity/conditional-access/agent-id), [ID Protection](https://learn.microsoft.com/entra/id-protection/concept-risky-agents) | Flow/target/exception and offline-learning boundaries |
| Data controls/labels | [Purview for Agent 365](https://learn.microsoft.com/purview/ai-agent-365) | Supported workloads; no automatic generated-content label inheritance |
| DLP and improvement evidence | [DLP](https://learn.microsoft.com/purview/dlp-learn-about-dlp), [Compliance Manager](https://learn.microsoft.com/purview/compliance-manager) | Audit is not block; score is not certification |
| Runtime/investigation | [Defender agent protection](https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-detection-protection), [ISOC](https://learn.microsoft.com/defender-xdr/isoc-overview) | Coverage/integration and preview/workspace eligibility |
| Gateway/network | [Gateway](https://learn.microsoft.com/entra/global-secure-access/concept-secure-web-ai-gateway-agents), [GenAI Insights](https://learn.microsoft.com/entra/global-secure-access/concept-generative-ai-insights) | Copilot Studio route does not establish ACA Mail coverage; remote MCP is not local MCP |
| E7 value/fit | [E3/E5/E7 comparison](https://learn.microsoft.com/microsoft-365/copilot/compare-copilot-e3-e5-e7) | Feature-specific entitlement/cost assessment; not every capability is exclusive |
| Later authority/scenario depth | [Supplied Agent ID scenarios reference](../../grounding/reference-images.md#image-3---agent-id-scenarios) | Background for Module 3, not the Module 1 hands-on structure; image provenance/reuse unresolved |
| Lab 3 records: support agent and flagged Relay | [Admin lab guide](../../docs/09-admin-lab-by-lab.md#lab-3-review-two-agents-in-the-registry) | The Copilot Studio Workshop IT Support Agent (synthetic) was created and observed November 23, 2026 in the admin view: platform Copilot Studio, Data & tools populated (public sites capability, windows-client knowledge, search_public_web tool), Activity empty, Entra agent ID blank. AI Reader visibility of Data & tools is unverified (Learn guarantees it only for AI Administrator and Global Administrator). Relay has no platform reporting, so its Data & tools is empty by design; its High/compromised risk was observed November 19 while the risk-filter results were empty; not fresh-learner proof or a repaired service |

Blue16 explainers inspire original explanations, not copied code/artwork or product
claims. Current Module 1 uses one support-agent story and a read-only review of the
Copilot Studio Workshop IT Support Agent plus the separate Project Beacon Relay Agent
for the staged risk. Registration does not prove runtime,
effective permissions or control behavior; Activity is not complete traces/audit.
Required High / The agent is compromised. is staged training, not a live attack.
Missing required risk is unresolved access/setup unless observed in the instructor
live view. Current Module 2 mail content/runtime remains unchanged. Product availability and portal paths must
be rechecked before delivery. Full revisions/39-source register:
[master plan](../../docs/06-customer-learning-plan.md#14-grounding-and-traceability).
