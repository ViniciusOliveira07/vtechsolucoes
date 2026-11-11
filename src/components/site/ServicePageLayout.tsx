import { useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { Events } from "@/lib/analytics";
import { WHATSAPP_GREETING, whatsappUrl, type ServiceSlug } from "@/lib/site";
import { useT, type L } from "@/lib/i18n";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { PageHero, SecHead } from "@/components/site/vt/Page";
import { FaqSection } from "@/components/site/vt/FaqSection";
import { Pipeline } from "@/components/site/home/Pipeline";
import { ServiceVignette, type VignetteSlug } from "@/components/site/home/ServiceStack";
import { ArrowDot, Ico } from "@/components/site/home/Ico";
import { SwipeDots } from "@/components/site/vt/SwipeDots";

// Textos fixos do layout (o conteúdo de cada serviço vem da rota, já no idioma certo)
const TEXT = {
  pt: { crumbsAria: "Trilha de navegação", home: "início", services: "serviços", cta: "Iniciar diagnóstico", seeProcess: "Ver o processo", understand: "entenda o serviço", readAll: "Ler tudo", readLess: "Mostrar menos", problemKicker: "o problema", problemTitle: "Onde a maioria trava, e como destravamos", before: "Antes", after: "Com a Vtech", forWhoKicker: "para quem é", forWhoTitle: "Empresas que tiram mais valor desse serviço", deliverKicker: "o que entregamos", deliverTitle: "Escopo concreto, não promessa", casesKicker: "casos de uso", casesTitle: "Aplicações típicas desse serviço", stackKicker: "stack", stackTitle: "Decisões técnicas que envelhecem bem", processKicker: "processo", processTitle: "Quatro etapas, cada uma com uma entrega", processSub: "Uma etapa só começa quando a anterior foi aprovada.", glossKicker: "glossário", glossTitle: "Termos que você vai ouvir nesse universo", term: "termo", meaning: "significado", faqKicker: "perguntas frequentes", faqTitle: "Dúvidas comuns, respostas diretas", relatedKicker: "serviços relacionados", relatedTitle: "Combine para um resultado completo", seeService: "Ver o serviço" },
  en: { crumbsAria: "Breadcrumb", home: "home", services: "services", cta: "Start diagnosis", seeProcess: "See the process", understand: "understand the service", readAll: "Read all", readLess: "Show less", problemKicker: "the problem", problemTitle: "Where most teams get stuck, and how we get them moving", before: "Before", after: "With Vtech", forWhoKicker: "who it is for", forWhoTitle: "Companies that get the most out of this service", deliverKicker: "what we deliver", deliverTitle: "Concrete scope, not promises", casesKicker: "use cases", casesTitle: "Typical applications of this service", stackKicker: "stack", stackTitle: "Technical decisions that age well", processKicker: "process", processTitle: "Four stages, each with a deliverable", processSub: "A stage only starts once the previous one is approved.", glossKicker: "glossary", glossTitle: "Terms you will hear in this space", term: "term", meaning: "meaning", faqKicker: "frequently asked questions", faqTitle: "Common questions, straight answers", relatedKicker: "related services", relatedTitle: "Combine them for a complete result", seeService: "See the service" },
  es: { crumbsAria: "Ruta de navegación", home: "inicio", services: "servicios", cta: "Iniciar diagnóstico", seeProcess: "Ver el proceso", understand: "entienda el servicio", readAll: "Leer todo", readLess: "Mostrar menos", problemKicker: "el problema", problemTitle: "Dónde la mayoría se traba, y cómo lo destrabamos", before: "Antes", after: "Con Vtech", forWhoKicker: "para quién es", forWhoTitle: "Empresas que más valor obtienen de este servicio", deliverKicker: "qué entregamos", deliverTitle: "Alcance concreto, no promesas", casesKicker: "casos de uso", casesTitle: "Aplicaciones típicas de este servicio", stackKicker: "stack", stackTitle: "Decisiones técnicas que envejecen bien", processKicker: "proceso", processTitle: "Cuatro etapas, cada una con un entregable", processSub: "Una etapa solo empieza cuando la anterior fue aprobada.", glossKicker: "glosario", glossTitle: "Términos que va a escuchar en este universo", term: "término", meaning: "significado", faqKicker: "preguntas frecuentes", faqTitle: "Dudas comunes, respuestas directas", relatedKicker: "servicios relacionados", relatedTitle: "Combínelos para un resultado completo", seeService: "Ver el servicio" },
};

/** Último item da trilha, no estilo de slug. Em português é o próprio slug da URL. */
const CRUMB: Record<string, Omit<L<string>, "pt">> = {
  "automacoes-com-ia": { en: "ai-automations", es: "automatizaciones-con-ia" },
  "sistemas-web": { en: "web-systems", es: "sistemas-web" },
  integracoes: { en: "integrations", es: "integraciones" },
  "sites-institucionais": { en: "corporate-websites", es: "sitios-institucionales" },
  "consultoria-tech": { en: "tech-consulting", es: "consultoria-tech" },
};

export type FAQItem = { q: string; a: string };

export type RelatedService = {
  slug: string;
  title: string;
  href: string;
  desc: string;
};

export type ServicePageData = {
  slug: string;
  /** Página de "Soluções" (trilha /solucoes) em vez de serviço (trilha /servicos). */
  section?: "servicos" | "solucoes";
  /** Ilustração da primeira dobra (padrão: a do próprio serviço). */
  vignette?: VignetteSlug;
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

/** Página de serviço no layout novo (mesma linguagem da home). Todo o texto continua no HTML para o Google. */
export function ServicePageLayout({ data }: { data: ServicePageData }) {
  const t = useT(TEXT);
  const greeting = useT(WHATSAPP_GREETING);
  const crumb = useT({ pt: data.slug, en: CRUMB[data.slug]?.en ?? data.slug, es: CRUMB[data.slug]?.es ?? data.slug });
  return (
    <>
      <PageHero
        full
        crumbsLabel={t.crumbsAria}
        crumbs={[
          { label: t.home, to: "/" },
          data.section === "solucoes" ? { label: "soluções", to: "/solucoes" } : { label: t.services, to: "/servicos" },
          { label: crumb },
        ]}
        kicker={data.eyebrow}
        title={data.h1}
        sub={data.subheadline}
        aside={<ServiceVignette slug={data.vignette ?? (data.slug as ServiceSlug)} />}
      >
        <div className="vt-ctas">
          <a
            className="btn btn-arrow"
            href={whatsappUrl(greeting)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              Events.ctaClick("Iniciar diagnóstico", "hero", data.slug);
              Events.whatsappClick(`/${data.section ?? "servicos"}/${data.slug}`);
            }}
          >
            {t.cta}
            <ArrowDot />
          </a>
          <a className="btn btn-line" href="#processo" onClick={() => Events.ctaClick("Ver processo", "hero", data.slug)}>
            {t.seeProcess}
          </a>
        </div>
        <ul className="vt-chips">
          {data.trust.map((x) => (
            <li key={x}>
              <Ico name="check" />
              {x}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* O que é: texto inteiro no HTML, recolhido visualmente */}
      {data.oQueE && (
        <section className="vt-sec vt-screen">
          <div className="vt-wrap vt-split">
            <SecHead kicker={t.understand} title={data.oQueE.title} />
            <Expand more={t.readAll} less={t.readLess}>
              {data.oQueE.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Expand>
          </div>
        </section>
      )}

      {/* Problema → solução, no formato "antes / com a Vtech" do roteador da home */}
      <section className="vt-sec vt-screen vt-band vt-grid-bg">
        <div className="vt-wrap" style={{ position: "relative" }}>
          <div className="vt-head">
            <span className="vt-kicker">{t.problemKicker}</span>
            <h2 className="vt-h2 vt-dot">{t.problemTitle}</h2>
          </div>
          <ul className="vt-cmp-rows">
            {data.problemas.map((p, i) => (
              <li key={i}>
                <div className="vt-bf">
                  <em>{t.before}</em>
                  {p.dor}
                </div>
                <div className="vt-af">
                  <em>{t.after}</em>
                  {p.solucao}
                </div>
              </li>
            ))}
          </ul>
          <SwipeDots count={data.problemas.length} />
        </div>
      </section>

      {data.paraQuem && data.paraQuem.length > 0 && (
        <section className="vt-sec vt-screen">
          <div className="vt-wrap">
            <SecHead kicker={t.forWhoKicker} title={t.forWhoTitle} />
            <div className="vt-tiles vt-tiles-2">
              {data.paraQuem.map((p) => (
                <article key={p.perfil} className="vt-tile">
                  <i>
                    <Ico name="users" />
                  </i>
                  <h3>{p.perfil}</h3>
                  <p>{p.descricao}</p>
                </article>
              ))}
            </div>
            <SwipeDots count={data.paraQuem.length} />
          </div>
        </section>
      )}

      <section className="vt-sec vt-screen">
        <div className="vt-wrap">
          <SecHead kicker={t.deliverKicker} title={t.deliverTitle} />
          <ul className="vt-tiles vt-tiles-3">
            {data.entregaveis.map((e) => {
              const Icon = e.icon;
              return (
                <li key={e.title} className="vt-tile">
                  <i>{Icon ? <Icon className="h-[1.1rem] w-[1.1rem]" /> : <Ico name="checkc" />}</i>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                </li>
              );
            })}
          </ul>
          <SwipeDots count={data.entregaveis.length} />
        </div>
      </section>

      {data.casosDeUso && data.casosDeUso.length > 0 && (
        <section className="vt-sec vt-screen">
          <div className="vt-wrap">
            <SecHead kicker={t.casesKicker} title={t.casesTitle} />
            <div className="vt-tiles vt-tiles-2">
              {data.casosDeUso.map((c, i) => (
                <article key={c.title} className="vt-tile vt-tile-soft">
                  <span className="vt-tile-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              ))}
            </div>
            <SwipeDots count={data.casosDeUso.length} />
          </div>
        </section>
      )}

      <section className="vt-sec vt-screen vt-dark vt-on-dark" data-nav-dark="">
        <div className="vt-wrap">
          <SecHead kicker={t.stackKicker} title={t.stackTitle} />
          <dl className="vt-tiles vt-tiles-4">
            {data.stack.map((s) => (
              <div key={s.title} className="vt-tile vt-tile-dark">
                <dt>{s.title}</dt>
                <dd>{s.desc}</dd>
              </div>
            ))}
          </dl>
          <SwipeDots count={data.stack.length} />
        </div>
      </section>

      <Pipeline
        kicker={t.processKicker}
        title={t.processTitle}
        sub={t.processSub}
        stages={data.processo.map((p) => [p.title, p.desc] as [string, string])}
        consult={false}
      />

      {data.glossario && data.glossario.length > 0 && (
        <section className="vt-sec vt-screen">
          <div className="vt-wrap vt-spec-grid">
            <SecHead kicker={t.glossKicker} title={t.glossTitle} />
            <div className="vt-sheet2">
              <div className="vt-sheet2-h" aria-hidden>
                <span>{t.term}</span>
                <span>{t.meaning}</span>
              </div>
              <dl>
                {data.glossario.map((g) => (
                  <div key={g.termo} className="vt-row">
                    <dt>{g.termo}</dt>
                    <dd>
                      <span className="vt-d" style={{ marginTop: 0 }}>
                        {g.definicao}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      <FaqSection items={data.faq} slug={data.slug} id="perguntas" kicker={t.faqKicker} title={t.faqTitle} sub="" />

      {data.relacionados.length > 0 && (
        <section className="vt-sec vt-screen">
          <div className="vt-wrap">
            <SecHead kicker={t.relatedKicker} title={t.relatedTitle} />
            <div className="vt-tiles vt-tiles-3">
              {data.relacionados.map((r) => (
                <Link
                  key={r.slug}
                  to={r.href}
                  onClick={() => Events.relatedServiceClick(data.slug, r.slug)}
                  className="vt-tile vt-tile-link"
                >
                  <i>
                    <Ico name="layers" />
                  </i>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <span className="vt-rd">
                    {t.seeService} <Ico name="arrow" />
                  </span>
                </Link>
              ))}
            </div>
            <SwipeDots count={data.relacionados.length} />
          </div>
        </section>
      )}

      <CtaBand title={data.ctaFinalTitle} location="service_footer" slug={data.slug} />
    </>
  );
}

/** Texto longo recolhido com degradê; o conteúdo inteiro fica no HTML (Google lê tudo). */
function Expand({ children, more, less }: { children: React.ReactNode; more: string; less: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vt-expand" data-open={open}>
      <div className="vt-expand-body">{children}</div>
      <button type="button" className="vt-link" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? less : more} <Ico name="arrow" />
      </button>
    </div>
  );
}
