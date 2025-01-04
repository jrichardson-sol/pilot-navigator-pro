import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { MetricsOverview } from "@/components/Dashboard/MetricsOverview";
import { ProjectCard } from "@/components/Dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const pilotProjects = [
    {
      title: "Automation Workflow Optimization",
      industry: "Automation",
      progress: 75,
      risk: "low",
      teamSize: 3,
    },
    {
      title: "High-Ticket Sales Framework",
      industry: "Sales",
      progress: 45,
      risk: "medium",
      teamSize: 4,
    },
    {
      title: "E-commerce Conversion Rate",
      industry: "E-commerce",
      progress: 60,
      risk: "low",
      teamSize: 2,
    },
    {
      title: "Persuasion Psychology Study",
      industry: "Psychology",
      progress: 30,
      risk: "high",
      teamSize: 5,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <DashboardHeader />
        <MetricsOverview />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pilot Projects</h2>
          <Button onClick={() => navigate("/project/new")}>
            <Plus className="mr-2" />
            New Project
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilotProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;