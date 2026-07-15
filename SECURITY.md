# Security Policy

## Supported use

A365 Hub is intended for **dedicated, disposable workshop tenants**. It creates temporary
user identities and can grant access to Microsoft Defender XDR and Sentinel telemetry.
Do not deploy it in a production tenant.

## Reporting a vulnerability

Use GitHub's **private vulnerability reporting** feature for this repository. Do not open
a public issue containing exploit details, credentials, tenant identifiers, or attendee
data.

Include:

- affected file or component;
- reproduction steps;
- security impact;
- suggested mitigation, if known.

## High-risk deployment boundary

The default public Form creates accounts tagged `department = workshop`, which can place
them in the dynamic attendee group. If that same group has SOC-read access, an unapproved
form submission may gain access to security telemetry after provisioning and policy
propagation.

Use one or more of these controls:

- deploy only in an isolated lab tenant;
- place SOC readers in a separate approved/static group;
- gate or close Form responses outside workshop hours;
- monitor provisioning and group changes;
- validate Conditional Access in report-only mode first;
- disable the provisioner before teardown and remove all workshop accounts afterward.

## Secret handling

Never commit access tokens, TAP values, attendee credential exports, connector secrets,
private keys, live form identifiers, or tenant deployment inventories. The repository's
ignore rules cover common local outputs, but contributors remain responsible for reviewing
every staged change.
