import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/site/SectionHead";

const LAYERS = [
  {
    label: "INTERFACE",
    title: "Interface",
    desc: "Sites e sistemas web onde clientes e equipe trabalham. Rápidos, acessíveis e medidos.",
  },
  {
    label: "INTEGRAÇÃO",
    title: "Integração",
    desc: "APIs e conectores que fazem ERP, CRM e pagamentos trocarem dados sem retrabalho.",
  },
  {
    label: "INTELIGÊNCIA",
    title: "Inteligência",
    desc: "Agentes e RAG sobre os seus dados, com guardrails e custo monitorado.",
  },
];

// Posição vertical de cada plano: a camada 0 fica embaixo.
const TOPS = ["top-[var(--t0)]", "top-[var(--t1)]", "top-[var(--t2)]"];

export function Layers() {
  const [active, setActive] = useState(2);

  return (
    <section id="proposta" className="section">
      <div className="shell">
        <SectionHead title="Três camadas. Um responsável pela arquitetura inteira.">
          A maioria das empresas contrata cada parte de um fornecedor diferente e herda as falhas entre elas. Nós
          desenhamos as três juntas.
        </SectionHead>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div
            aria-hidden
            className="plane-stack h-[16.875rem] max-w-[32.5rem] [--plane-h:6.875rem] [--t0:9.375rem] [--t1:5.3125rem] [--t2:1.25rem] sm:h-[23.75rem] sm:[--plane-h:9.375rem] sm:[--t0:12.5rem] sm:[--t1:6.875rem] sm:[--t2:1.25rem]"
          >
            {LAYERS.map((l, i) => (
              <div key={l.label} className={cn("plane", TOPS[i])} data-l={i} data-on={active === i}>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
          <div role="group" aria-label="Camadas" className="min-w-0">
            {LAYERS.map((l, i) => (
              <button
                key={l.title}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="grid w-full gap-1.5 border-t border-border py-[1.375rem] text-left last:border-b sm:grid-cols-[7.5rem_1fr] sm:gap-5"
              >
                <span className="kicker pt-1">Camada {i + 1}</span>
                <span>
                  <span className={cn("block text-[1.375rem] tracking-[-0.02em]", active === i && "text-signal")}>
                    {l.title}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] text-muted-foreground">{l.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
