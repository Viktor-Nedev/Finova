import {
  Bookmark,
  Clock3,
  FileText,
  Highlighter,
  List,
  NotebookPen,
  Pin,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Type,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { getLessonById, learningClasses } from "../data/lessons";
import { useFinovaStore } from "../state/useFinovaStore";
import type { NotebookNote, SectionName } from "../types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function renderInline(text: string) {
  const parts = text.split(/(==[^=]+==)/g);
  return parts.map((part, index) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark key={`${part}-${index}`} className="rounded-md bg-yellow-200 px-1 font-black text-amber-950">
          {part.slice(2, -2)}
        </mark>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function MarkdownPreview({ body }: { body: string }) {
  const lines = body.split("\n");

  return (
    <div className="space-y-2 rounded-[1.5rem] border-2 border-duo-gray bg-white p-4">
      {lines.map((line, index) => {
        const key = `${line}-${index}`;

        if (line.startsWith("# ")) {
          return (
            <h1 key={key} className="text-2xl font-black text-slate-800">
              {renderInline(line.slice(2))}
            </h1>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h2 key={key} className="pt-2 text-xl font-black text-slate-800">
              {renderInline(line.slice(3))}
            </h2>
          );
        }

        if (line.startsWith("- ")) {
          return (
            <p key={key} className="flex gap-2 font-bold leading-7 text-slate-600">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-duo-green" />
              <span>{renderInline(line.slice(2))}</span>
            </p>
          );
        }

        return (
          <p key={key} className="min-h-4 font-bold leading-7 text-slate-600">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

function NoteCard({ note, active, onOpen }: { note: NotebookNote; active: boolean; onOpen: () => void }) {
  return (
    <button
      className={`w-full rounded-[1.4rem] border-2 p-4 text-left transition hover:border-duo-green ${
        active ? "border-duo-green bg-duo-soft" : "border-duo-gray bg-white"
      }`}
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-slate-800">{note.title}</h3>
          <p className="mt-1 truncate text-sm font-bold text-slate-500">{note.lessonTitle ?? note.className}</p>
        </div>
        <div className="flex shrink-0 gap-1 text-duo-green">
          {note.pinned && <Pin className="h-4 w-4" />}
          {note.favorite && <Star className="h-4 w-4 fill-duo-yellow text-duo-yellow" />}
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-slate-500">{note.body.replace(/[#=*_-]/g, " ")}</p>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-400">Edited {formatDate(note.updatedAt)}</p>
    </button>
  );
}

export function NotebookPage() {
  const [searchParams] = useSearchParams();
  const notes = useFinovaStore((state) => state.notes);
  const createNote = useFinovaStore((state) => state.createNote);
  const updateNote = useFinovaStore((state) => state.updateNote);
  const deleteNote = useFinovaStore((state) => state.deleteNote);
  const togglePinNote = useFinovaStore((state) => state.togglePinNote);
  const toggleFavoriteNote = useFinovaStore((state) => state.toggleFavoriteNote);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState<SectionName | "All">("All");
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const lessonId = searchParams.get("lesson");
    if (!lessonId) {
      return;
    }

    const lesson = getLessonById(lessonId);
    const existing = notes.find((note) => note.lessonId === lesson.id);
    if (existing) {
      setSelectedId(existing.id);
      return;
    }

    const noteId = createNote({
      title: `${lesson.title} notes`,
      body: [`# ${lesson.title}`, "", `Class: ${lesson.section}`, "", "## Key ideas", ...lesson.study.summary.map((line) => `- ${line}`), "", "## My notes", "- "].join(
        "\n",
      ),
      className: lesson.section,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      pinned: true,
    });
    setSelectedId(noteId);
  }, [createNote, notes, searchParams]);

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return notes
      .filter((note) => classFilter === "All" || note.className === classFilter)
      .filter((note) => !normalized || `${note.title} ${note.body} ${note.lessonTitle ?? ""}`.toLowerCase().includes(normalized))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [classFilter, notes, query]);

  const activeNote = notes.find((note) => note.id === selectedId) ?? filteredNotes[0] ?? notes[0];
  const pinnedNotes = notes.filter((note) => note.pinned).slice(0, 4);
  const recentNotes = [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4);

  const makeNote = () => {
    const id = createNote({
      title: "Untitled finance note",
      body: "# Untitled finance note\n\n- ",
      className: "Basics",
    });
    setSelectedId(id);
  };

  const insertMarkdown = (kind: "title" | "bullet" | "highlight") => {
    if (!activeNote || !editorRef.current) {
      return;
    }

    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = activeNote.body.slice(start, end);
    const insertions = {
      title: `\n## ${selected || "Section title"}\n`,
      bullet: `\n- ${selected || "New bullet"}\n`,
      highlight: `==${selected || "important idea"}==`,
    };
    const nextBody = `${activeNote.body.slice(0, start)}${insertions[kind]}${activeNote.body.slice(end)}`;
    updateNote(activeNote.id, { body: nextBody });
    requestAnimationFrame(() => editorRef.current?.focus());
  };

  const generateStudyNotes = () => {
    if (!activeNote) {
      return;
    }

    updateNote(activeNote.id, {
      body: `${activeNote.body}\n\n## AI study notes\n- Main idea: explain the concept in simple words.\n- Example: connect it to a real purchase, saving goal, or bill.\n- Revision question: what would I do differently next time?\n`,
      favorite: true,
    });
  };

  return (
    <div className="grid min-h-full gap-4 2xl:grid-cols-[21rem_minmax(0,1fr)_18rem]">
      <aside className="duo-card grid content-start gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-eyebrow">Notebook</p>
            <h2 className="text-2xl font-black text-slate-800">Study notes</h2>
          </div>
          <Button className="px-4 py-2" onClick={makeNote} aria-label="Create note">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <label className="flex items-center gap-2 rounded-2xl border-2 border-duo-gray bg-white px-3 py-2">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent font-bold text-slate-700 outline-none"
            aria-label="Search notes"
            placeholder="Search notes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <select
          className="rounded-2xl border-2 border-duo-gray bg-white px-3 py-2 font-black text-slate-600"
          aria-label="Filter notes by class"
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

        <div className="grid max-h-[calc(100vh-20rem)] gap-2 overflow-y-auto pr-1">
          {filteredNotes.length === 0 ? (
            <div className="rounded-[1.4rem] bg-duo-soft p-4 text-sm font-black text-duo-green">No notes match this search.</div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} active={activeNote?.id === note.id} onOpen={() => setSelectedId(note.id)} />
            ))
          )}
        </div>
      </aside>

      <main className="duo-card overflow-hidden">
        {activeNote ? (
          <div className="grid h-full min-h-[calc(100vh-7rem)] grid-rows-[auto_minmax(0,1fr)]">
            <header className="border-b-2 border-duo-gray p-4">
              <input
                className="w-full rounded-2xl border-2 border-transparent bg-transparent px-2 py-1 text-3xl font-black text-slate-800 outline-none focus:border-duo-green"
                value={activeNote.title}
                onChange={(event) => updateNote(activeNote.id, { title: event.target.value })}
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="duo-pill text-duo-green">
                  <NotebookPen className="h-5 w-5" />
                  Auto saved
                </span>
                <span className="duo-pill text-slate-500">
                  <Clock3 className="h-5 w-5" />
                  Edited {formatDate(activeNote.updatedAt)}
                </span>
                {activeNote.lessonTitle && (
                  <span className="duo-pill text-amber-500">
                    <Bookmark className="h-5 w-5" />
                    {activeNote.lessonTitle}
                  </span>
                )}
              </div>
            </header>

            <section className="grid min-h-0 gap-4 overflow-y-auto bg-duo-bg p-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" className="px-4 py-2" onClick={() => insertMarkdown("title")}>
                    <Type className="mr-2 inline h-5 w-5" />
                    Title
                  </Button>
                  <Button variant="secondary" className="px-4 py-2" onClick={() => insertMarkdown("bullet")}>
                    <List className="mr-2 inline h-5 w-5" />
                    Bullet
                  </Button>
                  <Button variant="secondary" className="px-4 py-2" onClick={() => insertMarkdown("highlight")}>
                    <Highlighter className="mr-2 inline h-5 w-5" />
                    Highlight
                  </Button>
                </div>
                <textarea
                  ref={editorRef}
                  className="min-h-96 resize-none rounded-[1.5rem] border-2 border-duo-gray bg-white p-4 font-mono text-sm font-bold leading-7 text-slate-700 outline-none focus:border-duo-green"
                  value={activeNote.body}
                  onChange={(event) => updateNote(activeNote.id, { body: event.target.value })}
                />
              </div>
              <div className="min-h-0 overflow-y-auto">
                <MarkdownPreview body={activeNote.body} />
              </div>
            </section>
          </div>
        ) : (
          <div className="grid min-h-[32rem] place-items-center p-8 text-center">
            <div>
              <NotebookPen className="mx-auto h-12 w-12 text-duo-green" />
              <h2 className="mt-4 text-2xl font-black text-slate-800">Create your first note</h2>
              <Button className="mt-5" onClick={makeNote}>
                New note
              </Button>
            </div>
          </div>
        )}
      </main>

      <aside className="grid content-start gap-4">
        <section className="duo-card p-4">
          <p className="section-eyebrow">Note tools</p>
          <div className="mt-3 grid gap-2">
            <Button variant="secondary" disabled={!activeNote} onClick={() => activeNote && togglePinNote(activeNote.id)}>
              <Pin className="mr-2 inline h-5 w-5" />
              {activeNote?.pinned ? "Unpin note" : "Pin note"}
            </Button>
            <Button variant="secondary" disabled={!activeNote} onClick={() => activeNote && toggleFavoriteNote(activeNote.id)}>
              <Star className="mr-2 inline h-5 w-5" />
              {activeNote?.favorite ? "Unfavorite" : "Favorite"}
            </Button>
            <Button variant="yellow" disabled={!activeNote} onClick={generateStudyNotes}>
              <Sparkles className="mr-2 inline h-5 w-5" />
              Generate Notes
            </Button>
            <Button
              variant="danger"
              disabled={!activeNote}
              onClick={() => {
                if (activeNote) {
                  deleteNote(activeNote.id);
                  setSelectedId("");
                }
              }}
            >
              <Trash2 className="mr-2 inline h-5 w-5" />
              Delete
            </Button>
          </div>
        </section>

        <section className="duo-card p-4">
          <p className="section-eyebrow">Pinned notes</p>
          <div className="mt-3 grid gap-2">
            {pinnedNotes.length ? (
              pinnedNotes.map((note) => (
                <button key={note.id} className="rounded-2xl bg-duo-soft p-3 text-left font-black text-slate-700" onClick={() => setSelectedId(note.id)}>
                  {note.title}
                </button>
              ))
            ) : (
              <p className="text-sm font-bold text-slate-500">Pin important notes to keep them here.</p>
            )}
          </div>
        </section>

        <section className="duo-card p-4">
          <p className="section-eyebrow">Recently edited</p>
          <div className="mt-3 grid gap-2">
            {recentNotes.map((note) => (
              <button key={note.id} className="rounded-2xl border-2 border-duo-gray bg-white p-3 text-left" onClick={() => setSelectedId(note.id)}>
                <FileText className="h-5 w-5 text-duo-green" />
                <p className="mt-1 font-black text-slate-800">{note.title}</p>
                <p className="text-xs font-bold text-slate-500">{formatDate(note.updatedAt)}</p>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
