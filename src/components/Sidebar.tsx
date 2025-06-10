import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Code2,
  BarChart3,
  Clock,
  Settings,
  Menu,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "strategy", label: "Algorithm & Backtest", icon: Code2 },
    { id: "results", label: "Results", icon: BarChart3 },
    { id: "history", label: "History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-6 w-80">
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 text-lg font-bold text-trading-text">
              Trading Platform
            </div>
            <div className="flex-1 py-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "justify-start px-4 py-2 w-full font-normal text-trading-text hover:bg-accent hover:text-accent-foreground",
                        activeTab === item.id && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsSidebarOpen(false); // Close sidebar after tab change
                      }}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-trading-border text-center text-trading-muted text-xs">
              © {new Date().getFullYear()} Your Company
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex flex-col w-64 border-r border-trading-border bg-trading-surface">
        <div className="px-4 py-2 text-lg font-bold text-trading-text">
          Trading Platform
        </div>
        <div className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start px-4 py-2 w-full font-normal text-trading-text hover:bg-accent hover:text-accent-foreground",
                    activeTab === item.id && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-trading-border text-center text-trading-muted text-xs">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>
    </>
  );
};
