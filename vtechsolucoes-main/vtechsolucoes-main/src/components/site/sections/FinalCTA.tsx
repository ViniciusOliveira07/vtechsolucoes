import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { MagneticButton } from "@/components/site/MagneticButton";

export function FinalCTA() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-spotlight" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
        <h2 className="text-display-lg font-display">
          Pronto para construir algo
          <br />
          que funcione de verdade<span className="text-primary">?</span>
        </h2>
        <div className="mt-12">
          <Link to="/contato">
            <MagneticButton variant="primary">
              Iniciar projeto
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
