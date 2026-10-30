# Interactive Presentation Guide

| Module | Public URL |
|---|---|
| 1 | [Core](https://cyberlorians.github.io/a365-hub/#slide-6), [planned onboarding](https://cyberlorians.github.io/a365-hub/#slide-1) |
| 2 | [Separate slide deck](https://cyberlorians.github.io/a365-hub/module-02/#slide-1) |

Download/open either package's `index.html` for offline use of that module.
Cross-module/source links open public online resources. No external fonts/assets,
tracking, live API calls, provisioning, or mail actions are embedded in the decks.

Controls: Previous/Next, Jump, arrows/PageUp/PageDown, Home/End, **N** notes,
**F** fullscreen when supported, **R** preflight, **?** help, Escape close.
Horizontal touch swipes navigate outside controls/tables. Print includes all slides
in the opened module. Both modules default to the original Module 1 navy/cyan palette,
regardless of the system theme. Use `?scoutTheme=light` for a blue-on-white variant or
`?scoutTheme=dark` for navy/cyan.

The original styling remains in Git history at `ccf6fcdb0648d20be427aacdc3edd18817b687af`,
in `slides/module-01/index.html`. Its navy `#07111f`, panel blue `#102640`,
cyan `#56d7ff`, text `#f5f8ff`, and muted `#a9bad1` are restored without reverting
the updated lessons. The brand overrides in each standalone HTML keep both decks
consistent; the workshop validator checks this.

The preflight checkboxes are not tests or readiness proof; state is not stored.
Module 1 deep links retain `#slide-N`; Module 2 uses its own `#slide-N`.

## Authoring

HTML is self-contained and includes notes in each slide's template. Markdown source
and speaker notes must be updated coherently; there is no Markdown-to-HTML compiler.
Run `node scripts/check-workshop.mjs` from the repository root before publication.
One Pages workflow stages both modules; do not create competing root deployments.

Use [the master plan](../../docs/06-customer-learning-plan.md) for the module story,
review gate, source register, preparation and release criteria.
