-- Inspace portfolio: projects table
-- Run this in the Supabase SQL editor once to create the table + policies.

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  summary      text not null default '',
  content      text not null default '',           -- markdown body
  tags         text[] not null default '{}',
  role         text,
  year         text,
  cover_image  text,
  hero_image   text,
  live_url     text,
  repo_url     text,
  featured     boolean not null default false,
  published    boolean not null default true,
  sort_order   integer not null default 999,
  published_at timestamptz,
  updated_at   timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published, sort_order);

-- Keep updated_at fresh on every change.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Row Level Security: anyone can read published rows; writes require the
-- service role (used by the seed script) or an authenticated admin.
alter table public.projects enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
  on public.projects for select
  using (published = true);
