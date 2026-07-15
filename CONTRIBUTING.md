# Contributing to A365 Hub

Contributions are welcome. The highest-priority areas are module decks, portal labs,
Defender XDR/Sentinel detections, safe attack demonstrations, and CTF challenges.

## Before opening a pull request

1. Open or reference an issue for substantial changes.
2. Keep one module or workstream per pull request.
3. Follow the acceptance criteria in the [module roadmap](docs/module-roadmap.md).
4. Test automation in a disposable lab tenant.
5. Remove tenant IDs, subscription IDs, object IDs, UPNs, form IDs, attendee data,
   screenshots containing private information, tokens, and credentials.
6. Cite external research rather than copying it.

## Documentation style

- Write for a facilitator rebuilding the environment from zero.
- Distinguish tested behavior from planned or inferred behavior.
- Include prerequisites, expected results, troubleshooting, and teardown.
- Prefer portable placeholders such as `<tenant-id>` and `<subscription-id>`.
- Use report-only or read-only defaults for security-control demonstrations.

## Detection contributions

Include the target platform, schema, licensing, test procedure, expected telemetry,
false-positive guidance, and investigation/containment steps. Queries must be validated
before being labeled production-ready.

## Automation contributions

- Keep scripts idempotent where practical.
- Avoid secrets; prefer managed identity and delegated interactive authentication.
- Use least privilege and document every standing permission.
- Provide `-WhatIf` or `-DryRun` behavior for destructive or tenant-wide changes.
- Never silently broaden Conditional Access exclusions or security-data access.

## Pull request checklist

- [ ] The change was tested or is clearly labeled as untested/planned.
- [ ] Documentation and roadmap status are updated.
- [ ] No tenant-specific or personal data is included.
- [ ] Security boundaries and teardown are documented.
- [ ] Links and code examples were checked.
