import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";
import { SectionHead } from "@/components/site/SectionHead";
import { RailHint } from "@/components/site/RailHint";
import { Credentials } from "@/components/site/sections/Credentials";
import { Layers } from "@/components/site/sections/Layers";
import { CtaBand } from "@/components/site/sections/CtaBand";

const PRINCIPLES: L<{ title: string; desc: string }[]> = {
  pt: [
    {
      title: "Escopo antes de código",
      desc: "Nenhum projeto começa sem escopo, prazo e investimento aprovados por escrito.",
    },
    {
      title: "IA onde ela se paga",
      desc: "Usamos IA quando ela reduz trabalho ou custo de forma mensurável. Quando uma regra simples resolve, usamos a regra.",
    },
    {
      title: "O sistema é seu",
      desc: "Código, documentação e acessos ficam com você. Sua equipe ou outro fornecedor consegue continuar o trabalho.",
    },
  ],
  en: [
    {
      title: "Scope before code",
      desc: "No project starts until scope, timeline and budget are approved in writing.",
    },
    {
      title: "AI where it pays off",
      desc: "We use AI when it measurably cuts work or cost. When a simple rule does the job, we use the rule.",
    },
    {
      title: "The system is yours",
      desc: "Code, documentation and access stay with you. Your team or another vendor can pick up the work.",
    },
  ],
  es: [
    {
      title: "Alcance antes del código",
      desc: "Ningún proyecto comienza sin alcance, plazo e inversión aprobados por escrito.",
    },
    {
      title: "IA donde se paga sola",
      desc: "Usamos IA cuando reduce trabajo o costo de forma medible. Cuando una regla simple resuelve, usamos la regla.",
    },
    {
      title: "El sistema es suyo",
      desc: "El código, la documentación y los accesos quedan con usted. Su equipo u otro proveedor puede continuar el trabajo.",
    },
  ],
};

const HEAD = {
  pt: {
    title: "Sobre a Vtech Soluções | Engenharia de software e IA aplicada",
    description:
      "Empresa de tecnologia B2B em São Paulo. Construímos sistemas, integrações e automações com IA com escopo fechado e código entregue ao cliente.",
    home: "Início",
    page: "Sobre",
  },
  en: {
    title: "About Vtech Soluções | Software engineering and applied AI",
    description:
      "B2B technology company based in São Paulo. We build systems, integrations and AI automations with fixed scope and code handed over to the client.",
    home: "Home",
    page: "About",
  },
  es: {
    title: "Acerca de Vtech Soluções | Ingeniería de software e IA aplicada",
    description:
      "Empresa de tecnología B2B en São Paulo. Construimos sistemas, integraciones y automatizaciones con IA con alcance cerrado y código entregado al cliente.",
    home: "Inicio",
    page: "Nosotros",
  },
};

const TEXT = {
  pt: {
    title: "Engenharia de software e IA aplicada para operações B2B.",
    intro:
      "A Vtech Soluções é uma empresa de tecnologia de São Paulo. Uma única equipe responde pela interface, pela integração e pela inteligência de cada projeto.",
    principles: "Princípios",
    before: "Veja como funciona cada etapa em",
    link: "nosso método",
  },
  en: {
    title: "Software engineering and applied AI for B2B operations.",
    intro:
      "Vtech Soluções is a technology company based in São Paulo. A single team is accountable for the interface, the integration and the intelligence of every project.",
    principles: "Principles",
    before: "See how each step works in",
    link: "our method",
  },
  es: {
    title: "Ingeniería de software e IA aplicada para operaciones B2B.",
    intro:
      "Vtech Soluções es una empresa de tecnología de São Paulo. Un solo equipo responde por la interfaz, la integración y la inteligencia de cada proyecto.",
    principles: "Principios",
    before: "Vea cómo funciona cada etapa en",
    link: "nuestro método",
  },
};

export const Route = createFileRoute("/sobre")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return {
      ...seo({ title: t.title, description: t.description, path: "/sobre", locale }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: t.home, path: "/" },
            { name: t.page, path: "/sobre" },
          ]),
        ),
      ],
    };
  },
  component: SobrePage,
});

function SobrePage() {
  const t = useT(TEXT);
  const principles = useT(PRINCIPLES);
  return (
    <>
      <section className="section">
        <div className="shell">
          <SectionHead as="h1" title={t.title} detailClassName="hide-short">
            {t.intro}
          </SectionHead>
          <div
            tabIndex={0}
            aria-label={t.principles}
            className="rail rail-boxed grid gap-px overflow-hidden rounded-[0.875rem] border border-border bg-border md:grid-cols-3"
          >
            {principles.map((p) => (
              <article key={p.title} className="bg-background p-[clamp(1.25rem,3.6vh,1.75rem)]">
                <h2 className="text-[clamp(1.1875rem,2.8vh,1.375rem)] tracking-[-0.02em]">{p.title}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{p.desc}</p>
              </article>
            ))}
          </div>
          <RailHint />
          <p className="mt-[clamp(1rem,3vh,2rem)] text-muted-foreground">
            {t.before}{" "}
            <Link to="/metodo" className="text-signal underline underline-offset-4">
              {t.link}
            </Link>
            .
          </p>
        </div>
      </section>
      <Credentials />
      <Layers />
      <CtaBand location="sobre" />
    </>
  );
}
