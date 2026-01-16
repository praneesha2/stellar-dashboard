import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Link as LinkIcon, 
  Upload, 
  Calendar as CalendarIcon,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  type: "task" | "meeting" | "reminder" | "outsourcing";
  time?: string;
  date: number;
  priority?: "high" | "medium" | "low";
}

const connectedCalendars = [
  { id: "1", name: "Public Holidays", type: "holidays", color: "bg-critical", synced: "16/01/2026, 14:15:10" },
  { id: "2", name: "Google (chirathsanduwara36@gmail.com)", type: "google", color: "bg-primary", synced: "16/01/2026, 19:05:50" },
  { id: "3", name: "outlook bank", type: "ics-url", color: "bg-primary", synced: "16/01/2026, 14:15:12" },
  { id: "4", name: "praneesha2", type: "ics-url", color: "bg-pink-500", synced: "16/01/2026, 14:15:14" },
];

const events: CalendarEvent[] = [
  { id: "1", title: "Duruthu...", type: "outsourcing", date: 3, time: "00:00" },
  { id: "2", title: "Ta...", type: "task", date: 15, time: "00:00" },
  { id: "3", title: "Pr...", type: "task", date: 15, time: "14:30" },
  { id: "4", title: "me...", type: "meeting", date: 15, time: "11:30" },
  { id: "5", title: "12...", type: "reminder", date: 16, time: "19:30" },
];

const todaysEvents = [
  { id: "1", title: "1234", type: "TASK", time: "19:30 – 20:00", priority: "MEDIUM" },
];

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function CalendarPage() {
  const [currentMonth] = useState("January 2026");
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Month");
  
  // Generate calendar days for January 2026
  const generateCalendarDays = () => {
    const days = [];
    // January 2026 starts on Thursday, so we need 3 empty cells before
    for (let i = 0; i < 3; i++) {
      days.push({ day: null, events: [] });
    }
    for (let i = 1; i <= 31; i++) {
      const dayEvents = events.filter(e => e.date === i);
      days.push({ day: i, events: dayEvents });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getEventColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "task": return "bg-primary text-white";
      case "meeting": return "bg-success text-white";
      case "reminder": return "bg-warning text-white";
      case "outsourcing": return "bg-critical text-white";
    }
  };

  return (
    <DashboardLayout 
      title="Calendar" 
      subtitle="Schedule & events"
      showSearch={false}
    >
      {/* Breadcrumb & View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">Calendar</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            {["Day", "Week", "Month"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as typeof viewMode)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  viewMode === mode 
                    ? "bg-white/10 text-white" 
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-sm text-muted-foreground">Holidays:</span>
            <span className="text-sm text-white font-medium">Sri Lanka (LK)</span>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium">
            All Events
          </button>
        </div>
      </div>

      {/* Connected Calendars */}
      <div className="glass squircle-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-white">Connected Calendars</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Connect Google</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Connect Outlook</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <LinkIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add ICS URL</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload .ics</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {connectedCalendars.map((cal) => (
            <div key={cal.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <span className={cn("w-2.5 h-2.5 rounded-full", cal.color)} />
                <div>
                  <p className="text-sm font-medium text-white">{cal.name}</p>
                  <p className="text-xs text-muted-foreground">{cal.type} • synced {cal.synced}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="glass squircle-sm p-6 mb-6">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{currentMonth}</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="px-4 py-2 ml-4 rounded-lg bg-white/10 text-white text-sm font-medium">
              Today
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px">
          {calendarDays.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "min-h-[100px] p-2 rounded-lg border border-white/5",
                item.day === 16 && "bg-white/5 border-primary/50",
                item.day === 26 && "bg-primary/10 border-primary/30",
                !item.day && "bg-transparent border-transparent"
              )}
            >
              {item.day && (
                <>
                  <span className={cn(
                    "text-sm font-medium",
                    item.day === 16 ? "text-primary" : "text-white"
                  )}>
                    {item.day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {item.events.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded truncate",
                          getEventColor(event.type)
                        )}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                    {item.day === 26 && (
                      <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/20 transition-colors">
                        +
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-6 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-critical" />
            <span className="text-xs text-muted-foreground">Outsourcing</span>
          </div>
        </div>
      </div>

      {/* Today's Events & Select Date */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass squircle-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Today's Events</h3>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-sm text-muted-foreground">16 JAN</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">1 events scheduled</p>
          
          <div className="space-y-3">
            {todaysEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-xl bg-white/5 border-l-2 border-warning">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-white/10 text-muted-foreground">
                    {event.type}
                  </span>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-lg font-semibold text-white mb-1">{event.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                  <span className="text-xs font-medium text-warning">{event.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass squircle-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Select a Date</h3>
          <p className="text-sm text-muted-foreground mb-8">Click on a date to view events</p>
          
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <CalendarIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Select a date to view events</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
