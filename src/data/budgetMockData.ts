import { 
  RoleCost, 
  TeamMember, 
  TimeLogEntry, 
  AdditionalCostEntry, 
  AdditionalCostCategory,
  ProjectOption 
} from "@/types/budget";

export const defaultRoles: RoleCost[] = [
  { id: "1", role: "Director", hourlyRate: 150, currency: "USD" },
  { id: "2", role: "Senior Developer", hourlyRate: 100, currency: "USD" },
  { id: "3", role: "Developer", hourlyRate: 75, currency: "USD" },
  { id: "4", role: "Designer", hourlyRate: 80, currency: "USD" },
  { id: "5", role: "Project Manager", hourlyRate: 90, currency: "USD" },
  { id: "6", role: "QA Engineer", hourlyRate: 60, currency: "USD" },
];

export const defaultAdditionalCostCategories: AdditionalCostCategory[] = [
  { id: "1", name: "Transport", icon: "car", type: "per-day", defaultAmount: 50, currency: "USD" },
  { id: "2", name: "Food & Meals", icon: "food", type: "per-person", defaultAmount: 25, currency: "USD" },
  { id: "3", name: "Equipment", icon: "package", type: "fixed", defaultAmount: 500, currency: "USD" },
  { id: "4", name: "Software Licenses", icon: "briefcase", type: "fixed", defaultAmount: 200, currency: "USD" },
];

export const mockProjects: ProjectOption[] = [
  { id: "proj-1", title: "Mobile App Redesign", status: "in-progress" },
  { id: "proj-2", title: "Backend API Development", status: "planning" },
  { id: "proj-3", title: "E-commerce Platform", status: "in-progress" },
  { id: "proj-4", title: "Analytics Dashboard", status: "completed" },
];

export const mockTeamMembers: TeamMember[] = [
  { id: "member-1", name: "Sarah Chen", role: "Senior Developer", initials: "SC" },
  { id: "member-2", name: "Alex Johnson", role: "Designer", initials: "AJ" },
  { id: "member-3", name: "Mike Peters", role: "Developer", initials: "MP" },
  { id: "member-4", name: "Emily Davis", role: "Project Manager", initials: "ED" },
  { id: "member-5", name: "James Wilson", role: "QA Engineer", initials: "JW" },
];

export const mockTimeLogs: TimeLogEntry[] = [
  { id: "tl-1", projectId: "proj-1", memberId: "member-1", memberName: "Sarah Chen", memberRole: "Senior Developer", date: "2026-01-28", hours: 8, description: "Feature implementation" },
  { id: "tl-2", projectId: "proj-1", memberId: "member-1", memberName: "Sarah Chen", memberRole: "Senior Developer", date: "2026-01-27", hours: 6, description: "Code review" },
  { id: "tl-3", projectId: "proj-1", memberId: "member-2", memberName: "Alex Johnson", memberRole: "Designer", date: "2026-01-28", hours: 4, description: "UI mockups" },
  { id: "tl-4", projectId: "proj-1", memberId: "member-3", memberName: "Mike Peters", memberRole: "Developer", date: "2026-01-28", hours: 7, description: "Backend work" },
  { id: "tl-5", projectId: "proj-1", memberId: "member-4", memberName: "Emily Davis", memberRole: "Project Manager", date: "2026-01-27", hours: 3, description: "Sprint planning" },
  { id: "tl-6", projectId: "proj-2", memberId: "member-1", memberName: "Sarah Chen", memberRole: "Senior Developer", date: "2026-01-28", hours: 4, description: "API design" },
];

export const mockAdditionalCosts: AdditionalCostEntry[] = [
  { id: "ac-1", projectId: "proj-1", categoryId: "1", categoryName: "Transport", date: "2026-01-28", amount: 75, description: "Client meeting travel" },
  { id: "ac-2", projectId: "proj-1", categoryId: "2", categoryName: "Food & Meals", date: "2026-01-27", amount: 120, description: "Team lunch", memberId: "member-1", memberName: "Sarah Chen" },
  { id: "ac-3", projectId: "proj-1", categoryId: "3", categoryName: "Equipment", date: "2026-01-25", amount: 350, description: "Monitor for testing" },
  { id: "ac-4", projectId: "proj-2", categoryId: "4", categoryName: "Software Licenses", date: "2026-01-26", amount: 200, description: "Dev tools" },
];
