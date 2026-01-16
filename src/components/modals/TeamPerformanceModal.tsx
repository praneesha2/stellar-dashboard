import { X, Clock, FileText, MessageSquare, CheckCircle, Users } from "lucide-react";

interface TeamMember {
  name: string;
  initials: string;
  hoursLogged: number;
  docsShared: number;
  comments: number;
  reviewed: number;
  contribution: number;
}

interface TeamPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
  };
}

const teamMembers: TeamMember[] = [
  { name: "Sarah Johnson", initials: "S", hoursLogged: 14, docsShared: 3, comments: 9, reviewed: 3, contribution: 7 },
  { name: "Mike Chen", initials: "M", hoursLogged: 0, docsShared: 1, comments: 0, reviewed: 0, contribution: 0 },
  { name: "Alex Rodriguez", initials: "A", hoursLogged: 0, docsShared: 0, comments: 0, reviewed: 0, contribution: 0 },
];

export function TeamPerformanceModal({ isOpen, onClose, project }: TeamPerformanceModalProps) {
  if (!isOpen) return null;

  const totalAllocated = 200;
  const totalLogged = 150;
  const utilization = 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl mx-4 glass-strong squircle p-8 animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-white mb-6">
          {project.title} - Team Performance
        </h2>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Allocated</p>
            <p className="text-2xl font-bold text-white">{totalAllocated}h</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Logged</p>
            <p className="text-2xl font-bold text-white">{totalLogged}h</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Utilization</p>
            <p className="text-2xl font-bold text-primary">{utilization}%</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Team Members</p>
            <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
          </div>
        </div>

        {/* Team Members List */}
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="p-6 rounded-xl bg-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-critical/50 flex items-center justify-center text-lg font-semibold">
                  {member.initials}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-muted-foreground">Logged {member.hoursLogged}h</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-5 gap-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time Logged</p>
                    <p className="text-sm font-semibold text-white">{member.hoursLogged}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <FileText className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-xs text-muted-foreground">Docs Shared</p>
                    <p className="text-sm font-semibold text-white">{member.docsShared}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <MessageSquare className="w-4 h-4 text-warning" />
                  <div>
                    <p className="text-xs text-muted-foreground">Comments</p>
                    <p className="text-sm font-semibold text-white">{member.comments}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <CheckCircle className="w-4 h-4 text-critical" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reviewed</p>
                    <p className="text-sm font-semibold text-white">{member.reviewed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <Users className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contrib</p>
                    <p className="text-sm font-semibold text-white">{member.contribution}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
