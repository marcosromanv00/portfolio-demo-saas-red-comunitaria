import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Calendar,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { Request } from "@/types/database.types";
import { cn } from "@/lib/utils";

interface ComplaintCardProps {
  request: Request;
  onClick: () => void;
}

export function ComplaintCard({ request, onClick }: ComplaintCardProps) {
  // Semantic status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-emerald-500/15 text-emerald-600 border-emerald-200",
          icon: CheckCircle2,
          label: "Resuelto",
        };
      case "in_progress":
        return {
          color: "bg-blue-500/15 text-blue-600 border-blue-200",
          icon: Clock,
          label: "En Proceso",
        };
      default:
        return {
          color: "bg-amber-500/15 text-amber-600 border-amber-200",
          icon: AlertCircle,
          label: "Pendiente",
        };
    }
  };

  const statusConfig = getStatusConfig(request.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60 bg-card/50 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
    >
      {/* Semantic Top Boder */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 transition-colors duration-300",
          statusConfig.color.replace("bg-", "bg-").split(" ")[1] // Extract color class roughly or use a map
        )}
        style={{
          backgroundColor:
            request.status === "completed"
              ? "#10b981"
              : request.status === "in_progress"
              ? "#3b82f6"
              : "#f59e0b",
        }}
      />

      <CardHeader className="pb-3 pt-5">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1 font-medium capitalize flex items-center gap-1.5 transition-colors",
              statusConfig.color
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConfig.label}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono tabular-nums opacity-60">
            #{request.id.slice(0, 8)}
          </span>
        </div>
        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {request.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] mb-4">
          {request.description}
        </p>

        {/* Metadata Section */}
        <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary/70" />
            <span className="font-medium text-foreground/80">
              {request.location}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary/70" />
            <time dateTime={request.created_at}>
              {new Date(request.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 pb-4 bg-muted/30 flex justify-between items-center transition-colors group-hover:bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-background">
            {/* Mock Initial */}V
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Vecino
          </span>
        </div>

        <Button
          size="sm"
          className="h-8 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-3 group-hover:translate-x-0"
        >
          Ver Detalles
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
