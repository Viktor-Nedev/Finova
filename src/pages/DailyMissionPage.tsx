import { CalendarCheck, Flame, Gem, Timer, Trophy, Zap } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { quests } from "../data/lessons";

export function DailyMissionPage() {
  const dailyQuests = quests.filter((quest) => quest.type === "Daily");

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_20rem]">
      <section className="space-y-4">
        <div className="duo-card p-5">
          <p className="section-eyebrow">Daily mission</p>
          <h2 className="section-title">Keep the streak alive</h2>
          <p className="mt-2 font-bold text-slate-500">
            Finish today&apos;s mission set to earn streak gems and keep Finny cheering.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {dailyQuests.map((quest) => (
            <article key={quest.id} className="duo-card p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-duo-green text-white shadow-[0_5px_0_#12813b]">
                  <CalendarCheck className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-amber-600">Today</span>
              </div>
              <h3 className="mt-4 text-2xl font-black text-slate-800">{quest.title}</h3>
              <p className="mt-2 font-bold text-slate-500">{quest.description}</p>
              <div className="mt-4">
                <ProgressBar value={quest.progress} max={quest.goal} label={`${quest.progress}/${quest.goal}`} />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="reward-chip">
                  <Zap className="h-4 w-4" /> {quest.xpReward} XP
                </span>
                <span className="reward-chip">
                  <Gem className="h-4 w-4" /> {quest.gemsReward}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="grid content-start gap-4">
        <div className="duo-card p-5">
          <Mascot message="One short lesson is enough to protect today&apos;s streak." />
        </div>
        <div className="rounded-[2rem] border-2 border-orange-100 bg-orange-50 p-5">
          <Flame className="h-10 w-10 fill-orange-400 text-orange-500" />
          <h3 className="mt-3 text-2xl font-black text-slate-800">Streak saver</h3>
          <p className="mt-2 font-bold text-slate-500">Use 15 gems to protect your streak if you miss a day.</p>
          <Button variant="yellow" className="mt-4 w-full">Use saver</Button>
        </div>
        <div className="duo-card p-5">
          <Timer className="h-9 w-9 text-duo-blue" />
          <h3 className="mt-3 text-xl font-black text-slate-800">Bonus window</h3>
          <p className="mt-2 font-bold text-slate-500">Complete a lesson in the next 2 hours for +10 XP.</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-black text-duo-green">
            <Trophy className="h-5 w-5" />
            Reward active
          </div>
        </div>
      </aside>
    </div>
  );
}
