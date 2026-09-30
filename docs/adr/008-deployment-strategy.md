# ADR-008 --- Deployment Strategy

## Status

Accepted

## Date

2026-09-08

## Context

Creator Command Center consists of multiple runtime responsibilities:

-   Next.js frontend.
-   Hono API.
-   PostgreSQL database.
-   Cloudflare R2 for temporary/required media storage.
-   Trigger.dev Tasks / Runs for background execution.
-   External platform integrations.

The deployment architecture must support independent scaling where
necessary while keeping operational complexity appropriate for the MVP.

The system must also support:

-   Environment isolation.
-   Secret management.
-   Health checks.
-   Logging.
-   Monitoring.
-   Rollback.
-   Durable background execution through Trigger.dev.

## Options

### Option 1 --- Single Application Runtime

Run frontend and API together and execute background work inside the
same application runtime.

#### Advantages

-   Simple initial deployment.
-   Fewer application runtimes.

#### Disadvantages

-   Background execution can compete with HTTP workloads.
-   Failure isolation is weaker.
-   Long-running execution should not depend on an open API process.

### Option 2 --- Separated Frontend, API, and Managed Execution

Deploy the frontend and API as application runtimes, while Trigger.dev
provides the background execution runtime for Trigger.dev Tasks / Runs.

#### Advantages

-   API and background execution are isolated.
-   Trigger.dev provides durable execution, retries, scheduling,
    concurrency controls, and observability.
-   API capacity can scale independently from background execution.
-   No always-on worker fleet is required for MVP1.
-   Fits the accepted ADR-009 execution architecture.

#### Disadvantages

-   Requires deployment configuration for application code and
    Trigger.dev task code.
-   Adds an external execution dependency.
-   Trigger.dev usage, concurrency, failures, and cost must be
    monitored.

### Option 3 --- Fully Self-Hosted Execution Infrastructure

Self-host the application and Trigger.dev execution infrastructure.

#### Advantages

-   Greater infrastructure control.
-   Potentially useful when workload, compliance, or economics justify
    operational ownership.

#### Disadvantages

-   Higher operational burden.
-   More infrastructure to maintain.
-   Not required for the initial MVP1 deployment.

## Decision

Creator Command Center will use a **separated application and execution
architecture**.

The major runtime responsibilities are:

``` text
                    ┌──────────────────┐
                    │     Next.js      │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                             ↓
                    ┌──────────────────┐
                    │    Hono API      │
                    │   Application    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ↓              ↓              ↓
        PostgreSQL          R2       Platform APIs
              │
              │
              └──── authoritative business state
                             │
                             ↓
                    ┌──────────────────┐
                    │   Trigger.dev    │
                    │   Task / Run     │
                    └────────┬─────────┘
                             │
                             ↓
                    ┌──────────────────┐
                    │ Publishing /     │
                    │ Background Task  │
                    └──────────────────┘
```

PostgreSQL remains the authoritative source of business state.

Trigger.dev is execution infrastructure, not business-state storage.

Publication scheduling state remains owned by `Publication`. A
scheduling request persists authoritative state in PostgreSQL first,
then creates or reconciles the corresponding Trigger.dev scheduled
execution.

There is no standalone MVP1 worker service, BullMQ worker runtime, or
Redis queue/coordination layer.

### Deployment Architecture Baseline

The exact hosting providers may change without altering this logical
architecture.

Application and execution responsibilities may be deployed
independently:

-   Next.js frontend runtime.
-   Hono API runtime.
-   Trigger.dev Task / Run execution environment.
-   PostgreSQL database.
-   Cloudflare R2 temporary/required media storage.

The architecture does not require permanent creator media storage.

## Consequences

### Positive Consequences

-   API and background execution are isolated.
-   Trigger.dev provides durable execution capabilities without an
    always-on worker fleet.
-   Background execution can scale independently from HTTP traffic.
-   Infrastructure is smaller than the previous BullMQ + Redis worker
    architecture.
-   PostgreSQL remains the single authoritative business-state source.
-   Execution failures can be reconciled without replacing domain state
    with execution-provider state.

### Negative Consequences

-   Multiple deployment responsibilities must be configured and
    monitored.
-   Trigger.dev becomes an operational dependency for asynchronous
    execution.
-   Configuration and secret management require discipline.
-   Deployment coordination must account for Trigger.dev Task changes as
    well as application changes.

## Trade-offs

The project accepts limited deployment complexity in exchange for
reliable asynchronous execution, failure isolation, and independent
scaling.

The project deliberately avoids introducing additional always-on
infrastructure until workload justifies it.

## Implementation Requirements

Deployment infrastructure must provide:

-   Separate Next.js frontend runtime.
-   Hono API runtime.
-   Trigger.dev Task / Run execution.
-   Secure environment variables and secrets.
-   Environment isolation.
-   PostgreSQL connectivity.
-   R2 connectivity where temporary media transfer requires it.
-   Health checks for application dependencies and execution
    integration.
-   Application logging.
-   Trigger.dev execution monitoring.
-   Deployment rollback capability.
-   Secure secret management.
-   Resource usage and execution-cost monitoring.

### Trigger.dev Deployment Requirements

-   Trigger.dev Task code must be version-controlled and deployed as
    part of the application delivery process.
-   Trigger.dev credentials must remain server-side.
-   Trigger.dev Task / Run identifiers are operational metadata and must
    not replace PostgreSQL domain identifiers.
-   Changes to task behavior must preserve idempotency and
    stale-execution protections.
-   Production operations must monitor Trigger.dev usage, concurrency,
    failures, latency, and cost.
-   Trigger.dev environment configuration must remain separated between
    development, staging, and production.
-   Failed or missing execution creation must be recoverable through
    reconciliation using authoritative PostgreSQL state.

### Scheduling Requirement

Publication scheduling is authoritative in PostgreSQL.

The deployment architecture must support this sequence:

``` text
Schedule Request
      ↓
Hono API
      ↓
PostgreSQL Transaction
      ↓
Publication Scheduling State Persisted
      ↓
Create / Reconcile Trigger.dev Scheduled Execution
      ↓
Trigger.dev Task / Run
      ↓
Publishing Service
```

Trigger.dev scheduling state is operational execution state only.

If a deployment or provider failure occurs between the PostgreSQL commit
and Trigger.dev execution creation, reconciliation must detect and
safely recreate the missing execution without creating duplicate
external publication side effects.

### Cloudflare Cron Clarification

Cloudflare Cron, if retained, is limited to infrastructure-level
maintenance or reconciliation triggers.

It is **not** the authoritative scheduling mechanism for creator
Publications and does not replace Trigger.dev scheduled execution.

### Security Rules

-   Production secrets must never be committed to source control.
-   Provider credentials and OAuth tokens must remain server-side.
-   Trigger.dev credentials must never be exposed to the browser.
-   R2 credentials must never be exposed to the browser.
-   Deployment logs must not expose secrets or provider tokens.
-   State-changing browser requests must follow the API's CSRF
    protection contract.

### Operational Rules

-   API deployments must not assume that an open API process is
    responsible for background execution.
-   Trigger.dev Task / Run execution must remain independently
    recoverable.
-   Database migrations must be backward-compatible enough to support
    safe deployment and rollback procedures.
-   Application and Trigger.dev deployments must be observable.
-   Non-production resources should not remain unnecessarily active when
    they provide no development or testing value.

## Related Decisions

-   ADR-001 --- Authentication Strategy
-   ADR-002 --- Backend Architecture
-   ADR-003 --- Cloudflare R2
-   ADR-006 --- Platform Adapter Architecture
-   ADR-007 --- API Versioning
-   ADR-009 --- Trigger.dev Execution Architecture

## Supersedes

This revision supersedes the previous deployment strategy where it
conflicts with:

-   ADR-004 --- BullMQ
-   ADR-005 --- Redis

Those decisions remain historical for traceability but are not
implementation-authoritative for MVP1.

## Superseded By

N/A

## Final Decision

**ACCEPTED:** Creator Command Center will deploy the Next.js frontend,
Hono API, PostgreSQL database, temporary/required R2 media storage, and
Trigger.dev Task / Run execution as distinct runtime responsibilities.
PostgreSQL remains authoritative for business state, while Trigger.dev
provides background execution. No BullMQ worker runtime or Redis
queue/coordination layer is part of the selected MVP1 deployment
architecture.
