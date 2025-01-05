import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangle, Users, Calendar as CalendarIcon, Target, Edit2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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
    // In a real app, this would be an API call
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
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Industry</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                value={editedData.industry}
                onChange={(e) => setEditedData({ ...editedData, industry: e.target.value })}
                className="w-full"
              />
            ) : (
              <Badge variant="secondary" className="text-lg">
                {industry}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editedData.progress}
                    onChange={(e) => setEditedData({ ...editedData, progress: parseInt(e.target.value) })}
                    className="w-20"
                  />
                ) : (
                  `${progress}% Complete`
                )}</span>
                <Target className="h-4 w-4" />
              </div>
              <Progress value={isEditing ? editedData.progress : progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {isEditing ? (
                <Input
                  type="number"
                  min="1"
                  value={editedData.teamSize}
                  onChange={(e) => setEditedData({ ...editedData, teamSize: parseInt(e.target.value) })}
                  className="w-20"
                />
              ) : (
                <span>{teamSize} Members</span>
              )}
              <Users className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
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
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editedData.startDate}
                        onSelect={(date) => date && setEditedData({ ...editedData, startDate: date })}
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
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editedData.endDate}
                        onSelect={(date) => date && setEditedData({ ...editedData, endDate: date })}
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