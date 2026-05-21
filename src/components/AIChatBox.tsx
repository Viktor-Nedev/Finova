import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { aiStatusLabel, askTutor, detectScam } from "../lib/ai";
import type { ScamAnalysis, TutorAnswer } from "../types";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starters = ["Explain compound interest", "What is a credit score?", "How do I spot a phishing scam?"];

function formatTutorAnswer(answer: TutorAnswer) {
  return [
    `Simple explanation: ${answer.simpleExplanation}`,
    `Real life example: ${answer.realLifeExample}`,
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

export function AIChatBox() {
  const [mode, setMode] = useState<"tutor" | "scam">("tutor");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask me about budgeting, saving, investing, credit, debt, or scams. I will explain it simply, add an example, and give you a mini exercise.",
    },
  ]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    const response =
      mode === "tutor"
        ? formatTutorAnswer(await askTutor(prompt))
        : formatScamAnalysis(await detectScam(prompt));

    setMessages((current) => [
      ...current,
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
      },
    ]);
    setLoading(false);
  };

  return (
    <section className="glass-card overflow-hidden">
      <div className="border-b border-white/10 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">AI tutor</p>
            <h2 className="mt-2 font-display text-3xl font-black text-white">Money questions, plain answers</h2>
          </div>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-slate-300">
            {aiStatusLabel}
          </span>
        </div>

        <div className="mt-5 inline-flex rounded-full border border-white/10 bg-night/60 p-1">
          <button
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              mode === "tutor" ? "bg-cyanova text-night" : "text-slate-300"
            }`}
            onClick={() => setMode("tutor")}
          >
            Tutor
          </button>
          <button
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              mode === "scam" ? "bg-amber-300 text-night" : "text-slate-300"
            }`}
            onClick={() => setMode("scam")}
          >
            Scam Detector
          </button>
        </div>
      </div>

      <div className="max-h-[34rem] space-y-4 overflow-y-auto p-5">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[86%] whitespace-pre-line rounded-[1.4rem] px-5 py-4 text-sm leading-6 ${
              message.role === "user"
                ? "ml-auto bg-cyanova text-night"
                : "border border-white/10 bg-white/[0.06] text-slate-200"
            }`}
          >
            {message.content}
          </motion.div>
        ))}
        {loading && (
          <div className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300">
            Thinking...
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-5">
        {mode === "tutor" && (
          <div className="mb-4 flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button
                key={starter}
                className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyanova/50 hover:text-white"
                onClick={() => setInput(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
        )}

        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
          <textarea
            className="min-h-14 flex-1 resize-none rounded-2xl border border-white/10 bg-night/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanova"
            placeholder={
              mode === "tutor"
                ? "Ask: what is credit score?"
                : "Paste a suspicious message here and Finova will analyze it."
            }
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="rounded-2xl bg-white px-6 py-3 font-black text-night transition hover:bg-cyanova disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            disabled={loading || !input.trim()}
          >
            Ask AI
          </button>
        </form>
      </div>
    </section>
  );
}
