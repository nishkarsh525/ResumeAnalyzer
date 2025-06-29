
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, Clipboard } from 'lucide-react';
import { useState } from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const [showSample, setShowSample] = useState(false);

  const sampleJobDescription = `We are seeking a talented Full Stack Developer to join our growing team. The ideal candidate will have experience with modern web technologies and a passion for creating exceptional user experiences.

Key Responsibilities:
• Develop and maintain web applications using React.js and Node.js
• Design and implement RESTful APIs and microservices
• Collaborate with cross-functional teams in an Agile environment
• Write clean, maintainable, and well-documented code
• Participate in code reviews and technical discussions
• Optimize applications for maximum speed and scalability

Required Skills:
• 3+ years of experience in full stack development
• Proficiency in JavaScript, TypeScript, React.js, and Node.js
• Experience with databases (MongoDB, PostgreSQL)
• Knowledge of version control systems (Git)
• Understanding of Agile methodology and SCRUM practices
• Strong problem-solving and communication skills

Preferred Qualifications:
• Experience with cloud platforms (AWS, Azure, or GCP)
• Knowledge of containerization (Docker, Kubernetes)
• Familiarity with CI/CD pipelines
• Experience with testing frameworks (Jest, Cypress)
• Bachelor's degree in Computer Science or related field

We offer competitive salary, comprehensive benefits, and opportunities for professional growth in a collaborative environment.`;

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const useSampleDescription = () => {
    onChange(sampleJobDescription);
    setShowSample(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Paste the job description you want to optimize your resume for
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={pasteFromClipboard}
            className="text-xs"
          >
            <Clipboard className="h-3 w-3 mr-1" />
            Paste
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSample(true)}
            className="text-xs"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            Sample
          </Button>
        </div>
      </div>

      {showSample && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2">Sample Job Description</h4>
              <p className="text-sm text-blue-800 mb-3">
                Full Stack Developer position with modern tech stack
              </p>
              <Button
                onClick={useSampleDescription}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Use This Sample
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSample(false)}
              className="text-blue-600"
            >
              ✕
            </Button>
          </div>
        </Card>
      )}

      <Textarea
        placeholder="Paste the job description here... Include requirements, responsibilities, and desired skills for the best analysis."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] resize-y"
      />

      <div className="text-xs text-gray-500 flex items-center space-x-4">
        <span>Characters: {value.length}</span>
        <span>•</span>
        <span>Words: {value.split(/\s+/).filter(word => word.length > 0).length}</span>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
