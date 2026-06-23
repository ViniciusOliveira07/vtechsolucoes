import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { MagneticButton } from "@/components/site/MagneticButton";

export function Hero() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center lg:px-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Aceitando projetos para Q2 2026
        </div>

        <h1 className="text-display-xl font-display text-foreground">
          Sites e sistemas
          <br />
          <span className="text-shimmer">construídos com IA.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Entregamos 3× mais rápido que agências tradicionais — com tecnologia de ponta
          embarcada no produto final.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/contato">
            <MagneticButton variant="primary">
              Iniciar projeto
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
          <Link to="/portfolio">
            <MagneticButton variant="ghost">Ver trabalhos</MagneticButton>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
        Role para descobrir
      </div>
    </section>
  );
}
