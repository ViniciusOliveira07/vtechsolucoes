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
            className="plane-stack h-[270px] max-w-[520px] [--plane-h:110px] [--t0:150px] [--t1:85px] [--t2:20px] sm:h-[380px] sm:[--plane-h:150px] sm:[--t0:200px] sm:[--t1:110px] sm:[--t2:20px]"
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
                className="grid w-full gap-1.5 border-t border-border py-[22px] text-left last:border-b sm:grid-cols-[120px_1fr] sm:gap-5"
              >
                <span className="kicker pt-1">Camada {i + 1}</span>
                <span>
                  <span className={cn("block text-[22px] tracking-[-0.02em]", active === i && "text-signal")}>
                    {l.title}
                  </span>
                  <span className="mt-1.5 block text-[15px] text-muted-foreground">{l.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
