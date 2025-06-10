
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Play, Save, RefreshCw, Square, BarChart3, Clock, TrendingUp, Plus, X } from "lucide-react";
import { AnimatedChart } from "@/components/AnimatedChart";

const defaultStrategy = `# Multi-Asset Momentum Strategy
from quantopian.algorithm import attach_pipeline, pipeline_output
from quantopian.pipeline import Pipeline
from quantopian.pipeline.data.builtin import USEquityPricing
from quantopian.pipeline.factors import AverageDollarVolume
from quantopian.pipeline.filters.morningstar import Q500US

def initialize(context):
    """
    Called once at the start of the algorithm.
    """
    # Set universe to top 500 liquid stocks
    context.stocks = []
    context.lookback = 20
    context.max_positions = 10
    
    # Rebalance every day, 1 hour after market open.
    schedule_function(my_rebalance, date_rules.every_day(),
                     time_rules.market_open(hours=1))
    
    # Record tracking variables at the end of each day.
    schedule_function(my_record_vars, date_rules.every_day(),
                     time_rules.market_close())

def handle_data(context, data):
    """
    Called every minute.
    """
    pass

def my_rebalance(context, data):
    """
    Execute orders according to our schedule_function() timing.
    """
    # Get current price data for our universe
    hist = data.history(context.stocks, 'price', context.lookback, '1d')
    
    # Calculate momentum scores
    momentum_scores = {}
    for stock in context.stocks:
        if stock in hist.columns:
            returns = hist[stock].pct_change().dropna()
            if len(returns) >= context.lookback - 1:
                momentum_scores[stock] = returns.mean()
    
    # Sort by momentum and select top performers
    sorted_stocks = sorted(momentum_scores.items(), 
                          key=lambda x: x[1], reverse=True)
    
    target_stocks = [stock for stock, _ in sorted_stocks[:context.max_positions]]
    
    # Calculate target weights
    target_weight = 1.0 / len(target_stocks) if target_stocks else 0
    
    # Place orders
    for stock in context.portfolio.positions:
        if stock not in target_stocks:
            order_target_percent(stock, 0)
    
    for stock in target_stocks:
        order_target_percent(stock, target_weight)

def my_record_vars(context, data):
    """
    Plot variables at the end of each day.
    """
    record(num_positions=len(context.portfolio.positions))`;

interface StrategyBacktestEditorProps {
  onBacktestComplete?: (results: any) => void;
}

export const StrategyBacktestEditor = ({ onBacktestComplete }: StrategyBacktestEditorProps) => {
  const [strategy, setStrategy] = useState(defaultStrategy);
  const [isValidating, setIsValidating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [symbols, setSymbols] = useState(['AAPL', 'MSFT', 'GOOGL']);
  const [newSymbol, setNewSymbol] = useState('');
  const [animatedData, setAnimatedData] = useState<any[]>([]);

  // Generate sample data for animated chart
  const generateBacktestData = () => {
    const data = [];
    const startValue = 100000;
    let strategyValue = startValue;
    let benchmarkValue = startValue;
    
    for (let i = 0; i < 252; i++) {
      const date = new Date(2023, 0, 1 + i).toISOString().split('T')[0];
      const strategyReturn = (Math.random() - 0.48) * 0.02;
      const benchmarkReturn = (Math.random() - 0.49) * 0.015;
      
      strategyValue *= (1 + strategyReturn);
      benchmarkValue *= (1 + benchmarkReturn);
      
      data.push({
        date,
        strategy: Math.round(strategyValue),
        benchmark: Math.round(benchmarkValue)
      });
    }
    return data;
  };

  const handleSave = () => {
    console.log("Saving strategy:", strategy);
  };

  const handleValidate = async () => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsValidating(false);
    console.log("Strategy validated");
  };

  const runBacktest = async () => {
    setIsRunning(true);
    setProgress(0);
    setAnimatedData([]);
    
    const fullData = generateBacktestData();
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
      
      // Simulate data streaming in during backtest
      const chunkSize = Math.floor(fullData.length / steps.length);
      const startIndex = i * chunkSize;
      const endIndex = i === steps.length - 1 ? fullData.length : (i + 1) * chunkSize;
      
      for (let j = startIndex; j < endIndex; j++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setAnimatedData(prev => [...prev, fullData[j]]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

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

    onBacktestComplete?.(results);
    setIsRunning(false);
    setProgress(100);
    setCurrentStep("Backtest completed!");
  };

  const stopBacktest = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep("");
    setAnimatedData([]);
  };

  const addSymbol = () => {
    if (newSymbol.trim() && !symbols.includes(newSymbol.trim().toUpperCase())) {
      setSymbols([...symbols, newSymbol.trim().toUpperCase()]);
      setNewSymbol('');
    }
  };

  const removeSymbol = (symbolToRemove: string) => {
    setSymbols(symbols.filter(symbol => symbol !== symbolToRemove));
  };

  return (
    <div className="p-6 space-y-6 bg-trading-bg min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-trading-text mb-2">Algorithm Editor</h2>
          <p className="text-trading-muted">Build your algorithm (Ctrl+B) for a quick backtest, or run a Full Backtest for detailed metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-trading-border text-trading-accent">
            Save
          </Button>
          <Button variant="outline" className="border-trading-border text-trading-text">
            Build Algorithm
          </Button>
          <Button variant="outline" className="border-trading-border text-trading-text">
            Collaborate
          </Button>
          <Button variant="outline" className="border-trading-border text-trading-text">
            API Reference
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Enter Contest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-trading-surface border-trading-border">
            <CardContent className="p-0">
              <Textarea
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="min-h-[500px] font-mono text-sm bg-white border-none text-trading-text resize-none rounded-none"
                placeholder="Write your trading strategy here..."
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-trading-surface border-trading-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-trading-text text-sm">Backtest Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-trading-muted mb-1 block">Start Date</label>
                  <input 
                    type="date" 
                    defaultValue="2015-10-17"
                    className="w-full px-2 py-1 text-xs bg-white border border-trading-border rounded text-trading-text"
                  />
                </div>
                <div>
                  <label className="text-xs text-trading-muted mb-1 block">End Date</label>
                  <input 
                    type="date" 
                    defaultValue="2017-01-18"
                    className="w-full px-2 py-1 text-xs bg-white border border-trading-border rounded text-trading-text"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-trading-muted mb-1 block">Initial Capital</label>
                <input 
                  type="text" 
                  defaultValue="$ 1000000"
                  className="w-full px-2 py-1 text-xs bg-white border border-trading-border rounded text-trading-text"
                />
              </div>
              
              <div>
                <label className="text-xs text-trading-muted mb-2 block">Trading Universe</label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {symbols.map((symbol) => (
                      <span key={symbol} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {symbol}
                        <button onClick={() => removeSymbol(symbol)} className="hover:text-blue-600">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newSymbol}
                      onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                      placeholder="Add symbol"
                      className="flex-1 px-2 py-1 text-xs bg-white border border-trading-border rounded text-trading-text"
                      onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
                    />
                    <Button onClick={addSymbol} size="sm" className="px-2">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-trading-border">
                <div className="flex gap-2 mb-3">
                  <Button 
                    onClick={runBacktest}
                    disabled={isRunning}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                  >
                    {isRunning ? "Running..." : "Run Full Backtest"}
                  </Button>
                  <Button 
                    onClick={stopBacktest}
                    disabled={!isRunning}
                    variant="outline"
                    size="sm"
                    className="border-trading-border text-trading-danger hover:bg-trading-danger/10"
                  >
                    <Square className="h-3 w-3" />
                  </Button>
                </div>

                {isRunning && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-trading-muted">Progress</span>
                      <span className="text-trading-text font-mono">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                    <p className="text-xs text-trading-accent">{currentStep}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-trading-surface border-trading-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-trading-text text-sm">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-trading-muted">RETURNS</div>
                  <div className="text-trading-text font-mono">--</div>
                </div>
                <div>
                  <div className="text-trading-muted">ALPHA</div>
                  <div className="text-trading-text font-mono">--</div>
                </div>
                <div>
                  <div className="text-trading-muted">BETA</div>
                  <div className="text-trading-text font-mono">--</div>
                </div>
                <div>
                  <div className="text-trading-muted">SHARPE</div>
                  <div className="text-trading-text font-mono">--</div>
                </div>
                <div>
                  <div className="text-trading-muted">DRAWDOWN</div>
                  <div className="text-trading-text font-mono">--</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {(isRunning || animatedData.length > 0) && (
        <Card className="bg-trading-surface border-trading-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-trading-text text-sm">Live Backtest Results</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart 
              data={animatedData} 
              isAnimating={isRunning}
              animationSpeed={50}
              className="h-64"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
