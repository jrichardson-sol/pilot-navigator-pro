interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
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
  );
};