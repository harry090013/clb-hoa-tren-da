# Project Memory

## Current Status
Dedicated Category Management (Option B) is fully completed. Stories are linked to `story_categories` via foreign keys. Admins can manage categories at `/admin/categories` and select them inside story forms.

## Architecture Decisions
- **Framework**: Next.js App Router with TypeScript.
- **Data Access Layer**: Joined queries via Supabase JS SDK mapping `story_categories(name)`.
- **Admin CMS**: Added Categories page at `/admin/categories`.

## Completed Features
- Category CRUD list management with order sorting.
- Dynamic dropdown option mapping in Story editor forms.
- Data migration scripts.

## Known Bugs
None. Build succeeds.

## Deployment
GitHub: Pushed to `harry090013/clb-hoa-tren-da` (branch: `main`)
Supabase: Connected (`uifgalvhyphayivpqvzy`)

## Last Updated
2026-08-12 23:08
