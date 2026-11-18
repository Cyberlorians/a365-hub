# Reference Images (grounding)

Images supplied as visual grounding. The first two source PNGs were pasted as attachments
(not saved as files), so their content is transcribed here to preserve it. Re-add those
original PNGs to `grounding/images/` if/when available. Image 3 is saved below.

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

---

## Image 3 - Agent ID scenarios

**Received:** November 12, 2026, as a user-supplied image. Original author, source URL,
version, and redistribution permission have not been established. Preserve this as a
review reference; do not copy it into published decks or customer packages until source
and reuse permission are confirmed. Labels in the picture are not product validation.

The original PNG is retained locally for review only and is not distributed with
the public repository. The published module uses the original-text scenario
overview below instead.

### Teaching placement

- **Module 1:** Use the four scenario headings as a one-minute orientation within the
  existing agent action-model segment, not four extra demos. Explain that agent
  hosting, identity, governance visibility, and resource access are different questions.
  Use the text summary below while image reuse remains unconfirmed.
- **Module 2:** Classify the actual workshop agent in its passport. Record its observed
  runtime and authority; do not infer a flow from its platform or sample name.
- **Module 3:** Use the eight-minute comparison below within the existing 35-minute
  authority-mapping activity. Keep the actual lab agent as the main evidence source;
  the other cases are discussion scenarios, not additional deployments.
- **Modules 4-7:** Reuse the chosen case when asking who owns it, which data/tool
  boundary applies, where evidence lives, and what a scoped response would affect.
  These are prompts for validation, not claims that all platforms expose the same controls.

### Four scenario prompts

The four headings are lenses, not mutually exclusive agent types. An agent can run in
a Microsoft platform, appear in Agent 365, and participate in a federated workflow.

| Lens from the image | Learner question | Evidence to request before concluding |
|---|---|---|
| Microsoft Agent 365 customers | What is visible in the registry, who owns the agent, and what controls actually apply? | Registry entry, identity correlation, owner, supported control configuration and observed result |
| Microsoft first-party runtime agents | What identity does the selected runtime create or use, and what authority does the task exercise? | Runtime configuration, actual identity/object relationships, grants, resource activity |
| Agents anywhere calling Microsoft APIs | How does an externally hosted agent authenticate and obtain permission for the Microsoft resource? | Actual token-acquisition route, actor, audience, delegated or application permission, API result |
| Cross-cloud workflows / federation | What trust lets this workload obtain access, and where does that access end? | Issuer/subject/audience trust configuration, token exchange, resource grants, correlated activity |

Do not infer universal Agent 365 discovery, Conditional Access enforcement on every
exchange, secretless operation, or complete telemetry from the picture. Federation
does not itself grant resource access. An absent registry field or alert is not proof
of safety. Check current Microsoft Learn and the actual environment for each claim.

### Module 3 activity: follow the authority (eight minutes)

1. **Choose and classify (one minute):** Place the Module 2 agent under one or more
   scenario headings. Mark unverified properties as unknown.
2. **Trace (three minutes):** Draw runtime -> acting identity -> token/trust route ->
   target API/tool/data. Name the accountable owner separately. Label actual identifier
   types, delegated versus autonomous authority, and effective grants.
3. **Compare (two minutes):** Choose one other lens. Identify which trust, permission,
   evidence, and response assumptions would need rechecking if the runtime moved.
   Keep this comparison hypothetical; do not create credentials or change trust.
4. **Decide (two minutes):** Explain one allowed operation and one operation the
   boundary should deny. Cite observed evidence where available, and distinguish an
   expected denial from a tested denial. Propose one justified correction or retain
   the existing boundary with a reason.

**Learner output:** Add the scenario classification and comparison to the existing
agent passport/authority diagram, with actor, target, grant, evidence, unknowns, and
one boundary decision.

**Facilitator check (four points):**

- Distinguishes runtime location from identity and registry visibility.
- Correctly identifies whose authority is used and the applicable grant/trust.
- Names evidence at both the identity and target/runtime surfaces, recording gaps.
- Justifies a boundary and a scoped response without assuming every agent is affected.

Target at least 3/4, including the authority point. If evidence is unavailable, accept
an explicit gap and a concrete validation step, not an invented result. This is a
content activity draft; actual lab evidence and timed rehearsal remain release gates.
