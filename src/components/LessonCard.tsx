import { motion } from "framer-motion";
import { categoryStyles } from "../data/lessons";
import type { Lesson } from "../types";

type LessonCardProps = {
  lesson: Lesson;
  completed: boolean;
  onOpen: (lessonId: string) => void;
};

const accentClasses = {
  cyan: "border-cyan-300/20 bg-cyan-300/10",
  violet: "border-violet-300/20 bg-violet-300/10",
  mint: "border-emerald-300/20 bg-emerald-300/10",
  amber: "border-amber-300/20 bg-amber-300/10",
};

export function LessonCard({ lesson, completed, onOpen }: LessonCardProps) {
  const category = categoryStyles[lesson.category];

  return (
    <motion.article
      layout
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative overflow-hidden rounded-[2rem] border bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl ${category.ring}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className={`rounded-full border px-3 py-1 text-xs font-black ${accentClasses[lesson.accent]}`}>
            {lesson.category}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
            {completed ? "Completed" : lesson.duration}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-white">{lesson.title}</h3>
        <p className="mt-3 min-h-16 text-sm leading-6 text-slate-300">{lesson.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {lesson.takeaways.slice(0, 2).map((takeaway) => (
            <span key={takeaway} className="rounded-full bg-night/50 px-3 py-1 text-xs font-semibold text-slate-300">
              {takeaway}
            </span>
          ))}
        </div>

        <button
          className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-night transition group-hover:bg-cyanova group-hover:shadow-glow"
          onClick={() => onOpen(lesson.id)}
        >
          {completed ? "Review Lesson" : "Start Lesson"}
        </button>
      </div>
    </motion.article>
  );
}
