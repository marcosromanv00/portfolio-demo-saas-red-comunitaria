import MainLayout from "@/components/layout/MainLayout";
import RequestList from "@/components/requests/RequestList";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Request } from "@/types/database.types";

export const revalidate = 0; // Disable caching for this page

async function getRequests(): Promise<Request[]> {
  const { data, error } = await supabase
    .from("community_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
    return [];
  }

  return data || [];
}

export default async function RequestsPage() {
  const requests = await getRequests();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Solicitudes comunitarias</h1>
            <p className="text-sm opacity-70 mt-1">
              Gestión y seguimiento de solicitudes registradas
            </p>
          </div>

          <Link href="/new-request" className="btn-new-request">
            + Nueva solicitud
          </Link>
        </div>

        {/* REQUEST LIST */}
        <RequestList initialRequests={requests} />
      </div>
    </MainLayout>
  );
}
