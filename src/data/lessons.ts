import {
  BadgeDollarSign,
  Banknote,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Castle,
  Clock3,
  Coins,
  CreditCard,
  Crown,
  Flame,
  Gem,
  HeartHandshake,
  Home,
  Landmark,
  Lightbulb,
  PiggyBank,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  Timer,
  Trophy,
  Wallet,
  WandSparkles,
  Zap,
} from "lucide-react";
import type {
  Badge,
  Game,
  LeaderboardUser,
  LearningClass,
  Lesson,
  LessonType,
  LevelName,
  NewsItem,
  Quest,
  QuizQuestion,
  SavingGoal,
  SectionName,
  WalletTransaction,
} from "../types";

export const levelThresholds: { name: LevelName; minXp: number; maxXp: number; badge: string }[] = [
  { name: "Beginner", minXp: 0, maxXp: 149, badge: "First Steps" },
  { name: "Smart Saver", minXp: 150, maxXp: 399, badge: "Habit Builder" },
  { name: "Investor", minXp: 400, maxXp: 799, badge: "Growth Explorer" },
  { name: "Money Master", minXp: 800, maxXp: 1399, badge: "Strategy Champ" },
  { name: "Financial Legend", minXp: 1400, maxXp: Number.POSITIVE_INFINITY, badge: "Finova Hero" },
];

export const typeMeta: Record<
  LessonType,
  { label: string; icon: typeof BookOpen; xpHint: string; nodeClass: string }
> = {
  lesson: {
    label: "Lesson",
    icon: BookOpen,
    xpHint: "+10 XP",
    nodeClass: "bg-white text-duo-green border-duo-green shadow-[0_8px_0_#bbf7d0]",
  },
  quiz: {
    label: "Quiz",
    icon: Trophy,
    xpHint: "+20 XP",
    nodeClass: "bg-duo-green text-white border-duo-green-dark shadow-[0_8px_0_#12813b]",
  },
  story: {
    label: "Story",
    icon: Lightbulb,
    xpHint: "+12 XP",
    nodeClass: "bg-white text-duo-blue border-duo-blue shadow-[0_8px_0_#bae6fd]",
  },
  review: {
    label: "Review",
    icon: Star,
    xpHint: "+10 XP",
    nodeClass: "bg-white text-amber-500 border-duo-yellow shadow-[0_8px_0_#fde68a]",
  },
  speed: {
    label: "Speed Challenge",
    icon: Zap,
    xpHint: "+25 XP",
    nodeClass: "bg-duo-yellow text-duo-brown border-amber-500 shadow-[0_8px_0_#d97706]",
  },
  daily: {
    label: "Daily Challenge",
    icon: Flame,
    xpHint: "+30 XP",
    nodeClass: "bg-orange-500 text-white border-orange-600 shadow-[0_8px_0_#c2410c]",
  },
  boss: {
    label: "Boss Battle",
    icon: Crown,
    xpHint: "+50 XP",
    nodeClass: "bg-duo-green text-white border-duo-green-dark shadow-[0_10px_0_#12813b]",
  },
  treasure: {
    label: "Treasure Chest",
    icon: Gem,
    xpHint: "+40 gems",
    nodeClass: "bg-duo-yellow text-duo-brown border-amber-500 shadow-[0_8px_0_#d97706]",
  },
  timed: {
    label: "Timed Quiz",
    icon: Timer,
    xpHint: "+25 XP",
    nodeClass: "bg-white text-rose-500 border-rose-300 shadow-[0_8px_0_#fecdd3]",
  },
  game: {
    label: "Mini Game",
    icon: Castle,
    xpHint: "+30 XP",
    nodeClass: "bg-white text-violet-500 border-violet-300 shadow-[0_8px_0_#ddd6fe]",
  },
  ai: {
    label: "AI Challenge",
    icon: WandSparkles,
    xpHint: "+35 XP",
    nodeClass: "bg-white text-emerald-600 border-emerald-300 shadow-[0_8px_0_#bbf7d0]",
  },
};

const baseQuestions: QuizQuestion[] = [
  {
    question: "What is the smartest first move before spending money?",
    options: ["Check your plan", "Spend fast", "Ignore the price", "Borrow more"],
    correctAnswer: "Check your plan",
    explanation: "A plan helps you choose intentionally instead of reacting in the moment.",
  },
  {
    question: "What does a financial trade-off mean?",
    options: ["Choosing one thing means giving up another", "Everything becomes free", "A bank deletes fees", "A quiz is locked"],
    correctAnswer: "Choosing one thing means giving up another",
    explanation: "Every money choice uses money that could have supported another goal.",
  },
  {
    question: "Why is tracking progress helpful?",
    options: ["It shows what is improving", "It makes goals impossible", "It hides mistakes", "It removes all risk"],
    correctAnswer: "It shows what is improving",
    explanation: "Visible progress keeps habits motivating and easier to adjust.",
  },
  {
    question: "What should you do when a money message feels urgent and suspicious?",
    options: ["Pause and verify", "Click immediately", "Send your password", "Pay with gift cards"],
    correctAnswer: "Pause and verify",
    explanation: "Scammers use urgency to stop you from thinking clearly.",
  },
  {
    question: "What makes a goal easier to complete?",
    options: ["A clear amount and deadline", "A secret wish", "No tracking", "Random spending"],
    correctAnswer: "A clear amount and deadline",
    explanation: "Specific goals can be broken into small repeatable steps.",
  },
];

const classSpecs: {
  name: SectionName;
  icon: LearningClass["icon"];
  color: string;
  subtitle: string;
  description: string;
}[] = [
  {
    name: "Basics",
    icon: BookOpen,
    color: "#16A34A",
    subtitle: "Start your money adventure",
    description: "Income, goals, needs, wants, and trade-offs.",
  },
  {
    name: "Budgeting",
    icon: Wallet,
    color: "#22C55E",
    subtitle: "Give every dollar a mission",
    description: "Create budgets that feel realistic and easy to update.",
  },
  {
    name: "Saving",
    icon: PiggyBank,
    color: "#10B981",
    subtitle: "Build a safety buffer",
    description: "Emergency funds, goals, and smart saving habits.",
  },
  {
    name: "Investing",
    icon: BarChart3,
    color: "#0EA5E9",
    subtitle: "Grow with patience",
    description: "Compounding, risk, diversification, and time.",
  },
  {
    name: "Credit & Debt",
    icon: CreditCard,
    color: "#F59E0B",
    subtitle: "Borrow without traps",
    description: "Credit scores, interest, payoff plans, and borrowing habits.",
  },
  {
    name: "Taxes",
    icon: Calculator,
    color: "#8B5CF6",
    subtitle: "Decode paychecks",
    description: "Tax basics, withholding, forms, and filing confidence.",
  },
  {
    name: "Scams",
    icon: ShieldCheck,
    color: "#EF4444",
    subtitle: "Activate scam radar",
    description: "Phishing, fake prizes, suspicious links, and safe verification.",
  },
  {
    name: "Banking",
    icon: Landmark,
    color: "#14B8A6",
    subtitle: "Use accounts wisely",
    description: "Checking, savings, debit cards, transfers, and fees.",
  },
  {
    name: "Entrepreneurship",
    icon: Rocket,
    color: "#F97316",
    subtitle: "Launch tiny businesses",
    description: "Ideas, pricing, customers, costs, and profit.",
  },
  {
    name: "Crypto Basics",
    icon: Coins,
    color: "#EAB308",
    subtitle: "Understand the hype",
    description: "Wallets, volatility, blockchain basics, and risk.",
  },
  {
    name: "Passive Income",
    icon: BadgeDollarSign,
    color: "#16A34A",
    subtitle: "Money systems, not myths",
    description: "Royalties, dividends, digital products, and realistic effort.",
  },
  {
    name: "Real Estate",
    icon: Home,
    color: "#06B6D4",
    subtitle: "Homes as assets",
    description: "Renting, owning, mortgages, and cash flow.",
  },
  {
    name: "Financial Psychology",
    icon: HeartHandshake,
    color: "#EC4899",
    subtitle: "Train your money brain",
    description: "Impulse spending, habits, goals, and social pressure.",
  },
  {
    name: "Retirement",
    icon: Clock3,
    color: "#6366F1",
    subtitle: "Future-you planning",
    description: "Long horizons, accounts, employer matches, and compounding.",
  },
  {
    name: "Side Hustles",
    icon: BriefcaseBusiness,
    color: "#F97316",
    subtitle: "Earn outside class",
    description: "Skills, pricing, safety, time, and simple records.",
  },
  {
    name: "Career & Salary",
    icon: Target,
    color: "#0EA5E9",
    subtitle: "Level up income",
    description: "Salaries, negotiation, benefits, and career choices.",
  },
  {
    name: "Insurance",
    icon: ShieldCheck,
    color: "#64748B",
    subtitle: "Protect what matters",
    description: "Premiums, deductibles, claims, and risk transfer.",
  },
  {
    name: "Student Finance",
    icon: Banknote,
    color: "#84CC16",
    subtitle: "School money moves",
    description: "Scholarships, loans, books, budgets, and campus spending.",
  },
  {
    name: "Business Finance",
    icon: Building2,
    color: "#0891B2",
    subtitle: "Read business numbers",
    description: "Revenue, expenses, margins, cash flow, and runway.",
  },
  {
    name: "Financial Freedom",
    icon: Crown,
    color: "#16A34A",
    subtitle: "Final mastery path",
    description: "Systems, independence, values, and long-term strategy.",
  },
];

const lessonTypes: LessonType[] = [
  "lesson",
  "story",
  "quiz",
  "review",
  "speed",
  "treasure",
  "lesson",
  "timed",
  "game",
  "ai",
  "daily",
  "boss",
];

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function lessonTitle(section: SectionName, type: LessonType, index: number) {
  const labels: Record<LessonType, string> = {
    lesson: `${section} Skill ${index + 1}`,
    quiz: `${section} Quiz`,
    story: `${section} Story`,
    review: `${section} Review`,
    speed: `${section} Speed Run`,
    daily: `${section} Daily Challenge`,
    boss: `${section} Boss Battle`,
    treasure: `${section} Treasure Chest`,
    timed: `${section} Timed Quiz`,
    game: `${section} Mini Game`,
    ai: `${section} AI Challenge`,
  };

  return labels[type];
}

function makeLesson(section: SectionName, sectionIndex: number, lessonIndex: number, globalOrder: number): Lesson {
  const type = lessonTypes[lessonIndex % lessonTypes.length];
  const typeLabel = typeMeta[type].label.toLowerCase();

  return {
    id: `${slug(section)}-${lessonIndex + 1}-${type}`,
    title: lessonTitle(section, type, lessonIndex),
    description: `Complete a ${typeLabel} to grow your ${section.toLowerCase()} confidence.`,
    section,
    order: globalOrder,
    type,
    difficulty: sectionIndex < 5 ? "Beginner" : sectionIndex < 13 ? "Intermediate" : "Advanced",
    duration: type === "boss" ? "6 min" : type === "treasure" ? "1 min" : type === "lesson" ? "2 min" : "3 min",
    xpReward: type === "boss" ? 50 : type === "treasure" ? 0 : type === "daily" ? 30 : type === "speed" ? 25 : 10,
    content: [
      `${section} becomes easier when you break it into one tiny decision at a time.`,
      `In this ${typeLabel}, Finny will show you a simple example, then you will practice with quick feedback.`,
      "Your goal is progress, not perfection. Every completed node unlocks more of the money map.",
    ],
    example: `If your topic is ${section.toLowerCase()}, ask: what is the goal, what is the trade-off, and what is the next safe step?`,
    encouragement: type === "boss" ? "Boss levels are tough, but you have built the skills for this." : "Small wins stack up. Keep moving!",
    questions: baseQuestions,
  };
}

let globalOrder = 1;

export const learningClasses: LearningClass[] = classSpecs.map((spec, classIndex) => ({
  id: slug(spec.name),
  name: spec.name,
  subtitle: spec.subtitle,
  description: spec.description,
  color: spec.color,
  icon: spec.icon,
  lockedAfterOrder: Math.max(0, classIndex * 4),
  lessons: lessonTypes.map((_, lessonIndex) => makeLesson(spec.name, classIndex, lessonIndex, globalOrder++)),
}));

export const lessons = learningClasses.flatMap((learningClass) => learningClass.lessons);

export const featuredMapLessons = lessons.slice(0, 42);

export const games: Game[] = [
  {
    id: "budget-builder",
    title: "Budget Builder",
    description: "Place expenses into the right buckets before time runs out.",
    levelRequirement: "Beginner",
    xpReward: 30,
    icon: Wallet,
    color: "#16A34A",
  },
  {
    id: "scam-buster",
    title: "Scam Buster",
    description: "Swipe suspicious messages and protect your coins.",
    levelRequirement: "Beginner",
    xpReward: 35,
    icon: ShieldCheck,
    color: "#EF4444",
  },
  {
    id: "investment-sprint",
    title: "Investment Sprint",
    description: "Balance risk and reward across a fast market course.",
    levelRequirement: "Smart Saver",
    xpReward: 40,
    icon: BarChart3,
    color: "#0EA5E9",
  },
  {
    id: "market-runner",
    title: "Market Runner",
    description: "Dodge hype traps and collect diversified assets.",
    levelRequirement: "Investor",
    xpReward: 45,
    icon: Rocket,
    color: "#F97316",
  },
  {
    id: "debt-escape",
    title: "Debt Escape",
    description: "Choose payoff moves before interest catches you.",
    levelRequirement: "Smart Saver",
    xpReward: 35,
    icon: CreditCard,
    color: "#F59E0B",
  },
  {
    id: "savings-simulator",
    title: "Savings Simulator",
    description: "Build an emergency fund while surprise expenses appear.",
    levelRequirement: "Beginner",
    xpReward: 25,
    icon: PiggyBank,
    color: "#10B981",
  },
  {
    id: "stock-prediction",
    title: "Stock Prediction Game",
    description: "Read clues and learn why prediction is harder than it looks.",
    levelRequirement: "Investor",
    xpReward: 45,
    icon: Trophy,
    color: "#22C55E",
  },
  {
    id: "crypto-crash",
    title: "Crypto Crash Survival",
    description: "Survive volatility without panic-selling your plan.",
    levelRequirement: "Investor",
    xpReward: 50,
    icon: Coins,
    color: "#EAB308",
  },
  {
    id: "financial-trivia",
    title: "Financial Trivia",
    description: "Rapid-fire questions across every Finova class.",
    levelRequirement: "Beginner",
    xpReward: 20,
    icon: Star,
    color: "#8B5CF6",
  },
  {
    id: "entrepreneur-sim",
    title: "Entrepreneur Simulator",
    description: "Set prices, manage costs, and keep a tiny shop alive.",
    levelRequirement: "Money Master",
    xpReward: 60,
    icon: Building2,
    color: "#F97316",
  },
];

export const quests: Quest[] = [
  {
    id: "daily-3-lessons",
    type: "Daily",
    title: "Finish 3 lessons",
    description: "Complete any three nodes on the map.",
    progress: 1,
    goal: 3,
    xpReward: 40,
    gemsReward: 15,
  },
  {
    id: "daily-quiz-80",
    type: "Daily",
    title: "Score 80% on a quiz",
    description: "Pass a quiz with four or more correct answers.",
    progress: 0,
    goal: 1,
    xpReward: 25,
    gemsReward: 10,
  },
  {
    id: "weekly-100-xp",
    type: "Weekly",
    title: "Earn 100 XP",
    description: "Collect XP from lessons, quests, and games.",
    progress: 65,
    goal: 100,
    xpReward: 100,
    gemsReward: 40,
    badgeReward: "Money Wizard",
  },
  {
    id: "weekly-streak",
    type: "Weekly",
    title: "Maintain a 7-day streak",
    description: "Open Finova and complete an activity every day.",
    progress: 4,
    goal: 7,
    xpReward: 80,
    gemsReward: 35,
    badgeReward: "Streak Hero",
  },
  {
    id: "event-boss",
    type: "Event",
    title: "Beat a boss lesson",
    description: "Clear any crown node on the learning map.",
    progress: 0,
    goal: 1,
    xpReward: 120,
    gemsReward: 75,
    badgeReward: "Boss Breaker",
  },
  {
    id: "event-games",
    type: "Event",
    title: "Play 2 games",
    description: "Try two Finova arcade games this week.",
    progress: 1,
    goal: 2,
    xpReward: 60,
    gemsReward: 25,
  },
];

export const badges: Badge[] = [
  {
    id: "smart-saver",
    title: "Smart Saver",
    description: "Complete the saving class.",
    icon: PiggyBank,
    color: "#16A34A",
    earned: true,
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Score 100% on any quiz.",
    icon: Trophy,
    color: "#FBBF24",
    earned: true,
  },
  {
    id: "investor",
    title: "Investor",
    description: "Finish investing basics.",
    icon: BarChart3,
    color: "#0EA5E9",
    earned: false,
  },
  {
    id: "streak-hero",
    title: "Streak Hero",
    description: "Maintain a 7-day streak.",
    icon: Flame,
    color: "#F97316",
    earned: false,
  },
  {
    id: "scam-hunter",
    title: "Scam Hunter",
    description: "Beat three scam challenges.",
    icon: ShieldCheck,
    color: "#EF4444",
    earned: false,
  },
  {
    id: "money-wizard",
    title: "Money Wizard",
    description: "Earn 500 total XP.",
    icon: WandSparkles,
    color: "#8B5CF6",
    earned: true,
  },
  {
    id: "budget-king",
    title: "Budget King",
    description: "Complete all budgeting nodes.",
    icon: Crown,
    color: "#16A34A",
    earned: false,
  },
  {
    id: "crypto-explorer",
    title: "Crypto Explorer",
    description: "Finish Crypto Basics.",
    icon: Coins,
    color: "#EAB308",
    earned: false,
  },
];

export const leaderboard: LeaderboardUser[] = [
  { id: "1", rank: 1, name: "Maya", avatar: "M", xp: 4820, streak: 45 },
  { id: "2", rank: 2, name: "Leo", avatar: "L", xp: 4510, streak: 31 },
  { id: "3", rank: 3, name: "Finova You", avatar: "Y", xp: 3890, streak: 12, isCurrentUser: true },
  { id: "4", rank: 4, name: "Ava", avatar: "A", xp: 3765, streak: 18 },
  { id: "5", rank: 5, name: "Noah", avatar: "N", xp: 3420, streak: 9 },
  { id: "6", rank: 6, name: "Sofia", avatar: "S", xp: 3110, streak: 14 },
];

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "How students can spot fake scholarship scams",
    category: "Scams",
    readTime: "3 min",
    thumbnail: "linear-gradient(135deg, #DCFCE7, #16A34A)",
    summary: "Red flags to check before sharing personal information.",
    bookmarked: true,
  },
  {
    id: "news-2",
    title: "Why emergency funds beat panic borrowing",
    category: "Saving tips",
    readTime: "4 min",
    thumbnail: "linear-gradient(135deg, #FEF3C7, #FBBF24)",
    summary: "Small buffers make surprise expenses easier to handle.",
    bookmarked: false,
  },
  {
    id: "news-3",
    title: "Crypto volatility explained for beginners",
    category: "Crypto",
    readTime: "5 min",
    thumbnail: "linear-gradient(135deg, #E0F2FE, #0EA5E9)",
    summary: "Why prices move quickly and how risk changes decisions.",
    bookmarked: false,
  },
  {
    id: "news-4",
    title: "Budgeting apps and the habits that matter most",
    category: "Budgeting",
    readTime: "3 min",
    thumbnail: "linear-gradient(135deg, #DCFCE7, #86EFAC)",
    summary: "Apps help only when the plan is simple enough to repeat.",
    bookmarked: true,
  },
  {
    id: "news-5",
    title: "What inflation means for your snack budget",
    category: "Economy",
    readTime: "2 min",
    thumbnail: "linear-gradient(135deg, #FCE7F3, #F472B6)",
    summary: "A beginner-friendly explanation of rising prices.",
    bookmarked: false,
  },
];

export const walletTransactions: WalletTransaction[] = [
  { id: "tx-1", label: "Part-time income", category: "Income", amount: 120, type: "income" },
  { id: "tx-2", label: "Lunch", category: "Food", amount: -18, type: "expense" },
  { id: "tx-3", label: "Index fund practice", category: "Investing", amount: 25, type: "investment" },
  { id: "tx-4", label: "Bus pass", category: "Transport", amount: -24, type: "expense" },
  { id: "tx-5", label: "Emergency fund", category: "Saving", amount: 30, type: "investment" },
];

export const savingGoals: SavingGoal[] = [
  { id: "goal-1", title: "Emergency fund", current: 140, target: 250, color: "#16A34A" },
  { id: "goal-2", title: "New laptop", current: 320, target: 900, color: "#0EA5E9" },
  { id: "goal-3", title: "Summer trip", current: 185, target: 500, color: "#FBBF24" },
];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}

export function getNextLessonId(currentId: string) {
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentId);
  return currentIndex >= 0 ? lessons[currentIndex + 1]?.id : undefined;
}

export function getLevel(xp: number) {
  return levelThresholds.find((level) => xp >= level.minXp && xp <= level.maxXp) ?? levelThresholds[0];
}

export function getNextLevel(xp: number) {
  return levelThresholds.find((level) => level.minXp > xp);
}
