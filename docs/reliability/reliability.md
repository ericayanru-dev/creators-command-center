# Reliability & Error Handling

## Purpose

This document defines how Creators Command Center handles failures across the frontend, backend, database, queues, workers, OAuth integrations, external platform APIs, media processing, and publishing workflows.

Reliability is a product requirement, not merely an implementation concern.

The system must assume that failures will occur and must provide predictable behavior, safe recovery, useful diagnostics, and clear user feedback.

The system must never assume that an external platform, network connection, queue, worker, database, or OAuth token is permanently reliable.

---

## Reliability Principles

The platform follows these principles:

1. **Fail safely.**
2. **Never silently lose confirmed user work because of a transient failure.**
3. **Never perform a dangerous side effect twice because of an automatic retry.**
4. **Preserve partial success.**
5. **Make retry behavior explicit and bounded.**
6. **Make side-effecting operations idempotent where retries are possible.**
7. **Separate user-facing errors from internal diagnostics.**
8. **Never expose sensitive infrastructure, authentication, or provider information to users.**
9. **Record enough information to diagnose failures.**
10. **Prefer recoverable states over destructive failure states.**
11. **Treat external provider responses as untrusted input.**
12. **Do not report success until the system has sufficient evidence that the operation succeeded.**
13. **Do not retry operations when the outcome is ambiguous unless the operation is safely idempotent.**
14. **Every recoverable failure must have a defined recovery path.**

---

# Error Categories

## Validation Errors

Validation errors occur when incoming data does not satisfy the expected schema, format, or business rules.

### Examples

- Missing required fields
- Invalid content ID
- Invalid platform
- Invalid schedule time
- Invalid media type
- Unsupported file size
- Invalid pagination parameters
- Invalid OAuth callback data
- Invalid resource identifiers
- Unsupported operation parameters

### Handling

- Validate requests at the API boundary.
- Use the project's validation system consistently.
- Reject invalid input before database writes or external API calls.
- Return a structured, client-safe error.
- Provide actionable validation feedback where appropriate.
- Do not expose internal validation implementation details.

### Retry

**Retry: No.**

Validation errors are deterministic and require corrected input.

---

## Authentication Errors

Authentication errors occur when the system cannot establish a valid authenticated session or identity.

### Examples

- Missing session
- Expired session
- Invalid session
- Revoked session
- Invalid authentication credentials
- Invalid authentication token

### Handling

- Reject the request.
- Do not execute protected business logic.
- Return the appropriate authentication error.
- The frontend must transition to the appropriate authentication or re-authentication state.
- Do not reveal sensitive authentication details.

### Retry

**Retry: No automatic retry.**

The user must authenticate again when required.

---

## Authorization Errors

Authorization errors occur when an authenticated user attempts to access or modify a resource they do not own or are not permitted to access.

### Examples

- Accessing another creator's content
- Modifying another user's schedule
- Accessing another user's connected account
- Accessing another user's publishing history
- Attempting an administrative operation without permission

### Handling

- Perform authorization on the server.
- Verify ownership at every protected resource boundary.
- Never trust frontend ownership claims.
- Prevent IDOR vulnerabilities.
- Enforce resource isolation.
- Do not reveal whether an unauthorized resource exists when doing so would leak information.
- Do not allow frontend-only authorization decisions.

### Retry

**Retry: No.**

Authorization failures are not transient failures.

---

## Database Errors

Database errors occur when persistence operations cannot be completed successfully.

### Examples

- Connection failure
- Query timeout
- Transaction failure
- Constraint violation
- Database unavailable
- Deadlock
- Migration/schema mismatch
- Connection pool exhaustion

### Handling

- Log the internal database error with sufficient diagnostic context.
- Return a generic client-safe error.
- Do not expose SQL, credentials, stack traces, or internal schema details.
- Use database transactions for operations that must succeed atomically.
- Preserve existing state when an operation cannot be completed.
- Classify database failures as transient or permanent where possible.

### Retry

Retry only when the failure is known to be transient.

Potentially safe candidates include:

- Temporary connection failure
- Transient network failure
- Certain deadlocks
- Certain infrastructure timeouts

Do not automatically retry:

- Validation failures
- Constraint violations
- Invalid queries
- Business-rule failures
- Schema errors
- Migration failures

---

## Queue Errors

Queue errors occur when asynchronous work cannot be added to, retrieved from, processed by, or acknowledged by the queue system.

### Examples

- Redis unavailable
- Queue connection failure
- Job enqueue failure
- Job acknowledgement failure
- Queue timeout
- Queue capacity/resource failure

### Handling

- Do not report successful scheduling unless the job has actually been persisted/enqueued.
- Preserve the underlying content state.
- Record the queue failure.
- Retry transient queue operations where safe.
- Prevent duplicate jobs through idempotency or deterministic job identifiers.
- Alert operators when queue failures exceed defined thresholds.

### Retry

Transient queue failures may be retried using bounded exponential backoff.

Queue operations must not create duplicate jobs.

---

## Worker Errors

Worker errors occur while asynchronous jobs are being processed.

### Examples

- Worker crash
- Unexpected exception
- Process termination
- Invalid job payload
- Media processing failure
- Database failure during processing
- Platform API failure
- Worker timeout

### Handling

Workers must:

- Catch expected failures.
- Record job state.
- Record useful diagnostics.
- Retry safe transient failures.
- Avoid infinite retries.
- Apply maximum retry limits.
- Move permanently failed jobs to a failed or dead-letter state where appropriate.
- Preserve enough state for manual or automatic recovery.
- Prevent duplicate side effects.

A worker crash must not cause confirmed work to disappear.

---

## Platform API Errors

Platform API errors occur when communicating with external services such as YouTube, Instagram, TikTok, or other supported platforms.

### Error Classes

Platform errors should be classified as:

- Authentication failure
- Authorization failure
- Rate limit
- Validation failure
- Temporary server failure
- Network failure
- Timeout
- Unsupported operation
- Content policy rejection
- Provider outage
- Unknown provider error

### Handling

The platform adapter must translate provider-specific errors into internal error categories.

Provider-specific response formats must not leak throughout the application.

The application should depend on a normalized internal error model.

Provider responses must be treated as untrusted external input.

### Retry

Retry behavior depends on the error class.

Transient provider failures may be retried.

Permanent validation, authorization, or policy failures must not be automatically retried.

Rate-limit responses must respect provider-specific limits and `Retry-After` information where available.

---

## OAuth Errors

OAuth failures must be treated separately from generic platform failures.

### Examples

- Expired access token
- Invalid refresh token
- Revoked authorization
- OAuth state mismatch
- PKCE failure
- Provider authorization failure
- Token refresh failure

### Handling

- Never expose provider tokens to the frontend.
- Refresh access tokens when safely possible.
- Mark the connected account as requiring reauthorization when refresh fails permanently.
- Preserve user content and publishing state.
- Clearly communicate when user action is required.
- Do not silently discard publishing intent because authentication has expired.

### Retry

Token refresh may be retried only when the failure is transient.

Permanent authorization failures must not be retried indefinitely.

OAuth state validation and PKCE failures must not be automatically retried as successful authentication attempts.

---

## Timeout Errors

Timeouts occur when an operation does not complete within its permitted execution period.

### Examples

- Database timeout
- Queue timeout
- Worker timeout
- Platform API timeout
- Media processing timeout
- Network timeout

### Handling

Timeouts must be treated as potentially ambiguous outcomes.

The system must determine whether the operation may have completed before retrying.

For side-effecting operations:

- Use idempotency.
- Use provider-supported identifiers where available.
- Query operation status where possible.
- Avoid blindly repeating an external publishing operation.

### Retry

Retry only when the operation is safe to repeat or the system can establish that the original operation did not complete.

---

# Retry Strategy

Retries exist to recover from transient failures.

Retries must never be used as a substitute for correct error classification, idempotency, or state management.

## General Retry Rules

- Retries must be bounded.
- Retries must use exponential backoff.
- Retries should include jitter where appropriate.
- Permanent failures must stop retrying.
- Side-effecting operations must be idempotent before automatic retries are enabled.
- Retry state must be observable.
- Retry attempts must be recorded.
- Retry exhaustion must produce a defined terminal state.
- Authentication and authorization failures must not enter infinite retry loops.
- Provider rate limits must follow provider-specific instructions.
- A retry must not overwrite a previously confirmed successful state.

---

## Recommended Retry Policy

| Error Type | Retry | Maximum Attempts | Strategy |
|---|---|---:|---|
| Validation | No | 0 | User correction |
| Authentication | No | 0 | Re-authentication |
| Authorization | No | 0 | Permission/correction |
| Database transient failure | Yes | 3 | Exponential backoff |
| Database constraint failure | No | 0 | Correct application logic |
| Queue transient failure | Yes | 3 | Exponential backoff |
| Worker transient failure | Yes | 3 | Exponential backoff |
| Platform rate limit | Yes | Provider-defined | Respect provider limits |
| Platform 5xx | Yes | 3 | Exponential backoff |
| Platform validation error | No | 0 | User correction |
| OAuth token expiry | Conditional | 1 refresh attempt | Refresh token |
| OAuth revocation | No | 0 | Reauthorization |
| Network timeout | Conditional | 3 | Exponential backoff |
| Unknown provider error | Conditional | 1–3 | Bounded retry |

These values are the baseline policy. Individual providers or operations may define stricter limits.

---

## Exponential Backoff

Retry delays should increase after each failed attempt.

Example:

- Attempt 1 → immediate
- Attempt 2 → short delay
- Attempt 3 → longer delay
- Final failure → mark operation as failed

Production retry values should be configurable rather than duplicated throughout application code.

Jitter should be applied where appropriate to prevent multiple workers from retrying simultaneously.

---

## Idempotency

Idempotency prevents retries from producing duplicate side effects.

Idempotency is required for operations such as:

- Publishing content
- Creating platform posts
- Scheduling jobs
- Creating records
- Processing webhook events
- Processing external callbacks
- Retrying failed publishing operations

A retry must either:

1. Return the result of the original operation; or
2. Safely determine that the operation has already completed.

The system must define an idempotency key or deterministic operation identifier for side-effecting operations where required.

---

# Publishing Reliability

Publishing is a distributed operation involving:

- Frontend
- API
- Database
- Queue
- Worker
- OAuth credentials
- Platform adapter
- External platform
- Network

Publishing must therefore be modeled as a stateful operation rather than treated as a single request.

## Publishing States

The publishing domain should support states such as:

- `PENDING`
- `QUEUED`
- `PROCESSING`
- `PUBLISHED`
- `FAILED`
- `RETRYING`
- `REQUIRES_REAUTHORIZATION`

The exact state model must follow the approved domain model.

Each platform publication should maintain its own operation state when publishing to multiple platforms.

---

## Partial Publishing

Publishing to multiple platforms must preserve partial success.

Example:

A creator publishes content to:

- YouTube
- Instagram
- TikTok

If YouTube succeeds while Instagram and TikTok fail:

- YouTube → Published
- Instagram → Failed
- TikTok → Failed

The system must not report the entire operation as simply failed.

The creator must be able to retry only the failed platform operations.

Already successful publications must not be duplicated.

---

## Partial Success Rules

The system must:

- Preserve successful operations.
- Preserve failed operations.
- Track platform-specific status.
- Store meaningful provider results where appropriate.
- Allow retry of failed operations.
- Prevent successful operations from being unintentionally repeated.
- Show the creator which platforms succeeded and which failed.
- Preserve the original publishing intent.
- Allow recovery without recreating the entire publishing operation.

Partial success is a valid system state.

---

# Queue and Worker Recovery

## Worker Crash

If a worker crashes while processing a job:

1. The queue must detect the unfinished job where supported.
2. The job must become eligible for recovery according to queue configuration.
3. The operation must be safe to retry.
4. Duplicate side effects must be prevented through idempotency.
5. The final operation state must be persisted.
6. Retry limits must still apply.

A worker crash must not silently lose the user's work.

---

## Stuck Jobs

Jobs that remain in processing beyond their expected execution period must be detectable.

The system should support:

- Job timeout detection
- Retry
- Failure classification
- Operational monitoring
- Recovery
- Manual intervention where required
- Terminal failure state

Stuck jobs must not remain indefinitely in a misleading `PROCESSING` state.

---

# External Platform Outages

When a platform is unavailable:

- Do not repeatedly hammer the provider.
- Respect provider rate limits.
- Respect `Retry-After` information where available.
- Use bounded retries.
- Preserve publishing intent.
- Mark operations as retryable when appropriate.
- Inform the creator when waiting is required.
- Resume automatically where safe.
- Prevent successful operations from being repeated.

A platform outage must not cause loss of scheduled content or publishing intent.

---

# User Experience Requirements

Every asynchronous operation must have a clear user-facing lifecycle.

## Loading State

The frontend must communicate that work is currently in progress.

Examples:

- Publishing...
- Connecting...
- Saving...
- Processing...
- Scheduling...

The UI must prevent misleading duplicate actions where appropriate.

---

## Success State

The frontend must communicate successful completion.

Examples:

- Content published successfully.
- Account connected successfully.
- Content scheduled successfully.

Success must only be displayed when the backend has sufficient confirmation of completion.

---

## Error State

The frontend must clearly communicate that the operation failed.

The message should explain:

- What failed.
- Whether the failure is temporary.
- Whether the user needs to act.
- Whether retry is available.

The frontend must not expose raw backend, database, provider, or infrastructure errors.

---

## Recovery Path

Every recoverable error must provide an appropriate recovery action.

Examples:

- Retry
- Reconnect account
- Edit content
- Reschedule
- Try again later
- Contact support

The frontend must not leave the creator in a dead-end state.

---

# Error Response Standards

API errors must use a consistent structure.

Example:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested content could not be found.",
    "requestId": "..."
  }
}

# Error Response Standards

The response must:

- Use a stable machine-readable error code  
- Provide a safe human-readable message  
- Include a request/correlation identifier where appropriate  
- Never expose stack traces  
- Never expose database internals  
- Never expose access tokens or credentials  
- Never expose provider secrets  
- Never expose unnecessary infrastructure details  

Frontend behavior must be based on the error code rather than parsing the human-readable message.

---

## Error Codes

Errors must use stable, machine-readable codes.

**Baseline error vocabulary includes:**

- VALIDATION_ERROR  
- UNAUTHORIZED  
- FORBIDDEN  
- RESOURCE_NOT_FOUND  
- DATABASE_ERROR  
- QUEUE_UNAVAILABLE  
- JOB_FAILED  
- PLATFORM_API_ERROR  
- PLATFORM_RATE_LIMITED  
- OAUTH_REAUTH_REQUIRED  
- PUBLISH_FAILED  
- PUBLISH_PARTIAL_SUCCESS  
- REQUEST_TIMEOUT  
- INTERNAL_ERROR  

Additional domain-specific codes may be introduced when necessary, but codes must remain:

- Stable  
- Machine-readable  
- Documented  
- Consistent across the API  

⚠️ Human-readable error messages may change without requiring frontend logic changes.

---

## Logging

Internal errors must contain enough information to diagnose failures.

**Useful structured fields include:**

- Request ID  
- User ID (where appropriate)  
- Resource ID  
- Job ID  
- Platform  
- Error category  
- Error code  
- Retry attempt  
- Timestamp  
- Operation  
- Provider response classification  
- Environment  
- Service/component  

**Sensitive information must never be logged.**

**Do Not Log:**
- Access tokens  
- Refresh tokens  
- Client secrets  
- Passwords  
- Session secrets  
- Private OAuth credentials  
- Authorization headers containing credentials  
- Full sensitive provider responses  
- Sensitive personal information not required for diagnosis  

Logs should contain enough information to diagnose the failure without exposing credentials or secrets.

---

## Request Correlation

Requests and asynchronous jobs must be traceable through correlation identifiers.

A request ID should allow operators to connect:

- Frontend request  
- API request  
- Database operation  
- Queue job  
- Worker execution  
- Platform API operation  

This allows failures to be diagnosed across distributed components.  
Correlation identifiers should be propagated across asynchronous boundaries where appropriate.

---

## Monitoring & Alerting

Production monitoring should identify:

- Increased API error rates  
- Queue failures  
- Worker crashes  
- Repeated job failures  
- Platform outages  
- OAuth failures  
- Database failures  
- Increasing retry counts  
- Publishing failures  
- Processing timeouts  
- Health-check failures  
- Unusual latency increases  

Alerts should focus on actionable conditions rather than individual expected user errors.  
Monitoring must distinguish between:

- Expected user errors  
- Recoverable infrastructure failures  
- Persistent application failures  
- External provider failures  

---

## Backend Responsibilities

Backend implementation must:

- Classify errors  
- Validate all inputs  
- Enforce authorization  
- Use transactions where required  
- Implement bounded retries  
- Implement idempotency for side-effecting operations  
- Persist meaningful operation states  
- Preserve partial success  
- Normalize provider errors  
- Produce safe API responses  
- Generate request/correlation identifiers  
- Log diagnostic information without secrets  
- Prevent duplicate side effects  
- Preserve publishing intent  
- Distinguish transient failures from permanent failures  
- Expose stable error codes  

---

## Frontend Responsibilities

Frontend implementation must:

- Represent loading states  
- Represent success states  
- Represent failure states  
- Provide recovery actions  
- Avoid exposing internal errors  
- Display actionable messages  
- Handle expired sessions  
- Handle OAuth reauthorization  
- Display partial publishing results  
- Allow safe retries  
- Prevent duplicate user actions where appropriate  
- Use stable API error codes for application behavior  
- Never assume an API request succeeded merely because the request was sent  
- Never expose sensitive tokens or credentials  
- Never depend on parsing human-readable error messages  

---

## DevOps Responsibilities

DevOps/infrastructure must provide:

- Database availability monitoring  
- Redis availability monitoring  
- Queue monitoring  
- Worker health monitoring  
- Application health checks  
- Error-rate monitoring  
- Logging infrastructure  
- Alerting  
- Timeout configuration  
- Retry configuration  
- Secret management  
- Environment isolation  
- Deployment rollback capability  
- Infrastructure health monitoring  
- Production observability  

Infrastructure failures must be observable and recoverable.

---

# Reliability Testing

## API Tests
- Validation failure  
- Authentication failure  
- Authorization failure  
- Missing resource  
- Database failure  
- Timeout  
- Duplicate request  
- Idempotent retry  
- Stable error code response  
- Safe error response  
- Request ID generation  

## Queue Tests
- Queue unavailable  
- Job enqueue failure  
- Duplicate job submission  
- Job timeout  
- Job retry  
- Job exhaustion  
- Redis failure  
- Queue recovery  

## Worker Tests
- Worker crash  
- Unexpected exception  
- Retry behavior  
- Maximum retry limit  
- Duplicate processing  
- Recovery after restart  
- Stuck job handling  
- Failed job persistence  

## Platform Tests
- Platform success  
- Platform 4xx  
- Platform 5xx  
- Platform timeout  
- Platform rate limiting  
- Expired OAuth token  
- Revoked OAuth token  
- OAuth reauthorization  
- Platform outage  
- Ambiguous provider response  

## Publishing Tests
- Single-platform success  
- Single-platform failure  
- Multi-platform success  
- Partial publishing  
- Retry failed platform  
- Duplicate publish prevention  
- Worker crash during publishing  
- Timeout during publishing  
- Provider response ambiguity  
- Recovery after platform outage  
- Preservation of successful platform results  

---

# Reliability Invariants

The following must always remain true:

- Confirmed user work must not be silently lost  
- Failed operations must have a recoverable or terminal state  
- Automatic retries must be bounded  
- Side-effecting retries must be idempotent  
- Successful platform publications must not be duplicated by retrying failed platforms  
- Partial publishing results must be preserved  
- Authentication and authorization failures must not be retried indefinitely  
- Sensitive information must not appear in logs or client-facing errors  
- External platform failures must not corrupt internal application state  
- Users must always have a clear recovery path when recovery is possible  
- The frontend must not report unconfirmed operations as successful  
- Permanent failures must eventually reach a terminal state  
- Retry exhaustion must be observable  
- Provider-specific failures must be normalized into internal error categories  
- Correlation identifiers must allow failures to be traced across asynchronous components  

---

# Implementation Tasks

## Backend Work
- Implement centralized error classification  
- Implement consistent API error responses  
- Implement stable API error codes  
- Implement retry policies  
- Implement exponential backoff  
- Implement idempotency mechanisms  
- Implement publishing state management  
- Implement partial success handling  
- Implement job failure handling  
- Implement request correlation  
- Implement structured error logging  
- Implement provider error normalization  
- Implement safe timeout handling  
- Implement retry exhaustion handling  
- Implement duplicate side-effect prevention  

## Frontend Work
- Implement loading states  
- Implement success states  
- Implement error states  
- Implement recovery actions  
- Implement retry UI  
- Implement session-expiration handling  
- Implement OAuth reauthorization states  
- Implement partial publishing UI  
- Prevent duplicate user actions  
- Handle stable API error codes  
- Prevent raw internal errors from reaching users  
- Ensure sensitive tokens are never exposed  
- Ensure successful states are based on confirmed backend results  

## DevOps Work
- Configure monitoring  
- Configure application health checks  
- Configure queue monitoring  
- Configure worker monitoring  
- Configure database monitoring  
- Configure centralized logging  
- Configure alerts  
- Configure deployment rollback procedures  
- Configure timeout infrastructure settings  
- Configure retry infrastructure settings  
- Configure environment isolation  
- Configure secret management  
- Configure production observability  
- Configure mechanisms for detecting stuck and failed jobs  

---

## Acceptance Criteria

The project’s reliability baseline is considered **complete** when the following are verified:

- Error categories are implemented and enforced.  
- Retry behavior is explicitly defined and bounded.  
- Exponential backoff is implemented for transient failures.  
- Idempotency is enforced for side-effecting operations.  
- Partial publishing success is preserved across platforms.  
- Worker failures are recoverable with state preserved.  
- Queue failures are observable and recoverable.  
- Platform outages do not silently lose publishing intent.  
- OAuth failures have defined recovery behavior.  
- Frontend loading, error, success, and recovery states are implemented.  
- API errors use stable, machine-readable error codes.  
- Sensitive information is excluded from logs and client responses.  
- Request/job correlation identifiers are supported across components.  
- Provider errors are normalized into internal error categories.  
- Duplicate side effects are prevented during retries.  
- Retry exhaustion results in a defined terminal state.  
- Reliability tests cover all documented failure scenarios.  
- Successful platform publications are preserved when other platforms fail.  
- The frontend does not report unconfirmed operations as successful.  
- Infrastructure failures are observable and recoverable.  
- Recoverable failures provide defined recovery paths.  

---

## Non-Negotiable Requirements

- **Confirmed user work must never be silently lost.**  
- **Automatic retries must be bounded and observable.**  
- **Side-effecting retries must be idempotent.**  
- **Authentication and authorization failures must not be retried indefinitely.**  
- **Sensitive information must never appear in logs or client-facing errors.**  
- **External platform failures must not corrupt internal application state.**  
- **Users must always have a clear recovery path when recovery is possible.**  
- **Frontend must not report success until backend confirmation exists.**  
- **Permanent failures must eventually reach a terminal state.**  
- **Correlation identifiers must allow failures to be traced across distributed components.**  