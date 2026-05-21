import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { getLessonById } from "./data/lessons";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { LearnPage } from "./pages/LearnPage";
import { LessonPage } from "./pages/LessonPage";
import { ProgressPage } from "./pages/ProgressPage";
import { TutorPage } from "./pages/TutorPage";
import { FinovaProvider, useFinova } from "./state/FinovaContext";
import type { View } from "./types";

function AppShell() {
  const [activeView, setActiveView] = useState<View>("landing");
  const [activeLessonId, setActiveLessonId] = useState("budget-blueprint");
  const { state } = useFinova();

  const navigate = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeLesson = getLessonById(activeLessonId);
  const showSidebar = activeView !== "landing";

  return (
    <div className="min-h-screen overflow-x-hidden bg-night text-slate-100">
      <div className="aurora" />
      <Navbar activeView={activeView} xp={state.xp} onNavigate={navigate} />
      {showSidebar && <Sidebar activeView={activeView} onNavigate={navigate} />}

      <main className={showSidebar ? "mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8 xl:pl-72" : ""}>
        {activeView === "landing" && <LandingPage onNavigate={navigate} />}
        {activeView === "dashboard" && <DashboardPage onNavigate={navigate} onOpenLesson={openLesson} />}
        {activeView === "learn" && <LearnPage onOpenLesson={openLesson} />}
        {activeView === "lesson" && <LessonPage lesson={activeLesson} onNavigate={navigate} />}
        {activeView === "tutor" && <TutorPage />}
        {activeView === "progress" && <ProgressPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FinovaProvider>
      <AppShell />
    </FinovaProvider>
  );
}
