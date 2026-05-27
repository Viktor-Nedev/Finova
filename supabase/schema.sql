create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.finova_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Finova Student',
  avatar text not null default 'F',
  student_level text not null default 'Beginner',
  xp integer not null default 0 check (xp >= 0),
  coins integer not null default 50 check (coins >= 0),
  streak_count integer not null default 0 check (streak_count >= 0),
  notifications_enabled boolean not null default true,
  leaderboard_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finova_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state_version integer not null default 1,
  app_state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finova_study_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  progress integer not null default 0 check (progress between 0 and 100),
  read_section_ids text[] not null default '{}',
  completed_practice_ids text[] not null default '{}',
  quiz_unlocked boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.finova_quiz_results (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  quiz_xp integer not null default 0 check (quiz_xp >= 0),
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.finova_notes (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null default '',
  class_name text not null,
  lesson_id text,
  lesson_title text,
  pinned boolean not null default false,
  favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finova_saved_lessons (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.finova_difficult_flashcards (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.finova_played_games (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists public.finova_bookmarked_news (
  user_id uuid not null references auth.users(id) on delete cascade,
  news_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, news_id)
);

create table if not exists public.finova_xp_events (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_date date not null default current_date,
  reason text not null,
  amount integer not null,
  total_xp integer not null check (total_xp >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.finova_wallet_transactions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  category text not null,
  amount numeric(12, 2) not null,
  transaction_type text not null check (transaction_type in ('income', 'expense', 'investment')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finova_saving_goals (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  current_amount numeric(12, 2) not null default 0 check (current_amount >= 0),
  target_amount numeric(12, 2) not null check (target_amount > 0),
  color text not null default '#16A34A',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.finova_ai_messages (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('tutor', 'scam')),
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists finova_study_progress_user_idx on public.finova_study_progress (user_id);
create index if not exists finova_quiz_results_user_completed_idx on public.finova_quiz_results (user_id, completed_at desc);
create index if not exists finova_notes_user_updated_idx on public.finova_notes (user_id, updated_at desc);
create index if not exists finova_notes_user_class_idx on public.finova_notes (user_id, class_name);
create index if not exists finova_saved_lessons_user_idx on public.finova_saved_lessons (user_id);
create index if not exists finova_difficult_flashcards_user_idx on public.finova_difficult_flashcards (user_id);
create index if not exists finova_played_games_user_idx on public.finova_played_games (user_id);
create index if not exists finova_bookmarked_news_user_idx on public.finova_bookmarked_news (user_id);
create index if not exists finova_xp_events_user_date_idx on public.finova_xp_events (user_id, event_date desc);
create index if not exists finova_wallet_transactions_user_updated_idx on public.finova_wallet_transactions (user_id, updated_at desc);
create index if not exists finova_saving_goals_user_idx on public.finova_saving_goals (user_id);
create index if not exists finova_ai_messages_user_created_idx on public.finova_ai_messages (user_id, created_at desc);

drop trigger if exists set_finova_profiles_updated_at on public.finova_profiles;
create trigger set_finova_profiles_updated_at
  before update on public.finova_profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_user_state_updated_at on public.finova_user_state;
create trigger set_finova_user_state_updated_at
  before update on public.finova_user_state
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_study_progress_updated_at on public.finova_study_progress;
create trigger set_finova_study_progress_updated_at
  before update on public.finova_study_progress
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_quiz_results_updated_at on public.finova_quiz_results;
create trigger set_finova_quiz_results_updated_at
  before update on public.finova_quiz_results
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_notes_updated_at on public.finova_notes;
create trigger set_finova_notes_updated_at
  before update on public.finova_notes
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_wallet_transactions_updated_at on public.finova_wallet_transactions;
create trigger set_finova_wallet_transactions_updated_at
  before update on public.finova_wallet_transactions
  for each row execute function public.set_updated_at();

drop trigger if exists set_finova_saving_goals_updated_at on public.finova_saving_goals;
create trigger set_finova_saving_goals_updated_at
  before update on public.finova_saving_goals
  for each row execute function public.set_updated_at();

alter table public.finova_profiles enable row level security;
alter table public.finova_user_state enable row level security;
alter table public.finova_study_progress enable row level security;
alter table public.finova_quiz_results enable row level security;
alter table public.finova_notes enable row level security;
alter table public.finova_saved_lessons enable row level security;
alter table public.finova_difficult_flashcards enable row level security;
alter table public.finova_played_games enable row level security;
alter table public.finova_bookmarked_news enable row level security;
alter table public.finova_xp_events enable row level security;
alter table public.finova_wallet_transactions enable row level security;
alter table public.finova_saving_goals enable row level security;
alter table public.finova_ai_messages enable row level security;

drop policy if exists finova_profiles_owner_all on public.finova_profiles;
create policy finova_profiles_owner_all on public.finova_profiles
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_user_state_owner_all on public.finova_user_state;
create policy finova_user_state_owner_all on public.finova_user_state
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_study_progress_owner_all on public.finova_study_progress;
create policy finova_study_progress_owner_all on public.finova_study_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_quiz_results_owner_all on public.finova_quiz_results;
create policy finova_quiz_results_owner_all on public.finova_quiz_results
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_notes_owner_all on public.finova_notes;
create policy finova_notes_owner_all on public.finova_notes
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_saved_lessons_owner_all on public.finova_saved_lessons;
create policy finova_saved_lessons_owner_all on public.finova_saved_lessons
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_difficult_flashcards_owner_all on public.finova_difficult_flashcards;
create policy finova_difficult_flashcards_owner_all on public.finova_difficult_flashcards
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_played_games_owner_all on public.finova_played_games;
create policy finova_played_games_owner_all on public.finova_played_games
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_bookmarked_news_owner_all on public.finova_bookmarked_news;
create policy finova_bookmarked_news_owner_all on public.finova_bookmarked_news
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_xp_events_owner_all on public.finova_xp_events;
create policy finova_xp_events_owner_all on public.finova_xp_events
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_wallet_transactions_owner_all on public.finova_wallet_transactions;
create policy finova_wallet_transactions_owner_all on public.finova_wallet_transactions
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_saving_goals_owner_all on public.finova_saving_goals;
create policy finova_saving_goals_owner_all on public.finova_saving_goals
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists finova_ai_messages_owner_all on public.finova_ai_messages;
create policy finova_ai_messages_owner_all on public.finova_ai_messages
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
