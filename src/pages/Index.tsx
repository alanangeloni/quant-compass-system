
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { StrategyBacktestEditor } from "@/components/StrategyBacktestEditor";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [strategy, setStrategy] = useState("");
  const [backtestResults, setBacktestResults] = useState(null);

  const handleNavigateToResults = () => {
    setActiveTab("results");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "strategy":
        return (
          <StrategyBacktestEditor 
            onStrategyChange={setStrategy} 
            onBacktestComplete={setBacktestResults}
            onNavigateToResults={handleNavigateToResults}
          />
        );
      case "results":
        return <ResultsDashboard results={backtestResults} />;
      case "history":
        return (
          <div className="p-6 flex items-center justify-center h-96 bg-white">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trading History</h3>
              <p className="text-gray-600">View your past backtest runs and strategies</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 flex items-center justify-center h-96 bg-white">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Configure your trading preferences and data sources</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-white">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 overflow-auto bg-white">
            <div className="p-4 border-b border-gray-200 bg-white">
              <SheetTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </button>
              </SheetTrigger>
            </div>
            {renderContent()}
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
