import { Bell, Flame, Gem, Settings, Zap } from "lucide-react";
import { getLevel } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { View } from "../types";
import { Button } from "./Button";

type TopBarProps = {
  onNavigate: (view: View) => void;
};

export function TopBar({ onNavigate }: TopBarProps) {
  const xp = useFinovaStore((state) => state.xp);
  const coins = useFinovaStore((state) => state.coins);
  const streak = useFinovaStore((state) => state.streak.count);
  const level = getLevel(xp);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-100 bg-white/95 backdrop-blur">
      <div className="flex h-20 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3" onClick={() => onNavigate("map")} aria-label="Go to map">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-green text-2xl font-black text-white shadow-duo">
            F
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-2xl font-black tracking-tight text-duo-green">Finova</span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{level.name}</span>
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="duo-pill text-duo-green">
            <Zap className="h-5 w-5 fill-duo-green" />
            <span>{xp}</span>
          </div>
          <div className="duo-pill text-orange-500">
            <Flame className="h-5 w-5 fill-orange-400" />
            <span>{streak}</span>
          </div>
          <div className="duo-pill text-amber-500">
            <Gem className="h-5 w-5 fill-duo-yellow" />
            <span>{coins}</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button className="icon-button" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <button className="icon-button" aria-label="Settings" onClick={() => onNavigate("profile")}>
            <Settings className="h-5 w-5" />
          </button>
          <Button variant="secondary" className="px-4 py-2 text-sm" onClick={() => onNavigate("tutor")}>
            AI Tutor
          </Button>
        </div>
      </div>
    </header>
  );
}
