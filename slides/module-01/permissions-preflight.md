# Admin Setup Guide

This page is for the **presenter or lab admin**.

## What the audience needs

For slides 1–5, attendees need:

- a screen they can see;
- the event form link or QR code;
- access to the email address submitted in the form;
- the temporary lab account, license, and TAP created by the workshop workflow;
- no admin role;
- no access to presenter-only admin views.

Slides 6–18 do not require learners to open admin portals. Do not give the audience admin
permissions just to follow the presentation.

## What the presenter needs

The presenter needs only the access required for the pages shown in the live demo.

| If you show this | Presenter needs | Quick test |
|------------------|-----------------|------------|
| Slides | A modern browser | Open the deck and click through all 18 slides |
| Onboarding | Access to the event form and workflow operations | Submit a test response and complete email/TAP sign-in |
| Agent Registry | A licensed demo account with the intended Agent 365 reader/admin role | Open **Agents → All agents → Registry** and one safe agent |
| Microsoft Purview | Appropriate Compliance/Purview access for DSPM | Open **DSPM → AI observability** and confirm safe demo data |
| Microsoft Defender | Appropriate Security reader/admin access | Open **Security for AI → Policies & rules → Real-time protection** |

Use the smallest role that works. A presenter does not need Global Administrator just to
show a page.

## Five-minute check

Before people join:

1. Open the slide deck.
2. Test Next, Back, fullscreen, and presenter notes.
3. Submit the form once and test the email, UPN, TAP, and sign-in link.
4. Sign in with the presenter account.
5. Open Agent Registry, Purview AI observability, and Defender real-time protection.
6. Close tabs that show names, email addresses, secrets, TAPs, or unrelated customer data.
7. Use a lab tenant, not a production tenant.
8. Keep screenshots or a recorded backup in case a live portal is unavailable.

The **Presenter setup** button in the deck stores only a simple checklist in that browser.
It does not test permissions or connect to Microsoft Graph.

## Lab access boundary

The workshop workflow gives each attendee a separate temporary lab account and the license
needed for learner activities. It does not copy the presenter's admin roles. Any later lab
must grant only the read or maker access it actually requires.

For the complete hands-on environment and role design, see the
[deployment runbook](../../docs/05-onboarding-deployment-runbook.md).
