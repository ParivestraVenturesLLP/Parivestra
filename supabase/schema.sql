-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand_name text,
  phone text,
  email text,
  service_required text,
  source text not null default 'contact_form',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table leads enable row level security;
-- No policies added on purpose: the frontend never talks to Supabase directly.
-- All reads/writes go through the Express API using the service role key,
-- which bypasses RLS entirely.
