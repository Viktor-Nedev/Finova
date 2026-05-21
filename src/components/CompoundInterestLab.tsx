import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateAmount(principal: number, rate: number, years: number, compoundsPerYear: number) {
  return principal * (1 + rate / 100 / compoundsPerYear) ** (compoundsPerYear * years);
}

export function CompoundInterestLab() {
  const [principal, setPrincipal] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const compoundsPerYear = 12;

  const data = Array.from({ length: years + 1 }, (_, year) => ({
    year,
    amount: Math.round(calculateAmount(principal, rate, year, compoundsPerYear)),
  }));
  const finalAmount = calculateAmount(principal, rate, years, compoundsPerYear);

  return (
    <section className="glass-card overflow-hidden p-5">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-mintnova/70">Interactive lab</p>
          <h3 className="mt-2 font-display text-3xl font-black text-white">Compound interest visualizer</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Formula: <span className="font-bold text-white">A = P(1 + r/n)^(nt)</span>. Move the sliders to see
            how starting amount, rate, and time change the outcome.
          </p>

          <div className="mt-6 space-y-5">
            <label className="block">
              <div className="flex justify-between text-sm font-bold text-slate-200">
                <span>Initial amount P</span>
                <span>{formatCurrency(principal)}</span>
              </div>
              <input
                className="slider"
                type="range"
                min="50"
                max="5000"
                step="50"
                value={principal}
                onChange={(event) => setPrincipal(Number(event.target.value))}
              />
            </label>

            <label className="block">
              <div className="flex justify-between text-sm font-bold text-slate-200">
                <span>Interest rate r</span>
                <span>{rate}%</span>
              </div>
              <input
                className="slider"
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
              />
            </label>

            <label className="block">
              <div className="flex justify-between text-sm font-bold text-slate-200">
                <span>Time t</span>
                <span>{years} years</span>
              </div>
              <input
                className="slider"
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="mt-6 rounded-3xl border border-mintnova/20 bg-mintnova/10 p-4">
            <p className="text-sm text-mintnova/80">Projected value</p>
            <p className="font-display text-4xl font-black text-white">{formatCurrency(finalAmount)}</p>
          </div>
        </div>

        <div className="min-h-80 rounded-[1.7rem] border border-white/10 bg-night/50 p-4">
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{
                  background: "rgba(7, 17, 31, 0.94)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "18px",
                  color: "#e2e8f0",
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3df7a8"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 7, fill: "#20e6ff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
