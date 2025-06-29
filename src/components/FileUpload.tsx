
import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File, extractedText: string) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock text extraction - in real implementation, use libraries like pdf-parse or mammoth
  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock extracted text based on file type
        const mockText = `
John Smith
Software Developer
Email: john.smith@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced Software Developer with 5+ years of expertise in full-stack web development.
Proficient in JavaScript, React, Node.js, and modern web technologies.
Strong problem-solving skills with a track record of delivering high-quality applications.

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, TypeScript
• Frontend: React, Vue.js, HTML5, CSS3, Bootstrap
• Backend: Node.js, Express.js, Django, REST APIs
• Databases: MongoDB, PostgreSQL, MySQL
• Tools: Git, Docker, AWS, Jenkins

WORK EXPERIENCE
Senior Software Developer | Tech Solutions Inc. | 2021 - Present
• Developed and maintained 10+ web applications using React and Node.js
• Improved application performance by 40% through code optimization
• Led a team of 3 junior developers on multiple projects
• Collaborated with cross-functional teams to deliver features on time

Software Developer | Digital Innovations | 2019 - 2021
• Built responsive web applications using modern JavaScript frameworks
• Implemented RESTful APIs and integrated third-party services
• Participated in code reviews and maintained high code quality standards
• Worked in Agile development environment with daily standups

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

PROJECTS
E-commerce Platform - Built a full-stack e-commerce solution using React and Node.js
Task Management App - Developed a productivity app with real-time collaboration features
        `;
        
        resolve(mockText.trim());
      }, 2000); // Simulate processing time
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const extractedText = await extractTextFromFile(file);
      onFileUpload(file, extractedText);
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "There was an error extracting text from your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div>
      <Card
        className={`
          border-2 border-dashed transition-colors duration-200 cursor-pointer
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="p-8 text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin mx-auto">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Processing your resume...</p>
                <p className="text-sm text-gray-600">Extracting text and analyzing content</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your resume here, or browse
                </p>
                <p className="text-sm text-gray-600">
                  Supports PDF and DOCX files up to 5MB
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={onFileInputChange}
                className="hidden"
                id="resume-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="resume-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600">
        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <p><strong>Supported formats:</strong> PDF, DOCX</p>
          <p><strong>Max file size:</strong> 5MB</p>
          <p><strong>Privacy:</strong> Your resume is processed locally and not stored on our servers</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
