import { Bot, ChartNoAxesColumnIncreasing, Gamepad2, Home, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";

const mobileItems = [
  { label: "Map", path: "/", icon: Home },
  { label: "Quests", path: "/quests", icon: Trophy },
  { label: "Games", path: "/games", icon: Gamepad2 },
  { label: "Tutor", path: "/tutor", icon: Bot },
  { label: "Progress", path: "/progress", icon: ChartNoAxesColumnIncreasing },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-duo-gray bg-white px-2 pb-2 pt-1 lg:hidden" aria-label="Mobile navigation">
      <div className="grid grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-black transition ${
                  isActive ? "bg-duo-soft text-duo-green" : "text-slate-400"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
