# ADR-004 — Background Jobs with BullMQ

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center performs operations that should not depend on the lifetime of a single HTTP request.

Examples include:

- Content publishing.
- Scheduled publishing.
- Media processing.
- Platform synchronization.
- Retryable external API operations.
- Notifications.
- Other asynchronous workflows.

These operations require durable job processing, retries, scheduling, failure handling, and worker execution.

## Options

### Option 1 — Synchronous HTTP Processing

Perform long-running work directly during API requests.

#### Disadvantages

- Long request times.
- Increased timeout risk.
- Poor resilience to worker crashes.
- Difficult retry management.
- Poor separation between request handling and background processing.

### Option 2 — Cron-Based Processing

Use scheduled cron processes to discover pending work.

#### Advantages

- Simple initial implementation.

#### Disadvantages

- Poor real-time job handling.
- More difficult retry semantics.
- Increased polling.
- Less precise scheduling.
- Harder concurrency management.

### Option 3 — BullMQ

Use BullMQ for background jobs and workers, backed by Redis.

#### Advantages

- Queue-based architecture.
- Delayed jobs.
- Retries.
- Backoff.
- Job state.
- Worker processing.
- Good Node.js/TypeScript ecosystem.
- Suitable for publishing and asynchronous workflows.

#### Disadvantages

- Adds Redis dependency.
- Requires worker infrastructure.
- Requires careful idempotency and failure handling.

## Decision

Creators Command Center will use **BullMQ for asynchronous job processing**.

BullMQ will manage background workflows such as:

- Publishing.
- Scheduled publishing.
- Media processing.
- Retryable provider operations.
- Other explicitly asynchronous tasks.

Workers will process jobs independently of the API request lifecycle.

## Consequences

### Positive Consequences

- Long-running work is separated from HTTP requests.
- Jobs can be retried.
- Scheduled work can be represented explicitly.
- Worker failures can be recovered.
- Job states can be monitored.
- Application capacity can scale independently from workers.

### Negative Consequences

- Worker infrastructure must be operated.
- Jobs require explicit state management.
- Idempotency becomes essential.
- Redis becomes an infrastructure dependency.

### Trade-offs

The project accepts additional infrastructure complexity in exchange for reliable asynchronous processing.

## Implementation Requirements

Jobs must:

- Have explicit job types.
- Have defined payload schemas.
- Have bounded retries.
- Use appropriate exponential backoff.
- Be idempotent where side effects are possible.
- Have observable states.
- Have defined failure states.
- Avoid storing unnecessary sensitive data in job payloads.
- Support recovery after worker crashes.
- Prevent duplicate side effects.

Publishing jobs must preserve partial success.

## Related Decisions

- ADR-005 — Redis
- ADR-006 — Platform Adapter Architecture
- Reliability & Error Handling

## Supersedes

N/A

## Superseded By

N/A