"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ComplaintCard } from "./ComplaintCard";
import { Button } from "@/components/ui/Button";
import { Tag } from "lucide-react";
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

  const navigateToDetail = (id: string) => {
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
        <h3 className="text-xl font-bold mb-2">No hay denuncias</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          No se encontraron registros en el sistema.
        </p>
        <Button onClick={() => router.push("/new-request")}>
          Crear Denuncia
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((req, index) => (
        <div
          key={req.id}
          className="animate-slide-in-up"
          style={{ animationDelay: `${index * 75}ms` }}
        >
          <ComplaintCard
            request={req}
            onClick={() => navigateToDetail(req.id)}
          />
        </div>
      ))}
    </div>
  );
}
