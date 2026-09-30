# Creator Command Center --- Security Baseline

**Version:** 2.2\
**Status:** Final / Locked\
**Owner:** Eric Ayanru\
**Priority:** P0\
**Last Updated:** September 2026

------------------------------------------------------------------------

## 1. Purpose

This document defines the minimum security requirements that all MVP
features must satisfy.

Security is a product requirement and an architectural constraint.

No MVP feature may bypass these requirements for convenience or
implementation speed.

This document establishes the baseline rules. Detailed implementation
decisions may be recorded in ADRs and relevant architecture
documentation.

------------------------------------------------------------------------

# 2. Security Principles

The MVP follows these principles:

1.  Never trust client-controlled data.
2.  Enforce authorization on the server.
3.  Enforce ownership at every protected resource boundary.
4.  Never expose secrets or OAuth tokens to the frontend.
5.  Validate all external input.
6.  Minimize privileges.
7.  Fail securely.
8.  Protect against duplicate and replayed operations where applicable.
9.  Treat third-party platform credentials as highly sensitive.
10. Log security-relevant events without logging secrets.
11. Security controls apply to all approved MVP1 functionality.

12. Post-MVP functionality must not introduce speculative security
    infrastructure.

------------------------------------------------------------------------

# 3. Authentication

## 3.1 Registration

Registration must:

-   Validate all input server-side.
-   Validate email format.
-   Enforce password requirements.
-   Hash passwords using an approved password-hashing algorithm.
-   Never store plaintext passwords.
-   Never return password hashes to the client.
-   Prevent unintended duplicate accounts.
-   Apply appropriate rate limiting.

## 3.2 Login

Login must:

-   Validate credentials server-side.
-   Avoid revealing whether an account exists through overly specific
    errors.
-   Establish a secure authenticated session.
-   Apply rate limiting.
-   Never return password hashes.
-   Never expose authentication secrets to client-side application code.

## 3.3 Logout

Logout must invalidate the authenticated session according to the
selected session architecture.

The frontend must not treat local state alone as proof that the server
session has been invalidated.

## 3.4 Sessions

Sessions must:

-   Use secure session mechanisms.
-   Have appropriate expiration.
-   Support invalidation.
-   Protect against session fixation.
-   Use secure cookie attributes where cookies are used.
-   Never expose session secrets unnecessarily to JavaScript.

Required cookie protections where applicable:

-   `HttpOnly`
-   `Secure`
-   appropriate `SameSite`

## 3.5 Password Reset

Password-reset functionality must:

-   Use short-lived reset tokens.
-   Store reset tokens securely.
-   Prevent token reuse.
-   Expire reset tokens.
-   Never expose passwords.
-   Rate-limit reset requests.
-   Avoid account-enumeration leaks.

## 3.6 Account Deletion

Account deletion must:

-   Require authentication.
-   Require appropriate authorization.
-   Protect against accidental unauthorized deletion.
-   Correctly handle owned resources according to the approved
    data-retention policy.
-   Revoke/invalidate associated sessions and credentials where
    applicable.

------------------------------------------------------------------------

# 4. Authorization

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to perform this operation?

Authentication alone is insufficient.

## 4.1 Server-Side Authorization

Every protected API operation must perform authorization server-side.

The frontend must never be the final authority for:

-   Ownership
-   Permissions
-   Resource access
-   Publishing
-   Scheduling
-   Account connections
-   Administrative operations

## 4.2 Ownership Isolation

User-owned resources must be scoped to the authenticated user.

Examples include:

-   Content
-   Content versions
-   Tasks
-   Publication scheduling state
-   Publishing records / attempts
-   Connected platform accounts
-   Media
-   Notifications
-   Analytics data

A request must not be authorized merely because the caller supplies a
valid resource ID.

The server must verify that the resource belongs to the authenticated
user.

## 4.3 IDOR Prevention

All resource lookups involving user-controlled identifiers must include
ownership/authorization checks.

Unsafe pattern:

text GET /api/content/:id → fetch content by ID → return content

## 4.4 Cross-Site Request Forgery (CSRF)

Because MVP1 uses server-managed sessions with browser cookies,
state-changing browser requests must follow the project CSRF protection
contract.

-   Enforce CSRF protection for applicable state-changing requests.
-   Do not rely on `SameSite` alone as the complete CSRF defense.
-   Validate the CSRF mechanism server-side before protected state
    changes.
-   Reject missing or invalid CSRF protections.
-   Keep CSRF secrets/tokens out of URLs and logs.
-   Authentication and CSRF protections must be tested together.

## 5.1 MVP1 OAuth Security Matrix

For every approved MVP1 publishing platform, implementation documentation MUST maintain a platform-specific OAuth security matrix covering:

| Platform | OAuth State | PKCE | Refresh Token | Token Encryption | Reauthorization |
|---|---|---|---|---|---|
| Approved Platform A | Required | Supported/Required | Yes/No | Required | Required |
| Approved Platform B | Required | Supported/Required | Yes/No | Required | Required |
| Approved Platform C | Required | Supported/Required | Yes/No | Required | Required |
| Approved Platform D | Required | Supported/Required | Yes/No | Required | Required |
| Approved Platform E | Required | Supported/Required | Yes/No | Required | Required |

The matrix MUST be completed for the actual approved MVP1 launch set of at least five platforms. PKCE remains required where supported; unsupported provider capabilities MUST be explicitly recorded.

This is an implementation verification record and does not create a new security subsystem.

# 5. OAuth Security

OAuth integrations are security-sensitive and must be handled primarily
by the backend.

### State Validation

-   Generate a cryptographically secure OAuth state value.
-   Associate the state with the initiating user/session.
-   Validate the state during the OAuth callback.
-   Reject missing state.
-   Reject invalid state.
-   Reject expired state.
-   Reject reused state.
-   Never trust OAuth callback parameters without validation.

### PKCE

-   Use PKCE where supported by the platform.
-   Generate the code verifier securely.
-   Store the verifier securely for the duration of the OAuth flow.
-   Validate the authorization response against the expected OAuth flow.
-   Never expose the PKCE verifier unnecessarily to the frontend.

### Refresh Tokens

-   Refresh tokens must remain server-side.
-   Never expose refresh tokens to the frontend.
-   Store refresh tokens securely.
-   Encrypt refresh tokens at rest.
-   Never log refresh tokens.
-   Rotate or replace refresh tokens when required by the platform.
-   Handle revoked or expired refresh tokens safely.
-   Require reauthorization when a refresh token can no longer be used.

### Token Encryption

-   OAuth access tokens and refresh tokens must be encrypted at rest.
-   Encryption keys must be stored separately from encrypted token data.
-   Encryption keys must never be committed to source control.
-   Encryption keys must never be exposed to frontend code.
-   Decrypted tokens must exist only for the minimum time required to
    perform the operation.
-   Tokens must never appear in logs, URLs, error messages, or client
    responses.

------------------------------------------------------------------------

# 6. API Security

All API endpoints must treat requests as untrusted input.

### Validation

-   Validate request bodies.
-   Validate query parameters.
-   Validate route parameters.
-   Validate relevant headers.
-   Validate OAuth callback parameters.
-   Validate uploaded-file metadata.
-   Reject malformed requests.
-   Reject unexpected values.
-   Reject unauthorized fields.
-   Do not trust client-provided ownership fields.
-   Do not trust client-provided authorization fields.
-   Do not trust client-provided internal status fields.
-   Apply validation before business logic executes.

### Authorization

-   Authenticate protected requests.
-   Authorize every protected operation.
-   Verify resource ownership server-side.
-   Prevent IDOR vulnerabilities.
-   Never rely on frontend authorization checks.
-   Never allow a client-provided user ID to determine ownership.
-   Prevent users from accessing another user's resources.

### Rate Limiting

Rate limiting must be applied to security-sensitive endpoints.

At minimum evaluate rate limiting for:

-   Registration.
-   Login.
-   Password reset.
-   OAuth initiation.
-   OAuth callbacks.
-   Publishing.
-   Publishing retries.
-   Other abuse-sensitive endpoints.

Rate limits must be enforced server-side.

### Secure Headers

Production responses MUST implement the reviewed security-header policy defined in the Production Security Header Policy section.

Production responses MUST implement the reviewed security-header policy defined in the Production Security Header Policy section.

-   Content-Security-Policy.
-   Strict-Transport-Security.
-   X-Content-Type-Options.
-   Referrer-Policy.
-   Frame protection.
-   Permissions-Policy.

Exact configuration must follow the deployment architecture.

### Error Responses

API errors must not expose:

-   Passwords.
-   Password hashes.
-   Access tokens.
-   Refresh tokens.
-   OAuth client secrets.
-   Encryption keys.
-   Database credentials.
-   Internal infrastructure credentials.
-   Production stack traces.
-   Sensitive database information.

------------------------------------------------------------------------

## 7. Media Security

MVP media is temporary operational media required to support the content
and publishing workflow.

The MVP does **not** implement a permanent creator media library.

### Upload Security

-   Authenticate the upload request where required.
-   Verify the user is authorized to upload.
-   Validate file type.
-   Validate file size.
-   Validate supported formats.
-   Do not blindly trust client-provided MIME types.
-   Generate server-controlled storage identifiers.
-   Prevent users from selecting another user's storage location.

### Signed Access

Private media must use controlled access.

Where signed URLs are used:

-   Generate them server-side.
-   Make them short-lived.
-   Scope them to the required resource.
-   Do not expose storage credentials.
-   Do not make private media permanently public.
-   Verify authorization before issuing access.

### Temporary Storage

MVP media storage must be treated as operational temporary storage.

The system must define:

-   Upload state.
-   Processing state.
-   Successful-use state.
-   Failed-upload state.
-   Abandoned-upload state.
-   Expiration state.

### Lifecycle Deletion

Temporary media must have a defined cleanup lifecycle.

The system must support:

-   Cleanup of abandoned uploads.
-   Cleanup of failed uploads.
-   Cleanup of expired temporary media.
-   Cleanup after successful processing/use where appropriate.
-   Safe deletion without affecting active publishing operations.

Media cleanup must not delete media that is still required by an active
workflow.

------------------------------------------------------------------------

## Trigger.dev Execution Security

Trigger.dev is the MVP1 background execution layer. Its credentials and
execution controls remain server-side.

-   Never expose Trigger.dev credentials to the browser.
-   Treat Trigger.dev Task / Run identifiers as operational metadata,
    not authorization credentials.
-   Do not allow client input to directly select or manipulate arbitrary
    Trigger.dev Tasks / Runs.
-   Validate and authorize the underlying Publication before creating or
    acting on execution state.
-   Preserve idempotency and stale-execution protections when creating,
    retrying, rescheduling, or cancelling executions.
-   Do not treat Trigger.dev execution state as the PostgreSQL business
    source of truth.
-   Failed or missing execution creation must be recoverable through
    reconciliation against authoritative PostgreSQL state.
-   Do not log Trigger.dev credentials or sensitive execution payloads.

## Webhook Security

Where providers use webhooks in MVP1, webhook requests are untrusted
input.

-   Verify the provider signature/authentication mechanism.
-   Validate applicable timestamps and replay-protection data.
-   Validate the event structure and identity.
-   Process webhook events idempotently.
-   Reject invalid or unverifiable events.
-   Never expose webhook secrets to the frontend.
-   Do not allow duplicate webhook delivery to create duplicate side
    effects.

## Publishing and Replay Protection

Publishing is a security-sensitive external side-effect workflow.

-   Enforce authorization before creating a Publication or
    PublishingAttempt.
-   Use layered idempotency across API request, Publication,
    PublishingAttempt, Trigger.dev execution safeguards, and provider
    idempotency where supported.
-   Reject or safely resolve replayed requests.
-   Prevent a stale scheduled execution from publishing after a
    cancellation or reschedule.
-   Preserve successful publication state so retries do not
    unnecessarily republish successful platforms.
-   External platform credentials must be selected only from an
    authorized PlatformAccount owned by the creator.

## Security Audit Events and Logging

Security-relevant events should be auditable without recording secrets.
Examples include:

-   Login success/failure.
-   Logout/session revocation.
-   Password reset requests and completion.
-   Account deletion.
-   Platform connection/disconnection/reauthorization.
-   Publishing authorization failures.
-   Rejected OAuth callbacks.
-   Rejected webhook signatures.
-   Repeated rate-limit violations.
-   Security-sensitive administrative actions, if introduced.

Logs must not contain passwords, session secrets, OAuth tokens, client
secrets, encryption keys, database credentials, R2 credentials, or
Trigger.dev credentials.

## Data Protection and Minimization

-   Store only data required for the approved MVP1 workflows.
-   Keep OAuth tokens and other credentials separate from ordinary
    user-facing data access.
-   Apply approved retention and deletion rules to temporary media and
    security records.
-   Account deletion must revoke/invalidate associated sessions and
    credentials where applicable.
-   Do not introduce permanent media retention, financial data
    infrastructure, AI data stores, or other post-MVP security
    infrastructure merely for future features.

## Security Governance and Cross-Document Authority

This Security Baseline is the minimum security control layer for MVP1. It must remain synchronized with the authoritative architecture and implementation contracts.

- **Authentication:** server-managed sessions as defined by ADR-001.
- **Backend:** Hono + TypeScript REST API.
- **Database:** PostgreSQL + Prisma; PostgreSQL remains authoritative for business state.
- **Execution:** Trigger.dev Task / Run for background execution; Trigger.dev is not business-state authority.
- **Publishing model:** Content → ContentVersion / Platform Version → Publication → PublishingAttempt.
- **Scheduling:** Publication owns scheduling state; there is no standalone Schedule entity.
- **Platform integration:** provider-specific adapters behind the Platform Adapter Contract.
- **Media:** temporary/required media only, using Cloudflare R2 where required; no permanent creator media library.
- **API:** public application contracts use the approved `/api/v1/...` namespace.

Where another authoritative document defines a more specific security implementation contract, this baseline establishes the minimum security requirement and the more specific approved document governs implementation detail.

---

# 8. Implementation Tasks

## Backend Work

The backend is responsible for implementing the security architecture.

### Authentication

-   Implement secure registration.
-   Implement secure login.
-   Implement logout/session invalidation.
-   Implement session verification.
-   Implement password hashing.
-   Implement password reset securely.
-   Implement account deletion authorization.

### Authorization

-   Implement server-side authorization.
-   Implement ownership checks.
-   Implement resource isolation.
-   Prevent IDOR vulnerabilities.
-   Protect all protected API endpoints.
-   Prevent mass assignment of protected fields.

### OAuth

-   Implement OAuth state validation.
-   Implement PKCE where supported.
-   Implement secure callback handling.
-   Implement secure token storage.
-   Implement token encryption.
-   Implement refresh-token handling.
-   Implement disconnect/revocation handling.
-   Handle expired and revoked credentials.

### Production Security Header Policy

Production responses MUST implement a reviewed security-header policy containing, at minimum:

- Content-Security-Policy (CSP)
- `frame-ancestors` or equivalent frame protection
- Strict-Transport-Security (HSTS)
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

The exact directives and values MUST be defined and reviewed in the deployment/security implementation configuration. The policy MUST be tested in production-equivalent environments and included in the security acceptance gate.

# 6. API Security

-   Implement request validation.
-   Implement authorization checks.
-   Implement rate limiting.
-   Implement secure error handling.
-   Implement CSRF protection for applicable cookie-authenticated
    state-changing requests.
-   Implement security headers where appropriate.

### Background Execution

-   Protect Trigger.dev credentials and execution boundaries.
-   Validate Publication ownership before execution creation or control.
-   Preserve idempotency and stale-execution protections.
-   Support reconciliation when execution creation fails or becomes
    inconsistent with PostgreSQL state.

### Media

-   Implement upload authorization.
-   Implement upload validation.
-   Implement secure storage access.
-   Implement signed access where required.
-   Implement temporary media lifecycle.
-   Implement abandoned-media cleanup.

------------------------------------------------------------------------

## Frontend Work

The frontend must operate under the backend security boundary.

### Token Security

-   Never expose OAuth access tokens.
-   Never expose OAuth refresh tokens.
-   Never expose OAuth client secrets.
-   Never expose encryption keys.
-   Never expose database credentials.
-   Never store server secrets in client-side code.

### Authentication UI

-   Handle authentication state safely.
-   Handle expired sessions.
-   Handle unauthorized responses.
-   Do not assume that hiding a UI element provides authorization.
-   Never treat frontend state as proof of authorization.

### Error Handling

-   Display safe user-facing errors.
-   Do not display server secrets.
-   Do not display stack traces.
-   Do not expose internal implementation details.
-   Handle expired sessions gracefully.

------------------------------------------------------------------------

## DevOps Work

DevOps owns the infrastructure security implementation.

### Secret Management

-   Configure secure secret storage.
-   Keep secrets outside source control.
-   Configure environment-specific secrets.
-   Rotate secrets when required.
-   Restrict access to production secrets.
-   Prevent secrets from appearing in logs.

### Environment Protection

-   Separate development, staging, and production environments.
-   Protect production credentials.
-   Restrict production access.
-   Protect CI/CD secrets.
-   Prevent accidental production credential exposure.
-   Ensure secure environment configuration.

### Infrastructure Security

-   Secure database credentials.
-   Secure object-storage credentials.
-   Secure Trigger.dev credentials and environment configuration.
-   Configure HTTPS/TLS.
-   Configure production security headers.
-   Configure appropriate network/access restrictions.

------------------------------------------------------------------------

# 9. Security Tests

Security testing is required for every protected MVP capability.

## Authentication Tests

-   Registration with valid data.
-   Registration with invalid data.
-   Duplicate registration.
-   Login with valid credentials.
-   Login with invalid credentials.
-   Logout.
-   Expired session.
-   Invalid session.
-   Password reset expiration.
-   Unauthorized account deletion.

## Authorization Tests

-   Unauthenticated request.
-   Unauthorized request handling.
-   User A accessing User B's resource.
-   User A modifying User B's resource.
-   User A deleting User B's resource.
-   Invalid resource ID.
-   IDOR prevention.
-   Ownership enforcement at API boundaries.
-   Privilege escalation attempts.

## OAuth Tests

-   Missing OAuth state.
-   OAuth state mismatch.
-   Invalid OAuth state.
-   Expired OAuth state.
-   Reused OAuth state.
-   Invalid OAuth callback.
-   PKCE verifier mismatch where applicable.
-   Invalid redirect context.
-   Expired access token.
-   Expired refresh token.
-   Revoked platform credentials.
-   Reauthorization flow.

## API Security Tests

-   Missing required fields.
-   Invalid field types.
-   Malformed request body.
-   Unexpected fields.
-   Invalid path parameter.
-   Invalid query parameter.
-   Rate-limit enforcement.
-   Invalid authentication.
-   Unauthorized API access.
-   Protected-field modification attempts.
-   Missing CSRF protection on applicable state-changing
    cookie-authenticated requests.
-   Invalid CSRF protection.

## Media Security Tests

-   Unauthorized upload.
-   Invalid file type.
-   Oversized file.
-   Unauthorized media access.
-   Access to another user's media.
-   Expired signed access.
-   Abandoned upload cleanup.
-   Failed upload cleanup.
-   Expired temporary media cleanup.

## Publishing/Scheduling Security Tests

-   Unauthorized publishing.
-   Unauthorized scheduling.
-   Publishing another user's content.
-   Scheduling another user's content.
-   Using another user's platform account.
-   Duplicate publish request.
-   Duplicate schedule request.
-   Invalid publishing authorization.
-   Invalid platform credentials.
-   Stale Trigger.dev execution after cancellation/reschedule.
-   Unauthorized Trigger.dev execution manipulation.
-   Duplicate webhook delivery.
-   Invalid webhook signature/replay attempt.

------------------------------------------------------------------------

# 10. Security Acceptance Criteria

The project is considered secure when the following are verified:

-   Authentication requirements are implemented and enforced.
-   Authorization requirements are implemented and enforced.
-   Server-side ownership enforcement is active at all protected API
    boundaries.
-   IDOR prevention controls are implemented and tested.
-   OAuth state validation is enforced.
-   PKCE is implemented in all OAuth flows where supported by the
    provider.
-   Refresh-token protection is enforced.
-   Token encryption is implemented.
-   API input validation is enforced.
-   Rate-limiting is active.
-   CSRF protection is enforced for applicable cookie-authenticated
    state-changing requests.
-   Trigger.dev execution boundaries are protected and cannot be
    manipulated by untrusted clients.
-   Webhook authenticity and replay protections are enforced where
    webhooks are used.
-   Publishing idempotency and stale-execution protections are enforced.
-   Secure headers are returned in all production responses.
-   Media security controls are enforced.
-   Private media MUST use authorized controlled access; signed URLs are required where direct object-storage access is exposed.
-   Temporary media storage is enforced.
-   Media lifecycle deletion is implemented.
-   Backend security responsibilities are fulfilled.
-   Frontend security responsibilities are fulfilled.
-   DevOps security responsibilities are fulfilled.
-   Security tests are executed and pass.

------------------------------------------------------------------------

## Non-Negotiable Requirements

-   **Sensitive OAuth tokens must never reach frontend application
    code.**
-   **Secrets must never be committed to source control.**
-   **Ownership must be enforced server-side at all protected API
    boundaries.**
-   **Authentication must never be treated as authorization.**
-   **Frontend checks must never replace backend authorization.**
-   **IDOR vulnerabilities must be prevented and tested.**
-   **Security-sensitive failures must fail safely.**
-   **Trigger.dev execution state must never replace PostgreSQL as
    business-state authority.**
-   **Webhook requests and external platform responses must be treated
    as untrusted input.**

## Security Architecture Invariants

- PostgreSQL remains the business source of truth.
- Trigger.dev remains execution infrastructure, not business-state authority.
- The publishing hierarchy remains Content → ContentVersion / Platform Version → Publication → PublishingAttempt.
- Publication owns scheduling; no standalone Schedule entity exists.
- Platform integrations remain behind the Platform Adapter Contract.
- OAuth credentials and tokens remain server-side.
- MVP media remains temporary/required operational media, not a permanent creator media library.
- No BullMQ or Redis architecture is introduced.
- No speculative MVP2/MVP3/MVP4 security infrastructure is introduced.


## MVP1 Security Traceability

| MVP1 Capability | Security Controls | Required Security Tests | Acceptance Gate |
|---|---|---|---|
| Content | Auth, ownership, validation, IDOR | Cross-user read/modify/delete | Pass |
| Platform Versions | Ownership, validation | Cross-user/malformed input | Pass |
| Production Planning | Auth, ownership, validation | Cross-user modification | Pass |
| Tasks | Auth, ownership, IDOR | CRUD/complete/reopen/delete | Pass |
| Calendar | Auth, ownership | Unauthorized scheduling | Pass |
| Publications | Auth, ownership, idempotency | Duplicate/stale/unauthorized | Pass |
| Analytics | Auth, ownership | Cross-user access | Pass |
| Notifications | Auth, ownership | Cross-user access | Pass |
| Platform Accounts | OAuth/token/ownership | OAuth/cross-user attacks | Pass |
| Media | Authorization/access/lifecycle | Unauthorized/cross-user/cleanup | Pass |

This matrix is a verification aid and does not introduce new MVP1 functionality.

