import {
  BarChart3,
  BookOpen,
  CreditCard,
  Flame,
  ShieldCheck,
  Star,
  Trophy,
  Wallet,
} from "lucide-react";
import type { Lesson, LessonType, PathSection, QuizQuestion, SectionName, LevelName } from "../types";

const sectionMeta: Record<SectionName, { subtitle: string; color: string; icon: PathSection["icon"] }> = {
  Basics: {
    subtitle: "Start with money habits that make every other skill easier.",
    color: "#16A34A",
    icon: BookOpen,
  },
  Budgeting: {
    subtitle: "Give every dollar a job before it disappears.",
    color: "#22C55E",
    icon: Wallet,
  },
  Investing: {
    subtitle: "Learn risk, time, and the power of compound growth.",
    color: "#0EA5E9",
    icon: BarChart3,
  },
  "Credit & Debt": {
    subtitle: "Use borrowing tools without getting trapped by them.",
    color: "#F59E0B",
    icon: CreditCard,
  },
  Scams: {
    subtitle: "Spot pressure tactics, fake prizes, and phishing messages.",
    color: "#EF4444",
    icon: ShieldCheck,
  },
};

const typeDetails: Record<LessonType, { label: string; icon: typeof BookOpen; xpHint: string }> = {
  lesson: { label: "Lesson", icon: BookOpen, xpHint: "+10 XP" },
  quiz: { label: "Quiz", icon: Trophy, xpHint: "+5-20 XP" },
  challenge: { label: "Challenge", icon: Flame, xpHint: "+20 XP" },
  story: { label: "Story", icon: BookOpen, xpHint: "+10 XP" },
  review: { label: "Review", icon: Star, xpHint: "+10 XP" },
};

export const levelThresholds: { name: LevelName; minXp: number; maxXp: number; badge: string }[] = [
  { name: "Beginner", minXp: 0, maxXp: 119, badge: "First Steps" },
  { name: "Smart Saver", minXp: 120, maxXp: 299, badge: "Habit Builder" },
  { name: "Investor", minXp: 300, maxXp: 599, badge: "Growth Explorer" },
  { name: "Money Master", minXp: 600, maxXp: 999, badge: "Strategy Champ" },
  { name: "Financial Legend", minXp: 1000, maxXp: Number.POSITIVE_INFINITY, badge: "Finova Hero" },
];

const sectionQuestions: Record<SectionName, QuizQuestion[]> = {
  Basics: [
    {
      question: "What is the first step before making a money plan?",
      options: ["Know how much money comes in", "Buy something fun", "Borrow more", "Ignore small purchases"],
      correctAnswer: "Know how much money comes in",
      explanation: "A plan starts with income because that tells you how much money is available.",
    },
    {
      question: "What is a trade-off?",
      options: ["Choosing one thing means giving up another", "Getting everything for free", "A secret bank fee", "A type of scam"],
      correctAnswer: "Choosing one thing means giving up another",
      explanation: "Every money choice uses resources that could have gone somewhere else.",
    },
    {
      question: "Why track spending?",
      options: ["To see where money really goes", "To make money vanish", "To avoid goals", "To impress stores"],
      correctAnswer: "To see where money really goes",
      explanation: "Tracking turns guesses into facts.",
    },
    {
      question: "A good money goal should be what?",
      options: ["Specific and measurable", "Secret and vague", "Impossible", "Based only on friends"],
      correctAnswer: "Specific and measurable",
      explanation: "Clear goals are easier to plan and finish.",
    },
    {
      question: "Which habit helps most over time?",
      options: ["Small consistent actions", "One random big action", "Avoiding balances", "Spending under pressure"],
      correctAnswer: "Small consistent actions",
      explanation: "Tiny repeatable habits compound into real progress.",
    },
  ],
  Budgeting: [
    {
      question: "What is the purpose of a budget?",
      options: ["Plan where money goes", "Stop all fun", "Hide spending", "Guarantee riches"],
      correctAnswer: "Plan where money goes",
      explanation: "Budgets help you choose spending before money is gone.",
    },
    {
      question: "What does 'needs' usually mean?",
      options: ["Important basics", "Every impulse buy", "Only video games", "Secret savings"],
      correctAnswer: "Important basics",
      explanation: "Needs are essentials such as food, transport, and school supplies.",
    },
    {
      question: "What is an emergency fund for?",
      options: ["Unexpected important costs", "Random snacks", "Risky bets", "Gift cards"],
      correctAnswer: "Unexpected important costs",
      explanation: "Emergency funds protect plans from surprises.",
    },
    {
      question: "What should you do if a budget fails?",
      options: ["Adjust it", "Quit forever", "Spend everything", "Stop tracking"],
      correctAnswer: "Adjust it",
      explanation: "Budgets improve when you update them with real life.",
    },
    {
      question: "What does saving first mean?",
      options: ["Move savings before spending wants", "Save only leftovers", "Avoid all spending", "Borrow to save"],
      correctAnswer: "Move savings before spending wants",
      explanation: "Paying yourself first protects your goal.",
    },
  ],
  Investing: [
    {
      question: "What is compound interest?",
      options: ["Interest earning interest", "Free money with no risk", "A bank password", "A spending rule"],
      correctAnswer: "Interest earning interest",
      explanation: "Compounding grows because interest becomes part of the balance.",
    },
    {
      question: "Why does starting early help?",
      options: ["More time for compounding", "No investment can fall", "Fees disappear", "Taxes stop forever"],
      correctAnswer: "More time for compounding",
      explanation: "Time gives growth more rounds to build.",
    },
    {
      question: "What does diversification do?",
      options: ["Spreads risk", "Buys only one stock", "Removes every risk", "Stops learning"],
      correctAnswer: "Spreads risk",
      explanation: "Diversification reduces dependence on one outcome.",
    },
    {
      question: "Higher potential reward usually means what?",
      options: ["Higher risk", "Guaranteed success", "No downside", "No need to research"],
      correctAnswer: "Higher risk",
      explanation: "More upside usually comes with more uncertainty.",
    },
    {
      question: "Which money should usually stay safe?",
      options: ["Emergency fund", "Long-term extra savings", "Money for a 20-year goal", "A tiny practice amount"],
      correctAnswer: "Emergency fund",
      explanation: "Emergency money needs quick access and stability.",
    },
  ],
  "Credit & Debt": [
    {
      question: "What is credit?",
      options: ["Borrowed money to repay", "Free money", "A savings badge", "A scam every time"],
      correctAnswer: "Borrowed money to repay",
      explanation: "Credit lets you use money now and repay under agreed rules.",
    },
    {
      question: "Which habit helps credit health?",
      options: ["Pay on time", "Miss payments", "Max out cards", "Apply everywhere"],
      correctAnswer: "Pay on time",
      explanation: "On-time payments are a major reliability signal.",
    },
    {
      question: "What is interest on debt?",
      options: ["The cost of borrowing", "A reward", "A discount", "A free upgrade"],
      correctAnswer: "The cost of borrowing",
      explanation: "Interest is what borrowing can cost over time.",
    },
    {
      question: "Avalanche payoff targets which debt first?",
      options: ["Highest interest", "Smallest color", "Newest app", "Random bill"],
      correctAnswer: "Highest interest",
      explanation: "Paying expensive debt first can reduce total cost.",
    },
    {
      question: "Why avoid maxing out a card?",
      options: ["It can look risky and cost interest", "It guarantees prizes", "It improves all scores", "It deletes debt"],
      correctAnswer: "It can look risky and cost interest",
      explanation: "High balances can signal stress and create larger interest costs.",
    },
  ],
  Scams: [
    {
      question: "What is phishing?",
      options: ["Fake messages trying to steal info", "A budgeting method", "A savings account", "A safe prize"],
      correctAnswer: "Fake messages trying to steal info",
      explanation: "Phishing impersonates trusted sources to get private information.",
    },
    {
      question: "Which scam sign is common?",
      options: ["Urgent pressure", "Clear terms", "Official app login", "Normal receipt"],
      correctAnswer: "Urgent pressure",
      explanation: "Pressure makes people act before they verify.",
    },
    {
      question: "What should you do with suspicious links?",
      options: ["Open the official app yourself", "Click quickly", "Enter a code", "Forward to strangers"],
      correctAnswer: "Open the official app yourself",
      explanation: "Going directly to the official source avoids fake pages.",
    },
    {
      question: "Which request is dangerous?",
      options: ["Share a one-time code", "Read a receipt", "Compare prices", "Ask a trusted adult"],
      correctAnswer: "Share a one-time code",
      explanation: "One-time codes can let scammers enter your account.",
    },
    {
      question: "What should you do before paying a surprise prize fee?",
      options: ["Stop and verify", "Pay with gift cards", "Hide it", "Send bank details"],
      correctAnswer: "Stop and verify",
      explanation: "Surprise prize fees are a classic scam pattern.",
    },
  ],
};

const lessonBlueprints: Record<
  SectionName,
  { title: string; description: string; type: LessonType; content: string[]; example: string; encouragement: string }[]
> = {
  Basics: [
    {
      title: "Meet Your Money",
      type: "lesson",
      description: "Learn the simple idea behind income, spending, and saving.",
      content: [
        "Money has jobs. It can help you buy what you need, enjoy things you want, prepare for surprises, and build future options.",
        "The easiest way to feel in control is to know what comes in and where it goes.",
      ],
      example: "If you get $20, you might use $8 for lunch, $5 for fun, and $7 for a goal.",
      encouragement: "Small choices count. You are already building money awareness.",
    },
    {
      title: "Needs vs Wants",
      type: "story",
      description: "Help Mina choose between a bus pass and a limited-edition hoodie.",
      content: [
        "Needs are things that keep your day working. Wants are things that are nice but can wait.",
        "A smart choice is not always boring. It is matching money to what matters most right now.",
      ],
      example: "Mina buys the bus pass today and saves for the hoodie over three weeks.",
      encouragement: "That is a strong choice. Future you gets fewer money surprises.",
    },
    {
      title: "Money Goal Sprint",
      type: "challenge",
      description: "Turn a wish into a goal with an amount and a date.",
      content: [
        "A goal needs three things: what you want, how much it costs, and when you want it.",
        "When the goal is clear, your weekly savings target becomes obvious.",
      ],
      example: "$60 headphones in 6 weeks means saving $10 per week.",
      encouragement: "Clear goals are powerful. You just made money less vague.",
    },
    {
      title: "Spending Tracker",
      type: "lesson",
      description: "Use a tiny tracking habit to find money leaks.",
      content: [
        "Tracking does not mean judging yourself. It means noticing patterns.",
        "Write down purchases for three days. You will usually spot one thing you can change.",
      ],
      example: "Three $4 drinks each week cost $12. Swapping one saves $4 without quitting everything.",
      encouragement: "You found the pattern. That is how better habits start.",
    },
    {
      title: "Basics Quiz",
      type: "quiz",
      description: "Check your new money vocabulary.",
      content: ["Answer five fast questions. You will get feedback after every tap."],
      example: "Remember: income comes in, expenses go out, goals guide choices.",
      encouragement: "Quizzes are practice, not judgment. Go for it.",
    },
    {
      title: "Basics Review",
      type: "review",
      description: "Lock in the key ideas before moving to budgeting.",
      content: [
        "Review sessions make memory stronger because your brain has to retrieve the idea again.",
        "You are building a base for every future money skill.",
      ],
      example: "Need, want, goal, trade-off, and tracking are the five starter tools.",
      encouragement: "Basics complete. Your financial confidence just leveled up.",
    },
  ],
  Budgeting: [
    {
      title: "Budget Builder",
      type: "lesson",
      description: "Give every dollar a job before the week starts.",
      content: [
        "A budget is a plan, not a punishment. It helps your money support your life.",
        "Start with income, then split it between needs, wants, savings, and goals.",
      ],
      example: "$50 can become $25 needs, $15 wants, and $10 savings.",
      encouragement: "Planning ahead is a money superpower.",
    },
    {
      title: "The 50/30/20 Story",
      type: "story",
      description: "Watch Jay balance lunch, fun, and a savings target.",
      content: [
        "The 50/30/20 rule is a beginner-friendly guide: 50% needs, 30% wants, 20% savings.",
        "It is flexible. If your needs are lower, you can save more.",
      ],
      example: "Jay earns $100 and saves $25 because school lunch is already covered.",
      encouragement: "Rules are guides. Smart savers adjust them.",
    },
    {
      title: "Emergency Fund",
      type: "lesson",
      description: "Build a small safety cushion for surprise costs.",
      content: [
        "An emergency fund is money set aside for unexpected important costs.",
        "Start tiny. Even $50 can prevent a bad week from becoming a debt problem.",
      ],
      example: "$5 saved every Friday becomes $100 in 20 weeks.",
      encouragement: "A small buffer can create a big calm feeling.",
    },
    {
      title: "Budget Rescue",
      type: "challenge",
      description: "Fix a weekly budget that went off track.",
      content: [
        "Budgets fail when they are too strict or too vague.",
        "A rescue plan moves money between categories without abandoning the goal.",
      ],
      example: "Overspent $6 on snacks? Move $6 from entertainment instead of touching savings.",
      encouragement: "Adjusting is not failing. It is how real budgets work.",
    },
    {
      title: "Budget Quiz",
      type: "quiz",
      description: "Prove you can spot good budget decisions.",
      content: ["Tap the best answer and learn why immediately."],
      example: "A strong budget has room for needs, wants, and future goals.",
      encouragement: "You are ready to test your budgeting instincts.",
    },
    {
      title: "Budget Review",
      type: "review",
      description: "Refresh your budget strategy before investing basics.",
      content: [
        "Budgeting creates money available for goals.",
        "Without a budget, investing and saving are much harder to repeat.",
      ],
      example: "A monthly budget turns random leftovers into planned progress.",
      encouragement: "Smart Saver energy unlocked.",
    },
  ],
  Investing: [
    {
      title: "Investing Basics",
      type: "lesson",
      description: "Understand what investing is and why time matters.",
      content: [
        "Investing means buying assets that may grow in value over time.",
        "It is different from saving because investing can go up or down.",
      ],
      example: "A broad stock fund owns small pieces of many companies.",
      encouragement: "You do not need to be rich to understand investing.",
    },
    {
      title: "Compound Growth",
      type: "lesson",
      description: "See how interest can earn more interest.",
      content: [
        "Compound interest is growth on your original money plus growth on past growth.",
        "The formula is A = P(1 + r/n)^(nt), but the big idea is simple: time helps.",
      ],
      example: "$200 at 6% for 10 years grows to about $364 with monthly compounding.",
      encouragement: "Time is one of the strongest investing tools.",
    },
    {
      title: "Risk and Reward",
      type: "story",
      description: "Help Leo avoid chasing a hype investment.",
      content: [
        "Higher possible reward usually comes with higher risk.",
        "A long-term plan beats random hype because it survives bad weeks.",
      ],
      example: "Leo chooses a diversified fund instead of putting everything into one viral stock.",
      encouragement: "Calm beats hype. That is investor thinking.",
    },
    {
      title: "Diversify It",
      type: "challenge",
      description: "Pick the less risky mix of investments.",
      content: [
        "Diversification means spreading money across different investments.",
        "If one thing struggles, the whole plan is less likely to break.",
      ],
      example: "Owning 500 companies is usually less risky than owning only one.",
      encouragement: "You are learning how investors manage uncertainty.",
    },
    {
      title: "Investing Quiz",
      type: "quiz",
      description: "Check your investing fundamentals.",
      content: ["Answer questions about compounding, risk, and diversification."],
      example: "Investing can build wealth, but emergency money should usually stay safe.",
      encouragement: "Investor mode is loading.",
    },
    {
      title: "Investing Review",
      type: "review",
      description: "Practice the core ideas before credit and debt.",
      content: [
        "Investing is a long-term tool. It works best with patience, diversification, and realistic expectations.",
        "You should understand risk before chasing reward.",
      ],
      example: "A steady plan can beat an exciting guess.",
      encouragement: "You are thinking like a long-term builder.",
    },
  ],
  "Credit & Debt": [
    {
      title: "Credit Score Decoder",
      type: "lesson",
      description: "Learn what a credit score signals.",
      content: [
        "A credit score helps lenders estimate how likely you are to repay borrowed money.",
        "Paying on time and keeping balances low are two strong habits.",
      ],
      example: "A $50 balance on a $500 limit looks healthier than a $480 balance.",
      encouragement: "Credit is a tool. You are learning how to hold it safely.",
    },
    {
      title: "Borrowing Story",
      type: "story",
      description: "Help Sam choose between waiting, saving, or borrowing.",
      content: [
        "Borrowing can solve a short-term problem but creates a future payment.",
        "The question is not only 'can I buy it?' but 'can I repay it comfortably?'",
      ],
      example: "Sam waits two weeks and avoids paying interest on a small purchase.",
      encouragement: "Future payments matter. You spotted the trade-off.",
    },
    {
      title: "Interest Costs",
      type: "lesson",
      description: "Understand why debt can grow.",
      content: [
        "Interest is the cost of borrowing money.",
        "If you pay only a tiny amount, interest can keep the debt around for much longer.",
      ],
      example: "A $100 debt at high interest can cost far more than $100 if paid slowly.",
      encouragement: "Understanding interest keeps debt from surprising you.",
    },
    {
      title: "Debt Payoff Challenge",
      type: "challenge",
      description: "Choose snowball or avalanche payoff strategy.",
      content: [
        "Snowball pays the smallest balance first for motivation.",
        "Avalanche pays the highest interest first to reduce total cost.",
      ],
      example: "A 24% card usually deserves attention before an 8% loan.",
      encouragement: "You can now compare payoff strategies clearly.",
    },
    {
      title: "Credit Quiz",
      type: "quiz",
      description: "Practice safe borrowing decisions.",
      content: ["Answer five questions about credit, debt, and interest."],
      example: "Good credit habits are built one payment at a time.",
      encouragement: "You have the tools. Tap your best answer.",
    },
    {
      title: "Credit Review",
      type: "review",
      description: "Review credit habits before scam awareness.",
      content: [
        "Credit can help or hurt depending on how it is used.",
        "On-time payment, low balances, and careful borrowing are the core habits.",
      ],
      example: "Borrowing less than you can afford is often safer than borrowing the maximum.",
      encouragement: "Money Master discipline is showing.",
    },
  ],
  Scams: [
    {
      title: "Phishing Defense",
      type: "lesson",
      description: "Spot fake messages before they steal details.",
      content: [
        "Phishing is when scammers pretend to be trusted companies or people.",
        "They often use urgent threats, fake links, and requests for codes.",
      ],
      example: "A fake bank text says your account closes in 10 minutes unless you click.",
      encouragement: "Pause and verify. That habit protects you.",
    },
    {
      title: "Prize Trap Story",
      type: "story",
      description: "Help Ava avoid a fake gift card prize.",
      content: [
        "Scams often promise a big reward after a small payment.",
        "Real prizes do not usually ask for gift cards, crypto, or secret fees.",
      ],
      example: "Ava ignores the message and checks the official website instead.",
      encouragement: "You chose verification over pressure.",
    },
    {
      title: "Red Flag Hunt",
      type: "challenge",
      description: "Find the warning signs in a suspicious offer.",
      content: [
        "Red flags include urgency, secrecy, guaranteed returns, and requests for private codes.",
        "The more red flags you see, the slower you should move.",
      ],
      example: "Guaranteed profit today plus a crypto payment request is a serious warning.",
      encouragement: "Scam radar activated.",
    },
    {
      title: "Safe Verification",
      type: "lesson",
      description: "Learn how to check a message safely.",
      content: [
        "Do not use links inside suspicious messages.",
        "Open the official app or website yourself, then contact support if needed.",
      ],
      example: "Type your bank website manually instead of tapping a text link.",
      encouragement: "Safe verification is simple and powerful.",
    },
    {
      title: "Scam Quiz",
      type: "quiz",
      description: "Test your scam detection reflexes.",
      content: ["Answer questions about phishing, pressure, prizes, and safe actions."],
      example: "When money is urgent and secret, slow down.",
      encouragement: "Your scam shield is ready.",
    },
    {
      title: "Scams Review",
      type: "review",
      description: "Finish the path by reviewing financial safety habits.",
      content: [
        "The safest people are not paranoid. They are patient and verify important messages.",
        "Scammers want speed. Your advantage is slowing down.",
      ],
      example: "A trusted adult, official app, or official support page can help verify.",
      encouragement: "Financial Legend behavior unlocked.",
    },
  ],
};

function createLesson(section: SectionName, blueprintIndex: number, globalOrder: number): Lesson {
  const blueprint = lessonBlueprints[section][blueprintIndex];
  const slug = `${section}-${blueprint.title}`
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: slug,
    section,
    order: globalOrder,
    difficulty: globalOrder < 15 ? "Beginner" : "Intermediate",
    duration: blueprint.type === "quiz" || blueprint.type === "challenge" ? "3 min" : "2 min",
    questions: sectionQuestions[section],
    ...blueprint,
  };
}

let order = 1;

export const pathSections: PathSection[] = (Object.keys(lessonBlueprints) as SectionName[]).map((section) => ({
  id: section.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name: section,
  subtitle: sectionMeta[section].subtitle,
  color: sectionMeta[section].color,
  icon: sectionMeta[section].icon,
  lessons: lessonBlueprints[section].map((_, index) => createLesson(section, index, order++)),
}));

export const lessons = pathSections.flatMap((section) => section.lessons);

export const typeMeta = typeDetails;

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
