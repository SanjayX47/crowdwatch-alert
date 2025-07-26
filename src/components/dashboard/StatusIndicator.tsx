import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Activity, Wifi, Camera, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface SystemStatus {
  detection: "online" | "offline" | "warning";
  network: "connected" | "disconnected" | "unstable";
  cameras: "active" | "inactive" | "partial";
  security: "secure" | "compromised" | "maintenance";
}

export function StatusIndicator() {
  const [status, setStatus] = useState<SystemStatus>({
    detection: "online",
    network: "connected", 
    cameras: "active",
    security: "secure"
  });

  useEffect(() => {
    // Simulate status changes
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setStatus(prev => ({
          ...prev,
          network: Math.random() > 0.5 ? "connected" : "unstable"
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "connected":
      case "active":
      case "secure":
        return "bg-success text-success-foreground";
      case "warning":
      case "unstable":
      case "partial":
      case "maintenance":
        return "bg-warning text-warning-foreground";
      case "offline":
      case "disconnected":
      case "inactive":
      case "compromised":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const statusItems = [
    {
      icon: Activity,
      label: "Detection Engine",
      status: status.detection,
      details: "Processing video feeds"
    },
    {
      icon: Wifi,
      label: "Network",
      status: status.network,
      details: "Connection stable"
    },
    {
      icon: Camera,
      label: "Cameras",
      status: status.cameras,
      details: "5 cameras active"
    },
    {
      icon: Shield,
      label: "Security",
      status: status.security,
      details: "All systems secure"
    }
  ];

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {statusItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <Badge className={getStatusColor(item.status)} variant="secondary">
                  {item.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}