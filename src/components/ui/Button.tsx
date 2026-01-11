import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Note: installing cva for button variants
// npm install class-variance-authority

// Simplified version if CVA is not installed yet (will install it next)
// But for now, let's just use simple props to avoid another install step blocking us.
// Actually, CVA is great. I should install it.
// Let's stick to simple implementation for speed and stability first without extra deps if possible,
// OR just add it. The plan said minimal deps.
// I'll implement manual variants to keep dependencies low as per initial thought, but robust.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      primary:
        "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    };

    const compClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        ref={ref}
        className={compClassName}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
