"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Trash2, MapPin, Calendar, Tag, Eye } from "lucide-react";
import type { Request } from "@/types/database.types";
import { useRouter } from "next/navigation";

export default function RequestList() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("community_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setRequests(data);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (!window.confirm("¿Estás seguro de eliminar esta solicitud?")) return;

    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", id);

    if (!error) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
      router.refresh();
    } else {
      alert("Error al eliminar");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/requests/${id}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 rounded-xl bg-muted/50 border border-border/50"
          ></div>
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-20 px-4 border border-dashed border-border rounded-3xl bg-card/30">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted mb-4 opacity-50">
          <Tag className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">No hay solicitudes</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Actualmente no hay solicitudes registradas en la comunidad. ¡Sé el
          primero en crear una!
        </p>
        <Button onClick={() => router.push("/new-request")}>
          Crear Solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((req, index) => (
        <Card
          key={req.id}
          className="glass-effect border-primary/10 shadow-lg shadow-primary/5 group transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 animate-slide-in-up flex flex-col"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <Badge
                variant={req.status === "completed" ? "success" : "secondary"}
                className="mb-2"
              >
                {req.status === "completed" ? "Completada" : "Pendiente"}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 bg-background/40 px-2 py-1 rounded-full">
                <Calendar className="h-3 w-3" />
                {new Date(req.created_at).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-xl font-bold text-primary/90 line-clamp-1 group-hover:text-primary transition-colors">
              {req.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
              {req.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium p-2 rounded-lg bg-background/40">
                <Tag className="h-3.5 w-3.5 text-primary" />
                <span>{req.category}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium p-2 rounded-lg bg-background/40">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>{req.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 mt-auto gap-3 border-t border-border/30 bg-muted/20">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors group/btn"
              onClick={() => handleEdit(req.id)}
            >
              <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Ver Detalle
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => handleDelete(req.id, e)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
