
import { useState } from "react";
import {
  Home,
  Code,
  BarChart,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeTab, onTabChange, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "strategy", icon: Code, label: "Algorithm & Backtest" },
    { id: "results", icon: BarChart, label: "Results" },
    { id: "history", icon: Clock, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Trading Platform</h1>
            <p className="text-sm text-gray-600">Manage your trading strategies</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
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
                    : "text-gray-700",
                  isCollapsed && "px-4 justify-center"
                )}
                onClick={() => onTabChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-4 h-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-gray-200">
        {!isCollapsed && (
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} My Company
          </p>
        )}
      </div>
    </div>
  );
};
