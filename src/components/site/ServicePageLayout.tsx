import { Link } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { ServiceFAQ, type FAQItem } from "@/components/site/ServiceFAQ";
import { FlowConsole } from "@/components/site/FlowConsole";
import { CtaBand } from "@/components/site/sections/CtaBand";
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
    <div className="mb-12 max-w-[760px]">
      <p className="kicker">{kicker}</p>
      <h2 className="h-section mt-4">{title}</h2>
    </div>
  );
}

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  const withFlow = data.slug === "automacoes-com-ia";
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_30%,#000_20%,transparent_75%)]"
        />
        <div className="shell relative">
          <nav aria-label="Trilha de navegação" className="mb-8 font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              início
            </Link>{" "}
            /{" "}
            <Link to="/servicos" className="hover:text-foreground">
              serviços
            </Link>{" "}
            / <span className="text-foreground">{data.slug}</span>
          </nav>
          <div className={withFlow ? "grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : undefined}>
            <div className="min-w-0">
              <p className="kicker">
                <span className="text-signal">●</span> {data.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[20ch] text-[clamp(36px,4.8vw,64px)] font-medium leading-[1.03] tracking-[-0.04em]">
                {data.h1}
              </h1>
              <p className="mt-6 max-w-[60ch] text-[clamp(16px,1.4vw,18px)] text-muted-foreground">{data.subheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
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
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-faint">
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
            {withFlow && <FlowConsole />}
          </div>
        </div>
      </section>

      {/* O que é */}
      {data.oQueE && (
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <p className="kicker">Entenda o serviço</p>
              <h2 className="h-section mt-4">{data.oQueE.title}</h2>
            </div>
            <div className="grid min-w-0 max-w-[68ch] gap-5 text-[17px] leading-[1.75] text-muted-foreground">
              {data.oQueE.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Problema → Solução */}
      <section className="section">
        <div className="shell">
          <Head kicker="O problema" title="Onde a maioria trava, e como destravamos" />
          <div className="grid border-t border-border">
            {data.problemas.map((p, i) => (
              <div key={i} className="grid gap-3 border-b border-border py-6 md:grid-cols-2 md:gap-10">
                <p className="text-[19px] tracking-[-0.015em]">{p.dor}</p>
                <p className="text-[15px] text-muted-foreground">
                  <span aria-hidden className="mr-2 font-mono text-signal">
                    →
                  </span>
                  {p.solucao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      {data.paraQuem && data.paraQuem.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker="Para quem é" title="Empresas que tiram mais valor desse serviço" />
            <div className="grid border-l border-t border-border md:grid-cols-2">
              {data.paraQuem.map((p, i) => (
                <div key={i} className="border-b border-r border-border p-6 md:p-7">
                  <h3 className="text-[19px] tracking-[-0.015em]">{p.perfil}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{p.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Entregáveis */}
      <section className="section">
        <div className="shell">
          <Head kicker="O que entregamos" title="Escopo concreto, não promessa" />
          <ul className="grid overflow-hidden rounded-[14px] border border-border bg-surface md:grid-cols-2">
            {data.entregaveis.map((e, i) => (
              <li key={i} className="grid grid-cols-[24px_1fr] gap-2 border-b border-border p-6 md:odd:border-r">
                <span aria-hidden className="font-mono text-signal">
                  →
                </span>
                <span>
                  <span className="block text-[17px]">{e.title}</span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">{e.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Casos de uso */}
      {data.casosDeUso && data.casosDeUso.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker="Casos de uso" title="Aplicações típicas desse serviço" />
            <div className="grid gap-5 md:grid-cols-2">
              {data.casosDeUso.map((c, i) => (
                <div key={i} className="panel p-7">
                  <h3 className="text-[20px] tracking-[-0.015em]">{c.title}</h3>
                  <p className="mt-2.5 text-[15px] text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="section">
        <div className="shell">
          <Head kicker="Stack" title="Decisões técnicas que envelhecem bem" />
          <dl className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {data.stack.map((s, i) => (
              <div key={i} className="border-b border-r border-border p-6">
                <dt className="font-mono text-[13px] text-signal">{s.title}</dt>
                <dd className="m-0 mt-2 text-sm text-muted-foreground">{s.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="section">
        <div className="shell">
          <Head kicker="Processo" title="Quatro etapas, cada uma com uma entrega" />
          <ol className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {data.processo.map((p, i) => (
              <li key={p.n} className="border-b border-r border-border px-6 py-7">
                <span className="kicker text-signal">Etapa {i + 1}</span>
                <h3 className="mt-3 text-[20px] tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Glossário */}
      {data.glossario && data.glossario.length > 0 && (
        <section className="section">
          <div className="shell">
            <Head kicker="Glossário" title="Termos que você vai ouvir nesse universo" />
            <dl className="grid border-t border-border">
              {data.glossario.map((g, i) => (
                <div key={i} className="grid gap-2 border-b border-border py-5 md:grid-cols-[260px_1fr] md:gap-8">
                  <dt className="font-mono text-[14px] text-foreground">{g.termo}</dt>
                  <dd className="m-0 max-w-[68ch] text-[15px] text-muted-foreground">{g.definicao}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <p className="kicker">Perguntas frequentes</p>
            <h2 className="h-section mt-4">Dúvidas comuns, respostas diretas</h2>
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
          <div className="grid gap-5 md:grid-cols-3">
            {data.relacionados.map((r) => (
              <Link
                key={r.slug}
                to={r.href}
                onClick={() => Events.relatedServiceClick(data.slug, r.slug)}
                className="group panel flex flex-col p-7 transition-colors hover:border-border-strong"
              >
                <h3 className="text-[20px] tracking-[-0.015em] group-hover:text-signal">{r.title}</h3>
                <p className="mt-2.5 text-[15px] text-muted-foreground">{r.desc}</p>
                <span className="mt-auto pt-6 font-mono text-[13px] text-signal">ver serviço →</span>
              </Link>
            ))}
          </div>
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
