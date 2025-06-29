import { Brain, FileText } from 'lucide-react';

interface AppHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppHeader = ({ activeTab, onTabChange }: AppHeaderProps) => {
  const tabs = [
    { id: 'analyzer', label: 'Analyzer', icon: Brain },
    { id: 'builder', label: 'Builder', icon: FileText },
    { id: 'cover-letter', label: 'Cover Letter', icon: FileText }
  ];

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ResumeAI Pro Suite</h1>
              <p className="text-sm text-gray-600">Complete job application toolkit with AI assistance</p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
