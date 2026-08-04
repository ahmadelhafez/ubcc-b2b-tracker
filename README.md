# UBCC / Legenda B2B Account Engine

Private pipeline tracker for Ahmad + Fawaz. Static frontend (GitHub Pages) + Supabase backend (auth + Postgres with RLS).

- Live data: Supabase table `b2b_accounts` (66+ accounts), `b2b_touches` (activity log), `b2b_reports` (weekly radar reports), `b2b_settings`.
- Access: shared team login (Supabase Auth). Nothing renders without login; the anon key alone cannot read data (RLS: authenticated only).
- Weekly automation (Claude scheduled task "ubcc-b2b-weekly-radar") adds researched prospects, verifies data, posts reports.

No build step. Edit `index.html`, push, done.
