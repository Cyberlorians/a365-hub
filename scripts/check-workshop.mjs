import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), "utf8");
let brandPalette;
const markdownFiles = [
  "README.md", "docs/00-project-outline.md", "docs/01-full-day-workshop.md",
  "docs/02-baseline-agenda.md", "docs/module-roadmap.md", "docs/06-customer-learning-plan.md",
  "grounding/sources.md", "grounding/integration-map.md", "detections/README.md",
  "slides/module-01-what-is-agent-id.md", "labs/module-02-business-agent.md"
];
for (const id of [1, 2]) {
  const directory = `slides/module-0${id}`;
  const html = read(`${directory}/index.html`);
  const slides = [...html.matchAll(/<section class="slide" data-title="([^"]+)" data-minutes="([\d.]+)" data-phase="([^"]+)"/g)];
  assert.equal(slides.length, id === 1 ? 18 : 8, `Module ${id} slide count`);
  assert.equal([...html.matchAll(/<div class="module" data-module=/g)].length, 1, "Each page contains exactly one deck");
  assert.equal([...html.matchAll(/<template class="speaker-notes">/g)].length, slides.length, "Every slide has notes");
  const sum = entries => entries.reduce((total, match) => total + Number(match[2]), 0);
  assert.equal(sum(slides.filter(slide => slide[3] === "core")), id === 1 ? 25 : 35);
  if (id === 1) assert.equal(sum(slides.filter(slide => slide[3] === "onboarding")), 15);
  for (const [index, script] of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries())
    new vm.Script(script[1], { filename: `module-${id}-inline-${index + 1}.js` });
  assert(html.includes('href="https://cyberlorians.github.io/a365-hub/#slide-6"'));
  assert(html.includes('href="https://cyberlorians.github.io/a365-hub/module-02/#slide-1"'));
  assert(html.includes("Published content draft") && html.includes("--cp-bg: #f7f4ef;"));
  assert(html.includes('<html lang="en" data-brand="a365">'), "A365 branding must be active");
  const palette = html.match(/html\[data-brand="a365"\] \{([\s\S]*?)\n    \}/)?.[1];
  assert(palette, "A365 navy/cyan palette is required");
  for (const token of ["--cp-bg: #07111f;", "--cp-bg-elevated: #102640;", "--cp-accent: #56d7ff;", "--cp-text: #f5f8ff;", "--cp-text-muted: #a9bad1;"])
    assert(palette.includes(token), `Original Module 1 brand token missing: ${token}`);
  if (brandPalette) assert.equal(palette, brandPalette, "Both decks must use the same brand palette");
  brandPalette = palette;
  const themeScript = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [search, expected] of [["", "dark"], ["?scoutTheme=light", "light"], ["?scoutTheme=dark", "dark"], ["?scoutTheme=invalid", "dark"]]) {
    let theme;
    vm.runInNewContext(themeScript, {
      URLSearchParams,
      window: { location: { search }, matchMedia: () => ({ matches: false }) },
      document: { documentElement: { setAttribute: (name, value) => { if (name === "data-theme") theme = value; } } }
    });
    assert.equal(theme, expected, `Module ${id} theme selection for "${search}"`);
  }
  assert(!/<(?:form|iframe)\b|<script\s+src=/i.test(html), "No connected forms or external runtime");
  assert(!/fetch\(|XMLHttpRequest|sendBeacon|localStorage/.test(html), "No tenant API or stored attendee data");
  const source = read(`${directory}/slides.md`);
  const notes = read(`${directory}/speaker-notes.md`);
  slides.forEach((slide, index) => {
    const heading = `## Slide ${index + 1} - ${slide[1]}`;
    assert(source.includes(heading), `Slide source mismatch: ${heading}`);
    assert(notes.includes(heading), `Notes mismatch: ${heading}`);
  });
  const names = ["README.md", "slides.md", "speaker-notes.md", "facilitator-guide.md", "sources.md"];
  if (id === 1) names.push("exercise.md", "taxonomy-handout.md", "permissions-preflight.md", "interactive-guide.md");
  markdownFiles.push(...names.map(name => `${directory}/${name}`));
}
const plan = read("docs/06-customer-learning-plan.md");
assert.equal([...plan.matchAll(/^### Module \d+:/gm)].length, 8);
assert.equal([...plan.matchAll(/^\| [HTGBLC]\d+ \|/gm)].length, 39);
assert(plan.includes("## 16. Per-module data and automation preparation"));
assert(plan.includes("Review-first gate") && plan.includes("R0: public content draft"));
for (const name of markdownFiles) {
  const content = read(name);
  assert(!/[A-Za-z]:[\\/](?:Users|tools)[\\/]|file:\/\/\/|session-state[\\/]/i.test(content), `Private machine path in ${name}`);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const file = decodeURIComponent(target.split("#")[0]);
    assert(fs.existsSync(path.resolve(root, path.dirname(name), file)), `Broken local link in ${name}: ${target}`);
  }
}
console.log("PASS: Two standalone decks, 18/8 slides, 15/25/35 timing, source/notes parity, eight-module plan, 39 sources, data/automation matrix, safe draft labels and documentation links.");
