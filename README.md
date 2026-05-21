# Finova

Finova is a gamified AI-powered financial literacy platform for students. It includes short lessons, quizzes, XP, streaks, levels, an AI tutor, a scam detector, and a compound interest visualizer.

## Run locally

```bash
npm install
npm run dev
```

The app runs without backend credentials by using local demo AI fallbacks and localStorage progress.

## Enable Supabase and OpenAI

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and fill in:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Deploy the database schema in `supabase/schema.sql`.
4. Deploy the Edge Function:

```bash
supabase functions deploy finova-ai
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

## Product Features

- Landing page with animated fintech hero and clear CTA.
- Dashboard with XP bar, streak counter, level badge, lesson recommendations, and progress chart.
- Learn page grouped by Budgeting, Investing, Credit and Debt, and Scams.
- Lesson pages with short explanations, examples, takeaways, and quiz entry.
- Quiz system with instant feedback and XP rewards.
- AI tutor chat for simple explanations, examples, and mini exercises.
- Optional scam detector for suspicious text.
- Compound interest simulator using `A = P(1 + r/n)^(nt)` and Recharts.

## Gamification Rules

- Lesson completed: `+10 XP`
- Quiz success: `+5 to +20 XP`, based on score
- Daily streak bonus: `+5 XP`
- Levels: Beginner, Saver, Investor, Financial Master
