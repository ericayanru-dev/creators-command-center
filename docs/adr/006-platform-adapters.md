# ADR-006 — Platform Adapter Architecture

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center integrates with multiple external creator platforms, including:

- YouTube.
- Instagram.
- TikTok.
- Additional platforms that may be added later.

Each platform exposes different APIs, authentication mechanisms, media requirements, publishing workflows, error formats, rate limits, and capabilities.

Application business logic must not become tightly coupled to provider-specific API implementations.

## Options

### Option 1 — Direct Platform API Calls from Business Logic

Services directly call YouTube, Instagram, TikTok, and other provider APIs.

#### Disadvantages

- Strong provider coupling.
- Difficult testing.
- Provider-specific logic spreads throughout the codebase.
- Adding platforms becomes increasingly expensive.
- Error handling becomes inconsistent.

### Option 2 — Shared Platform Adapter Interface

Define a common internal platform interface and implement each provider behind an adapter.

#### Advantages

- Provider isolation.
- Consistent internal contracts.
- Easier testing.
- Easier addition of new platforms.
- Provider-specific errors can be normalized.
- Business logic remains platform-agnostic where possible.

#### Disadvantages

- Requires careful interface design.
- Not every platform capability maps perfectly to a common interface.
- Adapter abstractions must not become artificially generic.

## Decision

Creators Command Center will use a **platform adapter architecture**.

Each supported platform will have a dedicated adapter responsible for provider-specific behavior.

Conceptually:

```text
Publishing Service
       ↓
Platform Adapter Interface
       ↓
 ┌──────────┬─────────────┬──────────┐
 ↓          ↓             ↓
YouTube   Instagram      TikTok
Adapter   Adapter        Adapter
```

## Consequences

### Positive Consequences
- Platform-specific complexity is isolated  
- Adding platforms becomes more manageable  
- Provider errors can be normalized  
- Testing can use mock adapters  
- Business logic remains cleaner  

### Negative Consequences
- Adapter interfaces require maintenance  
- Some provider-specific capabilities may require explicit capability handling  
- Over-abstraction could hide important platform differences  

---

## Trade-offs

The project prioritizes **isolation and maintainability** while allowing adapters to expose platform-specific capabilities where necessary.

The architecture must not force fundamentally different platform capabilities into an incorrect generic abstraction.

---

## Implementation Requirements

Each adapter should be responsible for provider-specific:

- OAuth interaction  
- Token refresh  
- API requests  
- Request formatting  
- Response parsing  
- Error classification  
- Rate-limit handling  
- Provider-specific publishing behavior  
- Provider-specific status handling  

**Rules:**
- Adapters must not expose raw provider responses to unrelated application layers  
- Provider credentials must remain server-side  
- Publishing operations must be idempotent where the provider supports identifiers or operation tracking  

---

## Related Decisions
- ADR-001 — Authentication Strategy  
- ADR-002 — Backend Architecture  
- ADR-004 — BullMQ  
- Reliability & Error Handling  
- Security Document Baseline  

---

## Supersedes
- N/A  

## Superseded By
- N/A  
