import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface ProjectProgressProps {
  progress: number;
  isEditing: boolean;
  editedData: {
    progress: number;
  };
  setEditedData: (data: any) => void;
}

export const ProjectProgress = ({ progress, isEditing, editedData, setEditedData }: ProjectProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>
              {isEditing ? (
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
              )}
            </span>
            <Target className="h-4 w-4" />
          </div>
          <Progress value={isEditing ? editedData.progress : progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};