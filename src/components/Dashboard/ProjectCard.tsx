import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  industry: string;
  progress: number;
  risk: "low" | "medium" | "high";
  teamSize: number;
  status: "new" | "active" | "completed";
  createdAt: Date;
}

export const ProjectCard = ({ 
  title, 
  industry, 
  progress, 
  risk, 
  teamSize,
  status,
  createdAt 
}: ProjectCardProps) => {
  const navigate = useNavigate();

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

  const getStatusBadge = () => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            New
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Completed
          </Badge>
        );
    }
  };

  const handleClick = () => {
    navigate(`/project/${encodeURIComponent(title)}`);
  };

  const isNew = status === "new";
  const daysSinceCreation = Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 3600 * 24));

  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 active:translate-y-0 ${
        isNew ? 'border-blue-200 bg-blue-50/30' : ''
      }`}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {isNew && daysSinceCreation === 0 && (
              <span className="text-xs text-blue-600 mt-1">Added Today</span>
            )}
          </div>
          <div className="flex gap-2">
            {getStatusBadge()}
            <Badge variant="secondary">{industry}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-gray-500" />
              <span className={`text-xs px-2 py-1 rounded ${getRiskColor(risk)}`}>
                {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{teamSize} members</span>
            </div>
          </div>
          {isNew && (
            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Created {daysSinceCreation === 0 ? 'today' : `${daysSinceCreation} days ago`}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};