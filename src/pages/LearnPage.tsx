import { CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import { pathSections } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

type LearnPageProps = {
  onOpenLesson: (lessonId: string) => void;
};

export function LearnPage({ onOpenLesson }: LearnPageProps) {
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const isLessonUnlocked = useFinovaStore((state) => state.isLessonUnlocked);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-duo-sky px-4 pb-24 pt-6 sm:px-8">
      <section className="duo-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">Learn</p>
        <h1 className="mt-2 text-4xl font-black text-slate-800 sm:text-5xl">All Finova units</h1>
        <p className="mt-3 max-w-3xl text-lg font-bold text-slate-500">
          The map is the main experience. This page is a quick index for reviewing unlocked lessons.
        </p>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {pathSections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} className="duo-card overflow-hidden">
              <div className="flex items-center gap-4 border-b-2 border-slate-100 p-5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-duo" style={{ backgroundColor: section.color }}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">{section.name}</h2>
                  <p className="text-sm font-bold text-slate-500">{section.subtitle}</p>
                </div>
              </div>
              <div className="divide-y-2 divide-slate-100">
                {section.lessons.map((lesson) => {
                  const completed = completedLessons.includes(lesson.id);
                  const unlocked = isLessonUnlocked(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-green-50 disabled:hover:bg-white"
                      disabled={!unlocked}
                      onClick={() => onOpenLesson(lesson.id)}
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                          completed ? "bg-duo-green text-white" : unlocked ? "bg-green-50 text-duo-green" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {completed ? <CheckCircle2 className="h-6 w-6" /> : unlocked ? <PlayCircle className="h-6 w-6" /> : <LockKeyhole className="h-6 w-6" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-black text-slate-800">{lesson.title}</span>
                        <span className="text-sm font-bold text-slate-500">{lesson.description}</span>
                      </span>
                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black uppercase text-slate-400">{lesson.type}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
