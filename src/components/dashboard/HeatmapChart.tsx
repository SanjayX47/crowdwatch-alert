import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface HeatmapData {
  x: number;
  y: number;
  density: number;
}

export function HeatmapChart() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  // Generate simulated heatmap data
  useEffect(() => {
    const generateData = () => {
      const data: HeatmapData[] = [];
      for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 15; y++) {
          // Create hotspots with random density
          const density = Math.random() * 100;
          data.push({ x, y, density });
        }
      }
      setHeatmapData(data);
    };

    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (density: number) => {
    if (density > 80) return "bg-destructive";
    if (density > 60) return "bg-warning";
    if (density > 40) return "bg-primary";
    if (density > 20) return "bg-info";
    return "bg-muted";
  };

  const getOpacity = (density: number) => {
    return Math.max(0.1, density / 100);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Crowd Density Heatmap</h3>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-muted"></div>
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-primary"></div>
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-warning"></div>
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-destructive"></div>
              <span className="text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>
        
        <div className="relative bg-background/20 rounded-lg p-4 overflow-hidden">
          <div className="grid grid-cols-20 gap-px h-60">
            {heatmapData.map((point, index) => (
              <div
                key={index}
                className={`rounded-sm transition-all duration-300 ${getColor(point.density)}`}
                style={{ 
                  opacity: getOpacity(point.density),
                  minHeight: '4px'
                }}
                title={`Density: ${point.density.toFixed(1)}%`}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse-glow"></div>
        </div>
      </div>
    </Card>
  );
}