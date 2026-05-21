type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
  tone?: "green" | "yellow" | "blue";
};

const tones = {
  green: "bg-duo-green",
  yellow: "bg-duo-yellow",
  blue: "bg-duo-blue",
};

export function ProgressBar({ value, max, label, tone = "green" }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm font-extrabold text-slate-500">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="h-4 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div className={`h-full rounded-full ${tones[tone]} transition-all duration-500`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
