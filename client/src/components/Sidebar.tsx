import { useLocation } from "wouter";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/components/ThemeProvider";
import { UserAvatar } from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  Users,
  MessageSquare,
  FileIcon,
  Target,
  DollarSign,
  Bot,
  Settings,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: React.ReactNode;
  isActive?: boolean;
}

function SidebarLink({ href, icon, children, badge, isActive }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <a
        className={cn(
          "nav-link",
          isActive && "nav-link-active",
          "relative"
        )}
      >
        {icon}
        <span className="ml-3">{children}</span>
        {badge && badge}
      </a>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="hidden md:flex md:flex-col md:fixed md:w-64 md:inset-y-0 border-r bg-card">
      <div className="flex flex-col h-full">
        {/* Logo and App Name */}
        <div className="flex items-center h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
              <Monitor className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">CreatorPro</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <SidebarLink 
            href="/dashboard" 
            icon={<LayoutDashboard className="h-5 w-5" />}
            isActive={location === "/dashboard" || location === "/"}
          >
            {t("dashboard")}
          </SidebarLink>
          
          <SidebarLink 
            href="/projects" 
            icon={<FolderKanban className="h-5 w-5" />}
            isActive={location === "/projects"}
          >
            {t("projects")}
          </SidebarLink>
          
          <SidebarLink 
            href="/clients" 
            icon={<Users className="h-5 w-5" />}
            isActive={location === "/clients"}
          >
            {t("clients")}
          </SidebarLink>
          
          <SidebarLink 
            href="/time-tracker" 
            icon={<Clock className="h-5 w-5" />}
            isActive={location === "/time-tracker"}
          >
            {t("timeTracker")}
          </SidebarLink>
          
          <SidebarLink 
            href="/messages" 
            icon={<MessageSquare className="h-5 w-5" />}
            isActive={location === "/messages"}
            badge={
              <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground rounded-full text-xs px-2 py-0.5">
                3
              </span>
            }
          >
            {t("messages")}
          </SidebarLink>
          
          <SidebarLink 
            href="/files" 
            icon={<FileIcon className="h-5 w-5" />}
            isActive={location === "/files"}
          >
            {t("files")}
          </SidebarLink>
          
          <SidebarLink 
            href="/goals" 
            icon={<Target className="h-5 w-5" />}
            isActive={location === "/goals"}
          >
            {t("goals")}
          </SidebarLink>
          
          <SidebarLink 
            href="/finances" 
            icon={<DollarSign className="h-5 w-5" />}
            isActive={location === "/finances"}
          >
            {t("finances")}
          </SidebarLink>
          
          <SidebarLink 
            href="/ai-assistant" 
            icon={<Bot className="h-5 w-5" />}
            isActive={location === "/ai-assistant"}
            badge={
              <Badge variant="outline" className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground">
                {t("beta")}
              </Badge>
            }
          >
            {t("aiAssistant")}
          </SidebarLink>
          
          <SidebarLink 
            href="/settings" 
            icon={<Settings className="h-5 w-5" />}
            isActive={location === "/settings"}
          >
            {t("settings")}
          </SidebarLink>
        </div>

        {/* User Profile and Settings */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserAvatar 
                name={user?.username || "User"} 
                size="sm" 
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium">{user?.username}</div>
              <div className="text-xs text-muted-foreground">{t("freePlan")}</div>
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              className="p-2 rounded-md hover:bg-muted" 
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
