# Reference Images (grounding)

Two infographics supplied as visual grounding. The source PNGs were pasted as attachments (not saved
as files), so their content is transcribed here to preserve it. Re-add the original PNGs to
`grounding/images/` if/when available.

---

## Image 1 — "Enterprise AI Security: Best Practices for Azure AI Applications"
Author credit: Aiswarya Venkitesh (@aiswarya-venkitesh)

Ten paired domains (control area → key practices → Azure tools):

1. **Identity & Access Control** — Entra ID for user/service auth; least-privilege RBAC; replace
   long-lived API keys with managed identities. *Tools: Microsoft Entra ID, Azure RBAC, Managed Identities.*
2. **Network Isolation** — private endpoints; restrict public access; control inbound/outbound.
   *Tools: Azure Private Link, Virtual Network, Network Security Groups.*
3. **Data Protection** — classify data before sending to models; encrypt at rest/in transit;
   customer-managed keys. *Tools: Microsoft Purview, Azure Storage Encryption, Azure Key Vault.*
4. **Secrets Management** — store creds/tokens/certs securely; keep secrets out of source; rotate on
   a schedule. *Tools: Azure Key Vault, Managed Identities, Microsoft Defender for Cloud.*
5. **Prompt & Input Security** — validate prompts/uploads/API inputs; detect direct & indirect prompt
   injection; block malformed/oversized requests. *Tools: Azure AI Content Safety, Prompt Shields,
   Azure API Management.*
6. **Content & Output Safety** — filter harmful/policy-violating responses; detect groundedness,
   sensitive data, unsafe content; human approval for high-impact decisions. *Tools: Azure AI Content
   Safety, Groundedness Detection, Human-in-the-Loop Workflows.*
7. **Secure RAG Pipelines** — retrieve only docs the user is authorized to access; treat external/
   retrieved content as untrusted; preserve permissions across sources/indexes/responses.
   *Tools: Azure AI Search, Microsoft Entra ID, Azure Blob Storage.*
8. **Agent & Tool Security** — allow only approved tools/APIs; limit permissions to the task; require
   approval before sensitive actions. *Tools: Azure AI Foundry Agent Service, Azure API Management,
   Logic Apps.*
9. **Secure Development & Testing** — threat-model before deployment; test jailbreaks/leakage/abuse/
   unsafe tool use; scan code, deps, containers, pipelines. *Tools: Microsoft Threat Modeling Tool,
   GitHub Advanced Security, Azure DevOps.*
10. **Monitoring & Governance** — log prompts/responses/tool actions/access; monitor runtime threats,
    anomalies, policy violations; define governance + incident response. *Tools: Microsoft Sentinel,
    Microsoft Defender for Cloud.*

---

## Image 2 — "Generative AI vs Agentic AI vs AI Agents"
Author credits: @omsrivastava (LinkedIn) / @beingomkars (Instagram), 2025

### Workflow columns
- **Generative AI:** Specify Task → Collect Data → Refine Data → (Retrieval Index / Vector DB) →
  Model Training → Deploy Model → Evaluate Outcomes → Generate Results.
- **Agentic AI:** Specify Task → Choose LLM Model → Integrate Tools & APIs (Search/APIs, External
  Operation) → Embed Logic & Iterations → Improve & Evolve → Agent-Led Choices → Implement Actions →
  Self-Decisions.
- **AI Agents:** Specify Task → Fetch Useful Data (Search/APIs, External Operation) → Design
  Multi-Step Process → Adapt for Future Use / Apply Iterative Logic → Produce & Verify Results →
  Implement Actions → Refresh Memory → Query APIs.

### Comparison table
| Aspect | Generative AI | Agentic AI | AI Agents |
|---|---|---|---|
| Purpose | Produces content like text or images | Automates tasks using rules/behaviors | Acts autonomously, making complex decisions |
| Functionality | Focuses on creative, novel outputs | Executes predefined tasks and actions | Interacts dynamically with environments |
| Examples | GPT-3, DALL-E | Chatbots, virtual assistants | Autonomous vehicles, intelligent robots |
| System Interaction | Generates output, not typically system-centric | Functions within system guidelines | Constantly interacting with systems |
| Learning Capability | Updated through retraining to enhance creativity | Limited learning without algorithm integration | Designed to learn through interactions |

**Teaching use:** Image 2 → Module 1 (concepts / taxonomy). Image 1 → Module 4 and cross-cutting
"secure the agent" guidance (maps well to Agent & Tool Security + Monitoring & Governance).
