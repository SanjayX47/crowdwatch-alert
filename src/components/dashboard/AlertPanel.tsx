import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Alert {
  id: string;
  type: "warning" | "critical" | "resolved";
  message: string;
  timestamp: Date;
  location: string;
}

export function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "warning" : "critical",
          message: Math.random() > 0.5 ? "Crowd limit exceeded" : "Suspicious activity detected",
          timestamp: new Date(),
          location: `Camera ${Math.floor(Math.random() * 5) + 1}`
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case "resolved":
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
          <Badge variant="outline" className="text-xs">
            {alerts.length} active
          </Badge>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No active alerts</p>
              <p className="text-xs text-muted-foreground">System is operating normally</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 bg-background/20 rounded-lg border border-border/30 animate-slide-up"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    {getAlertBadge(alert.type)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-6 w-6 p-0 hover:bg-background/30"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-1">
                    {alert.message}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp.toLocaleTimeString()}</span>
                    </span>
                    <span>{alert.location}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}