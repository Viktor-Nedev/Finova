import { useState } from "react";
import { QuizComponent } from "../components/QuizComponent";
import { categoryStyles } from "../data/lessons";
import { useFinova } from "../state/FinovaContext";
import type { Lesson, View } from "../types";

type LessonPageProps = {
  lesson: Lesson;
  onNavigate: (view: View) => void;
};

export function LessonPage({ lesson, onNavigate }: LessonPageProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const { state } = useFinova();
  const category = categoryStyles[lesson.category];
  const result = state.quizResults[lesson.id];

  return (
    <div className="space-y-6">
      <button className="text-sm font-black text-cyanova" onClick={() => onNavigate("learn")}>
        Back to lessons
      </button>

      <section className={`relative overflow-hidden rounded-[2.5rem] border bg-white/[0.06] p-6 backdrop-blur-2xl ${category.ring} sm:p-8`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">{lesson.category}</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{lesson.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-slate-200">{lesson.duration}</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-slate-200">{lesson.difficulty}</span>
              {result && (
                <span className="rounded-full bg-mintnova/15 px-4 py-2 text-sm font-bold text-mintnova">
                  Best: {result.score}/{result.total}
                </span>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-night/60 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">XP rewards</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-cyanova/10 p-4">
                <p className="font-display text-3xl font-black text-white">+10</p>
                <p className="text-xs text-slate-400">lesson completed</p>
              </div>
              <div className="rounded-2xl bg-mintnova/10 p-4">
                <p className="font-display text-3xl font-black text-white">+5-20</p>
                <p className="text-xs text-slate-400">quiz score bonus</p>
              </div>
            </div>
            <button
              className="mt-5 w-full rounded-2xl bg-cyanova px-5 py-4 font-black text-night shadow-glow transition hover:bg-mintnova"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </section>

      {!quizStarted ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-card p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Short lesson</p>
            <div className="mt-5 space-y-5 text-base leading-8 text-slate-300">
              {lesson.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 rounded-[1.7rem] border border-cyanova/20 bg-cyanova/10 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">Example</p>
              <p className="mt-3 text-slate-200">{lesson.example}</p>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Key takeaways</p>
              <div className="mt-4 space-y-3">
                {lesson.takeaways.map((takeaway, index) => (
                  <div key={takeaway} className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyanova text-sm font-black text-night">
                      {index + 1}
                    </span>
                    <span className="font-bold text-slate-200">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-left transition hover:border-cyanova/40 hover:bg-cyanova/10"
              onClick={() => onNavigate("tutor")}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">Need help?</p>
              <p className="mt-2 font-display text-2xl font-black text-white">Ask the AI tutor to explain this.</p>
            </button>
          </aside>
        </section>
      ) : (
        <QuizComponent lesson={lesson} />
      )}
    </div>
  );
}
