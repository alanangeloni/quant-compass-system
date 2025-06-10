
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Save, RefreshCw, Settings, Edit2 } from "lucide-react";

const defaultStrategy = `# For this example, we're going to write a simple momentum
# script.
# When the stock goes up quickly, we're going to buy;
# when it goes down we're going to sell.
# Hopefully we'll ride the waves.

# To run an algorithm in Quantopian, you need two functions:
# initialize and handle_data.

def initialize(context):
    # The initialize function sets any data or variables that
    # you'll use in your algorithm.
    # For instance, you'll want to define the security
    # (or securities) you want to backtest.
    # You'll also want to define any parameters or values
    # you're going to use later.
    # It's only called once at the beginning of your
    # algorithm.
    
    # In our example, we're looking at Apple.
    # If you re-type this line you'll see
    # the auto-complete that is available for security.
    context.security = symbol('AAPL')

# The handle_data function is where the real work is done.
# This function is run either every minute
# (in live trading and minute backtesting mode)
# or every day (in daily backtesting mode).
def handle_data(context, data):
    # We've built a handful of useful data transforms for you
    # to use.
    
    # history() gives you a number of bars of history for you
    # to use.
    # We're using bars for a ten day/minute moving
    # average.
    ma1 = data.history(context.security, 'price', 10, '1d').mean()
    
    # Let's try a 30 day/minute moving average too.
    ma2 = data.history(context.security, 'price', 30, '1d').mean()
    
    # Let's also look at the current price of the stock
    price = data.current(context.security, 'price')
    
    # If our stock is currently listed on a major exchange
    if data.can_trade(context.security):
        # If ma1 is above ma2, then we want to buy
        # (Here we're saying we want to order 10 shares)
        if ma1 > ma2:
            order(context.security, +10)
        # If ma1 is below ma2, then we want to sell
        # (here we're saying we want to sell 10 shares)
        elif ma1 < ma2:
            order(context.security, -10)
    
    # You can use the record() method to track any custom signal.
    record(ma1=ma1, ma2=ma2, price=price)`;

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
  const [algorithmName, setAlgorithmName] = useState("Sample Algorithm for a Basic Strategy 1");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [isRunningFullBacktest, setIsRunningFullBacktest] = useState(false);
  const [activeTab, setActiveTab] = useState("algorithm");

  const handleSave = () => {
    console.log("Saving strategy:", strategy);
    onStrategyChange(strategy);
  };

  const handleBacktest = async () => {
    setIsBacktesting(true);
    console.log("Running backtest");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsBacktesting(false);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  const handleRunFullBacktest = async () => {
    setIsRunningFullBacktest(true);
    console.log("Running full backtest");
    
    // Simulate backtest execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock results
    const results = {
      totalReturn: 238.2,
      sharpeRatio: 1.10,
      maxDrawdown: -37.7,
      alpha: 0.12,
      beta: 0.38,
      volatility: 0.15
    };
    
    onBacktestComplete(results);
    setIsRunningFullBacktest(false);
    onNavigateToResults();
  };

  return (
    <div className="h-full flex bg-white">
      {/* Main Algorithm Editor - Left Side */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        <div className="border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={algorithmName}
                    onChange={(e) => setAlgorithmName(e.target.value)}
                    className="text-lg font-medium border-none p-0 h-auto shadow-none focus-visible:ring-0"
                    onBlur={handleNameSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-medium text-gray-900">{algorithmName}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingName(true)}
                    className="p-1 h-6 w-6"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border border-gray-300 rounded">
                <Button
                  variant={activeTab === "algorithm" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("algorithm")}
                  className="rounded-none border-0 bg-blue-600 text-white"
                >
                  Algorithm
                </Button>
                <Button
                  variant={activeTab === "backtest" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("backtest")}
                  className="rounded-none border-0 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Backtest
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-600 text-blue-600 bg-blue-600 text-white" 
                onClick={handleBacktest} 
                disabled={isBacktesting}
              >
                {isBacktesting ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-1" />}
                Backtest
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                API Reference
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-0">
          <div className="h-full relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 flex flex-col text-xs text-gray-500">
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i + 1} className="h-5 px-2 flex items-center justify-end">
                  {i + 1}
                </div>
              ))}
            </div>
            <Textarea
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="h-full pl-14 font-mono text-sm bg-white border-0 text-gray-900 resize-none rounded-none focus-visible:ring-0"
              placeholder="Write your trading strategy here..."
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white flex flex-col">
        {/* Backtest Parameters */}
        <div className="border-b border-gray-200 p-4 bg-orange-50">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">FROM</label>
                <Input
                  type="date"
                  defaultValue="2011-01-01"
                  className="text-sm h-8"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">TO</label>
                <Input
                  type="date"
                  defaultValue="2015-07-31"
                  className="text-sm h-8"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">$</label>
                <Input
                  type="number"
                  defaultValue={1000000}
                  className="text-sm h-8"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">FREQUENCY</label>
                <Select defaultValue="daily">
                  <SelectTrigger className="text-sm h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="minute">Minute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleRunFullBacktest}
              disabled={isRunningFullBacktest}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-8 text-sm"
            >
              {isRunningFullBacktest ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Run Full Backtest
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 p-3 bg-white rounded border">
            <div className="text-sm text-gray-600 mb-2">
              Run a backtest to see your algorithm performance with the selected parameters.
            </div>
            <div className="grid grid-cols-4 gap-4 text-center text-xs">
              <div>
                <div className="text-gray-500">RETURNS</div>
                <div className="text-lg font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500">ALPHA</div>
                <div className="text-lg font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500">BETA</div>
                <div className="text-lg font-medium">--</div>
              </div>
              <div>
                <div className="text-gray-500">SHARPE</div>
                <div className="text-lg font-medium">--</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 px-4 py-2">
            <Tabs defaultValue="logs" className="w-full">
              <TabsList className="h-8">
                <TabsTrigger value="logs" className="text-xs bg-yellow-400 text-black">Logs</TabsTrigger>
                <TabsTrigger value="runtime-errors" className="text-xs">Runtime Errors</TabsTrigger>
                <TabsTrigger value="more" className="text-xs">More</TabsTrigger>
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
                  <div className="text-yellow-400">[2024-06-10 14:30:20] Running quick backtest...</div>
                )}
                {isRunningFullBacktest && (
                  <>
                    <div className="text-yellow-400">[2024-06-10 14:30:21] Starting full backtest...</div>
                    <div className="text-yellow-400">[2024-06-10 14:30:22] Processing historical data...</div>
                    <div className="text-yellow-400 animate-pulse">[2024-06-10 14:30:23] Calculating results...</div>
                  </>
                )}
                {!isBacktesting && !isRunningFullBacktest && (
                  <div className="text-yellow-400">[2024-06-10 14:30:20] Waiting for user input...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
