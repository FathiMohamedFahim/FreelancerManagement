import { useI18n } from "@/lib/i18n";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Bell, Search, LucideActivity, DollarSign, FolderKanban, Clock, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { ProjectCard } from "@/components/ui/project-card";
import { UserAvatar } from "@/components/ui/user-avatar";

export default function Dashboard() {
  const { t } = useI18n();
  const { user } = useAuth();

  const currentProjects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "Acme Inc.",
      dueDate: "Oct 25",
      status: "inProgress" as const,
      progress: 65,
      icon: <LucideActivity className="h-4 w-4 text-primary" />,
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechStart",
      dueDate: "Nov 10",
      status: "onTrack" as const,
      progress: 30,
      icon: <Globe className="h-4 w-4 text-accent" />,
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Global Markets",
      dueDate: "Oct 15",
      status: "delayed" as const,
      progress: 85,
      icon: <Bell className="h-4 w-4 text-destructive" />,
    },
  ];

  const timeEntries = [
    {
      id: 1,
      project: "Website Development",
      client: "Acme Inc.",
      duration: 135, // in minutes
      timeRange: "10:30 - 12:45",
      day: "today",
    },
    {
      id: 2,
      project: "Client Meeting",
      client: "TechStart",
      duration: 45,
      timeRange: "14:00 - 14:45",
      day: "today",
    },
    {
      id: 3,
      project: "Logo Design",
      client: "Freelance Project",
      duration: 210,
      timeRange: "09:00 - 12:30",
      day: "yesterday",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      senderAvatar: "",
      time: "2h ago",
      message: "Hi, I've reviewed the latest designs. They look great! Just a few small changes I'd like to discuss...",
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      senderAvatar: "",
      time: "Yesterday",
      message: "Can we schedule a call next week to discuss the new project requirements? I have some ideas I'd like to share.",
    },
    {
      id: 3,
      sender: "Michael Davis",
      senderAvatar: "",
      time: "2 days ago",
      message: "Thank you for sending the invoice. I've processed the payment. Looking forward to continuing our work together.",
    },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between md:justify-end">
            {/* Mobile Menu Button and Logo */}
            <div className="flex items-center md:hidden">
              <button type="button" className="p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="ml-2 text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with search, notifications, and user menu */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button type="button" className="p-2 rounded-md hover:bg-muted">
                <Search className="h-5 w-5" />
              </button>
              
              {/* Notifications Icon */}
              <button type="button" className="p-2 rounded-md hover:bg-muted relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{t('welcomeBack')}, {user.username}</h1>
            <p className="text-muted-foreground">{t('overview')}</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Button variant="outline" className="flex flex-col items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 h-auto border-none">
              <FolderKanban className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm font-medium">{t('newProject')}</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 h-auto border-none">
              <Clock className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm font-medium">{t('startTimer')}</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 h-auto border-none">
              <DollarSign className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm font-medium">{t('createInvoice')}</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 h-auto border-none">
              <Users className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm font-medium">{t('addClient')}</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title={t('monthlyEarnings')}
              value="$3,426"
              icon={DollarSign}
              iconColor="text-accent"
              iconBackground="bg-accent/10"
              trend={{
                value: "12% from last month",
                positive: true,
              }}
            />
            
            <StatsCard
              title={t('activeProjects')}
              value="7"
              icon={FolderKanban}
              iconColor="text-primary"
              iconBackground="bg-primary/10"
              trend={{
                value: "2 new this week",
                positive: true,
              }}
            />
            
            <StatsCard
              title={t('hoursTracked')}
              value="142"
              icon={Clock}
              iconColor="text-secondary"
              iconBackground="bg-secondary/10"
              trend={{
                value: "8% less than usual",
                positive: false,
              }}
            />
            
            <StatsCard
              title={t('messages')}
              value="12"
              subtitle={`3 ${t('unreadMessages')}`}
              icon={MessageSquare}
              iconColor="text-destructive"
              iconBackground="bg-destructive/10"
            />
          </div>

          {/* Current Projects */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('currentProjects')}</h2>
              <a href="/projects" className="text-sm text-primary">{t('viewAll')}</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                    <th className="pb-3 pl-4">{t('projects')}</th>
                    <th className="pb-3">{t('client')}</th>
                    <th className="pb-3">{t('due')}</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-4">{t('progress')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Time Entries */}
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold">{t('recentTimeEntries')}</h3>
                <a href="/time-tracker" className="text-sm text-primary">{t('viewAll')}</a>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {/* Today Label */}
                  <div className="text-sm font-medium text-muted-foreground">{t('today')}</div>
                  
                  {/* Display time entries */}
                  {timeEntries
                    .filter((entry) => entry.day === "today")
                    .map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between py-2 border-b border-dashed">
                        <div>
                          <div className="font-medium">{entry.project}</div>
                          <div className="text-sm text-muted-foreground">{entry.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatTime(entry.duration)}</div>
                          <div className="text-sm text-muted-foreground">{entry.timeRange}</div>
                        </div>
                      </div>
                    ))}
                  
                  {/* Yesterday Label */}
                  <div className="text-sm font-medium text-muted-foreground pt-2">{t('yesterday')}</div>
                  
                  {/* Display yesterday's entries */}
                  {timeEntries
                    .filter((entry) => entry.day === "yesterday")
                    .map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between py-2 border-b border-dashed">
                        <div>
                          <div className="font-medium">{entry.project}</div>
                          <div className="text-sm text-muted-foreground">{entry.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatTime(entry.duration)}</div>
                          <div className="text-sm text-muted-foreground">{entry.timeRange}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold">{t('recentMessages')}</h3>
                <a href="/messages" className="text-sm text-primary">{t('viewAll')}</a>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <UserAvatar name={message.sender} size="md" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="default" size="sm" className="text-xs px-2 py-1 h-auto">{t('reply')}</Button>
                          <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto bg-muted text-muted-foreground">{t('markAsRead')}</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}

function Users(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}
