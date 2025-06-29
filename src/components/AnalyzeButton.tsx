
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface AnalyzeButtonProps {
  isAnalyzing: boolean;
  resumeFile: File | null;
  jobDescription: string;
  onAnalyze: () => void;
}

const AnalyzeButton = ({ isAnalyzing, resumeFile, jobDescription, onAnalyze }: AnalyzeButtonProps) => {
  return (
    <div className="text-center mb-8">
      <Button 
        onClick={onAnalyze}
        disabled={!resumeFile || !jobDescription || isAnalyzing}
        size="lg"
        className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
      >
        {isAnalyzing ? (
          <>
            <Brain className="mr-2 h-5 w-5 animate-pulse" />
            Running Advanced AI Analysis...
          </>
        ) : (
          <>
            <Brain className="mr-2 h-5 w-5" />
            Analyze with AI Pro
          </>
        )}
      </Button>
    </div>
  );
};

export default AnalyzeButton;
