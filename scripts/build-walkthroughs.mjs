import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, rich, labSlides, labMeta, setupSlides, labIntro, fig, grid } from "./workshop-lab-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n");
const site = "https://cyberlorians.github.io/a365-hub";
export const views = [1, 2].flatMap(module => ["learner", "admin"].map(role => ({ module, role })));
export const urlFor = ({ module, role }) => `${site}/${module === 2 ? "module-02/" : ""}?view=${role === "admin" ? "admin" : "lab"}`;
const viewName = role => (role === "admin" ? "admin" : "lab");
// Pages are published at different depths, so in-page navigation uses relative links.
const relative = (from, module, role) => `${from === module ? "./" : module === 2 ? "module-02/" : "../"}?view=${viewName(role)}`;

const css = `
  header { padding: 12px 24px; }
  .walk-top { max-width: 1280px; margin: auto; }
  .mode-nav { margin-top: 10px; }
  .mode-nav .primary { font-weight: 700; }
  .walk-stage { width: min(1280px, 100%); margin: 16px auto; }
  .slide { min-height: 540px; padding: 28px 32px; }
  .walk-heading { display: flex; align-items: start; gap: 20px; margin-bottom: 12px; }
  .step-number { display: grid; place-items: center; flex: 0 0 64px; height: 64px; border-radius: 16px; background: var(--cp-accent-soft); color: var(--cp-accent); font-size: 30px; font-weight: 750; border: 1px solid var(--cp-border-strong); }
  h1 { font-size: clamp(28px, 2.6vw, 38px); margin: 0; letter-spacing: -.8px; line-height: 1.12; }
  .walk-heading p { margin: 0 0 6px; }
  .tracker { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 20px; padding: 0; list-style: none; }
  .tracker li { width: 28px; height: 8px; border-radius: 4px; background: var(--cp-border-strong); opacity: .5; margin: 0; }
  .tracker li.done { background: var(--cp-accent); opacity: .7; }
  .tracker li.current { background: var(--cp-accent); opacity: 1; width: 44px; }
  .lab-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 28px; align-items: start; }
  .lab-grid.single { grid-template-columns: minmax(0, 1fr); max-width: 900px; }
  .do-heading { margin: 0 0 10px; font-size: 20px; color: var(--cp-accent); text-transform: uppercase; letter-spacing: 1.2px; }
  ol.micro { list-style: none; counter-reset: micro; padding: 0; margin: 0 0 16px; }
  ol.micro li { counter-increment: micro; position: relative; padding: 10px 12px 10px 52px; margin: 8px 0; border: 1px solid var(--cp-border); border-radius: 10px; background: var(--cp-bg-elevated); font-size: 18px; line-height: 1.4; }
  ol.micro li::before { content: counter(micro); position: absolute; left: 12px; top: 10px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--cp-accent); color: var(--cp-accent-fg); font-weight: 750; font-size: 15px; }
  .done { margin: 16px 0; padding: 12px 16px; border-left: 4px solid var(--cp-success); border-radius: 10px; background: var(--cp-bg-elevated); font-size: 17px; }
  .done strong { color: var(--cp-success); }
  .lab-side { display: grid; gap: 16px; min-width: 0; }
  .lab-visual { margin: 0; padding: 14px; border: 1px solid var(--cp-border-strong); border-radius: 16px; background: var(--cp-bg); }
  .lab-visual figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--cp-accent); font-weight: 700; font-size: 15px; margin-bottom: 12px; }
  .lab-visual figcaption span { font-size: 12px; color: var(--cp-text-muted); font-weight: 400; }
  .snippet { min-width: 0; border: 1px solid var(--cp-border-strong); border-radius: 16px; overflow: hidden; background: var(--cp-bg); }
  .snippet-bar { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--cp-bg-elevated); color: var(--cp-accent); font-size: 14px; font-weight: 700; }
  .snippet pre, .terminal { margin: 0; padding: 14px 16px; max-height: 360px; overflow: auto; border: 0; border-radius: 0; font-size: 15px; line-height: 1.5; background: var(--cp-bg); white-space: pre-wrap; }
  .terminal { border-radius: 10px; border: 1px solid var(--cp-border); color: var(--cp-success); }
  .snippet code { padding: 0; background: var(--cp-bg); }
  .visual-flow { display: flex; gap: 10px; align-items: stretch; }
  .visual-card { flex: 1; min-width: 0; padding: 12px 14px; border-radius: 10px; background: var(--cp-bg-elevated); border: 1px solid var(--cp-border); }
  .visual-card strong { color: var(--cp-accent); font-size: 16px; }
  .visual-card p { margin: 6px 0 0; color: var(--cp-text-muted); font-size: 14px; }
  .visual-card.attention { border-color: var(--cp-warning); }
  .flow-arrow { align-self: center; color: var(--cp-accent); font-size: 22px; }
  .visual-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .visual-tag { color: var(--cp-accent); font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .agent-card { padding: 14px; background: var(--cp-bg-elevated); border-radius: 10px; }
  .agent-card h3 { margin: 8px 0 0; }
  dl { margin: 10px 0 0; }
  dl > div { display: grid; grid-template-columns: minmax(90px, 1fr) minmax(0, 3fr); gap: 10px; padding: 7px 0; border-top: 1px solid var(--cp-border); }
  dt { color: var(--cp-text-muted); font-size: 14px; }
  dd { margin: 0; font-size: 15px; overflow-wrap: anywhere; }
  .pillar-strip { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
  .pillar-strip div { padding: 12px 8px; background: var(--cp-bg-elevated); border-radius: 10px; }
  .pillar-strip span { display: block; color: var(--cp-accent); font-size: 24px; font-weight: 750; margin-bottom: 6px; }
  .pillar-strip strong { font-size: 13px; }
  .mock-window { background: var(--cp-bg-elevated); border: 1px solid var(--cp-border); border-radius: 10px; overflow: hidden; min-width: 0; }
  .mock-top { padding: 10px 14px; font-weight: 700; font-size: 15px; border-bottom: 1px solid var(--cp-border); }
  .mock-top span { float: right; color: var(--cp-text-muted); font-size: 12px; font-weight: 400; }
  .mock-form { padding: 12px 14px; display: grid; gap: 10px; }
  .mock-field-row span { display: block; font-size: 13px; color: var(--cp-text-muted); margin-bottom: 4px; }
  .mock-field { padding: 8px 12px; border: 1px solid var(--cp-border-strong); border-radius: 10px; background: var(--cp-bg); font-size: 14px; }
  .mock-button { justify-self: start; padding: 8px 18px; border-radius: 10px; background: var(--cp-accent); color: var(--cp-accent-fg); font-weight: 700; font-size: 14px; }
  .note-lines div { padding: 6px 0; border-bottom: 1px dashed var(--cp-border); font-size: 15px; }
  .mock-tabs { display: flex; gap: 8px; padding: 8px 14px; border-bottom: 1px solid var(--cp-border); font-size: 13px; }
  .mock-tabs span { padding: 4px 10px; border-radius: 8px; border: 1px solid var(--cp-border); }
  .mock-tabs .active { background: var(--cp-accent-soft); color: var(--cp-accent); border-color: var(--cp-accent); }
  .mock-message { padding: 10px 14px; margin: 10px; background: var(--cp-bg); border-radius: 10px; font-size: 14px; }
  .mock-message p { margin: 4px 0; }
  .mock-message.agent { border-left: 4px solid var(--cp-accent); }
  .mock-compose { margin: 10px; padding: 10px 12px; border: 1px solid var(--cp-border-strong); border-radius: 10px; font-size: 13px; color: var(--cp-text-muted); display: flex; justify-content: space-between; gap: 8px; }
  .mock-send { color: var(--cp-accent); font-weight: 700; }
  .portal-path { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 12px; font-size: 14px; }
  .portal-path span { padding: 5px 10px; border-radius: 8px; background: var(--cp-bg-elevated); border: 1px solid var(--cp-border); }
  .portal-path i { color: var(--cp-accent); font-style: normal; }
  .check-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  .check-list li { margin: 0; padding: 8px 12px; border: 1px solid var(--cp-border); border-radius: 10px; background: var(--cp-bg-elevated); font-size: 15px; }
  .check-list.ticks li::before { content: "\\2610\\00a0\\00a0"; color: var(--cp-accent); font-weight: 700; }
  .check-list.numbered { counter-reset: row; }
  .check-list.numbered li { counter-increment: row; }
  .check-list.numbered li::before { content: counter(row) ".\\00a0"; color: var(--cp-accent); font-weight: 700; }
  .facilitator-note { margin: 16px 0 0; padding: 14px 18px; border: 1px solid var(--cp-warning); border-radius: 10px; background: var(--cp-bg-elevated); font-size: 15px; }
  .facilitator-note p { margin: 6px 0; }
  .facilitator-note .eyebrow { color: var(--cp-warning); }
  .facilitator-note ul { margin: 6px 0; padding-left: 20px; }
  .walk-footer { position: sticky; bottom: 0; background: var(--cp-bg-elevated); border-top: 1px solid var(--cp-border); padding: 12px 24px; }
  .walk-footer .row { max-width: 1232px; margin: auto; justify-content: space-between; }
  #jump { max-width: min(520px, 46vw); }
  #status { flex-basis: 100%; color: var(--cp-text-muted); margin: 4px 0 0; font-size: 14px; }
  .boundary { margin: 10px 0 0; font-size: 14px; color: var(--cp-text-muted); }
  @media (max-width: 900px) {
    .lab-grid { display: block; }
    .lab-side { margin-top: 16px; }
    .slide { padding: 20px 16px; }
    .step-number { flex-basis: 48px; height: 48px; font-size: 24px; }
    .walk-heading { gap: 12px; }
    .visual-flow { flex-direction: column; }
    .flow-arrow { transform: rotate(90deg); }
    .visual-grid, .pillar-strip { grid-template-columns: 1fr; }
    .walk-footer { position: static; padding: 12px; }
    #jump { max-width: 100%; width: 100%; order: 3; }
    ol.micro li { font-size: 17px; }
    .mock-top span { float: none; display: block; margin-top: 4px; }
  }
  @media print {
    .walk-footer, .snippet-bar button, #notesMode { display: none; }
    .lab-grid { display: block; }
    .snippet pre { max-height: none; overflow: visible; }
  }
`;

const runtime = `
  (() => {
    const slides = [...document.querySelectorAll("main > .slide")];
    const jump = document.getElementById("jump");
    const status = document.getElementById("status");
    const mode = document.getElementById("notesMode");
    let instructor = new URLSearchParams(location.search).get("instructor") === "1";
    let current = 0;
    const report = message => { status.textContent = message; };
    function applyMode() {
      document.querySelectorAll("[data-instructor-only]").forEach(note => { note.hidden = !instructor; });
      if (mode) {
        mode.setAttribute("aria-pressed", String(instructor));
        mode.textContent = "Instructor notes: " + (instructor ? "On" : "Off");
      }
    }
    const route = () => {
      const match = /^#slide-(\\d+)$/.exec(location.hash);
      return match ? Number(match[1]) - 1 : 0;
    };
    function show(index) {
      current = Math.max(0, Math.min(slides.length - 1, index));
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      jump.value = String(current);
      document.getElementById("prev").disabled = current === 0;
      document.getElementById("next").disabled = current === slides.length - 1;
      document.getElementById("position").textContent = "Slide " + (current + 1) + " of " + slides.length;
      document.getElementById("progress").value = current + 1;
      document.title = slides[current].dataset.title + " | " + document.body.dataset.deck;
      history.replaceState(null, "", location.search + "#slide-" + (current + 1));
      scrollTo(0, 0);
    }
    slides.forEach((slide, i) => {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = slide.dataset.title;
      jump.append(option);
    });
    document.getElementById("prev").addEventListener("click", () => show(current - 1));
    document.getElementById("next").addEventListener("click", () => show(current + 1));
    jump.addEventListener("change", () => show(Number(jump.value)));
    window.addEventListener("hashchange", () => show(route()));
    mode?.addEventListener("click", () => {
      instructor = !instructor;
      const query = new URLSearchParams(location.search);
      if (instructor) query.set("instructor", "1"); else query.delete("instructor");
      history.replaceState(null, "", "?" + query + location.hash);
      applyMode();
    });
    document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
      const code = button.closest(".snippet").querySelector("code");
      try {
        await navigator.clipboard.writeText(code.textContent);
        report("Copied exactly as shown. Replace any placeholders before using it.");
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Copy";
        const selection = getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        report("Clipboard unavailable: " + error.message + ". The text is selected; press Ctrl+C.");
      }
    }));
    document.getElementById("print").addEventListener("click", () => print());
    const fullscreen = document.getElementById("fullscreen");
    fullscreen.disabled = !document.fullscreenEnabled;
    fullscreen.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch (error) { report("Fullscreen unavailable: " + error.message + ". Use the normal view."); }
    });
    document.addEventListener("keydown", event => {
      if (event.altKey || event.ctrlKey || event.metaKey ||
          event.target.closest("input, textarea, select, button, a, summary, pre, [contenteditable]")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); show(current + 1); }
      else if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); show(current - 1); }
      else if (event.key === "Home") { event.preventDefault(); show(0); }
      else if (event.key === "End") { event.preventDefault(); show(slides.length - 1); }
      else if (event.key.toLowerCase() === "f") fullscreen.click();
    });
    applyMode();
    show(route());
  })();
`;

const tracker = (total, current) => `<ol class="tracker" aria-label="${current ? `Step ${current} of ${total}` : "Introduction"}">${Array.from({ length: total }, (_, index) => `<li class="${index + 1 === current ? "current" : index + 1 < current ? "done" : ""}"></li>`).join("")}</ol>`;
const snippetHtml = snippet => `<div class="snippet"><div class="snippet-bar"><span>${esc(snippet.language)}</span><button type="button" data-copy>Copy</button></div><pre tabindex="0"><code>${esc(snippet.code)}</code></pre></div>`;

function slidesFor({ module, role }) {
  if (role === "admin") {
    const items = setupSlides(module);
    return items.map((item, index) => ({ ...item, number: index + 1, total: items.length, eyebrow: `Module ${module} / Instructor guide / Step ${index + 1} of ${items.length}` }));
  }
  const meta = labMeta(module);
  const intro = labIntro(module);
  const first = {
    key: "intro", title: intro.title, number: 0, total: 0, eyebrow: `Module ${module} / Labs / Start here`, heading: "You need",
    lead: intro.lead, doItems: intro.need, doneWhen: "Each lab is placed after its lesson in the slides. Stop and ask your instructor whenever something does not match the picture.",
    visual: fig("Your labs", grid(meta.map(lab => [`Lab ${lab.n}`, `${lab.title}. About ${lab.minutes} minutes.`])))
  };
  const out = [first];
  for (const lab of meta) {
    const steps = labSlides(module).filter(item => item.lab === lab.n);
    steps.forEach((item, index) => {
      const links = [];
      if (item.link) links.push(item.link, ...(item.moreLinks ?? []));
      if (index === steps.length - 1) links.push({ label: `Lab ${lab.n} done. Back to the slides (continue at slide ${lab.back})`, href: `./#slide-${lab.back}`, primary: true });
      out.push({ ...item, number: index + 1, total: steps.length, links, eyebrow: `Lab ${lab.n}: ${lab.title} / Step ${index + 1} of ${steps.length}`, shortTitle: `Lab ${lab.n} - ${index + 1}. ${item.title}` });
    });
  }
  return out;
}

export function buildView(config) {
  const { module, role } = config;
  const base = read(`slides/module-0${module}/index.html`);
  const label = `Module ${module} / ${role === "admin" ? "Instructor guide" : "Labs"}`;
  const head = base.slice(0, base.indexOf("</head>"))
    .replace(/<title>.*?<\/title>/, `<title>A365 Hub | ${label}</title>`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="Blue step-by-step ${esc(label)} with copyable snippets and pictures of what you should see.">`);
  const adminKeys = setupSlides(module).map(item => item.key);
  const slides = slidesFor(config);
  const adminLink = key => `${relative(module, module, "admin")}#slide-${adminKeys.indexOf(key) + 1}`;
  const tab = (name, href, current) => `<a class="button${current ? " primary" : ""}"${current ? ' aria-current="page"' : ""} href="${href}">${name}</a>`;
  const moduleLink = target => `<a class="button${target === module ? " primary" : ""}" href="${relative(module, target, role)}">Module ${target}</a>`;
  const body = `
  <a class="skip" href="#deck">Skip to current slide</a>
  <header><div class="walk-top">
    <div class="top"><div class="brand">A365 Hub <span>/ ${label}</span></div>
    <nav class="row" aria-label="Choose module">${moduleLink(1)}${moduleLink(2)}</nav></div>
    <nav class="row mode-nav" aria-label="Choose section">
      ${tab("1. Learn", `./#slide-${module === 1 ? 6 : 1}`, false)}${tab("2. Labs", relative(module, module, "learner"), role === "learner")}${tab("3. Instructor guide", relative(module, module, "admin"), role === "admin")}
      ${role === "learner" ? '<button type="button" id="notesMode" aria-pressed="false">Instructor notes: Off</button>' : ""}
      <button type="button" id="fullscreen">Fullscreen (F)</button><button type="button" id="print">Print</button>
    </nav>
    <p class="boundary">Dedicated lab only. These slides do not deploy anything; the authorized instructor runs setup. Live tenant deployment and mail proof must be verified separately.</p>
  </div></header>
  <progress id="progress" max="${slides.length}" value="1" aria-label="Presentation progress"></progress>
  <main id="deck" class="walk-stage" tabindex="-1">
    <noscript><p class="callout">JavaScript is required for slide navigation and Copy buttons.</p></noscript>
    ${slides.map(item => {
      const side = [item.visual, item.snippet ? snippetHtml(item.snippet) : ""].filter(Boolean).join("\n");
      const noteBlock = item.note ? `<aside class="facilitator-note" data-instructor-only hidden><p class="eyebrow">Instructor only / ${esc(item.note[0])}</p><p><strong>You:</strong> ${rich(item.note[1])}</p><p><strong>Students:</strong> ${rich(item.note[2])}</p>${item.answers ? `<p><strong>Answer key:</strong></p><ul>${item.answers.map(answer => `<li>${rich(answer)}</li>`).join("")}</ul>` : ""}<a href="${adminLink(item.note[3])}">Open the matching setup step</a></aside>` : "";
      const counter = item.number ? `Step ${item.number} of ${item.total}` : "Start here";
      return `<section class="slide" data-key="${item.key}" data-title="${esc(item.shortTitle ?? (item.number ? `${item.number}. ${item.title}` : item.title))}" hidden>
        <div class="walk-heading"><div class="step-number" aria-hidden="true">${item.number || "GO"}</div><div>
          <p class="eyebrow">${esc(item.eyebrow)}</p><h1>${esc(item.title)}</h1></div></div>
        ${item.total ? tracker(item.total, item.number) : ""}
        <div class="lab-grid${side ? "" : " single"}">
          <div class="lab-text">
            ${item.lead ? `<p class="lede">${rich(item.lead)}</p>` : ""}
            <h2 class="do-heading">${item.heading ?? "Do this"}</h2>
            <ol class="micro">${item.doItems.map(entry => `<li>${rich(entry)}</li>`).join("")}</ol>
            ${(item.links ?? (item.link ? [item.link] : [])).map(link => `<p><a class="button${link.primary ? " primary" : ""}" href="${esc(link.href)}"${link.href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(link.label)}</a></p>`).join("")}
            <p class="done"><strong>${item.number ? "You are done when:" : "Good to know:"}</strong> ${rich(item.doneWhen)}</p>
            ${noteBlock}
          </div>
          ${side ? `<div class="lab-side">${side}</div>` : ""}
        </div>
      </section>`;
    }).join("\n")}
  </main>
  <footer class="walk-footer"><div class="row">
    <button type="button" id="prev">Previous</button><span id="position" aria-live="polite"></span>
    <select id="jump" aria-label="Jump to step"></select><button class="primary" type="button" id="next">Next</button>
    <p id="status" role="status" aria-live="polite">Use Next or the arrow keys. Copy buttons only copy text; they never run anything.</p>
  </div></footer>`;
  const html = `${head}<style>${css}</style></head>
<body data-deck="${esc(label)}">${body}
  <script>${runtime}</script>
</body></html>\n`;
  return { html, slides, body };
}

export function buildModule(module) {
  const original = read(`slides/module-0${module}/index.html`);
  const scripts = [...original.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 2, "Teaching deck has a theme script and a navigation script");
  // Each lab is announced on the lesson it practices, and links to its first lab slide.
  const labSlideIndex = lab => slidesFor({ module, role: "learner" }).findIndex(item => item.lab === lab) + 1;
  let slideNumber = 0;
  const withCallouts = original.replace(/(<section class="slide"[\s\S]*?)(<template class="speaker-notes">)/g, (whole, before, template) => {
    slideNumber++;
    const lab = labMeta(module).find(item => item.after === slideNumber);
    if (!lab) return whole;
    return `${before}<p class="lab-callout"><span class="lab-badge">LAB ${lab.n}</span> <strong>${esc(lab.title)}</strong> <span class="muted">About ${lab.minutes} minutes. Step by step, with copy boxes.</span> <a class="button primary" href="./?view=lab#slide-${labSlideIndex(lab.n)}">Start Lab ${lab.n}</a></p>\n        ${template}`;
  });
  assert.equal(slideNumber, module === 1 ? 18 : 8, "Every teaching slide must be considered for a lab callout");
  const style = `<style>
    .lab-callout { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 20px 0 0; padding: 14px 18px; border: 1px solid var(--cp-accent); border-radius: 16px; background: var(--cp-accent-soft); }
    .lab-badge { padding: 4px 10px; border-radius: 8px; background: var(--cp-accent); color: var(--cp-accent-fg); font-weight: 750; letter-spacing: 1px; font-size: 14px; }
    .lab-callout .button { margin-left: auto; }
  </style>`;
  const shifted = withCallouts.replace("</head>", `${style}</head>`);
  const navigation = [...shifted.matchAll(/<script>([\s\S]*?)<\/script>/g)][1];
  let html = shifted.slice(0, navigation.index);
  for (const role of ["learner", "admin"])
    html += `<template id="view-${viewName(role)}"><style>${css}</style>${buildView({ module, role }).body}</template>\n`;
  html += `<script>
    const selectedView = new URLSearchParams(location.search).get("view");
    if (selectedView === "lab" || selectedView === "admin") {
      const selected = document.getElementById("view-" + selectedView).content.cloneNode(true);
      document.body.replaceChildren(selected);
      document.body.dataset.deck = "Module ${module} / " + (selectedView === "admin" ? "Instructor guide" : "Labs");
      ${runtime}
    } else {
      ${navigation[1]}
    }
  </script></body></html>\n`;
  return html;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  for (const module of [1, 2]) {
    const directory = path.join(root, "_site", ...(module === 2 ? ["module-02"] : []));
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), buildModule(module));
    for (const role of ["learner", "admin"])
      console.log(`Built Module ${module} ${role}: ${buildView({ module, role }).slides.length} slides`);
  }
}
