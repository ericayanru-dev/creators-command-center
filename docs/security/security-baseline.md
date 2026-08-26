# Creator Command Center — Security Baseline

**Version:** 1.0  
**Status:** Approved Baseline  
**Owner:** Eric Ayanru  
**Priority:** P0  
**Last Updated:** August 2026

---

## 1. Purpose

This document defines the minimum security requirements that all MVP features must satisfy.

Security is a product requirement and an architectural constraint.

No MVP feature may bypass these requirements for convenience or implementation speed.

This document establishes the baseline rules. Detailed implementation decisions may be recorded in ADRs and relevant architecture documentation.

---

# 2. Security Principles

The MVP follows these principles:

1. Never trust client-controlled data.
2. Enforce authorization on the server.
3. Enforce ownership at every protected resource boundary.
4. Never expose secrets or OAuth tokens to the frontend.
5. Validate all external input.
6. Minimize privileges.
7. Fail securely.
8. Protect against duplicate and replayed operations where applicable.
9. Treat third-party platform credentials as highly sensitive.
10. Log security-relevant events without logging secrets.
11. Security controls apply to P0 and P1 functionality.
12. Post-MVP functionality must not introduce speculative security infrastructure.

---

# 3. Authentication

## 3.1 Registration

Registration must:

- Validate all input server-side.
- Validate email format.
- Enforce password requirements.
- Hash passwords using an approved password-hashing algorithm.
- Never store plaintext passwords.
- Never return password hashes to the client.
- Prevent unintended duplicate accounts.
- Apply appropriate rate limiting.

## 3.2 Login

Login must:

- Validate credentials server-side.
- Avoid revealing whether an account exists through overly specific errors.
- Establish a secure authenticated session.
- Apply rate limiting.
- Never return password hashes.
- Never expose authentication secrets to client-side application code.

## 3.3 Logout

Logout must invalidate the authenticated session according to the selected session architecture.

The frontend must not treat local state alone as proof that the server session has been invalidated.

## 3.4 Sessions

Sessions must:

- Use secure session mechanisms.
- Have appropriate expiration.
- Support invalidation.
- Protect against session fixation.
- Use secure cookie attributes where cookies are used.
- Never expose session secrets unnecessarily to JavaScript.

Required cookie protections where applicable:

- `HttpOnly`
- `Secure`
- appropriate `SameSite`

## 3.5 Password Reset

Password-reset functionality must:

- Use short-lived reset tokens.
- Store reset tokens securely.
- Prevent token reuse.
- Expire reset tokens.
- Never expose passwords.
- Rate-limit reset requests.
- Avoid account-enumeration leaks.

## 3.6 Account Deletion

Account deletion must:

- Require authentication.
- Require appropriate authorization.
- Protect against accidental unauthorized deletion.
- Correctly handle owned resources according to the approved data-retention policy.
- Revoke/invalidate associated sessions and credentials where applicable.

---

# 4. Authorization

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to perform this operation?

Authentication alone is insufficient.

## 4.1 Server-Side Authorization

Every protected API operation must perform authorization server-side.

The frontend must never be the final authority for:

- Ownership
- Permissions
- Resource access
- Publishing
- Scheduling
- Account connections
- Administrative operations

## 4.2 Ownership Isolation

User-owned resources must be scoped to the authenticated user.

Examples include:

- Content
- Content versions
- Tasks
- Schedules
- Publishing records
- Connected platform accounts
- Media
- Notifications
- Analytics data

A request must not be authorized merely because the caller supplies a valid resource ID.

The server must verify that the resource belongs to the authenticated user.

## 4.3 IDOR Prevention

All resource lookups involving user-controlled identifiers must include ownership/authorization checks.

Unsafe pattern:

text
GET /api/content/:id
→ fetch content by ID
→ return content

## OAuth Security

OAuth integrations are security-sensitive and must be handled primarily by the backend.

### State Validation

- Generate a cryptographically secure OAuth state value.
- Associate the state with the initiating user/session.
- Validate the state during the OAuth callback.
- Reject missing state.
- Reject invalid state.
- Reject expired state.
- Reject reused state.
- Never trust OAuth callback parameters without validation.

### PKCE

- Use PKCE where supported by the platform.
- Generate the code verifier securely.
- Store the verifier securely for the duration of the OAuth flow.
- Validate the authorization response against the expected OAuth flow.
- Never expose the PKCE verifier unnecessarily to the frontend.

### Refresh Tokens

- Refresh tokens must remain server-side.
- Never expose refresh tokens to the frontend.
- Store refresh tokens securely.
- Encrypt refresh tokens at rest.
- Never log refresh tokens.
- Rotate or replace refresh tokens when required by the platform.
- Handle revoked or expired refresh tokens safely.
- Require reauthorization when a refresh token can no longer be used.

### Token Encryption

- OAuth access tokens and refresh tokens must be encrypted at rest.
- Encryption keys must be stored separately from encrypted token data.
- Encryption keys must never be committed to source control.
- Encryption keys must never be exposed to frontend code.
- Decrypted tokens must exist only for the minimum time required to perform the operation.
- Tokens must never appear in logs, URLs, error messages, or client responses.

---

## API Security

All API endpoints must treat requests as untrusted input.

### Validation

- Validate request bodies.
- Validate query parameters.
- Validate route parameters.
- Validate relevant headers.
- Validate OAuth callback parameters.
- Validate uploaded-file metadata.
- Reject malformed requests.
- Reject unexpected values.
- Reject unauthorized fields.
- Do not trust client-provided ownership fields.
- Do not trust client-provided authorization fields.
- Do not trust client-provided internal status fields.
- Apply validation before business logic executes.

### Authorization

- Authenticate protected requests.
- Authorize every protected operation.
- Verify resource ownership server-side.
- Prevent IDOR vulnerabilities.
- Never rely on frontend authorization checks.
- Never allow a client-provided user ID to determine ownership.
- Prevent users from accessing another user's resources.

### Rate Limiting

Rate limiting must be applied to security-sensitive endpoints.

At minimum evaluate rate limiting for:

- Registration.
- Login.
- Password reset.
- OAuth initiation.
- OAuth callbacks.
- Publishing.
- Publishing retries.
- Other abuse-sensitive endpoints.

Rate limits must be enforced server-side.

### Secure Headers

Production responses must use appropriate security headers.

The implementation should evaluate:

- Content-Security-Policy.
- Strict-Transport-Security.
- X-Content-Type-Options.
- Referrer-Policy.
- Frame protection.
- Permissions-Policy.

Exact configuration must follow the deployment architecture.

### Error Responses

API errors must not expose:

- Passwords.
- Password hashes.
- Access tokens.
- Refresh tokens.
- OAuth client secrets.
- Encryption keys.
- Database credentials.
- Internal infrastructure credentials.
- Production stack traces.
- Sensitive database information.

---

## Media Security

MVP media is temporary operational media required to support the content and publishing workflow.

The MVP does **not** implement a permanent creator media library.

### Upload Security

- Authenticate the upload request where required.
- Verify the user is authorized to upload.
- Validate file type.
- Validate file size.
- Validate supported formats.
- Do not blindly trust client-provided MIME types.
- Generate server-controlled storage identifiers.
- Prevent users from selecting another user's storage location.

### Signed Access

Private media must use controlled access.

Where signed URLs are used:

- Generate them server-side.
- Make them short-lived.
- Scope them to the required resource.
- Do not expose storage credentials.
- Do not make private media permanently public.
- Verify authorization before issuing access.

### Temporary Storage

MVP media storage must be treated as operational temporary storage.

The system must define:

- Upload state.
- Processing state.
- Successful-use state.
- Failed-upload state.
- Abandoned-upload state.
- Expiration state.

### Lifecycle Deletion

Temporary media must have a defined cleanup lifecycle.

The system must support:

- Cleanup of abandoned uploads.
- Cleanup of failed uploads.
- Cleanup of expired temporary media.
- Cleanup after successful processing/use where appropriate.
- Safe deletion without affecting active publishing operations.

Media cleanup must not delete media that is still required by an active workflow.

---

# Implementation Tasks

## Backend Work

The backend is responsible for implementing the security architecture.

### Authentication

- Implement secure registration.
- Implement secure login.
- Implement logout/session invalidation.
- Implement session verification.
- Implement password hashing.
- Implement password reset securely.
- Implement account deletion authorization.

### Authorization

- Implement server-side authorization.
- Implement ownership checks.
- Implement resource isolation.
- Prevent IDOR vulnerabilities.
- Protect all protected API endpoints.
- Prevent mass assignment of protected fields.

### OAuth

- Implement OAuth state validation.
- Implement PKCE where supported.
- Implement secure callback handling.
- Implement secure token storage.
- Implement token encryption.
- Implement refresh-token handling.
- Implement disconnect/revocation handling.
- Handle expired and revoked credentials.

### API Security

- Implement request validation.
- Implement authorization checks.
- Implement rate limiting.
- Implement secure error handling.
- Implement security headers where appropriate.

### Media

- Implement upload authorization.
- Implement upload validation.
- Implement secure storage access.
- Implement signed access where required.
- Implement temporary media lifecycle.
- Implement abandoned-media cleanup.

---

## Frontend Work

The frontend must operate under the backend security boundary.

### Token Security

- Never expose OAuth access tokens.
- Never expose OAuth refresh tokens.
- Never expose OAuth client secrets.
- Never expose encryption keys.
- Never expose database credentials.
- Never store server secrets in client-side code.

### Authentication UI

- Handle authentication state safely.
- Handle expired sessions.
- Handle unauthorized responses.
- Do not assume that hiding a UI element provides authorization.
- Never treat frontend state as proof of authorization.

### Error Handling

- Display safe user-facing errors.
- Do not display server secrets.
- Do not display stack traces.
- Do not expose internal implementation details.
- Handle expired sessions gracefully.

---

## DevOps Work

Trust owns the infrastructure security implementation.

### Secret Management

- Configure secure secret storage.
- Keep secrets outside source control.
- Configure environment-specific secrets.
- Rotate secrets when required.
- Restrict access to production secrets.
- Prevent secrets from appearing in logs.

### Environment Protection

- Separate development, staging, and production environments.
- Protect production credentials.
- Restrict production access.
- Protect CI/CD secrets.
- Prevent accidental production credential exposure.
- Ensure secure environment configuration.

### Infrastructure Security

- Secure database credentials.
- Secure Redis credentials.
- Secure object-storage credentials.
- Secure worker credentials.
- Configure HTTPS/TLS.
- Configure production security headers.
- Configure appropriate network/access restrictions.

---

# Security Tests

Security testing is required for every protected MVP capability.

## Authentication Tests

- Registration with valid data.
- Registration with invalid data.
- Duplicate registration.
- Login with valid credentials.
- Login with invalid credentials.
- Logout.
- Expired session.
- Invalid session.
- Password reset expiration.
- Unauthorized account deletion.

## Authorization Tests

- Unauthenticated request.
- Unauthorized request handling.
- User A accessing User B's resource.
- User A modifying User B's resource.
- User A deleting User B's resource.
- Invalid resource ID.
- IDOR prevention.
- Ownership enforcement at API boundaries.
- Privilege escalation attempts.

## OAuth Tests

- Missing OAuth state.
- OAuth state mismatch.
- Invalid OAuth state.
- Expired OAuth state.
- Reused OAuth state.
- Invalid OAuth callback.
- Expired access token.
- Expired refresh token.
- Revoked platform credentials.
- Reauthorization flow.

## API Security Tests

- Missing required fields.
- Invalid field types.
- Malformed request body.
- Unexpected fields.
- Invalid path parameter.
- Invalid query parameter.
- Rate-limit enforcement.
- Invalid authentication.
- Unauthorized API access.
- Protected-field modification attempts.

## Media Security Tests

- Unauthorized upload.
- Invalid file type.
- Oversized file.
- Unauthorized media access.
- Access to another user's media.
- Expired signed access.
- Abandoned upload cleanup.
- Failed upload cleanup.
- Expired temporary media cleanup.

## Publishing/Scheduling Security Tests

- Unauthorized publishing.
- Unauthorized scheduling.
- Publishing another user's content.
- Scheduling another user's content.
- Using another user's platform account.
- Duplicate publish request.
- Duplicate schedule request.
- Invalid publishing authorization.
- Invalid platform credentials.

---

# Security Acceptance Criteria

The project is considered secure when the following are verified:

- Authentication requirements are implemented and enforced.
- Authorization requirements are implemented and enforced.
- Server-side ownership enforcement is active at all protected API boundaries.
- IDOR prevention controls are implemented and tested.
- OAuth state validation is enforced.
- PKCE is implemented in all OAuth flows.
- Refresh-token protection is enforced.
- Token encryption is implemented.
- API input validation is enforced.
- Rate-limiting is active.
- Secure headers are returned in all production responses.
- Media security controls are enforced.
- Signed-access is required for media.
- Temporary media storage is enforced.
- Media lifecycle deletion is implemented.
- Backend security responsibilities are fulfilled.
- Frontend security responsibilities are fulfilled.
- DevOps security responsibilities are fulfilled.
- Security tests are executed and pass.

---

## Non-Negotiable Requirements

- **Sensitive OAuth tokens must never reach frontend application code.**
- **Secrets must never be committed to source control.**
- **Ownership must be enforced server-side at all protected API boundaries.**
- **Authentication must never be treated as authorization.**
- **Frontend checks must never replace backend authorization.**
- **IDOR vulnerabilities must be prevented and tested.**
- **Security-sensitive failures must fail safely.**
