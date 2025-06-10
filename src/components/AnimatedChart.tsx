
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

interface AnimatedChartProps {
  data: any[];
  isAnimating?: boolean;
  animationSpeed?: number;
  className?: string;
}

export const AnimatedChart = ({ 
  data, 
  isAnimating = false, 
  animationSpeed = 100,
  className 
}: AnimatedChartProps) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAnimating && currentIndex < data.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next <= data.length) {
            setDisplayData(data.slice(0, next));
            return next;
          }
          return prev;
        });
      }, animationSpeed);
    } else if (!isAnimating) {
      setDisplayData(data);
      setCurrentIndex(data.length);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating, data, animationSpeed, currentIndex]);

  useEffect(() => {
    if (currentIndex >= data.length && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [currentIndex, data.length]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-trading-surface/95 backdrop-blur-sm border border-trading-accent/30 rounded-lg p-3 shadow-xl">
          <p className="text-trading-muted text-sm">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("relative", className)}>
      {isAnimating && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 bg-trading-surface/90 backdrop-blur-sm rounded-full px-3 py-1 border border-trading-accent/30">
            <div className="w-2 h-2 bg-trading-success rounded-full animate-pulse"></div>
            <span className="text-xs text-trading-muted">Live Backtesting...</span>
          </div>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="strategyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#334155" 
            strokeOpacity={0.3}
            horizontal={true}
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Line 
            type="monotone" 
            dataKey="strategy" 
            stroke="#2563eb" 
            strokeWidth={3}
            name="Algorithm"
            dot={false}
            fill="url(#strategyGradient)"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Benchmark (SPY)"
            dot={false}
            fill="url(#benchmarkGradient)"
            strokeDasharray="5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {isAnimating && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-trading-surface/90 backdrop-blur-sm rounded-lg p-2 border border-trading-accent/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-trading-muted">Progress</span>
              <span className="text-xs text-trading-text">{Math.round((currentIndex / data.length) * 100)}%</span>
            </div>
            <div className="w-full bg-trading-accent/20 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-trading-accent to-trading-success h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / data.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
