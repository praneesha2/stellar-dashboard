interface Deadline {
  id: string;
  title: string;
  project: string;
  date: string;
  status: "due" | "upcoming";
}

interface DeadlinesListProps {
  items: Deadline[];
}

export function DeadlinesList({ items }: DeadlinesListProps) {
  return (
    <div className="glass squircle-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Upcoming Deadlines</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border-l-2 border-destructive"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.project}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{item.date}</p>
              <p className="text-xs font-medium text-destructive uppercase">DUE</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
