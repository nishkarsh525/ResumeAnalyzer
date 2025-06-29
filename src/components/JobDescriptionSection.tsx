
import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';
import JobDescriptionInput from '@/components/JobDescriptionInput';

interface JobDescriptionSectionProps {
  jobDescription: string;
  onChange: (value: string) => void;
}

const JobDescriptionSection = ({ jobDescription, onChange }: JobDescriptionSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Target className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
      </div>
      <JobDescriptionInput 
        value={jobDescription}
        onChange={onChange}
      />
    </Card>
  );
};

export default JobDescriptionSection;
