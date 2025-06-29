
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Calendar, 
  MapPin,
  Building,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  source: string;
  jobUrl: string;
  contactPerson: string;
  contactEmail: string;
  notes: string;
  priority: 'low' | 'medium' | 'high';
  interviews: Interview[];
  followUps: FollowUp[];
}

interface Interview {
  id: string;
  type: 'phone' | 'video' | 'onsite' | 'technical';
  date: string;
  time: string;
  interviewer: string;
  notes: string;
  rating: number;
}

interface FollowUp {
  id: string;
  date: string;
  type: 'email' | 'call' | 'linkedin';
  notes: string;
  completed: boolean;
}

const JobTracker = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      status: 'interview',
      appliedDate: '2024-01-15',
      source: 'LinkedIn',
      jobUrl: 'https://linkedin.com/jobs/123456',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@techcorp.com',
      notes: 'Great company culture, remote-friendly',
      priority: 'high',
      interviews: [
        {
          id: '1',
          type: 'phone',
          date: '2024-01-20',
          time: '2:00 PM',
          interviewer: 'Sarah Johnson - Recruiter',
          notes: 'Went well, discussed experience and salary expectations',
          rating: 4
        }
      ],
      followUps: [
        {
          id: '1',
          date: '2024-01-22',
          type: 'email',
          notes: 'Send thank you email after phone screen',
          completed: true
        }
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'Remote',
      salary: '$90,000 - $110,000',
      status: 'applied',
      appliedDate: '2024-01-18',
      source: 'Indeed',
      jobUrl: 'https://indeed.com/jobs/789123',
      contactPerson: '',
      contactEmail: '',
      notes: 'Interesting startup, working on AI products',
      priority: 'medium',
      interviews: [],
      followUps: []
    }
  ]);

  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800', icon: Clock },
    { value: 'screening', label: 'Screening', color: 'bg-yellow-100 text-yellow-800', icon: Phone },
    { value: 'interview', label: 'Interview', color: 'bg-purple-100 text-purple-800', icon: MessageSquare },
    { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
    { value: 'withdrawn', label: 'Withdrawn', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusInfo = (status: string) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(p => p.value === priority) || priorityOptions[0];
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStats = () => {
    const stats = statusOptions.map(status => ({
      ...status,
      count: applications.filter(app => app.status === status.value).length
    }));
    return stats;
  };

  const addApplication = (appData: Partial<JobApplication>) => {
    const newApp: JobApplication = {
      id: Date.now().toString(),
      company: appData.company || '',
      position: appData.position || '',
      location: appData.location || '',
      salary: appData.salary || '',
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      source: appData.source || '',
      jobUrl: appData.jobUrl || '',
      contactPerson: appData.contactPerson || '',
      contactEmail: appData.contactEmail || '',
      notes: appData.notes || '',
      priority: 'medium',
      interviews: [],
      followUps: []
    };
    
    setApplications([...applications, newApp]);
    setShowAddForm(false);
    toast({
      title: "Application Added!",
      description: `${newApp.company} - ${newApp.position} has been added to your tracker.`,
    });
  };

  const updateApplicationStatus = (id: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus as any } : app
    ));
    toast({
      title: "Status Updated",
      description: "Application status has been updated successfully.",
    });
  };

  const addInterview = (appId: string, interview: Omit<Interview, 'id'>) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            interviews: [...app.interviews, { ...interview, id: Date.now().toString() }]
          }
        : app
    ));
    toast({
      title: "Interview Added",
      description: "Interview has been added to your application.",
    });
  };

  const addFollowUp = (appId: string, followUp: Omit<FollowUp, 'id'>) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            followUps: [...app.followUps, { ...followUp, id: Date.now().toString() }]
          }
        : app
    ));
    toast({
      title: "Follow-up Added",
      description: "Follow-up task has been added.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-indigo-600" />
            Job Application Tracker
          </h3>
          <p className="text-gray-600 mt-1">Manage your job applications and track your progress</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {getStatusStats().map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.value} className="p-4">
              <div className="flex items-center space-x-2">
                <IconComponent className="h-4 w-4 text-gray-600" />
                <div className="text-2xl font-bold">{stat.count}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search companies or positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* Applications List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app) => {
              const statusInfo = getStatusInfo(app.status);
              const priorityInfo = getPriorityInfo(app.priority);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card key={app.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{app.position}</h4>
                      <p className="text-indigo-600 font-medium">{app.company}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {app.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <Badge className={priorityInfo.color}>
                        <Star className="h-3 w-3 mr-1" />
                        {priorityInfo.label}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-2" />
                      {app.salary || 'Salary not specified'}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Building className="h-3 w-3 mr-2" />
                      Source: {app.source}
                    </div>
                  </div>

                  {app.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700">{app.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {app.interviews.length} interviews • {app.followUps.length} follow-ups
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedApp(app)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="text-xs px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredApplications.length === 0 && (
            <Card className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Applications Found</h4>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Start tracking your job applications by adding your first one.'
                }
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Application
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">Upcoming Interviews</h4>
            <div className="space-y-4">
              {applications.flatMap(app => 
                app.interviews.map(interview => ({
                  ...interview,
                  company: app.company,
                  position: app.position
                }))
              ).filter(interview => new Date(interview.date) >= new Date()).map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <div className="font-medium">{interview.company} - {interview.position}</div>
                    <div className="text-sm text-gray-600">{interview.type} interview with {interview.interviewer}</div>
                    <div className="text-sm text-blue-700">{interview.date} at {interview.time}</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {interview.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Application Success Rate
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Response Rate</span>
                  <span className="font-bold">65%</span>
                </div>
                <Progress value={65} />
                <div className="flex justify-between items-center">
                  <span>Interview Rate</span>
                  <span className="font-bold">40%</span>
                </div>
                <Progress value={40} />
                <div className="flex justify-between items-center">
                  <span>Offer Rate</span>
                  <span className="font-bold">25%</span>
                </div>
                <Progress value={25} />
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Application Sources</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>LinkedIn</span>
                  <Badge variant="secondary">8 applications</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Indeed</span>
                  <Badge variant="secondary">5 applications</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Company Website</span>
                  <Badge variant="secondary">3 applications</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Referral</span>
                  <Badge variant="secondary">2 applications</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Application Form Modal would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Add New Application</h3>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>✕</Button>
              </div>
              {/* Add form fields here */}
              <div className="space-y-4">
                <Input placeholder="Company Name" />
                <Input placeholder="Position Title" />
                <Input placeholder="Location" />
                <Input placeholder="Salary Range" />
                <Input placeholder="Job Source (LinkedIn, Indeed, etc.)" />
                <Input placeholder="Job URL" />
                <Textarea placeholder="Notes about this application..." />
                <div className="flex space-x-4">
                  <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
                  <Button onClick={() => addApplication({})}>Add Application</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JobTracker;
