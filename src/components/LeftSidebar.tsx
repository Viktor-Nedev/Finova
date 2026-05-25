import {
  BadgeHelp,
  Bell,
  BookMarked,
  Bot,
  Brain,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  Dumbbell,
  Flame,
  Gamepad2,
  Gem,
  HelpCircle,
  Home,
  Layers3,
  Library,
  Medal,
  Newspaper,
  NotebookPen,
  RotateCcw,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { getLevel } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import { Mascot } from "./Mascot";
import { ProgressBar } from "./ProgressBar";

const navItems = [
  { label: "Map", path: "/", icon: Home },
  { label: "Classes", path: "/classes", icon: ShieldCheck },
  { label: "Study Library", path: "/study-library", icon: Library },
  { label: "Notebook", path: "/notebook", icon: NotebookPen },
  { label: "Flashcards", path: "/flashcards", icon: Brain },
  { label: "Revision Center", path: "/revision", icon: RotateCcw },
  { label: "Saved Lessons", path: "/saved-lessons", icon: BookMarked },
  { label: "Practice Arena", path: "/practice-arena", icon: Dumbbell },
  { label: "Weak Topics", path: "/weak-topics", icon: Target },
  { label: "Daily Revision", path: "/daily-revision", icon: CalendarCheck },
  { label: "Dictionary", path: "/dictionary", icon: Layers3 },
  { label: "Quests", path: "/quests", icon: Trophy },
  { label: "Daily Mission", path: "/daily", icon: Flame },
  { label: "Games", path: "/games", icon: Gamepad2 },
  { label: "Leaderboards", path: "/leaderboards", icon: Medal },
  { label: "News", path: "/news", icon: Newspaper },
  { label: "Badges", path: "/badges", icon: Gem },
  { label: "Wallet Simulator", path: "/wallet", icon: WalletCards },
  { label: "AI Tutor", path: "/tutor", icon: Bot },
  { label: "Progress", path: "/progress", icon: ChartNoAxesColumnIncreasing },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Help & Support", path: "/help", icon: HelpCircle },
];

export function LeftSidebar() {
  const xp = useFinovaStore((state) => state.xp);
  const streak = useFinovaStore((state) => state.streak.count);
  const coins = useFinovaStore((state) => state.coins);
  const level = getLevel(xp);

  return (
    <aside className="hidden h-screen flex-col border-r-2 border-duo-gray bg-white p-4 lg:flex">
      <NavLink to="/" className="flex items-center gap-3 rounded-[1.6rem] bg-duo-green px-4 py-3 text-white shadow-[0_7px_0_#12813b]">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-2xl font-black text-duo-green">F</span>
        <span>
          <span className="block text-2xl font-black leading-none">Finova</span>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-green-100">Money quests</span>
        </span>
      </NavLink>

      <div className="mt-4 rounded-[1.6rem] border-2 border-duo-gray bg-duo-soft p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-yellow text-xl font-black text-duo-brown shadow-[0_5px_0_#d89b11]">
            {level.name.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-800">{level.name}</p>
            <p className="text-xs font-extrabold text-slate-500">{level.badge}</p>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={xp % 150} max={150} label={`${xp} XP`} />
        </div>
      </div>

      <nav className="mt-4 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-black transition ${
                  isActive
                    ? "bg-duo-green text-white shadow-[0_5px_0_#12813b]"
                    : "text-slate-500 hover:-translate-y-0.5 hover:bg-duo-soft hover:text-duo-green"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0 stroke-[2.6]" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-4 grid gap-3">
        <div className="rounded-[1.5rem] border-2 border-orange-100 bg-orange-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 fill-orange-400 text-orange-500" />
              <span className="font-black text-orange-600">{streak} day streak</span>
            </div>
            <Bell className="h-5 w-5 text-orange-400" />
          </div>
        </div>

        <div className="rounded-[1.5rem] border-2 border-yellow-100 bg-yellow-50 p-3">
          <div className="flex items-center gap-3">
            <Mascot size="sm" />
            <div>
              <p className="font-black text-slate-800">Finny says hi!</p>
              <p className="text-xs font-bold text-slate-500">Complete one node today.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border-2 border-duo-green/20 bg-duo-green p-3 text-white shadow-[0_5px_0_#12813b]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-duo-yellow" />
            <p className="font-black">Upgrade to Premium</p>
          </div>
          <p className="mt-1 text-xs font-bold text-green-50">Unlimited AI quizzes, bonus gems, and boss hints.</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-black">
            <CircleDollarSign className="h-5 w-5 text-duo-yellow" />
            {coins} gems ready
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 text-xs font-black text-slate-400">
          <BadgeHelp className="h-4 w-4" />
          Production mockup mode
        </div>
      </div>
    </aside>
  );
}
