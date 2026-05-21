import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { TopBar } from "./components/TopBar";
import { getLessonById, getNextLessonId, lessons } from "./data/lessons";
import { LearnPage } from "./pages/LearnPage";
import { LessonCompletePage } from "./pages/LessonCompletePage";
import { LessonPage } from "./pages/LessonPage";
import { MapPage } from "./pages/MapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProgressPage } from "./pages/ProgressPage";
import { QuizPage } from "./pages/QuizPage";
import { ReviewPage } from "./pages/ReviewPage";
import { TutorPage } from "./pages/TutorPage";
import { useFinovaStore } from "./state/useFinovaStore";
import type { View } from "./types";

const topLevelViews: View[] = ["map", "learn", "review", "progress", "profile", "tutor"];

export default function App() {
  const checkIn = useFinovaStore((state) => state.checkIn);
  const getCurrentLessonId = useFinovaStore((state) => state.getCurrentLessonId);
  const [activeView, setActiveView] = useState<View>("map");
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [lastSummary, setLastSummary] = useState({ xp: 0, coins: 0, score: 0, total: 5 });

  useEffect(() => {
    checkIn();
  }, [checkIn]);

  const navigate = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCurrentLesson = () => {
    openLesson(getCurrentLessonId());
  };

  const activeLesson = getLessonById(activeLessonId);
  const showGlobalChrome = topLevelViews.includes(activeView);

  const goNextLesson = () => {
    const nextLessonId = getNextLessonId(activeLessonId);
    if (nextLessonId) {
      openLesson(nextLessonId);
      return;
    }

    navigate("map");
  };

  return (
    <div className="min-h-screen bg-duo-sky text-slate-800">
      {showGlobalChrome && <TopBar onNavigate={navigate} />}

      <main>
        {activeView === "map" && <MapPage onOpenLesson={openLesson} onNavigate={navigate} />}
        {activeView === "learn" && <LearnPage onOpenLesson={openLesson} />}
        {activeView === "review" && <ReviewPage onOpenLesson={openLesson} />}
        {activeView === "progress" && <ProgressPage />}
        {activeView === "profile" && <ProfilePage />}
        {activeView === "tutor" && <TutorPage />}
        {activeView === "lesson" && (
          <LessonPage lesson={activeLesson} onNavigate={navigate} onStartQuiz={() => setActiveView("quiz")} />
        )}
        {activeView === "quiz" && (
          <QuizPage
            lesson={activeLesson}
            onNavigate={navigate}
            onComplete={(summary) => {
              setLastSummary(summary);
              setActiveView("complete");
            }}
          />
        )}
        {activeView === "complete" && (
          <LessonCompletePage
            lesson={activeLesson}
            summary={lastSummary}
            onNavigate={navigate}
            onNextLesson={goNextLesson}
          />
        )}
      </main>

      {showGlobalChrome && <BottomNav activeView={activeView} onNavigate={navigate} />}

      {activeView === "map" && (
        <button
          className="fixed bottom-24 right-4 z-30 rounded-full bg-duo-green px-5 py-4 text-sm font-black text-white shadow-duo transition hover:bg-duo-green-dark md:bottom-6"
          onClick={startCurrentLesson}
        >
          Start lesson
        </button>
      )}
    </div>
  );
}
