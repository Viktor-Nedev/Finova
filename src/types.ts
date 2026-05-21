import type { LucideIcon } from "lucide-react";

export type SectionName = "Basics" | "Budgeting" | "Investing" | "Credit & Debt" | "Scams";

export type LessonType = "lesson" | "quiz" | "challenge" | "story" | "review";

export type Difficulty = "Beginner" | "Intermediate";

export type View = "map" | "learn" | "review" | "progress" | "profile" | "lesson" | "quiz" | "complete" | "tutor";

export type NodeState = "locked" | "available" | "current" | "completed";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  section: SectionName;
  order: number;
  type: LessonType;
  difficulty: Difficulty;
  duration: string;
  content: string[];
  example: string;
  encouragement: string;
  questions: QuizQuestion[];
};

export type PathSection = {
  id: string;
  name: SectionName;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  lessons: Lesson[];
};

export type QuizResult = {
  score: number;
  total: number;
  quizXp: number;
  completedAt: string;
};

export type XpEvent = {
  id: string;
  date: string;
  reason: string;
  amount: number;
  totalXp: number;
};

export type StreakState = {
  count: number;
  lastActiveDate: string;
  lastSeenAt: number;
  history: string[];
};

export type LevelName = "Beginner" | "Smart Saver" | "Investor" | "Money Master" | "Financial Legend";

export type TutorAnswer = {
  simpleExplanation: string;
  realLifeExample: string;
  miniExercise: string;
};

export type ScamAnalysis = {
  riskLevel: "Low" | "Medium" | "High";
  verdict: string;
  redFlags: string[];
  saferAction: string;
};
