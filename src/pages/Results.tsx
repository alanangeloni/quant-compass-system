
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  // Get backtest results from navigation state or use null
  const backtestResults = location.state?.results || null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-white">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-white">
            <ResultsDashboard results={backtestResults} />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Results;
