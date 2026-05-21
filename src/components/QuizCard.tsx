import { motion } from "framer-motion";
import type { QuizQuestion } from "../types";

type QuizCardProps = {
  question: QuizQuestion;
  selected: string;
  onSelect: (option: string) => void;
};

export function QuizCard({ question, selected, onSelect }: QuizCardProps) {
  return (
    <motion.div
      key={question.question}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="w-full"
    >
      <h1 className="text-2xl font-black leading-tight text-slate-800 sm:text-4xl">{question.question}</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = selected === option;
          const hasFeedback = Boolean(selected);
          const className = hasFeedback
            ? isCorrect
              ? "border-duo-green bg-green-50 text-duo-green shadow-[0_5px_0_#bbf7d0]"
              : isSelected
                ? "border-duo-red bg-red-50 text-duo-red shadow-[0_5px_0_#fecaca]"
                : "border-slate-200 bg-slate-50 text-slate-400 shadow-[0_5px_0_#e2e8f0]"
            : "border-slate-200 bg-white text-slate-700 shadow-[0_5px_0_#e2e8f0] hover:border-duo-green hover:bg-green-50";

          return (
            <button
              key={option}
              className={`rounded-3xl border-2 px-5 py-5 text-left text-base font-black transition active:translate-y-1 active:shadow-none ${className}`}
              onClick={() => onSelect(option)}
              disabled={hasFeedback}
            >
              {option}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
