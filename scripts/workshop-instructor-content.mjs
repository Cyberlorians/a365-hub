import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { labSlides, labMeta, setupSlides, fig, flow, richText } from "./workshop-lab-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const site = "https://cyberlorians.github.io/a365-hub";
const decode = value => value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const plain = html => decode(html.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
// The deck's speaker notes were written for a review draft; drop sentences that only make sense in review.
const reviewOnly = /\b(this|the) (review )?draft\b|review file|during this review|content review|not independently|no login happens/i;
const sanitize = value => value.split(/(?<=[.!?])\s+/).filter(sentence => !reviewOnly.test(sentence)).join(" ");
const firstSentence = value => value.split(/(?<=[.!?])\s+/)[0];

export function teachingSlides(module) {
  const html = fs.readFileSync(path.join(root, `slides/module-0${module}/index.html`), "utf8").replace(/\r\n/g, "\n");
  return [...html.matchAll(/<section class="slide" data-title="([^"]+)" data-minutes="([\d.]+)" data-phase="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)].map((match, index) => {
    const notes = /<template class="speaker-notes">([\s\S]*?)<\/template>/.exec(match[4])?.[1] ?? "";
    const heading = /<h[12][^>]*>([\s\S]*?)<\/h[12]>/.exec(match[4])?.[1] ?? match[1];
    const talk = sanitize(plain(notes).replace(/^(Planned time:\s*)?[\d.]+\s*minutes?[.;]?\s*(onboarding only\.?\s*)?/i, ""));
    return { n: index + 1, title: decode(match[1]), minutes: Number(match[2]), phase: match[3], heading: plain(heading), talk };
  });
}

const plan = {
  1: {
    prep: ["a-route", "a-formcheck", "a-tenant", "a-start", "a-files", "a-prepare", "a-group", "a-tap", "a-skus", "a-users", "a-signin", "a-renew", "a-seed", "a-publish", "a-risk"],
    rhythm: "a-teach", recovery: { 2: ["a-l1"], 3: ["a-l2"] }, after: ["a-close"]
  },
  2: {
    prep: ["b-start", "b-python", "b-cli", "b-config", "b-azure", "b-model-a", "b-model-b", "b-apps", "b-register", "b-register2", "b-deploy", "b-consent", "b-endpoint", "b-http", "b-live", "b-logs", "b-rehearse", "b-handoff"],
    rhythm: null, recovery: { 1: ["b-l1"], 2: ["b-l2"], 3: ["b-l3"], 4: ["b-l4"] }, after: ["b-cleanup"]
  }
};

// What the instructor says, slide by slide, in plain first-person language.
const say = {
  "1.1": "Welcome. Before the content, each of you needs your own lab account. You will request it with a short form, and the first lab shows every click. Use only the account the form gives you, never a personal or production one.",
  "1.2": "I am posting the form link in chat. It needs your name and an email you can open right now; company is optional. Tick I agree and submit once. If you submit twice you can end up with two accounts. Now run Lab 1.",
  "1.3": "In two to three minutes an email arrives with your username and a one-time pass, valid for eight hours. If you do not see it, check Junk. Treat the pass like a password: do not paste it into chat.",
  "1.4": "Sign in once at admin.microsoft.com with your lab username and TAP in a private window. If you already did that, just confirm the account menu shows your lab username. Lab 2 is a one-minute check, not another walkthrough. If blocked, ask for help and follow my view while we resolve it.",
  "1.5": "Today we use Microsoft's Agent Academy IT helpdesk scenario. Understand its task, try an answer, then inspect the agent and a separate staged-risk identity. I prepared the sample; you do not create or publish it today. AI Reader is registry access, not maker, chat or source access. I will provide the tested chat link.",
  "1.6": "An agent can read, decide and use tools with real access. We want useful work with clear boundaries. See it: know purpose and accountability. Control it: approve access, data and tools. Protect it: check evidence and act on gaps. Today, explain what the registry shows and what it cannot verify. No written submission is required.",
  "1.8": "Read the sample through four lenses: purpose, instructions, knowledge and tools. Knowledge supplies information for an answer. A tool performs a configured lookup or action. A SharePoint Devices or Tickets list alone does not mean the agent can use it as a tool. Instructions guide behavior; they do not grant or limit effective permissions by themselves.",
  "1.9": "A valid sign-in does not prove safe advice. Someone might misuse a connection or grant access outside the approved scope. Or misleading source content might influence an agent that is correctly signed in. We compare identity and configuration evidence with the actual question, source, answer and tool result. Today we test ordinary questions, not attacks.",
  "1.10": "Microsoft's maker sequence defines, grounds, tests and publishes an agent. The employee uses its shared channel. The reviewer checks its inventory, accountability, access and risk. Those roles require different access. Today you use and inspect; I show configuration. A later maker exercise needs its own environment, licensing and roles. Agent 365 SDK samples are a separate pro-code path, not Copilot Studio setup.",
  "1.11": "Open Lab 3. Start with the Microsoft helpdesk brief, inspect real instructions and knowledge with me, then compare an actual answer with its source. We find that same sample in the registry and compare reported access with its configuration. The existing Relay is a separate staged training-risk record, not a live attack: open its Security tab, not the broken risk-count filter. No worksheet, publishing, blocking or student role elevation. Missing sample setup is not completion.",
  "1.7": "Microsoft's Agent Academy builds an IT helpdesk agent. An employee needs a useful answer about a support issue or IT policy. The Contoso IT site provides sample policy pages and Devices and Tickets lists. Today the boundary is answer and explain using approved sources; we do not assume ticket creation exists. Ask what the agent does, who owns it, what it reaches and what evidence supports the result. The sample name in our tenant is supplied separately because generated names can vary.",
  "1.12": "Entra gives five control objectives: identity and lifecycle, creators and managers, permissions, access protection, and supported network protection. The registry gives some context, not proof the controls work. Permissions do not establish approval or expiry; a risk number does not prove Conditional Access enforcement. Verify policy scope and observed results separately. We map controls today; we do not configure them.",
  "1.13": "Purview covers the data side: know and classify data, limit unsafe sharing, and own improvement actions in Compliance Manager. Remember that audit is not block, and a compliance score is not a certification.",
  "1.14": "For this sample, I show Copilot Studio, the agent, Test and the activity map to inspect knowledge and action results. Entra Monitoring and health has identity Sign-in logs and Audit logs. Purview Solutions, Audit, Search has supported workload audit. Defender Incidents and alerts supports investigation. These need separate roles. The Container App Log stream belongs to the separate Module 2 custom runtime, not this Copilot Studio sample.",
  "1.15": "Defender and the security operations center connect evidence to a decision: observe, attribute, investigate, contain, verify, improve. An event, an alert and an incident are three different things.",
  "1.16": "Explain the employee task, one real knowledge source and whether you saw a tool action. What did your answer/source comparison show? Which control remains unproven? No written answer or worksheet. A failed test is a finding, not something to hide. If sign-in is treated as complete protection, revisit slide 9.",
  "1.17": "Carry the same review method into other implementations. Module 2 currently uses a separate custom mail agent and needs its own runtime, sender and receipt preflight. This helpdesk test does not prove that route works. Later modules deepen authority, governance, data controls and investigation. Tell us what you learned and what is still unclear.",
  "2.1": "In this module we define what normal looks like for one approved agent, before we ever investigate misuse. We start with a useful task, then look at the actor, authority, data, tools and evidence.",
  "2.2": "Approve the task, not unlimited access. Our task is one status email, written from a fictional brief, sent to one approved internal recipient. These boundaries are intended limits; we still have to check what actually enforces them.",
  "2.3": "Who actually sends the message? The signed-in lab user's mailbox, not the agent's own registration. Keep three identities apart: the user, the agent registration and the app. Now run Lab 1 to sign in.",
  "2.4": "Now the agent drafts from a fictional brief. We ask for a draft only and review every fact before anything is sent. Now run Lab 2.",
  "2.5": "Review, request send, verify receipt. We send only the reviewed email to the single approved recipient, then check the real mailbox. A chat success message is not proof of delivery. Now run Lab 3.",
  "2.6": "Find evidence without inventing it. Delivery is one proof; the tool record, the identity and the permissions are others. Anything we did not observe, we write down as not observed.",
  "2.7": "Complete the agent passport: identity and authority, actions and evidence, and open gaps. Now run Lab 4 and write a six-line record from what you actually saw.",
  "2.8": "Useful does not mean secure. Ask three things: what did the task prove, what did it not prove, and which deviation would worry us? Next, Module 3 maps the actual authority."
};
const careful = talk => talk.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");

const launchExtras = {
  "1.1": "Give learners the form link (aka.ms/a365hub) and tell them the email takes two to three minutes.",
  "1.2": "One minute only: signed-in learners confirm the username and return. A helper handles blocked sign-ins without holding the group.",
  "2.1": "Privately give each learner the agent link and the one approved recipient.",
  "2.3": "Keep the recipient mailbox open so you can confirm receipt."
};

export function instructorSlides(module) {
  const teaching = teachingSlides(module);
  const labs = labMeta(module);
  const steps = labSlides(module);
  const setup = Object.fromEntries(setupSlides(module).map(item => [item.key, item]));
  const used = new Set();
  const take = key => { assert(setup[key], `Unknown setup slide ${key}`); used.add(key); return { ...setup[key] }; };
  const out = [];
  const push = (section, eyebrow, item) => out.push({ ...item, section, eyebrow: `Module ${module} / ${eyebrow}`, shortTitle: `${section}: ${item.title}` });
  const coreTotal = teaching.filter(item => item.phase === "core").reduce((sum, item) => sum + item.minutes, 0);
  const slidesUrl = `${site}/${module === 2 ? "module-02/" : ""}`;
  const labsUrl = `${slidesUrl}?view=lab`;

  push("Start", "Instructor deck / Start here", {
    key: "i-start", title: `How to run Module ${module}`,
    doItems: ["**Before class:** do the setup slides first. Each one is a single action with a copy box.", "**In class:** for every slide, press **Show** to open it, then **Say** the script on the right.", "**At each LAB button:** post the Labs link, let learners work, watch for the cues, then bring them back.", "**After class:** close the accounts and clean up.", "Learners see only the student slides and labs. This deck is yours alone."],
    doneWhen: "Use Next to move through this deck. Open the student slides in another tab so you can show them while you read this.",
    links: [{ label: "Open the student slides", href: "../", primary: true, newTab: true }, { label: "Open the student labs", href: "../?view=lab", newTab: true }],
    snippet: { language: "text", code: `Slides: ${slidesUrl}\nLabs: ${labsUrl}` },
    visual: fig("The shape of the day", flow([["Before class", "Setup, one action per slide"], ["Teach", "Show, then say"], ["Lab", "Post link, watch, return"], ["After class", "Close and clean up"]]))
  });

  const prep = plan[module].prep.map(take);
  prep.forEach((item, index) => push("Before class", `Before class / ${index + 1} of ${prep.length}`, item));
  if (plan[module].rhythm) push("Before class", "How the class runs", take(plan[module].rhythm));

  let cumulative = 0;
  for (const slide of teaching) {
    assert(say[`${module}.${slide.n}`], `Missing instructor script for Module ${module} slide ${slide.n}`);
    if (slide.phase === "core") cumulative += slide.minutes;
    const lab = labs.find(item => item.after === slide.n);
    const timing = slide.phase === "core" ? `${slide.minutes} min, ${cumulative} of ${coreTotal} core min` : `${slide.minutes} min, outside the core`;
    push("Teach", `Teach / Slide ${slide.n} of ${teaching.length} / ${timing}`, {
      key: `t${slide.n}`, title: `Slide ${slide.n}: ${slide.title}`,
      doItems: [`**Show** slide ${slide.n} in the student deck (button below). Keep it on screen.`, `**Say** the script on the right in your own words (about ${slide.minutes} minute${slide.minutes === 1 ? "" : "s"}).`, lab ? `**Then** press **Start Lab ${lab.n}** on that slide and run the lab (the next slides).` : "**Move on** with Next in the student deck."],
      doneWhen: slide.phase === "core" ? `Time check: about ${cumulative} of ${coreTotal} core minutes used.` : "Onboarding is outside the core minutes.",
      links: [{ label: `Open slide ${slide.n}`, href: `../#slide-${slide.n}`, primary: true, newTab: true }],
      visual: fig("What to present", `<div class="agent-card"><div class="visual-tag">ON THE SLIDE</div><h3>${richText(slide.heading)}</h3><div class="visual-tag" style="margin-top:12px">SAY</div><p>${richText(say[`${module}.${slide.n}`])}</p>${slide.talk ? `<div class="visual-tag" style="margin-top:12px">CAREFUL</div><p>${richText(careful(slide.talk))}</p>` : ""}</div>`)
    });
    if (!lab) continue;
    const labSteps = steps.filter(item => item.lab === lab.n);
    const first = steps.filter(item => item.lab < lab.n).length + 2;
    const extra = launchExtras[`${module}.${lab.n}`];
    push("Lab", `Lab ${lab.n} of ${labs.length} / about ${lab.minutes} min`, {
      key: `lab${lab.n}-run`, title: `Run Lab ${lab.n}: ${lab.title}`,
      doItems: [`**Say:** "Now we practice. Press **Start Lab ${lab.n}** on the slide, or open the link I just posted."`, "**Post** the Labs link (copy box on the right) in the chat.", "**Tell learners:** use **Copy** where a template or snippet is provided, paste it into your note or approved tool, then check the green **You are done when** line.", `**Watch** the room or chat using the cues on the next slide.${extra ? ` ${extra}` : ""}`, "**Bring them back:** when most are at the last step, say \"Press the green button at the end to return to the slides.\""],
      doneWhen: `Allow about ${lab.minutes} minute${lab.minutes === 1 ? "" : "s"}. Do not move on until most learners reach the last step.`,
      snippet: { language: "text", code: `Lab ${lab.n}: ${lab.title}\n${labsUrl}#slide-${first}` },
      links: [{ label: `Preview Lab ${lab.n}`, href: `../?view=lab#slide-${first}`, newTab: true }],
      visual: fig("Your job during a lab", flow([["Say", "Introduce the lab"], ["Post", "Labs link in chat"], ["Watch", "Use the step cues"], ["Return", "Back to the slides"]]))
    });
    const cues = labSteps.map((item, index) => `**${index + 1}. ${item.title}.** ${firstSentence(item.note[1])} **Do:** ${item.note[2]}`);
    const answers = labSteps.find(item => item.answers)?.answers ?? [];
    const bundle = labSteps.filter(item => item.snippet).map((item, index) => `Step ${labSteps.indexOf(item) + 1}: ${item.title}\n${item.snippet.code}`).join("\n\n");
    push("Lab", `Lab ${lab.n} of ${labs.length} / cues`, {
      key: `lab${lab.n}-cues`, title: `Lab ${lab.n}: what to watch for`,
      doItems: ["Read the step cues on the right **before** learners start.", "Walk the room (or watch chat) for each cue.", "If a step is stuck, use the recovery slide that follows.", bundle ? "Paste the snippet box in chat if a learner cannot see the screen." : "This lab has no copy boxes to share."],
      doneWhen: "Most learners reached the last step and the 'You are done when' lines held true.",
      visual: fig(`Lab ${lab.n} step cues`, `<ul class="check-list">${[...cues, ...answers.map((answer, index) => `**Answer ${index + 1}:** ${answer.replace(/^\d+\.\s*/, "")}`)].map(row => `<li>${richText(row)}</li>`).join("")}</ul>`),
      ...(bundle ? { snippet: { language: "text", code: bundle } } : {})
    });
    for (const key of plan[module].recovery[lab.n] ?? []) push("Lab", `Lab ${lab.n} / Recovery`, take(key));
  }

  push("After class", "After class", take(plan[module].after[0]));
  assert.deepEqual(Object.keys(setup).filter(key => !used.has(key)), [], "Every setup slide must appear in the instructor deck");
  return out.map((item, index) => ({ ...item, number: index + 1, total: 0 }));
}
