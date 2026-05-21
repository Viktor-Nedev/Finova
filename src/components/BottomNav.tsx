import { BarChart3, BookOpen, Map, RotateCcw, UserRound } from "lucide-react";
import type { View } from "../types";

type BottomNavProps = {
  activeView: View;
  onNavigate: (view: View) => void;
};

const navItems: { label: string; view: View; icon: typeof Map }[] = [
  { label: "Map", view: "map", icon: Map },
  { label: "Learn", view: "learn", icon: BookOpen },
  { label: "Review", view: "review", icon: RotateCcw },
  { label: "Progress", view: "progress", icon: BarChart3 },
  { label: "Profile", view: "profile", icon: UserRound },
];

export function BottomNav({ activeView, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-100 bg-white md:hidden" aria-label="Bottom navigation">
      <div className="grid grid-cols-5 px-2 pb-2 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.7rem] font-black transition ${
                isActive ? "bg-green-50 text-duo-green" : "text-slate-400"
              }`}
              onClick={() => onNavigate(item.view)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
