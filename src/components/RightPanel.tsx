import { Flame, Gem, Medal, ShieldCheck, Target, Trophy, Zap } from "lucide-react";
import { leaderboard, quests, savingGoals } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import { Mascot } from "./Mascot";
import { ProgressBar } from "./ProgressBar";

export function RightPanel() {
  const xp = useFinovaStore((state) => state.xp);
  const coins = useFinovaStore((state) => state.coins);
  const streak = useFinovaStore((state) => state.streak.count);
  const dailyQuest = quests[0];

  return (
    <aside className="hidden h-screen overflow-y-auto border-l-2 border-duo-gray bg-white p-5 lg:block">
      <div className="rounded-[2rem] border-2 border-duo-gray bg-duo-soft p-4">
        <Mascot message="Your next money win is one node away." />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "XP", value: xp, icon: Zap, className: "text-duo-green bg-green-50" },
          { label: "Streak", value: streak, icon: Flame, className: "text-orange-500 bg-orange-50" },
          { label: "Gems", value: coins, icon: Gem, className: "text-amber-500 bg-yellow-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`rounded-[1.4rem] p-3 text-center ${stat.className}`}>
              <Icon className="mx-auto h-5 w-5" />
              <p className="mt-1 text-lg font-black text-slate-800">{stat.value}</p>
              <p className="text-[0.65rem] font-black uppercase text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-4 rounded-[2rem] border-2 border-duo-gray bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-duo-green">Daily mission</p>
            <h2 className="text-xl font-black text-slate-800">{dailyQuest.title}</h2>
          </div>
          <Target className="h-8 w-8 text-duo-green" />
        </div>
        <p className="mt-2 text-sm font-bold text-slate-500">{dailyQuest.description}</p>
        <div className="mt-3">
          <ProgressBar value={dailyQuest.progress} max={dailyQuest.goal} />
        </div>
        <div className="mt-3 flex gap-2">
          <span className="reward-chip">
            <Zap className="h-4 w-4" /> {dailyQuest.xpReward} XP
          </span>
          <span className="reward-chip">
            <Gem className="h-4 w-4" /> {dailyQuest.gemsReward}
          </span>
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] border-2 border-duo-gray bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800">League</h2>
          <Medal className="h-7 w-7 text-duo-yellow" />
        </div>
        <div className="mt-3 space-y-2">
          {leaderboard.slice(0, 4).map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 rounded-2xl p-2 ${
                user.isCurrentUser ? "bg-duo-soft ring-2 ring-duo-green/20" : "bg-slate-50"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-sm font-black text-duo-green">
                {user.rank}
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-duo-yellow font-black text-duo-brown">
                {user.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-slate-800">{user.name}</p>
                <p className="text-xs font-bold text-slate-500">{user.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] border-2 border-duo-gray bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800">Saving goals</h2>
          <Trophy className="h-7 w-7 text-duo-green" />
        </div>
        <div className="mt-3 space-y-3">
          {savingGoals.map((goal) => (
            <div key={goal.id}>
              <div className="mb-1 flex justify-between text-sm font-black text-slate-700">
                <span>{goal.title}</span>
                <span>${goal.current}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%`, backgroundColor: goal.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] border-2 border-green-100 bg-duo-green p-4 text-white shadow-[0_7px_0_#12813b]">
        <ShieldCheck className="h-8 w-8 text-duo-yellow" />
        <h2 className="mt-2 text-xl font-black">Boss hint unlocked</h2>
        <p className="mt-1 text-sm font-bold text-green-50">Finish two more nodes to open the first boss battle.</p>
      </section>
    </aside>
  );
}
