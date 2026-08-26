# Workspace

## Name
**Creators Command Center — Product Design Workspace**

## Purpose
The FigJam workspace is the visual planning source for the MVP's information architecture, navigation, workflows, content lifecycle, dashboard structure, and platform relationships.  

It must reflect the approved MVP scope and must not introduce unapproved features.

---

# 01 — Sitemap

## Purpose
Define the complete MVP information hierarchy and page ownership.

## Initial Structure
Creators Command Center
│
├── Authentication
│   ├── Register
│   ├── Login
│   ├── Forgot Password
│   ├── Reset Password
│   └── Account Recovery
│
├── Onboarding
│   ├── Welcome
│   ├── Profile Setup
│   └── Connect Platforms
│
├── Dashboard
│
├── Content
│   ├── Content List
│   ├── Create Content
│   ├── Content Details
│   └── Edit Content
│
├── Platform Versions
│   ├── Version List
│   ├── Platform Version
│   └── Edit Version
│
├── Calendar
│
├── Tasks
│
├── Connected Accounts
│   ├── Accounts
│   ├── Connect Account
│   └── Reauthorization
│
├── Publishing
│   ├── Publishing Status
│   ├── Publishing Results
│   └── Publishing History
│
├── Notifications
│
└── Settings
├── Profile
├── Account
└── Preferences

Code

Mark each approved MVP page with **P0 — MVP**.  
Do not automatically assume every subpage above is a separate final screen. Tasks #8–#10 should validate the exact screen structure against the approved requirements.

---

# 02 — User Flows

## Flow Areas
- Authentication  
- Onboarding  
- Content Creation  
- Platform Connection  
- Content Versioning  
- Scheduling  
- Immediate Publishing  
- Publishing Retry  
- Task Completion  
- Dashboard  
- Calendar  
- Notifications  
- Search  

### Flow Structure
ENTRY
↓
ACTION
↓
VALIDATION
↓
DECISION
├── Success
└── Failure
↓
Recovery
↓
EXIT

Code

### P0 Flows
- Register  
- Login  
- Complete onboarding  
- Create content  
- Create platform version  
- Connect YouTube  
- Connect Instagram  
- Connect TikTok  
- Schedule content  
- Immediate publish  
- Retry failed publish  
- Complete task  

### P1 Flows
- Dashboard  
- Calendar  
- Notifications  
- Search  

Task #10 will turn these into complete diagrams.

---

# 03 — Navigation

## Desktop Primary Navigation
- Dashboard  
- Content  
- Calendar  
- Tasks  
- Connected Accounts  
- Notifications  
- Settings  

## Secondary Navigation
**Content**
- All Content  
- Create  
- Content Details  

**Connected Accounts**
- Connected Accounts  
- Connect Platform  
- Reauthorize  

**Settings**
- Profile  
- Account  
- Preferences  

## Mobile Navigation
Do not simply copy the desktop sidebar.  
Create a separate mobile navigation model that identifies:
- Primary destinations  
- Secondary destinations  
- More/menu destinations  
- Contextual actions  

Task #9 will validate this.

---

# 04 — Content Lifecycle

## Lifecycle Map
IDEA
↓
CONTENT CREATED
↓
CONTENT EDITED
↓
PLATFORM VERSION CREATED
↓
READY
↓
SCHEDULED
↓
QUEUED
↓
PUBLISHING
↓
┌─────────────────────┐
│                     │
SUCCESS              FAILURE
│                     │
↓                     ↓
PUBLISHED          RETRY / RECOVERY
│                     │
↓                     ↓
HISTORY             PUBLISHING

Code

### Multi-Platform Publishing
Content
↓
Publishing Job
↓
┌──────────────┼──────────────┐
↓              ↓              ↓
YouTube     Instagram       TikTok
↓              ↓              ↓
Published     Failed       Published
↓
Retry
↓
Published

Code

**Important Rule:**  
A multi-platform publishing operation is not one indivisible success/failure state.  
Each platform needs an independently trackable result.  
This directly supports the reliability architecture documented in Task #5.

---

# 05 — Dashboard

## Primary Question
**What does the creator need to do right now?**

## Structure
Dashboard
│
├── Current Work
├── Upcoming
├── Publishing
├── Tasks
├── Attention Required
└── Recent Activity

Code

### Current Work
- Draft content  
- Content needing edits  
- Incomplete platform versions  

### Upcoming
- Scheduled content  
- Upcoming publishing  
- Upcoming tasks  

### Publishing
- Publishing now  
- Recently published  
- Failed publishing  
- Retry required  

### Tasks
- Due today  
- Upcoming  
- Overdue  

### Attention Required
- Reconnect YouTube  
- Retry failed publication  
- Complete content  
- Resolve publishing issue  

### Recent Activity
- Published  
- Scheduled  
- Connected platform  
- Completed task  
- Updated content  

⚠️ Do not turn this into a generic analytics dashboard unless explicitly required.

---

# 06 — Platform Relationships

## Creator/Platform Diagram
CREATOR
│
┌─┼──────────────┐
│ │              │
↓ ↓              ↓
YouTube   Instagram   TikTok
│          │          │
└──────────┼──────────┘
│
Connected Account
│
OAuth Credentials
│
Platform Adapter
│
Publishing

Code

## Content Versions
Content
│
├── YouTube Version
├── Instagram Version
└── TikTok Version

Code

## Publishing Flow
Content
↓
Platform Version
↓
Publishing Operation
↓
Platform-specific Result

Code

## Platform Capability Matrix
| Capability              | YouTube | Instagram | TikTok |
|--------------------------|---------|-----------|--------|
| Connect account          | P0      | P0        | P0     |
| OAuth                    | P0      | P0        | P0     |
| Publish                  | P0      | P0        | P0     |
| Schedule                 | P0      | P0        | P0     |
| Retry                    | P0      | P0        | P0     |
| Platform-specific content| P0      | P0        | P0     |
| Publishing status        | P0      | P0        | P0     |

⚠️ Do not invent platform capabilities here. Verify actual provider capabilities when implementing integrations.

---

# Global FigJam Legend

| Label | Meaning |
|-------|---------|
| 🟢 P0 | Required for MVP |
| 🔵 P1 | Important but not required for initial MVP |
| ⚪ Future | Explicitly outside current MVP |
| 🟡 Decision | Requires product/architecture decision |
| 🔴 Blocked | Cannot proceed until dependency is resolved |
| ✅ Approved | Decision/design has been approved |
| ⚠️ Needs Review | Requires validation |

---

# Workspace Rules

1. **MVP scope is authoritative** — Do not add features simply because they seem useful.  
2. **FigJam is not the implementation** — Represents product structure and behavior, not unnecessary implementation details.  
3. **Decisions must be traceable** — Major architectural decisions belong in `/docs/adr/`.  
4. **User flows include failure paths** — Do not document only the happy path.  
5. **Platform differences must be explicit** — Do not assume YouTube, Instagram, and TikTok behave identically.  
6. **P0 comes first** — P1 and future functionality must never obscure the MVP.  
7. **Approved decisions should not silently change** — Changes must be explicitly reviewed and documented.  

---

# Ownership

| Area                   | Owner            | Responsibility                  |
|-------------------------|------------------|---------------------------------|
| Workspace              | Justice          | FigJam organization             |
| Sitemap                | Justice + Eric   | UX/product validation           |
| User Flows             | Justice + Eric   | Workflow validation             |
| Navigation             | Justice + Eric   | UX validation                   |
| Content Lifecycle      | Eric             | Product + architecture          |
| Dashboard              | Justice + Eric   | UX/product                      |
| Platform Relationships | Eric + Trust     | Product + technical feasibility |
| Architecture annotations| Trust + Eric    | Technical validation            |