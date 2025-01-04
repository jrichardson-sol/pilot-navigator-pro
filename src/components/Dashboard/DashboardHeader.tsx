import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Strategic Pilot Navigator</h1>
        <p className="text-gray-600 mt-1">Track, analyze, and optimize your pilot projects</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Pilot Project
      </Button>
    </div>
  );
};