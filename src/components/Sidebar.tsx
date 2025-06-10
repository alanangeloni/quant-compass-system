
import { BarChart3, Code2, TrendingUp, Settings, Play, History } from "lucide-react";
import { cn } from "@/lib/utils";
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
  useSidebar,
} from "@/components/ui/sidebar";

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
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
            <h1 className="text-xl font-bold text-blue-600">QuantBacktest</h1>
            <p className="text-sm text-gray-600 mt-1">Professional Trading Backtester</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
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
                      className={cn(
                        "hover:bg-gray-100 text-gray-700",
                        activeTab === item.id && "bg-blue-100 text-blue-800 border border-blue-200"
                      )}
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
      
      <SidebarFooter className="p-4 border-t border-gray-200 bg-white">
        <div className={cn("bg-gray-50 border border-gray-200 rounded-md p-3 transition-all", state === "collapsed" && "p-2")}>
          <div className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
            <div className="text-xs text-gray-600 mb-1">Portfolio Value</div>
            <div className="text-lg font-bold text-green-600">$125,847.92</div>
            <div className="text-xs text-green-600">+5.84% Today</div>
          </div>
          <div className={cn("transition-opacity", state === "expanded" && "opacity-0 absolute")}>
            <div className="text-xs font-bold text-green-600 text-center">$125K</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebarContent as Sidebar };
