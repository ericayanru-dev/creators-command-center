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

```text
GET /api/content/:id
→ fetch content by ID
→ return content