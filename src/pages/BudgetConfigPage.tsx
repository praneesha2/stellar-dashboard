import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  Users,
  Car,
  Utensils,
  Package,
  Briefcase,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCost {
  id: string;
  role: string;
  hourlyRate: number;
  currency: string;
}

interface AdditionalCostCategory {
  id: string;
  name: string;
  icon: string;
  type: "fixed" | "per-day" | "per-person" | "per-hour";
  defaultAmount: number;
  currency: string;
}

const defaultRoles: RoleCost[] = [
  { id: "1", role: "Director", hourlyRate: 150, currency: "USD" },
  { id: "2", role: "Senior Developer", hourlyRate: 100, currency: "USD" },
  { id: "3", role: "Developer", hourlyRate: 75, currency: "USD" },
  { id: "4", role: "Designer", hourlyRate: 80, currency: "USD" },
  { id: "5", role: "Project Manager", hourlyRate: 90, currency: "USD" },
  { id: "6", role: "QA Engineer", hourlyRate: 60, currency: "USD" },
];

const defaultAdditionalCosts: AdditionalCostCategory[] = [
  { id: "1", name: "Transport", icon: "car", type: "per-day", defaultAmount: 50, currency: "USD" },
  { id: "2", name: "Food & Meals", icon: "food", type: "per-person", defaultAmount: 25, currency: "USD" },
  { id: "3", name: "Equipment", icon: "package", type: "fixed", defaultAmount: 500, currency: "USD" },
  { id: "4", name: "Software Licenses", icon: "briefcase", type: "fixed", defaultAmount: 200, currency: "USD" },
];

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  food: Utensils,
  package: Package,
  briefcase: Briefcase,
};

export default function BudgetConfigPage() {
  const [roles, setRoles] = useState<RoleCost[]>(defaultRoles);
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCostCategory[]>(defaultAdditionalCosts);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddCost, setShowAddCost] = useState(false);
  
  // New role form state
  const [newRole, setNewRole] = useState({ role: "", hourlyRate: 0 });
  const [newCost, setNewCost] = useState<Partial<AdditionalCostCategory>>({ 
    name: "", 
    icon: "package", 
    type: "fixed", 
    defaultAmount: 0 
  });

  // Edit states
  const [editRole, setEditRole] = useState<RoleCost | null>(null);
  const [editCost, setEditCost] = useState<AdditionalCostCategory | null>(null);

  const handleAddRole = () => {
    if (newRole.role && newRole.hourlyRate > 0) {
      setRoles([...roles, { 
        id: Date.now().toString(), 
        role: newRole.role, 
        hourlyRate: newRole.hourlyRate,
        currency: "USD"
      }]);
      setNewRole({ role: "", hourlyRate: 0 });
      setShowAddRole(false);
    }
  };

  const handleAddCost = () => {
    if (newCost.name && newCost.defaultAmount && newCost.defaultAmount > 0) {
      setAdditionalCosts([...additionalCosts, {
        id: Date.now().toString(),
        name: newCost.name,
        icon: newCost.icon || "package",
        type: newCost.type || "fixed",
        defaultAmount: newCost.defaultAmount,
        currency: "USD"
      }]);
      setNewCost({ name: "", icon: "package", type: "fixed", defaultAmount: 0 });
      setShowAddCost(false);
    }
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const handleDeleteCost = (id: string) => {
    setAdditionalCosts(additionalCosts.filter(c => c.id !== id));
  };

  const handleSaveRole = () => {
    if (editRole) {
      setRoles(roles.map(r => r.id === editRole.id ? editRole : r));
      setEditingRoleId(null);
      setEditRole(null);
    }
  };

  const handleSaveCost = () => {
    if (editCost) {
      setAdditionalCosts(additionalCosts.map(c => c.id === editCost.id ? editCost : c));
      setEditingCostId(null);
      setEditCost(null);
    }
  };

  const startEditRole = (role: RoleCost) => {
    setEditingRoleId(role.id);
    setEditRole({ ...role });
  };

  const startEditCost = (cost: AdditionalCostCategory) => {
    setEditingCostId(cost.id);
    setEditCost({ ...cost });
  };

  const getCostTypeLabel = (type: string) => {
    switch (type) {
      case "fixed": return "Fixed Amount";
      case "per-day": return "Per Day";
      case "per-person": return "Per Person";
      case "per-hour": return "Per Hour";
      default: return type;
    }
  };

  return (
    <DashboardLayout 
      title="Budget Configuration" 
      subtitle="Configure role-based hourly rates and additional cost categories"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Role-Based Costs Section */}
        <div className="glass squircle-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Role Hourly Rates</h3>
                <p className="text-xs text-muted-foreground">Configure cost per role</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddRole(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>

          <div className="space-y-3">
            {/* Add Role Form */}
            {showAddRole && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Role Name</label>
                    <input
                      type="text"
                      value={newRole.role}
                      onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                      placeholder="e.g. Junior Developer"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Hourly Rate (USD)</label>
                    <input
                      type="number"
                      value={newRole.hourlyRate || ""}
                      onChange={(e) => setNewRole({ ...newRole, hourlyRate: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setShowAddRole(false)}
                    className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddRole}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Add Role
                  </button>
                </div>
              </div>
            )}

            {/* Role List */}
            {roles.map((role) => (
              <div 
                key={role.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                {editingRoleId === role.id && editRole ? (
                  <div className="flex-1 flex items-center gap-4">
                    <input
                      type="text"
                      value={editRole.role}
                      onChange={(e) => setEditRole({ ...editRole, role: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm">$</span>
                      <input
                        type="number"
                        value={editRole.hourlyRate}
                        onChange={(e) => setEditRole({ ...editRole, hourlyRate: parseFloat(e.target.value) || 0 })}
                        className="w-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                      />
                      <span className="text-muted-foreground text-sm">/hr</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={handleSaveRole}
                        className="p-2 rounded-lg hover:bg-success/20 text-success transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setEditingRoleId(null); setEditRole(null); }}
                        className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-white font-medium">{role.role}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-white">
                        ${role.hourlyRate.toFixed(2)}
                        <span className="text-xs text-muted-foreground font-normal">/hr</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => startEditRole(role)}
                          className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Costs Section */}
        <div className="glass squircle-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-warning" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Additional Cost Categories</h3>
                <p className="text-xs text-muted-foreground">Transport, food, equipment, etc.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddCost(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="space-y-3">
            {/* Add Cost Form */}
            {showAddCost && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Category Name</label>
                    <input
                      type="text"
                      value={newCost.name}
                      onChange={(e) => setNewCost({ ...newCost, name: e.target.value })}
                      placeholder="e.g. Accommodation"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Icon</label>
                    <select
                      value={newCost.icon}
                      onChange={(e) => setNewCost({ ...newCost, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                    >
                      <option value="car">Transport</option>
                      <option value="food">Food</option>
                      <option value="package">Equipment</option>
                      <option value="briefcase">Business</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Cost Type</label>
                    <select
                      value={newCost.type}
                      onChange={(e) => setNewCost({ ...newCost, type: e.target.value as AdditionalCostCategory["type"] })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                    >
                      <option value="fixed">Fixed Amount</option>
                      <option value="per-day">Per Day</option>
                      <option value="per-person">Per Person</option>
                      <option value="per-hour">Per Hour</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Default Amount (USD)</label>
                    <input
                      type="number"
                      value={newCost.defaultAmount || ""}
                      onChange={(e) => setNewCost({ ...newCost, defaultAmount: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setShowAddCost(false)}
                    className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddCost}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            )}

            {/* Cost List */}
            {additionalCosts.map((cost) => {
              const IconComponent = iconMap[cost.icon] || Package;
              return (
                <div 
                  key={cost.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  {editingCostId === cost.id && editCost ? (
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editCost.name}
                          onChange={(e) => setEditCost({ ...editCost, name: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                        />
                        <select
                          value={editCost.type}
                          onChange={(e) => setEditCost({ ...editCost, type: e.target.value as AdditionalCostCategory["type"] })}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                        >
                          <option value="fixed">Fixed Amount</option>
                          <option value="per-day">Per Day</option>
                          <option value="per-person">Per Person</option>
                          <option value="per-hour">Per Hour</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground text-sm">$</span>
                          <input
                            type="number"
                            value={editCost.defaultAmount}
                            onChange={(e) => setEditCost({ ...editCost, defaultAmount: parseFloat(e.target.value) || 0 })}
                            className="w-24 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={handleSaveCost}
                            className="p-2 rounded-lg hover:bg-success/20 text-success transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setEditingCostId(null); setEditCost(null); }}
                            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-warning" />
                        </div>
                        <div>
                          <span className="text-white font-medium">{cost.name}</span>
                          <p className="text-xs text-muted-foreground">{getCostTypeLabel(cost.type)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-white">
                          ${cost.defaultAmount.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditCost(cost)}
                            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCost(cost.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Budget Summary Preview */}
      <div className="mt-8 glass squircle-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-success" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Budget Calculation Preview</h3>
            <p className="text-xs text-muted-foreground">How project budgets are calculated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="text-sm font-medium text-white mb-3">1. Labor Costs</h4>
            <p className="text-xs text-muted-foreground">
              Calculated by multiplying each team member's logged hours by their role's hourly rate.
            </p>
            <div className="mt-3 p-2 rounded-lg bg-primary/10 text-xs text-primary font-mono">
              Σ (Hours × Hourly Rate)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="text-sm font-medium text-white mb-3">2. Additional Costs</h4>
            <p className="text-xs text-muted-foreground">
              Applied based on cost type: fixed, per day, per person, or per hour.
            </p>
            <div className="mt-3 p-2 rounded-lg bg-warning/10 text-xs text-warning font-mono">
              Fixed + (Days × Per-Day) + ...
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="text-sm font-medium text-white mb-3">3. Total Budget</h4>
            <p className="text-xs text-muted-foreground">
              Sum of all labor costs and additional costs for the project.
            </p>
            <div className="mt-3 p-2 rounded-lg bg-success/10 text-xs text-success font-mono">
              Labor + Additional = Total
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
