import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Flag, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapNode } from "../components/MapNode";
import { ProgressBar } from "../components/ProgressBar";
import { featuredMapLessons, learningClasses, lessons } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { Lesson, NodeState } from "../types";

const lanes = ["center", "right", "center", "left", "center", "right", "center", "left"] as const;

function nodeState(lesson: Lesson, currentLessonId: string, completedLessons: string[], unlocked: boolean): NodeState {
  if (completedLessons.includes(lesson.id)) {
    return "completed";
  }

  if (!unlocked) {
    return "locked";
  }

  return lesson.id === currentLessonId ? "current" : "available";
}

export function MapPage() {
  const navigate = useNavigate();
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const isLessonUnlocked = useFinovaStore((state) => state.isLessonUnlocked);
  const currentLessonId = useFinovaStore((state) => state.getCurrentLessonId());
  const currentLesson = useMemo(() => lessons.find((lesson) => lesson.id === currentLessonId) ?? lessons[0], [currentLessonId]);
  const currentClass = learningClasses.find((learningClass) => learningClass.name === currentLesson.section) ?? learningClasses[0];
  const classCompleted = currentClass.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const totalMapNodes = featuredMapLessons.length;
  const mapComplete = featuredMapLessons.filter((lesson) => completedLessons.includes(lesson.id)).length;

  return (
    <div className="min-h-full">
      <section className="duo-card relative overflow-hidden p-4 sm:p-6">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-duo-yellow/25" />
        <div className="absolute bottom-0 right-24 h-20 w-44 rounded-t-full bg-duo-green/10" />
        <div className="relative grid gap-4 xl:grid-cols-[1fr_18rem]">
          <div>
            <p className="section-eyebrow">Main course</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl">Money Mastery</h2>
            <p className="mt-2 max-w-3xl text-base font-bold text-slate-500">
              Follow the green path from top to bottom. Finish each floating node to unlock the next finance skill.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="hero-stat">
                <BookOpen className="h-6 w-6 text-duo-green" />
                <span>{mapComplete}/{totalMapNodes} map nodes</span>
              </div>
              <div className="hero-stat">
                <CheckCircle2 className="h-6 w-6 text-duo-green" />
                <span>{classCompleted}/{currentClass.lessons.length} in {currentClass.name}</span>
              </div>
              <div className="hero-stat">
                <Flag className="h-6 w-6 text-duo-yellow" />
                <span>Next: {currentLesson.title}</span>
              </div>
            </div>
          </div>
          <div className="rounded-[1.6rem] border-2 border-green-100 bg-duo-soft p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-green text-white shadow-[0_5px_0_#12813b]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-duo-green">Section status</p>
                <p className="font-black text-slate-800">{currentClass.subtitle}</p>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={mapComplete} max={totalMapNodes} label="Learning progress" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-4 overflow-hidden rounded-[2.4rem] border-2 border-green-100 bg-[#EAFBEF] px-2 py-8 shadow-soft sm:px-6">
        <div className="map-sky" />
        <div className="map-river" />
        <div className="map-hill hill-left" />
        <div className="map-hill hill-right" />
        <div className="tree tree-a" />
        <div className="tree tree-b" />
        <div className="tree tree-c" />

        <svg className="pointer-events-none absolute left-1/2 top-28 h-[calc(100%-11rem)] w-[72%] -translate-x-1/2" viewBox="0 0 400 1800" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M200 0 C320 120 80 210 200 340 C330 475 70 610 200 760 C330 910 80 1010 200 1160 C320 1310 75 1420 200 1580 C270 1660 230 1740 200 1800"
            fill="none"
            stroke="#B7F0C9"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M200 0 C320 120 80 210 200 340 C330 475 70 610 200 760 C330 910 80 1010 200 1160 C320 1310 75 1420 200 1580 C270 1660 230 1740 200 1800"
            fill="none"
            stroke="#16A34A"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="18 18"
            opacity="0.55"
          />
        </svg>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 py-4">
          {featuredMapLessons.map((lesson, index) => {
            const state = nodeState(lesson, currentLessonId, completedLessons, isLessonUnlocked(lesson.id));
            const showClassFlag = index === 0 || featuredMapLessons[index - 1].section !== lesson.section;
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.015, 0.35) }}
              >
                {showClassFlag && (
                  <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border-2 border-green-100 bg-white px-5 py-3 shadow-sm">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: learningClasses.find((item) => item.name === lesson.section)?.color }} />
                    <span className="text-sm font-black text-slate-700">{lesson.section}</span>
                  </div>
                )}
                <MapNode lesson={lesson} state={state} lane={lanes[index % lanes.length]} onOpen={(id) => navigate(`/lesson/${id}`)} />
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
