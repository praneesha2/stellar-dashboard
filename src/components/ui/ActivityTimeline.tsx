import { CheckCircle, RefreshCw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "completed" | "updated" | "created";
  title: string;
  description: string;
  time: string;
}

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "updated":
        return <RefreshCw className="w-5 h-5" />;
      case "created":
        return <Plus className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "completed":
        return "bg-success/20 text-success border-success/30";
      case "updated":
        return "bg-primary/20 text-primary border-primary/30";
      case "created":
        return "bg-critical/20 text-critical border-critical/30";
    }
  };

  return (
    <div className="glass squircle-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border",
                getIconColor(item.type)
              )}>
                {getIcon(item.type)}
              </div>
              {index < items.length - 1 && (
                <div className="w-px flex-1 bg-white/10 my-2" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
