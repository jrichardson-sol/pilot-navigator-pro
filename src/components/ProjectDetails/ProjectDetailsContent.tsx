import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Calendar, Target } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-lg">
              {industry}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{progress}% Complete</span>
                <Target className="h-4 w-4" />
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>{teamSize} Members</span>
              <Users className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-5 w-5 text-gray-500" />
            <span className={`px-3 py-1 rounded-full ${getRiskColor(risk)}`}>
              {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk Level
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>Started 2 months ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};