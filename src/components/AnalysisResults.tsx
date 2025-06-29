
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Target, FileText, TrendingUp, Lightbulb } from 'lucide-react';

interface AnalysisResultsProps {
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
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Analysis Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.atsScore)}`}>
              {results.atsScore}%
            </div>
            <div className="text-gray-600 font-medium">ATS Score</div>
            <Progress value={results.atsScore} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">
              How well your resume passes automated screening
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.overallMatch)}`}>
              {results.overallMatch}%
            </div>
            <div className="text-gray-600 font-medium">Job Match</div>
            <Progress value={results.overallMatch} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">
              Overall compatibility with job requirements
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.formatScore)}`}>
              {results.formatScore}%
            </div>
            <div className="text-gray-600 font-medium">Format Score</div>
            <Progress value={results.formatScore} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">
              Resume structure and formatting quality
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keywords Analysis */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Keywords Analysis
          </h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-green-700 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Found Keywords ({results.foundKeywords.length})
              </h5>
              <div className="flex flex-wrap gap-2">
                {results.foundKeywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-red-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Missing Keywords ({results.missingKeywords.length})
              </h5>
              <div className="flex flex-wrap gap-2">
                {results.missingKeywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Consider adding these keywords to improve your match score
              </p>
            </div>
          </div>
        </Card>

        {/* Strengths */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Strengths
          </h4>
          
          <div className="space-y-3">
            {results.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">{strength}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Feedback */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
          Improvement Suggestions
        </h4>
        
        <div className="space-y-4">
          {results.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Metrics */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Additional Insights
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Grammar Issues</span>
              <span className={`font-medium ${results.grammarIssues <= 2 ? 'text-green-600' : 'text-red-600'}`}>
                {results.grammarIssues}
              </span>
            </div>
            <Progress value={Math.max(0, 100 - (results.grammarIssues * 10))} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Keyword Density</span>
              <span className="font-medium text-blue-600">
                {Math.round((results.foundKeywords.length / (results.foundKeywords.length + results.missingKeywords.length)) * 100)}%
              </span>
            </div>
            <Progress value={(results.foundKeywords.length / (results.foundKeywords.length + results.missingKeywords.length)) * 100} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResults;
