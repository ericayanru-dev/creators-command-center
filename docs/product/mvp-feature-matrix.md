# MVP Feature Matrix

| **Feature**                  | **Priority** | **Primary Owner** | **Frontend** | **Backend** | **Database** | **DevOps** | **Testing** |
|-------------------------------|--------------|-------------------|--------------|-------------|--------------|------------|-------------|
| Authentication                | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content                       | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Organization          | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Search/Filtering      | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Status/Pipeline       | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Content Relationships         | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Platform Versions             | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Social Platform Accounts      | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| OAuth / Token Security        | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Media Management              | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Scheduling                    | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Calendar UI (supporting Scheduling) | P0     | Justice           | Justice      | Eric        | Eric         | Trust      | All         |
| Background Jobs               | P0           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Execution Engine              | P0           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Publishing                    | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Per-Platform Results          | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Partial Publishing Success    | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Failed-Platform Retry         | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Publishing History            | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Tasks                         | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Ownership Isolation           | P0           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Validation                    | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Reliability / Error Handling  | P0           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Idempotency                   | P0           | Eric              | —            | Eric        | Eric         | Trust      | All         |
| Dashboard Enhancements        | P1           | Justice           | Justice      | Eric        | Eric         | Trust      | All         |
| Notifications                 | P1           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Basic Analytics               | P1           | Eric              | Justice      | Eric        | Eric         | Trust      | All         |
| Basic Platform Preview        | P1           | Justice           | Justice      | Eric        | —            | —          | All         |

---

# Feature Breakdown

## 1. Authentication
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  
**DevOps:** Trust  

### Frontend
- Registration page  
- Login page  
- Session/loading states  
- Authentication errors  
- Protected application routes  
- Logout  
- Account/session state  

### Backend
- Registration API  
- Login API  
- Logout API  
- Session verification  
- Password hashing  
- Authentication middleware  
- Authorization foundation  
- Rate limiting  
- Input validation  

### Database
- User entity  
- Authentication fields  
- Ownership relationship foundation  
- Required indexes/constraints  

### Testing
- Registration  
- Login  
- Logout  
- Invalid credentials  
- Expired/invalid session  
- Unauthorized access  
- Authorization/ownership checks  
- Rate limiting  

**Documentation dependencies:** Security Document, Backend Architecture Document, Database Design Document, API Documentation  

---

## 2. Content
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  

### Frontend
- Content list  
- Create content  
- Edit content  
- Content details  
- Content status  
- Search  
- Filters  
- Empty states  
- Loading states  
- Error states  
- Responsive layouts  

### Backend
- Create content  
- Read content  
- Update content  
- Delete/archive according to approved lifecycle  
- Ownership enforcement  
- Status validation  
- Search/filter APIs  

### Database
- Content  
- Required Content relationships  
- Content status  
- Ownership indexes  

### Testing
- CRUD  
- Validation  
- Ownership  
- Search  
- Filtering  
- Status transitions  
- Unauthorized access  

---

## 3. Content Pipeline
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  

**Pipeline:** IDEA → DRAFT → READY → SCHEDULED → PUBLISHED  

### Tasks
- Define backend status machine  
- Reject invalid transitions  
- Build pipeline UI  
- Display content by status  
- Support status changes  
- Support keyboard interaction  
- Keep backend as source of truth  

**Documentation dependency:** Feature Specifications, Backend Architecture Document, API Documentation  

---

## 4. Platform Versions
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  

### Tasks
- Create platform-specific versions  
- Caption editing  
- Hashtag editing  
- CTA editing  
- Platform-specific media association  
- Platform-version status  
- Content-family relationship  
- Version uniqueness  

### Database
- **ContentVersion** entity  
- Uniqueness must prevent unintended duplicate platform versions for the same content  

---

## 5. Social Platform Accounts
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  
**DevOps:** Trust  

### Tasks
- Platform connection UI  
- OAuth initiation  
- OAuth callback  
- State protection  
- Permission handling  
- Token encryption  
- Token refresh  
- Disconnect  
- Reauthorization  
- Connection status  
- Platform capability registry  

**Documentation dependency:** Social Platform Integration Specification  

---

## 6. Media Management
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  
**DevOps:** Trust  

### Tasks
- Upload interface  
- Upload validation  
- Supported formats  
- Size limits  
- Signed upload  
- Temporary storage  
- Processing states  
- Upload failures  
- Cleanup abandoned media  
- Secure access  

⚠️ **Critical boundary:** This is temporary operational media, not a permanent creator media library.  

**Documentation dependency:** File & Media Management Document  

---

## 7. Scheduling
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  
**DevOps:** Trust  

### Tasks
- Create schedule  
- Edit schedule  
- Cancel schedule  
- Timezone handling  
- Schedule validation  
- Durable job creation  
- Browser-independent execution  
- Duplicate prevention  
- Failure handling  

**Documentation dependency:** Background Jobs & Scheduling Document  

---

## 8. Calendar
**Priority:** P0 (supporting Scheduling)  
**Primary Owner:** Justice  

⚠️ Calendar is not an independent product capability. It is the frontend representation of approved scheduling functionality.  

### Tasks
- Calendar view  
- Scheduled-content display  
- Date navigation  
- Schedule details  
- Empty state  
- Responsive calendar  
- Keyboard accessibility  

**Rule:** Calendar must not become a general planning/productivity system.  

---

## 9. Background Execution
**Priority:** P0  
**Primary Owner:** Eric  
**Infrastructure:** Trust  

### Tasks
- Redis  
- Queue  
- Worker  
- Job lifecycle  
- Execution IDs  
- Retry policy  
- Timeout handling  
- Cancellation  
- Recovery  
- Idempotency  
- Worker failure recovery  

**Documentation dependencies:** Background Jobs & Scheduling Document, Execution Engine Design, Reliability & Error Handling Document  

---

## 10. Publishing
**Priority:** P0  
**Primary Owner:** Eric  
**Frontend:** Justice  

### Tasks
- Publish Now  
- Scheduled publishing  
- Multi-platform publishing  
- Platform adapters  
- Publishing orchestration  
- Publishing attempt records  
- Platform-specific results  
- Error normalization  
- Backend confirmation  

⚠️ **Critical rule:** The frontend must never report successful publishing before backend confirmation.  

---

## 11. Partial Publishing Success
**Priority:** P0  

**Example:** YouTube succeeds, Instagram fails.  
The system must preserve:  
- YouTube = successful  
- Instagram = failed  

It must not convert the entire publishing operation into an unexplained generic failure.  

---

## 12. Failed-Platform Retry
**Priority:** P0  

### Tasks
- Identify failed platforms  
- Retry only failed platforms  
- Preserve successful platforms  
- Create new publishing attempt records  
- Prevent accidental duplicate