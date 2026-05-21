import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateQuiz } from "../lib/ai";
import { useFinova } from "../state/FinovaContext";
import type { Lesson, QuizQuestion } from "../types";

type QuizComponentProps = {
  lesson: Lesson;
  onDone?: () => void;
};

type Answer = {
  option: string;
  isCorrect: boolean;
};

export function QuizComponent({ lesson, onDone }: QuizComponentProps) {
  const { completeLesson } = useFinova();
  const [questions, setQuestions] = useState<QuizQuestion[]>(lesson.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [awardedXp, setAwardedXp] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadQuiz() {
      setLoading(true);
      const freshQuestions = await generateQuiz(`${lesson.title} (${lesson.category})`, lesson.difficulty);
      if (active) {
        setQuestions(freshQuestions.length >= 5 ? freshQuestions : lesson.questions);
        setCurrentIndex(0);
        setSelected("");
        setAnswers([]);
        setCompleted(false);
        setLoading(false);
      }
    }

    loadQuiz();

    return () => {
      active = false;
    };
  }, [lesson]);

  const currentQuestion = questions[currentIndex];
  const score = answers.filter((answer) => answer.isCorrect).length;

  const selectOption = (option: string) => {
    if (selected || !currentQuestion) {
      return;
    }

    setSelected(option);
    setAnswers((current) => [
      ...current,
      {
        option,
        isCorrect: option === currentQuestion.correctAnswer,
      },
    ]);
  };

  const goNext = () => {
    if (!selected) {
      return;
    }

    if (currentIndex === questions.length - 1) {
      const finalScore = answers.filter((answer) => answer.isCorrect).length;
      const xp = completeLesson(lesson.id, finalScore, questions.length);
      setAwardedXp(xp);
      setCompleted(true);
      onDone?.();
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelected("");
  };

  const restart = async () => {
    setLoading(true);
    const freshQuestions = await generateQuiz(`${lesson.title} (${lesson.category})`, lesson.difficulty);
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setSelected("");
    setAnswers([]);
    setAwardedXp(0);
    setCompleted(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="glass-card grid min-h-80 place-items-center p-8 text-center">
        <div>
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyanova/20 border-t-cyanova" />
          <p className="mt-5 font-display text-xl font-black text-white">Generating your quiz</p>
          <p className="mt-2 text-sm text-slate-400">AI creates 5 beginner-friendly questions for this lesson.</p>
        </div>
      </div>
    );
  }

  if (completed) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden p-8 text-center"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-mintnova/70">Quest complete</p>
        <h3 className="mt-3 font-display text-4xl font-black text-white">{percent}% score</h3>
        <p className="mt-3 text-slate-300">
          You answered {score} of {questions.length} correctly and earned{" "}
          <span className="font-black text-mintnova">{awardedXp} XP</span>.
        </p>
        <div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
          <button className="rounded-2xl bg-white px-5 py-3 font-black text-night" onClick={restart}>
            Try Fresh AI Quiz
          </button>
          <button className="rounded-2xl border border-white/10 px-5 py-3 font-black text-white" onClick={onDone}>
            Continue Learning
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-card p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="mt-2 text-sm font-bold text-cyan-100">Score: {score} correct</p>
        </div>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyanova to-mintnova transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.question}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
        >
          <h3 className="font-display text-2xl font-black leading-tight text-white">{currentQuestion.question}</h3>

          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const wasSelected = selected === option;
              const showFeedback = Boolean(selected);
              const style = showFeedback
                ? isCorrect
                  ? "border-mintnova bg-mintnova/15 text-white"
                  : wasSelected
                    ? "border-rose-400 bg-rose-500/15 text-white"
                    : "border-white/10 bg-white/[0.04] text-slate-400"
                : "border-white/10 bg-white/[0.06] text-slate-100 hover:border-cyanova/70 hover:bg-cyanova/10";

              return (
                <button
                  key={option}
                  className={`rounded-2xl border px-5 py-4 text-left font-bold transition ${style}`}
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl border border-white/10 bg-night/60 p-4"
            >
              <p className="font-bold text-white">
                {selected === currentQuestion.correctAnswer ? "Correct." : "Not quite."}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <button
            className="mt-6 w-full rounded-2xl bg-cyanova px-5 py-4 font-black text-night shadow-glow transition disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            disabled={!selected}
            onClick={goNext}
          >
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
