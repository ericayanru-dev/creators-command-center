# ADR-005 — Redis as Queue and Coordination Infrastructure

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center requires infrastructure for:

- Background job queues.
- Job scheduling.
- Worker coordination.
- Retry state.
- Queue state.
- Distributed coordination where required.

BullMQ requires Redis as its underlying queue storage and coordination system.

## Options

### Option 1 — Database-Backed Job Queue

Use the primary database as the job queue.

#### Advantages

- Fewer infrastructure components.

#### Disadvantages

- Adds workload to the primary database.
- Poor fit for high-frequency queue operations.
- Requires custom locking and queue semantics.
- Can interfere with transactional application workloads.

### Option 2 — Redis

Use Redis as the queue and coordination infrastructure.

#### Advantages

- High-performance in-memory operations.
- Native BullMQ support.
- Suitable for queue state and worker coordination.
- Mature Node.js ecosystem.

#### Disadvantages

- Adds infrastructure dependency.
- Requires availability monitoring.
- Data persistence and recovery configuration must be carefully considered.

## Decision

Creators Command Center will use **Redis as the infrastructure backing BullMQ**.

Redis will primarily support:

- BullMQ queues.
- Job scheduling.
- Worker coordination.
- Retry state.
- Queue metadata.

Redis must not become the primary source of truth for durable business entities that belong in the application database.

## Consequences

### Positive Consequences

- Efficient queue operations.
- Native BullMQ compatibility.
- Clear separation between durable business data and queue infrastructure.
- Suitable foundation for distributed workers.

### Negative Consequences

- Redis availability becomes important to asynchronous processing.
- Redis requires operational monitoring.
- Queue recovery behavior must be defined.

### Trade-offs

The architecture accepts Redis infrastructure complexity to provide reliable asynchronous processing.

## Implementation Requirements

The implementation must:

- Monitor Redis availability.
- Handle Redis connection failures.
- Configure appropriate persistence/recovery behavior.
- Prevent Redis from becoming the sole source of truth for critical business state.
- Keep durable business state in the primary database.
- Define queue recovery behavior.
- Secure Redis access.
- Never expose Redis credentials to application clients.

## Related Decisions

- ADR-004 — BullMQ
- ADR-008 — Deployment Strategy
- Reliability & Error Handling

## Supersedes

N/A

## Superseded By

N/A