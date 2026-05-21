import { AIChatBox } from "../components/AIChatBox";

export function TutorPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.42fr]">
      <AIChatBox />
      <aside className="space-y-4">
        <div className="glass-card p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-violetnova/70">What AI returns</p>
          <div className="mt-5 space-y-3">
            {["Simple explanation", "Real life example", "Optional mini exercise", "Scam red flags"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 font-bold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-100/70">Safety note</p>
          <p className="mt-3 text-sm leading-6 text-amber-50/80">
            The scam detector is educational. Always verify financial messages through official apps, bank websites,
            or a trusted adult before paying or sharing details.
          </p>
        </div>
      </aside>
    </div>
  );
}
