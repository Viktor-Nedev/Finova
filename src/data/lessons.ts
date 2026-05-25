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
  DictionaryTerm,
  Flashcard,
  Game,
  KeyTerm,
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
  StudyBookLesson,
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

type SectionBlueprint = {
  focus: string;
  simpleIdea: string;
  realLife: string;
  habit: string;
  dailyMove: string;
  terms: KeyTerm[];
};

const coreTerms: KeyTerm[] = [
  {
    term: "Budget",
    explanation: "A plan for where your money will go before you spend it.",
    example: "You set aside $40 for food, $20 for transport, and $10 for saving this week.",
  },
  {
    term: "Interest",
    explanation: "Money paid for borrowing money, or money earned for saving or investing.",
    example: "A bank pays $2 interest because your savings stayed in the account.",
  },
  {
    term: "Investment",
    explanation: "Money put into something that may grow over time, with some risk.",
    example: "Buying a small share of an index fund is an investment.",
  },
  {
    term: "Credit score",
    explanation: "A number lenders use to estimate how reliably you repay borrowed money.",
    example: "Paying bills on time can help a credit score over time.",
  },
];

const sectionBlueprints: Record<SectionName, SectionBlueprint> = {
  Basics: {
    focus: "choosing a clear next money move",
    simpleIdea: "Money skills start with noticing what you earn, what you spend, and what you want next.",
    realLife: "You receive $25 and decide how much goes to snacks, transport, and a future goal.",
    habit: "pause for ten seconds before spending and name the trade-off",
    dailyMove: "Write one need, one want, and one saving goal.",
    terms: [
      { term: "Need", explanation: "Something important for daily life or safety.", example: "Bus fare for school is a need." },
      { term: "Want", explanation: "Something nice to have but not required right now.", example: "A new game skin is a want." },
    ],
  },
  Budgeting: {
    focus: "building a plan your real life can follow",
    simpleIdea: "A budget is not a punishment. It is a map that gives each dollar a job.",
    realLife: "You have $60 for the week and split it between food, travel, fun, and saving.",
    habit: "check your plan before buying the easiest thing",
    dailyMove: "Create three buckets: needs, wants, and future-you.",
    terms: [
      { term: "Expense", explanation: "Money that leaves your wallet or account.", example: "A $12 lunch is an expense." },
      { term: "Spending category", explanation: "A group that shows what money was used for.", example: "Food, travel, and subscriptions are categories." },
    ],
  },
  Saving: {
    focus: "turning small amounts into future choices",
    simpleIdea: "Saving means paying future-you before the money disappears into tiny purchases.",
    realLife: "If you save $5 every day for 1 year, you will have $1,825.",
    habit: "save first, then spend what is left with less stress",
    dailyMove: "Move a tiny amount toward one named goal.",
    terms: [
      { term: "Emergency fund", explanation: "Money kept for important surprises.", example: "It can cover a broken phone screen without borrowing." },
      { term: "Savings goal", explanation: "A target amount for something you plan to buy or protect.", example: "$120 for headphones in eight weeks." },
    ],
  },
  Investing: {
    focus: "letting time and patience do useful work",
    simpleIdea: "Investing is for money you can leave alone, because prices move up and down.",
    realLife: "A small monthly investment can grow because earlier growth can earn more growth.",
    habit: "think in years, not in today-only price changes",
    dailyMove: "Compare one risky choice with one diversified choice.",
    terms: [
      { term: "Compound interest", explanation: "Growth earned on your original money and on earlier growth.", example: "$100 earns $5, then $105 can earn more next time." },
      { term: "Diversification", explanation: "Spreading money across many investments.", example: "An index fund can hold many companies instead of one stock." },
    ],
  },
  "Credit & Debt": {
    focus: "borrowing carefully and paying back confidently",
    simpleIdea: "Credit can help when used carefully, but debt gets expensive when interest grows.",
    realLife: "A $100 purchase on a card can cost more than $100 if you carry the balance.",
    habit: "borrow only when the payback plan is clear",
    dailyMove: "Name the total cost, not just the monthly payment.",
    terms: [
      { term: "Loan", explanation: "Borrowed money that must be repaid.", example: "A student loan helps pay school costs now and is repaid later." },
      { term: "Minimum payment", explanation: "The smallest required payment on a debt.", example: "Paying only the minimum can keep interest around longer." },
    ],
  },
  Taxes: {
    focus: "understanding why paychecks and prices change",
    simpleIdea: "Taxes help pay for public services, and they affect take-home pay.",
    realLife: "A job offer says $15 per hour, but your paycheck is smaller after withholding.",
    habit: "look at take-home pay instead of only the headline amount",
    dailyMove: "Find gross pay, deductions, and net pay on a sample paycheck.",
    terms: [
      { term: "Gross pay", explanation: "Money earned before deductions.", example: "$300 earned before taxes." },
      { term: "Net pay", explanation: "Money received after deductions.", example: "$252 deposited after withholding." },
    ],
  },
  Scams: {
    focus: "slowing down when money messages feel urgent",
    simpleIdea: "Scams often use pressure, secrecy, or too-good-to-be-true rewards.",
    realLife: "A message says you won a prize but must pay a fee with a gift card today.",
    habit: "pause, verify through the official source, and never share one-time codes",
    dailyMove: "Circle the pressure words in a suspicious message.",
    terms: [
      { term: "Phishing", explanation: "A fake message trying to steal information.", example: "A fake bank text asks for your password." },
      { term: "Red flag", explanation: "A warning sign that something may be unsafe.", example: "A stranger asking for gift cards is a red flag." },
    ],
  },
  Banking: {
    focus: "using accounts without surprise fees",
    simpleIdea: "Bank accounts help store, move, and track money, but the rules matter.",
    realLife: "A debit card pulls money from checking, while savings is better for goals.",
    habit: "check balances before spending and review fees",
    dailyMove: "Label checking money and savings money separately.",
    terms: [
      { term: "Checking account", explanation: "An account for everyday money movement.", example: "Use it for debit purchases and bill payments." },
      { term: "Savings account", explanation: "An account for money you want to keep aside.", example: "Use it for an emergency fund." },
    ],
  },
  Entrepreneurship: {
    focus: "making a small idea financially realistic",
    simpleIdea: "A business works when customers pay more than it costs to provide the product or service.",
    realLife: "You sell handmade stickers for $3, but each sticker costs $1 to make.",
    habit: "count costs before celebrating sales",
    dailyMove: "List price, cost, and profit for one tiny product.",
    terms: [
      { term: "Revenue", explanation: "Money a business receives from sales.", example: "Ten stickers sold for $3 each create $30 revenue." },
      { term: "Profit", explanation: "Money left after costs.", example: "$30 revenue minus $10 costs leaves $20 profit." },
    ],
  },
  "Crypto Basics": {
    focus: "separating useful ideas from hype",
    simpleIdea: "Crypto prices can move very fast, so risk control matters more than excitement.",
    realLife: "A coin doubles one week and drops sharply the next, even if social media is loud.",
    habit: "never invest money needed for bills, school, or emergencies",
    dailyMove: "Write one possible upside and one possible downside.",
    terms: [
      { term: "Blockchain", explanation: "A shared record of transactions.", example: "Crypto transactions are recorded on a blockchain." },
      { term: "Volatility", explanation: "How much a price moves up and down.", example: "A coin dropping 20% in a day is volatile." },
    ],
  },
  "Passive Income": {
    focus: "spotting systems that still need setup and care",
    simpleIdea: "Passive income usually requires work, money, or skills before it becomes easier to maintain.",
    realLife: "A digital template can sell many times, but someone still had to create and market it.",
    habit: "ask what work is hidden behind the income claim",
    dailyMove: "Identify the setup work, ongoing work, and risk.",
    terms: [
      { term: "Dividend", explanation: "A payment some companies make to shareholders.", example: "A stock may pay a small dividend each quarter." },
      { term: "Royalty", explanation: "Income paid when someone uses your work.", example: "A song can earn royalties when streamed." },
    ],
  },
  "Real Estate": {
    focus: "understanding rent, ownership, and cash flow",
    simpleIdea: "Homes can be places to live and financial assets, but ownership has many costs.",
    realLife: "A mortgage payment is not the only cost; repairs, insurance, and taxes matter too.",
    habit: "compare total monthly cost before deciding",
    dailyMove: "List three costs beyond the rent or mortgage.",
    terms: [
      { term: "Mortgage", explanation: "A loan used to buy property.", example: "A buyer repays a mortgage monthly." },
      { term: "Equity", explanation: "The part of a property value you own after debt.", example: "A home worth $200,000 with $150,000 debt has $50,000 equity." },
    ],
  },
  "Financial Psychology": {
    focus: "understanding feelings before they become purchases",
    simpleIdea: "Money choices are emotional, so good systems help when motivation is low.",
    realLife: "Buying something after a stressful day can feel helpful for five minutes and regretful tomorrow.",
    habit: "wait before impulse purchases",
    dailyMove: "Write the feeling behind one recent money choice.",
    terms: [
      { term: "Impulse spending", explanation: "Buying quickly because of a feeling or trigger.", example: "Ordering a hoodie because a sale timer is counting down." },
      { term: "Opportunity cost", explanation: "What you give up when choosing something else.", example: "$20 on snacks cannot also go to a concert fund." },
    ],
  },
  Retirement: {
    focus: "helping future-you with small early actions",
    simpleIdea: "Retirement planning is about giving long-term savings more time to grow.",
    realLife: "Starting earlier can matter because compounding has more years to work.",
    habit: "take employer matches seriously when available",
    dailyMove: "Compare saving $10 now with waiting one year.",
    terms: [
      { term: "401(k)", explanation: "A workplace retirement account in the United States.", example: "An employer may match part of what you contribute." },
      { term: "IRA", explanation: "An individual retirement account.", example: "A person can open an IRA outside work." },
    ],
  },
  "Side Hustles": {
    focus: "earning extra without losing track of time or costs",
    simpleIdea: "A side hustle should pay enough to be worth the time, effort, and risk.",
    realLife: "Tutoring for $18 per hour sounds good, but travel and prep time count too.",
    habit: "track hours and costs, not only cash received",
    dailyMove: "Calculate earnings per real hour for one idea.",
    terms: [
      { term: "Hourly rate", explanation: "Money earned for each hour of work.", example: "$15 for one hour of tutoring." },
      { term: "Business expense", explanation: "A cost needed to do the work.", example: "Gas used for delivery work." },
    ],
  },
  "Career & Salary": {
    focus: "seeing income as more than the paycheck number",
    simpleIdea: "A job offer includes pay, benefits, schedule, growth, and costs.",
    realLife: "A higher wage farther away may be less useful after transport time and cost.",
    habit: "compare full compensation, not just salary",
    dailyMove: "List pay, benefits, commute, and learning value.",
    terms: [
      { term: "Salary", explanation: "A fixed amount paid for work, often yearly.", example: "$42,000 per year before taxes." },
      { term: "Benefits", explanation: "Extra job value beyond wages.", example: "Health insurance or paid time off." },
    ],
  },
  Insurance: {
    focus: "trading small regular payments for protection against big losses",
    simpleIdea: "Insurance helps when a rare expensive event would be hard to pay alone.",
    realLife: "Phone insurance may cover damage, but premiums and deductibles affect the real cost.",
    habit: "compare premium, deductible, and what is covered",
    dailyMove: "Circle what the policy pays for and what it excludes.",
    terms: [
      { term: "Premium", explanation: "The regular price paid for insurance.", example: "$12 per month for phone coverage." },
      { term: "Deductible", explanation: "What you pay before insurance helps.", example: "You pay the first $100 of a repair." },
    ],
  },
  "Student Finance": {
    focus: "making school decisions with less money stress",
    simpleIdea: "School costs include tuition, books, transport, food, and time.",
    realLife: "A scholarship can reduce borrowing, but deadlines and requirements matter.",
    habit: "apply early and track every deadline",
    dailyMove: "Build a one-semester cost list.",
    terms: [
      { term: "Scholarship", explanation: "Money for school that usually does not need repayment.", example: "$500 awarded for grades or community work." },
      { term: "Student loan", explanation: "Borrowed money for education that must be repaid.", example: "A loan helps now but creates future payments." },
    ],
  },
  "Business Finance": {
    focus: "reading the numbers that keep a business alive",
    simpleIdea: "A business can be popular and still fail if cash leaves faster than it arrives.",
    realLife: "A shop has sales this month but must pay rent, supplies, wages, and taxes.",
    habit: "watch cash flow before making big promises",
    dailyMove: "Separate revenue, expenses, and cash left.",
    terms: [
      { term: "Cash flow", explanation: "Money moving in and out over time.", example: "Sales arrive Friday, but rent is due Monday." },
      { term: "Margin", explanation: "How much of each sale remains after direct costs.", example: "A $10 item that costs $6 has a $4 margin." },
    ],
  },
  "Financial Freedom": {
    focus: "building systems that match your values",
    simpleIdea: "Financial freedom means money supports choices instead of controlling every decision.",
    realLife: "An emergency fund, low debt, and steady investing can make career choices less scary.",
    habit: "connect each goal to a value, not only a number",
    dailyMove: "Name one money system that would reduce stress this month.",
    terms: [
      { term: "Financial independence", explanation: "Having enough resources to cover life without depending on one paycheck.", example: "Savings and investments cover basic expenses." },
      { term: "Net worth", explanation: "What you own minus what you owe.", example: "$3,000 saved minus $700 debt equals $2,300 net worth." },
    ],
  },
};

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

function makeStudyBookLesson(section: SectionName, sectionIndex: number, lessonIndex: number, type: LessonType): StudyBookLesson {
  const blueprint = sectionBlueprints[section];
  const lessonNumber = lessonIndex + 1;
  const sectionTerms = [...blueprint.terms, ...coreTerms].slice(0, 4);
  const topic = blueprint.focus;
  const practiceBaseId = `${slug(section)}-${lessonNumber}`;

  return {
    chapter: `Chapter ${sectionIndex + 1}: ${section}`,
    readingTimeMinutes: type === "boss" ? 7 : type === "treasure" ? 3 : 5,
    sections: [
      {
        id: "plain-idea",
        heading: "Start with the simple idea",
        illustration: "notebook",
        highlight: blueprint.simpleIdea,
        body: [
          blueprint.simpleIdea,
          `For this lesson, your job is to practice ${topic}. Do not rush to the quiz; first make the idea feel familiar.`,
        ],
      },
      {
        id: "money-moment",
        heading: "Real-life money moment",
        illustration: section === "Scams" ? "shield" : section === "Investing" ? "chart" : "wallet",
        highlight: blueprint.realLife,
        body: [
          blueprint.realLife,
          "The useful question is: what choice protects your future options while still working today?",
        ],
      },
      {
        id: "three-step-move",
        heading: "The three-step move",
        illustration: "target",
        highlight: blueprint.dailyMove,
        body: [
          `Step 1: name the goal. Step 2: spot the trade-off. Step 3: choose the smallest safe action.`,
          `Today that action is: ${blueprint.dailyMove}`,
        ],
      },
    ],
    examples: [
      {
        title: "Tiny habit example",
        setup: blueprint.realLife,
        result: `A small habit helps: ${blueprint.habit}.`,
      },
      {
        title: "Saving math example",
        setup: "If you save $5 every day for 1 year, you will have $1,825.",
        result: "That is not magic. It is one tiny repeatable action multiplied by time.",
      },
    ],
    importantTerms: sectionTerms,
    tips: [
      `Important: ${blueprint.habit}.`,
      "Yellow tip: if a money decision feels confusing, make the next step smaller.",
      "Green tip: the best plan is the one you can actually repeat.",
    ],
    summary: [
      `${section} gets easier when you slow the decision down.`,
      `You learned how to use ${topic} in a real-life situation.`,
      `Before the quiz, prove it with the mini practice below.`,
    ],
    miniExercises: [
      blueprint.dailyMove,
      `Explain "${sectionTerms[0].term}" to a friend in one sentence.`,
      "Write one example from your own week where this idea could help.",
    ],
    practiceTasks: [
      {
        id: `${practiceBaseId}-choice`,
        type: "multiple-choice",
        prompt: `What is the best first move when practicing ${topic}?`,
        options: ["Name the goal", "Guess quickly", "Ignore the trade-off", "Spend first"],
        correctAnswer: "Name the goal",
        explanation: "A clear goal makes the rest of the decision easier.",
      },
      {
        id: `${practiceBaseId}-true`,
        type: "true-false",
        prompt: `True or false: ${blueprint.habit} is a useful habit for ${section}.`,
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Small repeatable habits are what turn a lesson into a real skill.",
      },
      {
        id: `${practiceBaseId}-match`,
        type: "match",
        prompt: "Match each concept with the beginner-friendly meaning.",
        pairs: sectionTerms.slice(0, 3).map((term) => ({ left: term.term, right: term.explanation })),
        explanation: "These are the key words you need before the quiz.",
      },
      {
        id: `${practiceBaseId}-order`,
        type: "drag-order",
        prompt: "Drag the money decision steps into the safest order.",
        items: ["Choose the smallest safe action", "Spot the trade-off", "Name the goal"],
        correctOrder: ["Name the goal", "Spot the trade-off", "Choose the smallest safe action"],
        explanation: "Goal first, trade-off second, action third keeps the decision calm.",
      },
    ],
  };
}

function makeLesson(section: SectionName, sectionIndex: number, lessonIndex: number, globalOrder: number): Lesson {
  const type = lessonTypes[lessonIndex % lessonTypes.length];
  const typeLabel = typeMeta[type].label.toLowerCase();
  const study = makeStudyBookLesson(section, sectionIndex, lessonIndex, type);

  return {
    id: `${slug(section)}-${lessonIndex + 1}-${type}`,
    title: lessonTitle(section, type, lessonIndex),
    chapter: study.chapter,
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
    study,
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

export const financeDictionary: DictionaryTerm[] = [
  {
    id: "budget",
    term: "Budget",
    className: "Budgeting",
    icon: Wallet,
    explanation: "A plan for where money will go before you spend it.",
    example: "Plan $30 for groceries, $15 for transport, and $10 for savings.",
  },
  {
    id: "asset",
    term: "Asset",
    className: "Business Finance",
    icon: Building2,
    explanation: "Something you own that has value or can help create value.",
    example: "Cash, equipment, and investments can be assets.",
  },
  {
    id: "liability",
    term: "Liability",
    className: "Credit & Debt",
    icon: CreditCard,
    explanation: "Money you owe or a financial responsibility you must pay.",
    example: "A loan balance is a liability.",
  },
  {
    id: "inflation",
    term: "Inflation",
    className: "Basics",
    icon: BadgeDollarSign,
    explanation: "A rise in prices that makes the same money buy less over time.",
    example: "If lunch rises from $8 to $9, your old lunch budget buys less.",
  },
  {
    id: "etf",
    term: "ETF",
    className: "Investing",
    icon: BarChart3,
    explanation: "A fund traded like a stock that can hold many investments.",
    example: "One ETF might hold shares of hundreds of companies.",
  },
  {
    id: "credit-score",
    term: "Credit score",
    className: "Credit & Debt",
    icon: Star,
    explanation: "A number lenders use to estimate how reliably you repay borrowed money.",
    example: "Paying bills on time can help your score over time.",
  },
  {
    id: "loan",
    term: "Loan",
    className: "Credit & Debt",
    icon: Banknote,
    explanation: "Borrowed money that must be repaid, often with interest.",
    example: "A car loan lets someone buy a car now and repay monthly.",
  },
  {
    id: "interest",
    term: "Interest",
    className: "Saving",
    icon: Coins,
    explanation: "Money paid for borrowing, or money earned by saving or investing.",
    example: "A savings account may pay interest on your balance.",
  },
  {
    id: "compound-interest",
    term: "Compound interest",
    className: "Investing",
    icon: Rocket,
    explanation: "Growth earned on both your original money and earlier growth.",
    example: "$100 earns $5, then $105 can earn more next time.",
  },
  {
    id: "emergency-fund",
    term: "Emergency fund",
    className: "Saving",
    icon: PiggyBank,
    explanation: "Money saved for important surprises.",
    example: "It can cover an urgent repair without using a credit card.",
  },
  {
    id: "cash-flow",
    term: "Cash flow",
    className: "Business Finance",
    icon: Landmark,
    explanation: "Money moving in and out over time.",
    example: "Rent is due before a customer pays, so cash flow gets tight.",
  },
  {
    id: "diversification",
    term: "Diversification",
    className: "Investing",
    icon: Target,
    explanation: "Spreading money across different investments to reduce single-choice risk.",
    example: "An index fund can diversify across many companies.",
  },
];

export const flashcards: Flashcard[] = [
  ...financeDictionary.map((term) => ({
    id: `term-${term.id}`,
    front: `What is ${term.term.toLowerCase()}?`,
    back: `${term.explanation} Example: ${term.example}`,
    className: term.className,
  })),
  ...lessons.slice(0, 18).map((lesson) => ({
    id: `lesson-${lesson.id}`,
    front: lesson.study.importantTerms[0]
      ? `How would you explain ${lesson.study.importantTerms[0].term.toLowerCase()}?`
      : `What is the main idea in ${lesson.title}?`,
    back: lesson.study.importantTerms[0]?.explanation ?? lesson.study.summary[0],
    className: lesson.section,
    lessonId: lesson.id,
  })),
];

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
