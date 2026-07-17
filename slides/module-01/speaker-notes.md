# Module 1 Speaker Notes

**Total time:** 25–35 minutes, including attendee sign-in

**Prerequisites:** 8–12 minutes

**Official Module 1:** 17–23 minutes

## Delivery rule

Use explicit action language:

- **Do this now** only for the form, email, and TAP sign-in.
- **Watch the administrator** for Microsoft 365 admin center, Purview, and Defender.

Do not grant broad admin roles to learners for this module. Use only a lab tenant and safe demo data.

## Prerequisites

### Slide 1 — Get your lab account (1 minute)

Display the engagement-specific form link or QR code. Confirm it was tested before attendees arrived. Tell learners that this creates a short-lived workshop account, not a permanent company account.

**Say:** “Open the form for this event. We will all pause after sign-in.”

### Slide 2 — Fill out the form (2 minutes)

Ask learners to enter their full name and an email they can access now, add company only if requested, accept the terms, and submit once. Warn them not to enter passwords or customer information.

### Slide 3 — Check your email (up to 5 minutes)

The exact subject is **Your A365 Workshop lab access**. The email contains a lab UPN, an eight-hour reusable TAP, and a sign-in link. Ask learners to check Junk before requesting help. Multiple form submissions can create duplicate accounts.

### Slide 4 — Sign in with the TAP (2 minutes)

Learners follow the email link, enter the lab UPN, choose Temporary Access Pass if prompted, and paste the TAP. The TAP satisfies the workshop MFA requirement. No phone or Authenticator registration is needed.

**Security note:** A TAP is a credential. Learners must not share it or show it on the projected screen.

### Slide 5 — You are ready (2 minutes)

Pause until everyone sees the Microsoft 365 home page. Move access problems to a facilitator or helper so the module can begin on time.

## Official Module 1

### Slide 6 — See it. Control it. Protect it. (1 minute)

Introduce the security outcome. Agents can use data and tools, so the organization needs identity, data, and runtime protection.

### Slide 7 — Four questions (1 minute)

Read the four questions. Explain that the same investigation path will be used in every portal. Tell learners to watch the shared screen; these are administrator views.

### Slide 8 — What is an agent? (1 minute)

Contrast a simple chat answer with an agent that can read data, decide, and invoke a tool. Keep architecture and token details for later modules.

### Slide 9 — Agent 365 (1 minute)

Use Microsoft’s three verbs: **observe, govern, secure**. Translate them to see, control, and protect.

### Slide 10 — Agent Registry (3 minutes)

**Administrator action:** open `admin.microsoft.com` → **Agents** → **All agents** → **Registry**.

Show:

1. Total agents.
2. Agents without owners.
3. Unmanaged or at-risk agents when available.
4. Status, publisher, channel, platform, and data-source filters.

Do not change, block, delete, or deploy an agent during this introductory demonstration.

### Slide 11 — Review one agent (2 minutes)

Open a safe demo agent. Point out name, purpose, owner, publisher, platform, access or permissions, activity, and security information that is available in the licensed tenant.

**Caveats:** The Registry risk count shows high-severity risk. Zero does not prove that no medium or low risk exists. Counts can lag the security portals.

### Slide 12 — Entra Agent ID (2 minutes)

Use the work-ID analogy. Identity makes authentication, authorization, ownership, risk controls, activity logging, governance, and containment possible. Do not teach blueprint or token-exchange details here.

### Slide 13 — Purview data protection (2 minutes)

Explain four actions: know, label, limit, and audit. Mention that Purview also supports insider risk, communication compliance, eDiscovery, retention, and compliance management for supported Agent 365 interactions.

Emphasize the current Microsoft caveat: newly created content from Agent 365 does not automatically inherit labels from source items. Existing permissions and label encryption rules still matter.

### Slide 14 — Purview AI observability (3 minutes)

**Administrator action:** open `purview.microsoft.com` → **DSPM** → **AI observability**.

Show the agent overview, activity, risk, and recommendations. Use current DSPM. The classic DSPM experience does not support Agent 365. Appropriate Compliance Administrator or Purview role-group access is required.

### Slide 15 — Defender threat protection (1 minute)

Explain that Defender inspects supported agent activity during runtime. Audit creates visibility. Blocking should be used for high-confidence scenarios and carefully scoped agents.

### Slide 16 — Defender real-time protection (3 minutes)

**Administrator action:** open `security.microsoft.com` → **Settings** → **Security for AI** → **Policies & rules** → **Real-time protection**.

Show the default audit rule and, if configured, a custom blocking rule. Do not create or enable a production rule during the introductory demonstration. Coverage depends on the agent and tool integration. Treat captured prompt evidence as sensitive.

### Slide 17 — Microsoft 365 E7 (1 minute)

Connect the layers: Agent 365 control plane, Entra identity, Purview data controls, Defender runtime defense, and Microsoft 365. State that Agent 365 is included in E7. Revalidate licensing before customer delivery or pricing discussion.

### Slide 18 — Complete (1 minute)

Ask the audience to repeat the four questions. Select one real or planned agent for the next review or lab.

**Transition:** “Now we can build or inspect one agent and apply this same identity, data, and threat checklist.”

## Recovery prompts

| Problem | Response |
|---|---|
| Email does not arrive | Check Junk, verify the submitted address, then ask the facilitator to inspect the workflow. Do not keep resubmitting. |
| TAP option is missing | Confirm the learner entered the lab UPN from the email and used the email sign-in link. |
| TAP is rejected | Copy it again without spaces; confirm it is within the eight-hour window; ask the facilitator for a replacement if needed. |
| Portal menu is missing | Confirm the presenter account, role, license, and correct portal. Learners should not be given admin roles to fix this. |
| No agents or signals appear | Use prepared screenshots or explain that data depends on tenant activity, licensing, integration, and processing time. |
