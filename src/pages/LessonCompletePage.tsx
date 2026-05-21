import { Gem, Home, MoveRight, Sparkles, Trophy } from "lucide-react";
import { Button } from "../components/Button";
import { Confetti } from "../components/Confetti";
import { Mascot } from "../components/Mascot";
import type { Lesson, View } from "../types";

type LessonCompletePageProps = {
  lesson: Lesson;
  summary: { xp: number; coins: number; score: number; total: number };
  onNavigate: (view: View) => void;
  onNextLesson: () => void;
};

export function LessonCompletePage({ lesson, summary, onNavigate, onNextLesson }: LessonCompletePageProps) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-duo-sky p-4">
      <Confetti />
      <div className="duo-card w-full max-w-3xl p-6 text-center sm:p-10">
        <div className="flex justify-center">
          <Mascot mood="celebrate" size="lg" />
        </div>
        <p className="mt-4 text-sm font-black uppercase tracking-[0.22em] text-duo-green">Lesson complete</p>
        <h1 className="mt-2 text-4xl font-black text-slate-800 sm:text-6xl">Great job!</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-slate-500">
          You finished <span className="text-slate-800">{lesson.title}</span> and unlocked the next step on the money map.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.7rem] border-2 border-green-100 bg-green-50 p-5">
            <Trophy className="mx-auto h-8 w-8 text-duo-green" />
            <p className="mt-2 text-3xl font-black text-slate-800">+{summary.xp}</p>
            <p className="text-sm font-black text-green-600">XP</p>
          </div>
          <div className="rounded-[1.7rem] border-2 border-yellow-100 bg-yellow-50 p-5">
            <Gem className="mx-auto h-8 w-8 text-duo-yellow" />
            <p className="mt-2 text-3xl font-black text-slate-800">+{summary.coins}</p>
            <p className="text-sm font-black text-amber-600">Coins</p>
          </div>
          <div className="rounded-[1.7rem] border-2 border-blue-100 bg-blue-50 p-5">
            <Sparkles className="mx-auto h-8 w-8 text-duo-blue" />
            <p className="mt-2 text-3xl font-black text-slate-800">
              {summary.score}/{summary.total}
            </p>
            <p className="text-sm font-black text-blue-600">Score</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="secondary" onClick={() => onNavigate("map")}>
            <Home className="mr-1 inline h-5 w-5" />
            Back to map
          </Button>
          <Button onClick={onNextLesson}>
            Continue
            <MoveRight className="ml-1 inline h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
