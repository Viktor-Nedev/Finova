import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Brain,
  Dumbbell,
  Flame,
  Layers3,
  Library,
  ListChecks,
  RotateCcw,
  Search,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { financeDictionary, flashcards, learningClasses, lessons } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { Lesson, SectionName, StudyCompletion } from "../types";

const emptyStudyCompletion: StudyCompletion = {
  progress: 0,
  readSectionIds: [],
  completedPracticeIds: [],
  quizUnlocked: false,
};

function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
}) {
  return (
    <section className="duo-card grid gap-4 p-5 xl:grid-cols-[1fr_16rem]">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="mt-2 max-w-3xl font-bold leading-7 text-slate-500">{description}</p>
      </div>
      <div className="grid place-items-center rounded-[1.6rem] border-2 border-green-100 bg-duo-soft p-4">
        <Icon className="h-12 w-12 text-duo-green" />
      </div>
    </section>
  );
}

function LessonStudyCard({ lesson, action = "Study lesson" }: { lesson: Lesson; action?: string }) {
  const navigate = useNavigate();
  const storedStudy = useFinovaStore((state) => state.studiedLessons[lesson.id]);
  const study = storedStudy ?? emptyStudyCompletion;
  const completed = useFinovaStore((state) => state.completedLessons.includes(lesson.id));
  const saved = useFinovaStore((state) => state.isLessonSaved(lesson.id));
  const toggleSavedLesson = useFinovaStore((state) => state.toggleSavedLesson);

  return (
    <article className="rounded-[1.7rem] border-2 border-duo-gray bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-duo-green">{lesson.section}</p>
          <h3 className="mt-1 text-xl font-black leading-tight text-slate-800">{lesson.title}</h3>
        </div>
        <button className="icon-button shrink-0" onClick={() => toggleSavedLesson(lesson.id)} aria-label="Save lesson">
          {saved ? <BookmarkCheck className="h-5 w-5 text-duo-green" /> : <Bookmark className="h-5 w-5" />}
        </button>
      </div>
      <p className="mt-3 min-h-12 text-sm font-bold leading-6 text-slate-500">{lesson.study.summary[0]}</p>
      <div className="mt-4">
        <ProgressBar value={study.progress} max={100} label={completed ? "Completed" : study.quizUnlocked ? "Quiz unlocked" : "Study progress"} />
      </div>
      <Button className="mt-4 w-full" variant={study.quizUnlocked ? "primary" : "secondary"} onClick={() => navigate(`/lesson/${lesson.id}`)}>
        {action}
        <ArrowRight className="ml-2 inline h-5 w-5" />
      </Button>
    </article>
  );
}

function useWeakLessons() {
  const quizResults = useFinovaStore((state) => state.quizResults);
  return lessons.filter((lesson) => {
    const result = quizResults[lesson.id];
    return result && result.total > 0 && result.score / result.total < 0.8;
  });
}

function ClassFilter({
  query,
  setQuery,
  classFilter,
  setClassFilter,
}: {
  query: string;
  setQuery: (value: string) => void;
  classFilter: SectionName | "All";
  setClassFilter: (value: SectionName | "All") => void;
}) {
  return (
    <div className="duo-card grid gap-3 p-4 md:grid-cols-[1fr_16rem]">
      <label className="flex items-center gap-2 rounded-2xl border-2 border-duo-gray bg-white px-3 py-2">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          className="min-w-0 flex-1 bg-transparent font-bold text-slate-700 outline-none"
          aria-label="Search lessons"
          placeholder="Search lessons"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <select
        className="rounded-2xl border-2 border-duo-gray bg-white px-3 py-2 font-black text-slate-600"
        aria-label="Filter by class"
        value={classFilter}
        onChange={(event) => setClassFilter(event.target.value as SectionName | "All")}
      >
        <option value="All">All classes</option>
        {learningClasses.map((learningClass) => (
          <option key={learningClass.id} value={learningClass.name}>
            {learningClass.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StudyLibraryPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState<SectionName | "All">("All");
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const filteredLessons = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return lessons.filter((lesson) => {
      const matchesClass = classFilter === "All" || lesson.section === classFilter;
      const matchesSearch = !normalized || `${lesson.title} ${lesson.section} ${lesson.study.summary.join(" ")}`.toLowerCase().includes(normalized);
      return matchesClass && matchesSearch;
    });
  }, [classFilter, query]);

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Study library"
        title="Every finance lesson in one place"
        description="Browse the complete study book by class. Open any lesson to read first, practice, take notes, and then unlock the quiz."
        icon={Library}
      />
      <ClassFilter query={query} setQuery={setQuery} classFilter={classFilter} setClassFilter={setClassFilter} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredLessons.slice(0, 48).map((lesson) => (
          <LessonStudyCard key={lesson.id} lesson={lesson} action={completedLessons.includes(lesson.id) ? "Review lesson" : "Study lesson"} />
        ))}
      </section>
    </div>
  );
}

export function SavedLessonsPage() {
  const savedLessons = useFinovaStore((state) => state.savedLessons);
  const saved = lessons.filter((lesson) => savedLessons.includes(lesson.id));

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Saved lessons"
        title="Your bookmarked study shelf"
        description="Keep important lessons close for notes, revision, and flashcard practice."
        icon={BookmarkCheck}
      />
      {saved.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saved.map((lesson) => (
            <LessonStudyCard key={lesson.id} lesson={lesson} action="Open saved lesson" />
          ))}
        </section>
      ) : (
        <section className="duo-card p-8 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-duo-green" />
          <h3 className="mt-4 text-2xl font-black text-slate-800">No saved lessons yet</h3>
          <p className="mt-2 font-bold text-slate-500">Use Save Lesson inside a study page to build this shelf.</p>
        </section>
      )}
    </div>
  );
}

export function RevisionCenterPage() {
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const quizResults = useFinovaStore((state) => state.quizResults);
  const difficultFlashcards = useFinovaStore((state) => state.difficultFlashcards);
  const weakLessons = useWeakLessons();
  const recentCompleted = lessons.filter((lesson) => completedLessons.includes(lesson.id)).slice(-6).reverse();
  const suggested = weakLessons.length ? weakLessons : recentCompleted.length ? recentCompleted : lessons.slice(0, 6);
  const wrongAnswers = Object.values(quizResults).reduce((total, result) => total + Math.max(0, result.total - result.score), 0);

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Revision center"
        title="Fix weak spots before they grow"
        description="Finova tracks low quiz scores, wrong answers, and difficult flashcards, then suggests lessons and practice."
        icon={RotateCcw}
      />

      <section className="grid gap-3 md:grid-cols-3">
        {[
          { label: "Weak lessons", value: weakLessons.length, icon: Target, tone: "bg-red-50 text-duo-red" },
          { label: "Wrong answers", value: wrongAnswers, icon: ListChecks, tone: "bg-yellow-50 text-amber-600" },
          { label: "Difficult cards", value: difficultFlashcards.length, icon: Brain, tone: "bg-green-50 text-duo-green" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`rounded-[1.7rem] border-2 border-duo-gray p-5 ${stat.tone}`}>
              <Icon className="h-8 w-8" />
              <p className="mt-3 text-3xl font-black text-slate-800">{stat.value}</p>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </section>

      <section className="duo-card p-5">
        <p className="section-eyebrow">Suggested revision</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {suggested.map((lesson) => (
            <LessonStudyCard key={lesson.id} lesson={lesson} action="Revise lesson" />
          ))}
        </div>
      </section>
    </div>
  );
}

export function PracticeArenaPage() {
  const navigate = useNavigate();
  const practiceLessons = lessons.filter((lesson) => lesson.study.practiceTasks.length > 0).slice(0, 18);

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Practice arena"
        title="Mini tasks before high-stakes quizzes"
        description="Practice multiple choice, true/false, matching, and drag-order finance tasks without jumping straight into a quiz."
        icon={Dumbbell}
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {practiceLessons.map((lesson) => (
          <article key={lesson.id} className="duo-card p-5">
            <p className="section-eyebrow">{lesson.section}</p>
            <h3 className="mt-1 text-2xl font-black text-slate-800">{lesson.title}</h3>
            <p className="mt-2 min-h-14 font-bold leading-7 text-slate-500">{lesson.study.miniExercises[0]}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {lesson.study.practiceTasks.slice(0, 4).map((task) => (
                <span key={task.id} className="rounded-2xl bg-duo-soft px-3 py-2 text-center text-xs font-black uppercase text-duo-green">
                  {task.type.replace("-", " ")}
                </span>
              ))}
            </div>
            <Button className="mt-5 w-full" onClick={() => navigate(`/lesson/${lesson.id}`)}>
              Practice this lesson
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
}

export function WeakTopicsPage() {
  const weakLessons = useWeakLessons();
  const difficultFlashcards = useFinovaStore((state) => state.difficultFlashcards);
  const difficultCards = flashcards.filter((card) => difficultFlashcards.includes(card.id));

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Weak topics"
        title="The concepts that need another pass"
        description="Low quiz scores and saved difficult flashcards appear here for focused repair."
        icon={Target}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_22rem]">
        <div className="duo-card p-5">
          <p className="section-eyebrow">Low quiz scores</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {(weakLessons.length ? weakLessons : lessons.slice(0, 4)).map((lesson) => (
              <LessonStudyCard key={lesson.id} lesson={lesson} action={weakLessons.length ? "Repair topic" : "Start learning"} />
            ))}
          </div>
        </div>
        <aside className="duo-card p-5">
          <p className="section-eyebrow">Difficult flashcards</p>
          <div className="mt-4 grid gap-3">
            {difficultCards.length ? (
              difficultCards.slice(0, 8).map((card) => (
                <div key={card.id} className="rounded-2xl bg-duo-soft p-3">
                  <p className="font-black text-slate-800">{card.front}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{card.className}</p>
                </div>
              ))
            ) : (
              <p className="font-bold leading-7 text-slate-500">Save difficult cards from Flashcards to build a weak-topic queue.</p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}

export function DailyRevisionPage() {
  const weakLessons = useWeakLessons();
  const completedLessons = useFinovaStore((state) => state.completedLessons);
  const difficultFlashcards = useFinovaStore((state) => state.difficultFlashcards);
  const dailyLessons = (weakLessons.length ? weakLessons : lessons.filter((lesson) => completedLessons.includes(lesson.id))).slice(0, 3);
  const fallbackLessons = dailyLessons.length ? dailyLessons : lessons.slice(0, 3);

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Daily revision"
        title="A small plan for today"
        description="Review one lesson, flip weak flashcards, and complete extra practice before moving forward."
        icon={Flame}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          { title: "Revise", detail: "Reread one study lesson", icon: BookOpen, value: `${fallbackLessons.length} lessons` },
          { title: "Flashcards", detail: "Flip difficult concepts", icon: Brain, value: `${Math.max(4, difficultFlashcards.length)} cards` },
          { title: "Practice", detail: "Finish mini tasks before quizzes", icon: Dumbbell, value: "10 minutes" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="duo-card p-5">
              <Icon className="h-9 w-9 text-duo-green" />
              <h3 className="mt-3 text-2xl font-black text-slate-800">{item.title}</h3>
              <p className="mt-1 font-bold text-slate-500">{item.detail}</p>
              <p className="mt-3 reward-chip">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="duo-card p-5">
        <p className="section-eyebrow">Today&apos;s lessons</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {fallbackLessons.map((lesson) => (
            <LessonStudyCard key={lesson.id} lesson={lesson} action="Revise today" />
          ))}
        </div>
      </section>
    </div>
  );
}

export function FinanceDictionaryPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState<SectionName | "All">("All");
  const filteredTerms = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return financeDictionary.filter((term) => {
      const matchesClass = classFilter === "All" || term.className === classFilter;
      const matchesSearch = !normalized || `${term.term} ${term.explanation} ${term.example}`.toLowerCase().includes(normalized);
      return matchesClass && matchesSearch;
    });
  }, [classFilter, query]);

  return (
    <div className="space-y-4">
      <PageHero
        eyebrow="Finance dictionary"
        title="Simple meanings for money words"
        description="Beginner-friendly terms with icons and real-life examples, ready for quick revision."
        icon={Layers3}
      />
      <ClassFilter query={query} setQuery={setQuery} classFilter={classFilter} setClassFilter={setClassFilter} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTerms.map((term) => {
          const Icon = term.icon;
          return (
            <article key={term.id} className="duo-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-duo-soft text-duo-green">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-duo-green">{term.className}</p>
                  <h3 className="text-2xl font-black text-slate-800">{term.term}</h3>
                </div>
              </div>
              <p className="mt-4 font-bold leading-7 text-slate-600">{term.explanation}</p>
              <p className="mt-4 rounded-[1.3rem] bg-yellow-50 p-3 font-black leading-6 text-amber-900">Example: {term.example}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export function LearnPage() {
  return <StudyLibraryPage />;
}
