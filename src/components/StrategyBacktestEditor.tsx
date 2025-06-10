
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Play, Save, RefreshCw, BarChart3, Settings, Edit2 } from "lucide-react";

const defaultStrategy = `# Template Algorithm
"""
This is a template algorithm on Quantopian for you to adapt and fill in.
"""

from quantopian.algorithm import attach_pipeline, pipeline_output
from quantopian.pipeline import Pipeline
from quantopian.pipeline.data.builtin import USEquityPricing
from quantopian.pipeline.factors import AverageDollarVolume
from quantopian.pipeline.filters.morningstar import Q500US

def initialize(context):
    """
    Called once at the start of the algorithm.
    """
    # Rebalance every day, 1 hour after market open.
    schedule_function(my_rebalance, date_rules.every_day(),
                     time_rules.market_open(hours=1))
    
    # Record tracking variables at the end of each day.
    schedule_function(my_record_vars, date_rules.every_day(),
                     time_rules.market_close())
    
    # Create our dynamic stock selector.
    attach_pipeline(make_pipeline(), 'my_pipeline')

def make_pipeline():
    """
    A function to create our dynamic stock selector (pipeline). Documentation on
    pipeline can be found here: https://www.quantopian.com/help#pipeline-title
    """
    
    # Base universe set to the Q500US
    base_universe = Q500US()
    
    # Factor of yesterday's close price.
    yesterday_close = USEquityPricing.close.latest
    
    pipe = Pipeline(
        columns={
            'close': yesterday_close,
        },
        screen=base_universe
    )
    return pipe

def before_trading_start(context, data):
    """
    Called every day before market open.
    """
    context.output = pipeline_output('my_pipeline')
    
    # These are the securities that we are interested in trading each day.
    context.security_list = context.output.index

def my_rebalance(context, data):
    """
    Execute orders according to our schedule_function() timing.
    """
    pass

def my_record_vars(context, data):
    """
    Plot variables at the end of each day.
    """
    pass

def handle_data(context, data):
    """
    Called every minute.
    """
    pass`;

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
  const [algorithmName, setAlgorithmName] = useState("Template Algorithm");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isQuickBacktest, setIsQuickBacktest] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const handleSave = () => {
    console.log("Saving strategy:", strategy);
    onStrategyChange(strategy);
  };

  const handleValidate = async () => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsValidating(false);
    console.log("Strategy validated");
  };

  const runQuickBacktest = async () => {
    setIsQuickBacktest(true);
    setProgress(0);
    
    const steps = [
      "Loading data...",
      "Running backtest...",
      "Calculating metrics..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 33);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsQuickBacktest(false);
    setProgress(100);
    setCurrentStep("Backtest completed!");
  };

  const runFullBacktest = async () => {
    // Navigate to results page and run full backtest
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
    onNavigateToResults();
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  return (
    <div className="h-full flex bg-white">
      {/* Main Algorithm Editor - Left Side */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={algorithmName}
                    onChange={(e) => setAlgorithmName(e.target.value)}
                    className="text-xl font-semibold border-none p-0 h-auto shadow-none focus-visible:ring-0"
                    onBlur={handleNameSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-gray-900">{algorithmName}</h1>
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
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700" onClick={handleValidate} disabled={isValidating}>
                {isValidating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
                Build Algorithm
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Enter Contest
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Textarea
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="h-full font-mono text-sm bg-white border-gray-200 text-gray-900 resize-none"
            placeholder="Write your trading strategy here..."
          />
        </div>
      </div>

      {/* Backtest Panel - Right Side */}
      <div className="w-96 bg-gray-50 flex flex-col">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Backtest</h2>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={runQuickBacktest}
                disabled={isQuickBacktest}
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                size="sm"
              >
                {isQuickBacktest ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                Quick Backtest
              </Button>
            </div>
            
            <Button 
              onClick={runFullBacktest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Full Backtest
            </Button>
          </div>

          {isQuickBacktest && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-mono">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-blue-600">{currentStep}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <div className="mb-4">
                <div className="text-gray-900 font-medium mb-2">10/17/2015 to 01/18/2017 $ 1,000,000</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900 text-xs">RETURNS</div>
                  <div className="text-lg font-bold">--</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900 text-xs">ALPHA</div>
                  <div className="text-lg font-bold">--</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900 text-xs">BETA</div>
                  <div className="text-lg font-bold">--</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900 text-xs">SHARPE</div>
                  <div className="text-lg font-bold">--</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded border text-center">
                <div className="font-medium text-gray-900 text-xs">MAX DRAWDOWN</div>
                <div className="text-lg font-bold">--</div>
              </div>
            </div>

            <div className="text-gray-500 text-sm">
              Build your algorithm (Ctrl+B) for a quick backtest, or run a Full Backtest for detailed metrics.
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Logs</span>
              <span className="text-sm text-gray-500">Runtime Errors</span>
            </div>
            <div className="bg-black rounded h-32 relative overflow-hidden p-2">
              <div className="font-mono text-green-400 text-xs">
                <div>[2024-06-10 14:30:15] Strategy loaded successfully</div>
                <div>[2024-06-10 14:30:16] Historical data fetched (365 days)</div>
                <div>[2024-06-10 14:30:17] Backtesting engine initialized</div>
                {isQuickBacktest && (
                  <>
                    <div className="text-blue-400">[2024-06-10 14:30:18] {currentStep}</div>
                    <div className="text-yellow-400 animate-pulse">Processing...</div>
                  </>
                )}
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
