
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { StrategyEditor } from "@/components/StrategyEditor";
import { BacktestRunner } from "@/components/BacktestRunner";
import { ResultsDashboard } from "@/components/ResultsDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [strategy, setStrategy] = useState("");
  const [backtestResults, setBacktestResults] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "strategy":
        return <StrategyEditor onStrategyChange={setStrategy} />;
      case "backtest":
        return <BacktestRunner onBacktestComplete={setBacktestResults} />;
      case "results":
        return <ResultsDashboard results={backtestResults} />;
      case "history":
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-trading-text mb-2">Trading History</h3>
              <p className="text-trading-muted">View your past backtest runs and strategies</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-trading-text mb-2">Settings</h3>
              <p className="text-trading-muted">Configure your trading preferences and data sources</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-trading-bg">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 overflow-auto">
            <div className="p-4 border-b border-trading-accent/20">
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
