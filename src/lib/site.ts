// Dados institucionais e helpers de SEO usados por todas as rotas.
// O domínio oficial é o que está no CNAME (vtechsolucoes.ia.br). Trocar aqui reflete em
// canonical, Open Graph, Schema.org e sitemap.
import { DEFAULT_LOCALE, LOCALE_META, LOCALES, pick, useLocale, type L, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://vtechsolucoes.ia.br";
export const SITE_NAME = "Vtech Soluções";
export const SITE_DESCRIPTION: L<string> = {
  pt: "Sistemas, integrações e agentes de IA para operações B2B. Escopo fechado, proposta em até 24 horas úteis e código entregue a você.",
  en: "Systems, integrations and AI agents for B2B operations. Fixed scope, a proposal within 24 business hours and the code handed over to you.",
  es: "Sistemas, integraciones y agentes de IA para operaciones B2B. Alcance cerrado, propuesta en hasta 24 horas hábiles y el código entregado a usted.",
};
// Imagem do preview de link: 1200x630 em JPEG leve. O WhatsApp descarta o preview inteiro
// quando a imagem passa de ~300 KB (a antiga, PNG 2400x1260, tinha 442 KB e o link saía só com o domínio).
// O nome muda quando a arte muda, para os apps não reaproveitarem o preview antigo em cache.
export const OG_IMAGE: L<string> = {
  pt: `${SITE_URL}/og-vtech-1200x630.jpg`,
  en: `${SITE_URL}/og-vtech-1200x630-en.jpg`,
  es: `${SITE_URL}/og-vtech-1200x630-es.jpg`,
};
const OG_ALT: L<string> = {
  pt: "Vtech Soluções: sua operação, conectada e trabalhando sozinha.",
  en: "Vtech Soluções: your operation, connected and running on its own.",
  es: "Vtech Soluções: su operación, conectada y trabajando sola.",
};

export const COMPANY = {
  legalName: "Vtech Soluções Ltda.",
  cnpj: "66.428.598/0001-22",
  city: "São Paulo",
  state: "SP",
  phoneDisplay: "+55 11 5444-1926",
  phoneE164: "+551154441926",
  whatsappNumber: "551154441926",
};

/** Mensagem que abre a conversa no WhatsApp quando a pessoa não preencheu nada. */
export const WHATSAPP_GREETING: L<string> = {
  pt: "Olá! Vim pelo site da Vtech Soluções e gostaria de conversar sobre um projeto.",
  en: "Hi! I found Vtech Soluções through your website and would like to talk about a project.",
  es: "¡Hola! Llegué por el sitio de Vtech Soluções y me gustaría conversar sobre un proyecto.",
};

export function whatsappUrl(text = WHATSAPP_GREETING[DEFAULT_LOCALE]) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Endereço de uma página num idioma: português sem parâmetro, os demais com ?lang=. */
export function localizedUrl(path: string, locale: Locale) {
  const url = absoluteUrl(path);
  return locale === DEFAULT_LOCALE ? url : `${url}${url.includes("?") ? "&" : "?"}lang=${locale}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Gera meta tags, canonical e hreflang consistentes para o head() de uma rota. */
export function seo({ title, description, path, locale: given, image, type = "website", publishedTime, modifiedTime }: SeoInput) {
  const locale = given ?? DEFAULT_LOCALE;
  const url = localizedUrl(path, locale);
  const img = image ? absoluteUrl(image) : OG_IMAGE[locale];
  const meta: Record<string, string>[] = [
    // título descritivo na guia e no Google: é o principal sinal de SEO da página
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: LOCALE_META[locale].og },
    ...LOCALES.filter((l) => l !== locale).map((l) => ({ property: "og:locale:alternate", content: LOCALE_META[l].og })),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:secure_url", content: img },
    // dimensões só valem para a imagem padrão; imagem própria de página não declara tamanho
    ...(image
      ? []
      : [
          { property: "og:image:type", content: "image/jpeg" },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:alt", content: OG_ALT[locale] },
        ]),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
  const links = [
    { rel: "canonical", href: url },
    ...LOCALES.map((l) => ({ rel: "alternate", hrefLang: LOCALE_META[l].html, href: localizedUrl(path, l) })),
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(path) },
  ];
  return { meta, links };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: SITE_DESCRIPTION[locale],
    vatID: COMPANY.cnpj,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.state,
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: locale === "en" ? "Brazil" : "Brasil" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-5444-1926",
      contactType: "sales",
      availableLanguage: ["Portuguese", "English", "Spanish"],
    },
  };
}

export const NAV = [
  { to: "/servicos", label: { pt: "Serviços", en: "Services", es: "Servicios" } },
  { to: "/metodo", label: { pt: "Método", en: "Method", es: "Método" } },
  { to: "/blog", label: { pt: "Blog", en: "Blog", es: "Blog" } },
  { to: "/sobre", label: { pt: "Sobre", en: "About", es: "Nosotros" } },
  { to: "/contato", label: { pt: "Contato", en: "Contact", es: "Contacto" } },
] as const satisfies readonly { to: string; label: L<string> }[];

const SERVICE_SLUGS = [
  "automacoes-com-ia",
  "sistemas-web",
  "integracoes",
  "sites-institucionais",
  "consultoria-tech",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  kicker: string;
  forWho: string;
  deliverables: readonly string[];
  stack: readonly string[];
};

type ServiceText = Omit<Service, "slug">;

const SERVICE_TEXT: Record<ServiceSlug, L<ServiceText>> = {
  "automacoes-com-ia": {
    pt: {
      title: "Automações com IA",
      short: "Automação com IA",
      kicker: "agentes · rag",
      forWho: "Para atendimento, jurídico, comercial e backoffice com alto volume de tarefas repetitivas.",
      deliverables: [
        "Agentes que consultam e agem no seu ERP e CRM",
        "RAG sobre manuais, contratos e histórico de atendimento",
        "Extração e classificação de documentos",
        "Painel de precisão e custo por resposta",
      ],
      stack: ["OpenAI", "Anthropic", "LangGraph", "pgvector"],
    },
    en: {
      title: "AI automations",
      short: "AI automation",
      kicker: "agents · rag",
      forWho: "For customer service, legal, sales and back office teams with a high volume of repetitive tasks.",
      deliverables: [
        "Agents that query and act on your ERP and CRM",
        "RAG over manuals, contracts and support history",
        "Document extraction and classification",
        "Dashboard of accuracy and cost per answer",
      ],
      stack: ["OpenAI", "Anthropic", "LangGraph", "pgvector"],
    },
    es: {
      title: "Automatizaciones con IA",
      short: "Automatización con IA",
      kicker: "agentes · rag",
      forWho: "Para atención al cliente, legal, comercial y back office con alto volumen de tareas repetitivas.",
      deliverables: [
        "Agentes que consultan y actúan en su ERP y CRM",
        "RAG sobre manuales, contratos e historial de atención",
        "Extracción y clasificación de documentos",
        "Panel de precisión y costo por respuesta",
      ],
      stack: ["OpenAI", "Anthropic", "LangGraph", "pgvector"],
    },
  },
  "sistemas-web": {
    pt: {
      title: "Sistemas web",
      short: "Sistemas web",
      kicker: "plataformas",
      forWho: "Para operações que dependem de planilhas ou de um SaaS que não se adapta ao processo.",
      deliverables: [
        "Plataforma sob medida com permissões por perfil",
        "Painéis e relatórios operacionais",
        "Fluxos de aprovação",
        "Integração com os sistemas que você já usa",
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL"],
    },
    en: {
      title: "Web systems",
      short: "Web systems",
      kicker: "platforms",
      forWho: "For operations that run on spreadsheets or on a SaaS that does not fit the process.",
      deliverables: [
        "Custom platform with role-based permissions",
        "Operational dashboards and reports",
        "Approval workflows",
        "Integration with the systems you already use",
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL"],
    },
    es: {
      title: "Sistemas web",
      short: "Sistemas web",
      kicker: "plataformas",
      forWho: "Para operaciones que dependen de planillas o de un SaaS que no se adapta al proceso.",
      deliverables: [
        "Plataforma a medida con permisos por perfil",
        "Paneles e informes operativos",
        "Flujos de aprobación",
        "Integración con los sistemas que ya utiliza",
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL"],
    },
  },
  integracoes: {
    pt: {
      title: "Integrações",
      short: "Integrações",
      kicker: "api · conectores",
      forWho: "Para empresas com ERP, CRM e meios de pagamento que não conversam entre si.",
      deliverables: [
        "Conectores via API e webhooks",
        "Sincronização de cadastros e pedidos",
        "Tratamento de falhas e reprocessamento",
        "Monitoramento das integrações",
      ],
      stack: ["REST", "Webhooks", "Filas"],
    },
    en: {
      title: "Integrations",
      short: "Integrations",
      kicker: "api · connectors",
      forWho: "For companies whose ERP, CRM and payment providers do not talk to each other.",
      deliverables: [
        "Connectors via API and webhooks",
        "Sync of records and orders",
        "Failure handling and reprocessing",
        "Integration monitoring",
      ],
      stack: ["REST", "Webhooks", "Queues"],
    },
    es: {
      title: "Integraciones",
      short: "Integraciones",
      kicker: "api · conectores",
      forWho: "Para empresas con ERP, CRM y medios de pago que no se comunican entre sí.",
      deliverables: [
        "Conectores vía API y webhooks",
        "Sincronización de registros y pedidos",
        "Manejo de fallas y reprocesamiento",
        "Monitoreo de las integraciones",
      ],
      stack: ["REST", "Webhooks", "Colas"],
    },
  },
  "sites-institucionais": {
    pt: {
      title: "Sites institucionais",
      short: "Sites",
      kicker: "web · seo",
      forWho: "Para empresas B2B cujo site não gera oportunidades nem transmite credibilidade.",
      deliverables: [
        "Site rápido, acessível e indexável",
        "SEO técnico e arquitetura de conteúdo",
        "Captação de leads integrada ao seu CRM",
        "Blog para aquisição orgânica",
      ],
      stack: ["SSR", "Schema.org", "Core Web Vitals"],
    },
    en: {
      title: "Corporate websites",
      short: "Websites",
      kicker: "web · seo",
      forWho: "For B2B companies whose website neither generates opportunities nor conveys credibility.",
      deliverables: [
        "Fast, accessible and indexable website",
        "Technical SEO and content architecture",
        "Lead capture integrated with your CRM",
        "Blog for organic acquisition",
      ],
      stack: ["SSR", "Schema.org", "Core Web Vitals"],
    },
    es: {
      title: "Sitios institucionales",
      short: "Sitios",
      kicker: "web · seo",
      forWho: "Para empresas B2B cuyo sitio no genera oportunidades ni transmite credibilidad.",
      deliverables: [
        "Sitio rápido, accesible e indexable",
        "SEO técnico y arquitectura de contenido",
        "Captación de leads integrada a su CRM",
        "Blog para adquisición orgánica",
      ],
      stack: ["SSR", "Schema.org", "Core Web Vitals"],
    },
  },
  "consultoria-tech": {
    pt: {
      title: "Consultoria tech",
      short: "Consultoria",
      kicker: "cto as a service",
      forWho: "Para diretorias que precisam decidir stack, arquitetura ou fornecedor com segurança.",
      deliverables: [
        "Diagnóstico técnico do que já existe",
        "Roadmap priorizado por retorno",
        "Apoio na escolha e gestão de fornecedores",
        "Revisão de arquitetura e custos de nuvem",
      ],
      stack: ["Arquitetura", "Roadmap", "Due diligence"],
    },
    en: {
      title: "Tech consulting",
      short: "Consulting",
      kicker: "cto as a service",
      forWho: "For leadership teams that need to decide on stack, architecture or vendor with confidence.",
      deliverables: [
        "Technical assessment of what already exists",
        "Roadmap prioritized by return",
        "Support choosing and managing vendors",
        "Review of architecture and cloud costs",
      ],
      stack: ["Architecture", "Roadmap", "Due diligence"],
    },
    es: {
      title: "Consultoría tech",
      short: "Consultoría",
      kicker: "cto as a service",
      forWho: "Para directorios que necesitan decidir stack, arquitectura o proveedor con seguridad.",
      deliverables: [
        "Diagnóstico técnico de lo que ya existe",
        "Roadmap priorizado por retorno",
        "Apoyo en la elección y gestión de proveedores",
        "Revisión de arquitectura y costos de nube",
      ],
      stack: ["Arquitectura", "Roadmap", "Due diligence"],
    },
  },
};

/** Serviços no idioma pedido, na ordem de exibição. */
export function getServices(locale: Locale): Service[] {
  return SERVICE_SLUGS.map((slug) => ({ slug, ...pick(SERVICE_TEXT[slug], locale) }));
}

export function getService(slug: ServiceSlug, locale: Locale): Service {
  return { slug, ...pick(SERVICE_TEXT[slug], locale) };
}

export function useServices() {
  return getServices(useLocale());
}

/** Versão em português, para usos que só precisam dos slugs (sitemap, rotas). */
export const SERVICES = getServices(DEFAULT_LOCALE);
