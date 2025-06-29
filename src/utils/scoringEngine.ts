
export interface JobMatch {
  jobTitle: string;
  matchPercentage: number;
  alignedSkills: string[];
  missedSkills: string[];
  alignedTools: string[];
  missedTools: string[];
  experienceMatch: {
    score: number;
    alignment: string[];
    gaps: string[];
  };
}

export interface ATSAnalysis {
  overallScore: number;
  issues: {
    keywordStuffing: boolean;
    hiddenText: boolean;
    improperFormats: string[];
    complexity: number;
  };
  recommendations: string[];
}

export interface GrammarAnalysis {
  score: number;
  issues: {
    passiveVoice: number;
    jargonCount: number;
    complexityScore: number;
    grammarErrors: Array<{
      type: string;
      text: string;
      suggestion: string;
    }>;
  };
  toneAnalysis: {
    professionalScore: number;
    suggestions: string[];
  };
}

export interface RewriteSuggestion {
  section: string;
  original: string;
  improved: string;
  reason: string;
  actionVerbs: string[];
}

export class ResumeAnalysisEngine {
  static analyzeJobMatches(resumeText: string, jobDescriptions: string[]): JobMatch[] {
    // Mock implementation - in real app, this would use AI/ML
    return jobDescriptions.map((jobDesc, index) => {
      const mockTitles = ['Full Stack Developer', 'Software Engineer', 'Frontend Developer'];
      const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'];
      const tools = ['Git', 'Jira', 'VS Code', 'Jenkins', 'MongoDB', 'PostgreSQL'];
      
      const alignedSkills = skills.slice(0, Math.floor(Math.random() * 4) + 2);
      const missedSkills = skills.filter(skill => !alignedSkills.includes(skill)).slice(0, 3);
      
      return {
        jobTitle: mockTitles[index] || `Position ${index + 1}`,
        matchPercentage: Math.floor(Math.random() * 30) + 70,
        alignedSkills,
        missedSkills,
        alignedTools: tools.slice(0, 3),
        missedTools: tools.slice(3, 5),
        experienceMatch: {
          score: Math.floor(Math.random() * 20) + 75,
          alignment: ['5+ years development experience', 'Team leadership'],
          gaps: ['Cloud architecture experience', 'DevOps practices']
        }
      };
    });
  }

  static simulateATS(resumeText: string): ATSAnalysis {
    // Mock ATS analysis
    const wordCount = resumeText.split(' ').length;
    const hasComplexFormatting = resumeText.includes('|') || resumeText.includes('•');
    
    return {
      overallScore: Math.floor(Math.random() * 20) + 75,
      issues: {
        keywordStuffing: wordCount > 800 && resumeText.split(' ').filter(word => 
          ['developer', 'engineer', 'software'].includes(word.toLowerCase())
        ).length > 10,
        hiddenText: false,
        improperFormats: hasComplexFormatting ? ['Complex bullet formatting detected'] : [],
        complexity: Math.min(wordCount / 100, 10)
      },
      recommendations: [
        'Use standard bullet points (•) instead of complex symbols',
        'Ensure consistent formatting throughout',
        'Maintain clear section headers',
        'Use standard fonts and avoid text boxes'
      ]
    };
  }

  static analyzeGrammar(resumeText: string): GrammarAnalysis {
    // Mock grammar analysis
    const sentences = resumeText.split('.').filter(s => s.trim());
    const passiveVoiceCount = sentences.filter(s => 
      s.includes('was ') || s.includes('were ') || s.includes('been ')
    ).length;
    
    return {
      score: Math.floor(Math.random() * 15) + 80,
      issues: {
        passiveVoice: passiveVoiceCount,
        jargonCount: Math.floor(Math.random() * 5) + 2,
        complexityScore: Math.floor(Math.random() * 3) + 6,
        grammarErrors: [
          {
            type: 'Passive Voice',
            text: 'Projects were completed on time',
            suggestion: 'Completed projects on time'
          },
          {
            type: 'Weak Verb',
            text: 'Helped with development',
            suggestion: 'Led development initiatives'
          }
        ]
      },
      toneAnalysis: {
        professionalScore: Math.floor(Math.random() * 10) + 85,
        suggestions: [
          'Use more action verbs to start bullet points',
          'Quantify achievements with specific metrics',
          'Remove personal pronouns (I, me, my)'
        ]
      }
    };
  }

  static generateRewriteSuggestions(resumeText: string): RewriteSuggestion[] {
    // Mock rewrite suggestions
    return [
      {
        section: 'Professional Summary',
        original: 'I am a software developer with experience in web development.',
        improved: 'Experienced software developer with 5+ years specializing in full-stack web development and modern JavaScript frameworks.',
        reason: 'More specific, quantified, and professional tone',
        actionVerbs: ['Specialized', 'Developed', 'Architected']
      },
      {
        section: 'Work Experience',
        original: 'Worked on various projects using React and Node.js.',
        improved: 'Architected and delivered 12+ scalable web applications using React.js and Node.js, improving user engagement by 40%.',
        reason: 'Added quantifiable metrics and stronger action verbs',
        actionVerbs: ['Architected', 'Delivered', 'Improved']
      },
      {
        section: 'Work Experience',
        original: 'Helped the team with code reviews and testing.',
        improved: 'Led comprehensive code review processes and implemented automated testing protocols, reducing bug reports by 35%.',
        reason: 'Changed from passive helper role to active leadership with measurable impact',
        actionVerbs: ['Led', 'Implemented', 'Reduced']
      }
    ];
  }
}
