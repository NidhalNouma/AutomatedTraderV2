import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from ".";
import {
  AutomateDashboard,
  AlertPlaygroundPage,
  DashboardOverview,
  TradeHistoryPage,
  SystemStatusPage,
  ChartsHubPage,
} from "../components";

interface DashboardLayoutProps {
  defaultTab?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  defaultTab = "dashboard",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActiveTab} />;
      case "automate":
        return <AutomateDashboard />;
      case "playground":
        return <AlertPlaygroundPage />;
      case "trades":
        return <TradeHistoryPage />;
      case "status":
        return <SystemStatusPage />;
      case "charts":
        return <ChartsHubPage />;
      case "docs":
        return (
          <div className="min-h-screen bg-[#0a0a0a] text-white p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Documentation
            </h1>
            <p className="text-gray-400">Coming Soon</p>
          </div>
        );
      case "rent-space":
        return (
          <div className="min-h-screen bg-[#0a0a0a] text-white p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Rent Ad Space
            </h1>
            <p className="text-gray-400">Coming Soon</p>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-[#0a0a0a] text-white p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Coming Soon</h1>
            <p className="text-gray-400">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-white font-semibold">AutomatedTrader</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      <div className="lg:ml-64 pt-16 lg:pt-0">{renderContent()}</div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
