
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";

interface ResultsDashboardProps {
  results: any;
}

export const ResultsDashboard = ({ results }: ResultsDashboardProps) => {
  // Sample equity curve data
  const equityCurveData = [
    { date: "2003", strategy: 100000, benchmark: 100000 },
    { date: "2004", strategy: 112000, benchmark: 105000 },
    { date: "2005", strategy: 128000, benchmark: 112000 },
    { date: "2006", strategy: 145000, benchmark: 118000 },
    { date: "2007", strategy: 162000, benchmark: 125000 },
    { date: "2008", strategy: 135000, benchmark: 102000 },
    { date: "2009", strategy: 175000, benchmark: 115000 },
    { date: "2010", strategy: 195000, benchmark: 128000 },
    { date: "2011", strategy: 210000, benchmark: 135000 },
    { date: "2012", strategy: 245000, benchmark: 148000 },
    { date: "2013", strategy: 275000, benchmark: 162000 },
    { date: "2014", strategy: 295000, benchmark: 175000 },
    { date: "2015", strategy: 320000, benchmark: 185000 },
    { date: "2016", strategy: 338200, benchmark: 195000 },
  ];

  const weeklyReturnsData = [
    { week: "W1", returns: 2.1 },
    { week: "W2", returns: -1.3 },
    { week: "W3", returns: 3.2 },
    { week: "W4", returns: 1.8 },
    { week: "W5", returns: -0.7 },
    { week: "W6", returns: 2.9 },
    { week: "W7", returns: -2.1 },
    { week: "W8", returns: 1.5 },
    { week: "W9", returns: 0.8 },
    { week: "W10", returns: -1.9 },
    { week: "W11", returns: 2.4 },
    { week: "W12", returns: 1.1 },
  ];

  const leverageData = [
    { date: "2003", leverage: 0.25 },
    { date: "2004", leverage: 0.35 },
    { date: "2005", leverage: 0.41 },
    { date: "2006", leverage: 0.38 },
    { date: "2007", leverage: 0.42 },
    { date: "2008", leverage: 0.15 },
    { date: "2009", leverage: 0.45 },
    { date: "2010", leverage: 0.39 },
    { date: "2011", leverage: 0.41 },
    { date: "2012", leverage: 0.43 },
    { date: "2013", leverage: 0.41 },
    { date: "2014", leverage: 0.38 },
    { date: "2015", leverage: 0.41 },
    { date: "2016", leverage: 0.41 },
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

  return (
    <div className="p-6 space-y-6 bg-trading-bg min-h-screen">
      {/* Header Section */}
      <div className="bg-trading-surface rounded-lg p-6 border border-trading-accent/20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-trading-text mb-2">Backtest Results</h2>
            <div className="text-sm text-trading-muted">
              <span>From 2003-01-03 to 2016-02-24 with $1,000,000 initial capital (daily data)</span>
            </div>
            <div className="text-sm text-trading-success mt-1">
              ✓ Backtest complete
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-trading-accent text-white rounded text-sm hover:bg-trading-accent/80">
              Live Trade Algorithm
            </button>
            <button className="px-4 py-2 bg-trading-accent text-white rounded text-sm hover:bg-trading-accent/80">
              Share Results
            </button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-8 gap-6 text-center">
          <div>
            <div className="text-xs text-trading-muted mb-1">Total Returns</div>
            <div className="text-xl font-bold text-trading-success">238.2%</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Benchmark Returns</div>
            <div className="text-xl font-bold text-trading-text">174.4%</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Alpha</div>
            <div className="text-xl font-bold text-trading-text">0.12</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Beta</div>
            <div className="text-xl font-bold text-trading-text">0.38</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Sharpe</div>
            <div className="text-xl font-bold text-trading-success">1.10</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Sortino</div>
            <div className="text-xl font-bold text-trading-text">1.44</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Information Ratio</div>
            <div className="text-xl font-bold text-trading-text">0.33</div>
          </div>
          <div>
            <div className="text-xs text-trading-muted mb-1">Volatility</div>
            <div className="text-xl font-bold text-trading-text">0.15</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs text-trading-muted mb-1">Max Drawdown</div>
          <div className="text-xl font-bold text-trading-danger">37.7%</div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-1">
          <Card className="bg-trading-surface border-trading-accent/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-trading-accent text-white rounded">
                  Results Overview
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-trading-muted hover:text-trading-text">
                  Transaction Details
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-trading-muted hover:text-trading-text">
                  Daily Positions & Gains
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-trading-muted hover:text-trading-text">
                  Log Output
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-trading-accent/20">
                <div className="text-xs font-semibold text-trading-text mb-3">RISK METRICS</div>
                <div className="space-y-2 text-xs">
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Returns</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Benchmark Returns</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Treasury Returns</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Alpha</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Beta</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Sharpe</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Sortino</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Information Ratio</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Volatility</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Benchmark Volatility</button>
                  <button className="w-full text-left px-3 py-1 text-trading-muted hover:text-trading-text">Max Drawdown</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="col-span-3 space-y-6">
          {/* Cumulative Performance Chart */}
          <Card className="bg-trading-surface border-trading-accent/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-trading-muted mb-1">Cumulative performance:</div>
                  <div className="flex gap-6 text-sm">
                    <span className="text-trading-accent">■ Algorithm 302.02%</span>
                    <span className="text-trading-danger">■ Benchmark (SPY) 185.06%</span>
                  </div>
                </div>
                <div className="text-sm text-trading-muted">Week of Mar 8, 2015</div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={equityCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid #2563eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="strategy" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    name="Algorithm"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Benchmark (SPY)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Custom Data - Leverage Chart */}
          <Card className="bg-trading-surface border-trading-accent/20">
            <CardHeader className="pb-4">
              <div className="text-sm text-trading-muted">Custom data: <span className="text-trading-accent">■ Leverage 0.41</span></div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={leverageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 1]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid #2563eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leverage" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Leverage"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Returns Chart */}
          <Card className="bg-trading-surface border-trading-accent/20">
            <CardHeader className="pb-4">
              <div className="text-sm text-trading-muted">Weekly returns <span className="text-trading-success">$21,491</span></div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyReturnsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid #2563eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="returns">
                    {weeklyReturnsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.returns > 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transaction Summary */}
          <Card className="bg-trading-surface border-trading-accent/20">
            <CardHeader className="pb-4">
              <div className="text-sm text-trading-muted">Transactions $72,556 bought, ($60,979) sold</div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-trading-bg rounded border border-trading-accent/10 flex items-center justify-center">
                <div className="text-center text-trading-muted">
                  <div className="text-xs">Transaction visualization would go here</div>
                  <div className="text-xs mt-1">Showing buy/sell activity over time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
