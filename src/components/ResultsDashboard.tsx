import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, Play, Pause } from "lucide-react";
import { AnimatedChart } from "./AnimatedChart";
import { AlgorithmExecutionViewer } from "./AlgorithmExecutionViewer";
import { Button } from "@/components/ui/button";

interface ResultsDashboardProps {
  results: any;
}

export const ResultsDashboard = ({ results }: ResultsDashboardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

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
    <div className="p-4 space-y-4 bg-white min-h-screen">
      {/* Algorithm Execution Viewer - Show this when showExecution is true */}
      {results.showExecution && results.strategy && results.algorithmName && (
        <AlgorithmExecutionViewer 
          strategy={results.strategy} 
          algorithmName={results.algorithmName}
        />
      )}

      {/* Header Section */}
      <div className="bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm text-gray-600">
            <div className="mb-1">
              <span className="font-medium">Settings:</span> From 2003-01-03 to 2016-02-24 with <span className="text-blue-600">$1,000,000</span> initial capital (daily data)
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span> 
              <span className="text-green-600">✓ Backtest complete</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsAnimating(!isAnimating)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {isAnimating ? <Pause size={14} /> : <Play size={14} />}
              {isAnimating ? "Pause" : "Animate"}
            </Button>
            <Button className="bg-gray-500 hover:bg-gray-600 text-white text-xs" size="sm">
              Live Trade Algorithm
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs" size="sm">
              📤 Share Results
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-4">
        {/* Sidebar Navigation */}
        <div className="col-span-1">
          <div className="bg-white border border-gray-200">
            <div className="p-3">
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm bg-blue-100 text-blue-800 border border-blue-200 rounded">
                  Results Overview
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  Transaction Details
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  Daily Positions & Gains
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  Log Output
                </button>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-2 tracking-wide">RISK METRICS</div>
                <div className="space-y-1 text-xs">
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Returns</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Benchmark Returns</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Treasury Returns</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Alpha</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Beta</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Sharpe</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Sortino</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Information Ratio</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Volatility</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Benchmark Volatility</button>
                  <button className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Max Drawdown</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-4 space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Total Returns</div>
              <div className="text-2xl font-bold text-gray-900">238.2%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Benchmark Returns</div>
              <div className="text-2xl font-bold text-gray-900">174.4%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Alpha</div>
              <div className="text-2xl font-bold text-gray-900">0.12</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Beta</div>
              <div className="text-2xl font-bold text-gray-900">0.38</div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Sharpe</div>
              <div className="text-2xl font-bold text-red-600">1.10</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Sortino</div>
              <div className="text-2xl font-bold text-gray-900">1.44</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Information Ratio</div>
              <div className="text-2xl font-bold text-gray-900">0.33</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Volatility</div>
              <div className="text-2xl font-bold text-gray-900">0.15</div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-xs text-gray-500 mb-1">Max Drawdown</div>
            <div className="text-2xl font-bold text-gray-900">37.7%</div>
          </div>

          {/* Cumulative Performance Chart */}
          <div className="bg-white border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-600">Cumulative performance: </span>
                  <span className="text-blue-600">■ Algorithm 302.02%</span>
                  <span className="text-red-600 ml-4">■ Benchmark (SPY) 185.06%</span>
                </div>
                <div className="text-sm text-gray-500">Week of Mar 8, 2015</div>
              </div>
            </div>
            <div className="p-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={equityCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${Math.round((value / 100000) * 100)}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="strategy" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    name="Algorithm"
                    dot={false}
                    strokeLinecap="round"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                    name="Benchmark (SPY)"
                    dot={false}
                    strokeLinecap="round"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leverage Chart */}
          <div className="bg-white border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Custom data: <span className="text-blue-600">■ Leverage 0.41</span>
              </div>
            </div>
            <div className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={leverageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leverage" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    name="Leverage"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Returns Chart */}
          <div className="bg-white border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Weekly returns <span className="text-green-600">$21,491</span>
              </div>
            </div>
            <div className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyReturnsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={10}
                    axisLine={true}
                    tickLine={true}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="returns" stroke="#374151" strokeWidth={1}>
                    {weeklyReturnsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.returns > 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions Chart */}
          <div className="bg-white border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Transactions $72,556 bought, ($60,979) sold
              </div>
            </div>
            <div className="p-2">
              <div className="h-32 bg-gray-50 border border-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-xs">Transaction visualization would go here</div>
                  <div className="text-xs mt-1">Showing buy/sell activity over time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
