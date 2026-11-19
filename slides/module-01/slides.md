# Module 1: See It. Control It. Protect It.

Teaching reference for the HTML deck. The sample-led learning sequence follows
Microsoft Agent Academy Recruit's standard-harness IT helpdesk lessons, with an
original Agent 365 security review. This is not a Microsoft-authored course.
Instructor planning retains a 25-minute core and separate 12-minute onboarding;
the revised live sequence requires rehearsal. Student labs show no durations.

## Slide 1 - Get your lab account

Request the approved event account. Follow each numbered lab when its button
appears, then return to the slides. Never use production credentials.

## Slide 2 - Use the approved access process

Open the released event form, provide only the requested name/email and optional
company, accept the terms and submit once. Lab 1 handles access, not agent creation.

## Slide 3 - Check the lab-access email

Find the username, Temporary Access Pass and sign-in link. Read the actual lifetime;
keep the credential private. Check Junk and ask for help rather than resubmitting.

## Slide 4 - Sign in using the approved method

Open [Microsoft 365 admin center](https://admin.microsoft.com/) in a private window
with the lab account. Lab 2 only confirms that account. Do not bypass security prompts.

## Slide 5 - Confirm readiness without extra privileges

Understand, try and inspect Microsoft's helpdesk sample. The instructor prepares
and publishes it, then gives the exact event name and tested chat URL.
Standing AI Reader is registry access, not chat, source or Copilot Studio authoring
access. Students do not create or publish an agent in Module 1.

## Slide 6 - See It. Control It. Protect It.

- **See it:** purpose, accountable people and context.
- **Control it:** approved data, tools and authority.
- **Protect it:** observed behavior, evidence and response.

Explain the task, knowledge, actions and evidence without claiming universal coverage.

## Slide 7 - One Microsoft sample. Four questions.

Follow [Agent Academy Mission 06](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/).
An employee needs help with an IT issue or policy. The agent should use verified
support guidance and escalate unknowns, not invent policy or request passwords.

The course setup supplies a Contoso IT SharePoint template with sample policy
pages and Devices/Tickets lists. Lists are not automatically agent tools.
Module 1's boundary is answer and explain; ticket creation or device changes require
separately configured actions, authorization and tests.

Ask: what does it do, who owns and acts, what can it reach, and what evidence exists?
Beacon is not the required business case or proof the sample is deployed.

## Slide 8 - Purpose, instructions, knowledge and tools

| Lens | Inspect |
|---|---|
| Purpose | The employee problem the agent should solve |
| Instructions | Response and escalation guidance; not an access-control policy |
| Knowledge | Actual approved sources and their access rules |
| Tools | Configured lookups/actions, connections and permissions |

These are inspection lenses, not a universal object model. Knowledge answers;
tools act. A good answer does not prove a tool ran.

## Slide 9 - Two attack surfaces. Two evidence planes.

Misused identity, connection or management access can expose information outside
the approved boundary. Misleading retrieved content can influence an agent that
is correctly signed in. Compare identity/access evidence with the actual question,
source, answer and any tool result. A valid sign-in does not prove safe advice.

Lab 3 uses an ordinary support question and an out-of-scope question, not an attack.
A passing refusal test does not guarantee every boundary will hold.

## Slide 10 - Agent 365: observe, govern, secure

Microsoft's build sequence defines the purpose, adds knowledge, tests and publishes.
Separate maker, employee and reviewer roles:

- The maker configures the agent in an approved environment.
- The employee uses its shared channel and checks the result.
- The reviewer uses Agent 365 to inspect supported inventory and accountability.

AI Reader alone provides neither maker nor chat/source access. The Academy is the
low-code learning route; [Agent 365 SDK samples](https://learn.microsoft.com/microsoft-agent-365/developer/samples)
are a separate pro-code integration route. Do not mix their setup instructions.

## Slide 11 - Review one agent, not three portals

Launch Lab 3: **understand, inspect configuration, test, review inventory, compare
access, inspect separate risk, distinguish evidence, explain**.
No worksheet, prescribed copied answer or written submission.

The instructor must supply a real helpdesk sample, available knowledge and a
tested authenticated chat channel. A published lab page is not a running agent.
Maker configuration is shown by the instructor; attendees do not need authoring roles.
Missing sample setup is blocked, not successful completion.

The existing **Project Beacon Relay Agent** is a separate staged-risk identity,
not the helpdesk agent. Select Total agents, search Relay and press Enter; open
Security > Risk details and verify High / The agent is compromised.
Bypass the risk-count filter, which returned no agents despite profile risk on
November 19. Missing profile risk is not a completed check. No blocking or risk changes.

## Slide 12 - Five Entra pillars, one control map

Match a sample finding to identity/lifecycle, creators/managers, permission
governance, Conditional Access/risk or supported network controls.
Inspect actual source permissions and connections separately from registry metadata.
Reported permissions do not prove approval, expiry or complete effective access.
No policy changes in Module 1; authority tracing follows in Module 3.

## Slide 13 - Protect the data. Record the evidence.

Use the IT knowledge example: know the data, limit unsafe sharing, and assign an
owner to improvement work. Audit is not blocking. Compliance Manager's score is
not certification; workload coverage and licensing need their own checks.

## Slide 14 - Ask what each evidence source can prove

| Question | Where to check |
|---|---|
| Knowledge or action used by this sample? | Instructor: Copilot Studio > sample agent > Test > activity map |
| Identity sign-in or directory change? | Entra ID > Monitoring & health > Sign-in logs or Audit logs |
| Supported workload audit? | Purview > Solutions > Audit > Search |
| Threat investigation? | Defender > Incidents & alerts > Incidents or Alerts |

AI Reader does not grant these additional roles. The test map is not a complete
security audit trail. The separate Module 2 custom runtime uses Azure portal >
its Container App > Monitoring > Log stream; do not present that as Copilot Studio.

## Slide 15 - Connect the evidence to a decision

Observe, attribute, investigate, contain, verify and improve. Events, alerts and
incidents differ. Do not force an incident or claim universal runtime protection.
No live containment or ISOC enrollment is required.

## Slide 16 - Explain the sample and its boundary

Discuss the employee task, one real source, whether a tool action was configured
or observed, and one unproven control. A failed answer test is a finding, not a
success to invent. Revisit slide 9 if legitimate sign-in is treated as safe behavior.

## Slide 17 - Establish normal before investigating abnormal

Reuse the review method across implementations. The current Module 2 uses a
separate custom Mail Agent; it still needs its own runtime, sender, tool and receipt
preflight. The helpdesk test does not prove mail delivery or student maker access.
Later modules deepen identity, governance, data protection and investigation.

## Sources and scope

See the [source map](sources.md) for official build, sample, registry and security
references, checked November 19, 2026. Source links are learning references, not
proof that the sample has been deployed or that every registry field synchronizes.
