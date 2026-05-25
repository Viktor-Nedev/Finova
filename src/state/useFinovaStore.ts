import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLessonById, getLevel, getNextLevel, lessons } from "../data/lessons";
import type { NotebookNote, QuizResult, SectionName, StreakState, StudyCompletion, XpEvent } from "../types";

type FinovaStore = {
  xp: number;
  coins: number;
  completedLessons: string[];
  studiedLessons: Record<string, StudyCompletion>;
  quizResults: Record<string, QuizResult>;
  notes: NotebookNote[];
  savedLessons: string[];
  difficultFlashcards: string[];
  streak: StreakState;
  xpHistory: XpEvent[];
  checkIn: () => void;
  completeLesson: (lessonId: string, score: number, total: number) => { awardedXp: number; coinsEarned: number };
  addXp: (amount: number, reason: string, coins?: number) => void;
  markSectionRead: (lessonId: string, sectionId: string) => void;
  completePracticeTask: (lessonId: string, taskId: string) => void;
  completeStudyLesson: (lessonId: string) => void;
  getStudyCompletion: (lessonId: string) => StudyCompletion;
  isQuizUnlocked: (lessonId: string) => boolean;
  createNote: (note: {
    title: string;
    body: string;
    className: SectionName;
    lessonId?: string;
    lessonTitle?: string;
    pinned?: boolean;
    favorite?: boolean;
  }) => string;
  updateNote: (noteId: string, patch: Partial<Pick<NotebookNote, "title" | "body" | "className" | "lessonId" | "lessonTitle" | "pinned" | "favorite">>) => void;
  deleteNote: (noteId: string) => void;
  togglePinNote: (noteId: string) => void;
  toggleFavoriteNote: (noteId: string) => void;
  toggleSavedLesson: (lessonId: string) => void;
  isLessonSaved: (lessonId: string) => boolean;
  toggleDifficultFlashcard: (cardId: string) => void;
  isFlashcardDifficult: (cardId: string) => boolean;
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
  studiedLessons: {} as Record<string, StudyCompletion>,
  quizResults: {} as Record<string, QuizResult>,
  notes: [] as NotebookNote[],
  savedLessons: [] as string[],
  difficultFlashcards: [] as string[],
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

function calculateStudyCompletion(lessonId: string, readSectionIds: string[], completedPracticeIds: string[]): StudyCompletion {
  const lesson = getLessonById(lessonId);
  const sectionIds = lesson.study.sections.map((section) => section.id);
  const practiceIds = lesson.study.practiceTasks.map((task) => task.id);
  const validReadSectionIds = readSectionIds.filter((id, index, all) => sectionIds.includes(id) && all.indexOf(id) === index);
  const validPracticeIds = completedPracticeIds.filter((id, index, all) => practiceIds.includes(id) && all.indexOf(id) === index);
  const totalSteps = Math.max(1, sectionIds.length + practiceIds.length);
  const completedSteps = validReadSectionIds.length + validPracticeIds.length;
  const quizUnlocked = validReadSectionIds.length === sectionIds.length && validPracticeIds.length === practiceIds.length;

  return {
    progress: quizUnlocked ? 100 : Math.round((completedSteps / totalSteps) * 100),
    readSectionIds: validReadSectionIds,
    completedPracticeIds: validPracticeIds,
    quizUnlocked,
    completedAt: quizUnlocked ? new Date().toISOString() : undefined,
  };
}

function emptyStudyCompletion(lessonId: string): StudyCompletion {
  return calculateStudyCompletion(lessonId, [], []);
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
        if (!state.isQuizUnlocked(lessonId)) {
          return { awardedXp: 0, coinsEarned: 0 };
        }

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
      markSectionRead: (lessonId: string, sectionId: string) => {
        set((state) => {
          const current = state.studiedLessons[lessonId] ?? emptyStudyCompletion(lessonId);
          const next = calculateStudyCompletion(lessonId, [...current.readSectionIds, sectionId], current.completedPracticeIds);

          return {
            studiedLessons: {
              ...state.studiedLessons,
              [lessonId]: next,
            },
          };
        });
      },
      completePracticeTask: (lessonId: string, taskId: string) => {
        set((state) => {
          const current = state.studiedLessons[lessonId] ?? emptyStudyCompletion(lessonId);
          const next = calculateStudyCompletion(lessonId, current.readSectionIds, [...current.completedPracticeIds, taskId]);

          return {
            studiedLessons: {
              ...state.studiedLessons,
              [lessonId]: next,
            },
          };
        });
      },
      completeStudyLesson: (lessonId: string) => {
        set((state) => {
          const lesson = getLessonById(lessonId);
          const next = calculateStudyCompletion(
            lessonId,
            lesson.study.sections.map((section) => section.id),
            lesson.study.practiceTasks.map((task) => task.id),
          );

          return {
            studiedLessons: {
              ...state.studiedLessons,
              [lessonId]: next,
            },
          };
        });
      },
      getStudyCompletion: (lessonId: string) => get().studiedLessons[lessonId] ?? emptyStudyCompletion(lessonId),
      isQuizUnlocked: (lessonId: string) => get().getStudyCompletion(lessonId).quizUnlocked,
      createNote: ({ title, body, className, lessonId, lessonTitle, pinned = false, favorite = false }) => {
        const now = new Date().toISOString();
        const id = makeEventId();
        const note: NotebookNote = {
          id,
          title,
          body,
          className,
          lessonId,
          lessonTitle,
          pinned,
          favorite,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          notes: [note, ...state.notes],
        }));

        return id;
      },
      updateNote: (noteId, patch) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  ...patch,
                  updatedAt: new Date().toISOString(),
                }
              : note,
          ),
        }));
      },
      deleteNote: (noteId) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== noteId),
        }));
      },
      togglePinNote: (noteId) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() } : note,
          ),
        }));
      },
      toggleFavoriteNote: (noteId) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId ? { ...note, favorite: !note.favorite, updatedAt: new Date().toISOString() } : note,
          ),
        }));
      },
      toggleSavedLesson: (lessonId) => {
        set((state) => ({
          savedLessons: state.savedLessons.includes(lessonId)
            ? state.savedLessons.filter((id) => id !== lessonId)
            : [...state.savedLessons, lessonId],
        }));
      },
      isLessonSaved: (lessonId) => get().savedLessons.includes(lessonId),
      toggleDifficultFlashcard: (cardId) => {
        set((state) => ({
          difficultFlashcards: state.difficultFlashcards.includes(cardId)
            ? state.difficultFlashcards.filter((id) => id !== cardId)
            : [...state.difficultFlashcards, cardId],
        }));
      },
      isFlashcardDifficult: (cardId) => get().difficultFlashcards.includes(cardId),
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
        studiedLessons: state.studiedLessons,
        quizResults: state.quizResults,
        notes: state.notes,
        savedLessons: state.savedLessons,
        difficultFlashcards: state.difficultFlashcards,
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
