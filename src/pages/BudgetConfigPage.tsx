import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChevronDown, Layers } from "lucide-react";
import { TimeLogSection } from "@/components/budget/TimeLogSection";
import { AdditionalCostsSection } from "@/components/budget/AdditionalCostsSection";
import { CostSummarySection } from "@/components/budget/CostSummarySection";
import { 
  TimeLogEntry, 
  AdditionalCostEntry, 
  ProjectBudget, 
  MemberCostSummary 
} from "@/types/budget";
import {
  defaultRoles,
  defaultAdditionalCostCategories,
  mockProjects,
  mockTeamMembers,
  mockTimeLogs,
  mockAdditionalCosts,
} from "@/data/budgetMockData";

export default function BudgetConfigPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(mockProjects[0]?.id || "");
  const [timeLogs, setTimeLogs] = useState<TimeLogEntry[]>(mockTimeLogs);
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCostEntry[]>(mockAdditionalCosts);

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId);

  // Calculate budget based on time logs and additional costs
  const projectBudget = useMemo((): ProjectBudget => {
    const projectTimeLogs = timeLogs.filter((log) => log.projectId === selectedProjectId);
    const projectAdditionalCosts = additionalCosts.filter((cost) => cost.projectId === selectedProjectId);

    // Calculate labor costs per member
    const memberCostsMap = new Map<string, MemberCostSummary>();

    projectTimeLogs.forEach((log) => {
      const role = defaultRoles.find((r) => r.role === log.memberRole);
      const hourlyRate = role?.hourlyRate || 0;
      const laborCost = log.hours * hourlyRate;

      const existing = memberCostsMap.get(log.memberId);
      if (existing) {
        existing.hoursLogged += log.hours;
        existing.laborCost += laborCost;
        existing.totalCost = existing.laborCost + existing.additionalCosts;
      } else {
        memberCostsMap.set(log.memberId, {
          memberId: log.memberId,
          memberName: log.memberName,
          memberRole: log.memberRole,
          hoursLogged: log.hours,
          laborCost: laborCost,
          additionalCosts: 0,
          totalCost: laborCost,
        });
      }
    });

    // Add additional costs per member
    projectAdditionalCosts.forEach((cost) => {
      if (cost.memberId) {
        const existing = memberCostsMap.get(cost.memberId);
        if (existing) {
          existing.additionalCosts += cost.amount;
          existing.totalCost = existing.laborCost + existing.additionalCosts;
        }
      }
    });

    const memberCosts = Array.from(memberCostsMap.values());
    const laborCost = memberCosts.reduce((sum, m) => sum + m.laborCost, 0);
    const additionalCostTotal = projectAdditionalCosts.reduce((sum, c) => sum + c.amount, 0);
    const hoursLogged = memberCosts.reduce((sum, m) => sum + m.hoursLogged, 0);

    return {
      projectId: selectedProjectId,
      laborCost,
      additionalCost: additionalCostTotal,
      totalBudget: laborCost + additionalCostTotal,
      hoursLogged,
      memberCosts,
    };
  }, [selectedProjectId, timeLogs, additionalCosts]);

  const handleAddTimeLog = (log: Omit<TimeLogEntry, "id">) => {
    setTimeLogs([
      ...timeLogs,
      { ...log, id: `tl-${Date.now()}` },
    ]);
  };

  const handleDeleteTimeLog = (id: string) => {
    setTimeLogs(timeLogs.filter((log) => log.id !== id));
  };

  const handleAddCost = (cost: Omit<AdditionalCostEntry, "id">) => {
    setAdditionalCosts([
      ...additionalCosts,
      { ...cost, id: `ac-${Date.now()}` },
    ]);
  };

  const handleDeleteCost = (id: string) => {
    setAdditionalCosts(additionalCosts.filter((cost) => cost.id !== id));
  };

  return (
    <DashboardLayout
      title="Project Budget"
      subtitle="Track costs and budget per project"
    >
      {/* Project Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Select Project</p>
              <div className="relative">
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="appearance-none bg-transparent text-lg font-semibold text-foreground pr-8 focus:outline-none cursor-pointer"
                >
                  {mockProjects.map((project) => (
                    <option key={project.id} value={project.id} className="bg-popover text-popover-foreground">
                      {project.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          {selectedProject && (
            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary font-medium capitalize">
              {selectedProject.status.replace("-", " ")}
            </span>
          )}
        </div>
      </div>

      {/* Cost Summary */}
      <CostSummarySection budget={projectBudget} />

      {/* Time Logs and Additional Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TimeLogSection
          projectId={selectedProjectId}
          timeLogs={timeLogs}
          teamMembers={mockTeamMembers}
          roles={defaultRoles}
          onAddTimeLog={handleAddTimeLog}
          onDeleteTimeLog={handleDeleteTimeLog}
        />

        <AdditionalCostsSection
          projectId={selectedProjectId}
          additionalCosts={additionalCosts}
          categories={defaultAdditionalCostCategories}
          teamMembers={mockTeamMembers}
          onAddCost={handleAddCost}
          onDeleteCost={handleDeleteCost}
        />
      </div>
    </DashboardLayout>
  );
}
