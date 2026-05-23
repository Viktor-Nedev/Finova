import { Award, CalendarDays, Flame, Gem, Trophy, Zap } from "lucide-react";
import { ProgressChart } from "../components/ProgressChart";
import { ProgressBar } from "../components/ProgressBar";
import { badges, getLevel, getNextLevel, learningClasses, lessons } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

export function ProgressPage() {
  const xp = useFinovaStore((state) => state.xp);
  const coins = useFinovaStore((state) => state.coins);
  const streak = useFinovaStore((state) => state.streak);
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelMax = nextLevel ? nextLevel.minXp - level.minXp : 1;
  const levelValue = nextLevel ? xp - level.minXp : levelMax;
  const earnedBadges = badges.filter((badge) => badge.earned).length;

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Progress</p>
        <div className="mt-2 grid gap-4 xl:grid-cols-[1fr_22rem]">
          <div>
            <h2 className="section-title">{level.name}</h2>
            <p className="mt-2 text-lg font-bold text-slate-500">{level.badge}</p>
            <div className="mt-5 max-w-2xl">
              <ProgressBar value={levelValue} max={levelMax} label={nextLevel ? `Next: ${nextLevel.name}` : "Max level"} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "XP", value: xp, icon: Zap, className: "bg-green-50 text-duo-green" },
              { label: "Gems", value: coins, icon: Gem, className: "bg-yellow-50 text-amber-500" },
              { label: "Streak", value: streak.count, icon: Flame, className: "bg-orange-50 text-orange-500" },
              { label: "Badges", value: earnedBadges, icon: Award, className: "bg-blue-50 text-duo-blue" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={`rounded-[1.5rem] p-4 text-center ${stat.className}`}>
                  <Icon className="mx-auto h-6 w-6" />
                  <p className="mt-1 text-2xl font-black text-slate-800">{stat.value}</p>
                  <p className="text-xs font-black uppercase text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="duo-card p-5">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-7 w-7 text-duo-green" />
          <div>
            <h2 className="text-2xl font-black text-slate-800">Streak history</h2>
            <p className="text-sm font-bold text-slate-500">Green tiles are active learning days.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2 md:grid-cols-14">
          {Array.from({ length: 28 }, (_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (27 - index));
            const key = date.toISOString().slice(0, 10);
            const active = streak.history.includes(key);
            return (
              <div
                key={key}
                className={`aspect-square rounded-2xl border-2 ${
                  active ? "border-duo-green bg-duo-green shadow-[0_4px_0_#12813b]" : "border-duo-gray bg-white"
                }`}
                title={key}
              />
            );
          })}
        </div>
      </section>

      <ProgressChart />

      <section className="duo-card p-5">
        <div className="flex items-center gap-3">
          <Trophy className="h-7 w-7 text-duo-yellow" />
          <h2 className="text-2xl font-black text-slate-800">Lesson completion</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {learningClasses.slice(0, 12).map((learningClass) => {
            const completed = learningClass.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            return (
              <div key={learningClass.id} className="rounded-[1.5rem] border-2 border-duo-gray bg-duo-soft p-4">
                <p className="font-black text-slate-800">{learningClass.name}</p>
                <p className="text-sm font-bold text-slate-500">
                  {completed}/{learningClass.lessons.length} lessons
                </p>
                <div className="mt-3">
                  <ProgressBar value={completed} max={learningClass.lessons.length} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm font-bold text-slate-500">
          Overall: {completedLessons.length}/{lessons.length} total lessons completed.
        </p>
      </section>
    </div>
  );
}
