import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { BadgesPage } from "./pages/BadgesPage";
import { ClassesPage } from "./pages/ClassesPage";
import { DailyMissionPage } from "./pages/DailyMissionPage";
import { GamesPage } from "./pages/GamesPage";
import { HelpPage } from "./pages/HelpPage";
import { LeaderboardsPage } from "./pages/LeaderboardsPage";
import { LessonCompletePage } from "./pages/LessonCompletePage";
import { LessonPage } from "./pages/LessonPage";
import { MapPage } from "./pages/MapPage";
import { NewsPage } from "./pages/NewsPage";
import { NotebookPage } from "./pages/NotebookPage";
import { ProgressPage } from "./pages/ProgressPage";
import { QuestsPage } from "./pages/QuestsPage";
import { QuizPage } from "./pages/QuizPage";
import { SettingsPage } from "./pages/SettingsPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import {
  DailyRevisionPage,
  FinanceDictionaryPage,
  PracticeArenaPage,
  RevisionCenterPage,
  SavedLessonsPage,
  StudyLibraryPage,
  WeakTopicsPage,
} from "./pages/StudyResourcePages";
import { TutorPage } from "./pages/TutorPage";
import { WalletPage } from "./pages/WalletPage";
import { useFinovaStore } from "./state/useFinovaStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MapPage /> },
      { path: "classes", element: <ClassesPage /> },
      { path: "quests", element: <QuestsPage /> },
      { path: "daily", element: <DailyMissionPage /> },
      { path: "games", element: <GamesPage /> },
      { path: "leaderboards", element: <LeaderboardsPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "badges", element: <BadgesPage /> },
      { path: "wallet", element: <WalletPage /> },
      { path: "tutor", element: <TutorPage /> },
      { path: "notebook", element: <NotebookPage /> },
      { path: "flashcards", element: <FlashcardsPage /> },
      { path: "revision", element: <RevisionCenterPage /> },
      { path: "study-library", element: <StudyLibraryPage /> },
      { path: "saved-lessons", element: <SavedLessonsPage /> },
      { path: "practice-arena", element: <PracticeArenaPage /> },
      { path: "weak-topics", element: <WeakTopicsPage /> },
      { path: "daily-revision", element: <DailyRevisionPage /> },
      { path: "dictionary", element: <FinanceDictionaryPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "help", element: <HelpPage /> },
      { path: "lesson/:lessonId", element: <LessonPage /> },
      { path: "quiz/:lessonId", element: <QuizPage /> },
      { path: "complete/:lessonId", element: <LessonCompletePage /> },
    ],
  },
]);

export default function App() {
  const checkIn = useFinovaStore((state) => state.checkIn);

  useEffect(() => {
    checkIn();
  }, [checkIn]);

  return <RouterProvider router={router} />;
}
