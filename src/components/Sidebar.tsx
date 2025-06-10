
import { BarChart3, Code2, TrendingUp, Settings, Play, History, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
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

function AppSidebarContent({ activeTab, onTabChange }: AppSidebarProps) {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-trading-accent/20">
      <SidebarHeader className="p-6 border-b border-trading-accent/20">
        <div className="flex items-center justify-between">
          <div className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
            <h1 className="text-xl font-bold text-trading-accent">QuantBacktest</h1>
            <p className="text-sm text-trading-muted mt-1">Professional Trading Backtester</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.id)}
                      isActive={activeTab === item.id}
                      tooltip={item.name}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-trading-accent/20">
        <div className={cn("bg-trading-accent/10 rounded-md p-3 transition-all", state === "collapsed" && "p-2")}>
          <div className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
            <div className="text-xs text-trading-muted mb-1">Portfolio Value</div>
            <div className="text-lg font-bold text-trading-success">$125,847.92</div>
            <div className="text-xs text-trading-success">+5.84% Today</div>
          </div>
          <div className={cn("transition-opacity", state === "expanded" && "opacity-0 absolute")}>
            <div className="text-xs font-bold text-trading-success text-center">$125K</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebarContent as Sidebar };
