import { useState } from "react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    n: "01",
    title: "Sites institucionais",
    desc: "Presença digital premium. Performance, SEO e identidade visual de estúdio — entregue em semanas, não meses.",
  },
  {
    n: "02",
    title: "Sistemas web",
    desc: "Plataformas internas, dashboards e ferramentas sob medida. Stack moderna, deploy contínuo, manutenção simples.",
  },
  {
    n: "03",
    title: "Automações com IA",
    desc: "Agentes, processamento de documentos, atendimento inteligente. IA aplicada a problemas reais do seu negócio.",
  },
  {
    n: "04",
    title: "Integrações",
    desc: "ERPs, CRMs, gateways de pagamento, APIs externas. Conectamos seus sistemas sem dor de cabeça.",
  },
  {
    n: "05",
    title: "Consultoria tech",
    desc: "Auditoria de stack, planejamento de produto e arquitetura. Acompanhamos decisões críticas com perspectiva técnica sênior.",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-20 mx-auto max-w-3xl text-center flex flex-col items-center">
          <p className="text-eyebrow mb-6">02 — Serviços</p>
          <h2 className="text-display-md font-display">
            O que entregamos<span className="text-primary">.</span>
          </h2>
        </div>

        <ul className="border-t border-border mx-auto max-w-4xl">
          {SERVICES.map((s, i) => (
            <li
              key={s.n}
              className="group border-b border-border"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex cursor-pointer items-baseline gap-6 py-8 transition-colors lg:py-10">
                <span className="w-10 shrink-0 text-sm tabular-nums text-muted-foreground">
                  {s.n}
                </span>
                <h3
                  className={cn(
                    "flex-1 text-3xl font-display font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl lg:text-5xl",
                    active === i
                      ? "text-foreground translate-x-2"
                      : "text-foreground/60 group-hover:text-foreground",
                  )}
                >
                  {s.title}
                </h3>
                <span
                  className={cn(
                    "hidden h-2 w-2 shrink-0 rounded-full transition-all duration-500 lg:block",
                    active === i ? "bg-primary scale-125" : "bg-border-strong",
                  )}
                />
              </div>
              <div
                className={cn(
                  "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-8 pl-16 text-base text-muted-foreground lg:text-lg">
                    {s.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
