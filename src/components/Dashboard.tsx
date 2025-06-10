
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export const Dashboard = () => {
  const metrics = [
    {
      title: "Portfolio Value",
      value: "$125,847.92",
      change: "+5.84%",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Total Return",
      value: "23.67%",
      change: "+2.14%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Sharpe Ratio",
      value: "1.82",
      change: "+0.12",
      positive: true,
      icon: Target,
    },
    {
      title: "Max Drawdown",
      value: "-8.42%",
      change: "-1.23%",
      positive: false,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-trading-text mb-2">Trading Dashboard</h2>
        <p className="text-trading-muted">Monitor your backtesting performance and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-trading-surface border-trading-accent/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-trading-muted">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-trading-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-text mb-1">
                  {metric.value}
                </div>
                <p className={`text-xs ${
                  metric.positive ? "text-trading-success" : "text-trading-danger"
                }`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { symbol: "AAPL", shares: 100, price: "$178.92", pnl: "+$2,340.50", positive: true },
                { symbol: "GOOGL", shares: 50, price: "$135.42", pnl: "-$567.23", positive: false },
                { symbol: "MSFT", shares: 75, price: "$378.55", pnl: "+$1,234.67", positive: true },
              ].map((position, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-trading-bg rounded-md">
                  <div>
                    <div className="font-bold text-trading-text">{position.symbol}</div>
                    <div className="text-sm text-trading-muted">{position.shares} shares @ {position.price}</div>
                  </div>
                  <div className={`text-right font-mono ${
                    position.positive ? "text-trading-success" : "text-trading-danger"
                  }`}>
                    {position.pnl}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "BUY", symbol: "AAPL", price: "$176.52", time: "10:30 AM", positive: true },
                { action: "SELL", symbol: "TSLA", price: "$245.67", time: "09:45 AM", positive: false },
                { action: "BUY", symbol: "MSFT", price: "$375.23", time: "09:15 AM", positive: true },
              ].map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-trading-bg rounded-md">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      trade.action === "BUY" ? "bg-trading-success/20 text-trading-success" : "bg-trading-danger/20 text-trading-danger"
                    }`}>
                      {trade.action}
                    </span>
                    <div>
                      <div className="font-bold text-trading-text">{trade.symbol}</div>
                      <div className="text-sm text-trading-muted">{trade.time}</div>
                    </div>
                  </div>
                  <div className="font-mono text-trading-text">{trade.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
