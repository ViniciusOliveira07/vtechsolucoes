import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { SectionHead } from "@/components/site/SectionHead";
import { SpecSheet } from "@/components/site/sections/SpecSheet";
import { CtaBand } from "@/components/site/sections/CtaBand";

const STEPS = [
  {
    title: "Diagnóstico",
    desc: "Conversa técnica para entender objetivo, contexto, sistemas envolvidos e restrições.",
    out: "Mapa do problema e do fluxo atual",
  },
  {
    title: "Proposta",
    desc: "Escopo, prazo e investimento definidos por escrito, em até 24 horas úteis depois do diagnóstico.",
    out: "Proposta fechada para aprovação",
  },
  {
    title: "Construção",
    desc: "Desenvolvimento com IA no processo e versões testáveis entregues ao longo do caminho para sua revisão.",
    out: "Versões em ambiente de teste",
  },
  {
    title: "Entrega",
    desc: "Publicação em produção, documentação técnica e handoff para sua equipe. Suporte incluso no período acordado.",
    out: "Sistema em produção, código e documentação",
  },
];

export const Route = createFileRoute("/metodo")({
  head: () => ({
    ...seo({
      title: "Método de trabalho | Vtech Soluções",
      description:
        "Diagnóstico, proposta fechada, construção com versões testáveis e entrega com código e documentação. Veja como contratamos e o que você pode exigir.",
      path: "/metodo",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Método", path: "/metodo" },
        ]),
      ),
    ],
  }),
  component: MetodoPage,
});

function MetodoPage() {
  return (
    <>
      <section className="section">
        <div className="shell">
          <SectionHead as="h1" title="Do diagnóstico ao sistema em produção, em quatro etapas.">
            Cada etapa termina com algo concreto nas suas mãos. Você sabe o que vai receber, quando e por quanto antes de
            aprovar.
          </SectionHead>
          <ol className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col border-b border-r border-border px-6 py-7">
                <span className="kicker text-signal">Etapa {i + 1}</span>
                <h2 className="mt-3 text-[1.5rem] tracking-[-0.025em]">{s.title}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{s.desc}</p>
                <p className="mt-auto pt-6 font-mono text-xs text-faint">
                  <span className="text-signal">→</span> {s.out}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SpecSheet />
      <CtaBand location="metodo" />
    </>
  );
}
