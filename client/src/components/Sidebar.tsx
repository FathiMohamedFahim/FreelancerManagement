import React from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import {
  LayoutDashboard,
  FileText,
  Users,
  Clock,
  MessageSquare,
  FolderOpen,
  Target,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  BrainCircuit,
  DollarSign,
} from "lucide-react";

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const { isMobile, isSidebarOpen, toggleSidebar } = useMobile();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
      },
    });
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Projects",
      icon: <FileText className="h-5 w-5" />,
      href: "/projects",
    },
    {
      title: "Clients",
      icon: <Users className="h-5 w-5" />,
      href: "/clients",
    },
    {
      title: "Time Tracker",
      icon: <Clock className="h-5 w-5" />,
      href: "/time-tracker",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/messages",
    },
    {
      title: "Files",
      icon: <FolderOpen className="h-5 w-5" />,
      href: "/files",
    },
    {
      title: "Goals",
      icon: <Target className="h-5 w-5" />,
      href: "/goals",
    },
    {
      title: "Finances",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/finances",
    },
    {
      title: "Payments",
      icon: <DollarSign className="h-5 w-5" />,
      href: "/payments",
    },
    {
      title: "AI Assistant",
      icon: <BrainCircuit className="h-5 w-5" />,
      href: "/ai-assistant",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  if (!user) {
    return null; // Don't render sidebar if user is not logged in
  }

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out",
    {
      "-translate-x-full": isMobile && !isSidebarOpen,
      "translate-x-0": !isMobile || isSidebarOpen,
    }
  );

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 rounded-md bg-primary p-2 text-primary-foreground md:hidden"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="border-b border-border p-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="font-bold text-2xl text-primary">CreatorPro</div>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1.5">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                      location === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.fullName || user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email || "No email"}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}