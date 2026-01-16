import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CheckSquare, Users, Layers, ListTodo, ChevronLeft, Clock, Calendar as CalendarIcon, Filter, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const completedProjects = [
  {
    id: "1",
    title: "Project 12344",
    priority: "medium",
    duration: "1 month duration",
    completedDate: "16/02/2026",
    manager: { initials: "AD", name: "Admin" },
    members: 1,
    phases: 2,
    tasks: 2,
  },
];

export default function CompletedProjectsPage() {
  return (
    <DashboardLayout 
      title="Completed Projects" 
      subtitle="Manage your finished projects portfolio."
      showSearch={false}
    >
      {/* Header Badge */}
      <div className="flex items-center gap-3 mb-8">
        <span className="px-3 py-1 text-xs font-medium rounded-md bg-white/10 text-muted-foreground border border-white/10">
          ARCHIVE
        </span>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Date Range</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Status</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TOTAL COMPLETED</p>
              <p className="text-3xl font-bold text-white">1</p>
            </div>
            <div className="icon-container icon-purple">
              <CheckSquare className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TEAM MEMBERS</p>
              <p className="text-3xl font-bold text-white">1</p>
            </div>
            <div className="icon-container icon-blue">
              <Users className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TOTAL PHASES</p>
              <p className="text-3xl font-bold text-white">2</p>
            </div>
            <div className="icon-container icon-purple">
              <Layers className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {completedProjects.map((project) => (
          <div key={project.id} className="glass squircle-sm p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-warning/20 text-warning border border-warning/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    MEDIUM PRIORITY
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    Completed {project.completedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Manager */}
            <div className="p-4 rounded-xl bg-white/5 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {project.manager.initials}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">MANAGER</p>
                  <p className="text-sm font-medium text-white">{project.manager.name}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 flex items-center gap-3">
                <div className="icon-container icon-blue">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">MEMBERS</p>
                  <p className="text-xl font-bold text-white">{project.members}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 flex items-center gap-3">
                <div className="icon-container icon-purple">
                  <Layers className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">PHASES</p>
                  <p className="text-xl font-bold text-white">{project.phases}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 flex items-center gap-3">
                <div className="icon-container icon-blue">
                  <ListTodo className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">TASKS</p>
                  <p className="text-xl font-bold text-white">{project.tasks}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Move to Active
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                View Project Details
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
