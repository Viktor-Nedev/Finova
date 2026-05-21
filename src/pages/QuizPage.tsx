import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { QuizCard } from "../components/QuizCard";
import { generateQuiz } from "../lib/ai";
import { useFinovaStore } from "../state/useFinovaStore";
import type { Lesson, QuizQuestion, View } from "../types";

type QuizPageProps = {
  lesson: Lesson;
  onNavigate: (view: View) => void;
  onComplete: (summary: { xp: number; coins: number; score: number; total: number }) => void;
};

export function QuizPage({ lesson, onNavigate, onComplete }: QuizPageProps) {
  const completeLesson = useFinovaStore((state) => state.completeLesson);
  const [questions, setQuestions] = useState<QuizQuestion[]>(lesson.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadQuiz() {
      setLoading(true);
      const freshQuestions = await generateQuiz(`${lesson.title} ${lesson.section}`, lesson.difficulty);
      if (active) {
        setQuestions(freshQuestions.length >= 5 ? freshQuestions : lesson.questions);
        setCurrentIndex(0);
        setSelected("");
        setScore(0);
        setLoading(false);
      }
    }

    loadQuiz();

    return () => {
      active = false;
    };
  }, [lesson]);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selected === currentQuestion?.correctAnswer;

  const choose = (option: string) => {
    if (selected) {
      return;
    }

    setSelected(option);
    if (option === currentQuestion.correctAnswer) {
      setScore((current) => current + 1);
    }
  };

  const next = () => {
    if (currentIndex === questions.length - 1) {
      const finalScore = score + (isCorrect ? 0 : 0);
      const reward = completeLesson(lesson.id, finalScore, questions.length);
      onComplete({ xp: reward.awardedXp, coins: reward.coinsEarned, score: finalScore, total: questions.length });
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelected("");
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-duo-sky p-4">
        <div className="duo-card max-w-md p-8 text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-8 border-green-100 border-t-duo-green" />
          <h1 className="mt-5 text-2xl font-black text-slate-800">Building your quiz...</h1>
          <p className="mt-2 font-bold text-slate-500">Finny is preparing five questions for this topic.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center gap-4 border-b-2 border-slate-100 px-4 py-4 sm:px-8">
        <button className="icon-button" onClick={() => onNavigate("lesson")} aria-label="Back to lesson">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <ProgressBar value={currentIndex + 1} max={questions.length} />
        <button className="icon-button" onClick={() => onNavigate("map")} aria-label="Exit quiz">
          <X className="h-5 w-5" />
        </button>
      </header>

      <main className="flex flex-1 items-center bg-duo-sky px-4 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <QuizCard question={currentQuestion} selected={selected} onSelect={choose} />
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.footer
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            className={`border-t-2 px-4 py-5 sm:px-8 ${
              isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            }`}
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className={`text-2xl font-black ${isCorrect ? "text-duo-green" : "text-duo-red"}`}>
                  {isCorrect ? "Correct!" : "Good try"}
                </h2>
                <p className="mt-1 font-bold text-slate-600">{currentQuestion.explanation}</p>
              </div>
              <Button variant={isCorrect ? "primary" : "danger"} className="sm:min-w-48" onClick={next}>
                {currentIndex === questions.length - 1 ? "Finish" : "Continue"}
              </Button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
