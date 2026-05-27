import { Flame, Medal, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { leaderboard } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

const tabs = ["Global", "Friends", "Country"] as const;

export function LeaderboardsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Global");
  const profile = useFinovaStore((state) => state.profile);
  const xp = useFinovaStore((state) => state.xp);
  const streak = useFinovaStore((state) => state.streak.count);
  const rows = leaderboard.map((user) =>
    user.isCurrentUser
      ? {
          ...user,
          name: profile.displayName,
          avatar: profile.avatar,
          xp,
          streak,
        }
      : user,
  );

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Leaderboards</p>
        <h2 className="section-title">Compete with learners</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              className={`rounded-2xl border-2 px-4 py-2 text-sm font-black transition ${
                tab === item ? "border-duo-green bg-duo-green text-white shadow-[0_5px_0_#12813b]" : "border-duo-gray bg-white text-slate-500 hover:border-duo-green"
              }`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="duo-card overflow-hidden">
        <div className="grid grid-cols-[4rem_1fr_7rem_7rem] border-b-2 border-duo-gray bg-duo-soft px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          <span>Rank</span>
          <span>Learner</span>
          <span>XP</span>
          <span>Streak</span>
        </div>
        {rows.map((user) => (
          <div
            key={user.id}
            className={`grid grid-cols-[4rem_1fr_7rem_7rem] items-center px-4 py-4 ${
              user.isCurrentUser ? "bg-green-50" : "bg-white"
            } border-b-2 border-duo-gray last:border-b-0`}
          >
            <span className="flex items-center gap-1 text-xl font-black text-slate-800">
              {user.rank <= 3 ? <Medal className="h-6 w-6 text-duo-yellow" /> : null}
              {user.rank}
            </span>
            <span className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-yellow text-lg font-black text-duo-brown">
                {user.avatar}
              </span>
              <span>
                <span className="block font-black text-slate-800">{user.name}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Users className="h-3 w-3" />
                  {tab} league
                </span>
              </span>
            </span>
            <span className="flex items-center gap-1 font-black text-duo-green">
              <Trophy className="h-4 w-4" />
              {user.xp}
            </span>
            <span className="flex items-center gap-1 font-black text-orange-500">
              <Flame className="h-4 w-4 fill-orange-400" />
              {user.streak}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
