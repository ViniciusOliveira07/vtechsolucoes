import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/site/SectionHead";
import { FlowConsole } from "@/components/site/FlowConsole";
import { useT, type L } from "@/lib/i18n";

type Layer = { label: string; title: string; desc: string };

const LAYERS: L<Layer[]> = {
  pt: [
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
  ],
  en: [
    {
      label: "INTERFACE",
      title: "Interface",
      desc: "Websites and web systems where your customers and team work. Fast, accessible and measured.",
    },
    {
      label: "INTEGRATION",
      title: "Integration",
      desc: "APIs and connectors that let your ERP, CRM and payments exchange data without rework.",
    },
    {
      label: "INTELLIGENCE",
      title: "Intelligence",
      desc: "Agents and RAG over your own data, with guardrails and monitored cost.",
    },
  ],
  es: [
    {
      label: "INTERFAZ",
      title: "Interfaz",
      desc: "Sitios y sistemas web donde trabajan sus clientes y su equipo. Rápidos, accesibles y medidos.",
    },
    {
      label: "INTEGRACIÓN",
      title: "Integración",
      desc: "APIs y conectores que hacen que ERP, CRM y pagos intercambien datos sin retrabajo.",
    },
    {
      label: "INTELIGENCIA",
      title: "Inteligencia",
      desc: "Agentes y RAG sobre sus propios datos, con guardrails y costo monitoreado.",
    },
  ],
};

const TEXT = {
  pt: {
    title: "Três camadas. Um responsável pela arquitetura inteira.",
    detail:
      "A maioria das empresas contrata cada parte de um fornecedor diferente e herda as falhas entre elas. Nós desenhamos as três juntas.",
    group: "Camadas",
    layer: "Camada",
  },
  en: {
    title: "Three layers. One team accountable for the whole architecture.",
    detail:
      "Most companies hire a different vendor for each part and inherit the gaps between them. We design all three together.",
    group: "Layers",
    layer: "Layer",
  },
  es: {
    title: "Tres capas. Un solo responsable de toda la arquitectura.",
    detail:
      "La mayoría de las empresas contrata cada parte a un proveedor distinto y hereda las fallas entre ellas. Nosotros diseñamos las tres juntas.",
    group: "Capas",
    layer: "Capa",
  },
};

// Posição vertical de cada plano: a camada 0 fica embaixo.
const TOPS = ["top-[var(--t0)]", "top-[var(--t1)]", "top-[var(--t2)]"];

export function Layers({ withFlow = false }: { withFlow?: boolean }) {
  const [active, setActive] = useState(2);
  const t = useT(TEXT);
  const layers = useT(LAYERS);

  return (
    <section id="proposta" className="section">
      <div className="shell">
        <SectionHead title={t.title} detailClassName="hide-phone">
          {t.detail}
        </SectionHead>
        <div className="grid items-center gap-[clamp(1rem,4vh,3.5rem)] md:grid-cols-2">
          {/* Celular: no lugar das camadas decorativas, o diagrama do fluxo (que não coube na primeira tela) */}
          {withFlow && (
            <div className="hide-short md:hidden">
              <FlowConsole compact />
            </div>
          )}
          <div aria-hidden className="plane-stack hidden md:block">
            {layers.map((l, i) => (
              <div key={i} className={cn("plane", TOPS[i])} data-l={i} data-on={active === i}>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
          <div role="group" aria-label={t.group} className="min-w-0">
            {layers.map((l, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="grid w-full gap-1 border-t border-border py-[clamp(0.6rem,2vh,1.375rem)] text-left last:border-b lg:grid-cols-[7.5rem_1fr] lg:gap-5"
              >
                <span className="kicker pt-1 max-md:hidden">
                  {t.layer} {i + 1}
                </span>
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
