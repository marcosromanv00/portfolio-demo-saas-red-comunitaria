import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ArrowRight,
  Shield,
  Users,
  Zap,
  Heart,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Nueva versión 2.0 disponible
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto font-heading leading-tight animate-slide-in-up">
            Conectando necesidades con{" "}
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              soluciones reales
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-in-up"
            style={{ animationDelay: "100ms" }}
          >
            La plataforma líder para gestión vecinal. Reporta, colabora y mejora
            tu entorno con la ayuda de tu comunidad.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Link href="/requests">
              <Button
                size="lg"
                className="h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
              >
                Ver Solicitudes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/new-request">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg backdrop-blur-sm"
              >
                Crear Solicitud
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Social Proof) */}
      <section className="py-12 border-y border-border/50 bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Vecinos Activos", value: "2,000+" },
              { label: "Solicitudes Resueltas", value: "850+" },
              { label: "Barrios Conectados", value: "15+" },
              { label: "Tiempo de Respuesta", value: "< 24h" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold font-heading text-primary">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO GRID */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold font-heading">
              Todo lo que necesitas para tu comunidad
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para simplificar la gestión y
              fomentar la colaboración vecinal.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-slide-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            {/* Feature 1 (Large) */}
            <Card className="md:col-span-2 glass-effect border-primary/10 bg-gradient-to-br from-background to-primary/5 hover:border-primary/30 transition-all duration-500 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">
                  Gestión en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Reporta incidencias al instante y sigue su progreso en vivo.
                  Sin burocracia, directo a quien puede ayudar.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="glass-effect hover:border-primary/30 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:rotate-12 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Seguro y Confiable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Plataforma verificada para garantizar la seguridad de todos
                  los vecinos.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="glass-effect hover:border-primary/30 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-600 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Voluntariado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conecta con personas dispuestas a ayudar desinteresadamente.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 (Large) */}
            <Card className="md:col-span-2 glass-effect border-primary/10 bg-gradient-to-bl from-background to-indigo-500/5 hover:border-primary/30 transition-all duration-500 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Comunidad Unida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Fomenta lazos más fuertes entre vecinos mediante la
                  colaboración y el apoyo mutuo en proyectos locales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            ¿Listo para mejorar tu barrio?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Únete a miles de vecinos que ya están haciendo la diferencia. Es
            gratis, fácil y rápido.
          </p>
          <Link href="/requests">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-10 text-lg shadow-2xl hover:scale-105 transition-transform text-primary font-bold"
            >
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
