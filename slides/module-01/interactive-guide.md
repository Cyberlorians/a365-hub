# Interactive HTML Deck Guide

The Module 1 presentation is a self-contained interactive file:

- [index.html](index.html)

No web framework, package installation, build command, account, or tenant permission is
required. CSS, diagrams, presenter notes, exercise logic, and readiness state are contained
in the file.

## Open locally

### Windows

1. Clone or download the repository.
2. Open `slides/module-01/index.html` in Edge, Chrome, or Firefox.
3. Select fullscreen or press `F`.

Opening through a local web server is optional. The file works using a `file:///` URL.

## Controls

| Action | Mouse/touch | Keyboard |
|--------|-------------|----------|
| Next slide | Right arrow button or swipe left | `Right`, `PageDown`, or `Space` |
| Previous slide | Left arrow button or swipe right | `Left` or `PageUp` |
| First/last slide | — | `Home` / `End` |
| Presenter notes | `N` button | `N` |
| Interactive exercise | `Q` button | `Q` |
| Permissions/readiness | Check button | `R` |
| Fullscreen | Fullscreen button | `F` |
| Help | `?` button | `?` |
| Close panel | Close button | `Esc` |

The current slide is reflected in the URL hash. For example, `index.html#slide-8` opens the
Agent ID versus Agent 365 slide.

## Presenter workflow

1. Before attendees arrive, press `R` and walk through the permissions/readiness checklist
   using a real attendee test account.
2. Press `N` to expose the current slide's talk track on the presenter display.
3. Present slides 1–13.
4. On slide 14, press `Q`. Learners classify the three scenarios; select **Score
   classifications** for feedback and sample controls/events.
5. Close the exercise and use slide 15 for the room debrief.
6. On slide 16, reopen readiness before transitioning to the first build lab.

Readiness selections remain only in browser `localStorage`. They contain no credentials or
user identifiers and are not synchronized. Use the [full permission guide](permissions-preflight.md)
for actual role assignment and acceptance testing.

## Share it

The GitHub Pages workflow publishes this folder as a static site after a push to `main`.
The expected URL is:

- `https://cyberlorians.github.io/a365-hub/`

A downloaded copy also works offline. Use browser **Print → Save as PDF** for a simple
handout, but retain [taxonomy-handout.md](taxonomy-handout.md) as the canonical accessible
one-page learner reference.

## Accessibility

- All actions have keyboard equivalents.
- Slide changes are announced through a polite live region.
- Diagrams include text alternatives.
- Motion is removed when `prefers-reduced-motion` is enabled.
- Browser print produces one slide per page.
- High-contrast semantic colors and visible keyboard focus are included.

Before customer delivery, validate zoom, contrast, keyboard navigation, and screen-reader
behavior in the organization's supported browser.

## Customize safely

- Edit slide markup inside the numbered `<section class="slide">` elements.
- Keep every slide's `data-title` and `data-note`; the latter feeds presenter mode.
- Do not insert tenant IDs, UPNs, object IDs, TAPs, screenshots with user data, or access
  tokens.
- Keep scripts dependency-free unless the deployment model is intentionally changed.
- Re-run the browser smoke test after every HTML edit.
