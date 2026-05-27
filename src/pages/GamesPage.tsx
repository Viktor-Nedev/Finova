import { LockKeyhole, Play, Trophy, Zap } from "lucide-react";
import { Button } from "../components/Button";
import { games, getLevel } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

const levelOrder = ["Beginner", "Smart Saver", "Investor", "Money Master", "Financial Legend"];

export function GamesPage() {
  const xp = useFinovaStore((state) => state.xp);
  const playedGames = useFinovaStore((state) => state.playedGames);
  const playGame = useFinovaStore((state) => state.playGame);
  const level = getLevel(xp);
  const currentRank = levelOrder.indexOf(level.name);

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Games</p>
        <h2 className="section-title">Financial arcade</h2>
        <p className="mt-2 max-w-3xl font-bold text-slate-500">
          Play quick skill games to earn XP and practice finance decisions without real money risk.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => {
          const Icon = game.icon;
          const locked = currentRank < levelOrder.indexOf(game.levelRequirement);
          const played = playedGames.includes(game.id);
          return (
            <article key={game.id} className={`duo-card overflow-hidden p-4 ${locked ? "opacity-70" : ""}`}>
              <div className="rounded-[1.7rem] p-5 text-white" style={{ backgroundColor: game.color }}>
                <div className="flex items-start justify-between">
                  <Icon className="h-10 w-10" />
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">
                    {locked ? "Locked" : played ? "Played" : "Ready"}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-black">{game.title}</h3>
                <p className="mt-2 min-h-12 text-sm font-bold text-white/85">{game.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Requires</p>
                  <p className="font-black text-slate-800">{game.levelRequirement}</p>
                </div>
                <span className="reward-chip">
                  <Zap className="h-4 w-4" /> {game.xpReward} XP
                </span>
              </div>
              <Button className="mt-4 w-full" disabled={locked || played} onClick={() => playGame(game.id, game.xpReward, game.title)}>
                {locked ? <LockKeyhole className="mr-1 inline h-5 w-5" /> : <Play className="mr-1 inline h-5 w-5 fill-white" />}
                {locked ? "Locked" : played ? "Reward collected" : "Play"}
              </Button>
            </article>
          );
        })}
      </section>

      <section className="duo-card p-5">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-duo-yellow" />
          <div>
            <h3 className="text-2xl font-black text-slate-800">Game streak bonus</h3>
            <p className="font-bold text-slate-500">Play two games this week to unlock the arcade badge.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
