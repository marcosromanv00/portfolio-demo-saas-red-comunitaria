"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RequestCard from "./RequestCard";
import { FooterNav } from "@/components/ui/footerNav";
import type { Request } from "@/types/database.types";

interface RequestListProps {
  initialRequests: Request[];
}

export default function RequestList({ initialRequests }: RequestListProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const deleteRequest = async (id: string) => {
    const confirmDelete = confirm(
      "¿Seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("requests").delete().eq("id", id);

    if (error) {
      setError("No se pudo eliminar la solicitud.");
      return;
    }

    // Update local state
    setRequests((prev) => prev.filter((req) => req.id !== id));
    router.refresh();
  };

  return (
    <>
      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {requests.length === 0 && (
        <p className="text-center opacity-70">
          No hay solicitudes registradas aún.
        </p>
      )}

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <RequestCard key={req.id} request={req} onDelete={deleteRequest} />
        ))}
      </div>

      {/* FOOTER NAV */}
      <FooterNav />
    </>
  );
}
