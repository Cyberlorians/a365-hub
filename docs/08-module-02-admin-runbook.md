# Module 2: Admin Step-by-Step Preparation and Rehearsal

**Updated:** October 30, 2026.
**Status:** Draft operator runbook. No live preparation, account creation, deployment,
mail delivery, or downstream evidence has been validated for this activity.

[Module 2 slides](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) |
[Learner steps and passport](../labs/module-02-business-agent.md) |
[Speaker notes](../slides/module-02/speaker-notes.md) |
[Module 1 admin runbook](07-module-01-admin-runbook.md)

## 1. Select mode and obtain approval

1. **Content review now:** walk all eight slides and learner steps without sign-in,
   model/tool calls, account creation, or deployment. Use only author-written examples,
   labeled synthetic. Record missing environment details rather than invent them.
2. **Live proof later:** requires explicit approval for the environment, roles/grants,
   initial test identity/mailbox, internal recipient, runtime, costs, evidence, and reset.
3. **Hands-on release later:** additionally requires two fresh learner accounts and
   an independent facilitator following the written steps within 35 minutes.

A real, verified prior run can support a labeled demo; no verified evidence pack exists
yet for this activity. Without proof, deliver review mode, not a successful demonstration.

## 2. Fill the private preparation card

Do not place real values or credentials into the public guide. Keep this record in an
approved restricted location. Blank/unknown mandatory fields block live execution.

| Input | Record before live proof |
|---|---|
| Event/run ID, time zone, content/toolkit revision, owners | |
| Authorized tenant/subscription and isolated resource scope | |
| Operator roles, grant approver, data/evidence viewer | |
| Entitlements, mailbox licenses, model quota/region, approved cost/run limit | |
| Existing/new resource inventory and explicit create/change/reset manifest | |
| Initial lab user/mailbox and controlled real internal recipient | |
| Actual UI URL, selected agent label, visible submit control, sign-in route | |
| Runtime endpoint/health verification method and model deployment | |
| Public client, blueprint, registration, runtime and telemetry IDs with types | |
| Effective grants, inheritance, consent, and intended authority route | |
| Secret storage/expiry/rotation owner, without secret values | |
| Runtime/workload/downstream evidence locations, access, retention, expected delay | |
| Response/support owner and approved reset/teardown method | |

The reviewed candidate web UI sends from the signed-in user's mailbox with delegated
authority. Its sample name, ACA-OBO, does not prove an OAuth OBO exchange.
Do not equate configured agent telemetry ID, app ID, object ID, or sender.

## 3. Inspect the pinned toolkit before any mutation

Use the reviewed [toolkit setup](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/setup-MAF-ACA-OBO.md)
and [observability guide](https://github.com/stefanpems/a365-lab-toolkit/blob/1a1d3f5253771a20915fa519aaaa58f576a5cf35/docs/aca-a365-observability.md).
Confirm reuse rights before redistributing source/assets.

1. Obtain an authorized local source copy at the pinned revision and record its actual
   checkout path. The source copy is separate from this workshop repository.
2. Review `aca\obo`, its configuration examples, actual setup/deployment scripts, UI
   route, and verification code. Do not install/run other agent variants by default.
3. Check source-documented prerequisites: Azure CLI, Agent 365 CLI (source says at least
   1.1.x), its .NET runtime, Python 3.12+, `uv`, and script requirements. Follow the
   pinned project's environment/dependency setup only after approval.
4. Review the public-client requirement separately from the blueprint. The source
   requires powerful instructor setup/admin consent; learners do not receive those roles.
5. Review every proposed grant, inheritance setting, consent, secret, and output sink.
   The documented `allAllowed`/broad consent and printed blueprint secret are not
   demonstrated least privilege or secretless workload authentication.
6. **Deployment stop:** the source says `deploy-aca.ps1` deletes its entire resource
   group by default. Do not run that default command. `-ReuseEnv` is only a possible
   reviewed path for a verified existing environment; the source says it fails when
   the environment is absent. It is not a safe fresh-deployment substitute.
7. Approve an exact non-destructive setup plan for a new environment, or use an
   approved existing runtime. If neither exists, record the blocker and stay in review
   mode. This runbook intentionally supplies no unreviewed deployment one-liner.

**Checkpoint:** Actual source, prerequisites, proposed mutations, grants, cost, and
reset are reviewed. A documented source procedure is not permission to execute it.

## 4. Prepare isolated access, only after approval

1. Confirm the actual tenant/subscription in the approved operator session. Azure CLI
   context can change across sessions; explicitly scope approved resource commands.
2. Arrange one initial test identity/mailbox and a controlled internal recipient using
   the approved method. Reuse an existing safe fixture when possible.
3. If using the [existing onboarding reference](05-onboarding-deployment-runbook.md),
   inspect the scripts and cleanup templates first. Do not run bulk deletion or enable
   historical age-based cleanup. Account age is not TAP expiry.
4. Verify actual authentication/CA and mailbox access for the intended user. Do not
   bypass device compliance, MFA, or policy to complete a demo.
5. Keep instructor deployment/consent roles out of learner sessions. Record any
   standing permissions and who can revoke them.
6. Confirm the real internal recipient is test-only and approved; `.invalid` examples
   in the learner guide are not routable. No external recipients or real customer data.

**Checkpoint:** Correct user, tenant, mailbox, recipient, actual permissions, and support
owner. A signup/email or Microsoft 365 home page is insufficient.

## 5. Prepare and verify the actual runtime route

1. Apply only the separately reviewed setup plan. Preserve deployment logs in the
   approved restricted location, with secrets removed. Do not copy cleartext secrets
   into shell arguments, screenshots, source files, or public records.
2. Confirm actual registration and typed identifiers against source/system records.
3. Configure the selected UI route from the pinned guide; record its real URL,
   selected label, and chat submit control rather than guessing UI button text.
4. Confirm the actual `/chat` implementation uses the documented
   `MAIL_TOKEN_MODE=direct` route, or document/test any deviation before teaching it.
5. Check model authentication and policy compliance. Where required, use the approved
   Entra/managed-identity route instead of weakening a no-local-key policy.
6. Independently prove **health** and a minimal **inference** round trip using the
   source's verification procedure after dependencies/environment are configured.
   A CLI exit status and expected actual output must be recorded; health alone is not
   inference, Mail MCP access, or observability.
7. Complete the private preparation card with verified URLs/control labels. Test the
   learner path in a clean browser profile, not only the operator's cached login.

**Checkpoint:** Actual route, actor, registration, health and inference are known.
Any failure blocks sending until resolved through approved changes.

## 6. Prepare evidence without fabricating events

1. Review the real runtime/tool evidence available for the selected route. Record
   actual source, identifier types, supported fields, access and retention.
2. Verify exporter configuration, configured agent ID, actual downstream ingestion,
   and source/engine/key mapping separately. Configuration is not proof of ingestion.
3. Plan the internal receipt check: authorized admin confirms the controlled recipient
   mailbox, so learners do not need access to other users' mailboxes.
4. Label each record **current run**, **verified prior run**, **synthetic example**,
   or **missing**, with target, time/time zone, result, and provenance.
5. If downstream ingestion is delayed, preserve a real verified sanitized prior run
   from the same identified target with its own time. Never present it as current.
6. Do not seed fake rows into security tables, force alerts, disable global tuning, or
   join the GBB workload fixture to the toolkit agent by display name.

**Checkpoint:** Defined evidence can actually be accessed and attributed. Missing
coverage remains an open finding, not success.

## 7. Conduct the first approved task proof

Use the [learner guide](../labs/module-02-business-agent.md) exactly.

| Slide | Admin/facilitator action | Pass condition | Minutes |
|---|---|---|---:|
| 1 | State mode, utility, and limits | Learner knows proof has not established complete security | 2 |
| 2 | Confirm approved data/tool/recipient boundary | No extra sources, attachments, recipients, or production data | 2 |
| 3 | Verify user/tenant/UI route privately | Actual delegated sender distinguished from agent telemetry identity | 4 |
| 4 | Request draft only; inspect facts/word count | No unrequested action; synthetic facts preserved | 7 |
| 5 | Explicit send after review; confirm real receipt | Intended internal sender/recipient/subject/content/time; no duplicate retry | 5 |
| 6 | Inspect current tool/workload and proven downstream evidence | Typed attribution and evidence provenance; gaps explicit | 7 |
| 7 | Complete passport and deviation discussion | No invented identifiers, grants, policy results, or approval control | 5 |
| 8 | Debrief and record gaps | Useful outcome versus unproven controls is clear | 3 |
| **Total** | | **Slides and activity together** | **35** |

This is the initial one-user proof after approval, not independent hands-on validation.
If the agent acts before the learner requests it, stop and investigate; do not pretend
the prompt instruction was an enforced approval boundary.

## 8. Test repeatability and recovery

After the first proof, prepare two fresh learner accounts under the approved scope.
Have another facilitator follow the same written steps. Record actual control labels,
elapsed time, necessary corrections, and outcomes.

| Check | Safe expectation |
|---|---|
| Fresh profile / second fresh account | No author's cached session or hidden setup needed |
| Reload / naturally expired auth / approved test session expiry | Explicit failure/re-authentication and observed recovery, not false success |
| Tool permission failure, approved test condition only | No delivery claim; instructor reviews intended grants, never blanket consent |
| Inference failure, approved test or labeled tabletop | Error and stop; do not label a hypothetical recovery as tested |
| Delayed/missing downstream evidence | Labeled prior run or explicit coverage gap; no fabricated result |
| Uncertain send outcome | Inspect receipt/tool evidence before retry to avoid duplicate email |
| Wrong user/tenant/recipient or unsafe content | Stop and involve the responsible owner |

Do not induce failures by breaking shared/production policies or resources.
Differentiate observed recovery from tabletop discussion in the run record.

## 9. Reset, close, and make the release decision

1. Record created/reused identities, grants, runtime resources, messages and evidence
   in the approved manifest with exact identifiers and prior state.
2. Close learner/presenter sessions according to the event plan. Revoke/expire only
   the run's approved access and rotate/delete credentials through the responsible owner.
3. Remove test content or resources only if the manifest/policy authorizes it. Retain
   required evidence appropriately. Do not delete shared resources or all workshop users.
4. Verify cleanup/restore and residual access; deletion requests alone are not proof.
   Record blocked cleanup with owner/next action rather than hiding it.
5. Decide review-only, labeled verified demo, or hands-on-ready. Hands-on requires
   actual task/authority/evidence, two fresh users, recovery/reset, and independent timing.

| Run-record field | Record privately |
|---|---|
| Run/revision, operator, date/time zone and mode | |
| Actual approved user/target/route and typed identifier references | |
| Health / inference / receipt / registration / downstream proof, separately | |
| Evidence mode, location/time and gaps | |
| Fresh-user and independent-facilitator results; elapsed minutes | |
| Observed versus tabletop recovery results | |
| Manifest / restore/cleanup result / support owner | |
| Go / conditional go / hold and remaining prerequisites | |

## Automation and GBB boundary

Static synthetic brief is enough for Module 2. No document store, new custom MCP
server, GBB simulator, full SDK/AWS deployment, GSA rollout, or ISOC onboarding is a
hidden prerequisite. Reuse approved onboarding/runtime preparation only after script
review and authorization. Record any proposed generator's scope, permissions, cost/
request cap, evidence mode, idempotency, exact manifest, and manual alternative in the
[per-module automation plan](06-customer-learning-plan.md#16-per-module-data-and-automation-preparation).

## Content walkthrough record: October 30, 2026

| Verification | Result |
|---|---|
| Learner guide links cover all eight slides in order | Passed static validation; proposed row timings total 35 minutes |
| Eight slides at desktop/mobile widths and populated notes | Passed browser checks |
| Learner/admin links, Home navigation, notes open/close | Passed browser checks |
| Restored navy/cyan branding | Verified unchanged |
| Pinned setup prerequisites and default-deletion caveat | Reviewed against source documentation; no setup command executed |
| Initial/two-fresh-user proof, runtime, mail receipt, telemetry, recovery/reset | Not run |
| Independent facilitator and measured teaching duration | Not run; 35 minutes remains a proposed timebox |

The source review and content/browser walkthrough do not establish hands-on readiness.
