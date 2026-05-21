/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { FinovaState, QuizResult } from "../types";
import { getLevel, getNextLevel } from "../data/lessons";

type FinovaContextValue = {
  state: FinovaState;
  level: ReturnType<typeof getLevel>;
  nextLevel: ReturnType<typeof getNextLevel>;
  completeLesson: (lessonId: string, score: number, total: number) => number;
  addXp: (amount: number, reason: string) => void;
  resetProgress: () => void;
};

const STORAGE_KEY = "finova-state-v1";

const createInitialState = (): FinovaState => ({
  xp: 0,
  completedLessons: [],
  quizResults: {},
  streak: {
    count: 0,
    lastActiveDate: "",
    lastSeenAt: 0,
    history: [],
  },
  xpHistory: [],
});

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function makeEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function appendXpEvent(state: FinovaState, amount: number, reason: string): FinovaState {
  if (amount <= 0) {
    return state;
  }

  const totalXp = state.xp + amount;
  return {
    ...state,
    xp: totalXp,
    xpHistory: [
      ...state.xpHistory,
      {
        id: makeEventId(),
        date: dateKey(),
        reason,
        amount,
        totalXp,
      },
    ],
  };
}

function loadState(): FinovaState {
  if (typeof window === "undefined") {
    return createInitialState();
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createInitialState();
    }

    return {
      ...createInitialState(),
      ...JSON.parse(saved),
    };
  } catch {
    return createInitialState();
  }
}

const FinovaContext = createContext<FinovaContextValue | null>(null);

export function FinovaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FinovaState>(loadState);

  useEffect(() => {
    setState((current) => {
      const today = dateKey();
      const now = Date.now();
      const alreadyCheckedIn = current.streak.lastActiveDate === today;

      if (alreadyCheckedIn) {
        return {
          ...current,
          streak: {
            ...current.streak,
            lastSeenAt: now,
          },
        };
      }

      const hoursInactive = current.streak.lastSeenAt
        ? (now - current.streak.lastSeenAt) / (1000 * 60 * 60)
        : Number.POSITIVE_INFINITY;
      const streakContinues = hoursInactive <= 24;
      const nextCount = streakContinues ? current.streak.count + 1 : 1;

      const withStreak = {
        ...current,
        streak: {
          count: nextCount,
          lastActiveDate: today,
          lastSeenAt: now,
          history: [...current.streak.history.filter((day) => day !== today), today].slice(-14),
        },
      };

      return appendXpEvent(withStreak, 5, "Daily streak bonus");
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addXp = (amount: number, reason: string) => {
    setState((current) => appendXpEvent(current, amount, reason));
  };

  const completeLesson = (lessonId: string, score: number, total: number) => {
    const previousResult = state.quizResults[lessonId];
    const percent = total > 0 ? score / total : 0;
    const quizXp = Math.max(5, Math.round(percent * 20));
    const lessonXp = state.completedLessons.includes(lessonId) ? 0 : 10;
    const improvedQuizXp = Math.max(0, quizXp - (previousResult?.quizXp ?? 0));
    const awardedXp = lessonXp + improvedQuizXp;

    setState((current) => {
      const result: QuizResult = {
        score,
        total,
        quizXp,
        completedAt: new Date().toISOString(),
      };

      const withResult: FinovaState = {
        ...current,
        completedLessons: current.completedLessons.includes(lessonId)
          ? current.completedLessons
          : [...current.completedLessons, lessonId],
        quizResults: {
          ...current.quizResults,
          [lessonId]: result,
        },
      };

      return appendXpEvent(withResult, awardedXp, `Completed ${lessonId}`);
    });

    return awardedXp;
  };

  const resetProgress = () => {
    setState(createInitialState());
  };

  const value: FinovaContextValue = {
    state,
    level: getLevel(state.xp),
    nextLevel: getNextLevel(state.xp),
    completeLesson,
    addXp,
    resetProgress,
  };

  return <FinovaContext.Provider value={value}>{children}</FinovaContext.Provider>;
}

export function useFinova() {
  const context = useContext(FinovaContext);
  if (!context) {
    throw new Error("useFinova must be used inside FinovaProvider");
  }

  return context;
}
