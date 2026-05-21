import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { pathSections } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { XpEvent } from "../types";

function weeklyData(history: XpEvent[]) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      key,
      xp: 0,
    };
  });

  for (const event of history) {
    const day = days.find((item) => item.key === event.date);
    if (day) {
      day.xp += event.amount;
    }
  }

  return days;
}

export function ProgressChart() {
  const xp = useFinovaStore((state) => state.xp);
  const xpHistory = useFinovaStore((state) => state.xpHistory);
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const chartData = xpHistory.length > 0 ? xpHistory.slice(-12).map((event) => ({ label: event.date.slice(5), xp: event.totalXp })) : [{ label: "Start", xp: 0 }];
  const week = weeklyData(xpHistory);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="duo-card p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">XP growth</p>
        <h2 className="mt-2 text-2xl font-black text-slate-800">Your learning curve</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="duoXp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#94a3b8" />
              <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 20, border: "2px solid #e5e7eb", boxShadow: "0 14px 35px rgba(15,23,42,.08)" }} />
              <Area type="monotone" dataKey="xp" stroke="#16A34A" strokeWidth={4} fill="url(#duoXp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="duo-card p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Weekly activity</p>
        <h2 className="mt-2 text-2xl font-black text-slate-800">{xp} total XP</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={week} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94a3b8" />
              <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 20, border: "2px solid #e5e7eb" }} />
              <Bar dataKey="xp" radius={[12, 12, 4, 4]}>
                {week.map((entry) => (
                  <Cell key={entry.key} fill={entry.xp > 0 ? "#16A34A" : "#E2E8F0"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="duo-card p-5 sm:p-6 xl:col-span-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Category progress</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pathSections.map((section) => {
            const complete = section.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            const percent = Math.round((complete / section.lessons.length) * 100);
            const Icon = section.icon;
            return (
              <div key={section.id} className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-4 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[10px] bg-white" style={{ borderColor: section.color }}>
                  <Icon className="h-7 w-7" style={{ color: section.color }} />
                </div>
                <p className="mt-3 font-black text-slate-800">{section.name}</p>
                <p className="text-sm font-bold text-slate-500">{percent}% complete</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
