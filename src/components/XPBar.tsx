import { getLevel, getNextLevel } from "../data/lessons";

type XPBarProps = {
  xp: number;
};

export function XPBar({ xp }: XPBarProps) {
  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const range = nextLevel ? nextLevel.minXp - level.minXp : 1;
  const progress = nextLevel ? Math.min(100, ((xp - level.minXp) / range) * 100) : 100;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">XP Progress</p>
          <p className="font-display text-2xl font-black text-white">{xp} XP</p>
        </div>
        <p className="text-right text-sm text-slate-300">
          {nextLevel ? `${nextLevel.minXp - xp} XP to ${nextLevel.name}` : "Max level reached"}
        </p>
      </div>
      <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-slate-950/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyanova via-mintnova to-violetnova shadow-glow transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
