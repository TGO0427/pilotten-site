# PilotTen Project Hub Setup

This document covers the complete setup of the PilotTen Project Hub system, including the Notion workspace and website integration.

---

## Overview

The Project Hub is a client-facing project management system built on Notion, integrated with the PilotTen website. It allows:

- **Clients**: Track milestones, view timelines, leave feedback, approve deliverables
- **Builders**: Update progress, mark milestones complete, add deliverable links
- **PilotTen**: Manage projects, assign builders, oversee delivery

---

## Tool Stack

| Tool | Purpose |
|------|---------|
| **Notion** | Client + Builder + PilotTen portal (timeline, status, comments, links, approvals) |
| **Trello/Linear** | Internal work tickets (builders live here) |
| **Email/Calendar** | Kickoff + approvals |
| **Website `/portal`** | Client entry point to access their Notion portal |

---

## Notion Structure

### A. PilotTen Projects (Main Page)

**URL**: https://www.notion.so/PilotTen-Projects-2b2c9569111a8008ae3ec82d29ce4054

Contains:
- Intro callout explaining the hub
- **Projects database** (master list of all projects)
- **Project Portal – Template** (duplicate for each new project)

### B. Projects Database

| Column | Type | Options |
|--------|------|---------|
| Project | Title | — |
| Client | Text | — |
| Package | Select | Launch Kit, Lead Engine, Custom MVP |
| Status | Select | Kickoff, In Progress, In Review, Launched, On Hold |
| Builder | Text | — |
| Start Date | Date | — |
| Target Launch | Date | — |
| Portal | URL | Link to the project's portal page |

### C. Project Portal – Template

Each project portal contains:

#### 1. Project Summary (Table)
| Field | Value |
|-------|-------|
| Project Name | [Project Name] |
| Package | Launch Kit / Lead Engine |
| Start Date | [Date] |
| Target Launch | [Date] |
| Builder | [Builder Name] |
| PilotTen PM | Tino |

#### 2. Milestones Database (Inline)

| Column | Type | Options |
|--------|------|---------|
| Milestone | Title | — |
| Status | Select | Not started, In progress, Waiting on client, In review, Done |
| Owner | Select | Builder, Client, PilotTen |
| Due | Date | — |
| Deliverable Link | URL | — |
| Acceptance Criteria | Text | — |

**Default milestones (Launch Kit – 7 days):**
1. Kickoff + assets received
2. First draft deployed
3. Revisions round 1
4. Revisions round 2
5. Tracking + SEO + QA
6. Final handover + launch

#### 3. Status Updates Database (Inline)

| Column | Type | Options |
|--------|------|---------|
| Update | Title | — |
| Date | Date | — |
| Author | Text | — |
| Type | Select | Update, Question, Decision, Blocker |
| ETA | Date | — |

**Required update format:**
```
Done: …
Next: …
Blocked: (None / Waiting on client / Technical / Scope change)
ETA: …
```

#### 4. Links & Deliverables
- Figma: [Add link]
- Vercel Preview: [Add link]
- Live Domain: [Add link]
- Google Drive: [Add link]
- Copy Doc: [Add link]

#### 5. Decisions & Approvals (Checkboxes)
- [ ] Copy approved
- [ ] Design approved
- [ ] Final QA approved
- [ ] Launch approved

#### 6. Access Levels Reminder
```
Client = Comment only | Builder = Edit | PilotTen = Full access
```

---

## Website Integration

### Client Portal Page (`/portal`)

**URL**: `pilotten.africa/portal`

**Features:**
1. **Portal link input** — Clients paste their Notion link and click Open
2. **Validation** — Accepts `notion.so` and `notion.site` domains
3. **Error handling** — Shows friendly error for invalid links
4. **Notion login hint** — "You may be asked to log in to Notion to access your portal"
5. **Security note** — "Your portal is private and invite-only"
6. **Request portal link form** — Email + company name, submits to Formspree

### Footer Links (All Pages)

```
Terms | Privacy | Client Portal | Builders | hello@pilotten.africa
```

### Files Changed

| File | Change |
|------|--------|
| `src/pages/Portal.tsx` | New client portal page |
| `src/main.tsx` | Added `/portal` route |
| `src/pages/App.tsx` | Added Client Portal footer link |
| `src/pages/Demos.tsx` | Added Client Portal footer link |
| `src/pages/CaseStudies.tsx` | Added Client Portal footer link |
| `src/pages/Builders.tsx` | Added Client Portal footer link |

---

## Workflow

### Creating a New Project

1. **Go to Projects database** in Notion
2. **Click New** → fill in project details
3. **Open the new row** → copy content from "Project Portal – Template"
4. **Fill in Project Summary** with actual details
5. **Update Portal column** in Projects database with the page URL

### Sharing with Client & Builder

1. Open the project portal page
2. Click **Share** (top right)
3. **Invite client email** → set to **Can comment**
4. **Invite builder email** → set to **Can edit**
5. Ensure **"Share to web" is OFF** (private)

### Client Onboarding Email

```
Subject: Your PilotTen Project Portal

Hi [Name],

Your project portal is ready:
[Notion Portal Link]

Bookmark this link — it's where you'll track progress,
leave feedback, and approve deliverables.

If you don't have Notion, you'll be prompted to create
a free account with your email.

– Tino
```

---

## Security Checklist

| Check | How to Verify |
|-------|---------------|
| Share to web = OFF | Share → "Share to web" toggle is OFF |
| Client = Can comment | Share → verify permission level |
| Builder = Can edit | Share → verify permission level |
| Private access only | Open link in incognito → should show "Sign in to see this page" |

---

## Notion API Integration

**Integration name**: PilotTen Project Hub

**Token**: (stored securely — do not commit to repo)

**Capabilities used**:
- Create pages
- Create databases
- Update page content
- Add database rows

**Note**: Database templates cannot be created via API — must be set up manually in Notion UI.

---

## Test Project

A test project was created to verify the setup:

**Name**: Test Project – Acme Logistics
**URL**: https://www.notion.so/Test-Project-Acme-Logistics-2eac9569111a810c9bbad655c4c004bd

Contains:
- Filled project summary
- 6 milestones with dates (1 Done, 1 In Progress, 4 Not Started)
- 1 sample status update
- Sample links
- Approval checkboxes (Copy approved = checked)

**Delete when done**: `•••` → Move to trash

---

## Git Commits

| Commit | Description |
|--------|-------------|
| `5bc2e2f` | Add hidden Builders page for freelancer recruitment |
| `a5a72ca` | Refine Builders page with clearer positioning and form |
| `94a107d` | Add Client Portal page with footer links |
| `95be66e` | Add portal link input field to Client Portal page |
| `4b0cb9b` | Enhance Client Portal with request form and context |
| `84bb01a` | Add Notion login hint and improve error message |
