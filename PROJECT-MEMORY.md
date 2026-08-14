# Project Memory

## Current Status
Maintenance Mode Gate is fully implemented. Public users see a maintenance screen. Admin users can access the CMS via `/admin` and team members can bypass the screen to preview public pages by entering the password `130920`.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Maintenance Bypass**: Client-side block in `MaintenanceGate.tsx` using `localStorage` token checked on page path change (exempts `/admin`).

## Completed Features
- Interactive Maintenance Screen overlay.
- Password prompt dialog gate (`130920`).
- Unified layout integration.

## Known Bugs
None. Build succeeds.

## Deployment
GitHub: Pushed to `harry090013/clb-hoa-tren-da` (branch: `main`)
Vercel: READY TO DEPLOY
Supabase: Connected (`uifgalvhyphayivpqvzy`)

## Last Updated
2026-08-13 11:15
