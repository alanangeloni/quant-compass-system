
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Square, BarChart3, Clock, TrendingUp } from "lucide-react";

interface BacktestRunnerProps {
  onBacktestComplete: (results: any) => void;
}

export const BacktestRunner = ({ onBacktestComplete }: BacktestRunnerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const runBacktest = async () => {
    setIsRunning(true);
    setProgress(0);
    
    const steps = [
      "Loading historical data...",
      "Initializing strategy...",
      "Processing trades...",
      "Calculating metrics...",
      "Generating results..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simulate backtest results
    const results = {
      totalReturn: 23.67,
      sharpeRatio: 1.82,
      maxDrawdown: -8.42,
      winRate: 67.3,
      totalTrades: 245,
      avgTradeReturn: 1.45,
      volatility: 12.8,
      calmarRatio: 2.81
    };

    onBacktestComplete(results);
    setIsRunning(false);
    setProgress(100);
    setCurrentStep("Backtest completed!");
  };

  const stopBacktest = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep("");
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backtest Runner</h2>
        <p className="text-gray-600">Execute your strategy against historical market data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-600" />
              Execution Control
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-4">
              <Button 
                onClick={runBacktest}
                disabled={isRunning}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Start Backtest"}
              </Button>
              <Button 
                onClick={stopBacktest}
                disabled={!isRunning}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>

            {isRunning && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-mono">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-blue-600">{currentStep}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Symbol</label>
                <input 
                  type="text" 
                  defaultValue="AAPL"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Timeframe</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>1 Day</option>
                  <option>1 Hour</option>
                  <option>15 Minutes</option>
                  <option>5 Minutes</option>
                </select>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data Range:</span>
                <span className="text-gray-900">2023-01-01 to 2024-01-01</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Bars:</span>
                <span className="text-gray-900 font-mono">8,760</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Initial Capital:</span>
                <span className="text-gray-900 font-mono">$100,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Execution Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-50 rounded-md p-4 h-48 overflow-y-auto font-mono text-sm">
            <div className="space-y-1 text-gray-600">
              <div>[2024-06-10 14:30:15] Strategy loaded successfully</div>
              <div>[2024-06-10 14:30:16] Historical data fetched (365 days)</div>
              <div>[2024-06-10 14:30:17] Backtesting engine initialized</div>
              {isRunning && (
                <>
                  <div className="text-blue-600">[2024-06-10 14:30:18] {currentStep}</div>
                  <div className="text-gray-900 animate-pulse">Processing...</div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
