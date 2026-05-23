import { Outlet, useLocation } from "react-router-dom";
import { LeftSidebar } from "./LeftSidebar";
import { MobileNav } from "./MobileNav";
import { RightPanel } from "./RightPanel";
import { TopHeader } from "./TopHeader";

const immersiveRoutes = ["/lesson", "/quiz", "/complete"];

export function AppLayout() {
  const location = useLocation();
  const isImmersive = immersiveRoutes.some((route) => location.pathname.startsWith(route));

  if (isImmersive) {
    return (
      <div className="min-h-screen bg-duo-bg text-duo-ink">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-duo-bg text-duo-ink lg:grid lg:grid-cols-[18rem_minmax(0,1fr)_22rem] xl:grid-cols-[19rem_minmax(0,1fr)_24rem]">
      <LeftSidebar />
      <section className="flex h-screen min-w-0 flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto px-3 pb-24 pt-3 sm:px-5 sm:pb-6 lg:px-6">
          <Outlet />
        </main>
      </section>
      <RightPanel />
      <MobileNav />
    </div>
  );
}
