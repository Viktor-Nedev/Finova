import { Bell, Cloud, Eye, Lock, UserRound } from "lucide-react";
import { useFinovaStore } from "../state/useFinovaStore";
import type { Difficulty } from "../types";

export function SettingsPage() {
  const profile = useFinovaStore((state) => state.profile);
  const cloudStatus = useFinovaStore((state) => state.cloudSyncStatus);
  const cloudError = useFinovaStore((state) => state.cloudSyncError);
  const cloudLastSyncedAt = useFinovaStore((state) => state.cloudLastSyncedAt);
  const cloudUserId = useFinovaStore((state) => state.cloudSyncUserId);
  const updateProfile = useFinovaStore((state) => state.updateProfile);

  return (
    <div className="space-y-4">
      <section className="duo-card p-5">
        <p className="section-eyebrow">Settings</p>
        <h2 className="section-title">Tune your Finova account</h2>
        <p className="mt-2 font-bold text-slate-500">These settings are stored in the app state and synced to Supabase when configured.</p>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[1fr_22rem]">
        <div className="duo-card p-5">
          <div className="flex items-center gap-3">
            <UserRound className="h-9 w-9 text-duo-green" />
            <div>
              <p className="section-eyebrow">Profile</p>
              <h3 className="text-2xl font-black text-slate-800">Student identity</h3>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_8rem_12rem]">
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-500">Display name</span>
              <input
                className="rounded-2xl border-2 border-duo-gray px-4 py-3 font-bold text-slate-700 outline-none focus:border-duo-green"
                value={profile.displayName}
                onChange={(event) => updateProfile({ displayName: event.target.value })}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-500">Avatar</span>
              <input
                className="rounded-2xl border-2 border-duo-gray px-4 py-3 font-bold text-slate-700 outline-none focus:border-duo-green"
                value={profile.avatar}
                maxLength={2}
                onChange={(event) => updateProfile({ avatar: event.target.value })}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-500">Student level</span>
              <select
                className="rounded-2xl border-2 border-duo-gray px-4 py-3 font-black text-slate-700 outline-none focus:border-duo-green"
                value={profile.studentLevel}
                onChange={(event) => updateProfile({ studentLevel: event.target.value as Difficulty })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          </div>
        </div>

        <aside className="duo-card p-5">
          <Cloud className="h-9 w-9 text-duo-green" />
          <p className="mt-4 section-eyebrow">Supabase sync</p>
          <h3 className="text-2xl font-black text-slate-800">{cloudStatus}</h3>
          <p className="mt-2 break-all text-sm font-bold leading-6 text-slate-500">
            {cloudError || (cloudUserId ? `User: ${cloudUserId}` : "Waiting for Supabase configuration")}
          </p>
          {cloudLastSyncedAt && (
            <p className="mt-3 rounded-2xl bg-duo-soft px-3 py-2 text-sm font-black text-duo-green">
              Last sync: {new Date(cloudLastSyncedAt).toLocaleString()}
            </p>
          )}
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="duo-card p-5">
          <Bell className="h-9 w-9 text-duo-green" />
          <h3 className="mt-4 text-2xl font-black text-slate-800">Notifications</h3>
          <p className="mt-2 font-bold text-slate-500">Streak reminders, quest alerts, and weekly reports.</p>
          <label className="mt-4 flex items-center justify-between rounded-2xl bg-duo-soft p-4 font-black text-slate-700">
            Enabled
            <input
              type="checkbox"
              checked={profile.notificationsEnabled}
              onChange={(event) => updateProfile({ notificationsEnabled: event.target.checked })}
              className="h-5 w-5 accent-duo-green"
            />
          </label>
        </article>

        <article className="duo-card p-5">
          <Eye className="h-9 w-9 text-duo-green" />
          <h3 className="mt-4 text-2xl font-black text-slate-800">Leaderboard visibility</h3>
          <p className="mt-2 font-bold text-slate-500">Choose whether your synced profile can appear in league views.</p>
          <label className="mt-4 flex items-center justify-between rounded-2xl bg-duo-soft p-4 font-black text-slate-700">
            Visible
            <input
              type="checkbox"
              checked={profile.leaderboardVisible}
              onChange={(event) => updateProfile({ leaderboardVisible: event.target.checked })}
              className="h-5 w-5 accent-duo-green"
            />
          </label>
        </article>

        <article className="duo-card p-5 md:col-span-2">
          <Lock className="h-9 w-9 text-duo-green" />
          <h3 className="mt-4 text-2xl font-black text-slate-800">Privacy</h3>
          <p className="mt-2 font-bold text-slate-500">
            Supabase Row Level Security keeps each user&apos;s notes, quiz results, wallet simulator, and progress scoped to their authenticated account.
          </p>
        </article>
      </section>
    </div>
  );
}
