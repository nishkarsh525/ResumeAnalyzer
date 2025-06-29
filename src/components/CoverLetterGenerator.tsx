
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw,
  User,
  Building,
  Target,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CoverLetterGeneratorProps {
  resumeText?: string;
  jobDescription?: string;
}

const CoverLetterGenerator = ({ resumeText = '', jobDescription = '' }: CoverLetterGeneratorProps) => {
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    hiringManager: '',
    companyName: '',
    jobTitle: '',
    referralSource: '',
    tone: 'professional',
    length: 'medium'
  });

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and passionate' },
    { value: 'conversational', label: 'Conversational', description: 'Friendly yet professional' },
    { value: 'confident', label: 'Confident', description: 'Assertive and self-assured' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '2-3 paragraphs (~150 words)' },
    { value: 'medium', label: 'Medium', description: '3-4 paragraphs (~250 words)' },
    { value: 'long', label: 'Long', description: '4-5 paragraphs (~350 words)' }
  ];

  const generateCoverLetter = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both resume text and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const sampleCoverLetter = `Dear ${formData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.jobTitle || 'Software Developer'} position at ${formData.companyName || 'your company'}. With my extensive background in full-stack development and proven track record of delivering scalable solutions, I am excited about the opportunity to contribute to your innovative team.

In my previous role as a Senior Full Stack Developer, I successfully led the development of multiple web applications using React, Node.js, and modern cloud technologies. My experience aligns perfectly with your requirements, particularly in building responsive user interfaces and architecting robust backend systems. I have consistently delivered projects on time while maintaining high code quality standards and collaborating effectively with cross-functional teams.

What particularly excites me about this opportunity is ${formData.companyName || 'your company'}'s commitment to innovation and growth. Your focus on creating exceptional user experiences resonates with my passion for developing solutions that make a meaningful impact. I am confident that my technical expertise, combined with my problem-solving abilities and collaborative approach, would make me a valuable addition to your development team.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's continued success. Thank you for considering my application, and I look forward to hearing from you.

Sincerely,
[Your Name]`;

      setCoverLetter(sampleCoverLetter);
      setIsGenerating(false);
      
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter is ready for review.",
      });
    }, 3000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      toast({
        title: "Copied to clipboard!",
        description: "Cover letter has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${formData.companyName || 'company'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your cover letter is being downloaded.",
    });
  };

  const regenerateCoverLetter = () => {
    setCoverLetter('');
    generateCoverLetter();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-green-600" />
            AI Cover Letter Generator
          </h3>
          <p className="text-gray-600 mt-1">Generate personalized cover letters using GPT-4</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup">Setup & Generate</TabsTrigger>
          <TabsTrigger value="result">Generated Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          {/* Job Details */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Job Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
              <Input
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />
              <Input
                placeholder="Hiring Manager Name (optional)"
                value={formData.hiringManager}
                onChange={(e) => setFormData({...formData, hiringManager: e.target.value})}
              />
              <Input
                placeholder="How did you find this job? (optional)"
                value={formData.referralSource}
                onChange={(e) => setFormData({...formData, referralSource: e.target.value})}
              />
            </div>
          </Card>

          {/* Customization Options */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Customization
            </h4>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Writing Tone</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {toneOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.tone === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({...formData, tone: option.value})}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Letter Length</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {lengthOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                        formData.length === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({...formData, length: option.value})}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Data Sources */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-orange-600" />
              Data Sources
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <div className="font-medium text-green-800">Resume Content</div>
                  <div className="text-sm text-green-700">{resumeText ? 'Loaded successfully' : 'Not provided'}</div>
                </div>
                <Badge className={resumeText ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                  {resumeText ? 'Ready' : 'Missing'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <div className="font-medium text-blue-800">Job Description</div>
                  <div className="text-sm text-blue-700">{jobDescription ? 'Loaded successfully' : 'Not provided'}</div>
                </div>
                <Badge className={jobDescription ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}>
                  {jobDescription ? 'Ready' : 'Missing'}
                </Badge>
              </div>
            </div>
          </Card>

          <Button 
            onClick={generateCoverLetter}
            disabled={isGenerating || !resumeText || !jobDescription}
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <>
                <Wand2 className="mr-2 h-5 w-5 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="result" className="space-y-6">
          {coverLetter ? (
            <>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Generated Cover Letter</h4>
                  <div className="flex space-x-2">
                    <Button onClick={regenerateCoverLetter} size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button onClick={copyToClipboard} size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadAsPDF} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder="Your generated cover letter will appear here..."
                />
                
                <div className="mt-4 text-sm text-gray-600">
                  You can edit the generated text directly before copying or downloading.
                </div>
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Tips for Your Cover Letter</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Customize the opening paragraph for each application</li>
                  <li>• Include specific examples from your resume</li>
                  <li>• Research the company culture and values</li>
                  <li>• Keep it concise and focused on value you bring</li>
                  <li>• Always proofread before sending</li>
                </ul>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Cover Letter Generated Yet</h4>
              <p className="text-gray-500 mb-4">
                Fill out the setup form and click "Generate Cover Letter" to create your personalized letter.
              </p>
              <Button onClick={() => {}} variant="outline">
                Go to Setup
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoverLetterGenerator;
