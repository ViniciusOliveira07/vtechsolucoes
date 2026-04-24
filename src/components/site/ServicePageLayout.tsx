import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { type ComponentType } from "react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { ServiceFAQ, type FAQItem } from "@/components/site/ServiceFAQ";
import { Events } from "@/lib/analytics";

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
  /** Bloco "O que é" — texto didático com a keyword principal + sinônimos. Otimizado para featured snippet. */
  oQueE?: { title: string; paragrafos: string[]; sinonimos?: string[] };
  problemas: { dor: string; solucao: string }[];
  entregaveis: { title: string; desc: string; icon?: ComponentType<{ className?: string }> }[];
  /** "Para quem é" — define ICP, ajuda Google a entender intenção comercial. */
  paraQuem?: { perfil: string; descricao: string }[];
  stack: { title: string; desc: string }[];
  processo: { n: string; title: string; desc: string }[];
  /** Casos de uso reais — long-tail keywords + intent comercial. */
  casosDeUso?: { title: string; desc: string }[];
  /** Glossário de termos técnicos — captura buscas informativas. */
  glossario?: { termo: string; definicao: string }[];
  faq: FAQItem[];
  relacionados: RelatedService[];
  ctaFinalTitle: string;
};

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-background pt-32 pb-20 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-aurora opacity-60" />
        <div className="relative mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/servicos" className="hover:text-foreground">Serviços</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{data.eyebrow}</span>
          </nav>

          <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">{data.eyebrow}</p>
          <h1 className="text-display-xl font-display max-w-5xl leading-[0.95]">
            {data.h1}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {data.subheadline}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link to="/contato" onClick={() => Events.ctaClick("Solicitar proposta", "hero", data.slug)}>
              <MagneticButton variant="primary">
                Solicitar proposta
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <a
              href="#processo"
              onClick={() => Events.ctaClick("Ver processo", "hero", data.slug)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Ver processo →
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-16 flex flex-wrap gap-6 border-t border-border-strong pt-8">
            {data.trust.map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que é (definição didática para SEO + featured snippet) */}
      {data.oQueE && (
        <section className="relative bg-background py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-10 max-w-3xl">
              <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Entenda o serviço</p>
              <h2 className="text-display-md font-display">
                {data.oQueE.title}<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {data.oQueE.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {data.oQueE.sinonimos && data.oQueE.sinonimos.length > 0 && (
              <div className="mt-10 rounded-2xl border border-border-strong bg-background/40 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Também conhecido como</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {data.oQueE.sinonimos.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Problema → Solução */}
      <section className="relative bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">O problema</p>
            <h2 className="text-display-md font-display">
              Onde a maioria trava — e como destravamos<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.problemas.map((p, i) => (
              <div
                key={i}
                className="glass rounded-3xl border border-border-strong p-6 sm:p-8 transition-all duration-500 hover:border-primary/40"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">Dor</p>
                <p className="mt-2 text-base font-display font-semibold text-foreground sm:text-lg">{p.dor}</p>
                <div className="my-5 h-px bg-border-strong" />
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Como resolvemos</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{p.solucao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é (ICP — intent comercial) */}
      {data.paraQuem && data.paraQuem.length > 0 && (
        <section className="relative bg-background py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 max-w-3xl">
              <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Para quem é</p>
              <h2 className="text-display-md font-display">
                Empresas que tiram mais valor desse serviço<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.paraQuem.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border-strong bg-background/40 p-6 transition-colors duration-500 hover:border-primary/40"
                >
                  <h3 className="text-base font-display font-semibold tracking-tight text-foreground">{p.perfil}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Entregáveis */}
      <section className="relative bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">O que entregamos</p>
            <h2 className="text-display-md font-display">
              Escopo concreto, não promessa<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.entregaveis.map((e, i) => {
              const Icon = e.icon;
              return (
                <div
                  key={i}
                  className="group glass rounded-3xl border border-border-strong p-6 sm:p-8 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1"
                >
                  {Icon && (
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-background/50 text-foreground transition-colors duration-500 group-hover:text-primary group-hover:border-primary/50">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <h3 className="mb-3 text-lg font-display font-semibold tracking-tight text-foreground sm:text-xl">
                    {e.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casos de uso (long-tail keywords + intent comercial) */}
      {data.casosDeUso && data.casosDeUso.length > 0 && (
        <section className="relative bg-background py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 max-w-3xl">
              <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Casos de uso</p>
              <h2 className="text-display-md font-display">
                Aplicações reais que entregamos<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.casosDeUso.map((c, i) => (
                <div
                  key={i}
                  className="glass rounded-3xl border border-border-strong p-6 sm:p-8 transition-all duration-500 hover:border-primary/40"
                >
                  <h3 className="mb-3 text-lg font-display font-semibold tracking-tight text-foreground sm:text-xl">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stack & diferenciais */}
      <section className="relative bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Stack & diferenciais</p>
            <h2 className="text-display-md font-display">
              Decisões técnicas que envelhecem bem<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.stack.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border-strong bg-background/40 p-6 transition-colors duration-500 hover:border-primary/40"
              >
                <h3 className="text-base font-display font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="relative bg-background py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Processo dedicado</p>
            <h2 className="text-display-md font-display">
              Quatro etapas. Sem ruído<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.processo.map((p) => (
              <div
                key={p.n}
                className="group relative glass rounded-3xl border border-border-strong p-8 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-background bg-border-strong text-base font-display font-bold text-foreground shadow-lg transition-colors duration-500 group-hover:bg-primary group-hover:text-background">
                  {p.n}
                </div>
                <h3 className="mb-2 text-lg font-display font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossário (termos técnicos — captura buscas informativas) */}
      {data.glossario && data.glossario.length > 0 && (
        <section className="relative bg-background py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 max-w-3xl">
              <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Glossário</p>
              <h2 className="text-display-md font-display">
                Termos que você vai ouvir nesse universo<span className="text-primary">.</span>
              </h2>
            </div>
            <dl className="divide-y divide-border-strong rounded-2xl border border-border-strong bg-background/40">
              {data.glossario.map((g, i) => (
                <div key={i} className="grid grid-cols-1 gap-2 p-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <dt className="text-base font-display font-semibold text-foreground">{g.termo}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground sm:text-base">{g.definicao}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Perguntas frequentes</p>
            <h2 className="text-display-md font-display">
              Dúvidas comuns, respostas diretas<span className="text-primary">.</span>
            </h2>
          </div>
          <ServiceFAQ items={data.faq} serviceSlug={data.slug} />
        </div>
      </section>

      {/* Serviços relacionados */}
      <section className="relative bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">Serviços relacionados</p>
            <h2 className="text-display-md font-display">
              Combine para um resultado completo<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.relacionados.map((r) => (
              <Link
                key={r.slug}
                to={r.href}
                onClick={() => Events.relatedServiceClick(data.slug, r.slug)}
                aria-label={`Saber mais sobre ${r.title}`}
                className="group glass block rounded-3xl border border-border-strong p-6 sm:p-8 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
              >
                <h3 className="mb-3 text-lg font-display font-semibold tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary sm:text-xl">
                  {r.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Ver detalhes <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative flex items-center justify-center overflow-hidden bg-background py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="relative z-10 mx-auto max-w-[1100px] px-5 text-center sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-display-lg font-display">
            {data.ctaFinalTitle}<span className="text-primary">?</span>
          </h2>
          <div className="mt-12">
            <Link to="/contato" onClick={() => Events.ctaClick("Iniciar projeto", "footer_cta", data.slug)}>
              <MagneticButton variant="primary">
                Iniciar projeto
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
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
}) {
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
      name: "Vtech Soluções",
      url: "https://vtechsolucoes.com.br",
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
      { "@type": "ListItem", position: 1, name: "Início", item: "https://vtechsolucoes.com.br/" },
      { "@type": "ListItem", position: 2, name: "Serviços", item: "https://vtechsolucoes.com.br/servicos" },
      {
        "@type": "ListItem",
        position: 3,
        name: eyebrow,
        item: `https://vtechsolucoes.com.br/servicos/${slug}`,
      },
    ],
  };
}
