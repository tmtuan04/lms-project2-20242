import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import CategoryTabs from "../_components/CategoryTabs";
import MainContent from "../_components/MainContent";

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
          <MainContent />
        </div>
      </div>
    </div>
  );
}