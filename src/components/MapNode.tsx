import { motion } from "framer-motion";
import { Check, LockKeyhole } from "lucide-react";
import { typeMeta } from "../data/lessons";
import type { Lesson, NodeState } from "../types";

type MapNodeProps = {
  lesson: Lesson;
  state: NodeState;
  side: "left" | "center" | "right";
  onOpen: (lessonId: string) => void;
};

const sideClasses = {
  left: "mr-auto ml-[8%] sm:ml-[18%]",
  center: "mx-auto",
  right: "ml-auto mr-[8%] sm:mr-[18%]",
};

export function MapNode({ lesson, state, side, onOpen }: MapNodeProps) {
  const meta = typeMeta[lesson.type];
  const Icon = meta.icon;
  const isLocked = state === "locked";
  const isCompleted = state === "completed";
  const isCurrent = state === "current";
  const isSpecial = lesson.type !== "lesson";

  const visualClass = isLocked
    ? "border-slate-200 bg-slate-100 text-slate-400 shadow-[0_8px_0_#e2e8f0]"
    : isCompleted
      ? "border-duo-green-dark bg-duo-green text-white shadow-[0_8px_0_#12813b]"
      : isCurrent
        ? "border-duo-yellow bg-white text-duo-green shadow-[0_8px_0_#fbbf24]"
        : isSpecial
          ? "border-duo-yellow bg-duo-yellow text-duo-brown shadow-[0_8px_0_#d89b11]"
          : "border-duo-green bg-white text-duo-green shadow-[0_8px_0_#bbf7d0]";

  return (
    <div className={`relative flex w-full max-w-3xl ${sideClasses[side]}`}>
      <div className="absolute left-1/2 top-20 h-16 w-2 -translate-x-1/2 rounded-full bg-slate-100" />
      <motion.button
        className={`relative grid h-24 w-24 place-items-center rounded-full border-4 text-center transition hover:-translate-y-1 focus-visible:outline-duo-green sm:h-28 sm:w-28 ${visualClass}`}
        whileHover={!isLocked ? { scale: 1.04 } : undefined}
        animate={isCurrent ? { y: [0, -8, 0] } : undefined}
        transition={isCurrent ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        onClick={() => !isLocked && onOpen(lesson.id)}
        disabled={isLocked}
        aria-label={`${lesson.title}, ${state}`}
      >
        {isLocked ? (
          <LockKeyhole className="h-9 w-9" />
        ) : isCompleted ? (
          <Check className="h-11 w-11 stroke-[4]" />
        ) : (
          <Icon className="h-10 w-10 stroke-[3]" />
        )}
        {isCurrent && <span className="absolute -inset-3 rounded-full border-4 border-duo-yellow/70" />}
      </motion.button>
      <div className="ml-4 hidden max-w-56 self-center rounded-3xl border-2 border-slate-100 bg-white px-4 py-3 shadow-soft lg:block">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{meta.label}</p>
        <p className="mt-1 font-black leading-tight text-slate-800">{lesson.title}</p>
        <p className="mt-1 text-xs font-bold text-duo-green">{meta.xpHint}</p>
      </div>
    </div>
  );
}
