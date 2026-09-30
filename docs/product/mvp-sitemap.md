# Creator Command Center — MVP Sitemap

**Document Status:** Final / Locked  
**Document Version:** MVP-SM v2.0  
**Product Stage:** MVP1 Definition / Implementation Contract  
**Last Updated:** September 2026  
**Audience:** Product, UX, UI Design, Frontend, Backend, QA, DevOps

---

# 1. Purpose

This document defines the official information architecture and sitemap for the Creator Command Center MVP1.

The sitemap is the structural contract between:

- Product scope
- User Experience Specification
- Frontend Architecture
- UI Design System
- Frontend implementation
- Backend/API ownership

The sitemap defines where approved MVP1 workflows live in the product. It does not define visual styling, component implementation, database structure, or backend route implementation.

The frontend must follow this hierarchy rather than introducing disconnected pages or navigation patterns.

---

# 2. Authority and Precedence

The sitemap must remain consistent with the locked product documentation set.

For user-facing structure, the relevant authority order is:

1. MVP Definition & Scope
2. User Experience Specification
3. Frontend Architecture Specification
4. UI Design System
5. MVP Sitemap
6. Feature-level implementation specifications

A feature specification may refine page behavior or interaction details, but it must not contradict a locked higher-level document.

If a conflict is discovered, implementation must stop for the affected area until the authoritative document is updated and the sitemap is synchronized.

The sitemap must not be used to introduce functionality that is outside the approved MVP1 scope.

---

# 3. MVP1 Information Architecture Principles

The MVP1 information architecture follows these principles:

1. Organize the product around the creator workflow.
2. Make Content the central operational workspace.
3. Keep Pipeline under Content rather than exposing it as a separate top-level destination.
4. Treat Calendar as the primary planning and scheduling destination.
5. Treat Publishing as the operational publishing-status destination.
6. Treat Platforms as the destination for platform connections and platform management.
7. Keep Analytics out of primary navigation in MVP1.
8. Surface basic analytics through Dashboard and relevant Content/Publishing surfaces.
9. Keep Notifications accessible through the global notification control rather than promoting it to primary navigation.
10. Keep Settings as a secondary application area.
11. Keep Authentication outside the authenticated application shell.
12. Keep Onboarding between successful authentication and normal application use.
13. Preserve the same information architecture across desktop and mobile.
14. Do not expose MVP3 or MVP4 functionality during MVP1.
15. During MVP1, only approved MVP2 functionality may be represented as Coming Soon.
16. Coming Soon is a UI availability state only and must not imply hidden APIs, database entities, jobs, integrations, services, or business logic.
17. Every page must have a clear purpose and ownership.
18. A workflow should have one authoritative location, with contextual links allowed from other areas.
19. Backend/API architecture must not dictate an inconsistent user-facing hierarchy.
20. Navigation changes require explicit review before implementation.

---

# 4. MVP1 Product Hierarchy

```text
Creator Command Center
│
├── Public / Authentication
│   ├── Sign In
│   ├── Sign Up
│   ├── Forgot Password
│   └── Reset Password
│
├── Onboarding
│   ├── Welcome
│   ├── Creator Profile
│   ├── Primary Platforms
│   ├── Connect Platforms
│   └── Completion
│
└── Authenticated Application
    │
    ├── Dashboard
    │
    ├── Content
    │   ├── All Content
    │   ├── Pipeline
    │   ├── Create Content
    │   ├── Content Details
    │   ├── Edit Content
    │   ├── Platform Versions
    │   ├── Content Relationships
    │   ├── Content Planning / Ideas
    │   └── Production Planning / Shooting Checklist
    │
    ├── Calendar
    │   ├── Planned Content
    │   ├── Content Ideas / Planning Entries
    │   └── Scheduled Publications
    │
    ├── Tasks
    │   ├── Task List
    │   ├── Create Task
    │   ├── Edit Task
    │   ├── Task Details
    │   └── Task Completion / Reopen
    │
    ├── Publishing
    │   ├── Publishing Overview
    │   ├── Active / Processing
    │   ├── Published
    │   ├── Failed
    │   ├── Partial Results
    │   ├── Publishing History
    │   └── Publication Details
    │
    ├── Platforms
    │   ├── Supported Platforms
    │   ├── Connected Accounts
    │   ├── Connect Platform
    │   ├── Account Details
    │   ├── Reauthorization
    │   └── Disconnect
    │
    └── Settings
        ├── Profile
        ├── Preferences
        ├── Notifications
        ├── Security
        └── Account
```

---

# 5. Primary Navigation

The MVP1 authenticated application shell uses the following primary navigation:

```text
Dashboard

Content
  ├── All Content
  └── Pipeline

Calendar

Tasks

Publishing

Platforms

Settings
```

The navigation must not contain:

- A top-level Pipeline item
- A top-level Analytics item
- A Connected Accounts item
- A Livestreaming item
- An AI item
- A Projects item
- A Campaigns item
- A Sponsorships item
- A Revenue item
- A Social Inbox item
- A CRM item

Platform account management belongs under **Platforms**.

Analytics is not a primary navigation destination in MVP1. Basic analytics are surfaced through Dashboard and relevant Content/Publishing surfaces.

---

# 6. Desktop Application Shell

The desktop application shell is structurally:

```text
┌─────────────────────────────────────────────────────────────┐
│ Logo / Workspace                         Search  Bell  User │
├──────────────────────┬──────────────────────────────────────┤
│ Dashboard            │                                      │
│                      │                                      │
│ Content              │              Main Content            │
│   All Content        │                                      │
│   Pipeline           │                                      │
│                      │                                      │
│ Calendar             │                                      │
│ Tasks                │                                      │
│ Publishing           │                                      │
│ Platforms            │                                      │
│ Settings             │                                      │
│                      │                                      │
│ Theme                │                                      │
│ Logout               │                                      │
└──────────────────────┴──────────────────────────────────────┘
```

The visual treatment belongs to the UI Design System and Figma.

The sitemap controls the information hierarchy.

---

# 7. Global Header Controls

The authenticated application may provide global controls for:

- Search
- Notifications
- User/account
- Theme
- Logout

These controls are not additional primary navigation destinations.

## 7.1 Search

Search provides access to approved searchable creator content and related workflow information.

Search must not introduce a separate content-management hierarchy.

## 7.2 Notifications

Notifications are accessed through the global notification control.

Notification presentation may be:

- Bell dropdown
- Notification drawer
- Notification panel
- Dedicated contextual view

The component choice belongs to UX/UI implementation.

Notifications must link back to the authoritative workflow where appropriate.

## 7.3 User / Account

The account control provides access to approved account/profile actions.

## 7.4 Theme

Theme is a global application preference.

## 7.5 Logout

Logout terminates the authenticated session through the backend-controlled authentication flow.

---

# 8. Mobile Navigation — Locked MVP1 Shell

The MVP1 mobile shell is definitive.

```text
┌──────────────────────────────────┐
│ ☰   Search   🔔   Account        │
├──────────────────────────────────┤
│                                  │
│            Page Content           │
│                                  │
└──────────────────────────────────┘
```

The mobile shell uses:

- Hamburger menu
- Rectangular Search control
- Notification Bell
- User/Account control

Primary navigation is exposed through the hamburger/mobile menu.

Theme and Logout are available through the mobile menu/options.

**MVP1 does not use a bottom navigation bar.**

The mobile presentation may change visually while preserving this information architecture.

---

# 9. Mobile Menu Hierarchy

```text
Mobile Menu
│
├── Dashboard
│
├── Content
│   ├── All Content
│   └── Pipeline
│
├── Calendar
├── Tasks
├── Publishing
├── Platforms
├── Settings
│
├── Theme
└── Logout
```

The mobile menu must not introduce additional top-level MVP1 destinations.

---

# 10. Authentication

Authentication exists outside the authenticated application shell.

```text
Authentication
├── Sign In
├── Sign Up
├── Forgot Password
└── Reset Password
```

Authentication pages must not display the authenticated application navigation.

Authentication ownership:

| Area | Owner |
|---|---|
| Sign In | Authentication |
| Sign Up | Authentication |
| Forgot Password | Authentication |
| Reset Password | Authentication |

Authentication must use the approved server-managed session architecture.

---

# 11. Onboarding

Onboarding exists between successful authentication and normal application use.

```text
Onboarding
├── Welcome
├── Creator Profile
├── Primary Platforms
├── Connect Platforms
└── Completion
```

## 11.1 Onboarding responsibilities

Onboarding establishes the minimum information required to operate the MVP:

- Creator identity
- Creator type where applicable
- Timezone
- Initial platform preferences
- Platform connection setup
- Completion state

After onboarding is complete:

```text
Authentication
      ↓
Onboarding
      ↓
Dashboard
```

If onboarding is incomplete, the creator must be guided back into onboarding before receiving the complete application experience.

---

# 12. Dashboard

**Primary destination:** Dashboard

**Purpose:** Provide the creator with an operational overview of the current workspace.

The Dashboard may surface:

- Content activity
- Content requiring attention
- Planned content
- Upcoming scheduled Publications
- Publishing status
- Recent publishing results
- Tasks
- Platform connection status
- Notifications
- Basic analytics/performance
- Recent activity

Dashboard data must represent authoritative backend state.

The Dashboard must not create a second source of truth for:

- Content
- Tasks
- Publications
- Publishing Attempts
- Platform Accounts
- Analytics

Basic analytics are surfaced here but do not create a primary Analytics navigation destination in MVP1.

---

# 13. Content

**Primary destination:** Content

**Purpose:** Central workspace for creating, organizing, adapting, planning, and reviewing creator content.

```text
Content
├── All Content
├── Pipeline
├── Create Content
├── Content Details
├── Edit Content
├── Platform Versions
├── Content Relationships
├── Content Planning / Ideas
└── Production Planning / Shooting Checklist
```

Content is the central MVP1 workflow.

---

# 14. All Content

**Purpose:** Provide the main content-management workspace.

The All Content area supports approved MVP1 operations including:

- Browse content
- Search content
- Filter content
- Sort content where approved
- Create content
- Open content details
- Edit content
- Delete content
- View status
- View platform versions
- View relationships
- View production planning
- View associated tasks
- View publishing/scheduling state where relevant

The Content List must not become a separate product hierarchy from Content.

---

# 15. Content Pipeline

Pipeline is a child of Content.

```text
Content
└── Pipeline
```

Pipeline columns represent the approved ContentStatus lifecycle:

```text
IDEA
DRAFT
READY
SCHEDULED
PUBLISHED
```

Publishing failures and cancellations are not additional ContentStatus columns.

They are publishing/publication operational states surfaced as derived indicators where appropriate.

Pipeline must not expose:

```text
Content
├── PUBLISHING
├── FAILED
└── CANCELLED
```

as ContentStatus values.

---

# 16. Create Content

**Purpose:** Entry point for creating a new Content record.

The creator may provide approved content information such as:

- Title
- Description
- Content type
- Caption
- Notes
- Planning information
- Other MVP-approved metadata

Content may exist without a connected platform.

The creation workflow must not require an external platform connection merely to create a Content record.

---

# 17. Content Details

**Purpose:** Authoritative view of an individual Content item.

Content Details may provide:

- Content information
- Content status
- Media information
- Platform Versions
- Content Relationships
- Production Plan
- Shooting Checklist
- Tasks
- Publication scheduling information
- Publishing state
- Publishing history
- Basic performance information
- Available actions

Contextual actions may link to:

- Calendar
- Publishing
- Tasks
- Platforms

The Content Details page remains owned by Content even when it surfaces information from other domains.

---

# 18. Platform Versions

**Purpose:** Manage platform-specific adaptations of Content.

```text
Content
└── Platform Versions
    ├── Approved Launch Platform A
    ├── Approved Launch Platform B
    ├── Approved Launch Platform C
    ├── Approved Launch Platform D
    └── Approved Launch Platform E+
```

The MVP1 launch set must contain at least five actual supported publishing platforms.

Platform-specific versions may contain approved platform-specific:

- Caption
- Media
- Hashtags
- CTA
- Metadata
- Publishing configuration

The exact launch platform set is defined by the approved platform implementation and capability validation.

YouTube, Instagram, and TikTok may be used as illustrative examples, but they must not be interpreted as the complete MVP1 launch set.

---

# 19. Content Relationships

Content relationships provide navigation between:

```text
Original Content
      ↓
Derivative / Related Content
```

The creator must be able to:

- Identify related content
- Open related content
- Return to the original
- Understand content family relationships

Relationships remain part of the Content workflow rather than becoming a top-level navigation destination.

---

# 20. Content Planning / Ideas

Content Planning / Ideas is an MVP1 capability.

It supports manual creator planning such as:

- Content ideas
- Planned content
- Planning notes
- Target dates
- Planning status
- Related content
- Transition into creation

Planning entries may appear in Calendar.

Planning is not AI-powered in MVP1.

AI content ideas and AI planning belong to MVP3.

---

# 21. Production Planning

Production Planning is an MVP1 capability.

It is operational planning for content creation before publication.

It may include:

- Production notes
- Required preparation
- Shot planning
- Production requirements
- Supporting tasks
- Shooting checklist

Production Planning is distinct from Publication scheduling.

```text
Content
   ↓
Production Planning
   ↓
Prepare
   ↓
Publication Scheduling
```

Production Planning must not be treated as a scheduling entity.

---

# 22. Shooting Checklist

Shooting Checklist is an MVP1 capability associated with Content and Production Planning.

It may include:

- Checklist item
- Completion state
- Item order
- Notes where approved
- Ownership
- Content relationship

The checklist is persisted through the backend where required by the approved implementation.

The sitemap does not require a separate top-level Shooting Checklist navigation destination.

---

# 23. Calendar

**Primary destination:** Calendar

**Purpose:** Provide a unified temporal view of creator planning and publishing activity.

Calendar aggregates:

1. Planned Content
2. Content Ideas / Planning Entries
3. Scheduled Publications

```text
Calendar
├── Planned Content
├── Content Ideas / Planning Entries
└── Scheduled Publications
```

Calendar must not introduce a separate Schedule domain resource.

The authoritative scheduled publishing resource is the Publication.

Calendar is a view/aggregation layer over underlying approved domains.

---

# 24. Calendar Responsibilities

Calendar may allow the creator to:

- View planned content
- View ideas/planning entries
- View scheduled Publications
- Open Content
- Open Publication details where appropriate
- Reschedule eligible Publications
- Cancel eligible Publications
- Identify scheduling conflicts where supported
- Navigate dates
- Switch approved calendar views

The Calendar must not create a second scheduling state.

---

# 25. Publication Scheduling in the Sitemap

Scheduling is a workflow, not a standalone top-level resource in the information architecture.

The user-facing hierarchy is:

```text
Content
   ↓
Platform Version
   ↓
Publication
   ↓
Scheduling
```

A Publication owns:

- Target platform
- Target platform version
- Scheduling state
- Scheduled timestamp
- Publication status
- Publishing history relationship
- Retry/recovery state where applicable

There is no Creator Command Center `Schedule` entity in the sitemap.

There is no standalone Schedule page hierarchy.

A frontend route may represent a scheduling workflow, but it must not imply a separate Schedule domain resource.

---

# 26. Tasks

**Primary destination:** Tasks

**Purpose:** Provide centralized creator task management.

```text
Tasks
├── Task List
├── Create Task
├── Edit Task
├── Task Details
└── Completion / Reopen
```

Tasks may relate to:

- Content
- Production
- Publishing preparation
- Platforms
- Other approved MVP workflows

MVP1 task operations include:

- Create
- View
- Edit
- Complete
- Reopen
- Delete
- Set due date
- Associate with Content
- Identify overdue tasks

A task must not duplicate the authoritative workflow it supports.

---

# 27. Publishing

**Primary destination:** Publishing

**Purpose:** Provide operational visibility into publishing activity.

```text
Publishing
├── Publishing Overview
├── Active / Processing
├── Published
├── Failed
├── Partial Results
├── Publishing History
└── Publication Details
```

These states do not necessarily require separate frontend routes.

A UI may represent them as:

- Tabs
- Filters
- Status groups
- Detail panels
- Drawers
- Contextual views

The final visual presentation belongs to UX/UI design.

---

# 28. Publishing Overview

Publishing Overview may show:

- Active publishing operations
- Scheduled Publications
- Recent successful publications
- Failed Publications
- Partial multi-platform results
- Reauthorization requirements
- Publishing history
- Basic publishing performance

Publishing must distinguish:

```text
Publication
    ↓
PublishingAttempt(s)
```

A PublishingAttempt is an individual provider execution attempt.

The frontend must not treat Trigger.dev Task/Run identifiers as creator-facing publishing resources.

---

# 29. Publishing History

Publishing History provides historical publishing outcomes.

It may show:

- Content
- Platform
- Publication
- Publishing Attempt
- Status
- Started time
- Completion time
- External publication ID where appropriate
- Error information where appropriate
- Retry history

History must preserve independent per-platform results.

Successful publication on one platform must not be erased because another platform failed.

---

# 30. Partial Publishing Results

For multi-platform publishing:

```text
Publishing Request
       │
       ├── Platform A → SUCCESS
       ├── Platform B → SUCCESS
       ├── Platform C → FAILED
       ├── Platform D → SUCCESS
       └── Platform E → SUCCESS
```

The Publishing UI must preserve each result independently.

The exact platforms shown are illustrative. The same behavior applies to every approved MVP1 launch platform.

A failed platform may be retried without automatically republishing platforms that already succeeded.

---

# 31. Platform Reauthorization

If a platform requires reauthorization, Publishing may surface the issue.

The authoritative platform connection management destination is:

```text
Platforms
└── Connected Account
```

Publishing may provide a contextual link:

```text
Publishing Failure
       ↓
Reconnect Platform
       ↓
Platforms
```

The workflow must not duplicate platform-account management.

---

# 32. Platforms

**Primary destination:** Platforms

**Purpose:** Manage supported platform definitions and creator platform connections.

```text
Platforms
├── Supported Platforms
├── Connected Accounts
├── Connect Platform
├── Account Details
├── Reauthorization
└── Disconnect
```

Platforms replaces the older concept of a top-level Connected Accounts navigation item.

Connected Accounts is a capability inside Platforms.

---

# 33. Supported Platforms

The Platforms area may show the approved MVP1 launch platforms and their relevant capabilities.

The launch requirement is:

> MVP1 must support publishing to at least five actual major supported social platforms.

The sitemap must not hard-code only three platforms.

Illustrative platform examples may include:

- YouTube
- Instagram
- TikTok
- Additional approved launch platforms

The final launch set is determined by the implementation-approved platform capability and publishing requirements.

---

# 34. Connected Accounts

Connected Accounts is a child workflow of Platforms.

```text
Platforms
└── Connected Accounts
```

It supports:

- View connected accounts
- Connect account
- Reconnect account
- Reauthorize
- Disconnect account
- View connection status
- View supported account information

Sensitive OAuth credentials must never be displayed.

---

# 35. Platform Connection Flow

The user-facing flow is:

```text
Platforms
   ↓
Connect Platform
   ↓
Backend OAuth Flow
   ↓
External Platform Authorization
   ↓
OAuth Callback
   ↓
Connected Account
   ↓
Connection Status
```

The frontend must not expose:

- OAuth client secrets
- Access tokens
- Refresh tokens
- Encryption keys
- Internal credentials

---

# 36. Settings

**Secondary destination:** Settings

**Purpose:** Manage creator and application configuration approved for MVP1.

```text
Settings
├── Profile
├── Preferences
├── Notifications
├── Security
└── Account
```

Only approved MVP1 settings may be exposed.

Settings must not become a container for future-stage functionality.

---

# 37. Profile

Profile contains approved creator configuration such as:

- Display name
- Creator profile information
- Creator type where applicable
- Timezone
- Basic preferences

Creator profile information is distinct from Content.

---

# 38. Preferences

Preferences may include approved application preferences such as:

- Timezone
- Notification preferences
- Display preferences
- Other MVP-approved creator preferences

Theme may be exposed through the global account/menu control as well as Settings if the UX specification permits.

---

# 39. Notifications in Settings

Notification preferences belong under Settings.

Notification events themselves are accessed through the global notification control.

This creates two distinct concepts:

```text
Notification Bell
    ↓
Notification Center / Notification View
```

and:

```text
Settings
└── Notifications
    └── Notification Preferences
```

These must not be confused.

---

# 40. Security

Settings → Security may provide approved account-security workflows such as:

- Password management
- Session/security information
- Other approved security controls

Security implementation remains governed by the Security Baseline and authentication architecture.

---

# 41. Account

Settings → Account may provide:

- Account information
- Account deletion
- Approved account-management controls

Account deletion must use the backend-controlled account-deletion workflow.

---

# 42. Analytics

Analytics is **not a primary navigation destination in MVP1**.

Basic analytics are required in MVP1 and are surfaced through:

```text
Dashboard
Content / Performance
Publishing / Performance
```

The MVP1 sitemap must not create:

```text
Primary Navigation
└── Analytics
```

Advanced analytics belong to MVP2.

AI analytics, predictions, and recommendations belong to MVP3.

---

# 43. Preview

Basic platform preview is an MVP1 capability.

Preview is contextual rather than a top-level navigation destination.

It may be accessed from:

```text
Content
   ↓
Platform Version
   ↓
Preview
```

Preview must not become:

```text
Primary Navigation
└── Preview
```

Preview is a presentation capability, not a separate product workspace.

---

# 44. Search

Search is a cross-cutting application capability.

It may be exposed through:

- Desktop header
- Mobile rectangular Search control
- Content search/filter interfaces

Search must not create an independent duplicate Content hierarchy.

Search results should route the creator to the authoritative destination for the selected resource.

---

# 45. Core Creator Workflow

The sitemap exists to support the approved creator workflow:

```text
IDEA
  ↓
PLAN
  ↓
CREATE
  ↓
ORGANIZE
  ↓
ADAPT
  ↓
PREPARE
  ↓
SCHEDULE
  ↓
PUBLISH
  ↓
TRACK
  ↓
ANALYZE
```

Mapped to the sitemap:

```text
IDEA
  ↓
Content → Planning / Ideas

PLAN
  ↓
Calendar / Content Planning

CREATE
  ↓
Content → Create Content

ORGANIZE
  ↓
Content → All Content / Pipeline / Relationships

ADAPT
  ↓
Content → Platform Versions

PREPARE
  ↓
Content → Production Planning / Shooting Checklist
Tasks

SCHEDULE
  ↓
Calendar → Scheduled Publications
Publication scheduling workflow

PUBLISH
  ↓
Publishing

TRACK
  ↓
Dashboard / Publishing / Tasks / Notifications

ANALYZE
  ↓
Dashboard / Content Performance / Publishing Performance
```

---

# 46. Navigation Relationships

## Dashboard

```text
Dashboard
├── Content
├── Calendar
├── Tasks
├── Publishing
├── Platforms
└── Notifications
```

Dashboard provides contextual links but does not become the owner of those workflows.

## Content

```text
Content
├── All Content
├── Pipeline
├── Content Details
│   ├── Platform Versions
│   ├── Relationships
│   ├── Production Planning
│   ├── Shooting Checklist
│   ├── Tasks
│   ├── Publication Scheduling
│   └── Publishing Information
└── Calendar / Publishing through contextual actions
```

## Calendar

```text
Calendar
├── Planned Content
├── Planning Entries
└── Scheduled Publications
```

## Tasks

```text
Tasks
└── Related Content / Workflow
```

## Publishing

```text
Publishing
├── Content
├── Publications
├── Publishing Attempts
└── Platforms
```

## Platforms

```text
Platforms
└── Connected Accounts
```

## Notifications

```text
Notification
└── Related authoritative workflow
```

---

# 47. Page Ownership

| Page / Workflow | Navigation Level | Owner |
|---|---|---|
| Sign In | Public | Authentication |
| Sign Up | Public | Authentication |
| Password Reset | Public | Authentication |
| Onboarding | Pre-application | Onboarding |
| Dashboard | Primary | Dashboard |
| All Content | Primary / Child | Content |
| Pipeline | Primary / Child | Content |
| Content Details | Child | Content |
| Platform Versions | Child | Content |
| Content Relationships | Child | Content |
| Content Planning / Ideas | Child | Content |
| Production Planning | Child | Content |
| Shooting Checklist | Child | Content |
| Calendar | Primary | Calendar |
| Tasks | Primary | Tasks |
| Publishing | Primary | Publishing |
| Publishing History | Child | Publishing |
| Publication Details | Child | Publishing |
| Platforms | Primary | Platforms |
| Connected Accounts | Child | Platforms |
| Settings | Primary / Secondary | Settings |
| Notifications | Global / Contextual | Notifications |
| Notification Preferences | Child | Settings |
| Basic Analytics | Contextual | Dashboard / Content / Publishing |
| Preview | Contextual | Content / Platform Version |

---

# 48. Page Ownership Rules

1. Every page has one clear primary owner.
2. Contextual information may be surfaced elsewhere without transferring ownership.
3. Content Details remains owned by Content.
4. Scheduled Publications are owned by the Publication/publishing domain and surfaced through Calendar.
5. Publishing History is owned by Publishing.
6. Connected Accounts are owned by Platforms.
7. Notification preferences are owned by Settings.
8. Notification events are owned by Notifications.
9. Basic analytics are surfaced contextually and do not create a primary Analytics destination.
10. Platform preview is contextual and does not create a top-level Preview destination.
11. Cross-links are allowed when they return the creator to the authoritative workflow.
12. Duplicate workflows must not be created merely to provide navigation convenience.

---

# 49. Publication and Scheduling UX Boundary

The sitemap must preserve the following distinction:

```text
Scheduling = capability / workflow

Publication = durable domain resource

scheduledAt = Publication scheduling timestamp
```

The frontend may use language such as:

- Schedule
- Schedule Publication
- Scheduled
- Reschedule
- Cancel scheduled Publication

The frontend must not imply the existence of a separate Creator CC `Schedule` domain entity.

Avoid navigation such as:

```text
Schedules
Schedule List
Schedule Details
```

unless a future authoritative architecture explicitly introduces such a domain resource.

---

# 50. MVP1 Status Presentation

The sitemap must preserve the backend state-machine boundaries.

## Content lifecycle

```text
IDEA
DRAFT
READY
SCHEDULED
PUBLISHED
```

## Publication / publishing lifecycle

```text
SCHEDULED
PUBLISHING
PUBLISHED
FAILED
CANCELLED
```

## PublishingAttempt

Represents an individual provider execution attempt.

The UI may display these statuses together where useful, but page ownership and data modeling must preserve their distinct domains.

---

# 51. MVP2 Coming Soon

During MVP1, only approved MVP2 capabilities may be represented as Coming Soon.

Approved MVP2 examples include:

- Projects
- Multi-brand management
- Multiple accounts on the same platform
- Social Inbox
- Comment management
- Campaigns
- Collaborations
- Sponsorship Management
- Revenue Tracking
- Advanced Analytics
- Advanced Organization / Saved Views
- External Calendar Sync
- Recurring Tasks
- Advanced Publishing Recovery
- Business Dashboard

These may be shown as non-functional Coming Soon UI only if the product design requires it.

No MVP3 or MVP4 Coming Soon items should be exposed during MVP1.

---

# 52. MVP3 and MVP4 Visibility Rule

During MVP1:

```text
MVP1
  ↓
Active MVP1 functionality
  +
Approved MVP2 Coming Soon only
```

Do not expose:

```text
MVP3 AI Creator Intelligence
```

or:

```text
MVP4 Live Creator Infrastructure
```

in the MVP1 navigation or Coming Soon system.

This prevents future-stage functionality from becoming accidental implementation scope.

---

# 53. Coming Soon Implementation Boundary

A Coming Soon item is a UI availability state only.

It must not create:

- Future-stage API endpoints
- Future-stage database entities
- Future-stage background executions
- Future-stage Trigger.dev tasks/runs
- Future-stage integrations
- Future-stage services
- Future-stage business logic
- Hidden activation paths

The sitemap may document future-stage structure separately, but MVP1 implementation must not build it.

---

# 54. Route Planning

The sitemap defines user-facing hierarchy, while the Frontend Architecture defines implementation routing.

The structural route direction is:

```text
/
├── auth/
│   ├── sign-in
│   ├── sign-up
│   ├── forgot-password
│   └── reset-password
│
├── onboarding/
│
└── app/
    ├── dashboard
    ├── content
    ├── content/[contentId]
    ├── calendar
    ├── tasks
    ├── publishing
    ├── platforms
    └── settings
```

Additional nested routes may be introduced for legitimate user-facing workflows, including:

```text
/content/[contentId]/edit
/content/[contentId]/versions
/content/[contentId]/production
/publishing/[publicationId]
/publishing/history
/platforms/[platformId]
/settings/profile
/settings/account
/settings/notifications
/settings/security
```

Route names are implementation details and must remain consistent with the locked Frontend Architecture.

The sitemap must not require a standalone:

```text
/schedules
```

resource.

A scheduling workflow may be represented contextually from Content, Calendar, or Publication views.

---

# 55. Route Protection

Protected application areas include:

```text
/app/dashboard
/app/content
/app/calendar
/app/tasks
/app/publishing
/app/platforms
/app/settings
```

Unauthenticated users must not receive the authenticated application shell.

If onboarding is incomplete, the application must guide the authenticated creator through onboarding before presenting the complete dashboard experience.

The backend remains responsible for authorization.

---

# 56. Figma / FigJam Requirements

The FigJam/Figma workspace must represent:

1. Full MVP1 sitemap
2. Desktop application shell
3. Mobile application shell
4. Primary navigation
5. Content hierarchy
6. Calendar hierarchy
7. Tasks hierarchy
8. Publishing hierarchy
9. Platforms hierarchy
10. Settings hierarchy
11. Authentication flow
12. Onboarding flow
13. Core creator workflow
14. Content planning
15. Production planning
16. Shooting checklist
17. Platform-version workflow
18. Publication scheduling workflow
19. Publishing history
20. Notification access
21. Basic analytics placement
22. Contextual preview
23. MVP2 Coming Soon boundaries

Each MVP1-required page/workflow must be clearly marked as required.

MVP3 and MVP4 must not be represented as active MVP1 navigation.

---

# 57. Design-to-Implementation Contract

The approved sitemap becomes the structural contract for frontend implementation.

Frontend implementation must not:

- Create arbitrary top-level navigation
- Promote Pipeline to top-level navigation
- Promote Analytics to primary navigation in MVP1
- Replace Platforms with Connected Accounts as a top-level destination
- Introduce a standalone Schedule resource
- Remove required MVP1 workflows
- Duplicate authoritative workflows across unrelated pages
- Add future-stage functionality as active MVP1 navigation
- Create pages without a clear product purpose
- Allow backend/API structure to dictate an inconsistent user-facing hierarchy

Frontend implementation may change the visual presentation while preserving the approved information architecture.

---

# 58. Accessibility and Responsive Requirements

Every sitemap destination must have an approved responsive representation.

The information architecture must remain usable across:

- Desktop
- Tablet
- Mobile

Mobile may change presentation but must not remove required MVP1 functionality.

The implementation must preserve:

- Keyboard accessibility
- Focus management
- Semantic navigation
- Accessible labels
- Accessible dialogs/drawers/menus
- Visible active navigation state
- Non-color-only status communication
- WCAG 2.2 AA requirements from the approved design system

---

# 59. Sitemap Validation Checklist

Before the sitemap is considered approved, verify:

## Structure

- [ ] Authentication is represented.
- [ ] Onboarding is represented.
- [ ] Dashboard is represented.
- [ ] Content is represented.
- [ ] All Content is represented.
- [ ] Pipeline is represented under Content.
- [ ] Content Details is represented.
- [ ] Platform Versions are represented.
- [ ] Content Relationships are represented.
- [ ] Content Planning / Ideas are represented.
- [ ] Production Planning is represented.
- [ ] Shooting Checklist is represented.
- [ ] Calendar is represented.
- [ ] Tasks are represented.
- [ ] Publishing is represented.
- [ ] Publishing History is represented.
- [ ] Platforms is represented.
- [ ] Connected Accounts are represented under Platforms.
- [ ] Settings is represented.
- [ ] Notification access is represented.
- [ ] Basic analytics placement is represented.
- [ ] Preview is represented contextually.

## Navigation

- [ ] Dashboard is primary.
- [ ] Content is primary.
- [ ] All Content is under Content.
- [ ] Pipeline is under Content.
- [ ] Calendar is primary.
- [ ] Tasks is primary.
- [ ] Publishing is primary.
- [ ] Platforms is primary.
- [ ] Settings is primary/secondary according to shell.
- [ ] Pipeline is not a top-level navigation item.
- [ ] Analytics is not a primary MVP1 navigation item.
- [ ] Connected Accounts is not a top-level navigation item.
- [ ] Notifications are accessed globally/contextually.
- [ ] Theme is available through approved global/menu controls.
- [ ] Logout is available through approved global/menu controls.

## Mobile

- [ ] Hamburger menu is defined.
- [ ] Rectangular Search control is defined.
- [ ] Notification Bell is defined.
- [ ] User/Account control is defined.
- [ ] Primary navigation is inside the mobile menu.
- [ ] Theme is available through the mobile menu/options.
- [ ] Logout is available through the mobile menu/options.
- [ ] No bottom navigation is used for MVP1.

## Scheduling / Publishing

- [ ] Publication is treated as the durable scheduling resource.
- [ ] There is no standalone Schedule domain in the sitemap.
- [ ] Calendar aggregates planned content, planning entries, and scheduled Publications.
- [ ] Publishing is a distinct operational destination.
- [ ] Publishing History is represented.
- [ ] Partial multi-platform outcomes are represented.
- [ ] Publication and PublishingAttempt boundaries are preserved.
- [ ] Scheduling does not imply a `/schedules` resource.

## Platform Coverage

- [ ] Platforms is the authoritative navigation destination.
- [ ] Connected Accounts are under Platforms.
- [ ] MVP1 requires at least five actual supported publishing platforms.
- [ ] Platform examples are clearly marked illustrative.
- [ ] OAuth/connection workflows are represented.
- [ ] Reauthorization is represented.

## MVP Boundaries

- [ ] All approved MVP1 capabilities have a location.
- [ ] Only approved MVP2 capabilities may appear as Coming Soon during MVP1.
- [ ] MVP3 functionality is not exposed during MVP1.
- [ ] MVP4 functionality is not exposed during MVP1.
- [ ] Coming Soon does not imply hidden implementation.
- [ ] No future-stage backend/API/database/integration work is implied.

## Consistency

- [ ] Sitemap matches MVP Definition & Scope.
- [ ] Sitemap matches UX Specification.
- [ ] Sitemap matches Frontend Architecture.
- [ ] Sitemap matches UI Design System.
- [ ] Sitemap matches API/Backend domain boundaries.
- [ ] Sitemap preserves ContentStatus vs PublicationStatus vs PublishingAttemptStatus.
- [ ] Sitemap does not create a competing source of truth.

---

# 60. Sitemap Freeze

Once approved, this sitemap is the structural contract for MVP1 implementation.

Changes after freeze require an explicit review.

A proposed change must identify:

- What is changing
- Why it is changing
- Which MVP workflow is affected
- Whether desktop navigation changes
- Whether mobile navigation changes
- Whether page ownership changes
- Whether frontend routes change
- Whether API ownership changes
- Whether database ownership changes
- Whether MVP scope changes
- Whether the change introduces scope creep

Approved changes must be reflected in:

1. Figma/FigJam
2. This sitemap
3. Frontend Architecture where affected
4. UX Specification where affected
5. Relevant implementation specifications
6. Testing requirements where affected

---

# 61. Final MVP1 Navigation Contract

The definitive MVP1 navigation is:

```text
COMMAND CENTER

Dashboard

Content
  ├── All Content
  └── Pipeline

Calendar

Tasks

Publishing

Platforms

Settings

────────────────────

Global / Account Controls
  ├── Search
  ├── Notifications
  ├── Account
  ├── Theme
  └── Logout
```

Mobile:

```text
┌──────────────────────────────────┐
│ ☰   Search   🔔   Account        │
└──────────────────────────────────┘

Hamburger Menu
├── Dashboard
├── Content
│   ├── All Content
│   └── Pipeline
├── Calendar
├── Tasks
├── Publishing
├── Platforms
├── Settings
├── Theme
└── Logout
```

There is:

- No top-level Pipeline
- No primary Analytics destination
- No top-level Connected Accounts
- No standalone Schedule resource
- No MVP3 AI navigation
- No MVP4 Live navigation

Platforms owns connected-account management.

Calendar owns the calendar view of planning and scheduled Publications.

Publishing owns publishing operations and history.

Content owns the content workspace and its child workflows.

Dashboard provides the operational overview and basic analytics surfaces.

This is the approved MVP1 information architecture.
