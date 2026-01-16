import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description?: string;
    priority: "high" | "medium" | "low" | "critical";
    status: "in-progress" | "planning" | "completed" | "blocked";
    startDate: string;
    endDate: string;
    progress: number;
    allocatedHours: number;
    loggedHours: number;
    remainingHours: number;
    teamMembers: { initials: string; name: string }[];
  };
}

export function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  if (!isOpen) return null;

  const statusLabels = {
    "in-progress": "IN_PROGRESS",
    "planning": "PLANNING",
    "completed": "COMPLETED",
    "blocked": "BLOCKED",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 glass-strong squircle p-8 animate-scale-in">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>

        {/* Project Title & Status */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <div className="flex items-center gap-2">
            <span className="status-pill status-in-progress">
              {statusLabels[project.status]}
            </span>
            <span className={cn("priority-badge", `priority-${project.priority}`)}>
              {project.priority.toUpperCase()}
            </span>
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-muted-foreground mb-6">{project.description}</p>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Project Information */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              PROJECT INFORMATION
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Project ID:</span>
                <span className="text-sm text-white font-mono">{project.id.slice(0, 20)}...</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Owner:</span>
                <span className="text-sm text-muted-foreground italic">(no value shown)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span className="text-sm text-white">{project.startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <span className="text-sm text-white">{project.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress:</span>
                <span className="text-sm text-success font-medium">{project.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Allocated Hours:</span>
                <span className="text-sm text-white">{project.allocatedHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Logged Hours:</span>
                <span className="text-sm text-white">{project.loggedHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remaining Hours:</span>
                <span className="text-sm text-white">{project.remainingHours}h</span>
              </div>
            </div>
          </div>

          {/* Team & Tags */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              TEAM & TAGS
            </h4>
            <p className="text-sm text-muted-foreground mb-3">Team Members:</p>
            <div className="space-y-2 mb-6">
              {project.teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {member.initials}
                  </div>
                  <span className="text-sm text-white">{member.name}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">Tags:</p>
            <p className="text-sm text-muted-foreground italic">(no tags shown)</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="p-4 rounded-xl bg-white/5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              OVERALL PROGRESS
            </span>
            <span className="text-lg font-bold text-white">{project.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-success to-success/80 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-muted hover:bg-muted/80 text-white font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
