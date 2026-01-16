import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DirectorDashboard from "./pages/DirectorDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import CompletedProjectsPage from "./pages/CompletedProjectsPage";
import CalendarPage from "./pages/CalendarPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DirectorDashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/completed" element={<CompletedProjectsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* Placeholder routes */}
          <Route path="/manager" element={<DirectorDashboard />} />
          <Route path="/invoices" element={<DirectorDashboard />} />
          <Route path="/users" element={<DirectorDashboard />} />
          <Route path="/approvals" element={<DirectorDashboard />} />
          <Route path="/permissions" element={<DirectorDashboard />} />
          <Route path="/register" element={<DirectorDashboard />} />
          <Route path="/documents" element={<DirectorDashboard />} />
          <Route path="/profile" element={<DirectorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
