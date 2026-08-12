# Project Memory

## Current Status
Phase 5 (Volunteer & Partnership Workflow) is fully completed. Public users can submit volunteer/partnership applications from the `/dong-hanh` page, which write to Supabase tables. Admins can audit, filter, update statuses, and save internal notes in dedicated admin dashboards.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS v4. Brand colors: Green (`#2F6B2F`) and Hot Pink (`#E91E63`).
- **Database Client**: `@supabase/supabase-js` SDK.
- **Image Storage**: `public-images` bucket for media uploads, `receipts` bucket for financial ledger attachments.

## Brand Decisions
- Keywords: Humanitarian × Youth × Vietnamese.
- Visual elements: soft borders, warm overlays, clean layout.

## Completed Features
- Image optimization workflow (resized and converted JPGs to lightweight WebPs, reducing size by ~98%).
- Homepage Hero section slideshow displaying actual club photos.
- Secure Admin CMS for Volunteers (`/admin/volunteers`) and Partnerships (`/admin/partnerships`).
- Anonymous INSERT database policies for registration submissions.

## Pending Features
- Phase 6 & 7: SEO optimization, metadata tags, speed audit, and production deployment check.

## Known Bugs
None. Build succeeds.

## Deployment
GitHub: Pushed to `harry090013/clb-hoa-tren-da` (branch: `main`)
Supabase: Connected (`uifgalvhyphayivpqvzy`)

## Last Updated
2026-08-12 22:19
