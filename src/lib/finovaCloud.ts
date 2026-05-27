import type { User } from "@supabase/supabase-js";
import type { FinovaCloudState } from "../state/useFinovaStore";
import type { AiChatMessage } from "../types";
import { isSupabaseConfigured, supabase } from "./supabase";

type CloudLoadResult =
  | { ok: true; user: User; state: Partial<FinovaCloudState> | null }
  | { ok: false; reason: string };

type CloudSaveResult = { ok: true } | { ok: false; reason: string };

async function ensureSupabaseUser(): Promise<User | null> {
  if (!supabase) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return session.user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw error;
  }

  return data.user;
}

function hasRemoteState(value: unknown): value is Partial<FinovaCloudState> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export async function loadFinovaCloudState(): Promise<CloudLoadResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, reason: "Supabase env vars are not configured" };
  }

  try {
    const user = await ensureSupabaseUser();
    if (!user) {
      return { ok: false, reason: "No Supabase user session" };
    }

    const { data, error } = await supabase
      .from("finova_user_state")
      .select("app_state")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return {
      ok: true,
      user,
      state: hasRemoteState(data?.app_state) ? data.app_state : null,
    };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "Could not load Supabase state" };
  }
}

async function replaceRows(table: string, userId: string, rows: Record<string, unknown>[]) {
  if (!supabase) {
    return;
  }

  const deleteResult = await supabase.from(table).delete().eq("user_id", userId);
  if (deleteResult.error) {
    throw deleteResult.error;
  }

  if (rows.length === 0) {
    return;
  }

  const insertResult = await supabase.from(table).insert(rows);
  if (insertResult.error) {
    throw insertResult.error;
  }
}

function aiMessageRow(userId: string, message: AiChatMessage) {
  return {
    id: message.id,
    user_id: userId,
    mode: message.mode,
    role: message.role,
    content: message.content,
    created_at: message.createdAt,
  };
}

export async function saveFinovaCloudState(userId: string, state: FinovaCloudState): Promise<CloudSaveResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, reason: "Supabase env vars are not configured" };
  }

  try {
    const profileResult = await supabase.from("finova_profiles").upsert(
      {
        user_id: userId,
        display_name: state.profile.displayName,
        avatar: state.profile.avatar,
        student_level: state.profile.studentLevel,
        xp: state.xp,
        coins: state.coins,
        streak_count: state.streak.count,
        notifications_enabled: state.profile.notificationsEnabled,
        leaderboard_visible: state.profile.leaderboardVisible,
      },
      { onConflict: "user_id" },
    );

    if (profileResult.error) {
      throw profileResult.error;
    }

    const stateResult = await supabase.from("finova_user_state").upsert(
      {
        user_id: userId,
        state_version: 1,
        app_state: state,
      },
      { onConflict: "user_id" },
    );

    if (stateResult.error) {
      throw stateResult.error;
    }

    await Promise.all([
      replaceRows(
        "finova_study_progress",
        userId,
        Object.entries(state.studiedLessons).map(([lessonId, progress]) => ({
          user_id: userId,
          lesson_id: lessonId,
          progress: progress.progress,
          read_section_ids: progress.readSectionIds,
          completed_practice_ids: progress.completedPracticeIds,
          quiz_unlocked: progress.quizUnlocked,
          completed_at: progress.completedAt ?? null,
        })),
      ),
      replaceRows(
        "finova_quiz_results",
        userId,
        Object.entries(state.quizResults).map(([lessonId, result]) => ({
          user_id: userId,
          lesson_id: lessonId,
          score: result.score,
          total: result.total,
          quiz_xp: result.quizXp,
          completed_at: result.completedAt,
        })),
      ),
      replaceRows(
        "finova_notes",
        userId,
        state.notes.map((note) => ({
          id: note.id,
          user_id: userId,
          title: note.title,
          body: note.body,
          class_name: note.className,
          lesson_id: note.lessonId ?? null,
          lesson_title: note.lessonTitle ?? null,
          pinned: note.pinned,
          favorite: note.favorite,
          created_at: note.createdAt,
          updated_at: note.updatedAt,
        })),
      ),
      replaceRows(
        "finova_saved_lessons",
        userId,
        state.savedLessons.map((lessonId) => ({
          user_id: userId,
          lesson_id: lessonId,
        })),
      ),
      replaceRows(
        "finova_difficult_flashcards",
        userId,
        state.difficultFlashcards.map((cardId) => ({
          user_id: userId,
          card_id: cardId,
        })),
      ),
      replaceRows(
        "finova_played_games",
        userId,
        state.playedGames.map((gameId) => ({
          user_id: userId,
          game_id: gameId,
        })),
      ),
      replaceRows(
        "finova_bookmarked_news",
        userId,
        state.bookmarkedNews.map((newsId) => ({
          user_id: userId,
          news_id: newsId,
        })),
      ),
      replaceRows(
        "finova_xp_events",
        userId,
        state.xpHistory.map((event) => ({
          id: event.id,
          user_id: userId,
          event_date: event.date,
          reason: event.reason,
          amount: event.amount,
          total_xp: event.totalXp,
        })),
      ),
      replaceRows(
        "finova_wallet_transactions",
        userId,
        state.walletTransactions.map((transaction) => ({
          id: transaction.id,
          user_id: userId,
          label: transaction.label,
          category: transaction.category,
          amount: transaction.amount,
          transaction_type: transaction.type,
        })),
      ),
      replaceRows(
        "finova_saving_goals",
        userId,
        state.savingGoals.map((goal) => ({
          id: goal.id,
          user_id: userId,
          title: goal.title,
          current_amount: goal.current,
          target_amount: goal.target,
          color: goal.color,
        })),
      ),
      replaceRows(
        "finova_ai_messages",
        userId,
        state.aiMessages.filter((message) => message.id !== "welcome").map((message) => aiMessageRow(userId, message)),
      ),
    ]);

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "Could not save Supabase state" };
  }
}
