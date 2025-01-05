import { useState } from "react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { MetricsOverview } from "@/components/Dashboard/MetricsOverview";
import { ProjectCard } from "@/components/Dashboard/ProjectCard";
import { ActivityTracker } from "@/components/Dashboard/ActivityTracker";
import { NewProjectForm } from "@/components/Dashboard/NewProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const Index = () => {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pilotProjects = [
    {
      title: "Automation Workflow Optimization",
      industry: "Automation",
      progress: 75,
      risk: "low",
      teamSize: 3,
      status: "active",
      createdAt: new Date("2024-02-20"),
    },
    {
      title: "High-Ticket Sales Framework",
      industry: "Sales",
      progress: 45,
      risk: "medium",
      teamSize: 4,
      status: "new",
      createdAt: new Date("2024-02-25"),
    },
    {
      title: "E-commerce Conversion Rate",
      industry: "E-commerce",
      progress: 60,
      risk: "low",
      teamSize: 2,
      status: "active",
      createdAt: new Date("2024-02-15"),
    },
    {
      title: "Persuasion Psychology Study",
      industry: "Psychology",
      progress: 30,
      risk: "high",
      teamSize: 5,
      status: "new",
      createdAt: new Date("2024-02-26"),
    },
  ] as const;

  const filteredProjects = pilotProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newProjects = filteredProjects.filter(project => project.status === "new");
  const activeProjects = filteredProjects.filter(project => project.status === "active");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <DashboardHeader />
        <MetricsOverview />
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* New Projects Section */}
        {newProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">New Projects</h2>
              <Button variant="outline" size="sm">
                View All New Projects
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        )}

        {/* Active Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Active Projects</h2>
            <Button 
              onClick={() => setIsNewProjectDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        <ActivityTracker />
      </div>
      <NewProjectForm 
        isOpen={isNewProjectDialogOpen}
        onClose={() => setIsNewProjectDialogOpen(false)}
      />
    </div>
  );
};

export default Index;