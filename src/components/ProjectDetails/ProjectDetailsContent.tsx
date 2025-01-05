import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangle, Calendar as CalendarIcon, Edit2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectProgress } from "./ProjectProgress";
import { TeamMembers } from "./TeamMembers";

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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
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

      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              {isEditing ? (
                <div className="space-x-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {format(editedData.startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedData.startDate}
                        onSelect={(date) => date && setEditedData({ ...editedData, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <span>to</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {format(editedData.endDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedData.endDate}
                        onSelect={(date) => date && setEditedData({ ...editedData, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <span>
                  {format(editedData.startDate, "PPP")} to {format(editedData.endDate, "PPP")}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Objective</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedData.objective}
              onChange={(e) => setEditedData({ ...editedData, objective: e.target.value })}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-700">{editedData.objective}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedData.resources}
              onChange={(e) => setEditedData({ ...editedData, resources: e.target.value })}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-700">{editedData.resources}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-5 w-5 text-gray-500" />
            {isEditing ? (
              <select
                value={editedData.risk}
                onChange={(e) => setEditedData({ ...editedData, risk: e.target.value })}
                className="border rounded px-3 py-1"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            ) : (
              <span className={`px-3 py-1 rounded-full ${getRiskColor(risk)}`}>
                {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk Level
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedData.notes}
              onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-700">{editedData.notes}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};