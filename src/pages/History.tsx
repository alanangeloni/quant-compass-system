
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";

const History = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-white">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-white">
            <div className="p-6 flex items-center justify-center h-96 bg-white">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trading History</h3>
                <p className="text-gray-600">View your past backtest runs and strategies</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default History;
