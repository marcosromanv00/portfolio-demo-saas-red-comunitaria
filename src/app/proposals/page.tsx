import { ProposalCard, Proposal } from "@/components/proposals/ProposalCard";
import { Button } from "@/components/ui/Button";
import { Plus, Sparkles } from "lucide-react";

// Mock Data for the Demo
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "1",
    title: "Huerto Urbano Comunitario",
    description:
      "Transformar el terreno baldío de la calle 5 en un huerto sostenible donde los vecinos puedan cultivar sus propias verduras y aprender sobre agricultura urbana.",
    author: "María González",
    votes: 42,
    goal: 100,
    daysLeft: 15,
    category: "Ecología",
  },
  {
    id: "2",
    title: "Taller de Programación para Niños",
    description:
      "Crear un espacio de aprendizaje gratuito los fines de semana para enseñar lógica y programación básica a niños del barrio entre 8 y 12 años.",
    author: "Carlos Ruiz",
    votes: 85,
    goal: 80, // Goal reached!
    daysLeft: 5,
    category: "Educación",
  },
  {
    id: "3",
    title: "Instalación de Luminarias Solares",
    description:
      "Mejorar la seguridad del parque infantil instalando 10 postes de luz con paneles solares y sensores de movimiento.",
    author: "Asociación Vecinal",
    votes: 24,
    goal: 150,
    daysLeft: 28,
    category: "Infraestructura",
  },
  {
    id: "4",
    title: "Cine bajo las Estrellas",
    description:
      "Organizar una función de cine mensual al aire libre durante el verano para fomentar la convivencia familiar.",
    author: "Club de Cine",
    votes: 56,
    goal: 60,
    daysLeft: 10,
    category: "Cultura",
  },
  {
    id: "5",
    title: "Puntos de Reciclaje Inteligente",
    description:
      "Instalar contenedores con sensores para separar residuos y optimizar la recolección en los puntos críticos del barrio.",
    author: "EcoBarrio",
    votes: 12,
    goal: 200,
    daysLeft: 45,
    category: "Ecología",
  },
];

export default function ProposalsPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Tu voz cuenta
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-foreground">
            Propuestas Comunitarias
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Aquí nacen los grandes cambios. Apoya las ideas de tus vecinos o
            propone la tuya para mejorar nuestro barrio juntos.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            size="lg"
            className="shadow-xl shadow-primary/20 hover:scale-105 transition-transform h-12 px-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nueva Propuesta
          </Button>
        </div>
      </div>

      {/* METRICS SUMMARY (Optional nice-to-have) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Propuestas Activas", value: "12" },
          { label: "Votos Totales", value: "2,450" },
          { label: "Proyectos Financiados", value: "8" },
          { label: "Vecinos Participando", value: "540+" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card/40 border border-border/40 rounded-xl p-4 text-center backdrop-blur-sm"
          >
            <div className="text-2xl font-bold text-primary font-heading">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROPOSALS.map((proposal, index) => (
          <div
            key={proposal.id}
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProposalCard proposal={proposal} />
          </div>
        ))}
      </div>
    </div>
  );
}
