import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Progress 
} from "@/components/ui/progress";
import { 
  Search, 
  Plus, 
  Target, 
  CheckCircle, 
  MoreVertical,
  Calendar,
  ArrowUpRight,
  Edit,
  Trash,
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  status: "active" | "completed" | "overdue";
  category: "business" | "financial" | "personal" | "professional";
  createdAt: string;
}

interface Milestone {
  id: number;
  goalId: number;
  title: string;
  completed: boolean;
}

export default function Goals() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  
  // Sample goals data
  const goals: Goal[] = [
    {
      id: 1,
      title: "Acquire 5 New Clients",
      description: "Find and sign contracts with 5 new clients for website development projects",
      deadline: "Dec 31, 2023",
      progress: 60,
      status: "active",
      category: "business",
      createdAt: "Oct 1, 2023"
    },
    {
      id: 2,
      title: "Complete Web Design Course",
      description: "Finish the advanced UI/UX design course to improve skills",
      deadline: "Nov 15, 2023",
      progress: 75,
      status: "active",
      category: "professional",
      createdAt: "Sep 10, 2023"
    },
    {
      id: 3,
      title: "Reach $10,000 Monthly Revenue",
      description: "Increase freelancing income to reach $10k per month consistently",
      deadline: "Jan 31, 2024",
      progress: 40,
      status: "active",
      category: "financial",
      createdAt: "Aug 15, 2023"
    },
    {
      id: 4,
      title: "Publish 10 Blog Articles",
      description: "Write and publish articles about web development to increase visibility",
      deadline: "Nov 30, 2023",
      progress: 30,
      status: "active",
      category: "business",
      createdAt: "Sep 25, 2023"
    },
    {
      id: 5,
      title: "Develop Portfolio Website",
      description: "Create a new portfolio website to showcase recent work",
      deadline: "Oct 15, 2023",
      progress: 100,
      status: "completed",
      category: "professional",
      createdAt: "Sep 1, 2023"
    },
    {
      id: 6,
      title: "Launch Freelance Newsletter",
      description: "Start a monthly newsletter for clients and prospects",
      deadline: "Oct 5, 2023",
      progress: 80,
      status: "overdue",
      category: "business",
      createdAt: "Aug 20, 2023"
    }
  ];

  // Sample milestones
  const milestones: Milestone[] = [
    { id: 1, goalId: 1, title: "Identify 20 potential clients", completed: true },
    { id: 2, goalId: 1, title: "Reach out to potential clients", completed: true },
    { id: 3, goalId: 1, title: "Schedule discovery calls", completed: true },
    { id: 4, goalId: 1, title: "Send proposals", completed: false },
    { id: 5, goalId: 1, title: "Sign contracts", completed: false },
    { id: 6, goalId: 2, title: "Complete modules 1-5", completed: true },
    { id: 7, goalId: 2, title: "Complete modules 6-10", completed: true },
    { id: 8, goalId: 2, title: "Complete final project", completed: false },
  ];

  // Filter goals based on search term and active tab
  const filteredGoals = goals.filter(goal => 
    (goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === "all" || goal.status === activeTab)
  );

  // Get category badge
  const getCategoryBadge = (category: Goal['category']) => {
    switch(category) {
      case 'business':
        return <Badge className="bg-blue-tag">Business</Badge>;
      case 'financial':
        return <Badge className="bg-green-tag">Financial</Badge>;
      case 'personal':
        return <Badge className="bg-purple-tag">Personal</Badge>;
      case 'professional':
        return <Badge className="bg-yellow-tag">Professional</Badge>;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (status: Goal['status']) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-blue-tag">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-tag">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-tag">Overdue</Badge>;
      default:
        return null;
    }
  };

  // Handle goal actions
  const handleEditGoal = (goalId: number) => {
    console.log(`Editing goal ${goalId}`);
  };

  const handleDeleteGoal = (goalId: number) => {
    console.log(`Deleting goal ${goalId}`);
  };

  const handleToggleMilestone = (milestoneId: number) => {
    console.log(`Toggling milestone ${milestoneId}`);
  };

  // Get goal milestones
  const getGoalMilestones = (goalId: number) => {
    return milestones.filter(milestone => milestone.goalId === goalId);
  };

  // Get goal completion percentage
  const getCompletionPercentage = (goalId: number) => {
    const goalMilestones = getGoalMilestones(goalId);
    if (goalMilestones.length === 0) return 0;
    
    const completedCount = goalMilestones.filter(m => m.completed).length;
    return Math.round((completedCount / goalMilestones.length) * 100);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('goals')}</h1>
            
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
                  placeholder="Search goals..."
                  className="pl-10 pr-4 py-2 w-[220px] text-sm rounded-md bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  <span>Active Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {goals.filter(g => g.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  In progress
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                  <span>Completed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {goals.filter(g => g.status === 'completed').length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Successfully achieved
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-secondary" />
                  <span>Goal Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Goals due this month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Goals List */}
          <div className="mb-6">
            <Tabs defaultValue="active" onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="all">All Goals</TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2 md:space-x-4">
                  <div className="relative md:hidden">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search goals..."
                      className="pl-10 h-9 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <TabsContent value="active" className="mt-0 space-y-4">
                {filteredGoals.map(goal => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle>{goal.title}</CardTitle>
                          <div className="flex space-x-2">
                            {getCategoryBadge(goal.category)}
                            {getStatusBadge(goal.status)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditGoal(goal.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {}}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Complete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          Due: {goal.deadline}
                        </span>
                        <span className="flex items-center text-accent">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          {getCompletionPercentage(goal.id)}% milestone completion
                        </span>
                      </div>
                      
                      {/* Milestones */}
                      {getGoalMilestones(goal.id).length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Milestones</h4>
                          <ul className="space-y-2">
                            {getGoalMilestones(goal.id).map(milestone => (
                              <li key={milestone.id} className="flex items-start">
                                <Button 
                                  variant={milestone.completed ? "default" : "outline"} 
                                  size="icon" 
                                  className="h-5 w-5 mr-2 rounded-full mt-0.5"
                                  onClick={() => handleToggleMilestone(milestone.id)}
                                >
                                  {milestone.completed && <Check className="h-3 w-3" />}
                                </Button>
                                <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {milestone.title}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {filteredGoals.length === 0 && (
                  <div className="text-center p-8 bg-muted/30 rounded-lg">
                    <Target className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No goals found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                {/* Content for completed goals tab */}
              </TabsContent>
              
              <TabsContent value="overdue" className="mt-0">
                {/* Content for overdue goals tab */}
              </TabsContent>
              
              <TabsContent value="all" className="mt-0">
                {/* Content for all goals tab */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
