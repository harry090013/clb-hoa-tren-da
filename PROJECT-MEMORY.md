# Project Memory

## Current Status
Phase 3 (Admin CMS) is fully completed and integrated. Administrators can authenticate via Supabase Auth and manage website records (Projects, Stories, Team, Partners) using unified admin dashboards and image upload components.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS v4. Brand colors: Green (`#2F6B2F`) and Hot Pink (`#E91E63`).
- **Database Client**: `@supabase/supabase-js` client SDK.
- **Data Access Layer**: [`src/lib/data.ts`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/lib/data.ts) executing SQL select queries for public pages, and client-side Supabase client for admin CRUD mutations.
- **Admin Authentication**: Handled client-side via [`AdminGuard.tsx`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/components/admin/AdminGuard.tsx) checking active Auth session.
- **Image Storage**: Uploads target the `public-images` Supabase Storage bucket.

## Brand Decisions
- Keywords: Humanitarian × Youth × Vietnamese.
- Visual elements: soft borders, warm overlays, clean layout.

## Data Model Decisions
Supabase tables initialized:
- `projects`
- `stories`
- `team_members`
- `partners`
- `impact_stats`
- `financial_reports`
- `financial_transactions`
- `profiles` (User profile mapping role authorizations)

## Completed Features
- Dynamic Admin dashboard with entity statistics counters.
- Slug auto-generation from titles in projects & stories forms.
- Supabase storage upload helper returning public URL paths.
- Modal-driven CRUD overlays for Team and Partner lists.
- Full git synchronization and compilation build validation.

## Pending Features
- Phase 4: Full Transparency ledger (database writes, auditing & receipt uploads).
- Phase 5: Volunteer & Partnership registrations dashboard.

## Known Bugs
None. Build succeeds.

## Missing User Data
- Production statistics, official banking details (represented by placeholders in UI).

## Deployment
GitHub: Pushed to `harry090013/clb-hoa-tren-da` (branch: `main`)
Vercel: NOT PROVIDED
Supabase: Connected (`uifgalvhyphayivpqvzy`)

## Last Updated
2026-08-12 21:54
