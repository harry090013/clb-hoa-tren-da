# Project Memory

## Current Status
Phase 4 (Transparency Platform) is fully completed and integrated. Administrators can manage financial reports and transaction entries in the Admin CMS, upload receipt images to the public `receipts` Supabase Storage bucket, and public users can interactively search, filter, and preview receipts.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS v4. Brand colors: Green (`#2F6B2F`) and Hot Pink (`#E91E63`).
- **Database Client**: `@supabase/supabase-js` SDK.
- **Data Access Layer**: [`src/lib/data.ts`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/lib/data.ts) executing SQL select queries for public pages, and client-side Supabase client for admin CRUD mutations.
- **Image Storage**: `public-images` bucket for team/partners/project cover images, and `receipts` bucket for financial ledger attachments.

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
- `profiles`

## Completed Features
- Transaction search bar and tab filtering on the public `/minh-bach` page.
- Dialog popups for checking transaction receipts.
- Interactive transaction ledger sub-form on the Admin CMS panel.
- Cascading transaction deletes from the database.

## Pending Features
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
2026-08-12 21:59
