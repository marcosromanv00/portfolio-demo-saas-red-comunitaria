import RequestList from "@/components/requests/RequestList";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const revalidate = 0; // Disable caching

export default function RequestsPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            Solicitudes Comunitarias
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestión y seguimiento de las necesidades de la comunidad.
          </p>
        </div>

        <Link href="/new-request">
          <Button
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-primary/20"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      {/* REQUEST LIST */}
      <RequestList />
    </div>
  );
}
