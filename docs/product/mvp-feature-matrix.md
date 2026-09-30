# MVP Feature Matrix — Detailed Action-Level Implementation Baseline

**Product:** Creator Command Center  
**Document:** MVP Feature Matrix  
**Version:** MVP-FM v2.4
**Status:** Final / Locked
**Last Updated:** September 2026
**Purpose:** Authoritative MVP allocation plus action-level implementation task board.

| **Feature**                  | **Priority** | **Primary Owner** | **Frontend** | **Backend** | **Database** | **DevOps** | **Testing** |
|-------------------------------|--------------|-------------------|--------------|-------------|--------------|------------|-------------|
| Authentication                | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Creator Onboarding             | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Planning / Ideas      | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Production Planning           | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Shooting Checklist             | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Publication Domain             | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Platform Adapter Contract      | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| 5+ Platform Launch Set         | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Reconciliation                 | MVP1 Required           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Content                       | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Organization          | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Search/Filtering      | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Status/Pipeline       | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Relationships         | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Platform Versions             | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Social Platform Accounts      | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| OAuth / Token Security        | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Media Management              | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Scheduling                    | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Calendar UI (supporting Scheduling) | MVP1 Required     | Justice           | Justice      | Eric        | Eric         | Trust      | All         |
| Background Execution               | MVP1 Required           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Execution Engine              | MVP1 Required           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Publishing                    | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Per-Platform Results          | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Partial Publishing Success    | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Failed-Platform Retry         | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Publishing History            | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Tasks                         | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Ownership Isolation           | MVP1 Required           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Validation                    | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Reliability / Error Handling  | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Idempotency                   | MVP1 Required           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Dashboard Enhancements        | MVP1 Required           | Justice           | Justice      | Eric        | Eric         | Trust      | All         |
| Notifications                 | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Basic Analytics               | MVP1 Required           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Basic Platform Preview        | MVP1 Required           | Justice           | Justice      | Eric        | —            | —          | All         |

**Summary-table scope:** This allocation table covers the MVP1 product capabilities and the critical technical capabilities that must be owned explicitly. The detailed action-level sections below remain authoritative for implementation tasks, dependencies, tests, and cross-cutting controls.

---

# MVP Allocation — Locked Roadmap

## MVP1 Required — Core Creator Operations

**All capabilities below are required. There is no priority tiers distinction within MVP1 Required.**

- Account / onboarding
- Dashboard
- Content management
- Content organization
- Search and filtering
- Content pipeline
- Content relationships
- Content planning / ideas
- Calendar
- Tasks
- Creator profile / preferences
- Platform connections / OAuth
- Platform-specific versions
- Multi-platform publishing to at least five major platforms
- Immediate publishing
- Scheduling
- Rescheduling
- Cancellation
- Background execution
- Trigger.dev Task / Run execution
- Idempotency / duplicate protection
- Retry / failure handling
- Publishing history / status
- Notifications
- Basic analytics / performance
- Basic platform preview
- Manual production planning
- Shooting checklist
- Required temporary media handling
- Required reliability, security, and testing controls

## MVP2 — Creator Business & Engagement

The following are **not implemented during MVP1 Required**:

- Projects
- Multi-brand management
- Multiple accounts on the same platform
- Social inbox
- Comment management
- Campaigns
- Collaborations
- Sponsorship management
- Revenue tracking
- Advanced analytics
- Advanced organization / saved views
- External calendar synchronization
- Recurring tasks
- Advanced publishing recovery
- Business dashboard

During MVP1 Required, approved MVP2 capabilities may appear only as non-functional **Coming Soon** UI states.

## MVP3 — AI Creator Intelligence

The following are **not implemented during MVP1 Required or MVP2**:

- AI Brand Model
- AI Brand Assistant
- AI content ideas
- AI scripting
- AI hooks
- AI captions
- AI thumbnail ideas / generation
- AI content adaptation
- AI repurposing
- AI clipping
- AI video editing
- AI shooting assistance
- AI analytics / predictions / recommendations
- Creator-controlled AI automation with approval checkpoints
- AI reply / moderation assistance

MVP3 capabilities must not be presented as Coming Soon during MVP1 Required.

## MVP4 — Live Creator Infrastructure

The following are **not implemented during MVP1 Required–MVP3**:

- Multi-platform livestreaming
- Live dashboard
- Live monitoring
- Live chat
- Live moderation
- Live analytics
- Live recording / replay
- Live platform status / reconnection

MVP4 capabilities must not be presented as Coming Soon during MVP1 Required.

## Later / Not Planned

- Team collaboration / roles / permissions
- Creator CRM
- Full financial / accounting system
- Permanent creator media library
- Professional media editor
- Enterprise features
- Full bookkeeping / tax / bank integrations

## Sequential Coming Soon Rule

| Active Stage | What may be shown as Coming Soon |
|---|---|
| MVP1 Required | Approved MVP2 only |
| MVP2 | Approved MVP3 only |
| MVP3 | Approved MVP4 only |
| MVP4 | Only a formally approved next-stage capability |

Coming Soon is a UI availability state only. It must not create future APIs, database entities, background executions, integrations, services, business logic, or hidden activation paths.

---

# Current Architecture Guardrails

These rules apply to every detailed task in this document.

1. **Frontend:** Next.js + TypeScript.
2. **Backend:** Hono + TypeScript.
3. **Database:** PostgreSQL + Prisma.
4. **Validation:** Zod.
5. **Authentication:** server-managed sessions; browser credentials use appropriately configured HTTP-only cookies.
6. **Execution:** Trigger.dev Tasks / Runs.
7. **Storage:** Cloudflare R2 only for temporary/required media handling; it is not a permanent creator media library.
8. **Backend authority:** PostgreSQL is the authoritative source of persistent business state.
9. **Publishing hierarchy:** Content → ContentVersion / Platform Version → Publication → PublishingAttempt.
10. **Scheduling:** Publication owns scheduling state. There is no standalone Schedule entity. Publication is a required Creator CC domain entity and owns scheduling state.
11. **Execution state:** Trigger.dev execution identifiers and runtime state are operational metadata, not the source of business truth.
12. **Frontend boundary:** The frontend never directly accesses PostgreSQL, Trigger.dev, private OAuth credentials, social-platform APIs, or private R2 credentials.
13. **AI:** AI is outside the MVP1 Required core workflow.
14. **No future infrastructure:** Do not implement MVP2–MVP4 infrastructure early merely because it will eventually be useful.

---

---

# P0 Architecture Corrections — Authoritative Implementation Rules

## P0.1 Publication-Owned Scheduling

Scheduling is a property of the **Publication** domain resource. The MVP1 application must not create or operate a standalone `Schedule` entity, `Schedule` table, Schedule status machine, or Schedule ID. Publication status, Publication IDs, and `/api/v1/publications` are required Creator CC domain/API resources.

Canonical scheduling model:

**Content → ContentVersion → Publication → PublishingAttempt**

A Publication contains the scheduling state required by the API/database contract, including the scheduled time and timezone where applicable. Trigger.dev is execution infrastructure only. Trigger.dev execution identifiers are operational metadata and must not become Creator CC scheduling resources.

Locked MVP1 scheduling contract:

- `POST /api/v1/publications`
- `GET /api/v1/publications/:publicationId`
- `GET /api/v1/publications`
- `POST /api/v1/publications/:publicationId/cancel`
- `PATCH /api/v1/publications/:publicationId` for rescheduling

Any implementation task in this matrix that refers to an application-level Schedule must be interpreted as a Publication scheduling task and corrected before implementation.

## P0.2 Strict State Ownership

The implementation must preserve separate state machines.

**Content lifecycle:**

`IDEA → DRAFT → READY → SCHEDULED → PUBLISHED`

**Publication / publishing lifecycle:**

`SCHEDULED → PUBLISHING → PUBLISHED`

with `FAILED` and `CANCELLED` as Publication/publishing states.

**PublishingAttempt:**

Represents an individual provider execution attempt and its execution result/history.

`PUBLISHING`, `FAILED`, and `CANCELLED` must not be added to `ContentStatus`. A failed publication must not mutate `Content.status` to `FAILED`.

The UI may display content and publication states together for operational clarity, but frontend/backend implementations must preserve the authoritative state-machine boundaries.

# State Ownership — Non-Negotiable

**ContentStatus:** `IDEA`, `DRAFT`, `READY`, `SCHEDULED`, `PUBLISHED`

**PublicationStatus:** `SCHEDULED`, `PUBLISHING`, `PUBLISHED`, `FAILED`, `CANCELLED`

**PublishingAttemptStatus:** the individual provider execution-attempt state defined by the API/Database contract; it records execution history and must not be replaced by PublicationStatus.

Rules:
- `PUBLISHING`, `FAILED`, and `CANCELLED` are not ContentStatus values.
- A failed Publication does not mean `Content.status = FAILED`.
- A cancelled Publication does not mean `Content.status = CANCELLED`.
- UI may display Content and Publication information together, but must preserve the backend state-machine ownership.
- Retry operates on a Publication and creates a new PublishingAttempt while preserving historical attempts.
- Each platform target remains its own Publication.

# Feature Breakdown (Action-Level)

**Audience:** Eric (Backend + Database + Primary Owner), Justice (Frontend), Trust (DevOps), All (Testing)
**Rule:** If you have not read the cited document section, stop and read it before writing code. Do not invent behavior that is not in the approved documentation.
**Verb rule:** Every task starts with an action. “Content list” is not a task. “Create the content list page” is a task.

**Team**

| Person | Role |
|---|---|
| Eric | Primary owner for most MVP1 Required features. Backend, database, domain rules, APIs, Trigger.dev Tasks / Runs. |
| Justice | Frontend. Pages, components, states, accessibility, calendar, dashboard, preview. |
| Trust | DevOps. Environments, Trigger.dev execution, R2, secrets, CI, deployment. |
| All | Testing. Eric writes Jest unit + integration. Justice writes Jest component tests. Trust writes infra tests only when the feature owns Trigger.dev/R2/Trigger.dev Tasks / Runs. |

**Priority**

- **MVP1 Required** — MVP cannot ship without it
- **MVP1 Required** — Release requirement; implementation sequencing may place this after the core publishing path, but it remains required before MVP1 release.

**Status of every task below:** Backlog until pulled.

---

## How to use this document

1. Open the feature you are assigned.
2. Read the **Read before starting** documents and sections.
3. If **Write this document first** is listed, that document does not exist yet. Write and approve it before implementation.
4. Do your role’s tasks only. Do not silently take another person’s work, and do not skip your own.
5. Do not start a later feature until its **Depends on** features are done enough to integrate.
6. Mark a feature done only when **Acceptance criteria** and the Jest unit + integration cases on that feature pass in CI. Happy-path clicking is not enough.

**Documentation hierarchy (do not skip):**

Product Vision & Problem Definition
→ PRD
→ MVP Definition & Scope
→ MVP — Frontend + Backend / MVP Frontend / MVP Backend
→ User Experience Specification
→ Frontend Architecture Specification / Backend Architecture Document
→ Database Design Document
→ API Documentation
→ Execution Plan
→ Feature / technical implementation documents
→ Testing
→ Deployment
→ Release

---

# Testing standard (Jest)

Use **Jest** for unit tests and integration tests. Do not mark a feature done because the happy path was clicked in the browser.

**Who writes which tests**

| Person | Writes | Location (convention) |
|---|---|---|
| Eric | Domain/unit tests for services, state machines, validators, adapters | `*.spec.ts` next to the code |
| Eric | HTTP + database integration tests | `*.int.spec.ts` (HTTP integration harness + real test PostgreSQL) |
| Justice | Component and hook tests with React Testing Library | `*.spec.tsx` |
| Trust | Infra tests only when the feature owns Trigger.dev, R2, Trigger.dev Tasks / Runs, or health checks | `*.int.spec.ts` in the execution/infra package |
| All | The vertical-slice integration cases listed on that feature | Same Jest suites; run in CI |

**What “integration” means here:** the test boots the Hono API (or the Trigger.dev Task / Run), hits the real route, and uses a real test Postgres. Mock **external** social APIs. Do not mock your own database for integration tests.

**Only test a failure mode when that feature can actually hit it.** Do not copy the full list onto every feature.

| Failure mode | Write it when |
|---|---|
| Empty input / missing fields / malformed JSON | The feature accepts a request body or form |
| ID does not exist | The feature loads a resource by id |
| Unauthenticated | The feature has a protected route (almost all of them) |
| Authenticated but not authorized (another user’s id) | The feature loads a user-owned resource |
| Expired / invalid session | The feature is behind auth |
| Duplicate request | The operation has a side effect that must not run twice (publish, schedule, OAuth callback, complete-task, mark-read) |
| Two requests at once | Two writers can corrupt state (status transition, unique version, token refresh, Trigger.dev execution) |
| Database unavailable | The feature reads/writes Postgres (assert 5xx + no partial commit, not a crash loop) |
| External API unexpected response | The feature calls each approved MVP1 launch platform (five or more) / R2 / OAuth |
| Invalid enum / out-of-range / huge payload | The field exists on that endpoint |
| Trigger.dev unavailable | Background executions and scheduling; rate limiting remains an application/platform responsibility |

**Do not write** payment-failure tests. This product has no payments in MVP.

**Do not write** “quantity = 0” tests unless the field exists. Content has no quantity. Tasks have no quantity. Publishing has a list of version ids — empty list is the equivalent.

**Frontend Jest** proves the UI: empty/error/loading, disabled submit, that 401 sends the user to login, that 403/404 does not leak another user’s data, that 202 is not shown as success. It does not replace Eric’s API tests.

**CI rule:** `npm test` (Jest unit) and `npm run test:int` (Jest integration) must pass before a feature is moved to Done.

---

# 1. Authentication

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Project foundation, database foundation, API foundation
**Phase:** Foundation

**Why this exists:** Nothing else in the product is usable without an authenticated creator account. Protected resources must require a real session. See **MVP Definition & Scope — §7.1 Authentication**.

**Read before starting:**
- **MVP Definition & Scope** — §7.1 Authentication
- **User Experience Specification** — §9 Authentication UX, §9.1 Registration, §10 Login, §11 Password Reset
- **Backend Architecture Document** — §8 Authentication Architecture, §9 Authentication Security, §10 Authorization
- **Database Design Document** — §7 User Entity, §8 User Fields, §9 User Constraints, §10 Account Status, §73 Account Deletion
- **API Documentation** — §6 Authentication through §12 User Profile API, §55 Account Deletion, §76 Rate Limiting
- **Frontend Architecture Specification** — §8 Route Protection, §63–§65 Frontend Security
- **System Architecture Document** — §15 Authentication Architecture, §16 Authorization Architecture, §17 User Data Boundary

**Write this document first (if it does not already exist):**
- **Security Document** — before and during this work. Cover password hashing, sessions, cookies, CSRF, rate limits, account enumeration, password-reset tokens, account deletion.

### Justice — Frontend
- Create the registration page at `/register` with email, password, confirm-password, display name, validation errors, loading state, and success redirect.
- Create the login page at `/login` with email, password, “forgot password” link, invalid-credential error, loading state, and redirect to the app after success.
- Create the password-reset request page and the password-reset confirmation page, including expired-token and invalid-token states.
- Create session loading / restoring state so the app does not flash protected pages before the session is known.
- Create logout in the global header and in Settings, and clear client session state after the backend confirms logout.
- Create protected-route guards so unauthenticated users cannot open Dashboard, Content, Calendar, Pipeline, Tasks, Platforms, Publishing, Platforms, or Settings; basic analytics are surfaced through approved Dashboard/Content/Publishing experiences.
- Create the onboarding-gate so a logged-in creator who has not finished onboarding cannot skip into the main app. See **Frontend Architecture Specification — §9 Onboarding Route Protection**.
- Create authentication error states that do not reveal whether an email exists (no account-enumeration copy).
- Create account/session expiry handling: if the session is invalid, send the creator to login without losing the intended destination where practical.
- Do not store passwords, tokens, or session secrets in `localStorage`. Follow **Frontend Architecture Specification — §64 Authentication Security**.

### Eric — Backend
- Implement `POST /api/v1/auth/register` with email normalization, uniqueness, password policy, and password hashing. Never store plaintext passwords.
- Implement `POST /api/v1/auth/login` with hashed-password verification, session creation, and generic invalid-credential errors.
- Implement `POST /api/v1/auth/logout` that invalidates the server session.
- Implement `GET /api/v1/auth/me` (current session) that returns the authenticated user and never returns `passwordHash`.
- Implement password-reset request and confirm endpoints with single-use, expiring tokens. See **API Documentation — §11 Password Reset**.
- Implement authentication middleware that extracts and verifies the session on every protected route.
- Implement authorization foundation so later features can check `resource.userId === authenticatedUser.id`.
- Implement rate limiting on register, login, and password-reset endpoints. See **API Documentation — §76 Rate Limiting** and **Backend Architecture Document — §47 Rate Limiting**.
- Implement input validation at the API boundary before any database write.
- Implement account deletion per **API Documentation — §55** and **Database Design Document — §73**. Do not leave orphaned auth secrets.
- Never log passwords, reset tokens, or session secrets. See **Backend Architecture Document — §9 Authentication Security**.

### Eric — Database
- Create the `User` entity with `id` (UUID), `email` (unique, normalized), `passwordHash`, `name`, `timezone`, `status`, `createdAt`, `updatedAt`, `deletedAt`. See **Database Design Document — §7–§10**.
- Create the `CreatorProfile` entity with `userId`, `creatorType`, onboarding fields, timestamps. See **Database Design Document — §11 Creator Profile**.
- Create required unique index on `User.email`.
- Create account-status enum: `ACTIVE`, `SUSPENDED`, `DELETED`.
- Create ownership relationship foundation: every later creator-owned table will foreign-key to `User.id`.
- Do not store plaintext passwords. Do not expose `passwordHash` through any query used by API responses.

### Trust — DevOps
- Provision the application environment variables for session secrets, password-hashing configuration, and cookie flags. Secrets must not be committed.
- Configure HTTPS / secure cookie flags for staging and production.
- Configure application/API rate limiting using the approved application/platform mechanism; Trigger.dev concurrency is execution control, not the authentication rate-limit store. so auth rate limits survive multiple API instances.
- Add health-check and log-redaction so auth secrets never appear in logs or APM.
- Add CI secret scanning for this feature’s credentials.

### Testing (Jest)

Write these. Do not skip a case because “it should never happen”.

**Eric — unit (`auth.service.spec.ts`, `password.spec.ts`)**
- Hash a password and verify the hash matches; plaintext is never returned.
- Reject empty email, empty password, whitespace-only email.
- Reject weak password per the Security Document policy.
- Normalize email so `Eric@X.com` and `eric@x.com` collide on uniqueness.
- Generate a reset token that expires; reject it after TTL; reject it on second use.

**Eric — integration (`auth.int.spec.ts`)**
Hit the real HTTP routes against the test database:
- `POST /api/v1/auth/register` happy path → 201, user row exists, `passwordHash` absent from JSON.
- Empty body → 400.
- Missing `email` / missing `password` → 400 field errors.
- Malformed JSON → 400.
- Invalid email format → 400.
- Duplicate email → 409 (or the documented status), no second user row.
- `POST /api/v1/auth/login` valid credentials → session established.
- Wrong password → 401 generic error (do not say “email not found”).
- Unknown email → same generic 401 (no account enumeration).
- `GET /api/v1/auth/me` with no cookie/token → 401.
- `GET /api/v1/auth/me` with expired session → 401.
- `GET /api/v1/auth/me` with malformed token → 401.
- `POST /api/v1/auth/logout` then `GET /api/v1/auth/me` → 401.
- Password-reset with unknown email does not leak existence.
- Password-reset with expired token → 400.
- Password-reset token reused → 400.
- Rapid login attempts trip rate limit → 429.
- Duplicate simultaneous register of the same email: exactly one user row.
- Database unavailable: 503/500, process does not crash, no partial user row.

**Justice — component (`RegisterForm.spec.tsx`, `LoginForm.spec.tsx`, `AuthGuard.spec.tsx`)**
- Submit empty form: inline errors, no API call.
- API 400 field errors render on the matching inputs.
- API 401 on login shows the generic error, not “user does not exist”.
- Protected route with no session redirects to `/login`.
- Expired session on a data fetch redirects to `/login`.
- Logout button calls logout and then cannot open `/content`.

**Trust — infra**
- Application rate-limit dependency unavailable: auth still fails closed (no unlimited logins). Jest the health/fail-closed path if Trigger.dev is required for rate limits.

**Acceptance criteria:**
- A creator can register, log in, stay logged in across refresh, log out, and reset a password.
- Protected app routes require a valid session.
- Passwords are hashed. Sessions are server-authoritative.
- One creator cannot read another creator’s data.

**Do not:**
- Do not build social login, magic links, SSO, or 2FA in MVP unless the approved docs add them.
- Do not let the frontend be the authority for “is this user logged in” for data access.

---

# 1b. Creator Onboarding

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Authentication
**Phase:** Foundation
**Note:** This was missing from the matrix. It is MVP1 Required in **MVP Definition & Scope — §7.2**.

**Why this exists:** The product needs the creator’s name, type/niche, primary platforms, and timezone before scheduling and publishing can be correct.

**Read before starting:**
- **MVP Definition & Scope** — §7.2 Creator Onboarding
- **User Experience Specification** — §12–§16 Onboarding UX
- **Frontend Architecture Specification** — §9 Onboarding Route Protection
- **Execution Plan** — §20 Phase 8 — Onboarding
- **API Documentation** — §12 User Profile API
- **Database Design Document** — §11 Creator Profile, User.timezone

### Justice — Frontend
- Create the onboarding wizard with the approved steps: creator identity, creator type, primary platforms, timezone.
- Create step 1: collect creator name / display identity. See **UX Specification — §13**.
- Create step 2: collect creator type (YouTuber, TikTok creator, Instagram creator, Educator, Podcaster, Blogger, Personal brand, Other). See **UX Specification — §14** and **Database Design Document — §11**.
- Create step 3: collect primary platforms. See **UX Specification — §15**.
- Create step 4: collect IANA timezone. Do not invent a custom timezone list. See **UX Specification — §16**.
- Create persist-on-step so refresh does not lose completed steps.
- Create skip-prevention: a creator who has not finished required onboarding cannot enter the main app.
- Create loading, validation, and error states for each step.
- After completion, send the creator to the dashboard.

### Eric — Backend
- Implement profile/onboarding endpoints that save creator name, creator type, primary platforms, timezone, and onboarding-complete flag.
- Implement a server-side check that onboarding is complete before allowing content/publishing operations that depend on timezone.
- Validate timezone against IANA names. Reject unknown values.
- Persist onboarding state in the database, not in frontend-only storage.

### Eric — Database
- Add onboarding fields to `CreatorProfile` (creator type, primary platforms, onboardingCompletedAt).
- Ensure `User.timezone` is required after onboarding and stored as IANA timezone.
- Add constraints so invalid creator types cannot be stored.

### Trust — DevOps
- No special infrastructure beyond app/database. Confirm timezone data is available in the runtime.

### Testing (Jest)

**Eric — unit**
- Reject empty name.
- Reject unknown creator type.
- Reject unknown IANA timezone (`Not/A_Zone`).
- `onboardingCompletedAt` is set only when required steps are present.

**Eric — integration**
- Unauthenticated `PATCH` onboarding → 401.
- Expired session → 401.
- Missing fields on a required step → 400.
- Malformed JSON → 400.
- Invalid timezone → 400.
- Authenticated user can save a step and read it back after a new request.
- Content/publish routes still blocked while onboarding is incomplete (if that is the approved gate).
- Database unavailable → 5xx, no half-written profile.

**Justice — component**
- Empty step 1 cannot continue.
- Refresh after step 2 still shows step 2 (persisted).
- Logged-in user with incomplete onboarding cannot render `/content`.
- Completed onboarding is not shown again.

**Trust:** none.

**Acceptance criteria:**
- Onboarding state persists.
- Timezone is stored and later used by scheduling.
- Main app is gated until required onboarding is done.

---

# 2. Content

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Authentication, Onboarding
**Phase:** Content Foundation

**Why this exists:** Content is the central domain. The product is not useful if a creator cannot create, view, edit, and persist content. See **MVP Definition & Scope — §7.3** and **System Architecture Document — §3.2 Content Is the Central Domain**.

**Read before starting:**
- **MVP Definition & Scope** — §7.3 Content Management
- **User Experience Specification** — §21–§29 Content UX
- **Frontend Architecture Specification** — §26–§28 Content Frontend Architecture
- **Backend Architecture Document** — §13 Content Domain, §14 Content Lifecycle, §15 Content Service
- **Database Design Document** — §18–§23 Content Entity
- **API Documentation** — §14–§21 Content API
- **Execution Plan** — §21 Phase 9 — Content Management, §22 Content Vertical Slice

**Write this document first (if missing):**
- **Feature Specifications — Content** during this work. Do not invent fields, statuses, or delete behavior.

### Justice — Frontend
- Create the content list page at `/content` showing title, content type, status, updated date, and owner-visible metadata. See **UX Specification — §22 Content List**.
- Create the “Create content” page/modal at `/content/new` with the approved form: title (required), content type (required), description, caption, notes, deadline. See **UX Specification — §25–§26**.
- Create draft saving so a creator can save without filling optional fields. See **UX Specification — §27 Draft Saving** and **Database Design Document — §20**.
- Create the content details page at `/content/:id` with title, description, caption, notes, type, status, deadline, timestamps, versions summary, tasks summary, and actions. See **UX Specification — §28**.
- Create the edit-content flow on the details page. Warn on unsaved changes. See **UX Specification — §80 Unsaved Changes**.
- Create delete/archive with an explicit confirmation dialog. Never delete on a single click. See **UX Specification — §81 Confirmation Requirements** and **API Documentation — §19**.
- Create content status display using the approved labels. Do not invent extra statuses in the UI.
- Create empty, loading, skeleton, and error states for list and details. See **UX Specification — §75–§77** and **Frontend Architecture Specification — §46–§48**.
- Create responsive layouts for desktop, tablet, and mobile content cards. See **UX Specification — §63–§67**.
- Create client-side UX validation (required title, required type) but treat backend validation as authoritative. See **Frontend Architecture Specification — §22**.
- Wire list/details/create/edit/delete to the real Content API via TanStack Query. Do not keep a mock content store after the API exists.

### Eric — Backend
- Implement `GET /api/v1/content` with pagination, ownership scoping, and stable sort. See **API Documentation — §15, §61**.
- Implement `POST /api/v1/content` requiring `title` and `contentType`; optional `description`, `caption`, `notes`, `deadline`. Default status per approved lifecycle (use only the status explicitly defined by the authoritative Content lifecycle contract; do not invent another status). See **API Documentation — §16**.
- Implement `GET /api/v1/content/:contentId` returning the consolidated content view the details page needs. See **API Documentation — §17**.
- Implement `PATCH /api/v1/content/:contentId` accepting only mutable fields. See **API Documentation — §18**.
- Implement `DELETE /api/v1/content/:contentId` with server-side authorization and the approved delete/archive lifecycle. See **Database Design Document — §55–§56**.
- Enforce ownership on every content endpoint: `content.userId === authenticatedUser.id`. Return 404/403 per **API Documentation — §60, §68**.
- Validate content type against the controlled enum: `VIDEO`, `SHORT_VIDEO`, `IMAGE`, `AUDIO`, `TEXT`, `OTHER`. See **Database Design Document — §21**.
- Reject unknown fields and unknown statuses. Do not accept arbitrary client-supplied IDs for ownership.

### Eric — Database
- Create the `Content` table with `id`, `userId`, `title`, `description`, `caption`, `notes`, `contentType`, `status`, `deadline`, `createdAt`, `updatedAt`, `deletedAt`. See **Database Design Document — §18–§20**.
- Create foreign key `Content.userId → User.id`.
- Create content-type enum and content-status enum. See **Database Design Document — §21–§22, §64**.
- Create indexes for `userId`, `(userId, status)`, `(userId, updatedAt)`, and search as specified in **Database Design Document — §60–§62**.
- Soft-delete via `deletedAt` unless the approved delete behavior says otherwise. Do not hard-delete in a way that orphans versions/attempts if the schema forbids it. See **Database Design Document — §55–§56**.

### Trust — DevOps
- Confirm Postgres is available in every environment and migrations run on deploy.
- No extra infrastructure for basic content CRUD.

### Testing (Jest)

**Eric — unit (`content.service.spec.ts`)**
- Create with title + type succeeds; optional fields may be omitted.
- Reject empty title, missing `contentType`, unknown `contentType`.
- Reject illegal status values on create/update.
- Ownership helper denies when `content.userId !== actor.id`.

**Eric — integration (`content.int.spec.ts`)**
- Unauthenticated `GET/POST /api/v1/content` → 401.
- Expired token → 401.
- Malformed JSON on create → 400.
- Missing `title` → 400.
- Empty `title` (`""`) → 400.
- Missing `contentType` → 400.
- Unknown `contentType` → 400.
- Happy create → 201, row owned by the session user (ignore any client-sent `userId`).
- `GET /api/v1/content/:id` unknown id → 404.
- `GET /api/v1/content/:id` another user’s id → 404 or 403 (follow API Docs §60/§68; never 200 with their payload).
- `PATCH` another user’s content → 403/404, row unchanged.
- `DELETE` another user’s content → 403/404, row remains.
- `DELETE` unknown id → 404.
- List is paginated and contains only the session user’s rows.
- Duplicate create (two POSTs with different bodies) creates two rows — this is not an idempotent endpoint; do not force it to be.
- Database unavailable on create → 5xx, no orphan row.

**Justice — component**
- Empty create form cannot submit.
- Loading / empty / error list states render.
- Delete requires confirmation; cancel does not call DELETE.
- 404 details page shows not-found, not another creator’s title.

**Trust:** none.

**Acceptance criteria:**
- Content CRUD works against Postgres, not mocks.
- Ownership is enforced server-side.
- Drafts survive refresh.
- UI has empty, loading, and error states.

**Do not:**
- Do not build a media library, folders-as-a-file-system, or tags-as-a-taxonomy product here. Organization is the next feature.
- Do not put pipeline transition rules only in the frontend.

---

# 3. Content Organization

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content
**Phase:** Content Foundation

**Why this exists:** Creators must be able to find and group work without a second tool. This is workflow organization (status, type, archive), not a generic file manager. See **Product Vision** connected-content problem and **MVP Definition & Scope — §7.3**.

**Read before starting:**
- **User Experience Specification** — §21–§24, §29
- **Frontend Architecture Specification** — §26–§27
- **Database Design Document** — §22 Content Status, §56 Content Deletion
- **API Documentation** — §15 List Content, §19 Delete Content
- **MVP Definition & Scope** — §7.3, §23 Search & Filtering (related, but search is its own feature)

### Justice — Frontend
- Create list grouping / sections so a creator can view content organized by status (Idea, Draft, Ready, Scheduled, Published; publication failures/cancellations are shown from Publication state) without leaving `/content`.
- Create archive view or archive filter so archived/deleted-from-workspace content is not mixed into the active list unless the creator asks for it.
- Create content-type grouping or type chips on each card (Video, Short, Image, Audio, Text, Other).
- Create sort controls for updated date, created date, title, and deadline where the API supports them. See **API Documentation — §63 Sorting**.
- Create a saved-view via URL query params (status, type, sort) so refresh and shareable links keep the organization. See **Frontend Architecture Specification — §18 URL State**.
- Create empty states per organized view (“No draft content yet”) rather than one generic empty screen.
- Create bulk-select only if the approved UX includes it. If it is not in **UX Specification**, do not invent bulk actions.

### Eric — Backend
- Implement list query parameters for status, content type, archived/not archived, and sort.
- Implement archive vs active listing according to `deletedAt` / archive rules in **Database Design Document — §56**.
- Keep list queries bounded and indexed. Do not return the creator’s entire history unpaginated.
- Do not create a separate “folder” or “collection” entity unless the approved docs add it. They have not.

### Eric — Database
- Confirm indexes exist for `(userId, status)`, `(userId, contentType)`, `(userId, deletedAt)`, `(userId, updatedAt)`.
- Do not add a Folder table. Organization in MVP is status + type + archive + relationships (later feature).

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

No new write endpoints. Do not invent duplicate-request tests here.

**Eric — integration**
- Unauthenticated list → 401.
- `?status=` unknown enum → 400.
- `?contentType=` unknown enum → 400.
- Default list excludes archived/`deletedAt` rows.
- Archive view returns only archived rows for this user.
- Another user’s content never appears in any organized view.
- Sort params that are not in the allow-list → 400 (do not SQL-inject `sort`).
- Database unavailable → 5xx.

**Justice — component**
- Empty “No draft content yet” state.
- URL `?status=DRAFT` restores the draft view.
- Invalid filter in the URL does not crash the page.

**Trust:** none.

**Acceptance criteria:**
- A creator can organize active work by status and type.
- Archive is separate from active work.
- No folder/collection product is introduced.

---

# 4. Content Search / Filtering

**Priority:** MVP1 Required — search/filtering is part of approved MVP1 Required content operations
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content, Content Organization
**Phase:** Content Operations
**Conflict note:** The matrix marks this MVP1 Required. **MVP Definition & Scope — §23 and §40** mark Search & Filtering as MVP1 Required. Treat it as required for a usable content list, but do not let advanced search delay publishing. Do not build global search across every domain.

**Read before starting:**
- **MVP Definition & Scope** — §23 Search & Filtering
- **User Experience Specification** — §23 Content Search, §24 Content Filters
- **API Documentation** — §15, §61 Pagination, §62 Filtering, §64 Search
- **Database Design Document** — §62 Search
- **Backend Architecture Document** — §67 Search and Filtering
- **Frontend Architecture Specification** — §18 URL State, §99 Search Empty State

### Justice — Frontend
- Create the content search input on the content list. Search title and relevant metadata only. See **UX Specification — §23**.
- Create filter controls for status, platform, content type, and date where practical. See **UX Specification — §24** and **MVP Definition & Scope — §23**.
- Create clear-filters action.
- Create search empty state: “No content matches ‘…’” with a way to clear search. See **Frontend Architecture Specification — §99**.
- Create debounce on search so each keystroke does not fire a request.
- Put search and filters in the URL so back/forward works.
- Do not create a global command-palette search across tasks, analytics, and settings in MVP.

### Eric — Backend
- Implement `GET /api/v1/content?search=&status=&contentType=&platform=&from=&to=` with ownership scoping.
- Search content title and approved metadata fields only. Do not scan binary media.
- Combine filters with AND, not surprising OR, unless the API doc says otherwise.
- Keep results paginated. Reject unbounded queries.
- Escape / parameterize search input. No raw SQL concatenation.

### Eric — Database
- Add the search strategy specified in **Database Design Document — §62** (index / `ILIKE` / `pg_trgm` only if that document specifies it — do not invent a search engine).
- Confirm filter indexes exist. See **Database Design Document — §60–§61**.

### Trust — DevOps
- No extra search cluster. Do not introduce Elasticsearch/Meilisearch in MVP.

### Testing (Jest)

**Eric — unit**
- Empty search string is treated as “no search”, not as match-all-unbounded.
- Search input is parameterized (a string like `' OR 1=1 --` is literal text).

**Eric — integration**
- Unauthenticated search → 401.
- Search returns only the session user’s matches.
- Another user’s title that matches the query is not returned.
- Combined filters (status + type) AND together.
- Huge search string (e.g. 10k chars) → 400, not a DB incident.
- Special characters / SQL meta characters do not error and do not leak rows.
- Empty result set → 200 with `data: []`, not 404.
- Database unavailable → 5xx.

**Justice — component**
- Empty query shows the full list (or the documented default), not a spinner forever.
- “No content matches ‘xyz’” empty state + clear action.
- Debounce: rapid typing does not fire one request per key (fake timers).

**Trust:** none. Do not add a search cluster.

**Acceptance criteria:**
- Creator can search and filter their content.
- Results are owned, paginated, and URL-addressable.
- No global search product.

---

# 5. Content Status / Pipeline

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content
**Phase:** Content Operations

**Status ownership (locked):**

**Content lifecycle:** `IDEA → DRAFT → READY → SCHEDULED → PUBLISHED`

**Publication / publishing lifecycle:** `SCHEDULED → PUBLISHING → PUBLISHED`, with `FAILED` and `CANCELLED` terminal/exception states as applicable.

**PublishingAttempt:** one individual provider execution attempt.

The UI may display these operational states together where useful, but the frontend must preserve the backend state-machine boundaries. See the locked API, Database, Backend Architecture, UX, and System Architecture documents.

**Why this exists:** The product’s job is to make work visible by stage. The backend is the only authority for whether a transition is legal.

**Read before starting:**
- **MVP Definition & Scope** — §9 Content Pipeline
- **User Experience Specification** — §29 Content Status, §30 Content Pipeline UX, §31 Pipeline Interactions
- **Frontend Architecture Specification** — §29 Content Pipeline, §30 Pipeline Interaction
- **Backend Architecture Document** — §3.4 Explicit State, §14 Content Lifecycle
- **Database Design Document** — §22, §69 Content Status Integrity
- **API Documentation** — §20–§21 Content Status
- **Execution Plan** — §23 Phase 10 — Content Pipeline
- **System Architecture Document** — §22 Content Lifecycle, §65 State Transition Authority

**Write this document first (if missing):**
- **Feature Specifications — Pipeline** during this work. Include the exact allowed transition table. Do not let Justice and Eric use different transition rules.

### Justice — Frontend
- Create the pipeline board/page at `/pipeline` with one column per ContentStatus: Idea, Draft, Ready, Scheduled, Published. Publication failures/cancellations may be shown as derived operational indicators associated with Content, but are not ContentStatus columns.
- Create content cards on the pipeline showing title, type, and key dates.
- Create status-change interaction (move card / status control) that calls `PATCH /api/v1/content/:id/status`. See **API Documentation — §21**.
- Create keyboard interaction for pipeline as required by **UX Specification — §31** and **§70 Keyboard Accessibility**.
- Create invalid-transition error display when the backend rejects a move. Do not hide the rejection and pretend the card moved.
- Create optimistic UI only if you can roll back on backend rejection. See **Frontend Architecture Specification — §50 Optimistic UI**.
- Keep backend as source of truth: after every change, reconcile with server state. See **Frontend Architecture Specification — §3.1**.
- Create empty column states (“No ready content”).
- Create loading and error states for the board.
- Do not build a custom workflow builder, extra columns, or WIP limits. See **MVP Definition & Scope — §9**: custom workflow builders are outside MVP.

### Eric — Backend
- Define the status state machine in domain code, not only in comments.
- Implement `PATCH /api/v1/content/:contentId/status` that validates the requested transition and rejects illegal ones. See **API Documentation — §21**.
- Reject client-supplied jumps such as IDEA → PUBLISHED if the approved table does not allow it.
- When scheduling or publishing later features change status, those services must use the same state machine. Do not duplicate conflicting rules.
- Never infer status only from “a schedule exists”. Status is an explicit field. See **Database Design Document — §3.4 Explicit State**.
- Return a clear error code/message for illegal transitions. See **API Documentation — §57–§59**.

### Eric — Database
- Create/confirm the content status enum: `IDEA`, `DRAFT`, `READY`, `SCHEDULED`, `PUBLISHED`. See **Database Design Document — §22**.
- Do not allow arbitrary strings in `status`.
- Add any check constraints the schema can enforce without duplicating the full transition table (the transition table lives in domain code). See **Database Design Document — §69**.

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

**Eric — unit (`content-status.machine.spec.ts`)**
- Table-drive every allowed transition → success.
- Table-drive every illegal transition (including IDEA → PUBLISHED if not allowed, empty status, unknown status) → rejected, previous status unchanged.
- `null` / `""` status → rejected.

**Eric — integration**
- Unauthenticated status PATCH → 401.
- Expired session → 401.
- Unknown content id → 404.
- Another user’s content id → 403/404, their status unchanged.
- Missing `status` field → 400.
- Malformed JSON → 400.
- Illegal transition → 400/409 with the documented error code; DB status unchanged.
- Duplicate legal transition (READY → READY if not allowed, or same request twice): second call is a no-op or a documented error; never a corrupt status.
- Two simultaneous PATCHes to different target statuses: one wins, the other is rejected, final status is a legal value (no “half DRAFT half READY”).
- Database unavailable → 5xx, status unchanged.

**Justice — component**
- Illegal move shows the backend error and the card returns to the original column.
- Keyboard move that the API rejects is rolled back.
- Empty column state renders.

**Trust:** none.

**Acceptance criteria:**
- Pipeline UI shows content by status.
- Illegal transitions are rejected by the backend.
- Frontend never becomes the workflow engine.
- No custom workflow builder.

---

# 6. Content Relationships

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content, Platform Versions (implemented together as a vertical slice)
**Phase:** Content Operations

**Why this exists:** This is a core differentiator. One original → many platform versions must be a persisted family, not a frontend grouping. See **MVP Definition & Scope — §10** and **Product Vision — connected content**.

**Read before starting:**
- **MVP Definition & Scope** — §10 Content Relationships
- **User Experience Specification** — §45 Content Family UX
- **Frontend Architecture Specification** — §31 Platform Version Architecture
- **Backend Architecture Document** — §16–§17 Platform Version Domain, Content Family
- **Database Design Document** — §24–§28 Content Version, Content Family
- **System Architecture Document** — §23–§24 Platform Version / Content Family Architecture
- **API Documentation** — §28–§31 Platform Version API

### Justice — Frontend
- Create the content-family panel on content details showing Original + each platform version and each version’s status.
- Create “create derivative / create platform version” entry point from the original content.
- Create navigation from a version back to the original, and from the original to each version.
- Create empty family state: original exists, no versions yet, with a clear CTA to create one.
- Do not let the family exist only in React state. If the API does not return the family, the UI must show an error, not a fake grouping.

### Eric — Backend
- Implement family read on `GET /api/v1/content/:contentId` (original + versions) so the details page does not need a second undocumented join.
- Implement version create/list/get/update/delete under `/api/v1/content/:contentId/versions`. See **API Documentation — §28–§31**.
- Persist `Content 1 — * ContentVersion`. Reject a version that does not belong to the content.
- Enforce ownership through the parent content.
- Do not build a general graph of “related posts”, remix trees, or series-as-a-separate-product. MVP family is original + platform versions.

### Eric — Database
- Create `ContentVersion.contentId → Content.id` foreign key.
- Preserve the family on content reads. Do not orphan versions.
- Define delete behavior: deleting original must follow **Database Design Document — §55–§56** (cascade vs restrict). Implement exactly that, not a guess.

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

**Eric — integration**
- Unauthenticated family/version read → 401.
- Unknown content id → 404.
- Another user’s content id → 403/404, no versions in the body.
- Create version on another user’s content → 403/404.
- Family on GET content includes persisted versions after refresh (second GET).
- Database unavailable → 5xx.

**Justice — component**
- Original with zero versions shows the empty-family CTA.
- If the API errors, the UI does not invent a fake family from local state.

**Trust:** none.

**Acceptance criteria:**
- Original + versions persist as one family.
- Family is visible on content details.
- Relationship is not frontend-only.

---

# 6A. Content Planning / Ideas

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Content, Content Organization, Calendar  
**Phase:** Planning & Production

### Justice — Frontend
- Create an Ideas / Planning workspace.
- Create planning entries with the fields defined by the API contract.
- Support view, edit, delete, and empty states.
- Allow a planning entry to become or link to Content where the contract permits.
- Display planning entries in Calendar.
- Preserve ownership and clear state distinctions between an idea, Content, and a Publication.

### Eric — Backend
- Implement the authoritative planning/idea service and `/api/v1/...` contract.
- Validate all input with Zod.
- Enforce authenticated ownership.
- Persist planning entries in PostgreSQL.
- Support safe conversion/linking to Content where specified.
- Prevent planning entries from becoming Publications until the publishing workflow explicitly creates Publications.

### Eric — Database
- Use the authoritative planning-entry model.
- Add required creator/date indexes.
- Do not introduce a Schedule entity.

### Testing
- Create/read/update/delete planning entry.
- Invalid payload.
- Unauthorized access.
- Ownership isolation.
- Calendar inclusion.
- Conversion/linking behavior.
- Duplicate/idempotent request behavior where applicable.

### Acceptance Criteria
- Ideas and planning entries persist in PostgreSQL.
- Creator can manage their own entries.
- Calendar can display them.
- Ideas remain distinct from Content and Publications.
- No Schedule model is introduced.

# 6B. Production Planning

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Content, Tasks  
**Phase:** Planning & Production

### Justice — Frontend
- Create the Content production-plan view.
- Create/edit/save manual production planning information.
- Display production readiness/state.
- Provide loading, empty, validation, and failure states.

### Eric — Backend
- Implement production planning service.
- Enforce Content ownership.
- Validate payloads with Zod.
- Persist production planning in PostgreSQL.
- Implement:
  - `GET /api/v1/content/:contentId/production`
  - `PUT /api/v1/content/:contentId/production`

### Eric — Database
- Use the authoritative production-planning model.
- Maintain Content ownership relationships.
- Add only required indexes.

### Testing
- Read existing plan.
- Create/update plan.
- Invalid Content ID.
- Unauthorized access.
- Invalid payload.
- Concurrent update behavior.
- Persistence after reload.

### Acceptance Criteria
- Creator can maintain a persisted manual production plan.
- Only the owner can access or modify it.
- Production planning is separate from Publication scheduling.

# 6C. Shooting Checklist

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Production Planning, Tasks  
**Phase:** Planning & Production

### Justice — Frontend
- Display the shooting checklist for a Content item.
- Display checklist completion progress.
- Toggle item completion.
- Support item management where permitted by the API.
- Preserve ordering and clear completion state.
- Provide loading, empty, validation, and failure states.

### Eric — Backend
- Implement checklist service.
- Enforce Content ownership.
- Validate checklist operations.
- Persist checklist state in PostgreSQL.
- Implement:
  - `GET /api/v1/content/:contentId/production/checklist`
  - `PATCH /api/v1/content/:contentId/production/checklist`

### Eric — Database
- Use the authoritative checklist model.
- Maintain Content relationship and ordering.
- Add required indexes only.

### Testing
- Read checklist.
- Update completion.
- Invalid Content ID.
- Unauthorized update.
- Duplicate/idempotent update where applicable.
- Concurrent update behavior.
- Persistence after reload.

### Acceptance Criteria
- Creator can maintain a persisted shooting checklist.
- Checklist state survives reloads.
- Checklist remains associated with the correct Content item.
- No AI shooting-assistance infrastructure is introduced in MVP1.

# 6D. Publication Domain

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Platform Versions, Social Platform Accounts, Content Versions  
**Phase:** Publishing Operations

### Justice — Frontend
- Create Publication targets from eligible Content Versions/platform accounts.
- Display Publication status and scheduling state.
- Display per-platform Publication results.
- Provide cancel/reschedule actions.
- Never expose Trigger.dev execution IDs as user-facing Publication identifiers.

### Eric — Backend
- Implement the Publication domain service.
- Create one Publication for each intended platform/account target.
- Persist Publication scheduling and publishing state.
- Enforce ownership and eligibility.
- Implement:
  - `POST /api/v1/publications`
  - `GET /api/v1/publications/:publicationId`
  - `GET /api/v1/publications`
  - `POST /api/v1/publications/:publicationId/cancel`
  - `PATCH /api/v1/publications/:publicationId`
  - `POST /api/v1/publications/:publicationId/retry`
- Treat `publishingOperationId` as a logical aggregate identifier only.
- Do not create a separate PublishingOperation entity unless the authoritative architecture changes.
- Preserve Publication state separately from PublishingAttempt history.
- Create/reconcile Trigger.dev execution after the authoritative DB transaction.

### Eric — Database
- Use the authoritative Publication model.
- Store scheduling state on Publication.
- Maintain ownership, uniqueness, and idempotency constraints.
- Do not create a Schedule table.

### Testing
- Create/read/list Publication.
- Ownership isolation.
- Cancel Publication.
- Valid reschedule.
- Invalid/past schedule.
- Invalid timezone.
- Unsupported capability.
- Duplicate/idempotent creation.
- Retry from Publication and creation of a new PublishingAttempt.
- Preserve historical failed attempt.
- Stale Trigger.dev execution after reschedule.
- Reconciliation after DB/execution divergence.

### Acceptance Criteria
- Publication is the durable business resource for a platform publication.
- Each target platform/account has its own Publication.
- Scheduling, cancellation, rescheduling, and retry operate on Publication.
- PublishingAttempt remains execution history.
- No standalone Schedule resource exists.

# Launch Platform Requirement — 5+ Platforms

**Priority:** MVP1 Required

The MVP1 launch requirement is **at least five actual supported publishing platforms**. YouTube, TikTok, and Instagram are examples only unless formally selected as part of the final launch set.

### Action-Level Requirements
- Define a provider-agnostic Platform Adapter Contract.
- Define a platform capability registry.
- Define OAuth/account-connection requirements per launch platform.
- Define publishing capability per launch platform.
- Define scheduling capability per launch platform.
- Define media/content constraints per launch platform.
- Normalize provider errors.
- Define provider rate-limit behavior.
- Implement five actual launch adapters.
- Test OAuth/account connection, publishing, scheduling where supported, failures, rate limits, and idempotency for each launch platform.
- Run staging smoke tests for all five launch platforms.
- Obtain final approval of the five-platform launch set before MVP1 completion.

### Acceptance Criteria
- Five or more platforms are actually supported at MVP1 launch.
- Each launch platform has a dedicated adapter.
- Each launch platform passes its required integration and reliability tests.
- Example platforms are not treated as the final launch set without approval.

# Platform Adapter Contract — MVP1

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** —  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All

### Contract
Each launch platform is implemented behind a dedicated provider adapter. Domain services remain provider-agnostic.

### Action-Level Requirements
- Define a common adapter contract for OAuth/account operations, token refresh, capability discovery, publishing, provider-status handling, error normalization, and rate-limit behavior.
- Define a capability registry for publishing, scheduling, media constraints, and other provider-specific capabilities.
- Keep provider credentials and tokens server-side.
- Normalize provider errors into the Creator CC error model.
- Preserve provider-specific response data needed for Publication and PublishingAttempt history.
- Implement idempotency/provider operation safeguards where the provider supports them.
- Test each adapter independently and through publishing integration tests.

### Acceptance Criteria
- No domain service contains platform-specific branching that belongs in an adapter.
- Every launch platform implements the common contract.
- Every required integration and acceptance test must be parameterized over the approved MVP1 launch set of at least five actual publishing platforms; named platforms are illustrative examples only.
- Capability checks occur before unsupported operations are attempted.
- Provider errors are normalized without losing required diagnostic information.

# 7. Platform Versions

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content, Content Relationships
**Phase:** Content Operations

**Why this exists:** The protected differentiator is: one piece of content → multiple platform-specific versions → one connected family → one publishing workflow. AI is not involved. The creator edits each version manually. See **MVP Definition & Scope — §11**.

**Read before starting:**
- **MVP Definition & Scope** — §11 Platform-Specific Content Versions
- **User Experience Specification** — §43 Platform Version UX, §44 Create Platform Version, §45 Content Family UX
- **Frontend Architecture Specification** — §31–§32 Platform Version Architecture / Editor
- **Backend Architecture Document** — §16 Platform Version Domain
- **Database Design Document** — §24–§27 Content Version Fields and Uniqueness
- **API Documentation** — §28–§31
- **Execution Plan** — §24 Phase 11 — Platform Versions
- **System Architecture Document** — §23, critical flow §79

### Justice — Frontend
- Create the “Create platform version” flow: choose platform (the approved MVP1 launch set (five or more platforms) — launch set confirmed during implementation), then edit version fields.
- Create the version editor for caption, title, description, hashtags, CTA, and platform-specific media association. See **UX Specification — §44** and **Database Design Document — §25**.
- Create version status display (independent of original content status where the model requires it).
- Create uniqueness UX: if a YouTube version already exists, do not offer a second silent duplicate. Show the existing version.
- Create character-limit / platform-constraint hints from the platform capability registry. Do not hardcode limits in random components; read capabilities from the API. See **UX Specification — §88 Platform Capability UX** and **API Documentation — §23**.
- Create delete-version with confirmation.
- Create loading, empty, validation, and error states for the editor.
- Do not auto-generate captions with AI. See **MVP Definition & Scope — §27 AI Scope**.

### Eric — Backend
- Implement `POST /api/v1/content/:contentId/versions` with `platform` required; caption, title, description, hashtags, CTA optional as specified.
- Implement get, patch, delete version endpoints with ownership checks.
- Enforce uniqueness `(contentId, platform)` so two YouTube versions cannot be created accidentally. See **Database Design Document — §27**.
- Validate platform against the supported platform enum / capability registry.
- Validate field lengths against platform capabilities on the server, not only in the UI.
- Associate optional `platformAccountId` only if that account belongs to the user and matches the platform.

### Eric — Database
- Create `ContentVersion` with `id`, `contentId`, `platform`, `platformAccountId?`, `caption`, `title?`, `description?`, `hashtags?`, `callToAction?`, `status`, timestamps. See **Database Design Document — §25**.
- Create unique constraint on `(contentId, platform)`.
- Create foreign keys to Content and optional PlatformAccount.
- Store hashtags in the approved column type (array/jsonb/text) as specified in the Prisma schema section — **Database Design Document — §76**. Do not invent a Hashtag table.

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

**Eric — unit**
- Reject empty `platform`.
- Reject unknown platform enum.
- Uniqueness rule: second version for the same `(contentId, platform)` is rejected.

**Eric — integration**
- Unauthenticated POST version → 401.
- Expired session → 401.
- Unknown `contentId` → 404.
- Another user’s `contentId` → 403/404.
- Missing `platform` → 400.
- Empty body → 400.
- Malformed JSON → 400.
- Happy create YouTube version → 201.
- Second YouTube version for the same content → 409 (or documented status); still exactly one row.
- Two simultaneous POSTs for TikTok on the same content: exactly one row (unique constraint).
- PATCH another user’s version → 403/404.
- DELETE version does not delete the original Content row.
- Caption/hashtags/CTA persist on GET.
- Database unavailable → 5xx, no half row.

**Justice — component**
- Empty platform selection cannot submit.
- Existing YouTube version opens the editor instead of creating a duplicate.
- Validation errors from the API map onto caption/title fields.

**Trust:** none.

**Acceptance criteria:**
- A creator can adapt one original into each approved MVP1 launch platform (five or more) versions with distinct text and media association.
- Uniqueness holds.
- Backend validates platform constraints.

---

# 8. Social Platform Accounts

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Authentication, Onboarding, platform capability registry
**Phase:** Platform Operations

**Why this exists:** Publishing cannot happen without connected accounts. Example platforms: the approved MVP1 launch set (five or more platforms). Final MVP1 launch set: five or more approved platforms. Final launch set is confirmed during implementation based on real API capabilities. See **MVP Definition & Scope — §12**.

**Read before starting:**
- **MVP Definition & Scope** — §12 Platform Account Connections, §35 Platform Integration Boundary
- **User Experience Specification** — §37–§42 Platform Connections UX, OAuth, Disconnect
- **Frontend Architecture Specification** — §35 Platform Connection Architecture, §36 OAuth Frontend Security
- **Backend Architecture Document** — §18–§24 Platform Domain, Adapter, OAuth, Connected Account
- **Database Design Document** — §12–§17 Platform / PlatformAccount
- **API Documentation** — §23–§27 Platforms and Connected Accounts
- **System Architecture Document** — §25–§29, critical flow §80
- **Execution Plan** — §25–§26 Phase 12 — Platform Connections

**Write this document first:**
- **Social Platform Integration Specification** — before each platform integration. Cover OAuth, permissions, tokens, publishing, media requirements, API limits, errors, retries, webhooks, and platform-specific behavior. One spec section per platform in the approved MVP1 launch set (five or more platforms). YouTube, TikTok, and Instagram may be examples. Do not start OAuth against a live provider without this.

### Justice — Frontend
- Create the Platforms page at `/platforms` listing connected accounts with platform, display name, and connection status.
- Create “Connect each approved MVP1 launch platform (five or more)” actions that call `POST /api/v1/platform-accounts/:platform/connect` and redirect to the returned `authorizationUrl`. See **API Documentation — §25** and **UX Specification — §38**.
- Create OAuth return/success state. See **UX Specification — §39**.
- Create OAuth failure state with a recoverable message. See **UX Specification — §40**.
- Create connection status display: Connected, Needs reauthorization, Disconnected, Connection error. See **Database Design Document — §15** and **UX Specification — §89**.
- Create disconnect with confirmation. See **UX Specification — §42**.
- Create reauthorize action when status is `NEEDS_REAUTHORIZATION`.
- Never render access tokens, refresh tokens, or client secrets. If they appear in an API response, do not display them and report it as a security bug. See **Frontend Architecture Specification — §66** and **API Documentation — §24**.
- Create empty state: no accounts connected, with a reason why connection is required for publishing.

### Eric — Backend
- Implement `GET /api/v1/platforms` returning the capability registry (`publish`, `schedule`, etc.). Backend is source of truth. See **API Documentation — §23**.
- Implement `GET /api/v1/platform-accounts` scoped to the user, never including tokens.
- Implement `POST /api/v1/platform-accounts/:platform/connect` that creates a signed OAuth state and returns the provider authorization URL.
- Implement `GET /api/v1/platform-accounts/:platform/callback` that validates state, exchanges the code, stores encrypted tokens, and upserts the PlatformAccount. See **API Documentation — §26** and **Backend Architecture Document — §21–§23**.
- Implement disconnect `DELETE /api/v1/platform-accounts/:accountId` that revokes/invalidates the connection but preserves publishing history. See **API Documentation — §27** and **Database Design Document — §57**.
- Implement token refresh in the backend only. Frontend never refreshes tokens.
- Implement connection-status updates when refresh fails (`NEEDS_REAUTHORIZATION` / `CONNECTION_ERROR`).
- Enforce uniqueness `(userId, platform, externalAccountId)`. See **Database Design Document — §17**.
- Build platform adapters behind a common contract. Core publishing must not contain YouTube-specific code. See **MVP Definition & Scope — §35** and **Backend Architecture Document — §19–§20**.

### Eric — Database
- Create `PlatformAccount` with `id`, `userId`, `platform`, `externalAccountId`, `accountName`, `status`, `connectedAt`, `updatedAt`, `disconnectedAt`. See **Database Design Document — §13**.
- Store encrypted tokens in the approved secret store / encrypted columns. Never in a plaintext column that ordinary queries select. See **Database Design Document — §16, §71**.
- Create unique constraint `(userId, platform, externalAccountId)`.
- Create connection-status enum: `CONNECTED`, `NEEDS_REAUTHORIZATION`, `DISCONNECTED`, `CONNECTION_ERROR`.
- Create the platform enum from the approved MVP1 launch set; it must support at least five actual publishing platforms. YouTube, Instagram, and TikTok are illustrative examples only, not the complete enum.

### Trust — DevOps
- Store OAuth client IDs, client secrets, redirect URLs, and token-encryption keys in the secret manager. Never commit them.
- Configure callback URLs per environment (dev, staging, production).
- Restrict outbound network to the required provider hosts where practical.
- Add log redaction for authorization codes, tokens, and state parameters.

### Testing (Jest)

Mock the provider OAuth HTTP. Do not call real Google/TikTok/Meta in Jest.

**Eric — unit**
- Capability registry returns documented platforms only.
- Token fields are stripped from any public DTO mapper.

**Eric — integration**
- Unauthenticated `GET /api/v1/platform-accounts` → 401.
- Unauthenticated connect → 401.
- Unknown `:platform` → 400/404.
- Connect returns `authorizationUrl` and no tokens.
- List accounts never contains `accessToken`, `refreshToken`, or client secrets (assert keys absent).
- Callback with missing state → 400.
- Callback with mismatched state → 400, no PlatformAccount row.
- Callback with expired state → 400.
- Disconnect unknown account id → 404.
- Disconnect another user’s account id → 403/404, their row remains CONNECTED.
- Duplicate connect of the same `(userId, platform, externalAccountId)` does not create two active rows.
- Two simultaneous callbacks for the same account: one active row.
- Provider returns unexpected JSON on token exchange → connection error status, no plaintext token stored, 4xx/5xx as documented.
- Database unavailable during callback → 5xx, no unencrypted token on disk.

**Justice — component**
- Empty state when no accounts.
- Connect button does not display or log the authorization URL’s secret query if the API accidentally returned a token (guard).
- Disconnect requires confirmation.

**Trust — infra**
- Log-redaction test: a callback fixture containing a refresh token does not appear in captured logs.

**Acceptance criteria:**
- Creator can connect, view, reauthorize, and disconnect supported platforms.
- Tokens never leave the backend.
- Adapter pattern is in place for every approved MVP1 launch platform (five or more).

**Do not:**
- Do not connect every social network. Launch set is limited.
- Do not put client secrets in the Next.js bundle.

---

# 9. OAuth / Token Security

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Social Platform Accounts (same vertical slice; this is the security hardening of that slice)
**Phase:** Platform Operations / Security

**Why this exists:** OAuth tokens are the keys to the creator’s social accounts. A leak is a product-ending incident. Security is in MVP, not post-MVP. See **MVP Definition & Scope — §36**.

**Read before starting:**
- **MVP Definition & Scope** — §36 Security Boundary
- **Backend Architecture Document** — §21–§23 OAuth Architecture, State Protection, Token Security, §56–§58 Security / Secrets
- **Database Design Document** — §16 Platform Account Security, §70–§71 Security Boundaries / Secrets
- **API Documentation** — §74–§75 Security / Sensitive Data, §78 CSRF
- **Frontend Architecture Specification** — §36 OAuth Frontend Security, §63–§66
- **System Architecture Document** — §27–§29 OAuth, Connected Account, Credential Security
- **MVP Backend** — §34 OAuth Security, §35 Secrets Management, §52 Security Threat Model

**Write this document first:**
- **Security Document** — OAuth chapter must be approved before live provider credentials are used.

### Justice — Frontend
- Create the OAuth start as a backend-redirect only. Do not build provider OAuth URLs in the browser.
- Create handling for the return path without reading tokens from the URL. If a provider echoes a token to the client, do not persist it; treat it as a defect.
- Create UI copy for reauthorization that never asks the creator to paste a token.
- Strip tokens from any client logging / analytics.

### Eric — Backend
- Implement cryptographically random OAuth `state`, bind it to the authenticated user, single-use, short TTL. Reject missing/mismatched/expired state. See **Backend Architecture Document — §22**.
- Implement PKCE if the platform supports/requires it, as specified in the Social Platform Integration Specification.
- Encrypt access and refresh tokens at rest. Decrypt only in Trigger.dev Task / Run/backend memory at publish time.
- Never return tokens on any API. Never log tokens, codes, or raw provider secret payloads.
- Implement refresh rotation according to each provider’s rules, with locking so two Trigger.dev Tasks / Runs cannot refresh the same token concurrently.
- Implement CSRF protection on cookie-authenticated mutating routes. See **API Documentation — §78**.
- Implement redirect-URI allowlist. Reject unknown redirect URIs.

### Eric — Database
- Confirm token columns are encrypted or stored outside ordinary tables per **Database Design Document — §16, §71**.
- Confirm tokens are excluded from default Prisma selects used by list/get account APIs.
- Do not put tokens in `Activity` or `Notification` payloads.

### Trust — DevOps
- Create and rotate token-encryption keys.
- Separate OAuth client secrets per environment.
- Configure secret-manager access so only API and Trigger.dev Task / Run roles can decrypt tokens.
- Add alerts on repeated OAuth state failures (possible CSRF/attack).
- Verify production cookies are `Secure`, `HttpOnly`, `SameSite` as specified in the Security Document.

### Testing (Jest)

This feature is security. Every case below is required.

**Eric — unit**
- State is bound to user id, single-use, and expired after TTL.
- Encrypt/decrypt round-trip; plaintext token is not equal to the stored ciphertext.

**Eric — integration**
- Unauthenticated callback → 401/400, no account attached.
- Missing state, empty state, tampered state, replayed state → rejected, no token stored.
- Callback meant for user A cannot attach an account onto user B’s session.
- Token refresh when the provider returns 401 → account becomes `NEEDS_REAUTHORIZATION`, tokens not written in plaintext.
- Two Trigger.dev Tasks / Runs refreshing the same token at once: one refresh wins; provider is not called twice with the same refresh token if the provider forbids it.
- `GET /api/v1/platform-accounts` still has no token keys after a successful connect.
- Database unavailable during encrypt/store → 5xx, no plaintext fallback column.

**Justice — component**
- Frontend never puts a token into `localStorage` (assert against a mocked location/storage).
- Reauthorization CTA does not ask the user to paste a token.

**Trust — infra**
- Cookie flags in the production config test: `Secure`, `HttpOnly`, `SameSite` as the Security Document.
- Secret-scanning fixture: a committed `.env` with `CLIENT_SECRET=` would fail CI (if that check exists; add it).

**Acceptance criteria:**
- Tokens encrypted, never in frontend, never in logs.
- OAuth state is bound, single-use, and expired after TTL.
- Reauthorization works when refresh fails.

---

# 10. Media Management

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content, Platform Versions
**Phase:** Content Operations / Publishing prerequisite

**Critical boundary:** This is temporary operational media, not a permanent creator media library. See **MVP Definition & Scope — §8** and **PRD storage philosophy**.

**Read before starting:**
- **MVP Definition & Scope** — §8 Media Scope, §33 Permanent Media Storage
- **User Experience Specification** — §61 Media UX, §62 Media Error States
- **Frontend Architecture Specification** — §70–§71 Media Handling / Preview
- **Backend Architecture Document** — §38–§39 Media Architecture, Temporary Media
- **Database Design Document** — §29–§32 Media Asset
- **API Documentation** — §22 Content Media
- **System Architecture Document** — §38–§40 Media Architecture / Lifecycle / Security
- **Execution Plan** — §44 Phase 22 — Media Handling
- **MVP Backend** — §24 Media Handling, §49 R2 Cost Strategy, §53 Media Security

**Write this document first:**
- **File & Media Management Document** — before any upload implementation. Cover uploads, validation, formats, size limits, storage, processing, security, CDN/R2 strategy, signed URLs, and deletion/lifecycle.

### Justice — Frontend
- Create the upload interface on content and on platform versions, with file picker, drag-and-drop if UX specifies it, and progress. See **UX Specification — §61**.
- Create client-side pre-checks for type and size, then still respect backend rejection.
- Create processing states: Uploading, Processing, Ready, Failed. See **Database Design Document — §31**.
- Create upload failure and retry UX. See **UX Specification — §62**.
- Create a basic media preview for images and a non-editor playback/preview for video. This is not Premiere. See **Frontend Architecture Specification — §71**.
- Never upload files to a public unauthenticated bucket from the browser without a signed upload flow.
- Do not build a media library browser, albums, or “my files” product.

### Eric — Backend
- Implement signed upload (or approved upload session) so the browser does not send multi-hundred-MB files through the API process if the architecture says direct-to-R2. Follow the File & Media Management Document exactly.
- Implement `POST /api/v1/content/:contentId/media` and delete media endpoints. See **API Documentation — §22**.
- Validate MIME type, extension, and size server-side. Reject executables and spoofed types. See **Database Design Document — §32** and **MVP Backend — §53**.
- Associate media to content and optionally to a content version.
- Enforce ownership on every media read/write/delete.
- Implement processing state transitions. Do not mark media READY until processing succeeds.
- Implement cleanup of abandoned / expired temporary objects. See **Backend Architecture Document — §39** and **System Architecture Document — §39**.
- Generate short-lived signed download URLs. Do not serve a permanent public object URL.

### Eric — Database
- Create `MediaAsset` with `id`, `userId`, `contentId`, `contentVersionId?`, `fileName`, `mimeType`, `size`, `storageKey`, `status`, timestamps. See **Database Design Document — §29**.
- Store metadata and `storageKey` only. Never store the binary in Postgres.
- Create media-status enum: `UPLOADING`, `PROCESSING`, `READY`, `FAILED`, `DELETED`.
- Index `(userId, contentId)` and status for cleanup background executions.

### Trust — DevOps
- Provision Cloudflare R2 (or the approved bucket) with lifecycle policies that delete temporary objects.
- Configure CORS for signed uploads from the frontend origin only.
- Configure bucket policies: no public list, no permanent public-read on creator objects.
- Set max size and virus/content-type constraints at the edge if specified.
- Add monitoring for bucket size and failed cleanups (cost control). See **MVP Backend — §48–§49**.
- Ensure Trigger.dev Tasks / Runs that process media have access to the bucket, and the frontend does not have the secret key.

### Testing (Jest)

Mock R2. Use small fixtures, not 100 MB files, except one documented size-limit test.

**Eric — unit**
- Reject empty file, zero-byte file if the spec forbids it, unknown MIME, extension/MIME mismatch.
- Reject size above the documented limit.
- `storageKey` is not a client-supplied path (`../../etc/passwd` rejected).

**Eric — integration**
- Unauthenticated upload → 401.
- Expired session → 401.
- Unknown `contentId` → 404.
- Another user’s `contentId` → 403/404.
- Missing file field → 400.
- Disallowed type (e.g. `application/x-executable`) → 400, no object stored.
- Oversize body → 413/400, no object stored.
- Unknown `mediaId` on delete → 404.
- Delete another user’s media → 403/404, object remains.
- Failed processing leaves status `FAILED`, never `READY`.
- Duplicate submit of the same upload session does not create two READY objects (follow the media doc).
- R2/provider unexpected error → `FAILED`, API does not return a permanent public URL.
- Database unavailable after object put: cleanup path runs or the object is eligible for lifecycle delete; no READY row without a valid key.

**Justice — component**
- Empty file picker cannot submit.
- Progress / FAILED / READY states render.
- Oversize client pre-check shows an error before calling the API.

**Trust — infra**
- Lifecycle policy test: an abandoned `UPLOADING` object older than the TTL is deleted by the cleanup job (Jest the job with a clock fake).

**Acceptance criteria:**
- Required media can be attached for publishing.
- Objects are temporary, validated, owned, and cleaned up.
- Postgres holds metadata only.

**Do not:**
- Do not market or build unlimited creator cloud storage.
- Do not build professional image/video editing.

---

# 11. Scheduling — Publication-Owned

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Platform Versions, Social Platform Accounts, Media, Background Execution, Execution Engine, Publication Domain  
**Phase:** Publishing Operations

**Why this exists:** Creators must schedule Publications into the future and close the browser. The browser is a control surface, not the execution engine.

**Read before starting:**
- MVP Definition & Scope — Scheduling and Publishing Execution
- User Experience Specification — Scheduling UX and validation
- Frontend Architecture Specification — Scheduling Architecture and Timezone Handling
- Backend Architecture Document — Scheduling Architecture, Timezone, Validation
- Database Design Document — Publication scheduling state and idempotency
- API Documentation — Publications, scheduling, cancellation, rescheduling
- System Architecture Document — Scheduling and publishing critical flows
- Reliability & Error Handling Specification — Scheduling Reliability and Reconciliation
- Testing Strategy — Scheduling and Trigger.dev testing

### Justice — Frontend
- Create the schedule-create flow using eligible Content Version/platform targets.
- Collect local date/time and IANA timezone.
- Create Publication-oriented reschedule flow.
- Create Publication cancellation with confirmation.
- Render backend validation errors: past time, disconnected account, content not ready, missing media, missing platform version, unsupported capability.
- Display scheduled times in the creator's timezone.
- Send/receive normalized ISO timestamps; do not implement browser timers as the publishing mechanism.
- Display Publication status separately from Content status where both are visible.
- Disable scheduling when the selected platform capability does not support it.

### Eric — Backend
- Implement `POST /api/v1/publications`.
- Validate ownership, connected account, platform capability, Content readiness, required media/version, future time, timezone, and duplicate/idempotency conditions.
- Persist the authoritative Publication scheduling state in PostgreSQL.
- Store `scheduledAt` in UTC and preserve the IANA timezone required by the contract.
- After the authoritative DB transaction, create or reconcile the corresponding Trigger.dev scheduled execution.
- Implement `GET /api/v1/publications` and `GET /api/v1/publications/:publicationId`.
- Implement `POST /api/v1/publications/:publicationId/cancel`.
- Implement `PATCH /api/v1/publications/:publicationId` for rescheduling.
- Ensure stale Trigger.dev executions cannot publish after a valid reschedule or cancellation.
- Do not create any standalone Schedule resource. Scheduling is implemented through the Publication domain and `/api/v1/publications` API.

### Eric — Database
- Use the authoritative `Publication` model.
- Store scheduling state on Publication.
- Maintain required ownership, uniqueness, and idempotency constraints.
- Add indexes supporting Publication scheduling/list queries.
- Do not create a `Schedule` table, Schedule status machine, or Schedule-specific indexes.

### Trust — DevOps
- Configure Trigger.dev Tasks / Runs through the managed execution environment.
- Do not operate a separate Creator CC worker process or application-owned scheduling queue.
- Configure execution concurrency and environment/secrets as required by the Trigger.dev deployment model.
- Support operational monitoring and reconciliation rather than polling a self-managed queue.

### Testing
**Unit**
- Reject missing/past `scheduledAt`.
- Reject invalid IANA timezone.
- Reject disconnected account.
- Reject unsupported scheduling capability.
- Reject duplicate/idempotency conflict.

**Integration**
- Unauthenticated creation → 401.
- Expired session → 401.
- Unknown Content Version → 404.
- Another user's Content Version/account → 403/404.
- Past timestamp → 400.
- Invalid timezone → 400.
- Happy Publication creation → 201 with durable Publication state.
- Duplicate request → one authoritative Publication and safe execution reconciliation.
- Cancel another user's Publication → 403/404.
- Cancelled Publication must not publish.
- Reschedule valid Publication.
- Reject reschedule of cancelled/published/ineligible Publication.
- Reject past reschedule.
- Reject invalid timezone on reschedule.
- Duplicate/idempotent reschedule is safe.
- Stale Trigger.dev execution after reschedule cannot publish.
- DB/execution divergence is recoverable through reconciliation.

**Acceptance Criteria**
- Publication survives browser close and API restart.
- Scheduling state is persisted on Publication.
- Rescheduling and cancellation operate on Publication.
- Trigger.dev is execution infrastructure, not the Creator CC scheduling resource.
- No standalone scheduling resource domain model exists.
# 12. Calendar UI — Planning and Publishing

**Priority:** MVP1 Required  
**Primary Owner:** Justice  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Content Planning / Ideas, Production Planning, Scheduling, Publication Domain  
**Phase:** Publishing Operations

**Rule:** The Calendar is an aggregate view of approved planning and publishing domain resources. It is not a Schedule-resource viewer and must not create a second scheduling model.

### Calendar Scope
MVP1 Calendar includes:
- Planned Content
- Content Ideas / Planning Entries
- Scheduled Publications

### Justice — Frontend
- Create `/calendar`.
- Support month navigation and the required calendar interactions.
- Display planned content, ideas/planning entries, and scheduled Publications with clear visual distinctions.
- Open the authoritative Content, planning entry, or Publication details from a calendar item.
- Support responsive tablet/mobile behavior.
- Support keyboard accessibility.
- Provide loading, empty, and error states.
- Do not add personal events or unrelated productivity features unless explicitly approved elsewhere.

### Eric — Backend
- Implement the locked `/api/v1/calendar` contract.
- Return the authenticated creator's planned content, planning entries, and scheduled Publications for the requested range.
- Enforce ownership.
- Keep the response bounded to the requested date range.
- Resolve data from authoritative domain resources; do not introduce a separate scheduling data source; read scheduled Publications and their scheduling state from the Publication domain.

### Eric — Database
- No Calendar entity.
- Use the authoritative planning/content/Publication models and their required date indexes.
- Do not add Publication scheduling indexes.

### Testing
- Unauthenticated request → 401.
- Invalid date range/month → 400.
- Returns only the authenticated creator's data.
- Planned Content appears.
- Content Ideas / Planning Entries appear.
- Scheduled Publications appear.
- Another user's data is absent.
- Empty range → 200 with an empty collection.
- Publication cancellation/reschedule is reflected correctly.
- Database failure → 5xx.
- Responsive and keyboard interactions work.

### Acceptance Criteria
- Calendar accurately aggregates MVP1 planning and publishing information.
- Calendar contains no standalone scheduling resource.
- Planned Content, Ideas/Planning Entries, and Scheduled Publications are represented.
- Calendar remains a focused operational view.
# 13. Background Execution

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** — (product surfaces consume domain outcomes)  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Backend foundation, Trigger.dev, PostgreSQL  
**Phase:** Publishing prerequisite

**Why this exists:** Long-running and scheduled work must not depend on the browser or an HTTP request remaining open.

### Locked Responsibility Boundary
- PostgreSQL is the authoritative source of Creator CC business state.
- Trigger.dev Tasks / Runs are execution infrastructure.
- Creator CC does not build or operate its own application-owned queue/worker system.
- Trigger.dev execution identifiers are operational metadata only.
- Publication scheduling state remains on Publication.
- Cloudflare Cron, if used, is for reconciliation/maintenance only and is not the authoritative Publication scheduler.

### Justice — Frontend
- Do not build a job-admin UI in MVP1.
- Consume execution outcomes through Publication, PublishingAttempt, notifications, and approved status surfaces.
- Never expose internal Trigger.dev execution identifiers as product resources.
- If the API exposes `publishingOperationId`, use that logical aggregate identifier according to the API contract.

### Eric — Backend
- Implement Trigger.dev Tasks / Runs for asynchronous publishing and other approved background execution.
- Create/reconcile Trigger.dev executions only after the authoritative PostgreSQL transaction.
- Store only the execution metadata required by the Database Design Document.
- Implement retry, timeout, backoff, concurrency, and failure handling according to the Reliability Specification and Trigger.dev configuration.
- Ensure cancelled or rescheduled Publications cannot be published by stale executions.
- Implement layered idempotency across API request, Publication, PublishingAttempt, execution, and provider boundaries.
- Implement safe recovery when execution completes or fails without the expected domain-state update.
- Implement structured correlation/request/execution logging.
- Do not run publishing inside the HTTP request lifecycle.

### Eric — Database
- Store authoritative Publication and PublishingAttempt state.
- Store operational Trigger.dev execution references only where defined by the schema.
- Do not create Schedule, Job, Queue, or Worker domain entities merely to support execution.
- Add indexes required for Publication/PublishingAttempt state and reconciliation queries.

### Trust — DevOps
- Provision/configure Trigger.dev for every environment that executes Trigger.dev Tasks / Runs.
- Deploy Trigger.dev Tasks / Runs through the Trigger.dev execution environment, separate from the Hono API runtime.
- Configure execution concurrency, environment variables, secrets, and observability.
- Monitor execution failures and reconciliation conditions.
- Do not operate a separate Creator CC worker process.
- Keep production and non-production execution environments isolated.

### Testing
**Unit**
- Retryable failure follows the configured retry policy.
- Terminal failure is not retried indefinitely.
- Cancellation and reschedule safeguards prevent stale execution side effects.
- Idempotency prevents duplicate execution/domain effects.

**Integration**
- Background execution is created after authoritative DB persistence.
- DB commit succeeds but execution creation fails → recoverable reconciliation path.
- Execution completes but domain completion update fails → reconciliation detects it.
- Repeated reconciliation is safe.
- API/browser closure does not interrupt scheduled publishing.
- Trigger.dev execution state cannot overwrite authoritative business state incorrectly.

### Acceptance Criteria
- Background publishing works without the browser remaining open.
- Trigger.dev is the managed execution layer.
- No Creator CC-owned queue/worker infrastructure is required.
- Publication and PublishingAttempt remain the authoritative product records.
- Execution divergence is recoverable through reconciliation.
# 14. Execution Engine

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** —
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Background Execution
**Phase:** Publishing prerequisite

**Why this exists:** Scheduling and publishing need one execution model: create → validate → submit/create Trigger.dev execution → adapter → persist result → recover. This is the domain engine that submits work to Trigger.dev execution infrastructure; Creator CC does not own a second queue.

**Read before starting:**
- **Backend Architecture Document** — §25–§34 Publishing and Scheduling Architecture, §97–§98 Critical flows
- **System Architecture Document** — §34–§37 Publishing, Partial Failure, Retry; §81–§85 critical flows
- **MVP Backend** — §14–§20 Publication / Publishing / Scheduling / Background executions / State machine / Multi-platform / Idempotency
- **Execution Plan** — §31–§35 Publishing Infrastructure through Idempotency
- **API Documentation** — §71–§72

**Write this document first:**
- **Execution Engine Design** — before any real platform publish. Cover Trigger.dev execution, scheduling, queues, Trigger.dev Tasks / Runs, retries, timeouts, idempotency, cancellation, partial failures, recovery, and monitoring.

### Justice — Frontend
- No engine UI. Justice consumes `publishingOperationId` status endpoints only.
- Never report SUCCESS because a 202 was received. See Publishing feature.

### Eric — Backend
- Implement the publishing orchestration use case: validate → create PublishingAttempt(s) → create/reconcile Trigger.dev Task / Run execution → run adapter → persist per-platform result.
- Implement the scheduled-execution use case: due Publication → validate current Publication state → create/execute PublishingAttempt → Trigger.dev Task/Run → adapter.
- Implement execution IDs / idempotency keys on the operation and on each platform attempt.
- Implement timeout per attempt.
- Implement retry classification: retryable (rate limit, 5xx, network) vs not (auth revoked, invalid media, permission denied).
- Implement cancellation and “already completed” short-circuit.
- Implement partial-failure aggregation: operation status can be `PARTIAL_SUCCESS`. See feature 17.
- Normalize provider errors into the API error contract. See **API Documentation — §73** and **MVP Backend — §41**.
- Keep adapters behind the contract in **Backend Architecture Document — §20**.

### Eric — Database
- Use `PublishingAttempt` as the immutable-enough history row. Append new attempts on retry. See **Database Design Document — §37–§40, §66**.
- Use `publishingOperationId` only as the API's logical aggregate correlation identifier; do not create a PublishingOperation domain entity. Store/use only the fields defined by the authoritative Database Design. (add the table/fields the Database Design specifies — do not invent a second history model).
- Transactions: creating attempts + Trigger.dev execution creation/reconciliation must not create an execution without its authoritative row, or create a row that can never execute, without a recovery path. See **Database Design Document — §65** and **Backend Architecture Document — §41**.

### Trust — DevOps
- Same Trigger.dev/Trigger.dev Tasks / Runs as Background Execution.
- Add dashboards for execution success/fail/partial, attempt duration, adapter errors by platform.
- Ensure clock sync (NTP) so scheduled execution is not skewed.

### Testing (Jest)

Mock platform adapters. The engine must not need the real YouTube API.

**Eric — unit**
- Publish-now and due-Publication execution both call the same orchestration function.
- Retryable vs terminal classification.
- Partial results aggregate to `PARTIAL_SUCCESS`, not generic FAILED.

**Eric — integration**
- Duplicate execution id: adapter `publish()` called once.
- Two Trigger.dev Tasks / Runs, same attempt: adapter called once.
- Adapter throws / returns garbage JSON: attempt is FAILED with a normalized error, not SUCCESS.
- Database unavailable after adapter success: recovery must not create a second provider post (idempotency key held). This is mandatory.
- Cancelled operation does not call the adapter.
- Empty version list is not an engine concern if the API already rejected it — cover that on Publishing.

**Justice:** none.

**Trust:** clock/NTP is not a Jest case; skip.

**Acceptance criteria:**
- One engine handles publish-now and scheduled publish.
- Results are persisted before the UI is allowed to say they happened.

---

# 15. Publishing

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Platform Versions, Platforms, OAuth, Media, Execution Engine
**Phase:** Publishing Operations

**Critical rule:** The frontend must never report successful publishing before backend confirmation. See matrix note, **UX Specification — §86**, **API Documentation — §39**.

**Read before starting:**
- **MVP Definition & Scope** — §13 Publishing, §14 Multi-Platform Publishing, §41 End-to-End Definition
- **User Experience Specification** — §48–§51 Publish Now, Progress, Result, Failure
- **Frontend Architecture Specification** — §37–§40 Publishing Architecture
- **Backend Architecture Document** — §25–§30, §97 Critical Publishing Flow
- **Database Design Document** — §37–§42
- **API Documentation** — §37–§43, §71
- **System Architecture Document** — §34–§36, §82–§83
- **Execution Plan** — §31–§35

**Write this document first:**
- **Social Platform Integration Specification** for each adapter used.
- **Execution Engine Design** (if not already written).
- **Feature Specifications — Publishing**.

### Justice — Frontend
- Create Publish Now on content/version with platform selection and explicit confirmation. See **UX Specification — §48** and **Frontend Architecture Specification — §38**.
- Create pre-submit UX validation (missing caption, missing media, disconnected account) while still sending the request to the backend for authoritative validation.
- Create publishing progress UI from `GET /api/v1/publishing/:publishingOperationId`. States: accepted/processing, not “published”. See **UX Specification — §49** and **API Documentation — §39–§40**.
- Create publishing result UI that lists each platform independently. See **UX Specification — §50**.
- Create publishing failure UX with the normalized reason and a retry entry point. See **UX Specification — §51**.
- Disable double-submit. See **UX Specification — §79 Duplicate Actions**.
- Never set a green “Published” toast from HTTP 202. Wait for backend status `SUCCESS` / per-platform `PUBLISHED`.
- Hide Publish when the account is disconnected or the platform capability is `publish: false`.

### Eric — Backend
- Implement `POST /api/v1/publishing` accepting `contentVersionIds` (and accounts as specified). Return **202 Accepted** with `publishingOperationId` and `status: PROCESSING` for async publish. See **API Documentation — §38–§39**.
- Run the full requirement chain before creating the Trigger.dev execution: content exists, owned, version exists, account exists, connected, platform supports publish, media ready, content valid. See **API Documentation — §43**.
- Create per-platform `PublishingAttempt` rows before calling adapters.
- Call adapters from the Trigger.dev Task / Run, not from the HTTP handler.
- Persist `externalPublicationId` on success (YouTube video ID, etc.). See **Database Design Document — §41**.
- Persist normalized `errorCode` / `errorMessage` on failure. Do not dump raw provider bodies to the creator. See **Database Design Document — §42**.
- Implement `GET /api/v1/publishing/:publishingOperationId` with operation status and per-platform results, including `PARTIAL_SUCCESS`.
- Enforce idempotency keys on publish requests. See **API Documentation — §65–§66**.

### Eric — Database
- Create `PublishingAttempt` with fields in **Database Design Document — §38**.
- Create PublishingAttemptStatus enum: `PENDING`, `PROCESSING`, `SUCCESS`, `FAILED`, `CANCELLED` (PublishingAttemptStatus only) (plus operation-level `PARTIAL_SUCCESS` if stored at operation layer).
- Append-only history: never overwrite attempt #1 when attempt #2 runs. See **§40**.
- Index by contentVersion, platformAccount, status, createdAt.

### Trust — DevOps
- Provide outbound access from Trigger.dev Tasks / Runs to each approved MVP1 launch platform (five or more) APIs.
- Set provider rate-limit budgets and alerts. See **MVP Backend — §51**.
- Keep provider API keys in secrets, not env files in git.

### Testing (Jest)

**Eric — unit**
- Requirement chain: missing media, disconnected account, unowned version each fail before the adapter is called.
- 202 accepted ≠ SUCCESS in the domain.

**Eric — integration (`publishing.int.spec.ts`)**
- Unauthenticated `POST /api/v1/publishing` → 401.
- Expired token → 401.
- Malformed JSON → 400.
- Missing `contentVersionIds` → 400.
- Empty `contentVersionIds` (`[]`) → 400.
- Unknown version id → 404.
- Another user’s version id → 403/404, no attempt row, adapter not called.
- Disconnected account → 400, adapter not called.
- Missing READY media → 400, adapter not called.
- Happy path → 202 with `publishingOperationId` and `status: PROCESSING` (not `PUBLISHED`).
- `GET` unknown operation id → 404.
- `GET` another user’s operation id → 403/404.
- Duplicate POST with the same idempotency key → one provider call, same operation id.
- Two simultaneous POSTs with the same idempotency key → one provider call.
- Two simultaneous POSTs with **different** keys for the same version: unique-execution rule still prevents two SUCCESS posts (Database Design §66).
- Adapter unexpected response → attempt FAILED, operation not SUCCESS, UI-facing payload has no raw provider secret.
- Database unavailable before Trigger.dev execution creation → 5xx, adapter not called.
- Database unavailable after adapter success → see Execution Engine; do not mark SUCCESS without a row.

**Justice — component**
- Empty platform selection cannot submit.
- Double-click: second click does not fire a second POST (button disabled).
- HTTP 202 does **not** show a “Published” toast.
- PROCESSING / SUCCESS / FAILED states render from the poll endpoint.

**Trust:** none beyond Trigger.dev Task / Run tests in Background executions/Engine.

**Acceptance criteria:**
- Real provider publish (sandbox/test channel) works.
- UI success = persisted backend success.
- Multi-platform is one operation with independent results.

---

# 16. Per-Platform Results

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Publishing
**Phase:** Publishing Operations

**Why this exists:** “Publishing: FAILED” as a single bit is insufficient. Each platform has its own result. See **MVP Definition & Scope — §14** and **Product Vision — publishing problem**.

**Read before starting:**
- **MVP Definition & Scope** — §14, §17 Publishing Status
- **API Documentation** — §40 Publishing Status
- **User Experience Specification** — §50 Publishing Result
- **Database Design Document** — §39–§42
- **Backend Architecture Document** — §26–§28
- **System Architecture Document** — §35–§36

### Justice — Frontend
- Create a per-platform result list: platform name, status, time, error reason if failed, link/id if the product is allowed to show it.
- Create status badges that distinguish Published vs Failed vs Processing vs Cancelled.
- Create content-details publishing panel that shows the latest result per platform plus access to history (next feature).
- Do not collapse mixed results into one red banner with no detail.

### Eric — Backend
- Return `results: [{ platform, status, reason? }]` on the publishing operation. See **API Documentation — §40**.
- Keep content-level status separate from platform-attempt status. See **MVP Definition & Scope — §17**.
- Never mark the whole operation SUCCESS unless every requested platform succeeded.
- Never mark the whole operation FAILED if at least one platform succeeded — that is `PARTIAL_SUCCESS`.

### Eric — Database
- One `PublishingAttempt` row per platform per execution.
- Do not store only an aggregate flag on Content.

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

**Eric — unit**
- Mixed adapter results map to per-platform statuses, never a single boolean.

**Eric — integration**
- Unauthenticated status GET → 401.
- Unknown operation id → 404.
- Another user’s operation id → 403/404.
- Fixture YouTube SUCCESS + Instagram FAILED: response contains both; YouTube remains SUCCESS after a later GET.
- Database unavailable → 5xx.

**Justice — component**
- Mixed fixture renders two rows, not one generic “Publishing failed” banner.

**Trust:** none.

**Acceptance criteria:**
- Every platform result is visible and persisted independently.

---

# 17. Partial Publishing Success

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Publishing, Per-Platform Results
**Phase:** Publishing Operations

**Example:** YouTube succeeds, Instagram fails. The system must preserve YouTube = successful, Instagram = failed. It must not convert the entire operation into an unexplained generic failure.

**Read before starting:**
- **MVP Definition & Scope** — §14
- **System Architecture Document** — §36 Partial Failure, §83 Critical Architectural Flow — Partial Failure
- **Backend Architecture Document** — §28 Multi-Platform Publishing
- **API Documentation** — §40 (`PARTIAL_SUCCESS`)
- **User Experience Specification** — §50–§51

### Justice — Frontend
- Create an explicit Partial success result screen: what published, what failed, what to do next (retry failed only).
- Do not use a single generic “Publishing failed” toast for mixed results.
- Keep successful platforms visually successful even while failed ones are retried.

### Eric — Backend
- Implement operation status `PARTIAL_SUCCESS` when mixed results occur.
- Commit successful adapter results even if a later adapter fails. Do not roll back a live YouTube upload because Instagram failed.
- Leave successful attempts `SUCCESS` with `externalPublicationId`.
- Leave failed attempts `FAILED` with error fields.
- Do not create a Trigger.dev execution for automatic republishing of successful platforms.

### Eric — Database
- Preserve both rows. No transaction that deletes the successful attempt because a sibling failed.
- Content status rules for partial success must follow the approved state machine (likely content remains in a non-fully-published operational state — implement the documented rule, do not invent).

### Trust — DevOps
- Alert on high partial-success rate per platform (provider outage signal).

### Testing (Jest)

**Eric — unit**
- Aggregator: one success + one failure → `PARTIAL_SUCCESS`.
- Successful attempt is not rolled back when a sibling fails.

**Eric — integration**
- Unauthenticated → 401.
- Another user’s operation → 403/404.
- YouTube adapter success + Instagram adapter throw: YouTube row SUCCESS with `externalPublicationId`, Instagram row FAILED, operation `PARTIAL_SUCCESS`.
- Refresh GET still returns the same split.
- Automatic republish of YouTube must not create a Trigger.dev execution.
- Database unavailable mid-second-adapter: YouTube success still persisted (or recovered), not deleted.

**Justice — component**
- Partial-success screen lists what published, what failed, and a retry-failed CTA.
- Successful platforms stay visually successful.

**Trust:** none (alerting is ops, not a Jest case unless you have a metric assertion).

**Acceptance criteria:**
- Mixed results are first-class, persisted, and visible.

---

# Reconciliation — PostgreSQL ↔ Trigger.dev

**Priority:** MVP1 Required  
**Primary Owner:** Eric  
**Frontend:** Justice  
**Backend:** Eric  
**Database:** Eric  
**DevOps:** Trust  
**Testing:** All  
**Depends on:** Publication Domain, Scheduling, Background Execution, Reliability, Idempotency  
**Phase:** Reliability & Operations

### Purpose
Reconcile temporary divergence between authoritative PostgreSQL business state and Trigger.dev execution state.

### Eric — Backend
- Detect Publications requiring execution without a valid Trigger.dev execution reference.
- Detect stale or orphaned execution references.
- Detect executions completing without corresponding domain-state completion.
- Detect ambiguous PublishingAttempts requiring safe reconciliation.
- Make reconciliation repeatable and idempotent.
- Ensure reconciliation cannot create duplicate external publication side effects.
- Treat PostgreSQL as authoritative business state.
- Treat Trigger.dev state as operational execution state.

### Trust — DevOps
- Provide the execution monitoring and scheduling needed to invoke reconciliation safely.
- Keep reconciliation/maintenance distinct from authoritative Publication scheduling.

### Testing
- Publication missing execution.
- Stale execution reference.
- Execution completed while domain state remains incomplete.
- Repeated reconciliation.
- Reschedule followed by stale old execution.
- No duplicate Publication, PublishingAttempt, or provider side effect.

### Acceptance Criteria
- DB ↔ Trigger.dev divergence is detectable.
- Reconciliation is safe to repeat.
- Reconciliation never promotes Trigger.dev into the business-state source of truth.
- Reconciliation never introduces a standalone Schedule resource.

# 18. Failed-Platform Retry

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Partial Publishing Success, Idempotency
**Phase:** Publishing Operations

**Read before starting:**
- **MVP Definition & Scope** — §43 Acceptance Criteria (safe retry)
- **User Experience Specification** — §53 Retry UX
- **Frontend Architecture Specification** — §41 Publishing Retry
- **Backend Architecture Document** — §30 Publishing Retry
- **API Documentation** — §42 Retry Publishing
- **Database Design Document** — §40, §82 Example Retry Lifecycle
- **System Architecture Document** — §37 Publishing Retry Architecture
- **Execution Plan** — §37 Retry Workflow

### Justice — Frontend
- Create “Retry failed platforms” on the result and history views.
- Identify failed platforms in the UI from backend results, not from local memory.
- Create confirmation that names the platforms that will be retried and the platforms that will be left alone.
- Create in-progress and result states for the retry operation (new attempt ids).
- Disable retry when the account needs reauthorization; send the creator to reconnect instead.

### Eric — Backend
- Implement `POST /api/v1/publications/:publicationId/retry` using the authoritative retry behavior defined in **API Documentation — §42**. Do not introduce a separate operation-level retry endpoint/model.
- Retry only failed platforms. Do not republish SUCCESS rows.
- Create new `PublishingAttempt` rows. Do not mutate the old FAILED row into SUCCESS.
- Re-run validation (account still connected, media still present, capabilities still true).
- Apply idempotency so double-click retry does not publish twice.
- Preserve successful platforms untouched.

### Eric — Database
- Append attempt #2, keep attempt #1. See **Database Design Document — §40, §82**.
- Link retries to the original operation/contentVersion so history can show the chain.

### Trust — DevOps
- Monitor retry storms (a bad adapter looping). Cap via the retry policy.

### Testing (Jest)

**Eric — unit**
- Retry targets only FAILED attempts.
- SUCCESS attempts are excluded from the retry set.

**Eric — integration**
- Unauthenticated retry → 401.
- Expired session → 401.
- Unknown attempt id → 404.
- Another user’s attempt id → 403/404, no new row.
- Retry a SUCCESS attempt → 400, no second provider call.
- Retry after disconnect → 400, no provider call.
- Happy retry of Instagram FAILED after YouTube SUCCESS: new Instagram attempt row; YouTube attempt row unchanged; YouTube adapter not called.
- Duplicate retry with the same idempotency key: Instagram adapter called once.
- Two simultaneous retries: Instagram adapter called once.
- History still contains attempt 1 FAILED and attempt 2 SUCCESS.
- Adapter unexpected response on retry → new FAILED row, old rows untouched.
- Database unavailable → 5xx, no extra SUCCESS.

**Justice — component**
- Confirm dialog names the failed platforms and the platforms that will be left alone.
- Double-click retry does not fire two POSTs.

**Trust:** none.

**Acceptance criteria:**
- Failed platforms can be retried safely.
- Successful platforms are never republished by that retry.

---

# 19. Publishing History

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Publishing, Per-Platform Results, Retry
**Phase:** Publishing Operations

**Read before starting:**
- **MVP Definition & Scope** — publishing history in §6 and §43
- **User Experience Specification** — §52 Publishing History
- **API Documentation** — §41 Publishing History
- **Database Design Document** — §40 Publishing History, §3.5 Immutable Historical Records
- **Execution Plan** — §36 Phase 16 — Publishing History

### Justice — Frontend
- Create the publishing history view (page or content-details tab) listing attempts: platform, status, time, error, retry action.
- Create filters: content, platform, status, from, to. See **API Documentation — §41**.
- Create empty state: no publishes yet.
- Create pagination.
- Do not allow the creator to “edit” a historical attempt into success.

### Eric — Backend
- Implement `GET /api/v1/publishing/history` with the documented query params, ownership scope, and pagination.
- Return attempts newest-first unless specified otherwise.
- Never omit failed attempts.
- Never rewrite history in this endpoint.

### Eric — Database
- Confirm attempts are append-only and indexed for history queries.
- Do not hard-delete attempts when content is archived unless **Database Design Document — §55–§56** says so.

### Trust — DevOps
- No extra infrastructure. Confirm retention matches **Backend Architecture Document — §71 Data Retention** when that policy is defined.

### Testing (Jest)

Read-mostly. Duplicate-request tests are not required except mark/filter abuse.

**Eric — integration**
- Unauthenticated history → 401.
- Expired session → 401.
- Unknown `contentId` filter → 200 empty or 404 per API docs; never another user’s rows.
- Another user’s attempts never appear.
- Failed attempts are present (not omitted).
- A later SUCCESS did not delete the earlier FAILED row.
- Pagination: `page`/`limit` respected; huge `limit` → 400.
- Invalid status filter → 400.
- Database unavailable → 5xx.

**Justice — component**
- Empty history state.
- Filters from the URL call the documented query params.

**Trust:** none.

**Acceptance criteria:**
- History is complete, owned, and immutable from the creator’s point of view.

---

# 20. Tasks

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Authentication, Content (for linking)
**Phase:** Content Operations

**Why this exists:** Tasks support execution of the workflow. They are content-workflow tasks, not Jira. See **MVP Definition & Scope — §20**.

**Read before starting:**
- **MVP Definition & Scope** — §20 Creator Tasks
- **User Experience Specification** — §34–§36 Tasks UX, Create Task, Task States
- **Frontend Architecture Specification** — §34 Task Architecture
- **Backend Architecture Document** — §35 Task Architecture
- **Database Design Document** — §43–§45 Task Entity
- **API Documentation** — §44–§49 Task API
- **Execution Plan** — §38 Phase 17 — Tasks

**Write this document first (if missing):**
- **Feature Specifications — Tasks** during this work.

### Justice — Frontend
- Create the tasks page at `/tasks` listing title, due date, status, linked content.
- Create “Create task” with title (required), description, due date, optional content link. See **UX Specification — §35** and **API Documentation — §45**.
- Create edit task.
- Create complete task and reopen task actions. See **API Documentation — §48–§49**.
- Create delete task with confirmation.
- Create filters: status, due date, content, overdue. See **API Documentation — §44**.
- Create overdue presentation as a computed UI state (`dueAt < now && status = OPEN`), not a stored “OVERDUE” you invent. See **Database Design Document — §45**.
- Create empty, loading, and error states.
- Show tasks on content details when a task is linked to that content.
- Do not build subtasks, assignees, kanban-for-tasks, or time tracking.

### Eric — Backend
- Implement list/create/get/update/complete/reopen/delete task endpoints as specified.
- Scope every query by `userId`.
- Allow `contentId` only if that content is owned by the same user.
- Make complete idempotent. See **API Documentation — §48**.
- Compute overdue in queries via `dueAt` + `status`, do not persist OVERDUE.
- Validate title required.

### Eric — Database
- Create `Task` with `id`, `userId`, `contentId?`, `title`, `description?`, `dueAt?`, `status`, `completedAt?`, timestamps. See **Database Design Document — §44**.
- Status enum: `OPEN`, `COMPLETED` (only).
- Foreign keys to User and optional Content.
- Indexes for `(userId, status)`, `(userId, dueAt)`.

### Trust — DevOps
- No extra infrastructure.

### Testing (Jest)

**Eric — unit**
- Reject empty title.
- Overdue is computed from `dueAt < now && status === OPEN`, not a stored `OVERDUE`.
- Complete is idempotent in domain code.

**Eric — integration**
- Unauthenticated `POST /api/v1/tasks` → 401.
- Expired session → 401.
- Missing `title` → 400.
- Empty `title` → 400.
- Malformed JSON → 400.
- Unknown `taskId` → 404.
- Another user’s `taskId` → 403/404.
- `contentId` belonging to another user → 400/403, no task row.
- Unknown `contentId` → 400/404.
- Happy create → 201 owned by the session user.
- Complete unknown id → 404.
- Complete twice → 200 both times, `completedAt` not overwritten with a later time if the spec says idempotent, status remains COMPLETED.
- Two simultaneous completes: still one COMPLETED row, no error thrown to the client beyond the documented response.
- Reopen another user’s task → 403/404.
- Delete another user’s task → 403/404.
- Database unavailable → 5xx.

**Justice — component**
- Empty title cannot submit.
- Overdue styling appears for OPEN + past dueAt.
- Complete button disabled while in flight.

**Trust:** none.

**Acceptance criteria:**
- Creator can manage workflow tasks and link them to content.
- Tasks are not a project-management product.

---

# 21. Ownership Isolation

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** — (Justice must not pass a userId to “select whose data”)
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Authentication
**Phase:** Foundation — enforced on every later feature

**Why this exists:** Creator A must never read Creator B’s content, tasks, accounts, schedules, media, notifications, or analytics. See **Database Design Document — §3.2**, **Backend Architecture Document — §11**, **API Documentation — §68**.

**Read before starting:**
- **Backend Architecture Document** — §10 Authorization, §11 Multi-Tenant Data Isolation, §57 Object-Level Authorization, §78 Authorization Tests
- **Database Design Document** — §3.2 User Data Isolation, §23 Content Ownership, §70 Security Boundaries
- **API Documentation** — §3.4, §60, §68 Resource Ownership
- **System Architecture Document** — §16–§17
- **MVP Backend** — §31 Data Ownership, §32 Authorization

### Justice — Frontend
- Never send `userId` as a body/query field to fetch “my” data. The session is the identity.
- If an API ever returns another user’s record, treat it as a blocker, not as something to hide in CSS.
- Create 404/403 pages for unauthorized deep links. Do not show “you don’t own this” in a way that confirms another user’s object exists if the API uses 404. Follow the API’s chosen pattern.

### Eric — Backend
- Load the authenticated user in middleware. Every service method takes that user id from the session, not from the client body.
- On every get/update/delete, load the resource and compare `resource.userId` (or parent content.userId).
- Apply the same check in Trigger.dev Tasks / Runs: a job must run as the owning user, never as a global god-mode.
- Add regression tests that try IDOR on every resource type: content, version, task, schedule, attempt, media, account, notification.
- Do not implement teams/roles in MVP. Isolation is one user = one tenant. See **MVP Definition & Scope — §29**.

### Eric — Database
- Every creator-owned table has `userId` or a foreign key chain to User.
- Foreign keys prevent orphaned cross-user links (version to someone else’s content, task to someone else’s content).
- Do not create a shared/global content table without userId.

### Trust — DevOps
- Separate staging and production databases.
- Restrict DB credentials per service. No ad-hoc production queries from laptops without audit.
- Ensure logs do not dump other users’ payloads to a shared debug channel.

### Testing (Jest)

This feature **is** the IDOR suite. Re-run it on every new resource. If a new endpoint ships without a line here, it is not done.

**Eric — integration (`idor.int.spec.ts`)**
For **each** of: content, content version, task, Publication, publishing attempt, media, platform account, notification:
- Unauthenticated GET/PATCH/DELETE → 401.
- Expired token → 401.
- Authenticated user B using user A’s id → 403/404 and **empty body** (no title, no caption, no email).
- List endpoints for user B never include user A’s ids.
- Worker/job payload forged with user A’s content and user B’s account is rejected.

Also:
- Client-supplied `userId` in a create body is ignored; the row belongs to the session user.
- Database unavailable → 5xx, not an open ACL.

**Justice — component**
- No control that sends `userId` as “who to fetch”.
- A 403/404 details view does not render leftover cached data from a previous user (session-switch test).

**Trust:** none.

**Acceptance criteria:**
- IDOR tests exist and pass for every MVP resource.
- Frontend cannot select another tenant.

---

# 22. Validation

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** API foundation
**Phase:** Foundation — applied on every endpoint and form

**Read before starting:**
- **Backend Architecture Document** — §3.3 Validate at the Boundary, §43 API Validation, §79 Validation Tests
- **API Documentation** — §3.5, §57–§59 Error Contract / Validation Errors
- **Frontend Architecture Specification** — §22–§24 Forms, Backend vs Frontend validation
- **Database Design Document** — §63 Data Validation, §64 Enum Strategy
- **User Experience Specification** — §73 Form Accessibility, error states
- **MVP Backend** — §36 Input Validation, §40 Error Model

### Justice — Frontend
- Create Zod (or approved) schemas for every form: auth, content, version, task, Publication scheduling, settings.
- Create inline field errors from both client schema and backend `validation` error payloads. Map API field errors to inputs. See **API Documentation — §59**.
- Create accessible error announcements. See **UX Specification — §73**.
- Do not block the user with client-only rules that the backend does not have, and do not skip client UX checks that the UX spec requires.
- Never trust client validation for security (file type, ownership, status).

### Eric — Backend
- Validate every request body, query, and param before application logic. See **Backend Architecture Document — §3.3**.
- Use a shared error contract for validation failures. See **API Documentation — §57–§59**.
- Validate enums, UUIDs, dates, timezones, platform ids, pagination limits.
- Validate file type/size on media.
- Validate state transitions in domain code.
- Reject unknown fields where the contract is strict.
- Do not depend on Prisma throwing as the only validation.

### Eric — Database
- Use enums and NOT NULL / unique / foreign keys as a second line, not the first. See **Database Design Document — §63–§64**.
- Do not rely on the database to produce user-facing validation messages.

### Trust — DevOps
- No extra infrastructure. Ensure 400s are not paged as 500s in alerting.

### Testing (Jest)

**Eric — unit (`validation.spec.ts`)**
Table-drive:
- empty string, `null`, missing key, wrong type (string where number, array where object).
- unknown enum values.
- invalid UUID.
- invalid IANA timezone.
- pagination `limit=0`, `limit=-1`, `limit=100000`.

**Eric — integration**
- Malformed JSON on a mutating route → 400, not 500.
- Extra unknown fields: rejected if the contract is strict, ignored only if the API doc says so — pick one and test it.
- Error payload matches API Docs §57–§59 (field name + message, no stack trace, no SQL).
- Database constraint failure still returns the error envelope, not a raw Prisma dump.

**Justice — component**
- Empty required fields block submit.
- Backend field errors map to the matching input.
- Screen-reader / aria-invalid is set on the invalid field (query by role).

**Trust:** none. Do not page 400s as 500s — that is an alert-rule review, not a product Jest case.

**Acceptance criteria:**
- Invalid input cannot enter domain logic.
- Errors are consistent and field-mappable.

---

# 23. Reliability / Error Handling

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Background Execution, Publishing
**Phase:** Reliability

**Read before starting:**
- **MVP Definition & Scope** — §37 Reliability Boundary
- **Backend Architecture Document** — §44–§46 Errors, §49–§51 Worker/Queue/Platform failures, §81 Failure Testing
- **API Documentation** — §56–§58, §73 Platform Provider Errors
- **User Experience Specification** — §77–§78, §83 Error Recovery, §92 External Platform Dependency
- **Frontend Architecture Specification** — §48–§49 Error Boundaries / Network, §73 Error Message Architecture, §85 Failure Conditions
- **System Architecture Document** — §46–§48 Error Architecture
- **MVP Backend** — §40–§43 Error model, platform error normalization, retry policy, reliability
- **Execution Plan** — §50 Failure-Path Testing, §73 Failure Recovery QA

**Write this document first:**
- **Reliability & Error Handling Document** — before publishing goes live.

### Justice — Frontend
- Create app error boundary pages that do not blank the whole shell.
- Create network-failure state with retry. See **UX Specification — §78**.
- Create mapping from API error codes to creator-readable copy. Do not show stack traces or provider raw JSON.
- Create recovery actions: reconnect account, retry publish, edit version, go to content.
- Create timeout UX for long publishing without lying about success.

### Eric — Backend
- Implement the standard error envelope and HTTP mapping. See **API Documentation — §56–§58**.
- Normalize platform errors (rate limit, auth, invalid media, not found, unknown). See **API Documentation — §73** and **MVP Backend — §41**.
- Classify retryable vs terminal errors for the engine.
- Persist enough error context for support without storing secrets.
- Return 202 for accepted async work, 4xx for invalid requests, 5xx only for unexpected failures.
- Add correlation ids on every response. See **API Documentation — §80**.

### Eric — Database
- Store `errorCode` and safe `errorMessage` on PublishingAttempt.
- Do not store raw provider tokens in error columns.

### Trust — DevOps
- Wire structured logs, correlation ids, error tracking (Sentry or approved).
- Alert on 5xx rate, Trigger.dev Task / Run crash, Trigger.dev down, provider 5xx.
- **Write Observability & Monitoring document** before staging. See later ops features.

### Testing (Jest)

**Eric — unit**
- Provider 401 / 429 / 500 / timeout / garbage JSON each map to a normalized error code.
- Retryable vs terminal classification.

**Eric — integration**
- Unauthenticated still 401 (do not turn auth failures into 500).
- Adapter timeout → attempt FAILED, operation not SUCCESS.
- Adapter 429 → retryable path, not a crash.
- Adapter unexpected HTML/JSON → FAILED + normalized message, raw body not sent to the client.
- Database unavailable → 5xx envelope with correlation id, no stack in production-shaped config.
- Trigger.dev unavailable during publish execution creation → documented 5xx, no fake SUCCESS.

**Justice — component**
- Network failure (mocked fetch reject) shows retry, not a blank page.
- Error boundary catches a render throw and keeps the app shell.
- 5xx payload does not render `stack` even if present.

**Trust — infra**
- Health check fails when Postgres or Trigger.dev is down (Jest against the health endpoint with the dependency mocked down).

**Acceptance criteria:**
- Failures are persisted, explained, and recoverable where the product allows retry.
- The system does not pretend success.

---

# 24. Idempotency

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice (duplicate-submit UX only)
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** API foundation; required before Publishing and Scheduling
**Phase:** Reliability

**Read before starting:**
- **Backend Architecture Document** — §3.5 Idempotent Critical Operations, §29 Publishing Idempotency
- **API Documentation** — §65 Idempotency, §66 Duplicate Submission Protection, §83 Webhook Idempotency
- **Database Design Document** — §66 Publishing Idempotency, §67 Publication Scheduling Idempotency
- **System Architecture Document** — §33 Job Idempotency, §64 Duplicate Operation Protection
- **MVP Backend** — §20 Idempotency
- **Execution Plan** — §35 Publishing Idempotency
- **Frontend Architecture Specification** — §94 Mutation Idempotency UX
- **User Experience Specification** — §79 Duplicate Actions

### Justice — Frontend
- Disable submit buttons while a publish/schedule/complete-task request is in flight.
- Send the approved idempotency header/key on publish and schedule if the API contract requires it. See **API Documentation — §65**.
- Do not retry a publish on a flaky network with a new key unless the user explicitly retries.
- Show “already published / already scheduled” when the backend returns the existing result.

### Eric — Backend
- Require/accept idempotency keys on publish, schedule, OAuth callback completion, and other side-effecting operations listed in the API doc.
- If the same key is replayed, return the original result; do not execute a second provider call. See **Backend Architecture Document — §3.5**.
- Protect Trigger.dev Tasks / Runs with a unique execution constraint so two Trigger.dev Tasks / Runs cannot run the same attempt.
- Make task complete idempotent.
- Make webhook handlers idempotent when webhooks are added. See **API Documentation — §83**.

### Eric — Database
- Create the uniqueness / idempotency records specified in **Database Design Document — §66–§67**.
- Unique job/attempt execution id.
- Unique active Publication scheduling state as specified by Database Design §67.

### Trust — DevOps
- No extra infrastructure. Confirm Trigger.dev locks (if used) fail safe.

### Testing (Jest)

If a side effect can run twice, this feature owns the test.

**Eric — unit**
- Same idempotency key returns the stored result without calling the side-effect function a second time.

**Eric — integration**
Required on publish, schedule, OAuth callback, task complete:
- Duplicate sequential request, same key → one side effect.
- Duplicate simultaneous request, same key → one side effect.
- Duplicate sequential request, **different** key, same resource: still protected by the unique-execution constraint where Database Design §66–§67 require it (especially publish).
- Missing idempotency key: follow the API doc (reject vs generate). Test whichever the doc says. Do not invent the other.
- Replay after success returns the original operation, not a new provider post.

**Justice — component**
- In-flight submit disables the button.
- A 409/200 replay shows “already published/scheduled/completed”, not a second spinner that looks like a new job.

**Trust:** none unless Trigger.dev locks are the implementation — then one test that Trigger.dev is down fails closed (no double post).

**Acceptance criteria:**
- Duplicate submit cannot double-post to a social platform.

---

# 25. Dashboard Enhancements

**Priority:** MVP1 Required
**Primary Owner:** Justice
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Content, Tasks, Scheduling, Publishing, Platforms
**Phase:** After core loop works — do not start this before Milestone 6 publishing operations are real

**Why this exists:** The dashboard answers “What do I need to do right now?” It is not a second analytics product. See **MVP Definition & Scope — §22**.

**Read before starting:**
- **MVP Definition & Scope** — §22 Dashboard
- **User Experience Specification** — §17–§20 Dashboard UX
- **Frontend Architecture Specification** — §45 Dashboard Architecture
- **API Documentation** — §13 Dashboard API
- **Execution Plan** — §41–§42 Phase 20 — Dashboard, Dashboard Priority

**Dashboard priority order (Execution Plan §42):**
1. Critical failures
2. Tasks due today
3. Upcoming publishing
4. Content requiring attention
5. Recent activity
6. General statistics

### Justice — Frontend
- Create the dashboard page at `/dashboard` (or `/`) with the approved structure. See **UX Specification — §18**.
- Create a “critical failures” module (failed publishes, accounts needing reauth).
- Create a “today’s tasks” module.
- Create an “upcoming scheduled content” module.
- Create a “content requiring attention” module (drafts stuck, failed, missing versions).
- Create a “recently published” module.
- Create platform connection status summary.
- Create empty dashboard state for a brand-new creator. See **UX Specification — §20**.
- Create loading skeletons per module so one slow module does not blank the page.
- Do not add charts that belong to Analytics until Analytics is pulled.
- Do not turn the dashboard into a second pipeline or a second calendar.

### Eric — Backend
- Implement `GET /api/v1/dashboard` (or documented equivalent) that returns bounded widgets. See **API Documentation — §13**.
- Scope every widget to the user.
- Keep queries cheap and bounded. See **MVP Definition & Scope — §38 Performance Boundary**.
- Do not embed full content lists; return summaries.

### Eric — Database
- No Dashboard table. Compose from Content, Task, Publication, PublishingAttempt, PlatformAccount, Activity.
- Confirm indexes support “due today”, “upcoming scheduled Publications”, “recent failed attempts”.

### Trust — DevOps
- Watch dashboard query latency in staging.

### Testing (Jest)

Read-only composition. No publish side effects.

**Eric — integration**
- Unauthenticated dashboard → 401.
- Expired session → 401.
- Widgets contain only this user’s failures, tasks, Publications/publication scheduling state.
- Another user’s failed publish is absent.
- New user → 200 with empty widgets, not 500.
- Database unavailable → 5xx.

**Justice — component**
- Each module has an empty state and a skeleton.
- One module error does not blank the whole dashboard (if the API is split; if it is one payload, the page shows the error state).

**Trust:** none.

**Acceptance criteria:**
- A returning creator can see what needs attention today.
- Dashboard is MVP1 Required and must not block publishing.

---

# 26. Notifications

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Publishing, Platforms, Tasks
**Phase:** After core loop — in-app only for MVP

**Read before starting:**
- **MVP Definition & Scope** — §24 Notifications (limited)
- **User Experience Specification** — §54–§55 Notifications UX
- **Frontend Architecture Specification** — §44 Notifications, §72 Toasts
- **Backend Architecture Document** — §36–§37 Notification Architecture / Deduplication
- **Database Design Document** — §46–§49 Notification Entity
- **API Documentation** — §50–§53
- **Execution Plan** — §39 Phase 18 — Notifications
- **System Architecture Document** — §42–§43

### Justice — Frontend
- Create the notification center (header bell + list) with unread state. See **UX Specification — §55**.
- Create mark-one-read and mark-all-read.
- Create click-through to the related content/publish/account.
- Create empty state.
- Create in-app toasts for events that happen while the app is open, without duplicating the persistent notification incorrectly.
- Do not build email/push/SMS in MVP. **MVP Definition & Scope — §24**: email is not required.

### Eric — Backend
- Implement list, mark read, mark all read.
- Create notifications for: `PUBLISHING_FAILED`, `PLATFORM_REAUTH_REQUIRED`, `SCHEDULE_FAILED`, `TASK_DUE` (optional per MVP §24). See **API Documentation — §53**.
- Deduplicate noisy repeats. See **Backend Architecture Document — §37**.
- Scope to user. Never put tokens in the payload.

### Eric — Database
- Create `Notification` with fields in **Database Design Document — §47**.
- Unread = `readAt IS NULL`.
- Type enum as specified in **§49**.
- Indexes `(userId, createdAt)`, `(userId, readAt)`.

### Trust — DevOps
- No email provider required for MVP. Do not provision SES “just in case”.

### Testing (Jest)

**Eric — unit**
- Unread ⇔ `readAt IS NULL`.
- Dedup: two identical `PUBLISHING_FAILED` events for the same attempt do not create an unbounded list (per Backend Architecture §37).

**Eric — integration**
- Unauthenticated list → 401.
- Unknown notification id on read → 404.
- Another user’s notification id → 403/404, their `readAt` still null.
- Mark-read twice (duplicate) → still read, no 500.
- Mark-all-read only updates this user’s rows.
- Failed publish fixture creates `PUBLISHING_FAILED` for the owner only.
- Database unavailable → 5xx.

**Justice — component**
- Empty bell state.
- Unread badge clears after mark-read.
- Click-through uses the related content/publish id from the API.

**Trust:** none. Do not add SES tests.

**Acceptance criteria:**
- Limited in-app operational notifications work.
- No email requirement.

---

# 27. Basic Analytics

**Priority:** MVP1 Required
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All
**Depends on:** Publishing (need published posts to attach metrics)
**Phase:** After core loop. **Sequence after the core publishing path if necessary, but complete before MVP1 release.** See **MVP Definition & Scope — §26**.

**Read before starting:**
- **MVP Definition & Scope** — §26 Basic Analytics
- **User Experience Specification** — §56–§57 Analytics UX
- **Backend Architecture Document** — §53–§54 Analytics Architecture / Freshness
- **Database Design Document** — §51–§52 Analytics Data / Snapshot Principle
- **API Documentation** — §54 Analytics API
- **System Architecture Document** — §44 Analytics Architecture
- **MVP Backend** — §27–§28 Analytics Service / Retention

**Write this document first (if pulling this feature):**
- **Feature Specifications — Analytics**. If platform APIs make this disproportionately hard, stop and leave it post-core.

### Justice — Frontend
- Create basic analytics surfaces through Dashboard and relevant Content/Publishing performance experiences; do not introduce Analytics as a primary MVP1 navigation destination with the approved simple metrics (views, likes, comments, shares, followers if available). See **UX Specification — §56**.
- Create empty state when nothing is published or the platform has no data. See **§57**.
- Create loading and “data delayed / unavailable” states. Analytics must not look like publishing failed.
- Do not build competitor intel, predictions, or AI insights. See **MVP Definition & Scope — §30**.

### Eric — Backend
- Implement `GET /api/v1/analytics` as specified, scoped to the user.
- Pull metrics through adapters if the Social Platform Integration Spec says the platform allows it.
- Snapshot/store only what **Database Design Document — §51–§52** allows. Do not become a warehouse.
- Fail soft: analytics errors must not break publishing or dashboard MVP1 Required widgets.

### Eric — Database
- Create only the snapshot tables specified in **§51–§52**. If the document says snapshots, do not store raw third-party dumps.
- No analytics rows for other users.

### Trust — DevOps
- Rate-limit provider metric pulls. Schedule them off the request path.
- Do not let analytics background executions starve the publishing queue. Use Trigger.dev execution queues/concurrency controls if needed; do not create Creator CC-owned queue infrastructure.

### Testing (Jest)

Soft-fail feature. If these tests start requiring brittle live provider metrics, stop and defer the feature (MVP Definition §26).

**Eric — integration**
- Unauthenticated → 401.
- Another user’s metrics absent.
- Empty published set → 200 empty, not 500.
- Provider unexpected response → 200 with unavailable/empty per spec, **or** 5xx that does **not** break `POST /api/v1/publishing` in the same process.
- Database unavailable → 5xx on analytics only.

**Justice — component**
- Empty and “data unavailable” states.
- Does not render competitor/AI insight modules.

**Trust:** analytics background executions must not starve the publishing queue — assert they use a different Trigger.dev queue/concurrency isolation in config, not a load test in this feature.

**Acceptance criteria:**
- Basic metrics may ship after the core loop.
- They must not delay or destabilize publishing.

---

# 28. Basic Platform Preview

**Priority:** MVP1 Required
**Primary Owner:** Justice
**Frontend:** Justice
**Backend:** Eric (capabilities / version payload only)
**Database:** — (no preview table)
**DevOps:** —
**Testing:** All
**Depends on:** Platform Versions
**Phase:** After version editor works. **Sequence after the core publishing path if necessary, but complete before MVP1 release.** See **MVP Definition & Scope — §25**.

**Read before starting:**
- **MVP Definition & Scope** — §25 Basic Preview
- **User Experience Specification** — §58 Preview UX
- **Frontend Architecture Specification** — §32 Platform Version Editor, §71 Media Preview

### Justice — Frontend
- Create a basic preview pane in the version editor approximating title/caption/hashtags/media layout per platform.
- It does not need to be pixel-perfect. Do not reverse-engineer the live Instagram app.
- Create a “this is an approximation” label so creators are not misled.
- If preview work starts to delay publishing, stop. Record remaining preview work as post-core.

### Eric — Backend
- Provide version fields and platform capability limits the preview needs. No screenshot service, no headless social-app renderer.

### Eric — Database
- No Preview entity.

### Trust — DevOps
- None.

### Testing (Jest)

No Preview table, no provider scrape.

**Eric — integration**
- Unauthenticated version GET (the payload preview uses) → 401.
- Another user’s version → 403/404.
- Do not add a `/api/v1/preview/scrape` test — that endpoint must not exist.

**Justice — component (`PlatformPreview.spec.tsx`)**
- Renders title/caption/hashtags from the version fixture.
- Empty caption still renders the approximation chrome, not a crash.
- Missing media shows a placeholder.
- “Approximation” label is present.
- No network call to instagram.com / tiktok.com / youtube.com from the component (mock `fetch` and assert).

**Trust:** none.

**Acceptance criteria:**
- Useful approximation only.
- Not a blocker for MVP publishing.

---

# Cross-cutting work the matrix implies but did not name

These are not optional if the features above are to ship.

## 29. Settings / Account

**Priority:** MVP1 Required (account deletion is in MVP Definition §7.1 and §36)
**Primary Owner:** Eric
**Frontend:** Justice
**Backend:** Eric
**Database:** Eric
**DevOps:** Trust
**Testing:** All

**Read before starting:**
- **User Experience Specification** — §59 Settings UX, §60 Account Deletion UX
- **Execution Plan** — §43 Phase 21 — Settings
- **API Documentation** — §12 User Profile, §55 Account Deletion
- **Database Design Document** — §73 Account Deletion
- **Backend Architecture Document** — §70 Account Deletion

### Justice — Frontend
- Create Settings: profile, timezone, notification preferences (in-app), security (logout, password change if specified), connected accounts shortcut.
- Create account deletion flow with typed confirmation. See **UX Specification — §60**.

### Eric — Backend
- Implement profile update, timezone update, account deletion that removes/anonymizes data per **§73**.
- Delete or disconnect tokens as part of account deletion.

### Eric — Database
- Implement the delete plan in **Database Design Document — §73**. Do not leave tokens or media objects behind.

### Trust — DevOps
- Confirm R2 objects for that user are deleted or lifecycle-expired after account deletion.

### Testing (Jest)

**Eric — unit**
- Reject empty name, invalid timezone.
- Account deletion requires the documented confirmation signal.

**Eric — integration**
- Unauthenticated profile PATCH → 401.
- Expired session → 401.
- Missing/empty required profile fields → 400.
- Malformed JSON → 400.
- Invalid timezone → 400.
- Another user’s id in the URL (if any) → 403/404.
- Account deletion without confirmation payload → 400, user still ACTIVE.
- Account deletion happy path: session dies, tokens unusable, subsequent login of that session 401.
- Duplicate deletion request: second call 404/401, not 500.
- Database unavailable mid-delete → 5xx, define whether the user is still able to login (no half-deleted auth).

**Justice — component**
- Empty profile name cannot save.
- Deletion requires typed confirmation; mismatch does not call the API.

**Trust — infra**
- After deletion, a Jest/cleanup assertion that the user’s R2 prefix is gone or marked for lifecycle (if the media doc requires it).

---

## 30. Documentation tasks (create these at the stated time)

Assume the team has not read anything. The first task in a phase is “read”, the second is “write the missing spec”, the third is “implement”.

| When | Document to write | Owner | Priority | Blocks |
|---|---|---|---|---|
| Before + during development | **Security Document** | Eric + Trust | Critical | Auth, OAuth, media, account deletion |
| During each feature | **Feature Specifications** (Content, Pipeline, Calendar, Tasks, Platforms, Publishing, Preview, Analytics, Sponsorships-as-out-of-scope note) | Shared (Eric + Justice) | High | That feature’s implementation |
| Before media implementation | **File & Media Management Document** | Eric + Trust | High | Media Management |
| Before scheduling | **Background Execution & Scheduling Document** | Eric + Trust | Critical | Scheduling, Calendar, Background executions |
| Before publishing | **Execution Engine Design** | Eric | Critical | Publishing, retry, partial success |
| Before each platform | **Social Platform Integration Specification** (the approved MVP1 launch set (five or more platforms)) | Eric | Critical | That platform’s OAuth + adapter |
| Before publishing/background executions go live | **Reliability & Error Handling Document** | Eric | Critical | Publishing, background executions |
| During backend development | **Backend Testing Document** | Eric + All | High | QA sign-off. Must include the Jest unit + integration matrix from this board. |
| During frontend development | **Frontend Testing Document** | Justice + All | High | QA sign-off. Must include the Jest component cases from this board. |
| Continuously | **ADRs** (one per architecture decision) | Eric | Required | Drift |
| Before staging/production | **Deployment & DevOps Document** | Trust | Critical | Staging |
| Before staging/production | **Observability & Monitoring Document** | Trust + Eric | Critical | Staging |
| Before staging/production | **Performance & Scalability Document** | Eric + Trust | High | Load |
| Before production | **Release Checklist** | Shared | Critical | Prod |
| At/after release | **User Guide** | Justice + Shared | Normal | Support |
| At/after release | **Developer Guide** | Eric | Normal | Onboarding new engineers |

**Out of scope documents to explicitly mark, not write as implementation specs:**
- Sponsorships, Teams, AI, Creator CRM, Financial management — record as **Post-MVP** in Feature Specifications so nobody “just starts them”.

---

## 31. Responsive & Accessibility (Justice primary, All test)

**Read:** **UX Specification — §63–§74**, **Frontend Architecture Specification — §51–§62**, **Execution Plan — §45–§46, §71**.

### Justice — Frontend
- Create desktop, tablet, and mobile layouts for every MVP1 Required page.
- Create mobile navigation. See **UX Specification — §6**.
- Create keyboard access, focus management, semantic HTML, accessible dialogs, accessible status indicators.
- Meet WCAG 2.2 AA for MVP screens.

### Testing (Jest)

Not a product API. Test the UI contract.

**Justice — component**
- Each MVP1 Required page has a test that the primary landmark/nav is present at a mobile viewport (`width: 375`).
- Dialogs trap focus (one dialog test as the pattern; do not duplicate 20 times).
- Forms have associated labels (query by label text, not by placeholder only).

**Eric:** none unless a component calls an API — then 401 still redirects.

**Trust:** none.

---

## 32. Deployment, Observability, Release (Trust primary)

**Read:** **Execution Plan — §61–§68, §93–§96**, **System Architecture Document — §52–§59**, **Backend Architecture Document — §82–§85**.

### Trust — DevOps
- Write **Deployment & DevOps Document** before staging.
- Provision staging: API, web, Trigger.dev Task / Run, Postgres, Trigger.dev, R2, secrets.
- Run migrations as part of deploy.
- Write **Observability & Monitoring Document**: logs, metrics, traces, alerts, correlation ids.
- Write **Release Checklist** and execute production smoke tests from **Execution Plan — §95**.

### Eric — Backend
- Health checks. See **Backend Architecture Document — §63**.
- Config via environment, not hardcoded provider keys.

### Testing (Jest + staging smoke)

Jest cannot replace staging. Split it:

**Eric — integration (against staging or docker-compose, not mocked)**
- Health endpoints: API, Trigger.dev Task / Run, Postgres, Trigger.dev.
- Unauthenticated write still 401 in staging.
- One sandbox publish path if credentials exist; otherwise skip with an explicit `describe.skip` and a release-checklist item — do not fake SUCCESS.

**All — staging smoke (Execution Plan §68 / §95)**
- Register → onboard → connect (sandbox) → create content → create version → schedule or publish → see per-platform result.
- After API restart, a due Publication still executes.

**Trust**
- Migrations run on deploy; a failing migration fails the deploy, not a half-applied schema.

---

# Suggested MVP1 Required Build Order

Do not reshuffle the architectural dependencies below without updating the Execution Plan.

1. Foundation + security baseline
2. PostgreSQL / Prisma + API foundation
3. Authentication + onboarding + ownership isolation + validation
4. Content management
5. Content organization + search/filtering
6. Content pipeline and state-machine enforcement
7. Content relationships + platform versions
8. Platform capability registry + platform adapter contract
9. Platform connections + OAuth/token security
10. Temporary media handling + R2 lifecycle
11. Trigger.dev execution architecture + reliability/idempotency
12. Scheduling + calendar
13. Publishing + per-platform results + partial success + retry + history
14. Tasks
15. Settings / creator profile / preferences
16. Dashboard + notifications + basic analytics + basic preview
17. Responsive/accessibility hardening
18. Integration, end-to-end, staging, deployment, observability, and release validation

**MVP1 Required is not complete when pages exist.** It is complete when the approved MVP1 Required workflow operates with real PostgreSQL persistence, real supported platform integrations where required, durable Trigger.dev execution, correct authorization, idempotency, recovery, security, and passing tests.


# Out of scope — do not create tasks that implement these

The following are outside the active MVP1 Required implementation scope:

- MVP2 business/engagement functionality
- MVP3 AI functionality
- MVP4 livestream infrastructure
- Team collaboration / roles / permissions
- Creator CRM
- Full financial/accounting functionality
- Permanent creator media library
- Professional media editor
- Enterprise functionality
- Full bookkeeping/tax/bank integrations

If a task implements one of these capabilities, move it to the appropriate future-MVP specification instead of implementing it in MVP1 Required.
