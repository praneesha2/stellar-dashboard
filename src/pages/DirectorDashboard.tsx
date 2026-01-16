import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { DonutChart } from "@/components/ui/DonutChart";
import { AreaChart } from "@/components/ui/AreaChart";
import { ActivityTimeline } from "@/components/ui/ActivityTimeline";
import { DeadlinesList } from "@/components/ui/DeadlinesList";
import { Layers, RefreshCw, AlertCircle, Activity } from "lucide-react";
import { useState } from "react";
import { ProjectDetailsModal } from "@/components/modals/ProjectDetailsModal";
import { TeamPerformanceModal } from "@/components/modals/TeamPerformanceModal";

const projects = [
  {
    id: "1",
    title: "Mobile App Redesign",
    priority: "high" as const,
    owner: "Sarah Johnson",
    progress: 75,
    timeAllocation: 75,
    loggedHours: "150h",
    allocatedHours: "200h",
    status: "in-progress" as const,
    teamMembers: ["S", "M", "A"],
  },
  {
    id: "2",
    title: "Backend API Development",
    priority: "medium" as const,
    owner: "Mike Chen",
    progress: 60,
    timeAllocation: 60,
    loggedHours: "90h",
    allocatedHours: "150h",
    status: "in-progress" as const,
    teamMembers: ["M", "D"],
  },
  {
    id: "3",
    title: "Design System",
    priority: "high" as const,
    owner: "Alex Rodriguez",
    progress: 90,
    timeAllocation: 92,
    loggedHours: "110h",
    allocatedHours: "120h",
    status: "in-review" as const,
    teamMembers: ["A", "S"],
  },
  {
    id: "4",
    title: "Database Migration",
    priority: "medium" as const,
    owner: "David Kim",
    progress: 100,
    timeAllocation: 95,
    loggedHours: "95h",
    allocatedHours: "100h",
    status: "completed" as const,
    teamMembers: ["D", "M"],
  },
  {
    id: "5",
    title: "User Authentication",
    priority: "critical" as const,
    owner: "Sarah Johnson",
    progress: 20,
    timeAllocation: 19,
    loggedHours: "15h",
    allocatedHours: "80h",
    status: "blocked" as const,
    teamMembers: ["S", "M"],
  },
];

const activityItems = [
  {
    id: "1",
    type: "completed" as const,
    title: "Task completed",
    description: 'User completed "Design system implementation"',
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "updated" as const,
    title: "Project updated",
    description: 'Project "Mobile App Redesign" status changed to In Review',
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "created" as const,
    title: "New task created",
    description: 'Task "API Documentation" added to project',
    time: "6 hours ago",
  },
];

const deadlines = [
  {
    id: "1",
    title: "User Authentication Flow",
    project: "Mobile App Redesign",
    date: "2024-01-15",
    status: "due" as const,
  },
  {
    id: "2",
    title: "Database Schema Design",
    project: "Backend API",
    date: "2024-01-16",
    status: "due" as const,
  },
  {
    id: "3",
    title: "UI Component Library",
    project: "Design System",
    date: "2024-01-18",
    status: "due" as const,
  },
];

const chartSegments = [
  { value: 60, color: "hsl(211, 100%, 50%)", label: "In Progress" },
  { value: 25, color: "hsl(25, 95%, 53%)", label: "In Review" },
  { value: 15, color: "hsl(142, 71%, 45%)", label: "Completed" },
];

export default function DirectorDashboard() {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.id === "1") {
      setSelectedProject(project);
      setShowTeamModal(true);
    }
  };

  return (
    <DashboardLayout 
      title="Director Dashboard" 
      subtitle="Executive overview of project performance and team productivity"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Active Projects"
          value={2}
          trend={{ value: "+2%", direction: "up" }}
          icon={<Layers className="w-6 h-6" strokeWidth={1.5} />}
          iconColor="blue"
        />
        <StatCard
          label="Tasks in Progress"
          value={48}
          trend={{ value: "-5%", direction: "down" }}
          icon={<RefreshCw className="w-6 h-6" strokeWidth={1.5} />}
          iconColor="orange"
        />
        <StatCard
          label="Overdue Tasks"
          value={3}
          trend={{ value: "-2%", direction: "down" }}
          icon={<AlertCircle className="w-6 h-6" strokeWidth={1.5} />}
          iconColor="red"
        />
        <StatCard
          label="On-Track %"
          value={87}
          trend={{ value: "+3%", direction: "up" }}
          icon={<Activity className="w-6 h-6" strokeWidth={1.5} />}
          iconColor="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass squircle-sm p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
            Project Status Distribution
          </h3>
          <DonutChart
            segments={chartSegments}
            centerText="5"
            centerSubtext="TOTAL"
          />
        </div>
        <AreaChart title="Progress Over Time" />
      </div>

      {/* All Projects */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTimeline items={activityItems} />
        <DeadlinesList items={deadlines} />
      </div>

      {/* Team Performance Modal */}
      {selectedProject && (
        <TeamPerformanceModal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          project={selectedProject}
        />
      )}
    </DashboardLayout>
  );
}
