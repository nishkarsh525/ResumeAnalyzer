
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ResumeChatProps {
  resumeText: string;
  jobDescription?: string;
}

const ResumeChat = ({ resumeText, jobDescription }: ResumeChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your resume assistant. I've analyzed your resume and I'm ready to answer questions about it. You can ask me things like 'What are my weak areas?' or 'What roles fit my background best?'",
      timestamp: new Date(),
      suggestions: [
        "What are my weak areas?",
        "What roles fit my background best?",
        "How can I improve my resume?",
        "What skills should I highlight?"
      ]
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What are my weak areas?",
    "What roles fit my background best?",
    "How can I improve my resume?",
    "What skills should I add?",
    "Is my experience relevant?",
    "What salary range should I expect?"
  ];

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(message);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (question: string): { content: string; suggestions?: string[] } => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('weak') || lowerQuestion.includes('improve')) {
      return {
        content: "Based on your resume analysis, here are the main areas that could be strengthened:\n\n• **Quantified Achievements**: Add specific metrics and numbers to demonstrate impact\n• **Technical Skills**: Consider adding more current technologies like TypeScript, Docker, or cloud platforms\n• **Leadership Experience**: Highlight any team leadership or mentoring roles\n• **Industry Certifications**: Professional certifications would strengthen your profile\n\nWould you like specific suggestions for any of these areas?",
        suggestions: [
          "How do I add more metrics?",
          "What certifications should I get?",
          "How do I show leadership skills?"
        ]
      };
    }

    if (lowerQuestion.includes('role') || lowerQuestion.includes('job') || lowerQuestion.includes('fit')) {
      return {
        content: "Based on your background, here are the roles that align well with your experience:\n\n🎯 **Perfect Fit (90%+ match)**:\n• Full Stack Developer\n• Frontend Developer\n• React Developer\n\n🔧 **Good Fit (70-90% match)**:\n• Software Engineer\n• UI/UX Developer\n• JavaScript Developer\n\n📈 **Growth Opportunities (50-70% match)**:\n• Tech Lead\n• Product Manager (with additional business skills)\n• DevOps Engineer (with infrastructure training)\n\nYour React and JavaScript skills are your strongest assets!",
        suggestions: [
          "What skills do I need for Tech Lead?",
          "How do I transition to Product Manager?",
          "What companies should I target?"
        ]
      };
    }

    if (lowerQuestion.includes('skill') || lowerQuestion.includes('add') || lowerQuestion.includes('learn')) {
      return {
        content: "Here are the high-impact skills you should consider adding:\n\n🔥 **High Priority** (trending in job market):\n• TypeScript - adds type safety to JavaScript\n• Next.js - React framework for production\n• GraphQL - modern API query language\n• Docker - containerization for deployment\n\n⚡ **Medium Priority** (valuable additions):\n• Tailwind CSS - utility-first CSS framework\n• Jest/Testing Library - automated testing\n• AWS/Azure - cloud platform basics\n• Git workflows - advanced version control\n\nStart with TypeScript and Next.js as they build on your React foundation!",
        suggestions: [
          "How long does it take to learn TypeScript?",
          "What's the best way to learn Next.js?",
          "Should I focus on cloud skills?"
        ]
      };
    }

    if (lowerQuestion.includes('salary') || lowerQuestion.includes('pay') || lowerQuestion.includes('money')) {
      return {
        content: "Based on your experience level and skills, here's a realistic salary expectation:\n\n💰 **Current Market Range**:\n• Junior Developer: $50,000 - $70,000\n• Mid-level Developer: $70,000 - $95,000\n• Senior Developer: $95,000 - $120,000+\n\n📍 **Location Factors**:\n• Major tech hubs (SF, NY, Seattle): +20-40% premium\n• Remote roles: Often pay market rates\n• Smaller cities: -10-20% from national average\n\n🚀 **Your Position**: Based on your React/JavaScript skills, you're likely in the mid-level range. Adding TypeScript and cloud skills could push you toward senior level.",
        suggestions: [
          "How do I negotiate salary?",
          "What benefits should I ask for?",
          "Should I consider remote work?"
        ]
      };
    }

    if (lowerQuestion.includes('company') || lowerQuestion.includes('where') || lowerQuestion.includes('target')) {
      return {
        content: "Here are company types that would be great fits for your profile:\n\n🏢 **Company Types to Target**:\n• **Startups** - Value full-stack flexibility\n• **SaaS Companies** - Need React/JavaScript expertise  \n• **E-commerce** - Require strong frontend skills\n• **Fintech** - Appreciate attention to detail\n\n🎯 **Specific Company Suggestions**:\n• Medium-sized tech companies (100-500 employees)\n• Companies using React in their tech stack\n• Remote-first organizations\n• Companies with strong engineering cultures\n\n💡 **Research Tips**: Look for companies that mention React, JavaScript, or modern web development in their job postings.",
        suggestions: [
          "How do I research company culture?",
          "What questions should I ask in interviews?",
          "How do I find the right hiring manager?"
        ]
      };
    }

    // Default response
    return {
      content: "I'd be happy to help you with that! I can provide insights about your resume based on the content you've uploaded. Here are some areas I can help you explore:\n\n• Identifying strengths and weaknesses\n• Suggesting role matches\n• Recommending skill improvements\n• Salary expectations\n• Company targeting strategies\n\nWhat specific aspect would you like to dive deeper into?",
      suggestions: quickQuestions.slice(0, 4)
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(currentMessage);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
          Chat with Your Resume
        </h4>
        
        {/* Quick Questions */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Quick questions to get started:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => sendMessage(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="p-4 bg-gray-50">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'assistant' && (
                        <Bot className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm whitespace-pre-line">
                          {message.content}
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-gray-500">Suggested follow-ups:</p>
                            {message.suggestions.map((suggestion, i) => (
                              <Button
                                key={i}
                                size="sm"
                                variant="ghost"
                                onClick={() => sendMessage(suggestion)}
                                className="text-xs h-6 p-1 text-blue-600 hover:text-blue-800"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Input */}
        <div className="flex space-x-2 mt-4">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your resume..."
            className="flex-1"
          />
          <Button 
            onClick={() => sendMessage(currentMessage)}
            disabled={!currentMessage.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResumeChat;
