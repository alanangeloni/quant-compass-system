
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
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-trading-text mb-2">Backtest Runner</h2>
        <p className="text-trading-muted">Execute your strategy against historical market data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text flex items-center gap-2">
              <Play className="h-5 w-5 text-trading-accent" />
              Execution Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button 
                onClick={runBacktest}
                disabled={isRunning}
                className="flex-1 bg-trading-success hover:bg-trading-success/80"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Start Backtest"}
              </Button>
              <Button 
                onClick={stopBacktest}
                disabled={!isRunning}
                variant="outline"
                className="border-trading-danger/20 text-trading-danger hover:bg-trading-danger/10"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>

            {isRunning && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-trading-muted">Progress</span>
                  <span className="text-trading-text font-mono">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-trading-accent">{currentStep}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-trading-surface border-trading-accent/20">
          <CardHeader>
            <CardTitle className="text-trading-text flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-trading-accent" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-trading-muted mb-2 block">Symbol</label>
                <input 
                  type="text" 
                  defaultValue="AAPL"
                  className="w-full px-3 py-2 bg-trading-bg border border-trading-accent/20 rounded-md text-trading-text focus:ring-2 focus:ring-trading-accent/50 focus:border-trading-accent"
                />
              </div>
              <div>
                <label className="text-sm text-trading-muted mb-2 block">Timeframe</label>
                <select className="w-full px-3 py-2 bg-trading-bg border border-trading-accent/20 rounded-md text-trading-text focus:ring-2 focus:ring-trading-accent/50 focus:border-trading-accent">
                  <option>1 Day</option>
                  <option>1 Hour</option>
                  <option>15 Minutes</option>
                  <option>5 Minutes</option>
                </select>
              </div>
            </div>
            
            <div className="bg-trading-bg rounded-md p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-trading-muted">Data Range:</span>
                <span className="text-trading-text">2023-01-01 to 2024-01-01</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-trading-muted">Total Bars:</span>
                <span className="text-trading-text font-mono">8,760</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-trading-muted">Initial Capital:</span>
                <span className="text-trading-text font-mono">$100,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-trading-surface border-trading-accent/20">
        <CardHeader>
          <CardTitle className="text-trading-text flex items-center gap-2">
            <Clock className="h-5 w-5 text-trading-accent" />
            Execution Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-trading-bg rounded-md p-4 h-48 overflow-y-auto font-mono text-sm">
            <div className="space-y-1 text-trading-muted">
              <div>[2024-06-10 14:30:15] Strategy loaded successfully</div>
              <div>[2024-06-10 14:30:16] Historical data fetched (365 days)</div>
              <div>[2024-06-10 14:30:17] Backtesting engine initialized</div>
              {isRunning && (
                <>
                  <div className="text-trading-accent">[2024-06-10 14:30:18] {currentStep}</div>
                  <div className="text-trading-text animate-pulse">Processing...</div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
