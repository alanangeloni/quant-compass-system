
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { StrategyBacktestEditor } from "@/components/StrategyBacktestEditor";
import { ResultsDashboard } from "@/components/ResultsDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("strategy");
  const [backtestResults, setBacktestResults] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "strategy":
        return <StrategyBacktestEditor onBacktestComplete={setBacktestResults} />;
      case "results":
        return <ResultsDashboard results={backtestResults} />;
      case "history":
        return (
          <div className="p-6 flex items-center justify-center h-96 bg-trading-bg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-trading-text mb-2">Trading History</h3>
              <p className="text-trading-muted">View your past backtest runs and strategies</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 flex items-center justify-center h-96 bg-trading-bg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-trading-text mb-2">Settings</h3>
              <p className="text-trading-muted">Configure your trading preferences and data sources</p>
            </div>
          </div>
        );
      default:
        return <StrategyBacktestEditor onBacktestComplete={setBacktestResults} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-trading-bg">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 overflow-auto">
            <div className="p-4 border-b border-trading-border bg-trading-surface">
              <SidebarTrigger />
            </div>
            {renderContent()}
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
