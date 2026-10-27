import { SERVICES, type ServiceSlug } from "@/lib/site";

// Artigos ficam em src/content/blog/<slug>.md, com metadados no topo (frontmatter).
// Para publicar um artigo novo basta criar o arquivo: rotas, sitemap e relacionados se atualizam sozinhos.

export const CATEGORIES = [
  {
    slug: "automacao-com-ia",
    name: "Automação com IA",
    description: "Agentes, RAG e IA aplicada a processos reais: custo, qualidade e arquitetura.",
    service: "automacoes-com-ia",
  },
  {
    slug: "sistemas-sob-medida",
    name: "Sistemas sob medida",
    description: "Quando construir, como escopar e como manter software próprio.",
    service: "sistemas-web",
  },
  {
    slug: "integracoes",
    name: "Integrações",
    description: "ERP, CRM, pagamentos e APIs: como fazer sistemas conversarem sem retrabalho.",
    service: "integracoes",
  },
  {
    slug: "sites-e-seo",
    name: "Sites e SEO B2B",
    description: "Sites que geram oportunidades: performance, conteúdo e SEO técnico.",
    service: "sites-institucionais",
  },
  {
    slug: "gestao-de-tecnologia",
    name: "Gestão de tecnologia",
    description: "Decisões de stack, fornecedores, escopo e custo para quem lidera a área.",
    service: "consultoria-tech",
  },
] as const satisfies readonly { slug: string; name: string; description: string; service: ServiceSlug }[];

export type Category = (typeof CATEGORIES)[number];
export type Heading = { id: string; text: string; level: 2 | 3 };

export type Post = {
  slug: string;
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

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Frontmatter simples: `chave: valor`, strings entre aspas e listas `[a, b]`. */
function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error("Artigo sem frontmatter");
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^(\w+):\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    const value = m[2].trim();
    data[m[1]] = value.startsWith("[")
      ? value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean)
      : value.replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

/** Títulos H2/H3 para o sumário. Os ids batem com os gerados em blog-render.ts. */
function extractHeadings(body: string): Heading[] {
  const used = new Set<string>();
  const out: Heading[] = [];
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("```")) inCode = !inCode;
    const m = !inCode && /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    let id = slugify(text);
    while (used.has(id)) id += "-2";
    used.add(id);
    const depth = m[1].length;
    if (depth === 2 || depth === 3) out.push({ id, text, level: depth });
  }
  return out;
}

const bodies = new Map<string, string>();

export function postBody(slug: string) {
  return bodies.get(slug) ?? "";
}

const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function load(): Post[] {
  return Object.entries(files)
    .map(([path, raw]) => {
      const slug = path.split("/").pop()!.replace(/\.md$/, "");
      const { data, body } = parseFrontmatter(raw);
      const category = CATEGORIES.find((c) => c.slug === data.category);
      if (!category) throw new Error(`Categoria desconhecida em ${slug}: ${String(data.category)}`);
      bodies.set(slug, body);
      const words = body.split(/\s+/).filter(Boolean).length;
      const publishedAt = String(data.publishedAt);
      return {
        slug,
        title: String(data.title),
        description: String(data.description),
        category,
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: String(data.author ?? "Equipe Vtech"),
        publishedAt,
        updatedAt: String(data.updatedAt ?? publishedAt),
        readingMinutes: Math.max(1, Math.round(words / 200)),
        headings: extractHeadings(body),
      } satisfies Post;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.title.localeCompare(b.title)));
}

export const POSTS = load();

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function postsInCategory(slug: string) {
  return POSTS.filter((p) => p.category.slug === slug);
}

/** Mesma categoria primeiro, depois tags em comum, depois os mais recentes. */
export function relatedPosts(post: Post, limit = 3) {
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category.slug === post.category.slug ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function serviceFor(category: Category) {
  return SERVICES.find((s) => s.slug === category.service)!;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d} ${months[m - 1]} ${y}`;
}
