
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AlgorithmExecutionViewerProps {
  strategy: string;
  algorithmName: string;
}

export const AlgorithmExecutionViewer = ({ strategy, algorithmName }: AlgorithmExecutionViewerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [tradeEvents, setTradeEvents] = useState<any[]>([]);

  const simulatedTrades = [
    { day: 1, action: "BUY", price: 150.25, shares: 100, reason: "MA crossover up" },
    { day: 15, action: "SELL", price: 165.80, shares: 100, reason: "MA crossover down" },
    { day: 32, action: "BUY", price: 158.45, shares: 120, reason: "MA crossover up" },
    { day: 48, action: "SELL", price: 172.30, shares: 120, reason: "MA crossover down" },
    { day: 65, action: "BUY", price: 168.90, shares: 110, reason: "MA crossover up" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentStep < simulatedTrades.length) {
      interval = setInterval(() => {
        const trade = simulatedTrades[currentStep];
        const logEntry = `[Day ${trade.day}] ${trade.action} ${trade.shares} shares at $${trade.price} - ${trade.reason}`;
        
        setExecutionLogs(prev => [...prev, logEntry]);
        setTradeEvents(prev => [...prev, trade]);
        setCurrentStep(prev => prev + 1);
        
        if (currentStep >= simulatedTrades.length - 1) {
          setIsRunning(false);
        }
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setExecutionLogs([]);
    setTradeEvents([]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Algorithm Execution: {algorithmName}</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={handleStart} 
                disabled={isRunning || currentStep >= simulatedTrades.length}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
              <Button 
                onClick={handlePause} 
                disabled={!isRunning}
                size="sm"
                variant="outline"
              >
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button 
                onClick={handleReset}
                size="sm"
                variant="outline"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Strategy Code Preview */}
            <div>
              <h4 className="text-sm font-medium mb-2">Strategy Code</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs h-48 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{strategy.substring(0, 500)}...</pre>
              </div>
            </div>
            
            {/* Execution Logs */}
            <div>
              <h4 className="text-sm font-medium mb-2">Live Execution Log</h4>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs h-48 overflow-y-auto">
                {executionLogs.length === 0 ? (
                  <div className="text-yellow-400">Waiting for execution to start...</div>
                ) : (
                  executionLogs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))
                )}
                {isRunning && (
                  <div className="text-yellow-400 animate-pulse">Processing next signal...</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Trade Summary */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Trade Summary</h4>
            <div className="border rounded">
              <div className="grid grid-cols-5 gap-2 p-2 bg-gray-50 text-xs font-medium">
                <div>Day</div>
                <div>Action</div>
                <div>Price</div>
                <div>Shares</div>
                <div>Reason</div>
              </div>
              {tradeEvents.map((trade, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 p-2 border-t text-xs">
                  <div>{trade.day}</div>
                  <div className={trade.action === 'BUY' ? 'text-green-600' : 'text-red-600'}>
                    {trade.action}
                  </div>
                  <div>${trade.price}</div>
                  <div>{trade.shares}</div>
                  <div>{trade.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
