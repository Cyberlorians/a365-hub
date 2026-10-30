const card = (title, body, tone = "") => `<div class="visual-card ${tone}"><strong>${title}</strong><p>${body}</p></div>`;
const flow = items => `<div class="visual-flow">${items.map((item, index) => `${index ? '<span class="flow-arrow" aria-hidden="true">&rarr;</span>' : ""}${card(item[0], item[1])}`).join("")}</div>`;
const grid = items => `<div class="visual-grid">${items.map(item => card(...item)).join("")}</div>`;
const frame = (title, body) => `<figure class="lab-visual"><figcaption>${title} <span>Illustration, not a live portal or evidence</span></figcaption>${body}</figure>`;

const visuals = {
  1: [
    () => frame("The useful task", flow([["Fictional brief", "Project Beacon facts"], ["Agent", "Draft an internal update"], ["Human + Mail", "Review before requesting send"]])),
    () => frame("Two attack surfaces, two evidence planes", grid([
      ["Identity plane", "Stolen identity or misused permission &rarr; token, sign-in and access evidence."],
      ["AI-native plane", "Untrusted instructions &rarr; agent runtime, tool and data evidence. No new sign-in is required at ingestion.", "attention"]
    ])),
    () => frame("Practice agent card", `<div class="agent-card"><div class="visual-tag">FICTIONAL / PRACTICE ONLY</div><h3>Project Beacon Mail Agent</h3><dl><div><dt>Purpose</dt><dd>Internal status email</dd></div><div><dt>Owner / sponsor</dt><dd>Unknown until verified</dd></div><div><dt>Actor</dt><dd>Signed-in lab user in Module 2</dd></div><div><dt>Data and evidence</dt><dd>Fictional brief; actual activity not yet observed</dd></div></dl></div>`),
    () => frame("Match the question to the Entra pillar", `<div class="pillar-strip">${[
      ["01", "Identity + lifecycle"], ["02", "Creators + managers"], ["03", "Permissions"],
      ["04", "Access protection"], ["05", "Supported traffic protection"]
    ].map(([number, label]) => `<div><span>${number}</span><strong>${label}</strong></div>`).join("")}</div>`),
    () => frame("Three different proofs", flow([
      ["Sign-in", "Who authenticated?"], ["Tool record", "Which action and target?"], ["Mailbox receipt", "Did the intended email arrive?"]
    ]) + '<p class="visual-note">An audit entry is not a block. Delivery is not proof of every security control.</p>'),
    () => frame("Your four-question readiness check", grid([
      ["1 / Purpose + people", "What does it do? Who owns it? Who acts?"],
      ["2 / Boundary", "Which data, tool and recipient are allowed?"],
      ["3 / Monitoring gap", "Why is valid sign-in not proof of safe behavior?", "attention"],
      ["4 / Evidence + decision", "What would you investigate or restrict?"]
    ])),
    () => frame("Carry the gap forward", flow([
      ["Known", "Four short answers"], ["Unknown", "One control or evidence gap"], ["Module 2", "Run the approved task and collect actual proof"]
    ]))
  ],
  2: [
    () => frame("The lab journey", flow([["Draft", "Use the fictional brief"], ["Review", "Check every fact"], ["Request send", "One approved recipient"], ["Verify", "Actual receipt + evidence"]])),
    () => frame("The operating boundary", grid([
      ["Inside the boundary", "Supplied fictional facts, Mail tool, one approved internal recipient."],
      ["Outside the boundary", "Extra sources, recipients, attachments or unrequested tool actions.", "attention"]
    ])),
    () => frame("Who actually sends?", flow([
      ["Lab user", "Signed-in mailbox owner"], ["Delegated Mail token", "Authority used by the tool"], ["Recipient", "Controlled internal mailbox"]
    ]) + '<p class="visual-note">The registered agent ID is separate. A matching display name does not prove attribution.</p>'),
    () => frame("What the chat step looks like", `<div class="mock-window"><div class="mock-top">Project Beacon Mail Agent <span>Signed-in lab user</span></div><div class="mock-message"><strong>You</strong><p>Use the fictional brief. Return a draft only. Do not send.</p></div><div class="mock-message agent"><strong>Expected response shape</strong><p>Subject: [A365 TRAINING] Project Beacon status</p><p>A 60-80-word draft using the supplied facts, ready for your review.</p></div><div class="mock-compose">Paste the draft-only prompt below <span>Send = submit chat</span></div></div>`),
    () => frame("Review, then verify the real mailbox", `<div class="visual-grid"><div class="mock-window"><div class="mock-top">Reviewed training email</div><dl><div><dt>To</dt><dd>Your approved real internal recipient</dd></div><div><dt>Subject</dt><dd>[A365 TRAINING] Project Beacon status</dd></div><div><dt>Body</dt><dd>The exact reviewed draft</dd></div></dl></div>${card("Facilitator checks Outlook", "Verify sender, recipient, subject, body and time in the actual mailbox. A chat success message is not a receipt.", "attention")}</div>`),
    () => frame("Evidence board: fill this from the actual run", grid([
      ["Receipt", "Source + time + result; otherwise not observed."],
      ["Tool action", "Action + target + result; otherwise not observed."],
      ["Identity + permissions", "Actual actor, typed agent ID and real grants."],
      ["Policy outcome", "Separate policy evidence, or explicitly unproven.", "attention"]
    ])),
    () => frame("Your private agent record", `<div class="agent-card"><div class="visual-tag">YOUR ACTUAL RUN / PRIVATE</div><dl>${[
      ["Task", "Draft, review, send"], ["Sender + owner", "Actual user + admin-provided owner"],
      ["Boundary", "Fictional brief / Mail / approved recipient"],
      ["Result", "Real proof, exact failure or missing evidence"], ["Next gap", "One remaining permission, policy or telemetry question"]
    ].map(([title, value]) => `<div><dt>${title}</dt><dd>${value}</dd></div>`).join("")}</dl></div>`),
    () => frame("Close the loop", flow([["Observed", "What actually happened?"], ["Not proven", "Which security claims remain open?"], ["Next action", "Who investigates the gap?"]]))
  ]
};

const instructorNotes = {
  1: [
    ["Before learners start", "Use admin Steps 1-5 to create run-owned users, select approved licenses and test both mailboxes. Renew TAPs explicitly if needed, then distribute each person's credentials privately. Never project the CSV.", "Have students name the business task, not products.", 5],
    ["Teach the monitoring gap", "No attack script or fabricated event is needed. Compare identity misuse with malicious instructions in content. Injection can occur with no new IdP event at ingestion.", "Ask why a valid sign-in is not enough.", 6],
    ["Choose the evidence mode", "Use the fictional card as labeled. For a real Registry view, verify the target, owner, source and time first. Do not turn the fictional card into claimed inventory.", "Have students mark missing fields unknown.", 6],
    ["Map, do not configure", "This step does not deploy CA, ID Protection or network policy. Confirm supported capabilities and tenant eligibility separately. Do not weaken existing policies.", "Ask students to justify one Entra pillar.", 6],
    ["Separate the proofs", "Real mail and runtime checks belong to Module 2's live test. Do not claim a DLP block, XDR alert or downstream ingestion from a configured exporter.", "Have students name the source needed for each claim.", 6],
    ["Run the knowledge check", "Open the embedded answer key. Target at least 3 of 4, including question 3. Revisit the dual-plane slide if question 3 is missed.", "Let students answer before showing the key.", 6],
    ["Hand off to the live lab", "Before Module 2, complete its admin deployment and live rehearsal. Provide the actual UI URL and one approved internal recipient. Close only the run's manifest-owned accounts after the workshop.", "Collect one gap and one next action.", 7]
  ],
  2: [
    ["Preflight before class", "Complete Module 1 account/TAP setup and Module 2 admin Steps 1-8. HTTP health alone is not model inference or Mail proof. Rehearse with fresh learner profiles.", "Give learners their tested account, real UI URL and approved recipient.", 7],
    ["Confirm the boundary", "Use fictional training data and a controlled internal recipient. The prompt describes intended limits; it does not prove technical enforcement.", "Have students state what must not happen.", 7],
    ["Verify the acting user", "Check the actual lab user is signed in, not an administrator. Keep user, blueprint, app and registered agent IDs distinct. Do not infer formal OAuth OBO from the sample name.", "Ask students which mailbox will send.", 6],
    ["Watch the draft-only step", "The fictional brief is included in the prompt; no data-seeding script is required here. If an email/tool action occurs before explicit request, stop and investigate rather than presenting it as approved behavior.", "Let students review facts, subject and word count.", 7],
    ["Check the recipient yourself", "Keep the controlled recipient account with the facilitator. Verify the actual delivered message and time. On uncertainty, inspect before retrying; do not generate duplicate sends.", "Have students replace both placeholders and request only the reviewed email.", 7],
    ["Show actual evidence", "Use the runtime log command in admin Step 7, approved mail evidence and verified identity/grants. Do not project raw secrets or unrelated user content. Label current, prior, fictional and missing evidence separately.", "Have students record source, time and gaps without inventing alerts.", 7],
    ["Attribute carefully", "Provide a real accountable owner and verified IDs privately. Similar display names across fixtures do not establish that they are the same agent/runtime.", "Review the six-line record for unsupported claims.", 7],
    ["Retain, close, clean up", "Preserve approved evidence. Use Module 1 Step 7 to disable exact run accounts, then Module 2 admin Step 8 for scoped Azure/RBAC/app cleanup. Existing models and retention/licensing require explicit owner action.", "Have students sign out and close the lab profile; students must not delete shared resources.", 8]
  ]
};

export function labVisual(module, step) {
  if (!step) return frame("Prepare &rarr; learn &rarr; practice &rarr; prove", flow([
    ["Instructor", "Prepares the isolated lab"], ["Student", "Follows one step at a time"], ["Together", "Check the actual outcome"]
  ]));
  return visuals[module][step - 1]();
}

export function facilitation(module, step, adminUrl) {
  if (!step) return "";
  const [title, preparation, student, adminStep] = instructorNotes[module][step - 1];
  return `<aside class="facilitator-note" data-instructor-only hidden><p class="eyebrow">Instructor only / ${title}</p><p><strong>You:</strong> ${preparation}</p><p><strong>Student:</strong> ${student}</p><a href="${adminUrl(adminStep)}">Open the related admin step</a></aside>`;
}

export function adminVisual(module, step) {
  return frame("Instructor preparation / Module " + module, flow([
    ["Prepare", "Dedicated tenant, permissions, budget"],
    [step ? "Admin step " + step : "Preflight", "Run the shown command or portal action"],
    ["Prove", "Check the actual output before continuing"]
  ]));
}
