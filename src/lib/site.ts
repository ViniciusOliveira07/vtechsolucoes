// Dados institucionais e helpers de SEO usados por todas as rotas.
// O domínio oficial é o que está no CNAME (vtechsolucoes.ia.br). Trocar aqui reflete em
// canonical, Open Graph, Schema.org e sitemap.
export const SITE_URL = "https://vtechsolucoes.ia.br";
export const SITE_NAME = "Vtech Soluções";
export const SITE_DESCRIPTION =
  "Sistemas, integrações e agentes de IA para operações B2B. Escopo fechado, proposta em até 24 horas úteis e código entregue a você.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-vtech.png`;

export const COMPANY = {
  legalName: "Vtech Soluções Ltda.",
  cnpj: "66.428.598/0001-22",
  city: "São Paulo",
  state: "SP",
  phoneDisplay: "+55 11 5444-1926",
  phoneE164: "+551154441926",
  whatsappNumber: "551154441926",
};

export function whatsappUrl(
  text = "Olá! Vim pelo site da Vtech Soluções e gostaria de conversar sobre um projeto.",
) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Gera meta tags e canonical consistentes para o head() de uma rota. */
export function seo({ title, description, path, image, type = "website", publishedTime, modifiedTime }: SeoInput) {
  const url = absoluteUrl(path);
  const img = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
  return { meta, links: [{ rel: "canonical", href: url }] };
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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: SITE_DESCRIPTION,
  vatID: COMPANY.cnpj,
  address: {
    "@type": "PostalAddress",
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.state,
    addressCountry: "BR",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-11-5444-1926",
    contactType: "sales",
    availableLanguage: ["Portuguese"],
  },
};

export const NAV = [
  { to: "/servicos", label: "Serviços" },
  { to: "/metodo", label: "Método" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export const SERVICES = [
  {
    slug: "automacoes-com-ia",
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
  {
    slug: "sistemas-web",
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
  {
    slug: "integracoes",
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
  {
    slug: "sites-institucionais",
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
  {
    slug: "consultoria-tech",
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
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
