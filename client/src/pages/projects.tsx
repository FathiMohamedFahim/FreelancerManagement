import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, MoreVertical, Calendar, Clock, Users, FileText, LucideActivity, Globe, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/ui/project-card";

export default function Projects() {
  const { t } = useI18n();

  // Sample project data
  const projects = [
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
    {
      id: 4,
      name: "E-commerce Platform",
      client: "RetailPlus",
      dueDate: "Dec 5",
      status: "onTrack" as const,
      progress: 15,
      icon: <Globe className="h-4 w-4 text-accent" />,
    },
    {
      id: 5,
      name: "Brand Identity",
      client: "StyleCo",
      dueDate: "Nov 2",
      status: "inProgress" as const,
      progress: 50,
      icon: <LucideActivity className="h-4 w-4 text-primary" />,
    },
    {
      id: 6,
      name: "Social Media Strategy",
      client: "FitnessGuru",
      dueDate: "Oct 30",
      status: "delayed" as const,
      progress: 70,
      icon: <Bell className="h-4 w-4 text-destructive" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('projects')}</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with search and actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 text-sm rounded-md bg-background border border-input"
                />
              </div>
              
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                {t('newProject')}
              </Button>
              
              {/* Mobile-only add button */}
              <Button size="icon" className="md:hidden h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>Project Stats</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-sm">Active: 7</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        <span className="text-sm">Completed: 12</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                        <span className="text-sm">Delayed: 3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>Upcoming Deadlines</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm">Marketing Campaign <span className="text-destructive">Oct 15</span></div>
                      <div className="text-sm">Website Redesign <span className="text-yellow-500">Oct 25</span></div>
                      <div className="text-sm">Brand Identity <span className="text-primary">Nov 2</span></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>Hours This Month</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Clock className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-3xl font-bold">142h</div>
                      <div className="flex items-center text-sm text-accent">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-1" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        <span>12% more than last month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Current Projects</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Client
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Status
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                      <th className="pb-3 pl-4">Project</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Due</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 pr-4">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="p-4 text-center">
                <p>Active projects content</p>
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="p-4 text-center">
                <p>Completed projects content</p>
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="p-4 text-center">
                <p>Archived projects content</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
