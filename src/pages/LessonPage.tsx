import {
  ArrowLeft,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  Highlighter,
  Lightbulb,
  ListChecks,
  NotebookPen,
  PencilLine,
  RotateCcw,
  Save,
  Sparkles,
  Trophy,
  WalletCards,
  Zap,
} from "lucide-react";
import { useMemo, useState, type DragEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { getLessonById, typeMeta } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { PracticeTask, StudyCompletion, StudySection } from "../types";

type MatchAnswers = Record<string, Record<string, string>>;

const illustrationIcons = {
  coins: Zap,
  chart: Trophy,
  notebook: BookOpen,
  shield: CheckCircle2,
  target: ListChecks,
  wallet: WalletCards,
};

const emptyStudyCompletion: StudyCompletion = {
  progress: 0,
  readSectionIds: [],
  completedPracticeIds: [],
  quizUnlocked: false,
};

function StudyIllustration({ section }: { section: StudySection }) {
  const Icon = illustrationIcons[section.illustration];

  return (
    <div className="grid min-h-32 place-items-center rounded-[1.5rem] border-2 border-green-100 bg-duo-soft p-4">
      <div className="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-white text-duo-green shadow-[0_6px_0_#bbf7d0]">
        <Icon className="h-10 w-10" />
      </div>
      <div className="mt-4 grid w-full grid-cols-3 gap-2">
        <span className="h-3 rounded-full bg-duo-green" />
        <span className="h-3 rounded-full bg-duo-yellow" />
        <span className="h-3 rounded-full bg-duo-blue" />
      </div>
    </div>
  );
}

function isPracticeCorrect(task: PracticeTask, value: string) {
  return (task.type === "multiple-choice" || task.type === "true-false") && value === task.correctAnswer;
}

export function LessonPage() {
  const navigate = useNavigate();
  const { lessonId = "" } = useParams();
  const lesson = getLessonById(lessonId);
  const TypeIcon = typeMeta[lesson.type].icon;
  const storedStudyCompletion = useFinovaStore((state) => state.studiedLessons[lesson.id]);
  const studyCompletion = storedStudyCompletion ?? emptyStudyCompletion;
  const markSectionRead = useFinovaStore((state) => state.markSectionRead);
  const completePracticeTask = useFinovaStore((state) => state.completePracticeTask);
  const completeStudyLesson = useFinovaStore((state) => state.completeStudyLesson);
  const createNote = useFinovaStore((state) => state.createNote);
  const toggleSavedLesson = useFinovaStore((state) => state.toggleSavedLesson);
  const isLessonSaved = useFinovaStore((state) => state.isLessonSaved(lesson.id));
  const [highlightedSections, setHighlightedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [matchAnswers, setMatchAnswers] = useState<MatchAnswers>({});
  const [dragOrders, setDragOrders] = useState<Record<string, string[]>>({});
  const [draggingItem, setDraggingItem] = useState("");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [assistantOutput, setAssistantOutput] = useState(
    "Use the study buttons whenever a concept feels fuzzy. The quiz stays locked until reading and practice are complete.",
  );

  const readCount = studyCompletion.readSectionIds.length;
  const practiceCount = studyCompletion.completedPracticeIds.length;
  const totalSections = lesson.study.sections.length;
  const totalPractice = lesson.study.practiceTasks.length;
  const quizUnlocked = studyCompletion.quizUnlocked;

  const firstNoteBody = useMemo(
    () =>
      [
        `# ${lesson.title}`,
        "",
        `Class: ${lesson.section}`,
        "",
        "## Summary",
        ...lesson.study.summary.map((line) => `- ${line}`),
        "",
        "## My notes",
        "- ",
      ].join("\n"),
    [lesson.section, lesson.study.summary, lesson.title],
  );

  const toggleHighlight = (sectionId: string) => {
    setHighlightedSections((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId],
    );
  };

  const saveSelectionToNotes = () => {
    const selection = window.getSelection()?.toString().trim();
    const body = selection
      ? `# Highlight from ${lesson.title}\n\n==${selection}==\n\nSource: ${lesson.chapter}`
      : firstNoteBody;

    createNote({
      title: selection ? `Highlight: ${lesson.title}` : `${lesson.title} study notes`,
      body,
      className: lesson.section,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
    });
    setAssistantOutput(selection ? "Saved the highlighted text to your notebook." : "Saved a starter note for this lesson.");
  };

  const openNotebook = () => {
    navigate(`/notebook?lesson=${lesson.id}`);
  };

  const runAssistant = (mode: "summary" | "simple" | "notes" | "flashcards" | "practice") => {
    if (mode === "summary") {
      setAssistantOutput(lesson.study.summary.join(" "));
      return;
    }

    if (mode === "simple") {
      setAssistantOutput(
        `${lesson.section} is about making one calmer money choice at a time. Start with the goal, notice what you give up, then choose a small safe action.`,
      );
      return;
    }

    if (mode === "notes") {
      createNote({
        title: `AI notes: ${lesson.title}`,
        body: firstNoteBody,
        className: lesson.section,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        favorite: true,
      });
      setAssistantOutput("Generated a clean study note and saved it to your notebook.");
      return;
    }

    if (mode === "flashcards") {
      setAssistantOutput(
        lesson.study.importantTerms
          .map((term) => `Front: What is ${term.term}? Back: ${term.explanation}`)
          .join("\n\n"),
      );
      return;
    }

    setPracticeAnswers({});
    setMatchAnswers({});
    setDragOrders({});
    setFeedback({});
    setAssistantOutput("Practice reset on this screen. Try the mini tasks again before the quiz.");
  };

  const answerChoice = (task: PracticeTask, answer: string) => {
    if (task.type !== "multiple-choice" && task.type !== "true-false") {
      return;
    }

    setPracticeAnswers((current) => ({ ...current, [task.id]: answer }));
    if (isPracticeCorrect(task, answer)) {
      completePracticeTask(lesson.id, task.id);
      setFeedback((current) => ({ ...current, [task.id]: task.explanation }));
    } else {
      setFeedback((current) => ({ ...current, [task.id]: "Close. Read the explanation above, then choose again." }));
    }
  };

  const updateMatchAnswer = (taskId: string, left: string, right: string) => {
    setMatchAnswers((current) => ({
      ...current,
      [taskId]: {
        ...(current[taskId] ?? {}),
        [left]: right,
      },
    }));
  };

  const checkMatchTask = (task: Extract<PracticeTask, { type: "match" }>) => {
    const answers = matchAnswers[task.id] ?? {};
    const correct = task.pairs.every((pair) => answers[pair.left] === pair.right);
    if (correct) {
      completePracticeTask(lesson.id, task.id);
      setFeedback((current) => ({ ...current, [task.id]: task.explanation }));
    } else {
      setFeedback((current) => ({ ...current, [task.id]: "One match is off. Compare each term with the simple meaning." }));
    }
  };

  const orderForTask = (task: Extract<PracticeTask, { type: "drag-order" }>) => dragOrders[task.id] ?? task.items;

  const handleDrop = (event: DragEvent<HTMLDivElement>, task: Extract<PracticeTask, { type: "drag-order" }>, targetItem: string) => {
    event.preventDefault();
    if (!draggingItem || draggingItem === targetItem) {
      return;
    }

    const currentOrder = orderForTask(task);
    const nextOrder = currentOrder.filter((item) => item !== draggingItem);
    nextOrder.splice(nextOrder.indexOf(targetItem), 0, draggingItem);
    setDragOrders((current) => ({ ...current, [task.id]: nextOrder }));
    setDraggingItem("");
  };

  const moveOrderItem = (task: Extract<PracticeTask, { type: "drag-order" }>, item: string, direction: -1 | 1) => {
    const currentOrder = orderForTask(task);
    const index = currentOrder.indexOf(item);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= currentOrder.length) {
      return;
    }

    const nextOrder = [...currentOrder];
    [nextOrder[index], nextOrder[targetIndex]] = [nextOrder[targetIndex], nextOrder[index]];
    setDragOrders((current) => ({ ...current, [task.id]: nextOrder }));
  };

  const checkOrderTask = (task: Extract<PracticeTask, { type: "drag-order" }>) => {
    const currentOrder = orderForTask(task);
    const correct = currentOrder.every((item, index) => item === task.correctOrder[index]);
    if (correct) {
      completePracticeTask(lesson.id, task.id);
      setFeedback((current) => ({ ...current, [task.id]: task.explanation }));
    } else {
      setFeedback((current) => ({ ...current, [task.id]: "The order is not quite there. Start with the goal." }));
    }
  };

  const continueToQuiz = () => {
    if (!quizUnlocked) {
      setAssistantOutput("Finish every study section and practice task first. Then the quiz unlocks.");
      return;
    }

    completeStudyLesson(lesson.id);
    navigate(`/quiz/${lesson.id}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex min-h-20 shrink-0 items-center gap-3 border-b-2 border-duo-gray px-4 py-3 sm:px-8">
        <button className="icon-button" onClick={() => navigate("/")} aria-label="Back to map">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-duo-green">{lesson.chapter}</p>
          <h1 className="truncate text-2xl font-black text-slate-800 sm:text-3xl">{lesson.title}</h1>
        </div>
        <div className="hidden items-center gap-2 rounded-2xl bg-yellow-50 px-4 py-2 text-sm font-black text-amber-600 sm:flex">
          <Zap className="h-5 w-5" />
          {lesson.xpReward} XP
        </div>
      </header>

      <main className="grid flex-1 gap-4 overflow-y-auto bg-duo-bg p-4 lg:grid-cols-[minmax(0,1fr)_23rem] lg:p-6">
        <section className="grid gap-4">
          <article className="duo-card overflow-hidden">
            <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-[1fr_17rem]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="duo-pill text-duo-green">
                    <BookMarked className="h-5 w-5" />
                    Study lesson
                  </span>
                  <span className="duo-pill text-slate-500">
                    <Clock3 className="h-5 w-5" />
                    {lesson.study.readingTimeMinutes} min read
                  </span>
                  <span className="duo-pill text-amber-500">
                    <Trophy className="h-5 w-5" />
                    Quiz locked until study
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-800 sm:text-5xl">{lesson.description}</h2>
                <p className="mt-3 max-w-3xl text-lg font-bold leading-8 text-slate-500">
                  Read the short explanations, save notes, finish the mini practice, then unlock the quiz. No random questions before the learning.
                </p>
                <div className="mt-5 max-w-xl">
                  <ProgressBar value={studyCompletion.progress} max={100} label="Study progress" />
                </div>
              </div>
              <div className="rounded-[1.7rem] border-2 border-green-100 bg-duo-soft p-4">
                <div className="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-duo-green text-white shadow-[0_7px_0_#12813b]">
                  <TypeIcon className="h-10 w-10" />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-duo-green">{typeMeta[lesson.type].label}</p>
                <p className="mt-1 text-xl font-black text-slate-800">{lesson.section}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Sections {readCount}/{totalSections} · Practice {practiceCount}/{totalPractice}
                </p>
              </div>
            </div>
          </article>

          <section className="grid gap-4">
            {lesson.study.sections.map((section, index) => {
              const isRead = studyCompletion.readSectionIds.includes(section.id);
              const isHighlighted = highlightedSections.includes(section.id);

              return (
                <article
                  key={section.id}
                  className={`duo-card grid gap-5 p-5 transition sm:p-6 xl:grid-cols-[12rem_1fr] ${
                    isHighlighted ? "border-yellow-200 bg-yellow-50" : ""
                  }`}
                >
                  <StudyIllustration section={section} />
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Study section {index + 1}</p>
                        <h3 className="mt-1 text-2xl font-black text-slate-800">{section.heading}</h3>
                      </div>
                      <button className="icon-button" onClick={() => toggleHighlight(section.id)} aria-label="Highlight section">
                        <Highlighter className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 rounded-[1.4rem] border-2 border-yellow-100 bg-yellow-50 p-4">
                      <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">Important concept</p>
                      <p className="mt-1 text-lg font-black leading-7 text-amber-900">{section.highlight}</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-lg font-bold leading-8 text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <Button
                      variant={isRead ? "secondary" : "primary"}
                      className="mt-5"
                      onClick={() => markSectionRead(lesson.id, section.id)}
                    >
                      {isRead ? "Section studied" : "Mark as studied"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <article className="duo-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-duo-green" />
                <div>
                  <p className="section-eyebrow">Key terms</p>
                  <h3 className="text-2xl font-black text-slate-800">Words to know</h3>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {lesson.study.importantTerms.map((term) => (
                  <div key={term.term} className="rounded-[1.4rem] border-2 border-duo-gray bg-white p-4">
                    <h4 className="text-lg font-black text-slate-800">{term.term}</h4>
                    <p className="mt-1 font-bold leading-7 text-slate-600">{term.explanation}</p>
                    <p className="mt-2 rounded-2xl bg-duo-soft px-3 py-2 text-sm font-black text-duo-green">Example: {term.example}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="duo-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-duo-yellow" />
                <div>
                  <p className="section-eyebrow">Examples</p>
                  <h3 className="text-2xl font-black text-slate-800">Use it in real life</h3>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {lesson.study.examples.map((example) => (
                  <div key={example.title} className="rounded-[1.4rem] border-2 border-yellow-100 bg-yellow-50 p-4">
                    <h4 className="text-lg font-black text-amber-900">{example.title}</h4>
                    <p className="mt-1 font-bold leading-7 text-amber-900">{example.setup}</p>
                    <p className="mt-2 text-sm font-black text-amber-700">{example.result}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="duo-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-eyebrow">Interactive practice</p>
                <h3 className="text-2xl font-black text-slate-800">Complete these before the quiz</h3>
              </div>
              <span className="reward-chip">
                <CheckCircle2 className="h-4 w-4" />
                {practiceCount}/{totalPractice} done
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              {lesson.study.practiceTasks.map((task) => {
                const isDone = studyCompletion.completedPracticeIds.includes(task.id);

                return (
                  <div key={task.id} className="rounded-[1.6rem] border-2 border-duo-gray bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full bg-duo-soft px-3 py-1 text-xs font-black uppercase text-duo-green">
                          {task.type.replace("-", " ")}
                        </span>
                        <h4 className="mt-3 text-xl font-black text-slate-800">{task.prompt}</h4>
                      </div>
                      {isDone && <CheckCircle2 className="h-7 w-7 text-duo-green" />}
                    </div>

                    {(task.type === "multiple-choice" || task.type === "true-false") && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {task.options.map((option) => {
                          const selected = practiceAnswers[task.id] === option;
                          const correct = selected && option === task.correctAnswer;
                          const wrong = selected && option !== task.correctAnswer;
                          return (
                            <button
                              key={option}
                              className={`rounded-2xl border-2 px-4 py-3 text-left font-black transition ${
                                correct
                                  ? "border-duo-green bg-green-50 text-duo-green"
                                  : wrong
                                    ? "border-duo-red bg-red-50 text-duo-red"
                                    : "border-duo-gray bg-white text-slate-600 hover:border-duo-green"
                              }`}
                              onClick={() => answerChoice(task, option)}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {task.type === "match" && (
                      <div className="mt-4 grid gap-3">
                        {task.pairs.map((pair) => (
                          <div key={pair.left} className="grid gap-2 rounded-2xl bg-slate-50 p-3 sm:grid-cols-[12rem_1fr] sm:items-center">
                            <span className="font-black text-slate-800">{pair.left}</span>
                            <select
                              className="rounded-2xl border-2 border-duo-gray bg-white px-3 py-2 font-bold text-slate-600"
                              value={matchAnswers[task.id]?.[pair.left] ?? ""}
                              onChange={(event) => updateMatchAnswer(task.id, pair.left, event.target.value)}
                            >
                              <option value="">Choose meaning</option>
                              {task.pairs.map((option) => (
                                <option key={option.right} value={option.right}>
                                  {option.right}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                        <Button variant="secondary" onClick={() => checkMatchTask(task)}>
                          Check matches
                        </Button>
                      </div>
                    )}

                    {task.type === "drag-order" && (
                      <div className="mt-4 grid gap-3">
                        {orderForTask(task).map((item, index) => (
                          <div
                            key={item}
                            draggable
                            onDragStart={() => setDraggingItem(item)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => handleDrop(event, task, item)}
                            className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-duo-gray bg-slate-50 p-3 font-black text-slate-700"
                          >
                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-duo-green">{index + 1}</span>
                            <span className="min-w-0 flex-1">{item}</span>
                            <span className="flex gap-2">
                              <button
                                className="rounded-xl border-2 border-duo-gray bg-white px-3 py-1 text-xs font-black text-slate-500 disabled:opacity-40"
                                disabled={index === 0}
                                onClick={() => moveOrderItem(task, item, -1)}
                              >
                                Up
                              </button>
                              <button
                                className="rounded-xl border-2 border-duo-gray bg-white px-3 py-1 text-xs font-black text-slate-500 disabled:opacity-40"
                                disabled={index === orderForTask(task).length - 1}
                                onClick={() => moveOrderItem(task, item, 1)}
                              >
                                Down
                              </button>
                            </span>
                          </div>
                        ))}
                        <Button variant="secondary" onClick={() => checkOrderTask(task)}>
                          Check order
                        </Button>
                      </div>
                    )}

                    {feedback[task.id] && <p className="mt-3 rounded-2xl bg-duo-soft px-4 py-3 font-bold text-duo-green">{feedback[task.id]}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <article className="duo-card p-5 sm:p-6">
              <p className="section-eyebrow">Mini exercises</p>
              <h3 className="text-2xl font-black text-slate-800">Tiny tasks for your notebook</h3>
              <div className="mt-4 grid gap-3">
                {lesson.study.miniExercises.map((exercise) => (
                  <div key={exercise} className="flex gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                    <PencilLine className="h-6 w-6 shrink-0 text-duo-green" />
                    <p className="font-bold leading-7 text-slate-600">{exercise}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border-2 border-yellow-100 bg-yellow-50 p-5 shadow-sm sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Summary card</p>
              <h3 className="mt-1 text-2xl font-black text-amber-950">What to remember</h3>
              <ul className="mt-4 space-y-3">
                {lesson.study.summary.map((line) => (
                  <li key={line} className="flex gap-3 font-black leading-7 text-amber-900">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-duo-green" />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </section>

        <aside className="grid content-start gap-4">
          <div className="duo-card p-5">
            <Mascot message={lesson.encouragement} />
          </div>

          <div className="duo-card p-5">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-duo-green" />
              <div>
                <p className="section-eyebrow">AI study assistant</p>
                <h3 className="text-xl font-black text-slate-800">Study tools</h3>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              <Button variant="secondary" onClick={() => runAssistant("summary")}>
                Summarize Lesson
              </Button>
              <Button variant="secondary" onClick={() => runAssistant("simple")}>
                Explain Simpler
              </Button>
              <Button variant="secondary" onClick={() => runAssistant("notes")}>
                Generate Notes
              </Button>
              <Button variant="secondary" onClick={() => runAssistant("flashcards")}>
                Create Flashcards
              </Button>
              <Button variant="yellow" onClick={() => runAssistant("practice")}>
                Practice Again
              </Button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-[1.4rem] bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-600">{assistantOutput}</pre>
          </div>

          <div className="duo-card p-5">
            <div className="flex items-center gap-3">
              <NotebookPen className="h-8 w-8 text-duo-green" />
              <div>
                <p className="section-eyebrow">Notebook</p>
                <h3 className="text-xl font-black text-slate-800">Save your thinking</h3>
              </div>
            </div>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-500">
              Highlight text with your cursor, save it to notes, or open the full Notion-style notebook for this lesson.
            </p>
            <div className="mt-4 grid gap-2">
              <Button variant="secondary" onClick={openNotebook}>
                <NotebookPen className="mr-2 inline h-5 w-5" />
                Open Notebook
              </Button>
              <Button variant="secondary" onClick={saveSelectionToNotes}>
                <Save className="mr-2 inline h-5 w-5" />
                Save to Notes
              </Button>
              <Button variant={isLessonSaved ? "yellow" : "secondary"} onClick={() => toggleSavedLesson(lesson.id)}>
                {isLessonSaved ? <BookmarkCheck className="mr-2 inline h-5 w-5" /> : <Bookmark className="mr-2 inline h-5 w-5" />}
                {isLessonSaved ? "Saved Lesson" : "Save Lesson"}
              </Button>
            </div>
          </div>

          <div className="duo-card p-5">
            <Sparkles className="h-8 w-8 text-duo-yellow" />
            <h3 className="mt-3 text-xl font-black text-slate-800">Quiz unlock</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              Finish all study sections and practice tasks. Then Continue opens the quiz and awards XP after completion.
            </p>
            <div className="mt-4">
              <ProgressBar value={studyCompletion.progress} max={100} />
            </div>
            <Button className="mt-4 w-full" disabled={!quizUnlocked} onClick={continueToQuiz}>
              {quizUnlocked ? "Continue to Quiz" : "Study First"}
            </Button>
            <Button variant="secondary" className="mt-3 w-full" onClick={() => runAssistant("practice")}>
              <RotateCcw className="mr-2 inline h-5 w-5" />
              Practice Again
            </Button>
          </div>
        </aside>
      </main>

      <footer className="shrink-0 border-t-2 border-duo-gray bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-black text-slate-500">
            Learning flow: map node to study lesson to practice to notes to quiz to XP reward to next node.
          </p>
          <Button className="w-full sm:w-auto sm:min-w-60" disabled={!quizUnlocked} onClick={continueToQuiz}>
            {quizUnlocked ? "Continue" : "Complete study first"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
