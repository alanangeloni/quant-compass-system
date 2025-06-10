
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Save, RefreshCw } from "lucide-react";

const defaultStrategy = `# Simple Moving Average Strategy
def initialize(context):
    context.stock = symbol('AAPL')
    context.short_ma = 20
    context.long_ma = 50

def handle_data(context, data):
    # Get price history
    prices = data.history(context.stock, 'price', context.long_ma, '1d')
    
    # Calculate moving averages
    short_mavg = prices.rolling(context.short_ma).mean().iloc[-1]
    long_mavg = prices.rolling(context.long_ma).mean().iloc[-1]
    
    current_price = data.current(context.stock, 'price')
    
    # Trading logic
    if short_mavg > long_mavg and not context.portfolio.positions[context.stock]:
        # Buy signal
        order_target_percent(context.stock, 1.0)
        
    elif short_mavg < long_mavg and context.portfolio.positions[context.stock]:
        # Sell signal
        order_target_percent(context.stock, 0.0)`;

interface StrategyEditorProps {
  onStrategyChange: (strategy: string) => void;
}

export const StrategyEditor = ({ onStrategyChange }: StrategyEditorProps) => {
  const [strategy, setStrategy] = useState(defaultStrategy);
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = () => {
    console.log("Saving strategy:", strategy);
    onStrategyChange(strategy);
  };

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsValidating(false);
    console.log("Strategy validated");
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategy Editor</h2>
        <p className="text-gray-600">Write and test your quantitative trading algorithms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
              <CardTitle className="text-gray-900">Algorithm Code</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleValidate}
                  disabled={isValidating}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  {isValidating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  Validate
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="min-h-[500px] font-mono text-sm bg-white border-gray-200 text-gray-900 resize-none"
                placeholder="Write your trading strategy here..."
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900">Strategy Parameters</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Initial Capital</label>
                <input 
                  type="number" 
                  defaultValue={100000}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Start Date</label>
                <input 
                  type="date" 
                  defaultValue="2023-01-01"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">End Date</label>
                <input 
                  type="date" 
                  defaultValue="2024-01-01"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Commission</label>
                <input 
                  type="number" 
                  step="0.01"
                  defaultValue={0.005}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-2">
              {[
                "Simple Moving Average",
                "Mean Reversion",
                "Momentum Strategy",
                "Pairs Trading",
                "RSI Strategy"
              ].map((template, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {template}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
