
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Sparkles, 
  AlertCircle,
  CheckCircle,
  Target,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';
  title: string;
  content: any;
}

interface CustomResumeBuilderProps {
  jobDescription?: string;
  existingResumeText?: string;
}

const CustomResumeBuilder = ({ jobDescription = '', existingResumeText = '' }: CustomResumeBuilderProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: '1',
      type: 'personal',
      title: 'Personal Information',
      content: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: ''
      }
    },
    {
      id: '2',
      type: 'summary',
      title: 'Professional Summary',
      content: { text: '' }
    },
    {
      id: '3',
      type: 'experience',
      title: 'Work Experience',
      content: { experiences: [] }
    },
    {
      id: '4',
      type: 'skills',
      title: 'Skills',
      content: { skills: [] }
    }
  ]);

  const [missingKeywords, setMissingKeywords] = useState<string[]>([
    'React.js', 'TypeScript', 'Node.js', 'API Development', 'Agile Methodology'
  ]);

  const templates = [
    { id: 'modern', name: 'Modern ATS', description: 'Clean, professional design optimized for ATS systems' },
    { id: 'minimal', name: 'Minimal Pro', description: 'Simple layout with maximum readability' },
    { id: 'executive', name: 'Executive', description: 'Premium design for senior positions' },
    { id: 'tech', name: 'Tech Focus', description: 'Specialized for technical roles' }
  ];

  const generateAIBulletPoint = (role: string, company: string) => {
    // Simulate AI generation
    const bulletPoints = [
      `Led development of ${company}'s core platform features, resulting in 40% increase in user engagement`,
      `Architected scalable microservices infrastructure serving 10,000+ daily active users`,
      `Mentored team of 5 junior developers, improving code quality and reducing bug reports by 60%`,
      `Implemented automated testing pipeline, reducing deployment time by 75%`,
      `Collaborated with cross-functional teams to deliver 15+ product features on schedule`
    ];
    
    return bulletPoints[Math.floor(Math.random() * bulletPoints.length)];
  };

  const generateAISummary = () => {
    const summary = `Results-driven Full Stack Developer with 5+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions that drive business growth. Passionate about clean code, user experience, and continuous learning.`;
    
    const summarySection = sections.find(s => s.type === 'summary');
    if (summarySection) {
      summarySection.content.text = summary;
      setSections([...sections]);
      toast({
        title: "AI Summary Generated!",
        description: "Professional summary has been created based on your experience.",
      });
    }
  };

  const addExperience = () => {
    const experienceSection = sections.find(s => s.type === 'experience');
    if (experienceSection) {
      experienceSection.content.experiences.push({
        id: Date.now().toString(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        bulletPoints: ['']
      });
      setSections([...sections]);
    }
  };

  const addBulletPoint = (expId: string) => {
    const experienceSection = sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const experience = experienceSection.content.experiences.find((exp: any) => exp.id === expId);
      if (experience) {
        experience.bulletPoints.push('');
        setSections([...sections]);
      }
    }
  };

  const addAIBulletPoint = (expId: string) => {
    const experienceSection = sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const experience = experienceSection.content.experiences.find((exp: any) => exp.id === expId);
      if (experience && experience.title && experience.company) {
        const aiBullet = generateAIBulletPoint(experience.title, experience.company);
        experience.bulletPoints.push(aiBullet);
        setSections([...sections]);
        toast({
          title: "AI Bullet Point Added!",
          description: "Generated based on your role and company.",
        });
      } else {
        toast({
          title: "Missing Information",
          description: "Please fill in job title and company first.",
          variant: "destructive",
        });
      }
    }
  };

  const updateExperience = (expId: string, field: string, value: string) => {
    const experienceSection = sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const experience = experienceSection.content.experiences.find((exp: any) => exp.id === expId);
      if (experience) {
        experience[field] = value;
        setSections([...sections]);
      }
    }
  };

  const updateBulletPoint = (expId: string, bulletIndex: number, value: string) => {
    const experienceSection = sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const experience = experienceSection.content.experiences.find((exp: any) => exp.id === expId);
      if (experience) {
        experience.bulletPoints[bulletIndex] = value;
        setSections([...sections]);
      }
    }
  };

  const addSkill = (skill: string) => {
    const skillsSection = sections.find(s => s.type === 'skills');
    if (skillsSection && skill.trim()) {
      skillsSection.content.skills.push(skill.trim());
      setSections([...sections]);
    }
  };

  const addMissingKeyword = (keyword: string) => {
    addSkill(keyword);
    setMissingKeywords(prev => prev.filter(k => k !== keyword));
    toast({
      title: "Keyword Added!",
      description: `${keyword} has been added to your skills section.`,
    });
  };

  const calculateAtsScore = () => {
    const personalSection = sections.find(s => s.type === 'personal');
    const summarySection = sections.find(s => s.type === 'summary');
    const experienceSection = sections.find(s => s.type === 'experience');
    const skillsSection = sections.find(s => s.type === 'skills');

    let score = 0;
    
    // Personal info completeness (20 points)
    if (personalSection?.content.fullName) score += 5;
    if (personalSection?.content.email) score += 5;
    if (personalSection?.content.phone) score += 5;
    if (personalSection?.content.location) score += 5;

    // Summary (20 points)
    if (summarySection?.content.text && summarySection.content.text.length > 50) score += 20;

    // Experience (40 points)
    const experiences = experienceSection?.content.experiences || [];
    if (experiences.length > 0) score += 20;
    const totalBullets = experiences.reduce((acc: number, exp: any) => acc + exp.bulletPoints.filter((b: string) => b.trim()).length, 0);
    if (totalBullets >= 6) score += 20;

    // Skills (20 points)
    const skills = skillsSection?.content.skills || [];
    if (skills.length >= 5) score += 10;
    if (skills.length >= 10) score += 10;

    return score;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Custom Resume Builder
          </h3>
          <p className="text-gray-600 mt-1">Build ATS-optimized resumes with AI assistance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600">ATS Score:</div>
          <div className="flex items-center space-x-2">
            <Progress value={calculateAtsScore()} className="w-20" />
            <span className="font-bold text-lg">{calculateAtsScore()}%</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Full Name" 
                value={sections.find(s => s.type === 'personal')?.content.fullName || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.fullName = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
              <Input 
                placeholder="Email Address" 
                type="email"
                value={sections.find(s => s.type === 'personal')?.content.email || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.email = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
              <Input 
                placeholder="Phone Number" 
                value={sections.find(s => s.type === 'personal')?.content.phone || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.phone = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
              <Input 
                placeholder="Location (City, State)" 
                value={sections.find(s => s.type === 'personal')?.content.location || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.location = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
              <Input 
                placeholder="LinkedIn Profile" 
                value={sections.find(s => s.type === 'personal')?.content.linkedin || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.linkedin = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
              <Input 
                placeholder="Website/Portfolio" 
                value={sections.find(s => s.type === 'personal')?.content.website || ''}
                onChange={(e) => {
                  const section = sections.find(s => s.type === 'personal');
                  if (section) {
                    section.content.website = e.target.value;
                    setSections([...sections]);
                  }
                }}
              />
            </div>
          </Card>

          {/* Professional Summary */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Professional Summary</h4>
              <Button onClick={generateAISummary} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Summary
              </Button>
            </div>
            <Textarea
              placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
              value={sections.find(s => s.type === 'summary')?.content.text || ''}
              onChange={(e) => {
                const section = sections.find(s => s.type === 'summary');
                if (section) {
                  section.content.text = e.target.value;
                  setSections([...sections]);
                }
              }}
              className="min-h-[120px]"
            />
          </Card>

          {/* Work Experience */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Work Experience</h4>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            
            <div className="space-y-6">
              {sections.find(s => s.type === 'experience')?.content.experiences.map((exp: any, index: number) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                    <Input
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <Input
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Key Achievements</label>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => addBulletPoint(exp.id)} 
                          size="sm" 
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Point
                        </Button>
                        <Button 
                          onClick={() => addAIBulletPoint(exp.id)} 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Generate
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {exp.bulletPoints.map((bullet: string, bulletIndex: number) => (
                        <div key={bulletIndex} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-2">•</span>
                          <Textarea
                            placeholder="Describe your achievement with metrics and impact..."
                            value={bullet}
                            onChange={(e) => updateBulletPoint(exp.id, bulletIndex, e.target.value)}
                            className="min-h-[60px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">Skills</h4>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      addSkill(target.value);
                      target.value = '';
                    }
                  }}
                />
                <Button 
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                    addSkill(input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sections.find(s => s.type === 'skills')?.content.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button
                      onClick={() => {
                        const skillsSection = sections.find(s => s.type === 'skills');
                        if (skillsSection) {
                          skillsSection.content.skills.splice(index, 1);
                          setSections([...sections]);
                        }
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`p-6 cursor-pointer transition-all ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">{template.name}</h4>
                  {selectedTemplate === template.id && (
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <div className="bg-gray-100 h-32 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Template Preview</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="h-5 w-5 text-orange-600" />
              <h4 className="text-lg font-semibold">Missing Keywords Analysis</h4>
            </div>
            
            {jobDescription ? (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-orange-800">Keywords Missing from Your Resume</h5>
                      <p className="text-sm text-orange-700 mt-1">
                        Add these keywords to improve your ATS score and job match percentage.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {missingKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-red-700 border-red-300">
                          Missing
                        </Badge>
                        <span className="font-medium">{keyword}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => addMissingKeyword(keyword)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Skills
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Suggest Placement
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h5 className="text-lg font-medium text-gray-600 mb-2">No Job Description Provided</h5>
                <p className="text-gray-500">
                  Upload a job description to get personalized keyword recommendations.
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomResumeBuilder;
