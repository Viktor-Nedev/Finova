import { Award, Gem, RotateCcw, UserRound } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { getLevel } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

export function ProfilePage() {
  const xp = useFinovaStore((state) => state.xp);
  const coins = useFinovaStore((state) => state.coins);
  const profile = useFinovaStore((state) => state.profile);
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const resetProgress = useFinovaStore((state) => state.resetProgress);
  const level = getLevel(xp);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-duo-sky px-4 pb-24 pt-6 sm:px-8">
      <section className="duo-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-duo-green text-white shadow-duo">
            {profile.avatar ? <span className="text-4xl font-black">{profile.avatar}</span> : <UserRound className="h-12 w-12" />}
          </div>
          <h1 className="mt-5 text-4xl font-black text-slate-800 sm:text-5xl">{profile.displayName}</h1>
          <p className="mt-3 text-lg font-bold text-slate-500">Synced learning profile with Supabase-backed progress.</p>
        </div>
        <Mascot message="Keep collecting coins and badges!" />
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="duo-card p-6">
          <Award className="h-9 w-9 text-duo-green" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-400">Level</p>
          <p className="text-3xl font-black text-slate-800">{level.name}</p>
        </div>
        <div className="duo-card p-6">
          <Gem className="h-9 w-9 text-duo-yellow" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-400">Coins</p>
          <p className="text-3xl font-black text-slate-800">{coins}</p>
        </div>
        <div className="duo-card p-6">
          <Award className="h-9 w-9 text-duo-blue" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-400">Badges</p>
          <p className="text-3xl font-black text-slate-800">{Math.max(1, Math.floor(completedLessons.length / 5))}</p>
        </div>
      </section>

      <section className="mt-5 duo-card p-6">
        <h2 className="text-2xl font-black text-slate-800">Demo controls</h2>
        <p className="mt-2 font-bold text-slate-500">Reset local progress if you need a fresh hackathon demo run.</p>
        <Button variant="secondary" className="mt-5" onClick={resetProgress}>
          <RotateCcw className="mr-1 inline h-5 w-5" />
          Reset progress
        </Button>
      </section>
    </div>
  );
}
