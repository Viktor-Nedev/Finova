# Finova

Finova is a full-screen Duolingo-style financial literacy app for students. The main experience is a playful map path where each completed node unlocks the next lesson.

## Run locally

```bash
npm install
npm run dev
```

The app works locally with `localStorage` progress and deterministic AI fallbacks. Add Supabase credentials to enable the Edge Function AI integration.

## Product Features

- Full-screen green, white, and yellow learning map.
- Bottom mobile navigation: Map, Learn, Review, Progress, Profile.
- Top bar with avatar-style brand mark, XP, streak, coins, and AI Tutor access.
- 30 sample map nodes across Basics, Budgeting, Investing, Credit & Debt, and Scams.
- Lesson node types: lesson, quiz, challenge, story, and review.
- Duolingo-style quiz flow with instant green/red feedback.
- Lesson complete screen with mascot celebration, XP, coins, and confetti.
- Progress page with XP, level, streak history, weekly chart, and category progress.
- AI Tutor with simple explanations, real-life examples, mini exercises, mini quiz generation, and scam detection.

## Tech Stack

- React + Vite
- TailwindCSS
- Framer Motion
- Lucide React
- Zustand
- Supabase
- OpenAI through a Supabase Edge Function
- Recharts

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

- Lesson completed: `+10 XP`
- Quiz success: `+5 to +20 XP`
- Daily streak: `+5 XP`
- Coins are awarded for activity and streak milestones.
- Levels: Beginner, Smart Saver, Investor, Money Master, Financial Legend.
