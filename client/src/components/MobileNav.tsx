import { useLocation } from "wouter";
import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  Users,
  MessageSquare,
  FileIcon,
  Target,
  DollarSign,
  MoreHorizontal
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

export function MobileNav() {
  const [location] = useLocation();
  const { t } = useI18n();
  
  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      label: t("dashboard"),
    },
    {
      path: "/projects",
      icon: <FolderKanban className="h-6 w-6" />,
      label: t("projects"),
    },
    {
      path: "/time-tracker",
      icon: <Clock className="h-6 w-6" />,
      label: t("timeTracker"),
    },
    {
      path: "/messages",
      icon: (
        <div className="relative">
          <MessageSquare className="h-6 w-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
        </div>
      ),
      label: t("messages"),
    },
    {
      path: "/more",
      icon: <MoreHorizontal className="h-6 w-6" />,
      label: t("more"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-card border-t md:hidden">
      <div className="flex justify-between px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={cn(
              "mobile-nav-item",
              location === item.path && "active"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
