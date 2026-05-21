import { motion } from "framer-motion";
import { CompoundInterestLab } from "../components/CompoundInterestLab";
import { LessonCard } from "../components/LessonCard";
import { ProgressChart } from "../components/ProgressChart";
import { StatCard } from "../components/StatCard";
import { StreakCounter } from "../components/StreakCounter";
import { XPBar } from "../components/XPBar";
import { lessons } from "../data/lessons";
import { useFinova } from "../state/FinovaContext";
import type { View } from "../types";

type DashboardPageProps = {
  onNavigate: (view: View) => void;
  onOpenLesson: (lessonId: string) => void;
};

export function DashboardPage({ onNavigate, onOpenLesson }: DashboardPageProps) {
  const { state, level } = useFinova();
  const completedCount = state.completedLessons.length;
  const nextLessons = lessons.filter((lesson) => !state.completedLessons.includes(lesson.id)).slice(0, 3);
  const recommendedLessons = nextLessons.length > 0 ? nextLessons : lessons.slice(0, 3);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden p-6 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">Student command center</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
              Your money skill streak is live.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Complete a short lesson, answer the quiz, earn XP, and unlock the next level. You can start a lesson in
              two clicks from here.
            </p>
            <div className="mt-7">
              <XPBar xp={state.xp} />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-2xl bg-cyanova px-6 py-4 font-black text-night shadow-glow transition hover:bg-mintnova"
                onClick={() => onOpenLesson(recommendedLessons[0].id)}
              >
                Resume Quest
              </button>
              <button
                className="rounded-2xl border border-white/10 px-6 py-4 font-black text-white transition hover:bg-white/10"
                onClick={() => onNavigate("tutor")}
              >
                Ask AI Tutor
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <StreakCounter count={state.streak.count} />
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current level</p>
              <p className="mt-3 font-display text-4xl font-black text-white">{level.name}</p>
              <p className="mt-2 text-sm text-slate-300">{level.badge}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Lessons done" value={`${completedCount}/${lessons.length}`} detail="Complete all categories" tone="cyan" />
        <StatCard label="Quiz average" value={`${Math.round(
          Object.values(state.quizResults).reduce((sum, result) => sum + result.score / result.total, 0) /
            Math.max(1, Object.values(state.quizResults).length) *
            100,
        )}%`} detail="Instant feedback improves recall" tone="mint" />
        <StatCard label="Level badge" value={level.name} detail={level.badge} tone="violet" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Quick access</p>
            <h2 className="mt-2 font-display text-3xl font-black text-white">Recommended lessons</h2>
          </div>
          <button className="text-sm font-black text-cyanova" onClick={() => onNavigate("learn")}>
            View all
          </button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {recommendedLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={state.completedLessons.includes(lesson.id)}
              onOpen={onOpenLesson}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ProgressChart history={state.xpHistory} xp={state.xp} />
        <CompoundInterestLab />
      </div>
    </div>
  );
}
