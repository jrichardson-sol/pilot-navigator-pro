import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OnboardingStep } from "./OnboardingStep";
import { ProgressIndicator } from "./ProgressIndicator";
import type { FormData } from "./types";

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectForm = ({ isOpen, onClose }: NewProjectFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    industry: "",
    objective: "",
    outcomes: "",
    startDate: null,
    endDate: null,
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
    
    if (!formData.title || !formData.industry) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      toast({
        title: "Error",
        description: "End date cannot be earlier than start date",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Project created successfully!",
    });
    navigate(`/project/${encodeURIComponent(formData.title)}`);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create your new project. Required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <OnboardingStep
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
          />

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