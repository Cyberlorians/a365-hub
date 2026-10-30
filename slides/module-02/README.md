# Module 2: Establish the Approved Agent Baseline

**Status:** Rough content draft for review. No runtime, test user, receipt, or downstream
evidence has been validated for this activity. **Duration:** 35 proposed minutes /
eight slides, including learner activity.

[Open Module 2 slides](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) |
[Student lab](https://cyberlorians.github.io/a365-hub/module-02/?view=lab) |
[Instructor setup](https://cyberlorians.github.io/a365-hub/module-02/?view=admin) |
[Open Module 1](https://cyberlorians.github.io/a365-hub/#slide-6)

## Outcome

The published module includes visual student lab and instructor sections. Build with
`node scripts/build-walkthroughs.mjs` from the repository root before local preview.
The Markdown guides are the plain-text reference; the classroom experience is the
presentation's Student lab and Instructor setup. Their copy-and-run snippets come from
those guides.

Define useful approved behavior, identify actual actor/authority/tool/data boundaries,
and record evidence before later modules investigate LOAT. The candidate is Stefano's
documented delegated-user internal-mail task, not a new retrieval system.

| File | Use |
|---|---|
| [index.html](index.html) | Separate standalone eight-slide deck with built-in presenter notes |
| [slides.md](slides.md) | Aligned slide source |
| [speaker-notes.md](speaker-notes.md) | Timing, prompts, caveats, transition |
| [facilitator-guide.md](facilitator-guide.md) | Setup gates, failures, reset, answers |
| [sources.md](sources.md) | Actual runtime route and supporting sources |
| [Learner guide](../../labs/module-02-business-agent.md) | Synthetic brief, proposed prompts, checkpoints, passport, recovery |
| [Admin runbook](../../docs/08-module-02-admin-runbook.md) | Copy/paste agent registration, safe API/UI deployment, HTTP/live tests, handoff and cleanup |

| Step | Minutes |
|---|---:|
| Outcome | 2 |
| Operating boundary | 2 |
| Actual actor/route | 4 |
| Draft/review | 7 |
| Explicit send/receipt | 5 |
| Evidence/provenance | 7 |
| Passport/boundaries | 5 |
| Debrief | 3 |
| **Total** | **35** |

The draft contains no connected send button. `.invalid` addresses are non-routable
examples; replace them only after approved isolated preparation.

The sample's ACA-OBO name is not proof of OAuth OBO: its documented web UI uses
`MAIL_TOKEN_MODE=direct`. Mail sender and configured agent telemetry ID are distinct.
The source setup includes a blueprint secret and powerful instructor consents; no
end-to-end secretless/least-privilege claim is established.

Review content first. Then approve initial test identity/mailbox, internal recipient,
runtime/permissions, synthetic fixture, evidence path, cost bounds, and cleanup.
Validate two fresh learners and an independent timed rehearsal before hands-on release.
See the [master plan](../../docs/06-customer-learning-plan.md).
