import { Bot, HelpCircle, LifeBuoy, MessageCircleQuestion } from "lucide-react";
import { Button } from "../components/Button";

export function HelpPage() {
  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Help & Support</p>
        <h2 className="section-title">Get unstuck fast</h2>
        <p className="mt-2 font-bold text-slate-500">Support content is designed for students and hackathon demo walkthroughs.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { icon: MessageCircleQuestion, title: "How lessons unlock", description: "Complete the current node to open the next node below it." },
          { icon: Bot, title: "AI Tutor help", description: "Ask for simple explanations, examples, tips, and mini quizzes." },
          { icon: LifeBuoy, title: "Account support", description: "Supabase auth and database tables are ready for production wiring." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="duo-card p-5">
              <Icon className="h-10 w-10 text-duo-green" />
              <h3 className="mt-4 text-2xl font-black text-slate-800">{item.title}</h3>
              <p className="mt-2 font-bold text-slate-500">{item.description}</p>
              <Button variant="secondary" className="mt-5 w-full">
                Learn more
              </Button>
            </article>
          );
        })}
      </section>
      <section className="rounded-[2rem] border-2 border-yellow-100 bg-yellow-50 p-5">
        <HelpCircle className="h-10 w-10 text-amber-500" />
        <h3 className="mt-3 text-2xl font-black text-slate-800">Demo note</h3>
        <p className="mt-2 font-bold text-slate-600">
          The app works locally with mock data and AI fallbacks. Add Supabase and OpenAI keys to activate live AI.
        </p>
      </section>
    </div>
  );
}
