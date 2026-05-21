import { useState } from "react";
import { LessonCard } from "../components/LessonCard";
import { categories, categoryStyles, lessons } from "../data/lessons";
import { useFinova } from "../state/FinovaContext";
import type { Category } from "../types";

type LearnPageProps = {
  onOpenLesson: (lessonId: string) => void;
};

export function LearnPage({ onOpenLesson }: LearnPageProps) {
  const { state } = useFinova();
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const visibleLessons =
    selectedCategory === "All" ? lessons : lessons.filter((lesson) => lesson.category === selectedCategory);

  return (
    <div className="space-y-8">
      <section className="glass-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">Learn</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">Choose your next money quest.</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Lessons are built for 1 to 2 minute sessions. Open a card, read the example, and start the quiz.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((category) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                selectedCategory === category ? "bg-white text-night" : "border border-white/10 text-slate-300 hover:bg-white/10"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const styles = categoryStyles[category];
          return (
            <div key={category} className={`rounded-[2rem] border bg-gradient-to-br ${styles.gradient} ${styles.ring} p-5`}>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-300">{styles.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl font-black text-white">{category}</h2>
              <p className="mt-2 text-sm text-slate-300">{styles.description}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            completed={state.completedLessons.includes(lesson.id)}
            onOpen={onOpenLesson}
          />
        ))}
      </section>
    </div>
  );
}
