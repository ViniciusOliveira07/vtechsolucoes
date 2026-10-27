import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/site/SectionHead";
import { FlowConsole } from "@/components/site/FlowConsole";

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

export function Layers({ withFlow = false }: { withFlow?: boolean }) {
  const [active, setActive] = useState(2);

  return (
    <section id="proposta" className="section">
      <div className="shell">
        <SectionHead title="Três camadas. Um responsável pela arquitetura inteira." detailClassName="hide-phone">
          A maioria das empresas contrata cada parte de um fornecedor diferente e herda as falhas entre elas. Nós
          desenhamos as três juntas.
        </SectionHead>
        <div className="grid items-center gap-[clamp(1rem,4vh,3.5rem)] md:grid-cols-2">
          {/* Celular: no lugar das camadas decorativas, o diagrama do fluxo (que não coube na primeira tela) */}
          {withFlow && (
            <div className="hide-short md:hidden">
              <FlowConsole compact />
            </div>
          )}
          <div aria-hidden className="plane-stack hidden md:block">
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
                className="grid w-full gap-1 border-t border-border py-[clamp(0.6rem,2vh,1.375rem)] text-left last:border-b lg:grid-cols-[7.5rem_1fr] lg:gap-5"
              >
                <span className="kicker pt-1 max-md:hidden">Camada {i + 1}</span>
                <span>
                  <span
                    className={cn(
                      "block text-[clamp(1.125rem,2.6vh,1.375rem)] tracking-[-0.02em]",
                      active === i && "text-signal",
                    )}
                  >
                    {l.title}
                  </span>
                  {/* celular: só a camada escolhida mostra a descrição */}
                  <span
                    className={cn(
                      "mt-1 block text-[0.9375rem] text-muted-foreground",
                      active !== i && "max-md:hidden",
                    )}
                  >
                    {l.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
