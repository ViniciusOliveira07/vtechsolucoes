import { Link } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { ServiceFAQ, type FAQItem } from "@/components/site/ServiceFAQ";
import { FlowConsole } from "@/components/site/FlowConsole";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { ReadMore } from "@/components/site/ReadMore";
import { RailHint } from "@/components/site/RailHint";
import { cn } from "@/lib/utils";
import { Events } from "@/lib/analytics";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

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
          <nav aria-label="Trilha de navegação" className="hero-crumbs hide-short font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              início
            </Link>{" "}
            /{" "}
            <Link to="/servicos" className="hover:text-foreground">
              serviços
            </Link>{" "}
            / <span className="text-foreground">{data.slug}</span>
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
                  Solicitar proposta →
                </Link>
                <a
                  href="#processo"
                  onClick={() => Events.ctaClick("Ver processo", "hero", data.slug)}
                  className="btn btn-line max-sm:flex-1 max-sm:basis-full"
                >
                  Ver o processo
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
              <p className="kicker hide-short">Entenda o serviço</p>
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
          <Head kicker="O problema" title="Onde a maioria trava, e como destravamos" />
          <div tabIndex={0} aria-label="Problemas e soluções" className="rail rail-boxed grid border-t border-border">
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
            <Head kicker="Para quem é" title="Empresas que tiram mais valor desse serviço" />
            <div tabIndex={0} aria-label="Perfis de empresa" className="rail rail-boxed grid border-l border-t border-border md:grid-cols-2">
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
          <Head kicker="O que entregamos" title="Escopo concreto, não promessa" />
          <ul
            tabIndex={0}
            aria-label="Entregáveis"
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
            <Head kicker="Casos de uso" title="Aplicações típicas desse serviço" />
            <div tabIndex={0} aria-label="Casos de uso" className="rail grid gap-5 md:grid-cols-2">
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
          <Head kicker="Stack" title="Decisões técnicas que envelhecem bem" />
          <dl tabIndex={0} aria-label="Tecnologias" className="rail rail-boxed grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
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
          <Head kicker="Processo" title="Quatro etapas, cada uma com uma entrega" />
          <ol tabIndex={0} aria-label="Etapas" className="rail rail-boxed grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {data.processo.map((p, i) => (
              <li key={p.n} className={cn("border-b border-r border-border", CELL)}>
                <span className="kicker text-signal">Etapa {i + 1}</span>
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
            <Head kicker="Glossário" title="Termos que você vai ouvir nesse universo" />
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
            <p className="kicker hide-short">Perguntas frequentes</p>
            <h2 className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">Dúvidas comuns, respostas diretas</h2>
          </div>
          <div className="min-w-0">
            <ServiceFAQ items={data.faq} serviceSlug={data.slug} />
          </div>
        </div>
      </section>

      {/* Serviços relacionados */}
      <section className="section">
        <div className="shell">
          <Head kicker="Serviços relacionados" title="Combine para um resultado completo" />
          <div tabIndex={0} aria-label="Serviços relacionados" className="rail grid gap-5 md:grid-cols-3">
            {data.relacionados.map((r) => (
              <Link
                key={r.slug}
                to={r.href}
                onClick={() => Events.relatedServiceClick(data.slug, r.slug)}
                className={cn("group panel flex flex-col transition-colors hover:border-border-strong", CELL)}
              >
                <h3 className="text-[1.25rem] tracking-[-0.015em] group-hover:text-signal">{r.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-muted-foreground">{r.desc}</p>
                <span className="mt-auto pt-5 font-mono text-[0.8125rem] text-signal">ver serviço →</span>
              </Link>
            ))}
          </div>
          <RailHint />
        </div>
      </section>

      <CtaBand title={`${data.ctaFinalTitle}?`} location="service_footer" slug={data.slug} />
    </>
  );
}

/**
 * Helpers de schema JSON-LD usados no head() de cada rota de serviço.
 */
export function buildServiceSchema(opts: { name: string; description: string; url: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    areaServed: { "@type": "Country", name: "Brasil" },
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

export function buildBreadcrumbSchema(eyebrow: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Serviços", item: absoluteUrl("/servicos") },
      { "@type": "ListItem", position: 3, name: eyebrow, item: absoluteUrl(`/servicos/${slug}`) },
    ],
  };
}
