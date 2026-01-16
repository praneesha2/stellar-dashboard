import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Layers, RefreshCw, FileCheck, CheckSquare, Users, Search, ChevronDown, Eye, Edit, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectDetailsModal } from "@/components/modals/ProjectDetailsModal";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  priority: "high" | "medium" | "low" | "critical";
  status: "in-progress" | "planning" | "completed" | "blocked";
  startDate: string;
  endDate: string;
  assignedCount: number;
  progress: number;
  budget: string;
  members: number;
  timeAllocation: number;
  allocatedHours: number;
  loggedHours: number;
  remainingHours: number;
}

const mockProjects: Project[] = [
  {
    id: "cmkdt6qsw00056gnxombaiiv4",
    title: "test proj",
    priority: "medium",
    status: "in-progress",
    startDate: "15/01/2026",
    endDate: "14/02/2026",
    assignedCount: 1,
    progress: 100,
    budget: "$60,000",
    members: 1,
    timeAllocation: 17,
    allocatedHours: 60,
    loggedHours: 10,
    remainingHours: 50,
  },
];

export default function ProjectsPage() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleProjectCardClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <DashboardLayout 
      title="Projects" 
      subtitle="Create and manage your projects"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TOTAL PROJECTS</p>
              <p className="text-3xl font-bold text-white">5</p>
            </div>
            <div className="icon-container icon-blue">
              <Layers className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ACTIVE</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="icon-container icon-green">
              <RefreshCw className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PLANNING</p>
              <p className="text-3xl font-bold text-white">5</p>
            </div>
            <div className="icon-container icon-orange">
              <FileCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">COMPLETED</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="icon-container icon-purple">
              <CheckSquare className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
          <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-sm text-muted-foreground">Status</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-sm text-muted-foreground">Priority</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Recent Projects</h2>
        <p className="text-sm text-muted-foreground mb-6">Your latest projects</p>

        <div className="space-y-6">
          {mockProjects.map((project) => (
            <div 
              key={project.id}
              className="glass squircle-sm p-6 card-hover cursor-pointer"
              onClick={() => handleProjectCardClick(project)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className={cn("priority-badge", `priority-${project.priority}`)}>
                      {project.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Duration: {project.startDate} - {project.endDate}
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="status-pill status-in-progress">
                  IN_PROGRESS
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                  {project.assignedCount} assigned
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProject(project);
                  }}
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Progress */}
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold text-success">{project.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill progress-green"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Time Allocation */}
                <div className="p-4 rounded-xl bg-white/5 flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="hsl(0 0% 100% / 0.1)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="hsl(211, 100%, 50%)"
                        strokeWidth="3"
                        strokeDasharray={`${project.timeAllocation} 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{project.timeAllocation}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white uppercase tracking-wider">TIME ALLOCATION</p>
                    <p className="text-[10px] text-muted-foreground">Project efficiency metric</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-white uppercase tracking-wider">HOURS</p>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <span key={i} className="w-1 h-1 rounded-full bg-muted-foreground" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Allocated:</span>
                      <span className="text-xs text-white">{project.allocatedHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Logged:</span>
                      <span className="text-xs text-primary">{project.loggedHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Remaining:</span>
                      <span className="text-xs text-success">{project.remainingHours}h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget & Members */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.members} members</span>
                </div>
                <span className="text-sm font-medium text-success">{project.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          project={{
            id: selectedProject.id,
            title: selectedProject.title,
            description: "testing",
            priority: selectedProject.priority,
            status: selectedProject.status,
            startDate: selectedProject.startDate,
            endDate: selectedProject.endDate,
            progress: selectedProject.progress,
            allocatedHours: selectedProject.allocatedHours,
            loggedHours: selectedProject.loggedHours,
            remainingHours: selectedProject.remainingHours,
            teamMembers: [{ initials: "AD", name: "Admin" }],
          }}
        />
      )}
    </DashboardLayout>
  );
}
