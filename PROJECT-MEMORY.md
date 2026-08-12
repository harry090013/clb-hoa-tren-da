# Project Memory

## Current Status
Phase 2 (Supabase Read-only) is fully completed. The project is integrated with Supabase. The local data files have been replaced with a query layer targeting Supabase database tables. Next.js app builds successfully.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS v4. Brand colors: Green (`#2F6B2F`) and Hot Pink (`#E91E63`).
- **Database Client**: `@supabase/supabase-js` configured inside [`src/lib/supabase.ts`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/lib/supabase.ts).
- **Data Access Layer**: Migrated to [`src/lib/data.ts`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/lib/data.ts) executing SQL query selections on Supabase.
- **Route strategy**: Prerendered static pages fetching from Supabase database tables. Dynamic slug routes use `generateStaticParams`.

## Brand Decisions
- Keywords: Humanitarian × Youth × Vietnamese.
- Visual elements: soft borders, warm overlays, clearly marked DEMO tags.

## Data Model Decisions
Supabase tables initialized in [`supabase/schema.sql`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/supabase/schema.sql):
- `projects`
- `stories`
- `team_members`
- `partners`
- `impact_stats`
- `financial_reports`
- `financial_transactions`

## Completed Features
- Full Supabase environment setup with `.env.local`.
- Tightly-coupled relational fetch queries for transparency accounting (joining projects & transactions).
- Seamless fallback rendering (`[]` or `null`) when database schema is not yet cached.
- Automated sitemaps & robots routes.

## Pending Features
- Phase 3: Auth + Admin CMS (Admin login, dashboard, content CRUD).
- Phase 4: Full Transparency ledger (database writes, auditing & receipt uploads).

## Known Bugs
None. Build succeeds.

## Missing User Data
- Production statistics, official banking details (represented by placeholders in UI).

## Deployment
GitHub: Pushed to `harry090013/clb-hoa-tren-da` (branch: `main`)
Vercel: NOT PROVIDED
Supabase: Connected (`uifgalvhyphayivpqvzy`)

## Last Updated
2026-08-12 21:41
