import { RotateCcw, Star } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { lessons } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";

type ReviewPageProps = {
  onOpenLesson: (lessonId: string) => void;
};

export function ReviewPage({ onOpenLesson }: ReviewPageProps) {
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const reviewLessons = lessons.filter((lesson) => completedLessons.includes(lesson.id)).slice(-6).reverse();

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-duo-sky px-4 pb-24 pt-6 sm:px-8">
      <section className="duo-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">Review</p>
          <h1 className="mt-2 text-4xl font-black text-slate-800 sm:text-5xl">Strengthen old skills</h1>
          <p className="mt-3 max-w-3xl text-lg font-bold text-slate-500">
            Review completed nodes to keep your financial literacy streak strong.
          </p>
        </div>
        <Mascot message="Review makes the path stick!" />
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviewLessons.length === 0 ? (
          <div className="duo-card p-6 md:col-span-2 xl:col-span-3">
            <Star className="h-10 w-10 text-duo-yellow" />
            <h2 className="mt-4 text-2xl font-black text-slate-800">No review lessons yet</h2>
            <p className="mt-2 font-bold text-slate-500">Complete your first map node and it will appear here.</p>
          </div>
        ) : (
          reviewLessons.map((lesson) => (
            <div key={lesson.id} className="duo-card p-5">
              <RotateCcw className="h-8 w-8 text-duo-green" />
              <h2 className="mt-4 text-2xl font-black text-slate-800">{lesson.title}</h2>
              <p className="mt-2 min-h-14 font-bold text-slate-500">{lesson.description}</p>
              <Button variant="secondary" className="mt-5 w-full" onClick={() => onOpenLesson(lesson.id)}>
                Review
              </Button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
