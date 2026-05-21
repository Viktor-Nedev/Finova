import { useEffect, useMemo } from "react";
import { Bot, CheckCircle2, LockKeyhole, Play, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { MapNode } from "../components/MapNode";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { SectionHeader } from "../components/SectionHeader";
import { pathSections } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { Lesson, NodeState, View } from "../types";
import { Button } from "../components/Button";

type MapPageProps = {
  onOpenLesson: (lessonId: string) => void;
  onNavigate: (view: View) => void;
};

const sides = ["center", "left", "center", "right", "center", "left"] as const;

function getNodeState(lesson: Lesson, currentLessonId: string, completedLessons: string[], unlocked: boolean): NodeState {
  if (completedLessons.includes(lesson.id)) {
    return "completed";
  }

  if (!unlocked) {
    return "locked";
  }

  return lesson.id === currentLessonId ? "current" : "available";
}

export function MapPage({ onOpenLesson, onNavigate }: MapPageProps) {
  const xp = useFinovaStore((state) => state.xp);
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const isLessonUnlocked = useFinovaStore((state) => state.isLessonUnlocked);
  const currentLessonId = useFinovaStore((state) => state.getCurrentLessonId());
  const currentLesson = useMemo(
    () => pathSections.flatMap((section) => section.lessons).find((lesson) => lesson.id === currentLessonId),
    [currentLessonId],
  );

  useEffect(() => {
    const target = document.getElementById(`node-${currentLessonId}`);
    target?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentLessonId]);

  const totalLessons = pathSections.reduce((sum, section) => sum + section.lessons.length, 0);

  return (
    <div className="grid min-h-[calc(100vh-5rem)] bg-duo-sky lg:grid-cols-[18rem_1fr]">
      <aside className="hidden border-r-2 border-slate-100 bg-white p-5 lg:block">
        <Mascot size="md" message="Follow the path upward. One lesson unlocks the next!" />
        <div className="mt-6 rounded-[2rem] border-2 border-slate-100 bg-green-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-duo-green">Today</p>
          <h2 className="mt-2 text-2xl font-black text-slate-800">{currentLesson?.title ?? "Path complete"}</h2>
          <p className="mt-2 text-sm font-bold text-slate-500">{currentLesson?.description ?? "Review any lesson you like."}</p>
          <Button className="mt-5 w-full" onClick={() => currentLesson && onOpenLesson(currentLesson.id)}>
            <Play className="mr-1 inline h-5 w-5 fill-white" />
            Start
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="duo-stat">
            <Trophy className="h-6 w-6 text-duo-yellow" />
            <div>
              <p className="font-black text-slate-800">{completedLessons.length}/{totalLessons} nodes</p>
              <p className="text-xs font-bold text-slate-400">Path progress</p>
            </div>
          </div>
          <div className="duo-stat">
            <CheckCircle2 className="h-6 w-6 text-duo-green" />
            <div>
              <p className="font-black text-slate-800">{xp} XP</p>
              <p className="text-xs font-bold text-slate-400">Total earned</p>
            </div>
          </div>
          <button className="duo-stat w-full text-left" onClick={() => onNavigate("tutor")}>
            <Bot className="h-6 w-6 text-duo-blue" />
            <div>
              <p className="font-black text-slate-800">AI Tutor</p>
              <p className="text-xs font-bold text-slate-400">Ask for help</p>
            </div>
          </button>
        </div>
      </aside>

      <section className="relative min-w-0 overflow-hidden pb-24">
        <div className="sticky top-20 z-20 border-b-2 border-slate-100 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">Learning path</p>
              <h1 className="text-3xl font-black text-slate-800 sm:text-4xl">Money Map</h1>
            </div>
            <div className="w-full max-w-sm">
              <ProgressBar value={completedLessons.length} max={totalLessons} label="Overall path" />
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-8">
          <div className="pointer-events-none absolute left-1/2 top-28 h-[calc(100%-8rem)] w-3 -translate-x-1/2 rounded-full bg-white shadow-inner" />
          {[...pathSections].reverse().map((section) => {
            const completedInSection = section.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <SectionHeader section={section} completed={completedInSection} />
                <div className="flex flex-col gap-12 py-4">
                  {[...section.lessons].reverse().map((lesson, index) => {
                    const nodeState = getNodeState(lesson, currentLessonId, completedLessons, isLessonUnlocked(lesson.id));
                    return (
                      <div key={lesson.id} id={`node-${lesson.id}`}>
                        <MapNode lesson={lesson} state={nodeState} side={sides[index % sides.length]} onOpen={onOpenLesson} />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
          {completedLessons.length === 0 && (
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-[2rem] border-2 border-duo-yellow bg-yellow-50 p-4 text-amber-700 shadow-soft">
              <LockKeyhole className="h-6 w-6" />
              <p className="text-sm font-black">Start at the bottom. Complete the first green node to unlock the next one.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
