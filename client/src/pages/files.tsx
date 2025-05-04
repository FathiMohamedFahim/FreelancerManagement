import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Folder, 
  File, 
  Image, 
  FileText, 
  MoreVertical,
  Download,
  Share,
  Trash,
  ChevronRight,
  Grid,
  List,
  Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FileItem {
  id: number;
  name: string;
  type: "folder" | "image" | "document" | "pdf";
  size?: string;
  modified: string;
  shared: boolean;
}

export default function Files() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("modified");
  
  // Sample files data
  const files: FileItem[] = [
    {
      id: 1,
      name: "Projects",
      type: "folder",
      modified: "Yesterday",
      shared: false
    },
    {
      id: 2,
      name: "Client Assets",
      type: "folder",
      modified: "Last week",
      shared: true
    },
    {
      id: 3,
      name: "Website Mockups",
      type: "folder",
      modified: "2 days ago",
      shared: false
    },
    {
      id: 4,
      name: "Logo Design.jpg",
      type: "image",
      size: "2.4 MB",
      modified: "Today",
      shared: false
    },
    {
      id: 5,
      name: "Project Proposal.pdf",
      type: "pdf",
      size: "1.2 MB",
      modified: "3 days ago",
      shared: true
    },
    {
      id: 6,
      name: "Meeting Notes.docx",
      type: "document",
      size: "450 KB",
      modified: "1 week ago",
      shared: false
    },
    {
      id: 7,
      name: "Client Feedback.docx",
      type: "document",
      size: "320 KB",
      modified: "Yesterday",
      shared: false
    },
    {
      id: 8,
      name: "Design Mockup.jpg",
      type: "image",
      size: "3.1 MB",
      modified: "Today",
      shared: true
    },
    {
      id: 9,
      name: "Invoice #1024.pdf",
      type: "pdf",
      size: "520 KB",
      modified: "2 days ago",
      shared: false
    }
  ];

  // Filter files based on search term
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort files - folders first, then by selected sort option
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    // Folders always come first
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    
    // Sort based on selected option
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'modified':
        // This is a simplified sort since we're using text dates
        return b.modified.localeCompare(a.modified);
      case 'size':
        // Return 0 for folders since they don't have a size
        if (a.type === 'folder' && b.type === 'folder') return 0;
        return a.size && b.size ? a.size.localeCompare(b.size) : 0;
      default:
        return 0;
    }
  });

  // File type icon mapping
  const getFileIcon = (type: FileItem['type']) => {
    switch(type) {
      case 'folder':
        return <Folder className="h-10 w-10 text-primary" />;
      case 'image':
        return <Image className="h-10 w-10 text-accent" />;
      case 'document':
        return <FileText className="h-10 w-10 text-secondary" />;
      case 'pdf':
        return <File className="h-10 w-10 text-destructive" />;
      default:
        return <File className="h-10 w-10" />;
    }
  };

  // Handle file actions
  const handleDownload = (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      console.log(`Downloading ${file.name}`);
    }
  };

  const handleShare = (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      console.log(`Sharing ${file.name}`);
    }
  };

  const handleDelete = (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      console.log(`Deleting ${file.name}`);
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
            <h1 className="text-xl font-bold hidden md:block">{t('files')}</h1>
            
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
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2 w-[220px] text-sm rounded-md bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                Upload
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
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Documents</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          {/* Storage and View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <Card className="w-full md:w-auto">
              <CardContent className="p-4 flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium">Storage Used</p>
                  <div className="flex items-center mt-1">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <span className="ml-2 text-sm">35% of 10GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative md:hidden flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="modified">Last Modified</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="border rounded-md p-1 flex">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Files Display - Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sortedFiles.length > 0 ? (
                sortedFiles.map((file) => (
                  <div key={file.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 flex flex-col items-center">
                      <div className="relative">
                        {getFileIcon(file.type)}
                        {file.shared && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                            <Share className="h-2 w-2 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="w-full mt-3 text-center">
                        <p className="font-medium text-sm truncate" title={file.name}>{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {file.size ? file.size : ''}
                          {file.size ? ' • ' : ''}
                          {file.modified}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-muted/30 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(file.id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(file.id)}>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(file.id)}
                            className="text-destructive"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-8 bg-muted/30 rounded-lg">
                  <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No files found</p>
                </div>
              )}
            </div>
          )}
          
          {/* Files Display - List View */}
          {viewMode === "list" && (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                        <th className="p-4">Name</th>
                        <th className="p-4">Modified</th>
                        <th className="p-4">Size</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedFiles.length > 0 ? (
                        sortedFiles.map((file) => (
                          <tr key={file.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="mr-3">
                                  {getFileIcon(file.type)}
                                </div>
                                <div>
                                  <div className="font-medium">{file.name}</div>
                                  {file.shared && (
                                    <Badge variant="outline" className="bg-primary/10 text-primary text-xs mt-1">
                                      Shared
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{file.modified}</td>
                            <td className="p-4">{file.size || '-'}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => handleDownload(file.id)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleShare(file.id)}>
                                  <Share className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-muted-foreground">
                            No files found matching your search criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
