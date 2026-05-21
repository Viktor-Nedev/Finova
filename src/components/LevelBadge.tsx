import { getLevel } from "../data/lessons";

type LevelBadgeProps = {
  xp: number;
  compact?: boolean;
};

export function LevelBadge({ xp, compact = false }: LevelBadgeProps) {
  const level = getLevel(xp);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-glow backdrop-blur-xl">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyanova to-violetnova font-display text-sm font-black text-night">
        {level.name.slice(0, 1)}
      </div>
      {!compact && (
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Level</p>
          <p className="font-display text-sm font-bold text-white">{level.name}</p>
        </div>
      )}
    </div>
  );
}
