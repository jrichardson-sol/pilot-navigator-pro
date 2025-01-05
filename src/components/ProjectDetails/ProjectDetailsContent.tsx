import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectProgress } from "./ProjectProgress";
import { TeamMembers } from "./TeamMembers";
import { OnboardingDetails } from "./OnboardingDetails";

interface ProjectDetailsContentProps {
  industry: string;
  progress: number;
  risk: string;
  teamSize: number;
}

export const ProjectDetailsContent = ({
  industry,
  progress,
  risk,
  teamSize,
}: ProjectDetailsContentProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    industry,
    progress,
    risk,
    teamSize,
    teamMembers: [],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7776000000), // 90 days from now
    objective: "Initial project objective",
    resources: "Required resources",
    notes: "Additional project notes",
  });

  const handleSave = () => {
    if (editedData.endDate < editedData.startDate) {
      toast({
        title: "Error",
        description: "End date cannot be earlier than start date",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Project details updated successfully!",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectHeader
          industry={industry}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        <ProjectProgress
          progress={progress}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        <TeamMembers
          teamSize={teamSize}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </div>

      <OnboardingDetails
        isEditing={isEditing}
        editedData={editedData}
        setEditedData={setEditedData}
      />
    </div>
  );
};