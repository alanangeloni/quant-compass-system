
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
        <div className="bg-white border border-gray-200 rounded p-2 shadow-lg">
          <p className="text-gray-600 text-xs">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
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
          <div className="flex items-center gap-2 bg-white/90 rounded px-2 py-1 border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live Backtesting...</span>
          </div>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          
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
      
      {isAnimating && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 rounded border border-gray-200 p-2 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs text-gray-800">{Math.round((currentIndex / data.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / data.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
