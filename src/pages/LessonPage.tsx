import { ArrowLeft, BookOpen, Lightbulb, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { getLessonById, typeMeta } from "../data/lessons";

export function LessonPage() {
  const navigate = useNavigate();
  const { lessonId = "" } = useParams();
  const lesson = getLessonById(lessonId);
  const TypeIcon = typeMeta[lesson.type].icon;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-20 shrink-0 items-center gap-4 border-b-2 border-duo-gray px-4 sm:px-8">
        <button className="icon-button" onClick={() => navigate("/")} aria-label="Back to map">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">{lesson.section}</p>
          <h1 className="truncate text-2xl font-black text-slate-800 sm:text-3xl">{lesson.title}</h1>
        </div>
        <div className="hidden rounded-2xl bg-yellow-50 px-4 py-2 text-sm font-black text-amber-600 sm:block">
          {typeMeta[lesson.type].xpHint}
        </div>
      </header>

      <main className="grid flex-1 gap-4 overflow-y-auto bg-duo-bg p-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-6">
        <section className="grid gap-4">
          <article className="duo-card p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-20 w-20 place-items-center rounded-[1.7rem] bg-duo-green text-white shadow-[0_7px_0_#12813b]">
                <TypeIcon className="h-10 w-10" />
              </div>
              <div>
                <p className="section-eyebrow">{typeMeta[lesson.type].label}</p>
                <h2 className="mt-1 text-3xl font-black leading-tight text-slate-800">{lesson.description}</h2>
              </div>
            </div>
          </article>

          {lesson.content.map((paragraph, index) => (
            <article key={paragraph} className="duo-card p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-duo-soft text-duo-green">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Step {index + 1}</p>
                  <p className="mt-2 text-lg font-extrabold leading-8 text-slate-700">{paragraph}</p>
                </div>
              </div>
            </article>
          ))}

          <article className="rounded-[2rem] border-2 border-yellow-100 bg-yellow-50 p-5 shadow-sm sm:p-6">
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-duo-yellow text-duo-brown">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-600">Real-life example</p>
                <p className="mt-2 text-lg font-extrabold leading-8 text-amber-900">{lesson.example}</p>
              </div>
            </div>
          </article>
        </section>

        <aside className="grid content-start gap-4">
          <div className="duo-card p-5">
            <Mascot message={lesson.encouragement} />
          </div>
          <div className="duo-card p-5">
            <Trophy className="h-8 w-8 text-duo-yellow" />
            <h3 className="mt-3 text-xl font-black text-slate-800">Ready for the quiz?</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">Get instant green/red feedback and unlock your next node.</p>
          </div>
        </aside>
      </main>

      <footer className="shrink-0 border-t-2 border-duo-gray bg-white px-4 py-4 sm:px-8">
        <div className="flex justify-end">
          <Button className="w-full sm:w-auto sm:min-w-60" onClick={() => navigate(`/quiz/${lesson.id}`)}>
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
}
