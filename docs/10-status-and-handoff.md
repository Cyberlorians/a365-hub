# Status and handoff (November 23, 2026)

Use this page to resume work after a restart. Everything below is committed to `main`.

## Where things stand

- Modules 1 and 2 are built as student decks plus labs, each with a separate instructor view, on GitHub Pages.
- Module 1 teaching slides 6-17 tell one story about the Workshop IT Support Agent. Slide 11 is Lab 3, "Review two agents in the registry". Project Beacon Relay is used only as the second, flagged record (step 4).
- Rebuild and validate: `node scripts\build-walkthroughs.mjs`, then `node scripts\check-workshop.mjs`. Publish with `git push origin HEAD:main` and watch `module-01-pages.yml`. If the deploy fails with "No artifacts named github-pages-N", re-run it with `gh workflow run module-01-pages.yml --ref main`.

## Where the content comes from

- The Microsoft Learn path "Explore Microsoft Agent 365" is mapped in `grounding/sources.md` (ideas by module, shadow AI, learner-facing links). Learn content is paraphrased and linked, not copied, and the downloaded text is kept outside the repo.
- Slide 17 and the learner guide's last step link Microsoft's "Monitor and manage agents" unit as optional reading. Microsoft's inventory exercise needs the AI Administrator role and an Agent 365 license, so it is an optional administrator follow-up only.

## Decisions made

- Student decks contain no instructor material. Instructor views carry the say-scripts, lab cues and recovery.
- Learners get standing AI Reader only: no PIM, no maker or admin roles.
- No screenshots from other courses. No fabricated telemetry. Never claim Relay has tools.
- Fixture agents by module and the optional learner-built agent are in `docs/06-customer-learning-plan.md`, section 16 (draft decision).

## Tenant state

- Browser admin session: commercial `DibSecurity.onmicrosoft.com`. Azure CLI is signed into a different government-cloud tenant (`dibsecurityus3.onmicrosoft.us`). Confirm the workshop tenant before any CLI work.
- A private Copilot Studio draft, "Workshop IT Support Agent (synthetic)", exists in the default environment. Its only knowledge source is `https://learn.microsoft.com/troubleshoot/windows-client`, with no write tools. It is owned by a personal account.
- Project Beacon Relay has a staged High "The agent is compromised" risk. Use Total agents, search, then Enter, because the Agents-at-risk filter returns no rows.
- The tenant has not been hydrated.

## Open items

1. Choose the workshop tenant and a workshop-owned account to own the support agent and the Beacon agents.
2. Rehearse Lab 3 as a real AI Reader learner. It is unverified whether that role sees Data & tools or the Shadow AI page.
3. Decide whether the learner-built agent is an optional extension or cut.
4. Then: a read-only inventory of licenses, Purview, Defender and Entra governance. After that, a previewed hydration list for approval and the Module 8 CTF.
5. Own screenshots of the registry would add visuals, but they need a workshop-owned owner shown or the name blurred first.

## Do not touch

- `docs/01-full-day-workshop.md` has uncommitted personal edits.
- `grounding/images/agent-id-scenarios.png` is untracked and its reuse rights are unverified.
