import { useState } from "react";
import { Plus, Trash2, Calendar, Car, Utensils, Package, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { AdditionalCostEntry, AdditionalCostCategory, TeamMember } from "@/types/budget";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AdditionalCostsSectionProps {
  projectId: string;
  additionalCosts: AdditionalCostEntry[];
  categories: AdditionalCostCategory[];
  teamMembers: TeamMember[];
  onAddCost: (cost: Omit<AdditionalCostEntry, "id">) => void;
  onDeleteCost: (id: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  food: Utensils,
  package: Package,
  briefcase: Briefcase,
};

export function AdditionalCostsSection({
  projectId,
  additionalCosts,
  categories,
  teamMembers,
  onAddCost,
  onDeleteCost,
}: AdditionalCostsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");

  const projectCosts = additionalCosts.filter((cost) => cost.projectId === projectId);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setAmount(category.defaultAmount);
    }
  };

  const handleAddCost = () => {
    if (!selectedCategory || amount <= 0 || !selectedDate) return;

    const category = categories.find((c) => c.id === selectedCategory);
    if (!category) return;

    const member = teamMembers.find((m) => m.id === selectedMember);

    onAddCost({
      projectId,
      categoryId: category.id,
      categoryName: category.name,
      date: format(selectedDate, "yyyy-MM-dd"),
      amount,
      description,
      memberId: member?.id,
      memberName: member?.name,
    });

    setSelectedCategory("");
    setSelectedMember("");
    setAmount(0);
    setDescription("");
    setShowAddForm(false);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? iconMap[category.icon] || Package : Package;
  };

  return (
    <div className="glass squircle-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
            <Package className="w-5 h-5 text-warning" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Additional Costs</h3>
            <p className="text-xs text-muted-foreground">Transport, food, equipment, etc.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Cost
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">Select category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm text-left focus:outline-none focus:border-primary/50 flex items-center justify-between">
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Team Member (optional)</label>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">Select member...</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Amount (USD)</label>
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this expense for?"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCost}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Add Cost
            </button>
          </div>
        </div>
      )}

      {/* Costs List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {projectCosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No additional costs for this project yet.
          </div>
        ) : (
          projectCosts.map((cost) => {
            const IconComponent = getCategoryIcon(cost.categoryId);
            return (
              <div
                key={cost.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">{cost.categoryName}</span>
                      {cost.memberName && (
                        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
                          {cost.memberName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(cost.date), "MMM d, yyyy")}
                      {cost.description && ` • ${cost.description}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-foreground">${cost.amount.toFixed(2)}</span>
                  <button
                    onClick={() => onDeleteCost(cost.id)}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
