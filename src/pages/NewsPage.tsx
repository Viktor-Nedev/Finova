import { Bookmark, Clock3, Newspaper } from "lucide-react";
import { newsItems } from "../data/lessons";

export function NewsPage() {
  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">News</p>
        <h2 className="section-title">Finance stories for students</h2>
        <p className="mt-2 font-bold text-slate-500">Short, beginner-friendly reads that connect the money map to the real world.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <article key={item.id} className="duo-card overflow-hidden">
            <div className="h-36 p-4" style={{ background: item.thumbnail }}>
              <div className="flex justify-between">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700">{item.category}</span>
                <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white/90 text-duo-green" aria-label={`Bookmark ${item.title}`}>
                  <Bookmark className={`h-5 w-5 ${item.bookmarked ? "fill-duo-green" : ""}`} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                <Newspaper className="h-4 w-4" />
                Finova Brief
              </div>
              <h3 className="mt-3 text-2xl font-black leading-tight text-slate-800">{item.title}</h3>
              <p className="mt-2 min-h-12 text-sm font-bold leading-6 text-slate-500">{item.summary}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-black text-duo-green">
                <Clock3 className="h-4 w-4" />
                {item.readTime}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
