import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Briefcase,
  Layers,
  CheckSquare,
  Calendar,
  FileText,
  Users,
  UserPlus,
  Clock,
  Shield,
  FileCheck,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "DASHBOARD",
    items: [
      { id: "dashboard", label: "Dashboard", sublabel: "Executive overview", icon: LayoutGrid, path: "/" },
      { id: "manager", label: "Manager Dashboard", sublabel: "Team management", icon: Briefcase, path: "/manager" },
    ],
  },
  {
    title: "PROJECTS",
    items: [
      { id: "projects", label: "Projects", sublabel: "Project portfolio", icon: Layers, path: "/projects" },
      { id: "completed", label: "Completed Projects", sublabel: "Finished projects", icon: CheckSquare, path: "/completed" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { id: "calendar", label: "Calendar", sublabel: "Schedule & events", icon: Calendar, path: "/calendar" },
      { id: "invoices", label: "Slips & Invoices", sublabel: "Financial tracking", icon: FileText, path: "/invoices" },
      { id: "users", label: "User Management", sublabel: "Team & permissions", icon: Users, path: "/users" },
    ],
  },
  {
    title: "ADMIN",
    items: [
      { id: "approvals", label: "Pending Approvals", sublabel: "Approve new users", icon: UserPlus, path: "/approvals" },
      { id: "permissions", label: "Permissions", sublabel: "Access control", icon: Shield, path: "/permissions" },
      { id: "register", label: "Register User", sublabel: "Add new members", icon: UserPlus, path: "/register" },
      { id: "documents", label: "Documents", sublabel: "File management", icon: FileCheck, path: "/documents" },
      { id: "profile", label: "Profile", sublabel: "Your settings", icon: User, path: "/profile" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] glass-strong flex flex-col z-50">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
          <Shield className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">CYBER</h1>
          <p className="text-[10px] text-muted-foreground tracking-[0.3em]">L A B S</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-[10px] font-semibold text-muted-foreground tracking-wider px-4 mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "nav-item w-full text-left",
                    isActive(item.path) && "nav-item-active"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className={cn(
                      "text-[10px] truncate",
                      isActive(item.path) ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {item.sublabel}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Super Admin</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
              <span className="text-[10px] text-muted-foreground">active</span>
            </div>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </div>
      </div>
    </aside>
  );
}
