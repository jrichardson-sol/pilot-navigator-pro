import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ProjectHeaderProps {
  industry: string;
  isEditing: boolean;
  editedData: {
    industry: string;
  };
  setEditedData: (data: any) => void;
}

export const ProjectHeader = ({ industry, isEditing, editedData, setEditedData }: ProjectHeaderProps) => {
  return (
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
  );
};