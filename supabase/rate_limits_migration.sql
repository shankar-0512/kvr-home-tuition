-- Run this once in your Supabase SQL editor.
-- Required for persistent rate limiting (admin login + enquiry submission).

create table if not exists rate_limits (
  key        text        primary key,
  count      integer     not null default 0,
  reset_at   timestamptz not null
);

-- Optional: auto-clean expired rows daily to keep the table small.
-- (Requires pg_cron extension, available on Supabase Pro)
-- select cron.schedule('clean-rate-limits', '0 3 * * *',
--   $$delete from rate_limits where reset_at < now()$$);
