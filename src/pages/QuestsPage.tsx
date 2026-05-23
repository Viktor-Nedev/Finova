import { Gift, Trophy, Zap } from "lucide-react";
import { ProgressBar } from "../components/ProgressBar";
import { quests } from "../data/lessons";

const questTone = {
  Daily: "bg-green-50 text-duo-green border-green-100",
  Weekly: "bg-yellow-50 text-amber-600 border-yellow-100",
  Event: "bg-blue-50 text-duo-blue border-blue-100",
};

export function QuestsPage() {
  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Quests</p>
        <h2 className="section-title">Earn rewards faster</h2>
        <p className="mt-2 max-w-3xl font-bold text-slate-500">
          Daily, weekly, and event quests give extra XP, gems, badges, and unlockables.
        </p>
      </section>

      {(["Daily", "Weekly", "Event"] as const).map((type) => (
        <section key={type} className="duo-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <Trophy className="h-7 w-7 text-duo-yellow" />
            <h3 className="text-2xl font-black text-slate-800">{type} quests</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quests
              .filter((quest) => quest.type === type)
              .map((quest) => (
                <article key={quest.id} className={`rounded-[1.7rem] border-2 p-4 ${questTone[quest.type]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">{quest.type}</p>
                      <h4 className="mt-1 text-xl font-black text-slate-800">{quest.title}</h4>
                    </div>
                    <Gift className="h-8 w-8" />
                  </div>
                  <p className="mt-2 min-h-12 text-sm font-bold leading-6 text-slate-600">{quest.description}</p>
                  <div className="mt-4">
                    <ProgressBar value={quest.progress} max={quest.goal} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="reward-chip">
                      <Zap className="h-4 w-4" /> {quest.xpReward} XP
                    </span>
                    <span className="reward-chip">
                      <Gift className="h-4 w-4" /> {quest.gemsReward} gems
                    </span>
                    {quest.badgeReward && <span className="reward-chip">{quest.badgeReward}</span>}
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
