import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { buildView, buildModule, views, urlFor } from "./build-walkthroughs.mjs";
import { codeBlocks, esc, labMeta, labSlides } from "./workshop-lab-content.mjs";
import { teachingSlides } from "./workshop-instructor-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), "utf8");
let brandPalette;
const markdownFiles = [
  "README.md", "docs/00-project-outline.md", "docs/01-full-day-workshop.md",
  "docs/02-baseline-agenda.md", "docs/module-roadmap.md", "docs/06-customer-learning-plan.md",
  "grounding/sources.md", "grounding/integration-map.md", "detections/README.md",
  "slides/module-01-what-is-agent-id.md", "labs/module-02-business-agent.md",
  "labs/module-01-security-foundation.md", "docs/07-module-01-admin-runbook.md",
  "docs/08-module-02-admin-runbook.md", "docs/05-onboarding-deployment-runbook.md"
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
  assert(html.includes(`href="${urlFor({ module: id, role: "learner" })}">Labs</a>`), "Each teaching deck must open its labs");
  assert(!html.includes("Instructor guide") && !html.includes("view=admin"), "The student deck must not link to instructor material");
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
const module1Steps = [...read("labs/module-01-security-foundation.md").matchAll(/^\| \d+ \| \[Slide (\d+)\].* \| ([\d.]+) \|$/gm)];
assert.deepEqual(module1Steps.map(match => Number(match[1])), Array.from({ length: 13 }, (_, index) => index + 6), "Learner guide must cover Module 1 slides 6-18 in order");
assert.equal(module1Steps.reduce((total, match) => total + Number(match[2]), 0), 25, "Module 1 walkthrough timing");
const module2Steps = [...read("labs/module-02-business-agent.md").matchAll(/^\| \[Slide (\d+)\].* \| ([\d.]+) \|$/gm)];
assert.deepEqual(module2Steps.map(match => Number(match[1])), Array.from({ length: 8 }, (_, index) => index + 1), "Learner guide must cover all eight Module 2 slides in order");
assert.equal(module2Steps.reduce((total, match) => total + Number(match[2]), 0), 35, "Module 2 walkthrough timing");
assert(read("docs/08-module-02-admin-runbook.md").includes("deletes its entire resource"), "Admin must retain the upstream deployment deletion warning");
for (const [file, count, firstSlide] of [
  ["labs/module-01-security-foundation.md", 7, 6],
  ["labs/module-02-business-agent.md", 8, 1],
  ["docs/07-module-01-admin-runbook.md", 7, null],
  ["docs/08-module-02-admin-runbook.md", 8, null]
]) {
  const content = read(file);
  assert.equal((content.match(/<details>/g) ?? []).length, (content.match(/<\/details>/g) ?? []).length, `Unclosed optional reference in ${file}`);
  const quick = content.replace(/<details>[\s\S]*?<\/details>/g, "");
  const steps = [...quick.matchAll(/^## Step (\d+):[^\n]*/gm)];
  assert.deepEqual(steps.map(step => Number(step[1])), Array.from({ length: count }, (_, index) => index + 1), `Simple numbered path in ${file}`);
  const stepText = quick.slice(steps[0].index);
  steps.forEach((step, index) => {
    const body = quick.slice(step.index, steps[index + 1]?.index ?? quick.length);
    for (const label of ["**Do:**", "**Check:**", "**Next:**"])
      assert(body.includes(label), `Step ${index + 1} needs ${label} in ${file}`);
  });
  if (firstSlide !== null) {
    const slideNumbers = [...stepText.matchAll(/\[Slide (\d+)\]/g)].map(match => Number(match[1]));
    assert.deepEqual(slideNumbers, Array.from({ length: firstSlide === 6 ? 13 : 8 }, (_, index) => index + firstSlide), `Visible walkthrough slide coverage in ${file}`);
    const minutes = [...stepText.matchAll(/^## Step \d+:.*\((\d+) minutes\)/gm)].reduce((sum, match) => sum + Number(match[1]), 0);
    assert.equal(minutes, firstSlide === 6 ? 25 : 35, `Visible walkthrough timing in ${file}`);
  }
}
const liveLearner = read("labs/module-02-business-agent.md").split("<details>")[0];
assert(liveLearner.includes("Do not send email") && liveLearner.includes("<approved-real-internal-recipient>"), "Live guide needs separate draft and explicit send snippets");
assert(liveLearner.includes("The public slide site is not the deployed agent"), "Learners need the real deployed UI URL");
const templates = ["infrastructure.bicep", "model-access.bicep", "model-account.bicep", "applications.bicep", "ui.Dockerfile", "config.example.json"];
templates.forEach(file => assert(fs.existsSync(path.join(root, "labs/workshop", file))));
const deploy = read("scripts/Deploy-Workshop.ps1");
assert(!deploy.includes("deploy-aca.ps1") && !deploy.includes("'group', 'delete'"), "Deployment must not call the destructive upstream script or delete a group");
assert(deploy.includes("git") && deploy.includes("archive") && deploy.includes("ZeroFreeBSTR"), "Build tracked source only and clear the marshalled secret");
const workflow = read(".github/workflows/module-01-pages.yml");
assert(workflow.includes("node scripts/build-walkthroughs.mjs"), "Pages must build the four walkthrough presentations");
assert(!workflow.includes("cp slides/module-01/index.html") && !workflow.includes("cp slides/module-02/index.html"), "Do not overwrite the built modules with the teaching-only source");
for (const module of [1, 2]) {
  const html = buildModule(module);
  assert(html.includes('id="view-lab"') && !html.includes('id="view-admin"'), "The student page contains only the labs view");
  assert(html.includes('<button hidden type="button" id="notesToggle"') && html.includes("Slides with a hands-on lab after each lesson"), "Presenter tools must be hidden from students");
  assert(!html.includes("Instructor guide") && !html.includes("facilitator-note") && !html.includes('=== "n"'), "No instructor material or presenter shortcuts on the student page");
  for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
  for (const lab of labMeta(module))
    assert.equal((html.match(new RegExp(`>Start Lab ${lab.n}</a>`, "g")) ?? []).length, 1, `Module ${module} lessons must start Lab ${lab.n} exactly once`);
}
const adminGuides = { 1: ["docs/07-module-01-admin-runbook.md", /<details>\n<summary>Optional admin reference:/], 2: ["docs/08-module-02-admin-runbook.md", /<details>\n<summary>Optional technical reference:/] };
for (const config of views) {
  const { html, slides } = buildView(config);
  const label = `Module ${config.module} ${config.role}`;
  assert(html.includes(brandPalette), `${label} must preserve the original blue branding`);
  assert(!html.includes("<script src=") && !/fetch\(|localStorage|sendBeacon/.test(html), `${label} must remain self-contained and cannot call tenant APIs`);
  for (const [index, script] of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries())
    new vm.Script(script[1], { filename: `${config.role}-${config.module}-inline-${index}.js` });
  assert(!/data-lesson|data-reference|Open Slide|\[Slide \d/.test(html), `${label} must not send learners off to other slides`);
  assert(html.includes("data-copy") && html.includes('id="next"') && html.includes('id="jump"'));
  assert(config.role === "learner" ? html.includes("1. Slides") && html.includes("2. Labs") : html.includes("Student slides") && html.includes("Student labs"), `${label} navigation`);
  for (const match of html.matchAll(/src="(assets\/[^"]+)"/g))
    assert(fs.existsSync(path.join(root, "slides", match[1])), `${label}: missing screenshot ${match[1]}`);
  assert.equal(new Set(slides.map(slide => slide.key)).size, slides.length, `${label} slide keys must be unique`);
  for (const slide of slides) {
    assert(slide.doItems.length >= 1 && slide.doItems.length <= 5, `${label} / ${slide.key}: use one to five short actions`);
    assert(slide.doneWhen && (slide.visual || slide.snippet || slide.score), `${label} / ${slide.key}: needs a done-when line and a visual or copy box`);
  }
  if (config.role === "learner") {
    const steps = slides.filter(slide => slide.number);
    assert.equal(steps.length, labSlides(config.module).length, `${label} step count`);
    for (const lab of labMeta(config.module)) {
      const inLab = steps.filter(slide => slide.lab === lab.n);
      assert(inLab.length >= 3 && inLab.length <= 6, `${label} Lab ${lab.n} should have three to six small steps`);
      assert(inLab.at(-1).links.some(link => link.href === `./#slide-${lab.back}`), `${label} Lab ${lab.n} must lead back to its lesson`);
    }
    assert(steps.every(slide => slide.visual && slide.note), `${label} steps each need a picture and a cue for the instructor deck`);
    assert(!/facilitator-note|Instructor only|Instructor notes|data-instructor-only|Instructor guide/.test(html), "Student labs must not contain instructor material");
    assert(!html.includes('id="notesMode"'), "Student labs must not offer an instructor toggle");
  } else {
    const [file, marker] = adminGuides[config.module];
    for (const [key, block] of Object.entries(codeBlocks(file, marker)))
      assert(html.includes(esc(block.code)), `${label}: guide snippet ${key} is missing from the instructor deck`);
    const teaching = teachingSlides(config.module);
    for (const slide of teaching)
      assert(slides.some(item => item.key === `t${slide.n}`), `${label}: missing run-of-show slide for teaching slide ${slide.n}`);
    for (const lab of labMeta(config.module)) {
      assert(slides.some(item => item.key === `lab${lab.n}-run`) && slides.some(item => item.key === `lab${lab.n}-cues`), `${label}: Lab ${lab.n} needs launch and cue slides`);
      const cues = slides.find(item => item.key === `lab${lab.n}-cues`);
      for (const step of labSlides(config.module).filter(item => item.lab === lab.n && item.snippet))
        assert(cues.snippet.code.includes(step.snippet.code), `${label}: Lab ${lab.n} snippet bundle is missing "${step.title}"`);
    }
    assert(html.includes("Show") && html.includes("Say") && !html.includes('id="notesMode"'));
  }
}
const learnerGuide2 = codeBlocks("labs/module-02-business-agent.md", /<details>\n<summary>Optional reference:/);
const labHtml2 = buildView({ module: 2, role: "learner" }).html;
for (const key of ["4.1", "5.1"]) assert(labHtml2.includes(esc(learnerGuide2[key].code)), `Module 2 lab must contain guide snippet ${key} exactly`);
assert(labHtml2.includes("Do not send email") && labHtml2.includes("&lt;approved-real-internal-recipient&gt;"), "Module 2 lab needs separate draft and send snippets");
assert(buildView({ module: 1, role: "learner" }).html.includes("Open the Entra admin center"), "Module 1 lab must contain the portal steps");
assert(!buildView({ module: 1, role: "learner" }).html.includes('class="quiz"') && !buildView({ module: 2, role: "learner" }).html.includes('class="quiz"'), "Labs must be real actions, not quizzes");
assert(workflow.includes("name: github-pages-${{ github.run_attempt }}") &&
  workflow.includes("artifact_name: github-pages-${{ github.run_attempt }}"), "Pages upload/deploy must select the same retry-specific artifact");
for (const name of markdownFiles) {
  const content = read(name);
  assert(!/[A-Za-z]:[\\/](?:Users|tools)[\\/]|file:\/\/\/|session-state[\\/]/i.test(content), `Private machine path in ${name}`);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const file = decodeURIComponent(target.split("#")[0]);
    assert(fs.existsSync(path.resolve(root, path.dirname(name), file)), `Broken local link in ${name}: ${target}`);
  }
  for (const match of content.matchAll(/https:\/\/cyberlorians\.github\.io\/a365-hub\/(module-02\/)?#slide-(\d+)/g))
    assert(Number(match[2]) >= 1 && Number(match[2]) <= (match[1] ? 8 : 18), `Invalid slide link in ${name}: ${match[0]}`);
}
console.log("PASS: Two blue modules with 18/8 teaching slides, visual student labs, instructor setup/notes, exact copyable snippets, 15/25/35 timing, source alignment, eight-module plan, 39 sources and documentation links.");
