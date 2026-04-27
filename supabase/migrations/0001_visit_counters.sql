-- Visit counter schema + RPCs
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.visit_counters (
  day   date primary key,
  count bigint not null default 0
);

alter table public.visit_counters enable row level security;

-- Atomic page-view increment for today.
-- Returns the current today/total counts so callers can avoid a follow-up read.
create or replace function public.increment_visit()
returns table(today_count bigint, total_count bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today bigint;
  v_total bigint;
begin
  insert into public.visit_counters(day, count)
    values (current_date, 1)
    on conflict (day) do update set count = public.visit_counters.count + 1
    returning count into v_today;

  select coalesce(sum(count), 0) into v_total from public.visit_counters;

  return query select v_today, v_total;
end;
$$;

-- Read-only stats lookup. Cheap: PK lookup + sum over <=365 rows/year.
create or replace function public.get_visit_stats()
returns table(today_count bigint, total_count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce((select count from public.visit_counters where day = current_date), 0)::bigint,
    coalesce((select sum(count) from public.visit_counters), 0)::bigint
$$;

-- Lock down: only service_role (used by our Route Handler) can call these RPCs.
revoke execute on function public.increment_visit()  from public, anon, authenticated;
revoke execute on function public.get_visit_stats() from public, anon, authenticated;
grant  execute on function public.increment_visit()  to service_role;
grant  execute on function public.get_visit_stats() to service_role;
