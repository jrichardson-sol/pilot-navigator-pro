import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingDetailsProps {
  isEditing: boolean;
  editedData: {
    objective: string;
    resources: string;
    notes: string;
    startDate: Date;
    endDate: Date;
  };
  setEditedData: (data: any) => void;
}

export const OnboardingDetails = ({ isEditing, editedData, setEditedData }: OnboardingDetailsProps) => {
  const { toast } = useToast();

  const handleDateChange = (type: 'startDate' | 'endDate', date: Date | undefined) => {
    if (!date) return;

    if (type === 'endDate' && date < editedData.startDate) {
      toast({
        title: "Invalid Date",
        description: "End date cannot be earlier than start date",
        variant: "destructive",
      });
      return;
    }

    setEditedData({ ...editedData, [type]: date });
  };

  return (
    <div className="space-y-6">
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
              placeholder="Enter project objective"
            />
          ) : (
            <p className="text-gray-700">{editedData.objective}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
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
                        {editedData.startDate ? format(editedData.startDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedData.startDate}
                        onSelect={(date) => handleDateChange('startDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <span>to</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {editedData.endDate ? format(editedData.endDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedData.endDate}
                        onSelect={(date) => handleDateChange('endDate', date)}
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
          <CardTitle>Required Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedData.resources}
              onChange={(e) => setEditedData({ ...editedData, resources: e.target.value })}
              className="min-h-[100px]"
              placeholder="List required resources and tools"
            />
          ) : (
            <p className="text-gray-700">{editedData.resources}</p>
          )}
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
              placeholder="Add any additional notes"
            />
          ) : (
            <p className="text-gray-700">{editedData.notes}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};