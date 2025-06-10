
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { ResultsDashboard } from "@/components/ResultsDashboard";

const Results = () => {
  // In a real app, you'd get this from state management or URL params
  const backtestResults = null;

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
