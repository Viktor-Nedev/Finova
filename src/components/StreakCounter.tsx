type StreakCounterProps = {
  count: number;
};

export function StreakCounter({ count }: StreakCounterProps) {
  return (
    <div className="rounded-3xl border border-orange-300/20 bg-orange-300/10 p-4 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.24em] text-orange-100/70">Daily streak</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="font-display text-4xl font-black text-orange-100">{count}</span>
        <span className="pb-1 text-sm font-semibold text-orange-100/80">{count === 1 ? "day" : "days"}</span>
      </div>
      <p className="mt-2 text-xs text-orange-100/70">+5 XP the first time you check in each day.</p>
    </div>
  );
}
