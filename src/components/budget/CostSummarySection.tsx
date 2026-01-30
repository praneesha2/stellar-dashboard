import { DollarSign, Clock, Users, TrendingUp } from "lucide-react";
import { MemberCostSummary, ProjectBudget } from "@/types/budget";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface CostSummarySectionProps {
  budget: ProjectBudget;
}

const COLORS = ["hsl(211, 100%, 50%)", "hsl(38, 92%, 50%)", "hsl(142, 71%, 45%)", "hsl(262, 83%, 58%)", "hsl(0, 84%, 60%)"];

export function CostSummarySection({ budget }: CostSummarySectionProps) {
  const pieData = [
    { name: "Labor", value: budget.laborCost },
    { name: "Additional", value: budget.additionalCost },
  ];

  const memberBarData = budget.memberCosts.map((member) => ({
    name: member.memberName.split(" ")[0],
    labor: member.laborCost,
    additional: member.additionalCosts,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-foreground">${budget.totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Labor Cost</p>
              <p className="text-2xl font-bold text-foreground">${budget.laborCost.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Additional</p>
              <p className="text-2xl font-bold text-foreground">${budget.additionalCost.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-warning" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="glass squircle-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hours Logged</p>
              <p className="text-2xl font-bold text-foreground">{budget.hoursLogged}h</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart - Cost Breakdown */}
        <div className="glass squircle-sm p-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Cost Distribution</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Legend
                  wrapperStyle={{ color: "hsl(var(--muted-foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Per Member */}
        <div className="glass squircle-sm p-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Cost per Team Member</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberBarData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))" }} />
                <Bar dataKey="labor" name="Labor" fill="hsl(211, 100%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="additional" name="Additional" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Member Breakdown Table */}
      <div className="glass squircle-sm p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Team Member Cost Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Member</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Role</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Hours</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Labor Cost</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Additional</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {budget.memberCosts.map((member) => (
                <tr key={member.memberId} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                        {member.memberName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-foreground font-medium">{member.memberName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-sm">{member.memberRole}</td>
                  <td className="py-3 px-4 text-right text-foreground">{member.hoursLogged}h</td>
                  <td className="py-3 px-4 text-right text-foreground">${member.laborCost.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-foreground">${member.additionalCosts.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-semibold text-foreground">${member.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
