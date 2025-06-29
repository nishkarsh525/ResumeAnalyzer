
import { Upload, Target, CheckCircle } from 'lucide-react';

interface ProcessStepsProps {
  resumeFile: File | null;
  jobDescription: string;
  analysisResults: any;
}

const ProcessSteps = ({ resumeFile, jobDescription, analysisResults }: ProcessStepsProps) => {
  const steps = [
    {
      icon: Upload,
      label: 'Upload Resume',
      completed: !!resumeFile,
      color: resumeFile ? 'text-green-600' : 'text-gray-400',
      bgColor: resumeFile ? 'bg-green-100' : 'bg-gray-100'
    },
    {
      icon: Target,
      label: 'Job Description',
      completed: !!jobDescription,
      color: jobDescription ? 'text-green-600' : 'text-gray-400',
      bgColor: jobDescription ? 'bg-green-100' : 'bg-gray-100'
    },
    {
      icon: CheckCircle,
      label: 'AI Analysis',
      completed: !!analysisResults,
      color: analysisResults ? 'text-green-600' : 'text-gray-400',
      bgColor: analysisResults ? 'bg-green-100' : 'bg-gray-100'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-8 mb-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <div className="flex-1 h-0.5 bg-gray-200 w-8"></div>}
              <div className={`p-2 rounded-full ${step.bgColor}`}>
                <IconComponent className={`h-5 w-5 ${step.color}`} />
              </div>
              <span className={`text-sm font-medium ${step.color}`}>
                {step.label}
              </span>
              {index < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-200 w-8"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessSteps;
