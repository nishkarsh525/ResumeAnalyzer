import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  FileText, 
  TrendingUp, 
  Lightbulb,
  Zap,
  Eye,
  PenTool,
  BarChart3,
  RefreshCw,
  Copy,
  Edit3,
  MessageSquare,
  Linkedin,
  Brain
} from 'lucide-react';
import { JobMatch, ATSAnalysis, GrammarAnalysis, RewriteSuggestion } from '@/utils/scoringEngine';
import ResumeTextEditor from './ResumeTextEditor';
import MockInterviewGenerator from './MockInterviewGenerator';
import LinkedInAnalyzer from './LinkedInAnalyzer';
import ResumeChat from './ResumeChat';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAnalysisResultsProps {
  results: {
    atsScore: number;
    overallMatch: number;
    missingKeywords: string[];
    foundKeywords: string[];
    suggestions: string[];
    strengths: string[];
    grammarIssues: number;
    formatScore: number;
  };
  jobMatches: JobMatch[];
  atsAnalysis: ATSAnalysis;
  grammarAnalysis: GrammarAnalysis;
  rewriteSuggestions: RewriteSuggestion[];
}

const EnhancedAnalysisResults = ({ 
  results, 
  jobMatches, 
  atsAnalysis, 
  grammarAnalysis, 
  rewriteSuggestions 
}: EnhancedAnalysisResultsProps) => {
  const { toast } = useToast();
  const [improvements, setImprovements] = useState(
    rewriteSuggestions.map(suggestion => ({
      section: suggestion.section,
      original: suggestion.original,
      improved: suggestion.improved,
      applied: false
    }))
  );
  
  // Mock original resume text and job description
  const [originalResumeText] = useState(`Professional Summary
I am a software developer with experience in web development.

Work Experience
Software Developer - Tech Company (2020-2023)
Worked on various projects using React and Node.js.
Helped the team with code reviews and testing.

Skills
- JavaScript, React, Node.js
- HTML, CSS, Bootstrap
- Git, GitHub`);

  const [jobDescription] = useState(`We are looking for a Full Stack Developer with expertise in React, Node.js, and modern web technologies.`);

  const [improvedResumeText, setImprovedResumeText] = useState(originalResumeText);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Text has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const applyImprovement = (index: number) => {
    const newImprovements = [...improvements];
    newImprovements[index].applied = true;
    setImprovements(newImprovements);
    
    // Apply the improvement to the resume text
    const improvement = rewriteSuggestions[index];
    const newText = improvedResumeText.replace(improvement.original, improvement.improved);
    setImprovedResumeText(newText);
    
    toast({
      title: "Improvement applied!",
      description: `${improvement.section} has been updated with AI suggestions.`,
    });
  };

  const revertImprovement = (index: number) => {
    const newImprovements = [...improvements];
    newImprovements[index].applied = false;
    setImprovements(newImprovements);
    
    // Revert the improvement in the resume text
    const improvement = rewriteSuggestions[index];
    const newText = improvedResumeText.replace(improvement.improved, improvement.original);
    setImprovedResumeText(newText);
    
    toast({
      title: "Improvement reverted",
      description: `${improvement.section} has been reverted to original text.`,
    });
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Score Overview */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Comprehensive Analysis Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.atsScore)}`}>
              {results.atsScore}%
            </div>
            <div className="text-gray-600 font-medium">ATS Score</div>
            <Progress value={results.atsScore} className="mt-2" />
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.overallMatch)}`}>
              {results.overallMatch}%
            </div>
            <div className="text-gray-600 font-medium">Job Match</div>
            <Progress value={results.overallMatch} className="mt-2" />
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(grammarAnalysis.score)}`}>
              {grammarAnalysis.score}%
            </div>
            <div className="text-gray-600 font-medium">Grammar & Tone</div>
            <Progress value={grammarAnalysis.score} className="mt-2" />
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.formatScore)}`}>
              {results.formatScore}%
            </div>
            <div className="text-gray-600 font-medium">Format Score</div>
            <Progress value={results.formatScore} className="mt-2" />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="job-matches" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="job-matches">Job Matches</TabsTrigger>
          <TabsTrigger value="ats-analysis">ATS Analysis</TabsTrigger>
          <TabsTrigger value="grammar-tone">Grammar & Tone</TabsTrigger>
          <TabsTrigger value="rewrite-suggestions">AI Rewrites</TabsTrigger>
          <TabsTrigger value="improved-resume">Improved Resume</TabsTrigger>
          <TabsTrigger value="mock-interview">Interview Prep</TabsTrigger>
          <TabsTrigger value="linkedin-analyzer">LinkedIn</TabsTrigger>
          <TabsTrigger value="resume-chat">Chat Assistant</TabsTrigger>
        </TabsList>

        {/* Job-Specific Scoring */}
        <TabsContent value="job-matches">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Multi-Job Comparison Analysis
            </h4>
            
            {jobMatches.map((match, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="text-lg font-medium text-gray-900">{match.jobTitle}</h5>
                  <div className={`text-2xl font-bold ${getScoreColor(match.matchPercentage)}`}>
                    {match.matchPercentage}%
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="font-medium text-green-700 mb-2">Skills Match</h6>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {match.alignedSkills.map((skill, i) => (
                        <Badge key={i} className="bg-green-100 text-green-800">{skill}</Badge>
                      ))}
                    </div>
                    <h6 className="font-medium text-red-700 mb-2">Missing Skills</h6>
                    <div className="flex flex-wrap gap-2">
                      {match.missedSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-red-300 text-red-700">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-blue-700 mb-2">Experience Alignment ({match.experienceMatch.score}%)</h6>
                    <ul className="text-sm space-y-1">
                      {match.experienceMatch.alignment.map((item, i) => (
                        <li key={i} className="text-green-700">✓ {item}</li>
                      ))}
                      {match.experienceMatch.gaps.map((item, i) => (
                        <li key={i} className="text-red-700">✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ATS Simulation */}
        <TabsContent value="ats-analysis">
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-purple-600" />
              ATS System Simulation
            </h4>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Parsing Issues Detected</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Keyword Stuffing</span>
                      <span className={`text-sm font-medium ${atsAnalysis.issues.keywordStuffing ? 'text-red-600' : 'text-green-600'}`}>
                        {atsAnalysis.issues.keywordStuffing ? 'Detected' : 'Good'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hidden Text</span>  
                      <span className={`text-sm font-medium ${atsAnalysis.issues.hiddenText ? 'text-red-600' : 'text-green-600'}`}>
                        {atsAnalysis.issues.hiddenText ? 'Detected' : 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Format Complexity</span>
                      <span className={`text-sm font-medium ${atsAnalysis.issues.complexity > 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {atsAnalysis.issues.complexity}/10
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">ATS Recommendations</h5>
                  <ul className="space-y-2">
                    {atsAnalysis.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {atsAnalysis.issues.improperFormats.length > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h6 className="font-medium text-yellow-800 mb-2">Format Issues Found:</h6>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {atsAnalysis.issues.improperFormats.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Grammar & Tone Analysis */}
        <TabsContent value="grammar-tone">
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PenTool className="h-5 w-5 mr-2 text-indigo-600" />
                Grammar & Readability Analysis
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Writing Quality Metrics</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Passive Voice Usage</span>
                        <span className="text-sm font-medium">{grammarAnalysis.issues.passiveVoice} instances</span>
                      </div>
                      <Progress value={Math.max(0, 100 - (grammarAnalysis.issues.passiveVoice * 10))} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Professional Tone</span>
                        <span className="text-sm font-medium">{grammarAnalysis.toneAnalysis.professionalScore}%</span>
                      </div>
                      <Progress value={grammarAnalysis.toneAnalysis.professionalScore} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Readability Score</span>
                        <span className="text-sm font-medium">{grammarAnalysis.issues.complexityScore}/10</span>
                      </div>
                      <Progress value={grammarAnalysis.issues.complexityScore * 10} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Improvement Areas</h5>
                  <ul className="space-y-2">
                    {grammarAnalysis.toneAnalysis.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h5 className="font-medium mb-4">Grammar Issues Found</h5>
              <div className="space-y-3">
                {grammarAnalysis.issues.grammarErrors.map((error, i) => (
                  <div key={i} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-red-800">{error.type}</span>
                    </div>
                    <div className="text-sm text-red-700 mb-1">
                      <strong>Original:</strong> {error.text}
                    </div>
                    <div className="text-sm text-green-700">
                      <strong>Suggestion:</strong> {error.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* AI Rewrite Suggestions */}
        <TabsContent value="rewrite-suggestions">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-600" />
                AI-Powered Rewrite Suggestions
              </h4>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate More
              </Button>
            </div>
            
            {rewriteSuggestions.map((suggestion, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">{suggestion.section}</h5>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        AI Enhanced
                      </Badge>
                      {improvements[i]?.applied && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Applied
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium text-red-700 mb-2">Original</h6>
                      <p className="text-sm text-gray-700 p-3 bg-red-50 border border-red-200 rounded">
                        {suggestion.original}
                      </p>
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-medium text-green-700 mb-2">AI Improved</h6>
                      <p className="text-sm text-gray-700 p-3 bg-green-50 border border-green-200 rounded">
                        {suggestion.improved}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Why this works:</strong> {suggestion.reason}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">Suggested action verbs:</span>
                      {suggestion.actionVerbs.map((verb, vi) => (
                        <Badge key={vi} variant="secondary" className="text-xs">
                          {verb}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(suggestion.improved)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Text
                    </Button>
                    {improvements[i]?.applied ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => revertImprovement(i)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Revert
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => applyImprovement(i)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Apply Suggestion
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Improved Resume Tab */}
        <TabsContent value="improved-resume">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Edit3 className="h-5 w-5 mr-2 text-blue-600" />
                AI-Improved Resume Text
              </h4>
              <div className="text-sm text-gray-600">
                {improvements.filter(imp => imp.applied).length} improvements applied
              </div>
            </div>
            
            <ResumeTextEditor
              originalText={originalResumeText}
              improvements={improvements}
              onApplyImprovement={applyImprovement}
              onRevertImprovement={revertImprovement}
            />
          </div>
        </TabsContent>

        {/* Mock Interview Tab */}
        <TabsContent value="mock-interview">
          <MockInterviewGenerator
            resumeText={originalResumeText}
            jobDescription={jobDescription}
          />
        </TabsContent>

        {/* LinkedIn Analyzer Tab */}
        <TabsContent value="linkedin-analyzer">
          <LinkedInAnalyzer resumeText={originalResumeText} />
        </TabsContent>

        {/* Resume Chat Tab */}
        <TabsContent value="resume-chat">
          <ResumeChat 
            resumeText={originalResumeText}
            jobDescription={jobDescription}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalysisResults;
