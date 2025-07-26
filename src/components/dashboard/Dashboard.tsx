import { MetricCard } from "./MetricCard";
import { HeatmapChart } from "./HeatmapChart";
import { LiveFeed } from "./LiveFeed";
import { AlertPanel } from "./AlertPanel";
import { AnalyticsChart } from "./AnalyticsChart";
import { StatusIndicator } from "./StatusIndicator";
import { Users, TrendingUp, AlertTriangle, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export function Dashboard() {
  const [metrics, setMetrics] = useState({
    currentCount: 0,
    avgCount: 0,
    totalAlerts: 0,
    camerasActive: 5
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics({
        currentCount: Math.floor(Math.random() * 40),
        avgCount: Math.floor(Math.random() * 25) + 15,
        totalAlerts: Math.floor(Math.random() * 10),
        camerasActive: Math.random() > 0.1 ? 5 : 4
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Crowd Detection Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring and analytics for crowd management
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Count"
          value={metrics.currentCount}
          change={metrics.currentCount > 25 ? "↑ Above Limit" : "↓ Normal"}
          changeType={metrics.currentCount > 25 ? "negative" : "positive"}
          icon={Users}
          gradient={metrics.currentCount > 25 ? "danger" : "primary"}
        />
        
        <MetricCard
          title="24h Average"
          value={metrics.avgCount}
          change="+12% vs yesterday"
          changeType="positive"
          icon={TrendingUp}
          gradient="success"
        />
        
        <MetricCard
          title="Active Alerts"
          value={metrics.totalAlerts}
          change={metrics.totalAlerts > 0 ? "Requires attention" : "All clear"}
          changeType={metrics.totalAlerts > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          gradient={metrics.totalAlerts > 0 ? "danger" : "card"}
        />
        
        <MetricCard
          title="Cameras Online"
          value={`${metrics.camerasActive}/5`}
          change={metrics.camerasActive === 5 ? "All operational" : "1 offline"}
          changeType={metrics.camerasActive === 5 ? "positive" : "negative"}
          icon={Eye}
          gradient={metrics.camerasActive === 5 ? "success" : "danger"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <LiveFeed />
          <AnalyticsChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <StatusIndicator />
          <AlertPanel />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <HeatmapChart />
      </div>
    </div>
  );
}