import { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { TimeLogEntry, TeamMember, RoleCost } from "@/types/budget";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TimeLogSectionProps {
  projectId: string;
  timeLogs: TimeLogEntry[];
  teamMembers: TeamMember[];
  roles: RoleCost[];
  onAddTimeLog: (log: Omit<TimeLogEntry, "id">) => void;
  onDeleteTimeLog: (id: string) => void;
}

export function TimeLogSection({
  projectId,
  timeLogs,
  teamMembers,
  roles,
  onAddTimeLog,
  onDeleteTimeLog,
}: TimeLogSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMember, setSelectedMember] = useState("");
  const [hours, setHours] = useState<number>(0);
  const [description, setDescription] = useState("");

  const projectLogs = timeLogs.filter((log) => log.projectId === projectId);

  const handleAddLog = () => {
    if (!selectedMember || hours <= 0 || !selectedDate) return;

    const member = teamMembers.find((m) => m.id === selectedMember);
    if (!member) return;

    onAddTimeLog({
      projectId,
      memberId: member.id,
      memberName: member.name,
      memberRole: member.role,
      date: format(selectedDate, "yyyy-MM-dd"),
      hours,
      description,
    });

    setSelectedMember("");
    setHours(0);
    setDescription("");
    setShowAddForm(false);
  };

  const getRoleRate = (roleName: string) => {
    const role = roles.find((r) => r.role === roleName);
    return role?.hourlyRate || 0;
  };

  return (
    <div className="glass squircle-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Time Logs</h3>
            <p className="text-xs text-muted-foreground">Track hours per team member</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Hours
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Team Member</label>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">Select member...</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
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
              <label className="text-xs text-muted-foreground mb-1.5 block">Hours</label>
              <input
                type="number"
                value={hours || ""}
                onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0.5"
                step="0.5"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was worked on?"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLog}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Add Log
            </button>
          </div>
        </div>
      )}

      {/* Time Logs List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {projectLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No time logs for this project yet.
          </div>
        ) : (
          projectLogs.map((log) => {
            const rate = getRoleRate(log.memberRole);
            const cost = log.hours * rate;
            return (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                    {log.memberName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">{log.memberName}</span>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
                        {log.memberRole}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(log.date), "MMM d, yyyy")}
                      {log.description && ` • ${log.description}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">{log.hours}h</span>
                    <p className="text-xs text-muted-foreground">${cost.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onDeleteTimeLog(log.id)}
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
