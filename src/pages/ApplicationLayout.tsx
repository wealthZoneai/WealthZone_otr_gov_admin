import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./home";
import TopNavBar from "./TopNavBar";
import JobNotification from "./JobNotifications/JobNotifications";
import AdmitCard from "./AdmitCard/AdmitCard";
import CustomizationForm from "./Helpcard/CustomerForm";
import Examcenter from "./Examcenters/Examcenter";

const Settings = () => <div className="p-8 text-xl">Settings Page</div>;

const ApplicationLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10">
          <TopNavBar />
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="notifications" element={<JobNotification />} />
            <Route path="admit-card" element={<AdmitCard />} />
            <Route path="Helpcard" element={<CustomizationForm />} />
            <Route path="Exam-Centers" element={<Examcenter />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ApplicationLayout;
