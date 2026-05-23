import { Bell, Lock, Moon, UserRound } from "lucide-react";

export function SettingsPage() {
  const settings = [
    { icon: UserRound, title: "Profile", description: "Update name, avatar, and student level." },
    { icon: Bell, title: "Notifications", description: "Streak reminders, quest alerts, and weekly reports." },
    { icon: Lock, title: "Privacy", description: "Manage data, Supabase profile sync, and leaderboard visibility." },
    { icon: Moon, title: "Theme", description: "Light playful mode is locked for this Duolingo-inspired build." },
  ];

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Settings</p>
        <h2 className="section-title">Tune your Finova account</h2>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="duo-card p-5">
              <Icon className="h-9 w-9 text-duo-green" />
              <h3 className="mt-4 text-2xl font-black text-slate-800">{item.title}</h3>
              <p className="mt-2 font-bold text-slate-500">{item.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
