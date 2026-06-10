-- Per-post view counter schema + RPCs
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.post_views (
  slug  text primary key,
  count bigint not null default 0
);

alter table public.post_views enable row level security;

-- Atomic per-post view increment. Caller (list page) reads counts separately,
-- so this returns nothing.
create or replace function public.increment_post_view(p_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.post_views(slug, count)
    values (p_slug, 1)
    on conflict (slug) do update set count = public.post_views.count + 1;
end;
$$;

-- Read-only batch lookup of every post's view count. Cheap: full scan over a
-- table with one row per post (<100 rows).
create or replace function public.get_post_views()
returns table(slug text, count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select slug, count from public.post_views
$$;

-- Lock down: only service_role (used by our Route Handler) can call these RPCs.
revoke execute on function public.increment_post_view(text) from public, anon, authenticated;
revoke execute on function public.get_post_views()           from public, anon, authenticated;
grant  execute on function public.increment_post_view(text) to service_role;
grant  execute on function public.get_post_views()           to service_role;
