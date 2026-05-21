import type { Category, Lesson, LevelName } from "../types";

export const categoryStyles: Record<
  Category,
  { eyebrow: string; gradient: string; ring: string; description: string }
> = {
  Budgeting: {
    eyebrow: "Cash flow",
    gradient: "from-cyan-400/25 via-blue-500/20 to-transparent",
    ring: "ring-cyan-300/30",
    description: "Plan spending before money disappears.",
  },
  Investing: {
    eyebrow: "Growth",
    gradient: "from-mintnova/25 via-emerald-500/15 to-transparent",
    ring: "ring-mintnova/30",
    description: "Understand risk, time, and compounding.",
  },
  "Credit and Debt": {
    eyebrow: "Borrowing",
    gradient: "from-violetnova/25 via-fuchsia-500/15 to-transparent",
    ring: "ring-violetnova/30",
    description: "Use credit without letting it use you.",
  },
  Scams: {
    eyebrow: "Safety",
    gradient: "from-amber-300/25 via-orange-500/15 to-transparent",
    ring: "ring-amber-300/30",
    description: "Spot pressure, fake prizes, and phishing.",
  },
};

export const levelThresholds: { name: LevelName; minXp: number; maxXp: number; badge: string }[] = [
  { name: "Beginner", minXp: 0, maxXp: 119, badge: "Launch" },
  { name: "Saver", minXp: 120, maxXp: 299, badge: "Cash Pilot" },
  { name: "Investor", minXp: 300, maxXp: 599, badge: "Market Builder" },
  { name: "Financial Master", minXp: 600, maxXp: Number.POSITIVE_INFINITY, badge: "Money Strategist" },
];

export function getLevel(xp: number) {
  return levelThresholds.find((level) => xp >= level.minXp && xp <= level.maxXp) ?? levelThresholds[0];
}

export function getNextLevel(xp: number) {
  return levelThresholds.find((level) => level.minXp > xp);
}

export const lessons: Lesson[] = [
  {
    id: "budget-blueprint",
    title: "Build a Budget Blueprint",
    category: "Budgeting",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "Turn allowance, part-time income, and spending into a plan you can actually follow.",
    accent: "cyan",
    body: [
      "A budget is not a restriction. It is a map for your money before the week starts.",
      "Start with money coming in, then split it into needs, wants, saving, and giving or goals. The point is to choose on purpose instead of guessing at the checkout screen.",
      "A simple student budget can use 50% for needs, 30% for wants, and 20% for saving. If your needs are low, move more into saving or a future goal.",
    ],
    example:
      "You earn $80 tutoring. You set aside $16 for savings, $24 for games and snacks, and $40 for transport, lunch, and school supplies. Now every dollar has a job.",
    takeaways: ["Track income first", "Give every dollar a job", "Adjust weekly instead of quitting"],
    questions: [
      {
        question: "What is the main purpose of a budget?",
        options: ["To stop all fun spending", "To plan where money goes", "To hide spending", "To borrow more money"],
        correctAnswer: "To plan where money goes",
        explanation: "A budget helps you make decisions before you spend, not after.",
      },
      {
        question: "In a 50/30/20 budget, what does the 20 usually represent?",
        options: ["Debt only", "Taxes", "Saving or goals", "Entertainment"],
        correctAnswer: "Saving or goals",
        explanation: "The 20% bucket is often used for saving, investing, or paying down debt.",
      },
      {
        question: "What should you do if your budget does not work the first week?",
        options: ["Quit budgeting", "Adjust it", "Ignore it", "Spend everything early"],
        correctAnswer: "Adjust it",
        explanation: "Budgets improve through small adjustments as you learn your real habits.",
      },
    ],
  },
  {
    id: "emergency-starter",
    title: "Start an Emergency Fund",
    category: "Budgeting",
    difficulty: "Beginner",
    duration: "1 min",
    summary: "Create a small money buffer so surprise costs do not become panic moments.",
    accent: "mint",
    body: [
      "An emergency fund is money reserved for unexpected but important costs: a broken phone screen, bus pass, medication, or urgent school supplies.",
      "The first target is small: $100 or one week of typical spending. Small buffers protect your plans and reduce the need to borrow.",
      "Keep emergency money separate from everyday spending so it does not disappear into normal purchases.",
    ],
    example:
      "If you save $5 every Friday, you will have $100 in 20 weeks. That is enough to handle many student-level surprises without asking for a loan.",
    takeaways: ["Start with a tiny target", "Keep it separate", "Use it only for real surprises"],
    questions: [
      {
        question: "What is an emergency fund for?",
        options: ["Random shopping", "Unexpected important costs", "Buying risky stocks", "Monthly subscriptions"],
        correctAnswer: "Unexpected important costs",
        explanation: "Emergency funds are for surprise costs that matter.",
      },
      {
        question: "Why keep emergency money separate?",
        options: ["So it earns no money", "So it is harder to spend by accident", "So friends can use it", "So it replaces a budget"],
        correctAnswer: "So it is harder to spend by accident",
        explanation: "Separation creates friction and protects the money for real emergencies.",
      },
      {
        question: "What is a good first emergency fund goal for many students?",
        options: ["One million dollars", "$100 or one week of spending", "A new console", "All future rent"],
        correctAnswer: "$100 or one week of spending",
        explanation: "A small realistic target builds momentum.",
      },
    ],
  },
  {
    id: "compound-interest",
    title: "Compound Interest Power",
    category: "Investing",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "See how money can grow when interest earns interest over time.",
    accent: "mint",
    body: [
      "Compound interest means your money earns interest, then that interest can earn more interest too.",
      "Time matters more than most beginners expect. Starting early gives compounding more rounds to work.",
      "The formula is A = P(1 + r/n)^(nt), where P is starting money, r is the annual rate, n is compounding frequency, and t is time in years.",
    ],
    example:
      "If $200 grows at 6% for 10 years, it becomes about $364 with monthly compounding. You added no extra money, but time did work.",
    takeaways: ["Interest can earn interest", "Time is powerful", "Higher return usually means higher risk"],
    questions: [
      {
        question: "What makes compound interest different from simple interest?",
        options: ["It only works for banks", "Interest can earn more interest", "It removes risk", "It always doubles money monthly"],
        correctAnswer: "Interest can earn more interest",
        explanation: "Compounding grows the base that future interest is calculated from.",
      },
      {
        question: "Which variable means time in the compound interest formula?",
        options: ["P", "r", "n", "t"],
        correctAnswer: "t",
        explanation: "In A = P(1 + r/n)^(nt), t is the number of years.",
      },
      {
        question: "Why is starting early helpful?",
        options: ["It guarantees no losses", "It gives compounding more time", "It avoids all taxes", "It means you never need to save"],
        correctAnswer: "It gives compounding more time",
        explanation: "More time means more compounding periods.",
      },
    ],
  },
  {
    id: "risk-reward",
    title: "Risk and Reward Basics",
    category: "Investing",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "Learn why higher potential returns usually come with more uncertainty.",
    accent: "cyan",
    body: [
      "Investing is using money to buy something that may grow in value, such as a stock fund or bond.",
      "Risk is the chance that the outcome is worse than expected. Reward is the possible gain for taking that risk.",
      "A smart beginner does not chase hype. They diversify, think long term, and avoid money they need soon.",
    ],
    example:
      "Putting all your savings into one trending stock is risky. A broad index fund spreads money across many companies, which reduces the damage if one company struggles.",
    takeaways: ["No return is guaranteed", "Diversification spreads risk", "Invest long-term money, not emergency money"],
    questions: [
      {
        question: "What does diversification mean?",
        options: ["Buying only one company", "Spreading money across different investments", "Avoiding all investing", "Borrowing to invest"],
        correctAnswer: "Spreading money across different investments",
        explanation: "Diversification reduces dependence on one outcome.",
      },
      {
        question: "Which money should usually not be invested in risky assets?",
        options: ["Emergency fund money", "Long-term money", "Extra savings", "Money for a goal 10 years away"],
        correctAnswer: "Emergency fund money",
        explanation: "Emergency money needs to be available and stable.",
      },
      {
        question: "Higher potential reward usually comes with what?",
        options: ["Zero risk", "More uncertainty", "Guaranteed income", "No need to learn"],
        correctAnswer: "More uncertainty",
        explanation: "More possible upside often means more possible downside.",
      },
    ],
  },
  {
    id: "credit-score",
    title: "Credit Score Decoder",
    category: "Credit and Debt",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "Understand what a credit score signals and how good habits protect it.",
    accent: "violet",
    body: [
      "A credit score is a number lenders use to estimate how likely you are to repay borrowed money.",
      "The biggest habits are paying on time, keeping balances low, and not applying for too much credit at once.",
      "Credit can help with apartments, phones, cars, and loans later, but only if you treat it like a tool rather than free money.",
    ],
    example:
      "If your card limit is $500 and you owe $450, lenders may see that as risky. If you owe $50 and pay on time, that looks healthier.",
    takeaways: ["Pay on time", "Keep balances low", "Credit is borrowed money"],
    questions: [
      {
        question: "What does a credit score estimate?",
        options: ["Your school grades", "Your repayment reliability", "Your salary exactly", "Your shopping taste"],
        correctAnswer: "Your repayment reliability",
        explanation: "Credit scores help lenders judge repayment risk.",
      },
      {
        question: "Which habit usually helps credit?",
        options: ["Paying late", "Maxing out cards", "Paying on time", "Opening many accounts quickly"],
        correctAnswer: "Paying on time",
        explanation: "On-time payments are one of the strongest credit habits.",
      },
      {
        question: "A credit card is best understood as what?",
        options: ["Free money", "Borrowed money", "A guaranteed investment", "A coupon"],
        correctAnswer: "Borrowed money",
        explanation: "You must repay credit card spending.",
      },
    ],
  },
  {
    id: "debt-snowball",
    title: "Debt Payoff Game Plan",
    category: "Credit and Debt",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "Compare debt snowball and avalanche methods for paying debt faster.",
    accent: "violet",
    body: [
      "Debt costs money when interest is added. A payoff plan helps you attack balances instead of only reacting to bills.",
      "The snowball method pays the smallest balance first for quick wins. The avalanche method pays the highest interest rate first to reduce total cost.",
      "Both methods work better when you stop adding new debt during the payoff plan.",
    ],
    example:
      "If you owe $40 to a friend, $200 on a card at 20%, and $500 on a loan at 8%, avalanche targets the card first because it is most expensive.",
    takeaways: ["Interest makes debt grow", "Snowball creates momentum", "Avalanche can save more money"],
    questions: [
      {
        question: "Which debt does the avalanche method target first?",
        options: ["Smallest balance", "Highest interest rate", "Newest purchase", "Random account"],
        correctAnswer: "Highest interest rate",
        explanation: "Avalanche focuses on reducing the most expensive debt first.",
      },
      {
        question: "Why do people use the snowball method?",
        options: ["It creates quick wins", "It ignores balances", "It increases interest", "It requires no payments"],
        correctAnswer: "It creates quick wins",
        explanation: "Paying small balances first can build motivation.",
      },
      {
        question: "What makes debt more expensive over time?",
        options: ["Budgeting", "Interest", "Saving", "Coupons"],
        correctAnswer: "Interest",
        explanation: "Interest is the cost of borrowing.",
      },
    ],
  },
  {
    id: "phishing-defense",
    title: "Phishing Defense",
    category: "Scams",
    difficulty: "Beginner",
    duration: "2 min",
    summary: "Spot fake messages before they steal passwords or payment details.",
    accent: "amber",
    body: [
      "Phishing is when a scammer pretends to be a trusted person or company to get private information.",
      "Warning signs include urgent threats, weird links, spelling mistakes, requests for codes, and prizes you did not enter.",
      "When unsure, do not click. Open the official app or website yourself and check there.",
    ],
    example:
      "A text says your bank account will close in 10 minutes unless you click a link. The safer move is to ignore the link and contact the bank through its official app.",
    takeaways: ["Urgency is a red flag", "Never share one-time codes", "Use official apps or websites"],
    questions: [
      {
        question: "What is phishing?",
        options: ["A savings method", "A scam that impersonates trusted sources", "A budget category", "A type of legal investment"],
        correctAnswer: "A scam that impersonates trusted sources",
        explanation: "Phishing tricks people into giving away private information.",
      },
      {
        question: "What should you do with a suspicious bank link?",
        options: ["Click immediately", "Share it with friends", "Open the official bank app instead", "Reply with your password"],
        correctAnswer: "Open the official bank app instead",
        explanation: "Going directly to the official source avoids fake links.",
      },
      {
        question: "Which request is a major red flag?",
        options: ["Asking for a one-time login code", "Showing your balance in an official app", "Sending a receipt", "Providing customer support hours"],
        correctAnswer: "Asking for a one-time login code",
        explanation: "Scammers use one-time codes to access accounts.",
      },
    ],
  },
  {
    id: "too-good-to-be-true",
    title: "Too-Good-To-Be-True Detector",
    category: "Scams",
    difficulty: "Beginner",
    duration: "1 min",
    summary: "Learn how fake prizes, guaranteed returns, and pressure tactics work.",
    accent: "amber",
    body: [
      "Many scams use excitement and pressure so you act before thinking.",
      "Promises like guaranteed high returns, free money after paying a fee, or secret opportunities are warning signs.",
      "A simple rule: if the reward is huge, urgent, and requires secrecy or payment first, slow down and verify.",
    ],
    example:
      "Someone says you won a $500 gift card but must pay a $20 processing fee today. Real prizes do not require surprise fees through gift cards or crypto.",
    takeaways: ["Pause when pressured", "Guaranteed high returns are suspicious", "Never pay fees to receive a surprise prize"],
    questions: [
      {
        question: "Which phrase is suspicious?",
        options: ["Read the terms", "Guaranteed high return today", "Save before spending", "Track your income"],
        correctAnswer: "Guaranteed high return today",
        explanation: "Guaranteed high returns with urgency are a common scam pattern.",
      },
      {
        question: "Why do scammers create urgency?",
        options: ["To help you budget", "To stop you from thinking clearly", "To lower prices honestly", "To teach investing"],
        correctAnswer: "To stop you from thinking clearly",
        explanation: "Pressure pushes people to act before verifying.",
      },
      {
        question: "What is safer when a surprise prize asks for a fee?",
        options: ["Pay quickly", "Send gift cards", "Verify independently or ignore it", "Share your password"],
        correctAnswer: "Verify independently or ignore it",
        explanation: "Legitimate prizes do not need suspicious upfront payments.",
      },
    ],
  },
];

export const featuredLesson = lessons[0];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? featuredLesson;
}

export function getLessonsByCategory(category: Category) {
  return lessons.filter((lesson) => lesson.category === category);
}

export const categories = Object.keys(categoryStyles) as Category[];
