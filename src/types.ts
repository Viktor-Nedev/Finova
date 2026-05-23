import type { LucideIcon } from "lucide-react";

export type SectionName =
  | "Basics"
  | "Budgeting"
  | "Saving"
  | "Investing"
  | "Credit & Debt"
  | "Taxes"
  | "Scams"
  | "Banking"
  | "Entrepreneurship"
  | "Crypto Basics"
  | "Passive Income"
  | "Real Estate"
  | "Financial Psychology"
  | "Retirement"
  | "Side Hustles"
  | "Career & Salary"
  | "Insurance"
  | "Student Finance"
  | "Business Finance"
  | "Financial Freedom";

export type LessonType =
  | "lesson"
  | "quiz"
  | "story"
  | "review"
  | "speed"
  | "daily"
  | "boss"
  | "treasure"
  | "timed"
  | "game"
  | "ai";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type View =
  | "map"
  | "classes"
  | "quests"
  | "daily"
  | "games"
  | "leaderboards"
  | "news"
  | "badges"
  | "wallet"
  | "tutor"
  | "progress"
  | "settings"
  | "help"
  | "lesson"
  | "quiz"
  | "complete"
  | "learn"
  | "review"
  | "profile";

export type NodeState = "locked" | "available" | "current" | "completed";

export type LevelName = "Beginner" | "Smart Saver" | "Investor" | "Money Master" | "Financial Legend";

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
  xpReward: number;
  content: string[];
  example: string;
  encouragement: string;
  questions: QuizQuestion[];
};

export type LearningClass = {
  id: string;
  name: SectionName;
  subtitle: string;
  description: string;
  color: string;
  icon: LucideIcon;
  lessons: Lesson[];
  lockedAfterOrder: number;
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

export type Game = {
  id: string;
  title: string;
  description: string;
  levelRequirement: LevelName;
  xpReward: number;
  icon: LucideIcon;
  color: string;
};

export type QuestType = "Daily" | "Weekly" | "Event";

export type Quest = {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  progress: number;
  goal: number;
  xpReward: number;
  gemsReward: number;
  badgeReward?: string;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  earned: boolean;
};

export type LeaderboardUser = {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  rank: number;
  isCurrentUser?: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  bookmarked: boolean;
};

export type WalletTransaction = {
  id: string;
  label: string;
  category: string;
  amount: number;
  type: "income" | "expense" | "investment";
};

export type SavingGoal = {
  id: string;
  title: string;
  current: number;
  target: number;
  color: string;
};
