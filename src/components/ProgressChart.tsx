import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { learningClasses } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { XpEvent } from "../types";

function weeklyData(history: XpEvent[]) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      key,
      xp: history.filter((event) => event.date === key).reduce((sum, event) => sum + event.amount, 0),
    };
  });
}

export function ProgressChart() {
  const xp = useFinovaStore((state) => state.xp);
  const xpHistory = useFinovaStore((state) => state.xpHistory);
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const chartData =
    xpHistory.length > 0 ? xpHistory.slice(-14).map((event) => ({ label: event.date.slice(5), xp: event.totalXp })) : [{ label: "Start", xp }];
  const week = weeklyData(xpHistory);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="duo-card p-5">
        <p className="section-eyebrow">XP growth</p>
        <h2 className="section-title">Learning momentum</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="xpFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.42} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#EEF2F7" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#94A3B8" />
              <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: 20, border: "2px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="xp" stroke="#16A34A" strokeWidth={4} fill="url(#xpFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="duo-card p-5">
        <p className="section-eyebrow">Weekly activity</p>
        <h2 className="section-title">{xp} total XP</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={week} margin={{ top: 10, right: 12, left: -22, bottom: 0 }}>
              <CartesianGrid stroke="#EEF2F7" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" />
              <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: 20, border: "2px solid #E5E7EB" }} />
              <Bar dataKey="xp" radius={[14, 14, 6, 6]}>
                {week.map((entry) => (
                  <Cell key={entry.key} fill={entry.xp > 0 ? "#16A34A" : "#D1D5DB"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="duo-card p-5 xl:col-span-2">
        <p className="section-eyebrow">Class progress</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {learningClasses.slice(0, 8).map((learningClass) => {
            const completed = learningClass.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            const percent = Math.round((completed / learningClass.lessons.length) * 100);
            const Icon = learningClass.icon;
            return (
              <div key={learningClass.id} className="rounded-[1.5rem] border-2 border-duo-gray bg-duo-soft p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundColor: learningClass.color }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-black text-slate-800">{learningClass.name}</p>
                    <p className="text-xs font-bold text-slate-500">{percent}% complete</p>
                  </div>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white">
                  <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: learningClass.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
