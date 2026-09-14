-- Blog post reactions ("pulse" takes). Run in the Supabase SQL editor after schema.sql.

create table if not exists public.post_reactions (
  id           uuid primary key default gen_random_uuid(),
  post_slug    text not null,
  reaction     text not null check (reaction in ('l-take', 'w-take', 'spicy', 'based')),
  voter_hash   text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (post_slug, voter_hash)
);

create index if not exists post_reactions_slug_idx on public.post_reactions (post_slug);

drop trigger if exists post_reactions_set_updated_at on public.post_reactions;
create trigger post_reactions_set_updated_at
  before update on public.post_reactions
  for each row execute function public.set_updated_at();

-- Aggregated counts only — safe for public reads.
create or replace view public.post_reaction_totals as
select post_slug, reaction, count(*)::int as total
from public.post_reactions
group by post_slug, reaction;

-- Sliding-window rate limit buckets (server role writes only).
create table if not exists public.reaction_rate_limits (
  bucket        text primary key,
  hits          integer not null default 1,
  window_start  timestamptz not null default now()
);

alter table public.post_reactions enable row level security;
alter table public.reaction_rate_limits enable row level security;

-- No public access to raw votes or rate-limit rows.
drop policy if exists "No public post_reactions" on public.post_reactions;
create policy "No public post_reactions"
  on public.post_reactions for all
  using (false)
  with check (false);

drop policy if exists "No public reaction_rate_limits" on public.reaction_rate_limits;
create policy "No public reaction_rate_limits"
  on public.reaction_rate_limits for all
  using (false)
  with check (false);

grant select on public.post_reaction_totals to anon, authenticated;
