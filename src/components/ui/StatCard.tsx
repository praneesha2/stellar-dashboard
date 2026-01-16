import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  icon: ReactNode;
  iconColor?: "blue" | "orange" | "red" | "green" | "purple";
}

export function StatCard({ 
  label, 
  value, 
  trend, 
  icon, 
  iconColor = "blue" 
}: StatCardProps) {
  const iconColorClasses = {
    blue: "icon-blue",
    orange: "icon-orange",
    red: "icon-red",
    green: "icon-green",
    purple: "icon-purple",
  };

  return (
    <div className="stat-card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("icon-container", iconColorClasses[iconColor])}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            trend.direction === "up" ? "trend-up" : "trend-down",
            "flex items-center gap-1"
          )}>
            {trend.direction === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}
