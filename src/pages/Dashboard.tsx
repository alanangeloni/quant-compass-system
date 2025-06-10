
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard as DashboardComponent } from "@/components/Dashboard";

const Dashboard = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-white">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-white">
            <DashboardComponent />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
