import { ProgressChart } from "../components/ProgressChart";
import { XPBar } from "../components/XPBar";
import { lessons } from "../data/lessons";
import { useFinova } from "../state/FinovaContext";

export function ProgressPage() {
  const { state, level, nextLevel } = useFinova();

  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">Progress</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">Track your money skill streak.</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          XP, completed lessons, quiz results, and streaks are saved locally for the demo and can be synced to Supabase.
        </p>
        <div className="mt-7">
          <XPBar xp={state.xp} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ProgressChart history={state.xpHistory} xp={state.xp} />

        <div className="space-y-4">
          <div className="glass-card p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Level ladder</p>
            <h2 className="mt-2 font-display text-3xl font-black text-white">{level.name}</h2>
            <p className="mt-2 text-sm text-slate-300">
              {nextLevel ? `${nextLevel.minXp - state.xp} XP until ${nextLevel.name}.` : "You reached the top level."}
            </p>
          </div>

          <div className="glass-card p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Streak history</p>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }, (_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (13 - index));
                const key = date.toISOString().slice(0, 10);
                const active = state.streak.history.includes(key);
                return (
                  <div
                    key={key}
                    className={`h-12 rounded-2xl border ${
                      active ? "border-mintnova bg-mintnova/20 shadow-glow" : "border-white/10 bg-white/[0.04]"
                    }`}
                    title={key}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="glass-card p-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Completed lessons</p>
            <h2 className="mt-2 font-display text-3xl font-black text-white">
              {state.completedLessons.length}/{lessons.length} quests complete
            </h2>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {lessons.map((lesson) => {
            const result = state.quizResults[lesson.id];
            const completed = state.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`rounded-2xl border p-4 ${
                  completed ? "border-mintnova/30 bg-mintnova/10" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{lesson.title}</p>
                    <p className="text-xs text-slate-400">{lesson.category}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                    {result ? `${result.score}/${result.total}` : "Open"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
