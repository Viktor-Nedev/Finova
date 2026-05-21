import { ArrowLeft, BookOpen, Lightbulb, Trophy } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { typeMeta } from "../data/lessons";
import type { Lesson, View } from "../types";

type LessonPageProps = {
  lesson: Lesson;
  onNavigate: (view: View) => void;
  onStartQuiz: () => void;
};

export function LessonPage({ lesson, onNavigate, onStartQuiz }: LessonPageProps) {
  const TypeIcon = typeMeta[lesson.type].icon;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center gap-4 border-b-2 border-slate-100 px-4 py-4 sm:px-8">
        <button className="icon-button" onClick={() => onNavigate("map")} aria-label="Back to map">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-duo-green">{lesson.section}</p>
          <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">{lesson.title}</h1>
        </div>
        <div className="hidden rounded-2xl bg-yellow-50 px-4 py-2 text-sm font-black text-amber-600 sm:block">
          {typeMeta[lesson.type].xpHint}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-duo-sky px-4 py-6 sm:px-8">
        <div className="grid min-h-full gap-6 lg:grid-cols-[1fr_22rem]">
          <section className="space-y-5">
            <div className="duo-card p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="grid h-20 w-20 place-items-center rounded-[1.7rem] bg-duo-green text-white shadow-duo">
                  <TypeIcon className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{typeMeta[lesson.type].label}</p>
                  <h2 className="mt-1 text-3xl font-black leading-tight text-slate-800">{lesson.description}</h2>
                </div>
              </div>
            </div>

            {lesson.content.map((paragraph, index) => (
              <article key={paragraph} className="duo-card p-6">
                <div className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-green-50 text-duo-green">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Step {index + 1}</p>
                    <p className="mt-2 text-lg font-extrabold leading-8 text-slate-700">{paragraph}</p>
                  </div>
                </div>
              </article>
            ))}

            <article className="duo-card border-duo-yellow bg-yellow-50 p-6">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-duo-yellow text-duo-brown">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Real-life example</p>
                  <p className="mt-2 text-lg font-extrabold leading-8 text-amber-900">{lesson.example}</p>
                </div>
              </div>
            </article>
          </section>

          <aside className="space-y-5">
            <div className="duo-card p-5">
              <Mascot message={lesson.encouragement} />
            </div>
            <div className="duo-card p-5">
              <Trophy className="h-8 w-8 text-duo-yellow" />
              <h3 className="mt-3 text-xl font-black text-slate-800">Ready for a quick quiz?</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
                Answer five questions. Correct answers turn green immediately and mistakes show the right idea.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="sticky bottom-0 z-20 border-t-2 border-slate-100 bg-white px-4 py-4 sm:px-8">
        <div className="flex justify-end">
          <Button className="w-full sm:w-auto sm:min-w-56" onClick={onStartQuiz}>
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
}
