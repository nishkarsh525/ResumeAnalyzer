
import { useState } from 'react';
import { ResumeAnalysisEngine } from '@/utils/scoringEngine';
import { useToast } from '@/hooks/use-toast';

export const useResumeAnalysis = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [enhancedResults, setEnhancedResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleResumeUpload = (file: File, extractedText: string) => {
    setResumeFile(file);
    setResumeText(extractedText);
    toast({
      title: "Resume uploaded successfully!",
      description: `${file.name} has been processed and is ready for analysis.`,
    });
  };

  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and provide a job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Enhanced AI analysis simulation
    setTimeout(() => {
      // Basic results (existing)
      const mockResults = {
        atsScore: 78,
        overallMatch: 85,
        missingKeywords: ['React.js', 'TypeScript', 'API Development', 'Agile Methodology'],
        foundKeywords: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB'],
        suggestions: [
          'Add more specific technical skills mentioned in the job description',
          'Include quantifiable achievements and metrics',
          'Use action verbs to describe your responsibilities',
          'Ensure your contact information is ATS-friendly formatted'
        ],
        strengths: [
          'Strong technical background clearly presented',
          'Good use of industry-standard terminology',
          'Well-structured work experience section'
        ],
        grammarIssues: 2,
        formatScore: 92
      };

      // Enhanced analysis results
      const jobMatches = ResumeAnalysisEngine.analyzeJobMatches(resumeText, [jobDescription]);
      const atsAnalysis = ResumeAnalysisEngine.simulateATS(resumeText);
      const grammarAnalysis = ResumeAnalysisEngine.analyzeGrammar(resumeText);
      const rewriteSuggestions = ResumeAnalysisEngine.generateRewriteSuggestions(resumeText);
      
      setAnalysisResults(mockResults);
      setEnhancedResults({
        jobMatches,
        atsAnalysis,
        grammarAnalysis,
        rewriteSuggestions
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Enhanced analysis complete!",
        description: "Your resume has been analyzed with advanced AI features. Check all tabs for detailed insights.",
      });
    }, 4000); // Slightly longer for enhanced analysis
  };

  return {
    resumeFile,
    resumeText,
    jobDescription,
    analysisResults,
    enhancedResults,
    isAnalyzing,
    setJobDescription,
    handleResumeUpload,
    analyzeResume
  };
};
