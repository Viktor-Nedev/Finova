import type { PathSection } from "../types";

type SectionHeaderProps = {
  section: PathSection;
  completed: number;
};

export function SectionHeader({ section, completed }: SectionHeaderProps) {
  const Icon = section.icon;
  const total = section.lessons.length;

  return (
    <div className="mx-auto my-8 flex w-full max-w-3xl items-center gap-4 rounded-[2rem] border-2 border-slate-100 bg-white p-4 shadow-soft sm:p-5">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl text-white shadow-duo" style={{ backgroundColor: section.color }}>
        <Icon className="h-8 w-8" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Section</p>
        <h2 className="truncate text-2xl font-black text-slate-800">{section.name}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{section.subtitle}</p>
      </div>
      <div className="hidden rounded-2xl bg-green-50 px-4 py-3 text-center sm:block">
        <p className="text-lg font-black text-duo-green">
          {completed}/{total}
        </p>
        <p className="text-xs font-black uppercase text-green-600/70">done</p>
      </div>
    </div>
  );
}
