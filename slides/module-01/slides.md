# Module 1 — See It. Control It. Protect It.

## Prerequisites — Get into the workshop

### Slide 1 — Get your lab account

Open the workshop form from the link or QR code supplied by the facilitator.

> Use the link for this event. Do not use a form from another event.

### Slide 2 — Fill out the form

1. Enter your full name.
2. Enter an email you can open now.
3. Enter your company if requested.
4. Read and accept the lab terms.
5. Submit the form.

Do not enter a password, secret, or customer data.

### Slide 3 — Check your email

Look for **Your A365 Workshop lab access**.

The email contains:

- your lab username;
- your Temporary Access Pass (TAP);
- the workshop sign-in link.

The TAP works for eight hours and can be reused during that window. Check Junk and then ask the facilitator if the email does not arrive. Do not submit the form many times.

### Slide 4 — Sign in with the TAP

1. Open the sign-in link in the email.
2. Enter the lab username.
3. Choose **Temporary Access Pass** if prompted.
4. Paste the TAP.

No phone or Authenticator registration is needed for this workshop flow. Never share the TAP.

### Slide 5 — You are ready

Confirm that the Microsoft 365 home page opens with the lab account. Raise your hand and remain on this slide if it does not.

---

## Official Module 1 — Agent security basics

### Slide 6 — See it. Control it. Protect it.

How Microsoft 365 E7 helps secure AI agents through identity, data, and threat controls.

### Slide 7 — Four questions guide everything

1. **What?** What agents exist?
2. **Who?** Who owns them?
3. **Which?** Which data and tools can they use?
4. **What happened?** Can we see and stop bad activity?

Learners watch the administrator. They do not open admin portals unless instructed.

### Slide 8 — What is an agent?

An agent is an AI helper that can:

- read company data;
- choose a next step;
- use a tool or change something.

Useful access needs clear rules.

### Slide 9 — Microsoft Agent 365

- **Observe:** see agents in one place.
- **Govern:** set owners, access, and rules.
- **Secure:** protect identities, data, and actions.

### Slide 10 — Open the Agent Registry

**Watch the administrator:**

`admin.microsoft.com` → **Agents** → **All agents** → **Registry**

Look for total agents, agents without owners, unmanaged or at-risk agents, and useful filters.

### Slide 11 — Open one agent

Use the same four-question review:

- What is its name and purpose?
- Who is its owner and publisher?
- Which permissions, data, and tools can it use?
- Which security signals and policies apply?

### Slide 12 — Identity protection with Entra

Microsoft Entra Agent ID is the identity and security framework for AI agents. It helps identify the agent, limit access, record activity, apply risk controls, and stop access when needed.

### Slide 13 — Data protection with Purview

Purview helps organizations:

- know which data agents use;
- classify and label sensitive data;
- use DLP to reduce unsafe sharing;
- audit AI interactions;
- investigate, retain, and manage compliance data.

Important: newly created Agent 365 content does not automatically inherit sensitivity labels from source items.

### Slide 14 — Open Purview AI observability

**Watch the administrator:**

`purview.microsoft.com` → **DSPM** → **AI observability**

Review active agents, risky activity such as oversharing or exfiltration, and recommended remediation. Use current DSPM, not Data Security Posture Management (classic).

### Slide 15 — Threat protection with Defender

Microsoft Defender can audit activity, detect unsafe behavior, and block supported risky actions during runtime. Coverage depends on agent type and integration.

### Slide 16 — Open Defender real-time protection

**Watch the administrator:**

`security.microsoft.com` → **Settings** → **Security for AI** → **Policies & rules** → **Real-time protection**

The default rule audits. Carefully scoped custom rules can block selected high-confidence threats. Treat prompt evidence as sensitive data.

### Slide 17 — Why Microsoft 365 E7?

- **Agent 365:** observe and govern agents.
- **Entra:** protect identity and access.
- **Purview:** protect data and compliance.
- **Defender:** detect and block threats.

Agent 365 is included in Microsoft 365 E7, bringing the security layers together.

### Slide 18 — Module 1 complete

For every agent:

1. Find it.
2. Name the owner.
3. Check data, tools, and access.
4. Watch activity and respond.

Choose one agent to review next.
