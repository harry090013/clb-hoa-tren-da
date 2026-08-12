# Project Memory

## Current Status
Phase 0 (Foundation) and Phase 1 (Static MVP) are fully implemented. Next.js App Router (16.3.0) is configured and compiles successfully. All layout structure, mock static database structures, main route pages, forms, and SEO files are set up.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS v4 configured directly via `@import "tailwindcss"` in `globals.css`. Brand colors: Green (`#2F6B2F`) and Hot Pink (`#E91E63`).
- **Typography**: `Be Vietnam Pro` configured via `next/font/google`.
- **Data Access Layer**: Abstracted into static mock dataset files in `src/data/` for easier migration to Supabase in Phase 2.
- **Route strategy**: Prerendered as static HTML. Static details page paths mapped via `generateStaticParams`.

## Brand Decisions
- Keywords: Humanitarian × Youth × Vietnamese.
- Smooth borders (bo góc mềm/card), high contrast, emotional photography placeholders, zero neon/glow styling.

## Data Model Decisions
Structured in [`src/types/index.ts`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/types/index.ts):
- `Project`
- `Story`
- `TeamMember`
- `Partner`
- `ImpactStat`
- `FinancialReport`
- `FinancialTransaction`

## Completed Features
- Homepage with Hero, Stories, Mission, Impact metrics, Transparency overview, and Partners.
- Details pages for charity Projects and Journeys.
- Interactive Volunteer and Partner registration forms with success states.
- Fully automated sitemap and robots crawler index.
- Comprehensive contact section.

## Pending Features
- Phase 2: Supabase Read-only migration.
- Phase 3: Auth + Admin CMS.
- Phase 4: Full Transparency ledger (database writes & filters).

## Known Bugs
None. Builds compile successfully without errors.

## Missing User Data
- Real member statistics, precise founding dates, Facebook/Zalo handles, official bank credentials, active QR images, and production beneficiary metrics (all represented using explicit placeholder `DEMO` badges in UI).

## Deployment
GitHub: NOT PROVIDED
Vercel: NOT PROVIDED
Supabase: NOT CONNECTED

## Last Updated
2026-08-12 21:28
