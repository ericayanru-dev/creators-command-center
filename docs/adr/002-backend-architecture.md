# ADR-002 — Backend Architecture

## Status

Accepted / Final / Locked

## Date

2026-11-08

## Context

Creator Command Center requires a backend API capable of supporting:

- Authentication and server-managed sessions.
- Content management and creator-owned resources.
- Scheduling and publication lifecycle management.
- OAuth integrations and protected provider credentials.
- Platform adapters and external API integrations.
- Durable background execution coordinated through Trigger.dev.
- Media access through Cloudflare R2.
- PostgreSQL persistence, transactions, and reconciliation.
- Validation, authorization, observability, and operational diagnostics.

The backend must remain maintainable as the product grows. It must provide explicit separation between domain rules, application use cases, infrastructure integrations, and HTTP delivery without introducing unnecessary distributed-system complexity.

The approved frontend remains Next.js, React, and TypeScript. The backend decision is independent of the frontend language: the frontend communicates with the backend through versioned REST APIs and does not share backend implementation code.

The project has selected C# and ASP.NET Core for the backend. This ADR records the target architecture and supersedes previous Hono/TypeScript, Express, and NestJS backend proposals.

## Options

### Option 1 — Hono with TypeScript

Hono provides a lightweight TypeScript HTTP framework.

#### Advantages

- Small and flexible HTTP layer.
- Strong TypeScript ecosystem.
- Straightforward integration with JavaScript/TypeScript libraries.
- Familiarity from the earlier prototype and architecture work.

#### Disadvantages

- Would retain a TypeScript backend despite the project's decision to move backend development to C#.
- Requires project-defined architectural conventions and boundaries.
- Would duplicate language/runtime concerns across frontend and backend only if the project deliberately chose that arrangement; it is not the approved backend direction.

### Option 2 — NestJS with TypeScript

NestJS provides modules, dependency injection, controllers, providers, guards, pipes, and framework-level conventions.

#### Advantages

- Strong conventions and modular architecture.
- Built-in dependency injection.
- Structured application lifecycle.

#### Disadvantages

- Retains a TypeScript backend rather than the selected C#/.NET direction.
- Adds framework-specific abstractions and conventions.
- Does not align with the current backend technology decision.

### Option 3 — ASP.NET Core Web API with C#

ASP.NET Core provides the HTTP hosting, routing, middleware, dependency-injection, configuration, authentication, authorization, and API infrastructure for a C# backend.

#### Advantages

- Aligns with the approved C#/.NET backend direction.
- Provides a mature HTTP API and dependency-injection foundation.
- Supports explicit modular boundaries and layered architecture.
- Integrates with EF Core and Npgsql for PostgreSQL persistence.
- Supports automated testing through xUnit and ASP.NET Core integration-testing facilities.
- Provides built-in configuration, logging, health checks, authentication, and authorization capabilities.
- Keeps backend business logic independent from the Next.js frontend.

#### Disadvantages

- Requires C#/.NET implementation and operational knowledge.
- Requires explicit architectural discipline to prevent controllers, application services, and infrastructure concerns from becoming coupled.
- The team must maintain the .NET runtime, package dependencies, EF Core migrations, and deployment configuration.

## Decision

Creator Command Center will use **ASP.NET Core Web API with C#** as its backend.

The approved backend baseline is:

- **Backend language:** C#.
- **HTTP framework:** ASP.NET Core Web API.
- **Architecture:** Modular monolith with Domain, Application, Infrastructure, and API/Host boundaries.
- **Database:** PostgreSQL.
- **Data access and ORM:** Entity Framework Core with the Npgsql PostgreSQL provider.
- **Database migrations:** EF Core migrations are the sole migration authority for the C# backend.
- **API style:** Versioned REST APIs with OpenAPI documentation.
- **Validation:** API-boundary validation and Application-layer validation using approved .NET validation patterns.
- **Testing:** xUnit for unit tests and ASP.NET Core integration testing with `WebApplicationFactory` where appropriate.
- **Background execution:** Trigger.dev for the approved MVP1 execution workflows, integrated through an application-owned abstraction and Infrastructure implementation.
- **Object storage:** Cloudflare R2 through an Infrastructure adapter where required.

The backend remains a modular monolith for MVP1. This decision does not introduce microservices, Redis, BullMQ, Kafka, Kubernetes, or an always-on custom worker fleet.

The general request flow is:

```text
HTTP Request
    ↓
ASP.NET Core Middleware
    ↓
API Endpoint / Controller
    ↓
Application Use Case
    ↓
Domain Rules
    ↓
Infrastructure Interfaces / Implementations
    ↓
PostgreSQL / External Providers / Cloudflare R2 / Trigger.dev
```

Dependency direction must point inward. Domain and Application code must not depend on ASP.NET Core, EF Core, Npgsql, Trigger.dev SDK details, or provider-specific HTTP clients.

The Application layer defines provider-independent interfaces for infrastructure capabilities. Infrastructure supplies the implementations. In particular, the Application layer defines the execution-scheduling abstraction; the Infrastructure layer integrates with Trigger.dev using a verified supported integration mechanism. Do not assume an official .NET Trigger.dev SDK exists without verification.

PostgreSQL remains authoritative for Creator Command Center business state. Trigger.dev is execution infrastructure only. Publication and PublishingAttempt remain domain-owned records; Trigger.dev run identifiers are operational metadata and must not become business identifiers.

The frontend remains Next.js + React + TypeScript. Frontend TypeScript and frontend validation libraries are not replaced by this backend decision.

## Consequences

### Positive Consequences

- Establishes one approved C#/.NET backend direction.
- Separates backend implementation from frontend technology choices.
- Provides a clear modular-monolith structure.
- Supports PostgreSQL persistence through EF Core and Npgsql.
- Establishes one database migration authority for the backend.
- Supports testable application and domain logic.
- Provides a clear boundary around Trigger.dev, Cloudflare R2, and platform APIs.
- Avoids introducing unnecessary queue and distributed infrastructure.

### Negative Consequences

- Requires C#/.NET skills and consistent code conventions.
- Requires EF Core entity configuration and migration discipline.
- Requires explicit integration work between ASP.NET Core and Trigger.dev.
- Requires deployment environments to provide a compatible .NET runtime.
- Some TypeScript-specific backend libraries and assumptions must be replaced with appropriate .NET equivalents.

### Trade-offs

The project chooses the approved C#/.NET backend direction and explicit layered boundaries over retaining the earlier TypeScript backend framework. This introduces a distinct backend language and runtime while preserving the existing TypeScript frontend.

## Implementation Requirements

The backend must:

- Use C# and ASP.NET Core Web API.
- Preserve the modular-monolith architecture.
- Keep API endpoints/controllers thin.
- Put application workflows and use cases in the Application layer.
- Keep domain rules in the Domain layer.
- Keep EF Core, Npgsql, provider clients, R2 access, and Trigger.dev integration in Infrastructure.
- Define interfaces at the appropriate inner-layer boundaries.
- Use PostgreSQL as the authoritative business-state store.
- Use EF Core with Npgsql for PostgreSQL data access.
- Use EF Core migrations as the sole backend schema migration mechanism.
- Never introduce Prisma schema files or Prisma migrations into the target backend.
- Validate external input at API boundaries and enforce business invariants in the Application/Domain layers.
- Enforce authentication, authorization, and resource ownership on the server.
- Preserve server-managed sessions and secure HTTP-only cookies; do not introduce JWT merely because the backend framework changed.
- Keep OAuth provider tokens and secrets server-side.
- Use the existing platform adapter contract for social-platform integrations.
- Integrate Trigger.dev behind an Application-defined execution abstraction.
- Keep Trigger.dev task payloads minimal and reload trusted business data from PostgreSQL during execution.
- Use transactional outbox/reconciliation, version checks, idempotent claims, and bounded retry behavior for durable scheduling and execution.
- Never claim exactly-once external publishing; reconcile ambiguous external outcomes before retrying.
- Use xUnit and ASP.NET Core integration testing as the default backend test baseline.
- Avoid circular dependencies and infrastructure references from Domain/Application code.
- Avoid introducing Redis, BullMQ, Kafka, microservices, or Kubernetes as MVP1 requirements.

## Related Decisions

- ADR-001 — Authentication Strategy
- ADR-003 — Object Storage with Cloudflare R2
- ADR-006 — Platform Adapter Architecture
- ADR-007 — API Versioning
- ADR-008 — Deployment Strategy
- ADR-009 — Trigger.dev Execution Architecture

## Supersedes

- Previous Hono + TypeScript backend decision.
- Previous Express + TypeScript backend proposal.
- Previous NestJS backend proposal.

## Superseded By

N/A
