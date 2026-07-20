-- Run once in the Supabase SQL editor before enabling meal requests in production.
create table if not exists public.meal_preferences (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  meal_type text not null check (meal_type in ('standard', 'vegetarian')),
  vegetarian_menu text check (vegetarian_menu is null or vegetarian_menu = 'set-01'),
  notes text check (notes is null or char_length(notes) <= 1000),
  language text not null default 'vi' check (language in ('vi', 'en', 'fr', 'zh', 'ja')),
  created_at timestamptz not null default now(),
  check (
    (meal_type = 'standard' and vegetarian_menu is null)
    or (meal_type = 'vegetarian' and vegetarian_menu is not null)
  )
);

alter table public.meal_preferences enable row level security;

revoke all on table public.meal_preferences from anon, authenticated;
grant insert on table public.meal_preferences to anon, authenticated;

drop policy if exists "Guests can submit meal preferences" on public.meal_preferences;
create policy "Guests can submit meal preferences"
  on public.meal_preferences
  for insert
  to anon, authenticated
  with check (true);

comment on table public.meal_preferences is
  'Private guest meal requests. Read access is reserved for project owners/service role.';
