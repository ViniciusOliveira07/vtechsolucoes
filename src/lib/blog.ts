import { getService, type ServiceSlug } from "@/lib/site";
import INDEX from "virtual:blog-index";
import { DEFAULT_LOCALE, LOCALES, pick, type L, type Locale } from "@/lib/i18n";

// Artigos ficam em src/content/blog/<slug>.md (português), com metadados no topo (frontmatter).
// O frontmatter e o sumário são lidos no build (vite-blog-index.ts); o texto, sob demanda (loadPostBody).
// As traduções usam o mesmo nome de arquivo em src/content/blog/en/ e src/content/blog/es/.
// O endereço do artigo é o mesmo nos três idiomas; sem tradução, o idioma cai para o português.
// Para publicar um artigo novo basta criar o arquivo: rotas, sitemap e relacionados se atualizam sozinhos.
//
// Todo artigo termina com uma oferta (a "isca") e um formulário curto. A oferta pode vir no
// frontmatter (offerTitle, offerText, offerItems, offerAsk, offerPlaceholder, offerCta); o que faltar
// vem da oferta padrão da categoria (CATEGORY_OFFERS), então nenhum artigo fica sem chamada.
// Atenção: offerItems é uma lista `[a, b]` separada por vírgula, então os itens não podem ter vírgula.

const CATEGORY_LIST = [
  {
    slug: "automacao-com-ia",
    service: "automacoes-com-ia",
    text: {
      pt: { name: "Automação com IA", description: "Agentes, RAG e IA aplicada a processos reais: custo, qualidade e arquitetura." },
      en: { name: "AI automation", description: "Agents, RAG and AI applied to real processes: cost, quality and architecture." },
      es: { name: "Automatización con IA", description: "Agentes, RAG e IA aplicada a procesos reales: costo, calidad y arquitectura." },
    },
  },
  {
    slug: "sistemas-sob-medida",
    service: "sistemas-web",
    text: {
      pt: { name: "Sistemas sob medida", description: "Quando construir, como escopar e como manter software próprio." },
      en: { name: "Custom software", description: "When to build, how to scope and how to maintain your own software." },
      es: { name: "Sistemas a medida", description: "Cuándo construir, cómo definir el alcance y cómo mantener software propio." },
    },
  },
  {
    slug: "integracoes",
    service: "integracoes",
    text: {
      pt: { name: "Integrações", description: "ERP, CRM, pagamentos e APIs: como fazer sistemas conversarem sem retrabalho." },
      en: { name: "Integrations", description: "ERP, CRM, payments and APIs: how to make systems talk without rework." },
      es: { name: "Integraciones", description: "ERP, CRM, pagos y APIs: cómo hacer que los sistemas se comuniquen sin retrabajo." },
    },
  },
  {
    slug: "sites-e-seo",
    service: "sites-institucionais",
    text: {
      pt: { name: "Sites e SEO B2B", description: "Sites que geram oportunidades: performance, conteúdo e SEO técnico." },
      en: { name: "B2B websites and SEO", description: "Websites that generate opportunities: performance, content and technical SEO." },
      es: { name: "Sitios y SEO B2B", description: "Sitios que generan oportunidades: rendimiento, contenido y SEO técnico." },
    },
  },
  {
    slug: "gestao-de-tecnologia",
    service: "consultoria-tech",
    text: {
      pt: { name: "Gestão de tecnologia", description: "Decisões de stack, fornecedores, escopo e custo para quem lidera a área." },
      en: { name: "Technology management", description: "Stack, vendor, scope and cost decisions for those who lead the area." },
      es: { name: "Gestión de tecnología", description: "Decisiones de stack, proveedores, alcance y costo para quien lidera el área." },
    },
  },
] as const satisfies readonly { slug: string; service: ServiceSlug; text: L<{ name: string; description: string }> }[];

export type CategorySlug = (typeof CATEGORY_LIST)[number]["slug"];

/** A "isca" do fim do artigo: o que a pessoa ganha ao deixar o contato. */
export type Offer = {
  title: string;
  text: string;
  items: string[];
  /** Rótulo do campo de texto livre (a pergunta que qualifica o lead). */
  ask: string;
  placeholder: string;
  cta: string;
};

const CATEGORY_OFFERS: Record<CategorySlug, L<Offer>> = {
  "automacao-com-ia": {
    pt: {
      title: "Diagnóstico gratuito: onde a IA economiza horas na sua operação",
      text: "Conte qual tarefa toma mais tempo da sua equipe. Respondemos se ela pode ser automatizada com IA, com que arquitetura e quanto custaria por mês para rodar.",
      items: ["Viabilidade técnica do seu caso", "Estimativa de custo mensal de operação", "Proposta com escopo e prazo em até 24 horas úteis"],
      ask: "Qual tarefa você quer automatizar?",
      placeholder: "Ex.: respondemos 300 dúvidas de clientes por dia no WhatsApp…",
      cta: "Quero o diagnóstico gratuito",
    },
    en: {
      title: "Free assessment: where AI saves hours in your operation",
      text: "Tell us which task takes most of your team's time. We tell you whether it can be automated with AI, with which architecture and what it would cost per month to run.",
      items: ["Technical feasibility of your case", "Estimated monthly running cost", "Proposal with scope and timeline within 24 business hours"],
      ask: "Which task do you want to automate?",
      placeholder: "E.g. we answer 300 customer questions a day on WhatsApp…",
      cta: "Get my free assessment",
    },
    es: {
      title: "Diagnóstico gratuito: dónde la IA ahorra horas en su operación",
      text: "Cuéntenos qué tarea consume más tiempo de su equipo. Le respondemos si se puede automatizar con IA, con qué arquitectura y cuánto costaría al mes.",
      items: ["Viabilidad técnica de su caso", "Estimación del costo mensual de operación", "Propuesta con alcance y plazo en hasta 24 horas hábiles"],
      ask: "¿Qué tarea quiere automatizar?",
      placeholder: "Ej.: respondemos 300 consultas de clientes por día en WhatsApp…",
      cta: "Quiero el diagnóstico gratuito",
    },
  },
  "sistemas-sob-medida": {
    pt: {
      title: "Escopo gratuito do seu sistema",
      text: "Descreva o processo que hoje vive em planilhas ou em um sistema que não atende. Devolvemos o escopo do que construir primeiro, com prazo e investimento.",
      items: ["Módulos priorizados por retorno", "Prazo e investimento por etapa", "Proposta em até 24 horas úteis"],
      ask: "Que processo o sistema precisa resolver?",
      placeholder: "Ex.: controlamos pedidos e estoque em três planilhas diferentes…",
      cta: "Quero o escopo gratuito",
    },
    en: {
      title: "Free scope for your system",
      text: "Describe the process that lives in spreadsheets today, or in a system that falls short. We send back the scope of what to build first, with timeline and budget.",
      items: ["Modules prioritized by return", "Timeline and budget per phase", "Proposal within 24 business hours"],
      ask: "What process does the system need to handle?",
      placeholder: "E.g. we track orders and stock in three different spreadsheets…",
      cta: "Get my free scope",
    },
    es: {
      title: "Alcance gratuito de su sistema",
      text: "Describa el proceso que hoy vive en planillas o en un sistema que no responde. Le devolvemos el alcance de lo que conviene construir primero, con plazo e inversión.",
      items: ["Módulos priorizados por retorno", "Plazo e inversión por etapa", "Propuesta en hasta 24 horas hábiles"],
      ask: "¿Qué proceso necesita resolver el sistema?",
      placeholder: "Ej.: controlamos pedidos y stock en tres planillas distintas…",
      cta: "Quiero el alcance gratuito",
    },
  },
  integracoes: {
    pt: {
      title: "Mapa de integração gratuito",
      text: "Diga quais sistemas precisam conversar (ERP, CRM, e-commerce, planilhas). Mostramos o caminho mais seguro para ligar cada um e quanto retrabalho isso elimina.",
      items: ["Caminho técnico para cada sistema", "Riscos e pontos de atenção", "Proposta com prazo e investimento em até 24 horas úteis"],
      ask: "Quais sistemas você quer integrar?",
      placeholder: "Ex.: Bling com o nosso CRM e a loja virtual…",
      cta: "Quero o mapa gratuito",
    },
    en: {
      title: "Free integration map",
      text: "Tell us which systems need to talk to each other (ERP, CRM, e-commerce, spreadsheets). We show the safest way to connect each one and how much rework it removes.",
      items: ["Technical path for each system", "Risks and points of attention", "Proposal with timeline and budget within 24 business hours"],
      ask: "Which systems do you want to integrate?",
      placeholder: "E.g. our ERP with our CRM and online store…",
      cta: "Get my free map",
    },
    es: {
      title: "Mapa de integración gratuito",
      text: "Díganos qué sistemas necesitan comunicarse (ERP, CRM, e-commerce, planillas). Le mostramos el camino más seguro para conectar cada uno y cuánto retrabajo elimina.",
      items: ["Camino técnico para cada sistema", "Riesgos y puntos de atención", "Propuesta con plazo e inversión en hasta 24 horas hábiles"],
      ask: "¿Qué sistemas quiere integrar?",
      placeholder: "Ej.: nuestro ERP con el CRM y la tienda online…",
      cta: "Quiero el mapa gratuito",
    },
  },
  "sites-e-seo": {
    pt: {
      title: "Diagnóstico gratuito da presença digital da sua empresa",
      text: "Analisamos como a sua empresa aparece hoje para quem pesquisa no Google e o que falta para o site trazer clientes. Vale para quem já tem site e para quem ainda não tem.",
      items: ["Como você aparece buscando pelo nome e pelo serviço", "O que falta para passar credibilidade", "Plano do site com escopo e prazo em até 24 horas úteis"],
      ask: "O que sua empresa faz e qual é o site atual?",
      placeholder: "Ex.: contabilidade para clínicas em Campinas. Site: ainda não temos…",
      cta: "Quero o diagnóstico gratuito",
    },
    en: {
      title: "Free assessment of your company's online presence",
      text: "We look at how your company shows up today for people searching on Google, and what is missing for the website to bring in customers. It works whether you already have a website or not.",
      items: ["How you show up when searched by name and by service", "What is missing to convey credibility", "Website plan with scope and timeline within 24 business hours"],
      ask: "What does your company do, and what is your current website?",
      placeholder: "E.g. accounting for clinics in Austin. Website: we don't have one yet…",
      cta: "Get my free assessment",
    },
    es: {
      title: "Diagnóstico gratuito de la presencia digital de su empresa",
      text: "Analizamos cómo aparece hoy su empresa para quien busca en Google y qué le falta al sitio para traer clientes. Sirve tanto si ya tiene sitio como si todavía no.",
      items: ["Cómo aparece al buscarlo por nombre y por servicio", "Qué falta para transmitir credibilidad", "Plan del sitio con alcance y plazo en hasta 24 horas hábiles"],
      ask: "¿Qué hace su empresa y cuál es su sitio actual?",
      placeholder: "Ej.: contabilidad para clínicas en Bogotá. Sitio: todavía no tenemos…",
      cta: "Quiero el diagnóstico gratuito",
    },
  },
  "gestao-de-tecnologia": {
    pt: {
      title: "Segunda opinião técnica gratuita",
      text: "Vai escolher um fornecedor, uma stack ou aprovar um orçamento de tecnologia? Conte a decisão e devolvemos os riscos e as perguntas que você deveria fazer antes de assinar.",
      items: ["Riscos da decisão em linguagem de negócio", "Perguntas para fazer ao fornecedor", "Retorno em até 24 horas úteis"],
      ask: "Que decisão de tecnologia você precisa tomar?",
      placeholder: "Ex.: recebemos duas propostas para o novo sistema e não sabemos comparar…",
      cta: "Quero a segunda opinião",
    },
    en: {
      title: "Free technical second opinion",
      text: "Choosing a vendor or a stack, or approving a technology budget? Tell us about the decision and we send back the risks and the questions you should ask before signing.",
      items: ["Risks of the decision in business terms", "Questions to ask the vendor", "Answer within 24 business hours"],
      ask: "What technology decision do you need to make?",
      placeholder: "E.g. we received two proposals for the new system and can't compare them…",
      cta: "Get my second opinion",
    },
    es: {
      title: "Segunda opinión técnica gratuita",
      text: "¿Va a elegir un proveedor, un stack o aprobar un presupuesto de tecnología? Cuéntenos la decisión y le devolvemos los riesgos y las preguntas que debería hacer antes de firmar.",
      items: ["Riesgos de la decisión en lenguaje de negocio", "Preguntas para hacerle al proveedor", "Respuesta en hasta 24 horas hábiles"],
      ask: "¿Qué decisión de tecnología necesita tomar?",
      placeholder: "Ej.: recibimos dos propuestas para el nuevo sistema y no sabemos compararlas…",
      cta: "Quiero la segunda opinión",
    },
  },
};
export type Category = { slug: CategorySlug; service: ServiceSlug; name: string; description: string };
export type Heading = { id: string; text: string; level: 2 | 3 };

export type Post = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  headings: Heading[];
  offer: Offer;
};

export function getCategories(locale: Locale): Category[] {
  return CATEGORY_LIST.map((c) => ({ slug: c.slug, service: c.service, ...c.text[locale] }));
}

/** Categorias em português, para usos que só precisam dos slugs. */
export const CATEGORIES = getCategories(DEFAULT_LOCALE);

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const key = (slug: string, locale: Locale) => `${locale}:${slug}`;

// Texto completo de cada artigo: um arquivo por artigo, baixado só quando alguém abre o artigo
// ou baixa o PDF. Os metadados (lista, home, sitemap) vêm de "virtual:blog-index", gerado no build.
const bodyFiles = import.meta.glob("../content/blog/**/*.md", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>;

function bodyPath(slug: string, locale: Locale) {
  return `../content/blog/${locale === DEFAULT_LOCALE ? "" : `${locale}/`}${slug}.md`;
}

/** Corpo em markdown do artigo (sem o frontmatter), no idioma pedido ou em português se não houver tradução. */
export async function loadPostBody(slug: string, locale: Locale) {
  const load = bodyFiles[bodyPath(slug, locale)] ?? bodyFiles[bodyPath(slug, DEFAULT_LOCALE)];
  if (!load) return "";
  const raw = await load();
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

/** Oferta do frontmatter, campo a campo, com a oferta padrão da categoria no que faltar. */
function offerFor(data: Record<string, string | string[]>, category: CategorySlug, locale: Locale): Offer {
  const base = CATEGORY_OFFERS[category][locale];
  const str = (k: string, fallback: string) => (typeof data[k] === "string" && data[k] ? String(data[k]) : fallback);
  return {
    title: str("offerTitle", base.title),
    text: str("offerText", base.text),
    items: Array.isArray(data.offerItems) && data.offerItems.length ? data.offerItems : base.items,
    ask: str("offerAsk", base.ask),
    placeholder: str("offerPlaceholder", base.placeholder),
    cta: str("offerCta", base.cta),
  };
}

function parsePost(entry: (typeof INDEX)[number]): Post {
  const { slug, locale, data } = entry;
  const category = getCategories(locale).find((c) => c.slug === data.category);
  if (!category) throw new Error(`Categoria desconhecida em ${slug}: ${String(data.category)}`);
  const publishedAt = String(data.publishedAt);
  return {
    slug,
    locale,
    title: String(data.title),
    description: String(data.description),
    category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: String(data.author ?? pick(DEFAULT_AUTHOR, locale)),
    publishedAt,
    updatedAt: String(data.updatedAt ?? publishedAt),
    readingMinutes: Math.max(1, Math.round(entry.words / 200)),
    headings: entry.headings,
    offer: offerFor(data, category.slug, locale),
  };
}

const DEFAULT_AUTHOR: L<string> = { pt: "Equipe Vtech", en: "Vtech team", es: "Equipo Vtech" };

const byNewest = (a: Post, b: Post) =>
  a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.title.localeCompare(b.title);

function load(): L<Post[]> {
  const out = { pt: [], en: [], es: [] } as L<Post[]>;
  for (const entry of INDEX) out[entry.locale].push(parsePost(entry));
  // Artigo ainda sem tradução aparece em português nos outros idiomas, para o blog não ficar com buracos.
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    for (const pt of out.pt) if (!out[locale].some((p) => p.slug === pt.slug)) out[locale].push(pt);
  }
  for (const locale of LOCALES) out[locale].sort(byNewest);
  return out;
}

const POSTS_BY_LOCALE = load();

// Agendamento: artigo com publishedAt no futuro já pode estar no código, mas só aparece (lista,
// sitemap, relacionados e o próprio endereço) a partir desse dia, no horário de São Paulo.
// O site é renderizado a cada acesso, então a liberação acontece sozinha, sem novo deploy.
const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const isLive = (p: Post) => p.publishedAt <= today();

/** Todos os artigos em português, inclusive os agendados (só para validar slugs, nunca para listar). */
export const ALL_POSTS = POSTS_BY_LOCALE.pt;

/** Artigos já publicados, do mais novo para o mais antigo. */
export function getPosts(locale: Locale) {
  return POSTS_BY_LOCALE[locale].filter(isLive);
}

export function getPost(slug: string, locale: Locale) {
  return getPosts(locale).find((p) => p.slug === slug);
}

export function getCategory(slug: string, locale: Locale) {
  return getCategories(locale).find((c) => c.slug === slug);
}

export function postsInCategory(slug: string, locale: Locale) {
  return getPosts(locale).filter((p) => p.category.slug === slug);
}

/** Mesma categoria primeiro, depois tags em comum, depois os mais recentes. */
export function relatedPosts(post: Post, limit = 3) {
  return getPosts(post.locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category.slug === post.category.slug ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function serviceFor(category: Category, locale: Locale) {
  return getService(category.service, locale);
}

export { formatDate } from "@/lib/i18n";
