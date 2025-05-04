import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  client: string;
  dueDate: string;
  status: "inProgress" | "onTrack" | "delayed";
  progress: number;
  icon: React.ReactNode;
}

export function ProjectCard({ name, client, dueDate, status, progress, icon }: ProjectCardProps) {
  const statusClasses = {
    inProgress: "bg-yellow-tag",
    onTrack: "bg-green-tag",
    delayed: "bg-red-tag",
  };

  const statusLabels = {
    inProgress: "In Progress",
    onTrack: "On Track",
    delayed: "Delayed",
  };

  const progressBarColor = {
    inProgress: "bg-primary",
    onTrack: "bg-accent",
    delayed: "bg-destructive",
  };

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-3 pl-4">
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0 rounded bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div className="ml-3">
            <div className="font-medium">{name}</div>
          </div>
        </div>
      </td>
      <td className="py-3">{client}</td>
      <td className="py-3">{dueDate}</td>
      <td className="py-3">
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", statusClasses[status])}>
          {statusLabels[status]}
        </span>
      </td>
      <td className="py-3 pr-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={cn("h-2 rounded-full", progressBarColor[status])} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </td>
    </tr>
  );
}
