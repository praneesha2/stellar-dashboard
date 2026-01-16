import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  priority: "high" | "medium" | "low" | "critical";
  owner: string;
  progress: number;
  timeAllocation: number;
  loggedHours: string;
  allocatedHours: string;
  status: "in-progress" | "completed" | "in-review" | "blocked";
  teamMembers: string[];
  onClick?: () => void;
}

export function ProjectCard({
  title,
  priority,
  owner,
  progress,
  timeAllocation,
  loggedHours,
  allocatedHours,
  status,
  teamMembers,
  onClick,
}: ProjectCardProps) {
  const priorityLabels = {
    high: "HIGH",
    medium: "MEDIUM",
    low: "LOW",
    critical: "CRITICAL",
  };

  const statusLabels = {
    "in-progress": "IN PROGRESS",
    "completed": "COMPLETED",
    "in-review": "IN REVIEW",
    "blocked": "BLOCKED",
  };

  const getProgressBarColor = (value: number) => {
    if (value >= 90) return "progress-red";
    if (value >= 75) return "progress-orange";
    return "progress-blue";
  };

  return (
    <div 
      className="glass squircle-sm p-6 card-hover cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={cn("priority-badge", `priority-${priority}`)}>
          {priorityLabels[priority]}
        </span>
      </div>

      {/* Owner */}
      <p className="text-sm text-muted-foreground mb-4">Owner: {owner}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-white">{progress}%</span>
        </div>
        <div className="progress-track">
          <div 
            className={cn("progress-fill progress-blue")}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time Allocation */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-muted-foreground">Time Allocation</span>
          <span className="text-sm font-medium text-white">{timeAllocation}%</span>
        </div>
        <div className="progress-track">
          <div 
            className={cn("progress-fill", getProgressBarColor(timeAllocation))}
            style={{ width: `${timeAllocation}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-muted-foreground">Logged: {loggedHours}</span>
          <span className="text-[10px] text-muted-foreground">Allocated: {allocatedHours}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className={cn("status-pill", `status-${status}`)}>
          {statusLabels[status]}
        </span>
        <div className="avatar-stack">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div 
              key={index} 
              className="avatar-sm bg-gradient-to-br from-primary/50 to-critical/50"
            >
              {member}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
