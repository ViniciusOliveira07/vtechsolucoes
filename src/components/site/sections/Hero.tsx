import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { MagneticButton } from "@/components/site/MagneticButton";
import { motion } from "framer-motion";

export function Hero() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background to-transparent pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 text-center sm:px-8 lg:px-12 xl:px-16">
        <h1 className="text-display-xl font-display text-foreground text-balance">
          Sites e sistemas
          <br />
          <span className="text-shimmer">construídos com IA.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:mt-8 sm:text-lg md:text-xl text-balance">
          Entregamos 3× mais rápido que agências tradicionais — com tecnologia de ponta
          embarcada no produto final.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row">
          <Link to="/contato">
            <MagneticButton variant="primary">
              Iniciar projeto
              <ArrowRight className="h-4 w-4 ml-2" />
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[18px] h-[30px] rounded-full border border-muted-foreground/30 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1 rounded-full bg-muted-foreground/60"
          />
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Role para descobrir
        </div>
      </div>
    </section>
  );
}
