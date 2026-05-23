import { LockKeyhole, PlayCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { learningClasses } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

export function ClassesPage() {
  const navigate = useNavigate();
  const completedLessons = useFinovaStore((state) => state.completedLessons);

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Classes</p>
        <h2 className="section-title">Choose a money world</h2>
        <p className="mt-2 max-w-3xl font-bold text-slate-500">
          Each class contains lessons, quizzes, reviews, speed challenges, treasures, mini games, AI challenges, and a final boss.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {learningClasses.map((learningClass, index) => {
          const completed = learningClass.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
          const percent = Math.round((completed / learningClass.lessons.length) * 100);
          const locked = completedLessons.length < learningClass.lockedAfterOrder;
          const Icon = learningClass.icon;
          const firstLesson = learningClass.lessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? learningClass.lessons[0];

          return (
            <button
              key={learningClass.id}
              className={`group min-h-72 rounded-[2rem] border-2 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
                locked ? "border-slate-200 opacity-70" : "border-duo-gray"
              }`}
              disabled={locked}
              onClick={() => navigate(`/lesson/${firstLesson.id}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-[1.4rem] text-white shadow-[0_6px_0_rgba(0,0,0,0.16)]" style={{ backgroundColor: learningClass.color }}>
                  <Icon className="h-8 w-8" />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${locked ? "bg-slate-100 text-slate-500" : "bg-duo-soft text-duo-green"}`}>
                  {locked ? "Locked" : `${percent}%`}
                </span>
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Class {index + 1}</p>
              <h3 className="mt-1 text-2xl font-black leading-tight text-slate-800">{learningClass.name}</h3>
              <p className="mt-2 min-h-12 text-sm font-bold leading-6 text-slate-500">{learningClass.description}</p>
              <div className="mt-4">
                <ProgressBar value={completed} max={learningClass.lessons.length} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-black text-slate-500">
                  <Star className="h-4 w-4 text-duo-yellow" />
                  {learningClass.lessons.length} lessons
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-duo-soft text-duo-green group-hover:bg-duo-green group-hover:text-white">
                  {locked ? <LockKeyhole className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                </span>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
