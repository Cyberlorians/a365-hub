# Detection Pack

> Status: design backlog. No production-ready detections have shipped yet.

This folder will contain Microsoft Defender XDR advanced-hunting queries, custom-detection
assets, and supporting Microsoft Sentinel content for the workshop's **Detect, Respond,
and Govern** module.

## Planned detections

| Detection | Primary signal | Status |
|-----------|----------------|--------|
| Blueprint credential added | Entra audit activity | Planned |
| Tier-0 permission assigned to agent identity | Entra audit / role assignment | Planned |
| TAP created by service or agent identity | Entra audit activity | Planned |
| Secret-authenticating blueprint inventory | Credential and sign-in telemetry | Planned |
| Agent activity baseline | Defender XDR `AIAgents` and related tables | Schema validation required |

## Required content for every detection

Each detection contribution must include:

- query and target platform;
- required table/schema and licensing;
- attack behavior and expected telemetry;
- safe test procedure;
- tuning and false-positive notes;
- investigation and containment steps;
- ATT&CK mapping where appropriate;
- sanitized sample results.

Do not present an untested query as production-ready. See the
[module roadmap](../docs/module-roadmap.md) and [contribution guide](../CONTRIBUTING.md).
