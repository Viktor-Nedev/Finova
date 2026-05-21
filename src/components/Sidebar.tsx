import type { View } from "../types";

type SidebarProps = {
  activeView: View;
  onNavigate: (view: View) => void;
};

const items: { label: string; view: View; shortcut: string }[] = [
  { label: "Dashboard", view: "dashboard", shortcut: "D" },
  { label: "Learn", view: "learn", shortcut: "L" },
  { label: "AI Tutor", view: "tutor", shortcut: "AI" },
  { label: "Progress", view: "progress", shortcut: "P" },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <>
      <aside className="fixed left-6 top-28 z-30 hidden w-64 rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl xl:block">
        <p className="px-4 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-slate-500">Navigation</p>
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.view}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                activeView === item.view
                  ? "bg-cyanova text-night shadow-glow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onNavigate(item.view)}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-night/50 text-xs">{item.shortcut}</span>
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="fixed inset-x-3 bottom-3 z-50 rounded-[1.6rem] border border-white/10 bg-night/90 p-2 shadow-2xl backdrop-blur-2xl xl:hidden">
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <button
              key={item.view}
              className={`rounded-2xl px-2 py-3 text-xs font-black transition ${
                activeView === item.view ? "bg-white text-night" : "text-slate-300"
              }`}
              onClick={() => onNavigate(item.view)}
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.16em]">{item.shortcut}</span>
              <span className="mt-1 block">{item.label.replace("AI ", "")}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
