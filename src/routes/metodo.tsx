import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";
import { SectionHead } from "@/components/site/SectionHead";
import { RailHint } from "@/components/site/RailHint";
import { SpecSheet } from "@/components/site/sections/SpecSheet";
import { CtaBand } from "@/components/site/sections/CtaBand";

const STEPS: L<{ title: string; desc: string; out: string }[]> = {
  pt: [
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
  ],
  en: [
    {
      title: "Diagnosis",
      desc: "A technical conversation to understand the goal, context, systems involved and constraints.",
      out: "Map of the problem and the current flow",
    },
    {
      title: "Proposal",
      desc: "Scope, timeline and budget defined in writing, within 24 business hours after the diagnosis.",
      out: "Fixed proposal for approval",
    },
    {
      title: "Build",
      desc: "Development with AI in the process, with testable versions delivered along the way for your review.",
      out: "Versions in a test environment",
    },
    {
      title: "Delivery",
      desc: "Production release, technical documentation and handoff to your team. Support included for the agreed period.",
      out: "System in production, code and documentation",
    },
  ],
  es: [
    {
      title: "Diagnóstico",
      desc: "Conversación técnica para entender el objetivo, el contexto, los sistemas involucrados y las restricciones.",
      out: "Mapa del problema y del flujo actual",
    },
    {
      title: "Propuesta",
      desc: "Alcance, plazo e inversión definidos por escrito, en hasta 24 horas hábiles después del diagnóstico.",
      out: "Propuesta cerrada para aprobación",
    },
    {
      title: "Construcción",
      desc: "Desarrollo con IA en el proceso y versiones verificables entregadas a lo largo del camino para su revisión.",
      out: "Versiones en ambiente de pruebas",
    },
    {
      title: "Entrega",
      desc: "Publicación en producción, documentación técnica y traspaso a su equipo. Soporte incluido durante el período acordado.",
      out: "Sistema en producción, código y documentación",
    },
  ],
};

const HEAD = {
  pt: {
    title: "Método de trabalho | Vtech Soluções",
    description:
      "Diagnóstico, proposta fechada, construção com versões testáveis e entrega com código e documentação. Veja como contratamos e o que você pode exigir.",
    home: "Início",
    page: "Método",
  },
  en: {
    title: "How we work | Vtech Soluções",
    description:
      "Diagnosis, fixed proposal, build with testable versions and delivery with code and documentation. See how we contract and what you can demand.",
    home: "Home",
    page: "Method",
  },
  es: {
    title: "Método de trabajo | Vtech Soluções",
    description:
      "Diagnóstico, propuesta cerrada, construcción con versiones verificables y entrega con código y documentación. Vea cómo contratamos y lo que puede exigir.",
    home: "Inicio",
    page: "Método",
  },
};

const TEXT = {
  pt: {
    title: "Do diagnóstico ao sistema em produção, em quatro etapas.",
    intro:
      "Cada etapa termina com algo concreto nas suas mãos. Você sabe o que vai receber, quando e por quanto antes de aprovar.",
    steps: "Etapas",
    step: "Etapa",
  },
  en: {
    title: "From diagnosis to a system in production, in four steps.",
    intro:
      "Each step ends with something concrete in your hands. You know what you will get, when and for how much before you approve.",
    steps: "Steps",
    step: "Step",
  },
  es: {
    title: "Del diagnóstico al sistema en producción, en cuatro etapas.",
    intro:
      "Cada etapa termina con algo concreto en sus manos. Usted sabe qué va a recibir, cuándo y por cuánto antes de aprobar.",
    steps: "Etapas",
    step: "Etapa",
  },
};

export const Route = createFileRoute("/metodo")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return {
      ...seo({ title: t.title, description: t.description, path: "/metodo", locale }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: t.home, path: "/" },
            { name: t.page, path: "/metodo" },
          ]),
        ),
      ],
    };
  },
  component: MetodoPage,
});

function MetodoPage() {
  const t = useT(TEXT);
  const steps = useT(STEPS);
  return (
    <>
      <section className="section">
        <div className="shell">
          <SectionHead as="h1" title={t.title} detailClassName="hide-short">
            {t.intro}
          </SectionHead>
          <ol tabIndex={0} aria-label={t.steps} className="rail rail-boxed grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col border-b border-r border-border px-6 py-[clamp(1rem,3.4vh,1.75rem)]"
              >
                <span className="kicker text-signal">
                  {t.step} {i + 1}
                </span>
                <h2 className="mt-2 text-[clamp(1.25rem,3vh,1.5rem)] tracking-[-0.025em]">{s.title}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{s.desc}</p>
                <p className="mt-auto pt-[clamp(0.75rem,2.6vh,1.5rem)] font-mono text-xs text-faint">
                  <span className="text-signal">→</span> {s.out}
                </p>
              </li>
            ))}
          </ol>
          <RailHint />
        </div>
      </section>
      <SpecSheet />
      <CtaBand location="metodo" />
    </>
  );
}
