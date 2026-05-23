import { motion } from "framer-motion";
import { Bot, ShieldAlert, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { aiStatusLabel, askTutor, detectScam, generateQuiz } from "../lib/ai";
import type { QuizQuestion, ScamAnalysis, TutorAnswer } from "../types";
import { Button } from "./Button";
import { Mascot } from "./Mascot";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function formatTutorAnswer(answer: TutorAnswer) {
  return [
    `Simple explanation: ${answer.simpleExplanation}`,
    `Real-life example: ${answer.realLifeExample}`,
    `Mini exercise: ${answer.miniExercise}`,
  ].join("\n\n");
}

function formatScamAnalysis(analysis: ScamAnalysis) {
  return [
    `Risk level: ${analysis.riskLevel}`,
    `Verdict: ${analysis.verdict}`,
    `Red flags: ${analysis.redFlags.join(", ")}`,
    `Safer action: ${analysis.saferAction}`,
  ].join("\n\n");
}

function formatMiniQuiz(questions: QuizQuestion[]) {
  return questions
    .slice(0, 3)
    .map((question, index) => `${index + 1}. ${question.question}\nAnswer: ${question.correctAnswer}`)
    .join("\n\n");
}

export function AIChatBox() {
  const [mode, setMode] = useState<"tutor" | "scam">("tutor");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I am Finny. Ask me a money question and I will explain it simply with an example.",
    },
  ]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) {
      return;
    }

    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    const content =
      mode === "tutor" ? formatTutorAnswer(await askTutor(prompt)) : formatScamAnalysis(await detectScam(prompt));

    setMessages((current) => [...current, { id: `assistant-${Date.now()}`, role: "assistant", content }]);
    setLoading(false);
  };

  const generateMiniQuiz = async () => {
    const topic = input.trim() || "beginner money skills";
    setLoading(true);
    const questions = await generateQuiz(topic, "Beginner");
    setMessages((current) => [
      ...current,
      { id: `assistant-${Date.now()}`, role: "assistant", content: `Mini quiz for ${topic}:\n\n${formatMiniQuiz(questions)}` },
    ]);
    setLoading(false);
  };

  return (
    <section className="flex h-[calc(100vh-7.25rem)] flex-col rounded-[2rem] border-2 border-duo-gray bg-white shadow-soft">
      <div className="flex flex-col gap-4 border-b-2 border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <Mascot size="sm" message="Ask me anything about money." />
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-black text-duo-green">{aiStatusLabel}</span>
          <button
            className={`rounded-2xl border-2 px-4 py-2 text-sm font-black ${mode === "tutor" ? "border-duo-green bg-green-50 text-duo-green" : "border-slate-100 text-slate-500"}`}
            onClick={() => setMode("tutor")}
          >
            <Bot className="mr-1 inline h-4 w-4" />
            Tutor
          </button>
          <button
            className={`rounded-2xl border-2 px-4 py-2 text-sm font-black ${mode === "scam" ? "border-duo-yellow bg-yellow-50 text-amber-600" : "border-slate-100 text-slate-500"}`}
            onClick={() => setMode("scam")}
          >
            <ShieldAlert className="mr-1 inline h-4 w-4" />
            Scam check
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[88%] whitespace-pre-line rounded-[1.6rem] px-5 py-4 text-sm font-bold leading-6 ${
              message.role === "user"
                ? "ml-auto bg-duo-green text-white"
                : "border-2 border-slate-100 bg-slate-50 text-slate-700"
            }`}
          >
            {message.content}
          </motion.div>
        ))}
        {loading && <div className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-black text-duo-green">Finny is thinking...</div>}
      </div>

      <form className="border-t-2 border-slate-100 p-4 sm:p-6" onSubmit={submit}>
        <div className="mb-3 flex flex-wrap gap-2">
          {["Explain compound interest", "What is a credit score?", "How do I avoid scams?"].map((starter) => (
            <button
              key={starter}
              type="button"
              className="rounded-full border-2 border-slate-100 bg-white px-3 py-2 text-xs font-black text-slate-500 hover:border-duo-green hover:text-duo-green"
              onClick={() => setInput(starter)}
            >
              {starter}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <textarea
            className="min-h-14 flex-1 resize-none rounded-3xl border-2 border-slate-100 bg-white px-4 py-3 font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-duo-green"
            placeholder={mode === "tutor" ? "Ask a finance question..." : "Paste a suspicious message..."}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="yellow"
              className="px-4"
              onClick={generateMiniQuiz}
              disabled={loading}
              aria-label="Generate mini quiz"
            >
              <Sparkles className="inline h-5 w-5" />
            </Button>
            <Button disabled={loading || !input.trim()}>Ask</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
