
---

# `docs/adr/003-cloudflare-r2.md`

```md
# ADR-003 — Object Storage with Cloudflare R2

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center requires object storage for creator media and other potentially large files.

The application must support:

- Media uploads.
- Media processing.
- Temporary processing files.
- Media lifecycle management.
- Secure media access.
- Large file handling.

Media should not be stored directly in the application server filesystem.

The storage solution must support scalable object storage while minimizing unnecessary bandwidth and infrastructure costs.

## Options

### Option 1 — Local Application Filesystem

Store uploaded files on application servers.

#### Disadvantages

- Not suitable for horizontally scaled applications.
- Files can be lost during deployments or instance replacement.
- Requires additional synchronization.
- Poor fit for distributed workers.

### Option 2 — Amazon S3

Use Amazon S3 for object storage.

#### Advantages

- Mature object storage.
- Large ecosystem.
- Strong durability and scalability.

#### Disadvantages

- Additional cloud dependency.
- Egress costs may become significant.
- More infrastructure configuration.

### Option 3 — Cloudflare R2

Use Cloudflare R2 as the application's object storage layer.

#### Advantages

- S3-compatible API.
- Suitable for large media objects.
- Integrates well with Cloudflare infrastructure.
- Avoids storing media on application servers.
- Supports signed/private object access.
- Suitable for distributed workers.

#### Disadvantages

- Adds Cloudflare dependency.
- Requires careful access-control configuration.
- S3 compatibility does not guarantee identical behavior for every S3 feature.

## Decision

Creators Command Center will use **Cloudflare R2 for object storage**.

Application servers and workers must treat R2 as external object storage rather than local filesystem storage.

Media access must be controlled through server-authorized access mechanisms and appropriately scoped signed URLs or equivalent mechanisms.

## Consequences

### Positive Consequences

- Media storage is separated from application compute.
- Workers can access shared media.
- Application instances can scale independently of media storage.
- Large files are not tied to application server disks.
- Cloudflare infrastructure integrates naturally with the broader deployment architecture.

### Negative Consequences

- Application becomes dependent on Cloudflare R2.
- Storage credentials must be protected.
- Object lifecycle management must be explicitly implemented.

### Trade-offs

The project prioritizes scalable distributed media storage over local filesystem simplicity.

## Implementation Requirements

The implementation must:

- Keep R2 credentials server-side.
- Never expose storage credentials to the frontend.
- Use private buckets/objects where appropriate.
- Use signed access for protected media.
- Apply lifecycle deletion rules.
- Avoid storing unnecessary duplicate media.
- Validate uploaded media.
- Enforce file-size limits.
- Track media processing state.
- Handle failed uploads and incomplete objects safely.

## Related Decisions

- ADR-002 — Backend Architecture
- ADR-004 — BullMQ
- ADR-005 — Redis
- Security Document Baseline
- Reliability & Error Handling

## Supersedes

N/A

## Superseded By

N/A