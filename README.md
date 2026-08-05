# UBCC / Legenda B2B Account Engine

Private pipeline tracker. Static frontend (GitHub Pages) + Supabase backend (auth + Postgres with RLS).

Security model:
- Personal accounts only (Ahmad = sales admin, Shereen = curation). No shared logins.
- Optional TOTP two-factor per account, enforced at the DATABASE level: once a user has a verified factor, any session without aal2 is refused by RLS on every table and storage object.
- Client-side: exponential login backoff, 30-minute idle auto-logout, sessions in sessionStorage unless "Remember this device" is checked.
- Anon key alone can read nothing (RLS authenticated-only + MFA guard). Public share links expose exactly one curated list via a security-definer RPC keyed by unguessable code.

Weekly automation (Claude scheduled task) adds researched prospects, verifies data, posts reports. No build step: edit index.html, push, done.
