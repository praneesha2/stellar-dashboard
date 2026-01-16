import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Clock, 
  Users, 
  CheckCircle, 
  Plus, 
  List,
  BarChart2,
  Calendar,
  Layers,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  title: string;
  status: "active" | "completed" | "pending";
  duration: string;
  progress: number;
  daysActive: number;
  overdue: number;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
  assignee: string | null;
  dueDate: string;
}

const mockProject = {
  id: "cmkdt6qsw00056gnxombaiiv4",
  title: "test proj",
  description: "testing",
  status: "in-progress",
  priority: "medium",
  duration: "15/01/2026 - 14/02/2026",
  progress: 100,
  teamMembers: [{ initials: "AD", name: "Admin", role: "director" }],
  tasksCompleted: 1,
  totalTasks: 1,
};

const mockPhases: Phase[] = [
  {
    id: "1",
    title: "test phase 1",
    status: "active",
    duration: "15/01/2026 - 22/01/2026",
    progress: 100,
    daysActive: 2,
    overdue: 0,
    tasks: [
      {
        id: "t1",
        title: "task1",
        description: "test task123",
        status: "completed",
        priority: "medium",
        assignee: null,
        dueDate: "22/01/2026",
      },
    ],
  },
];

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "gantt">("list");
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["1"]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  return (
    <DashboardLayout 
      title="" 
      subtitle=""
      showSearch={false}
    >
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === "list" 
                ? "bg-white/10 text-white" 
                : "text-muted-foreground hover:text-white"
            )}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode("gantt")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === "gantt" 
                ? "bg-white/10 text-white" 
                : "text-muted-foreground hover:text-white"
            )}
          >
            <BarChart2 className="w-4 h-4" />
            Gantt View
          </button>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="glass squircle-sm p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{mockProject.title}</h1>
              <span className="status-pill status-in-progress">In-progress</span>
              <span className="priority-badge priority-medium">Medium Priority</span>
            </div>
            <p className="text-sm text-muted-foreground">{mockProject.description}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm text-white">{mockProject.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="text-sm text-white">{mockProject.progress}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Team Members</p>
              <p className="text-sm text-white">{mockProject.teamMembers.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
              <p className="text-sm text-white">{mockProject.tasksCompleted}/{mockProject.totalTasks}</p>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Overall Progress
          </p>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-success to-success/80"
              style={{ width: `${mockProject.progress}%` }}
            />
          </div>
        </div>

        {/* Team Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Team
          </p>
          <div className="flex items-center gap-2">
            {mockProject.teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {member.initials}
                </div>
                <div>
                  <p className="text-sm text-white">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="glass squircle-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Project Phases</h2>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground">
              Mark as Completed
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Phase
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockPhases.map((phase) => (
            <div key={phase.id} className="rounded-xl bg-white/5 overflow-hidden">
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform",
                      expandedPhases.includes(phase.id) && "rotate-180"
                    )} 
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-white">{phase.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-success/20 text-success">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{phase.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Progress {phase.progress}%</span>
                  </div>
                  <div className="text-muted-foreground">Days Active: {phase.daysActive}</div>
                  <div className="text-muted-foreground">Overdue: {phase.overdue}</div>
                </div>
              </button>

              {/* Phase Content */}
              {expandedPhases.includes(phase.id) && (
                <div className="px-4 pb-4">
                  {/* Filters */}
                  <div className="flex items-center gap-3 mb-4 pl-9">
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-muted-foreground">
                      All Tasks
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-muted-foreground">
                      Sort by Deadline
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium ml-auto">
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3 pl-9">
                    {phase.tasks.map((task) => (
                      <div key={task.id} className="p-4 rounded-xl bg-white/5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-base font-semibold text-white">{task.title}</h4>
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-success/20 text-success">
                              Completed
                            </span>
                            <span className="priority-badge priority-medium">Medium</span>
                          </div>
                          <button className="px-4 py-1.5 rounded-lg bg-success/20 text-success text-sm font-medium">
                            Completed
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{task.assignee || "Unassigned"}</span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            Due {task.dueDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
