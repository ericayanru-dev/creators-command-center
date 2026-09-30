# ADR-006 --- Platform Adapter Architecture

## Document Metadata

  Field                Value
  -------------------- --------------------------------
  Document             Platform Adapter Architecture
  Identifier           ADR-006
  Product              Creator Command Center
  Version              2.0
  Status               Final / Locked
  Date                 September 2026
  Architecture Stage   MVP1 Implementation Foundation
  Decision Type        Architecture Decision Record

------------------------------------------------------------------------

## 1. Purpose

This document defines the architecture boundary between Creator Command
Center's provider-agnostic publishing domain and external
social-platform APIs.

The objective is to make platform integrations replaceable, testable,
capability-aware, secure, and isolated from core Creator Command Center
business logic.

The adapter architecture is part of the MVP1 publishing foundation. MVP1
requires support for an approved launch set of at least five major
platforms. The exact launch set is governed by the MVP Feature Matrix
and platform capability validation; YouTube, Instagram, TikTok, Threads,
Facebook, X/Twitter, LinkedIn, and WhatsApp may form the supported set
where their applicable APIs and publishing capabilities permit the
required workflows.

This document does not require every platform to expose identical
functionality. Platform differences are represented explicitly through
capabilities and provider-specific adapter behavior.

------------------------------------------------------------------------

## 2. Status

**Accepted / Final / Locked**

This document supersedes the earlier ADR-006 wording that described only
YouTube, Instagram, and TikTok and contained obsolete BullMQ references.

------------------------------------------------------------------------

## 3. Context

Creator Command Center integrates with external creator platforms whose
APIs differ in:

-   authentication and OAuth flows;
-   token lifecycle and refresh behavior;
-   supported account types;
-   supported post types;
-   media requirements;
-   file formats and limits;
-   captions, titles, descriptions, hashtags, and metadata;
-   scheduling support;
-   publishing workflows;
-   asynchronous processing behavior;
-   publishing-status semantics;
-   error formats;
-   rate limits;
-   analytics capabilities;
-   provider-specific identifiers;
-   provider-specific idempotency or operation tracking.

If provider behavior is implemented directly inside Content,
Publication, Publishing, Dashboard, or other core domain services,
provider-specific assumptions will spread through the application.

That creates several risks:

1.  Adding a platform requires changes across unrelated modules.
2.  Provider errors become inconsistent.
3.  Business logic becomes difficult to test without external APIs.
4.  Provider API changes become expensive to isolate.
5.  Capability differences are hidden inside conditionals.
6.  Credentials can accidentally cross architectural boundaries.
7.  The publishing domain becomes coupled to one provider's terminology.

The architecture therefore requires a dedicated adapter boundary.

------------------------------------------------------------------------

## 4. Architectural Decision

Creator Command Center will use a **dedicated platform adapter
architecture**.

Each supported platform has a dedicated adapter implementing the common
internal adapter contract while retaining explicit provider-specific
behavior where necessary.

The canonical dependency direction is:

``` text
Creator
   |
   v
Frontend
   |
   v
Hono API
   |
   v
Publishing Service
   |
   v
Platform Adapter Contract
   |
   +----------------+----------------+----------------+----------------+
   |                |                |                |
   v                v                v                v
YouTube Adapter  Instagram       TikTok Adapter   Other Approved
                 Adapter                           Platform Adapters
   |                |                |                |
   +----------------+----------------+----------------+
                            |
                            v
                    External Platform APIs
```

The core domain does not call provider APIs directly.

The Publishing Service determines what the system is trying to publish.
The adapter determines how that operation is translated into a
particular provider's API.

------------------------------------------------------------------------

## 5. Architectural Goals

The adapter architecture must provide:

-   provider isolation;
-   consistent internal contracts;
-   explicit capability handling;
-   secure credential boundaries;
-   normalized internal errors;
-   testable provider integrations;
-   independent platform-version handling;
-   support for partial multi-platform success;
-   support for provider-specific publishing workflows;
-   controlled token refresh;
-   provider-specific rate-limit handling;
-   provider-specific status interpretation;
-   future platform extensibility.

The abstraction must remain deliberately narrow. It must not pretend
that all platforms behave identically.

------------------------------------------------------------------------

## 6. Non-Goals

This architecture does not:

-   create a generic social-media API that hides every provider
    difference;
-   require every provider to support every capability;
-   move provider credentials into the frontend;
-   make the frontend responsible for OAuth token management;
-   make platform adapters responsible for core Content business rules;
-   make platform adapters authoritative for PostgreSQL business state;
-   create a separate microservice for each platform;
-   introduce a standalone queue or worker architecture;
-   require permanent media storage;
-   implement MVP3 AI adaptation or AI publishing;
-   implement MVP4 livestream infrastructure.

Creator Command Center remains a modular monolith for MVP1.

------------------------------------------------------------------------

## 7. Core Boundary

### 7.1 Core Domain Owns

The core application owns:

-   Creator ownership;
-   Content;
-   ContentVersion;
-   ContentRelationship;
-   Platform Version;
-   Publication;
-   PublishingAttempt;
-   publishing authorization;
-   publication lifecycle state;
-   scheduling state;
-   task relationships;
-   dashboard aggregation;
-   notifications;
-   analytics records;
-   user-facing error semantics;
-   idempotency rules;
-   ownership isolation;
-   PostgreSQL persistence.

### 7.2 Adapter Owns

A platform adapter owns provider-specific:

-   OAuth interaction;
-   access-token refresh;
-   provider API authentication;
-   request construction;
-   provider payload formatting;
-   provider response parsing;
-   provider-specific media requirements;
-   provider-specific publishing workflow;
-   provider-specific publishing-status retrieval;
-   provider-specific error classification;
-   provider-specific rate-limit interpretation;
-   provider-specific identifiers;
-   provider-specific capability details.

### 7.3 Adapter Does Not Own

An adapter must not:

-   directly modify unrelated core-domain state;
-   decide creator ownership;
-   decide whether a creator is authorized to publish;
-   change ContentStatus arbitrarily;
-   create arbitrary application records outside the publishing
    contract;
-   expose raw provider responses to the frontend;
-   expose access or refresh tokens;
-   bypass the Publishing Service;
-   become the source of truth for Publication or PublishingAttempt
    state.

------------------------------------------------------------------------

## 8. Platform Independence

The system must not be architecturally dependent on one social network.

Adding a new platform should primarily require:

``` text
New Platform Adapter
        +
Platform Configuration
        +
Capability Definition
        +
Provider Credential Configuration
        +
Adapter Tests
```

It should not require rewriting:

-   Content;
-   ContentVersion;
-   Platform Version;
-   Publication;
-   PublishingAttempt;
-   Dashboard;
-   scheduling domain logic;
-   authentication/session logic;
-   core publishing state machines.

This is the primary architectural benefit of the adapter boundary.

------------------------------------------------------------------------

## 9. Platform and Platform Version Separation

A **platform** identifies the external provider.

A **Platform Version** represents the creator's adaptation of a Content
item for one selected platform.

Example:

``` text
Original Content
       |
       +---- YouTube Platform Version
       |
       +---- TikTok Platform Version
       |
       +---- Instagram Platform Version
       |
       +---- LinkedIn Platform Version
       |
       +---- Other Platform Version
```

A Platform Version may contain provider-specific values such as:

-   media reference;
-   caption;
-   title;
-   description;
-   hashtags;
-   CTA;
-   post type;
-   provider-specific metadata.

Changing one Platform Version must not silently modify another Platform
Version.

The adapter receives the appropriate Platform Version and converts it
into the provider-specific request.

------------------------------------------------------------------------

## 10. Publication and PublishingAttempt Boundary

Platform adapters operate in the context of the publishing domain
hierarchy:

``` text
Content
   |
   v
ContentVersion
   |
   v
Platform Version
   |
   v
Publication
   |
   v
PublishingAttempt
   |
   v
Trigger.dev Task / Run
   |
   v
Platform Adapter
   |
   v
External Platform
```

### Publication

Publication represents the durable publishing intent and scheduling
state for a selected platform version.

Publication owns:

-   target platform;
-   target platform account;
-   scheduled publishing state;
-   publication lifecycle;
-   eligibility for retry/cancellation/rescheduling;
-   relationship to the selected Platform Version.

### PublishingAttempt

PublishingAttempt represents an individual attempt to publish a
Publication.

It preserves attempt history, including:

-   attempt identity;
-   provider interaction state;
-   timestamps;
-   normalized outcome;
-   provider reference where available;
-   normalized error information where applicable.

A retry creates a new PublishingAttempt rather than erasing the previous
failed attempt.

A successful platform publication must not be republished merely because
another platform or later attempt failed.

------------------------------------------------------------------------

## 11. Adapter Contract

The internal contract should expose stable operations needed by the
publishing and platform-connection domains.

Conceptually:

``` ts
interface PlatformAdapter {
  getCapabilities(): PlatformCapabilities;

  beginOAuth(input: OAuthStartInput): Promise<OAuthStartResult>;

  handleOAuthCallback(
    input: OAuthCallbackInput
  ): Promise<ConnectedAccountResult>;

  refreshConnection(
    input: RefreshConnectionInput
  ): Promise<ConnectionRefreshResult>;

  validateConnection(
    input: ValidateConnectionInput
  ): Promise<ConnectionValidationResult>;

  disconnect(
    input: DisconnectInput
  ): Promise<DisconnectResult>;

  validatePublish(
    input: PublishValidationInput
  ): Promise<PublishValidationResult>;

  publish(
    input: PublishInput
  ): Promise<PublishResult>;

  getPublishingStatus(
    input: PublishingStatusInput
  ): Promise<PublishingStatusResult>;
}
```

The exact TypeScript types are implementation contracts and should be
defined in the backend source tree rather than copied into every
adapter.

The interface must remain small enough to preserve real provider
differences.

------------------------------------------------------------------------

## 12. Capability Contract

Capabilities are explicit.

Conceptually:

``` ts
type PlatformCapabilities = {
  publishing: boolean;
  scheduling: boolean;
  analytics: boolean;
  supportedPostTypes: string[];
  supportedMediaTypes: string[];
  supportsMultipleAccounts: boolean;
};
```

Additional capability metadata may be required for specific providers.

Examples of capability dimensions include:

-   video publishing;
-   image publishing;
-   text publishing;
-   short-form video;
-   carousel publishing;
-   stories;
-   scheduled publishing;
-   provider-side scheduling;
-   status lookup;
-   analytics retrieval;
-   maximum media duration;
-   maximum file size;
-   supported aspect ratios;
-   caption limits;
-   title limits.

The capability model is not a promise that every platform supports every
operation.

------------------------------------------------------------------------

## 13. Capability Validation

Capability validation occurs before a publishing operation is accepted.

Canonical flow:

``` text
Creator Request
      |
      v
Hono API
      |
      v
Publishing Service
      |
      +---- Validate ownership
      |
      +---- Validate Publication
      |
      +---- Validate Platform Version
      |
      +---- Validate Connected Account
      |
      +---- Validate Adapter Capability
      |
      v
Trigger.dev Task / Run
      |
      v
Platform Adapter
```

The frontend may use capability metadata to guide the interface, but
frontend capability checks are advisory.

The backend remains authoritative.

A platform operation must be rejected when the requested operation is
not supported by the selected platform/account/capability combination.

------------------------------------------------------------------------

## 14. OAuth Architecture

OAuth is backend-managed.

Canonical flow:

``` text
Creator
   |
   v
Frontend
   |
   v
Hono API
   |
   v
Platform Adapter
   |
   v
Provider Authorization URL
   |
   v
External Platform
   |
   v
OAuth Callback
   |
   v
Hono API
   |
   v
Platform Adapter
   |
   v
Secure Credential Handling
   |
   v
Connected Account
```

The browser must never receive:

-   client secrets;
-   provider access tokens;
-   provider refresh tokens;
-   internal encryption keys;
-   Trigger.dev credentials;
-   other private service credentials.

OAuth state, callback validation, CSRF protections, session
authorization, token handling, and ownership checks are governed by the
authentication and security documents.

------------------------------------------------------------------------

## 15. Connected Account Boundary

A Connected Account represents the relationship between a creator and an
external platform account.

Conceptually:

``` text
Creator
   |
   +---- Connected Account
            |
            +---- Platform
            +---- External Account ID
            +---- Connection Status
            +---- Token Metadata
            +---- Capability Metadata
```

Credential material must be isolated from ordinary application data
access.

Normal API responses may expose safe connection metadata but must not
expose provider credentials.

------------------------------------------------------------------------

## 16. Credential Security

Platform credentials are highly sensitive.

The implementation must:

-   keep credentials server-side;
-   encrypt sensitive credential material at rest where appropriate;
-   never return tokens through normal API responses;
-   never place tokens in frontend state;
-   never log access or refresh tokens;
-   never include tokens in user-facing errors;
-   restrict credential access to authorized backend components;
-   refresh or rotate credentials according to provider requirements;
-   revoke credentials when a connection is disconnected or otherwise
    invalidated as required;
-   avoid persisting unnecessary provider credential material.

Adapter code must receive credentials through a controlled backend
mechanism.

------------------------------------------------------------------------

## 17. Publishing Flow

The canonical publishing flow is:

``` text
Creator
   |
   v
Frontend
   |
   v
POST /api/v1/publishing
   |
   v
Hono API
   |
   v
Publishing Service
   |
   +---- Validate authentication
   +---- Validate ownership
   +---- Validate Platform Version
   +---- Validate Publication rules
   +---- Validate Connected Account
   +---- Validate adapter capability
   +---- Persist Publication / PublishingAttempt state
   |
   v
Trigger.dev Task / Run
   |
   v
Publishing Service execution
   |
   v
Platform Adapter
   |
   v
External Platform
   |
   v
Adapter normalizes provider result
   |
   v
PublishingAttempt / Publication state update
```

The frontend never calls a platform API directly.

The frontend never determines that a publication succeeded.

------------------------------------------------------------------------

## 18. Scheduled Publishing

Scheduled publishing is server-driven.

The adapter architecture participates in scheduled publishing, but it
does not own scheduling.

Canonical flow:

``` text
Creator
   |
   v
Schedule Request
   |
   v
Backend Validation
   |
   v
Persist Publication Scheduling State
   |
   v
Create / Reconcile Trigger.dev Scheduled Execution
   |
   v
Trigger.dev Task / Run at scheduled time
   |
   v
Publishing Service
   |
   v
Platform Adapter
   |
   v
External Platform
```

Creator Command Center's PostgreSQL Publication state remains
authoritative.

Trigger.dev execution state is operational infrastructure state.

A platform adapter must not create or own a separate Creator Command
Center schedule entity.

------------------------------------------------------------------------

## 19. Provider-Side Scheduling

Some providers may expose their own scheduling APIs while others may
not.

The adapter must expose provider capability information rather than
assuming provider-side scheduling exists.

For MVP1, Creator Command Center's primary scheduling model is its own
server-driven Publication scheduling and Trigger.dev execution.

If a provider supports provider-side scheduling and the product
explicitly chooses to use it, that behavior must remain inside the
adapter and must preserve the same internal Publication and
PublishingAttempt state model.

Provider-side scheduling must never cause the provider to become the
authoritative source of Creator Command Center's scheduling state.

------------------------------------------------------------------------

## 20. Multi-Platform Publishing

A single user request may target multiple platform versions.

Example:

``` text
Publishing Request
       |
       +---- YouTube Platform Version
       |
       +---- TikTok Platform Version
       |
       +---- Instagram Platform Version
       |
       +---- LinkedIn Platform Version
       |
       +---- X/Twitter Platform Version
```

Each selected platform is evaluated independently.

The system must support:

-   independent validation;
-   independent capability checks;
-   independent PublishingAttempt records;
-   independent provider errors;
-   partial success;
-   independent retry;
-   independent status reporting.

A failure on one platform must not automatically invalidate a successful
publication on another platform.

------------------------------------------------------------------------

## 21. `publishingOperationId`

A multi-platform publishing request may use a logical
`publishingOperationId` to correlate the related Publications and
PublishingAttempt history.

This identifier is:

-   a logical aggregate identifier;
-   useful for request/result correlation;
-   not a Trigger.dev ID;
-   not a separate domain entity;
-   not a replacement for Publication or PublishingAttempt identity.

Authoritative state remains distributed across the relevant Publication
and PublishingAttempt records.

------------------------------------------------------------------------

## 22. Error Normalization

Provider errors must be normalized before crossing the adapter boundary.

Conceptual categories include:

``` text
Provider Error
     |
     v
Adapter Classification
     |
     +---- Authentication Failure
     +---- Authorization Failure
     +---- Validation Failure
     +---- Unsupported Capability
     +---- Unsupported Media
     +---- Rate Limit
     +---- Provider Timeout
     +---- Provider Unavailable
     +---- Provider Processing Failure
     +---- Unknown Provider Error
     |
     v
Normalized Application Error
```

The adapter may retain provider-specific diagnostic metadata internally
where appropriate.

The frontend should receive stable application-level error semantics,
not raw provider payloads.

------------------------------------------------------------------------

## 23. Rate Limits and Backpressure

Provider rate limits are provider-specific concerns.

The adapter is responsible for:

-   recognizing provider rate-limit responses;
-   extracting provider retry information where available;
-   classifying rate-limit failures;
-   returning normalized rate-limit information to the
    publishing/execution layer.

Trigger.dev provides execution infrastructure and concurrency controls.
Creator Command Center must not incorrectly treat Trigger.dev
concurrency as a replacement for provider-specific rate-limit logic.

Provider-aware throttling and backoff must be coordinated with the
execution architecture.

------------------------------------------------------------------------

## 24. Idempotency and Duplicate Protection

Publishing must be safe against duplicate execution where possible.

Idempotency is layered:

``` text
API Request Idempotency
        |
        v
Publication Identity
        |
        v
PublishingAttempt Identity
        |
        v
Trigger.dev Execution Safeguards
        |
        v
Provider Idempotency / Operation Tracking
```

The adapter must use provider-supported idempotency keys, operation
identifiers, or equivalent mechanisms where available.

Where a provider does not support idempotent publishing, Creator Command
Center must rely on its own state checks, attempt tracking,
reconciliation, and provider-specific safeguards to reduce duplicate
publication risk.

An adapter must not blindly issue a second external publish request
merely because a previous request timed out.

------------------------------------------------------------------------

## 25. Unknown Provider Outcome

A provider request may succeed externally while the application fails to
receive the response.

Example:

``` text
Adapter
   |
   v
Provider Publish Request
   |
   v
Provider publishes content
   |
   X---- Response lost / timeout
   |
   v
Application sees unknown outcome
```

The system must not immediately issue a blind duplicate publish.

The adapter and publishing layer should use provider status lookup or
provider operation identifiers where available.

The result should be reconciled into the corresponding PublishingAttempt
and Publication state.

------------------------------------------------------------------------

## 26. Publishing Status

Provider status semantics differ.

The adapter translates provider-specific states into the internal
publishing model.

The internal model distinguishes:

-   PublicationStatus;
-   PublishingAttemptStatus;
-   provider-specific status metadata.

The adapter must not map provider status directly into ContentStatus.

Content lifecycle and publishing lifecycle remain separate.

------------------------------------------------------------------------

## 27. Partial Multi-Platform Failure

Example:

``` text
Request
  |
  +---- YouTube ---- SUCCESS
  |
  +---- TikTok ----- SUCCESS
  |
  +---- Instagram -- FAILED
  |
  +---- LinkedIn --- SUCCESS
```

The application must preserve each result independently.

The creator must be able to see:

-   which platforms succeeded;
-   which failed;
-   why a platform failed when known;
-   whether the platform is retryable;
-   whether the platform requires reconnection;
-   whether the Publication is eligible for retry.

Retry must target the failed/ineligible Publication(s), not blindly
republish successful Publications.

------------------------------------------------------------------------

## 28. Retry Behavior

Retry is Publication-oriented.

Canonical retry:

``` text
Failed Publication
       |
       v
POST /api/v1/publications/:publicationId/retry
       |
       v
Validate eligibility
       |
       v
Create new PublishingAttempt
       |
       v
Create / reconcile Trigger.dev execution
       |
       v
Platform Adapter
```

The previous PublishingAttempt remains historical.

A retry must not erase or overwrite prior attempt history.

A successful Publication must not be retried unless a distinct,
explicitly authorized product operation permits it.

------------------------------------------------------------------------

## 29. Platform-Specific Media Handling

The adapter is responsible for translating media requirements for the
provider.

The adapter may validate:

-   file type;
-   MIME type;
-   duration;
-   dimensions;
-   aspect ratio;
-   file size;
-   codec;
-   audio requirements;
-   provider-specific media metadata.

The adapter should reject unsupported media before an unnecessary
provider API request whenever the requirement can be validated locally.

MVP1 uses temporary/required media handling rather than a permanent
creator media warehouse.

Adapters should avoid unnecessary media duplication and proxying when
secure direct transfer or provider-supported transfer is possible.

------------------------------------------------------------------------

## 30. Platform-Specific Metadata

Platform Versions may contain metadata that differs by provider.

Examples:

``` text
Common Content
      |
      +---- YouTube
      |      +-- Title
      |      +-- Description
      |      +-- Tags
      |
      +---- Instagram
      |      +-- Caption
      |      +-- Hashtags
      |
      +---- TikTok
      |      +-- Caption
      |      +-- Privacy / provider fields
      |
      +---- LinkedIn
             +-- Post text
             +-- Provider-specific metadata
```

The adapter translates internal Platform Version fields into provider
payloads.

Provider-specific fields must not leak into the generic Content model
merely because one platform requires them.

------------------------------------------------------------------------

## 31. Analytics Boundary

Basic analytics is an MVP1 capability, but analytics provider
differences remain adapter concerns.

An adapter may expose provider-specific analytics retrieval or
normalization capabilities.

The analytics domain owns:

-   storage of normalized analytics data;
-   aggregation;
-   dashboard presentation;
-   retention rules;
-   analytics business logic.

Provider APIs remain external dependencies.

The absence of a provider analytics capability must not be represented
as fabricated data.

------------------------------------------------------------------------

## 32. Platform Connection Lifecycle

A platform connection can move through states such as:

``` text
DISCONNECTED
     |
     v
CONNECTING
     |
     v
CONNECTED
     |
     +----> REAUTH_REQUIRED
     |
     +----> ERROR
     |
     v
DISCONNECTED
```

Exact application statuses are governed by the database and API
contracts.

The adapter is responsible for translating provider
authentication/connection conditions into the internal connection model.

------------------------------------------------------------------------

## 33. Token Refresh

Token refresh is backend-only.

Canonical flow:

``` text
Trigger.dev Task / Run or API operation
             |
             v
Platform Adapter
             |
             v
Token Validation
             |
        expired?
        /     \
      no       yes
      |         |
      v         v
Continue   Refresh Provider Token
                |
                v
        Secure Credential Update
                |
                v
             Continue
```

Refresh behavior must be idempotent and safe against concurrent refresh
attempts where the provider requires serialization.

Repeated refresh failures must be classified clearly so the creator can
reconnect the platform account.

------------------------------------------------------------------------

## 34. Adapter State and PostgreSQL Authority

Adapters may observe provider state, but PostgreSQL remains the
authoritative source for Creator Command Center business state.

The adapter must not treat provider state as a replacement for:

-   Publication;
-   PublishingAttempt;
-   platform connection state;
-   Content state;
-   ownership;
-   scheduling state.

Provider identifiers and provider status values are integration metadata
used to reconcile external state.

------------------------------------------------------------------------

## 35. Trigger.dev Boundary

Trigger.dev is the MVP1 background execution layer.

The adapter is not a Trigger.dev task itself.

The separation is:

``` text
Trigger.dev Task / Run
        |
        v
Publishing Execution
        |
        v
Publishing Service
        |
        v
Platform Adapter
        |
        v
Provider API
```

Trigger.dev owns execution infrastructure concerns such as:

-   task execution;
-   retries;
-   concurrency;
-   schedules;
-   execution observability.

Creator Command Center owns domain state and business rules.

The adapter owns provider behavior.

There is no Creator Command Center-owned BullMQ queue or Redis queue in
this architecture.

------------------------------------------------------------------------

## 36. Adapter Observability

Adapters must emit structured operational information sufficient to
diagnose provider failures without exposing secrets.

Useful fields include:

-   platform;
-   operation type;
-   Publication ID;
-   PublishingAttempt ID;
-   connected-account identifier;
-   provider operation/reference ID where safe;
-   normalized result;
-   normalized error category;
-   HTTP/provider status where appropriate;
-   latency;
-   retry classification;
-   rate-limit metadata where safe.

Never log:

-   access tokens;
-   refresh tokens;
-   client secrets;
-   authorization codes;
-   session credentials;
-   sensitive raw provider payloads containing secrets.

------------------------------------------------------------------------

## 37. Testing Strategy

Every adapter must support isolated tests using provider mocks or test
environments where available.

### Unit Tests

Test:

-   capability definitions;
-   payload mapping;
-   response parsing;
-   error classification;
-   status mapping;
-   media validation;
-   provider-specific validation;
-   idempotency behavior;
-   token refresh logic.

### Integration Tests

Test:

-   OAuth callback handling;
-   credential storage integration;
-   provider API requests;
-   provider authentication;
-   publishing;
-   status lookup;
-   provider failure handling;
-   rate-limit handling.

### Contract Tests

Each adapter must satisfy the common internal contract.

Contract tests should verify that required operations return the
expected internal structures and normalized error categories.

### End-to-End Tests

MVP1 E2E coverage must parameterize the publishing journey over the
approved launch set of at least five platforms.

The E2E journey should include:

``` text
Create Content
    |
Create Platform Version
    |
Connect Platform Account
    |
Validate Capability
    |
Create Publication
    |
Schedule / Publish
    |
Trigger.dev Task / Run
    |
Adapter
    |
Provider
    |
PublishingAttempt Result
    |
Dashboard / Publishing History
```

------------------------------------------------------------------------

## 38. Five-Platform MVP1 Requirement

MVP1 must launch with at least **five supported major platforms**.

The implementation must not be treated as complete merely because three
illustrative adapters work.

The approved launch set must be explicitly recorded in implementation
configuration and tested as a set.

For each launch platform, implementation must include:

-   adapter;
-   capability definition;
-   OAuth/connection flow where supported;
-   connected-account handling;
-   Platform Version support;
-   publish flow;
-   status handling;
-   error normalization;
-   rate-limit handling;
-   idempotency safeguards where available;
-   automated tests;
-   documentation of provider limitations.

If a named platform cannot support a required MVP1 operation because of
provider/API restrictions, that platform must not be represented as
fully supported merely for UI completeness. The final launch set must
contain at least five platforms that satisfy the approved MVP1
publishing requirements.

------------------------------------------------------------------------

## 39. Adding a New Platform

The implementation sequence for a new platform is:

1.  Register platform configuration.
2.  Define capabilities.
3.  Implement OAuth/connection behavior.
4.  Implement secure credential handling.
5.  Implement adapter contract.
6.  Implement Platform Version mapping.
7.  Implement media validation.
8.  Implement publish operation.
9.  Implement provider-status retrieval.
10. Implement provider-error normalization.
11. Implement rate-limit behavior.
12. Implement idempotency/reconciliation safeguards.
13. Add unit and contract tests.
14. Add integration tests where provider access permits.
15. Add E2E coverage.
16. Document provider limitations.

The goal is additive platform development rather than modification of
core publishing architecture.

------------------------------------------------------------------------

## 40. Platform Adapter Directory Boundary

The backend source tree should isolate provider implementations from
domain services.

Conceptually:

``` text
src/
└── back-end/
    ├── domain/
    │   ├── content/
    │   ├── publications/
    │   ├── publishing/
    │   └── ...
    │
    ├── services/
    │   ├── publishing/
    │   ├── platforms/
    │   │   ├── platform-adapter.ts
    │   │   ├── capabilities/
    │   │   └── adapters/
    │   │       ├── youtube/
    │   │       ├── instagram/
    │   │       ├── tiktok/
    │   │       └── ...
    │   └── ...
    │
    └── infrastructure/
```

The exact folder naming may follow the final Backend Architecture
Specification, but the architectural boundary must remain.

------------------------------------------------------------------------

## 41. Dependency Rules

### Allowed

``` text
Publishing Service
      |
      v
Adapter Contract
      |
      v
Provider Adapter
      |
      v
Provider SDK / HTTP API
```

### Not Allowed

``` text
Content Service
      |
      v
YouTube SDK
```

``` text
Frontend
      |
      v
Instagram API
```

``` text
Dashboard
      |
      v
TikTok API
```

``` text
Platform Adapter
      |
      v
Direct unrelated database mutations
```

The adapter boundary is an architectural enforcement point, not merely a
folder organization preference.

------------------------------------------------------------------------

## 42. Provider SDK Usage

Provider SDKs may be used inside the corresponding adapter when they
improve reliability or maintainability.

Provider SDKs must not leak through the adapter boundary.

Core domain code should depend on Creator Command Center contracts, not
provider SDK types.

This prevents provider SDK types from becoming accidental
application-wide dependencies.

------------------------------------------------------------------------

## 43. Security Requirements

The adapter architecture must comply with the Security Baseline and
Authentication Strategy.

Required controls include:

-   backend-only provider credentials;
-   OAuth state validation;
-   CSRF protection;
-   secure callback handling;
-   ownership enforcement;
-   encrypted sensitive credential storage where appropriate;
-   secret redaction;
-   secure error handling;
-   audit logging for security-sensitive connection operations;
-   replay protection where applicable;
-   no frontend access to provider tokens.

External provider responses must be treated as untrusted input.

------------------------------------------------------------------------

## 44. Reliability Requirements

Adapters must assume provider APIs can:

-   timeout;
-   reject requests;
-   rate-limit;
-   become unavailable;
-   return malformed/unexpected responses;
-   invalidate credentials;
-   change behavior;
-   process requests asynchronously;
-   return an unknown outcome after accepting an operation.

Reliability is therefore achieved through:

-   normalized error classification;
-   bounded retries;
-   idempotency;
-   PublishingAttempt history;
-   provider-status reconciliation;
-   Trigger.dev execution safeguards;
-   platform-aware backoff;
-   connection reauthorization;
-   safe partial-failure handling.

------------------------------------------------------------------------

## 45. Failure Matrix

  -----------------------------------------------------------------------
  Failure                 Adapter Response        Application Behavior
  ----------------------- ----------------------- -----------------------
  Invalid credentials     Normalize               Mark connection
                          authentication failure  appropriately; require
                                                  reauth where applicable

  Provider authorization  Normalize authorization Preserve failed
  failure                 failure                 attempt; show
                                                  actionable error

  Unsupported post type   Normalize               Do not retry blindly
                          validation/capability   
                          failure                 

  Unsupported media       Normalize validation    Correct
                          failure                 content/platform
                                                  version

  Rate limit              Return normalized       Backoff/retry according
                          rate-limit metadata     to policy

  Provider timeout        Classify as             Reconcile before
                          uncertain/retryable     duplicate publish
                          where appropriate       

  Provider unavailable    Normalize availability  Retry according to
                          failure                 policy

  Async processing        Return provider         Poll/reconcile as
                          reference/status        required

  Unknown provider        Normalize safely        Preserve diagnostic
  response                                        context; avoid unsafe
                                                  state transition

  Token refresh failure   Normalize connection    Require reconnection
                          failure                 where appropriate
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 46. Data Mapping Rules

Adapters translate between two models:

``` text
Creator Command Center Internal Model
              |
              v
        Platform Adapter
              |
              v
Provider Request / Response Model
```

The mapping must be explicit.

The adapter should not simply pass an entire Prisma model or arbitrary
database object to a provider SDK.

Inputs should be purpose-built DTOs or internal contract types.

Outputs should be normalized result types.

------------------------------------------------------------------------

## 47. No Raw Provider Response Leakage

Raw provider responses must remain inside the integration boundary
unless a deliberately designed diagnostic field is required.

The frontend must never depend on provider JSON structures.

This prevents provider API changes from forcing UI changes.

If provider-specific metadata must be retained, it should be explicitly
modeled as integration metadata rather than silently passed through the
system.

------------------------------------------------------------------------

## 48. Provider API Version Changes

Provider API changes must be isolated within the corresponding adapter
whenever possible.

When a provider changes:

1.  identify affected adapter behavior;
2.  update provider client/API mapping;
3.  update capability definitions;
4.  update error/status mapping;
5.  update adapter tests;
6.  verify Publishing Service contract remains unchanged;
7.  verify Publication and PublishingAttempt state transitions remain
    unchanged;
8.  deploy through the standard release process.

Core domain redesign should not be the default response to a provider
API change.

------------------------------------------------------------------------

## 49. Architecture for Future Platforms

Future platform support should follow the same pattern:

``` text
New Provider
    |
    +---- Adapter
    +---- Capability Definition
    +---- Connection/OAuth
    +---- Platform Version Mapping
    +---- Publishing Mapping
    +---- Status Mapping
    +---- Error Mapping
    +---- Tests
```

The architecture should make a new provider an incremental integration
task rather than a core-system rewrite.

------------------------------------------------------------------------

## 50. MVP1 Boundary

MVP1 adapter architecture includes:

-   platform connections;
-   OAuth;
-   Platform Versions;
-   capability validation;
-   publishing;
-   scheduling participation;
-   publishing status;
-   publishing history;
-   retries;
-   multi-platform publishing;
-   basic analytics integration where provider APIs permit;
-   reliability and idempotency safeguards;
-   at least five supported major platforms.

MVP1 does not include:

-   AI content adaptation;
-   AI repurposing;
-   AI clipping;
-   AI video editing;
-   AI analytics/predictions;
-   livestream infrastructure;
-   team collaboration infrastructure.

Those belong to later MVP stages and must not be implemented prematurely
because an adapter exists.

------------------------------------------------------------------------

## 51. Relationship to Other Documents

This ADR must remain synchronized with:

-   Product Requirements Document;
-   MVP Definition & Scope;
-   MVP Feature Matrix;
-   MVP Sitemap;
-   Backend Architecture Specification;
-   System Architecture Document;
-   Database Design Document;
-   API Documentation;
-   Reliability & Error Handling Specification;
-   Security Baseline;
-   Testing Strategy;
-   Execution Plan;
-   ADR-001 --- Authentication Strategy;
-   ADR-008 --- Deployment Strategy;
-   ADR-009 --- Trigger.dev Execution Architecture.

If another document conflicts with this ADR on platform isolation,
capability handling, provider credentials, adapter boundaries, or
provider-specific behavior, the architecture must be reconciled before
implementation proceeds.

------------------------------------------------------------------------

## 52. Decision Consequences

### Positive

-   Platform-specific complexity remains isolated.
-   Provider integrations become easier to test.
-   Adding platforms is more manageable.
-   Provider errors can be normalized.
-   Core business logic remains platform-agnostic.
-   Partial multi-platform success is easier to model.
-   Provider API changes have a smaller blast radius.
-   Credentials have a clear security boundary.

### Negative

-   Adapter contracts require maintenance.
-   Some platforms require explicit provider-specific behavior.
-   Capability models can become detailed.
-   Provider integration testing can require external accounts or
    sandbox environments.
-   Over-abstraction can hide meaningful provider differences if the
    contract is designed poorly.

------------------------------------------------------------------------

## 53. Architectural Principles

The following principles are mandatory:

1.  **Provider APIs stay behind adapters.**
2.  **The core domain remains provider-agnostic.**
3.  **Capabilities are explicit.**
4.  **Provider differences are not artificially erased.**
5.  **PostgreSQL remains authoritative for Creator Command Center
    business state.**
6.  **Publication owns scheduling state.**
7.  **PublishingAttempt preserves attempt history.**
8.  **Trigger.dev owns execution infrastructure, not business state.**
9.  **Credentials remain server-side.**
10. **The frontend never publishes directly to providers.**
11. **Provider errors are normalized before crossing the adapter
    boundary.**
12. **Publishing is protected by layered idempotency.**
13. **Multi-platform publishing preserves independent platform
    outcomes.**
14. **Retries target eligible Publications and create new
    PublishingAttempts.**
15. **A new platform should be additive rather than architectural.**

------------------------------------------------------------------------

## 54. Final Decision

Creator Command Center will use **one dedicated adapter per supported
platform behind a stable internal Platform Adapter Contract**.

The adapter boundary is the exclusive integration boundary between the
provider-agnostic publishing domain and external social-platform APIs.

The architecture preserves:

``` text
Core Domain
    |
    v
Publishing Service
    |
    v
Platform Adapter Contract
    |
    +---- Provider Adapters
    |
    v
External Platforms
```

This decision is **FINAL / LOCKED for MVP1**.

The implementation team should proceed with platform adapters,
capability definitions, provider connection flows, Platform Version
mappings, publishing operations, status normalization, error
normalization, idempotency safeguards, and tests without redesigning the
core domain around any single provider.
