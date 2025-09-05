import { useState } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { EventsPage } from "./components/EventsPage";
import { VideoCallPage } from "./components/VideoCallPage";
import { DashboardPage } from "./components/DashboardPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case "events":
        return <EventsPage />;
      case "video":
        return <VideoCallPage />;
      case "dashboard":
        return <DashboardPage />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </div>
  );
}