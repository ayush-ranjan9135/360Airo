# Globopersona - Email Outreach & Warmup Engine

A premium, production-grade B2B SaaS outreach and deliverability monitoring platform built using Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

Designed with inspiration from top-tier SaaS products like Linear, Notion, Resend, and Superhuman to provide clean typography rhythm, high-contrast layouts, spacious tables, and micro-animations.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.0.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts (with client-side hydration safeguards)
- **State & Access Controls**: Native Client React Context + LocalStorage persistence

---

## 🛠 Features Rebuilt

1. **Authentication Shell (`/auth`)**:
   - Gorgeous split-screen auth deck highlighting outreach deliverability metrics.
   - Flow switcher: Sign In, Sign Up, Forgot Password, and the specialized **Pending Approval** review card.
   - Demo credentials helper to easily auto-fill specified parameters:
     - **Email**: `ayushranjan9531@gmail.com`
     - **Password**: `Ayush@123`

2. **Core Layout Shell**:
   - Collapsible navigation Sidebar with active status highlights and team switchers.
   - Top Nav displaying notification drops, profile settings, and Command Bar trigger points.
   - Command Bar (`Ctrl + K`) overlay permitting Raycast-style page jumps and actions.

3. **Workspace Dashboard (`/`)**:
   - Outbound analytics metrics (sent, open rate, replies rate, deliverability %).
   - Multi-line Area performance chart detailing emails sent and opened over time.
   - Real-time deliverability diagnostic logs feed and setup health checklist.
   - B2B Outreach Launchpad.

4. **Campaign Control Console (`/campaigns`)**:
   - Main campaign tracking table displaying delivery statuses, sent counts, and engagement percentages.
   - Multiselect table checkbars with bulk execution panels (pause, resume, delete).
   - Dynamic search inputs and status filter tabs.

5. **Outreach sequence Builder (`/campaigns/create`)**:
   - Stepper wizard guiding through Details -> Sequence -> Audience -> Schedule.
   - Write sequence editor supporting custom stage delays, multiple email steps, and **AI content generator prompts**.
   - Side-by-side live email preview rendering merge tokens (`{{firstName}}`, `{{companyName}}`) dynamically.
   - Throttling delivery caps, schedule slots, and warmup toggle switches.

6. **Lead Manager CRM (`/prospects`)**:
   - Contact database detailing prospect names, job titles, companies, engagement tags, and active status levels.
   - Sliding detail drawer displaying a granular logs timeline and a workspace notes text editor.

7. **Domains & Warmup Monitor (`/mailboxes`)**:
   - Connected mailboxes overview with health percentage dials and warmup flame icons.
   - DNS checklist verifying MX, SPF, DKIM, DMARC, and white-labeled Tracking records.
   - "Connect Mailbox" dialog verification screen for SMTP/IMAP credentials.

8. **Settings Panel (`/settings`)**:
   - Form controls to modify profile settings and organization quotas.
   - Copy-to-clipboard API token lists with responsive status verification states.
   - CRM Integrations card deck (Hubspot, Salesforce, Zapier).

---

## 📂 Project Structure

```
src/
├── app/                      # Next.js App Router route groups
│   ├── (dashboard)/          # Dashboard pages shell (Layout, Dashboard, Campaigns, CRM, etc.)
│   │   ├── layout.tsx        # Coordinates Sidebar and TopNav shell
│   │   ├── page.tsx          # Analytics dashboard
│   │   ├── campaigns/        # Queue lists and detail logs
│   │   ├── prospects/        # Leads database & drawers
│   │   ├── mailboxes/        # Warmup hubs & DNS checklists
│   │   └── settings/         # API Keys & CRM syncing
│   ├── auth/                 # Split-screen Auth layout (Sign In, Sign Up, Forgot, Pending)
│   ├── globals.css           # Tailwind v4 directives and design variables
│   └── layout.tsx            # HTML wrappers and session providers
├── components/               # Custom UI primitives
│   ├── ui/                   # Reusable components (Button, Input, Card, Table, Tabs, Badge, Tooltip, Dialog, Skeleton, EmptyState)
│   └── layout/               # Shared components (Sidebar, TopNav, CommandBar)
├── lib/                      # Helper libraries
│   ├── utils.ts              # Class name merger helper
│   └── auth-context.tsx      # Auth session provider
```

---

## 🏃‍♂️ Getting Started

First, install the local packages:

```bash
npm install --legacy-peer-deps
```

Then, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the redesigned platform.

To build the optimized production bundle:

```bash
npm run build
```
