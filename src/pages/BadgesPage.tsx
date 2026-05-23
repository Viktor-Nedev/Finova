import { LockKeyhole, Sparkles } from "lucide-react";
import { badges } from "../data/lessons";

export function BadgesPage() {
  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Badges</p>
        <h2 className="section-title">Collectible achievements</h2>
        <p className="mt-2 font-bold text-slate-500">Badges make progress visible and give students reasons to return.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <article key={badge.id} className={`duo-card p-5 text-center ${badge.earned ? "" : "opacity-65"}`}>
              <div
                className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] border-4 border-white text-white shadow-[0_8px_0_rgba(0,0,0,0.12)]"
                style={{ backgroundColor: badge.earned ? badge.color : "#CBD5E1" }}
              >
                {badge.earned ? <Icon className="h-11 w-11" /> : <LockKeyhole className="h-10 w-10" />}
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-800">{badge.title}</h3>
              <p className="mt-2 min-h-12 text-sm font-bold text-slate-500">{badge.description}</p>
              <span className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${badge.earned ? "bg-duo-soft text-duo-green" : "bg-slate-100 text-slate-500"}`}>
                <Sparkles className="h-4 w-4" />
                {badge.earned ? "Earned" : "Locked"}
              </span>
            </article>
          );
        })}
      </section>
    </div>
  );
}
