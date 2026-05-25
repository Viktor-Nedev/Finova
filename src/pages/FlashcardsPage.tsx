import { BookmarkCheck, Brain, RotateCcw, Search, Star, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { flashcards, learningClasses } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { SectionName } from "../types";

export function FlashcardsPage() {
  const [searchParams] = useSearchParams();
  const lessonFilter = searchParams.get("lesson");
  const difficultFlashcards = useFinovaStore((state) => state.difficultFlashcards);
  const toggleDifficultFlashcard = useFinovaStore((state) => state.toggleDifficultFlashcard);
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState<SectionName | "All">("All");
  const [onlyDifficult, setOnlyDifficult] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return flashcards.filter((card) => {
      const matchesLesson = !lessonFilter || card.lessonId === lessonFilter;
      const matchesClass = classFilter === "All" || card.className === classFilter;
      const matchesDifficulty = !onlyDifficult || difficultFlashcards.includes(card.id);
      const matchesSearch = !normalized || `${card.front} ${card.back}`.toLowerCase().includes(normalized);
      return matchesLesson && matchesClass && matchesDifficulty && matchesSearch;
    });
  }, [classFilter, difficultFlashcards, lessonFilter, onlyDifficult, query]);

  const activeCard = deck[index % Math.max(1, deck.length)];
  const difficult = activeCard ? difficultFlashcards.includes(activeCard.id) : false;

  const nextCard = () => {
    setFlipped(false);
    setIndex((current) => (deck.length ? (current + 1) % deck.length : 0));
  };

  return (
    <div className="space-y-4">
      <section className="duo-card grid gap-4 p-5 xl:grid-cols-[1fr_20rem]">
        <div>
          <p className="section-eyebrow">Flashcards</p>
          <h2 className="section-title">Review concepts by flipping cards</h2>
          <p className="mt-2 max-w-3xl font-bold leading-7 text-slate-500">
            Save difficult cards and practice weak topics until the ideas feel automatic.
          </p>
        </div>
        <div className="rounded-[1.6rem] border-2 border-green-100 bg-duo-soft p-4">
          <Brain className="h-8 w-8 text-duo-green" />
          <p className="mt-2 text-2xl font-black text-slate-800">{deck.length}</p>
          <p className="text-sm font-black text-slate-500">cards in this deck</p>
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[18rem_minmax(0,1fr)_18rem]">
        <aside className="duo-card grid content-start gap-3 p-4">
          <label className="flex items-center gap-2 rounded-2xl border-2 border-duo-gray bg-white px-3 py-2">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              className="min-w-0 flex-1 bg-transparent font-bold outline-none"
              aria-label="Search flashcards"
              placeholder="Search cards"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIndex(0);
              }}
            />
          </label>
          <select
            className="rounded-2xl border-2 border-duo-gray bg-white px-3 py-2 font-black text-slate-600"
            aria-label="Filter flashcards by class"
            value={classFilter}
            onChange={(event) => {
              setClassFilter(event.target.value as SectionName | "All");
              setIndex(0);
            }}
          >
            <option value="All">All classes</option>
            {learningClasses.map((learningClass) => (
              <option key={learningClass.id} value={learningClass.name}>
                {learningClass.name}
              </option>
            ))}
          </select>
          <button
            className={`rounded-2xl border-2 px-4 py-3 text-left font-black ${
              onlyDifficult ? "border-duo-green bg-duo-soft text-duo-green" : "border-duo-gray bg-white text-slate-600"
            }`}
            onClick={() => {
              setOnlyDifficult((current) => !current);
              setIndex(0);
            }}
          >
            Difficult only
          </button>
        </aside>

        <main className="duo-card grid min-h-[30rem] place-items-center p-5">
          {activeCard ? (
            <button
              className={`min-h-80 w-full max-w-2xl rounded-[2rem] border-2 p-8 text-center shadow-soft transition ${
                flipped ? "border-duo-green bg-duo-soft" : "border-duo-gray bg-white"
              }`}
              onClick={() => setFlipped((current) => !current)}
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-duo-green">{activeCard.className}</p>
              <h3 className="mt-8 text-3xl font-black leading-tight text-slate-800 sm:text-5xl">
                {flipped ? activeCard.back : activeCard.front}
              </h3>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.16em] text-slate-400">Click to flip</p>
            </button>
          ) : (
            <div className="text-center">
              <Trophy className="mx-auto h-12 w-12 text-duo-yellow" />
              <h3 className="mt-4 text-2xl font-black text-slate-800">No cards found</h3>
              <p className="mt-2 font-bold text-slate-500">Adjust the search or class filter.</p>
            </div>
          )}
        </main>

        <aside className="grid content-start gap-4">
          <section className="duo-card p-4">
            <p className="section-eyebrow">Card actions</p>
            <div className="mt-3 grid gap-2">
              <Button variant="secondary" disabled={!activeCard} onClick={() => setFlipped((current) => !current)}>
                <RotateCcw className="mr-2 inline h-5 w-5" />
                Flip card
              </Button>
              <Button variant={difficult ? "yellow" : "secondary"} disabled={!activeCard} onClick={() => activeCard && toggleDifficultFlashcard(activeCard.id)}>
                {difficult ? <BookmarkCheck className="mr-2 inline h-5 w-5" /> : <Star className="mr-2 inline h-5 w-5" />}
                {difficult ? "Saved difficult" : "Save difficult"}
              </Button>
              <Button disabled={!activeCard} onClick={nextCard}>
                Next card
              </Button>
            </div>
          </section>

          <section className="duo-card p-4">
            <p className="section-eyebrow">Weak topics</p>
            <p className="mt-2 text-3xl font-black text-slate-800">{difficultFlashcards.length}</p>
            <p className="text-sm font-bold leading-6 text-slate-500">Cards saved as difficult automatically feed the revision center.</p>
          </section>
        </aside>
      </section>
    </div>
  );
}
