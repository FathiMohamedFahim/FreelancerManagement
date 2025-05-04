import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

// Define client types
interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "prospect";
  lastContact: string;
  projects: number;
}

export default function Clients() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample client data
  const clients: Client[] = [
    {
      id: 1,
      name: "John Smith",
      company: "Acme Inc.",
      email: "john.smith@acme.com",
      phone: "(555) 123-4567",
      status: "active",
      lastContact: "2 days ago",
      projects: 3
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "TechStart",
      email: "sarah@techstart.io",
      phone: "(555) 987-6543",
      status: "active",
      lastContact: "Yesterday",
      projects: 1
    },
    {
      id: 3,
      name: "Michael Davis",
      company: "Global Markets",
      email: "m.davis@globalmarkets.com",
      phone: "(555) 555-7890",
      status: "inactive",
      lastContact: "1 week ago",
      projects: 2
    },
    {
      id: 4,
      name: "Emily Chang",
      company: "DesignHub",
      email: "emily@designhub.co",
      phone: "(555) 345-6789",
      status: "prospect",
      lastContact: "3 days ago",
      projects: 0
    },
    {
      id: 5,
      name: "Robert Wilson",
      company: "RetailPlus",
      email: "robert@retailplus.com",
      phone: "(555) 234-5678",
      status: "active",
      lastContact: "Today",
      projects: 1
    },
    {
      id: 6,
      name: "Jennifer Lee",
      company: "StyleCo",
      email: "jennifer@styleco.com",
      phone: "(555) 876-5432",
      status: "inactive",
      lastContact: "2 weeks ago",
      projects: 1
    },
  ];

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle client actions
  const handleEmailClient = (client: Client) => {
    toast({
      title: "Email Client",
      description: `Opening email to ${client.name}`,
    });
  };

  const handleScheduleClient = (client: Client) => {
    toast({
      title: "Schedule Meeting",
      description: `Opening calendar to schedule with ${client.name}`,
    });
  };

  const handleViewClient = (client: Client) => {
    toast({
      title: "View Client",
      description: `Viewing details for ${client.name}`,
    });
  };

  // Status badge colors
  const getStatusBadge = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-tag">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-yellow-tag">Inactive</Badge>;
      case 'prospect':
        return <Badge className="bg-blue-tag">Prospect</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('clients')}</h1>
            
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
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 w-[220px] text-sm rounded-md bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Clients</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="prospects">Prospects</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
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
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{clients.length}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {clients.filter(c => c.status === 'active').length} active clients
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client interactions in the last 7 days
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scheduled for this week
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Client List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                          <th className="pb-3 pl-4">Client</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Last Contact</th>
                          <th className="pb-3">Projects</th>
                          <th className="pb-3 pr-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClients.length > 0 ? (
                          filteredClients.map((client) => (
                            <tr key={client.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 pl-4">
                                <div className="flex items-center">
                                  <UserAvatar name={client.name} size="sm" />
                                  <div className="ml-3">
                                    <div className="font-medium">{client.name}</div>
                                    <div className="text-sm text-muted-foreground">{client.company}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">{getStatusBadge(client.status)}</td>
                              <td className="py-3">{client.lastContact}</td>
                              <td className="py-3">{client.projects}</td>
                              <td className="py-3 pr-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleEmailClient(client)}>
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleScheduleClient(client)}>
                                    <Calendar className="h-4 w-4" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleViewClient(client)}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleEmailClient(client)}>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Send Email
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleScheduleClient(client)}>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule Meeting
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call {client.phone}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                              No clients matching your search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="p-4 text-center">
                <p>Active clients content</p>
              </div>
            </TabsContent>
            
            <TabsContent value="prospects">
              <div className="p-4 text-center">
                <p>Prospect clients content</p>
              </div>
            </TabsContent>
            
            <TabsContent value="inactive">
              <div className="p-4 text-center">
                <p>Inactive clients content</p>
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
