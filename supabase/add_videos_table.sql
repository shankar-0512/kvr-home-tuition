-- Run this once in your Supabase SQL editor.
-- Stores YouTube videos managed from the admin dashboard.

create table if not exists videos (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  youtube_id  text        not null unique,
  title       text        not null,
  featured    boolean     not null default false,
  sort_order  integer     not null default 0
);
