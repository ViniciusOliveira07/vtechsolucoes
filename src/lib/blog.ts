import { getService, type ServiceSlug } from "@/lib/site";
import INDEX from "virtual:blog-index";
import { DEFAULT_LOCALE, LOCALES, pick, type L, type Locale } from "@/lib/i18n";

// Artigos ficam em src/content/blog/<slug>.md (português), com metadados no topo (frontmatter).
// O frontmatter e o sumário são lidos no build (vite-blog-index.ts); o texto, sob demanda (loadPostBody).
// As traduções usam o mesmo nome de arquivo em src/content/blog/en/ e src/content/blog/es/.
// O endereço do artigo é o mesmo nos três idiomas; sem tradução, o idioma cai para o português.
// Para publicar um artigo novo basta criar o arquivo: rotas, sitemap e relacionados se atualizam sozinhos.

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

/** Artigos em português (ordem do mais novo), para sitemap e usos que só precisam dos slugs. */
export const POSTS = POSTS_BY_LOCALE.pt;

export function getPosts(locale: Locale) {
  return POSTS_BY_LOCALE[locale];
}

export function getPost(slug: string, locale: Locale) {
  return POSTS_BY_LOCALE[locale].find((p) => p.slug === slug);
}

export function getCategory(slug: string, locale: Locale) {
  return getCategories(locale).find((c) => c.slug === slug);
}

export function postsInCategory(slug: string, locale: Locale) {
  return POSTS_BY_LOCALE[locale].filter((p) => p.category.slug === slug);
}

/** Mesma categoria primeiro, depois tags em comum, depois os mais recentes. */
export function relatedPosts(post: Post, limit = 3) {
  return POSTS_BY_LOCALE[post.locale]
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
