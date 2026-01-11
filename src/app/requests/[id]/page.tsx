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
    <div className="container max-w-5xl mx-auto px-4 py-8 animate-fade-in relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30" />

      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/requests">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:translate-x-[-4px] transition-transform text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        {/* Mock Edit Button (Functional UI) */}
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-effect border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden animate-slide-in-up">
            <CardHeader className="bg-linear-to-br from-muted/50 to-transparent border-b border-border/50 pb-6 pt-6 px-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge
                  variant={
                    request.status === "completed" ? "success" : "secondary"
                  }
                  className="px-2.5 py-0.5 text-xs shadow-sm"
                >
                  {request.status === "completed" ? "Completada" : "Pendiente"}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground bg-background/50 px-2.5 py-0.5 rounded-full border border-border/50 shadow-sm backdrop-blur-md">
                  <Calendar className="mr-1.5 h-3 w-3 text-primary" />
                  {new Date(request.created_at).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold leading-tight text-foreground font-heading tracking-tight">
                {request.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary">
                <User className="h-4 w-4" /> Descripción del caso
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div
          className="space-y-6 lg:mt-0 mt-0 animate-slide-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <Card className="glass-effect bg-card/50 backdrop-blur-xl border-primary/20 sticky top-24 shadow-xl">
            <CardHeader className="pb-4 pt-5 px-5">
              <CardTitle className="text-base font-bold border-b border-border/50 pb-2">
                Detalles Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2 px-5 pb-5">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-500/10 text-primary group-hover:scale-110 transition-transform">
                  <Tag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Categoría
                  </p>
                  <p className="font-semibold text-sm">{request.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Ubicación
                  </p>
                  <p className="font-semibold text-sm">{request.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Actualizado
                  </p>
                  <p className="font-semibold text-sm">Hace un momento</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 mt-2">
                <Button className="w-full h-10 text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 font-bold">
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
