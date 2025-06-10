
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";

interface ResultsDashboardProps {
  results: any;
}

export const ResultsDashboard = ({ results }: ResultsDashboardProps) => {
  // Sample equity curve data
  const equityCurveData = [
    { date: "Jan", value: 100000, benchmark: 100000 },
    { date: "Feb", value: 105000, benchmark: 102000 },
    { date: "Mar", value: 108000, benchmark: 103500 },
    { date: "Apr", value: 95000, benchmark: 105000 },
    { date: "May", value: 112000, benchmark: 108000 },
    { date: "Jun", value: 118000, benchmark: 110000 },
    { date: "Jul", value: 123000, benchmark: 112000 },
    { date: "Aug", value: 115000, benchmark: 109000 },
    { date: "Sep", value: 128000, benchmark: 115000 },
    { date: "Oct", value: 125000, benchmark: 118000 },
    { date: "Nov", value: 135000, benchmark: 120000 },
    { date: "Dec", value: 123677, benchmark: 117500 },
  ];

  const monthlyReturnsData = [
    { month: "Jan", returns: 5.0 },
    { month: "Feb", returns: 2.9 },
    { month: "Mar", returns: -12.0 },
    { month: "Apr", returns: 17.9 },
    { month: "May", returns: 5.4 },
    { month: "Jun", returns: 4.2 },
    { month: "Jul", returns: -6.9 },
    { month: "Aug", returns: 11.3 },
    { month: "Sep", returns: -2.3 },
    { month: "Oct", returns: 8.0 },
    { month: "Nov", returns: -8.9 },
    { month: "Dec", returns: 5.2 },
  ];

  if (!results) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="h-12 w-12 text-trading-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-trading-text mb-2">No Results Yet</h3>
          <p className="text-trading-muted">Run a backtest to see your strategy performance</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Return",
      value: `${results.totalReturn}%`,
      icon: TrendingUp,
      positive: results.totalReturn > 0,
    },
    {
      title: "Sharpe Ratio",
      value: results.sharpeRatio,
      icon: Target,
      positive: results.sharpeRatio > 1,
    },
    {
      title: "Max Drawdown",
      value: `${results.maxDrawdown}%`,
      icon: TrendingDown,
      positive: false,
    },
    {
      title: "Win Rate",
      value: `${results.winRate}%`,
      icon: Activity,
      positive: results.winRate > 50,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-trading-text mb-2">Backtest Results</h2>
        <p className="text-trading-muted">Comprehensive performance analysis of your strategy</p>
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
                <Icon className={`h-4 w-4 ${metric.positive ? 'text-trading-success' : 'text-trading-danger'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  metric.positive ? 'text-trading-success' : 'text-trading-danger'
                }`}>
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text">Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={equityCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #2563eb',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Strategy"
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#64748b" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Benchmark"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text">Monthly Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReturnsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #2563eb',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="returns" 
                  fill={(data) => data.returns > 0 ? '#10b981' : '#ef4444'}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-trading-surface border-trading-accent/20">
        <CardHeader>
          <CardTitle className="text-trading-text">Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-trading-text">Returns</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-trading-muted">Total Return:</span>
                  <span className="text-trading-success font-mono">{results.totalReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Annualized:</span>
                  <span className="text-trading-text font-mono">18.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Volatility:</span>
                  <span className="text-trading-text font-mono">{results.volatility}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-trading-text">Risk Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-trading-muted">Sharpe Ratio:</span>
                  <span className="text-trading-success font-mono">{results.sharpeRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Calmar Ratio:</span>
                  <span className="text-trading-text font-mono">{results.calmarRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Max Drawdown:</span>
                  <span className="text-trading-danger font-mono">{results.maxDrawdown}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-trading-text">Trading Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-trading-muted">Total Trades:</span>
                  <span className="text-trading-text font-mono">{results.totalTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Win Rate:</span>
                  <span className="text-trading-success font-mono">{results.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Avg Trade:</span>
                  <span className="text-trading-text font-mono">{results.avgTradeReturn}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-trading-text">Portfolio</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-trading-muted">Start Value:</span>
                  <span className="text-trading-text font-mono">$100,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">End Value:</span>
                  <span className="text-trading-success font-mono">$123,677</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trading-muted">Commission:</span>
                  <span className="text-trading-text font-mono">$1,225</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
