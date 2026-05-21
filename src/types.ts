export type Category = "Budgeting" | "Investing" | "Credit and Debt" | "Scams";

export type Difficulty = "Beginner" | "Intermediate";

export type View = "landing" | "dashboard" | "learn" | "lesson" | "tutor" | "progress";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  duration: string;
  summary: string;
  body: string[];
  example: string;
  takeaways: string[];
  accent: "cyan" | "violet" | "mint" | "amber";
  questions: QuizQuestion[];
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

export type FinovaState = {
  xp: number;
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
  streak: StreakState;
  xpHistory: XpEvent[];
};

export type LevelName = "Beginner" | "Saver" | "Investor" | "Financial Master";

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
