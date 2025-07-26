import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: "primary" | "success" | "danger" | "card";
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = "card",
  className
}: MetricCardProps) {
  const gradientClass = {
    primary: "bg-gradient-primary",
    success: "bg-gradient-success", 
    danger: "bg-gradient-danger",
    card: "bg-gradient-card"
  }[gradient];

  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className={cn(
      "p-6 border-border/50 shadow-card animate-slide-up",
      gradientClass,
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {change && (
              <span className={cn("text-xs font-medium", changeColor)}>
                {change}
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}