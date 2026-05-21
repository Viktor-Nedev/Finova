import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { XpEvent } from "../types";

type ProgressChartProps = {
  history: XpEvent[];
  xp: number;
};

function buildChartData(history: XpEvent[], xp: number) {
  if (history.length === 0) {
    return [
      { label: "Start", xp: 0, earned: 0 },
      { label: "Now", xp, earned: xp },
    ];
  }

  return history.slice(-12).map((event) => ({
    label: event.date.slice(5),
    xp: event.totalXp,
    earned: event.amount,
    reason: event.reason,
  }));
}

export function ProgressChart({ history, xp }: ProgressChartProps) {
  const data = buildChartData(history, xp);

  return (
    <div className="glass-card p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Progress chart</p>
          <h3 className="mt-2 font-display text-2xl font-black text-white">XP growth</h3>
        </div>
        <span className="rounded-full bg-cyanova/10 px-3 py-1 text-xs font-bold text-cyan-100">{xp} XP</span>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#20e6ff" stopOpacity={0.65} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(7, 17, 31, 0.94)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "18px",
                color: "#e2e8f0",
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="#20e6ff"
              strokeWidth={3}
              fill="url(#xpGradient)"
              activeDot={{ r: 6, fill: "#3df7a8" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
