import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export function LiveFeed() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const crowdLimit = 25;

  // Simulate real-time crowd detection
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 40);
      setCurrentCount(newCount);
      setIsAlertActive(newCount > crowdLimit);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, crowdLimit]);

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Live Detection Feed</h3>
          <div className="flex items-center space-x-2">
            <Badge variant={isAlertActive ? "destructive" : "secondary"} className="animate-pulse-glow">
              {isAlertActive ? "ALERT" : "NORMAL"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative bg-background/20 rounded-lg aspect-video overflow-hidden">
          {/* Simulated video feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* People detection boxes simulation */}
            {Array.from({ length: currentCount }).map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-12 border-2 border-primary rounded animate-pulse-glow"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 70 + 15}%`,
                  borderColor: isAlertActive ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'
                }}
              />
            ))}
          </div>

          {/* Overlay info */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-background/80 backdrop-blur-sm rounded px-3 py-1">
              <span className="text-sm font-medium">Count: {currentCount}</span>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded px-3 py-1">
              <span className="text-sm font-medium">Limit: {crowdLimit}</span>
            </div>
          </div>

          {isAlertActive && (
            <div className="absolute top-4 right-4 bg-destructive/90 backdrop-blur-sm rounded px-3 py-2 flex items-center space-x-2 animate-pulse-glow">
              <AlertTriangle className="h-4 w-4 text-destructive-foreground" />
              <span className="text-sm font-medium text-destructive-foreground">Limit Exceeded</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-background/80 backdrop-blur-sm rounded p-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Camera 1 - Main Entrance</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}