-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text not null default 'fa-solid fa-microchip',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table tools enable row level security;
-- No policies added on purpose: the frontend never talks to Supabase directly.
-- Public reads go through GET /api/tools using the service role key server-side,
-- same pattern as leads.

insert into tools (name, description, icon, display_order) values
  ('AI SEO Optimizer', 'Automated keyword research, content scoring, and search visibility tracking.', 'fa-solid fa-magnifying-glass-chart', 1),
  ('Content Generator', 'On-brand copy and creative variations generated at scale for every channel.', 'fa-solid fa-pen-nib', 2),
  ('ORM & Sentiment Monitor', 'Real-time tracking of brand mentions and reputation signals across the web.', 'fa-solid fa-comments', 3),
  ('Influencer Matcher', 'AI-ranked creator shortlists matched to your audience and campaign goals.', 'fa-solid fa-users-viewfinder', 4),
  ('Attribution Engine', 'Maps every touchpoint, online and offline, back to real business outcomes.', 'fa-solid fa-chart-line', 5),
  ('Support Agent', 'A trained conversational agent that handles FAQs and routes escalations.', 'fa-solid fa-headset', 6),
  ('Geo Content', 'Location-aware content generation tuned to regional audiences and search intent.', 'fa-solid fa-location-dot', 7),
  ('Video QC Tool', 'AI-driven quality checks on video creatives before they go live — flags brand, compliance, and technical issues.', 'fa-solid fa-video', 8);
