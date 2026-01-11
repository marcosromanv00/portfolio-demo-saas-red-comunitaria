import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowLeft, Calendar, MapPin, Tag, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60; // Revalidate every minute

interface Props {
  params: { id: string };
}

// 1. Generate Metadata Dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: request } = await supabase
    .from("community_requests")
    .select("title, description")
    .eq("id", params.id)
    .single();

  if (!request) {
    return {
      title: "Solicitud no encontrada",
    };
  }

  return {
    title: `${request.title} | Red Comunitaria`,
    description: request.description.slice(0, 160),
    openGraph: {
      title: request.title,
      description: request.description.slice(0, 160),
      type: "article",
    },
  };
}

// 2. Page Component
export default async function RequestDetailPage({ params }: Props) {
  const { data: request, error } = await supabase
    .from("community_requests")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !request) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in relative">
      {/* Back Button */}
      <Link href="/requests" className="absoluted top-0 left-0">
        <Button
          variant="ghost"
          className="gap-2 mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al listado
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-8 pt-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge
                  variant={
                    request.status === "completed" ? "success" : "secondary"
                  }
                  className="px-3 py-1 text-sm"
                >
                  {request.status === "completed" ? "Completada" : "Pendiente"}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50">
                  <Calendar className="mr-2 h-3.5 w-3.5" />
                  {new Date(request.created_at).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight text-primary/90">
                {request.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Detalles de la
                Solicitud
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Información Rápida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-primary">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Categoría
                  </p>
                  <p className="font-semibold">{request.category}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Ubicación
                  </p>
                  <p className="font-semibold">{request.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Última actualización
                  </p>
                  <p className="font-semibold">Hace un momento</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button className="w-full shadow-lg shadow-primary/20">
                  Contactar o Apoyar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
