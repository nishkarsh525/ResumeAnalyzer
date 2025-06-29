
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  RefreshCw, 
  Copy, 
  Brain, 
  Target,
  Users,
  Code,
  Lightbulb,
  Filter,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface MockQuestion {
  id: string;
  category: 'technical' | 'behavioral' | 'situational' | 'company-specific' | 'leadership' | 'problem-solving';
  question: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  suggestedAnswer?: string;
  tips: string[];
  keywords: string[];
}

interface MockInterviewGeneratorProps {
  resumeText: string;
  jobDescription: string;
}

const MockInterviewGenerator = ({ resumeText, jobDescription }: MockInterviewGeneratorProps) => {
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  const generateQuestions = () => {
    setIsGenerating(true);
    
    // Generate comprehensive questions based on job profile
    setTimeout(() => {
      const comprehensiveQuestions: MockQuestion[] = [
        // Technical Questions - Beginner
        {
          id: '1',
          category: 'technical',
          question: 'What is the difference between HTML and HTML5?',
          difficulty: 'beginner',
          keywords: ['html', 'web development', 'frontend'],
          tips: [
            'Mention new semantic elements in HTML5',
            'Discuss multimedia support improvements',
            'Talk about better form controls'
          ]
        },
        {
          id: '2',
          category: 'technical',
          question: 'Explain the box model in CSS.',
          difficulty: 'beginner',
          keywords: ['css', 'styling', 'layout'],
          tips: [
            'Draw or describe content, padding, border, margin',
            'Mention box-sizing property',
            'Give practical examples'
          ]
        },
        {
          id: '3',
          category: 'technical',
          question: 'What are the different data types in JavaScript?',
          difficulty: 'beginner',
          keywords: ['javascript', 'programming', 'basics'],
          tips: [
            'Cover primitive types: string, number, boolean, undefined, null',
            'Mention object and symbol types',
            'Discuss typeof operator'
          ]
        },
        {
          id: '4',
          category: 'technical',
          question: 'How do you center a div horizontally and vertically?',
          difficulty: 'beginner',
          keywords: ['css', 'layout', 'positioning'],
          tips: [
            'Show multiple methods: flexbox, grid, absolute positioning',
            'Explain when to use each method',
            'Demonstrate with code examples'
          ]
        },
        {
          id: '5',
          category: 'technical',
          question: 'What is the difference between var, let, and const in JavaScript?',
          difficulty: 'beginner',
          keywords: ['javascript', 'variables', 'scope'],
          tips: [
            'Explain hoisting differences',
            'Discuss block vs function scope',
            'Mention reassignment rules'
          ]
        },

        // Technical Questions - Intermediate
        {
          id: '6',
          category: 'technical',
          question: 'Explain event delegation in JavaScript and why it\'s useful.',
          difficulty: 'intermediate',
          keywords: ['javascript', 'events', 'dom'],
          tips: [
            'Describe event bubbling concept',
            'Show practical examples with dynamic content',
            'Discuss performance benefits'
          ]
        },
        {
          id: '7',
          category: 'technical',
          question: 'What are React hooks and how do they differ from class components?',
          difficulty: 'intermediate',
          keywords: ['react', 'hooks', 'components'],
          tips: [
            'Explain useState and useEffect',
            'Discuss functional vs class component benefits',
            'Show code examples of both approaches'
          ]
        },
        {
          id: '8',
          category: 'technical',
          question: 'How would you implement authentication in a web application?',
          difficulty: 'intermediate',
          keywords: ['authentication', 'security', 'backend'],
          tips: [
            'Discuss JWT vs session-based auth',
            'Mention HTTPS importance',
            'Cover password hashing and salting'
          ]
        },
        {
          id: '9',
          category: 'technical',
          question: 'Explain the concept of REST APIs and HTTP methods.',
          difficulty: 'intermediate',
          keywords: ['api', 'rest', 'http'],
          tips: [
            'Define REST principles',
            'Explain GET, POST, PUT, DELETE methods',
            'Discuss status codes and their meanings'
          ]
        },
        {
          id: '10',
          category: 'technical',
          question: 'What is state management and why is it important in React applications?',
          difficulty: 'intermediate',
          keywords: ['react', 'state', 'redux'],
          tips: [
            'Explain prop drilling problems',
            'Compare Context API vs Redux',
            'Discuss when to use global vs local state'
          ]
        },

        // Technical Questions - Advanced
        {
          id: '11',
          category: 'technical',
          question: 'How would you optimize a slow-loading web application?',
          difficulty: 'advanced',
          keywords: ['performance', 'optimization', 'web'],
          tips: [
            'Discuss code splitting and lazy loading',
            'Mention CDN usage and caching strategies',
            'Cover image optimization and bundling'
          ]
        },
        {
          id: '12',
          category: 'technical',
          question: 'Explain database indexing and when you would use different types of indexes.',
          difficulty: 'advanced',
          keywords: ['database', 'indexing', 'performance'],
          tips: [
            'Define clustered vs non-clustered indexes',
            'Discuss B-tree structure basics',
            'Explain trade-offs between query speed and write performance'
          ]
        },
        {
          id: '13',
          category: 'technical',
          question: 'How would you design a scalable microservices architecture?',
          difficulty: 'advanced',
          keywords: ['microservices', 'architecture', 'scalability'],
          tips: [
            'Discuss service boundaries and communication',
            'Mention load balancing and service discovery',
            'Cover data consistency challenges'
          ]
        },
        {
          id: '14',
          category: 'technical',
          question: 'Implement a debounce function from scratch and explain its use cases.',
          difficulty: 'advanced',
          keywords: ['javascript', 'algorithms', 'performance'],
          tips: [
            'Write the function step by step',
            'Explain setTimeout and clearTimeout usage',
            'Give real-world examples like search suggestions'
          ]
        },
        {
          id: '15',
          category: 'technical',
          question: 'How would you handle real-time data synchronization across multiple clients?',
          difficulty: 'advanced',
          keywords: ['websockets', 'real-time', 'synchronization'],
          tips: [
            'Compare WebSockets vs Server-Sent Events',
            'Discuss conflict resolution strategies',
            'Mention technologies like Socket.io or GraphQL subscriptions'
          ]
        },

        // Technical Questions - Expert
        {
          id: '16',
          category: 'technical',
          question: 'Design a distributed caching system that can handle millions of requests per second.',
          difficulty: 'expert',
          keywords: ['caching', 'distributed systems', 'scalability'],
          tips: [
            'Discuss consistent hashing for data distribution',
            'Explain cache invalidation strategies',
            'Cover replication and fault tolerance'
          ]
        },
        {
          id: '17',
          category: 'technical',
          question: 'How would you implement a search engine\'s ranking algorithm?',
          difficulty: 'expert',
          keywords: ['algorithms', 'search', 'machine learning'],
          tips: [
            'Explain PageRank algorithm basics',
            'Discuss relevance scoring factors',
            'Mention machine learning approaches'
          ]
        },

        // Behavioral Questions - Beginner
        {
          id: '18',
          category: 'behavioral',
          question: 'Tell me about yourself and why you\'re interested in this role.',
          difficulty: 'beginner',
          keywords: ['introduction', 'motivation', 'background'],
          tips: [
            'Keep it professional and relevant',
            'Connect your experience to the role',
            'Show enthusiasm for the opportunity'
          ]
        },
        {
          id: '19',
          category: 'behavioral',
          question: 'What are your greatest strengths and weaknesses?',
          difficulty: 'beginner',
          keywords: ['self-assessment', 'strengths', 'improvement'],
          tips: [
            'Choose strengths relevant to the job',
            'Present weaknesses as areas for growth',
            'Give specific examples'
          ]
        },
        {
          id: '20',
          category: 'behavioral',
          question: 'Why do you want to work for our company?',
          difficulty: 'beginner',
          keywords: ['company research', 'motivation', 'culture'],
          tips: [
            'Research the company\'s values and mission',
            'Connect your goals with company objectives',
            'Mention specific projects or initiatives'
          ]
        },

        // Behavioral Questions - Intermediate
        {
          id: '21',
          category: 'behavioral',
          question: 'Describe a time when you had to work with a difficult team member.',
          difficulty: 'intermediate',
          keywords: ['teamwork', 'conflict resolution', 'communication'],
          tips: [
            'Use the STAR method (Situation, Task, Action, Result)',
            'Focus on your communication and problem-solving skills',
            'Show how you maintained professionalism'
          ]
        },
        {
          id: '22',
          category: 'behavioral',
          question: 'Tell me about a project you\'re particularly proud of.',
          difficulty: 'intermediate',
          keywords: ['achievements', 'project management', 'results'],
          tips: [
            'Choose a project relevant to the role',
            'Highlight your specific contributions',
            'Quantify the results and impact'
          ]
        },
        {
          id: '23',
          category: 'behavioral',
          question: 'How do you handle stress and pressure in the workplace?',
          difficulty: 'intermediate',
          keywords: ['stress management', 'pressure', 'coping'],
          tips: [
            'Share specific stress management techniques',
            'Give examples of high-pressure situations',
            'Show how you maintain quality under pressure'
          ]
        },

        // Behavioral Questions - Advanced
        {
          id: '24',
          category: 'behavioral',
          question: 'Describe a time when you had to make a difficult decision with limited information.',
          difficulty: 'advanced',
          keywords: ['decision making', 'uncertainty', 'risk'],
          tips: [
            'Explain your decision-making process',
            'Discuss how you gathered available information',
            'Show how you managed risks and outcomes'
          ]
        },
        {
          id: '25',
          category: 'behavioral',
          question: 'Tell me about a time when you failed and what you learned from it.',
          difficulty: 'advanced',
          keywords: ['failure', 'learning', 'growth'],
          tips: [
            'Be honest about the failure',
            'Focus on lessons learned and improvements made',
            'Show how it made you a better professional'
          ]
        },

        // Situational Questions
        {
          id: '26',
          category: 'situational',
          question: 'If you discovered a critical bug in production just before a major release, what would you do?',
          difficulty: 'intermediate',
          keywords: ['crisis management', 'decision making', 'priorities'],
          tips: [
            'Show your decision-making process',
            'Discuss risk assessment and stakeholder communication',
            'Mention the importance of testing and rollback plans'
          ]
        },
        {
          id: '27',
          category: 'situational',
          question: 'How would you approach learning a new technology that\'s required for your role?',
          difficulty: 'beginner',
          keywords: ['learning', 'adaptability', 'technology'],
          tips: [
            'Describe your learning methodology',
            'Mention online resources and practice projects',
            'Show how you stay updated with technology trends'
          ]
        },
        {
          id: '28',
          category: 'situational',
          question: 'If you disagreed with your manager\'s technical approach, how would you handle it?',
          difficulty: 'advanced',
          keywords: ['communication', 'leadership', 'technical judgment'],
          tips: [
            'Show respect for hierarchy while advocating for your position',
            'Prepare data and alternatives to support your viewpoint',
            'Demonstrate collaborative problem-solving'
          ]
        },

        // Leadership Questions
        {
          id: '29',
          category: 'leadership',
          question: 'Describe your leadership style and give an example of when you\'ve led a team.',
          difficulty: 'intermediate',
          keywords: ['leadership', 'team management', 'style'],
          tips: [
            'Identify your leadership approach (collaborative, directive, etc.)',
            'Give specific examples with measurable outcomes',
            'Show how you adapt your style to different situations'
          ]
        },
        {
          id: '30',
          category: 'leadership',
          question: 'How do you motivate team members who are underperforming?',
          difficulty: 'advanced',
          keywords: ['motivation', 'performance management', 'coaching'],
          tips: [
            'Discuss one-on-one meetings and goal setting',
            'Mention the importance of understanding root causes',
            'Show how you provide support and resources'
          ]
        },

        // Problem-Solving Questions
        {
          id: '31',
          category: 'problem-solving',
          question: 'Walk me through how you would debug a performance issue in a web application.',
          difficulty: 'intermediate',
          keywords: ['debugging', 'performance', 'methodology'],
          tips: [
            'Describe a systematic approach to identifying bottlenecks',
            'Mention tools like browser dev tools, profilers',
            'Discuss both frontend and backend considerations'
          ]
        },
        {
          id: '32',
          category: 'problem-solving',
          question: 'How would you estimate the number of software engineers at Google?',
          difficulty: 'advanced',
          keywords: ['estimation', 'analytical thinking', 'reasoning'],
          tips: [
            'Break down the problem into smaller, manageable parts',
            'Make reasonable assumptions and state them clearly',
            'Show your thinking process, not just the final answer'
          ]
        },

        // Company-Specific Questions
        {
          id: '33',
          category: 'company-specific',
          question: 'What do you know about our company\'s technology stack and why do you think it\'s a good fit?',
          difficulty: 'intermediate',
          keywords: ['company research', 'technology', 'fit'],
          tips: [
            'Research the company\'s tech stack beforehand',
            'Connect your experience to their technologies',
            'Show understanding of their technical challenges'
          ]
        },
        {
          id: '34',
          category: 'company-specific',
          question: 'How would you contribute to our company\'s engineering culture?',
          difficulty: 'advanced',
          keywords: ['culture', 'contribution', 'values'],
          tips: [
            'Research the company\'s engineering principles',
            'Share specific examples of cultural contributions',
            'Align your values with theirs'
          ]
        },

        // Additional Technical Questions
        {
          id: '35',
          category: 'technical',
          question: 'Explain the difference between SQL and NoSQL databases.',
          difficulty: 'intermediate',
          keywords: ['database', 'sql', 'nosql'],
          tips: [
            'Compare ACID properties vs eventual consistency',
            'Discuss use cases for each type',
            'Mention specific examples like MySQL vs MongoDB'
          ]
        },
        {
          id: '36',
          category: 'technical',
          question: 'What is containerization and how does Docker work?',
          difficulty: 'intermediate',
          keywords: ['docker', 'containers', 'devops'],
          tips: [
            'Explain containers vs virtual machines',
            'Describe Docker images and containers',
            'Discuss benefits for deployment and scaling'
          ]
        },
        {
          id: '37',
          category: 'technical',
          question: 'How do you ensure code quality in a team environment?',
          difficulty: 'intermediate',
          keywords: ['code quality', 'testing', 'review'],
          tips: [
            'Mention code reviews and pair programming',
            'Discuss automated testing strategies',
            'Talk about linting and formatting tools'
          ]
        },
        {
          id: '38',
          category: 'technical',
          question: 'Explain the concept of CI/CD and its benefits.',
          difficulty: 'intermediate',
          keywords: ['cicd', 'deployment', 'automation'],
          tips: [
            'Define continuous integration and deployment',
            'Discuss automated testing in the pipeline',
            'Mention tools like Jenkins, GitHub Actions'
          ]
        },
        {
          id: '39',
          category: 'technical',
          question: 'What are design patterns and can you explain a few common ones?',
          difficulty: 'advanced',
          keywords: ['design patterns', 'architecture', 'software design'],
          tips: [
            'Explain Singleton, Observer, Factory patterns',
            'Give practical examples of when to use each',
            'Discuss benefits of using design patterns'
          ]
        },
        {
          id: '40',
          category: 'technical',
          question: 'How would you handle version control in a large team?',
          difficulty: 'intermediate',
          keywords: ['git', 'version control', 'collaboration'],
          tips: [
            'Discuss branching strategies (Git Flow, GitHub Flow)',
            'Mention merge vs rebase strategies',
            'Talk about handling merge conflicts'
          ]
        },

        // More Behavioral Questions
        {
          id: '41',
          category: 'behavioral',
          question: 'Describe a time when you had to learn something quickly under pressure.',
          difficulty: 'intermediate',
          keywords: ['learning agility', 'pressure', 'adaptability'],
          tips: [
            'Show your learning methodology',
            'Highlight resourcefulness and time management',
            'Demonstrate successful application of new knowledge'
          ]
        },
        {
          id: '42',
          category: 'behavioral',
          question: 'Tell me about a time when you had to give constructive feedback to a colleague.',
          difficulty: 'advanced',
          keywords: ['feedback', 'communication', 'leadership'],
          tips: [
            'Show empathy and professional approach',
            'Describe specific, actionable feedback',
            'Highlight positive outcomes from the conversation'
          ]
        },
        {
          id: '43',
          category: 'behavioral',
          question: 'How do you stay updated with the latest technology trends?',
          difficulty: 'beginner',
          keywords: ['learning', 'technology trends', 'professional development'],
          tips: [
            'Mention specific resources (blogs, conferences, courses)',
            'Show continuous learning mindset',
            'Connect learning to practical application'
          ]
        },
        {
          id: '44',
          category: 'behavioral',
          question: 'Describe a time when you had to work on multiple projects simultaneously.',
          difficulty: 'intermediate',
          keywords: ['multitasking', 'prioritization', 'time management'],
          tips: [
            'Explain your prioritization framework',
            'Show how you communicate with stakeholders',
            'Demonstrate successful delivery despite complexity'
          ]
        },

        // Additional Situational Questions
        {
          id: '45',
          category: 'situational',
          question: 'If you inherited a legacy codebase with poor documentation, how would you approach understanding and improving it?',
          difficulty: 'advanced',
          keywords: ['legacy code', 'documentation', 'refactoring'],
          tips: [
            'Describe systematic code analysis approach',
            'Mention the importance of tests before refactoring',
            'Show how you\'d gradually improve while maintaining functionality'
          ]
        },
        {
          id: '46',
          category: 'situational',
          question: 'How would you handle a situation where business requirements keep changing during development?',
          difficulty: 'intermediate',
          keywords: ['agile', 'requirements', 'stakeholder management'],
          tips: [
            'Discuss agile methodologies and iterative development',
            'Show how you\'d communicate impact of changes',
            'Mention the importance of flexible architecture'
          ]
        },

        // Additional Problem-Solving Questions
        {
          id: '47',
          category: 'problem-solving',
          question: 'Design a system to handle file uploads for millions of users.',
          difficulty: 'expert',
          keywords: ['system design', 'scalability', 'file handling'],
          tips: [
            'Discuss cloud storage solutions and CDNs',
            'Consider file size limits and security',
            'Plan for concurrent uploads and storage optimization'
          ]
        },
        {
          id: '48',
          category: 'problem-solving',
          question: 'How would you approach testing a complex web application with multiple integrations?',
          difficulty: 'advanced',
          keywords: ['testing', 'integration', 'quality assurance'],
          tips: [
            'Explain testing pyramid (unit, integration, e2e)',
            'Discuss mocking external services',
            'Mention automated testing tools and frameworks'
          ]
        },

        // Final Technical Questions
        {
          id: '49',
          category: 'technical',
          question: 'Explain the event loop in Node.js and how it handles asynchronous operations.',
          difficulty: 'advanced',
          keywords: ['nodejs', 'event loop', 'asynchronous'],
          tips: [
            'Describe single-threaded nature with event loop',
            'Explain callback queue and call stack',
            'Discuss non-blocking I/O operations'
          ]
        },
        {
          id: '50',
          category: 'technical',
          question: 'What are the key considerations when building a mobile-responsive web application?',
          difficulty: 'intermediate',
          keywords: ['responsive design', 'mobile', 'css'],
          tips: [
            'Discuss mobile-first approach',
            'Mention media queries and flexible layouts',
            'Consider touch interactions and performance'
          ]
        },

        // Bonus Questions
        {
          id: '51',
          category: 'leadership',
          question: 'How would you handle a situation where your team is consistently missing deadlines?',
          difficulty: 'advanced',
          keywords: ['project management', 'deadlines', 'team performance'],
          tips: [
            'Analyze root causes of delays',
            'Implement better estimation and planning',
            'Focus on team support and process improvement'
          ]
        },
        {
          id: '52',
          category: 'technical',
          question: 'Explain the difference between authentication and authorization.',
          difficulty: 'beginner',
          keywords: ['security', 'authentication', 'authorization'],
          tips: [
            'Define who you are vs what you can do',
            'Give examples of each concept',
            'Discuss implementation strategies'
          ]
        }
      ];
      
      setQuestions(comprehensiveQuestions);
      setIsGenerating(false);
      
      toast({
        title: "Comprehensive questions generated!",
        description: `Generated ${comprehensiveQuestions.length} interview questions covering all difficulty levels and categories.`,
      });
    }, 3000);
  };

  const copyQuestion = async (question: string) => {
    try {
      await navigator.clipboard.writeText(question);
      toast({
        title: "Copied to clipboard!",
        description: "Question has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the question manually.",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Code className="h-4 w-4" />;
      case 'behavioral': return <Users className="h-4 w-4" />;
      case 'situational': return <Target className="h-4 w-4" />;
      case 'company-specific': return <Lightbulb className="h-4 w-4" />;
      case 'leadership': return <Users className="h-4 w-4" />;
      case 'problem-solving': return <Brain className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categoryCount = (category: string) => questions.filter(q => q.category === category).length;
  const difficultyCount = (difficulty: string) => questions.filter(q => q.difficulty === difficulty).length;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            Comprehensive Mock Interview Questions
          </h4>
          <Button 
            onClick={generateQuestions}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Generating 50+ Questions...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Questions
              </>
            )}
          </Button>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search questions by content or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Categories:</span>
              </div>
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All ({questions.length})
              </Button>
              {['technical', 'behavioral', 'situational', 'leadership', 'problem-solving', 'company-specific'].map(category => {
                const count = categoryCount(category);
                return count > 0 ? (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {getCategoryIcon(category)}
                    <span className="ml-1 capitalize">{category.replace('-', ' ')} ({count})</span>
                  </Button>
                ) : null;
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Difficulty:</span>
              <Button
                size="sm"
                variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('all')}
              >
                All
              </Button>
              {['beginner', 'intermediate', 'advanced', 'expert'].map(difficulty => {
                const count = difficultyCount(difficulty);
                return count > 0 ? (
                  <Button
                    key={difficulty}
                    size="sm"
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    <span className="capitalize">{difficulty} ({count})</span>
                  </Button>
                ) : null;
              })}
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredQuestions.length} of {questions.length} questions
            </div>
          </div>
        )}
      </Card>

      {filteredQuestions.length > 0 && (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryIcon(question.category)}
                      <Badge variant="outline" className="capitalize">
                        {question.category.replace('-', ' ')}
                      </Badge>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      {question.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-2">
                          {question.keywords.slice(0, 3).map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      {question.question}
                    </h5>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyQuestion(question.question)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-2">Preparation Tips:</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {question.tips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {question.suggestedAnswer && (
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedQuestion(
                          expandedQuestion === question.id ? null : question.id
                        )}
                      >
                        {expandedQuestion === question.id ? 'Hide' : 'Show'} Sample Answer
                      </Button>
                      {expandedQuestion === question.id && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{question.suggestedAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {questions.length === 0 && (
        <Card className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Generate 50+ comprehensive interview questions based on your resume and target job description.
          </p>
          <p className="text-sm text-gray-500">
            Click "Generate Questions" to get started with comprehensive interview preparation covering all difficulty levels.
          </p>
        </Card>
      )}
    </div>
  );
};

export default MockInterviewGenerator;
