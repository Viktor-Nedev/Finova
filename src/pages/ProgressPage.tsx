import { CalendarDays, Flame, Gem, Trophy, Zap } from "lucide-react";
import { ProgressChart } from "../components/ProgressChart";
import { ProgressBar } from "../components/ProgressBar";
import { getLevel, getNextLevel, lessons } from "../data/lessons";
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

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-duo-sky px-4 pb-24 pt-6 sm:px-8">
      <section className="duo-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">Progress</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-800 sm:text-5xl">{level.name}</h1>
            <p className="mt-2 text-lg font-bold text-slate-500">{level.badge}</p>
          </div>
          <div className="w-full max-w-md">
            <ProgressBar value={levelValue} max={levelMax} label={nextLevel ? `Next: ${nextLevel.name}` : "Max level"} />
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total XP", value: xp, icon: Zap, color: "text-duo-green", bg: "bg-green-50" },
          { label: "Streak", value: `${streak.count} days`, icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Coins", value: coins, icon: Gem, color: "text-amber-500", bg: "bg-yellow-50" },
          { label: "Lessons", value: `${completedLessons.length}/${lessons.length}`, icon: Trophy, color: "text-duo-blue", bg: "bg-blue-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="duo-card p-5">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-5 duo-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-7 w-7 text-duo-green" />
          <div>
            <h2 className="text-2xl font-black text-slate-800">Streak history</h2>
            <p className="text-sm font-bold text-slate-500">Green days mean you checked in and earned your streak reward.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2 sm:grid-cols-14">
          {Array.from({ length: 21 }, (_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (20 - index));
            const key = date.toISOString().slice(0, 10);
            const active = streak.history.includes(key);
            return (
              <div
                key={key}
                title={key}
                className={`aspect-square rounded-2xl border-2 ${active ? "border-duo-green bg-duo-green shadow-[0_4px_0_#12813b]" : "border-slate-100 bg-white"}`}
              />
            );
          })}
        </div>
      </section>

      <div className="mt-5">
        <ProgressChart />
      </div>
    </div>
  );
}
