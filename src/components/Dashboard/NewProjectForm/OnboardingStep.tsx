import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { FormData } from "./types";

interface OnboardingStepProps {
  currentStep: number;
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export const OnboardingStep = ({ currentStep, formData, updateFormData }: OnboardingStepProps) => {
  const handleDateChange = (type: 'startDate' | 'endDate', date: Date | null) => {
    if (!date) return;

    if (type === 'endDate' && formData.startDate && date < formData.startDate) {
      return; // Invalid date selection
    }

    updateFormData(type, date);
  };

  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">What is your project name?</h2>
          <Input
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="Enter project name"
            className="w-full"
            required
          />
        </div>
      );
    case 2:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">Which industry does this project belong to?</h2>
          <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg max-h-[300px] overflow-y-auto">
              <SelectItem value="automation">Automation</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="psychology">Psychology</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">What is the primary objective of this project?</h2>
          <Textarea
            value={formData.objective}
            onChange={(e) => updateFormData("objective", e.target.value)}
            placeholder="Describe your main objective"
            className="min-h-[100px]"
            required
          />
        </div>
      );
    case 4:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">What are the desired outcomes or key metrics for success?</h2>
          <Textarea
            value={formData.outcomes}
            onChange={(e) => updateFormData("outcomes", e.target.value)}
            placeholder="List your key success metrics"
            className="min-h-[100px]"
            required
          />
        </div>
      );
    case 5:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">When will the project start?</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => handleDateChange("startDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    case 6:
      return (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold">When is the project expected to end?</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => handleDateChange("endDate", date)}
                initialFocus
                disabled={(date) => formData.startDate ? date < formData.startDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
      case 7:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold">What resources or tools are required?</h2>
            <Textarea
              value={formData.resources}
              onChange={(e) => updateFormData("resources", e.target.value)}
              placeholder="List required resources and tools"
              className="min-h-[100px]"
            />
          </div>
        );
      case 8:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold">Who will be involved in this project?</h2>
            <Textarea
              value={formData.team}
              onChange={(e) => updateFormData("team", e.target.value)}
              placeholder="List team members or roles (optional)"
              className="min-h-[100px]"
            />
          </div>
        );
      case 9:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold">Are there any known risks or challenges?</h2>
            <Textarea
              value={formData.risks}
              onChange={(e) => updateFormData("risks", e.target.value)}
              placeholder="Describe potential risks and challenges"
              className="min-h-[100px]"
            />
          </div>
        );
      case 10:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold">Any additional notes or comments?</h2>
            <Textarea
              value={formData.notes}
              onChange={(e) => updateFormData("notes", e.target.value)}
              placeholder="Add any additional information (optional)"
              className="min-h-[100px]"
            />
          </div>
        );
    default:
      return null;
  }
};
