# MVP Sitemap

## Purpose

This document defines the official sitemap for the Creators Command Center MVP.

The sitemap establishes the approved UX hierarchy, navigation structure, and ownership of MVP screens.

It serves as the visual and structural contract between product design, frontend implementation, and backend/API architecture.

The frontend must follow this structure rather than developing disconnected pages or navigation patterns.

---

## Sitemap Principles

The MVP sitemap follows these principles:

1. **Organize the product around the creator workflow.**
2. **Every MVP page must have a defined location in the product hierarchy.**
3. **Primary navigation should expose the creator's most important workflows.**
4. **Secondary navigation should provide contextual access without overcrowding primary navigation.**
5. **Desktop and mobile navigation must represent the same product hierarchy.**
6. **Every page must have a clear ownership and purpose.**
7. **Navigation must not expose unfinished or out-of-scope features as MVP functionality.**
8. **Navigation hierarchy must remain consistent between design and frontend implementation.**
9. **Navigation decisions must support the approved MVP scope.**
10. **Changes to the approved sitemap should be reviewed before implementation.**

---

# MVP Sitemap

## Root Structure

```text
Creators Command Center
│
├── Authentication
│   ├── Sign In
│   ├── Sign Up
│   ├── Forgot Password
│   └── Reset Password
│
├── Onboarding
│   ├── Welcome
│   ├── Creator Profile
│   ├── Connect Platforms
│   └── Onboarding Completion
│
└── Application
    │
    ├── Dashboard
    │
    ├── Content
    │   ├── Content List
    │   ├── Create Content
    │   ├── Content Details
    │   └── Platform Versions
    │
    ├── Calendar
    │
    ├── Tasks
    │
    ├── Connected Accounts
    │
    ├── Publishing
    │
    ├── Notifications
    │
    └── Settings
```
# Primary Navigation

The primary navigation represents the creator's main workflows.

---

## Desktop
**Recommended primary navigation:**
- Dashboard  
- Content  
- Calendar  
- Tasks  
- Connected Accounts  
- Publishing  

---

## Dashboard
**Purpose:** Provide the creator with an overview of their current workspace.  

The dashboard may surface:
- Content activity  
- Upcoming scheduled content  
- Publishing status  
- Tasks  
- Connected platform status  
- Important notifications  
- Recent activity  

⚠️ Dashboard is the primary landing page after authentication and onboarding.

---

## Content
**Purpose:** Provide the central workspace for creating, managing, and reviewing creator content.  

Structure:
Content
├── Content List
├── Create Content
├── Content Details
└── Platform Versions


Content is a **core MVP workflow**.

---

## Calendar
**Purpose:** Provide a calendar-based view of scheduled and planned content.  

The calendar allows creators to understand:
- What is scheduled  
- When content will be published  
- Upcoming publishing activity  
- Scheduling conflicts where applicable  

---

## Tasks
**Purpose:** Provide a centralized location for creator-related tasks.  

Tasks may include:
- Content preparation  
- Publishing preparation  
- Review tasks  
- Platform-related tasks  
- Other approved MVP workflow tasks  

---

## Connected Accounts
**Purpose:** Allow creators to manage the external platforms connected to their account.  

The page should provide:
- Connected platform status  
- Connection status  
- Reauthorization state  
- Account information where appropriate  
- Connect/reconnect actions  
- Disconnect actions  

⚠️ Sensitive OAuth credentials must **never** be displayed.

# Publishing

## Purpose
Provide visibility into content publishing operations.

### Publishing may include:
- Publishing queue  
- Publishing status  
- Successful publications  
- Failed publications  
- Retryable publications  
- Partial publishing results  
- Reauthorization requirements  

⚠️ Publishing should represent the **operational state of publishing** rather than duplicate the Content workspace.

---

# Secondary Navigation

Secondary navigation provides contextual access to supporting areas.

**Recommended secondary navigation:**
- Notifications  
- Settings  

These areas are important but do not need the same visual prominence as the creator's primary workflow.

---

## Notifications

**Purpose:** Provide system and workflow notifications.  

### Examples:
- Publishing completed  
- Publishing failed  
- Account requires reauthorization  
- Scheduled content reminders  
- Important system notifications  

Notifications should link the creator to the relevant workflow where appropriate.

---

## Settings

**Purpose:** Provide account and application configuration.  

### Structure:
Settings
├── Account
├── Preferences
└── Security


⚠️ Only approved MVP settings should be exposed during MVP implementation.

---

# Authentication Navigation

Authentication exists outside the authenticated application shell.

Authentication
├── Sign In
├── Sign Up
├── Forgot Password
└── Reset Password


Authentication pages should **not** display the authenticated application's primary navigation.

---

# Onboarding Navigation

Onboarding exists between successful authentication and normal application usage.

Onboarding
├── Welcome
├── Creator Profile
├── Connect Platforms
└── Completion


The onboarding flow should guide the creator through the minimum setup required to use the MVP.  

After successful onboarding, the creator enters the main application through the **Dashboard**.
# Content Navigation

Content is a primary application area.

Content
├── Content List
├── Create Content
├── Content Details
└── Platform Versions
---

## Content List
**Purpose:** Provide an overview of creator content.  
- Allows the creator to locate and manage content without navigating through unrelated areas.  

---

## Create Content
**Purpose:** Entry point for creating new content.  
- Implementation must follow the approved UX specification for the content creation workflow.  

---

## Content Details
**Purpose:** Complete view of an individual content item.  

May include:
- Content information  
- Media  
- Description/caption  
- Platform versions  
- Scheduling information  
- Publishing status  
- Associated tasks  
- Available actions  

---

## Platform Versions
**Purpose:** Represent platform-specific versions of a content item.  

Example:
Content
└── Platform Versions
├── YouTube Version
├── Instagram Version
└── TikTok Version
⚠️ The exact supported platforms must follow the approved MVP scope.

---

# Calendar Navigation

**Purpose:** Calendar is a primary destination, not a child of Content, because scheduling is a distinct workflow.  

- Provides access to scheduled content  
- Maintains clear relationships to underlying content items  

---

# Tasks Navigation

**Purpose:** Creator’s task management workspace.  

Tasks may link back to:
- Content  
- Publishing  
- Connected Accounts  
- Other relevant MVP workflows  

⚠️ A task must not duplicate the underlying workflow.

---

# Connected Accounts Navigation

Connected Accounts
├── Account List
├── Connect Account
├── Account Details
└── Reauthorization

- Screens may be implemented as pages, dialogs, or contextual flows depending on UX design.  
- The sitemap defines the workflow, not the final UI component type.  

---

# Publishing Navigation

Publishing
├── Publishing Overview
├── Processing
├── Published
├── Failed
├── Retry
└── Requires Reauthorization


- These represent **publishing states**, not necessarily separate routes.  
- Implementation must avoid unnecessary pages simply because a publishing state exists.  

---

# Notifications Navigation

Notifications
├── All Notifications
└── Notification Details


- Notification details may be implemented as a page, drawer, modal, or contextual view depending on approved UI design.  

# Settings Navigation

Settings
├── Account
├── Preferences
└── Security


⚠️ Only functionality explicitly included in the MVP scope should be implemented.  
Future settings must not be added simply because the navigation structure could support them.

---

# Desktop Navigation Structure

┌─────────────────────────────────────────────────────┐
│ Logo / Workspace                    Notifications   │
│                                                     │
├───────────────┬─────────────────────────────────────┤
│ Dashboard     │                                     │
│ Content       │           Main Content              │
│ Calendar      │                                     │
│ Tasks         │                                     │
│ Connected     │                                     │
│ Accounts      │                                     │
│ Publishing    │                                     │
│ ───────────   │                                     │
│ Notifications │                                     │
│ Settings      │                                     │
└───────────────┴─────────────────────────────────────┘


The exact visual design belongs in **Figma**.  
The sitemap defines hierarchy and ownership.

---

# Mobile Navigation Structure

Mobile navigation must preserve the same information architecture while adapting to limited screen space.

**Recommended structure:**

### Mobile Primary Navigation
- Dashboard  
- Content  
- Calendar  
- Publishing  
- More  

### More Menu
More
├── Tasks
├── Connected Accounts
├── Notifications
└── Settings

The exact mobile navigation component may be:
- Bottom navigation  
- Navigation drawer  
- Sheet  
- Menu  

⚠️ Final interaction pattern should be determined in **Figma**.  
The underlying navigation hierarchy must remain consistent.

---

# Mobile Content Navigation

Content remains a primary workflow on mobile.

Content
├── Content List
├── Create Content
├── Content Details
└── Platform Versions


⚠️ Mobile layouts must not remove required MVP functionality merely because the presentation changes.

---

# Navigation Ownership

| Area              | Level            | Primary Owner       |
|-------------------|------------------|---------------------|
| Dashboard         | Primary          | Dashboard           |
| Content           | Primary          | Content             |
| Calendar          | Primary          | Calendar            |
| Tasks             | Primary          | Tasks               |
| Connected Accounts| Primary          | Connected Accounts  |
| Publishing        | Primary          | Publishing          |
| Notifications     | Secondary        | Notifications       |
| Settings          | Secondary        | Settings            |
| Authentication    | Public           | Authentication      |
| Onboarding        | Pre-application  | Onboarding          |

---

# Page Ownership Rules

- Every page must have one clear primary owner.  
- Examples:  
  - Content Details → Content  
  - Publishing Status → Publishing  
  - Connected Platform → Connected Accounts  
  - Scheduled Content → Calendar  

⚠️ Features should not be duplicated across multiple top-level navigation areas unless there is a clear UX reason.  
Cross-links are allowed when they return the creator to the authoritative workflow.

---

# Navigation Relationships

Dashboard
├── Content
├── Calendar
├── Tasks
├── Connected Accounts
├── Publishing
└── Notifications

Content
├── Content Details
│       └── Platform Versions
└── Calendar / Publishing through contextual actions

Calendar
└── Content Details

Tasks
└── Related workflow

Connected Accounts
└── Publishing

Publishing
├── Content
└── Connected Accounts

Notifications
└── Related workflow

Settings

---

# Creator's Core MVP Workflow

Authenticate
↓
Onboard
↓
Dashboard
↓
Create Content
↓
Edit Content
↓
Create Platform Versions
↓
Schedule / Publish
↓
Publishing
↓
Platform Result
↓
Success / Partial Success / Failure
↓
Retry or Continue

This workflow is the **primary reason** the navigation structure exists.

---

# MVP Page Inventory

| MVP Page / Workflow   | Required | Navigation Area   |
|-----------------------|----------|------------------|
| Authentication        | Yes      | Public           |
| Onboarding            | Yes      | Onboarding       |
| Dashboard             | Yes      | Primary          |
| Content               | Yes      | Primary          |
| Content Details       | Yes      | Content          |
| Platform Versions     | Yes      | Content          |
| Calendar              | Yes      | Primary          |
| Tasks                 | Yes      | Primary          |
| Connected Accounts    | Yes      | Primary          |
| Publishing            | Yes      | Primary          |
| Notifications         | Yes      | Secondary        |
| Settings              | Yes      | Secondary        |

⚠️ No required MVP page may be omitted from the sitemap.

---

# Route Planning

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
├── content/[id]
├── content/[id]/platform-versions
├── calendar
├── tasks
├── connected-accounts
├── publishing
├── notifications
└── settings

⚠️ Route names are structural recommendations and must be reconciled with the approved frontend architecture before implementation.

---

# Figma Requirements

The FigJam/Figma workspace must visually represent:
- Desktop sitemap  
- Mobile navigation  
- Primary navigation  
- Secondary navigation  
- Authentication flow  
- Onboarding flow  
- Core creator workflow  
- Content hierarchy  
- Publishing workflow  
- Connected-account workflow  

Each MVP page should be clearly marked as an MVP requirement.

# Sitemap Validation Checklist

Before approving the sitemap, verify:

- Every MVP page is represented  
- Authentication is represented  
- Onboarding is represented  
- Dashboard is represented  
- Content is represented  
- Content Details is represented  
- Platform Versions is represented  
- Calendar is represented  
- Tasks are represented  
- Connected Accounts is represented  
- Publishing is represented  
- Notifications are represented  
- Settings are represented  
- Desktop navigation is defined  
- Mobile navigation is defined  
- Primary navigation is defined  
- Secondary navigation is defined  
- Page ownership is defined  
- Core creator workflow is represented  
- Navigation does not introduce unapproved MVP features  
- Navigation is consistent with the UX Specification  
- Navigation is consistent with the MVP Scope  
- Navigation is compatible with the Frontend Architecture  

---

# Design-to-Implementation Contract

The approved sitemap becomes the **structural contract** for frontend implementation.

Frontend development must not:
- Create arbitrary top-level navigation  
- Duplicate the same workflow across unrelated pages  
- Add navigation items for features outside the MVP scope  
- Remove required MVP workflows  
- Create pages without a clear product purpose  
- Allow backend/API structure to dictate an inconsistent user-facing hierarchy  

⚠️ Frontend implementation may change the **visual presentation** of navigation while preserving the approved information architecture.

---

# Changes to the Sitemap

Changes to the approved sitemap must be reviewed before implementation.  

A proposed change should identify:
- What is changing  
- Why the change is necessary  
- Which MVP workflow is affected  
- Whether the change affects desktop navigation  
- Whether the change affects mobile navigation  
- Whether the change affects frontend routes  
- Whether the change affects API or backend ownership  
- Whether the change introduces scope creep  

Approved changes should be reflected in both:
- The **Figma/FigJam workspace**  
- This **sitemap document**  
