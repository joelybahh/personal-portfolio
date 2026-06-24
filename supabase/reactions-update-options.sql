-- Run this if you already applied an earlier version of reactions.sql.

delete from public.post_reactions
where reaction not in ('l-take', 'w-take', 'spicy', 'based');

alter table public.post_reactions
  drop constraint if exists post_reactions_reaction_check;

alter table public.post_reactions
  add constraint post_reactions_reaction_check
  check (reaction in ('l-take', 'w-take', 'spicy', 'based'));

create or replace view public.post_reaction_totals as
select post_slug, reaction, count(*)::int as total
from public.post_reactions
group by post_slug, reaction;
