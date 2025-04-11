"use client";

import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import CategoryTabs from "../_components/CategoryTabs";
import DashboardStats from "../_components/DashboardStats";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <CategoryTabs />
          <div className="p-6">
            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  );
}