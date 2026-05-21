import type { View } from "../types";
import { LevelBadge } from "./LevelBadge";

type NavbarProps = {
  activeView: View;
  xp: number;
  onNavigate: (view: View) => void;
};

const navItems: { label: string; view: View }[] = [
  { label: "Dashboard", view: "dashboard" },
  { label: "Learn", view: "learn" },
  { label: "Tutor", view: "tutor" },
  { label: "Progress", view: "progress" },
];

export function Navbar({ activeView, xp, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night/75 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3 text-left" onClick={() => onNavigate("landing")}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyanova to-violetnova font-display text-xl font-black text-night shadow-glow">
            F
          </span>
          <span>
            <span className="block font-display text-xl font-black tracking-tight text-white">Finova</span>
            <span className="hidden text-xs uppercase tracking-[0.24em] text-cyan-100/60 sm:block">
              Money quests
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.view}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeView === item.view
                  ? "bg-white text-night"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onNavigate(item.view)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LevelBadge xp={xp} compact />
          </div>
          <button
            className="rounded-full bg-cyanova px-4 py-2 text-sm font-black text-night shadow-glow transition hover:-translate-y-0.5 hover:bg-mintnova"
            onClick={() => onNavigate("learn")}
          >
            Start Learning
          </button>
        </div>
      </nav>
    </header>
  );
}
