import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Monograma "V" com o ponto de sinal — mesma forma do favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-[1.375rem] w-[1.375rem]", className)}>
      <path d="M3 4h4l5 12 5-12h4l-7 16h-4z" fill="currentColor" />
      <circle cx="20" cy="20" r="2" fill="var(--signal)" />
    </svg>
  );
}

/** Nome "vtech soluções": o branco do "vtech" se mescla no azul da marca ao longo da palavra. */
export function LogoWord({ className }: { className?: string }) {
  return (
    <span className={cn("logo-word", className)}>
      vtech <span className="logo-word-tail">soluções</span>
    </span>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Vtech Soluções, página inicial"
      className={cn("inline-flex min-h-11 items-center gap-2.5 font-mono text-[1rem] font-medium tracking-tight", className)}
    >
      <LogoMark />
      <LogoWord />
    </Link>
  );
}
