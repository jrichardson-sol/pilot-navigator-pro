import { useParams } from "react-router-dom";
import { ProjectDetailsHeader } from "@/components/ProjectDetails/ProjectDetailsHeader";
import { ProjectDetailsContent } from "@/components/ProjectDetails/ProjectDetailsContent";

const ProjectDetails = () => {
  const { title } = useParams();
  
  // In a real app, you would fetch project details from an API
  const project = {
    title: decodeURIComponent(title || ""),
    industry: "Automation",
    progress: 75,
    risk: "low",
    teamSize: 3,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 animate-fade-in">
        <ProjectDetailsHeader title={project.title} />
        <ProjectDetailsContent
          industry={project.industry}
          progress={project.progress}
          risk={project.risk}
          teamSize={project.teamSize}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;