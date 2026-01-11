import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Users, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 md:py-32 text-center px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50 dark:opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Red Comunitaria Activa
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent drop-shadow-sm font-heading">
          Conectando necesidades con{" "}
          <span className="text-primary">soluciones reales</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Una plataforma moderna para gestionar y visualizar las necesidades de
          nuestra comunidad. Transparencia, velocidad y colaboración en un solo
          lugar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/requests">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-12">
              Ver Solicitudes <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/new-request">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base h-12 bg-background/50 backdrop-blur-sm"
            >
              Crear Nueva Solicitud
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-500" />}
            title="Soporte Comunitario"
            description="Conecta directamente con vecinos y organizaciones dispuestos a ayudar."
          />
          <FeatureCard
            icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
            title="Seguimiento Real"
            description="Monitorea el estado de cada solicitud desde su creación hasta su resolución."
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-rose-500" />}
            title="Impacto Social"
            description="Cada solicitud resuelta mejora la calidad de vida de nuestra comunidad."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="mb-4 inline-flex p-3 rounded-xl bg-background shadow-sm border border-border/50 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 font-heading">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
