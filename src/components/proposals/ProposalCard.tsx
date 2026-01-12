"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ThumbsUp, Users, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  goal: number;
  daysLeft: number;
  category: string;
  image?: string; // Optional image for future use
}

interface ProposalCardProps {
  proposal: Proposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const [votes, setVotes] = useState(proposal.votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = Math.min((votes / proposal.goal) * 100, 100);

  const handleVote = () => {
    if (hasVoted) {
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } else {
      setIsAnimating(true);
      setVotes((prev) => prev + 1);
      setHasVoted(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <Card className="group overflow-hidden border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
      {/* Absolute "Funded" badge if goal reached */}
      {votes >= proposal.goal && (
        <div className="absolute top-4 right-4 z-10 animate-fade-in">
          <Badge variant="success" className="shadow-lg backdrop-blur-md">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            ¡Meta Alcanzada!
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="mb-2">
            {proposal.category}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            {proposal.daysLeft} días restantes
          </span>
        </div>
        <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors leading-tight">
          {proposal.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          Por{" "}
          <span className="font-medium text-foreground">{proposal.author}</span>
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {proposal.description}
        </p>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-primary">
              {votes}{" "}
              <span className="text-muted-foreground font-normal">votos</span>
            </span>
            <span className="text-muted-foreground">Meta: {proposal.goal}</span>
          </div>
          <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out",
                votes >= proposal.goal ? "from-emerald-500 to-green-500" : ""
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 flex justify-between items-center gap-4">
        <div className="flex -space-x-2 overflow-hidden">
          {/* Mock Supporters Avatars */}
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full ring-2 ring-background bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500"
            >
              U{i}
            </div>
          ))}
          <div className="h-6 w-6 rounded-full ring-2 ring-background bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
            +{votes}
          </div>
        </div>

        <Button
          onClick={handleVote}
          className={cn(
            "transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 min-w-[110px]",
            hasVoted
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          variant={hasVoted ? "secondary" : "primary"}
        >
          <ThumbsUp
            className={cn(
              "mr-2 h-4 w-4 transition-transform",
              isAnimating ? "animate-bounce" : ""
            )}
          />
          {hasVoted ? "Apoyado" : "Apoyar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
