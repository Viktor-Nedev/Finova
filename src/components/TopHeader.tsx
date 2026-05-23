import { Bell, Bot, Flame, Gem, Search, UserRound, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFinovaStore } from "../state/useFinovaStore";

export function TopHeader() {
  const xp = useFinovaStore((state) => state.xp);
  const coins = useFinovaStore((state) => state.coins);
  const streak = useFinovaStore((state) => state.streak.count);

  return (
    <header className="flex h-[5.25rem] shrink-0 items-center gap-3 border-b-2 border-duo-gray bg-white px-3 sm:px-5 lg:px-6">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-duo-green">Today&apos;s path</p>
        <h1 className="truncate text-2xl font-black text-slate-800 sm:text-3xl">Money Mastery</h1>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <div className="header-pill text-duo-green">
          <Zap className="h-5 w-5 fill-duo-green" />
          {xp}
        </div>
        <div className="header-pill text-orange-500">
          <Flame className="h-5 w-5 fill-orange-400" />
          {streak}
        </div>
        <div className="header-pill text-amber-500">
          <Gem className="h-5 w-5 fill-duo-yellow" />
          {coins}
        </div>
      </div>

      <button className="icon-button" aria-label="Search">
        <Search className="h-5 w-5" />
      </button>
      <button className="icon-button" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </button>
      <NavLink
        to="/tutor"
        className="hidden rounded-2xl border-2 border-duo-green bg-white px-4 py-2.5 text-sm font-black text-duo-green shadow-[0_5px_0_#bbf7d0] transition hover:-translate-y-0.5 sm:inline-flex sm:items-center sm:gap-2"
      >
        <Bot className="h-5 w-5" />
        AI Tutor
      </NavLink>
      <button className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-green text-white shadow-[0_5px_0_#12813b]" aria-label="Profile">
        <UserRound className="h-6 w-6" />
      </button>
    </header>
  );
}
