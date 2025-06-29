
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Linkedin, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Users,
  Briefcase,
  Award,
  Plus,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LinkedInGap {
  section: string;
  issue: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

interface LinkedInAnalyzerProps {
  resumeText: string;
}

const LinkedInAnalyzer = ({ resumeText }: LinkedInAnalyzerProps) => {
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    gaps: LinkedInGap[];
    strengths: string[];
    suggestions: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeProfile = () => {
    if (!linkedinProfile.trim()) {
      toast({
        title: "LinkedIn profile required",
        description: "Please paste your LinkedIn profile content to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Mock analysis - in real app, this would use AI
    setTimeout(() => {
      const mockResults = {
        overallScore: 72,
        gaps: [
          {
            section: 'Skills Section',
            issue: 'Missing key technical skills from resume',
            suggestion: 'Add React.js, Node.js, and TypeScript to your LinkedIn skills',
            priority: 'high' as const
          },
          {
            section: 'Experience Descriptions',
            issue: 'Job descriptions are shorter than resume',
            suggestion: 'Expand your current role description with quantified achievements',
            priority: 'medium' as const
          },
          {
            section: 'Professional Summary',
            issue: 'LinkedIn headline is generic',
            suggestion: 'Create a compelling headline that includes your key skills and value proposition',
            priority: 'high' as const
          },
          {
            section: 'Certifications',
            issue: 'Certifications missing from LinkedIn',
            suggestion: 'Add your AWS certification and other professional credentials',
            priority: 'medium' as const
          },
          {
            section: 'Publications/Projects',
            issue: 'No projects showcased',
            suggestion: 'Add your key projects with links to GitHub repositories',
            priority: 'low' as const
          }
        ],
        strengths: [
          'Complete work history matches resume',
          'Professional photo uploaded',
          'Contact information is consistent',
          'Education section is complete'
        ],
        suggestions: [
          'Post regularly about industry topics to increase visibility',
          'Request recommendations from former colleagues',
          'Join relevant professional groups in your field',
          'Use LinkedIn\'s creator tools to share insights'
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: `Found ${mockResults.gaps.length} areas for improvement in your LinkedIn profile.`,
      });
    }, 3000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Suggestion has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'low': return <Plus className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
          LinkedIn Profile Analyzer
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your LinkedIn profile content here:
            </label>
            <Textarea
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
              placeholder="Copy and paste your LinkedIn profile text here (summary, experience, skills, etc.)..."
              className="min-h-[150px]"
            />
          </div>
          
          <Button 
            onClick={analyzeProfile}
            disabled={isAnalyzing || !linkedinProfile.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Linkedin className="h-4 w-4 mr-2 animate-pulse" />
                Analyzing Profile...
              </>
            ) : (
              <>
                <Linkedin className="h-4 w-4 mr-2" />
                Analyze vs Resume
              </>
            )}
          </Button>
        </div>
      </Card>

      {analysisResults && (
        <>
          {/* Overall Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold text-gray-900">Profile Optimization Score</h5>
              <div className="text-3xl font-bold text-blue-600">
                {analysisResults.overallScore}%
              </div>
            </div>
            <Progress value={analysisResults.overallScore} className="mb-2" />
            <p className="text-sm text-gray-600">
              Your LinkedIn profile alignment with your resume
            </p>
          </Card>

          {/* Gaps Analysis */}
          <Card className="p-6">
            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              Areas for Improvement ({analysisResults.gaps.length})
            </h5>
            
            <div className="space-y-4">
              {analysisResults.gaps.map((gap, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(gap.priority)}
                      <h6 className="font-medium text-gray-900">{gap.section}</h6>
                      <Badge className={getPriorityColor(gap.priority)}>
                        {gap.priority} priority
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-red-700 mb-2">
                    <strong>Issue:</strong> {gap.issue}
                  </p>
                  
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-green-700 flex-1">
                      <strong>Suggestion:</strong> {gap.suggestion}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(gap.suggestion)}
                      className="ml-2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Strengths */}
          <Card className="p-6">
            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Profile Strengths
            </h5>
            
            <div className="space-y-2">
              {analysisResults.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Enhancement Suggestions */}
          <Card className="p-6">
            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              LinkedIn Growth Suggestions
            </h5>
            
            <div className="space-y-3">
              {analysisResults.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5" />
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {!analysisResults && !isAnalyzing && (
        <Card className="p-8 text-center">
          <Linkedin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Compare your LinkedIn profile with your resume to identify gaps and opportunities.
          </p>
          <p className="text-sm text-gray-500">
            Paste your LinkedIn profile content above to get personalized optimization suggestions.
          </p>
        </Card>
      )}
    </div>
  );
};

export default LinkedInAnalyzer;
