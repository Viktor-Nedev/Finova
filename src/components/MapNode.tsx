import { motion } from "framer-motion";
import { Check, LockKeyhole } from "lucide-react";
import { typeMeta } from "../data/lessons";
import type { Lesson, NodeState } from "../types";

type MapNodeProps = {
  lesson: Lesson;
  state: NodeState;
  lane: "left" | "center" | "right";
  onOpen: (lessonId: string) => void;
};

const lanes = {
  left: "mr-auto ml-[6%] sm:ml-[13%]",
  center: "mx-auto",
  right: "ml-auto mr-[6%] sm:mr-[13%]",
};

export function MapNode({ lesson, state, lane, onOpen }: MapNodeProps) {
  const meta = typeMeta[lesson.type];
  const Icon = meta.icon;
  const locked = state === "locked";
  const completed = state === "completed";
  const current = state === "current";
  const boss = lesson.type === "boss";
  const sizeClass = boss ? "h-[6.8rem] w-[6.8rem] sm:h-32 sm:w-32" : "h-[5.8rem] w-[5.8rem] sm:h-28 sm:w-28";
  const stateClass = locked
    ? "border-slate-200 bg-slate-100 text-slate-400 shadow-[0_8px_0_#d1d5db]"
    : completed
      ? "border-duo-green-dark bg-duo-green text-white shadow-[0_8px_0_#12813b]"
      : current
        ? "border-duo-yellow bg-white text-duo-green shadow-[0_8px_0_#d89b11]"
        : meta.nodeClass;

  return (
    <div className={`relative flex w-full ${lanes[lane]}`}>
      <motion.button
        className={`relative grid ${sizeClass} place-items-center rounded-full border-[6px] transition hover:-translate-y-1 active:translate-y-1 active:shadow-none ${stateClass}`}
        animate={current ? { y: [0, -9, 0] } : lesson.type === "treasure" ? { rotate: [-2, 2, -2] } : undefined}
        transition={{ duration: current ? 1.3 : 2, repeat: current || lesson.type === "treasure" ? Infinity : 0, ease: "easeInOut" }}
        disabled={locked}
        onClick={() => !locked && onOpen(lesson.id)}
        aria-label={`${lesson.title}, ${state}`}
      >
        {locked ? <LockKeyhole className="h-9 w-9" /> : completed ? <Check className="h-12 w-12 stroke-[4]" /> : <Icon className="h-11 w-11 stroke-[3]" />}
        {current && <span className="absolute -inset-4 rounded-full border-[7px] border-duo-yellow/70 animate-pulse" />}
        {boss && <span className="absolute -top-4 rounded-full bg-duo-yellow px-3 py-1 text-xs font-black text-duo-brown">BOSS</span>}
      </motion.button>

      <div className="ml-4 hidden self-center rounded-[1.4rem] border-2 border-duo-gray bg-white px-4 py-3 shadow-sm xl:block">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{meta.label}</p>
        <p className="mt-1 w-48 truncate font-black text-slate-800">{lesson.title}</p>
        <p className="text-xs font-bold text-duo-green">{meta.xpHint}</p>
      </div>
    </div>
  );
}
