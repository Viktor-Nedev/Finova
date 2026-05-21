type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "violet" | "mint" | "amber";
};

const tones = {
  cyan: "from-cyan-400/20 to-blue-500/5 text-cyan-100",
  violet: "from-violet-400/20 to-fuchsia-500/5 text-violet-100",
  mint: "from-emerald-400/20 to-green-500/5 text-emerald-100",
  amber: "from-amber-300/20 to-orange-500/5 text-amber-100",
};

export function StatCard({ label, value, detail, tone = "cyan" }: StatCardProps) {
  return (
    <div className={`glass-card bg-gradient-to-br ${tones[tone]} p-5`}>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-3 font-display text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  );
}
