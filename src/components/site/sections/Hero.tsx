import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { MagneticButton } from "@/components/site/MagneticButton";
import Spline from "@splinetool/react-spline";

export function Hero() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/r8pO59-gkjQnGYlQ/scene.splinecode" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background to-transparent pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center lg:px-10 pointer-events-none mt-[20vh]">
        
        <h1 className="text-display-xl font-display text-foreground mt-8">
          Sites e sistemas
          <br />
          <span className="text-shimmer">construídos com IA.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Entregamos 3× mais rápido que agências tradicionais — com tecnologia de ponta
          embarcada no produto final.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row pointer-events-auto">
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
