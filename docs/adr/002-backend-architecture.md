# ADR-002 — Backend Architecture

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center requires a backend API capable of supporting:

- Authentication.
- Content management.
- Scheduling.
- Publishing.
- OAuth integrations.
- Platform adapters.
- Background jobs.
- Media processing.
- Database persistence.
- External API integrations.

The backend must remain maintainable as the product grows.

The project already uses TypeScript and the development team has experience with Express and Next.js.

The architecture must provide clear separation of responsibilities without introducing unnecessary framework complexity.

## Options

### Option 1 — NestJS

NestJS provides strong architectural conventions, dependency injection, modules, controllers, providers, guards, pipes, and other framework-level abstractions.

#### Advantages

- Strong conventions.
- Built-in dependency injection.
- Modular architecture.
- Good support for large teams.
- Structured application lifecycle.

#### Disadvantages

- Additional framework abstraction.
- Requires learning and maintaining NestJS-specific conventions.
- Greater framework coupling.
- The team would need to learn a framework that is not currently part of its strongest experience.

### Option 2 — Express with Modular MVC / Layered Architecture

Express provides the HTTP framework while application architecture is established through explicit project conventions.

#### Advantages

- Existing team familiarity.
- Small and flexible HTTP layer.
- Excellent TypeScript ecosystem.
- Easy integration with existing libraries.
- Avoids unnecessary framework abstraction.
- Allows the architecture to evolve according to application needs.

#### Disadvantages

- Architectural conventions are not automatically enforced.
- Dependency injection must be introduced separately if needed.
- Developers can bypass layers unless project rules and code review prevent it.
- More architectural discipline is required.

### Option 3 — Fastify

Fastify provides a high-performance HTTP framework with strong plugin architecture.

#### Advantages

- High performance.
- Good TypeScript support.
- Plugin-based architecture.
- Strong schema-oriented ecosystem.

#### Disadvantages

- Introduces another framework to the project.
- Existing Express familiarity would not transfer completely.
- The performance advantage is not currently a primary product constraint.

## Decision

Creators Command Center will use:

**Express + TypeScript with a modular MVC/layered architecture.**

Express will provide the HTTP server and routing foundation.

The application will organize functionality by domain/module rather than creating a single global collection of controllers and services.

The architecture will generally follow:

```text
Request
   ↓
Middleware
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository / Data Access
   ↓
Database / External Infrastructure 
```

## Consequences

### Positive Consequences
- Uses technologies the team already understands  
- Reduces unnecessary framework learning  
- Keeps the HTTP layer lightweight  
- Provides strong separation of concerns  
- Supports modular growth  
- Works naturally with Next.js  
- Allows libraries to be adopted independently  

### Negative Consequences
- Architectural discipline must be maintained manually  
- Express does not enforce module boundaries  
- Code review and testing must prevent architectural violations  
- Additional libraries may be required for capabilities such as dependency injection  

---

## Trade-offs

The project chooses **flexibility and team productivity** over the stronger framework-level conventions provided by NestJS.

The architecture must compensate through:
- Clear module boundaries  
- Coding standards  
- TypeScript usage  
- Testing discipline  
- Code review practices  
- Dependency rules  
- Documentation  

---

## Implementation Requirements

The backend must:
- Use TypeScript  
- Keep controllers thin  
- Keep business logic in services  
- Keep database access out of controllers  
- Validate input at API boundaries  
- Use centralized error handling  
- Use centralized configuration  
- Isolate infrastructure dependencies  
- Use adapters for external platforms  
- Avoid circular dependencies  
- Avoid generic utils as a dumping ground for business logic  
- Keep modules independently understandable  

---

## Related Decisions
- ADR-004 — BullMQ  
- ADR-005 — Redis  
- ADR-006 — Platform Adapter Architecture  
- ADR-007 — API Versioning  
- ADR-008 — Deployment Strategy  

---

## Supersedes
- Any previous proposal to use NestJS as the backend framework  

## Superseded By
- N/A  
