# Finova

Finova is a full-screen Duolingo-style financial literacy platform for students. It uses a fixed left sidebar, dense central learning map, persistent right widgets, playful green/white/yellow styling, rounded cards, floating lesson nodes, rewards, quests, games, badges, progress tracking, wallet simulation, and an AI tutor.

## Run locally

```bash
npm install
npm run dev
```

The app runs locally with seeded lesson content, Zustand persistence, and deterministic AI fallbacks. When Supabase env vars are present, user state is synced to Supabase automatically.

## Included Pages

- Map progression path
- Classes
- Quests
- Daily Mission
- Games
- Leaderboards
- News
- Badges
- Wallet Simulator
- AI Tutor
- Notebook
- Flashcards
- Revision Center
- Study Library
- Saved Lessons
- Practice Arena
- Weak Topics
- Daily Revision
- Finance Dictionary
- Progress
- Settings
- Help & Support
- Lesson, Quiz, and Completion flows

## Tech Stack

- React + Vite
- React Router
- TailwindCSS
- Framer Motion
- Zustand
- Lucide React
- Recharts
- Supabase
- OpenAI through Supabase Edge Functions

## Supabase Setup

Copy `.env.example` to `.env`:

```bash
VITE_SUPABASE_URL=https://xjsfqxgpghmxsxbptkdo.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run `supabase/schema.sql` in the Supabase SQL editor. Enable Anonymous sign-ins in Supabase Auth, or replace the anonymous session flow in `src/lib/finovaCloud.ts` with your preferred auth method.

The app syncs:

- profile/settings
- XP, gems, streak, and XP history
- lesson completion and study unlock progress
- quiz results
- notebook notes
- saved lessons
- difficult flashcards
- AI tutor chat history
- wallet simulator transactions and saving goals

## AI Setup

Deploy the Edge Function and set secrets:

```bash
supabase functions deploy finova-ai
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

## Database

Run `supabase/schema.sql` to create:

- `finova_profiles`
- `finova_user_state`
- `finova_study_progress`
- `finova_quiz_results`
- `finova_notes`
- `finova_saved_lessons`
- `finova_difficult_flashcards`
- `finova_played_games`
- `finova_bookmarked_news`
- `finova_xp_events`
- `finova_wallet_transactions`
- `finova_saving_goals`
- `finova_ai_messages`

All user-owned tables have Row Level Security policies scoped to `auth.uid()`.

## Gamification

- Lesson completed: node XP reward
- Quiz success: score-based XP
- Daily streak: `+5 XP`
- Gems/coins awarded for activity
- Levels: Beginner, Smart Saver, Investor, Money Master, Financial Legend
