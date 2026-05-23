# Finova

Finova is a full-screen Duolingo-style financial literacy platform for students. It uses a fixed left sidebar, dense central learning map, persistent right widgets, playful green/white/yellow styling, rounded cards, floating lesson nodes, rewards, quests, games, badges, progress tracking, wallet simulation, and an AI tutor.

## Run locally

```bash
npm install
npm run dev
```

The app runs locally with mock data, Zustand persistence, and deterministic AI fallbacks. Supabase and OpenAI can be connected through the included Edge Function.

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

## AI Setup

Copy `.env.example` to `.env`:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Deploy the Edge Function and set secrets:

```bash
supabase functions deploy finova-ai
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

## Database

Run `supabase/schema.sql` to create:

- `users`
- `lessons`
- `user_progress`
- `quizzes`
- `quiz_results`
- `ai_chats`

## Gamification

- Lesson completed: node XP reward
- Quiz success: score-based XP
- Daily streak: `+5 XP`
- Gems/coins awarded for activity
- Levels: Beginner, Smart Saver, Investor, Money Master, Financial Legend
