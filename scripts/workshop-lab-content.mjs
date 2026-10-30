import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const fence = "`".repeat(3);
export const esc = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const rich = text => esc(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/`([^`]+)`/g, "<code>$1</code>");

// Snippets come straight from the Markdown guides so tested code and slides cannot drift.
export function codeBlocks(file, referenceMarker) {
  const text = fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n");
  const main = text.split(referenceMarker)[0];
  const blocks = {};
  let step = 0, count = 0, open = null;
  for (const line of main.split("\n")) {
    const heading = /^## Step (\d+)/.exec(line);
    if (heading) { step = Number(heading[1]); count = 0; }
    if (line.startsWith(fence)) {
      if (!open) { open = { language: line.slice(3).trim() || "text", lines: [] }; count++; }
      else { blocks[`${step}.${count}`] = { language: open.language, code: open.lines.join("\n") }; open = null; }
    } else if (open) open.lines.push(line);
  }
  return blocks;
}
const learnerMarker = /<details>\n<summary>Optional reference:/;
const adminMarker = /<details>\n<summary>Optional (?:admin reference|technical reference)/;
const learner = { 1: codeBlocks("labs/module-01-security-foundation.md", learnerMarker), 2: codeBlocks("labs/module-02-business-agent.md", learnerMarker) };
const admin = { 1: codeBlocks("docs/07-module-01-admin-runbook.md", adminMarker), 2: codeBlocks("docs/08-module-02-admin-runbook.md", adminMarker) };
const pick = (set, key) => { assert(set[key], `Missing guide snippet ${key}`); return set[key]; };

const card = (title, body, tone = "") => `<div class="visual-card ${tone}"><strong>${rich(title)}</strong><p>${rich(body)}</p></div>`;
const flow = items => `<div class="visual-flow">${items.map((item, index) => `${index ? '<span class="flow-arrow" aria-hidden="true">&rarr;</span>' : ""}${card(...item)}`).join("")}</div>`;
const grid = items => `<div class="visual-grid">${items.map(item => card(...item)).join("")}</div>`;
const fig = (title, body) => `<figure class="lab-visual"><figcaption>${esc(title)}<span>Illustration, not a live screen or evidence</span></figcaption>${body}</figure>`;
const terminal = (title, code) => `<figure class="lab-visual"><figcaption>${esc(title)}<span>Example output; your values will differ</span></figcaption><pre class="terminal" tabindex="0">${esc(code)}</pre></figure>`;
const list = (rows, kind = "") => `<ul class="check-list ${kind}">${rows.map(row => `<li>${rich(row)}</li>`).join("")}</ul>`;
const window_ = (title, tag, body) => `<div class="mock-window"><div class="mock-top">${esc(title)}<span>${esc(tag)}</span></div>${body}</div>`;
const field = (label, value) => `<div class="mock-field-row"><span>${esc(label)}</span><div class="mock-field">${esc(value)}</div></div>`;
const signIn = (title = "Sign in") => fig("The sign-in page", window_(title, "Lab browser profile", `<div class="mock-form">${field("Username", "The lab username your instructor gave you")}${field("Password", "Paste your Temporary Access Pass (TAP)")}<div class="mock-button">Sign in</div></div>`));
const note = lines => fig("Your private note", window_("Note", "Not shared", `<div class="mock-form note-lines">${lines.map(line => `<div>${rich(line)}</div>`).join("")}</div>`));
const chat = (you, agent, hint) => fig("The agent chat", window_("Project Beacon Mail Agent", "Signed-in lab user", `<div class="mock-message"><strong>You</strong><p>${rich(you)}</p></div>${agent ? `<div class="mock-message agent"><strong>Agent</strong><p>${rich(agent)}</p></div>` : ""}<div class="mock-compose">${esc(hint)}</div>`));
const portal = (path_, items) => fig("Microsoft Entra admin center", `<div class="portal-path">${path_.map(part => `<span>${esc(part)}</span>`).join('<i aria-hidden="true">&rsaquo;</i>')}</div>${list(items, "numbered")}`);

const m1 = {
  questions: pick(learner[1], "0.1"),
  lab: [
    { key: "signin", title: "Sign in to your lab mailbox", doItems: ["Open **outlook.office.com** in your lab browser profile.", "Type the lab username your instructor gave you.", "When asked for a password, paste your **Temporary Access Pass (TAP)**.", "Follow any sign-in prompts."],
      doneWhen: "Your lab inbox opens. If it does not, stop and tell the instructor. Never use a personal account or skip a security prompt.",
      link: { label: "Open Outlook", href: "https://outlook.office.com/mail/" }, visual: signIn(),
      note: ["Before learners start", "Finish the account steps in Instructor setup first: users, licenses, TAP policy and a real test sign-in for both mailboxes. Never project the credentials file.", "Confirm everyone's inbox opens before moving on.", "a-signin"] },
    { key: "note", title: "Start your note", doItems: ["Open any blank note (Notepad, OneNote or a Word page).", "Copy the four questions on the right.", "Paste them into the note. You will answer them step by step."],
      doneWhen: "Your note has four questions with space under each.", snippet: pick(learner[1], "0.1"),
      visual: note(["What does the agent do?", "Who is responsible, and who actually acts?", "What data and tools may it use?", "What evidence would show what happened?"]),
      note: ["Set the frame", "These four questions are the whole module. Ask students to say them aloud once.", "Have students name the business task, not products.", "a-teach"] },
    { key: "task", title: "Name the useful task", doItems: ["Look at the picture: a fictional brief goes to an agent, which drafts an email, and a person reviews it.", "Copy the line on the right.", "Paste it under question 1."],
      doneWhen: "You can say what the agent is for. Project Beacon is a fictional practice case.", snippet: { language: "text", code: "Help draft and send an internal project-status email." },
      visual: fig("The useful task", flow([["Fictional brief", "Project Beacon facts"], ["Agent", "Drafts an internal update"], ["Person", "Reviews before anything is sent"]])),
      note: ["Keep it concrete", "Use only the fictional case. Do not substitute a real project or real data.", "Ask what makes this task useful.", "a-teach"] },
    { key: "risks", title: "Spot the two kinds of risk", doItems: ["Read the two boxes in the picture.", "Copy the example sentence on the right, then rewrite it in your own words.", "Paste it under question 2."],
      doneWhen: "Your sentence covers both misused access and an agent following bad instructions hidden in content. A sign-in log alone cannot show every harmful instruction.",
      snippet: { language: "text", code: "A correctly signed-in agent can still be tricked by instructions hidden in content, and a sign-in log alone would not show that." },
      visual: fig("Two attack surfaces, two evidence planes", grid([["Identity plane", "Stolen identity or misused permission. Look at sign-ins, grants and access evidence."], ["AI-native plane", "Untrusted instructions in content. Look at agent runtime, tool and data evidence. No new sign-in is needed at ingestion.", "attention"]])),
      note: ["Teach the monitoring gap", "No attack script or fabricated event is needed. Compare identity misuse with malicious instructions in content: injection can leave no new identity-provider event at ingestion.", "Ask why a valid sign-in is not enough.", "a-teach"] },
    { key: "card", title: "Fill in the agent card", doItems: ["Copy the card template on the right into your note.", "Fill in what the picture tells you.", "Write **unknown** for anything it does not tell you. Do not invent an owner or a log."],
      doneWhen: "Every field is either filled from the card or marked unknown. Label your note: fictional practice example.",
      snippet: { language: "text", code: "Agent: Project Beacon Mail Agent (fictional practice example)\nPurpose: Draft and send an internal status email\nResponsible owner: unknown\nWho acts: unknown\nData and tools: fictional brief; Mail tool\nEvidence of activity: unknown" },
      visual: fig("Practice agent card", `<div class="agent-card"><div class="visual-tag">FICTIONAL / PRACTICE ONLY</div><h3>Project Beacon Mail Agent</h3><dl><div><dt>Purpose</dt><dd>Internal status email</dd></div><div><dt>Owner / sponsor</dt><dd>Unknown until verified</dd></div><div><dt>Actor</dt><dd>The signed-in lab user in Module 2</dd></div><div><dt>Data and evidence</dt><dd>Fictional brief; actual activity not yet observed</dd></div></dl></div>`),
      note: ["Choose the evidence mode", "Use the fictional card exactly as labeled. If you show a real Registry view, verify target, owner, source and time first, and label it as real. Never present the fictional card as real inventory.", "Have students mark missing fields unknown.", "a-teach"] },
    { key: "control", title: "Match one control to one question", doItems: ["Pick one of your four questions.", "Pick the pillar in the picture that helps answer it.", "Copy the example on the right and change it to your choice."],
      doneWhen: "You can explain your choice in plain words. You do not configure anything in this step.",
      snippet: { language: "text", code: "Question: Who is responsible?\nControl: Pillar 2, governing who can create and manage agents (ownership and lifecycle)." },
      visual: fig("The five Entra pillars", `<div class="pillar-strip">${[["1", "Agent identity and lifecycle"], ["2", "Who can create and manage"], ["3", "Agent permissions"], ["4", "Protect access"], ["5", "Protect supported traffic"]].map(([number, label]) => `<div><span>${number}</span><strong>${label}</strong></div>`).join("")}</div>`),
      note: ["Map, do not configure", "This step deploys no Conditional Access, ID Protection or network policy. Confirm supported capabilities and tenant eligibility separately and never weaken existing policy.", "Ask students to justify one pillar.", "a-teach"] },
    { key: "proof", title: "Decide what proof you need", doItems: ["Look at the three proofs in the picture: a sign-in, a tool record, and the received email.", "Copy the line on the right into your note under question 4.", "Add one open data-protection question of your own."],
      doneWhen: "You know that a sign-in, a draft and a delivered email prove different things, and that an audit entry is not a block.",
      snippet: { language: "text", code: "Check who acted, which tool ran, and whether the intended email arrived." },
      visual: fig("Three different proofs", flow([["Sign-in", "Who authenticated?"], ["Tool record", "Which action, on what target?"], ["Mailbox receipt", "Did the intended email arrive?"]])),
      note: ["Separate the proofs", "Real mail and runtime proof belong to the Module 2 live test. Never claim a DLP block, XDR alert or downstream ingestion because an exporter is configured.", "Have students name the source needed for each claim.", "a-teach"] },
    { key: "check", title: "Quick check: answer four questions", minutes: 3, doItems: ["Copy the four questions on the right.", "Answer each in one line (about two minutes).", "Aim for at least 3 of 4 correct, including question 3.", "Then compare with your instructor."],
      doneWhen: "Question 3 is the important one. If you missed it, go back to the two-risks step and try again.",
      snippet: { language: "text", code: "1. Name the agent's purpose and who is accountable.\n2. State the task, data, tool and recipient boundary.\n3. Why is a valid sign-in not proof of safe behavior?\n4. Which evidence and decision follow an unexpected action?" },
      visual: fig("Your four-question check", grid([["1  Purpose and people", "What does it do? Who owns it? Who acts?"], ["2  Boundary", "Which data, tool and recipient are allowed?"], ["3  Monitoring gap", "Why is a valid sign-in not enough?", "attention"], ["4  Evidence and decision", "What would you investigate or restrict?"]])),
      note: ["Run the check", "Let students answer first. Target at least 3 of 4, including question 3; revisit the two-risks step if question 3 is missed.", "Let students finish before you show the answers below.", "a-teach"],
      answers: ["1. Synthetic status-mail task; technical owner and sponsor; the acting user is distinct.", "2. Supplied synthetic brief, reviewed internal status email, Mail tool, approved internal recipient. No extra sources or attachments.", "3. AI-native content can manipulate legitimate access without a new sign-in at ingestion. Later identity evidence can still help.", "4. Attributed tool/action and workload evidence, correlated as needed. Investigate or restrict the specific target, or record the coverage gap."] },
    { key: "next", title: "Write your next action", doItems: ["Copy the line on the right into your note.", "Finish the sentence with ONE gap to investigate before expanding agent use.", "Keep your note for Module 2."],
      doneWhen: "You have four short answers, one risk sentence and one next action. You have not claimed that any real agent or control was tested.",
      snippet: { language: "text", code: "Gap to investigate before expanding agent use: ____" },
      link: { label: "Continue to the Module 2 student lab", href: "module-02/?view=lab", primary: true },
      visual: fig("Carry the gap forward", flow([["Known", "Four short answers"], ["Unknown", "One control or evidence gap"], ["Module 2", "Run the task and collect real proof"]])),
      note: ["Hand off to the live lab", "Before Module 2, finish its Instructor setup and live rehearsal. Give students the real UI link and one approved internal recipient. Licensing is a follow-on conversation about the gap: basic DLP and ordinary XDR are not exclusively E7.", "Collect one gap and one next action.", "a-teach"] }
  ]
};

const m2 = {
  lab: [
    { key: "signin", title: "Sign in to the agent", doItems: ["Open the **agent link your instructor gave you**. It is not a slide link.", "Click **Sign in** and use your lab account, never a personal one.", "Select the tab **Project Beacon Mail Agent**.", "Confirm you can see a message box and a **Send** button."],
      doneWhen: "The chat is open. Here, Send submits a chat message. It is not an email approval control. If you cannot sign in, stop and tell the instructor.",
      visual: fig("The agent website", window_("Project Beacon Mail Agent", "Signed in as your lab user", `<div class="mock-tabs"><span class="active">Project Beacon Mail Agent</span><span>Sign out</span></div><div class="mock-message"><p>Say what you need.</p></div><div class="mock-compose">Message box <span class="mock-send">Send</span></div>`)),
      note: ["Preflight before class", "Complete Module 1 account setup and the Module 2 setup and test, including a fresh-profile rehearsal. HTTP health alone is not model inference or mail proof. Give every student their own account, the real URL and the approved recipient.", "Ask for a thumbs up when each student sees the message box.", "b-live"] },
    { key: "limits", title: "Write the task and its limits", doItems: ["Open a blank note.", "Copy the two lines on the right.", "Paste them into the note."],
      doneWhen: "These are the intended limits. They are not proof that a technical policy enforces them.",
      snippet: { language: "text", code: "Task: Draft, review, and send one internal Project Beacon status email.\nLimits: Supplied fictional facts only. One approved internal recipient. No attachments, extra sources, or extra recipients." },
      visual: fig("The operating boundary", grid([["Inside the boundary", "Supplied fictional facts, the Mail tool, one approved internal recipient."], ["Outside the boundary", "Extra sources, extra recipients, attachments, or tool actions nobody asked for.", "attention"]])),
      note: ["Confirm the boundary", "Use fictional data and one controlled internal recipient. The prompt states intended limits; it does not prove technical enforcement.", "Have students say what must not happen.", "b-live"] },
    { key: "actor", title: "Check who will send it", doItems: ["Find the lab username shown in the agent website.", "Copy the line on the right into your note.", "Keep the username private; do not paste it into public notes."],
      doneWhen: "The signed-in user is your assigned lab user, not an administrator. The agent's own registration is a separate object from the mailbox that sends.",
      snippet: { language: "text", code: "Mail sends from this signed-in user's mailbox." },
      visual: fig("Who actually sends?", flow([["Lab user", "The signed-in mailbox owner"], ["Delegated Mail token", "The authority the tool uses"], ["Recipient", "The controlled internal mailbox"]])),
      note: ["Verify the acting user", "Check the real user is signed in. Keep the user, blueprint, app and registered-agent IDs distinct, and do not infer a formal OAuth OBO exchange from the sample's name.", "Ask which mailbox will send.", "b-live"] },
    { key: "draft", title: "Ask for a draft only", doItems: ["Copy the prompt on the right.", "Paste it into the agent's message box.", "Click **Send** in the chat.", "Wait for the draft."],
      doneWhen: "A draft appears and **no email is sent yet**. If the agent sends before you ask, stop and tell the instructor. The prompt is an instruction, not a proven approval boundary.",
      snippet: pick(learner[2], "4.1"),
      visual: chat("Use the fictional brief. Return a draft only. Do not send.", "Subject: [A365 TRAINING] Project Beacon status. A 60-80 word draft using only the supplied facts.", "Paste the prompt, then click Send"),
      note: ["Watch the draft-only step", "The fictional brief is inside the prompt, so no data-seeding script is needed. If an email or tool action happens before the explicit request, stop and investigate. Do not present it as approved behavior.", "Let students check facts, subject and word count.", "b-live"] },
    { key: "review", title: "Review the draft", doItems: ["Tick each item in the picture against the draft.", "Count the words (60 to 80).", "If anything is wrong or invented, ask the agent to fix only that."],
      doneWhen: "Every fact is correct, nothing was added, and the subject is right. Do not move on while anything is wrong.",
      visual: fig("Review checklist", list(["The subject is **[A365 TRAINING] Project Beacon status**", "**Three of four** documentation tasks complete", "Remaining task: **review the architecture diagram**", "Next milestone: **November 6, 2026**", "Next action: confirm the review owner by **November 3, 2026**", "60 to 80 words, with no added recipients, attachments or facts"], "ticks")),
      note: ["Review together", "This is the human review gate. Remind students that the draft is a candidate email, not an approved one.", "Ask what would make them stop.", "b-live"] },
    { key: "send", title: "Ask the agent to send the reviewed email", doItems: ["Copy the instruction on the right.", "Replace **both placeholders**: the approved recipient and the reviewed draft.", "Paste it into the same chat and click **Send**."],
      doneWhen: "The agent answers. Do not click again or resend. A chat success message is not proof the email arrived.",
      snippet: pick(learner[2], "5.1"),
      visual: fig("The send request", `<div class="agent-card"><div class="visual-tag">YOUR REVIEWED EMAIL</div><dl><div><dt>To</dt><dd>One approved internal recipient</dd></div><div><dt>Subject</dt><dd>[A365 TRAINING] Project Beacon status</dd></div><div><dt>Body</dt><dd>Your exact reviewed draft</dd></div></dl></div>`),
      note: ["Run the send step", "Keep the controlled recipient account with the facilitator. Do not allow a second send while checking. If the agent adds recipients or attachments, stop.", "Have students replace both placeholders.", "b-live"] },
    { key: "receipt", title: "Ask the instructor to check the mailbox", doItems: ["Tell the instructor you have asked the agent to send.", "The instructor opens the recipient's Outlook, not yours.", "The instructor reads out sender, recipient, subject, body and time."],
      doneWhen: "The real email arrived with the right sender, recipient, subject, body and time. If unsure, wait for the instructor to check. Do not resend.",
      visual: fig("Verify in the real mailbox", flow([["Chat says sent", "Not proof of delivery", "attention"], ["Recipient mailbox", "Sender, recipient, subject, body, time"], ["Receipt confirmed", "Only then is it proven"]])),
      note: ["Check the recipient yourself", "Open the controlled recipient's mailbox. If a message is missing, inspect before retrying and never create duplicates. Do not broaden permissions to force delivery.", "Wait for the facilitator's confirmation.", "b-logs"] },
    { key: "proof", title: "Record what you actually saw", doItems: ["Look at the four proof boxes in the picture.", "Copy the six-line record on the right.", "Fill it in. For anything you did not observe, write **not observed**."],
      doneWhen: "Your record separates what you observed from what is still unproven. A missing downstream record is a gap, even when the email arrived.",
      snippet: pick(learner[2], "7.1"),
      visual: fig("Evidence board", grid([["Receipt", "Source, time and result; otherwise not observed."], ["Tool action", "Action, target and result; otherwise not observed."], ["Identity and permissions", "The actual actor and real grants."], ["Policy outcome", "Separate policy evidence, or explicitly unproven.", "attention"]])),
      note: ["Show actual evidence", "Use the runtime-log command in Instructor setup and approved mail evidence. Never project secrets or unrelated user content. Label each item current, prior, fictional or missing, and do not invent alerts.", "Check each record for unsupported claims.", "b-logs"] },
    { key: "wrap", title: "Wrap up", doItems: ["Copy the three questions on the right.", "Answer each in a sentence in your note.", "Click **Sign out** in the agent website and close the lab browser profile.", "Do not delete any shared resource."],
      doneWhen: "If it worked, say: the intended email arrived, which does not prove every control. If it failed, describe the failure instead of claiming success.",
      snippet: { language: "text", code: "What did we do?\nWhat did we not prove?\nWhat unexpected action would worry us?" },
      visual: fig("Close the loop", flow([["Observed", "What actually happened?"], ["Not proven", "Which security claims remain open?"], ["Next action", "Who investigates the gap?"]])),
      note: ["Retain, close, clean up", "Preserve approved evidence. Disable the exact run accounts, then clean up Azure and app registrations. Existing models, retention and licenses need explicit owner action.", "Remind students not to delete shared resources.", "b-cleanup"] }
  ]
};

const slide = (key, title, doItems, doneWhen, rest = {}) => ({ key, title, doItems, doneWhen, ...rest });
const snip = (set, key) => ({ snippet: pick(set, key) });
const adminSlides = {
  1: [
    slide("a-start", "Before you start", ["Use a **dedicated lab tenant**. Never use production.", "Have **PowerShell 7.2+, Git and Azure CLI** installed.", "Be (or have) an admin who can create users and groups, assign the selected licenses and issue Temporary Access Passes.", "Learners get **no admin roles**.", "Keep this checkout on a private, non-synced disk."], "You can do everything above. This takes about 45 minutes.", { visual: fig("The setup path", flow([["Accounts", "Group, users, licenses, TAPs"], ["Sign-in test", "Both mailboxes work"], ["Teach", "Module 1 Learn and Lab"]])) }),
    slide("a-files", "Get the files", ["Open **PowerShell 7**.", "Already have the checkout? Open it in PowerShell and skip to the next step.", "Otherwise paste the block on the right and press Enter."], "You are inside the **a365-hub** folder.", snip(admin[1], "1.1")),
    slide("a-prepare", "Prepare your local config", ["Stay in the a365-hub folder.", "Paste and run the block on the right.", "Keep this PowerShell window open until the end."], "A **.workshop** folder with a config file exists. It is excluded from Git.", snip(admin[1], "1.2")),
    slide("a-group", "Create this run's group", ["Replace the three values: tenant ID, verified domain and a run name such as **beacon01**.", "Paste and run. Sign in as the lab admin and read the permissions it asks for.", "Copy the Group ID it prints and keep it private."], "The output includes **Group ID:**. If you get an error, stop and fix it first. The script changes no tenant policy.", { ...snip(admin[1], "2.1"), visual: terminal("What you should see", "Group ID: 00000000-0000-0000-0000-000000000000") }),
    slide("a-tap", "Allow Temporary Access Passes for that group", ["Open **entra.microsoft.com**.", "Go to **Entra ID, Authentication methods, Policies, Temporary Access Pass**.", "Enable it for the group **A365 Hub beacon01**, not the whole organization.", "Set the lifetime to at least **180 minutes** and allow **multi-use**.", "Click **Save**."], "The policy targets only your group. If you cannot edit it, ask the Authentication Policy Administrator. This is the one policy step; nothing weakens Conditional Access or MFA.", { visual: portal(["Entra ID", "Authentication methods", "Policies", "Temporary Access Pass"], ["Turn it on", "Target: the group A365 Hub beacon01", "Lifetime 180 minutes or more; multi-use", "Save"]) }),
    slide("a-skus", "List your license SKUs", ["Paste and run the block on the right.", "Choose the SKU(s) your Agent 365 enrollment needs, including a working Exchange mailbox.", "Do not pick every SKU. You need seats for two accounts."], "You have the approved SKU GUID(s) written down.", snip(admin[1], "4.1")),
    slide("a-users", "Create the learner and the recipient", ["Replace both placeholders on the **$licenses** line with your SKU GUID(s). One GUID is fine if one SKU covers everything.", "Change **US** if your licensing location differs.", "Paste and run."], "Two accounts and a private credentials-file path are reported. TAP values are never printed. Existing same-name accounts outside the run are never taken over.", { ...snip(admin[1], "4.2"), visual: terminal("What you should see", pick(admin[1], "4.3").code) }),
    slide("a-signin", "Test both mailboxes before class", ["Open the private credentials file **off screen share**.", "In a separate browser profile, open outlook.office.com and sign in as the learner with the TAP.", "Confirm the mailbox opens, then repeat for the recipient in another profile.", "Send a test message from learner to recipient and confirm it arrives."], "Both mailboxes work and the test arrives. A new license can take time to create a mailbox, and a TAP does not bypass Conditional Access, MFA or device rules. If a check fails, stop and fix it first.", { visual: fig("Two browser profiles", flow([["Profile 1", "Learner signs in with the TAP"], ["Test message", "Learner sends to recipient"], ["Profile 2", "Recipient receives it"]])) }),
    slide("a-renew", "Renew TAPs just before class (only if needed)", ["Only do this if preparation outlasted the TAP lifetime.", "Use your real learner count instead of 1.", "Paste and run, then send the updated credentials privately."], "Old TAPs for these accounts stop working. Tell the affected learners.", snip(admin[1], "5.1")),
    slide("a-teach", "Run the class", ["Give each learner **only their own** username and TAP, privately.", "Keep the recipient account with you.", "Teach the Module 1 **Learn** slides.", "Then open the **Student lab**. Turn on **Instructor notes** for your cues.", "Before Module 2, finish the Module 2 setup and rehearsal."], "Each learner has four short answers and one next action. Record the real time it took.", { visual: fig("Module 1 flow", flow([["Learn", "Teaching slides"], ["Student lab", "Nine short steps"], ["Module 2", "After its setup is proven"]])) }),
    slide("a-close", "Close the accounts after the workshop", ["Run the first command to preview exactly which accounts will be disabled.", "Check the list.", "Run the second command to disable only this run's accounts."], "The accounts are disabled and sessions revoked. Mail, licenses, users and groups are **not** deleted. Handle those under your retention policy and securely remove the TAP file. Never bulk-delete all workshop users.", snip(admin[1], "7.1"))
  ],
  2: [
    slide("b-start", "Before you start", ["You have an authorized **Agent 365-enabled lab tenant** and the tested Module 1 mailboxes.", "You have an Azure subscription and a budget.", "You have a **chat model deployment** with quota, or you will create one later in this guide.", "You can create a resource group, deploy to it and assign roles; an Entra admin can approve app consent.", "This deployment does **not** run the upstream deploy script. That script deletes its whole resource group."], "Everything above is true. If not, stop and arrange it first. Learners never get these rights.", { visual: fig("The setup path", flow([["Tools", "Python, uv, CLI"], ["Deploy", "Agent and website"], ["Test", "Real mail task"], ["Teach", "Student lab"]])) }),
    slide("b-python", "Check Python and uv", ["Open an **external** PowerShell 7 window, not the VS Code terminal.", "Paste and run the block on the right."], "It prints a Python version (3.12 or later) and a uv version.", snip(admin[2], "0.1")),
    slide("b-cli", "Install the Agent 365 CLI", ["Install the .NET SDK first if it is missing.", "Already installed? Run `a365 --version` and note the version instead.", "Otherwise paste and run the block on the right."], "`a365 --version` prints a version. The sample documents CLI 1.1.x or later.", snip(admin[2], "0.2")),
    slide("b-config", "Fill in the config once", ["Open **.workshop\\config.json** in an editor.", "Replace every **<...>** with your values.", "Use a **new** resource group name and leave both app IDs blank.", "Confirm region, model quota and budget."], "No placeholders remain except the two blank app IDs. Find the model account and deployment names under your Azure OpenAI resource, Model deployments.", snip(admin[2], "1.1")),
    slide("b-azure", "Sign in to Azure", ["Stay in the external PowerShell 7 window, at the a365-hub folder.", "Paste and run the block on the right.", "Keep this window open through the end of setup."], "The tenant and subscription shown match your config. If provider registration fails, ask the subscription owner. Do not disable Azure Policy.", snip(admin[2], "2.1")),
    slide("b-model-a", "Optional: no model yet? Create a model account", ["Only with approved quota, region and cost.", "Use **new** names for the model group and account in your config.", "Paste and run the block on the right."], "The model account exists and the command lists its available models. The group must be new; the script refuses an existing one. Local API keys are disabled.", snip(admin[2], "2.2")),
    slide("b-model-b", "Optional: deploy a chat model", ["Pick an **available chat model** from the list that was just printed.", "Replace the model name, version and SKU on the right with real values for your quota.", "Paste and run."], "The deployment succeeds. If it fails, check quota and region and do not continue. Delete only a **new** lab model group later; never a reused one.", snip(admin[2], "2.3")),
    slide("b-apps", "Download the toolkit and create the sign-in apps", ["Paste and run the command on the right.", "It downloads one pinned toolkit revision, creates a CLI app and a browser sign-in app, and writes your local config."], "The output ends with **Sources and app configuration ready**, and your config now holds two app IDs. Errors are blockers; never grant learners admin roles.", { ...snip(admin[2], "3.1"), visual: terminal("What you should see", "Sources and app configuration ready") }),
    slide("b-register", "Register the agent: check requirements", ["Stay in the same window. Run commands one at a time.", "Paste and run the block on the right.", "Sign in and approve consent when asked."], "Continue only when requirements report no failures.", snip(admin[2], "4.1")),
    slide("b-register2", "Register the agent: create it", ["Paste and run the block on the right.", "Wait for it to finish."], "It creates **a365.generated.config.json** with both an **agentBlueprintId** and an **agenticAppId**. They are different IDs; the CLI app ID is not the agent.", snip(admin[2], "4.2")),
    slide("b-deploy", "Deploy the agent and website", ["Run the first command to preview what will be created.", "Review scope and budget, then run the second command.", "Enter the blueprint secret in the **hidden prompt**."], "The output gives **UI:** and **API:** links, also saved in **.workshop\\deployment.json**. That means deployed, not yet a passed lab. Nothing is deleted and no API key is used.", { ...snip(admin[2], "5.1"), visual: terminal("What you should see", "UI:  https://hub-beacon01-ui.<region>.azurecontainerapps.io\nAPI: https://hub-beacon01-api.<region>.azurecontainerapps.io") }),
    slide("b-consent", "Grant browser access (consent)", ["Paste and run the block on the right. It opens a consent page.", "Check that the app is **A365 Hub beacon01 spa** before approving its Mail access."], "Consent is granted for the intended app only.", snip(admin[2], "6.1")),
    slide("b-endpoint", "Register the messaging endpoint", ["Paste and run the block on the right."], "Registration succeeds. The chat uses the signed-in user's delegated Mail token (`direct`), not a proven OAuth OBO exchange.", snip(admin[2], "6.2")),
    slide("b-http", "Run the automatic checks", ["Paste and run the command on the right.", "Compare with the expected result in the picture.", "If the first call is slow, wait for the container to start and run it again."], "Health, the unauthenticated 401 and the sign-in page pass. The three NOT TESTED lines are expected: you test them next.", { ...snip(admin[2], "7.1"), visual: terminal("What you should see", pick(admin[2], "7.2").code) }),
    slide("b-live", "Run the real task yourself", ["Open the **UI link** from deployment.json in a fresh browser profile.", "Follow the **Student lab**, steps 1 to 9, as a learner.", "Ask a colleague to check the recipient's Outlook."], "The draft appears, the right email arrives, and you can name the actual evidence. If any part fails, do not announce a working lab. If first-use Mail consent appears, complete it as the lab user, never with an admin token.", { visual: fig("Your own dry run", flow([["Sign in", "Lab user, fresh profile"], ["Draft, then send", "Student lab steps"], ["Recipient mailbox", "Colleague confirms"]])) }),
    slide("b-logs", "Check the runtime logs", ["Paste and run the block on the right.", "Keep raw prompts and user data out of anything public.", "In a private note, record user, sender and recipient, subject, receipt time, tool record and any missing telemetry."], "You can name the actual actor, action and evidence location. A configured exporter is not proof of downstream ingestion.", snip(admin[2], "7.3")),
    slide("b-rehearse", "Rehearse with fresh learners", ["Paste and run the block on the right to create two more learner accounts.", "Have another facilitator run the student lab with fresh browser profiles.", "Time it and practice recovering from an expired session."], "Three learners can finish within the planned 35 minutes.", snip(admin[2], "8.1")),
    slide("b-handoff", "Hand off to learners", ["Give every learner the items on the right, each in a private message.", "Never post TAPs publicly."], "Each learner can reach the agent and knows who supports them.", { ...snip(admin[2], "8.2"), snippet: { language: "text", code: pick(admin[2], "8.2").code } }),
    slide("b-cleanup", "Clean up after class", ["Close the accounts using the **last step of the Module 1 Instructor setup**.", "Run the first command to preview the Azure removal.", "After you save any required evidence, run the second command."], "Account access, Azure resources, the model role, app grants, licenses and evidence each have a recorded done or blocked outcome. The existing model is kept; remove registered agent, blueprint and apps in Entra only with approval.", snip(admin[2], "8.3"))
  ]
};

for (const module of [1, 2]) {
  const keys = new Set(adminSlides[module].map(item => item.key));
  assert.equal(keys.size, adminSlides[module].length, "Admin slide keys must be unique");
  for (const item of (module === 1 ? m1 : m2).lab) assert(keys.has(item.note[3]) || item.note[3] === "a-teach", `Unknown admin link ${item.note[3]}`);
}

export const labSlides = module => (module === 1 ? m1 : m2).lab;
export const setupSlides = module => adminSlides[module];
export const labIntro = module => module === 1
  ? { minutes: 25, title: "Module 1 student lab", lead: "Nine short steps. Each one tells you what to click or paste and what you should see.", need: ["Your lab username and Temporary Access Pass (TAP), from the instructor", "A browser and a place to take notes", "No admin access is needed"] }
  : { minutes: 35, title: "Module 2 student lab", lead: "Draft an email, review it, ask for it to be sent, and check what really happened.", need: ["Your tested lab account", "The agent link from the instructor (not a slide link)", "One approved internal recipient", "Only fictional training data"] };
export { card, flow, grid, fig, terminal, list, rich as richText };
