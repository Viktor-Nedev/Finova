create table if not exists public.finova_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.finova_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  streak_count integer not null default 0,
  last_active_at timestamptz,
  completed_lessons text[] not null default '{}',
  quiz_results jsonb not null default '{}'::jsonb,
  xp_history jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.finova_profiles enable row level security;
alter table public.finova_progress enable row level security;

create policy "Users can read own Finova profile"
  on public.finova_profiles for select
  using (auth.uid() = id);

create policy "Users can upsert own Finova profile"
  on public.finova_profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own Finova profile"
  on public.finova_profiles for update
  using (auth.uid() = id);

create policy "Users can read own Finova progress"
  on public.finova_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own Finova progress"
  on public.finova_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own Finova progress"
  on public.finova_progress for update
  using (auth.uid() = user_id);
