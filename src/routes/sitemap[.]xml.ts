import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, getPosts } from "@/lib/blog";
import { localizedUrl, SERVICES } from "@/lib/site";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { SOLUCOES } from "@/lib/solucoes";

// Páginas de soluções (lançadas em 2026-11-11)
const SOLUCOES_UPDATED = "2026-11-11";

// Data da última revisão das páginas institucionais. Atualize ao mudar o conteúdo delas.
const PAGES_UPDATED = "2026-10-27";

type Entry = { path: string; lastmod: string; changefreq: string; priority: string };

function entries(): Entry[] {
  // só os já publicados: artigo agendado entra no sitemap no dia em que é liberado
  const POSTS = getPosts(DEFAULT_LOCALE);
  const latestPost = POSTS[0]?.updatedAt ?? PAGES_UPDATED;
  return [
    { path: "/", lastmod: PAGES_UPDATED, changefreq: "weekly", priority: "1.0" },
    { path: "/servicos", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.9" },
    ...SERVICES.map((s) => ({
      path: `/servicos/${s.slug}`,
      lastmod: PAGES_UPDATED,
      changefreq: "monthly",
      priority: "0.9",
    })),
    { path: "/solucoes", lastmod: SOLUCOES_UPDATED, changefreq: "monthly", priority: "0.9" },
    ...SOLUCOES.map((s) => ({
      path: `/solucoes/${s.data.slug}`,
      lastmod: SOLUCOES_UPDATED,
      changefreq: "monthly",
      priority: "0.9",
    })),
    { path: "/metodo", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.7" },
    { path: "/sobre", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.6" },
    { path: "/contato", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.8" },
    { path: "/blog", lastmod: latestPost, changefreq: "weekly", priority: "0.8" },
    ...CATEGORIES.filter((c) => POSTS.some((p) => p.category.slug === c.slug)).map((c) => ({
      path: `/blog/categoria/${c.slug}`,
      lastmod: POSTS.find((p) => p.category.slug === c.slug)!.updatedAt,
      changefreq: "weekly",
      priority: "0.5",
    })),
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updatedAt, changefreq: "monthly", priority: "0.7" })),
    ...["/politica-de-privacidade", "/politica-de-cookies", "/termos-e-condicoes", "/politica-de-seguranca"].map(
      (path) => ({ path, lastmod: PAGES_UPDATED, changefreq: "yearly", priority: "0.3" }),
    ),
  ];
}

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          // site só em português: uma <url> por página
          entries()
            .map(
              (e) =>
                `  <url><loc>${xmlEscape(localizedUrl(e.path, DEFAULT_LOCALE))}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
            )
            .join("\n") +
          `\n</urlset>\n`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
