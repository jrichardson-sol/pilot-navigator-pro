import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectForm = ({ isOpen, onClose }: NewProjectFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    objective: "",
    outcomes: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    resources: "",
    team: "",
    risks: "",
    notes: "",
  });

  const totalSteps = 10;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.industry) {
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      navigate(`/project/${encodeURIComponent(formData.title)}`);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderStep = () => {
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
                  onSelect={(date) => updateFormData("startDate", date)}
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
                  onSelect={(date) => updateFormData("endDate", date)}
                  initialFocus
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {renderStep()}

          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStep === totalSteps ? (
              <Button type="submit">Create Project</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};