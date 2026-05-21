import type { Difficulty, QuizQuestion, ScamAnalysis, TutorAnswer } from "../types";
import { isSupabaseConfigured, supabase } from "./supabase";

type AiIntent = "generate_quiz" | "tutor" | "scam_detector";

async function invokeAi<T>(intent: AiIntent, payload: Record<string, unknown>, fallback: () => T): Promise<T> {
  if (!supabase) {
    return fallback();
  }

  try {
    const { data, error } = await supabase.functions.invoke("finova-ai", {
      body: { intent, payload },
    });

    if (error || !data) {
      throw error ?? new Error("Empty AI response");
    }

    return data as T;
  } catch (error) {
    console.warn("Finova AI fallback used:", error);
    return fallback();
  }
}

const genericQuiz: QuizQuestion[] = [
  {
    question: "What is the safest first step before spending money?",
    options: ["Make a plan", "Borrow more", "Ignore prices", "Spend instantly"],
    correctAnswer: "Make a plan",
    explanation: "Planning first helps you match spending with goals.",
  },
  {
    question: "Why should financial choices be compared?",
    options: ["To slow everything forever", "To understand trade-offs", "To avoid learning", "To copy friends"],
    correctAnswer: "To understand trade-offs",
    explanation: "Every money choice has a trade-off, so comparison improves decisions.",
  },
  {
    question: "What does a short-term money goal need?",
    options: ["A clear amount and date", "A secret password", "A viral trend", "A risky bet"],
    correctAnswer: "A clear amount and date",
    explanation: "Specific goals are easier to track and reach.",
  },
  {
    question: "Which behavior usually protects your money?",
    options: ["Acting under pressure", "Checking details before paying", "Sharing login codes", "Using unknown links"],
    correctAnswer: "Checking details before paying",
    explanation: "Verification prevents mistakes and scams.",
  },
  {
    question: "What is one sign of good financial progress?",
    options: ["You know where money went", "You avoid all questions", "You spend to feel rich", "You never check balances"],
    correctAnswer: "You know where money went",
    explanation: "Tracking creates awareness, and awareness improves habits.",
  },
];

function quizForTopic(topic: string): QuizQuestion[] {
  const normalized = topic.toLowerCase();

  if (normalized.includes("compound") || normalized.includes("invest")) {
    return [
      {
        question: "What does compound interest mean?",
        options: ["Interest earns more interest", "Money cannot lose value", "Fees disappear", "Returns are guaranteed"],
        correctAnswer: "Interest earns more interest",
        explanation: "Compounding happens when prior interest becomes part of the balance that earns future interest.",
      },
      {
        question: "Which choice usually reduces investment risk?",
        options: ["Diversifying", "Buying one hype stock", "Using emergency savings", "Ignoring fees"],
        correctAnswer: "Diversifying",
        explanation: "Diversification spreads exposure across multiple investments.",
      },
      {
        question: "Why is time important when investing?",
        options: ["It gives compounding room to work", "It guarantees every stock rises", "It removes inflation", "It avoids all mistakes"],
        correctAnswer: "It gives compounding room to work",
        explanation: "Longer timelines create more opportunities for compounding.",
      },
      {
        question: "What should usually stay out of risky investments?",
        options: ["Emergency fund money", "Long-term goal money", "Extra savings", "Money you can leave alone"],
        correctAnswer: "Emergency fund money",
        explanation: "Emergency funds need stability and quick access.",
      },
      {
        question: "What does higher potential return often come with?",
        options: ["Higher risk", "No uncertainty", "Guaranteed income", "No need to research"],
        correctAnswer: "Higher risk",
        explanation: "More upside usually comes with more downside risk.",
      },
    ];
  }

  if (normalized.includes("credit") || normalized.includes("debt")) {
    return [
      {
        question: "What is credit?",
        options: ["Borrowed money you must repay", "Free money", "A discount code", "A savings jar"],
        correctAnswer: "Borrowed money you must repay",
        explanation: "Credit lets you buy now and repay later, usually with rules and possible interest.",
      },
      {
        question: "Which habit can improve credit health?",
        options: ["Paying on time", "Missing payments", "Maxing out cards", "Opening accounts constantly"],
        correctAnswer: "Paying on time",
        explanation: "On-time payments are a major signal of reliability.",
      },
      {
        question: "What is interest on debt?",
        options: ["The cost of borrowing", "A free reward", "A tax refund", "A scam every time"],
        correctAnswer: "The cost of borrowing",
        explanation: "Interest is money paid for the ability to borrow.",
      },
      {
        question: "What does the avalanche payoff method focus on first?",
        options: ["Highest interest debt", "Newest debt", "Largest store purchase", "Random debt"],
        correctAnswer: "Highest interest debt",
        explanation: "Avalanche targets the debt costing the most each period.",
      },
      {
        question: "Why avoid using all of a credit limit?",
        options: ["High balances can look risky", "It deletes the card", "It creates free interest", "It improves every score instantly"],
        correctAnswer: "High balances can look risky",
        explanation: "Using a large share of available credit can signal financial stress.",
      },
    ];
  }

  if (normalized.includes("scam") || normalized.includes("phishing")) {
    return [
      {
        question: "What is a common scam warning sign?",
        options: ["Urgent pressure", "Clear terms", "Official app login", "A normal receipt"],
        correctAnswer: "Urgent pressure",
        explanation: "Scammers use urgency to make people act before verifying.",
      },
      {
        question: "What should you do with a suspicious link?",
        options: ["Open the official site yourself", "Click it quickly", "Enter your code", "Forward it to strangers"],
        correctAnswer: "Open the official site yourself",
        explanation: "Going directly to the official source avoids fake pages.",
      },
      {
        question: "Which request is especially dangerous?",
        options: ["Asking for a one-time login code", "Sending a normal receipt", "Showing business hours", "Asking for feedback"],
        correctAnswer: "Asking for a one-time login code",
        explanation: "One-time codes can let scammers access accounts.",
      },
      {
        question: "What should you do before paying a surprise fee to claim a prize?",
        options: ["Stop and verify", "Pay with gift cards", "Hide it from adults", "Send bank details"],
        correctAnswer: "Stop and verify",
        explanation: "Surprise prize fees are a classic scam pattern.",
      },
      {
        question: "Which promise is suspicious?",
        options: ["Guaranteed huge returns today", "Read the policy", "Save regularly", "Compare prices"],
        correctAnswer: "Guaranteed huge returns today",
        explanation: "Guaranteed high returns with urgency are not realistic.",
      },
    ];
  }

  if (normalized.includes("budget") || normalized.includes("saving") || normalized.includes("emergency")) {
    return [
      {
        question: "What does a budget help you do?",
        options: ["Plan spending before it happens", "Spend without thinking", "Avoid all saving", "Make bills disappear"],
        correctAnswer: "Plan spending before it happens",
        explanation: "Budgets help you choose where money goes in advance.",
      },
      {
        question: "What should an emergency fund cover?",
        options: ["Unexpected important costs", "Random shopping", "Risky investments", "Daily treats only"],
        correctAnswer: "Unexpected important costs",
        explanation: "Emergency funds protect you from surprise necessary expenses.",
      },
      {
        question: "What is a good first savings goal?",
        options: ["A small realistic target", "An impossible amount", "No target", "Whatever friends choose"],
        correctAnswer: "A small realistic target",
        explanation: "Small targets create momentum and confidence.",
      },
      {
        question: "What does it mean to give every dollar a job?",
        options: ["Assign money to a purpose", "Spend it all", "Hide it", "Borrow more"],
        correctAnswer: "Assign money to a purpose",
        explanation: "Each dollar should support needs, wants, saving, or goals.",
      },
      {
        question: "What should you do if a budget fails?",
        options: ["Adjust it", "Quit forever", "Ignore balances", "Blame the app"],
        correctAnswer: "Adjust it",
        explanation: "Budgets are living plans that improve with real data.",
      },
    ];
  }

  return genericQuiz;
}

export async function generateQuiz(topic: string, difficulty: Difficulty = "Beginner") {
  const response = await invokeAi<{ questions: QuizQuestion[] }>(
    "generate_quiz",
    { topic, difficulty },
    () => ({ questions: quizForTopic(topic) }),
  );

  return response.questions?.slice(0, 5) ?? quizForTopic(topic);
}

export async function askTutor(topic: string) {
  return invokeAi<TutorAnswer>(
    "tutor",
    { topic },
    () => ({
      simpleExplanation: `${topic} is a money skill that becomes easier when you break it into one clear choice at a time. Ask: what is the goal, what are the trade-offs, and what happens if I wait?`,
      realLifeExample:
        "Imagine you want a $120 pair of headphones. If you save $15 each week, you can buy them in 8 weeks without borrowing or missing lunch money.",
      miniExercise: "Pick one thing you want. Write the price, your weekly saving amount, and the number of weeks it will take.",
    }),
  );
}

export async function detectScam(text: string) {
  const riskyWords = ["urgent", "gift card", "crypto", "password", "one-time code", "verify now", "guaranteed"];
  const found = riskyWords.filter((word) => text.toLowerCase().includes(word));

  return invokeAi<ScamAnalysis>(
    "scam_detector",
    { text },
    () => ({
      riskLevel: found.length >= 2 ? "High" : found.length === 1 ? "Medium" : "Low",
      verdict:
        found.length > 0
          ? "This message has scam-like pressure or payment patterns. Treat it as suspicious until verified through an official source."
          : "No obvious scam pattern was detected, but still verify links, sender identity, and payment requests.",
      redFlags: found.length > 0 ? found : ["No strong keyword red flags found"],
      saferAction: "Do not click message links. Open the official website or app yourself, then contact support if needed.",
    }),
  );
}

export const aiStatusLabel = isSupabaseConfigured ? "Supabase AI connected" : "Demo AI fallback active";
