import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLessonById, getLevel, getNextLevel, lessons } from "../data/lessons";
import type { QuizResult, StreakState, XpEvent } from "../types";

type FinovaStore = {
  xp: number;
  coins: number;
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
  streak: StreakState;
  xpHistory: XpEvent[];
  checkIn: () => void;
  completeLesson: (lessonId: string, score: number, total: number) => { awardedXp: number; coinsEarned: number };
  addXp: (amount: number, reason: string, coins?: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  getCurrentLessonId: () => string;
  resetProgress: () => void;
};

const initialStreak: StreakState = {
  count: 0,
  lastActiveDate: "",
  lastSeenAt: 0,
  history: [],
};

const initialState = {
  xp: 0,
  coins: 50,
  completedLessons: [] as string[],
  quizResults: {} as Record<string, QuizResult>,
  streak: initialStreak,
  xpHistory: [] as XpEvent[],
};

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function makeEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function xpEvent(totalXp: number, amount: number, reason: string): XpEvent {
  return {
    id: makeEventId(),
    date: dateKey(),
    reason,
    amount,
    totalXp,
  };
}

function getLessonIndex(lessonId: string) {
  return lessons.findIndex((lesson) => lesson.id === lessonId);
}

export const useFinovaStore = create<FinovaStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      checkIn: () => {
        set((state) => {
          const today = dateKey();
          const now = Date.now();

          if (state.streak.lastActiveDate === today) {
            return {
              streak: {
                ...state.streak,
                lastSeenAt: now,
              },
            };
          }

          const hoursInactive = state.streak.lastSeenAt
            ? (now - state.streak.lastSeenAt) / (1000 * 60 * 60)
            : Number.POSITIVE_INFINITY;
          const nextCount = hoursInactive <= 24 ? state.streak.count + 1 : 1;
          const nextXp = state.xp + 5;
          const milestoneCoins = nextCount % 7 === 0 ? 25 : 5;

          return {
            xp: nextXp,
            coins: state.coins + milestoneCoins,
            streak: {
              count: nextCount,
              lastActiveDate: today,
              lastSeenAt: now,
              history: [...state.streak.history.filter((day) => day !== today), today].slice(-21),
            },
            xpHistory: [...state.xpHistory, xpEvent(nextXp, 5, "Daily streak bonus")],
          };
        });
      },
      completeLesson: (lessonId: string, score: number, total: number) => {
        const state = get();
        const previousResult = state.quizResults[lessonId];
        const percent = total > 0 ? score / total : 0;
        const quizXp = Math.max(5, Math.round(percent * 20));
        const lesson = getLessonById(lessonId);
        const lessonXp = state.completedLessons.includes(lessonId) ? 0 : lesson.xpReward;
        const improvedQuizXp = Math.max(0, quizXp - (previousResult?.quizXp ?? 0));
        const awardedXp = lessonXp + improvedQuizXp;
        const coinsEarned = Math.max(5, Math.round(awardedXp * 1.5));

        set((current) => {
          const nextXp = current.xp + awardedXp;
          const result: QuizResult = {
            score,
            total,
            quizXp,
            completedAt: new Date().toISOString(),
          };

          return {
            xp: nextXp,
            coins: current.coins + coinsEarned,
            completedLessons: current.completedLessons.includes(lessonId)
              ? current.completedLessons
              : [...current.completedLessons, lessonId],
            quizResults: {
              ...current.quizResults,
              [lessonId]: result,
            },
            xpHistory:
              awardedXp > 0
                ? [...current.xpHistory, xpEvent(nextXp, awardedXp, `Completed ${lessonId}`)]
                : current.xpHistory,
          };
        });

        return { awardedXp, coinsEarned };
      },
      addXp: (amount: number, reason: string, coins = 0) => {
        if (amount <= 0 && coins <= 0) {
          return;
        }

        set((state) => {
          const nextXp = state.xp + Math.max(0, amount);
          return {
            xp: nextXp,
            coins: state.coins + coins,
            xpHistory:
              amount > 0 ? [...state.xpHistory, xpEvent(nextXp, amount, reason)] : state.xpHistory,
          };
        });
      },
      isLessonCompleted: (lessonId: string) => get().completedLessons.includes(lessonId),
      isLessonUnlocked: (lessonId: string) => {
        const index = getLessonIndex(lessonId);
        if (index <= 0) {
          return index === 0;
        }

        return get().completedLessons.includes(lessons[index - 1].id);
      },
      getCurrentLessonId: () => {
        const completed = get().completedLessons;
        return (
          lessons.find((lesson, index) => !completed.includes(lesson.id) && (index === 0 || completed.includes(lessons[index - 1].id)))
            ?.id ?? lessons[lessons.length - 1].id
        );
      },
      resetProgress: () => set(initialState),
    }),
    {
      name: "finova-duolingo-state-v3",
      partialize: (state) => ({
        xp: state.xp,
        coins: state.coins,
        completedLessons: state.completedLessons,
        quizResults: state.quizResults,
        streak: state.streak,
        xpHistory: state.xpHistory,
      }),
    },
  ),
);

export function useFinovaLevel() {
  const xp = useFinovaStore((state) => state.xp);
  return {
    level: getLevel(xp),
    nextLevel: getNextLevel(xp),
  };
}
