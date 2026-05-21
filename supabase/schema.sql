create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar text,
  xp integer not null default 0,
  level text not null default 'Beginner',
  streak integer not null default 0,
  coins integer not null default 50,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id text primary key,
  title text not null,
  description text not null,
  section text not null check (section in ('Basics', 'Budgeting', 'Investing', 'Credit & Debt', 'Scams')),
  "order" integer not null,
  type text not null check (type in ('lesson', 'quiz', 'challenge', 'story', 'review')),
  content jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  status text not null default 'locked' check (status in ('locked', 'available', 'completed')),
  completed_at timestamptz,
  score integer,
  xp_earned integer not null default 0,
  primary key (user_id, lesson_id)
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.lessons(id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_answer text not null,
  explanation text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  selected_answer text not null,
  is_correct boolean not null,
  created_at timestamptz not null default now(),
  primary key (user_id, quiz_id)
);

create table if not exists public.ai_chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_results enable row level security;
alter table public.ai_chats enable row level security;

create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Lessons are readable"
  on public.lessons for select
  using (true);

create policy "Quizzes are readable"
  on public.quizzes for select
  using (true);

create policy "Users can read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "Users can read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

create policy "Users can read own ai chats"
  on public.ai_chats for select
  using (auth.uid() = user_id or user_id is null);

create policy "Users can insert own ai chats"
  on public.ai_chats for insert
  with check (auth.uid() = user_id or user_id is null);
