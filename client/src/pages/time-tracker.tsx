import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Clock, 
  Calendar, 
  FileText, 
  Edit, 
  Trash,
  BarChart, 
  Search,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatTime } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Add type declaration for window object
declare global {
  interface Window {
    timerIntervalId: ReturnType<typeof setInterval> | null;
  }
}

// Define time entry types
interface TimeEntry {
  id: number;
  project: string;
  client: string;
  task: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  notes?: string;
}

export default function TimeTracker() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [timerTask, setTimerTask] = useState("");
  
  // Sample time entries data
  const timeEntries: TimeEntry[] = [
    {
      id: 1,
      project: "Website Redesign",
      client: "Acme Inc.",
      task: "Frontend Development",
      date: "Today",
      startTime: "10:30",
      endTime: "12:45",
      duration: 135, // 2h 15m
      notes: "Worked on responsive layout for homepage"
    },
    {
      id: 2,
      project: "Mobile App Development",
      client: "TechStart",
      task: "Client Meeting",
      date: "Today",
      startTime: "14:00",
      endTime: "14:45",
      duration: 45, // 45m
      notes: "Discussed app requirements and timeline"
    },
    {
      id: 3,
      project: "Website Redesign",
      client: "Acme Inc.",
      task: "UI Design",
      date: "Yesterday",
      startTime: "09:00",
      endTime: "12:30",
      duration: 210, // 3h 30m
      notes: "Created mockups for product pages"
    },
    {
      id: 4,
      project: "Logo Design",
      client: "StyleCo",
      task: "Design",
      date: "Yesterday",
      startTime: "13:30",
      endTime: "15:45",
      duration: 135, // 2h 15m
      notes: "Sketched initial concepts"
    },
    {
      id: 5,
      project: "Social Media Campaign",
      client: "FitnessGuru",
      task: "Content Creation",
      date: "2 days ago",
      startTime: "10:00",
      endTime: "13:15",
      duration: 195, // 3h 15m
      notes: "Drafted posts for next month"
    },
  ];

  // Filter time entries based on search term
  const filteredEntries = timeEntries.filter(entry => 
    entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample projects
  const projects = [
    { id: 1, name: "Website Redesign", client: "Acme Inc." },
    { id: 2, name: "Mobile App Development", client: "TechStart" },
    { id: 3, name: "Logo Design", client: "StyleCo" },
    { id: 4, name: "Social Media Campaign", client: "FitnessGuru" },
    { id: 5, name: "E-commerce Platform", client: "RetailPlus" },
  ];

  // Handle timer start/stop
  const toggleTimer = () => {
    if (isTimerActive) {
      // Stop timer logic
      toast({
        title: "Timer Stopped",
        description: `Tracked ${formatTime(timerDuration)} for ${timerTask}`,
      });
      setIsTimerActive(false);
      
      // Clear the interval
      if (window.timerIntervalId) {
        clearInterval(window.timerIntervalId);
        window.timerIntervalId = null;
      }
      
      // Reset timer after stopping
      setTimeout(() => {
        setTimerDuration(0);
        setTimerTask("");
      }, 3000);
    } else {
      // Start timer logic
      if (!selectedProject) {
        toast({
          title: "Select a Project",
          description: "Please select a project before starting the timer",
          variant: "destructive",
        });
        return;
      }

      if (!timerTask.trim()) {
        toast({
          title: "Enter a Task",
          description: "Please enter what you're working on",
          variant: "destructive",
        });
        return;
      }

      setIsTimerActive(true);
      toast({
        title: "Timer Started",
        description: `Tracking time for ${selectedProject}`,
      });
      
      // Simulate timer increasing - with more frequent updates for better UX
      const timerInterval = setInterval(() => {
        setTimerDuration(prev => prev + 1);
      }, 1000); // Update every second for a more responsive timer
      
      // Store interval ID in a ref so we can clear it later
      window.timerIntervalId = timerInterval;
    }
  };

  const handleEditEntry = (entryId: number) => {
    toast({
      title: "Edit Time Entry",
      description: `Editing entry #${entryId}`,
    });
  };

  const handleDeleteEntry = (entryId: number) => {
    toast({
      title: "Delete Time Entry",
      description: `Deleting entry #${entryId}`,
      variant: "destructive",
    });
  };

  const handleAddTimeEntry = () => {
    toast({
      title: "Add Time Entry",
      description: "Opening time entry form",
    });
  };

  // Format time for display
  const formatDisplayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('timeTracker')}</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with search and actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search time entries..."
                  className="pl-10 pr-4 py-2 w-[220px] text-sm rounded-md bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button size="sm" className="hidden md:flex" onClick={handleAddTimeEntry}>
                <Plus className="mr-2 h-4 w-4" />
                Add Time Entry
              </Button>
              
              {/* Mobile-only add button */}
              <Button size="icon" className="md:hidden h-8 w-8" onClick={handleAddTimeEntry}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {/* Timer Section */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Time Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-full md:w-1/3">
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.name}>
                              {project.name} - {project.client}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:flex-1">
                      <Input 
                        type="text" 
                        placeholder="What are you working on?" 
                        value={timerTask}
                        onChange={(e) => setTimerTask(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-between space-x-4">
                  <div className="text-2xl font-mono">
                    {formatDisplayTime(timerDuration)}
                  </div>
                  <Button 
                    size="lg" 
                    className={isTimerActive ? "bg-destructive hover:bg-destructive/90" : ""}
                    onClick={toggleTimer}
                  >
                    {isTimerActive ? (
                      <><Pause className="mr-2 h-4 w-4" /> Stop</>
                    ) : (
                      <><Play className="mr-2 h-4 w-4" /> Start</>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Entries Section */}
          <Tabs defaultValue="entries" className="w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <TabsList>
                <TabsTrigger value="entries">Time Entries</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2 md:space-x-4">
                <div className="relative md:hidden">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 h-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Calendar className="h-4 w-4 mr-2" />
                      This Week
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="end">
                    <div className="p-2">
                      <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" size="sm">Today</Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm">Yesterday</Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm">This Week</Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm">Last Week</Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm">This Month</Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm">Custom Range</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <TabsContent value="entries" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                          <th className="p-4">Project/Task</th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Duration</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEntries.length > 0 ? (
                          filteredEntries.map((entry) => (
                            <tr key={entry.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">
                                <div>
                                  <div className="font-medium">{entry.project}</div>
                                  <div className="text-sm text-muted-foreground">{entry.task}</div>
                                </div>
                              </td>
                              <td className="p-4">{entry.client}</td>
                              <td className="p-4">
                                <div>
                                  <div>{entry.date}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {entry.startTime} - {entry.endTime}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">{formatTime(entry.duration)}</td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                              No time entries matching your search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>Total Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">42h 15m</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      This month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-accent" />
                      <span>Billable Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">38h 45m</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      91.5% billable
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-secondary" />
                      <span>Average Daily</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">6h 30m</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Working days
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Time Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mx-auto mb-2" />
                      <p>Time reports chart would display here</p>
                      <p className="text-sm">Showing data for the current week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
