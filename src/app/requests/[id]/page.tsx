import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Clock,
  User,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60; // Revalidate every minute

interface Props {
  params: Promise<{ id: string }>;
}

// 1. Generate Metadata Dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const { data: request } = await supabase
    .from("community_requests")
    .select("title, description")
    .eq("id", id)
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
  const { id } = await params;

  const { data: request, error } = await supabase
    .from("community_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !request) {
    notFound();
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30" />

      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/requests">
          <Button
            variant="ghost"
            className="gap-2 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        {/* Mock Edit Button (Functional UI) */}
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Editar Solicitud
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-effect border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden animate-slide-in-up">
            <CardHeader className="bg-gradient-to-br from-muted/50 to-transparent border-b border-border/50 pb-8 pt-8 px-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge
                  variant={
                    request.status === "completed" ? "success" : "secondary"
                  }
                  className="px-3 py-1 text-sm shadow-sm"
                >
                  {request.status === "completed" ? "Completada" : "Pendiente"}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50 shadow-sm backdrop-blur-md">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-primary" />
                  {new Date(request.created_at).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <CardTitle className="text-3xl md:text-5xl font-bold leading-tight text-foreground font-heading tracking-tight">
                {request.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                <User className="h-5 w-5" /> Descripción del caso
              </h3>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div
          className="space-y-6 lg:mt-0 mt-8 animate-slide-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <Card className="glass-effect bg-card/50 backdrop-blur-xl border-primary/20 sticky top-24 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold border-b border-border/50 pb-4">
                Detalles Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-blue-500/10 text-primary group-hover:scale-110 transition-transform">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Categoría
                  </p>
                  <p className="font-semibold text-lg">{request.category}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Ubicación
                  </p>
                  <p className="font-semibold text-lg">{request.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Actualizado
                  </p>
                  <p className="font-semibold text-lg">Hace un momento</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 mt-6">
                <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 font-bold">
                  Contactar Vecino
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
