
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Save, RefreshCw, Settings, Edit2 } from "lucide-react";

const defaultStrategy = `"""
This is a sample mean-reversion algorithm on Quantopian for you to
test and adapt.
This example uses a dynamic stock selector, pipeline, to select
stocks to trade.
It orders stocks from the top 1% of the previous day's dollar-
volume (liquid
stocks).

Algorithm investment thesis:
Top-performing stocks from last week will do worse this week, and
vice-versa.

Every Monday, we rank high dollar-volume stocks based on their
previous 5 day returns.
We long the bottom 10% of stocks with the WORST returns over the
past 5 days.
We short the top 10% of stocks with the BEST returns over the past
5 days.
"""

def initialize(context):
    # Set benchmark to S&P 500
    context.benchmark = symbol('SPY')
    
    # Set commission and slippage
    set_commission(commission.PerShare(cost=0.01, min_trade_cost=1.0))
    set_slippage(slippage.VolumeShareSlippage())
    
    # Schedule function to run at market open
    schedule_function(rebalance_portfolio, date_rules.week_start(), time_rules.market_open())
    
    # Initialize variables
    context.long_leverage = 0.5
    context.short_leverage = -0.5
    context.stocks = []

def rebalance_portfolio(context, data):
    # Get current universe of stocks
    pipeline_data = pipeline_output('stock_screener')
    
    if pipeline_data.empty:
        return
    
    # Sort by 5-day returns
    pipeline_data = pipeline_data.sort_values('returns_5d')
    
    # Select bottom 10% (worst performers) to long
    num_stocks = len(pipeline_data)
    bottom_decile = int(num_stocks * 0.1)
    top_decile = int(num_stocks * 0.9)
    
    long_stocks = pipeline_data.iloc[:bottom_decile].index
    short_stocks = pipeline_data.iloc[top_decile:].index
    
    # Close positions not in current selection
    for stock in context.portfolio.positions:
        if stock not in long_stocks and stock not in short_stocks:
            order_target_percent(stock, 0.0)
    
    # Long the worst performers
    long_weight = context.long_leverage / len(long_stocks) if len(long_stocks) > 0 else 0
    for stock in long_stocks:
        order_target_percent(stock, long_weight)
    
    # Short the best performers  
    short_weight = context.short_leverage / len(short_stocks) if len(short_stocks) > 0 else 0
    for stock in short_stocks:
        order_target_percent(stock, short_weight)
    
    # Log trades
    log.info("Rebalanced portfolio: {} longs, {} shorts".format(len(long_stocks), len(short_stocks)))

def before_trading_start(context, data):
    # Run pipeline to get stock universe
    context.output = pipeline_output('stock_screener')

def make_pipeline():
    # Create pipeline for stock selection
    from quantopian.pipeline import Pipeline
    from quantopian.pipeline.data.builtin import USEquityPricing
    from quantopian.pipeline.factors import Returns, AverageDollarVolume
    
    # Calculate 5-day returns
    returns_5d = Returns(window_length=5)
    
    # Get high dollar volume stocks
    dollar_volume = AverageDollarVolume(window_length=30)
    high_dollar_volume = dollar_volume.percentile_between(95, 100)
    
    pipe = Pipeline(
        columns={
            'returns_5d': returns_5d,
            'dollar_volume': dollar_volume,
        },
        screen=high_dollar_volume
    )
    
    return pipe`;

interface StrategyBacktestEditorProps {
  onStrategyChange: (strategy: string) => void;
  onBacktestComplete: (results: any) => void;
  onNavigateToResults: () => void;
}

export const StrategyBacktestEditor = ({ 
  onStrategyChange, 
  onBacktestComplete, 
  onNavigateToResults 
}: StrategyBacktestEditorProps) => {
  const [strategy, setStrategy] = useState(defaultStrategy);
  const [algorithmName, setAlgorithmName] = useState("Sample Mean Reversion Algorithm 2");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [isRunningFullBacktest, setIsRunningFullBacktest] = useState(false);

  const handleSave = () => {
    console.log("Saving strategy:", strategy);
    onStrategyChange(strategy);
  };

  const handleBuildAlgorithm = async () => {
    setIsBacktesting(true);
    console.log("Building algorithm");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsBacktesting(false);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  const handleRunFullBacktest = async () => {
    setIsRunningFullBacktest(true);
    console.log("Running full backtest with strategy:", strategy);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = {
      strategy: strategy,
      algorithmName: algorithmName,
      totalReturn: 238.2,
      sharpeRatio: 1.10,
      maxDrawdown: -37.7,
      alpha: 0.12,
      beta: 0.38,
      volatility: 0.15,
      isLiveExecution: true
    };
    
    onBacktestComplete(results);
    setIsRunningFullBacktest(false);
    onNavigateToResults();
  };

  return (
    <div className="h-full flex bg-gray-100">
      {/* Main Algorithm Editor - Left Side */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Header */}
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <Input
                  value={algorithmName}
                  onChange={(e) => setAlgorithmName(e.target.value)}
                  className="text-sm border-gray-300 h-8"
                  onBlur={handleNameSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={algorithmName}
                    onClick={() => setIsEditingName(true)}
                    className="text-sm border-gray-300 h-8 bg-gray-50 cursor-pointer"
                    readOnly
                  />
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-300 text-gray-700"
              >
                All Backtests
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-300 text-gray-700"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-300 text-gray-700"
                onClick={handleBuildAlgorithm}
                disabled={isBacktesting}
              >
                {isBacktesting ? (
                  <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                ) : null}
                Build Algorithm
              </Button>
              <Button
                className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enter Contest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-300 text-gray-700"
              >
                API Reference
              </Button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-600 flex flex-col text-xs text-gray-400">
            {Array.from({ length: 80 }, (_, i) => (
              <div key={i + 1} className="h-5 px-2 flex items-center justify-end leading-5">
                {i + 1}
              </div>
            ))}
          </div>
          <Textarea
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="h-full pl-14 font-mono text-sm bg-gray-900 border-0 text-green-400 resize-none rounded-none focus-visible:ring-0"
            placeholder="Write your trading strategy here..."
            style={{
              lineHeight: '20px',
              padding: '0 0 0 48px'
            }}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Backtest Parameters */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 items-end">
              <div>
                <Input
                  type="date"
                  defaultValue="2015-04-01"
                  className="text-xs h-7 border-gray-300"
                />
              </div>
              <div className="text-xs text-gray-500 text-center">to</div>
              <div>
                <Input
                  type="date"
                  defaultValue="2015-07-01"
                  className="text-xs h-7 border-gray-300"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">$</span>
                <Input
                  type="number"
                  defaultValue={10000000}
                  className="text-xs h-7 border-gray-300"
                />
              </div>
              <div>
                <Select defaultValue="us-equities">
                  <SelectTrigger className="text-xs h-7 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-equities">US Equities</SelectItem>
                    <SelectItem value="futures">Futures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleRunFullBacktest}
              disabled={isRunningFullBacktest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
            >
              {isRunningFullBacktest ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Full Backtest"
              )}
            </Button>
          </div>

          {/* Performance Metrics */}
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div>
                <div className="text-gray-500 font-medium">RETURNS</div>
                <div className="text-sm font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">ALPHA</div>
                <div className="text-sm font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">BETA</div>
                <div className="text-sm font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">SHARPE</div>
                <div className="text-sm font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">DRAWDOWN</div>
                <div className="text-sm font-medium">--</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-600 text-center">
              Build your algorithm (Ctrl+B) for a quick backtest, or run a Full Backtest
              for detailed metrics.
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 px-4 py-2">
            <Tabs defaultValue="logs" className="w-full">
              <TabsList className="h-8 bg-gray-100">
                <TabsTrigger value="logs" className="text-xs bg-black text-white data-[state=active]:bg-black data-[state=active]:text-white">Logs</TabsTrigger>
                <TabsTrigger value="runtime-errors" className="text-xs text-gray-600">Runtime Errors</TabsTrigger>
                <TabsTrigger value="more" className="text-xs text-gray-600">More</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 p-4">
            <div className="bg-black rounded h-full relative overflow-hidden p-4">
              <div className="font-mono text-green-400 text-xs space-y-1">
                <div>[2024-06-10 14:30:15] Strategy loaded successfully</div>
                <div>[2024-06-10 14:30:16] Historical data fetched (365 days)</div>
                <div>[2024-06-10 14:30:17] Backtesting engine initialized</div>
                <div>[2024-06-10 14:30:18] Algorithm validation completed</div>
                <div className="text-blue-400">[2024-06-10 14:30:19] Ready for backtesting</div>
                {isBacktesting && (
                  <div className="text-yellow-400">[2024-06-10 14:30:20] Building algorithm...</div>
                )}
                {isRunningFullBacktest && (
                  <>
                    <div className="text-yellow-400">[2024-06-10 14:30:21] Starting full backtest...</div>
                    <div className="text-yellow-400">[2024-06-10 14:30:22] Processing historical data...</div>
                    <div className="text-yellow-400 animate-pulse">[2024-06-10 14:30:23] Calculating results...</div>
                  </>
                )}
                {!isBacktesting && !isRunningFullBacktest && (
                  <div className="text-white">[2024-06-10 14:30:20] Waiting for user input...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
