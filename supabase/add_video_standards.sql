-- Run this once in your Supabase SQL editor.
-- Adds standard (class) tagging to videos. A video can be tagged with
-- more than one standard, so this is a text array.

alter table videos add column if not exists standards text[] not null default '{}';

-- Backfill: any video added before this column existed is tagged 9th standard.
update videos set standards = array['9th'] where standards = '{}';
