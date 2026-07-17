# Module 1 and Workshop Permissions Preflight

This guide separates what is required to **view Module 1** from access needed by the
hands-on build, Entra, Defender XDR, and Sentinel labs that follow it.

> Least-privilege rule: learners do not need Global Administrator, Security Administrator,
> Contributor, or Owner. Never use a broad admin role to hide a failed lab configuration.

## Module 1 only

| Requirement | Needed? | Validation |
|-------------|---------|------------|
| Modern browser | Yes | Open [index.html](index.html), advance slides, press `N`, `Q`, and `R` |
| Internet | No, when opened locally | The deck is self-contained; only external reference/service links need internet |
| Tenant account | No | Required only when transitioning to the build lab |
| Entra/Azure role | No | Module 1 performs no tenant API calls |
| Local installation/admin rights | No | Open the file directly; nothing is installed |

The readiness checklist in the HTML deck is a **manual acceptance record stored in that
browser's local storage**. It does not sign in to Microsoft Graph and must not be described
as an automated authorization audit.

## Learner access for the full workshop

| Area | Least-privilege target | Acceptance test |
|------|------------------------|-----------------|
| Sign-in | Temporary lab member account protected by an 8-hour multi-use TAP and workshop MFA policy | Sign in to the lab tenant in a private browser session without registering a personal phone |
| Licensing | Microsoft 365 E7 or the approved equivalent Agent 365, Copilot/Copilot Studio, and security entitlements required by the selected exercises | Open Copilot Chat, Copilot Studio, Agent 365, and the required security portals with a test attendee; create a throwaway draft in the intended environment |
| Power Platform environment | Access to the instructor-provided Copilot Studio environment and only the maker/import capability required by the exercises | Select the correct environment, import the supplied solution, create/save an agent, and remove the test artifact |
| Entra inspection | Read-only directory access sufficient for the exact Agents blades used by the walkthrough | Open Entra admin center, locate the relevant Agents inventory/details, and confirm editing actions are unavailable |
| Defender XDR | Custom Unified RBAC **read-only** role with only required security data and data sources | Open Advanced Hunting and run a benign query; confirm response/remediation actions are unavailable |
| Microsoft Sentinel | `Microsoft Sentinel Reader` at the **lab workspace** scope | Open the lab workspace, Hunting, and Logs; confirm role assignment or content editing is unavailable |

Microsoft's Agent in a Day modules state that instructor-led events provide the required
resources. For self-directed delivery, validate current licensing and environment behavior
against the linked Microsoft Learn modules before every event.

## Facilitator provisioning matrix

| Task | Operator permission | Standing learner permission? |
|------|---------------------|------------------------------|
| Create temporary attendees and issue TAPs | Provisioner managed identity: `User.ReadWrite.All` and `UserAuthenticationMethod.ReadWrite.All` | No |
| Create group, CA policy, and licensing assignment | Interactive admin running `Setup-EntraPrereqs.ps1`; delegated scopes documented in the deployment runbook | No |
| Build an agent | Environment-scoped maker capability and applicable product license | Yes, only for workshop duration |
| Inspect Agent ID objects | Read-only directory access validated against current portal behavior | Yes, only if required by the walkthrough |
| Hunt in Defender XDR | Defender Unified RBAC custom read role | Yes |
| Hunt in Sentinel | Microsoft Sentinel Reader on the lab workspace | Yes |
| Deploy/tear down Azure onboarding infrastructure | Azure Contributor/Owner plus Entra role needed for Graph app-role assignment | No |

See the [deployment runbook](../../docs/05-onboarding-deployment-runbook.md) for exact
deployer and managed-identity permissions.

## Pre-event validation sequence

Run this with a **real test attendee**, not an administrator:

1. Submit/provision the test attendee through the same path used on event day.
2. Sign in with its UPN and TAP in a private browser session.
3. Open Microsoft 365 Copilot Chat and create/delete a disposable draft agent.
4. Open Copilot Studio, select the workshop environment, and perform the exact first create
   or solution-import action used by the lab.
5. Open the Entra Agents view used by the walkthrough and verify read-only behavior.
6. Open Defender XDR Advanced Hunting and run a harmless query such as a schema/table
   availability check appropriate to the tenant.
7. Open the target Sentinel workspace and run a read-only log query.
8. Confirm the attendee cannot manage users, roles, Conditional Access, XDR response
   actions, Sentinel role assignments, or unrelated Azure resources.
9. Delete the disposable agent and test attendee; verify licensing is reclaimed.

## Common failures

| Symptom | Fix—without overprivileging |
|---------|------------------------------|
| Copilot Studio opens but environment is missing | Assign access to the specific workshop environment; verify tenant/environment selection and license propagation |
| Agent creation or solution import is blocked | Add only the environment-scoped maker/import capability required by the lab, then retest |
| Entra portal opens but Agents details are hidden | Validate the current least-privileged read role against that blade; do not jump to Global Reader or Global Administrator without evidence |
| XDR portal opens but hunting data is unavailable | Check Unified RBAC role assignment, workload activation, and data-source scope |
| Sentinel workspace is missing | Check `Microsoft Sentinel Reader` assignment at the correct workspace and subscription/tenant context |
| New account appears unlicensed | Wait for dynamic-group and group-license propagation; confirm available SKU capacity and `usageLocation` |
| CA blocks the attendee | Review report-only results, device/compliance requirements, and the tested attendee-group exclusions; preserve the MFA requirement |

## Security boundary

The default public Form creates users that join a dynamic attendee group. Granting that
same group XDR or Sentinel access may allow any successful form submission to reach security
telemetry. Prefer a separate approved/static SOC-read group, or add an approval gate before
SOC access. Use only a dedicated lab tenant.

## Microsoft references

- [Agent in a Day learning path](https://learn.microsoft.com/training/paths/agents-online-workshop/)
- [Build agents in Copilot Chat](https://learn.microsoft.com/training/modules/agents-copilot-chat/)
- [Build a conversational agent in Copilot Studio](https://learn.microsoft.com/training/modules/agents-copilot-studio-online-workshop/)
- [Use tools in Copilot Studio](https://learn.microsoft.com/training/modules/copilot-tools-online-workshop/)
- [Make your agent autonomous](https://learn.microsoft.com/training/modules/autonomous-agents-online-workshop/)
