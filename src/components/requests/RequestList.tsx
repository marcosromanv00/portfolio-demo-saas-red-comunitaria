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
import { Trash2, MapPin, Calendar, Tag, Eye, Pencil } from "lucide-react";
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

  const handleDelete = async (id: string) => {
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
    // For now, checking viewing/editing is a future feature or separate page
    // Redirect to a detail page if it existed, for now just log
    console.log("Edit/View request:", id);
    router.push(`/requests/${id}`); // Assumes dynamic route exists or will exist
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
          className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <Badge
                variant={req.status === "completed" ? "success" : "secondary"}
                className="mb-2"
              >
                {req.status === "completed" ? "Completada" : "Pendiente"}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(req.created_at).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
              {req.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
              {req.description}
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">{req.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>{req.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/30 bg-muted/20 mt-auto pt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-primary hover:text-white transition-colors"
              onClick={() => handleEdit(req.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleDelete(req.id)}
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
