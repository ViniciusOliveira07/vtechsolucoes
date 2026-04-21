import { Globe, Laptop, Bot, Blocks, Compass } from "lucide-react";
import { useSpotlight } from "@/hooks/use-spotlight";

const SERVICES = [
  {
    n: "01",
    title: "Sites institucionais",
    desc: "Presença digital premium. Performance, SEO e identidade estúdio.",
    icon: Globe,
    colSpan: "md:col-span-8",
  },
  {
    n: "02",
    title: "Sistemas web",
    desc: "Plataformas internas completas. Stack moderna e deploy contínuo.",
    icon: Laptop,
    colSpan: "md:col-span-4",
  },
  {
    n: "03",
    title: "Automações com IA",
    desc: "Agentes inteligentes e RAG aplicados a problemas reais.",
    icon: Bot,
    colSpan: "md:col-span-4",
  },
  {
    n: "04",
    title: "Integrações",
    desc: "ERPs, gateways. Conectamos seus sistemas sem dor de cabeça.",
    icon: Blocks,
    colSpan: "md:col-span-4",
  },
  {
    n: "05",
    title: "Consultoria tech",
    desc: "Perspectiva sênior em decisões de produto.",
    icon: Compass,
    colSpan: "md:col-span-4",
  },
];

export function Services() {
  const ref = useSpotlight<HTMLDivElement>();

  return (
    <section className="relative bg-background py-16 md:py-20 lg:py-24 z-10 w-full overflow-visible">
      {/* Spotlight wrapper from our custom hook */}
      <div ref={ref} className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="mb-12 mx-auto text-center flex flex-col items-center">
          <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">02 — Serviços</p>
          <h2 className="text-display-md font-display">
            Acelerando sua operação<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className={`group relative glass rounded-3xl border border-border-strong p-6 sm:p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-elevated hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${s.colSpan}`}
              >
                {/* Subtle highlight gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-transparent pointer-events-none group-hover:from-primary/10 transition-colors duration-500" />
                
                <div className="flex flex-col h-full relative z-10 gap-8 sm:gap-10 md:gap-16">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-border-strong bg-background/50 flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    {/* Pattern de numeração padronizado com Processo */}
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-[3px] sm:border-[4px] border-background bg-border-strong flex items-center justify-center text-foreground text-xs sm:text-sm font-display font-bold shadow-md group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                      {s.n}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold mb-2 sm:mb-3 tracking-tight text-foreground transition-colors group-hover:text-primary duration-500">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
