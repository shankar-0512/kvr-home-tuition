-- Run this in your Supabase SQL editor.
-- Adds a status column to track follow-up state for each enquiry.

alter table enquiries
  add column if not exists status text not null default 'new';

-- Valid values: 'new' | 'contacted' | 'enrolled' | 'not_interested'
