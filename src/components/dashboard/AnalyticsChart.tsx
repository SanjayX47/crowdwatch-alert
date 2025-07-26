import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useState, useEffect } from "react";

interface ChartData {
  time: string;
  count: number;
  limit: number;
}

export function AnalyticsChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Generate initial data
    const initialData: ChartData[] = [];
    for (let i = 23; i >= 0; i--) {
      const date = new Date();
      date.setHours(date.getHours() - i);
      initialData.push({
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        count: Math.floor(Math.random() * 40),
        limit: 25
      });
    }
    setData(initialData);

    // Update data every minute
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          count: Math.floor(Math.random() * 40),
          limit: 25
        });
        return newData;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">24-Hour Trend</h3>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-1 rounded bg-primary"></div>
              <span className="text-muted-foreground">People Count</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-1 rounded bg-destructive"></div>
              <span className="text-muted-foreground">Limit</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="countGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#countGradient)"
              />
              <Line
                type="monotone"
                dataKey="limit"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}