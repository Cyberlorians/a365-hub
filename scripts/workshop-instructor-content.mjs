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
    prep: ["a-route", "a-formcheck", "a-cloud", "a-start", "a-files", "a-prepare", "a-group", "a-tap", "a-skus", "a-users", "a-signin", "a-renew"],
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
  "1.4": "Now sign in. Use a private window and the lab username, not your own account. Follow the prompts. If anything asks you to weaken a security setting or add a sign-in method, stop and tell me.",
  "1.5": "Nobody here needs admin rights. You have an isolated account, access only to what the exercise needs, and someone to ask for help. Please confirm you have an open inbox, then we start the content.",
  "1.6": "Today is about secure AI adoption, not product tours. Every module follows one loop: risk, control, evidence, decision. A useful agent can misuse legitimate access, so our job is to see it, control it and protect it.",
  "1.7": "Meet Project Beacon, a fictional case. An agent helps a colleague draft and send a status email. For any agent we ask four questions: what is it, who is accountable and who acts, which tools and data does it use, and what evidence shows what happened.",
  "1.8": "An agent does more than answer. It reads content, decides, and uses a tool such as sending mail. Sending is a write action, so useful access needs a clear boundary. A sign-in tells us who may access a resource; it does not prove the agent's next action is safe.",
  "1.9": "This is the key idea of the day. Things go wrong in two ways: a stolen or over-permissioned identity, or untrusted instructions hidden in content. The second can happen with no suspicious sign-in at all, so we need runtime and tool evidence, not only identity logs. Now run Lab 3.",
  "1.10": "Agent 365 is the management view: observe, govern and secure. The Registry gives us a place to start a review, but a clean inventory does not prove an agent behaves safely.",
  "1.11": "Here is one agent on one page, a fictional card. For each row ask what we know and what we still have to verify. Where the card is silent we write unknown, never a guess. Now run Lab 4.",
  "1.12": "Entra gives five controls: the agent's identity and lifecycle, who can create and manage it, its permissions, access protection, and supported network protection. For each one, ask the question in the right-hand column. We map controls today; we do not configure them.",
  "1.13": "Purview covers the data side: know and classify data, limit unsafe sharing, and own improvement actions in Compliance Manager. Remember that audit is not block, and a compliance score is not a certification.",
  "1.14": "Different evidence answers different questions: identity and access, runtime and tools, data and workload, and network where supported. When something was not observed, we label it unknown, not safe. Now run Lab 5.",
  "1.15": "Defender and the security operations center connect evidence to a decision: observe, attribute, investigate, contain, verify, improve. An event, an alert and an incident are three different things.",
  "1.16": "Three-minute check. Answer the four questions on screen; question 3, why a valid sign-in is not proof of safe behavior, matters most. Now run Lab 6 to do it in your note and compare with the answers.",
  "1.17": "Now the commercial conversation, after we have found a gap. Assess what the customer already has and needs, then discuss what E7 bundles together. Do not present ordinary XDR, basic DLP or ISOC as E7-only.",
  "1.18": "To recap: establish normal before investigating abnormal. We defined a useful task, who acts, and the evidence we expect. Next module we run that task for real. Collect each learner's one gap and next action before you close.",
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
  "1.2": "Remind everyone to use a private window; expect the 'Stay signed in?' and privacy prompts.",
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
      doItems: [`**Say:** "Now we practice. Press **Start Lab ${lab.n}** on the slide, or open the link I just posted."`, "**Post** the Labs link (copy box on the right) in the chat.", "**Tell learners:** every step has a **Copy** button. Copy it, paste it, then check the green **You are done when** line.", `**Watch** the room or chat using the cues on the next slide.${extra ? ` ${extra}` : ""}`, "**Bring them back:** when most are at the last step, say \"Press the green button at the end to return to the slides.\""],
      doneWhen: `Allow about ${lab.minutes} minutes. Do not move on until most learners reach the last step.`,
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
