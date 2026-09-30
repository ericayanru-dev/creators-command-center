# ADR-009 — Trigger.dev Execution Architecture

**Creator Command Center**

**Status:** Accepted / Final / Locked

**Date:** 2026-09-08

**Version:** 1.0

**Decision Scope:** MVP1–MVP3 background execution; extensible to MVP4 control-plane workflows

**Supersedes:** ADR-004 — Background Jobs with BullMQ

**Supersedes:** ADR-005 — Redis as Queue and Coordination Infrastructure

# 1. Decision Summary

Creator Command Center will replace BullMQ + Redis as its primary background-execution infrastructure with Trigger.dev. Trigger.dev becomes the execution/workflow layer for asynchronous publishing, scheduling, retries, long-running workflows, and other approved background tasks.

PostgreSQL remains the authoritative source of truth for Creator CC business state. Trigger.dev is execution infrastructure only and must not become the system of record for Publication, PublishingAttempt, scheduling intent, creator data, or other durable business entities.

This is an architecture decision, not an implementation-detail swap. Downstream architecture documents must be updated in dependency order.

# 2. Context

The existing architecture selected BullMQ backed by Redis for background jobs. Creator CC now requires durable execution, reliable scheduling, cancellation, idempotency, reconciliation, observability, and an execution foundation suitable for future MVP3 AI workflows.

The Creator CC comparison found Trigger.dev to be the stronger overall fit for MVP1–MVP3, while BullMQ remains stronger for low-level queue control and precise time-based rate limiting. The selected architecture therefore adopts Trigger.dev and retains an application/platform-specific rate-limiting layer.

# 3. Options Considered

| Option | Assessment | Decision |
|---|---|---|
| Synchronous HTTP | Poor fit for long-running, retryable, scheduled work. | Rejected |
| Cron/polling workers | Adds polling and custom reliability semantics. | Rejected |
| BullMQ + Redis | Excellent queue control, but requires Redis/worker infrastructure and more operational ownership. | Superseded |
| Trigger.dev | Strong durable execution, retries, scheduling, concurrency, observability, and lower infrastructure-management burden. | Selected |

# 4. Selected Architecture

Canonical execution relationship:

**PostgreSQL → Publication → Trigger.dev Task/Run → Platform Adapter → Social Platform**

**Social Platform Result → PublishingAttempt → PostgreSQL**

For multi-platform publishing, each target platform account continues to have its own durable Publication and PublishingAttempt history. Trigger.dev may fan out execution into independent task runs, but the Creator CC domain model remains authoritative.

# 5. Architectural Invariants

- PostgreSQL is the source of truth for durable Creator CC business state.
- Publication remains the durable publishing intent.
- PublishingAttempt remains the durable execution-attempt record.
- Content → ContentVersion (Platform Version) → Publication → PublishingAttempt is unchanged.
- The public API remains provider-agnostic and must not expose Trigger.dev run identifiers unless explicitly required.
- Trigger.dev execution state must not replace Publication or PublishingAttempt state.
- Tasks must re-check authoritative Publication state before externally visible side effects.
- Retries must be idempotent and must not create duplicate external publications.
- Rescheduling and cancellation operate through Publication state, not raw Trigger.dev operations exposed to clients.
- Database-to-execution reconciliation remains mandatory because PostgreSQL and Trigger.dev are separate systems.
- Platform-specific rate limiting remains an application/platform-adapter responsibility.
- MVP4 live-media transport requires dedicated live infrastructure; Trigger.dev is only a control-plane/background workflow component there.

# 6. Responsibility Boundaries

| Component | Responsibility |
|---|---|
| PostgreSQL / Prisma | Authoritative business state, Publication state, PublishingAttempt history, scheduling intent, reconciliation state, and durable operational metadata. |
| Hono API | Authentication, authorization, validation, business-state mutations, publication scheduling/cancellation/retry requests, and provider-agnostic API responses. |
| Trigger.dev | Background task execution, delayed/scheduled execution, retries, concurrency/queues, long-running workflows, and execution observability. |
| Platform adapters | Provider authentication/token use, request formatting, publishing calls, provider-specific errors, and provider-specific rate-limit handling. |
| Application rate limiter | Provider-specific quotas, windows, throttling, backpressure, and platform-specific limits. |

# 7. Scheduling Model

Creator CC does not delegate schedule authority to Trigger.dev. Publication remains authoritative for `scheduledAt` and `PublicationStatus`. Trigger.dev materializes the intended execution.

1. Create or update Publication scheduling state in PostgreSQL.
2. Create or reconcile the corresponding Trigger.dev execution.
3. On reschedule, reconcile the prior execution and establish execution for the new scheduled time.
4. On cancellation, prevent stale execution from producing an external side effect.
5. At execution time, re-read authoritative Publication state before publishing.

# 8. Reconciliation Model

A PostgreSQL transaction and a Trigger.dev invocation are not one atomic transaction. Creator CC therefore requires durable reconciliation.

- A scheduled Publication may temporarily have no recorded execution identifier.
- A reconciliation mechanism must detect missing or stale executions.
- Reconciliation must be safe to run repeatedly and use idempotency/deduplication controls.
- An execution for a cancelled or rescheduled Publication must not create an external side effect.
- Execution identifiers may be persisted as operational metadata, but never become the business-state source of truth.

# 9. Retry, Idempotency, and Cancellation

## 9.1 Retries

Trigger.dev provides task retry capabilities, but Creator CC decides which failures are retryable and protects external side effects. Retry policy distinguishes transient provider/network failures from permanent validation, authorization, content, or provider errors.

## 9.2 Idempotency

Externally visible publishing operations must be protected against duplicate execution. Trigger task idempotency is an execution safeguard; Publication and PublishingAttempt identifiers remain domain-level safeguards.

## 9.3 Cancellation

Cancellation is a Publication operation. The system may cancel/revoke the associated Trigger.dev execution, but the authoritative decision is the Publication state in PostgreSQL.

# 10. Concurrency and Rate Limiting

Trigger.dev concurrency controls protect execution capacity and workload isolation. They are not treated as a universal social-platform rate limiter.

- Use task/queue concurrency controls for execution capacity.
- Use concurrency keys where appropriate for tenant/platform workload isolation.
- Implement platform-specific rate-limit policies in the application/platform-adapter layer.
- Respect provider quotas, retry-after semantics, response headers, and provider-specific windows.
- Backpressure must not corrupt Publication or PublishingAttempt state.

# 11. Observability

Trigger.dev provides execution-level logs, tracing, run visibility, retries, and monitoring. Creator CC must also retain domain-level observability in PostgreSQL/application logs.

- Publication and PublishingAttempt status remain visible through Creator CC.
- Execution identifiers may be correlated with PublishingAttempt records.
- Failures must preserve actionable provider/error information.
- Operational alerts must distinguish execution-system failures from provider publishing failures.

# 12. Deployment Consequences

- Redis is no longer required as the primary MVP1 background-job infrastructure.
- BullMQ worker infrastructure is no longer part of the selected MVP1 execution architecture.
- Trigger.dev task code becomes a deployable execution component alongside application code.
- Trigger.dev Cloud may be used as the managed execution environment; self-hosting remains an available option.
- Trigger.dev credentials and integration secrets remain server-side.
- Production operations must monitor Trigger usage, concurrency, failures, and cost.

# 13. MVP Fit

| MVP | Fit | Position |
|---|---|---|
| MVP1 | Excellent | Publishing, scheduling, retries, idempotency, cancellation, reconciliation, observability. |
| MVP2 | Excellent | Advanced recovery and business workflows. |
| MVP3 | Excellent | Long-running AI workflows and human approval checkpoints. |
| MVP4 | Partial / control plane | Dedicated live-media infrastructure remains required for ingest, transport, transcoding, distribution, and recording. |

# 14. Consequences

## 14.1 Positive

- Less infrastructure to operate than BullMQ + Redis.
- Strong durable execution model for long-running workflows.
- Built-in retries, concurrency, scheduling, checkpointing, and observability.
- Good alignment with the TypeScript stack and future MVP3 AI workflows.

## 14.2 Trade-offs

- Introduces dependency on Trigger.dev Cloud or a self-hosted Trigger.dev deployment.
- Platform-specific rate limiting still requires application engineering.
- Execution-provider availability and pricing become operational considerations.
- Explicit PostgreSQL-to-Trigger reconciliation remains required.

# 15. Downstream Documentation Sequence

1. System Architecture Document
2. Backend Architecture Document
3. MVP Backend Specification
4. Database Design Document
5. API Documentation
6. Execution / Background Jobs Architecture
7. Reliability & Error Handling
8. Deployment & DevOps
9. Testing Strategy review
10. Security review

MVP Definition & Scope, User Experience Specification, and Frontend Architecture remain unchanged by this decision because their product-facing contracts do not prescribe BullMQ or Redis.

# 16. Supersession

ADR-004 (BullMQ) and ADR-005 (Redis as queue/coordination infrastructure) are superseded by this decision for the selected MVP1 execution architecture. Their historical rationale remains available for traceability, but they are no longer implementation-authoritative.

# 17. Acceptance Criteria

- No authoritative architecture document describes BullMQ + Redis as the selected MVP1 execution system.
- Trigger.dev is consistently described as execution infrastructure, not business-state storage.
- Publication and PublishingAttempt remain unchanged as domain concepts.
- PostgreSQL remains the source of truth.
- Scheduling, cancellation, retry, idempotency, rate limiting, and reconciliation are explicitly defined.
- Public API contracts do not expose Trigger.dev internals by default.
- MVP3 AI workflows can use the same execution foundation without replacing the core domain model.

# 18. Final Decision

**ACCEPTED: Creator Command Center will use Trigger.dev as its background execution/workflow infrastructure, replacing BullMQ + Redis. PostgreSQL remains authoritative, Publication and PublishingAttempt remain the core publishing domain model, and platform-specific rate limiting remains an application/platform-adapter responsibility.**

# 19. Source Basis

The decision uses the Creator CC Trigger.dev vs BullMQ comparison, the existing ADR-004/ADR-005, and current official Trigger.dev documentation. Current Trigger.dev documentation confirms scheduled tasks, concurrency controls, retries, checkpointing/durable execution, idempotency, observability, managed execution, self-hosting, and current pricing/concurrency tiers.