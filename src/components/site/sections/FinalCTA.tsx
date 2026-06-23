import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { MagneticButton } from "@/components/site/MagneticButton";

export function FinalCTA() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden bg-background py-24 md:py-32 lg:py-40"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-spotlight" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 text-center sm:px-8 lg:px-12 xl:px-16">
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
