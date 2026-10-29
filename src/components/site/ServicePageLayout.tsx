import { Link } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { ServiceFAQ, type FAQItem } from "@/components/site/ServiceFAQ";
import { FlowConsole } from "@/components/site/FlowConsole";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { ReadMore } from "@/components/site/ReadMore";
import { RailHint } from "@/components/site/RailHint";
import { cn } from "@/lib/utils";
import { Events } from "@/lib/analytics";
import { localizedUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { pick, useT, type L, type Locale } from "@/lib/i18n";

// Textos fixos do layout (o conteúdo de cada serviço vem da rota, já no idioma certo)
const TEXT = {
  pt: {
    crumbsAria: "Trilha de navegação",
    home: "início",
    services: "serviços",
    proposal: "Solicitar proposta →",
    seeProcess: "Ver o processo",
    understand: "Entenda o serviço",
    problemKicker: "O problema",
    problemTitle: "Onde a maioria trava, e como destravamos",
    problemAria: "Problemas e soluções",
    forWhoKicker: "Para quem é",
    forWhoTitle: "Empresas que tiram mais valor desse serviço",
    forWhoAria: "Perfis de empresa",
    deliverKicker: "O que entregamos",
    deliverTitle: "Escopo concreto, não promessa",
    deliverAria: "Entregáveis",
    casesKicker: "Casos de uso",
    casesTitle: "Aplicações típicas desse serviço",
    casesAria: "Casos de uso",
    stackKicker: "Stack",
    stackTitle: "Decisões técnicas que envelhecem bem",
    stackAria: "Tecnologias",
    processKicker: "Processo",
    processTitle: "Quatro etapas, cada uma com uma entrega",
    processAria: "Etapas",
    step: "Etapa",
    glossKicker: "Glossário",
    glossTitle: "Termos que você vai ouvir nesse universo",
    faqKicker: "Perguntas frequentes",
    faqTitle: "Dúvidas comuns, respostas diretas",
    relatedKicker: "Serviços relacionados",
    relatedTitle: "Combine para um resultado completo",
    relatedAria: "Serviços relacionados",
    seeService: "ver serviço →",
  },
  en: {
    crumbsAria: "Breadcrumb",
    home: "home",
    services: "services",
    proposal: "Request a proposal →",
    seeProcess: "See the process",
    understand: "Understand the service",
    problemKicker: "The problem",
    problemTitle: "Where most teams get stuck, and how we get them moving",
    problemAria: "Problems and solutions",
    forWhoKicker: "Who it is for",
    forWhoTitle: "Companies that get the most out of this service",
    forWhoAria: "Company profiles",
    deliverKicker: "What we deliver",
    deliverTitle: "Concrete scope, not promises",
    deliverAria: "Deliverables",
    casesKicker: "Use cases",
    casesTitle: "Typical applications of this service",
    casesAria: "Use cases",
    stackKicker: "Stack",
    stackTitle: "Technical decisions that age well",
    stackAria: "Technologies",
    processKicker: "Process",
    processTitle: "Four stages, each with a deliverable",
    processAria: "Stages",
    step: "Stage",
    glossKicker: "Glossary",
    glossTitle: "Terms you will hear in this space",
    faqKicker: "FAQ",
    faqTitle: "Common questions, straight answers",
    relatedKicker: "Related services",
    relatedTitle: "Combine them for a complete result",
    relatedAria: "Related services",
    seeService: "see service →",
  },
  es: {
    crumbsAria: "Ruta de navegación",
    home: "inicio",
    services: "servicios",
    proposal: "Solicitar propuesta →",
    seeProcess: "Ver el proceso",
    understand: "Entienda el servicio",
    problemKicker: "El problema",
    problemTitle: "Dónde la mayoría se traba, y cómo lo destrabamos",
    problemAria: "Problemas y soluciones",
    forWhoKicker: "Para quién es",
    forWhoTitle: "Empresas que más valor obtienen de este servicio",
    forWhoAria: "Perfiles de empresa",
    deliverKicker: "Qué entregamos",
    deliverTitle: "Alcance concreto, no promesas",
    deliverAria: "Entregables",
    casesKicker: "Casos de uso",
    casesTitle: "Aplicaciones típicas de este servicio",
    casesAria: "Casos de uso",
    stackKicker: "Stack",
    stackTitle: "Decisiones técnicas que envejecen bien",
    stackAria: "Tecnologías",
    processKicker: "Proceso",
    processTitle: "Cuatro etapas, cada una con un entregable",
    processAria: "Etapas",
    step: "Etapa",
    glossKicker: "Glosario",
    glossTitle: "Términos que va a escuchar en este universo",
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Dudas comunes, respuestas directas",
    relatedKicker: "Servicios relacionados",
    relatedTitle: "Combínelos para un resultado completo",
    relatedAria: "Servicios relacionados",
    seeService: "ver servicio →",
  },
};

/** Último item da trilha, no estilo de slug. Em português é o próprio slug da URL. */
const CRUMB: Record<string, Omit<L<string>, "pt">> = {
  "automacoes-com-ia": { en: "ai-automations", es: "automatizaciones-con-ia" },
  "sistemas-web": { en: "web-systems", es: "sistemas-web" },
  integracoes: { en: "integrations", es: "integraciones" },
  "sites-institucionais": { en: "corporate-websites", es: "sitios-institucionales" },
  "consultoria-tech": { en: "tech-consulting", es: "consultoria-tech" },
};

const BREADCRUMB = {
  pt: { home: "Início", services: "Serviços" },
  en: { home: "Home", services: "Services" },
  es: { home: "Inicio", services: "Servicios" },
};

const COUNTRY = { pt: "Brasil", en: "Brazil", es: "Brasil" };

export type RelatedService = {
  slug: string;
  title: string;
  href: string;
  desc: string;
};

export type ServicePageData = {
  slug: string;
  eyebrow: string;
  h1: string;
  subheadline: string;
  trust: string[];
  /** Bloco "O que é": texto didático com a keyword principal. Otimizado para featured snippet. */
  oQueE?: { title: string; paragrafos: string[]; sinonimos?: string[] };
  problemas: { dor: string; solucao: string }[];
  entregaveis: { title: string; desc: string; icon?: ComponentType<{ className?: string }> }[];
  /** "Para quem é": define ICP, ajuda Google a entender intenção comercial. */
  paraQuem?: { perfil: string; descricao: string }[];
  stack: { title: string; desc: string }[];
  processo: { n: string; title: string; desc: string }[];
  /** Casos de uso: long-tail keywords + intent comercial. */
  casosDeUso?: { title: string; desc: string }[];
  /** Glossário de termos técnicos: captura buscas informativas. */
  glossario?: { termo: string; definicao: string }[];
  faq: FAQItem[];
  relacionados: RelatedService[];
  ctaFinalTitle: string;
};

function Head({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-[clamp(1.25rem,5vh,3rem)] max-w-[47.5rem]">
      <p className="kicker hide-short">{kicker}</p>
      <h2 className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">{title}</h2>
    </div>
  );
}

/** Espaçamento interno das células, pela altura da tela */
const CELL = "px-[clamp(1.125rem,2.4vw,1.5rem)] py-[clamp(1rem,3vh,1.75rem)]";

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  const t = useT(TEXT);
  const crumb = useT({ pt: data.slug, en: CRUMB[data.slug]?.en ?? data.slug, es: CRUMB[data.slug]?.es ?? data.slug });
  const withFlow = data.slug === "automacoes-com-ia";
  return (
    <>
      {/* Hero */}
      <section className="hero relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_30%,#000_20%,transparent_75%)]"
        />
        <div className="shell relative">
          <nav aria-label={t.crumbsAria} className="hero-crumbs hide-short font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              {t.home}
            </Link>{" "}
            /{" "}
            <Link to="/servicos" className="hover:text-foreground">
              {t.services}
            </Link>{" "}
            / <span className="text-foreground">{crumb}</span>
          </nav>
          <div
            className={
              withFlow ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14" : undefined
            }
          >
            <div className="min-w-0">
              <p className="kicker">
                <span className="text-signal">●</span> {data.eyebrow}
              </p>
              <h1 className="hero-title-svc mt-5 max-w-[20ch] font-medium leading-[1.03] tracking-[-0.04em]">
                {data.h1}
              </h1>
              <p className="hero-sub max-w-[60ch] text-[clamp(1rem,1.4vw,1.125rem)] text-muted-foreground">
                {data.subheadline}
              </p>
              <div className="hero-ctas flex flex-wrap gap-3">
                <Link
                  to="/contato"
                  onClick={() => Events.ctaClick("Solicitar proposta", "hero", data.slug)}
                  className="btn max-sm:flex-1 max-sm:basis-full"
                >
                  {t.proposal}
                </Link>
                <a
                  href="#processo"
                  onClick={() => Events.ctaClick("Ver processo", "hero", data.slug)}
                  className="btn btn-line max-sm:flex-1 max-sm:basis-full"
                >
                  {t.seeProcess}
                </a>
              </div>
              <ul className="hero-facts hide-short flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint">
                {data.trust.map((t) => (
                  <li key={t}>
                    <span aria-hidden className="text-signal">
                      ▸{" "}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* o diagrama acompanha o título só onde há espaço lado a lado */}
            {withFlow && (
              <div className="max-lg:hidden">
                <FlowConsole />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* O que é: texto longo recolhido para caber numa tela (inteiro no HTML) */}
      {data.oQueE && (
        <section className="section">
          <div className="shell grid gap-[clamp(1rem,4vh,2.5rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <p className="kicker hide-short">{t.understand}</p>
              <h2 className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">{data.oQueE.title}</h2>
            </div>
            <ReadMore className="max-w-[68ch]">
              <div className="grid gap-4 text-[clamp(0.9375rem,2.2vh,1.0625rem)] leading-[1.7] text-muted-foreground">
                {data.oQueE.paragrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ReadMore>
          </div>
        </section>
      )}

      {/* Problema → Solução */}
      <section className="section">
        <div className="shell">
          <Head kicker={t.problemKicker} title={t.problemTitle} />
          <div tabIndex={0} aria-label={t.problemAria} className="rail rail-boxed grid border-t border-border">
            {data.problemas.map((p, i) => (
              <div
                key={i}
                className="grid gap-2 border-b border-border py-[clamp(0.75rem,2.4vh,1.5rem)] max-md:p-5 md:grid-cols-2 md:gap-10"
              >
                <p className="text-[clamp(1.0625rem,2.4vh,1.1875rem)] tracking-[-0.015em]">{p.dor}</p>
                <p className="text-[0.9375rem] text-muted-foreground">
                  <span aria-hidden className="mr-2 font-mono text-signal">
                    →
                  </span>
                  {p.solucao}
                </p>
              </div>
            ))}
          </div>
          <RailHint />
        </div>
      </section>

      {/* Para quem é */}
      {data.paraQuem && data.paraQuem.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker={t.forWhoKicker} title={t.forWhoTitle} />
            <div tabIndex={0} aria-label={t.forWhoAria} className="rail rail-boxed grid border-l border-t border-border md:grid-cols-2">
              {data.paraQuem.map((p, i) => (
                <div key={i} className={cn("border-b border-r border-border", CELL)}>
                  <h3 className="text-[clamp(1.0625rem,2.4vh,1.1875rem)] tracking-[-0.015em]">{p.perfil}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted-foreground">{p.descricao}</p>
                </div>
              ))}
            </div>
            <RailHint />
          </div>
        </section>
      )}

      {/* Entregáveis */}
      <section className="section">
        <div className="shell">
          <Head kicker={t.deliverKicker} title={t.deliverTitle} />
          <ul
            tabIndex={0}
            aria-label={t.deliverAria}
            className="rail rail-boxed grid overflow-hidden rounded-[0.875rem] border border-border bg-surface md:grid-cols-2 lg:grid-cols-3"
          >
            {data.entregaveis.map((e, i) => (
              <li key={i} className={cn("grid grid-cols-[1.5rem_1fr] gap-2 border-b border-border md:border-r", CELL)}>
                <span aria-hidden className="font-mono text-signal">
                  →
                </span>
                <span>
                  <span className="block text-[1.0625rem]">{e.title}</span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">{e.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <RailHint />
        </div>
      </section>

      {/* Casos de uso */}
      {data.casosDeUso && data.casosDeUso.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker={t.casesKicker} title={t.casesTitle} />
            <div tabIndex={0} aria-label={t.casesAria} className="rail grid gap-5 md:grid-cols-2">
              {data.casosDeUso.map((c, i) => (
                <div key={i} className={cn("panel", CELL)}>
                  <h3 className="text-[1.25rem] tracking-[-0.015em]">{c.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
            <RailHint />
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="section">
        <div className="shell">
          <Head kicker={t.stackKicker} title={t.stackTitle} />
          <dl tabIndex={0} aria-label={t.stackAria} className="rail rail-boxed grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {data.stack.map((s, i) => (
              <div key={i} className={cn("border-b border-r border-border", CELL)}>
                <dt className="font-mono text-[0.8125rem] text-signal">{s.title}</dt>
                <dd className="m-0 mt-2 text-sm text-muted-foreground">{s.desc}</dd>
              </div>
            ))}
          </dl>
          <RailHint />
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="section">
        <div className="shell">
          <Head kicker={t.processKicker} title={t.processTitle} />
          <ol tabIndex={0} aria-label={t.processAria} className="rail rail-boxed grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {data.processo.map((p, i) => (
              <li key={p.n} className={cn("border-b border-r border-border", CELL)}>
                <span className="kicker text-signal">{t.step} {i + 1}</span>
                <h3 className="mt-2 text-[1.25rem] tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
          <RailHint />
        </div>
      </section>

      {/* Glossário */}
      {data.glossario && data.glossario.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker={t.glossKicker} title={t.glossTitle} />
            <dl className="grid border-t border-border">
              {data.glossario.map((g, i) => (
                <div
                  key={i}
                  className="grid gap-2 border-b border-border py-[clamp(0.75rem,2.4vh,1.25rem)] md:grid-cols-[16.25rem_1fr] md:gap-8"
                >
                  <dt className="font-mono text-[0.875rem] text-foreground">{g.termo}</dt>
                  <dd className="m-0 max-w-[68ch] text-[0.9375rem] text-muted-foreground">{g.definicao}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="shell grid gap-[clamp(1rem,4vh,2.5rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <p className="kicker hide-short">{t.faqKicker}</p>
            <h2 className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">{t.faqTitle}</h2>
          </div>
          <div className="min-w-0">
            <ServiceFAQ items={data.faq} serviceSlug={data.slug} />
          </div>
        </div>
      </section>

      {/* Serviços relacionados */}
      <section className="section">
        <div className="shell">
          <Head kicker={t.relatedKicker} title={t.relatedTitle} />
          <div tabIndex={0} aria-label={t.relatedAria} className="rail grid gap-5 md:grid-cols-3">
            {data.relacionados.map((r) => (
              <Link
                key={r.slug}
                to={r.href}
                onClick={() => Events.relatedServiceClick(data.slug, r.slug)}
                className={cn("group panel flex flex-col transition-colors hover:border-border-strong", CELL)}
              >
                <h3 className="text-[1.25rem] tracking-[-0.015em] group-hover:text-signal">{r.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">{r.desc}</p>
                <span className="mt-auto pt-5 font-mono text-[0.8125rem] text-signal">{t.seeService}</span>
              </Link>
            ))}
          </div>
          <RailHint />
        </div>
      </section>

      {/* o "?" final vem daqui; em espanhol o "¿" inicial já está no texto da rota */}
      <CtaBand title={`${data.ctaFinalTitle}?`} location="service_footer" slug={data.slug} />
    </>
  );
}

/**
 * Helpers de schema JSON-LD usados no head() de cada rota de serviço.
 */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    areaServed: { "@type": "Country", name: COUNTRY[opts.locale] },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function buildBreadcrumbSchema(eyebrow: string, slug: string, locale: Locale) {
  const t = pick(BREADCRUMB, locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: localizedUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: t.services, item: localizedUrl("/servicos", locale) },
      { "@type": "ListItem", position: 3, name: eyebrow, item: localizedUrl(`/servicos/${slug}`, locale) },
    ],
  };
}
