import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";
import { PageHero, SecHead } from "@/components/site/vt/Page";
import { STACK } from "@/lib/stack";
import { LayerStack } from "@/components/site/home/LayerStack";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { Ico, type IcoName } from "@/components/site/home/Ico";

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
    kicker: "sobre a vtech",
    pKicker: "princípios",
    pTitle: "O que guia cada projeto",
    cKicker: "credenciais",
    cTitle: "Dados verificáveis da empresa e das tecnologias",
    company: "empresa",
    keys: ["razão social", "cnpj", "sede", "atendimento"],
    clients: "Exclusivo B2B",
    crumbs: "Trilha de navegação",
    home: "início",
    here: "sobre",
  },
  en: {
    title: "Software engineering and applied AI for B2B operations.",
    intro:
      "Vtech Soluções is a technology company based in São Paulo. A single team is accountable for the interface, the integration and the intelligence of every project.",
    principles: "Principles",
    before: "See how each step works in",
    link: "our method",
    kicker: "about vtech",
    pKicker: "principles",
    pTitle: "What guides every project",
    cKicker: "credentials",
    cTitle: "Verifiable company details and technologies",
    company: "company",
    keys: ["legal name", "cnpj", "headquarters", "clients"],
    clients: "B2B only",
    crumbs: "Breadcrumb",
    home: "home",
    here: "about",
  },
  es: {
    title: "Ingeniería de software e IA aplicada para operaciones B2B.",
    intro:
      "Vtech Soluções es una empresa de tecnología de São Paulo. Un solo equipo responde por la interfaz, la integración y la inteligencia de cada proyecto.",
    principles: "Principios",
    before: "Vea cómo funciona cada etapa en",
    link: "nuestro método",
    kicker: "sobre vtech",
    pKicker: "principios",
    pTitle: "Lo que guía cada proyecto",
    cKicker: "credenciales",
    cTitle: "Datos verificables de la empresa y de las tecnologías",
    company: "empresa",
    keys: ["razón social", "cnpj", "sede", "atención"],
    clients: "Exclusivo B2B",
    crumbs: "Ruta de navegación",
    home: "inicio",
    here: "nosotros",
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

const P_ICONS: IcoName[] = ["file", "bot", "shield"];

function SobrePage() {
  const t = useT(TEXT);
  const principles = useT(PRINCIPLES);
  const stack = useT(STACK);
  const facts: [string, string][] = [
    [t.keys[0], COMPANY.legalName],
    [t.keys[1], COMPANY.cnpj],
    [t.keys[2], `${COMPANY.city}, ${COMPANY.state}`],
    [t.keys[3], t.clients],
  ];
  return (
    <>
      <PageHero
        crumbsLabel={t.crumbs}
        crumbs={[{ label: t.home, to: "/" }, { label: t.here }]}
        kicker={t.kicker}
        title={t.title}
        sub={t.intro}
      />
      <section className="vt-sec vt-screen">
        <div className="vt-wrap">
          <SecHead kicker={t.pKicker} title={t.pTitle} />
          <div className="vt-tiles vt-tiles-3">
            {principles.map((p, i) => (
              <article key={p.title} className="vt-tile">
                <i>
                  <Ico name={P_ICONS[i] ?? "checkc"} />
                </i>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            {t.before}{" "}
            <Link to="/metodo" className="font-semibold text-signal underline underline-offset-4">
              {t.link}
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="vt-sec vt-screen">
        <div className="vt-wrap vt-spec-grid">
          <SecHead kicker={t.cKicker} title={t.cTitle} />
          <div className="vt-sheet2">
            <div className="vt-sheet2-h" aria-hidden>
              <span>{t.company}</span>
              <span>vtech soluções</span>
            </div>
            <dl>
              {facts.map(([k, v]) => (
                <div key={k} className="vt-row">
                  <dt>{k}</dt>
                  <dd>
                    <span className="vt-v" style={{ fontSize: "1.1rem" }}>
                      {v}
                    </span>
                  </dd>
                </div>
              ))}
              {stack.map(([group, items]) => (
                <div key={group} className="vt-row">
                  <dt>{group}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {items.map((x) => (
                      <span key={x} className="vt-badge">
                        {x}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <LayerStack />
      <CtaBand location="sobre" />
    </>
  );
}
