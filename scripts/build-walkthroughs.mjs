import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { labVisual, adminVisual, facilitation } from "./workshop-lab-visuals.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n");
const site = "https://cyberlorians.github.io/a365-hub";
export const walkthroughs = [
  { module: 1, role: "learner", file: "labs/module-01-security-foundation.md", steps: 7 },
  { module: 1, role: "admin", file: "docs/07-module-01-admin-runbook.md", steps: 7 },
  { module: 2, role: "learner", file: "labs/module-02-business-agent.md", steps: 8 },
  { module: 2, role: "admin", file: "docs/08-module-02-admin-runbook.md", steps: 8 }
];
export const urlFor = ({ module, role }) => `${site}/${module === 2 ? "module-02/" : ""}?view=${role === "admin" ? "admin" : "lab"}`;
const escape = text => text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text, config) {
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let html = "";
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    html += escape(text.slice(start, match.index));
    if (match[1]) html += `<code>${escape(match[1])}</code>`;
    else if (match[2]) {
      const target = match[3];
      const lesson = new RegExp(`^${site}/(?:${config.module === 2 ? "module-02/" : ""})#slide-(\\d+)$`).exec(target);
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(config.file), target));
      const mapped = walkthroughs.find(item => item.file === resolved);
      if (lesson) html += `<button class="lesson-link" type="button" data-lesson="${lesson[1]}">${escape(match[2])}</button>`;
      else if (resolved === "slides/module-01/exercise.md")
        html += `<button class="lesson-link" type="button" data-reference="answers">${escape(match[2])}</button>`;
      else {
        const href = mapped ? urlFor(mapped) : /^(https?:|#)/.test(target) ? target
          : `https://github.com/Cyberlorians/a365-hub/blob/main/${resolved}`;
        assert(/^(https?:|#)/.test(href), `Unsupported link in ${config.file}: ${target}`);
        html += `<a href="${escape(href)}"${mapped || href.startsWith("#") ? "" : ' target="_blank" rel="noopener noreferrer"'}>${escape(match[2])}</a>`;
      }
    } else html += match[4] ? `<strong>${inline(match[4], config)}</strong>` : `<em>${inline(match[5], config)}</em>`;
    start = match.index + match[0].length;
  }
  return html + escape(text.slice(start));
}

function blocks(markdown, config) {
  const lines = markdown.trim().split("\n");
  const result = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      assert(i < lines.length, `Unclosed code block in ${config.file}`);
      i++;
      result.push({ kind: "code", html: `<div class="snippet"><div class="snippet-bar"><span>${escape(language || "text")}</span><button type="button" data-copy>Copy</button></div><pre tabindex="0"><code>${escape(code.join("\n"))}</code></pre></div>` });
    } else if (line === "<details>") {
      const title = /^<summary>(.*)<\/summary>$/.exec(lines[++i]);
      assert(title, `Missing optional-section title in ${config.file}`);
      const body = [];
      let depth = 1;
      while (++i < lines.length) {
        if (lines[i] === "<details>") depth++;
        if (lines[i] === "</details>") {
          depth--;
          if (depth === 0) break;
        }
        body.push(lines[i]);
      }
      assert(depth === 0, `Unclosed details in ${config.file}`);
      i++;
      result.push({ kind: "optional", html: `<details class="optional"><summary>${inline(title[1], config)}</summary>${blocks(body.join("\n"), config).map(block => block.html).join("\n")}</details>` });
    } else if (/^#{1,4} /.test(line)) {
      const [, marks, title] = /^(#{1,4}) (.*)/.exec(line);
      const level = Math.min(4, marks.length + 1);
      result.push({ kind: "text", html: `<h${level}>${inline(title, config)}</h${level}>` });
      i++;
    } else if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(lines[i++].split("|").slice(1, -1).map(cell => cell.trim()));
      const cells = (row, tag) => row.map(cell => `<${tag}>${inline(cell, config)}</${tag}>`).join("");
      result.push({ kind: "text", html: `<div class="table-wrap"><table><thead><tr>${cells(rows[0], "th")}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${cells(row, "td")}</tr>`).join("")}</tbody></table></div>` });
    } else if (/^(?:\d+\. |- )/.test(line)) {
      const ordered = /^\d/.test(line);
      const items = [];
      while (i < lines.length && /^(?:\d+\. |- )/.test(lines[i])) {
        let item = lines[i++].replace(/^(?:\d+\. |- )/, "");
        while (i < lines.length && /^ {2,}\S/.test(lines[i])) item += ` ${lines[i++].trim()}`;
        items.push(`<li>${inline(item, config)}</li>`);
      }
      const tag = ordered ? "ol" : "ul";
      result.push({ kind: "text", html: `<${tag}>${items.join("")}</${tag}>` });
    } else {
      const paragraph = [lines[i++]];
      while (i < lines.length && lines[i].trim() && !/^(?:#{1,4} |```|<details>|<\/details>|<summary>|\||\d+\. |- )/.test(lines[i])) paragraph.push(lines[i++]);
      const text = paragraph.join(" ");
      const label = /^\*\*(Do|Check|Next):\*\*\s*/.exec(text);
      result.push({ kind: "text", html: `<p${label ? ` class="instruction ${label[1].toLowerCase()}"` : ""}>${inline(text, config)}</p>` });
    }
  }
  return result;
}

function pagesFor(config) {
  const source = read(config.file).replace(/<!-- source-only -->[\s\S]*?<!-- \/source-only -->\n*/g, "");
  const referenceStart = source.search(/<details>\n<summary>Optional (?:admin reference|technical reference|reference):/);
  const main = referenceStart < 0 ? source : source.slice(0, referenceStart);
  const sections = main.split(/^## /m).map((text, index) => {
    if (index === 0) return { title: "Before you begin", step: 0, body: text.replace(/^# .*\n/, "") };
    const end = text.indexOf("\n");
    const title = text.slice(0, end);
    return { title, step: Number(/^Step (\d+):/.exec(title)?.[1] ?? 0), body: text.slice(end + 1) };
  });
  assert.equal(sections.filter(section => section.step > 0).length, config.steps);
  const pages = [];
  for (const section of sections) {
    const groups = [[]];
    let size = 0;
    for (const block of blocks(section.body, config)) {
      const current = groups.at(-1);
      if (current.length && ((block.kind === "code" && current.some(entry => entry.kind === "code")) ||
          (block.kind === "text" && size > 1700))) {
        groups.push([]);
        size = 0;
      }
      groups.at(-1).push(block);
      size += block.kind === "code" ? 600 : block.kind === "optional" ? 100 : block.html.length;
    }
    groups.forEach((group, part) => pages.push({
      ...section, part: part + 1, parts: groups.length,
      html: group.map(block => block.html).join("\n"),
      hasCode: group.some(block => block.kind === "code")
    }));
  }
  return { pages, reference: referenceStart < 0 ? "" : blocks(source.slice(referenceStart), config).map(block => block.html).join("\n") };
}

const css = `
  header { padding: 12px 24px; }
  .walk-top { max-width: 1280px; margin: auto; }
  .mode-nav { margin-top: 12px; }
  .mode-nav .primary { font-weight: 700; }
  .walk-stage { width: min(1280px, 100%); margin: 20px auto; }
  .slide { min-height: 540px; padding: 28px 32px; }
  .walk-heading { display: flex; align-items: start; gap: 20px; margin-bottom: 16px; }
  .step-number { display: grid; place-items: center; flex: 0 0 64px; height: 64px; border-radius: 16px; background: var(--cp-accent-soft); color: var(--cp-accent); font-size: 32px; font-weight: 750; border: 1px solid var(--cp-border-strong); }
  h1 { font-size: clamp(28px, 2.5vw, 36px); margin: 0; letter-spacing: -.8px; }
  .walk-heading p { margin: 0 0 8px; }
  .walk-body { max-width: 85ch; }
  .walk-body.with-code { max-width: none; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 24px; align-items: start; }
  .with-code .walk-instructions p, .with-code .walk-instructions li { font-size: 16px; }
  .with-code .instruction { padding: 8px 12px; margin: 8px 0; line-height: 1.35; }
  .with-code .instruction.next { padding: 0; border: 0; background: none; font-size: 14px; }
  .with-code .lab-visual { padding: 12px; margin-bottom: 16px; }
  .with-code .visual-flow { gap: 8px; }
  .with-code .visual-grid { grid-template-columns: 1fr; }
  .with-code .visual-card { padding: 10px; }
  .with-code .visual-card strong { font-size: 15px; }
  .with-code .visual-card p { font-size: 13px; margin: 4px 0 0; }
  .with-code .mock-message { padding: 8px 12px; margin: 8px; }
  .with-code .mock-message p { font-size: 13px; }
  .with-code .mock-top, .with-code .mock-compose { font-size: 13px; padding: 8px 12px; }
  .walk-body > :first-child { margin-top: 0; }
  .walk-body p, .walk-body li { font-size: 18px; }
  .instruction { border-radius: 10px; padding: 12px 16px; border: 1px solid var(--cp-border); background: var(--cp-bg-elevated); }
  .instruction strong:first-child { color: var(--cp-accent); }
  .instruction.check { display: block; border-left: 4px solid var(--cp-success); }
  .instruction.next { color: var(--cp-text-muted); }
  .snippet { min-width: 0; border: 1px solid var(--cp-border-strong); border-radius: 16px; overflow: hidden; background: var(--cp-bg); }
  .snippet-bar { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--cp-bg-elevated); color: var(--cp-accent); font-size: 14px; }
  .snippet pre { margin: 0; padding: 16px; max-height: 440px; overflow: auto; border: 0; border-radius: 0; font-size: 15px; line-height: 1.5; background: var(--cp-bg); }
  .snippet code { padding: 0; background: var(--cp-bg); }
  .lesson-link { display: inline; padding: 0 2px; min-height: 0; background: none; border: 0; border-radius: 2px; color: var(--cp-link); text-decoration: underline; text-underline-offset: 3px; }
  .optional { border: 1px solid var(--cp-border); padding: 16px; border-radius: 10px; margin: 16px 0; }
  summary { cursor: pointer; color: var(--cp-accent); font-weight: 650; }
  dialog { width: min(1100px, calc(100% - 24px)); max-height: 88vh; overflow-y: auto; }
  dialog .dialog-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; position: sticky; top: -24px; background: var(--cp-surface); padding: 12px 0; z-index: 1; }
  dialog h2 { margin: 0; }
  .walk-footer { position: sticky; bottom: 0; background: var(--cp-bg-elevated); border-top: 1px solid var(--cp-border); padding: 12px 24px; }
  .walk-footer .row { max-width: 1232px; margin: auto; justify-content: space-between; }
  #jump { max-width: min(560px, 50vw); }
  #status { color: var(--cp-text-muted); margin: 8px 0 0; font-size: 14px; }
  .boundary { margin: 12px 0 0; font-size: 14px; color: var(--cp-text-muted); }
  .lab-visual { margin: 0 0 24px; padding: 16px; border: 1px solid var(--cp-border-strong); border-radius: 16px; background: var(--cp-bg); }
  .lab-visual figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--cp-accent); font-weight: 700; font-size: 16px; margin-bottom: 12px; }
  .lab-visual figcaption span { font-size: 12px; color: var(--cp-text-muted); font-weight: 400; }
  .visual-flow { display: flex; gap: 12px; align-items: stretch; }
  .visual-card { flex: 1; min-width: 0; padding: 16px; border-radius: 10px; background: var(--cp-bg-elevated); border: 1px solid var(--cp-border); }
  .visual-card strong { color: var(--cp-accent); font-size: 18px; }
  .visual-card p { margin: 8px 0 0; color: var(--cp-text-muted); font-size: 16px; }
  .visual-card.attention { border-color: var(--cp-warning); }
  .flow-arrow { align-self: center; color: var(--cp-accent); font-size: 24px; }
  .visual-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .visual-note { color: var(--cp-text-muted); font-size: 14px; margin-bottom: 0; }
  .visual-tag { color: var(--cp-accent); font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .agent-card { padding: 16px; background: var(--cp-bg-elevated); border-radius: 10px; }
  .agent-card h3 { margin-top: 8px; }
  dl { margin: 12px 0 0; }
  dl > div { display: grid; grid-template-columns: minmax(100px, 1fr) minmax(0, 3fr); gap: 12px; padding: 8px 0; border-top: 1px solid var(--cp-border); }
  dt { color: var(--cp-text-muted); font-size: 14px; }
  dd { margin: 0; font-size: 16px; overflow-wrap: anywhere; }
  .pillar-strip { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
  .pillar-strip div { padding: 16px 12px; background: var(--cp-bg-elevated); border-radius: 10px; }
  .pillar-strip span { display: block; color: var(--cp-accent); font-size: 28px; font-weight: 750; margin-bottom: 8px; }
  .pillar-strip strong { font-size: 15px; }
  .mock-window { background: var(--cp-bg-elevated); border: 1px solid var(--cp-border); border-radius: 10px; overflow: hidden; min-width: 0; }
  .mock-top { padding: 12px 16px; font-weight: 700; border-bottom: 1px solid var(--cp-border); }
  .mock-top span { float: right; color: var(--cp-text-muted); font-size: 12px; font-weight: 400; }
  .mock-message { padding: 12px 16px; margin: 12px; background: var(--cp-bg); border-radius: 10px; font-size: 15px; }
  .mock-message p { margin: 4px 0; }
  .mock-message.agent { border-left: 4px solid var(--cp-accent); }
  .mock-compose { margin: 12px; padding: 12px; border: 1px solid var(--cp-border-strong); border-radius: 10px; font-size: 14px; color: var(--cp-text-muted); }
  .mock-compose span { float: right; color: var(--cp-accent); }
  .mock-window dl { padding: 0 16px 12px; }
  .facilitator-note { margin: 20px 0; padding: 16px 20px; border: 1px solid var(--cp-warning); border-radius: 10px; background: var(--cp-bg-elevated); }
  .facilitator-note .eyebrow { color: var(--cp-warning); }
  @media (max-width: 850px) {
    .walk-body.with-code { display: block; }
    .snippet { margin: 20px 0; }
    .walk-heading { gap: 12px; }
    .step-number { flex-basis: 48px; height: 48px; font-size: 24px; }
    .walk-footer { position: static; padding: 12px; }
    #jump { max-width: 100%; width: 100%; order: 3; }
    .snippet pre { max-height: 420px; }
    .visual-flow { flex-direction: column; }
    .flow-arrow { transform: rotate(90deg); }
    .visual-grid, .pillar-strip { grid-template-columns: 1fr; }
    .mock-top span, .mock-compose span { float: none; display: block; margin-top: 4px; }
  }
  @media print {
    .walk-footer, .snippet-bar button { display: none; }
    .walk-body.with-code { display: block; }
    .snippet pre { max-height: none; overflow: visible; }
    .optional { display: none; }
  }
`;

const runtime = `
  (() => {
    const slides = [...document.querySelectorAll("main > .slide")];
    const jump = document.getElementById("jump");
    const status = document.getElementById("status");
    const instructor = new URLSearchParams(location.search).get("instructor") === "1";
    document.querySelectorAll("[data-instructor-only]").forEach(note => { note.hidden = !instructor; });
    let current = 0;
    let returnFocus;
    const report = message => { status.textContent = message; };
    const route = () => {
      const match = /^#slide-(\\d+)$/.exec(location.hash);
      return match ? Number(match[1]) - 1 : 0;
    };
    function show(index) {
      current = Math.max(0, Math.min(slides.length - 1, index));
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      jump.value = String(current);
      document.querySelectorAll("[data-instructor-view]").forEach(link => {
        link.hash = "#slide-" + (current + 1);
      });
      document.getElementById("prev").disabled = current === 0;
      document.getElementById("next").disabled = current === slides.length - 1;
      document.getElementById("position").textContent = "Slide " + (current + 1) + " / " + slides.length;
      document.getElementById("progress").value = current + 1;
      document.title = slides[current].dataset.title + " | " + document.body.dataset.deck;
      history.replaceState(null, "", "#slide-" + (current + 1));
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
    document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
      const code = button.closest(".snippet").querySelector("code");
      try {
        await navigator.clipboard.writeText(code.textContent);
        report("Copied exactly as shown. Replace placeholders before running; keep the same admin terminal open.");
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Copy";
        const selection = getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        report("Clipboard unavailable: " + error.message + ". Text selected; press Ctrl+C or copy it manually.");
      }
    }));
    document.querySelectorAll("[data-lesson], [data-reference]").forEach(button => button.addEventListener("click", () => {
      returnFocus = button;
      document.getElementById(button.dataset.lesson ? "lesson-" + button.dataset.lesson : button.dataset.reference).showModal();
    }));
    document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("close", () => returnFocus?.focus()));
    document.getElementById("print").addEventListener("click", () => print());
    const fullscreen = document.getElementById("fullscreen");
    fullscreen.disabled = !document.fullscreenEnabled;
    fullscreen.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch (error) { report("Fullscreen unavailable: " + error.message + ". Use the normal presentation view."); }
    });
    document.addEventListener("keydown", event => {
      if (document.querySelector("dialog[open]") || event.altKey || event.ctrlKey || event.metaKey ||
          event.target.closest("input, textarea, select, button, a, summary, pre, [contenteditable]")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); show(current + 1); }
      else if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); show(current - 1); }
      else if (event.key === "Home") { event.preventDefault(); show(0); }
      else if (event.key === "End") { event.preventDefault(); show(slides.length - 1); }
      else if (event.key.toLowerCase() === "f") fullscreen.click();
    });
    show(route());
  })();
`;

export function buildWalkthrough(config) {
  const base = read(`slides/module-0${config.module}/index.html`);
  const label = `Module ${config.module} / ${config.role === "admin" ? "Instructor setup" : "Student lab"}`;
  const head = base.slice(0, base.indexOf("</head>"))
    .replace(/<title>.*?<\/title>/, `<title>A365 Hub | ${label}</title>`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="Blue step-by-step ${escape(label)} presentation with copyable snippets and expected checks.">`);
  const { pages, reference } = pagesFor(config);
  const lessons = [...base.matchAll(/<section class="slide"[^>]*>([\s\S]*?)<\/section>/g)];
  const dialog = (id, title, body) => `<dialog id="${id}" aria-label="${escape(title)}"><div class="dialog-head"><p class="eyebrow">${escape(title)}</p><button type="button" data-close>Close</button></div>${body}</dialog>`;
  const roleLink = role => `<a class="button ${config.role === role ? "primary" : ""}"${config.role === role ? ' aria-current="page"' : ""} href="${urlFor({ ...config, role })}">${role === "admin" ? "Instructor setup" : "Student lab"}</a>`;
  const adminUrl = step => {
    const admin = { ...config, role: "admin", file: walkthroughs.find(item => item.module === config.module && item.role === "admin").file };
    const { pages: adminPages } = pagesFor(admin);
    return `${urlFor(admin)}#slide-${adminPages.findIndex(page => page.step === step) + 1}`;
  };
  const html = `${head}<style>${css}</style></head>
<body data-deck="${escape(label)}">
  <a class="skip" href="#deck">Skip to current slide</a>
  <header><div class="walk-top">
    <div class="top"><div class="brand">A365 Hub <span>/ ${label}</span></div>
    <nav class="row" aria-label="Choose module">${[1, 2].map(module => `<a class="button" href="${urlFor({ ...config, module })}">Module ${module}</a>`).join("")}</nav></div>
    <nav class="row mode-nav" aria-label="Presentation mode">${roleLink("learner")}${roleLink("admin")}
      <a class="button" href="${site}/${config.module === 2 ? "module-02/" : ""}#slide-${config.module === 1 ? 6 : 1}">Teaching deck</a>
      ${config.role === "learner" ? `<a class="button" data-instructor-view href="${urlFor(config)}&amp;instructor=1">Instructor lab notes</a>` : ""}
      <button type="button" id="fullscreen">Fullscreen (F)</button><button type="button" id="print">Print</button>
      ${reference ? '<button type="button" data-reference="reference">More detail</button>' : ""}
    </nav>
    <p class="boundary">Dedicated lab only. These slides do not deploy anything. Live tenant deployment and mail proof must be completed by the authorized admin.</p>
    <p class="boundary" data-instructor-only hidden>Instructor notes are public teaching cues, not a protected admin area. Never put credentials or private learner data on these slides.</p>
  </div></header>
  <progress id="progress" max="${pages.length}" value="1" aria-label="Presentation progress"></progress>
  <main id="deck" class="walk-stage" tabindex="-1">
    <noscript><p class="callout">JavaScript is required for slide navigation and Copy buttons. All steps remain visible below without it.</p></noscript>
    ${pages.map((page, index) => {
      const title = `${page.title}${page.parts > 1 ? ` / part ${page.part} of ${page.parts}` : ""}`;
      return `<section class="slide" data-step="${page.step}" data-title="${escape(title)}">
        <div class="walk-heading"><div class="step-number" aria-hidden="true">${page.step || (page.title === "Finished" ? "OK" : "GO")}</div><div>
          <p class="eyebrow">${label} / ${page.step ? `Step ${page.step} of ${config.steps}` : "Preparation & handoff"}${page.parts > 1 ? ` / Part ${page.part} of ${page.parts}` : ""}</p>
          <h1>${escape(page.title.replace(/^Step \d+: /, ""))}</h1></div></div>
        <div class="walk-body${page.hasCode ? " with-code" : ""}">${page.hasCode
          ? `<div class="walk-instructions">${config.role === "learner" ? labVisual(config.module, page.step) : adminVisual(config.module, page.step)}${page.html.replace(/<div class="snippet">[\s\S]*?<\/pre><\/div>/, "")}</div><div>${/<div class="snippet">[\s\S]*?<\/pre><\/div>/.exec(page.html)[0]}</div>`
          : `${config.role === "learner" ? labVisual(config.module, page.step) : adminVisual(config.module, page.step)}${page.html}`}</div>
        ${config.role === "learner" ? facilitation(config.module, page.step, adminUrl) : ""}
        <p class="small">Risk &rarr; control &rarr; evidence &rarr; decision. Correct sign-in does not prove safe agent behavior.</p>
      </section>`;
    }).join("\n")}
  </main>
  <footer class="walk-footer"><div class="row">
    <button type="button" id="prev">Previous</button><span id="position" aria-live="polite"></span>
    <select id="jump" aria-label="Jump to step"></select><button class="primary" type="button" id="next">Next</button>
    <p id="status" role="status" aria-live="polite">Use Next or arrow keys. Lesson buttons open the teaching slide here; Copy never runs a command.</p>
  </div></footer>
  ${lessons.map((lesson, index) => dialog(`lesson-${index + 1}`, `Module ${config.module} / Teaching slide ${index + 1}`, lesson[1].replace(/<template class="speaker-notes">[\s\S]*?<\/template>/, ""))).join("\n")}
  ${dialog("answers", "Module 1 / Readiness answer key", blocks(read("slides/module-01/exercise.md"), config).map(block => block.html).join("\n"))}
  ${reference ? dialog("reference", "Optional technical reference", reference) : ""}
  <script>${runtime}</script>
</body></html>\n`;
  return { html, pages };
}

export function buildModule(module) {
  const original = read(`slides/module-0${module}/index.html`);
  const scripts = [...original.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 2, "Teaching deck has a theme script and a navigation script");
  const navigation = scripts[1];
  let html = original.slice(0, navigation.index);
  for (const role of ["learner", "admin"]) {
    const { html: walkthrough } = buildWalkthrough(walkthroughs.find(config => config.module === module && config.role === role));
    const body = /<body[^>]*>([\s\S]*?)<script>/.exec(walkthrough)[1];
    html += `<template id="view-${role === "admin" ? "admin" : "lab"}"><style>${css}</style>${body}</template>\n`;
  }
  html += `<script>
    const selectedView = new URLSearchParams(location.search).get("view");
    if (selectedView === "lab" || selectedView === "admin") {
      const selected = document.getElementById("view-" + selectedView).content.cloneNode(true);
      document.body.replaceChildren(selected);
      document.body.dataset.deck = "Module ${module} / " + (selectedView === "admin" ? "Instructor setup" : "Student lab");
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
    for (const config of walkthroughs.filter(config => config.module === module))
      console.log(`Built Module ${module} ${config.role}: ${pagesFor(config).pages.length} slides, ${config.steps} steps`);
  }
}
