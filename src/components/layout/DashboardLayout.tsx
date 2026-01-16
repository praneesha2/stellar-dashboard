import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Bell, Search, Command } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}

export function DashboardLayout({ 
  children, 
  title, 
  subtitle,
  showSearch = true 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background mesh-gradient">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-[280px] min-h-screen">
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/5">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {showSearch && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                  <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">Search...</span>
                  <div className="flex items-center gap-0.5 ml-8">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-white/5 rounded border border-white/10">
                      <Command className="w-3 h-3 inline-block" />
                    </kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-white/5 rounded border border-white/10">
                      K
                    </kbd>
                  </div>
                </div>
              )}
              
              <div className="w-px h-6 bg-white/10" />
              
              <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
