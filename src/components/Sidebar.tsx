
import { BarChart3, Code2, TrendingUp, Settings, Play, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3 },
  { id: "strategy", name: "Strategy", icon: Code2 },
  { id: "backtest", name: "Backtest", icon: Play },
  { id: "results", name: "Results", icon: TrendingUp },
  { id: "history", name: "History", icon: History },
  { id: "settings", name: "Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-trading-surface border-r border-trading-accent/20 h-screen flex flex-col">
      <div className="p-6 border-b border-trading-accent/20">
        <h1 className="text-xl font-bold text-trading-accent">QuantBacktest</h1>
        <p className="text-sm text-trading-muted mt-1">Professional Trading Backtester</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                activeTab === item.id
                  ? "bg-trading-accent text-white"
                  : "text-trading-muted hover:text-trading-text hover:bg-trading-accent/10"
              )}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-trading-accent/20">
        <div className="bg-trading-accent/10 rounded-md p-3">
          <div className="text-xs text-trading-muted mb-1">Portfolio Value</div>
          <div className="text-lg font-bold text-trading-success">$125,847.92</div>
          <div className="text-xs text-trading-success">+5.84% Today</div>
        </div>
      </div>
    </div>
  );
};
