import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { useSpotlight } from "@/hooks/use-spotlight";

export function Numbers() {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section ref={ref} className="relative bg-background py-20 md:py-24 lg:py-28 overflow-hidden bg-spotlight">
      <div className="absolute inset-x-0 h-[2px] top-0 bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      
      <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="mb-12 flex flex-col items-center text-center max-w-4xl mx-auto">
          <p className="text-eyebrow mb-6 tracking-[0.3em] text-primary">04 — Diferenciais</p>
          <h2 className="text-display-md lg:text-display-lg font-display text-foreground">
            Matemática incontestável<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-3 md:gap-16">
          <Stat value={3} suffix="×" label="Mais rápido que agências tradicionais. IA nativa no processo de desenvolvimento." />
          <Stat value={100} suffix="%" label="IA embarcada no produto final. Não só no processo, mas também na entrega." />
          <Stat value={0} suffix="" label="Mensalidades fantasmas. Escopo fechado, entrega contínua. Você paga e recebe." />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="group border-l-2 border-border-strong pl-6 sm:pl-8 md:pl-10 hover:border-primary transition-colors duration-500">
      <div className="text-[clamp(3.5rem,12vw,10rem)] font-display font-semibold leading-[0.85] tracking-[-0.05em] text-foreground/50 group-hover:text-primary transition-colors duration-500">
        <AnimatedCounter to={value} suffix={suffix} />
      </div>
      <p className="mt-5 max-w-xs text-base text-muted-foreground leading-relaxed sm:mt-6 sm:text-lg md:mt-8">{label}</p>
    </div>
  );
}
