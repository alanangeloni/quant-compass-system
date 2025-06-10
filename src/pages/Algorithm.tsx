
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { StrategyBacktestEditor } from "@/components/StrategyBacktestEditor";
import { useNavigate } from "react-router-dom";

const Algorithm = () => {
  const [strategy, setStrategy] = useState("");
  const [backtestResults, setBacktestResults] = useState(null);
  const navigate = useNavigate();

  const handleNavigateToResults = () => {
    navigate("/results", { state: { results: backtestResults } });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-white">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-white">
            <StrategyBacktestEditor 
              onStrategyChange={setStrategy} 
              onBacktestComplete={setBacktestResults}
              onNavigateToResults={handleNavigateToResults}
            />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Algorithm;
