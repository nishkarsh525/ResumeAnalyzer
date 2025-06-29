
import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ProcessSteps from '@/components/ProcessSteps';
import ResumeUploadSection from '@/components/ResumeUploadSection';
import JobDescriptionSection from '@/components/JobDescriptionSection';
import AnalyzeButton from '@/components/AnalyzeButton';
import EnhancedAnalysisResults from '@/components/EnhancedAnalysisResults';
import CustomResumeBuilder from '@/components/CustomResumeBuilder';
import CoverLetterGenerator from '@/components/CoverLetterGenerator';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('analyzer');
  const {
    resumeFile,
    resumeText,
    jobDescription,
    analysisResults,
    enhancedResults,
    isAnalyzing,
    setJobDescription,
    handleResumeUpload,
    analyzeResume
  } = useResumeAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analyzer' && (
          <>
            <ProcessSteps 
              resumeFile={resumeFile}
              jobDescription={jobDescription}
              analysisResults={analysisResults}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ResumeUploadSection
                resumeFile={resumeFile}
                resumeText={resumeText}
                onFileUpload={handleResumeUpload}
              />

              <JobDescriptionSection
                jobDescription={jobDescription}
                onChange={setJobDescription}
              />
            </div>

            <AnalyzeButton
              isAnalyzing={isAnalyzing}
              resumeFile={resumeFile}
              jobDescription={jobDescription}
              onAnalyze={analyzeResume}
            />

            {analysisResults && enhancedResults && (
              <EnhancedAnalysisResults 
                results={analysisResults}
                jobMatches={enhancedResults.jobMatches}
                atsAnalysis={enhancedResults.atsAnalysis}
                grammarAnalysis={enhancedResults.grammarAnalysis}
                rewriteSuggestions={enhancedResults.rewriteSuggestions}
              />
            )}
          </>
        )}

        {activeTab === 'builder' && (
          <CustomResumeBuilder 
            jobDescription={jobDescription}
            existingResumeText={resumeText}
          />
        )}

        {activeTab === 'cover-letter' && (
          <CoverLetterGenerator 
            resumeText={resumeText}
            jobDescription={jobDescription}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
