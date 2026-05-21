import { motion } from "framer-motion";
import { categories, lessons } from "../data/lessons";
import type { View } from "../types";

type LandingPageProps = {
  onNavigate: (view: View) => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-cyanova/30 bg-cyanova/10 px-4 py-2 text-sm font-black text-cyan-100 shadow-glow"
          >
            Duolingo-style learning for money
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 max-w-4xl font-display text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
          >
            Learn money skills through fast quests, AI coaching, and XP.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Finova helps students master budgeting, saving, investing basics, credit, debt, and scam awareness
            with short interactive lessons that feel more like a game than homework.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              className="rounded-2xl bg-cyanova px-7 py-4 font-black text-night shadow-glow transition hover:-translate-y-1 hover:bg-mintnova"
              onClick={() => onNavigate("learn")}
            >
              Start Learning
            </button>
            <button
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
              onClick={() => onNavigate("tutor")}
            >
              Ask AI Tutor
            </button>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            {[
              ["10 XP", "per lesson"],
              ["5-20 XP", "quiz bonus"],
              ["5 XP", "daily streak"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                <p className="font-display text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 140, damping: 18 }}
          className="relative"
        >
          <div className="absolute -left-10 -top-10 h-52 w-52 rounded-full bg-cyanova/20 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-violetnova/20 blur-3xl" />
          <div className="relative rounded-[2.4rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-night/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Today quest</p>
                  <h2 className="mt-2 font-display text-3xl font-black text-white">Budget Blueprint</h2>
                </div>
                <span className="rounded-full bg-mintnova px-3 py-1 text-xs font-black text-night">+15 XP</span>
              </div>

              <div className="mt-6 space-y-3">
                {["Learn the 50/30/20 rule", "Answer 5 AI questions", "Keep your streak alive"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyanova/15 font-black text-cyanova">
                      {index + 1}
                    </span>
                    <span className="font-bold text-slate-200">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-r from-cyanova/20 to-violetnova/20 p-4">
                <div className="flex justify-between text-sm font-bold text-slate-200">
                  <span>Level progress</span>
                  <span>Beginner</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-night/70">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyanova to-mintnova" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category} className="glass-card p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-cyanova/70">{category}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {lessons.filter((lesson) => lesson.category === category).length} bite-sized lessons with quizzes.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
