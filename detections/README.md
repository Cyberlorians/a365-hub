# Detection Pack

**Status:** Design backlog. No tested production-ready detection rules are shipped.
The revised investigation package belongs primarily to Module 7, with exposure/risk
context in Modules 3-6. See the [master plan](../docs/06-customer-learning-plan.md).

| Candidate | Expected source to validate | Status |
|---|---|---|
| Blueprint credential added | Actual Entra audit activity and typed target IDs | Planned |
| Excessive permission / Tier-0 grant | Actual grant/role audit and effective authority | Planned |
| TAP created by service/agent identity | Actual audit actor/target and supported context | Planned |
| Secret-authenticating blueprint inventory | Credential metadata and applicable sign-in evidence | Planned |
| Inventory/activity attribution | Current `AgentsInfo`, relevant `CloudAppEvents`, behavior/alert tables | Schema/coverage/keys require validation |

Do not assume the old `AIAgents` table or copy community queries across Advanced Hunting
and Log Analytics unchanged. Validate `Timestamp` versus `TimeGenerated`, source
coverage, history, join keys, roles, licensing, expected result, and rule semantics.
Fresh identities do not provide a fourteen-day baseline automatically.

Current DLP tuning may represent a signal in `BehaviorInfo`/`BehaviorEntities` rather
than an incident alert. Do not disable tenant-wide tuning to force a workshop outcome.
An event, behavior, alert, incident, query, and deployed detection rule are different outputs.

Each detection contribution requires safe authorized test procedure, actual or clearly
labeled evidence, tuning/false positives, investigation, scoped response/retest/reset,
and attribution to the Agent Identities playbook.

No fabricated security events, unapproved simulations, or automatic containment are
deployed for the public content drafts. See [CONTRIBUTING](../CONTRIBUTING.md).
