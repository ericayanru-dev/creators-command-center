
---

# `docs/adr/008-deployment-strategy.md`

```md
# ADR-008 — Deployment Strategy

## Status

Accepted

## Date

2026-08-26

## Context

Creators Command Center consists of multiple runtime responsibilities:

- Next.js frontend.
- Express API.
- Background workers.
- Redis.
- Database.
- Object storage.
- External platform integrations.

The deployment architecture must support independent scaling where necessary while keeping operational complexity appropriate for the MVP.

The system must also support:

- Environment isolation.
- Secret management.
- Health checks.
- Logging.
- Monitoring.
- Rollback.
- Background worker execution.

## Options

### Option 1 — Single Application Runtime

Run frontend, API, and workers together.

#### Advantages

- Simple initial deployment.
- Fewer services.

#### Disadvantages

- Poor isolation.
- Worker failures can affect API availability.
- Cannot scale workloads independently.
- Long-running workers may compete with HTTP workloads.

### Option 2 — Separate Frontend, API, and Worker Services

Deploy the frontend, Express API, and background workers as separate runtime responsibilities.

#### Advantages

- Independent scaling.
- Worker failures are isolated from HTTP traffic.
- Clear operational boundaries.
- Better fit for BullMQ architecture.

#### Disadvantages

- More deployment configuration.
- More services to monitor.
- Higher operational complexity.

### Option 3 — Fully Managed Serverless Architecture

Use serverless functions for most application responsibilities.

#### Advantages

- Reduced server management.
- Automatic scaling for suitable workloads.

#### Disadvantages

- Background processing can become more complicated.
- Long-running worker workloads may not fit naturally.
- Queue workers require separate runtime considerations.

## Decision

Creators Command Center will use a **separated deployment architecture**.

The major runtime responsibilities will be treated independently:

```text
                ┌──────────────┐
                │   Next.js    │
                │   Frontend   │
                └──────┬───────┘
                       │
                       ↓
                ┌──────────────┐
                │   Express    │
                │     API      │
                └──────┬───────┘
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
          Database   Redis      R2
                       │
                       ↓
                ┌──────────────┐
                │   Workers    │
                │   BullMQ     │
                └──────────────┘
```
# Deployment Architecture Baseline

The exact hosting providers may change without altering this logical architecture.

---

## Consequences

### Positive Consequences
- API and worker workloads are isolated  
- Workers can scale independently  
- Failures are easier to diagnose  
- Background processing fits naturally with BullMQ  
- Infrastructure responsibilities are clearer  

### Negative Consequences
- Multiple services must be deployed and monitored  
- Configuration management becomes more important  
- Deployment coordination requires discipline  

---

## Trade-offs

The project accepts **additional deployment complexity** to achieve reliable asynchronous processing and independent workload scaling.

---

## Implementation Requirements

Deployment infrastructure must provide:

- Separate frontend runtime  
- Express API runtime  
- Worker runtime  
- Secure environment variables  
- Environment isolation  
- Database connectivity  
- Redis connectivity  
- R2 connectivity  
- Health checks  
- Application logging  
- Worker monitoring  
- Queue monitoring  
- Deployment rollback capability  
- Secure secret management  

**Rules:**
- Production secrets must never be committed to source control  
- Workers must be independently restartable  
- API deployments must not silently terminate critical background processing without appropriate worker recovery behavior  

---

## Related Decisions
- ADR-002 — Backend Architecture  
- ADR-003 — Cloudflare R2  
- ADR-004 — BullMQ  
- ADR-005 — Redis  

---

## Supersedes
- N/A  

## Superseded By
- N/A  
