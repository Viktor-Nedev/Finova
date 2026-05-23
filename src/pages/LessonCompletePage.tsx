import { Gem, Home, MoveRight, Sparkles, Trophy } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Confetti } from "../components/Confetti";
import { Mascot } from "../components/Mascot";
import { getLessonById, getNextLessonId } from "../data/lessons";

type CompleteState = {
  xp?: number;
  coins?: number;
  score?: number;
  total?: number;
};

export function LessonCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId = "" } = useParams();
  const lesson = getLessonById(lessonId);
  const summary = (location.state ?? {}) as CompleteState;
  const nextLessonId = getNextLessonId(lesson.id);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-duo-bg p-4">
      <Confetti />
      <div className="absolute left-6 top-10 h-32 w-32 rounded-full bg-duo-yellow/30 blur-2xl" />
      <div className="absolute bottom-8 right-10 h-40 w-40 rounded-full bg-duo-green/20 blur-2xl" />
      <div className="duo-card relative w-full max-w-4xl p-6 text-center sm:p-10">
        <div className="flex justify-center">
          <Mascot mood="celebrate" size="lg" />
        </div>
        <p className="mt-4 text-sm font-black uppercase tracking-[0.22em] text-duo-green">Lesson complete</p>
        <h1 className="mt-2 text-5xl font-black text-slate-800 sm:text-7xl">Great job!</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-slate-500">
          You finished <span className="text-slate-800">{lesson.title}</span>. The next node on the Money Mastery path is ready.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="reward-card bg-green-50 text-duo-green">
            <Trophy className="mx-auto h-9 w-9" />
            <p className="mt-2 text-4xl font-black text-slate-800">+{summary.xp ?? 0}</p>
            <p className="text-sm font-black">XP</p>
          </div>
          <div className="reward-card bg-yellow-50 text-amber-500">
            <Gem className="mx-auto h-9 w-9" />
            <p className="mt-2 text-4xl font-black text-slate-800">+{summary.coins ?? 0}</p>
            <p className="text-sm font-black">Gems</p>
          </div>
          <div className="reward-card bg-blue-50 text-duo-blue">
            <Sparkles className="mx-auto h-9 w-9" />
            <p className="mt-2 text-4xl font-black text-slate-800">
              {summary.score ?? 0}/{summary.total ?? 5}
            </p>
            <p className="text-sm font-black">Score</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="secondary" onClick={() => navigate("/")}>
            <Home className="mr-1 inline h-5 w-5" />
            Back to map
          </Button>
          <Button onClick={() => (nextLessonId ? navigate(`/lesson/${nextLessonId}`) : navigate("/"))}>
            Continue
            <MoveRight className="ml-1 inline h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
