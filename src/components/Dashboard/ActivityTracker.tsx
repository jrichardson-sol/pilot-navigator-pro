import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ActivityTracker = () => {
  // This would typically be fetched from your backend
  const mockActivityData = [
    { date: "2024-03-10", count: 5, type: "high" },
    { date: "2024-03-09", count: 3, type: "medium" },
    { date: "2024-03-08", count: 1, type: "low" },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-green-300";
      case "low":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Card className="p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Activity</h3>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {mockActivityData.map((day, index) => (
          <div
            key={day.date}
            className={`w-4 h-4 rounded-sm ${getActivityColor(day.type)} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-green-500`}
            title={`${day.count} activities on ${day.date}`}
          />
        ))}
      </div>
    </Card>
  );
};