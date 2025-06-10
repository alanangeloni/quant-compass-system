
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Code,
  BarChart,
  Clock,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "strategy", icon: Code, label: "Algorithm & Backtest" },
    { id: "results", icon: BarChart, label: "Results" },
    { id: "history", icon: Clock, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-64 p-0 border-r bg-white">
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <SheetTitle className="text-lg font-semibold text-gray-900">Trading Platform</SheetTitle>
            <SheetDescription className="text-gray-600">
              Manage your trading strategies and backtests.
            </SheetDescription>
          </div>

          <nav className="flex-1 py-4">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={cn(
                      "flex items-center w-full px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-100",
                      activeTab === item.id
                        ? "bg-gray-100 text-blue-600"
                        : "text-gray-700"
                    )}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} My Company
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
