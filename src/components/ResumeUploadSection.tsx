
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import FileUpload from '@/components/FileUpload';

interface ResumeUploadSectionProps {
  resumeFile: File | null;
  resumeText: string;
  onFileUpload: (file: File, extractedText: string) => void;
}

const ResumeUploadSection = ({ resumeFile, resumeText, onFileUpload }: ResumeUploadSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
      </div>
      <FileUpload onFileUpload={onFileUpload} />
      {resumeFile && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>File:</strong> {resumeFile.name}
          </p>
          <p className="text-sm text-green-700 mt-1">
            Text extracted successfully - {resumeText.length} characters
          </p>
        </div>
      )}
    </Card>
  );
};

export default ResumeUploadSection;
