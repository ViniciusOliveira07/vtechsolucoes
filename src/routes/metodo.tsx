import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";
import { PageHero } from "@/components/site/vt/Page";
import { Pipeline } from "@/components/site/home/Pipeline";
import { SpecTable } from "@/components/site/home/SpecTable";
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
    kicker: "método",
    crumbs: "Trilha de navegação",
    home: "início",
    here: "método",
    pKicker: "etapas",
    pTitle: "Cada etapa termina com uma entrega",
  },
  en: {
    title: "From diagnosis to a system in production, in four steps.",
    intro:
      "Each step ends with something concrete in your hands. You know what you will get, when and for how much before you approve.",
    steps: "Steps",
    step: "Step",
    kicker: "method",
    crumbs: "Breadcrumb",
    home: "home",
    here: "method",
    pKicker: "stages",
    pTitle: "Every stage ends with a deliverable",
  },
  es: {
    title: "Del diagnóstico al sistema en producción, en cuatro etapas.",
    intro:
      "Cada etapa termina con algo concreto en sus manos. Usted sabe qué va a recibir, cuándo y por cuánto antes de aprobar.",
    steps: "Etapas",
    step: "Etapa",
    kicker: "método",
    crumbs: "Ruta de navegación",
    home: "inicio",
    here: "método",
    pKicker: "etapas",
    pTitle: "Cada etapa termina con un entregable",
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
      <PageHero
        crumbsLabel={t.crumbs}
        crumbs={[{ label: t.home, to: "/" }, { label: t.here }]}
        kicker={t.kicker}
        title={t.title}
        sub={t.intro}
      />
      <Pipeline
        kicker={t.pKicker}
        title={t.pTitle}
        sub=""
        stages={steps.map((x) => [x.title, x.desc, x.out] as [string, string, string])}
      />
      <SpecTable />
      <CtaBand location="metodo" />
    </>
  );
}
