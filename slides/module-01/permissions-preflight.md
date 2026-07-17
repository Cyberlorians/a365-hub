# Admin Setup Guide

This page is for the **presenter or lab admin**.

## What the audience needs

For the eight-slide showcase, the audience needs:

- a screen they can see;
- no Microsoft account;
- no license;
- no admin role;
- no access to the demo tenant.

Do not give the audience permissions just to watch the presentation.

## What the presenter needs

The presenter needs only the access required for the pages shown in the live demo.

| If you show this | Presenter needs | Quick test |
|------------------|-----------------|------------|
| Slides only | A modern browser | Open the deck and click through all eight slides |
| Agent 365 | A licensed demo account that can open Agent 365 | Sign in and open the exact Agent 365 page used in the demo |
| Microsoft 365 admin center | A demo admin role that can view the planned page | Confirm the page opens and avoid unrelated admin areas |
| Microsoft Entra | Read access to the agent pages being shown | Confirm the agent list opens |
| Microsoft Defender | Read access to the planned Defender page | Confirm the page and demo data open |
| Microsoft Purview | Read access to the planned Purview page | Confirm the page and demo data open |
| Microsoft Sentinel | Microsoft Sentinel Reader on the lab workspace | Confirm the workspace and planned query open |

Use the smallest role that works. A presenter does not need Global Administrator just to
show a page.

## Five-minute check

Before people join:

1. Open the slide deck.
2. Test Next, Back, fullscreen, and presenter notes.
3. Sign in with the demo account.
4. Open every page used in the demo.
5. Close tabs that show names, email addresses, secrets, or unrelated customer data.
6. Use a lab tenant, not a production tenant.
7. Keep a screenshot or recorded backup in case the live demo fails.

The **Presenter setup** button in the deck stores only a simple checklist in that browser.
It does not test permissions or connect to Microsoft Graph.

## If the workshop becomes hands-on

The audience then needs separate temporary lab accounts and only the read or maker access
required by each lab. Test with a real attendee account before the event. Do not copy the
presenter's admin access to attendees.

For the complete hands-on environment and role design, see the
[deployment runbook](../../docs/05-onboarding-deployment-runbook.md).
