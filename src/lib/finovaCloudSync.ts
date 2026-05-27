import { loadFinovaCloudState, saveFinovaCloudState } from "./finovaCloud";
import { isSupabaseConfigured } from "./supabase";
import { type FinovaCloudState, type FinovaStore, useFinovaStore } from "../state/useFinovaStore";

const SYNC_DEBOUNCE_MS = 900;

let unsubscribe: (() => void) | undefined;
let saveTimer: ReturnType<typeof setTimeout> | undefined;
let saving = false;
let pendingSave = false;
let hydrating = false;

const syncKeys: (keyof FinovaCloudState)[] = [
  "xp",
  "coins",
  "profile",
  "completedLessons",
  "studiedLessons",
  "quizResults",
  "notes",
  "savedLessons",
  "difficultFlashcards",
  "playedGames",
  "bookmarkedNews",
  "walletTransactions",
  "savingGoals",
  "aiMessages",
  "streak",
  "xpHistory",
];

export function selectFinovaCloudState(state: FinovaStore): FinovaCloudState {
  return {
    xp: state.xp,
    coins: state.coins,
    profile: state.profile,
    completedLessons: state.completedLessons,
    studiedLessons: state.studiedLessons,
    quizResults: state.quizResults,
    notes: state.notes,
    savedLessons: state.savedLessons,
    difficultFlashcards: state.difficultFlashcards,
    playedGames: state.playedGames,
    bookmarkedNews: state.bookmarkedNews,
    walletTransactions: state.walletTransactions,
    savingGoals: state.savingGoals,
    aiMessages: state.aiMessages,
    streak: state.streak,
    xpHistory: state.xpHistory,
  };
}

function didCloudStateChange(state: FinovaStore, previousState: FinovaStore) {
  return syncKeys.some((key) => state[key] !== previousState[key]);
}

function queueCloudSave() {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }

  saveTimer = setTimeout(() => {
    void pushCloudState();
  }, SYNC_DEBOUNCE_MS);
}

async function pushCloudState() {
  const state = useFinovaStore.getState();

  if (!state.cloudHydrated || state.cloudSyncPaused || !state.cloudSyncUserId) {
    return;
  }

  if (saving) {
    pendingSave = true;
    return;
  }

  saving = true;
  pendingSave = false;
  state.setCloudSyncMeta({ cloudSyncStatus: "saving", cloudSyncError: "" });

  const result = await saveFinovaCloudState(state.cloudSyncUserId, selectFinovaCloudState(useFinovaStore.getState()));

  if (result.ok) {
    useFinovaStore.getState().setCloudSyncMeta({
      cloudSyncStatus: "synced",
      cloudLastSyncedAt: new Date().toISOString(),
      cloudSyncError: "",
    });
  } else {
    useFinovaStore.getState().setCloudSyncMeta({
      cloudSyncStatus: "error",
      cloudSyncError: result.reason,
    });
  }

  saving = false;

  if (pendingSave) {
    queueCloudSave();
  }
}

async function hydrateCloudState() {
  hydrating = true;
  const store = useFinovaStore.getState();

  if (!isSupabaseConfigured) {
    store.setCloudSyncMeta({
      cloudSyncStatus: "offline",
      cloudSyncError: "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY",
      cloudHydrated: true,
      cloudSyncPaused: true,
    });
    hydrating = false;
    return;
  }

  store.setCloudSyncMeta({ cloudSyncStatus: "connecting", cloudSyncError: "", cloudSyncPaused: true });
  const result = await loadFinovaCloudState();

  if (!result.ok) {
    useFinovaStore.getState().setCloudSyncMeta({
      cloudSyncStatus: "error",
      cloudSyncError: result.reason,
      cloudHydrated: true,
      cloudSyncPaused: true,
    });
    hydrating = false;
    return;
  }

  if (result.state) {
    useFinovaStore.getState().replaceCloudState(result.state, result.user.id);
  } else {
    useFinovaStore.getState().setCloudSyncMeta({
      cloudSyncStatus: "synced",
      cloudSyncUserId: result.user.id,
      cloudHydrated: true,
      cloudSyncPaused: false,
      cloudLastSyncedAt: new Date().toISOString(),
    });
    queueCloudSave();
  }

  hydrating = false;
}

export function startFinovaCloudSync() {
  if (unsubscribe) {
    return;
  }

  void hydrateCloudState();

  unsubscribe = useFinovaStore.subscribe((state, previousState) => {
    if (hydrating || !state.cloudHydrated || state.cloudSyncPaused || !didCloudStateChange(state, previousState)) {
      return;
    }

    queueCloudSave();
  });
}

export function stopFinovaCloudSync() {
  unsubscribe?.();
  unsubscribe = undefined;

  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = undefined;
  }
}
