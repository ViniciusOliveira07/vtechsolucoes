import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  asChild?: boolean;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-[transform,background,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_10px_40px_-10px_oklch(0.62_0.21_258/0.6)]",
        variant === "ghost" &&
          "bg-transparent text-foreground border border-border-strong hover:bg-surface-elevated hover:border-foreground/30",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
