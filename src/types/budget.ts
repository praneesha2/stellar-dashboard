// Budget configuration types

export interface RoleCost {
  id: string;
  role: string;
  hourlyRate: number;
  currency: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface TimeLogEntry {
  id: string;
  projectId: string;
  memberId: string;
  memberName: string;
  memberRole: string;
  date: string;
  hours: number;
  description?: string;
}

export interface AdditionalCostEntry {
  id: string;
  projectId: string;
  categoryId: string;
  categoryName: string;
  date: string;
  amount: number;
  description?: string;
  memberId?: string;
  memberName?: string;
}

export interface AdditionalCostCategory {
  id: string;
  name: string;
  icon: string;
  type: "fixed" | "per-day" | "per-person" | "per-hour";
  defaultAmount: number;
  currency: string;
}

export interface ProjectBudget {
  projectId: string;
  laborCost: number;
  additionalCost: number;
  totalBudget: number;
  hoursLogged: number;
  memberCosts: MemberCostSummary[];
}

export interface MemberCostSummary {
  memberId: string;
  memberName: string;
  memberRole: string;
  hoursLogged: number;
  laborCost: number;
  additionalCosts: number;
  totalCost: number;
}

export interface ProjectOption {
  id: string;
  title: string;
  status: string;
}
